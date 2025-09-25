// Import from split query files for better organization
const {
  getContentQualityKPIMetrics,
  getKPIDistribution,
  getKPITrend,
  getQualityScoreDistribution,
} = require("../db/queries/contentQualityKpi.queries");

const {
  getTopKeywords,
  // getWordCloudData,
  getKeywordSentimentData,
  getTrendingKeywords,
} = require("../db/queries/keywords.queries");

const {
  getCommentQualityAnalysis,
  getCommentEngagementMetrics,
  getCommentLengthAnalysis,
} = require("../db/queries/comments.queries");

const {
  getSentimentByTopics,
  getBubbleData,
  getWordCloudData,
  getTopicTrends,
  getTopicCorrelations,
} = require("../db/queries/topics.queries");

const { getTimelineData } = require("../db/queries/timeline.queries");

/**
 * Content Quality KPI Service
 * Combines data from content quality queries and builds the response expected by the frontend
 */
async function getContentQualityKPI(filters = {}) {
  try {
    console.log("Fetching content quality KPI data with filters:", filters);
    const overallStartTime = Date.now();

    // Parse filters from request
    const parsedFilters = parseFilters(filters);

    // Execute queries individually with timing to identify bottleneck
    const startTime = Date.now();
    console.log("🚀 Starting queries execution with individual timing...");

    console.log("⏱️  Starting getContentQualityKPIMetrics...");
    const kpiStart = Date.now();
    const kpiMetrics = await getContentQualityKPIMetrics(parsedFilters);
    console.log(`📊 getContentQualityKPIMetrics: ${Date.now() - kpiStart}ms`);

    console.log("⏱️  Starting getQualityScoreDistribution...");
    const distStart = Date.now();
    const qualityScoreDistribution = await getQualityScoreDistribution(
      parsedFilters
    );
    console.log(`📊 getQualityScoreDistribution: ${Date.now() - distStart}ms`);

    console.log("⏱️  Starting getTimelineData...");
    const timelineStart = Date.now();
    const timelineData = await getTimelineData(parsedFilters);
    console.log(`📊 getTimelineData: ${Date.now() - timelineStart}ms`);

    console.log("⏱️  Starting remaining quick queries...");
    const quickStart = Date.now();
    const [topKeywords, sentimentByTopics, wordCloudData, bubbleData] =
      await Promise.all([
        getTopKeywords(parsedFilters),
        getSentimentByTopics(parsedFilters),
        getWordCloudData(parsedFilters),
        getBubbleData(parsedFilters),
      ]);
    console.log(`📊 Quick queries (4 total): ${Date.now() - quickStart}ms`);

    const totalQueriesTime = Date.now() - startTime;
    console.log(`⚡ All queries completed in: ${totalQueriesTime}ms`);

    // Add qualityScoreDistribution to kpiMetrics
    const enhancedKpiMetrics = {
      ...kpiMetrics,
      qualityScoreDistribution: qualityScoreDistribution,
    };

    // Combine into one JSON object matching frontend expectations
    const result = {
      kpiMetrics: enhancedKpiMetrics,
      topKeywords,
      sentimentByTopics,
      wordCloudData,
      bubbleData,
      timelineData,
    };

    const overallTotalTime = Date.now() - overallStartTime;
    console.log(
      `✅ Successfully combined content quality KPI data in ${overallTotalTime}ms total`
    );
    return result;
  } catch (error) {
    console.error("Error in getContentQualityKPI service:", error);
    throw new Error("Failed to fetch content quality KPI data");
  }
}

/**
 * Get detailed content analysis
 */
async function getDetailedContentAnalysis(filters = {}) {
  try {
    const parsedFilters = parseFilters(filters);

    // This could include more detailed breakdowns
    const [kpiMetrics, sentimentByTopics, wordCloudData] = await Promise.all([
      getContentQualityKPIMetrics(parsedFilters),
      getSentimentByTopics(parsedFilters),
      getWordCloudData(parsedFilters),
    ]);

    return {
      contentMetrics: kpiMetrics,
      sentimentAnalysis: sentimentByTopics,
      wordAnalysis: wordCloudData,
      generatedAt: new Date().toISOString(),
      filters: parsedFilters,
    };
  } catch (error) {
    console.error("Error in getDetailedContentAnalysis service:", error);
    throw new Error("Failed to fetch detailed content analysis data");
  }
}

/**
 * Parse and validate filters from the request
 */
function parseFilters(filters) {
  const parsed = {};

  // Date filters
  if (filters.dateFilter) {
    if (Array.isArray(filters.dateFilter) && filters.dateFilter.length === 2) {
      parsed.dateFrom = filters.dateFilter[0];
      parsed.dateTo = filters.dateFilter[1];
    } else if (filters.dateFilter.from && filters.dateFilter.to) {
      parsed.dateFrom = filters.dateFilter.from;
      parsed.dateTo = filters.dateFilter.to;
    }
  }

  // Category filter
  if (filters.categoryFilter && filters.categoryFilter !== "all") {
    parsed.category = filters.categoryFilter.toLowerCase();
  }

  // Language filter
  if (filters.languageFilter && filters.languageFilter !== "all") {
    parsed.language = filters.languageFilter.toLowerCase();
  }

  // Sentiment filter
  if (filters.sentimentFilter && filters.sentimentFilter !== "all") {
    parsed.sentiment = filters.sentimentFilter.toLowerCase();
  }

  return parsed;
}

module.exports = {
  getContentQualityKPI,
  getDetailedContentAnalysis,
  parseFilters,
};

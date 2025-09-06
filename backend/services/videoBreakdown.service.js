// Import from split query files for better organization
const {
  getVideoCategoryData,
  getVideoPlatformDistribution,
  getVideoUploadTrends,
  getVideoDurationAnalysis,
  getVideoMetrics,
  getCategoryLeaderboardData,
} = require("../db/queries/videos.queries");

const {
  getCreatorLeaderboard,
  getTopContentByEngagement,
  getTrendingCreators,
  getContentQualityRankings,
} = require("../db/queries/leaderboard.queries");

const {
  getVideoPerformanceMetrics,
  getTopVideosByCategory,
  getVideoEngagementAnalysis,
  getPerformanceBenchmarks,
} = require("../db/queries/performance.queries");

/**
 * Video Breakdown Service
 * Combines data from video breakdown queries and builds the response expected by the frontend
 */
async function getVideoBreakdown(
  filters = {},
  pagination = { limit: 10, offset: 0 }
) {
  try {
    console.log("Fetching video breakdown data with filters:", filters);

    // Parse filters from request
    const parsedFilters = parseFilters(filters);

    // Fetch all data in parallel for better performance
    const [videoCategoryData, categoryLeaderboardData, videoMetrics] =
      await Promise.all([
        getVideoCategoryData(parsedFilters),
        getCategoryLeaderboardData(
          parsedFilters,
          pagination.limit,
          pagination.offset
        ),
        getVideoMetrics(parsedFilters),
      ]);

    // Combine into one JSON object matching frontend expectations
    const result = {
      videoCategoryData,
      categoryLeaderboardData,
      videoMetrics,
    };

    console.log("Successfully combined video breakdown data");
    return result;
  } catch (error) {
    console.error("Error in getVideoBreakdown service:", error);
    throw new Error("Failed to fetch video breakdown data");
  }
}

/**
 * Get detailed video analytics
 */
async function getDetailedVideoAnalytics(filters = {}) {
  try {
    const parsedFilters = parseFilters(filters);

    // This could include more detailed breakdowns
    const [
      videoCategoryData,
      performanceMetrics,
      topVideos,
      engagementAnalysis,
    ] = await Promise.all([
      getVideoCategoryData(parsedFilters),
      getVideoPerformanceMetrics(parsedFilters),
      getTopVideosByCategory(parsedFilters),
      getVideoEngagementAnalysis(parsedFilters),
    ]);

    return {
      categoryBreakdown: videoCategoryData,
      performanceMetrics: performanceMetrics,
      topPerformingVideos: topVideos,
      engagementAnalysis: engagementAnalysis,
      generatedAt: new Date().toISOString(),
      filters: parsedFilters,
    };
  } catch (error) {
    console.error("Error in getDetailedVideoAnalytics service:", error);
    throw new Error("Failed to fetch detailed video analytics data");
  }
}

/**
 * Get author/creator insights
 */
async function getAuthorInsights(filters = {}) {
  try {
    const parsedFilters = parseFilters(filters);

    const [creatorLeaderboard, trendingCreators] = await Promise.all([
      getCreatorLeaderboard(parsedFilters),
      getTrendingCreators(parsedFilters),
    ]);

    return {
      creatorLeaderboard: creatorLeaderboard,
      trendingCreators: trendingCreators,
      generatedAt: new Date().toISOString(),
      filters: parsedFilters,
    };
  } catch (error) {
    console.error("Error in getAuthorInsights service:", error);
    throw new Error("Failed to fetch author insights data");
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

  return parsed;
}

module.exports = {
  getVideoBreakdown,
  getDetailedVideoAnalytics,
  getAuthorInsights,
  parseFilters,
};

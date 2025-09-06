const {
  getSentimentData,
  getOverallSentimentScore,
} = require("../db/queries/sentiment.queries");
const { getTimelineData } = require("../db/queries/timeline.queries");
const { getMetricsData } = require("../db/queries/metrics.queries");
const { getCategoryData } = require("../db/queries/category.queries");

/**
 * Executive Overview Service
 * Combines data from multiple query files and builds the response expected by the frontend
 */
async function getExecutiveOverview(filters = {}) {
  try {
    console.log("Fetching executive overview data with filters:", filters);

    // Parse filters from request
    const parsedFilters = parseFilters(filters);

    // Fetch all data in parallel for better performance
    const [
      sentimentData,
      overallSentimentScore,
      timelineData,
      metricsData,
      categoryData,
    ] = await Promise.all([
      getSentimentData(parsedFilters),
      getOverallSentimentScore(parsedFilters),
      getTimelineData(parsedFilters),
      getMetricsData(parsedFilters),
      getCategoryData(parsedFilters),
    ]);

    // Combine into one JSON object matching frontend expectations
    const result = {
      sentimentData,
      overallSentimentScore: Math.round(overallSentimentScore * 10) / 10, // Round to 1 decimal
      timelineData,
      metricsData,
      categoryData,
    };

    console.log("Successfully combined executive overview data");
    return result;
  } catch (error) {
    console.error("Error in getExecutiveOverview service:", error);
    throw new Error("Failed to fetch executive overview data");
  }
}

/**
 * Get detailed analytics for a specific time period
 */
async function getDetailedAnalytics(filters = {}) {
  try {
    const parsedFilters = parseFilters(filters);

    // This could include more detailed breakdowns
    const [sentimentData, timelineData, categoryData] = await Promise.all([
      getSentimentData(parsedFilters),
      getTimelineData(parsedFilters),
      getCategoryData(parsedFilters),
    ]);

    return {
      sentimentBreakdown: sentimentData,
      timeline: timelineData,
      categoryBreakdown: categoryData,
      generatedAt: new Date().toISOString(),
      filters: parsedFilters,
    };
  } catch (error) {
    console.error("Error in getDetailedAnalytics service:", error);
    throw new Error("Failed to fetch detailed analytics data");
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

/**
 * Calculate additional metrics and insights
 */
function calculateInsights(data) {
  const insights = [];

  // Sentiment insights
  if (data.sentimentData) {
    const positive = data.sentimentData.find((s) => s.type === "Positive");
    const negative = data.sentimentData.find((s) => s.type === "Negative");

    if (positive && negative) {
      const sentiment_ratio = positive.value / (negative.value || 1);
      if (sentiment_ratio > 2) {
        insights.push({
          type: "positive",
          message: "Strong positive sentiment detected",
          value: sentiment_ratio,
        });
      } else if (sentiment_ratio < 0.5) {
        insights.push({
          type: "warning",
          message: "Concerning negative sentiment levels",
          value: sentiment_ratio,
        });
      }
    }
  }

  // Timeline insights
  if (data.timelineData && data.timelineData.length > 1) {
    const recent = data.timelineData[data.timelineData.length - 1];
    const previous = data.timelineData[data.timelineData.length - 2];

    const sentimentChange = recent.avgSentiment - previous.avgSentiment;
    if (Math.abs(sentimentChange) > 1) {
      insights.push({
        type: sentimentChange > 0 ? "positive" : "warning",
        message: `Significant sentiment ${
          sentimentChange > 0 ? "improvement" : "decline"
        } this month`,
        value: sentimentChange,
      });
    }
  }

  return insights;
}

module.exports = {
  getExecutiveOverview,
  getDetailedAnalytics,
  calculateInsights,
  parseFilters,
};

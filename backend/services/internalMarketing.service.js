// Import from internal marketing queries
const {
  getEngagementTimelineData,
  getVideoOptimizationData,
} = require("../db/queries/internalMarketing.queries");

/**
 * Internal Marketing Service
 * Combines data from internal marketing queries and builds the response expected by the frontend
 */
async function getInternalMarketingData(filters = {}) {
  try {
    console.log("Fetching internal marketing data with filters:", filters);

    // Parse filters from request
    const parsedFilters = parseFilters(filters);

    // Fetch all data in parallel for better performance
    const [engagementTimelineData, videoOptimizationData] = await Promise.all([
      getEngagementTimelineData(parsedFilters),
      getVideoOptimizationData(parsedFilters),
    ]);

    // Combine into one JSON object matching frontend expectations
    const result = {
      engagementTimelineData,
      videoOptimizationData,
    };

    console.log("Successfully combined internal marketing data");
    return result;
  } catch (error) {
    console.error("Error in getInternalMarketingData service:", error);
    throw new Error("Failed to fetch internal marketing data");
  }
}

/**
 * Get engagement trends data
 */
async function getEngagementTrends(filters = {}) {
  try {
    const parsedFilters = parseFilters(filters);

    const engagementTimelineData = await getEngagementTimelineData(
      parsedFilters
    );

    return {
      engagementTimelineData,
      generatedAt: new Date().toISOString(),
      filters: parsedFilters,
    };
  } catch (error) {
    console.error("Error in getEngagementTrends service:", error);
    throw new Error("Failed to fetch engagement trends data");
  }
}

/**
 * Get video optimization strategy data
 */
async function getVideoOptimizationStrategy(filters = {}) {
  try {
    const parsedFilters = parseFilters(filters);

    const videoOptimizationData = await getVideoOptimizationData(parsedFilters);

    return {
      videoOptimizationData,
      generatedAt: new Date().toISOString(),
      filters: parsedFilters,
    };
  } catch (error) {
    console.error("Error in getVideoOptimizationStrategy service:", error);
    throw new Error("Failed to fetch video optimization strategy data");
  }
}

/**
 * Helper function to parse and validate filters
 */
function parseFilters(filters) {
  const parsed = { ...filters };

  // Parse date filter if it exists
  if (filters.dateFilter && Array.isArray(filters.dateFilter)) {
    const [dateFrom, dateTo] = filters.dateFilter;
    if (dateFrom && dateTo) {
      parsed.dateFrom = dateFrom;
      parsed.dateTo = dateTo;
    }
  }

  // Clean up undefined/null values
  Object.keys(parsed).forEach((key) => {
    if (parsed[key] === undefined || parsed[key] === null) {
      delete parsed[key];
    }
  });

  return parsed;
}

module.exports = {
  getInternalMarketingData,
  getEngagementTrends,
  getVideoOptimizationStrategy,
};

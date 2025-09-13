const {
  getHighestPotentialCategory,
  getChannelMetrics,
  getCategoryPerformanceAnalysis,
  getInfluencerPerformanceAnalysis,
} = require("../db/queries/videos.queries");

/**
 * Get influencer intelligence data including highest potential category, channel metrics, and category performance
 */
async function getInfluencerIntelligenceData(filters = {}) {
  try {
    // Channel IDs from mockTopChannels
    const topChannelIds = [
      26428, 48780, 53183, 6926, 14429, 25356, 26891, 35581, 46179,
    ];

    // Get highest potential category
    const highestPotentialCategory = await getHighestPotentialCategory(
      topChannelIds
    );

    // Get channel metrics
    const channelMetrics = await getChannelMetrics(topChannelIds);

    // Get category performance analysis
    const categoryPerformance = await getCategoryPerformanceAnalysis(
      topChannelIds
    );

    // Get influencer performance analysis
    const performanceAnalysis = await getInfluencerPerformanceAnalysis(
      topChannelIds
    );

    return {
      success: true,
      data: {
        highestPotentialCategory: highestPotentialCategory.category,
        categoryStats: {
          frequency: highestPotentialCategory.frequency,
          percentage: highestPotentialCategory.percentage,
        },
        channelMetrics: channelMetrics,
        categoryPerformance: categoryPerformance,
        performanceAnalysis: performanceAnalysis,
      },
    };
  } catch (error) {
    console.error("Error in getInfluencerIntelligenceData:", error);
    return {
      success: false,
      error: error.message,
      data: null,
    };
  }
}

module.exports = {
  getInfluencerIntelligenceData,
};

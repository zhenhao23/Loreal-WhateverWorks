const {
  getVideoBreakdown,
  getDetailedVideoAnalytics,
  getAuthorInsights,
} = require("../services/videoBreakdown.service");

/**
 * Video Breakdown Controller
 * Handles HTTP requests/responses for video breakdown endpoints
 */

/**
 * GET/POST /api/video-breakdown
 * Main handler for video breakdown data
 */
async function videoBreakdownHandler(req, res) {
  try {
    console.log("Video breakdown request received");
    console.log("Query params:", req.query);
    console.log("Request body:", req.body);

    // Extract filters from query params or request body
    const filters = {
      dateFilter: req.body.dateFilter || req.query.dateFilter,
      categoryFilter:
        req.body.categoryFilter || req.query.categoryFilter || "all",
      languageFilter:
        req.body.languageFilter || req.query.languageFilter || "all",
    };

    // Extract pagination parameters
    const pagination = {
      limit: parseInt(req.body.pageSize || req.query.pageSize || 10),
      offset:
        (parseInt(req.body.current || req.query.current || 1) - 1) *
        parseInt(req.body.pageSize || req.query.pageSize || 10),
    };

    console.log("Processed filters:", filters);
    console.log("Pagination params:", pagination);

    // Get data from service
    const data = await getVideoBreakdown(filters, pagination);

    // Add metadata
    const response = {
      ...data,
      metadata: {
        generatedAt: new Date().toISOString(),
        filters: filters,
        pagination: pagination,
        dataSource: "database",
      },
    };

    console.log("Successfully generated video breakdown response");
    res.json(response);
  } catch (error) {
    console.error("Error in videoBreakdownHandler:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to fetch video breakdown data",
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * GET/POST /api/video-breakdown/detailed
 * Handler for detailed video analytics
 */
async function detailedVideoAnalyticsHandler(req, res) {
  try {
    console.log("Detailed video analytics request received");

    const filters = {
      dateFilter: req.body.dateFilter || req.query.dateFilter,
      categoryFilter:
        req.body.categoryFilter || req.query.categoryFilter || "all",
      languageFilter:
        req.body.languageFilter || req.query.languageFilter || "all",
    };

    const data = await getDetailedVideoAnalytics(filters);

    res.json({
      ...data,
      success: true,
    });
  } catch (error) {
    console.error("Error in detailedVideoAnalyticsHandler:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to fetch detailed video analytics data",
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * GET/POST /api/video-breakdown/authors
 * Handler for author/creator insights
 */
async function authorInsightsHandler(req, res) {
  try {
    console.log("Author insights request received");

    const filters = {
      dateFilter: req.body.dateFilter || req.query.dateFilter,
      categoryFilter:
        req.body.categoryFilter || req.query.categoryFilter || "all",
      languageFilter:
        req.body.languageFilter || req.query.languageFilter || "all",
    };

    const data = await getAuthorInsights(filters);

    res.json({
      ...data,
      success: true,
    });
  } catch (error) {
    console.error("Error in authorInsightsHandler:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to fetch author insights data",
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * GET /api/video-breakdown/health
 * Health check endpoint
 */
async function healthCheckHandler(req, res) {
  try {
    res.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      service: "video-breakdown",
      version: "1.0.0",
    });
  } catch (error) {
    console.error("Error in healthCheckHandler:", error);
    res.status(500).json({
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      error: error.message,
    });
  }
}

module.exports = {
  videoBreakdownHandler,
  detailedVideoAnalyticsHandler,
  authorInsightsHandler,
  healthCheckHandler,
};

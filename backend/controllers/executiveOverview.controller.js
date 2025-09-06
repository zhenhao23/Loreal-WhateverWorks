const {
  getExecutiveOverview,
  getDetailedAnalytics,
  calculateInsights,
} = require("../services/executiveOverview.service");

/**
 * Executive Overview Controller
 * Handles HTTP requests/responses for executive overview endpoints
 */

/**
 * GET /api/executive-overview
 * Main handler for executive overview data
 */
async function executiveOverviewHandler(req, res) {
  try {
    console.log("Executive overview request received");
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

    console.log("Processed filters:", filters);

    // Get data from service
    const data = await getExecutiveOverview(filters);

    // Add metadata
    const response = {
      ...data,
      metadata: {
        generatedAt: new Date().toISOString(),
        filters: filters,
        dataSource: "database",
      },
    };

    console.log("Successfully generated executive overview response");
    res.json(response);
  } catch (error) {
    console.error("Error in executiveOverviewHandler:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to fetch executive overview data",
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * GET /api/executive-overview/detailed
 * Handler for detailed analytics
 */
async function detailedAnalyticsHandler(req, res) {
  try {
    console.log("Detailed analytics request received");

    const filters = {
      dateFilter: req.body.dateFilter || req.query.dateFilter,
      categoryFilter:
        req.body.categoryFilter || req.query.categoryFilter || "all",
      languageFilter:
        req.body.languageFilter || req.query.languageFilter || "all",
    };

    const data = await getDetailedAnalytics(filters);

    res.json({
      ...data,
      success: true,
    });
  } catch (error) {
    console.error("Error in detailedAnalyticsHandler:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to fetch detailed analytics data",
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * GET /api/executive-overview/insights
 * Handler for AI-generated insights
 */
async function insightsHandler(req, res) {
  try {
    console.log("Insights request received");

    const filters = {
      dateFilter: req.body.dateFilter || req.query.dateFilter,
      categoryFilter:
        req.body.categoryFilter || req.query.categoryFilter || "all",
      languageFilter:
        req.body.languageFilter || req.query.languageFilter || "all",
    };

    // Get the base data first
    const data = await getExecutiveOverview(filters);

    // Calculate insights
    const insights = calculateInsights(data);

    res.json({
      insights,
      metadata: {
        generatedAt: new Date().toISOString(),
        filters: filters,
        dataPoints: {
          sentimentDataPoints: data.sentimentData?.length || 0,
          timelineDataPoints: data.timelineData?.length || 0,
          categoryDataPoints: data.categoryData?.length || 0,
        },
      },
    });
  } catch (error) {
    console.error("Error in insightsHandler:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to generate insights",
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * GET /api/executive-overview/health
 * Health check endpoint
 */
async function healthCheckHandler(req, res) {
  try {
    // Basic health check - could be extended to check database connectivity
    res.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      service: "executive-overview",
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
  executiveOverviewHandler,
  detailedAnalyticsHandler,
  insightsHandler,
  healthCheckHandler,
};

const {
  getContentQualityKPI,
  getDetailedContentAnalysis,
} = require("../services/contentQuality.service");

/**
 * Content Quality KPI Controller
 * Handles HTTP requests/responses for content quality KPI endpoints
 */

/**
 * GET/POST /api/content-quality-kpi
 * Main handler for content quality KPI data
 */
async function contentQualityKPIHandler(req, res) {
  try {
    console.log("Content quality KPI request received");
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
    const data = await getContentQualityKPI(filters);

    // Add metadata
    const response = {
      ...data,
      metadata: {
        generatedAt: new Date().toISOString(),
        filters: filters,
        dataSource: "database",
      },
    };

    console.log("Successfully generated content quality KPI response");
    res.json(response);
  } catch (error) {
    console.error("Error in contentQualityKPIHandler:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to fetch content quality KPI data",
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * GET/POST /api/content-quality-kpi/detailed
 * Handler for detailed content analysis
 */
async function detailedContentAnalysisHandler(req, res) {
  try {
    console.log("Detailed content analysis request received");

    const filters = {
      dateFilter: req.body.dateFilter || req.query.dateFilter,
      categoryFilter:
        req.body.categoryFilter || req.query.categoryFilter || "all",
      languageFilter:
        req.body.languageFilter || req.query.languageFilter || "all",
    };

    const data = await getDetailedContentAnalysis(filters);

    res.json({
      ...data,
      success: true,
    });
  } catch (error) {
    console.error("Error in detailedContentAnalysisHandler:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to fetch detailed content analysis data",
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * GET /api/content-quality-kpi/health
 * Health check endpoint
 */
async function healthCheckHandler(req, res) {
  try {
    res.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      service: "content-quality-kpi",
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
  contentQualityKPIHandler,
  detailedContentAnalysisHandler,
  healthCheckHandler,
};

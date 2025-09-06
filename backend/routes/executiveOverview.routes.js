const express = require("express");
const {
  executiveOverviewHandler,
  detailedAnalyticsHandler,
  insightsHandler,
  healthCheckHandler,
} = require("../controllers/executiveOverview.controller");

const router = express.Router();

/**
 * Executive Overview Routes
 * All routes are prefixed with /api/executive-overview
 */

// Main executive overview endpoint
// GET /api/executive-overview
// POST /api/executive-overview (for complex filters in body)
router.get("/", executiveOverviewHandler);
router.post("/", executiveOverviewHandler);

// Detailed analytics endpoint
// GET /api/executive-overview/detailed
// POST /api/executive-overview/detailed
router.get("/detailed", detailedAnalyticsHandler);
router.post("/detailed", detailedAnalyticsHandler);

// AI insights endpoint
// GET /api/executive-overview/insights
// POST /api/executive-overview/insights
router.get("/insights", insightsHandler);
router.post("/insights", insightsHandler);

// Health check endpoint
// GET /api/executive-overview/health
router.get("/health", healthCheckHandler);

// Export summary endpoint (future enhancement)
// router.get("/export", exportHandler);

module.exports = router;

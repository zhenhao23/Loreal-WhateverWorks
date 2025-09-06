const express = require("express");
const {
  videoBreakdownHandler,
  detailedVideoAnalyticsHandler,
  authorInsightsHandler,
  healthCheckHandler,
} = require("../controllers/videoBreakdown.controller");

const router = express.Router();

/**
 * Video Breakdown Routes
 * All routes are prefixed with /api/video-breakdown
 */

// Main video breakdown endpoint
// GET /api/video-breakdown
// POST /api/video-breakdown (for complex filters in body)
router.get("/", videoBreakdownHandler);
router.post("/", videoBreakdownHandler);

// Detailed video analytics endpoint
// GET /api/video-breakdown/detailed
// POST /api/video-breakdown/detailed
router.get("/detailed", detailedVideoAnalyticsHandler);
router.post("/detailed", detailedVideoAnalyticsHandler);

// Author insights endpoint
// GET /api/video-breakdown/authors
// POST /api/video-breakdown/authors
router.get("/authors", authorInsightsHandler);
router.post("/authors", authorInsightsHandler);

// Health check endpoint
// GET /api/video-breakdown/health
router.get("/health", healthCheckHandler);

module.exports = router;

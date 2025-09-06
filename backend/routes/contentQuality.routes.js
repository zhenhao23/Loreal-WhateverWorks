const express = require("express");
const {
  contentQualityKPIHandler,
  detailedContentAnalysisHandler,
  healthCheckHandler,
} = require("../controllers/contentQuality.controller");

const router = express.Router();

/**
 * Content Quality KPI Routes
 * All routes are prefixed with /api/content-quality-kpi
 */

// Main content quality KPI endpoint
// GET /api/content-quality-kpi
// POST /api/content-quality-kpi (for complex filters in body)
router.get("/", contentQualityKPIHandler);
router.post("/", contentQualityKPIHandler);

// Detailed content analysis endpoint
// GET /api/content-quality-kpi/detailed
// POST /api/content-quality-kpi/detailed
router.get("/detailed", detailedContentAnalysisHandler);
router.post("/detailed", detailedContentAnalysisHandler);

// Health check endpoint
// GET /api/content-quality-kpi/health
router.get("/health", healthCheckHandler);

module.exports = router;

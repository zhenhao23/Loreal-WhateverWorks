// Index file for backend modules
// Useful for testing and module organization

// Database connection
const db = require("./db/db");

// Services
const executiveOverviewService = require("./services/executiveOverview.service");
const contentQualityService = require("./services/contentQuality.service");
const videoBreakdownService = require("./services/videoBreakdown.service");

// Controllers
const executiveOverviewController = require("./controllers/executiveOverview.controller");
const contentQualityController = require("./controllers/contentQuality.controller");
const videoBreakdownController = require("./controllers/videoBreakdown.controller");

// Routes
const executiveOverviewRoutes = require("./routes/executiveOverview.routes");
const contentQualityRoutes = require("./routes/contentQuality.routes");
const videoBreakdownRoutes = require("./routes/videoBreakdown.routes");
const scriptRoutes = require("./routes/scriptRoutes");

// Query modules
const sentimentQueries = require("./db/queries/sentiment.queries");
const timelineQueries = require("./db/queries/timeline.queries");
const metricsQueries = require("./db/queries/metrics.queries");
const categoryQueries = require("./db/queries/category.queries");
const contentQualityQueries = require("./db/queries/contentQuality.queries");
const videoBreakdownQueries = require("./db/queries/videoBreakdown.queries");

module.exports = {
  db,
  services: {
    executiveOverview: executiveOverviewService,
    contentQuality: contentQualityService,
    videoBreakdown: videoBreakdownService,
  },
  controllers: {
    executiveOverview: executiveOverviewController,
    contentQuality: contentQualityController,
    videoBreakdown: videoBreakdownController,
  },
  routes: {
    executiveOverview: executiveOverviewRoutes,
    contentQuality: contentQualityRoutes,
    videoBreakdown: videoBreakdownRoutes,
    script: scriptRoutes,
  },
  queries: {
    sentiment: sentimentQueries,
    timeline: timelineQueries,
    metrics: metricsQueries,
    category: categoryQueries,
    contentQuality: contentQualityQueries,
    videoBreakdown: videoBreakdownQueries,
  },
};

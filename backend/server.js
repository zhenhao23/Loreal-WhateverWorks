require("dotenv").config();
const express = require("express");
const cors = require("cors");
const scriptRoutes = require("./routes/scriptRoutes");
const executiveOverviewRoutes = require("./routes/executiveOverview.routes");
const contentQualityRoutes = require("./routes/contentQuality.routes");
const videoBreakdownRoutes = require("./routes/videoBreakdown.routes");
const channelsRoutes = require("./routes/channels.routes");
const influencerIntelligenceRoutes = require("./routes/influencerIntelligence.routes");
const commentsRoutes = require("./routes/comments.routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", scriptRoutes);
app.use("/api/executive-overview", executiveOverviewRoutes);
app.use("/api/content-quality-kpi", contentQualityRoutes);
app.use("/api/video-breakdown", videoBreakdownRoutes);
app.use("/api/channels", channelsRoutes);
app.use("/api/influencer-intelligence", influencerIntelligenceRoutes);
app.use("/api/comments", commentsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);

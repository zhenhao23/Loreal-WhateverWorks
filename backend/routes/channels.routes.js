const express = require("express");
const {
  getTopChannelsController,
  getChannelDetailsController,
} = require("../controllers/channels.controller");

const router = express.Router();

/**
 * Channel Analytics Routes
 */

// GET /api/channels/top - Get top channels by engagement
router.get("/top", getTopChannelsController);

// GET /api/channels/:channelId - Get detailed analytics for a specific channel
router.get("/:channelId", getChannelDetailsController);

module.exports = router;

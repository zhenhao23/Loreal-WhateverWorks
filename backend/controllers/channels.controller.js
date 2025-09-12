const {
  getTopChannels,
  getChannelDetails,
} = require("../services/channels.service");

/**
 * Channel Analytics Controller
 * HTTP request handlers for channel-related endpoints
 */

/**
 * Get top channels by engagement
 */
async function getTopChannelsController(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 3;

    if (limit > 10) {
      return res.status(400).json({
        success: false,
        error: "Limit cannot exceed 10 channels",
      });
    }

    const topChannels = await getTopChannels(limit);

    res.json({
      success: true,
      data: topChannels,
      count: topChannels.length,
    });
  } catch (error) {
    console.error("Error in getTopChannelsController:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error while fetching top channels",
    });
  }
}

/**
 * Get detailed analytics for a specific channel
 */
async function getChannelDetailsController(req, res) {
  try {
    const { channelId } = req.params;

    if (!channelId) {
      return res.status(400).json({
        success: false,
        error: "Channel ID is required",
      });
    }

    const channelDetails = await getChannelDetails(channelId);

    if (!channelDetails) {
      return res.status(404).json({
        success: false,
        error: "Channel not found or no data available",
      });
    }

    res.json({
      success: true,
      data: channelDetails,
    });
  } catch (error) {
    console.error("Error in getChannelDetailsController:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error while fetching channel details",
    });
  }
}

module.exports = {
  getTopChannelsController,
  getChannelDetailsController,
};

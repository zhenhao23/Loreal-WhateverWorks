const {
  getInfluencerIntelligenceData,
} = require("../services/influencerIntelligence.service");

/**
 * Get influencer intelligence data
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getInfluencerIntelligence(req, res) {
  try {
    const filters = req.body || {};

    console.log("Getting influencer intelligence data with filters:", filters);

    const result = await getInfluencerIntelligenceData(filters);

    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json({
        success: false,
        error: result.error || "Failed to fetch influencer intelligence data",
        data: null,
      });
    }
  } catch (error) {
    console.error("Error in getInfluencerIntelligence controller:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
      data: null,
    });
  }
}

module.exports = {
  getInfluencerIntelligence,
};

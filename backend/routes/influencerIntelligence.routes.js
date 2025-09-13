const express = require("express");
const {
  getInfluencerIntelligence,
} = require("../controllers/influencerIntelligence.controller");

const router = express.Router();

/**
 * @route POST /api/influencer-intelligence
 * @desc Get influencer intelligence data including highest potential category
 * @access Public
 */
router.post("/", getInfluencerIntelligence);

module.exports = router;

const pool = require("../db");

/**
 * Get sentiment distribution data
 * Returns the count and percentage of positive, negative, and neutral sentiments
 */
async function getSentimentData(filters = {}) {
  try {
    // TODO: Implement SQL query for sentiment distribution
    // Should return: sentiment, count, percentage
    // Should support filters: dateFrom, dateTo, category, language

    const query = `
      -- TODO: Add SQL query here
      SELECT 1 as placeholder
    `;

    const result = await pool.query(query, []);
    return result.rows;
  } catch (error) {
    console.error("Error fetching sentiment data:", error);
    throw error;
  }
}

/**
 * Calculate overall sentiment score (1-5 scale)
 */
async function getOverallSentimentScore(filters = {}) {
  try {
    // TODO: Implement SQL query for overall sentiment score calculation
    // Should return: avg_score (1-5 scale)
    // Should support filters: dateFrom, dateTo, category, language

    const query = `
      -- TODO: Add SQL query here
      SELECT 1 as placeholder
    `;

    const result = await pool.query(query, []);
    return parseFloat(result.rows[0].avg_score) || 3.0;
  } catch (error) {
    console.error("Error calculating overall sentiment score:", error);
    throw error;
  }
}

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = {
  getSentimentData,
  getOverallSentimentScore,
};

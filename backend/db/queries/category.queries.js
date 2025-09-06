const pool = require("../db");

/**
 * Get category distribution data
 * Returns the count and percentage of feedback by category
 */
async function getCategoryData(filters = {}) {
  try {
    // TODO: Implement SQL query for category distribution
    // Should return: category, count, percentage
    // Should support filters: dateFrom, dateTo, language

    const query = `
      -- TODO: Add SQL query here
      SELECT 1 as placeholder
    `;

    const result = await pool.query(query, []);
    return result.rows;
  } catch (error) {
    console.error("Error fetching category data:", error);
    throw error;
  }
}

/**
 * Get detailed category breakdown with sentiment analysis
 */
async function getCategoryBreakdown(filters = {}) {
  try {
    // TODO: Implement SQL query for detailed category breakdown
    // Should return: category, total_count, positive_count, neutral_count, negative_count, avg_sentiment_score
    // Should support filters: dateFrom, dateTo, language

    const query = `
      -- TODO: Add SQL query here
      SELECT 1 as placeholder
    `;

    const result = await pool.query(query, []);
    return result.rows;
  } catch (error) {
    console.error("Error fetching category breakdown:", error);
    throw error;
  }
}

/**
 * Get top categories by engagement (likes, comments, etc.)
 */
async function getTopCategoriesByEngagement(filters = {}) {
  try {
    // TODO: Implement SQL query for top categories by engagement
    // Should return: category, comment_count, avg_likes, avg_replies, total_likes, total_replies
    // Should support filters: dateFrom, dateTo, language

    const query = `
      -- TODO: Add SQL query here
      SELECT 1 as placeholder
    `;

    const result = await pool.query(query, []);
    return result.rows;
  } catch (error) {
    console.error("Error fetching top categories by engagement:", error);
    throw error;
  }
}

function capitalizeWords(str) {
  if (!str) return str;
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

module.exports = {
  getCategoryData,
  getCategoryBreakdown,
  getTopCategoriesByEngagement,
};

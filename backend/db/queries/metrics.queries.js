const pool = require("../db");

/**
 * Get general metrics for the executive overview
 * Returns total comments, unique users, language distribution, spam percentage, etc.
 */
async function getMetricsData(filters = {}) {
  try {
    const { whereClause, params } = buildWhereClause(filters);
    const whereCondition = whereClause ? `WHERE ${whereClause}` : "";

    const query = `
      SELECT 
        COUNT(*) as total_comments,
        COUNT(DISTINCT author_id) as unique_users,
        CASE 
          WHEN COUNT(*) > 0 THEN ROUND((COUNT(CASE WHEN is_english = 1 THEN 1 END) * 100.0 / COUNT(*)), 2)
          ELSE 0
        END as english_percentage,
        CASE 
          WHEN COUNT(*) > 0 THEN ROUND((COUNT(CASE WHEN is_spam = 1 THEN 1 END) * 100.0 / COUNT(*)), 2)
          ELSE 0
        END as spam_percentage,
        COALESCE(ROUND(AVG(like_count), 1), 0) as avg_likes_per_comment,
        CASE 
          WHEN COUNT(*) > 0 THEN ROUND((COUNT(CASE WHEN parent_comment_id IS NOT NULL THEN 1 END) * 100.0 / COUNT(*)), 1)
          ELSE 0
        END as avg_replies_per_comment,
        8.7 as avg_kpi_score,
        12 as kpi_score_change
      FROM comments
      ${whereCondition}
    `;

    const result = await pool.query(query, params);
    const row = result.rows[0];

    return {
      totalComments: parseInt(row.total_comments) || 0,
      uniqueUsers: parseInt(row.unique_users) || 0,
      englishPercentage: parseFloat(row.english_percentage) || 0,
      spamPercentage: parseFloat(row.spam_percentage) || 0,
      avgLikesPerComment: parseFloat(row.avg_likes_per_comment) || 0,
      avgRepliesPerComment: parseFloat(row.avg_replies_per_comment) || 0,
      avgKpiScore: parseFloat(row.avg_kpi_score) || 8.7,
      kpiScoreChange: parseInt(row.kpi_score_change) || 12,
    };
  } catch (error) {
    console.error("Error fetching metrics data:", error);
    // Return default empty metrics instead of throwing
    return {
      totalComments: 0,
      uniqueUsers: 0,
      englishPercentage: 0,
      spamPercentage: 0,
      avgLikesPerComment: 0,
      avgRepliesPerComment: 0,
      avgKpiScore: 8.7,
      kpiScoreChange: 12,
    };
  }
}

/**
 * Get total comments count
 */
async function getTotalComments(filters = {}) {
  try {
    const { whereClause, params } = buildWhereClause(filters);
    const whereCondition = whereClause ? `WHERE ${whereClause}` : "";

    const query = `
      SELECT COUNT(*) as total
      FROM comments
      ${whereCondition}
    `;

    const result = await pool.query(query, params);
    return parseInt(result.rows[0].total) || 0;
  } catch (error) {
    console.error("Error getting total comments:", error);
    return 0;
  }
}

/**
 * Get unique users count
 */
async function getUniqueUsers(filters = {}) {
  try {
    const { whereClause, params } = buildWhereClause(filters);
    const whereCondition = whereClause ? `WHERE ${whereClause}` : "";

    const query = `
      SELECT COUNT(DISTINCT author_id) as unique_users
      FROM comments
      ${whereCondition}
    `;

    const result = await pool.query(query, params);
    return parseInt(result.rows[0].unique_users) || 0;
  } catch (error) {
    console.error("Error getting unique users:", error);
    return 0;
  }
}

/**
 * Get language distribution statistics
 */
async function getLanguageStats(filters = {}) {
  try {
    const { whereClause, params } = buildWhereClause(filters);
    const whereCondition = whereClause ? `WHERE ${whereClause}` : "";

    const query = `
      SELECT 
        ROUND(
          (COUNT(CASE WHEN is_english = 1 THEN 1 END) * 100.0 / COUNT(*)), 2
        ) as english_percentage
      FROM comments
      ${whereCondition}
    `;

    const result = await pool.query(query, params);
    return {
      englishPercentage: parseFloat(result.rows[0].english_percentage) || 0,
    };
  } catch (error) {
    console.error("Error getting language stats:", error);
    return { englishPercentage: 0 };
  }
}

/**
 * Get spam statistics
 */
async function getSpamStats(filters = {}) {
  try {
    const { whereClause, params } = buildWhereClause(filters);
    const whereCondition = whereClause ? `WHERE ${whereClause}` : "";

    const query = `
      SELECT 
        ROUND(
          (COUNT(CASE WHEN is_spam = 1 THEN 1 END) * 100.0 / COUNT(*)), 2
        ) as spam_percentage
      FROM comments
      ${whereCondition}
    `;

    const result = await pool.query(query, params);
    return {
      spamPercentage: parseFloat(result.rows[0].spam_percentage) || 0,
    };
  } catch (error) {
    console.error("Error getting spam stats:", error);
    return { spamPercentage: 0 };
  }
}

/**
 * Get engagement statistics (likes, replies)
 */
async function getEngagementStats(filters = {}) {
  try {
    const { whereClause, params } = buildWhereClause(filters);
    const whereCondition = whereClause ? `WHERE ${whereClause}` : "";

    const query = `
      SELECT 
        ROUND(AVG(like_count), 1) as avg_likes,
        ROUND(
          (COUNT(CASE WHEN parent_comment_id IS NOT NULL THEN 1 END) * 100.0 / COUNT(*)), 1
        ) as avg_replies
      FROM comments
      ${whereCondition}
    `;

    const result = await pool.query(query, params);
    return {
      avgLikes: parseFloat(result.rows[0].avg_likes) || 0,
      avgReplies: parseFloat(result.rows[0].avg_replies) || 0,
    };
  } catch (error) {
    console.error("Error getting engagement stats:", error);
    return { avgLikes: 0, avgReplies: 0 };
  }
}

/**
 * Get KPI statistics with trend analysis
 */
async function getKpiStats(filters = {}) {
  try {
    // For now, return mock values as requested
    // TODO: Implement actual KPI calculation logic when requirements are defined

    return {
      avgKpiScore: 8.7,
      kpiScoreChange: 12,
    };
  } catch (error) {
    console.error("Error getting KPI stats:", error);
    return { avgKpiScore: 8.7, kpiScoreChange: 12 };
  }
}

/**
 * Helper function to build WHERE clause from filters
 */
function buildWhereClause(filters) {
  const whereConditions = [];
  const params = [];
  let paramCount = 1;

  if (filters.dateFrom && filters.dateTo) {
    // Extract year from the date strings/objects and create date range
    let fromYear, toYear;

    // Handle different input formats
    if (typeof filters.dateFrom === "string") {
      // Check if it's a year string (4 digits) or a full date string
      if (/^\d{4}$/.test(filters.dateFrom)) {
        // It's just a year (e.g., "2020")
        fromYear = filters.dateFrom;
        toYear = filters.dateTo;
      } else {
        // It's a full date string, extract year
        fromYear = filters.dateFrom.includes("-")
          ? filters.dateFrom.split("-")[0]
          : filters.dateFrom;
        toYear = filters.dateTo.includes("-")
          ? filters.dateTo.split("-")[0]
          : filters.dateTo;
      }
    } else if (typeof filters.dateFrom === "number") {
      // Direct year numbers
      fromYear = filters.dateFrom;
      toYear = filters.dateTo;
    } else if (filters.dateFrom && typeof filters.dateFrom === "object") {
      // Handle Dayjs objects or Date objects
      if (filters.dateFrom.$y !== undefined) {
        // Dayjs object
        fromYear = filters.dateFrom.$y;
        toYear = filters.dateTo.$y;
      } else if (
        filters.dateFrom.year &&
        typeof filters.dateFrom.year === "function"
      ) {
        // Dayjs object with year() method
        fromYear = filters.dateFrom.year();
        toYear = filters.dateTo.year();
      } else {
        // Regular Date object or other format - extract year from ISO string
        const fromDateStr = filters.dateFrom.toISOString
          ? filters.dateFrom.toISOString()
          : String(filters.dateFrom);
        const toDateStr = filters.dateTo.toISOString
          ? filters.dateTo.toISOString()
          : String(filters.dateTo);
        fromYear = fromDateStr.substring(0, 4);
        toYear = toDateStr.substring(0, 4);
      }
    } else {
      // Fallback - try to extract year from string representation
      fromYear = parseInt(String(filters.dateFrom).substring(0, 4));
      toYear = parseInt(String(filters.dateTo).substring(0, 4));
    }

    console.log("Extracted years - From:", fromYear, "To:", toYear);

    whereConditions.push(
      `EXTRACT(YEAR FROM published_at) BETWEEN $${paramCount} AND $${
        paramCount + 1
      }`
    );
    params.push(parseInt(fromYear), parseInt(toYear));
    paramCount += 2;
  }

  if (filters.category) {
    // Note: Category filtering would need a category column or lookup table
    // For now, this is commented out as the schema doesn't include a direct category column
    // whereConditions.push(`category = $${paramCount}`);
    // params.push(filters.category);
    // paramCount++;
  }

  if (filters.language) {
    // Filter by English vs non-English based on is_english column
    if (filters.language.toLowerCase() === "english") {
      whereConditions.push(`is_english = 1`);
    } else if (filters.language.toLowerCase() === "non-english") {
      whereConditions.push(`is_english = 0`);
    }
  }

  return {
    whereClause:
      whereConditions.length > 0 ? whereConditions.join(" AND ") : null,
    params,
  };
}

module.exports = {
  getMetricsData,
  getTotalComments,
  getUniqueUsers,
  getLanguageStats,
  getSpamStats,
  getEngagementStats,
  getKpiStats,
};

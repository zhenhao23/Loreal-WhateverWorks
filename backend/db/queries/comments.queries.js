const pool = require("../db");

/**
 * Comments Analysis Queries
 * SQL queries for comment quality analysis, top comments, and comment insights
 */

/**
 * Get top quality comments with highest KPI scores
 * Now supports pagination
 */
async function getTopComments(filters = {}, pagination = {}) {
  try {
    const { page = 1, pageSize = 10 } = pagination;
    const offset = (page - 1) * pageSize;

    const { whereClause, params } = buildWhereClause(filters);
    const whereCondition = whereClause ? `WHERE ${whereClause}` : "";

    // First, get the total count
    const countQuery = `
      SELECT COUNT(*) as total
      FROM comments c
      LEFT JOIN videos v ON c.video_id = v.video_id
      ${whereCondition}
      AND c.text_original IS NOT NULL 
      AND TRIM(c.text_original) != ''
      AND c.kpi IS NOT NULL
    `;

    const countResult = await pool.query(countQuery, params);
    const total = parseInt(countResult.rows[0].total) || 0;

    const query = `
      WITH comment_with_sentiment AS (
        SELECT 
          c.comment_id,
          c.text_original,
          ROUND(c.kpi * 10, 1) as kpi_score,
          c.like_count,
          c.aspect,
          CASE 
            WHEN c.positive > c.negative AND c.positive > c.neutral THEN 'positive'
            WHEN c.negative > c.positive AND c.negative > c.neutral THEN 'negative'
            ELSE 'neutral'
          END as sentiment
        FROM comments c
        LEFT JOIN videos v ON c.video_id = v.video_id
        ${whereCondition}
        AND c.text_original IS NOT NULL 
        AND TRIM(c.text_original) != ''
        AND c.kpi IS NOT NULL
      ),
      comment_with_replies AS (
        SELECT 
          cws.*,
          COALESCE(reply_counts.reply_count, 0) as replies
        FROM comment_with_sentiment cws
        LEFT JOIN (
          SELECT 
            parent_comment_id,
            COUNT(*) as reply_count
          FROM comments 
          WHERE parent_comment_id IS NOT NULL
          GROUP BY parent_comment_id
        ) reply_counts ON cws.comment_id = reply_counts.parent_comment_id
      )
      SELECT 
        text_original as comment,
        sentiment,
        kpi_score as "kpiScore",
        like_count as likes,
        replies,
        comment_id as key,
        aspect
      FROM comment_with_replies
      ORDER BY kpi_score DESC, like_count DESC
      LIMIT $${params.length + 1} OFFSET $${params.length + 2}
    `;

    const paginatedParams = [...params, pageSize, offset];
    const result = await pool.query(query, paginatedParams);

    // Return paginated response format
    return {
      data: result.rows || [],
      current: page,
      pageSize: pageSize,
      total: total,
      totalPages: Math.ceil(total / pageSize),
    };
  } catch (error) {
    console.error("Error fetching top comments:", error);
    // Return paginated format even on error
    return {
      data: [],
      current: page,
      pageSize: pageSize,
      total: 0,
      totalPages: 0,
    };
  }
}

/**
 * Get comment quality analysis
 */
async function getCommentQualityAnalysis(filters = {}) {
  try {
    // TODO: Implement SQL query for comment quality analysis
    // Should return quality metrics, length analysis, engagement correlation
    // Should support filters: dateFrom, dateTo, category, language

    const query = `
      -- TODO: Add SQL query here
      SELECT 1 as placeholder
    `;

    const result = await pool.query(query, []);
    return result.rows;
  } catch (error) {
    console.error("Error fetching comment quality analysis:", error);
    throw error;
  }
}

/**
 * Get comment engagement metrics
 */
async function getCommentEngagementMetrics(filters = {}) {
  try {
    // TODO: Implement SQL query for comment engagement metrics
    // Should return likes, replies, shares distribution and averages
    // Should support filters: dateFrom, dateTo, category, language

    const query = `
      -- TODO: Add SQL query here
      SELECT 1 as placeholder
    `;

    const result = await pool.query(query, []);
    return result.rows;
  } catch (error) {
    console.error("Error fetching comment engagement metrics:", error);
    throw error;
  }
}

/**
 * Get comment length analysis
 */
async function getCommentLengthAnalysis(filters = {}) {
  try {
    // TODO: Implement SQL query for comment length analysis
    // Should return length distribution, optimal length insights
    // Should support filters: dateFrom, dateTo, category, language

    const query = `
      -- TODO: Add SQL query here
      SELECT 1 as placeholder
    `;

    const result = await pool.query(query, []);
    return result.rows;
  } catch (error) {
    console.error("Error fetching comment length analysis:", error);
    throw error;
  }
}

/**
 * Helper function to build WHERE clause from filters
 * This is extensible for additional filters in the future
 */
function buildWhereClause(filters) {
  const whereConditions = [];
  const params = [];
  let paramCount = 1;

  // Date filter (year-based)
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

    console.log("Comments - Extracted years - From:", fromYear, "To:", toYear);

    whereConditions.push(
      `EXTRACT(YEAR FROM v.published_at) BETWEEN $${paramCount} AND $${
        paramCount + 1
      }`
    );
    params.push(parseInt(fromYear), parseInt(toYear));
    paramCount += 2;
  }

  // Category filter using topic_label from videos table
  if (filters.category && filters.category !== "all") {
    console.log("Comments - Applying category filter:", filters.category);
    whereConditions.push(`LOWER(v.topic_label) = $${paramCount}`);
    params.push(filters.category.toLowerCase());
    paramCount++;
  }

  // Sentiment filter based on highest value among negative, neutral, positive columns
  if (filters.sentiment && filters.sentiment !== "all") {
    console.log("Comments - Applying sentiment filter:", filters.sentiment);

    let sentimentCondition;
    switch (filters.sentiment.toLowerCase()) {
      case "negative":
        sentimentCondition = `(c.negative > c.neutral AND c.negative > c.positive)`;
        break;
      case "neutral":
        sentimentCondition = `(c.neutral > c.negative AND c.neutral > c.positive)`;
        break;
      case "positive":
        sentimentCondition = `(c.positive > c.negative AND c.positive > c.neutral)`;
        break;
      default:
        sentimentCondition = null;
    }

    if (sentimentCondition) {
      whereConditions.push(sentimentCondition);
    }
  }

  return {
    whereClause:
      whereConditions.length > 0 ? whereConditions.join(" AND ") : null,
    params,
  };
}

module.exports = {
  getTopComments,
  getCommentQualityAnalysis,
  getCommentEngagementMetrics,
  getCommentLengthAnalysis,
};

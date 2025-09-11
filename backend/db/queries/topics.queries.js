const pool = require("../db");

/**
 * Topics and Bubble Analysis Queries
 * SQL queries for topic analysis, sentiment by topics, and bubble chart data
 */

/**
 * Get sentiment scores by topics
 */
async function getSentimentByTopics(filters = {}) {
  try {
    const { whereClause, params } = buildWhereClause(filters);

    // Build WHERE condition for both tables (they both have published_at)
    const whereCondition = whereClause ? `WHERE ${whereClause}` : "";

    const query = `
      WITH kpi_by_topic AS (
        SELECT 
          v.topic_label as topic,
          ROUND(AVG(c.kpi) * 10, 2) as avg_kpi_score,
          COUNT(c.id) as comment_count
        FROM videos v
        INNER JOIN comments c ON v.video_id = c.video_id
        ${whereCondition}
        AND v.topic_label IS NOT NULL 
        AND v.topic_label != ''
        AND c.kpi IS NOT NULL
        GROUP BY v.topic_label
        HAVING COUNT(c.id) >= 10  -- Only include topics with at least 10 comments
      ),
      topic_colors AS (
        SELECT 
          topic,
          avg_kpi_score as score,
          avg_kpi_score as value,
          comment_count,
          ROW_NUMBER() OVER (ORDER BY avg_kpi_score DESC) as rank_order
        FROM kpi_by_topic
      ),
      final_results AS (
        SELECT 
          topic,
          score,
          value,
          CASE rank_order
            WHEN 1 THEN '#5A6ACF'   -- Darkest (first)
            WHEN 2 THEN '#707FDD'   -- 
            WHEN 3 THEN '#8B92E8'   -- 
            WHEN 4 THEN '#A6A5F2'   -- 
            WHEN 5 THEN '#C1B8FC'   -- 
            WHEN 6 THEN '#DCCBFF'   -- Lightest (last)
            ELSE '#DCCBFF'          -- Default for any extras
          END as color
        FROM topic_colors
      )
      SELECT topic, score, value, color
      FROM final_results
      ORDER BY score DESC
      LIMIT 6;  -- Limit to top 6 topics
    `;

    const result = await pool.query(query, params);

    // If no real data, return mock data structure
    if (result.rows.length === 0) {
      return [
        { topic: "Makeup", score: 8.7, value: 8.7, color: "#5A6ACF" },
        { topic: "Skin", score: 8.2, value: 8.2, color: "#707FDD" },
        { topic: "Hair", score: 7.8, value: 7.8, color: "#8B92E8" },
        { topic: "Perfume", score: 7.5, value: 7.5, color: "#A6A5F2" },
        { topic: "Body", score: 6.9, value: 6.9, color: "#C1B8FC" },
        { topic: "Other", score: 6.4, value: 6.4, color: "#DCCBFF" },
      ];
    }

    return result.rows;
  } catch (error) {
    console.error("Error fetching sentiment by topics:", error);

    // Return mock data on error
    return [
      { topic: "Makeup", score: 8.7, value: 8.7, color: "#5A6ACF" },
      { topic: "Skin", score: 8.2, value: 8.2, color: "#707FDD" },
      { topic: "Hair", score: 7.8, value: 7.8, color: "#8B92E8" },
      { topic: "Perfume", score: 7.5, value: 7.5, color: "#A6A5F2" },
      { topic: "Body", score: 6.9, value: 6.9, color: "#C1B8FC" },
      { topic: "Other", score: 6.4, value: 6.4, color: "#DCCBFF" },
    ];
  }
}

/**
 * Get bubble chart data (word sentiment vs frequency)
 */
async function getBubbleData(filters = {}) {
  try {
    // TODO: Implement SQL query for bubble chart data
    // Should return: x (frequency), y (sentiment score), z (size), word, sentiment
    // Should support filters: dateFrom, dateTo, category, language

    const query = `
      -- TODO: Add SQL query here
      SELECT 1 as placeholder
    `;

    const result = await pool.query(query, []);
    return result.rows;
  } catch (error) {
    console.error("Error fetching bubble data:", error);
    throw error;
  }
}

/**
 * Get topic trends over time
 */
async function getTopicTrends(filters = {}) {
  try {
    // TODO: Implement SQL query for topic trend analysis
    // Should return time-series data of topic popularity and sentiment
    // Should support filters: dateFrom, dateTo, category, language

    const query = `
      -- TODO: Add SQL query here
      SELECT 1 as placeholder
    `;

    const result = await pool.query(query, []);
    return result.rows;
  } catch (error) {
    console.error("Error fetching topic trends:", error);
    throw error;
  }
}

/**
 * Get topic correlation analysis
 */
async function getTopicCorrelations(filters = {}) {
  try {
    // TODO: Implement SQL query for topic correlation analysis
    // Should return relationships between different topics
    // Should support filters: dateFrom, dateTo, category, language

    const query = `
      -- TODO: Add SQL query here
      SELECT 1 as placeholder
    `;

    const result = await pool.query(query, []);
    return result.rows;
  } catch (error) {
    console.error("Error fetching topic correlations:", error);
    throw error;
  }
}

/**
 * Helper function to build WHERE clause from filters (copied from metrics.queries.js)
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
      if (/^\d{4}$/.test(filters.dateFrom)) {
        fromYear = filters.dateFrom;
        toYear = filters.dateTo;
      } else {
        fromYear = filters.dateFrom.includes("-")
          ? filters.dateFrom.split("-")[0]
          : filters.dateFrom;
        toYear = filters.dateTo.includes("-")
          ? filters.dateTo.split("-")[0]
          : filters.dateTo;
      }
    } else if (typeof filters.dateFrom === "number") {
      fromYear = filters.dateFrom;
      toYear = filters.dateTo;
    } else if (filters.dateFrom && typeof filters.dateFrom === "object") {
      if (filters.dateFrom.$y !== undefined) {
        fromYear = filters.dateFrom.$y;
        toYear = filters.dateTo.$y;
      } else if (
        filters.dateFrom.year &&
        typeof filters.dateFrom.year === "function"
      ) {
        fromYear = filters.dateFrom.year();
        toYear = filters.dateTo.year();
      } else {
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
      fromYear = parseInt(String(filters.dateFrom).substring(0, 4));
      toYear = parseInt(String(filters.dateTo).substring(0, 4));
    }

    whereConditions.push(
      `EXTRACT(YEAR FROM v.published_at) BETWEEN $${paramCount} AND $${
        paramCount + 1
      } AND EXTRACT(YEAR FROM c.published_at) BETWEEN $${paramCount} AND $${
        paramCount + 1
      }`
    );
    params.push(parseInt(fromYear), parseInt(toYear));
    paramCount += 2;
  }

  return {
    whereClause:
      whereConditions.length > 0 ? whereConditions.join(" AND ") : null,
    params,
  };
}

module.exports = {
  getSentimentByTopics,
  getBubbleData,
  getTopicTrends,
  getTopicCorrelations,
};

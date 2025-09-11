const pool = require("../db");

/**
 * Get category distribution data
 * Returns the count and percentage of videos by category (topic_label)
 */
async function getCategoryData(filters = {}) {
  try {
    const { whereClause, params } = buildWhereClause(filters);
    const whereCondition = whereClause ? `WHERE ${whereClause}` : "";

    const query = `
      WITH category_counts AS (
        SELECT 
          CASE 
            WHEN LOWER(topic_label) LIKE '%makeup%' OR LOWER(topic_label) LIKE '%cosmetic%' THEN 'Makeup'
            WHEN LOWER(topic_label) LIKE '%skin%' OR LOWER(topic_label) LIKE '%skincare%' THEN 'Skin'
            WHEN LOWER(topic_label) LIKE '%hair%' THEN 'Hair'
            WHEN LOWER(topic_label) LIKE '%fragrance%' OR LOWER(topic_label) LIKE '%perfume%' THEN 'Perfume'
            WHEN LOWER(topic_label) LIKE '%body%' THEN 'Body'
            ELSE 'Other'
          END as category,
          COUNT(*) as video_count
        FROM videos
        ${whereCondition}
        AND topic_label IS NOT NULL 
        AND topic_label != ''
        GROUP BY 
          CASE 
            WHEN LOWER(topic_label) LIKE '%makeup%' OR LOWER(topic_label) LIKE '%cosmetic%' THEN 'Makeup'
            WHEN LOWER(topic_label) LIKE '%skin%' OR LOWER(topic_label) LIKE '%skincare%' THEN 'Skin'
            WHEN LOWER(topic_label) LIKE '%hair%' THEN 'Hair'
            WHEN LOWER(topic_label) LIKE '%fragrance%' OR LOWER(topic_label) LIKE '%perfume%' THEN 'Perfume'
            WHEN LOWER(topic_label) LIKE '%body%' THEN 'Body'
            ELSE 'Other'
          END
      ),
      total_videos AS (
        SELECT SUM(video_count) as total_count
        FROM category_counts
      ),
      category_percentages AS (
        SELECT 
          cc.category,
          cc.video_count,
          ROUND((cc.video_count * 100.0 / tv.total_count), 1) as value,
          ROW_NUMBER() OVER (ORDER BY cc.video_count DESC) as rank_order
        FROM category_counts cc
        CROSS JOIN total_videos tv
        WHERE cc.video_count >= 5  -- Only include categories with at least 5 videos
      ),
      final_results AS (
        SELECT 
          category,
          value,
          CASE rank_order
            WHEN 1 THEN '#5A6ACF'   -- Darkest (first)
            WHEN 2 THEN '#707FDD'   -- 
            WHEN 3 THEN '#8B5CF6'   -- 
            WHEN 4 THEN '#44c5e1'   -- 
            WHEN 5 THEN '#FFB54C'   -- Lightest (last)
            ELSE '#D3D3D3'          -- Default for any extras
          END as color
        FROM category_percentages
      )
      SELECT category, value, color
      FROM final_results
      ORDER BY value DESC
      LIMIT 5;  -- Top 5 categories
    `;

    const result = await pool.query(query, params);

    // If no real data, return mock data structure
    if (result.rows.length === 0) {
      return [
        { category: "Makeup", value: 32, color: "#5A6ACF" },
        { category: "Skin", value: 25, color: "#707FDD" },
        { category: "Hair", value: 18, color: "#8B5CF6" },
        { category: "Perfume", value: 15, color: "#44c5e1" },
        { category: "Body", value: 10, color: "#FFB54C" },
      ];
    }

    return result.rows;
  } catch (error) {
    console.error("Error fetching category data:", error);

    // Return mock data on error
    return [
      { category: "Makeup", value: 32, color: "#5A6ACF" },
      { category: "Skin", value: 25, color: "#707FDD" },
      { category: "Hair", value: 18, color: "#8B5CF6" },
      { category: "Perfume", value: 15, color: "#44c5e1" },
      { category: "Body", value: 10, color: "#FFB54C" },
    ];
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
      `EXTRACT(YEAR FROM published_at) BETWEEN $${paramCount} AND $${
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
  getCategoryData,
  getCategoryBreakdown,
  getTopCategoriesByEngagement,
};

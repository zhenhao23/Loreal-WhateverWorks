const pool = require("../db");

/**
 * Get sentiment distribution data
 * Returns the count and percentage of positive, negative, and neutral sentiments
 */
async function getSentimentData(filters = {}) {
  try {
    const { whereClause, params } = buildWhereClause(filters);
    const whereCondition = whereClause ? `WHERE ${whereClause}` : "";

    const query = `
      WITH sentiment_classification AS (
        SELECT 
          CASE 
            WHEN positive > negative AND positive > neutral THEN 'Positive'
            WHEN negative > positive AND negative > neutral THEN 'Negative'
            ELSE 'Neutral'
          END as sentiment_type
        FROM comments
        ${whereCondition}
      ),
      sentiment_counts AS (
        SELECT 
          sentiment_type,
          COUNT(*) as count
        FROM sentiment_classification
        GROUP BY sentiment_type
      ),
      total_count AS (
        SELECT COUNT(*) as total FROM comments ${whereCondition}
      ),
      all_sentiments AS (
        SELECT unnest(ARRAY['Negative', 'Neutral', 'Positive']) as sentiment_type
      )
      SELECT 
        a.sentiment_type as type,
        COALESCE(sc.count, 0) as value,
        CASE 
          WHEN tc.total > 0 THEN ROUND((COALESCE(sc.count, 0) * 100.0 / tc.total), 0)::INTEGER
          ELSE 0
        END as percentage_numeric,
        CASE 
          WHEN tc.total > 0 THEN ROUND((COALESCE(sc.count, 0) * 100.0 / tc.total), 0)::INTEGER || '%'
          ELSE '0%'
        END as percentage
      FROM all_sentiments a
      LEFT JOIN sentiment_counts sc ON a.sentiment_type = sc.sentiment_type
      CROSS JOIN total_count tc
      ORDER BY 
        CASE a.sentiment_type 
          WHEN 'Negative' THEN 1 
          WHEN 'Neutral' THEN 2 
          WHEN 'Positive' THEN 3 
        END
    `;

    const result = await pool.query(query, params);
    return result.rows || [];
  } catch (error) {
    console.error("Error fetching sentiment data:", error);
    // Return default empty data structure instead of throwing
    return [
      { type: "Negative", value: 0, percentage_numeric: 0, percentage: "0%" },
      { type: "Neutral", value: 0, percentage_numeric: 0, percentage: "0%" },
      { type: "Positive", value: 0, percentage_numeric: 0, percentage: "0%" },
    ];
  }
}

/**
 * Calculate overall sentiment score (0-10 scale)
 * 0 = All negative, 5 = All neutral, 10 = All positive
 */
async function getOverallSentimentScore(filters = {}) {
  try {
    const { whereClause, params } = buildWhereClause(filters);
    const whereCondition = whereClause ? `WHERE ${whereClause}` : "";

    const query = `
      WITH sentiment_scores AS (
        SELECT 
          CASE 
            WHEN positive > negative AND positive > neutral THEN 10.0  -- Positive = 10
            WHEN negative > positive AND negative > neutral THEN 0.0   -- Negative = 0
            ELSE 5.0  -- Neutral = 5
          END as score
        FROM comments
        ${whereCondition}
      )
      SELECT 
        COALESCE(ROUND(AVG(score), 1), 5.0) as avg_score
      FROM sentiment_scores
    `;

    const result = await pool.query(query, params);
    const avgScore = result.rows[0]?.avg_score;
    return avgScore !== null ? parseFloat(avgScore) : 5.0;
  } catch (error) {
    console.error("Error calculating overall sentiment score:", error);
    return 5.0; // Default to neutral if error
  }
}

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
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
  getSentimentData,
  getOverallSentimentScore,
};

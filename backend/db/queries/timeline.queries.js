const pool = require("../db");

/**
 * Get timeline data showing sentiment trends over time
 * Returns monthly aggregated data with positive, negative, neutral counts and average sentiment
 */
async function getTimelineData(filters = {}) {
  try {
    const { whereClause, params } = buildWhereClause(filters);
    const whereCondition = whereClause ? `WHERE ${whereClause}` : "";

    const query = `
      WITH date_range AS (
        SELECT 
          generate_series(
            date_trunc('month', 
              CASE 
                WHEN $${params.length + 1}::text IS NOT NULL 
                THEN make_date($${params.length + 1}::int, 1, 1)
                ELSE date_trunc('year', CURRENT_DATE - interval '11 months')
              END
            ),
            date_trunc('month',
              CASE 
                WHEN $${params.length + 2}::text IS NOT NULL 
                THEN make_date($${params.length + 2}::int, 12, 31)
                ELSE date_trunc('year', CURRENT_DATE) + interval '11 months'
              END
            ),
            interval '1 month'
          ) as month_date
      ),
      monthly_sentiment AS (
        SELECT 
          date_trunc('month', v.published_at) as month_date,
          CASE 
            WHEN c.positive > c.negative AND c.positive > c.neutral THEN 'positive'
            WHEN c.negative > c.positive AND c.negative > c.neutral THEN 'negative'
            ELSE 'neutral'
          END as sentiment_type,
          CASE 
            WHEN c.positive > c.negative AND c.positive > c.neutral THEN 5.0
            WHEN c.negative > c.positive AND c.negative > c.neutral THEN 0.0
            ELSE 2.5
          END as sentiment_score
        FROM comments c
        LEFT JOIN videos v ON c.video_id = v.video_id
        ${whereCondition}
      ),
      monthly_counts AS (
        SELECT 
          ms.month_date,
          COUNT(CASE WHEN sentiment_type = 'positive' THEN 1 END) as positive,
          COUNT(CASE WHEN sentiment_type = 'neutral' THEN 1 END) as neutral,
          COUNT(CASE WHEN sentiment_type = 'negative' THEN 1 END) as negative,
          ROUND(AVG(sentiment_score) * 2, 1) as avg_sentiment -- Scale to 0-10 for UI
        FROM monthly_sentiment ms
        GROUP BY ms.month_date
      )
      SELECT 
        dr.month_date,
        TO_CHAR(dr.month_date, 'Mon YYYY') as month,
        COALESCE(mc.positive, 0) as positive,
        COALESCE(mc.neutral, 0) as neutral,
        COALESCE(mc.negative, 0) as negative,
        COALESCE(mc.avg_sentiment, 5.0) as "avgSentiment"
      FROM date_range dr
      LEFT JOIN monthly_counts mc ON dr.month_date = mc.month_date
      ORDER BY dr.month_date
    `;

    // Add year range parameters if they exist
    const queryParams = [...params];
    if (filters.dateFrom && filters.dateTo) {
      const fromYear = extractYear(filters.dateFrom);
      const toYear = extractYear(filters.dateTo);
      queryParams.push(fromYear, toYear);
    } else {
      queryParams.push(null, null);
    }

    const result = await pool.query(query, queryParams);
    return result.rows || [];
  } catch (error) {
    console.error("Error fetching timeline data:", error);
    // Return empty array for graceful handling
    return [];
  }
}

/**
 * Helper function to extract year from various date formats
 */
function extractYear(dateInput) {
  if (typeof dateInput === "string") {
    if (/^\d{4}$/.test(dateInput)) {
      return parseInt(dateInput);
    } else {
      return parseInt(dateInput.substring(0, 4));
    }
  } else if (typeof dateInput === "number") {
    return dateInput;
  } else if (dateInput && typeof dateInput === "object") {
    if (dateInput.$y !== undefined) {
      return dateInput.$y;
    } else if (dateInput.year && typeof dateInput.year === "function") {
      return dateInput.year();
    } else {
      const dateStr = dateInput.toISOString
        ? dateInput.toISOString()
        : String(dateInput);
      return parseInt(dateStr.substring(0, 4));
    }
  } else {
    return parseInt(String(dateInput).substring(0, 4));
  }
}

/**
 * Helper function to build WHERE clause from filters
 */
function buildWhereClause(filters) {
  const whereConditions = [];
  const params = [];
  let paramCount = 1;

  // Date filter (year-based)
  if (filters.dateFrom && filters.dateTo) {
    const fromYear = extractYear(filters.dateFrom);
    const toYear = extractYear(filters.dateTo);

    console.log("Timeline - Extracted years - From:", fromYear, "To:", toYear);

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
    console.log("Timeline - Applying category filter:", filters.category);
    whereConditions.push(`LOWER(v.topic_label) = $${paramCount}`);
    params.push(filters.category.toLowerCase());
    paramCount++;
  }

  // Sentiment filter based on highest value among negative, neutral, positive columns
  if (filters.sentiment && filters.sentiment !== "all") {
    console.log("Timeline - Applying sentiment filter:", filters.sentiment);

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
  getTimelineData,
};

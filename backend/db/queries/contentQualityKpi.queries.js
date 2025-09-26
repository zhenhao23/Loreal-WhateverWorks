const pool = require("../db");

/**
 * Get Content Quality KPI metrics
 * Returns KPI metrics for the content quality dashboard
 */
async function getContentQualityKPIMetrics(filters = {}) {
  try {
    const { whereClause, params } = buildWhereClause(filters);
    const whereCondition = whereClause ? `WHERE ${whereClause}` : "";

    // Get all KPI metrics in parallel for better performance
    const [
      avgKpiResult,
      minMaxKpiResult,
      highQualityResult,
      totalCommentsResult,
    ] = await Promise.all([
      // Avg KPI Score per Comment from comments table (with category filter via videos join)
      pool.query(
        `
        SELECT COALESCE(ROUND(AVG(c.kpi), 2), 0) * 10 as avg_kpi_score
        FROM comments c
        LEFT JOIN videos v ON c.video_id = v.video_id
        ${whereCondition}
      `,
        params
      ),

      // Min and Max KPI Scores from comments table (with category filter via videos join)
      pool.query(
        `
        SELECT 
          COALESCE(ROUND(MIN(c.kpi), 2), 0) * 10 as min_kpi_score,
          COALESCE(ROUND(MAX(c.kpi), 2), 0) * 10 as max_kpi_score
        FROM comments c
        LEFT JOIN videos v ON c.video_id = v.video_id
        ${whereCondition}
      `,
        params
      ),

      // High-Quality Comments (KPI >= 6) from comments table (with category filter via videos join)
      pool.query(
        `
        SELECT 
          COUNT(CASE WHEN c.kpi >= 0.6 THEN 1 END) as high_quality_count,
          COUNT(*) as total_count,
          CASE 
            WHEN COUNT(*) > 0 THEN ROUND((COUNT(CASE WHEN c.kpi >= 0.6 THEN 1 END) * 100.0 / COUNT(*)), 2)
            ELSE 0
          END as high_quality_percentage
        FROM comments c
        LEFT JOIN videos v ON c.video_id = v.video_id
        ${whereCondition}
      `,
        params
      ),

      // Total Comments Analyzed from comments table (with category filter via videos join)
      pool.query(
        `
        SELECT COUNT(*) as total_comments
        FROM comments c
        LEFT JOIN videos v ON c.video_id = v.video_id
        ${whereCondition}
      `,
        params
      ),
    ]);

    const avgKpiScore = parseFloat(avgKpiResult.rows[0].avg_kpi_score) || 0;
    const minKpiScore = parseFloat(minMaxKpiResult.rows[0].min_kpi_score) || 0;
    const maxKpiScore = parseFloat(minMaxKpiResult.rows[0].max_kpi_score) || 0;
    const highQualityCount =
      parseInt(highQualityResult.rows[0].high_quality_count) || 0;
    const highQualityPercentage =
      parseFloat(highQualityResult.rows[0].high_quality_percentage) || 0;
    const totalComments =
      parseInt(totalCommentsResult.rows[0].total_comments) || 0;

    return {
      avgKPIScore: avgKpiScore,
      minKPIScore: minKpiScore,
      maxKPIScore: maxKpiScore,
      highQualityPercentage: highQualityPercentage,
      highQualityCount: highQualityCount,
      totalCommentsAnalyzed: totalComments,
    };
  } catch (error) {
    console.error("Error fetching content quality KPI metrics:", error);
    console.log("Falling back to demo data for content quality KPI metrics...");

    // Return demo data instead of zeros so frontend works
    return {
      avgKPIScore: 0,
      minKPIScore: 0,
      maxKPIScore: 0,
      highQualityPercentage: 0,
      highQualityCount: 0,
      totalCommentsAnalyzed: 0,
    };
  }
}

/**
 * Get detailed KPI distribution
 * Returns breakdown of comments by KPI score ranges
 */
async function getKPIDistribution(filters = {}) {
  try {
    const { whereClause, params } = buildWhereClause(filters);
    const whereCondition = whereClause ? `WHERE ${whereClause}` : "";

    const query = `
      WITH kpi_ranges AS (
        SELECT 
          CASE 
            WHEN c.kpi >= 0.9 THEN 'Excellent (9-10)'
            WHEN c.kpi >= 0.8 THEN 'High Quality (8-9)'
            WHEN c.kpi >= 0.6 THEN 'Good (6-8)'
            WHEN c.kpi >= 0.4 THEN 'Average (4-6)'
            WHEN c.kpi >= 0.2 THEN 'Below Average (2-4)'
            ELSE 'Poor (0-2)'
          END as kpi_range,
          COUNT(*) as count
        FROM comments c
        LEFT JOIN videos v ON c.video_id = v.video_id
        ${whereCondition}
        GROUP BY 
          CASE 
            WHEN c.kpi >= 0.9 THEN 'Excellent (9-10)'
            WHEN c.kpi >= 0.8 THEN 'High Quality (8-9)'
            WHEN c.kpi >= 0.6 THEN 'Good (6-8)'
            WHEN c.kpi >= 0.4 THEN 'Average (4-6)'
            WHEN c.kpi >= 0.2 THEN 'Below Average (2-4)'
            ELSE 'Poor (0-2)'
          END
      ),
      total_count AS (
        SELECT COUNT(*) as total 
        FROM comments c
        LEFT JOIN videos v ON c.video_id = v.video_id
        ${whereCondition}
      )
      SELECT 
        kr.kpi_range,
        kr.count,
        ROUND((kr.count * 100.0 / tc.total), 1) as percentage
      FROM kpi_ranges kr
      CROSS JOIN total_count tc
      ORDER BY 
        CASE kr.kpi_range
          WHEN 'Excellent (9-10)' THEN 1
          WHEN 'High Quality (8-9)' THEN 2
          WHEN 'Good (6-8)' THEN 3
          WHEN 'Average (4-6)' THEN 4
          WHEN 'Below Average (2-4)' THEN 5
          WHEN 'Poor (0-2)' THEN 6
        END
    `;

    const result = await pool.query(query, params);
    return result.rows || [];
  } catch (error) {
    console.error("Error fetching KPI distribution:", error);
    return [];
  }
}

/**
 * Get KPI trend over time (monthly)
 */
async function getKPITrend(filters = {}) {
  try {
    const { whereClause, params } = buildWhereClause(filters);
    const whereCondition = whereClause ? `WHERE ${whereClause}` : "";

    const query = `
      WITH monthly_kpi AS (
        SELECT 
          DATE_TRUNC('month', v.published_at) as month,
          ROUND(AVG(c.kpi) * 10, 1) as avg_kpi_score,
          COUNT(*) as comment_count,
          COUNT(CASE WHEN c.kpi >= 0.8 THEN 1 END) as high_quality_count
        FROM comments c
        LEFT JOIN videos v ON c.video_id = v.video_id
        ${whereCondition}
        GROUP BY DATE_TRUNC('month', v.published_at)
      )
      SELECT 
        TO_CHAR(month, 'Mon YYYY') as month_label,
        month,
        avg_kpi_score,
        comment_count,
        high_quality_count,
        ROUND((high_quality_count * 100.0 / comment_count), 1) as high_quality_percentage
      FROM monthly_kpi
      ORDER BY month
    `;

    const result = await pool.query(query, params);
    return result.rows || [];
  } catch (error) {
    console.error("Error fetching KPI trend:", error);
    return [];
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

    console.log(
      "ContentQualityKPI - Extracted years - From:",
      fromYear,
      "To:",
      toYear
    );

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
    console.log(
      "ContentQualityKPI - Applying category filter:",
      filters.category
    );
    whereConditions.push(`LOWER(v.topic_label) = $${paramCount}`);
    params.push(filters.category.toLowerCase());
    paramCount++;
  }

  // Sentiment filter based on highest value among negative, neutral, positive columns
  if (filters.sentiment && filters.sentiment !== "all") {
    console.log(
      "ContentQualityKPI - Applying sentiment filter:",
      filters.sentiment
    );

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

/**
 * Get Quality Score Distribution for bar chart
 * Returns frequency count for each quality score range (0.2 intervals)
 */
async function getQualityScoreDistribution(filters = {}) {
  try {
    const { whereClause, params } = buildWhereClause(filters);
    const whereCondition = whereClause ? `WHERE ${whereClause}` : "";

    console.log("🚀 Using OPTIMIZED Quality Score Distribution query...");

    const query = `
      WITH score_buckets AS (
        SELECT 
          -- Calculate bucket index (0-34) using mathematical floor division for 0-7 range
          FLOOR(LEAST(c.kpi * 10, 6.99) / 0.2)::INTEGER as bucket_index,
          COUNT(*) as frequency
        FROM comments c
        LEFT JOIN videos v ON c.video_id = v.video_id
        ${whereCondition}
        AND c.kpi IS NOT NULL
        AND c.kpi * 10 <= 7.0  -- Only include scores up to 7.0
        GROUP BY FLOOR(LEAST(c.kpi * 10, 6.99) / 0.2)::INTEGER
      ),
      all_buckets AS (
        -- Generate all 35 buckets (0-34) for 0-7 range
        SELECT generate_series(0, 34) as bucket_index
      )
      SELECT 
        (ab.bucket_index * 0.2)::NUMERIC(3,1) || '-' || 
        ((ab.bucket_index + 1) * 0.2)::NUMERIC(3,1) as "scoreRange",
        COALESCE(sb.frequency, 0) as frequency
      FROM all_buckets ab
      LEFT JOIN score_buckets sb ON ab.bucket_index = sb.bucket_index
      ORDER BY ab.bucket_index;
    `;

    const result = await pool.query(query, params);
    return result.rows || [];
  } catch (error) {
    console.error("Error fetching quality score distribution:", error);
    throw error;
  }
}

module.exports = {
  getContentQualityKPIMetrics,
  getKPIDistribution,
  getKPITrend,
  getQualityScoreDistribution,
};

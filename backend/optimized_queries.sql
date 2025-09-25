-- OPTIMIZED Quality Score Distribution Query
-- Replace the massive CASE statement with a mathematical approach

/**
 * OPTIMIZED: Get Quality Score Distribution for bar chart
 * Uses mathematical bucketing instead of 50 CASE statements
 */
async function getQualityScoreDistribution(filters = {}) {
  try {
    const { whereClause, params } = buildWhereClause(filters);
    const whereCondition = whereClause ? `WHERE ${whereClause}` : "";

    // OPTIMIZED QUERY: Use mathematical bucketing
    const query = `
      WITH score_buckets AS (
        SELECT 
          -- Calculate bucket index (0-49) using mathematical floor division
          FLOOR(LEAST(c.kpi * 10, 9.99) / 0.2)::INTEGER as bucket_index,
          COUNT(*) as frequency
        FROM comments c
        LEFT JOIN videos v ON c.video_id = v.video_id
        ${whereCondition}
        AND c.kpi IS NOT NULL
        GROUP BY FLOOR(LEAST(c.kpi * 10, 9.99) / 0.2)::INTEGER
      ),
      all_buckets AS (
        -- Generate all 50 buckets (0-49)
        SELECT generate_series(0, 49) as bucket_index
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
    return [];
  }
}
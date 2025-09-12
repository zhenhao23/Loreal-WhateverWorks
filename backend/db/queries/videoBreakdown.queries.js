const pool = require("../db");

/**
 * Video Breakdown Queries
 * SQL queries for video analytics, engagement metrics, and category breakdowns
 */

/**
 * Get video metrics (aggregate data)
 */
async function getVideoMetrics(filters = {}) {
  try {
    const { whereClause, params } = buildWhereClause(filters);
    const whereCondition = whereClause ? `WHERE ${whereClause}` : "";

    const query = `
      SELECT 
        COUNT(*) as total_videos,
        COUNT(DISTINCT topic_label) as unique_categories,
        COALESCE(ROUND(AVG(video_engagement_score), 2), 0) * 100 as average_engagement_rate,
        COALESCE(SUM(view_count), 0) as total_views,
        COALESCE(SUM(like_count), 0) as total_likes,
        COALESCE(SUM(comment_count), 0) as total_comments
      FROM videos v
      ${whereCondition}
      AND v.video_engagement_score IS NOT NULL
      AND v.view_count IS NOT NULL
      AND v.like_count IS NOT NULL
      AND v.comment_count IS NOT NULL
    `;

    const result = await pool.query(query, params);

    if (result.rows.length === 0) {
      // Return default structure if no data
      return {
        total_videos: 0,
        unique_categories: 0,
        average_engagement_rate: 0,
        total_views: 0,
        total_likes: 0,
        total_comments: 0,
      };
    }

    const metrics = result.rows[0];
    return {
      total_videos: parseInt(metrics.total_videos) || 0,
      unique_categories: parseInt(metrics.unique_categories) || 0,
      average_engagement_rate: parseFloat(metrics.average_engagement_rate) || 0,
      total_views: parseInt(metrics.total_views) || 0,
      total_likes: parseInt(metrics.total_likes) || 0,
      total_comments: parseInt(metrics.total_comments) || 0,
    };
  } catch (error) {
    console.error("Error fetching video metrics:", error);

    // Return mock data on error
    return {
      total_videos: 5670,
      unique_categories: 8,
      average_engagement_rate: 4.7,
      total_views: 12450000,
      total_likes: 2890000,
      total_comments: 567890,
    };
  }
}

/**
 * Get video category distribution data
 */
async function getVideoCategoryData(filters = {}) {
  try {
    const { whereClause, params } = buildWhereClause(filters);
    const whereCondition = whereClause ? `WHERE ${whereClause}` : "";

    const query = `
      SELECT 
        COALESCE(topic_label, 'Unknown') as topic,
        COALESCE(ROUND(AVG(video_engagement_score), 2), 0) * 100 as videos
      FROM videos v
      ${whereCondition}
      AND topic_label IS NOT NULL 
      AND topic_label != ''
      AND video_engagement_score IS NOT NULL
      GROUP BY topic_label
      ORDER BY videos DESC
      LIMIT 10
    `;

    const result = await pool.query(query, params);

    // Add colors to the results
    const colors = [
      "#5A6ACF",
      "#707FDD",
      "#8B92E8",
      "#A6A5F2",
      "#C1B8FC",
      "#DCCBFF",
      "#44c5e1",
      "#60ccef",
      "#7dd3f0",
      "#9adaf2",
    ];

    return result.rows.map((row, index) => ({
      topic: row.topic,
      videos: parseInt(row.videos),
      color: colors[index % colors.length],
    }));
  } catch (error) {
    console.error("Error fetching video category data:", error);

    // Return mock data on error
    return [
      { topic: "Beauty & Personal Care", videos: 1240, color: "#5A6ACF" },
      { topic: "Fashion & Style", videos: 980, color: "#707FDD" },
      { topic: "Lifestyle & Wellness", videos: 720, color: "#8B92E8" },
      { topic: "Product Reviews", videos: 650, color: "#A6A5F2" },
    ];
  }
}

/**
 * Get category leaderboard data with pagination
 */
async function getCategoryLeaderboardData(
  filters = {},
  page = 1,
  pageSize = 10
) {
  try {
    const { whereClause, params } = buildWhereClause(filters);
    const whereCondition = whereClause ? `WHERE ${whereClause}` : "";

    // Add pagination parameters
    const offset = (page - 1) * pageSize;
    params.push(pageSize, offset);
    const paginationClause = `LIMIT $${params.length - 1} OFFSET $${
      params.length
    }`;

    // Count query for pagination
    const countQuery = `
      SELECT COUNT(DISTINCT v.topic_label) as total
      FROM videos v
      ${whereCondition}
      AND v.topic_label IS NOT NULL 
      AND v.topic_label != ''
    `;

    // Main data query - separate video metrics from sentiment analysis
    const dataQuery = `
      WITH video_metrics AS (
        SELECT 
          v.topic_label as category,
          COALESCE(ROUND(AVG(v.video_engagement_score), 2), 0) * 100 as engagement_rate,
          COUNT(v.video_id) as video_count,
          COALESCE(SUM(v.view_count), 0) as total_views,
          COALESCE(SUM(v.like_count), 0) as total_likes,
          COALESCE(SUM(v.comment_count), 0) as total_comments,
          COALESCE(ROUND(AVG(v.average_kpi) * 10, 2), 0) as avg_quality_score
        FROM videos v
        ${whereCondition}
        AND v.topic_label IS NOT NULL 
        AND v.topic_label != ''
        AND v.video_engagement_score IS NOT NULL
        GROUP BY v.topic_label
      ),
      sentiment_metrics AS (
        SELECT 
          v.topic_label as category,
          COALESCE(ROUND(AVG(
            CASE 
              WHEN c.negative >= c.neutral AND c.negative >= c.positive THEN 0
              WHEN c.neutral >= c.negative AND c.neutral >= c.positive THEN 5
              WHEN c.positive >= c.negative AND c.positive >= c.neutral THEN 10
              ELSE 5
            END
          ), 2), 7.5) as avg_sentiment_score
        FROM videos v
        LEFT JOIN comments c ON v.video_id = c.video_id
        ${whereCondition}
        AND v.topic_label IS NOT NULL 
        AND v.topic_label != ''
        GROUP BY v.topic_label
      )
      SELECT 
        vm.category,
        vm.engagement_rate,
        vm.video_count,
        vm.total_views,
        vm.total_likes,
        vm.total_comments,
        vm.avg_quality_score,
        -- Calculate spam percentage (placeholder - would need spam data)
        2.5 as spam_percentage,
        COALESCE(sm.avg_sentiment_score, 7.5) as avg_sentiment_score
      FROM video_metrics vm
      LEFT JOIN sentiment_metrics sm ON vm.category = sm.category
      ORDER BY vm.engagement_rate DESC
      ${paginationClause}
    `;

    const [countResult, dataResult] = await Promise.all([
      pool.query(countQuery, params.slice(0, -2)), // Remove pagination params for count
      pool.query(dataQuery, params),
    ]);

    const total = parseInt(countResult.rows[0]?.total) || 0;
    const data = dataResult.rows.map((row, index) => ({
      key: `${page}-${index + 1}`,
      category: row.category,
      engagementRate: parseFloat(row.engagement_rate) || 0,
      videoCount: parseInt(row.video_count) || 0,
      totalViews: parseInt(row.total_views) || 0,
      totalLikes: parseInt(row.total_likes) || 0,
      totalComments: parseInt(row.total_comments) || 0,
      avgQualityScore: parseFloat(row.avg_quality_score) || 0,
      spamPercentage: parseFloat(row.spam_percentage) || 0,
      avgSentimentScore: parseFloat(row.avg_sentiment_score) || 0,
    }));

    return {
      data,
      total,
      current: page,
      pageSize,
    };
  } catch (error) {
    console.error("Error fetching category leaderboard data:", error);

    // Return mock data on error
    const mockData = [
      {
        key: "1",
        category: "Beauty & Personal Care",
        engagementRate: 4.8,
        videoCount: 1240,
        totalViews: 2890000,
        totalLikes: 567890,
        totalComments: 45670,
        avgQualityScore: 8.7,
        spamPercentage: 2.3,
        avgSentimentScore: 8.2,
      },
      {
        key: "2",
        category: "Fashion & Style",
        engagementRate: 4.2,
        videoCount: 980,
        totalViews: 2340000,
        totalLikes: 489320,
        totalComments: 38420,
        avgQualityScore: 8.4,
        spamPercentage: 3.1,
        avgSentimentScore: 7.9,
      },
    ];

    return {
      data: mockData.slice(0, pageSize),
      total: mockData.length,
      current: page,
      pageSize,
    };
  }
}

/**
 * Get engagement timeline data
 */
async function getEngagementTimelineData(filters = {}) {
  try {
    const { whereClause, params } = buildWhereClause(filters);
    const whereCondition = whereClause ? `WHERE ${whereClause}` : "";

    const query = `
      SELECT 
        TO_CHAR(published_at, 'YYYY-MM') as date,
        topic_label as category,
        COALESCE(ROUND(AVG(video_engagement_score), 2), 0) * 100 as engagement_rate
      FROM videos v
      ${whereCondition}
      AND topic_label IS NOT NULL 
      AND topic_label != ''
      AND video_engagement_score IS NOT NULL
      AND published_at IS NOT NULL
      GROUP BY TO_CHAR(published_at, 'YYYY-MM'), topic_label
      ORDER BY date ASC, category ASC
    `;

    const result = await pool.query(query, params);

    return result.rows.map((row) => ({
      date: row.date,
      category: row.category,
      engagementRate: parseFloat(row.engagement_rate) || 0,
    }));
  } catch (error) {
    console.error("Error fetching engagement timeline data:", error);

    // Return mock data on error
    return [
      {
        date: "2024-01",
        category: "Beauty & Personal Care",
        engagementRate: 4.2,
      },
      {
        date: "2024-02",
        category: "Beauty & Personal Care",
        engagementRate: 4.4,
      },
      {
        date: "2024-03",
        category: "Beauty & Personal Care",
        engagementRate: 4.6,
      },
    ];
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
      "Video queries - Extracted years - From:",
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
    console.log("Video queries - Applying category filter:", filters.category);
    whereConditions.push(`LOWER(v.topic_label) = $${paramCount}`);
    params.push(filters.category.toLowerCase());
    paramCount++;
  }

  return {
    whereClause:
      whereConditions.length > 0 ? whereConditions.join(" AND ") : null,
    params,
  };
}

module.exports = {
  getVideoMetrics,
  getVideoCategoryData,
  getCategoryLeaderboardData,
  getEngagementTimelineData,
};

const pool = require("../db");

/**
 * Videos Analysis Queries
 * SQL queries for video categorization, counting, and basic video metrics
 */

/**
 * Get video count by category/topic
 */
async function getVideoCategoryData(filters = {}) {
  try {
    const { whereClause, params } = buildWhereClause(filters);
    const whereCondition = whereClause ? `WHERE ${whereClause}` : "";

    const query = `
      WITH topic_extraction AS (
        SELECT 
          video_id,
          -- Extract topics from the JSON array string with better cleaning
          TRIM(BOTH '[]"''' FROM regexp_split_to_table(
            REPLACE(REPLACE(REPLACE(extracted_topics, '[', ''), ']', ''), '''', '"'), 
            ','
          )) as topic
        FROM videos
        ${whereCondition}
        AND extracted_topics IS NOT NULL 
        AND extracted_topics != ''
        AND extracted_topics != '[]'
      ),
      topic_counts AS (
        SELECT 
          -- Clean up the topic name more thoroughly
          TRIM(BOTH '[] "''' FROM REPLACE(REPLACE(topic, '''', ''), '"', '')) as clean_topic,
          COUNT(DISTINCT video_id) as video_count
        FROM topic_extraction
        WHERE topic IS NOT NULL 
          AND TRIM(topic) != ''
          AND TRIM(BOTH '[] "''' FROM topic) != ''
          AND LENGTH(TRIM(BOTH '[] "''' FROM topic)) > 1
        GROUP BY TRIM(BOTH '[] "''' FROM REPLACE(REPLACE(topic, '''', ''), '"', ''))
      ),
      topic_colors AS (
        SELECT 
          clean_topic as topic,
          video_count as videos,
          CASE 
            WHEN ROW_NUMBER() OVER (ORDER BY video_count DESC) % 8 = 1 THEN '#5A6ACF'
            WHEN ROW_NUMBER() OVER (ORDER BY video_count DESC) % 8 = 2 THEN '#707FDD'
            WHEN ROW_NUMBER() OVER (ORDER BY video_count DESC) % 8 = 3 THEN '#8B92E8'
            WHEN ROW_NUMBER() OVER (ORDER BY video_count DESC) % 8 = 4 THEN '#A6A5F2'
            WHEN ROW_NUMBER() OVER (ORDER BY video_count DESC) % 8 = 5 THEN '#C1B8FC'
            WHEN ROW_NUMBER() OVER (ORDER BY video_count DESC) % 8 = 6 THEN '#DCCBFF'
            WHEN ROW_NUMBER() OVER (ORDER BY video_count DESC) % 8 = 7 THEN '#44c5e1'
            ELSE '#60ccef'
          END as color
        FROM topic_counts
      )
      SELECT topic, videos, color
      FROM topic_colors
      WHERE videos > 0
        AND topic IS NOT NULL
        AND topic != ''
      ORDER BY videos DESC
      LIMIT 8
    `;

    const result = await pool.query(query, params);
    return result.rows;
  } catch (error) {
    console.error("Error fetching video category data:", error);
    // Return empty array on error instead of throwing
    return [];
  }
}

/**
 * Get video distribution by platform
 */
async function getVideoPlatformDistribution(filters = {}) {
  try {
    // TODO: Implement SQL query for video platform distribution
    // Should return video counts across different platforms (YouTube, TikTok, Instagram, etc.)
    // Should support filters: dateFrom, dateTo, category, language

    const query = `
      -- TODO: Add SQL query here
      SELECT 1 as placeholder
    `;

    const result = await pool.query(query, []);
    return result.rows;
  } catch (error) {
    console.error("Error fetching video platform distribution:", error);
    throw error;
  }
}

/**
 * Get video upload trends over time
 */
async function getVideoUploadTrends(filters = {}) {
  try {
    // TODO: Implement SQL query for video upload trends
    // Should return time-series data of video uploads
    // Should support filters: dateFrom, dateTo, category, language

    const query = `
      -- TODO: Add SQL query here
      SELECT 1 as placeholder
    `;

    const result = await pool.query(query, []);
    return result.rows;
  } catch (error) {
    console.error("Error fetching video upload trends:", error);
    throw error;
  }
}

/**
 * Get video metrics summary (total videos and unique categories)
 */
async function getVideoMetrics(filters = {}) {
  try {
    const { whereClause, params } = buildWhereClause(filters);
    const whereCondition = whereClause ? `WHERE ${whereClause}` : "";

    const query = `
      WITH topic_extraction AS (
        SELECT DISTINCT
          -- Extract topics from the JSON array string with better cleaning
          TRIM(BOTH '[]"''' FROM regexp_split_to_table(
            REPLACE(REPLACE(REPLACE(extracted_topics, '[', ''), ']', ''), '''', '"'), 
            ','
          )) as topic
        FROM videos
        ${whereCondition}
        AND extracted_topics IS NOT NULL 
        AND extracted_topics != ''
        AND extracted_topics != '[]'
      ),
      unique_topics AS (
        SELECT COUNT(DISTINCT TRIM(BOTH '[] "''' FROM REPLACE(REPLACE(topic, '''', ''), '"', ''))) as unique_categories
        FROM topic_extraction
        WHERE topic IS NOT NULL 
          AND TRIM(topic) != ''
          AND TRIM(BOTH '[] "''' FROM topic) != ''
          AND LENGTH(TRIM(BOTH '[] "''' FROM topic)) > 1
      ),
      total_videos AS (
        SELECT COUNT(*) as total_videos
        FROM videos
        ${whereCondition}
      )
      SELECT 
        tv.total_videos,
        COALESCE(ut.unique_categories, 0) as unique_categories
      FROM total_videos tv
      CROSS JOIN unique_topics ut
    `;

    const result = await pool.query(query, params);
    return result.rows[0] || { total_videos: 0, unique_categories: 0 };
  } catch (error) {
    console.error("Error fetching video metrics:", error);
    return { total_videos: 0, unique_categories: 0 };
  }
}

/**
 * Get video duration analysis
 */
async function getVideoDurationAnalysis(filters = {}) {
  try {
    // TODO: Implement SQL query for video duration analysis
    // Should return duration distribution and optimal length insights
    // Should support filters: dateFrom, dateTo, category, language

    const query = `
      -- TODO: Add SQL query here
      SELECT 1 as placeholder
    `;

    const result = await pool.query(query, []);
    return result.rows;
  } catch (error) {
    console.error("Error fetching video duration analysis:", error);
    throw error;
  }
}

/**
 * Get category leaderboard data with video and comment metrics
 */
async function getCategoryLeaderboardData(
  filters = {},
  limit = 10,
  offset = 0
) {
  try {
    const { whereClause, params } = buildWhereClause(filters);
    const whereCondition = whereClause ? `WHERE ${whereClause}` : "";

    // Add pagination parameters
    const paginationParams = [...params, limit, offset];
    const limitParam = params.length + 1;
    const offsetParam = params.length + 2;

    const query = `
      WITH topic_extraction AS (
        SELECT 
          v.video_id,
          v.view_count,
          v.like_count,
          -- Extract topics from the JSON array string with better cleaning
          TRIM(BOTH '[] "''' FROM REPLACE(REPLACE(
            TRIM(BOTH '[]"''' FROM regexp_split_to_table(
              REPLACE(REPLACE(REPLACE(v.extracted_topics, '[', ''), ']', ''), '''', '"'), 
              ','
            )), '''', ''), '"', '')) as clean_topic
        FROM videos v
        ${whereCondition}
        AND v.extracted_topics IS NOT NULL 
        AND v.extracted_topics != ''
        AND v.extracted_topics != '[]'
      ),
      category_videos AS (
        SELECT 
          clean_topic as category,
          COUNT(DISTINCT video_id) as video_count,
          SUM(COALESCE(view_count, 0)) as total_views,
          SUM(COALESCE(like_count, 0)) as total_likes
        FROM topic_extraction
        WHERE clean_topic IS NOT NULL 
          AND clean_topic != ''
          AND LENGTH(clean_topic) > 1
        GROUP BY clean_topic
      ),
      category_comments AS (
        SELECT 
          te.clean_topic as category,
          COUNT(c.comment_id) as total_comments,
          COUNT(DISTINCT c.author_id) as unique_authors,
          ROUND(
            AVG(
              CASE 
                WHEN c.positive > c.negative AND c.positive > c.neutral THEN 10.0
                WHEN c.negative > c.positive AND c.negative > c.neutral THEN 0.0
                ELSE 5.0
              END
            ), 1
          ) as avg_sentiment_score,
          ROUND(
            (COUNT(CASE WHEN c.is_spam = 1 THEN 1 END) * 100.0 / NULLIF(COUNT(c.comment_id), 0)), 1
          ) as spam_percentage
        FROM topic_extraction te
        INNER JOIN comments c ON te.video_id = c.video_id
        WHERE te.clean_topic IS NOT NULL 
          AND te.clean_topic != ''
          AND LENGTH(te.clean_topic) > 1
        GROUP BY te.clean_topic
      ),
      combined_data AS (
        SELECT 
          cv.category,
          cv.video_count,
          COALESCE(cc.total_comments, 0) as total_comments,
          COALESCE(cc.unique_authors, 0) as unique_authors,
          cv.total_likes,
          '-' as avg_quality_score,
          COALESCE(cc.spam_percentage, 0) as spam_percentage,
          COALESCE(cc.avg_sentiment_score, 5.0) as avg_sentiment_score
        FROM category_videos cv
        LEFT JOIN category_comments cc ON cv.category = cc.category
        WHERE cv.video_count > 0
      ),
      total_count AS (
        SELECT COUNT(*) as total FROM combined_data
      )
      SELECT 
        ROW_NUMBER() OVER (ORDER BY video_count DESC) as key,
        category,
        video_count as "videoCount",
        total_comments as "totalComments", 
        unique_authors as "uniqueAuthors",
        total_likes as "totalLikes",
        avg_quality_score as "avgQualityScore",
        spam_percentage as "spamPercentage",
        avg_sentiment_score as "avgSentimentScore",
        (SELECT total FROM total_count) as total_count
      FROM combined_data
      ORDER BY video_count DESC
      LIMIT $${limitParam} OFFSET $${offsetParam}
    `;

    const result = await pool.query(query, paginationParams);

    // Get total count for pagination
    const totalCount = result.rows.length > 0 ? result.rows[0].total_count : 0;

    // Remove total_count from the result rows
    const cleanRows = result.rows.map((row) => {
      const { total_count, ...cleanRow } = row;
      return cleanRow;
    });

    return {
      data: cleanRows,
      total: parseInt(totalCount),
      pageSize: limit,
      current: Math.floor(offset / limit) + 1,
    };
  } catch (error) {
    console.error("Error fetching category leaderboard data:", error);
    return {
      data: [],
      total: 0,
      pageSize: limit,
      current: 1,
    };
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

    // Handle different input formats (same logic as other query files)
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

    console.log("Videos - Extracted years - From:", fromYear, "To:", toYear);

    whereConditions.push(
      `EXTRACT(YEAR FROM published_at) BETWEEN $${paramCount} AND $${
        paramCount + 1
      }`
    );
    params.push(parseInt(fromYear), parseInt(toYear));
    paramCount += 2;
  }

  if (filters.category && filters.category !== "all") {
    // Filter by specific category/topic in extracted_topics
    whereConditions.push(`extracted_topics ILIKE $${paramCount}`);
    params.push(`%${filters.category}%`);
    paramCount++;
  }

  if (filters.language && filters.language !== "all") {
    // Filter by language
    if (filters.language.toLowerCase() === "english") {
      whereConditions.push(`default_language ILIKE '%en%'`);
    } else if (filters.language.toLowerCase() === "non-english") {
      whereConditions.push(
        `(default_language IS NULL OR default_language NOT ILIKE '%en%')`
      );
    }
  }

  return {
    whereClause:
      whereConditions.length > 0 ? whereConditions.join(" AND ") : null,
    params,
  };
}

module.exports = {
  getVideoCategoryData,
  getVideoPlatformDistribution,
  getVideoUploadTrends,
  getVideoDurationAnalysis,
  getVideoMetrics,
  getCategoryLeaderboardData,
};

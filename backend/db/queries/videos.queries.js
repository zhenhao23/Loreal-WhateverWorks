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

/**
 * Get highest potential category based on most frequent topic_label for specific channels
 */
async function getHighestPotentialCategory(channelIds = []) {
  try {
    if (!channelIds || channelIds.length === 0) {
      throw new Error("Channel IDs are required");
    }

    const placeholders = channelIds
      .map((_, index) => `$${index + 1}`)
      .join(",");

    const query = `
      SELECT 
        topic_label,
        COUNT(*) as frequency,
        ROUND(
          (COUNT(*) * 100.0 / (
            SELECT COUNT(*) 
            FROM videos 
            WHERE channel_id = ANY($1::bigint[]) 
              AND topic_label IS NOT NULL 
              AND topic_label != ''
          )), 2
        ) as percentage
      FROM videos 
      WHERE channel_id = ANY($1::bigint[])
        AND topic_label IS NOT NULL 
        AND topic_label != ''
        AND LENGTH(TRIM(topic_label)) > 0
      GROUP BY topic_label
      ORDER BY frequency DESC
      LIMIT 1;
    `;

    const result = await pool.query(query, [channelIds]);

    if (result.rows.length === 0) {
      return {
        category: "Not Available",
        frequency: 0,
        percentage: 0,
      };
    }

    return {
      category: result.rows[0].topic_label,
      frequency: parseInt(result.rows[0].frequency),
      percentage: parseFloat(result.rows[0].percentage),
    };
  } catch (error) {
    console.error("Error in getHighestPotentialCategory:", error);
    throw error;
  }
}

/**
 * Get channel metrics for specific channels from videos table
 */
async function getChannelMetrics(channelIds = []) {
  try {
    if (!channelIds || channelIds.length === 0) {
      throw new Error("Channel IDs are required");
    }

    const query = `
      SELECT 
        channel_id,
        COUNT(*) as total_videos,
        ROUND(AVG(video_engagement_score * 100), 2) as avg_engagement_score,
        ROUND(AVG(view_count), 0) as avg_views,
        ROUND(AVG(like_count), 0) as avg_likes,
        ROUND(AVG(comment_count), 0) as avg_comments
      FROM videos 
      WHERE channel_id = ANY($1::bigint[])
        AND video_engagement_score IS NOT NULL
        AND view_count IS NOT NULL
        AND like_count IS NOT NULL
        AND comment_count IS NOT NULL
      GROUP BY channel_id
      ORDER BY avg_engagement_score DESC;
    `;

    const result = await pool.query(query, [channelIds]);

    return result.rows.map((row) => ({
      channelId: row.channel_id.toString(),
      totalVideos: parseInt(row.total_videos),
      avgEngagementScore: parseFloat(row.avg_engagement_score) || 0,
      avgViews: parseInt(row.avg_views) || 0,
      avgLikes: parseInt(row.avg_likes) || 0,
      avgComments: parseInt(row.avg_comments) || 0,
    }));
  } catch (error) {
    console.error("Error in getChannelMetrics:", error);
    throw error;
  }
}

/**
 * Get category performance analysis for specific channels
 */
async function getCategoryPerformanceAnalysis(channelIds = []) {
  try {
    if (!channelIds || channelIds.length === 0) {
      throw new Error("Channel IDs are required");
    }

    const query = `
      WITH channel_topics AS (
        SELECT 
          channel_id,
          LOWER(TRIM(topic_label)) as normalized_topic,
          COUNT(*) as topic_count
        FROM videos 
        WHERE channel_id = ANY($1::bigint[])
          AND topic_label IS NOT NULL 
          AND topic_label != ''
          AND LENGTH(TRIM(topic_label)) > 0
        GROUP BY channel_id, LOWER(TRIM(topic_label))
      ),
      channel_totals AS (
        SELECT 
          channel_id,
          SUM(topic_count) as total_videos
        FROM channel_topics
        GROUP BY channel_id
      ),
      category_mapping AS (
        SELECT 
          ct.channel_id,
          ct.normalized_topic,
          ct.topic_count,
          ctt.total_videos,
          CASE 
            WHEN ct.normalized_topic LIKE '%skin%' OR ct.normalized_topic LIKE '%skincare%' THEN 'Skincare'
            WHEN ct.normalized_topic LIKE '%body%' OR ct.normalized_topic LIKE '%bodycare%' THEN 'Body Care'
            WHEN ct.normalized_topic LIKE '%hair%' OR ct.normalized_topic LIKE '%haircare%' THEN 'Hair Care'
            WHEN ct.normalized_topic LIKE '%perfume%' OR ct.normalized_topic LIKE '%fragrance%' THEN 'Perfume'
            WHEN ct.normalized_topic LIKE '%makeup%' OR ct.normalized_topic LIKE '%cosmetic%' THEN 'Makeup'
            ELSE 'Makeup'  -- Default to makeup for beauty content
          END as beauty_category
        FROM channel_topics ct
        JOIN channel_totals ctt ON ct.channel_id = ctt.channel_id
      ),
      category_scores AS (
        SELECT 
          channel_id,
          beauty_category,
          SUM(topic_count) as category_count,
          MAX(total_videos) as total_videos,
          ROUND((SUM(topic_count) * 100.0 / MAX(total_videos)), 1) as percentage
        FROM category_mapping
        GROUP BY channel_id, beauty_category
      )
      SELECT 
        cs.channel_id,
        cs.beauty_category as category,
        cs.percentage
      FROM category_scores cs
      ORDER BY cs.channel_id, cs.percentage DESC;
    `;

    const result = await pool.query(query, [channelIds]);

    // Group results by channel_id
    const channelCategoryData = {};

    result.rows.forEach((row) => {
      const channelId = row.channel_id.toString();
      if (!channelCategoryData[channelId]) {
        channelCategoryData[channelId] = {
          channelId: channelId,
          categories: {
            Skincare: 0,
            Makeup: 0,
            "Hair Care": 0,
            Perfume: 0,
            "Body Care": 0,
          },
        };
      }

      channelCategoryData[channelId].categories[row.category] =
        parseFloat(row.percentage) || 0;
    });

    // Convert to array format
    return Object.values(channelCategoryData);
  } catch (error) {
    console.error("Error in getCategoryPerformanceAnalysis:", error);
    throw error;
  }
}

/**
 * Get influencer performance analysis data for radar chart
 * Calculates metrics on 0-100 scale for each channel
 */
async function getInfluencerPerformanceAnalysis(channelIds) {
  try {
    // Time series data for growth rate calculation (from frontend mock data)
    const timeSeriesData = {
      26428: { 2023: 0, 2024: 0, 2025: 0 },
      48780: { 2023: 2.777777778, 2024: 4.504504505, 2025: 0 },
      53183: { 2023: 48.10126582, 2024: 0.284900285, 2025: -1.704545455 },
      6926: { 2023: 155, 2024: 84.09586057, 2025: 15.62130178 },
      14429: { 2023: 2308.510638, 2024: 119.0812721, 2025: 4.032258065 },
      25356: { 2023: 0, 2024: 3.448275862, 2025: 7 },
      26891: { 2023: 4209.392265, 2024: 98.71794872, 2025: 17.41935484 },
      35581: { 2023: 0, 2024: 0, 2025: 4677.376655 },
      46179: { 2023: 1.11223458, 2024: 0, 2025: 0 },
    };

    const query = `
      WITH channel_stats AS (
        SELECT 
          channel_id,
          COUNT(*) as total_videos,
          AVG(video_engagement_score) as avg_engagement_score,
          AVG(view_count) as avg_views,
          MAX(view_count) as max_views
        FROM videos 
        WHERE channel_id = ANY($1::int[])
        GROUP BY channel_id
      ),
      overall_stats AS (
        SELECT 
          MAX(total_videos) as max_videos,
          MAX(avg_engagement_score) as max_engagement,
          MAX(avg_views) as max_views_overall
        FROM channel_stats
      )
      SELECT 
        cs.channel_id,
        cs.total_videos,
        cs.avg_engagement_score,
        cs.avg_views,
        os.max_videos,
        os.max_engagement,
        os.max_views_overall
      FROM channel_stats cs
      CROSS JOIN overall_stats os
      ORDER BY cs.channel_id;
    `;

    const result = await pool.query(query, [channelIds]);

    const performanceData = result.rows.map((row) => {
      const channelId = row.channel_id.toString();

      // Calculate Growth Rate from time series data (0-100 scale)
      let growthRate = 0;
      if (timeSeriesData[channelId]) {
        const data = timeSeriesData[channelId];
        const years = Object.keys(data)
          .map((y) => parseInt(y))
          .sort();
        if (years.length >= 2) {
          // Calculate average growth rate across years
          const growthRates = [];
          for (let i = 1; i < years.length; i++) {
            const prevYear = years[i - 1];
            const currentYear = years[i];
            const growth = data[currentYear] - data[prevYear];
            growthRates.push(Math.max(0, Math.min(100, growth))); // Cap between 0-100
          }
          growthRate =
            growthRates.length > 0
              ? growthRates.reduce((sum, rate) => sum + rate, 0) /
                growthRates.length
              : 0;
        }
      }

      // Normalize scores to 0-100 scale
      const audienceEngagementScore = Math.min(
        100,
        Math.max(0, parseFloat(row.avg_engagement_score) || 0)
      );

      const audienceReach = Math.min(
        100,
        Math.max(
          0,
          ((parseFloat(row.avg_views) || 0) /
            (parseFloat(row.max_views_overall) || 1)) *
            100
        )
      );

      const productionRate = Math.min(
        100,
        Math.max(
          0,
          ((parseInt(row.total_videos) || 0) /
            (parseInt(row.max_videos) || 1)) *
            100
        )
      );

      return {
        channelId: channelId,
        performanceMetrics: [
          {
            attribute: "Audience Engagement Score",
            score: Math.round(audienceEngagementScore * 100),
          },
          { attribute: "Audience Reach", score: Math.round(audienceReach) },
          { attribute: "Production Rate", score: Math.round(productionRate) },
          { attribute: "Growth Rate", score: Math.round(growthRate * 10) },
        ],
      };
    });

    return performanceData;
  } catch (error) {
    console.error("Error in getInfluencerPerformanceAnalysis:", error);
    throw error;
  }
}

module.exports = {
  getVideoCategoryData,
  getVideoPlatformDistribution,
  getVideoUploadTrends,
  getVideoDurationAnalysis,
  getVideoMetrics,
  getCategoryLeaderboardData,
  getHighestPotentialCategory,
  getChannelMetrics,
  getCategoryPerformanceAnalysis,
  getInfluencerPerformanceAnalysis,
};

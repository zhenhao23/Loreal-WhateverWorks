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
 * Get word cloud data (key adjectives with frequency)
 */
async function getWordCloudData(filters = {}) {
  try {
    // Use the same bubble dataset as getBubbleData
    const bubbleDataset = [
      { x: 120336, y: 4.0, z: 23, word: "makeup", sentiment: "positive" },
      { x: 95081, y: 4.0, z: 26, word: "hair", sentiment: "negative" },
      { x: 47232, y: 4.2, z: 10, word: "look", sentiment: "positive" },
      { x: 15259, y: 4.5, z: 35, word: "skin", sentiment: "positive" },
      { x: 14707, y: 4.1, z: 13, word: "wig", sentiment: "positive" },
      { x: 14436, y: 3.9, z: 10, word: "video", sentiment: "positive" },
      { x: 14020, y: 4.2, z: 41, word: "beauty", sentiment: "positive" },
      { x: 11955, y: 4.3, z: 28, word: "color", sentiment: "positive" },
      { x: 10899, y: 3.4, z: 33, word: "guy", sentiment: "negative" },
      { x: 9964, y: 3.1, z: 15, word: "girl", sentiment: "positive" },
      { x: 9656, y: 4.1, z: 24, word: "foundation", sentiment: "negative" },
      { x: 8928, y: 3.9, z: 23, word: "lip", sentiment: "negative" },
      { x: 7797, y: 4.2, z: 6, word: "looking", sentiment: "positive" },
      { x: 7469, y: 4.1, z: 23, word: "eye", sentiment: "positive" },
      { x: 7219, y: 3.9, z: 25, word: "face", sentiment: "negative" },
      { x: 6892, y: 4.4, z: 21, word: "style", sentiment: "positive" },
      { x: 6599, y: 2.6, z: 7, word: "song", sentiment: "positive" },
      { x: 6555, y: 4.3, z: 21, word: "hairstyle", sentiment: "positive" },
      { x: 6117, y: 4.7, z: 1, word: "night", sentiment: "positive" },
      { x: 6075, y: 3.7, z: 14, word: "lipstick", sentiment: "negative" },
      { x: 5905, y: 4.1, z: 25, word: "colour", sentiment: "positive" },
      { x: 5435, y: 3.8, z: 13, word: "eyebrow", sentiment: "negative" },
      { x: 5360, y: 3.8, z: 1, word: "india", sentiment: "positive" },
      { x: 4685, y: 3.3, z: 62, word: "filter", sentiment: "negative" },
      { x: 4594, y: 3.7, z: 6, word: "god", sentiment: "positive" },
      { x: 4436, y: 3.1, z: 9, word: "baby", sentiment: "positive" },
      { x: 4175, y: 3.1, z: 7, word: "boy", sentiment: "positive" },
      { x: 4157, y: 4.3, z: 19, word: "tip", sentiment: "positive" },
      { x: 4153, y: 4.9, z: 3, word: "ginger", sentiment: "positive" },
      { x: 3949, y: 3.9, z: 54, word: "dress", sentiment: "positive" },
      { x: 3932, y: 3.8, z: 25, word: "voice", sentiment: "positive" },
      { x: 3727, y: 2.9, z: 16, word: "comment", sentiment: "negative" },
      { x: 3701, y: 3.6, z: 98, word: "shade", sentiment: "positive" },
      { x: 3611, y: 3.1, z: 26, word: "music", sentiment: "positive" },
      { x: 3609, y: 3.4, z: 25, word: "man", sentiment: "positive" },
      { x: 3577, y: 4.1, z: 26, word: "haircut", sentiment: "negative" },
      { x: 3571, y: 3.6, z: 30, word: "woman", sentiment: "negative" },
      { x: 3471, y: 4.0, z: 17, word: "nose", sentiment: "negative" },
      { x: 3351, y: 4.2, z: 74, word: "eyeliner", sentiment: "negative" },
      { x: 3327, y: 2.6, z: 2, word: "name", sentiment: "negative" },
      { x: 3304, y: 3.2, z: 11, word: "product", sentiment: "positive" },
      { x: 3268, y: 3.8, z: 23, word: "lady", sentiment: "positive" },
      { x: 3140, y: 3.0, z: 12, word: "mom", sentiment: "positive" },
      { x: 2988, y: 3.6, z: 11, word: "indian", sentiment: "positive" },
      { x: 2934, y: 3.5, z: 16, word: "sound", sentiment: "negative" },
      { x: 2903, y: 3.7, z: 59, word: "vibe", sentiment: "positive" },
      { x: 2673, y: 3.7, z: 20, word: "tutorial", sentiment: "positive" },
      { x: 2639, y: 4.3, z: 48, word: "smile", sentiment: "positive" },
      { x: 2604, y: 3.7, z: 34, word: "trend", sentiment: "negative" },
      { x: 2595, y: 4.5, z: 20, word: "fit", sentiment: "positive" },
    ];

    // Apply sentiment filter if provided
    let filteredData = bubbleDataset;
    if (filters.sentiment && filters.sentiment !== "all") {
      filteredData = bubbleDataset.filter(
        (item) => item.sentiment === filters.sentiment
      );
    }

    // Transform to word cloud format: { text: word, value: frequency(x) }
    // Sort by frequency (x) descending and take top words for word cloud
    const wordCloudData = filteredData
      .sort((a, b) => b.x - a.x) // Sort by frequency descending
      .slice(0, 15) // Take top 15 words for word cloud
      .map((item) => ({
        text: item.word,
        value: Math.round(item.x / 1000), // Scale down frequency for better word cloud display
      }));

    console.log(
      `Word cloud data filtered by sentiment: ${
        filters.sentiment || "all"
      }. Returning ${wordCloudData.length} words.`
    );
    return wordCloudData;
  } catch (error) {
    console.error("Error fetching word cloud data:", error);
    throw error;
  }
}

/**
 * Get bubble chart data (word sentiment vs frequency)
 */
async function getBubbleData(filters = {}) {
  try {
    // CSV data manually copied from bubble_data.csv
    const bubbleDataset = [
      { x: 120336, y: 4.0, z: 23, word: "makeup", sentiment: "positive" },
      { x: 95081, y: 4.0, z: 26, word: "hair", sentiment: "negative" },
      { x: 47232, y: 4.2, z: 10, word: "look", sentiment: "positive" },
      { x: 15259, y: 4.5, z: 35, word: "skin", sentiment: "positive" },
      { x: 14707, y: 4.1, z: 13, word: "wig", sentiment: "positive" },
      { x: 14436, y: 3.9, z: 10, word: "video", sentiment: "positive" },
      { x: 14020, y: 4.2, z: 41, word: "beauty", sentiment: "positive" },
      { x: 11955, y: 4.3, z: 28, word: "color", sentiment: "positive" },
      { x: 10899, y: 3.4, z: 33, word: "guy", sentiment: "negative" },
      { x: 9964, y: 3.1, z: 15, word: "girl", sentiment: "positive" },
      { x: 9656, y: 4.1, z: 24, word: "foundation", sentiment: "negative" },
      { x: 8928, y: 3.9, z: 23, word: "lip", sentiment: "negative" },
      { x: 7797, y: 4.2, z: 6, word: "looking", sentiment: "positive" },
      { x: 7469, y: 4.1, z: 23, word: "eye", sentiment: "positive" },
      { x: 7219, y: 3.9, z: 25, word: "face", sentiment: "negative" },
      { x: 6892, y: 4.4, z: 21, word: "style", sentiment: "positive" },
      { x: 6599, y: 2.6, z: 7, word: "song", sentiment: "positive" },
      { x: 6555, y: 4.3, z: 21, word: "hairstyle", sentiment: "positive" },
      { x: 6117, y: 4.7, z: 1, word: "night", sentiment: "positive" },
      { x: 6075, y: 3.7, z: 14, word: "lipstick", sentiment: "negative" },
      { x: 5905, y: 4.1, z: 25, word: "colour", sentiment: "positive" },
      { x: 5435, y: 3.8, z: 13, word: "eyebrow", sentiment: "negative" },
      { x: 5360, y: 3.8, z: 1, word: "india", sentiment: "positive" },
      { x: 4685, y: 3.3, z: 62, word: "filter", sentiment: "negative" },
      { x: 4594, y: 3.7, z: 6, word: "god", sentiment: "positive" },
      { x: 4436, y: 3.1, z: 9, word: "baby", sentiment: "positive" },
      { x: 4175, y: 3.1, z: 7, word: "boy", sentiment: "positive" },
      { x: 4157, y: 4.3, z: 19, word: "tip", sentiment: "positive" },
      { x: 4153, y: 4.9, z: 3, word: "ginger", sentiment: "positive" },
      { x: 3949, y: 3.9, z: 54, word: "dress", sentiment: "positive" },
      { x: 3932, y: 3.8, z: 25, word: "voice", sentiment: "positive" },
      { x: 3727, y: 2.9, z: 16, word: "comment", sentiment: "negative" },
      { x: 3701, y: 3.6, z: 98, word: "shade", sentiment: "positive" },
      { x: 3611, y: 3.1, z: 26, word: "music", sentiment: "positive" },
      { x: 3609, y: 3.4, z: 25, word: "man", sentiment: "positive" },
      { x: 3577, y: 4.1, z: 26, word: "haircut", sentiment: "negative" },
      { x: 3571, y: 3.6, z: 30, word: "woman", sentiment: "negative" },
      { x: 3471, y: 4.0, z: 17, word: "nose", sentiment: "negative" },
      { x: 3351, y: 4.2, z: 74, word: "eyeliner", sentiment: "negative" },
      { x: 3327, y: 2.6, z: 2, word: "name", sentiment: "negative" },
      { x: 3304, y: 3.2, z: 11, word: "product", sentiment: "positive" },
      { x: 3268, y: 3.8, z: 23, word: "lady", sentiment: "positive" },
      { x: 3140, y: 3.0, z: 12, word: "mom", sentiment: "positive" },
      { x: 2988, y: 3.6, z: 11, word: "indian", sentiment: "positive" },
      { x: 2934, y: 3.5, z: 16, word: "sound", sentiment: "negative" },
      { x: 2903, y: 3.7, z: 59, word: "vibe", sentiment: "positive" },
      { x: 2673, y: 3.7, z: 20, word: "tutorial", sentiment: "positive" },
      { x: 2639, y: 4.3, z: 48, word: "smile", sentiment: "positive" },
      { x: 2604, y: 3.7, z: 34, word: "trend", sentiment: "negative" },
      { x: 2595, y: 4.5, z: 20, word: "fit", sentiment: "positive" },
    ];

    // Apply sentiment filter if provided
    let filteredData = bubbleDataset;
    if (filters.sentiment && filters.sentiment !== "all") {
      filteredData = bubbleDataset.filter(
        (item) => item.sentiment === filters.sentiment
      );
    }

    console.log(
      `Bubble data filtered by sentiment: ${
        filters.sentiment || "all"
      }. Returning ${filteredData.length} items.`
    );
    return filteredData;
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
  getWordCloudData,
  getTopicTrends,
  getTopicCorrelations,
};

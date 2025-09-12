const pool = require("../db");

/**
 * KPI Metrics Queries
 * SQL queries for content quality KPI calculations and metrics
 */

/**
 * Get KPI metrics (average, min, max scores, comment length, quality percentage)
 */
async function getKPIMetrics(filters = {}) {
  try {
    const { whereClause, params } = buildWhereClause(filters);
    const whereCondition = whereClause ? `WHERE ${whereClause}` : "";

    const query = `
      SELECT 
        ROUND(AVG(kpi * 10), 1) as "avgKPIScore",
        ROUND(MIN(kpi * 10), 1) as "minKPIScore", 
        ROUND(MAX(kpi * 10), 1) as "maxKPIScore",
        ROUND(COUNT(CASE WHEN kpi >= 0.7 THEN 1 END) * 100.0 / COUNT(*), 1) as "highQualityPercentage",
        COUNT(*) as "totalCommentsAnalyzed",
        COUNT(CASE WHEN is_spam = 1 THEN 1 END) as "spamDetected"
      FROM comments
      ${whereCondition}
      AND kpi IS NOT NULL
    `;

    const result = await pool.query(query, params);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching KPI metrics:", error);
    // Return fallback data if query fails
    return {
      avgKPIScore: 0,
      minKPIScore: 0,
      maxKPIScore: 0,
      highQualityPercentage: 0,
      totalCommentsAnalyzed: 0,
      spamDetected: 0,
    };
  }
}

/**
 * Get content quality distribution
 */
async function getQualityDistribution(filters = {}) {
  try {
    // TODO: Implement SQL query for quality score distribution
    // Should return quality score ranges and their percentages
    // Should support filters: dateFrom, dateTo, category, language

    const query = `
      -- TODO: Add SQL query here
      SELECT 1 as placeholder
    `;

    const result = await pool.query(query, []);
    return result.rows;
  } catch (error) {
    console.error("Error fetching quality distribution:", error);
    throw error;
  }
}

/**
 * Get KPI trend analysis over time
 */
async function getKPITrendData(filters = {}) {
  try {
    // TODO: Implement SQL query for KPI trends over time
    // Should return time-series data of KPI scores
    // Should support filters: dateFrom, dateTo, category, language

    const query = `
      -- TODO: Add SQL query here
      SELECT 1 as placeholder
    `;

    const result = await pool.query(query, []);
    return result.rows;
  } catch (error) {
    console.error("Error fetching KPI trend data:", error);
    throw error;
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
    const fromYear = extractYear(filters.dateFrom);
    const toYear = extractYear(filters.dateTo);

    whereConditions.push(
      `EXTRACT(YEAR FROM published_at) BETWEEN $${paramCount} AND $${
        paramCount + 1
      }`
    );
    params.push(parseInt(fromYear), parseInt(toYear));
    paramCount += 2;
  }

  if (filters.language) {
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

module.exports = {
  getKPIMetrics,
  getQualityDistribution,
  getKPITrendData,
};

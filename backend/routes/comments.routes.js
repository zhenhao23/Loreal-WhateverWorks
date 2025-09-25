const express = require("express");
const router = express.Router();
const { getTopComments } = require("../db/queries/comments.queries");

/**
 * POST /api/comments/top
 * Get paginated top comments for Content Quality KPI
 */
router.post("/top", async (req, res) => {
  try {
    console.log("Top comments pagination request received");
    console.log("Request body:", req.body);

    // Extract filters and pagination from request body
    const filters = {
      dateFilter: req.body.dateFilter,
      categoryFilter: req.body.categoryFilter || "all",
      languageFilter: req.body.languageFilter || "all",
      sentimentFilter: req.body.sentimentFilter || "all",
    };

    const pagination = {
      page: parseInt(req.body.page || 1),
      pageSize: parseInt(req.body.pageSize || 10),
    };

    console.log("Processed filters:", filters);
    console.log("Pagination params:", pagination);

    // Parse filters to match expected format
    const parsedFilters = {
      startYear: null,
      endYear: null,
      category:
        filters.categoryFilter === "all" ? null : filters.categoryFilter,
      language:
        filters.languageFilter === "all" ? null : filters.languageFilter,
      sentiment:
        filters.sentimentFilter === "all" ? null : filters.sentimentFilter,
    };

    // Parse date filter if provided
    if (
      filters.dateFilter &&
      Array.isArray(filters.dateFilter) &&
      filters.dateFilter.length === 2
    ) {
      parsedFilters.startYear = parseInt(filters.dateFilter[0]);
      parsedFilters.endYear = parseInt(filters.dateFilter[1]);
    }

    console.log("Parsed filters:", parsedFilters);

    // Get paginated comments data
    const startTime = Date.now();
    const topComments = await getTopComments(parsedFilters, pagination);
    const queryTime = Date.now() - startTime;

    console.log(`Comments query completed in ${queryTime}ms`);
    console.log(
      `Returning ${topComments.data ? topComments.data.length : 0} comments`
    );

    // Return the paginated comments response
    const response = {
      data: topComments,
      metadata: {
        generatedAt: new Date().toISOString(),
        filters: filters,
        pagination: pagination,
        queryTime: queryTime,
        dataSource: "database",
      },
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching top comments:", error);
    res.status(500).json({
      error: "Failed to fetch top comments",
      message: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

module.exports = router;

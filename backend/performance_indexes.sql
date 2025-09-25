-- PERFORMANCE OPTIMIZATION: Add Missing Indexes
-- These indexes will dramatically improve query performance

-- 1. INDEX ON KPI COLUMN (Most Important)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_comments_kpi 
ON comments (kpi) WHERE kpi IS NOT NULL;

-- 2. INDEX ON VIDEO_ID for JOINs
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_comments_video_id 
ON comments (video_id);

-- 3. INDEX ON PUBLISHED_AT for Timeline Queries
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_videos_published_at 
ON videos (published_at);

-- 4. COMPOSITE INDEX for Common Filters
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_comments_video_kpi 
ON comments (video_id, kpi) WHERE kpi IS NOT NULL;

-- 5. INDEX ON TOPIC_LABEL for Topic Queries
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_videos_topic_label 
ON videos (topic_label) WHERE topic_label IS NOT NULL;

-- 6. INDEX ON SENTIMENT COLUMNS for Sentiment Queries
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_comments_sentiment 
ON comments (positive, negative, neutral);

-- ANALYZE TABLES after adding indexes
ANALYZE comments;
ANALYZE videos;
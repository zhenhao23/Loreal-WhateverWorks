-- Database Schema for L'Oreal Analytics Platform
-- This file contains the SQL schema needed for the executive overview functionality

-- Create the main feedback table
CREATE TABLE IF NOT EXISTS feedback (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255),
    content TEXT NOT NULL,
    sentiment VARCHAR(20) CHECK (sentiment IN ('positive', 'negative', 'neutral')),
    category VARCHAR(100),
    language VARCHAR(50) DEFAULT 'english',
    likes_count INTEGER DEFAULT 0,
    replies_count INTEGER DEFAULT 0,
    is_spam BOOLEAN DEFAULT false,
    kpi_score DECIMAL(3,2), -- Score between 0.00 and 10.00
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_feedback_sentiment ON feedback(sentiment);
CREATE INDEX IF NOT EXISTS idx_feedback_category ON feedback(category);
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at);
CREATE INDEX IF NOT EXISTS idx_feedback_language ON feedback(language);
CREATE INDEX IF NOT EXISTS idx_feedback_user_id ON feedback(user_id);

-- Create a composite index for common filter combinations
CREATE INDEX IF NOT EXISTS idx_feedback_filters ON feedback(created_at, category, language);

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update the updated_at column
CREATE TRIGGER update_feedback_updated_at 
    BEFORE UPDATE ON feedback 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Sample data for testing (optional)
-- INSERT INTO feedback (user_id, content, sentiment, category, language, likes_count, replies_count, kpi_score) VALUES
-- ('user1', 'Love this new skincare product!', 'positive', 'skincare', 'english', 15, 3, 8.5),
-- ('user2', 'The makeup quality is not great', 'negative', 'makeup', 'english', 2, 1, 3.2),
-- ('user3', 'Average fragrance, nothing special', 'neutral', 'fragrance', 'english', 5, 0, 6.0),
-- ('user4', 'Amazing hair care results!', 'positive', 'hair care', 'english', 25, 8, 9.1),
-- ('user5', 'Good value for money', 'positive', 'mens', 'english', 12, 4, 7.8);

-- Create a view for common analytics queries
CREATE OR REPLACE VIEW analytics_summary AS
SELECT 
    DATE_TRUNC('month', created_at) as month,
    category,
    sentiment,
    language,
    COUNT(*) as count,
    AVG(likes_count) as avg_likes,
    AVG(replies_count) as avg_replies,
    AVG(kpi_score) as avg_kpi_score
FROM feedback 
GROUP BY DATE_TRUNC('month', created_at), category, sentiment, language;

-- Add comments to document the schema
COMMENT ON TABLE feedback IS 'Main table storing user feedback data for analytics';
COMMENT ON COLUMN feedback.sentiment IS 'Sentiment analysis result: positive, negative, or neutral';
COMMENT ON COLUMN feedback.category IS 'Product category (skincare, makeup, fragrance, hair care, mens)';
COMMENT ON COLUMN feedback.kpi_score IS 'Key Performance Indicator score from 0.00 to 10.00';
COMMENT ON COLUMN feedback.is_spam IS 'Flag indicating if the feedback is identified as spam';

-- Performance monitoring queries (for DBAs)
-- SELECT * FROM pg_stat_user_tables WHERE relname = 'feedback';
-- SELECT * FROM pg_stat_user_indexes WHERE relname LIKE 'idx_feedback%';

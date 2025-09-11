-- Database Schema for L'Oreal Analytics Platform
-- This file contains the SQL schema needed for the executive overview functionality

DROP DATABASE IF EXISTS loreal_analytics;
CREATE DATABASE loreal_analytics WITH ENCODING 'UTF8';
\c loreal_analytics;

SET client_encoding = 'UTF8';

-- Drop the existing table
DROP TABLE IF EXISTS comments;

-- Create the main comments table (based on final_dataset_with_kpi.csv)
CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    comment_id BIGINT,
    channel_id BIGINT,
    video_id BIGINT,
    author_id BIGINT,
    text_original TEXT,
    parent_comment_id DECIMAL,
    like_count INTEGER DEFAULT 0,
    published_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE,
    duplicated_flag INTEGER DEFAULT 0,
    cleaned_text TEXT,
    cleaned_text_sentiment TEXT,
    regex_spam DECIMAL(3,2) DEFAULT 0.0,
    predicted_spam DECIMAL(3,2) DEFAULT 0.0,
    is_spam INTEGER DEFAULT 0,
    is_english INTEGER DEFAULT 1,
    relevance_score DECIMAL(10,9),
    negative DECIMAL(10,9),
    neutral DECIMAL(10,9),
    positive DECIMAL(10,9),
    aspect TEXT, -- JSON array stored as text
    sentiment TEXT, -- JSON array stored as text
    kpi DECIMAL(10,9),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

COPY comments (
    comment_id, channel_id, video_id, author_id, 
    text_original, parent_comment_id, like_count, published_at, updated_at, 
    duplicated_flag, cleaned_text, cleaned_text_sentiment, regex_spam, predicted_spam, 
    is_spam, is_english, relevance_score, negative, neutral, positive, 
    aspect, sentiment, kpi
)
FROM 'C:\Users\weezh\OneDrive\Desktop\Loreal WhateverWorks\final_dataset_with_kpi.csv'
WITH (FORMAT CSV, HEADER true, ENCODING 'UTF8');




-- Drop the existing videos table if it exists
DROP TABLE IF EXISTS videos;

-- Create the videos table with the correct structure based on video_with_engagement_score.csv
CREATE TABLE IF NOT EXISTS videos (
    id SERIAL PRIMARY KEY,
    video_id BIGINT,
    published_at TIMESTAMP WITH TIME ZONE,
    channel_id BIGINT,
    title TEXT,
    description TEXT,
    tags TEXT,
    default_language VARCHAR(10),
    default_audio_language VARCHAR(10),
    content_duration VARCHAR(20), -- Keeping as VARCHAR since it's in PT format (PT9S, PT45S)
    view_count DECIMAL(10,1),
    like_count DECIMAL(10,1),
    comment_count DECIMAL(10,1),
    topic_categories TEXT, -- JSON array as text
    cleaned_text TEXT,
    is_english INTEGER DEFAULT 1,
    translated TEXT,
    extracted_topic_categories TEXT, -- JSON array as text
    extracted_topic_categories_str TEXT,
    dominant_topic TEXT,
    topic_confidence DECIMAL(5,4),
    topic_label TEXT,
    average_kpi DECIMAL(10,9),
    comment_count_processed DECIMAL(10,1),
    video_engagement_score DECIMAL(10,9),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

COPY videos (
    video_id, published_at, channel_id, title, description, tags,
    default_language, default_audio_language, content_duration, view_count,
    like_count, comment_count, topic_categories, cleaned_text, is_english,
    translated, extracted_topic_categories, extracted_topic_categories_str,
    dominant_topic, topic_confidence, topic_label, average_kpi, comment_count_processed, video_engagement_score
)
FROM 'C:\Users\weezh\OneDrive\Desktop\Loreal WhateverWorks\video_with_engagement_score.csv'
WITH (FORMAT CSV, HEADER true, ENCODING 'UTF8');

-- Drop existing tables if they exist
DROP TABLE IF EXISTS comments_after_spam;
DROP TABLE IF EXISTS comments_after_spam_eng;

-- Create comments_after_spam table (based on final_after_spam.csv)
CREATE TABLE IF NOT EXISTS comments_after_spam (
    id SERIAL PRIMARY KEY,
    comment_id BIGINT,
    channel_id BIGINT,
    video_id BIGINT,
    author_id BIGINT,
    text_original TEXT,
    parent_comment_id DECIMAL,
    like_count INTEGER DEFAULT 0,
    published_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE,
    duplicated_flag INTEGER DEFAULT 0,
    cleaned_text TEXT,
    cleaned_text_sentiment TEXT,
    regex_spam DECIMAL(3,2) DEFAULT 0.0,
    predicted_spam DECIMAL(3,2) DEFAULT 0.0,
    is_spam INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

COPY comments_after_spam (
    comment_id, channel_id, video_id, author_id, 
    text_original, parent_comment_id, like_count, published_at, updated_at, 
    duplicated_flag, cleaned_text, cleaned_text_sentiment, regex_spam, predicted_spam, 
    is_spam
)
FROM 'C:\Users\weezh\OneDrive\Desktop\Loreal WhateverWorks\final_after_spam.csv'
WITH (FORMAT CSV, HEADER true, ENCODING 'UTF8');

-- Create comments_after_spam_eng table (based on final_after_spam_eng.csv)
CREATE TABLE IF NOT EXISTS comments_after_spam_eng (
    id SERIAL PRIMARY KEY,
    comment_id BIGINT,
    channel_id BIGINT,
    video_id BIGINT,
    author_id BIGINT,
    text_original TEXT,
    parent_comment_id DECIMAL,
    like_count INTEGER DEFAULT 0,
    published_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE,
    duplicated_flag INTEGER DEFAULT 0,
    cleaned_text TEXT,
    cleaned_text_sentiment TEXT,
    regex_spam DECIMAL(3,2) DEFAULT 0.0,
    predicted_spam DECIMAL(3,2) DEFAULT 0.0,
    is_spam INTEGER DEFAULT 0,
    is_english INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

COPY comments_after_spam_eng (
    comment_id, channel_id, video_id, author_id, 
    text_original, parent_comment_id, like_count, published_at, updated_at, 
    duplicated_flag, cleaned_text, cleaned_text_sentiment, regex_spam, predicted_spam, 
    is_spam, is_english
)
FROM 'C:\Users\weezh\OneDrive\Desktop\Loreal WhateverWorks\final_after_spam_eng.csv'
WITH (FORMAT CSV, HEADER true, ENCODING 'UTF8');

-- Verify the imports
SELECT COUNT(*) as total_comments FROM comments;
SELECT COUNT(*) as total_videos FROM videos;
SELECT COUNT(*) as total_comments_after_spam FROM comments_after_spam;
SELECT COUNT(*) as total_comments_after_spam_eng FROM comments_after_spam_eng;
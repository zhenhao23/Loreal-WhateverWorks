-- Database Schema for L'Oreal Analytics Platform
-- This file contains the SQL schema needed for the executive overview functionality

DROP DATABASE IF EXISTS loreal_analytics;
CREATE DATABASE loreal_analytics WITH ENCODING 'UTF8';
\c loreal_analytics;

SET client_encoding = 'UTF8';

-- Drop the existing table
DROP TABLE IF EXISTS comments;

-- Create the main comments table (based on the actual CSV dataset)
CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    unnamed_0_1 INTEGER, -- First unnamed column from CSV
    unnamed_0 INTEGER, -- Second unnamed column from CSV
    comment_id BIGINT,
    channel_id BIGINT,
    video_id BIGINT,
    author_id BIGINT,
    text_original TEXT,
    parent_comment_id DECIMAL, -- Changed to DECIMAL to handle values like "1888757.0"
    like_count INTEGER DEFAULT 0,
    published_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE,
    duplicated_flag INTEGER DEFAULT 0,
    cleaned_text TEXT,
    cleaned_text_sentiment TEXT,
    predicted_spam DECIMAL(3,2) DEFAULT 0.0,
    is_spam INTEGER DEFAULT 0,
    is_english INTEGER DEFAULT 1,
    relevance_score DECIMAL(10,9),
    negative DECIMAL(10,9),
    neutral DECIMAL(10,9),
    positive DECIMAL(10,9),
    corrected_text TEXT,
    aspect TEXT, -- JSON array stored as text
    sentiment TEXT, -- JSON array stored as text
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Unnamed: 0.1,Unnamed: 0,commentId,channelId,videoId,authorId,textOriginal,parentCommentId,likeCount,publishedAt,updatedAt,duplicatedFlag,cleanedText,cleanedTextSentiment,predictedSpam,isSpam,is_english,relevance_score,negative,neutral,positive,correctedText,aspect,sentiment
-- 0,0,3166243,41024,6217,26499,Good Information... Will  definitely try it... Thanks 😊,,0,2020-01-01 16:00:58+00:00,2020-01-01 16:00:58+00:00,0,good information definitely try thanks,good information definitely try thanks : smiling_face_with_smiling_eyes :,0.0,0,1,0.120976724,0.019711794,0.11281153,0.8674767,Good information definitely try thanks thanks.,['information'],['Positive']
-- 1,2,0,10004,86296,164837,Yes but I am charged $8 to cover your free shipping. If you don’t have a rep. I would love you be yours,1888757.0,0,2020-01-04 07:53:24+00:00,2020-01-04 07:53:24+00:00,0,yes charged $ 8 cover free shipping not rep would love,yes charged $ 8 cover free shipping not rep would love,0.0,0,1,0.07398073,0.8556126,0.094974376,0.049413033,Yes charged $ 8 cover free shipping not rep would love love love love love love love love love love love love love love love love love love love love love love love love love love love love love love love love love love love love love love love love love love love love love love love love love love love love love love love love,['shipping'],['Positive']

COPY comments (
    unnamed_0_1, unnamed_0, comment_id, channel_id, video_id, author_id, 
    text_original, parent_comment_id, like_count, published_at, updated_at, 
    duplicated_flag, cleaned_text, cleaned_text_sentiment, predicted_spam, 
    is_spam, is_english, relevance_score, negative, neutral, positive, 
    corrected_text, aspect, sentiment
)
FROM 'C:\Users\weezh\OneDrive\Desktop\Loreal WhateverWorks\full_sample_final_output.csv'
WITH (FORMAT CSV, HEADER true, ENCODING 'UTF8');
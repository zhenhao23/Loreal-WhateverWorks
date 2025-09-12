import pandas as pd
import numpy as np
import ast
import re
from collections import defaultdict

def parse_aspect_array(aspect_str):
    """
    Parse aspect string like "['makeup tutorial', 'lip']" into a list of words
    """
    if pd.isna(aspect_str) or aspect_str == '' or aspect_str == '[]':
        return []
    
    try:
        # Handle string representation of list
        if isinstance(aspect_str, str):
            # Remove extra spaces and fix formatting
            aspect_str = aspect_str.strip()
            if aspect_str.startswith('[') and aspect_str.endswith(']'):
                # Use ast.literal_eval for safe evaluation
                aspects = ast.literal_eval(aspect_str)
                return [word.strip() for word in aspects if word.strip()]
            else:
                # Fallback: split by comma and clean
                aspects = [word.strip().strip("'\"") for word in aspect_str.split(',')]
                return [word for word in aspects if word]
        return []
    except:
        # Fallback parsing for malformed strings
        try:
            # Remove brackets and quotes, then split
            clean_str = re.sub(r'[\[\]\'"]', '', aspect_str)
            aspects = [word.strip() for word in clean_str.split(',') if word.strip()]
            return aspects
        except:
            return []

def determine_sentiment(row):
    """
    Determine sentiment based on highest score among negative, neutral, positive
    """
    scores = {
        'negative': float(row.get('negative', 0) or 0),
        'neutral': float(row.get('neutral', 0) or 0),
        'positive': float(row.get('positive', 0) or 0)
    }
    
    return max(scores, key=scores.get)

def calculate_replies(df, comment_id):
    """
    Calculate number of replies for a given comment
    """
    return len(df[df['parentCommentId'] == comment_id])

def process_bubble_data(csv_path, output_path):
    """
    Process the CSV file and create bubble chart data
    """
    print("Loading CSV file...")
    df = pd.read_csv(csv_path)
    
    print(f"Loaded {len(df)} rows")
    
    # Filter out spam and non-English comments
    df_filtered = df[
        (df['isSpam'] == 0) & 
        (df['is_english'] == 1) & 
        (df['aspect'].notna()) & 
        (df['aspect'] != '') &
        (df['aspect'] != '[]')
    ].copy()
    
    print(f"After filtering: {len(df_filtered)} rows")
    
    # Calculate replies for each comment
    print("Calculating replies...")
    df_filtered['reply_count'] = df_filtered['commentId'].apply(
        lambda x: calculate_replies(df, x)
    )
    
    # Determine sentiment for each comment
    print("Determining sentiment...")
    df_filtered['determined_sentiment'] = df_filtered.apply(determine_sentiment, axis=1)
    
    # Extract words from aspect column
    print("Extracting words from aspects...")
    word_data = []
    
    for idx, row in df_filtered.iterrows():
        if idx % 1000 == 0:
            print(f"Processing row {idx}/{len(df_filtered)}")
            
        aspects = parse_aspect_array(row['aspect'])
        
        for word in aspects:
            if len(word.strip()) > 2:  # Only include words longer than 2 characters
                word_data.append({
                    'word': word.strip().lower(),
                    'kpi': float(row['KPI'] or 0),
                    'like_count': int(row['likeCount'] or 0),
                    'reply_count': int(row['reply_count']),
                    'sentiment': row['determined_sentiment']
                })
    
    print(f"Extracted {len(word_data)} word instances")
    
    # Convert to DataFrame for easier processing
    word_df = pd.DataFrame(word_data)
    
    # Group by word and calculate statistics
    print("Calculating word statistics...")
    
    word_stats = word_df.groupby('word').agg({
        'kpi': ['count', 'mean'],  # count = frequency, mean = average KPI
        'like_count': 'mean',
        'reply_count': 'mean',
        'sentiment': lambda x: x.mode().iloc[0] if len(x.mode()) > 0 else 'neutral'
    }).reset_index()
    
    # Flatten column names
    word_stats.columns = ['word', 'frequency', 'avg_kpi', 'avg_likes', 'avg_replies', 'dominant_sentiment']
    
    # Filter words that appear at least twice
    word_stats = word_stats[word_stats['frequency'] >= 2]
    
    # Calculate final metrics
    word_stats['x'] = word_stats['frequency']  # X-axis: frequency
    word_stats['y'] = (word_stats['avg_kpi'] * 10).round(1)  # Y-axis: KPI score (0-10 scale)
    word_stats['z'] = (word_stats['avg_likes'] + word_stats['avg_replies']).round(0).astype(int)  # Z-axis: total engagement
    
    # Select final columns
    result_df = word_stats[['x', 'y', 'z', 'word', 'dominant_sentiment']].rename(
        columns={'dominant_sentiment': 'sentiment'}
    )
    
    # Sort by frequency and KPI
    result_df = result_df.sort_values(['x', 'y'], ascending=[False, False])
    
    # Limit to top 50 words for performance
    result_df = result_df.head(50)
    
    print(f"Final dataset: {len(result_df)} unique words")
    
    # Save to CSV
    result_df.to_csv(output_path, index=False)
    print(f"Saved bubble data to: {output_path}")
    
    # Print sample results
    print("\nSample results:")
    print(result_df.head(10))
    
    return result_df

def main():
    input_csv = r"C:\Users\weezh\OneDrive\Desktop\Loreal WhateverWorks\final_dataset_with_kpi.csv"
    output_csv = r"C:\Users\weezh\OneDrive\Desktop\Loreal WhateverWorks\bubble_data.csv"
    
    try:
        bubble_data = process_bubble_data(input_csv, output_csv)
        
        print("\n=== SUMMARY ===")
        print(f"Total unique words: {len(bubble_data)}")
        print(f"Frequency range: {bubble_data['x'].min()} - {bubble_data['x'].max()}")
        print(f"KPI score range: {bubble_data['y'].min()} - {bubble_data['y'].max()}")
        print(f"Engagement range: {bubble_data['z'].min()} - {bubble_data['z'].max()}")
        print(f"Sentiment distribution:")
        print(bubble_data['sentiment'].value_counts())
        
    except Exception as e:
        print(f"Error processing data: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()

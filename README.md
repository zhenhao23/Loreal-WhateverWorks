# 📊 Data Analysis Pipeline: Video & Comment Analysis

## Overview

This project builds a full pipeline for analyzing **YouTube videos and comments**. The flow is:

1. Understand and clean raw data
2. Detect and filter spam comments
3. Preprocess videos and comments for NLP tasks
4. Perform relevance scoring and sentiment analysis
5. Categorize videos into meaningful groups

The workflow integrates classical preprocessing with modern transformer models for text classification, sentiment, and similarity tasks.

---

## 🔄 Workflow

### 1. Data Understanding & Cleaning

Datasets:

- **Videos Table (videos.csv)**
- **Comments Table (comments.csv)** :5 datasets combined into one

Steps:

- Combined 5 comment datasets
- Checked columns, nulls, unique values
- Visualized numeric features
- Removed row duplicates by commentId & videoId
- Removed non-informative columns

  - Videos: `kind`, `favouriteCount` (always 0)
  - Comments: `kind`

- Data type correction:

  - Converted timestamps → datetime
  - Converted IDs → strings

- Handled null values:

  - Dropped null `textOriginal` comments
  - Removed videos with many nulls

---

### 2. Data Preprocessing (1)

#### **Videos**

- Extract Topic Categories from URLs
  - Use regex to grab anything after 'wiki/' from 'topicCategories' column.

  - Two new columns:
    - 'extracted_topicCategories': List of topics for each video
    - 'extracted_topicCategories_str': Comma-seperated string of topics for each video

  - Flatten and Count frequency of each Topic Category 
  - Define and Remove videos with Target Categories (Irrelevant Categories)
  - 'video_filtered': dataframe that contains only videos outside targe categories
  - Remove Videos with like count greater than view count

- Clean_text function performs preprocessing steps including:

  - Lowercasing
  - Expanding Contractions
  - Removing Mentions, Hashtags, Links, Emojis, Punctuation
  - Normalizing elongated words
  - Collapsing whitespace
  - Tokenizing
  - Removing Stopwords
  - Lemmatizing
 
- 'cleanedText': column created after applying Clean_text function to clean video titles
- Detected English titles (`langid`) → `is_english` column
- Translated non-English titles using Google Translator

#### **Comments**

- Filter out irrelevant videos
- Convert 'publishedAt' -> Datetime
- Sort 'publishedAt' in ascending order
- Added `duplicatedFlag`: same authorId + same videoId + same textOriginal

- Clean_text function performs preprocessing steps including

  - Lowercasing
  - Expanding Contractions
  - Removing Mentions, Hashtags, Links, Emojis, Punctuation
  - Normalizing elongated words
  - Collapsing whitespace
  - Tokenizing
  - Removing Stopwords
  - Lemmatizing
 
- Tagged duplicated text (checked after cleaning)

---

### 3. Spam Detection

#### Semi-Supervised Spam Detection:

#### Train

- Calculate duplication ratio per author and video

  - Duplicated comment / total comment
  - Find the maximum duplication ratio across all videos for each author.
  - Idenfity authors as spammers based on duplication ratio (>=0.7)
 
- Filter out spammers from main dataset
- Filter out spam comment based on:

  - missing values
  - presence of links
  - very short comments (<3 words)
  - emoji-only comments
  - comments with emojis more than words

- Supervised Training 
  - Manually labeled data
  - Split labeled data into training and validation sets
  - Define Evaluation metrics function including:
 
    - accuracy
    - precision
    - recall
    - F1
   
  - Dataset Setup:
    - HuggingFace tokenizer
      - 'Dataset.from_dict'
      - tokenizes training and validation texts
     
    - Custom PyTourch
      - CommentDataset class used to wrap tokenized encodings and labels
     
    - Initialize Model, Set Training Arguments and Train
      - Loads a ready-made language model
      - 2 labels → spam vs not spam
      - Train for 2 full passes over the data
      - Use 200 comments per batch
      - Save results at the end of each pass
      - Evaluate Trained Model on Validation Set
      - Save Trained Model and Tokenizer

    - Semi-Supervised Training (1)
    - Prediction
      - Select subset of non-duplicate comments
      - Select first 10000 comments for batch prediction
      - load trained model and tokenizer for inference
      - Define batch scoring function (returning the predited probabilities (spam or not spam) for each class)
      - Score first prediction batch and add probability columns
     
    - Supervised Training (1)
      - Calculate uncertainty margin and select uncertain samples
      - Load trained model and tokenizer for inference
      - Load Manually labeled data, clean labels and split data
      - Tokenzize, Prepare Datasets and Train Model

        - Define custom PyTorch dataset class
        - Sets up HuggingFace
        - Initialized Trainer
        - Evaluate Trained Model on Validation Set
        - Save Trained Model andTokenizer
       
      - Semi-Supervised Training (2)
      - Prediction
        - Select unlabeled comments for batch prediction
        - load trained model and tokenizer for inference
        - Define batch scoring function for unlabeled data
        - Score second prediction batch and add probability columns
        - Calculate Uncertainty Margin and Select Top Confident Samples for next stage of processing
       
      - Supervised Training (2)
        - Calculate uncertainty margin and select uncertain samples
        - Export uncertain samples for manual labeling
       
      - Semi-Supervised Training (3)
        - Load Trained model and tokenizer for inference
        - load trained model and tokenizer for inference
        - clean labels and split data for training and validation
        - Train or evaluate model
        - Evaluate Traine model on validation set
        - Save model from round 3




- Duplicated text → spam
- Regex rules for spam:

  - NaN text
  - Contains links
  - Very short (1–2 words)
  - Emoji-only
  - Emoji > words

#### Approaches:

**Flow 1 (Initial):**

- Used pretrained `prajjwal1/bert-tiny`
- Trained on 500,000 comments
- Evaluated with accuracy, precision, recall, F1
- Predicted rest of dataset

**Flow 2 (Final, Semi-Supervised):**

- Manually labeled 6,000 comments (700 spam, 5,300 non-spam)
- Trained `bert-tiny` → performance:

  - Accuracy: **0.888**
  - Precision: **0.908**
  - Recall: **0.589**
  - F1: **0.71**

- Iterative improvement:

  - Predicted 10,000 comments
  - Margin sampling (uncertain predictions)
  - Manually labeled 1,000 comments (3 rounds)
  - Retrained after each round

- Final model used to predict entire dataset

---

### 4. Data Preprocessing (2)

- Filtered dataset with **no spam comments**
- Detected English comments (`langid`)
- Filtered only English comments

Skipped steps (future improvement):

- **Translation** → too slow, may distort sentiment, costly for large-scale
- **Spelling correction** → slang/shortcuts too diverse, existing models (edit distance, noisy channel, grammar correction) failed

---

### 5. Similarity Scoring

- Merged videos with comments
- Used `sentence-transformers/all-MiniLM-L6-v2`
- Computed similarity between video title and comment

---

### 6. Sentiment Analysis

#### Models used:

- **nlptown/bert-base-multilingual-uncased-sentiment**

  - Classified comments into: Negative, Neutral, Positive

- **VADER** (baseline)

- **TextBlob**

#### Aspect-Based Sentiment

- Used `pyabsa`
- Extracted subject-level sentiment from each comment

---

### 7. Video Categorization

- Vectorized video titles using `CountVectorizer`
- Tuned hyperparameters
- Applied **NMF (Non-Negative Matrix Factorization)**
- Extracted keywords per group
- Labeled group names
- Assigned each video to most relevant group

---

## ⚙️ Models Used

| Task                   | Model/Method                                                        |
| ---------------------- | ------------------------------------------------------------------- |
| Spam Detection         | `prajjwal1/bert-tiny` (semi-supervised)                             |
| Translation            | Google Translator (skipped in pipeline)                             |
| Sentence Transformer   | `all-MiniLM-L6-v2`                                                  |
| Sentiment Analysis     | `nlptown/bert-base-multilingual-uncased-sentiment`, VADER, TextBlob |
| Aspect-Based Sentiment | `pyabsa`                                                            |
| Video Categorization   | CountVectorizer + NMF                                               |

---

## 📌 Notes & Limitations

- Translation step skipped (time, cost, risk of sentiment distortion)
- Spelling correction skipped (slang and evolving internet language)
- Lightweight models used (`bert-tiny`) due to hardware limits (RAM)

---

## 🚀 Future Work

- Apply contextual spelling correction with transformer-based models

---

# 🏗️ Web Application Tech Stack

This project is built using a modern full-stack architecture with **React (frontend)**, **Node.js (backend)**, **PostgreSQL (database)**, and additional tools for **data analysis** and **AI chatbot features**.

![Architecture Diagram](./assets/architecture.png)

---

## 🖥️ Frontend

- **React**

  - Provides the user interface.
  - Built with **HTML, CSS, JavaScript**.
  - Users can upload datasets or prompts and view results interactively.

---

## ⚙️ Backend

- **Node.js**

  - Handles application logic, routes, and API requests.
  - Connects the frontend with the database, data analysis, and chatbot services.
  - Provides **RESTful APIs** with JSON responses.

---

## 🗄️ Database

- **PostgreSQL**

  - Relational database for storing datasets and processed results.
  - Accessed through SQL queries from the backend.

---

## 📊 Data Analysis

- **Python**

  - Used for data cleaning, aggregation, and feature extraction.
  - Processes raw datasets and returns results back to the backend.

---

## 🤖 Chatbot & AI

- **Dify**

  - Provides agentic AI workflows and Retrieval-Augmented Generation (RAG) pipelines.

- **OpenAI**

  - Embedding models and LLM APIs for natural language understanding and responses.

---

## 🔗 How It All Connects

1. Users provide datasets or prompts via the **React frontend**.
2. **Node.js backend** sends data to the database, Python services, or chatbot.
3. Results are processed and returned as JSON.
4. The **frontend displays results** to users in real time.

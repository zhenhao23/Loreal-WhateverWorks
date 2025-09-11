# 📊 Data Analysis Pipeline: Video & Comment Analysis

## Overvie

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

- **Videos Table**
- **Comments Table** (5 datasets combined into one)

Steps:

- Combined 5 comment datasets
- Checked columns, nulls, unique values
- Visualized numeric features
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

- Cleaned titles (`cleanedText`):

  - Lowercased, expanded contractions
  - Removed mentions, hashtags, links, emojis, punctuation
  - Normalized elongated words, whitespace
  - Lemmatized tokens

- Detected English titles (`langid`) → `is_english` column
- Translated non-English titles using Google Translator
- Categorized videos using `topicCategories` (removed irrelevant ones)

#### **Comments**

- Added `duplicatedFlag`: same author + same video + same text
- Cleaned text (`cleanedText`) with same pipeline as video titles
- Tagged duplicated text (checked after cleaning)
- Removed irrelevant comments from irrelevant videos (via `videoId` join)

---

### 3. Spam Detection

#### Rules:

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

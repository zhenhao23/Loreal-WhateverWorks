// Mock data for Sentiment Analysis by Topic and Category
// Based on comment_sentiment_analysis.csv

export interface TopicSentimentData {
  topic: string;
  count: number;
}

export interface CategorySentimentData {
  category: string;
  negativeTopics: TopicSentimentData[];
  positiveTopics: TopicSentimentData[];
}

// Makeup Category Data
export const makeupSentimentData: CategorySentimentData = {
  category: "Makeup",
  negativeTopics: [
    { topic: "makeup", count: 38586 },
    { topic: "foundation", count: 25560 },
    { topic: "skin", count: 25948 },
    { topic: "face", count: 30304 },
    { topic: "hair", count: 26419 },
  ],
  positiveTopics: [
    { topic: "makeup", count: 42644 },
    { topic: "hair", count: 31703 },
    { topic: "video", count: 35313 },
    { topic: "look", count: 35119 },
    { topic: "looking", count: 32068 },
  ],
};

// Hair Category Data
export const hairSentimentData: CategorySentimentData = {
  category: "Hair",
  negativeTopics: [
    { topic: "makeup", count: 15042 },
    { topic: "hair", count: 29663 },
    { topic: "colour", count: 14532 },
    { topic: "haircut", count: 14484 },
    { topic: "cut", count: 13918 },
  ],
  positiveTopics: [
    { topic: "makeup", count: 17754 },
    { topic: "hair", count: 41087 },
    { topic: "color", count: 17314 },
    { topic: "beauty", count: 17364 },
    { topic: "wig", count: 16855 },
  ],
};

// Skin Category Data
export const skinSentimentData: CategorySentimentData = {
  category: "Skin",
  negativeTopics: [
    { topic: "makeup", count: 7662 },
    { topic: "lip", count: 6794 },
    { topic: "skin", count: 6499 },
    { topic: "face", count: 6946 },
    { topic: "hair", count: 6961 },
  ],
  positiveTopics: [
    { topic: "makeup", count: 9861 },
    { topic: "skin", count: 9475 },
    { topic: "video", count: 8474 },
    { topic: "song", count: 9080 },
    { topic: "eye", count: 7957 },
  ],
};

// Perfume Category Data
export const perfumeSentimentData: CategorySentimentData = {
  category: "Perfume",
  negativeTopics: [
    { topic: "makeup", count: 4948 },
    { topic: "skin", count: 4274 },
    { topic: "hair", count: 4510 },
    { topic: "filter", count: 4979 },
    { topic: "tape", count: 4419 },
  ],
  positiveTopics: [
    { topic: "makeup", count: 4735 },
    { topic: "skin", count: 4448 },
    { topic: "look", count: 5185 },
    { topic: "fiona", count: 4656 },
    { topic: "editing", count: 4251 },
  ],
};

// Body Category Data
export const bodySentimentData: CategorySentimentData = {
  category: "Body",
  negativeTopics: [
    { topic: "makeup", count: 3294 },
    { topic: "foundation", count: 3504 },
    { topic: "color", count: 3215 },
    { topic: "hair", count: 2969 },
    { topic: "eyelash", count: 3094 },
  ],
  positiveTopics: [
    { topic: "makeup", count: 3934 },
    { topic: "look", count: 4981 },
    { topic: "voice", count: 4694 },
    { topic: "accent", count: 4086 },
    { topic: "colour", count: 3733 },
  ],
};

// Overall Sentiment Data (topics with overall counts)
export const overallSentimentData: CategorySentimentData = {
  category: "Overall",
  negativeTopics: [
    { topic: "makeup", count: 91309 },
    { topic: "lip", count: 60058 },
    { topic: "color", count: 57965 },
    { topic: "foundation", count: 57817 },
    { topic: "skin", count: 56117 },
  ],
  positiveTopics: [
    { topic: "makeup", count: 136391 },
    { topic: "skin", count: 66937 },
    { topic: "foundation", count: 65232 },
    { topic: "lip", count: 61057 },
    { topic: "color", count: 59046 },
  ],
};

// Combined data for easy access
export const allCategorySentimentData: CategorySentimentData[] = [
  overallSentimentData,
  makeupSentimentData,
  hairSentimentData,
  skinSentimentData,
  perfumeSentimentData,
  bodySentimentData,
];

// Helper function to get sentiment data by category
export const getSentimentDataByCategory = (
  category: string
): CategorySentimentData | undefined => {
  return allCategorySentimentData.find(
    (data) => data.category.toLowerCase() === category.toLowerCase()
  );
};

// Helper function to get top N topics for a category
export const getTopTopics = (
  categoryData: CategorySentimentData,
  sentiment: "positive" | "negative",
  topN: number = 10
): TopicSentimentData[] => {
  const topics =
    sentiment === "positive"
      ? categoryData.positiveTopics
      : categoryData.negativeTopics;
  return topics.sort((a, b) => b.count - a.count).slice(0, topN);
};

// Helper function to calculate sentiment ratio
export const getSentimentRatio = (categoryData: CategorySentimentData) => {
  const totalNegative = categoryData.negativeTopics.reduce(
    (sum, topic) => sum + topic.count,
    0
  );
  const totalPositive = categoryData.positiveTopics.reduce(
    (sum, topic) => sum + topic.count,
    0
  );
  const total = totalNegative + totalPositive;

  return {
    negative: total > 0 ? ((totalNegative / total) * 100).toFixed(1) : 0,
    positive: total > 0 ? ((totalPositive / total) * 100).toFixed(1) : 0,
    totalNegative,
    totalPositive,
    total,
  };
};

export default allCategorySentimentData;

// Mock data for Best Video Topic Summary component
export const mockBestVideoTopicData = [
  {
    topic: "skin",
    keywords: ["journey", "tutorial", "transformation", "results", "routine"],
    bestDurationGroup: "3-4 min",
    bestDay: "Sunday",
    bestTime: 21,
    bestTitleLength: "16-20 words",
    top5Hashtags: ["#shorts", "#skincare", "#makeup", "#39", "#lipstick"],
    avgEngagement: 35.6,
    bestEngagement: 85.4,
    perentIncrease: 140.1,
  },
  {
    topic: "body",
    keywords: ["secret", "results", "transformation"],
    bestDurationGroup: "<1 min",
    bestDay: "Thursday",
    bestTime: 3,
    bestTitleLength: "7-10 words",
    top5Hashtags: ["#39", "#shorts", "#viral", "#skincare", "#perfume"],
    avgEngagement: 38.2,
    bestEngagement: 79.2,
    perentIncrease: 107.2,
  },
  {
    topic: "hair",
    keywords: [
      "journey",
      "tips",
      "top",
      "grwm",
      "results",
      "review",
      "routine",
    ],
    bestDurationGroup: "2-3 min",
    bestDay: "Tuesday",
    bestTime: 17,
    bestTitleLength: "1-3 words",
    top5Hashtags: ["#shorts", "#hair", "#hairstyle", "#haircare", "#trending"],
    avgEngagement: 38.1,
    bestEngagement: 82.7,
    perentIncrease: 116.8,
  },
  {
    topic: "perfume",
    keywords: ["hack", "grwm", "tutorial", "transformation", "routine"],
    bestDurationGroup: "<5 min",
    bestDay: "Thursday",
    bestTime: 18,
    bestTitleLength: "1-2 words",
    top5Hashtags: ["#makeup", "#shorts", "#beauty", "#brows", "#bts"],
    avgEngagement: 36.5,
    bestEngagement: 79.6,
    perentIncrease: 118.3,
  },
  {
    topic: "makeup",
    keywords: ["review", "top", "trending", "tips"],
    bestDurationGroup: "2-3 min",
    bestDay: "Sunday",
    bestTime: 14,
    bestTitleLength: "1-3 words",
    top5Hashtags: [
      "#shorts",
      "#makeup",
      "#beauty",
      "#viral",
      "#makeuptutorial",
    ],
    avgEngagement: 39.4,
    bestEngagement: 78.8,
    perentIncrease: 99.9,
  },
];

// Summary statistics for the best video topics
export const mockBestVideoTopicSummary = {
  totalTopics: 5,
  topicCategories: ["skin", "body", "hair", "perfume", "makeup"],
  mostPopularDay: "Sunday", // appears twice
  mostPopularTime: 17, // average of all times
  mostCommonDuration: "<5 min", // appears twice
  totalUniqueHashtags: 15,
  totalUniqueKeywords: 12,
};

// Duration group statistics
export const mockDurationGroupStats = [
  { duration: "<5 min", topics: ["body", "perfume"], count: 2, percentage: 40 },
  { duration: "5-15 min", topics: ["makeup"], count: 1, percentage: 20 },
  { duration: "15-30 min", topics: ["skin", "hair"], count: 2, percentage: 40 },
];

// Day of week statistics
export const mockDayOfWeekStats = [
  { day: "Sunday", topics: ["skin", "makeup"], count: 2, percentage: 40 },
  { day: "Tuesday", topics: ["hair"], count: 1, percentage: 20 },
  { day: "Thursday", topics: ["body", "perfume"], count: 2, percentage: 40 },
];

// Time of day statistics (24-hour format)
export const mockTimeOfDayStats = [
  { timeRange: "0-6", topics: ["body"], count: 1, label: "Early Morning" },
  { timeRange: "7-12", topics: [], count: 0, label: "Morning" },
  {
    timeRange: "13-18",
    topics: ["makeup", "hair"],
    count: 2,
    label: "Afternoon",
  },
  {
    timeRange: "19-24",
    topics: ["skin", "perfume"],
    count: 2,
    label: "Evening",
  },
];

// Title length statistics
export const mockTitleLengthStats = [
  {
    lengthRange: "1-3 words",
    topics: ["hair", "makeup"],
    count: 2,
    percentage: 40,
  },
  { lengthRange: "7-10 words", topics: ["body"], count: 1, percentage: 20 },
  {
    lengthRange: "16-20 words",
    topics: ["skin", "perfume"],
    count: 2,
    percentage: 40,
  },
];

// Most common hashtags across all topics
export const mockHashtagFrequency = [
  {
    hashtag: "#shorts",
    frequency: 5,
    topics: ["skin", "body", "hair", "perfume", "makeup"],
  },
  { hashtag: "#makeup", frequency: 3, topics: ["skin", "perfume", "makeup"] },
  { hashtag: "#beauty", frequency: 2, topics: ["perfume", "makeup"] },
  { hashtag: "#skincare", frequency: 2, topics: ["skin", "body"] },
  { hashtag: "#viral", frequency: 2, topics: ["body", "makeup"] },
  { hashtag: "#39", frequency: 2, topics: ["skin", "body"] },
  { hashtag: "#hair", frequency: 1, topics: ["hair"] },
  { hashtag: "#hairstyle", frequency: 1, topics: ["hair"] },
  { hashtag: "#haircare", frequency: 1, topics: ["hair"] },
  { hashtag: "#trending", frequency: 1, topics: ["hair"] },
  { hashtag: "#lipstick", frequency: 1, topics: ["skin"] },
  { hashtag: "#perfume", frequency: 1, topics: ["body"] },
  { hashtag: "#brows", frequency: 1, topics: ["perfume"] },
  { hashtag: "#bts", frequency: 1, topics: ["perfume"] },
  { hashtag: "#makeuptutorial", frequency: 1, topics: ["makeup"] },
].sort((a, b) => b.frequency - a.frequency);

// Most common keywords across all topics
export const mockKeywordFrequency = [
  {
    keyword: "transformation",
    frequency: 3,
    topics: ["skin", "body", "perfume"],
  },
  { keyword: "results", frequency: 3, topics: ["skin", "body", "hair"] },
  { keyword: "routine", frequency: 3, topics: ["skin", "hair", "perfume"] },
  { keyword: "tutorial", frequency: 2, topics: ["skin", "perfume"] },
  { keyword: "journey", frequency: 2, topics: ["skin", "hair"] },
  { keyword: "top", frequency: 2, topics: ["hair", "makeup"] },
  { keyword: "review", frequency: 2, topics: ["hair", "makeup"] },
  { keyword: "tips", frequency: 2, topics: ["hair", "makeup"] },
  { keyword: "grwm", frequency: 2, topics: ["hair", "perfume"] },
  { keyword: "trending", frequency: 1, topics: ["makeup"] },
  { keyword: "secret", frequency: 1, topics: ["body"] },
  { keyword: "hack", frequency: 1, topics: ["perfume"] },
].sort((a, b) => b.frequency - a.frequency);

// Interface definitions
export interface BestVideoTopicData {
  topic: string;
  keywords: string[];
  bestDurationGroup: string;
  bestDay: string;
  bestTime: number;
  bestTitleLength: string;
  top5Hashtags: string[];
  avgEngagement: number;
  bestEngagement: number;
  perentIncrease: number;
}

export interface DurationGroupStat {
  duration: string;
  topics: string[];
  count: number;
  percentage: number;
}

export interface DayOfWeekStat {
  day: string;
  topics: string[];
  count: number;
  percentage: number;
}

export interface TimeOfDayStat {
  timeRange: string;
  topics: string[];
  count: number;
  label: string;
}

export interface TitleLengthStat {
  lengthRange: string;
  topics: string[];
  count: number;
  percentage: number;
}

export interface HashtagFrequency {
  hashtag: string;
  frequency: number;
  topics: string[];
}

export interface KeywordFrequency {
  keyword: string;
  frequency: number;
  topics: string[];
}

export interface BestVideoTopicSummary {
  totalTopics: number;
  topicCategories: string[];
  mostPopularDay: string;
  mostPopularTime: number;
  mostCommonDuration: string;
  totalUniqueHashtags: number;
  totalUniqueKeywords: number;
}

// Complete data structure for components
export interface CompleteBestVideoTopicData {
  topicData: BestVideoTopicData[];
  summary: BestVideoTopicSummary;
  durationStats: DurationGroupStat[];
  dayStats: DayOfWeekStat[];
  timeStats: TimeOfDayStat[];
  titleLengthStats: TitleLengthStat[];
  hashtagFrequency: HashtagFrequency[];
  keywordFrequency: KeywordFrequency[];
}

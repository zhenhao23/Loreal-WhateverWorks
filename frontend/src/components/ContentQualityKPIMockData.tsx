// Mock data for Content Quality KPI component
export const mockKPIMetrics = {
  avgKPIScore: 8.7,
  minKPIScore: 6.2,
  maxKPIScore: 9.8,
  highQualityPercentage: 78,
  totalCommentsAnalyzed: 15847,
  spamDetected: 324,
  qualityScoreDistribution: (() => {
    // Generate 50 bars with 0.2 intervals (0.0-0.2, 0.2-0.4, etc.)
    const distribution = [];
    for (let i = 0; i < 50; i++) {
      const start = (i * 0.2).toFixed(1);
      const end = ((i + 1) * 0.2).toFixed(1);

      // Create realistic bell curve distribution with peak around 7-8 range
      const midpoint = 37; // Around 7.4-7.6 range (37th bar)
      const distance = Math.abs(i - midpoint);
      const frequency = Math.max(5, Math.round(800 * Math.exp(-distance / 6)));

      distribution.push({
        scoreRange: `${start}-${end}`,
        frequency: frequency,
      });
    }
    return distribution;
  })(),
};

export const mockTopKeywords = {
  skincare: ["hydrating", "glowing", "smooth"],
  makeup: ["pigmented", "long-lasting", "vibrant"],
  fragrance: ["elegant", "sophisticated", "luxurious"],
};

export const mockSentimentByTopics = [
  { topic: "Scent & Fragrance", score: 0.85, value: 0.85, color: "#5A6ACF" },
  { topic: "Product Packaging", score: 0.78, value: 0.78, color: "#707FDD" },
  {
    topic: "Delivery Experience",
    score: 0.72,
    value: 0.72,
    color: "#8B92E8",
  },
  { topic: "Product Quality", score: 0.68, value: 0.68, color: "#A6A5F2" },
  { topic: "Customer Service", score: 0.64, value: 0.64, color: "#C1B8FC" },
  { topic: "Value for Money", score: 0.58, value: 0.58, color: "#DCCBFF" },
].sort((a, b) => b.score - a.score);

export const mockWordCloudData = [
  { text: "amazing", value: 95 },
  { text: "luxurious", value: 78 },
  { text: "smooth", value: 67 },
  { text: "hydrating", value: 54 },
  { text: "elegant", value: 48 },
  { text: "vibrant", value: 42 },
  { text: "lasting", value: 38 },
  { text: "perfect", value: 35 },
  { text: "sophisticated", value: 32 },
  { text: "glowing", value: 28 },
  { text: "pigmented", value: 25 },
  { text: "quality", value: 22 },
  { text: "recommend", value: 18 },
  { text: "beautiful", value: 15 },
];

export const mockTopComments = [
  {
    key: "1",
    comment:
      "This **True Match** foundation is absolutely **amazing**! Perfect shade match and **long-lasting** coverage.",
    sentiment: "positive",
    kpiScore: 9.2,
    likes: 847,
    replies: 23,
  },
  {
    key: "2",
    comment:
      "The new **Revitalift** serum made my skin feel **smooth** and **hydrated** within just a week of use.",
    sentiment: "positive",
    kpiScore: 8.8,
    likes: 634,
    replies: 15,
  },
  {
    key: "3",
    comment:
      "**Elvive** shampoo is okay but **nothing special**. Expected more from L'Oréal.",
    sentiment: "neutral",
    kpiScore: 6.4,
    likes: 102,
    replies: 8,
  },
  {
    key: "4",
    comment:
      "**Disappointed** with the packaging quality. The product itself is **good** but presentation matters.",
    sentiment: "negative",
    kpiScore: 5.9,
    likes: 89,
    replies: 12,
  },
  {
    key: "5",
    comment:
      "**Love** the **sophisticated** scent of the new perfume. Will definitely **recommend** to friends!",
    sentiment: "positive",
    kpiScore: 9.0,
    likes: 756,
    replies: 31,
  },
];

export const mockBubbleData = [
  // Existing bubbles with bigger sizes
  { x: 45, y: 8.5, z: 45, word: "amazing", sentiment: "positive" },
  { x: 38, y: 7.8, z: 50, word: "love", sentiment: "positive" },
  { x: 42, y: 6.2, z: 25, word: "disappointing", sentiment: "negative" },
  { x: 35, y: 8.1, z: 48, word: "perfect", sentiment: "positive" },
  { x: 28, y: 5.8, z: 22, word: "okay", sentiment: "neutral" },
  { x: 32, y: 7.9, z: 42, word: "smooth", sentiment: "positive" },
  { x: 25, y: 6.5, z: 24, word: "average", sentiment: "neutral" },
  { x: 48, y: 8.9, z: 55, word: "fantastic", sentiment: "positive" },
  { x: 52, y: 9.1, z: 60, word: "luxurious", sentiment: "positive" },
  { x: 29, y: 7.6, z: 46, word: "elegant", sentiment: "positive" },
  // New scattered bubble data points
  { x: 15, y: 3.2, z: 18, word: "terrible", sentiment: "negative" },
  { x: 58, y: 4.8, z: 20, word: "boring", sentiment: "negative" },
  { x: 22, y: 8.7, z: 38, word: "gorgeous", sentiment: "positive" },
  { x: 8, y: 6.1, z: 26, word: "decent", sentiment: "neutral" },
  { x: 61, y: 7.2, z: 44, word: "stunning", sentiment: "positive" },
  { x: 12, y: 2.5, z: 15, word: "awful", sentiment: "negative" },
  { x: 55, y: 9.4, z: 52, word: "incredible", sentiment: "positive" },
  { x: 18, y: 5.3, z: 28, word: "mediocre", sentiment: "neutral" },
  { x: 44, y: 3.8, z: 19, word: "disappointing", sentiment: "negative" },
  { x: 33, y: 9.2, z: 49, word: "outstanding", sentiment: "positive" },
  { x: 6, y: 4.7, z: 21, word: "bland", sentiment: "neutral" },
  { x: 59, y: 8.3, z: 43, word: "marvelous", sentiment: "positive" },
  { x: 24, y: 2.1, z: 16, word: "horrible", sentiment: "negative" },
  { x: 40, y: 6.9, z: 35, word: "pleasant", sentiment: "positive" },
  { x: 14, y: 7.4, z: 37, word: "delightful", sentiment: "positive" },
  { x: 50, y: 3.6, z: 17, word: "unsatisfactory", sentiment: "negative" },
  { x: 36, y: 5.9, z: 29, word: "acceptable", sentiment: "neutral" },
  { x: 26, y: 8.8, z: 47, word: "exceptional", sentiment: "positive" },
  { x: 9, y: 4.2, z: 23, word: "fair", sentiment: "neutral" },
  { x: 53, y: 6.7, z: 33, word: "satisfying", sentiment: "positive" },
];

// export const mockTimelineData = [
//   {
//     month: "Jan",
//     positive: 1200,
//     neutral: 720,
//     negative: 480,
//     avgSentiment: 7.2,
//   },
//   {
//     month: "Feb",
//     positive: 1400,
//     neutral: 840,
//     negative: 560,
//     avgSentiment: 7.8,
//   },
//   {
//     month: "Mar",
//     positive: 1600,
//     neutral: 960,
//     negative: 640,
//     avgSentiment: 6.9,
//   },
//   {
//     month: "Apr",
//     positive: 1450,
//     neutral: 870,
//     negative: 580,
//     avgSentiment: 8.1,
//   },
//   {
//     month: "May",
//     positive: 1750,
//     neutral: 1050,
//     negative: 700,
//     avgSentiment: 8.4,
//   },
//   {
//     month: "Jun",
//     positive: 2050,
//     neutral: 1230,
//     negative: 820,
//     avgSentiment: 7.9,
//   },
//   {
//     month: "Jul",
//     positive: 1900,
//     neutral: 1140,
//     negative: 760,
//     avgSentiment: 8.2,
//   },
//   {
//     month: "Aug",
//     positive: 2100,
//     neutral: 1260,
//     negative: 840,
//     avgSentiment: 8.7,
//   },
//   {
//     month: "Sep",
//     positive: 1800,
//     neutral: 1080,
//     negative: 720,
//     avgSentiment: 7.6,
//   },
//   {
//     month: "Oct",
//     positive: 1950,
//     neutral: 1170,
//     negative: 780,
//     avgSentiment: 8.0,
//   },
//   {
//     month: "Nov",
//     positive: 2200,
//     neutral: 1320,
//     negative: 880,
//     avgSentiment: 8.3,
//   },
//   {
//     month: "Dec",
//     positive: 2400,
//     neutral: 1440,
//     negative: 960,
//     avgSentiment: 8.5,
//   },
// ];

export const mockTimelineData = [
  {
    month: "Skin",
    positive: 1200,
    neutral: 720,
    negative: 480,
    avgSentiment: 7.2,
  },
  {
    month: "Body",
    positive: 1400,
    neutral: 840,
    negative: 560,
    avgSentiment: 7.8,
  },
  {
    month: "Hair",
    positive: 1600,
    neutral: 960,
    negative: 640,
    avgSentiment: 6.9,
  },
  {
    month: "Perfume",
    positive: 1450,
    neutral: 870,
    negative: 580,
    avgSentiment: 8.1,
  },
  {
    month: "Makeup",
    positive: 1750,
    neutral: 1050,
    negative: 700,
    avgSentiment: 8.4,
  },
  // {
  //   month: "Jun",
  //   positive: 2050,
  //   neutral: 1230,
  //   negative: 820,
  //   avgSentiment: 7.9,
  // },
  // {
  //   month: "Jul",
  //   positive: 1900,
  //   neutral: 1140,
  //   negative: 760,
  //   avgSentiment: 8.2,
  // },
  // {
  //   month: "Aug",
  //   positive: 2100,
  //   neutral: 1260,
  //   negative: 840,
  //   avgSentiment: 8.7,
  // },
  // {
  //   month: "Sep",
  //   positive: 1800,
  //   neutral: 1080,
  //   negative: 720,
  //   avgSentiment: 7.6,
  // },
  // {
  //   month: "Oct",
  //   positive: 1950,
  //   neutral: 1170,
  //   negative: 780,
  //   avgSentiment: 8.0,
  // },
  // {
  //   month: "Nov",
  //   positive: 2200,
  //   neutral: 1320,
  //   negative: 880,
  //   avgSentiment: 8.3,
  // },
  // {
  //   month: "Dec",
  //   positive: 2400,
  //   neutral: 1440,
  //   negative: 960,
  //   avgSentiment: 8.5,
  // },
];

// Type for paginated comments response
export interface PaginatedComments {
  data: typeof mockTopComments;
  current: number;
  pageSize: number;
  total: number;
  totalPages?: number;
}

export interface ContentQualityKPIData {
  kpiMetrics: typeof mockKPIMetrics;
  topKeywords: typeof mockTopKeywords;
  sentimentByTopics: typeof mockSentimentByTopics;
  wordCloudData: typeof mockWordCloudData;
  topComments: typeof mockTopComments | PaginatedComments;
  bubbleData: typeof mockBubbleData;
  timelineData: typeof mockTimelineData;
}

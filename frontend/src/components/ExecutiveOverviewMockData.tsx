// Mock data for Executive Overview component
export const mockSentimentData = [
  { type: "Negative", value: 42, percentage: "42%" },
  { type: "Neutral", value: 15, percentage: "15%" },
  { type: "Positive", value: 43, percentage: "43%" },
];

export const mockOverallSentimentScore = 3.6; // Out of 5

export const mockTimelineData = [
  {
    month: "Jan",
    positive: 1200,
    neutral: 720,
    negative: 480,
    avgSentiment: 7.2,
  },
  {
    month: "Feb",
    positive: 1400,
    neutral: 840,
    negative: 560,
    avgSentiment: 7.8,
  },
  {
    month: "Mar",
    positive: 1600,
    neutral: 960,
    negative: 640,
    avgSentiment: 6.9,
  },
  {
    month: "Apr",
    positive: 1450,
    neutral: 870,
    negative: 580,
    avgSentiment: 8.1,
  },
  {
    month: "May",
    positive: 1750,
    neutral: 1050,
    negative: 700,
    avgSentiment: 8.4,
  },
  {
    month: "Jun",
    positive: 2050,
    neutral: 1230,
    negative: 820,
    avgSentiment: 7.9,
  },
  {
    month: "Jul",
    positive: 1900,
    neutral: 1140,
    negative: 760,
    avgSentiment: 8.2,
  },
  {
    month: "Aug",
    positive: 2100,
    neutral: 1260,
    negative: 840,
    avgSentiment: 8.7,
  },
  {
    month: "Sep",
    positive: 1800,
    neutral: 1080,
    negative: 720,
    avgSentiment: 7.6,
  },
  {
    month: "Oct",
    positive: 1950,
    neutral: 1170,
    negative: 780,
    avgSentiment: 8.0,
  },
  {
    month: "Nov",
    positive: 2200,
    neutral: 1320,
    negative: 880,
    avgSentiment: 8.3,
  },
  {
    month: "Dec",
    positive: 2400,
    neutral: 1440,
    negative: 960,
    avgSentiment: 8.5,
  },
];

export const mockMetricsData = {
  totalComments: 24567,
  uniqueUsers: 8943,
  englishPercentage: 78,
  spamPercentage: 2.3,
  avgLikesPerComment: 14.2,
  avgRepliesPerComment: 3.7,
  avgKpiScore: 8.7,
  kpiScoreChange: 12,
};

export const mockCategoryData = [
  { category: "Skincare", value: 35, color: "#5A6ACF" },
  { category: "Makeup", value: 28, color: "#707FDD" },
  { category: "Fragrance", value: 18, color: "#44c5e1" },
  { category: "Hair Care", value: 12, color: "#8B5CF6" },
  { category: "Men's", value: 7, color: "#ff7875" },
];

export interface ExecutiveOverviewData {
  sentimentData: typeof mockSentimentData;
  overallSentimentScore: number;
  timelineData: typeof mockTimelineData;
  metricsData: typeof mockMetricsData;
  categoryData: typeof mockCategoryData;
}

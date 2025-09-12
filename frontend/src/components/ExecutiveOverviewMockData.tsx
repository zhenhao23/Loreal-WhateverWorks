// Mock data for Executive Overview component
import { getTopChannelsBySubscribers } from "./ChannelDataMockData";

// Get top 9 channels from our channel data (fallback)
const top9Channels = getTopChannelsBySubscribers(9);

/**
 * Fetch real channel data from backend API
 */
export async function fetchTopChannelsData(limit = 9) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/channels/top?limit=${limit}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.success && result.data) {
      return result.data;
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Error fetching top channels data:", error);
    // Return fallback mock data
    return top9Channels.map((channel, index) => ({
      channelId: channel.channel_id.toString(),
      name: channel.name,
      avatar: channel.profilePicture,
      subscribers:
        channel.subscribers >= 1000000
          ? `${(channel.subscribers / 1000000).toFixed(1)}M`
          : channel.subscribers >= 1000
          ? `${(channel.subscribers / 1000).toFixed(0)}K`
          : channel.subscribers.toString(),
      totalComments:
        [15420, 12850, 8940, 7320, 6810, 5920, 4750, 3680, 2940][index] || 2000,
      avgSentiment: [8.7, 8.2, 7.8, 7.5, 7.2, 6.9, 6.6, 6.3, 6.0][index] || 6.0,
      engagementRate:
        [12.4, 10.9, 9.7, 8.8, 8.2, 7.6, 7.1, 6.5, 5.9][index] || 5.0,
    }));
  }
}

export const mockSentimentData = [
  { type: "Negative", value: 42, percentage_numeric: 42, percentage: "42%" },
  { type: "Neutral", value: 15, percentage_numeric: 15, percentage: "15%" },
  { type: "Positive", value: 43, percentage_numeric: 43, percentage: "43%" },
];

export const mockOverallSentimentScore = 2.2; // Out of 10

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
  totalComments: 0,
  totalVideos: 0,
  englishPercentage: 0,
  spamPercentage: 0,
  avgLikesPerComment: 0,
  avgRepliesPerComment: 0,
  avgKpiScore: 0,
  kpiScoreChange: 0,
};

export const mockCategoryData = [
  { category: "Makeup", value: 32, color: "#5A6ACF" },
  { category: "Skin", value: 25, color: "#707FDD" },
  { category: "Hair", value: 18, color: "#8B5CF6" },
  { category: "Perfume", value: 15, color: "#44c5e1" },
  { category: "Body", value: 10, color: "#FFB54C" },
];

export const mockSentimentByTopics = [
  { topic: "Makeup", score: 8.7, value: 8.7, color: "#5A6ACF" },
  { topic: "Skin", score: 8.2, value: 8.2, color: "#707FDD" },
  { topic: "Hair", score: 7.8, value: 7.8, color: "#8B92E8" },
  { topic: "Perfume", score: 7.5, value: 7.5, color: "#A6A5F2" },
  { topic: "Body", score: 6.9, value: 6.9, color: "#C1B8FC" },
].sort((a, b) => b.score - a.score);

// Fallback mock data for top channels (used when API fails)
export const mockTopChannels = top9Channels.map((channel, index) => ({
  channelId: channel.channel_id.toString(),
  name: channel.name,
  avatar: channel.profilePicture,
  subscribers:
    channel.subscribers >= 1000000
      ? `${(channel.subscribers / 1000000).toFixed(1)}M`
      : channel.subscribers >= 1000
      ? `${(channel.subscribers / 1000).toFixed(0)}K`
      : channel.subscribers.toString(),
  totalComments:
    [15420, 12850, 8940, 7320, 6810, 5920, 4750, 3680, 2940][index] || 2000, // Mock engagement data
  avgSentiment: [8.7, 8.2, 7.8, 7.5, 7.2, 6.9, 6.6, 6.3, 6.0][index] || 6.0, // Mock sentiment scores
  engagementRate: [12.4, 10.9, 9.7, 8.8, 8.2, 7.6, 7.1, 6.5, 5.9][index] || 5.0, // Mock engagement rates
}));

export interface ExecutiveOverviewData {
  sentimentData: typeof mockSentimentData;
  overallSentimentScore: number;
  timelineData: typeof mockTimelineData;
  metricsData: typeof mockMetricsData;
  categoryData: typeof mockCategoryData;
  sentimentByTopics: typeof mockSentimentByTopics;
  topChannels: typeof mockTopChannels;
}

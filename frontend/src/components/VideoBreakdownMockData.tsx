// Mock data for Video Breakdown component
export const mockVideoCategoryData = [
  { topic: "Beauty & Personal Care", videos: 1240, color: "#5A6ACF" },
  { topic: "Fashion & Style", videos: 980, color: "#707FDD" },
  { topic: "Lifestyle & Wellness", videos: 720, color: "#8B92E8" },
  { topic: "Product Reviews", videos: 650, color: "#A6A5F2" },
  { topic: "Tutorials & How-to", videos: 580, color: "#C1B8FC" },
  { topic: "Brand Campaigns", videos: 420, color: "#DCCBFF" },
  { topic: "Celebrity Endorsements", videos: 320, color: "#44c5e1" },
  { topic: "User Generated Content", videos: 280, color: "#60ccef" },
].sort((a, b) => b.videos - a.videos); // Sort by videos descending

export const mockCategoryLeaderboardData = [
  {
    key: "1",
    category: "Beauty & Personal Care",
    engagementRate: 4.8,
    videoCount: 1240,
    totalViews: 2890000,
    totalLikes: 567890,
    totalComments: 45670,
    avgQualityScore: 8.7,
    spamPercentage: 2.3,
    avgSentimentScore: 8.2,
  },
  {
    key: "2",
    category: "Fashion & Style",
    engagementRate: 4.2,
    videoCount: 980,
    totalViews: 2340000,
    totalLikes: 489320,
    totalComments: 38420,
    avgQualityScore: 8.4,
    spamPercentage: 3.1,
    avgSentimentScore: 7.9,
  },
  {
    key: "3",
    category: "Lifestyle & Wellness",
    engagementRate: 3.9,
    videoCount: 720,
    totalViews: 1890000,
    totalLikes: 342180,
    totalComments: 28930,
    avgQualityScore: 8.1,
    spamPercentage: 2.8,
    avgSentimentScore: 7.6,
  },
  {
    key: "4",
    category: "Product Reviews",
    engagementRate: 5.2,
    videoCount: 650,
    totalViews: 1750000,
    totalLikes: 421350,
    totalComments: 34560,
    avgQualityScore: 8.9,
    spamPercentage: 1.9,
    avgSentimentScore: 8.5,
  },
  {
    key: "5",
    category: "Tutorials & How-to",
    engagementRate: 4.6,
    videoCount: 580,
    totalViews: 1650000,
    totalLikes: 389270,
    totalComments: 31240,
    avgQualityScore: 8.6,
    spamPercentage: 2.1,
    avgSentimentScore: 8.3,
  },
  {
    key: "6",
    category: "Brand Campaigns",
    engagementRate: 3.4,
    videoCount: 420,
    totalViews: 1120000,
    totalLikes: 234560,
    totalComments: 18670,
    avgQualityScore: 7.8,
    spamPercentage: 4.2,
    avgSentimentScore: 7.2,
  },
  {
    key: "7",
    category: "Celebrity Endorsements",
    engagementRate: 3.8,
    videoCount: 320,
    totalViews: 980000,
    totalLikes: 298450,
    totalComments: 22340,
    avgQualityScore: 8.0,
    spamPercentage: 3.5,
    avgSentimentScore: 7.7,
  },
  {
    key: "8",
    category: "User Generated Content",
    engagementRate: 3.1,
    videoCount: 280,
    totalViews: 750000,
    totalLikes: 189320,
    totalComments: 15890,
    avgQualityScore: 7.5,
    spamPercentage: 5.1,
    avgSentimentScore: 7.0,
  },
];

export const mockVideoMetrics = {
  total_videos: 5670,
  unique_categories: 8,
  average_engagement_rate: 4.7,
  total_views: 12450000,
  total_likes: 2890000,
  total_comments: 567890,
};

// Timeline data for engagement rate trends by category
export const mockEngagementTimelineData = [
  // Beauty & Personal Care
  { date: "2024-01", category: "Beauty & Personal Care", engagementRate: 4.2 },
  { date: "2024-02", category: "Beauty & Personal Care", engagementRate: 4.4 },
  { date: "2024-03", category: "Beauty & Personal Care", engagementRate: 4.6 },
  { date: "2024-04", category: "Beauty & Personal Care", engagementRate: 4.8 },
  { date: "2024-05", category: "Beauty & Personal Care", engagementRate: 5.0 },
  { date: "2024-06", category: "Beauty & Personal Care", engagementRate: 4.8 },
  { date: "2024-07", category: "Beauty & Personal Care", engagementRate: 4.9 },
  { date: "2024-08", category: "Beauty & Personal Care", engagementRate: 5.1 },
  { date: "2024-09", category: "Beauty & Personal Care", engagementRate: 4.7 },
  { date: "2024-10", category: "Beauty & Personal Care", engagementRate: 4.8 },
  { date: "2024-11", category: "Beauty & Personal Care", engagementRate: 4.9 },
  { date: "2024-12", category: "Beauty & Personal Care", engagementRate: 4.8 },

  // Fashion & Style
  { date: "2024-01", category: "Fashion & Style", engagementRate: 3.8 },
  { date: "2024-02", category: "Fashion & Style", engagementRate: 4.0 },
  { date: "2024-03", category: "Fashion & Style", engagementRate: 4.1 },
  { date: "2024-04", category: "Fashion & Style", engagementRate: 4.2 },
  { date: "2024-05", category: "Fashion & Style", engagementRate: 4.3 },
  { date: "2024-06", category: "Fashion & Style", engagementRate: 4.2 },
  { date: "2024-07", category: "Fashion & Style", engagementRate: 4.4 },
  { date: "2024-08", category: "Fashion & Style", engagementRate: 4.3 },
  { date: "2024-09", category: "Fashion & Style", engagementRate: 4.1 },
  { date: "2024-10", category: "Fashion & Style", engagementRate: 4.2 },
  { date: "2024-11", category: "Fashion & Style", engagementRate: 4.3 },
  { date: "2024-12", category: "Fashion & Style", engagementRate: 4.2 },

  // Product Reviews
  { date: "2024-01", category: "Product Reviews", engagementRate: 4.8 },
  { date: "2024-02", category: "Product Reviews", engagementRate: 5.0 },
  { date: "2024-03", category: "Product Reviews", engagementRate: 5.1 },
  { date: "2024-04", category: "Product Reviews", engagementRate: 5.2 },
  { date: "2024-05", category: "Product Reviews", engagementRate: 5.4 },
  { date: "2024-06", category: "Product Reviews", engagementRate: 5.2 },
  { date: "2024-07", category: "Product Reviews", engagementRate: 5.3 },
  { date: "2024-08", category: "Product Reviews", engagementRate: 5.5 },
  { date: "2024-09", category: "Product Reviews", engagementRate: 5.1 },
  { date: "2024-10", category: "Product Reviews", engagementRate: 5.2 },
  { date: "2024-11", category: "Product Reviews", engagementRate: 5.4 },
  { date: "2024-12", category: "Product Reviews", engagementRate: 5.2 },

  // Tutorials & How-to
  { date: "2024-01", category: "Tutorials & How-to", engagementRate: 4.2 },
  { date: "2024-02", category: "Tutorials & How-to", engagementRate: 4.4 },
  { date: "2024-03", category: "Tutorials & How-to", engagementRate: 4.5 },
  { date: "2024-04", category: "Tutorials & How-to", engagementRate: 4.6 },
  { date: "2024-05", category: "Tutorials & How-to", engagementRate: 4.7 },
  { date: "2024-06", category: "Tutorials & How-to", engagementRate: 4.6 },
  { date: "2024-07", category: "Tutorials & How-to", engagementRate: 4.8 },
  { date: "2024-08", category: "Tutorials & How-to", engagementRate: 4.7 },
  { date: "2024-09", category: "Tutorials & How-to", engagementRate: 4.5 },
  { date: "2024-10", category: "Tutorials & How-to", engagementRate: 4.6 },
  { date: "2024-11", category: "Tutorials & How-to", engagementRate: 4.7 },
  { date: "2024-12", category: "Tutorials & How-to", engagementRate: 4.6 },

  // Lifestyle & Wellness
  { date: "2024-01", category: "Lifestyle & Wellness", engagementRate: 3.5 },
  { date: "2024-02", category: "Lifestyle & Wellness", engagementRate: 3.7 },
  { date: "2024-03", category: "Lifestyle & Wellness", engagementRate: 3.8 },
  { date: "2024-04", category: "Lifestyle & Wellness", engagementRate: 3.9 },
  { date: "2024-05", category: "Lifestyle & Wellness", engagementRate: 4.0 },
  { date: "2024-06", category: "Lifestyle & Wellness", engagementRate: 3.9 },
  { date: "2024-07", category: "Lifestyle & Wellness", engagementRate: 4.1 },
  { date: "2024-08", category: "Lifestyle & Wellness", engagementRate: 4.0 },
  { date: "2024-09", category: "Lifestyle & Wellness", engagementRate: 3.8 },
  { date: "2024-10", category: "Lifestyle & Wellness", engagementRate: 3.9 },
  { date: "2024-11", category: "Lifestyle & Wellness", engagementRate: 4.0 },
  { date: "2024-12", category: "Lifestyle & Wellness", engagementRate: 3.9 },

  // // Brand Campaigns
  // { date: "2024-01", category: "Brand Campaigns", engagementRate: 3.2 },
  // { date: "2024-02", category: "Brand Campaigns", engagementRate: 3.3 },
  // { date: "2024-03", category: "Brand Campaigns", engagementRate: 3.4 },
  // { date: "2024-04", category: "Brand Campaigns", engagementRate: 3.5 },
  // { date: "2024-05", category: "Brand Campaigns", engagementRate: 3.6 },
  // { date: "2024-06", category: "Brand Campaigns", engagementRate: 3.4 },
  // { date: "2024-07", category: "Brand Campaigns", engagementRate: 3.5 },
  // { date: "2024-08", category: "Brand Campaigns", engagementRate: 3.6 },
  // { date: "2024-09", category: "Brand Campaigns", engagementRate: 3.3 },
  // { date: "2024-10", category: "Brand Campaigns", engagementRate: 3.4 },
  // { date: "2024-11", category: "Brand Campaigns", engagementRate: 3.5 },
  // { date: "2024-12", category: "Brand Campaigns", engagementRate: 3.4 },

  // // Celebrity Endorsements
  // { date: "2024-01", category: "Celebrity Endorsements", engagementRate: 3.6 },
  // { date: "2024-02", category: "Celebrity Endorsements", engagementRate: 3.7 },
  // { date: "2024-03", category: "Celebrity Endorsements", engagementRate: 3.8 },
  // { date: "2024-04", category: "Celebrity Endorsements", engagementRate: 3.9 },
  // { date: "2024-05", category: "Celebrity Endorsements", engagementRate: 4.0 },
  // { date: "2024-06", category: "Celebrity Endorsements", engagementRate: 3.8 },
  // { date: "2024-07", category: "Celebrity Endorsements", engagementRate: 3.9 },
  // { date: "2024-08", category: "Celebrity Endorsements", engagementRate: 4.0 },
  // { date: "2024-09", category: "Celebrity Endorsements", engagementRate: 3.7 },
  // { date: "2024-10", category: "Celebrity Endorsements", engagementRate: 3.8 },
  // { date: "2024-11", category: "Celebrity Endorsements", engagementRate: 3.9 },
  // { date: "2024-12", category: "Celebrity Endorsements", engagementRate: 3.8 },

  // // User Generated Content
  // { date: "2024-01", category: "User Generated Content", engagementRate: 2.8 },
  // { date: "2024-02", category: "User Generated Content", engagementRate: 3.0 },
  // { date: "2024-03", category: "User Generated Content", engagementRate: 3.1 },
  // { date: "2024-04", category: "User Generated Content", engagementRate: 3.2 },
  // { date: "2024-05", category: "User Generated Content", engagementRate: 3.3 },
  // { date: "2024-06", category: "User Generated Content", engagementRate: 3.1 },
  // { date: "2024-07", category: "User Generated Content", engagementRate: 3.2 },
  // { date: "2024-08", category: "User Generated Content", engagementRate: 3.3 },
  // { date: "2024-09", category: "User Generated Content", engagementRate: 3.0 },
  // { date: "2024-10", category: "User Generated Content", engagementRate: 3.1 },
  // { date: "2024-11", category: "User Generated Content", engagementRate: 3.2 },
  // { date: "2024-12", category: "User Generated Content", engagementRate: 3.1 },
];

export interface CategoryLeaderboardData {
  data: typeof mockCategoryLeaderboardData;
  total: number;
  pageSize: number;
  current: number;
}

export interface VideoBreakdownData {
  videoCategoryData: typeof mockVideoCategoryData;
  categoryLeaderboardData:
    | typeof mockCategoryLeaderboardData
    | CategoryLeaderboardData;
  videoMetrics: typeof mockVideoMetrics;
  engagementTimelineData: typeof mockEngagementTimelineData;
}

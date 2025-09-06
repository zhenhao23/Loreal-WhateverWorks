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
    videoCount: 1240,
    totalComments: 45670,
    uniqueAuthors: 12350,
    totalLikes: 567890,
    avgQualityScore: 8.7,
    spamPercentage: 2.3,
    avgSentimentScore: 8.2,
  },
  {
    key: "2",
    category: "Fashion & Style",
    videoCount: 980,
    totalComments: 38420,
    uniqueAuthors: 9840,
    totalLikes: 489320,
    avgQualityScore: 8.4,
    spamPercentage: 3.1,
    avgSentimentScore: 7.9,
  },
  {
    key: "3",
    category: "Lifestyle & Wellness",
    videoCount: 720,
    totalComments: 28930,
    uniqueAuthors: 7650,
    totalLikes: 342180,
    avgQualityScore: 8.1,
    spamPercentage: 2.8,
    avgSentimentScore: 7.6,
  },
  {
    key: "4",
    category: "Product Reviews",
    videoCount: 650,
    totalComments: 34560,
    uniqueAuthors: 8920,
    totalLikes: 421350,
    avgQualityScore: 8.9,
    spamPercentage: 1.9,
    avgSentimentScore: 8.5,
  },
  {
    key: "5",
    category: "Tutorials & How-to",
    videoCount: 580,
    totalComments: 31240,
    uniqueAuthors: 7890,
    totalLikes: 389270,
    avgQualityScore: 8.6,
    spamPercentage: 2.1,
    avgSentimentScore: 8.3,
  },
  {
    key: "6",
    category: "Brand Campaigns",
    videoCount: 420,
    totalComments: 18670,
    uniqueAuthors: 5230,
    totalLikes: 234560,
    avgQualityScore: 7.8,
    spamPercentage: 4.2,
    avgSentimentScore: 7.2,
  },
  {
    key: "7",
    category: "Celebrity Endorsements",
    videoCount: 320,
    totalComments: 22340,
    uniqueAuthors: 6780,
    totalLikes: 298450,
    avgQualityScore: 8.0,
    spamPercentage: 3.5,
    avgSentimentScore: 7.7,
  },
  {
    key: "8",
    category: "User Generated Content",
    videoCount: 280,
    totalComments: 15890,
    uniqueAuthors: 4560,
    totalLikes: 189320,
    avgQualityScore: 7.5,
    spamPercentage: 5.1,
    avgSentimentScore: 7.0,
  },
];

export const mockVideoMetrics = {
  total_videos: 5670,
  unique_categories: 8,
};

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
}

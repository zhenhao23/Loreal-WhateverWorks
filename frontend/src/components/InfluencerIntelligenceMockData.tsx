// Mock data for Influencer & Content Intelligence component

export interface InfluencerMetrics {
  avgEngagementRate: number;
  avgViews: number;
  avgLikes: number;
  avgComments: number;
}

export interface InfluencerInfo {
  channelName: string;
  bestCategory: string;
  topPerformingCreator: string;
  highestPotentialCategory: string;
  categoryStats?: {
    frequency: number;
    percentage: number;
  };
}

export interface ChannelMetrics {
  channelId: string;
  totalVideos: number;
  avgEngagementScore: number;
  avgViews: number;
  avgLikes: number;
  avgComments: number;
}

export interface CategoryPerformance {
  channelId: string;
  categories: {
    Skincare: number;
    Makeup: number;
    "Hair Care": number;
    Fragrance: number;
    "Body Care": number;
  };
}

export interface PerformanceAnalysis {
  channelId: string;
  performanceMetrics: RadarDataPoint[];
}

export interface RadarDataPoint {
  attribute: string;
  score: number;
}

export interface InfluencerBarData {
  influencer: string;
  engagementQuality: number;
  color: string;
}

export interface TopChannel {
  channelId: string;
  name: string;
  avatar: string;
  subscribers: string;
  totalComments: number;
  avgSentiment: number;
  engagementRate: number;
}

export interface InfluencerIntelligenceData {
  influencerMetrics: InfluencerMetrics;
  influencerInfo: InfluencerInfo;
  radarData: RadarDataPoint[];
  categoryRadarData: RadarDataPoint[];
  influencerBarData: InfluencerBarData[];
  topChannels: TopChannel[];
  channelMetrics?: ChannelMetrics[];
  categoryPerformance?: CategoryPerformance[];
  performanceAnalysis?: PerformanceAnalysis[];
}

// Mock metrics data
export const mockInfluencerMetrics: InfluencerMetrics = {
  avgEngagementRate: 4.2,
  avgViews: 1250000,
  avgLikes: 52000,
  avgComments: 3200,
};

// Mock influencer info
export const mockInfluencerInfo: InfluencerInfo = {
  channelName: "@beautyguru_sarah",
  bestCategory: "Skincare",
  topPerformingCreator: "@beautyguru_sarah",
  highestPotentialCategory: "Skincare",
};

// Mock radar chart data
export const mockRadarData: RadarDataPoint[] = [
  { attribute: "Audience Engagement Score", score: 85 },
  { attribute: "Audience Reach", score: 78 },
  { attribute: "Production Rate", score: 92 },
  { attribute: "Growth Rate", score: 68 },
];

// Mock radar chart data for category performance
export const mockCategoryRadarData: RadarDataPoint[] = [
  { attribute: "Skincare", score: 92 },
  { attribute: "Makeup", score: 78 },
  { attribute: "Hair Care", score: 65 },
  { attribute: "Fragrance", score: 45 },
  { attribute: "Men's", score: 38 },
];

// Mock bar chart data for influencer engagement quality
export const mockInfluencerBarData: InfluencerBarData[] = [
  {
    influencer: "Beauty And Makeup Art",
    engagementQuality: 96.07,
    color: "#5A6ACF",
  },
  { influencer: "Love Makeup", engagementQuality: 96, color: "#707FDD" },
  {
    influencer: "Jenny's Beauty Lab",
    engagementQuality: 95.4,
    color: "#8B92E8",
  },
  { influencer: "Brooke Monk", engagementQuality: 94.8, color: "#A6A5F2" },
  { influencer: "Natalie Violette", engagementQuality: 94.2, color: "#C1B8FC" },
  { influencer: "Di1araa.s", engagementQuality: 93.6, color: "#DCCBFF" },
  { influencer: "Averina Anggita", engagementQuality: 93.1, color: "#44c5e1" },
  { influencer: "Sharon Spellman", engagementQuality: 92.5, color: "#60ccef" },
];

// Mock top channels data
export const mockTopChannels: TopChannel[] = [
  {
    channelId: "26428",
    name: "Beauty And Makeup Art",
    avatar: "/Beauty And Makeup Art.jpg",
    subscribers: "620K",
    totalComments: 636,
    avgSentiment: 4.76,
    engagementRate: 96.07,
  },
  {
    channelId: "48780",
    name: "Love Makeup",
    avatar: "/Love Makeup.jpg",
    subscribers: "256K",
    totalComments: 1781,
    avgSentiment: 4.6,
    engagementRate: 96,
  },
  {
    channelId: "53183",
    name: "Jenny's Beauty Lab",
    avatar: "/Jenny's Beauty Lab.jpg",
    subscribers: "3.5M",
    totalComments: 2000,
    avgSentiment: 5.37,
    engagementRate: 95.4,
  },
  {
    channelId: "6926",
    name: "Brooke Monk",
    avatar: "/Brooke Monk.jpg",
    subscribers: "9.8M",
    totalComments: 1520,
    avgSentiment: 5.2,
    engagementRate: 94.8,
  },
  {
    channelId: "14429",
    name: "Natalie Violette",
    avatar: "/Natalie Violette.jpg",
    subscribers: "129K",
    totalComments: 1340,
    avgSentiment: 5.0,
    engagementRate: 94.2,
  },
  {
    channelId: "25356",
    name: "Di1araa.s",
    avatar: "/Di1araas.jpg",
    subscribers: "3.2M",
    totalComments: 1180,
    avgSentiment: 4.9,
    engagementRate: 93.6,
  },
  {
    channelId: "26891",
    name: "Averina Anggita",
    avatar: "/Averina Anggita.jpg",
    subscribers: "364K",
    totalComments: 1050,
    avgSentiment: 4.8,
    engagementRate: 93.1,
  },
  {
    channelId: "35581",
    name: "Sharon Spellman",
    avatar: "/Sharon Spellman.jpg",
    subscribers: "398K",
    totalComments: 920,
    avgSentiment: 4.7,
    engagementRate: 92.5,
  },
  {
    channelId: "46179",
    name: "FionaFrills",
    avatar: "/FionaFrills.jpg",
    subscribers: "1.0M",
    totalComments: 810,
    avgSentiment: 4.6,
    engagementRate: 92.0,
  },
];

// Mock channel metrics data
export const mockChannelMetrics: ChannelMetrics[] = [
  {
    channelId: "26428",
    totalVideos: 15,
    avgEngagementScore: 96.07,
    avgViews: 125000,
    avgLikes: 8500,
    avgComments: 320,
  },
  {
    channelId: "48780",
    totalVideos: 18,
    avgEngagementScore: 96.0,
    avgViews: 98000,
    avgLikes: 7200,
    avgComments: 295,
  },
  {
    channelId: "53183",
    totalVideos: 22,
    avgEngagementScore: 95.4,
    avgViews: 180000,
    avgLikes: 12000,
    avgComments: 450,
  },
  {
    channelId: "6926",
    totalVideos: 25,
    avgEngagementScore: 94.8,
    avgViews: 250000,
    avgLikes: 18000,
    avgComments: 680,
  },
  {
    channelId: "14429",
    totalVideos: 12,
    avgEngagementScore: 94.2,
    avgViews: 85000,
    avgLikes: 6800,
    avgComments: 280,
  },
  {
    channelId: "25356",
    totalVideos: 20,
    avgEngagementScore: 93.6,
    avgViews: 165000,
    avgLikes: 11500,
    avgComments: 425,
  },
  {
    channelId: "26891",
    totalVideos: 16,
    avgEngagementScore: 93.1,
    avgViews: 110000,
    avgLikes: 8200,
    avgComments: 340,
  },
  {
    channelId: "35581",
    totalVideos: 14,
    avgEngagementScore: 92.5,
    avgViews: 95000,
    avgLikes: 7500,
    avgComments: 315,
  },
  {
    channelId: "46179",
    totalVideos: 19,
    avgEngagementScore: 92.0,
    avgViews: 140000,
    avgLikes: 9800,
    avgComments: 380,
  },
];

// Mock category performance data
export const mockCategoryPerformance: CategoryPerformance[] = [
  {
    channelId: "26428",
    categories: {
      Skincare: 15,
      Makeup: 75,
      "Hair Care": 5,
      Fragrance: 3,
      "Body Care": 2,
    },
  },
  {
    channelId: "48780",
    categories: {
      Skincare: 20,
      Makeup: 80,
      "Hair Care": 0,
      Fragrance: 0,
      "Body Care": 0,
    },
  },
  {
    channelId: "53183",
    categories: {
      Skincare: 45,
      Makeup: 35,
      "Hair Care": 15,
      Fragrance: 3,
      "Body Care": 2,
    },
  },
  {
    channelId: "6926",
    categories: {
      Skincare: 30,
      Makeup: 40,
      "Hair Care": 20,
      Fragrance: 5,
      "Body Care": 5,
    },
  },
  {
    channelId: "14429",
    categories: {
      Skincare: 25,
      Makeup: 70,
      "Hair Care": 3,
      Fragrance: 1,
      "Body Care": 1,
    },
  },
  {
    channelId: "25356",
    categories: {
      Skincare: 35,
      Makeup: 50,
      "Hair Care": 10,
      Fragrance: 3,
      "Body Care": 2,
    },
  },
  {
    channelId: "26891",
    categories: {
      Skincare: 40,
      Makeup: 45,
      "Hair Care": 10,
      Fragrance: 3,
      "Body Care": 2,
    },
  },
  {
    channelId: "35581",
    categories: {
      Skincare: 55,
      Makeup: 30,
      "Hair Care": 10,
      Fragrance: 3,
      "Body Care": 2,
    },
  },
  {
    channelId: "46179",
    categories: {
      Skincare: 28,
      Makeup: 60,
      "Hair Care": 8,
      Fragrance: 2,
      "Body Care": 2,
    },
  },
];

// Combined mock data
export const mockInfluencerIntelligenceData: InfluencerIntelligenceData = {
  influencerMetrics: mockInfluencerMetrics,
  influencerInfo: mockInfluencerInfo,
  radarData: mockRadarData,
  categoryRadarData: mockCategoryRadarData,
  influencerBarData: mockInfluencerBarData,
  topChannels: mockTopChannels,
  channelMetrics: mockChannelMetrics,
  categoryPerformance: mockCategoryPerformance,
};

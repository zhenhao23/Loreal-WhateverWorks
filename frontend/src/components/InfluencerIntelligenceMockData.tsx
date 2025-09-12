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
  { influencer: "@beautyguru_sarah", engagementQuality: 92, color: "#5A6ACF" },
  { influencer: "@skincare_expert", engagementQuality: 88, color: "#707FDD" },
  { influencer: "@makeup_artist_pro", engagementQuality: 85, color: "#8B92E8" },
  { influencer: "@wellness_coach", engagementQuality: 78, color: "#A6A5F2" },
  { influencer: "@lifestyle_blogger", engagementQuality: 75, color: "#C1B8FC" },
  { influencer: "@fashion_icon", engagementQuality: 72, color: "#DCCBFF" },
  { influencer: "@beauty_reviews", engagementQuality: 68, color: "#44c5e1" },
  { influencer: "@fragrance_lover", engagementQuality: 65, color: "#60ccef" },
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

// Combined mock data
export const mockInfluencerIntelligenceData: InfluencerIntelligenceData = {
  influencerMetrics: mockInfluencerMetrics,
  influencerInfo: mockInfluencerInfo,
  radarData: mockRadarData,
  categoryRadarData: mockCategoryRadarData,
  influencerBarData: mockInfluencerBarData,
  topChannels: mockTopChannels,
};

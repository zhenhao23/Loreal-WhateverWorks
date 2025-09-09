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

export interface InfluencerIntelligenceData {
  influencerMetrics: InfluencerMetrics;
  influencerInfo: InfluencerInfo;
  radarData: RadarDataPoint[];
  categoryRadarData: RadarDataPoint[];
  influencerBarData: InfluencerBarData[];
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
  { attribute: "Audience Engagement Quality", score: 85 },
  { attribute: "Audience Reach", score: 78 },
  { attribute: "Content Relevance", score: 92 },
  { attribute: "Growth Rate", score: 68 },
  { attribute: "Authenticity/Brand Safety Score", score: 88 },
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

// Combined mock data
export const mockInfluencerIntelligenceData: InfluencerIntelligenceData = {
  influencerMetrics: mockInfluencerMetrics,
  influencerInfo: mockInfluencerInfo,
  radarData: mockRadarData,
  categoryRadarData: mockCategoryRadarData,
  influencerBarData: mockInfluencerBarData,
};

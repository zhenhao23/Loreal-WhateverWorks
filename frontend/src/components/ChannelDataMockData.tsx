// Mock data for Channel Data component
// Based on channelData.csv from dataset folder

// Import profile pictures
import beautyAndMakeupArt from "../assets/Beauty And Makeup Art.jpg";
import loveMakeup from "../assets/Love Makeup.jpg";
import jennysBeautyLab from "../assets/Jenny's Beauty Lab.jpg";
import brookeMonk from "../assets/Brooke Monk.jpg";
import natalieViolette from "../assets/Natalie Violette.jpg";
import di1araas from "../assets/Di1araas.jpg";
import averinaAnggita from "../assets/Averina Anggita.jpg";
import sharonSpellman from "../assets/Sharon Spellman.jpg";
import fionaFrills from "../assets/FionaFrills.jpg";

export interface ChannelData {
  rank: number;
  channel_id: number;
  name: string;
  subscribers: number;
  profilePicture: string;
}

export const mockChannelData: ChannelData[] = [
  {
    rank: 1,
    channel_id: 26428,
    name: "Beauty And Makeup Art",
    subscribers: 620000,
    profilePicture: beautyAndMakeupArt,
  },
  {
    rank: 2,
    channel_id: 48780,
    name: "Love Makeup",
    subscribers: 256000,
    profilePicture: loveMakeup,
  },
  {
    rank: 3,
    channel_id: 53183,
    name: "Jenny's Beauty Lab",
    subscribers: 3460000,
    profilePicture: jennysBeautyLab,
  },
  {
    rank: 4,
    channel_id: 6926,
    name: "Brooke Monk",
    subscribers: 9770000,
    profilePicture: brookeMonk,
  },
  {
    rank: 5,
    channel_id: 14429,
    name: "Natalie Violette",
    subscribers: 129000,
    profilePicture: natalieViolette,
  },
  {
    rank: 6,
    channel_id: 25356,
    name: "Di1araa.s",
    subscribers: 3210000,
    profilePicture: di1araas,
  },
  {
    rank: 7,
    channel_id: 26891,
    name: "Averina Anggita",
    subscribers: 364000,
    profilePicture: averinaAnggita,
  },
  {
    rank: 8,
    channel_id: 35581,
    name: "Sharon Spellman",
    subscribers: 398000,
    profilePicture: sharonSpellman,
  },
  {
    rank: 9,
    channel_id: 46179,
    name: "FionaFrills",
    subscribers: 1000000,
    profilePicture: fionaFrills,
  },
];

// Helper functions for channel data
export const getChannelById = (channelId: number): ChannelData | undefined => {
  return mockChannelData.find((channel) => channel.channel_id === channelId);
};

export const getTopChannelsBySubscribers = (
  limit: number = 5
): ChannelData[] => {
  return mockChannelData
    .sort((a, b) => a.rank - b.rank) // Sort by rank (1, 2, 3, etc.)
    .slice(0, limit);
};

export const getTotalSubscribers = (): number => {
  return mockChannelData.reduce(
    (total, channel) => total + channel.subscribers,
    0
  );
};

export const getChannelsBySubscriberRange = (
  min: number,
  max: number
): ChannelData[] => {
  return mockChannelData.filter(
    (channel) => channel.subscribers >= min && channel.subscribers <= max
  );
};

// Export formatted data for charts/visualizations
export const mockChannelDataForChart = mockChannelData.map((channel) => ({
  name: channel.name,
  subscribers: channel.subscribers,
  rank: channel.rank,
  profilePicture: channel.profilePicture,
  // Format subscribers for display
  subscribersFormatted:
    channel.subscribers >= 1000000
      ? `${(channel.subscribers / 1000000).toFixed(1)}M`
      : channel.subscribers >= 1000
      ? `${(channel.subscribers / 1000).toFixed(0)}K`
      : channel.subscribers.toString(),
  // Color coding based on subscriber count
  color:
    channel.subscribers >= 5000000
      ? "#FF6B6B" // Red for mega channels (5M+)
      : channel.subscribers >= 1000000
      ? "#4ECDC4" // Teal for large channels (1M+)
      : channel.subscribers >= 500000
      ? "#45B7D1" // Blue for medium channels (500K+)
      : "#96CEB4", // Green for smaller channels
}));

export default mockChannelData;

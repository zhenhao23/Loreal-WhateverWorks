const {
  getTopChannelsData,
  getChannelAnalytics,
} = require("../db/queries/channels.queries");

/**
 * Channel Analytics Service
 * Business logic for channel-related data processing
 */

/**
 * Get top channels with combined mock and real data
 */
async function getTopChannels(limit = 9) {
  try {
    // Get real analytics data from database
    const realChannelData = await getTopChannelsData(limit);

    // Mock channel metadata (from CSV)
    const mockChannelMetadata = [
      {
        channelId: "26428",
        name: "Beauty And Makeup Art",
        subscribers: "620K",
        avatar: "/Beauty And Makeup Art.jpg",
      },
      {
        channelId: "48780",
        name: "Love Makeup",
        subscribers: "256K",
        avatar: "/Love Makeup.jpg",
      },
      {
        channelId: "53183",
        name: "Jenny's Beauty Lab",
        subscribers: "3.5M",
        avatar: "/Jenny's Beauty Lab.jpg",
      },
      {
        channelId: "6926",
        name: "Brooke Monk",
        subscribers: "9.8M",
        avatar: "/Brooke Monk.jpg",
      },
      {
        channelId: "14429",
        name: "Natalie Violette",
        subscribers: "129K",
        avatar: "/Natalie Violette.jpg",
      },
      {
        channelId: "25356",
        name: "Di1araa.s",
        subscribers: "3.2M",
        avatar: "/Di1araas.jpg",
      },
      {
        channelId: "26891",
        name: "Averina Anggita",
        subscribers: "364K",
        avatar: "/Averina Anggita.jpg",
      },
      {
        channelId: "35581",
        name: "Sharon Spellman",
        subscribers: "398K",
        avatar: "/Sharon Spellman.jpg",
      },
      {
        channelId: "46179",
        name: "FionaFrills",
        subscribers: "1.0M",
        avatar: "/FionaFrills.jpg",
      },
    ];

    // Combine real data with mock metadata
    const combinedData = realChannelData.map((realData, index) => {
      // Try to find matching metadata by channelId, fallback to index
      const metadata =
        mockChannelMetadata.find((m) => m.channelId === realData.channelId) ||
        mockChannelMetadata[index] ||
        mockChannelMetadata[0];

      return {
        channelId: realData.channelId,
        name: metadata.name,
        avatar: metadata.avatar,
        subscribers: metadata.subscribers,
        totalComments: realData.totalComments,
        avgSentiment: realData.avgSentiment,
        engagementRate: realData.engagementRate,
      };
    });

    return combinedData;
  } catch (error) {
    console.error("Error in getTopChannels service:", error);

    // Return mock data on error
    return [
      {
        channelId: "26428",
        name: "Beauty And Makeup Art",
        avatar: "/Beauty And Makeup Art.jpg",
        subscribers: "620K",
        totalComments: 15420,
        avgSentiment: 8.7,
        engagementRate: 12.4,
      },
      {
        channelId: "48780",
        name: "Love Makeup",
        avatar: "/Love Makeup.jpg",
        subscribers: "256K",
        totalComments: 12850,
        avgSentiment: 8.2,
        engagementRate: 10.9,
      },
      {
        channelId: "53183",
        name: "Jenny's Beauty Lab",
        avatar: "/Jenny's Beauty Lab.jpg",
        subscribers: "3.5M",
        totalComments: 8940,
        avgSentiment: 7.8,
        engagementRate: 9.7,
      },
    ];
  }
}

/**
 * Get detailed analytics for a specific channel
 */
async function getChannelDetails(channelId) {
  try {
    const channelData = await getChannelAnalytics(channelId);

    if (!channelData) {
      return null;
    }

    return channelData;
  } catch (error) {
    console.error("Error in getChannelDetails service:", error);
    return null;
  }
}

module.exports = {
  getTopChannels,
  getChannelDetails,
};

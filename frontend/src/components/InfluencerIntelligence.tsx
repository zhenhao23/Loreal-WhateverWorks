import { useEffect, useState } from "react";
import { Spin, Alert } from "antd";
import InfluencerIntelligenceUI from "./InfluencerIntelligenceUI";
import {
  mockInfluencerIntelligenceData,
  type InfluencerIntelligenceData,
} from "./InfluencerIntelligenceMockData";

interface InfluencerIntelligenceProps {
  dateFilter: any;
  categoryFilter: string;
  languageFilter: string;
}

const InfluencerIntelligence = ({
  dateFilter,
  categoryFilter,
  languageFilter,
}: InfluencerIntelligenceProps) => {
  const [data, setData] = useState<InfluencerIntelligenceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch data from API
  const fetchInfluencerIntelligenceData =
    async (): Promise<InfluencerIntelligenceData> => {
      try {
        // Convert dateFilter to year-only format to avoid timezone issues
        let processedDateFilter = null;
        if (
          dateFilter &&
          Array.isArray(dateFilter) &&
          dateFilter.length === 2
        ) {
          processedDateFilter = [
            dateFilter[0]?.year?.() ||
              dateFilter[0]?.format?.("YYYY") ||
              String(dateFilter[0]),
            dateFilter[1]?.year?.() ||
              dateFilter[1]?.format?.("YYYY") ||
              String(dateFilter[1]),
          ];
        }

        // Fetch channels data from the real API
        let topChannelsData = mockInfluencerIntelligenceData.topChannels;
        try {
          const channelsResponse = await fetch(
            "http://localhost:5000/api/channels/top?limit=9"
          );

          if (channelsResponse.ok) {
            const channelsResult = await channelsResponse.json();
            if (channelsResult.success && channelsResult.data) {
              topChannelsData = channelsResult.data;
              console.log(
                "Using real channels data from API for Influencer Intelligence"
              );
            }
          }
        } catch (channelsError) {
          console.warn("Channels API failed, using mock data:", channelsError);
        }

        // Replace this with your actual API endpoint
        const response = await fetch(
          "http://localhost:5000/api/influencer-intelligence",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              dateFilter: processedDateFilter,
              categoryFilter,
              languageFilter,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const apiData = await response.json();

        // Transform API data to match expected format if needed
        return {
          influencerMetrics:
            apiData.influencerMetrics ||
            mockInfluencerIntelligenceData.influencerMetrics,
          influencerInfo:
            apiData.influencerInfo ||
            mockInfluencerIntelligenceData.influencerInfo,
          radarData:
            apiData.radarData || mockInfluencerIntelligenceData.radarData,
          categoryRadarData:
            apiData.categoryRadarData ||
            mockInfluencerIntelligenceData.categoryRadarData,
          influencerBarData:
            apiData.influencerBarData ||
            mockInfluencerIntelligenceData.influencerBarData,
          topChannels: topChannelsData, // Use real channels data
        };
      } catch (error) {
        console.error("Failed to fetch influencer intelligence data:", error);
        throw error;
      }
    };

  // Function to get mock data as fallback
  const getMockData = (): InfluencerIntelligenceData => {
    return mockInfluencerIntelligenceData;
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Try to fetch from API first
        const apiData = await fetchInfluencerIntelligenceData();
        setData(apiData);
        console.log(
          "Influencer intelligence data loaded from API successfully"
        );
      } catch (apiError) {
        console.warn("API failed, falling back to mock data:", apiError);
        // Fallback to mock data if API fails
        const mockData = getMockData();
        setData(mockData);
        setError("Using mock data - API unavailable");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [dateFilter, categoryFilter, languageFilter]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
        }}
      >
        <Spin size="large" tip="Loading influencer intelligence data..." />
      </div>
    );
  }

  if (!data) {
    return (
      <Alert
        message="Error"
        description="Failed to load influencer intelligence data"
        type="error"
        style={{ margin: "20px" }}
      />
    );
  }

  return (
    <div>
      {error && (
        <Alert
          message="Warning"
          description={error}
          type="warning"
          style={{ marginBottom: "16px" }}
          closable
        />
      )}
      <InfluencerIntelligenceUI data={data} loading={loading} />
    </div>
  );
};

export default InfluencerIntelligence;

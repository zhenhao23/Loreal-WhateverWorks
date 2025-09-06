import { useEffect, useState } from "react";
import { Spin, Alert } from "antd";
import VideoBreakdownUI from "./VideoBreakdownUI";
import {
  mockVideoCategoryData,
  mockCategoryLeaderboardData,
  type VideoBreakdownData,
} from "./VideoBreakdownMockData";

interface VideoBreakdownProps {
  dateFilter: any;
  categoryFilter: string;
  languageFilter: string;
}

const VideoBreakdown = ({
  dateFilter,
  categoryFilter,
  languageFilter,
}: VideoBreakdownProps) => {
  const [data, setData] = useState<VideoBreakdownData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch data from API
  const fetchVideoBreakdownData = async (): Promise<VideoBreakdownData> => {
    try {
      // Replace this with your actual API endpoint
      const response = await fetch("/api/video-breakdown", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dateFilter,
          categoryFilter,
          languageFilter,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const apiData = await response.json();

      // Transform API data to match expected format if needed
      return {
        videoCategoryData: apiData.videoCategoryData || mockVideoCategoryData,
        categoryLeaderboardData:
          apiData.categoryLeaderboardData || mockCategoryLeaderboardData,
      };
    } catch (error) {
      console.error("Failed to fetch video breakdown data:", error);
      throw error;
    }
  };

  // Function to get mock data as fallback
  const getMockData = (): VideoBreakdownData => {
    return {
      videoCategoryData: mockVideoCategoryData,
      categoryLeaderboardData: mockCategoryLeaderboardData,
    };
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Try to fetch from API first
        const apiData = await fetchVideoBreakdownData();
        setData(apiData);
        console.log("Video breakdown data loaded from API successfully");
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
        <Spin size="large" tip="Loading video breakdown data..." />
      </div>
    );
  }

  if (!data) {
    return (
      <Alert
        message="Error"
        description="Failed to load video breakdown data"
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
      <VideoBreakdownUI data={data} />
    </div>
  );
};

export default VideoBreakdown;

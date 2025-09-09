import { useEffect, useState } from "react";
import { Spin, Alert } from "antd";
import VideoBreakdownUI from "./VideoBreakdownUI";
import {
  mockVideoCategoryData,
  mockCategoryLeaderboardData,
  mockVideoMetrics,
  mockEngagementTimelineData,
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
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  // Function to fetch data from API
  const fetchVideoBreakdownData = async (
    page = 1,
    pageSize = 10
  ): Promise<VideoBreakdownData> => {
    try {
      // Replace this with your actual API endpoint
      const response = await fetch(
        "http://localhost:5000/api/video-breakdown",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dateFilter,
            categoryFilter,
            languageFilter,
            current: page,
            pageSize: pageSize,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const apiData = await response.json();

      // Transform API data to match expected format if needed
      return {
        videoCategoryData: apiData.videoCategoryData || mockVideoCategoryData,
        categoryLeaderboardData: apiData.categoryLeaderboardData || {
          data: mockCategoryLeaderboardData,
          total: mockCategoryLeaderboardData.length,
          pageSize: pageSize,
          current: page,
        },
        videoMetrics: apiData.videoMetrics || mockVideoMetrics,
        engagementTimelineData:
          apiData.engagementTimelineData || mockEngagementTimelineData,
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
      categoryLeaderboardData: {
        data: mockCategoryLeaderboardData,
        total: mockCategoryLeaderboardData.length,
        pageSize: pagination.pageSize,
        current: pagination.current,
      },
      videoMetrics: mockVideoMetrics,
      engagementTimelineData: mockEngagementTimelineData,
    };
  };

  // Handle pagination changes
  const handlePaginationChange = (page: number, pageSize: number) => {
    setPagination({ current: page, pageSize });
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Try to fetch from API first
        const apiData = await fetchVideoBreakdownData(
          pagination.current,
          pagination.pageSize
        );
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
  }, [
    dateFilter,
    categoryFilter,
    languageFilter,
    pagination.current,
    pagination.pageSize,
  ]);

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
      <VideoBreakdownUI
        data={data}
        onPaginationChange={handlePaginationChange}
        loading={loading}
      />
    </div>
  );
};

export default VideoBreakdown;

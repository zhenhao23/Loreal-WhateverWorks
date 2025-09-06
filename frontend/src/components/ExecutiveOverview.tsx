import { useEffect, useState } from "react";
import { Spin, Alert } from "antd";
import ExecutiveOverviewUI from "./ExecutiveOverviewUI";
import {
  mockSentimentData,
  mockOverallSentimentScore,
  mockTimelineData,
  mockMetricsData,
  mockCategoryData,
  type ExecutiveOverviewData,
} from "./ExecutiveOverviewMockData";

interface ExecutiveOverviewProps {
  dateFilter: any;
  categoryFilter: string;
  languageFilter: string;
}

const ExecutiveOverview = ({
  dateFilter,
  categoryFilter,
  languageFilter,
}: ExecutiveOverviewProps) => {
  const [data, setData] = useState<ExecutiveOverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch data from API
  const fetchExecutiveOverviewData =
    async (): Promise<ExecutiveOverviewData> => {
      try {
        // Updated API endpoint to match new backend structure
        const response = await fetch("/api/executive-overview", {
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

        // The new API returns data in the exact format expected by frontend
        return {
          sentimentData: apiData.sentimentData || mockSentimentData,
          overallSentimentScore:
            apiData.overallSentimentScore || mockOverallSentimentScore,
          timelineData: apiData.timelineData || mockTimelineData,
          metricsData: apiData.metricsData || mockMetricsData,
          categoryData: apiData.categoryData || mockCategoryData,
        };
      } catch (error) {
        console.error("Failed to fetch executive overview data:", error);
        throw error;
      }
    };

  // Function to get mock data as fallback
  const getMockData = (): ExecutiveOverviewData => {
    return {
      sentimentData: mockSentimentData,
      overallSentimentScore: mockOverallSentimentScore,
      timelineData: mockTimelineData,
      metricsData: mockMetricsData,
      categoryData: mockCategoryData,
    };
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Try to fetch from API first
        const apiData = await fetchExecutiveOverviewData();
        setData(apiData);
        console.log("Data loaded from API successfully");
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
        <Spin size="large" tip="Loading executive overview..." />
      </div>
    );
  }

  if (!data) {
    return (
      <Alert
        message="Error"
        description="Failed to load executive overview data"
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
      <ExecutiveOverviewUI data={data} />
    </div>
  );
};

export default ExecutiveOverview;

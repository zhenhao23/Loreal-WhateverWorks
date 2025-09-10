import { useEffect, useState } from "react";
import { Spin, Alert } from "antd";
import ContentQualityKPIUI from "./ContentQualityKPIUI";
import {
  mockKPIMetrics,
  mockTopKeywords,
  mockSentimentByTopics,
  mockWordCloudData,
  mockTopComments,
  mockBubbleData,
  mockTimelineData,
  type ContentQualityKPIData,
} from "./ContentQualityKPIMockData";

interface ContentQualityKPIProps {
  dateFilter: any;
  categoryFilter: string;
  languageFilter: string;
}

const ContentQualityKPI = ({
  dateFilter,
  categoryFilter,
  languageFilter,
}: ContentQualityKPIProps) => {
  const [data, setData] = useState<ContentQualityKPIData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch data from API
  const fetchContentQualityKPIData =
    async (): Promise<ContentQualityKPIData> => {
      try {
        // Replace this with your actual API endpoint
        const response = await fetch("/api/content-quality-kpi", {
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
          kpiMetrics: apiData.kpiMetrics || mockKPIMetrics,
          topKeywords: apiData.topKeywords || mockTopKeywords,
          sentimentByTopics: apiData.sentimentByTopics || mockSentimentByTopics,
          wordCloudData: apiData.wordCloudData || mockWordCloudData,
          topComments: apiData.topComments || mockTopComments,
          bubbleData: apiData.bubbleData || mockBubbleData,
          timelineData: apiData.timelineData || mockTimelineData,
        };
      } catch (error) {
        console.error("Failed to fetch content quality KPI data:", error);
        throw error;
      }
    };

  // Function to get mock data as fallback
  const getMockData = (): ContentQualityKPIData => {
    return {
      kpiMetrics: mockKPIMetrics,
      topKeywords: mockTopKeywords,
      sentimentByTopics: mockSentimentByTopics,
      wordCloudData: mockWordCloudData,
      topComments: mockTopComments,
      bubbleData: mockBubbleData,
      timelineData: mockTimelineData,
    };
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Try to fetch from API first
        const apiData = await fetchContentQualityKPIData();
        setData(apiData);
        console.log("Content Quality KPI data loaded from API successfully");
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
        <Spin size="large" tip="Loading content quality KPI data..." />
      </div>
    );
  }

  if (!data) {
    return (
      <Alert
        message="Error"
        description="Failed to load content quality KPI data"
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
      <ContentQualityKPIUI data={data} />
    </div>
  );
};

export default ContentQualityKPI;

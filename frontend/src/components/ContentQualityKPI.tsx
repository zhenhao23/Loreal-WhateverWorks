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
  sentimentFilter: string;
}

const ContentQualityKPI = ({
  dateFilter,
  categoryFilter,
  languageFilter,
  sentimentFilter,
}: ContentQualityKPIProps) => {
  const [data, setData] = useState<ContentQualityKPIData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch data from API
  const fetchContentQualityKPIData =
    async (): Promise<ContentQualityKPIData> => {
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

        // Replace this with your actual API endpoint
        const response = await fetch(
          "http://localhost:5000/api/content-quality-kpi",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              dateFilter: processedDateFilter,
              categoryFilter,
              languageFilter,
              sentimentFilter,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const apiData = await response.json();

        // Transform API data to match expected format if needed
        return {
          kpiMetrics:
            apiData.kpiMetrics && Object.keys(apiData.kpiMetrics).length > 1
              ? apiData.kpiMetrics
              : mockKPIMetrics,
          topKeywords:
            apiData.topKeywords && Object.keys(apiData.topKeywords).length > 0
              ? apiData.topKeywords
              : mockTopKeywords,
          sentimentByTopics:
            apiData.sentimentByTopics && apiData.sentimentByTopics.length > 0
              ? apiData.sentimentByTopics
              : mockSentimentByTopics,
          wordCloudData:
            apiData.wordCloudData && apiData.wordCloudData.length > 0
              ? apiData.wordCloudData
              : mockWordCloudData,
          topComments:
            apiData.topComments && apiData.topComments.length > 0
              ? apiData.topComments
              : mockTopComments,
          bubbleData:
            apiData.bubbleData && apiData.bubbleData.length > 0
              ? apiData.bubbleData
              : mockBubbleData,
          timelineData:
            apiData.timelineData && apiData.timelineData.length > 0
              ? apiData.timelineData
              : mockTimelineData,
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
  }, [dateFilter, categoryFilter, languageFilter, sentimentFilter]);

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
      <ContentQualityKPIUI data={data} sentimentFilter={sentimentFilter} />
    </div>
  );
};

export default ContentQualityKPI;

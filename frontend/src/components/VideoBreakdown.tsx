import { Card, Row, Col, Table } from "antd";
import {
  VideoCameraOutlined,
  BarChartOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { Bar } from "@ant-design/plots";
import type { ColumnsType } from "antd/es/table";

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
  // Filters would be used here in a real implementation
  console.log("Filters:", { dateFilter, categoryFilter, languageFilter });

  // Sample data for video categories (transformed for vertical bar chart)
  const videoCategoryData = [
    { topic: "Beauty & Personal Care", videos: 1240, color: "#5A6ACF" },
    { topic: "Fashion & Style", videos: 980, color: "#707FDD" },
    { topic: "Lifestyle & Wellness", videos: 720, color: "#8B92E8" },
    { topic: "Product Reviews", videos: 650, color: "#A6A5F2" },
    { topic: "Tutorials & How-to", videos: 580, color: "#C1B8FC" },
    { topic: "Brand Campaigns", videos: 420, color: "#DCCBFF" },
    { topic: "Celebrity Endorsements", videos: 320, color: "#44c5e1" },
    { topic: "User Generated Content", videos: 280, color: "#60ccef" },
  ].sort((a, b) => b.videos - a.videos); // Sort by videos descending

  // Sample data for category leaderboard
  const categoryLeaderboardData = [
    {
      key: "1",
      category: "Beauty & Personal Care",
      videoCount: 1240,
      totalComments: 45670,
      uniqueAuthors: 12350,
      totalLikes: 567890,
      avgQualityScore: 8.7,
      spamPercentage: 2.3,
      avgSentimentScore: 8.2,
    },
    {
      key: "2",
      category: "Fashion & Style",
      videoCount: 980,
      totalComments: 38420,
      uniqueAuthors: 9840,
      totalLikes: 489320,
      avgQualityScore: 8.4,
      spamPercentage: 3.1,
      avgSentimentScore: 7.9,
    },
    {
      key: "3",
      category: "Lifestyle & Wellness",
      videoCount: 720,
      totalComments: 28930,
      uniqueAuthors: 7650,
      totalLikes: 342180,
      avgQualityScore: 8.1,
      spamPercentage: 2.8,
      avgSentimentScore: 7.6,
    },
    {
      key: "4",
      category: "Product Reviews",
      videoCount: 650,
      totalComments: 34560,
      uniqueAuthors: 8920,
      totalLikes: 421350,
      avgQualityScore: 8.9,
      spamPercentage: 1.9,
      avgSentimentScore: 8.5,
    },
    {
      key: "5",
      category: "Tutorials & How-to",
      videoCount: 580,
      totalComments: 31240,
      uniqueAuthors: 7890,
      totalLikes: 389270,
      avgQualityScore: 8.6,
      spamPercentage: 2.1,
      avgSentimentScore: 8.3,
    },
    {
      key: "6",
      category: "Brand Campaigns",
      videoCount: 420,
      totalComments: 18670,
      uniqueAuthors: 5230,
      totalLikes: 234560,
      avgQualityScore: 7.8,
      spamPercentage: 4.2,
      avgSentimentScore: 7.2,
    },
    {
      key: "7",
      category: "Celebrity Endorsements",
      videoCount: 320,
      totalComments: 22340,
      uniqueAuthors: 6780,
      totalLikes: 298450,
      avgQualityScore: 8.0,
      spamPercentage: 3.5,
      avgSentimentScore: 7.7,
    },
    {
      key: "8",
      category: "User Generated Content",
      videoCount: 280,
      totalComments: 15890,
      uniqueAuthors: 4560,
      totalLikes: 189320,
      avgQualityScore: 7.5,
      spamPercentage: 5.1,
      avgSentimentScore: 7.0,
    },
  ];

  const totalVideos = videoCategoryData.reduce(
    (sum, item) => sum + item.videos,
    0
  );

  // Bar chart configuration (vertical bar chart like Sentiment Score by Topic)
  const barConfig = {
    legend: false,
    data: videoCategoryData,
    xField: "topic",
    yField: "videos",
    colorField: "topic",
    scale: {
      color: {
        range: videoCategoryData.map((item) => item.color),
      },
    },
    barWidthRatio: 0.8,
    intervalPadding: 0.1,
    dodgePadding: 0,
    barStyle: {
      height: 30,
    },
    meta: {
      videos: {
        alias: "Number of Videos",
        formatter: (v: number) => v.toLocaleString(),
      },
    },
    xAxis: {
      min: 0,
      max: Math.max(...videoCategoryData.map((item) => item.videos)) * 1.1,
      tickCount: 6,
      label: {
        formatter: (v: string) => `${parseInt(v).toLocaleString()}`,
      },
    },
    yAxis: {
      label: {
        autoRotate: false,
        offset: 10,
      },
    },
    label: {
      position: "right" as const,
      style: {
        fill: "#444",
        fontSize: 12,
        fontWeight: 600,
        dx: 32,
      },
    },
    width: 875,
    height: 376,
  };

  // Table columns configuration
  const columns: ColumnsType<any> = [
    {
      title: "Video Category",
      dataIndex: "category",
      key: "category",
      width: "20%",
      render: (text: string) => (
        <div style={{ fontWeight: 600, color: "#5A6ACF" }}>{text}</div>
      ),
    },
    {
      title: "Videos",
      dataIndex: "videoCount",
      key: "videoCount",
      width: "10%",
      sorter: (a, b) => a.videoCount - b.videoCount,
      render: (value: number) => (
        <div style={{ fontWeight: 600, textAlign: "center" }}>
          {value.toLocaleString()}
        </div>
      ),
    },
    {
      title: "Total Comments",
      dataIndex: "totalComments",
      key: "totalComments",
      width: "12%",
      sorter: (a, b) => a.totalComments - b.totalComments,
      render: (value: number) => (
        <div style={{ textAlign: "center" }}>{value.toLocaleString()}</div>
      ),
    },
    {
      title: "Unique Authors",
      dataIndex: "uniqueAuthors",
      key: "uniqueAuthors",
      width: "12%",
      sorter: (a, b) => a.uniqueAuthors - b.uniqueAuthors,
      render: (value: number) => (
        <div style={{ textAlign: "center" }}>{value.toLocaleString()}</div>
      ),
    },
    {
      title: "Total Likes",
      dataIndex: "totalLikes",
      key: "totalLikes",
      width: "12%",
      sorter: (a, b) => a.totalLikes - b.totalLikes,
      render: (value: number) => (
        <div style={{ textAlign: "center" }}>{value.toLocaleString()}</div>
      ),
    },
    {
      title: "Avg Quality Score",
      dataIndex: "avgQualityScore",
      key: "avgQualityScore",
      width: "12%",
      sorter: (a, b) => a.avgQualityScore - b.avgQualityScore,
      render: (value: number) => (
        <div
          style={{
            fontWeight: 600,
            color:
              value >= 8.5 ? "#52c41a" : value >= 7.5 ? "#faad14" : "#ff4d4f",
            textAlign: "center",
          }}
        >
          {value}/10
        </div>
      ),
    },
    {
      title: "Spam %",
      dataIndex: "spamPercentage",
      key: "spamPercentage",
      width: "10%",
      sorter: (a, b) => a.spamPercentage - b.spamPercentage,
      render: (value: number) => (
        <div
          style={{
            fontWeight: 600,
            color:
              value <= 2.5 ? "#52c41a" : value <= 4.0 ? "#faad14" : "#ff4d4f",
            textAlign: "center",
          }}
        >
          {value}%
        </div>
      ),
    },
    {
      title: "Avg Sentiment",
      dataIndex: "avgSentimentScore",
      key: "avgSentimentScore",
      width: "12%",
      sorter: (a, b) => a.avgSentimentScore - b.avgSentimentScore,
      render: (value: number) => (
        <div
          style={{
            fontWeight: 600,
            color:
              value >= 8.0 ? "#52c41a" : value >= 7.0 ? "#faad14" : "#ff4d4f",
            textAlign: "center",
          }}
        >
          {value}/10
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "0 4px" }}>
      {/* 📊 Row 1 – Video Statistics Overview */}
      <Row gutter={[24, 24]} style={{ marginBottom: "32px" }} align="middle">
        {/* Left: Total Videos and Categories Cards */}
        <Col xs={24} lg={6}>
          <Row gutter={[0, 16]}>
            {/* Total Videos Card */}
            <Col xs={24}>
              <Card
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(90, 106, 207, 0.15)",
                  border: "2px solid #5A6ACF",
                  height: "220px",
                  background:
                    "linear-gradient(135deg, #5A6ACF 0%, #707FDD 100%)",
                }}
                bodyStyle={{ padding: 0, height: "100%" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    color: "white",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <VideoCameraOutlined
                    style={{
                      fontSize: "36px",
                      color: "rgba(255,255,255,0.9)",
                      marginBottom: "12px",
                    }}
                  />
                  <div
                    style={{
                      color: "white",
                      fontSize: "42px",
                      fontWeight: 700,
                      lineHeight: 1,
                      marginBottom: "6px",
                    }}
                  >
                    {totalVideos.toLocaleString()}
                  </div>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.9)",
                      fontSize: "16px",
                      marginBottom: "8px",
                    }}
                  >
                    Total Videos Analyzed
                  </div>
                </div>
              </Card>
            </Col>

            {/* Categories Card */}
            <Col xs={24}>
              <Card
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  border: "1px solid #f0f2f7",
                  height: "220px",
                }}
                bodyStyle={{ padding: 0, height: "100%" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <BarChartOutlined
                    style={{
                      fontSize: "36px",
                      color: "#5A6ACF",
                      marginBottom: "12px",
                    }}
                  />
                  <div
                    style={{
                      color: "#5A6ACF",
                      fontSize: "42px",
                      fontWeight: 700,
                      lineHeight: 1,
                      marginBottom: "6px",
                    }}
                  >
                    {videoCategoryData.length}
                  </div>
                  <div
                    style={{
                      color: "#666",
                      fontSize: "16px",
                      marginBottom: "8px",
                    }}
                  >
                    Video Categories
                  </div>
                  <div
                    style={{
                      color: "#8B92B8",
                      fontSize: "12px",
                      background: "#f5f6fa",
                      padding: "4px 12px",
                      borderRadius: "12px",
                      display: "inline-block",
                    }}
                  >
                    Wikipedia Tags
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Col>

        {/* Right: Video Distribution Bar Chart */}
        <Col xs={24} lg={18}>
          <Card
            title={
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <BarChartOutlined style={{ color: "#5A6ACF" }} />
                <span
                  style={{
                    color: "#5A6ACF",
                    fontSize: "18px",
                    fontWeight: 600,
                  }}
                >
                  Video Distribution by Category
                </span>
              </div>
            }
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              height: "456px",
            }}
            headStyle={{
              background: "#fafbfc",
              borderBottom: "1px solid #f0f2f7",
            }}
          >
            <div style={{ height: "376px", padding: "0" }}>
              <Bar {...barConfig} />
            </div>
          </Card>
        </Col>
      </Row>

      {/* 🏆 Row 2 – Category Leaderboard Table */}
      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <Card
            title={
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <TrophyOutlined style={{ color: "#5A6ACF" }} />
                <span
                  style={{
                    color: "#5A6ACF",
                    fontSize: "18px",
                    fontWeight: 600,
                  }}
                >
                  Category Performance Leaderboard
                </span>
              </div>
            }
            extra={
              <div style={{ fontSize: "12px", color: "#8B92B8" }}>
                Click column headers to sort • Higher scores = better
                performance
              </div>
            }
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
            headStyle={{
              background: "#fafbfc",
              borderBottom: "1px solid #f0f2f7",
            }}
          >
            <Table
              dataSource={categoryLeaderboardData}
              columns={columns}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} categories`,
              }}
              size="middle"
              scroll={{ x: 1200 }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default VideoBreakdown;

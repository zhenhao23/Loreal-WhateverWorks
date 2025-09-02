import { Row, Col, Card, Table, Tag } from "antd";
import { Bar } from "@ant-design/charts";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  MessageOutlined,
  BarChartOutlined,
  CloudOutlined,
  TableOutlined,
  DotChartOutlined,
  RightOutlined,
} from "@ant-design/icons";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import type { ColumnsType } from "antd/es/table";

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
  // Filters would be used here in a real implementation
  console.log("Filters:", { dateFilter, categoryFilter, languageFilter });

  // Sample data for KPI metrics
  const avgKPIScore = 8.7;
  const minKPIScore = 6.2;
  const maxKPIScore = 9.8;
  const avgCommentLength = 142;
  const highQualityPercentage = 78;

  const topKeywords = {
    skincare: ["hydrating", "glowing", "smooth"],
    makeup: ["pigmented", "long-lasting", "vibrant"],
    fragrance: ["elegant", "sophisticated", "luxurious"],
  };

  // Sample data for sentiment by topics
  const sentimentByTopics = [
    { topic: "Scent & Fragrance", score: 0.85, color: "#52c41a" },
    { topic: "Product Packaging", score: 0.78, color: "#73d13d" },
    { topic: "Delivery Experience", score: 0.72, color: "#95de64" },
    { topic: "Product Quality", score: 0.68, color: "#b7eb8f" },
    { topic: "Customer Service", score: 0.64, color: "#d9f7be" },
    { topic: "Value for Money", score: 0.58, color: "#f6ffed" },
  ].sort((a, b) => b.score - a.score);

  // Word cloud data (simplified as tags for now)
  const wordCloudData = [
    { word: "amazing", size: 24, color: "#52c41a" },
    { word: "luxurious", size: 20, color: "#1890ff" },
    { word: "smooth", size: 18, color: "#722ed1" },
    { word: "hydrating", size: 16, color: "#eb2f96" },
    { word: "elegant", size: 14, color: "#fa8c16" },
    { word: "vibrant", size: 12, color: "#13c2c2" },
    { word: "lasting", size: 10, color: "#52c41a" },
    { word: "perfect", size: 8, color: "#1890ff" },
  ];

  // Top comments data
  const topComments = [
    {
      key: "1",
      comment:
        "This **True Match** foundation is absolutely **amazing**! Perfect shade match and **long-lasting** coverage.",
      sentiment: "positive",
      kpiScore: 9.2,
      likes: 847,
      replies: 23,
    },
    {
      key: "2",
      comment:
        "The new **Revitalift** serum made my skin feel **smooth** and **hydrated** within just a week of use.",
      sentiment: "positive",
      kpiScore: 8.8,
      likes: 634,
      replies: 15,
    },
    {
      key: "3",
      comment:
        "**Elvive** shampoo is okay but **nothing special**. Expected more from L'Oréal.",
      sentiment: "neutral",
      kpiScore: 6.4,
      likes: 102,
      replies: 8,
    },
    {
      key: "4",
      comment:
        "**Disappointed** with the packaging quality. The product itself is **good** but presentation matters.",
      sentiment: "negative",
      kpiScore: 5.9,
      likes: 89,
      replies: 12,
    },
    {
      key: "5",
      comment:
        "**Love** the **sophisticated** scent of the new perfume. Will definitely **recommend** to friends!",
      sentiment: "positive",
      kpiScore: 9.0,
      likes: 756,
      replies: 31,
    },
  ];

  // Bubble chart data
  const bubbleData = [
    { x: 45, y: 8.5, z: 120, word: "amazing", sentiment: "positive" },
    { x: 38, y: 7.8, z: 95, word: "love", sentiment: "positive" },
    { x: 42, y: 6.2, z: 78, word: "disappointing", sentiment: "negative" },
    { x: 35, y: 8.1, z: 110, word: "perfect", sentiment: "positive" },
    { x: 28, y: 5.8, z: 65, word: "okay", sentiment: "neutral" },
    { x: 32, y: 7.9, z: 88, word: "smooth", sentiment: "positive" },
    { x: 25, y: 6.5, z: 70, word: "average", sentiment: "neutral" },
    { x: 48, y: 8.9, z: 135, word: "fantastic", sentiment: "positive" },
  ];

  const commentColumns: ColumnsType<any> = [
    {
      title: "Comment Text",
      dataIndex: "comment",
      key: "comment",
      width: "45%",
      render: (text: string) => (
        <div
          style={{
            fontSize: "14px",
            lineHeight: "1.5",
            maxWidth: "400px",
          }}
          dangerouslySetInnerHTML={{
            __html: text.replace(
              /\*\*(.*?)\*\*/g,
              '<strong style="color: #5A6ACF;">$1</strong>'
            ),
          }}
        />
      ),
    },
    {
      title: "Sentiment",
      dataIndex: "sentiment",
      key: "sentiment",
      width: "15%",
      render: (sentiment: string) => {
        const config = {
          positive: { color: "#52c41a", icon: <CheckCircleOutlined /> },
          neutral: { color: "#faad14", icon: <ExclamationCircleOutlined /> },
          negative: { color: "#ff4d4f", icon: <CloseCircleOutlined /> },
        };
        const sentimentConfig = config[sentiment as keyof typeof config];
        return (
          <Tag color={sentimentConfig.color} icon={sentimentConfig.icon}>
            {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
          </Tag>
        );
      },
    },
    {
      title: "KPI Score",
      dataIndex: "kpiScore",
      key: "kpiScore",
      width: "15%",
      render: (score: number) => (
        <div style={{ fontWeight: 600, color: "#5A6ACF", fontSize: "16px" }}>
          {score}/10
        </div>
      ),
    },
    {
      title: "Engagement",
      key: "engagement",
      width: "25%",
      render: (record: any) => (
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <MessageOutlined style={{ color: "#ff4d4f" }} />
            <span style={{ fontWeight: 600 }}>{record.likes}</span>
            <span style={{ color: "#8c8c8c", fontSize: "12px" }}>likes</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <MessageOutlined style={{ color: "#1890ff" }} />
            <span style={{ fontWeight: 600 }}>{record.replies}</span>
            <span style={{ color: "#8c8c8c", fontSize: "12px" }}>replies</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "0 4px" }}>
      {/* 🔝 Row 1 – KPI Cards (anchor metrics) */}
      <Row gutter={[24, 24]} style={{ marginBottom: "32px" }}>
        {/* Avg KPI Score */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              border: "1px solid #f0f2f7",
              height: "140px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  color: "#5A6ACF",
                  fontSize: "32px",
                  fontWeight: 700,
                  lineHeight: 1,
                  marginBottom: "4px",
                }}
              >
                {avgKPIScore}
              </div>
              <div
                style={{ color: "#666", fontSize: "14px", marginBottom: "6px" }}
              >
                Avg KPI Score
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  fontSize: "12px",
                  color: "#8B92B8",
                }}
              >
                <span>Min: {minKPIScore}</span>
                <span>Max: {maxKPIScore}</span>
              </div>
            </div>
          </Card>
        </Col>

        {/* Avg Comment Length */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              border: "1px solid #f0f2f7",
              height: "140px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  color: "#707FDD",
                  fontSize: "32px",
                  fontWeight: 700,
                  lineHeight: 1,
                  marginBottom: "4px",
                }}
              >
                {avgCommentLength}
              </div>
              <div
                style={{ color: "#666", fontSize: "14px", marginBottom: "6px" }}
              >
                Avg Comment Length
              </div>
              <div style={{ fontSize: "12px", color: "#8B92B8" }}>
                characters
              </div>
            </div>
          </Card>
        </Col>

        {/* % High-Quality Comments */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              border: "1px solid #f0f2f7",
              height: "140px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  color: "#44c5e1",
                  fontSize: "32px",
                  fontWeight: 700,
                  lineHeight: 1,
                  marginBottom: "4px",
                }}
              >
                {highQualityPercentage}%
              </div>
              <div
                style={{ color: "#666", fontSize: "14px", marginBottom: "6px" }}
              >
                High-Quality Comments
              </div>
              <div style={{ fontSize: "12px", color: "#8B92B8" }}>
                score ≥ 8.0
              </div>
            </div>
          </Card>
        </Col>

        {/* Top Keywords */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              border: "1px solid #f0f2f7",
              height: "140px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <div
                style={{
                  color: "#666",
                  fontSize: "14px",
                  marginBottom: "8px",
                  fontWeight: 400,
                }}
              >
                Top Keywords by Category
              </div>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  fontSize: "12px",
                }}
              >
                {Object.entries(topKeywords).map(([category, keywords]) => (
                  <div
                    key={category}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span
                      style={{
                        color: "#5A6ACF",
                        fontWeight: 600,
                        minWidth: "60px",
                      }}
                    >
                      {category}:
                    </span>
                    <span style={{ color: "#8B92B8" }}>
                      {keywords.join(", ")}
                    </span>
                  </div>
                ))}
                <div style={{ textAlign: "right", marginTop: "2px" }}>
                  <span
                    style={{
                      color: "#5A6ACF",
                      fontSize: "10px",
                      cursor: "pointer",
                    }}
                  ></span>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 📊 Row 2 – Sentiment by Topics */}
      <Row gutter={[24, 24]} style={{ marginBottom: "32px" }}>
        {/* Left: Lollipop Bar Chart */}
        <Col xs={24} lg={16}>
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
                  Sentiment Score by Topic
                </span>
              </div>
            }
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              height: "400px",
            }}
            headStyle={{
              background: "#fafbfc",
              borderBottom: "1px solid #f0f2f7",
            }}
          >
            <div style={{ height: "320px", padding: 0 }}>
              <Bar
                legend={false}
                data={sentimentByTopics}
                xField="topic"
                yField="score"
                colorField="topic"
                // coordinate={{
                //   transpose: false,
                // }}
                color={({ topic }: any) => {
                  const item = sentimentByTopics.find((d) => d.topic === topic);
                  return item ? item.color : "#5A6ACF";
                }}
                barWidthRatio={0.8}
                intervalPadding={0.1}
                dodgePadding={0}
                barStyle={{
                  height: 30,
                }}
                meta={{
                  score: {
                    alias: "Sentiment Score",
                    formatter: (v: number) => `${(v * 100).toFixed(1)}%`,
                  },
                }}
                xAxis={{
                  min: 0,
                  max: 1,
                  tickCount: 6,
                  label: {
                    formatter: (v: number) => `${(v * 100).toFixed(0)}%`,
                  },
                }}
                yAxis={{
                  label: {
                    autoRotate: false,
                    offset: 10,
                  },
                }}
                tooltip={{
                  formatter: (datum: any) => {
                    return {
                      name: datum.topic,
                      value: `${(datum.score * 100).toFixed(1)}%`,
                    };
                  },
                }}
                label={{
                  position: "right",
                  style: {
                    fill: "#444",
                    fontSize: 12,
                    fontWeight: 600,
                  },
                  content: (datum: any) => `${(datum.score * 100).toFixed(1)}%`,
                }}
              />
            </div>
          </Card>
        </Col>

        {/* Right: Word Cloud */}
        <Col xs={24} lg={8}>
          <Card
            title={
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <CloudOutlined style={{ color: "#5A6ACF" }} />
                <span
                  style={{
                    color: "#5A6ACF",
                    fontSize: "18px",
                    fontWeight: 600,
                  }}
                >
                  Key Adjectives
                </span>
              </div>
            }
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              height: "400px",
            }}
            headStyle={{
              background: "#fafbfc",
              borderBottom: "1px solid #f0f2f7",
            }}
          >
            <div
              style={{
                height: "320px",
                padding: "24px",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              {wordCloudData.map((item, index) => (
                <span
                  key={index}
                  style={{
                    fontSize: `${item.size}px`,
                    color: item.color,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  {item.word}
                </span>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* 🔎 Row 3 – Human-readable Examples */}
      <Row gutter={[24, 24]} style={{ marginBottom: "32px" }}>
        <Col xs={24}>
          <Card
            title={
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <TableOutlined style={{ color: "#5A6ACF" }} />
                <span
                  style={{
                    color: "#5A6ACF",
                    fontSize: "18px",
                    fontWeight: 600,
                  }}
                >
                  Top 5 Comments - Real Customer Voices
                </span>
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
              dataSource={topComments}
              columns={commentColumns}
              pagination={false}
              size="middle"
            />
          </Card>
        </Col>
      </Row>

      {/* 🫧 Row 4 – Deep Linguistic Analysis */}
      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <Card
            title={
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <DotChartOutlined style={{ color: "#5A6ACF" }} />
                <span
                  style={{
                    color: "#5A6ACF",
                    fontSize: "18px",
                    fontWeight: 600,
                  }}
                >
                  Word Impact Analysis - Frequency vs Sentiment vs Engagement
                </span>
              </div>
            }
            extra={
              <div style={{ fontSize: "12px", color: "#8B92B8" }}>
                Bubble size = engagement level • Hover for details
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
            <div style={{ height: "300px", padding: "16px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  data={bubbleData}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    type="number"
                    dataKey="x"
                    name="frequency"
                    tick={{ fontSize: 12, fill: "#666" }}
                    axisLine={false}
                    tickLine={false}
                    label={{
                      value: "Word Frequency",
                      position: "bottom",
                      style: {
                        textAnchor: "middle",
                        fontSize: "12px",
                        fill: "#666",
                      },
                    }}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    name="sentiment"
                    domain={[0, 10]}
                    tick={{ fontSize: 12, fill: "#666" }}
                    axisLine={false}
                    tickLine={false}
                    label={{
                      value: "Avg KPI Score",
                      angle: -90,
                      position: "insideLeft",
                      style: {
                        textAnchor: "middle",
                        fontSize: "12px",
                        fill: "#666",
                      },
                    }}
                  />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    formatter={(value, name) => [
                      name === "frequency"
                        ? `${value} mentions`
                        : name === "sentiment"
                        ? `${value}/10 score`
                        : `${value} interactions`,
                      name === "frequency"
                        ? "Frequency"
                        : name === "sentiment"
                        ? "KPI Score"
                        : "Engagement",
                    ]}
                    labelFormatter={(_label, payload) =>
                      payload && payload[0]
                        ? `Word: "${payload[0].payload.word}"`
                        : ""
                    }
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #f0f0f0",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Scatter name="Words" dataKey="z">
                    {bubbleData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.sentiment === "positive"
                            ? "#52c41a"
                            : entry.sentiment === "neutral"
                            ? "#faad14"
                            : "#ff4d4f"
                        }
                      />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ContentQualityKPI;

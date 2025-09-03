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
  HeartOutlined,
} from "@ant-design/icons";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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
    { topic: "Scent & Fragrance", score: 0.85, value: 0.85, color: "#5A6ACF" },
    { topic: "Product Packaging", score: 0.78, value: 0.78, color: "#707FDD" },
    {
      topic: "Delivery Experience",
      score: 0.72,
      value: 0.72,
      color: "#8B92E8",
    },
    { topic: "Product Quality", score: 0.68, value: 0.68, color: "#A6A5F2" },
    { topic: "Customer Service", score: 0.64, value: 0.64, color: "#C1B8FC" },
    { topic: "Value for Money", score: 0.58, value: 0.58, color: "#DCCBFF" },
  ].sort((a, b) => b.score - a.score);

  // Word cloud data (for react-wordcloud)
  const wordCloudData = [
    { text: "amazing", value: 95 },
    { text: "luxurious", value: 78 },
    { text: "smooth", value: 67 },
    { text: "hydrating", value: 54 },
    { text: "elegant", value: 48 },
    { text: "vibrant", value: 42 },
    { text: "lasting", value: 38 },
    { text: "perfect", value: 35 },
    { text: "sophisticated", value: 32 },
    { text: "glowing", value: 28 },
    { text: "pigmented", value: 25 },
    { text: "quality", value: 22 },
    { text: "recommend", value: 18 },
    { text: "beautiful", value: 15 },
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
    // Existing bubbles with bigger sizes
    { x: 45, y: 8.5, z: 45, word: "amazing", sentiment: "positive" },
    { x: 38, y: 7.8, z: 50, word: "love", sentiment: "positive" },
    { x: 42, y: 6.2, z: 25, word: "disappointing", sentiment: "negative" },
    { x: 35, y: 8.1, z: 48, word: "perfect", sentiment: "positive" },
    { x: 28, y: 5.8, z: 22, word: "okay", sentiment: "neutral" },
    { x: 32, y: 7.9, z: 42, word: "smooth", sentiment: "positive" },
    { x: 25, y: 6.5, z: 24, word: "average", sentiment: "neutral" },
    { x: 48, y: 8.9, z: 55, word: "fantastic", sentiment: "positive" },
    { x: 52, y: 9.1, z: 60, word: "luxurious", sentiment: "positive" },
    { x: 29, y: 7.6, z: 46, word: "elegant", sentiment: "positive" },

    // New scattered bubble data points
    { x: 15, y: 3.2, z: 18, word: "terrible", sentiment: "negative" },
    { x: 58, y: 4.8, z: 20, word: "boring", sentiment: "negative" },
    { x: 22, y: 8.7, z: 38, word: "gorgeous", sentiment: "positive" },
    { x: 8, y: 6.1, z: 26, word: "decent", sentiment: "neutral" },
    { x: 61, y: 7.2, z: 44, word: "stunning", sentiment: "positive" },
    { x: 12, y: 2.5, z: 15, word: "awful", sentiment: "negative" },
    { x: 55, y: 9.4, z: 52, word: "incredible", sentiment: "positive" },
    { x: 18, y: 5.3, z: 28, word: "mediocre", sentiment: "neutral" },
    { x: 44, y: 3.8, z: 19, word: "disappointing", sentiment: "negative" },
    { x: 33, y: 9.2, z: 49, word: "outstanding", sentiment: "positive" },
    { x: 6, y: 4.7, z: 21, word: "bland", sentiment: "neutral" },
    { x: 59, y: 8.3, z: 43, word: "marvelous", sentiment: "positive" },
    { x: 24, y: 2.1, z: 16, word: "horrible", sentiment: "negative" },
    { x: 40, y: 6.9, z: 35, word: "pleasant", sentiment: "positive" },
    { x: 14, y: 7.4, z: 37, word: "delightful", sentiment: "positive" },
    { x: 50, y: 3.6, z: 17, word: "unsatisfactory", sentiment: "negative" },
    { x: 36, y: 5.9, z: 29, word: "acceptable", sentiment: "neutral" },
    { x: 26, y: 8.8, z: 47, word: "exceptional", sentiment: "positive" },
    { x: 9, y: 4.2, z: 23, word: "fair", sentiment: "neutral" },
    { x: 53, y: 6.7, z: 33, word: "satisfying", sentiment: "positive" },
  ];

  // Custom bubble component for scatter chart
  const CustomBubble = (props: any) => {
    const { cx, cy, payload } = props;

    // Define colors based on sentiment
    const getColor = (sentiment: string) => {
      switch (sentiment) {
        case "positive":
          return "#52c41a";
        case "neutral":
          return "#faad14";
        case "negative":
          return "#ff4d4f";
        default:
          return "#666";
      }
    };

    // Use z value for radius, with some scaling
    const radius = Math.max(4, payload.z * 0.6); // Minimum radius of 4, scale z value

    return (
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill={getColor(payload.sentiment)}
        fillOpacity={0.7}
        stroke={getColor(payload.sentiment)}
        strokeWidth={2}
        strokeOpacity={1}
      />
    );
  };

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
            <HeartOutlined style={{ color: "#ff4d4f" }} />
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
                scale={{
                  color: {
                    range: sentimentByTopics.map((item) => item.color),
                  },
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
                // tooltip={{
                //   formatter: (datum: any) => {
                //     return {
                //       name: datum.value,
                //       value: "1",
                //     };
                //   },
                // }}
                label={{
                  position: "right",
                  style: {
                    fill: "#444",
                    fontSize: 12,
                    fontWeight: 600,
                    dx: 32,
                  },
                  // content: (datum: any) => `${(datum.score * 100).toFixed(1)}%`,
                }}
                width={875}
                height={320}
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
                padding: "16px",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                position: "relative",
              }}
            >
              {wordCloudData.map((item, index) => {
                // Calculate font size based on value (min: 14px, max: 36px)
                const fontSize = Math.max(
                  14,
                  Math.min(40, (item.value / 100) * 40)
                );
                // Get color from purple palette based on index
                const colors = [
                  "#5A6ACF",
                  "#8B5CF6",
                  "#44c5e1",
                  "#707FDD",
                  "#ff7875",
                ];
                const color = colors[index % colors.length];

                return (
                  <span
                    key={index}
                    style={{
                      fontSize: `${fontSize}px`,
                      color: color,
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      fontFamily:
                        "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                      textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                      transform:
                        index % 3 === 0
                          ? "rotate(-5deg)"
                          : index % 3 === 1
                          ? "rotate(5deg)"
                          : "rotate(0deg)",
                      display: "inline-block",
                      margin: "2px 4px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = `scale(1.15) ${
                        index % 3 === 0
                          ? "rotate(-5deg)"
                          : index % 3 === 1
                          ? "rotate(5deg)"
                          : "rotate(0deg)"
                      }`;
                      e.currentTarget.style.textShadow =
                        "0 2px 8px rgba(90, 106, 207, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = `scale(1) ${
                        index % 3 === 0
                          ? "rotate(-5deg)"
                          : index % 3 === 1
                          ? "rotate(5deg)"
                          : "rotate(0deg)"
                      }`;
                      e.currentTarget.style.textShadow =
                        "0 1px 2px rgba(0,0,0,0.1)";
                    }}
                    title={`${item.text}: ${item.value} mentions`}
                  >
                    {item.text}
                  </span>
                );
              })}
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
                    tickCount={6}
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
                      payload && payload[0] && payload[0].payload
                        ? `Word: "${payload[0].payload.word}"`
                        : ""
                    }
                    content={({ active, payload }) => {
                      if (active && payload && payload.length > 0) {
                        const data = payload[0].payload;
                        return (
                          <div
                            style={{
                              backgroundColor: "white",
                              border: "1px solid #f0f0f0",
                              borderRadius: "8px",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                              padding: "12px",
                            }}
                          >
                            <div
                              style={{
                                fontWeight: 600,
                                marginBottom: "8px",
                                color: "#333",
                              }}
                            >
                              Word: "{data.word}"
                            </div>
                            <div
                              style={{
                                fontSize: "12px",
                                color: "#666",
                                lineHeight: "1.5",
                              }}
                            >
                              <div>Frequency: {data.x} mentions</div>
                              <div>KPI Score: {data.y}/10</div>
                              <div>Engagement: {data.z} interactions</div>
                              <div
                                style={{
                                  marginTop: "4px",
                                  color:
                                    data.sentiment === "positive"
                                      ? "#52c41a"
                                      : data.sentiment === "neutral"
                                      ? "#faad14"
                                      : "#ff4d4f",
                                  fontWeight: 500,
                                }}
                              >
                                Sentiment:{" "}
                                {data.sentiment.charAt(0).toUpperCase() +
                                  data.sentiment.slice(1)}
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Scatter
                    name="Words"
                    data={bubbleData}
                    shape={<CustomBubble />}
                  />
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

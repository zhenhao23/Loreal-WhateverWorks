import { useState } from "react";
import {
  Row,
  Col,
  Select,
  DatePicker,
  Tabs,
  Card,
  Input,
  Table,
  Typography,
  Tag,
} from "antd";
import {
  CalendarOutlined,
  BarChartOutlined,
  UserOutlined,
  ExclamationCircleOutlined,
  StarFilled,
  TableOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import ReactSpeedometer from "react-d3-speedometer";
import type { TabsProps } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Text } = Typography;

type YearRange = [Dayjs | null, Dayjs | null] | null;

const ProductTeam = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [selectedYearRange, setSelectedYearRange] = useState<YearRange>([
    dayjs("2020"),
    dayjs("2025"),
  ]);
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [selectedSentiment, setSelectedSentiment] = useState("all");
  const [keywords, setKeywords] = useState("");

  // Product comparison filters
  const [leftBrand, setLeftBrand] = useState("loreal");
  const [rightBrand, setRightBrand] = useState("innisfree");
  const [leftProduct, setLeftProduct] = useState("uv-defender-serum");
  const [rightProduct, setRightProduct] = useState(
    "intensive-long-lasting-sunscreen"
  );

  // Mock product data
  const productData = {
    loreal: {
      name: "L'Oréal",
      products: {
        "uv-defender-serum": {
          name: "UV Defender UV Serum Protector",
          image: "/src/assets/products/defender.webp",
          rating: 4.2,
          monthlySales: 12500,
          overallSentiment: 6.5,
          loveWords: [
            "Lightweight",
            "Hydrating",
            "Smooth",
            "Non-greasy",
            "Absorbent",
          ],
          hateWords: ["Sticky", "Fragranced", "Heavy", "Oily", "Expensive"],
          topComments: [
            {
              key: "comment-1",
              user: "BeautyLover123",
              comment:
                "Love how lightweight this serum feels! Perfect for daily use under makeup.",
              sentiment: "positive",
              rating: 5,
              date: "2024-09-25",
              kpiScore: 8.5,
            },
            {
              key: "comment-5",
              user: "GlowUp2024",
              comment: "Perfect texture, absorbs quickly and gives nice glow!",
              sentiment: "positive",
              rating: 5,
              date: "2024-09-12",
              kpiScore: 8.1,
            },
            {
              key: "comment-3",
              user: "SunscreenAddict",
              comment:
                "Amazing hydrating formula, doesn't leave white cast at all!",
              sentiment: "positive",
              rating: 5,
              date: "2024-09-18",
              kpiScore: 7.8,
            },
            {
              key: "comment-2",
              user: "SkinCareGuru",
              comment:
                "Great protection but wish it was less fragranced. Still recommend!",
              sentiment: "neutral",
              rating: 4,
              date: "2024-09-20",
              kpiScore: 6.2,
            },
            {
              key: "comment-4",
              user: "MakeupMaven",
              comment:
                "Too expensive for the amount you get, but quality is good.",
              sentiment: "neutral",
              rating: 3,
              date: "2024-09-15",
              kpiScore: 5.4,
            },
          ],
        },
        "revitalift-day-cream": {
          name: "Revitalift Day Cream",
          image: "/src/assets/products/loreal revitalift.webp",
          rating: 4.2,
          monthlySales: 12800,
          overallSentiment: 7.8,
          loveWords: [
            "Luxurious",
            "Anti-aging",
            "Firming",
            "Moisturizing",
            "Premium",
          ],
          hateWords: [
            "Expensive",
            "Thick",
            "Slow results",
            "Heavy",
            "Strong scent",
          ],
          topComments: [
            {
              key: "comment-1",
              user: "LuxuryBeauty",
              comment:
                "This cream is absolutely luxurious! Worth every penny for the anti-aging results.",
              sentiment: "positive",
              rating: 5,
              date: "2024-09-24",
              kpiScore: 9.1,
            },
            {
              key: "comment-3",
              user: "AntiAgingQueen",
              comment:
                "Premium quality ingredients, can feel the difference in skin texture!",
              sentiment: "positive",
              rating: 5,
              date: "2024-09-19",
              kpiScore: 8.9,
            },
            {
              key: "comment-2",
              user: "SkincareExpert",
              comment:
                "Good moisturizing properties but takes time to see firming results.",
              sentiment: "neutral",
              rating: 4,
              date: "2024-09-22",
              kpiScore: 6.7,
            },
            {
              key: "comment-5",
              user: "MatureSkinfluencer",
              comment:
                "Heavy texture but really helps with fine lines. Strong scent though.",
              sentiment: "neutral",
              rating: 3,
              date: "2024-09-14",
              kpiScore: 5.8,
            },
            {
              key: "comment-4",
              user: "BudgetBeauty",
              comment:
                "Too expensive for my budget, though the quality seems good.",
              sentiment: "negative",
              rating: 2,
              date: "2024-09-16",
              kpiScore: 4.2,
            },
          ],
        },
      },
    },
    innisfree: {
      name: "Innisfree",
      products: {
        "intensive-long-lasting-sunscreen": {
          name: "Intensive Long Lasting Sunscreen",
          image: "/src/assets/products/innisfree intensive.webp",
          rating: 4.5,
          monthlySales: 8300,
          overallSentiment: 8.2,
          loveWords: [
            "Lightweight",
            "Matte",
            "Non-sticky",
            "Long-lasting",
            "Absorbent",
          ],
          hateWords: [
            "Whitecast",
            "Fragranced",
            "Greasy",
            "Thick",
            "Expensive",
          ],
          topComments: [
            {
              key: "comment-1",
              user: "KBeautyFan",
              comment:
                "Perfect lightweight formula! No white cast and lasts all day.",
              sentiment: "positive",
              rating: 5,
              date: "2024-09-26",
              kpiScore: 8.7,
            },
            {
              key: "comment-3",
              user: "OilySkinHelp",
              comment: "Amazing for oily skin! Non-sticky and absorbs quickly.",
              sentiment: "positive",
              rating: 5,
              date: "2024-09-21",
              kpiScore: 8.3,
            },
            {
              key: "comment-5",
              user: "SunProtection",
              comment:
                "Long-lasting protection, though texture is a bit thick initially.",
              sentiment: "positive",
              rating: 4,
              date: "2024-09-13",
              kpiScore: 7.2,
            },
            {
              key: "comment-2",
              user: "SensitiveSkin",
              comment:
                "Great matte finish but has a slight fragrance that bothers me.",
              sentiment: "neutral",
              rating: 4,
              date: "2024-09-23",
              kpiScore: 6.5,
            },
            {
              key: "comment-4",
              user: "BudgetShopper",
              comment: "Good quality but pricey for a drugstore alternative.",
              sentiment: "neutral",
              rating: 3,
              date: "2024-09-17",
              kpiScore: 5.9,
            },
          ],
        },
      },
    },
  };

  // Get current product data
  const leftProductData = (productData as any)[leftBrand]?.products[
    leftProduct
  ];
  const rightProductData = (productData as any)[rightBrand]?.products[
    rightProduct
  ];

  // Helper function to render star ratings
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <StarFilled
          key={i}
          style={{
            color: i <= rating ? "#faad14" : "#d9d9d9",
            fontSize: "16px",
            marginRight: "2px",
          }}
        />
      );
    }
    return stars;
  };

  // Helper function to render product card
  const renderProductCard = (productData: any, brandName: string) => {
    if (!productData) return null;

    return (
      <Card
        style={{
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          height: "100%",
        }}
        bodyStyle={{ padding: "24px" }}
      >
        {/* Brand and Product Title */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: "#5A6ACF",
              margin: "0 0 8px 0",
            }}
          >
            {brandName}
          </h2>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: 500,
              color: "#666",
              margin: "0 0 20px 0",
            }}
          >
            {productData.name}
          </h3>
        </div>

        {/* Product Image */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "24px",
          }}
        >
          <img
            src={productData.image}
            alt={productData.name}
            style={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
              borderRadius: "8px",
              border: "1px solid #f0f0f0",
            }}
          />
        </div>

        {/* Ratings */}
        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#666",
              marginBottom: "8px",
            }}
          >
            Ratings:
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {renderStars(Math.floor(productData.rating))}
            <span style={{ fontSize: "16px", fontWeight: 600, color: "#333" }}>
              {productData.rating}/5.0
            </span>
          </div>
        </div>

        {/* Monthly Sales */}
        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#666",
              marginBottom: "8px",
            }}
          >
            Monthly Sales:
          </div>
          <div
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#52c41a",
            }}
          >
            {productData.monthlySales.toLocaleString()} units
          </div>
        </div>

        {/* Overall Sentiment Gauge */}
        <div>
          <div
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#666",
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            Overall Sentiment
          </div>
          <div
            style={{
              height: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <ReactSpeedometer
              maxValue={10}
              minValue={0}
              value={productData.overallSentiment}
              needleColor="#5A6ACF"
              needleHeightRatio={0.7}
              startColor="#FF6961"
              segments={3}
              segmentColors={["#FF6961", "#FFB54C", "#8CD47E"]}
              endColor="#8CD47E"
              textColor="#5A6ACF"
              valueTextFontSize="20px"
              labelFontSize="10px"
              currentValueText={`${productData.overallSentiment}/10`}
              paddingVertical={15}
              customSegmentStops={[0, 3.33, 6.67, 10]}
              customSegmentLabels={[
                {
                  text: "Negative",
                  color: "#fff",
                  fontSize: "8px",
                },
                {
                  text: "Neutral",
                  color: "#fff",
                  fontSize: "8px",
                },
                {
                  text: "Positive",
                  color: "#fff",
                  fontSize: "8px",
                },
              ]}
              ringWidth={15}
              needleTransitionDuration={1000}
              width={180}
              height={120}
            />
            <div
              style={{
                marginTop: "12px",
                textAlign: "center",
                fontSize: "16px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ fontSize: "20px" }}>
                {productData.overallSentiment >= 6.67
                  ? "😊"
                  : productData.overallSentiment >= 3.33
                  ? "😐"
                  : "😞"}
              </span>
              <span
                style={{
                  color:
                    productData.overallSentiment >= 6.67
                      ? "#8CD47E"
                      : productData.overallSentiment >= 3.33
                      ? "#FFB54C"
                      : "#FF6961",
                }}
              >
                {productData.overallSentiment >= 6.67
                  ? "Positive"
                  : productData.overallSentiment >= 3.33
                  ? "Neutral"
                  : "Negative"}
              </span>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <ExclamationCircleOutlined />
          Painpoints and Opportunities
        </span>
      ),
      children: (
        <div style={{ padding: "24px", textAlign: "center", color: "#999" }}>
          Painpoints and opportunities content will be displayed here
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <BarChartOutlined />
          Product Comparisons
        </span>
      ),
      children: (
        <div style={{ padding: "24px" }}>
          <Row gutter={[24, 24]} style={{ minHeight: "600px" }}>
            {/* Left Product Card */}
            <Col xs={24} lg={12}>
              {renderProductCard(
                leftProductData,
                (productData as any)[leftBrand]?.name
              )}
            </Col>

            {/* Right Product Card */}
            <Col xs={24} lg={12}>
              {renderProductCard(
                rightProductData,
                (productData as any)[rightBrand]?.name
              )}
            </Col>
          </Row>

          {/* Love and Hate Words Table */}
          <Row style={{ marginTop: "32px" }}>
            <Col xs={24}>
              <Card
                title={
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "#5A6ACF",
                    }}
                  >
                    Love & Hate Words Comparison
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
                <Row gutter={[24, 0]}>
                  {/* Left Product Love/Hate */}
                  <Col xs={24} lg={12}>
                    <div style={{ textAlign: "center", marginBottom: "16px" }}>
                      <h4
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                          color: "#5A6ACF",
                          margin: "0 0 4px 0",
                        }}
                      >
                        {(productData as any)[leftBrand]?.name}
                      </h4>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#666",
                          margin: "0 0 16px 0",
                        }}
                      >
                        {leftProductData?.name}
                      </p>
                    </div>
                    <Table
                      dataSource={[
                        {
                          key: "love",
                          type: "Love Words",
                          words: leftProductData?.loveWords || [],
                          color: "#52c41a",
                        },
                        {
                          key: "hate",
                          type: "Hate Words",
                          words: leftProductData?.hateWords || [],
                          color: "#ff4d4f",
                        },
                      ]}
                      columns={[
                        {
                          title: "Type",
                          dataIndex: "type",
                          key: "type",
                          width: "30%",
                          render: (text: string, record: any) => (
                            <span
                              style={{
                                fontWeight: 600,
                                color: record.color,
                                fontSize: "14px",
                              }}
                            >
                              {text}
                            </span>
                          ),
                        },
                        {
                          title: "Words",
                          dataIndex: "words",
                          key: "words",
                          render: (words: string[]) => (
                            <div
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "4px",
                              }}
                            >
                              {words.map((word, index) => (
                                <span
                                  key={index}
                                  style={{
                                    background: "#f0f2f5",
                                    padding: "4px 8px",
                                    borderRadius: "12px",
                                    fontSize: "12px",
                                    color: "#666",
                                    fontWeight: 500,
                                  }}
                                >
                                  {word}
                                </span>
                              ))}
                            </div>
                          ),
                        },
                      ]}
                      pagination={false}
                      size="small"
                      showHeader={false}
                    />
                  </Col>

                  {/* Right Product Love/Hate */}
                  <Col xs={24} lg={12}>
                    <div style={{ textAlign: "center", marginBottom: "16px" }}>
                      <h4
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                          color: "#5A6ACF",
                          margin: "0 0 4px 0",
                        }}
                      >
                        {(productData as any)[rightBrand]?.name}
                      </h4>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#666",
                          margin: "0 0 16px 0",
                        }}
                      >
                        {rightProductData?.name}
                      </p>
                    </div>
                    <Table
                      dataSource={[
                        {
                          key: "love",
                          type: "Love Words",
                          words: rightProductData?.loveWords || [],
                          color: "#52c41a",
                        },
                        {
                          key: "hate",
                          type: "Hate Words",
                          words: rightProductData?.hateWords || [],
                          color: "#ff4d4f",
                        },
                      ]}
                      columns={[
                        {
                          title: "Type",
                          dataIndex: "type",
                          key: "type",
                          width: "30%",
                          render: (text: string, record: any) => (
                            <span
                              style={{
                                fontWeight: 600,
                                color: record.color,
                                fontSize: "14px",
                              }}
                            >
                              {text}
                            </span>
                          ),
                        },
                        {
                          title: "Words",
                          dataIndex: "words",
                          key: "words",
                          render: (words: string[]) => (
                            <div
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "4px",
                              }}
                            >
                              {words.map((word, index) => (
                                <span
                                  key={index}
                                  style={{
                                    background: "#f0f2f5",
                                    padding: "4px 8px",
                                    borderRadius: "12px",
                                    fontSize: "12px",
                                    color: "#666",
                                    fontWeight: 500,
                                  }}
                                >
                                  {word}
                                </span>
                              ))}
                            </div>
                          ),
                        },
                      ]}
                      pagination={false}
                      size="small"
                      showHeader={false}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          {/* Customer Comments Analysis Section */}
          {leftProductData && rightProductData && (
            <Row gutter={[24, 24]} style={{ marginTop: "32px" }}>
              <Col span={24}>
                <Card
                  title={
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <TableOutlined />
                      Customer Comments Analysis
                    </span>
                  }
                  style={{ borderRadius: "12px" }}
                >
                  <Row gutter={[24, 0]}>
                    {/* Left Product Comments */}
                    <Col xs={24} lg={12}>
                      <div
                        style={{ textAlign: "center", marginBottom: "16px" }}
                      >
                        <Text strong style={{ fontSize: "16px" }}>
                          {leftProductData.name}
                        </Text>
                        <Text
                          type="secondary"
                          style={{ display: "block", fontSize: "14px" }}
                        >
                          Top 5 Customer Comments
                        </Text>
                      </div>
                      <Table
                        dataSource={leftProductData.topComments}
                        columns={[
                          {
                            title: "Comment Text",
                            dataIndex: "comment",
                            key: "comment",
                            width: "70%",
                            render: (text: string) => (
                              <div
                                style={{
                                  fontSize: "14px",
                                  lineHeight: "1.5",
                                  maxWidth: "90%",
                                }}
                              >
                                {text}
                              </div>
                            ),
                          },
                          {
                            title: "Sentiment",
                            dataIndex: "sentiment",
                            key: "sentiment",
                            width: "15%",
                            render: (sentiment: string) => {
                              const config = {
                                positive: {
                                  color: "#52c41a",
                                  icon: <CheckCircleOutlined />,
                                },
                                neutral: {
                                  color: "#faad14",
                                  icon: <ExclamationCircleOutlined />,
                                },
                                negative: {
                                  color: "#ff4d4f",
                                  icon: <CloseCircleOutlined />,
                                },
                              };
                              const sentimentConfig = config[
                                sentiment as keyof typeof config
                              ] || {
                                color: "#666",
                                icon: <ExclamationCircleOutlined />,
                              };
                              return (
                                <Tag
                                  color={sentimentConfig.color}
                                  icon={sentimentConfig.icon}
                                >
                                  {sentiment
                                    ? sentiment.charAt(0).toUpperCase() +
                                      sentiment.slice(1)
                                    : "Unknown"}
                                </Tag>
                              );
                            },
                          },
                          {
                            title: "Quality Score",
                            dataIndex: "kpiScore",
                            key: "kpiScore",
                            width: "15%",
                            render: (score: number) => (
                              <div
                                style={{
                                  fontWeight: 600,
                                  color: "#5A6ACF",
                                  fontSize: "16px",
                                }}
                              >
                                {score}/10
                              </div>
                            ),
                          },
                        ]}
                        pagination={false}
                        size="middle"
                        style={{ borderRadius: "8px" }}
                      />
                    </Col>

                    {/* Right Product Comments */}
                    <Col xs={24} lg={12}>
                      <div
                        style={{ textAlign: "center", marginBottom: "16px" }}
                      >
                        <Text strong style={{ fontSize: "16px" }}>
                          {rightProductData.name}
                        </Text>
                        <Text
                          type="secondary"
                          style={{ display: "block", fontSize: "14px" }}
                        >
                          Top 5 Customer Comments
                        </Text>
                      </div>
                      <Table
                        dataSource={rightProductData.topComments}
                        columns={[
                          {
                            title: "Comment Text",
                            dataIndex: "comment",
                            key: "comment",
                            width: "70%",
                            render: (text: string) => (
                              <div
                                style={{
                                  fontSize: "14px",
                                  lineHeight: "1.5",
                                  maxWidth: "90%",
                                }}
                              >
                                {text}
                              </div>
                            ),
                          },
                          {
                            title: "Sentiment",
                            dataIndex: "sentiment",
                            key: "sentiment",
                            width: "15%",
                            render: (sentiment: string) => {
                              const config = {
                                positive: {
                                  color: "#52c41a",
                                  icon: <CheckCircleOutlined />,
                                },
                                neutral: {
                                  color: "#faad14",
                                  icon: <ExclamationCircleOutlined />,
                                },
                                negative: {
                                  color: "#ff4d4f",
                                  icon: <CloseCircleOutlined />,
                                },
                              };
                              const sentimentConfig = config[
                                sentiment as keyof typeof config
                              ] || {
                                color: "#666",
                                icon: <ExclamationCircleOutlined />,
                              };
                              return (
                                <Tag
                                  color={sentimentConfig.color}
                                  icon={sentimentConfig.icon}
                                >
                                  {sentiment
                                    ? sentiment.charAt(0).toUpperCase() +
                                      sentiment.slice(1)
                                    : "Unknown"}
                                </Tag>
                              );
                            },
                          },
                          {
                            title: "Quality Score",
                            dataIndex: "kpiScore",
                            key: "kpiScore",
                            width: "15%",
                            render: (score: number) => (
                              <div
                                style={{
                                  fontWeight: 600,
                                  color: "#5A6ACF",
                                  fontSize: "16px",
                                }}
                              >
                                {score}/10
                              </div>
                            ),
                          },
                        ]}
                        pagination={false}
                        size="middle"
                        style={{ borderRadius: "8px" }}
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          )}
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <UserOutlined />
          Product Leaderboard
        </span>
      ),
      children: (
        <div style={{ padding: "24px" }}>
          {/* Skin Products Leaderboard */}
          <Row gutter={[24, 24]} style={{ marginBottom: "32px" }}>
            <Col span={24}>
              <Card
                title={
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "#5A6ACF",
                    }}
                  >
                    🧴 Skin Products (Top 5) in Malaysia
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
                  dataSource={[
                    {
                      key: "1",
                      rank: 1,
                      productName: "Hydrating Niacinamide Serum",
                      brand: "Skintific",
                      totalReviews: 12500,
                      sales: 18.7,
                      growthRate: 35,
                    },
                    {
                      key: "2",
                      rank: 2,
                      productName: "Oil-Control Facial Cleanser",
                      brand: "Innisfree",
                      totalReviews: 10200,
                      sales: 15.3,
                      growthRate: 28,
                    },
                    {
                      key: "3",
                      rank: 3,
                      productName: "Vitamin C Brightening Essence",
                      brand: "The Ordinary",
                      totalReviews: 9800,
                      sales: 14.1,
                      growthRate: 30,
                    },
                    {
                      key: "4",
                      rank: 4,
                      productName: "Overnight Repair Retinol Night Cream",
                      brand: "La Roche-Posay",
                      totalReviews: 8500,
                      sales: 12.6,
                      growthRate: 25,
                    },
                    {
                      key: "5",
                      rank: 5,
                      productName: "Daily Sun Protection SPF50 Gel",
                      brand: "Biore",
                      totalReviews: 7400,
                      sales: 10.2,
                      growthRate: 20,
                    },
                  ]}
                  columns={[
                    {
                      title: "Rank",
                      dataIndex: "rank",
                      key: "rank",
                      width: "8%",
                      render: (rank: number) => (
                        <div
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            background:
                              rank === 1
                                ? "#FFD700"
                                : rank === 2
                                ? "#C0C0C0"
                                : rank === 3
                                ? "#CD7F32"
                                : "#5A6ACF",
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 600,
                            fontSize: "14px",
                          }}
                        >
                          {rank}
                        </div>
                      ),
                    },
                    {
                      title: "Product Name",
                      dataIndex: "productName",
                      key: "productName",
                      width: "30%",
                      render: (text: string) => (
                        <Text
                          strong
                          style={{ fontSize: "14px", color: "#333" }}
                        >
                          {text}
                        </Text>
                      ),
                    },
                    {
                      title: "Brand",
                      dataIndex: "brand",
                      key: "brand",
                      width: "15%",
                      render: (text: string) => (
                        <Tag color="#5A6ACF" style={{ fontSize: "12px" }}>
                          {text}
                        </Tag>
                      ),
                    },
                    {
                      title: "Total Reviews",
                      dataIndex: "totalReviews",
                      key: "totalReviews",
                      width: "15%",
                      render: (value: number) => (
                        <Text style={{ fontSize: "14px", fontWeight: 600 }}>
                          {value.toLocaleString()}
                        </Text>
                      ),
                    },
                    {
                      title: "Sales (MYR millions)",
                      dataIndex: "sales",
                      key: "sales",
                      width: "17%",
                      render: (value: number) => (
                        <Text
                          style={{
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#52c41a",
                          }}
                        >
                          {value}M
                        </Text>
                      ),
                    },
                    {
                      title: "Growth Rate YoY (%)",
                      dataIndex: "growthRate",
                      key: "growthRate",
                      width: "15%",
                      render: (value: number) => (
                        <Tag
                          color={
                            value >= 30
                              ? "green"
                              : value >= 20
                              ? "orange"
                              : "blue"
                          }
                        >
                          +{value}%
                        </Tag>
                      ),
                    },
                  ]}
                  pagination={false}
                  size="middle"
                  style={{ borderRadius: "8px" }}
                />
              </Card>
            </Col>
          </Row>

          {/* Body Products Leaderboard */}
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Card
                title={
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "#5A6ACF",
                    }}
                  >
                    🧴 Body Products (Top 5) in Malaysia
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
                  dataSource={[
                    {
                      key: "1",
                      rank: 1,
                      productName: "Whitening & Moisturising Body Lotion",
                      brand: "Vaseline",
                      totalReviews: 11300,
                      sales: 20.5,
                      growthRate: 22,
                    },
                    {
                      key: "2",
                      rank: 2,
                      productName: "Firming Cellulite Butter",
                      brand: "Palmer's",
                      totalReviews: 9400,
                      sales: 16.0,
                      growthRate: 18,
                    },
                    {
                      key: "3",
                      rank: 3,
                      productName: "Soothing Aloe Vera Body Wash",
                      brand: "Safi",
                      totalReviews: 8200,
                      sales: 13.7,
                      growthRate: 25,
                    },
                    {
                      key: "4",
                      rank: 4,
                      productName: "Exfoliating Sugar Scrub",
                      brand: "The Body Shop",
                      totalReviews: 7600,
                      sales: 11.8,
                      growthRate: 20,
                    },
                    {
                      key: "5",
                      rank: 5,
                      productName: "Deodorant Roll-on (24h protection)",
                      brand: "Rexona",
                      totalReviews: 6500,
                      sales: 9.9,
                      growthRate: 15,
                    },
                  ]}
                  columns={[
                    {
                      title: "Rank",
                      dataIndex: "rank",
                      key: "rank",
                      width: "8%",
                      render: (rank: number) => (
                        <div
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            background:
                              rank === 1
                                ? "#FFD700"
                                : rank === 2
                                ? "#C0C0C0"
                                : rank === 3
                                ? "#CD7F32"
                                : "#5A6ACF",
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 600,
                            fontSize: "14px",
                          }}
                        >
                          {rank}
                        </div>
                      ),
                    },
                    {
                      title: "Product Name",
                      dataIndex: "productName",
                      key: "productName",
                      width: "30%",
                      render: (text: string) => (
                        <Text
                          strong
                          style={{ fontSize: "14px", color: "#333" }}
                        >
                          {text}
                        </Text>
                      ),
                    },
                    {
                      title: "Brand",
                      dataIndex: "brand",
                      key: "brand",
                      width: "15%",
                      render: (text: string) => (
                        <Tag color="#5A6ACF" style={{ fontSize: "12px" }}>
                          {text}
                        </Tag>
                      ),
                    },
                    {
                      title: "Total Reviews",
                      dataIndex: "totalReviews",
                      key: "totalReviews",
                      width: "15%",
                      render: (value: number) => (
                        <Text style={{ fontSize: "14px", fontWeight: 600 }}>
                          {value.toLocaleString()}
                        </Text>
                      ),
                    },
                    {
                      title: "Sales (MYR millions)",
                      dataIndex: "sales",
                      key: "sales",
                      width: "17%",
                      render: (value: number) => (
                        <Text
                          style={{
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#52c41a",
                          }}
                        >
                          {value}M
                        </Text>
                      ),
                    },
                    {
                      title: "Growth Rate YoY (%)",
                      dataIndex: "growthRate",
                      key: "growthRate",
                      width: "15%",
                      render: (value: number) => (
                        <Tag
                          color={
                            value >= 30
                              ? "green"
                              : value >= 20
                              ? "orange"
                              : "blue"
                          }
                        >
                          +{value}%
                        </Tag>
                      ),
                    },
                  ]}
                  pagination={false}
                  size="middle"
                  style={{ borderRadius: "8px" }}
                />
              </Card>
            </Col>
          </Row>
        </div>
      ),
    },
  ];

  return (
    <div style={{ background: "#f5f6fa", minHeight: "100vh", padding: "0" }}>
      {/* Top Bar Filters */}
      <Card
        style={{
          marginBottom: "0px",
          borderRadius: "12px 12px 0 0",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
        bodyStyle={{ padding: "20px 24px" }}
      >
        <Row gutter={[16, 16]} align="middle">
          <Col flex={1}>
            {/* First Row: Date Range, Sentiment, Platform */}
            <Row
              gutter={[16, 8]}
              align="middle"
              style={{ marginBottom: "16px" }}
            >
              <Col xs={24} sm={8} md={8}>
                <div
                  style={{
                    marginBottom: "4px",
                    color: "#666",
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  DATE RANGE
                </div>
                <RangePicker
                  style={{ width: "100%" }}
                  placeholder={["Start Date", "End Date"]}
                  value={selectedYearRange}
                  suffixIcon={<CalendarOutlined style={{ color: "#A6ABC8" }} />}
                  onChange={(dates) => setSelectedYearRange(dates)}
                />
              </Col>
              <Col xs={24} sm={8} md={8}>
                <div
                  style={{
                    marginBottom: "4px",
                    color: "#666",
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  SENTIMENT
                </div>
                <Select
                  value={selectedSentiment}
                  onChange={setSelectedSentiment}
                  style={{ width: "100%" }}
                  placeholder="Select sentiment"
                >
                  <Option value="negative">Negative</Option>
                  <Option value="neutral">Neutral</Option>
                  <Option value="positive">Positive</Option>
                  <Option value="all">All</Option>
                </Select>
              </Col>
              <Col xs={24} sm={8} md={8}>
                <div
                  style={{
                    marginBottom: "4px",
                    color: "#666",
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  PLATFORM
                </div>
                <Select
                  value={selectedLanguage}
                  onChange={setSelectedLanguage}
                  style={{ width: "100%" }}
                  placeholder="Select platform"
                >
                  <Option value="youtube">YouTube</Option>
                  <Option value="tiktok">TikTok</Option>
                  <Option value="instagram">Instagram</Option>
                  <Option value="all">Shoppee</Option>
                </Select>
              </Col>
            </Row>

            {/* Second Row: Keywords (only show when not in Product Comparisons tab) */}
            {/* {activeTab !== "2" && (
              <Row gutter={[8, 8]} align="middle">
                <Col span={24}>
                  <div
                    style={{
                      marginBottom: "8px",
                      color: "#666",
                      fontSize: "12px",
                      fontWeight: 500,
                    }}
                  >
                    KEYWORDS
                  </div>
                  <Input
                    placeholder="Enter keywords (e.g., skincare, moisturizer, anti-aging)"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    style={{
                      width: "30%",
                      borderRadius: "6px",
                      height: "40px",
                    }}
                  />
                </Col>
              </Row>
            )} */}

            {/* Product Comparison Filters (only show when in Product Comparisons tab) */}
            {activeTab === "2" && (
              <>
                {/* Second Row: Brand Filters */}
                <Row
                  gutter={[16, 8]}
                  align="middle"
                  style={{ marginBottom: "16px" }}
                >
                  <Col xs={24} sm={12} md={12}>
                    <div
                      style={{
                        marginBottom: "4px",
                        color: "#666",
                        fontSize: "12px",
                        fontWeight: 500,
                      }}
                    >
                      BRAND A
                    </div>
                    <Select
                      value={leftBrand}
                      onChange={setLeftBrand}
                      style={{ width: "50%" }}
                      placeholder="Select brand"
                    >
                      <Option value="loreal">L'Oréal</Option>
                      <Option value="innisfree">Innisfree</Option>
                      <Option value="maybelline">Maybelline</Option>
                      <Option value="cerave">CeraVe</Option>
                      <Option value="neutrogena">Neutrogena</Option>
                    </Select>
                  </Col>
                  <Col xs={24} sm={12} md={12}>
                    <div
                      style={{
                        marginBottom: "4px",
                        color: "#666",
                        fontSize: "12px",
                        fontWeight: 500,
                      }}
                    >
                      BRAND B
                    </div>
                    <Select
                      value={rightBrand}
                      onChange={setRightBrand}
                      style={{ width: "50%" }}
                      placeholder="Select brand"
                    >
                      <Option value="loreal">L'Oréal</Option>
                      <Option value="innisfree">Innisfree</Option>
                      <Option value="maybelline">Maybelline</Option>
                      <Option value="cerave">CeraVe</Option>
                      <Option value="neutrogena">Neutrogena</Option>
                    </Select>
                  </Col>
                </Row>

                {/* Third Row: Product Filters */}
                <Row gutter={[16, 8]} align="middle">
                  <Col xs={24} sm={12} md={12}>
                    <div
                      style={{
                        marginBottom: "4px",
                        color: "#666",
                        fontSize: "12px",
                        fontWeight: 500,
                      }}
                    >
                      PRODUCT A
                    </div>
                    <Select
                      value={leftProduct}
                      onChange={setLeftProduct}
                      style={{ width: "50%" }}
                      placeholder="Select product"
                    >
                      <Option value="uv-defender-serum">
                        UV Defender UV Serum Protector
                      </Option>
                      <Option value="revitalift-day-cream">
                        Revitalift Day Cream
                      </Option>
                      <Option value="age-perfect-serum">
                        Age Perfect Serum
                      </Option>
                      <Option value="hydra-genius-moisturizer">
                        Hydra Genius Moisturizer
                      </Option>
                    </Select>
                  </Col>
                  <Col xs={24} sm={12} md={12}>
                    <div
                      style={{
                        marginBottom: "4px",
                        color: "#666",
                        fontSize: "12px",
                        fontWeight: 500,
                      }}
                    >
                      PRODUCT B
                    </div>
                    <Select
                      value={rightProduct}
                      onChange={setRightProduct}
                      style={{ width: "50%" }}
                      placeholder="Select product"
                    >
                      <Option value="intensive-long-lasting-sunscreen">
                        Intensive Long Lasting Sunscreen
                      </Option>
                      <Option value="green-tea-seed-serum">
                        Green Tea Seed Serum
                      </Option>
                      <Option value="jeju-volcanic-cleanser">
                        Jeju Volcanic Cleanser
                      </Option>
                      <Option value="no-sebum-mineral-powder">
                        No Sebum Mineral Powder
                      </Option>
                    </Select>
                  </Col>
                </Row>
              </>
            )}
          </Col>
        </Row>
      </Card>

      {/* Dashboard Tabs */}
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        size="large"
        style={{
          background: "transparent",
        }}
        tabBarStyle={{
          background: "#fff",
          margin: "0 0 24px 0",
          padding: "0 24px",
          borderRadius: "0 0 12px 12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
      />
    </div>
  );
};

export default ProductTeam;

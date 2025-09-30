import { useState } from "react";
import {
  Typography,
  Card,
  Select,
  Input,
  Button,
  Row,
  Col,
  Tag,
  Progress,
  Divider,
  Space,
  Checkbox,
} from "antd";
import {
  YoutubeOutlined,
  TikTokOutlined,
  InstagramOutlined,
  TwitterOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

interface PlatformFilters {
  youtube: {
    category: string;
    duration: string;
    region: string;
    sortOrder: string;
  };
  tiktok: {
    hashtag: string;
    content: string;
    sound: string;
  };
  instagram: {
    hashtag: string;
    mediaType: string;
  };
  twitter: {
    sortBy: string;
    hashtags: string;
    mentions: string;
  };
}

const ApiFetch = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("youtube");
  const [keywords, setKeywords] = useState<string[]>(["sunscreen"]);
  const [language, setLanguage] = useState<string>("english");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [keywordInput, setKeywordInput] = useState<string>("");
  const [startYear, setStartYear] = useState<string>("2020");
  const [endYear, setEndYear] = useState<string>("Present");
  const [autoFetchDaily, setAutoFetchDaily] = useState<boolean>(false);

  const [platformFilters, setPlatformFilters] = useState<PlatformFilters>({
    youtube: {
      category: "beauty",
      duration: "short",
      region: "my",
      sortOrder: "viewCount",
    },
    tiktok: {
      hashtag: "",
      content: "trending",
      sound: "",
    },
    instagram: {
      hashtag: "",
      mediaType: "all",
    },
    twitter: {
      sortBy: "popular",
      hashtags: "",
      mentions: "",
    },
  });

  const platformOptions = [
    { value: "youtube", label: "YouTube", icon: <YoutubeOutlined /> },
    { value: "tiktok", label: "TikTok", icon: <TikTokOutlined /> },
    { value: "instagram", label: "Instagram", icon: <InstagramOutlined /> },
    { value: "twitter", label: "Twitter", icon: <TwitterOutlined /> },
  ];

  const handleAddKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  const handleRemoveKeyword = (removedTag: string) => {
    setKeywords(keywords.filter((tag) => tag !== removedTag));
  };

  const handlePlatformFilterChange = (
    platform: keyof PlatformFilters,
    field: string,
    value: string
  ) => {
    setPlatformFilters((prev) => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        [field]: value,
      },
    }));
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const renderPlatformSpecificFilters = () => {
    switch (selectedPlatform) {
      case "youtube":
        return (
          <div style={{ marginTop: "16px" }}>
            <Text strong>YouTube Filters:</Text>
            <Row gutter={[16, 16]} style={{ marginTop: "8px" }}>
              <Col span={12}>
                <Text>Category:</Text>
                <Select
                  value={platformFilters.youtube.category}
                  onChange={(value) =>
                    handlePlatformFilterChange("youtube", "category", value)
                  }
                  style={{ width: "100%", marginTop: "4px" }}
                  options={[
                    { label: "Beauty", value: "beauty" },
                    { label: "Lifestyle", value: "lifestyle" },
                    { label: "Fashion", value: "fashion" },
                    { label: "Health", value: "health" },
                  ]}
                />
              </Col>
              <Col span={12}>
                <Text>Duration:</Text>
                <Select
                  value={platformFilters.youtube.duration}
                  onChange={(value) =>
                    handlePlatformFilterChange("youtube", "duration", value)
                  }
                  style={{ width: "100%", marginTop: "4px" }}
                  options={[
                    { label: "Short (< 4 min)", value: "short" },
                    { label: "Medium (4-20 min)", value: "medium" },
                    { label: "Long (> 20 min)", value: "long" },
                  ]}
                />
              </Col>
              {/* <Col span={12}>
                <Text>Region:</Text>
                <Select
                  value={platformFilters.youtube.region}
                  onChange={(value) =>
                    handlePlatformFilterChange("youtube", "region", value)
                  }
                  style={{ width: "100%", marginTop: "4px" }}
                  options={[
                    { label: "Malaysia", value: "my" },
                    { label: "Singapore", value: "sg" },
                    { label: "Thailand", value: "th" },
                    { label: "Global", value: "global" },
                  ]}
                />
              </Col>
              <Col span={12}>
                <Text>Sort Order:</Text>
                <Select
                  value={platformFilters.youtube.sortOrder}
                  onChange={(value) =>
                    handlePlatformFilterChange("youtube", "sortOrder", value)
                  }
                  style={{ width: "100%", marginTop: "4px" }}
                  options={[
                    { label: "View Count", value: "viewCount" },
                    { label: "Upload Date", value: "uploadDate" },
                    { label: "Relevance", value: "relevance" },
                    { label: "Rating", value: "rating" },
                  ]}
                />
              </Col> */}
            </Row>
          </div>
        );
      case "tiktok":
        return (
          <div style={{ marginTop: "16px" }}>
            <Text strong>TikTok Filters:</Text>
            <Row gutter={[16, 16]} style={{ marginTop: "8px" }}>
              <Col span={12}>
                <Text>Hashtag:</Text>
                <Input
                  placeholder="#skincare #beauty"
                  value={platformFilters.tiktok.hashtag}
                  onChange={(e) =>
                    handlePlatformFilterChange(
                      "tiktok",
                      "hashtag",
                      e.target.value
                    )
                  }
                  style={{ marginTop: "4px" }}
                />
              </Col>
              <Col span={12}>
                <Text>Content Type:</Text>
                <Select
                  value={platformFilters.tiktok.content}
                  onChange={(value) =>
                    handlePlatformFilterChange("tiktok", "content", value)
                  }
                  style={{ width: "100%", marginTop: "4px" }}
                  options={[
                    { label: "Trending", value: "trending" },
                    { label: "For You", value: "foryou" },
                    { label: "Following", value: "following" },
                  ]}
                />
              </Col>
              <Col span={24}>
                <Text>Sound/Music:</Text>
                <Input
                  placeholder="Original sound, trending audio"
                  value={platformFilters.tiktok.sound}
                  onChange={(e) =>
                    handlePlatformFilterChange(
                      "tiktok",
                      "sound",
                      e.target.value
                    )
                  }
                  style={{ marginTop: "4px" }}
                />
              </Col>
            </Row>
          </div>
        );
      case "instagram":
        return (
          <div style={{ marginTop: "16px" }}>
            <Text strong>Instagram Filters:</Text>
            <Row gutter={[16, 16]} style={{ marginTop: "8px" }}>
              <Col span={12}>
                <Text>Hashtag:</Text>
                <Input
                  placeholder="#makeup #skincare"
                  value={platformFilters.instagram.hashtag}
                  onChange={(e) =>
                    handlePlatformFilterChange(
                      "instagram",
                      "hashtag",
                      e.target.value
                    )
                  }
                  style={{ marginTop: "4px" }}
                />
              </Col>
              <Col span={12}>
                <Text>Media Type:</Text>
                <Select
                  value={platformFilters.instagram.mediaType}
                  onChange={(value) =>
                    handlePlatformFilterChange("instagram", "mediaType", value)
                  }
                  style={{ width: "100%", marginTop: "4px" }}
                  options={[
                    { label: "All", value: "all" },
                    { label: "Image", value: "image" },
                    { label: "Video", value: "video" },
                    { label: "Reels", value: "reels" },
                    { label: "Stories", value: "stories" },
                  ]}
                />
              </Col>
            </Row>
          </div>
        );
      case "twitter":
        return (
          <div style={{ marginTop: "16px" }}>
            <Text strong>Twitter Filters:</Text>
            <Row gutter={[16, 16]} style={{ marginTop: "8px" }}>
              <Col span={12}>
                <Text>Sort By:</Text>
                <Select
                  value={platformFilters.twitter.sortBy}
                  onChange={(value) =>
                    handlePlatformFilterChange("twitter", "sortBy", value)
                  }
                  style={{ width: "100%", marginTop: "4px" }}
                  options={[
                    { label: "Popular", value: "popular" },
                    { label: "Latest", value: "latest" },
                    { label: "People", value: "people" },
                    { label: "Photos", value: "photos" },
                  ]}
                />
              </Col>
              <Col span={12}>
                <Text>Hashtags:</Text>
                <Input
                  placeholder="#beauty #skincare"
                  value={platformFilters.twitter.hashtags}
                  onChange={(e) =>
                    handlePlatformFilterChange(
                      "twitter",
                      "hashtags",
                      e.target.value
                    )
                  }
                  style={{ marginTop: "4px" }}
                />
              </Col>
              <Col span={24}>
                <Text>Mentions:</Text>
                <Input
                  placeholder="@lorealparis @maybelline"
                  value={platformFilters.twitter.mentions}
                  onChange={(e) =>
                    handlePlatformFilterChange(
                      "twitter",
                      "mentions",
                      e.target.value
                    )
                  }
                  style={{ marginTop: "4px" }}
                />
              </Col>
            </Row>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2} style={{ marginBottom: "24px", color: "#5A67BA" }}>
        API Fetch & Analysis
      </Title>

      <Row gutter={24}>
        {/* Filter Panel */}
        <Col span={14}>
          <Card title="Filter Panel" style={{ height: "100%" }}>
            {/* Platform Selector */}
            <div style={{ marginBottom: "24px" }}>
              <Text strong style={{ fontSize: "16px" }}>
                Platform:
              </Text>
              <Select
                value={selectedPlatform}
                onChange={setSelectedPlatform}
                style={{ width: "100%", marginTop: "8px" }}
                size="large"
              >
                {platformOptions.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    <Space>
                      {option.icon}
                      {option.label}
                    </Space>
                  </Select.Option>
                ))}
              </Select>
            </div>

            <Divider />

            {/* Common Filters */}
            <div style={{ marginBottom: "20px" }}>
              <Text strong style={{ fontSize: "16px" }}>
                Common Filters:
              </Text>

              <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
                <Col span={24}>
                  <Text>Keywords:</Text>
                  <div style={{ marginTop: "8px" }}>
                    <Input.Group compact>
                      <Input
                        style={{ width: "calc(100% - 80px)" }}
                        placeholder="Enter keyword and press Add"
                        value={keywordInput}
                        onChange={(e) => setKeywordInput(e.target.value)}
                        onPressEnter={handleAddKeyword}
                      />
                      <Button onClick={handleAddKeyword}>Add</Button>
                    </Input.Group>
                    <div style={{ marginTop: "8px" }}>
                      {keywords.map((tag) => (
                        <Tag
                          key={tag}
                          closable
                          onClose={() => handleRemoveKeyword(tag)}
                          style={{ margin: "2px" }}
                        >
                          {tag}
                        </Tag>
                      ))}
                    </div>
                  </div>
                </Col>

                <Col span={12}>
                  <Text>Date Range:</Text>
                  <div style={{ marginTop: "4px" }}>
                    <Input.Group compact>
                      <Select
                        value={startYear}
                        onChange={setStartYear}
                        style={{ width: "50%" }}
                        placeholder="From"
                        options={[
                          { label: "2020", value: "2020" },
                          { label: "2021", value: "2021" },
                          { label: "2022", value: "2022" },
                          { label: "2023", value: "2023" },
                          { label: "2024", value: "2024" },
                          { label: "2025", value: "2025" },
                        ]}
                      />
                      <Select
                        value={endYear}
                        onChange={setEndYear}
                        style={{ width: "50%" }}
                        placeholder="To"
                        options={[
                          { label: "2021", value: "2021" },
                          { label: "2022", value: "2022" },
                          { label: "2023", value: "2023" },
                          { label: "2024", value: "2024" },
                          { label: "2025", value: "2025" },
                          { label: "Present", value: "Present" },
                        ]}
                      />
                    </Input.Group>
                  </div>
                </Col>

                <Col span={12}>
                  <Text>Language:</Text>
                  <Select
                    value={language}
                    onChange={setLanguage}
                    style={{ width: "100%", marginTop: "4px" }}
                    options={[
                      { label: "English", value: "english" },
                      { label: "Malay", value: "malay" },
                      { label: "Thai", value: "thai" },
                      { label: "All Languages", value: "all" },
                    ]}
                  />
                </Col>

                <Col span={24} style={{ marginTop: "16px" }}>
                  <Checkbox
                    checked={autoFetchDaily}
                    onChange={(e) => setAutoFetchDaily(e.target.checked)}
                  >
                    Automatically fetch newest videos daily
                  </Checkbox>
                </Col>
              </Row>
            </div>

            <Divider />

            {/* Platform-Specific Filters */}
            {renderPlatformSpecificFilters()}

            {/* Start Analysis Button */}
            <div style={{ marginTop: "32px", textAlign: "center" }}>
              <Button
                type="primary"
                size="large"
                onClick={startAnalysis}
                disabled={isAnalyzing}
                icon={<PlayCircleOutlined />}
                style={{
                  backgroundColor: "#5A67BA",
                  borderColor: "#5A67BA",
                  minWidth: "200px",
                  height: "48px",
                }}
              >
                {isAnalyzing ? "Analyzing..." : "Start Analysis"}
              </Button>
            </div>
          </Card>
        </Col>

        {/* Status & Results Panel */}
        <Col span={10}>
          <Card title="Status & Results" style={{ height: "100%" }}>
            {/* Status/Progress */}
            <div style={{ marginBottom: "24px" }}>
              <Text strong>Status:</Text>
              <div style={{ marginTop: "8px" }}>
                {isAnalyzing ? (
                  <>
                    <Text type="secondary">
                      Fetching {selectedPlatform} data...
                    </Text>
                    <Progress
                      percent={progress}
                      status="active"
                      style={{ marginTop: "8px" }}
                    />
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                      {progress < 30 && "Connecting to API..."}
                      {progress >= 30 && progress < 60 && "Fetching videos..."}
                      {progress >= 60 &&
                        progress < 90 &&
                        "Processing comments..."}
                      {progress >= 90 && "Finalizing analysis..."}
                    </Text>
                  </>
                ) : progress === 100 ? (
                  <Text type="success">Analysis completed successfully!</Text>
                ) : (
                  <Text type="secondary">Ready to start analysis</Text>
                )}
              </div>
            </div>

            <Divider />

            {/* Results Preview */}
            {progress === 100 && (
              <div>
                <Text strong>Results Preview:</Text>
                <div style={{ marginTop: "16px" }}>
                  <Row gutter={[16, 16]}>
                    <Col span={24}>
                      <Card size="small" style={{ textAlign: "center" }}>
                        <Text
                          strong
                          style={{ fontSize: "24px", color: "#5A67BA" }}
                        >
                          123
                        </Text>
                        <br />
                        <Text type="secondary">Videos Analyzed</Text>
                      </Card>
                    </Col>
                    <Col span={24}>
                      <Card size="small" style={{ textAlign: "center" }}>
                        <Text
                          strong
                          style={{ fontSize: "24px", color: "#52c41a" }}
                        >
                          2,341
                        </Text>
                        <br />
                        <Text type="secondary">Comments Processed</Text>
                      </Card>
                    </Col>
                    <Col span={24}>
                      <Card size="small" style={{ textAlign: "center" }}>
                        <Text
                          strong
                          style={{ fontSize: "14px", color: "#fa8c16" }}
                        >
                          UV protection, SPF, moisturizer
                        </Text>
                        <br />
                        <Text type="secondary">Top Keywords</Text>
                      </Card>
                    </Col>
                  </Row>

                  <Button
                    type="primary"
                    block
                    size="large"
                    style={{
                      marginTop: "20px",
                      backgroundColor: "#5A67BA",
                      borderColor: "#5A67BA",
                    }}
                  >
                    View Full Dashboard
                  </Button>
                </div>
              </div>
            )}

            {/* Initial Instructions */}
            {!isAnalyzing && progress === 0 && (
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <Text type="secondary">
                  Configure your filters and click "Start Analysis" to begin
                  fetching and processing social media data.
                </Text>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ApiFetch;

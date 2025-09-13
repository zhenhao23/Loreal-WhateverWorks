// Mock data for Top 9 Channels Time Series Analysis
// Based on Top 9.csv data

export interface ChannelTimeSeriesData {
  year: number;
  [channelId: string]: number;
}

export interface Top9ChannelsTimeSeries {
  data: ChannelTimeSeriesData[];
  channelIds: string[];
  channelNames: { [key: string]: string };
}

// Channel ID to name mapping (based on mockTopChannels)
export const channelIdToName: { [key: string]: string } = {
  "26428": "Beauty And Makeup Art",
  "48780": "Love Makeup",
  "53183": "Jenny's Beauty Lab",
  "6926": "Brooke Monk",
  "14429": "Natalie Violette",
  "25356": "Di1araa.s",
  "26891": "Averina Anggita",
  "35581": "Sharon Spellman",
  "46179": "FionaFrills",
};

// Raw time series data from CSV
export const mockTop9TimeSeriesData: ChannelTimeSeriesData[] = [
  {
    year: 2020,
    "26428": 0,
    "48780": 0,
    "53183": 0,
    "6926": 0,
    "14429": 0,
    "25356": 0,
    "26891": 0,
    "35581": 0,
    "46179": 0,
  },
  {
    year: 2021,
    "26428": 0,
    "48780": 0,
    "53183": 0,
    "6926": 0,
    "14429": 0,
    "25356": 0,
    "26891": 0,
    "35581": 0,
    "46179": 0,
  },
  {
    year: 2022,
    "26428": 0,
    "48780": 0,
    "53183": 0,
    "6926": 0,
    "14429": 0,
    "25356": 0,
    "26891": 0,
    "35581": 0,
    "46179": 3.886554622,
  },
  {
    year: 2023,
    "26428": 0,
    "48780": 2.777777778,
    "53183": 48.10126582,
    "6926": 155,
    "14429": 2308.510638,
    "25356": 0,
    "26891": 4209.392265,
    "35581": 0,
    "46179": 1.11223458,
  },
  {
    year: 2024,
    "26428": 0,
    "48780": 4.504504505,
    "53183": 0.284900285,
    "6926": 84.09586057,
    "14429": 119.0812721,
    "25356": 3.448275862,
    "26891": 98.71794872,
    "35581": 0,
    "46179": 0,
  },
  {
    year: 2025,
    "26428": 0,
    "48780": 0,
    "53183": -1.704545455,
    "6926": 15.62130178,
    "14429": 4.032258065,
    "25356": 7,
    "26891": 17.41935484,
    "35581": 4677.376655,
    "46179": 0,
  },
];

// Processed data for easier consumption
export const mockTop9ChannelsTimeSeries: Top9ChannelsTimeSeries = {
  data: mockTop9TimeSeriesData,
  channelIds: [
    "26428",
    "48780",
    "53183",
    "6926",
    "14429",
    "25356",
    "26891",
    "35581",
    "46179",
  ],
  channelNames: channelIdToName,
};

// Helper function to get data for specific channels
export const getChannelTimeSeriesData = (channelIds: string[]) => {
  return mockTop9TimeSeriesData.map((yearData) => {
    const filteredData: ChannelTimeSeriesData = { year: yearData.year };
    channelIds.forEach((channelId) => {
      if (yearData[channelId] !== undefined) {
        filteredData[channelId] = yearData[channelId];
      }
    });
    return filteredData;
  });
};

// Helper function to get data for specific year range
export const getTimeSeriesDataByYearRange = (
  startYear: number,
  endYear: number
) => {
  return mockTop9TimeSeriesData.filter(
    (yearData) => yearData.year >= startYear && yearData.year <= endYear
  );
};

// Helper function to transform data for charting libraries (like line charts)
export const transformForLineChart = () => {
  const transformedData: Array<{
    year: number;
    channel: string;
    channelName: string;
    value: number;
  }> = [];

  mockTop9TimeSeriesData.forEach((yearData) => {
    Object.keys(yearData).forEach((key) => {
      if (key !== "year") {
        transformedData.push({
          year: yearData.year,
          channel: key,
          channelName: channelIdToName[key] || key,
          value: yearData[key],
        });
      }
    });
  });

  return transformedData;
};

// Summary statistics
export const getChannelSummaryStats = () => {
  const stats: {
    [key: string]: { min: number; max: number; avg: number; total: number };
  } = {};

  Object.keys(channelIdToName).forEach((channelId) => {
    const values = mockTop9TimeSeriesData
      .map((d) => d[channelId])
      .filter((v) => v !== undefined && v !== 0);
    if (values.length > 0) {
      stats[channelId] = {
        min: Math.min(...values),
        max: Math.max(...values),
        avg: values.reduce((sum, v) => sum + v, 0) / values.length,
        total: values.reduce((sum, v) => sum + v, 0),
      };
    }
  });

  return stats;
};

export default mockTop9ChannelsTimeSeries;

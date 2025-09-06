# Content Quality KPI Component Architecture

This document describes the refactored `ContentQualityKPI` component that has been separated into three distinct components for better maintainability and separation of concerns.

## Component Structure

### 1. `ContentQualityKPI.tsx` (Main Component)

**Purpose**: Main container component that handles data fetching, API calls, and fallback logic.

**Responsibilities**:

- Accepts filter props (`dateFilter`, `categoryFilter`, `languageFilter`)
- Attempts to fetch data from API endpoint `/api/content-quality-kpi`
- Falls back to mock data if API fails
- Manages loading and error states
- Displays warning message when using mock data
- Renders the UI component with the fetched/mock data

**Key Features**:

- **API Integration**: Sends POST request with filter parameters
- **Graceful Fallback**: Automatically uses mock data if API is unavailable
- **Error Handling**: Shows user-friendly messages
- **Loading States**: Displays spinner while fetching data

### 2. `ContentQualityKPIUI.tsx` (UI Component)

**Purpose**: Pure presentation component that renders the dashboard UI.

**Responsibilities**:

- Renders all visual components (cards, charts, tables, scatter plots)
- Handles all styling and layout
- Uses Ant Design components and various chart libraries
- Displays KPI metrics, sentiment analysis, word cloud, and bubble charts

**Props**:

- `data`: ContentQualityKPIData object containing all chart and metric data

**Key Features**:

- **Pure Component**: No side effects, only rendering
- **Rich Visualizations**:
  - KPI metric cards
  - Horizontal bar chart for sentiment by topics
  - Interactive word cloud with hover effects
  - Data table with customer comments
  - Bubble chart for word impact analysis
- **Interactive Elements**: Hover effects, tooltips, and styled components
- **Responsive Design**: Uses Ant Design's grid system

### 3. `ContentQualityKPIMockData.tsx` (Data Component)

**Purpose**: Contains all mock data and type definitions.

**Responsibilities**:

- Exports mock data for all charts and metrics
- Defines TypeScript interfaces
- Provides consistent data structure
- Serves as fallback when API is unavailable

**Exports**:

- `mockKPIMetrics`: Key performance indicator metrics
- `mockTopKeywords`: Keywords organized by category
- `mockSentimentByTopics`: Sentiment scores by topic areas
- `mockWordCloudData`: Word frequency data for visualization
- `mockTopComments`: Sample customer comments with scores
- `mockBubbleData`: Bubble chart data for word impact analysis
- `ContentQualityKPIData`: TypeScript interface

## Usage

```tsx
import ContentQualityKPI from "./components/ContentQualityKPI";

// Use in your dashboard
<ContentQualityKPI
  dateFilter={dateRange}
  categoryFilter="skincare"
  languageFilter="en"
/>;
```

## API Integration

The component expects an API endpoint at `/api/content-quality-kpi` that accepts:

```json
{
  "dateFilter": "date range object",
  "categoryFilter": "string",
  "languageFilter": "string"
}
```

And returns data matching the `ContentQualityKPIData` interface.

## Key Visualizations

1. **KPI Metric Cards**: Average scores, comment length, quality percentages
2. **Sentiment by Topics**: Horizontal bar chart showing sentiment scores by topic
3. **Word Cloud**: Interactive visualization of key adjectives with size-based frequency
4. **Top Comments Table**: Real customer comments with sentiment tags and engagement metrics
5. **Word Impact Bubble Chart**: Advanced visualization showing word frequency vs sentiment vs engagement

## Benefits of This Architecture

1. **Separation of Concerns**: Data fetching, UI rendering, and mock data are separated
2. **Maintainability**: Each component has a single responsibility
3. **Testability**: UI component can be tested independently with mock data
4. **Reusability**: UI component can be reused with different data sources
5. **Scalability**: Easy to modify data fetching logic or UI without affecting others
6. **Development Friendly**: Can develop UI using mock data even when API is not ready
7. **Rich Interactivity**: Multiple chart types and interactive elements for deep data exploration

## Chart Libraries Used

- **@ant-design/charts**: For bar charts
- **recharts**: For scatter/bubble charts
- **antd**: For tables, cards, and UI components
- **Custom CSS**: For word cloud visualization with hover effects

## Future Enhancements

- Add filtering capabilities within charts
- Implement drill-down functionality
- Add export options for charts and data
- Create custom hooks for data fetching
- Add real-time data updates
- Implement advanced text analytics visualizations

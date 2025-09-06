# Executive Overview Component Architecture

This document describes the refactored `ExecutiveOverview` component that has been separated into three distinct components for better maintainability and separation of concerns.

## Component Structure

### 1. `ExecutiveOverview.tsx` (Main Component)

**Purpose**: Main container component that handles data fetching, API calls, and fallback logic.

**Responsibilities**:

- Accepts filter props (`dateFilter`, `categoryFilter`, `languageFilter`)
- Attempts to fetch data from API endpoint `/api/executive-overview`
- Falls back to mock data if API fails
- Manages loading and error states
- Displays warning message when using mock data
- Renders the UI component with the fetched/mock data

**Key Features**:

- **API Integration**: Sends POST request with filter parameters
- **Graceful Fallback**: Automatically uses mock data if API is unavailable
- **Error Handling**: Shows user-friendly messages
- **Loading States**: Displays spinner while fetching data

### 2. `ExecutiveOverviewUI.tsx` (UI Component)

**Purpose**: Pure presentation component that renders the dashboard UI.

**Responsibilities**:

- Renders all visual components (cards, charts, graphs)
- Handles all styling and layout
- Uses Ant Design components and charts
- Displays metrics, sentiment analysis, and timeline data

**Props**:

- `data`: ExecutiveOverviewData object containing all chart and metric data

**Key Features**:

- **Pure Component**: No side effects, only rendering
- **Responsive Design**: Uses Ant Design's grid system
- **Rich Visualizations**: Includes pie charts, speedometer, bar charts, and timeline graphs
- **Interactive Elements**: Tooltips, legends, and hover effects

### 3. `ExecutiveOverviewMockData.tsx` (Data Component)

**Purpose**: Contains all mock data and type definitions.

**Responsibilities**:

- Exports mock data for all charts and metrics
- Defines TypeScript interfaces
- Provides consistent data structure
- Serves as fallback when API is unavailable

**Exports**:

- `mockSentimentData`: Sentiment distribution data
- `mockOverallSentimentScore`: Overall sentiment score (out of 5)
- `mockTimelineData`: Monthly timeline data
- `mockMetricsData`: Key performance metrics
- `mockCategoryData`: Category breakdown data
- `ExecutiveOverviewData`: TypeScript interface

## Usage

```tsx
import ExecutiveOverview from "./components/ExecutiveOverview";

// Use in your dashboard
<ExecutiveOverview
  dateFilter={dateRange}
  categoryFilter="skincare"
  languageFilter="en"
/>;
```

## API Integration

The component expects an API endpoint at `/api/executive-overview` that accepts:

```json
{
  "dateFilter": "date range object",
  "categoryFilter": "string",
  "languageFilter": "string"
}
```

And returns data matching the `ExecutiveOverviewData` interface.

## Benefits of This Architecture

1. **Separation of Concerns**: Data fetching, UI rendering, and mock data are separated
2. **Maintainability**: Each component has a single responsibility
3. **Testability**: UI component can be tested independently with mock data
4. **Reusability**: UI component can be reused with different data sources
5. **Scalability**: Easy to modify data fetching logic or UI without affecting others
6. **Development Friendly**: Can develop UI using mock data even when API is not ready

## Future Enhancements

- Add error retry mechanism
- Implement caching for API responses
- Add data transformation utilities
- Create custom hooks for data fetching
- Add real-time data updates
- Implement optimistic UI updates

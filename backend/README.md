# L'Oreal Analytics Backend

This backend provides APIs for the L'Oreal Analytics Dashboard, focusing on executive overview data and analytics.

## Project Structure

```
backend/
├── controllers/           # HTTP request/response handlers
│   └── executiveOverview.controller.js
├── services/             # Business logic layer
│   └── executiveOverview.service.js
├── db/                   # Database layer
│   ├── db.js            # PostgreSQL connection pool
│   └── queries/         # SQL queries organized by domain
│       ├── sentiment.queries.js
│       ├── timeline.queries.js
│       ├── metrics.queries.js
│       └── category.queries.js
├── routes/              # API route definitions
│   ├── scriptRoutes.js  # Existing upload routes
│   └── executiveOverview.routes.js
├── uploads/             # File upload storage
├── server.js           # Main application entry point
└── package.json
```

## Architecture Pattern

This backend follows a **layered architecture**:

1. **Routes Layer** (`/routes`): Defines API endpoints and maps them to controllers
2. **Controller Layer** (`/controllers`): Handles HTTP requests/responses, validation, and error handling
3. **Service Layer** (`/services`): Contains business logic and coordinates between controllers and data layer
4. **Data Layer** (`/db/queries`): SQL queries organized by domain/entity

## API Endpoints

### Executive Overview

- `GET/POST /api/executive-overview` - Main executive overview data
- `GET/POST /api/executive-overview/detailed` - Detailed analytics
- `GET/POST /api/executive-overview/insights` - AI-generated insights
- `GET /api/executive-overview/health` - Health check

### Existing Endpoints

- `POST /api/upload` - File upload functionality
- `GET /api/files` - List uploaded files

## Database Setup

1. **Install PostgreSQL** if not already installed
2. **Create database**:
   ```sql
   CREATE DATABASE loreal_analytics;
   ```
3. **Run schema setup**:
   ```bash
   psql -d loreal_analytics -f db/schema.sql
   ```

## Environment Setup

1. **Copy environment template**:

   ```bash
   cp .env.example .env
   ```

2. **Update environment variables**:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=loreal_analytics
   DB_USER=postgres
   DB_PASSWORD=your_password
   PORT=5000
   ```

## Installation & Running

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Install new dependencies** (if not already done):

   ```bash
   npm install pg dotenv
   npm install --save-dev nodemon
   ```

3. **Start development server**:

   ```bash
   npm run dev
   ```

4. **Start production server**:
   ```bash
   npm start
   ```

## Data Flow

1. **Frontend** sends request to `/api/executive-overview`
2. **Route handler** in `executiveOverview.routes.js` receives request
3. **Controller** in `executiveOverview.controller.js` processes request
4. **Service** in `executiveOverview.service.js` orchestrates business logic
5. **Query files** execute SQL queries against PostgreSQL
6. **Response** flows back through the layers to frontend

## Key Features

### Filtering Support

All endpoints support filtering by:

- Date range (`dateFilter`)
- Category (`categoryFilter`)
- Language (`languageFilter`)

### Performance Optimizations

- **Parallel queries** using `Promise.all()`
- **Database indexes** on frequently queried columns
- **Connection pooling** for efficient database connections

### Error Handling

- Comprehensive error logging
- Graceful fallbacks
- Structured error responses

## Adding New Endpoints

1. **Create queries** in `/db/queries/[domain].queries.js`
2. **Add business logic** in `/services/[feature].service.js`
3. **Create controller** in `/controllers/[feature].controller.js`
4. **Define routes** in `/routes/[feature].routes.js`
5. **Register routes** in `server.js`

## Testing the API

Use tools like Postman or curl:

```bash
# Get executive overview
curl -X GET "http://localhost:5000/api/executive-overview"

# Get executive overview with filters
curl -X POST "http://localhost:5000/api/executive-overview" \
  -H "Content-Type: application/json" \
  -d '{
    "categoryFilter": "skincare",
    "languageFilter": "english",
    "dateFilter": ["2024-01-01", "2024-12-31"]
  }'

# Health check
curl -X GET "http://localhost:5000/api/executive-overview/health"
```

## Future Enhancements

- [ ] Add caching layer (Redis)
- [ ] Implement rate limiting
- [ ] Add API documentation (Swagger)
- [ ] Add unit tests
- [ ] Add data export functionality
- [ ] Implement real-time updates (WebSockets)

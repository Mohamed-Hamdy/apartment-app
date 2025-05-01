# Apartment Listing API

A RESTful API for managing apartment listings built with Node.js, Express, TypeScript, and PostgreSQL.

## Project Structure

```
backend/
├── src/
│ ├── controllers/ # Request handlers
│ │ └── apartmentController.ts
│ ├── services/ # Business logic
│ │ └── apartmentService.ts
│ ├── models/ # Database models
│ │ └── Apartment.ts
│ ├── routes/ # API routes
│ │ └── apartmentRoutes.ts
│ ├── config/ # Configuration
│ │ └── database.ts
│ ├── utils/ # Utilities
│ │ └── responseWrapper.ts
│ └── app.ts # Express app setup
└── package.json
```

## Prerequisites

- Node.js (v16+)
- PostgreSQL
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   DATABASE_URL=postgresql://username:password@localhost:5432/apartment_db
   ```

4. Run database migrations:
   ```bash
   npm run migrate
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```   

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### List Apartments
```http
GET /apartments
```

Query Parameters:
- `search` (string, optional): Search across unit name, number, project, and description
- `project` (string, optional): Filter by project name
- `unitNumber` (string, optional): Filter by unit number
- `minPrice` (number, optional): Minimum price filter
- `maxPrice` (number, optional): Maximum price filter

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "unitName": "Luxury Suite",
      "unitNumber": "A101",
      "project": "Downtown Heights",
      "description": "Spacious luxury apartment",
      "price": 250000,
      "imageUrl": "https://example.com/image.jpg",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ],
  "message": "Apartments fetched"
}
```

#### Get Single Apartment
```http
GET /apartments/{id}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "unitName": "Luxury Suite",
    "unitNumber": "A101",
    "project": "Downtown Heights",
    "description": "Spacious luxury apartment",
    "price": 250000,
    "imageUrl": "https://example.com/image.jpg",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  },
  "message": "Apartment found"
}
```

#### Add New Apartment
```http
POST /apartments
```

Request Body:
```json
{
  "unitName": "Luxury Suite",
  "unitNumber": "A101",
  "project": "Downtown Heights",
  "description": "Spacious luxury apartment",
  "price": 250000,
  "imageUrl": "https://example.com/image.jpg"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "unitName": "Luxury Suite",
    "unitNumber": "A101",
    "project": "Downtown Heights",
    "description": "Spacious luxury apartment",
    "price": 250000,
    "imageUrl": "https://example.com/image.jpg",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  },
  "message": "Apartment created"
}
```
#### Error Handling:
The API uses standard HTTP status codes and returns consistent error responses:
```json
{
  "success": false,
  "message": "Error message"
}
```
Status Codes:
- 200: OK
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

#### Database Schema
Apartment Model
```typescript
{
  id: number;           // Primary Key, Auto-increment
  unitName: string;     // Required
  unitNumber: string;   // Required
  project: string;      // Required
  description: string;  // Optional
  price: number;        // Required
  imageUrl: string;     // Required
  createdAt: Date;      // Auto-generated
  updatedAt: Date;      // Auto-generated
}
```
#### Development
Available Scripts
- npm run dev: Start development server (Local Server With Mysql Database)
- npm run prod: Start production server (Docker Container With Postgres Database)
- npm run build: Build the project
- npm run migrate: Run database migrations
- npm test: Run tests
- npm run lint: Run linting

Environment Variables
- PORT: Port number for the server
- DATABASE_URL: Database connection string
- JWT_SECRET: JWT secret key
- NODE_ENV: Environment mode (development, production)

## License

This README includes:
1. Project overview and structure
2. Installation instructions
3. Detailed API documentation with examples
4. Error handling information
5. Database schema
6. Development setup and scripts
7. Testing instructions
8. Contributing guidelines

Would you like me to:
1. Add more API examples
2. Add deployment instructions
3. Add security considerations

 
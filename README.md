# Apartment Listing Application

A full-stack application for managing apartment listings, built with Next.js frontend and Node.js/Express/TypeScript backend.

## Project Structure

```
apartment-app/
├── backend/              # Backend API server
│   ├── src/
│   │   ├── controllers/ # Request handlers
│   │   ├── services/    # Business logic
│   │   ├── models/      # Database models
│   │   ├── routes/      # API routes
│   │   └── config/      # Configuration files
│   └── package.json
└── frontend/            # Next.js frontend
    ├── src/
    │   ├── app/        # Next.js app directory
    │   ├── components/ # React components
    │   └── services/   # API services
    └── package.json
```

## Technology Stack

### Backend
- Node.js
- Express.js
- TypeScript
- Sequelize (ORM)
- PostgreSQL

### Frontend
- Next.js 13+
- React
- TypeScript
- Tailwind CSS

## Getting Started

### Prerequisites
- Node.js (v16+)
- PostgreSQL
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
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

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend/apartment-listing
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
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

Example:
```http
GET /apartments?search=luxury&minPrice=100000&maxPrice=500000
```

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

## Features

1. **Apartment Management**
   - List all apartments
   - View apartment details
   - Add new apartments
   - Search and filter apartments

2. **Search Functionality**
   - Full-text search across multiple fields
   - Filter by project
   - Filter by price range
   - Case-insensitive search

3. **User Interface**
   - Responsive design
   - Modern UI with Tailwind CSS
   - Loading states
   - Error handling
   - Form validation

## Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

Error Response Format:
```json
{
  "success": false,
  "message": "Error message here",
  "status": 400
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

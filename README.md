# Library API

A RESTful API for managing a library of books built with Express.js.

## Features

- CRUD operations for books
- Input validation
- Request logging
- JSON response format
- Error handling

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd library-api
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### GET /
Welcome message and API documentation

### GET /books
Returns a list of all books in the library.

Response:
```json
[
    {
        "id": 1,
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "year": 1925
    }
]
```

### GET /books/:id
Returns details of a specific book.

Response:
```json
{
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "year": 1925
}
```

### POST /books
Adds a new book to the library.

Request body:
```json
{
    "title": "Node.js Essentials",
    "author": "John Doe",
    "year": 2021
}
```

Response (201 Created):
```json
{
    "id": 4,
    "title": "Node.js Essentials",
    "author": "John Doe",
    "year": 2021
}
```

### PUT /books/:id
Updates details of a specific book.

Request body:
```json
{
    "title": "Updated Title",
    "author": "Updated Author",
    "year": 2022
}
```

Response:
```json
{
    "id": 1,
    "title": "Updated Title",
    "author": "Updated Author",
    "year": 2022
}
```

### DELETE /books/:id
Deletes a book from the library.

Response: 204 No Content

## Error Responses

### 400 Bad Request
```json
{
    "error": "All fields (title, author, year) are required"
}
```

### 404 Not Found
```json
{
    "error": "Book not found"
}
```

## Project Structure

```
library-api/
├── index.js          # Main application file
├── package.json      # Project dependencies and scripts
└── README.md         # Project documentation
```
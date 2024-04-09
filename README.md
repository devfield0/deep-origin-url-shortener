# Short URL Generator Backend

This project is the backend for a simple URL shortening service. It handles requests from the frontend to generate and store shortened URLs.

## Requirements

- Build a RESTful API with endpoints for generating and accessing shortened URLs
- Save a record of the shortened URL to a database
- Ensure the slug of the URL is unique
- When the shortened URL is accessed, redirect to the stored URL
- If an invalid slug is accessed, display a 404 Not Found page

## Tech Stack

- Node.js with TypeScript
- Express.js
- MongoDB
- Docker

## Installation

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd UrlShortner`
3. Install dependencies: `npm install`

## Environment Variables

You can set the following environment variables:

- `DB_URL`: The URL of the MongoDB database.
- `ORIGION_URL`: The URL of the frontend application.

5. Start the development server: `npm start`

## Usage

1. Make requests to the provided API endpoints for generating and accessing shortened URLs.
2. Use the provided database to store and retrieve shortened URLs.

## Docker

You can also run the backend using Docker. Follow these steps:

1. Build the Docker image: `docker-compose up --build .`
2. Run the Docker container: `docker-compose up`

After running these commands, the backend will be available at `http://localhost:5000` in your browser.

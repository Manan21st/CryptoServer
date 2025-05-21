# Crypto Stats Server

A real-time cryptocurrency statistics server that fetches and processes crypto data using a microservices architecture.

## Overview

This project consists of two main components:

- **API Server**: Handles HTTP requests and provides cryptocurrency statistics endpoints
- **Worker Server**: Processes background tasks and updates crypto data

The system uses NATS for message queuing and MongoDB for data persistence.

## Architecture

```
┌─────────────┐     ┌─────────────┐
│  API Server │◄────┤    NATS     │
└─────────────┘     └─────────────┘
       ▲                   ▲
       │                   │
       ▼                   ▼
┌─────────────┐     ┌─────────────┐
│   MongoDB   │     │   Worker    │
└─────────────┘     │   Server    │
                    └─────────────┘
```

## Setup

### Prerequisites

- Docker and Docker Compose
- Node.js (if running locally)
- MongoDB connection string

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
MONGO_URI=your_mongodb_connection_string
```

### Running with Docker

1. Clone the repository
2. Set up environment variables
3. Run the following command:

```bash
docker-compose up --build
```

### Running Locally

1. Install dependencies for both servers:

```bash
cd api-server && npm install
cd ../worker-server && npm install
```

2. Start the NATS server:

```bash
docker run -p 4222:4222 nats
```

3. Start the API server:

```bash
cd api-server && npm start
```

4. Start the worker server:

```bash
cd worker-server && npm start
```

## API Endpoints

### Health Check

- `GET /health`
  - Returns server health status
  - Response: `{ status: 'OK' }`

### Statistics

- `GET /stats?coin=bitcoin`
  - Returns current cryptocurrency statistics
  - Query Parameters:
    - `coin`: The cryptocurrency to calculate deviation for (bitcoin, ethereum, or matic-network)
  - Response: Array of crypto stats objects

- `GET /deviation?coin=bitcoin`
  - Returns price deviation statistics
  - Query Parameters:
    - `coin`: The cryptocurrency to calculate deviation for (bitcoin, ethereum, or matic-network)
  - Response: Deviation statistics object

## System Design

- The Worker Server runs a scheduled job every 15 minutes to trigger data updates
- Communication between servers happens exclusively through NATS messaging
- MongoDB stores historical cryptocurrency data for statistics calculation


## Created with ❤️ by Manan

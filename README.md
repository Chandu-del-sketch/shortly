# TinyLink - A URL Shortener

This is a full-stack URL Shortener web application built with Next.js, TypeScript, Tailwind CSS, and Prisma.

## Features

-   Create short links from long URLs.
-   Optional custom short codes.
-   Redirects from short links to the original URL.
-   Tracks click count and last clicked time.
-   Dashboard to view and manage links.
-   Statistics page for each link.
-   Health check endpoint.

## Getting Started

### Prerequisites

-   Node.js
-   npm
-   PostgreSQL

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up your environment variables by creating a `.env` file from the `.env.example`:
    ```bash
    cp .env.example .env
    ```
    Update the `.env` file with your `DATABASE_URL` and `BASE_URL`.

4.  Apply database migrations:
    ```bash
    npx prisma migrate dev
    ```

5.  Run the development server:
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Reference

### Create a new link

```http
  POST /api/links
```

| Parameter   | Type     | Description                       |
| :---------- | :------- | :-------------------------------- |
| `longUrl`   | `string` | **Required**. The URL to shorten. |
| `shortCode` | `string` | Optional. A custom short code.    |

**Example:**

```bash
curl -X POST http://localhost:3000/api/links \
-H "Content-Type: application/json" \
-d '{
  "longUrl": "https://example.com",
  "shortCode": "custom"
}'
```

### List all links

```http
  GET /api/links
```

**Example:**

```bash
curl http://localhost:3000/api/links
```

### Get link statistics

```http
  GET /api/links/:code
```

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `code`    | `string` | **Required**. The short code. |

**Example:**

```bash
curl http://localhost:3000/api/links/custom
```

### Delete a link

```http
  DELETE /api/links/:code
```

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `code`    | `string` | **Required**. The short code. |

**Example:**

```bash
curl -X DELETE http://localhost:3000/api/links/custom
```

## Deployment

This application is ready to be deployed on Vercel with a PostgreSQL database provider like Neon.

1.  Push your code to a Git repository.
2.  Import your project into Vercel.
3.  Set up a Neon database and get the `DATABASE_URL`.
4.  Add the `DATABASE_URL` and `BASE_URL` as environment variables in your Vercel project settings.
5.  Deploy!

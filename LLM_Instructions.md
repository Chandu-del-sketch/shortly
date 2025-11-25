# LLM Build Instructions: URL Shortener Web App (TinyLink Spec)

This file is written **specifically as instructions for an LLM** that
will generate a complete URL shortener web application.\
Follow these instructions exactly.\
Do not add or remove features unless explicitly stated.

------------------------------------------------------------------------

# PURPOSE

Build a production-ready, full-stack URL Shortener Web Application
similar to **bit.ly**, following all required features, routes, API
contracts, and UX rules defined below.

The implementation MUST strictly match these specifications so the app
passes automated tests.

You may generate: - Next.js (preferred) or Node.js + Express backend -
Tailwind CSS or minimal custom CSS - Postgres database (Neon
recommended)

------------------------------------------------------------------------

# CORE REQUIREMENTS

## 1. Create Short Links

Implement functionality to: - Accept a **long URL** - Accept an
**optional custom short code** - Validate the URL - Ensure custom codes
are **globally unique** - Generate redirect link:\
`https://<your-domain>/<shortcode>` - Store: - `shortcode` -
`target URL` - `totalClicks` (default 0) - `lastClicked` (nullable
timestamp)

Return an error if code already exists.\
Conflict status: **409**.

------------------------------------------------------------------------

## 2. Redirect

When visiting:

    /<code>

Behavior: - If code exists → **HTTP 302 redirect** to original URL\
- Increment `totalClicks` - Update `lastClicked` - If code does NOT
exist → **HTTP 404**

------------------------------------------------------------------------

## 3. Delete a Link

-   Provide an option to delete links.
-   After deletion: `/<code>` must return **404** and never redirect.

------------------------------------------------------------------------

# UI / PAGES

## Dashboard (`/`)

Contains: - Table of all links - Columns: - Short code - Target URL -
Total clicks - Last clicked - Actions: - Add new link (long URL +
optional custom code) - Delete existing link - Optional: - Search /
filter by code or URL

Behavior & Styling: - Clean layout hierarchy - Proper spacing & readable
typography - Inline form validation - Disabled submit buttons while
loading - Success & error states - Responsive layout - Truncate long
URLs with ellipsis - Copy button for links

------------------------------------------------------------------------

## Stats Page (`/code/:code`)

Display: - Original URL - Short link - Total clicks - Last clicked
time - Created time - Any metadata available

------------------------------------------------------------------------

## Health Check Page (`/healthz`)

Return:

``` json
{
  "ok": true,
  "version": "1.0"
}
```

Status must be **200**.

------------------------------------------------------------------------

# API SPECIFICATION (STRICT)

The following API endpoints MUST exist exactly as listed:

  Method   Path                 Purpose
  -------- -------------------- --------------------
  POST     `/api/links`         Create a link
  GET      `/api/links`         List all links
  GET      `/api/links/:code`   Stats for one link
  DELETE   `/api/links/:code`   Delete link

### Rules:

-   Duplicate codes → return **409 Conflict**

-   Codes must match regex:

        [A-Za-z0-9]{6,8}

------------------------------------------------------------------------

# REDIRECT ROUTES (STRICT)

  Path            Behavior
  --------------- -----------------
  `/`             Dashboard
  `/code/:code`   Stats page
  `/:code`        Redirect or 404
  `/healthz`      Health endpoint

------------------------------------------------------------------------

# HOSTING REQUIREMENTS

The generated project must support deployment on:

-   **Vercel + Neon Postgres** (for Next.js) or
-   **Render / Railway + Postgres** (for Express)

You MUST generate a `.env.example` with:

    DATABASE_URL=
    BASE_URL=

------------------------------------------------------------------------

# AUTOGRADING REQUIREMENTS

The app must pass these tests:

1.  `/healthz` → returns status 200\
2.  POST link creation works\
3.  Duplicate codes return 409\
4.  Redirect increments click count\
5.  Deleted code returns 404\
6.  UI meets expectations\
7.  URL paths match EXACTLY

------------------------------------------------------------------------

# DEVELOPMENT STANDARDS FOR THE LLM

You MUST: - Write modular, clean code - Include comments explaining
major steps - Use proper file structure - Generate SQL schema or Prisma
schema\
- Provide seed/initialization scripts if needed - Make the UI clean and
responsive - Use TypeScript if generating Next.js

Do NOT: - Change route names - Change response JSON structure - Add
unnecessary features - Use proprietary or paid technology

------------------------------------------------------------------------

# OUTPUT FORMAT FOR THE LLM

When building the app, output should include:

1.  **Project folder structure**
2.  **Backend code**
3.  **Frontend UI code**
4.  **Database schema**
5.  **.env.example**
6.  **Deployment instructions**
7.  **API examples**
8.  **README.md ready for GitHub**

------------------------------------------------------------------------

# END OF SPEC

This file is complete and ready to be used as instructions for an LLM to
generate the full application.

# Ashish Soni AI Portfolio

Production-ready AI engineer portfolio built with Next.js App Router, TypeScript, TailwindCSS, Framer Motion, Three.js, React Flow, Recharts, Axios, and the Google Gemini API.

## Features

- Premium dark AI-lab visual design with neon accents
- GPU-friendly animated neural particle background using React Three Fiber
- Scroll-animated sections for hero, about, skills, architecture, projects, experience, visualizations, GitHub, chatbot, and contact
- Interactive RAG architecture simulator built with React Flow
- Animated LLM pipeline visualization
- Forecasting charts built with Recharts
- Live GitHub project explorer using the GitHub REST API
- Gemini-powered chatbot demo with streaming responses through `/api/chat`
- Floating recruiter pre-screening agent with memory and scheduling flow through `/api/recruiter-agent`
- Optional Google Workspace integration for Gmail handoff, Google Calendar booking, and Drive-based JD upload
- Vercel-friendly API routes and environment variable setup

## Stack

- Next.js App Router
- TypeScript
- TailwindCSS
- Framer Motion
- Three.js + React Three Fiber
- React Flow
- Recharts
- Axios
- Google Gemini API

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Copy the environment template:

```bash
cp .env.local.example .env.local
```

3. Add your keys:

```env
GEMINI_API_KEY=your_gemini_api_key_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REFRESH_TOKEN=your_google_refresh_token
GOOGLE_CALENDAR_ID=primary
GOOGLE_DRIVE_FOLDER_ID=your_drive_folder_id
ASHISH_NOTIFICATION_EMAIL=your_notification_email
GITHUB_TOKEN=your_github_token_here
```

4. Run the app:

```bash
npm run dev
```

5. Open `http://localhost:3000`

## Scripts

- `npm run dev` starts the development server
- `npm run build` creates the production build
- `npm run start` serves the production build
- `npm run lint` runs ESLint
- `npm run typecheck` runs TypeScript checks

## Deployment on Vercel

1. Push the project to GitHub
2. Import the repository into Vercel
3. Add `GEMINI_API_KEY` and optionally `GITHUB_TOKEN` in Project Settings
4. Deploy

The app is App Router based and fully compatible with Vercel deployment.

## API Endpoints

### `POST /api/chat`

- Streams Gemini responses as plain text
- Falls back gracefully when `GEMINI_API_KEY` is missing

### `POST /api/recruiter-agent`

- Streams recruiter-ready screening responses as plain text
- Uses Gemini with resume-grounded prompting, salary/location/notice-period handling, and mock scheduling slots
- Falls back gracefully when `GEMINI_API_KEY` is missing

### `GET /api/recruiter-agent/availability`

- Returns recruiter-visible interview slots
- Uses Google Calendar when OAuth credentials are configured
- Falls back to mock availability otherwise

### `POST /api/recruiter-agent/book`

- Books a selected slot
- Creates a Google Calendar event when configured
- Sends a recruiter-summary notification email when Gmail is configured

### `POST /api/recruiter-agent/handoff`

- Accepts recruiter details and an optional JD upload
- Uploads the JD to Google Drive when configured
- Sends Ashish a Gmail summary with the gathered recruiter details

### `GET /api/github?username=ashish-soni`

- Fetches repositories from the GitHub REST API
- Uses `GITHUB_TOKEN` when available
- Returns curated fallback repositories if the live API is unavailable

## Notes

- The portfolio data lives in [`lib/portfolio.ts`](./lib/portfolio.ts)
- Heavy client-only experiences are dynamically imported for better performance
- Fonts use local fallbacks so the app builds in restricted environments without external font fetches

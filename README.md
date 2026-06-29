# ResumeIQ AI

ResumeIQ AI is a production-ready MERN SaaS starter for AI resume analysis and career coaching. It includes email auth, Google OAuth, JWT protected routes, PDF resume ingestion, Gemini-powered analysis, dashboard history, profile management, and a polished Vite React interface.

## Stack

- React, Vite, Tailwind CSS, Framer Motion
- Node.js, Express.js, MongoDB Atlas, Mongoose
- JWT auth, Google OAuth verification
- Gemini API, Multer, pdf-parse, Axios

## Quick Start

1. Copy env files:
   ```bash
   cp server/.env.example server/.env
   cp client/.env.example client/.env
   ```
2. Fill in MongoDB Atlas, JWT, Google OAuth, and Gemini keys.
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Run both apps:
   ```bash
   pnpm dev
   ```

Client: `http://localhost:5173`

Server: `http://localhost:8080`

## Production Notes

- Set `CLIENT_URL`, `MONGODB_URI`, `JWT_SECRET`, `GOOGLE_CLIENT_ID`, and `GEMINI_API_KEY`.
- Serve the Vite build with your preferred static host and deploy the API to a Node host.
- Keep uploads ephemeral in production or swap Multer disk storage for object storage.

# Rywoox.com 🚀

Personal website with a futuristic AI chat interface powered by Gemini 3.1 Flash.

![Rywoox](https://img.shields.io/badge/Rywoox-Fullstack%20Developer-blue)

## Features

- 💬 **AI Chat** - Ask questions about Charles Binard (Rywoox) and his projects
- 🎨 **Futuristic UI** - Dark theme with neon accents and smooth animations
- 📂 **GitHub Integration** - Automatically fetches public repositories
- ⚡ **Fast** - Built with React 19 + Vite + Bun
- 📱 **Responsive** - Works on all devices

## Tech Stack

- React 19
- TypeScript
- Vite
- TailwindCSS v4
- Framer Motion
- Gemini 3.1 Flash API
- Vercel AI SDK

## Setup

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env` file with your Gemini API key:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

Get your Gemini API key at: https://aistudio.google.com/app/apikey

4. Run the development server:

```bash
bun dev
```

5. Build for production:

```bash
bun build
```

## Project Structure

```
src/
├── components/
│   ├── About.tsx       # About section
│   ├── Chat.tsx       # AI chat interface
│   ├── Hero.tsx       # Hero section
│   ├── Navigation.tsx # Navigation bar
│   ├── Projects.tsx   # GitHub repos display
│   └── Skills.tsx     # Tech stack display
├── App.tsx            # Main app component
├── main.tsx           # Entry point
└── index.css          # Global styles + Tailwind
```

## Deploy

This project is optimized for deployment on Vercel:

```bash
bun vercel
```

Or set the `VITE_GEMINI_API_KEY` environment variable in your Vercel project settings.

## Deploy with Docker

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Quick Start

1. Copy the environment template:

```bash
cp .env.production.example .env
```

2. Edit `.env` and set your Gemini API key:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

3. Build and start the container:

```bash
docker compose up -d --build
```

4. The site will be available at `http://localhost:3000`

### Commands

```bash
# Start (background)
docker compose up -d --build

# Stop
docker compose down

# Rebuild after code changes
docker compose up -d --build

# View logs
docker compose logs -f
```

### Production Notes

- The container runs nginx serving the built static assets.
- React Router is configured with SPA fallback (`try_files $uri $uri/ /index.html`) so client-side routing works correctly.
- The container restarts automatically (`unless-stopped`) on boot.
- For HTTPS, place behind a reverse proxy (Traefik, Caddy, nginx-proxy) with LetsEncrypt.

## License

MIT

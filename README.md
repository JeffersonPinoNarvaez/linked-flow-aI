# linked flow AI

**Turn raw ideas into polished LinkedIn posts.**

A modern web tool that transforms your short text into LinkedIn-ready content using AI. Supports both Spanish and English with multiple tone options.

## Features

- 🌐 **Bilingual**: Full support for Spanish and English
- 🎨 **Multiple Tones**: Professional, Inspiring, Friendly, Executive, Storytelling
- 🤖 **Multi-Provider AI**: Supports both OpenAI and Groq
- ⚡ **Fast & Modern**: Built with Next.js 15 and React 19
- 🔒 **Rate Limited**: Built-in rate limiting with Upstash Redis
- 📱 **Responsive**: Works on all devices
- 🎯 **Type Safe**: Full TypeScript support

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Forms**: React Hook Form + Zod
- **AI Providers**: OpenAI GPT-4o-mini / Groq Llama 3.3 70B
- **Rate Limiting**: Upstash Redis
- **Deployment**: Vercel Ready

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn
- At least one AI provider API key (OpenAI or Groq)
- Upstash Redis account (free tier available)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd linked-flow-aI
```

2. Install dependencies:
```bash
npm install
```

3. Create your environment file:
```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:

```bash
# AI Provider Configuration
# Set AI_PROVIDER to "openai" or "groq" to choose your preferred provider
# If not set, the system will automatically use Groq if available, then OpenAI
AI_PROVIDER=groq

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini

# Groq Configuration
# Get your free API key at: https://console.groq.com/keys
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile

# Redis Configuration (Upstash)
UPSTASH_REDIS_REST_URL=your_upstash_redis_url_here
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token_here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3002](http://localhost:3002) in your browser.

## Getting API Keys

### OpenAI (Paid)
1. Go to [platform.openai.com](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Add credits to your account

### Groq (Free)
1. Go to [console.groq.com](https://console.groq.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Free tier includes generous limits

### Upstash Redis (Free)
1. Go to [upstash.com](https://upstash.com/)
2. Create a free account
3. Create a new Redis database
4. Copy the REST URL and Token

## AI Provider Selection

The app uses an intelligent provider selection system:

1. **Manual Selection**: Set `AI_PROVIDER=openai` or `AI_PROVIDER=groq` to force a specific provider
2. **Automatic Fallback**: If not set, the app will:
   - Try Groq first (if API key is configured)
   - Fall back to OpenAI (if Groq is not available)
   - Show error if neither is configured

This ensures the app always works with at least one provider configured.

## Available Scripts

```bash
# Development server (port 3002)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Type checking
npm run typecheck

# Linting
npm run lint
```

## Project Structure

```
├── app/
│   ├── api/
│   │   └── rewrite/
│   │       └── route.ts          # API endpoint
│   ├── components/
│   │   ├── postcraft-app.tsx     # Main app component
│   │   └── legal-modal.tsx       # Legal terms modal
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── lib/
│   ├── openai.ts                 # AI provider logic (multi-provider)
│   ├── rate-limit.ts             # Rate limiting with Redis
│   ├── validations.ts            # Zod schemas
│   ├── constants.ts              # App constants
│   ├── i18n.ts                   # Internationalization
│   └── utils.ts                  # Utility functions
├── ui/                           # shadcn/ui components
└── .env.local                    # Environment variables
```

## Rate Limiting

The app includes built-in rate limiting to prevent abuse:

- **Cooldown**: 30 seconds between requests per IP
- **Daily Limit**: 10 rewrites per day per IP
- **Provider**: Upstash Redis

## Legal & Privacy

The app includes:
- Terms and Conditions
- Privacy Policy
- Responsible AI Use
- Liability Disclaimer
- Contact Information

All accessible via footer links with modal dialogs.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

The app is optimized for Vercel deployment with:
- Edge-ready API routes
- Automatic caching
- Environment variable support
- Zero configuration needed

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.

## Author

Jefferson Pino Narváez

## Support

For issues, questions, or suggestions, please open an issue in the GitHub repository.

---

**linked flow AI** - Turn raw ideas into polished LinkedIn posts.
# linked-flow-aI

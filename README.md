# IdeaSpark AI - Base Mini App

Ignite Your Next Big Idea with AI-Powered Curation & Validation.

## Overview

IdeaSpark AI is a dynamic Base Mini App that generates and curates startup ideas tailored to individual user profiles, leveraging AI, market analysis, and community validation.

## Features

- **Personalized Idea Generation**: AI-driven generation of startup ideas based on user skills, interests, and capital constraints
- **Market Viability Scoring**: Real-time assessment of idea potential using market data
- **Lean Business Blueprints**: Automatic generation of business model canvas and go-to-market strategies
- **Community Validation**: Platform for community feedback, voting, and collaboration

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (via MiniKit)
- **AI**: OpenAI/OpenRouter integration
- **Styling**: Tailwind CSS with custom design system
- **TypeScript**: Full type safety throughout

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ideaspark-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your API keys:
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key
   - `OPENAI_API_KEY`: Your OpenAI API key

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── providers.tsx      # MiniKit provider setup
│   ├── loading.tsx        # Loading UI
│   └── error.tsx          # Error boundary
├── components/            # React components
│   ├── AppShell.tsx       # Main app layout
│   ├── HeroSection.tsx    # Landing section
│   ├── IdeaGenerator.tsx  # Idea generation flow
│   ├── ProfileForm.tsx    # User profile form
│   ├── IdeaCard.tsx       # Idea display component
│   ├── VoteButton.tsx     # Voting component
│   └── CommunitySection.tsx # Community features
├── lib/                   # Utilities and types
│   ├── types.ts           # TypeScript definitions
│   ├── utils.ts           # Utility functions
│   ├── constants.ts       # App constants
│   └── api.ts             # API integration
└── public/                # Static assets
```

## Key Components

### Data Models

- **User**: Profile with skills, interests, and capital range
- **GeneratedIdea**: AI-generated startup ideas with market analysis
- **CommunityVote**: User voting on ideas
- **Comment**: Community feedback on ideas

### Core Features

1. **Profile Building**: Users input skills, interests, and available capital
2. **AI Generation**: OpenAI generates personalized startup ideas
3. **Market Analysis**: Each idea includes viability scoring and trend analysis
4. **Business Planning**: Automatic business model canvas generation
5. **Community Features**: Voting, commenting, and idea sharing

## Design System

The app uses a custom design system with:
- **Colors**: Blue gradient theme with accent colors
- **Typography**: Clean, readable font hierarchy
- **Components**: Glass morphism cards with consistent spacing
- **Animations**: Smooth transitions and micro-interactions

## API Integration

### OpenAI Integration
- Uses GPT models for idea generation
- Structured prompts for consistent output
- Fallback to mock data if API unavailable

### Base Integration
- MiniKit provider for blockchain features
- OnchainKit components for wallet integration
- Ready for future tokenization features

## Deployment

The app is optimized for deployment on Vercel or similar platforms:

```bash
npm run build
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions, please open an issue on GitHub or contact the development team.

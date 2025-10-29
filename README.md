# GS1 B2B Sustainability Marketplace

A modern B2B marketplace platform focused on sustainable sourcing, connecting buyers with verified suppliers based on Cost, Sustainability Index, and Reputation. Features live GS1 Digital Link integration with batch-level sustainability data.

## 🎯 Navigation Guide

The application has two main entry points:

1. **Main Marketplace** (http://localhost:5173/) - The React-powered B2B marketplace with AI search
2. **Demo Hub** (http://localhost:5173/demo-hub.html) - Overview of all features and demos

### Quick Navigation
- Click **"🎯 All Features"** in the header to access the Demo Hub
- From the Demo Hub, click any feature card to explore different capabilities
- Product Passport demos are accessible by clicking any product in the marketplace

## Features

### Core Functionality
- **Verified Supplier Directory**: Browse GS1-verified suppliers with comprehensive profiles
- **Multi-Criteria Search**: Filter suppliers by location, sustainability score, rating, and certifications
- **Product Passport**: View detailed GS1 Digital Link product passports with supply chain traceability
- **Real-time Metrics**: Compare suppliers based on cost, sustainability, reputation, and carbon footprint

### AI-Powered Features
- **Smart Search Ranking**: AI analyzes search intent to intelligently rank suppliers
  - Detects user focus (cost, sustainability, reputation, or proximity)
  - Automatically adjusts ranking weights based on query keywords
  - Example: "affordable eco suppliers" prioritizes cost while maintaining sustainability threshold

- **Contextual Insights**: AI-generated insights about search results
  - Provides average metrics across filtered suppliers
  - Offers recommendations based on search intent
  - Highlights exceptional options (e.g., "Great value options available!")

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Custom CSS with responsive design
- **AI Logic**: Custom search intent analysis and ranking algorithms

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Main navigation header
│   ├── PlatformOverview.tsx  # Landing section
│   ├── SearchFilters.tsx     # Filter controls
│   ├── SuppliersGrid.tsx     # Supplier list container
│   ├── SupplierCard.tsx      # Individual supplier card
│   └── ProductPassportModal.tsx  # Digital passport modal
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   ├── mockData.ts    # Sample supplier data
│   └── aiSearch.ts    # AI search and ranking logic
├── styles/             # CSS stylesheets
│   ├── index.css
│   └── App.css
├── App.tsx            # Main app component
└── main.tsx           # App entry point
```

## How the AI Features Work

### Search Intent Analysis
The AI analyzes search queries to understand user intent by detecting key phrases:

- **Cost-focused**: "cheap", "affordable", "budget", "price"
- **Sustainability-focused**: "sustainable", "eco", "green", "organic", "carbon"
- **Reputation-focused**: "trusted", "reliable", "quality", "best", "premium"
- **Proximity-focused**: "local", "nearby", "close", "regional"

Based on detected intent, the system adjusts ranking weights. For example:
- Sustainability query → 55% sustainability weight, 20% reputation, 15% cost, 10% proximity
- Cost query → 50% cost weight, 20% reputation, 15% sustainability, 15% proximity

### Smart Ranking
When "AI Best Match" sort is selected, suppliers are scored using:
```
score = (normalized_cost × cost_weight) +
        (normalized_sustainability × sustainability_weight) +
        (normalized_reputation × reputation_weight) +
        (normalized_proximity × proximity_weight)
```

All metrics are normalized to 0-1 scale for fair comparison.

### Contextual Insights
The AI generates human-readable insights about search results:
- Calculates average metrics across filtered suppliers
- Provides recommendations based on the query focus
- Highlights exceptional options with emojis and actionable advice

## Key Components

### Supplier Cards
Each supplier card displays:
- Company name and location
- GS1 verification badge
- Key metrics (cost, sustainability score, reputation, CO2/unit)
- Featured products with sustainability scores
- Action buttons (Contact, Request Quote, Scan Product)

### Product Passport Modal
Digital product passports include:
- Product information (GTIN, batch number, dates, origin)
- Sustainability metrics (carbon footprint, water usage, recycled content)
- Certifications with verification status
- Complete supply chain traceability with verified steps

### Search & Filters
- Real-time search across supplier names, locations, and products
- Filters for location, sustainability score, rating, and certifications
- AI-powered sorting options

## Hackathon Notes

This application was created for a hackathon with focus on:
1. GS1 standards integration (Digital Link, GTIN)
2. Sustainability in B2B commerce
3. AI-enhanced user experience
4. Supply chain transparency

## Future Enhancements

- Integration with actual GS1 Digital Link API
- Real-time sustainability data updates
- Advanced ML models for better supplier matching
- Chat-based interface for natural language queries
- Mobile app with QR code scanning
- Blockchain-based supply chain verification
- Carbon offset marketplace integration

## License

MIT License - Feel free to use for your hackathon project!

## Contributing

This is a hackathon project, but contributions and suggestions are welcome!

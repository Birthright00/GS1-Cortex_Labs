# 🚀 Quick Start Guide

## Getting Your App Running

### 1. Start the Development Server

```bash
npm run dev
```

The server will start at **http://localhost:5173**

### 2. Explore the Features

#### Main Marketplace (Landing Page)
- **URL**: http://localhost:5173/
- **What you'll see**:
  - AI-powered supplier marketplace
  - Smart search with intent detection
  - Interactive supplier cards
  - Product passport modals

#### Demo Hub (All Features Overview)
- **URL**: http://localhost:5173/demo-hub.html
- **How to access**: Click "🎯 All Features" in the header
- **What you'll see**:
  - Overview cards for all platform features
  - Links to different demo pages
  - Feature descriptions and highlights

### 3. Try These Features

#### AI-Powered Smart Search
1. Go to the main marketplace
2. Try searching for:
   - `"sustainable"` - AI prioritizes eco-friendly suppliers
   - `"affordable"` - AI prioritizes cost-effective options
   - `"local"` - AI prioritizes nearby suppliers
   - `"organic cotton"` - AI finds specific products

Watch the **AI Insight** box appear below the search filters!

#### Product Passport
1. Find any supplier card
2. Click on a product (e.g., "Organic Cotton Textiles")
3. The Product Passport modal opens showing:
   - Complete supply chain journey
   - Sustainability metrics
   - Certifications
   - Real-time batch data

#### Filters & Sorting
- Use the filter dropdowns to narrow results
- Try the "🤖 AI Best Match" sort option
- See how results change based on your criteria

### 4. For Your Hackathon Demo

**Best Demo Flow:**
1. Start on the main marketplace
2. Show the AI search feature with different queries
3. Demonstrate filters and sorting
4. Open a product passport to show GS1 Digital Link
5. Navigate to Demo Hub to show all planned features

**Key Talking Points:**
- ✅ AI-powered search intent detection
- ✅ Real-time sustainability scoring
- ✅ GS1 Digital Link integration
- ✅ Complete supply chain transparency
- ✅ Multi-factor supplier matching

### 5. File Structure for Development

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation with Demo Hub link
│   ├── SupplierCard.tsx
│   ├── ProductPassportModal.tsx
│   └── ...
├── utils/
│   ├── aiSearch.ts     # AI search logic
│   └── mockData.ts     # Sample suppliers
└── App.tsx             # Main application

public/
└── demo-hub.html       # Feature overview page
```

### 6. What's Working vs. Coming Soon

**✅ Fully Working:**
- Main marketplace with suppliers
- AI-powered search and ranking
- Filters and sorting
- Product passport modal
- Demo hub navigation

**🔜 Planned for Full Implementation:**
- Predictive sustainability analytics
- AI fraud detection dashboard
- Batch-specific dynamic scoring
- Real backend API integration

### 7. Troubleshooting

**Port already in use?**
```bash
# Kill the process on port 5173 and restart
npm run dev
```

**Not seeing updates?**
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Clear browser cache

**Demo Hub not loading?**
- Make sure you're accessing: http://localhost:5173/demo-hub.html
- Check that the file exists in the `public/` directory

---

## 🎉 You're All Set!

Your GS1 B2B Sustainability Marketplace is ready for the hackathon demo!

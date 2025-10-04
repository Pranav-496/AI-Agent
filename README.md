# Competitive Intelligence Tracker 🚀

A fully-functional, hackathon-ready web-based dashboard for tracking competitor activities, insights, and market intelligence.

## 📋 Table of Contents
- [Features](#features)
- [File Structure](#file-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Demo URLs](#demo-urls)
- [Technologies Used](#technologies-used)
- [Customization](#customization)
- [Browser Compatibility](#browser-compatibility)

## ✨ Features

### Input & Automation
- ✅ URL input field for competitor websites
- ✅ Simulated data fetching with loading states
- ✅ URL validation and error handling
- ✅ Success/error/warning messages

### Competitor Insights
- ✅ Beautiful card layout with company logos
- ✅ Social media follower counts (LinkedIn, Twitter, Facebook)
- ✅ Latest product launches with descriptions
- ✅ Pricing information with change indicators
- ✅ Industry tags
- ✅ "BIG CHANGE" badges for significant updates
- ✅ Monthly traffic metrics with growth percentages
- ✅ Technology stack information

### Visual Analytics
- ✅ **Bar Chart**: Social media follower comparison
- ✅ **Pie Chart**: Market share distribution
- ✅ **Line Chart**: Growth trends over time (followers & traffic)
- ✅ Interactive tooltips and legends
- ✅ Theme-aware chart colors

### News & Updates Feed
- ✅ Auto-populated updates from fetched data
- ✅ Filterable by type (product, pricing, news)
- ✅ Priority indicators (high, medium, low)
- ✅ Sorted by date
- ✅ Color-coded by importance

### Additional Features
- ✅ **Dark/Light Mode**: Smooth theme toggle with localStorage persistence
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile
- ✅ **Search Functionality**: Search by company name or industry
- ✅ **Advanced Filters**: Filter by industry, sort by various metrics
- ✅ **Notification System**: Critical updates with badge counter
- ✅ **Modal Details**: Full competitor information in popup
- ✅ **Smooth Animations**: Professional transitions and hover effects
- ✅ **Empty States**: Helpful messages and suggestions

## 📁 File Structure

```
competitive-intelligence-tracker/
│
├── index.html                 # Main dashboard HTML
├── style.css                  # Complete styling with themes
├── script.js                  # Main application logic
├── data.json                  # Dummy competitor data
├── README.md                  # This file
│
├── components/
│   └── modal.html            # Competitor detail modal template
│
├── utils/
│   └── fetchData.js          # Data fetching & simulation utilities
│
└── charts/
    └── chartConfig.js        # Chart.js configuration for all charts
```

## 🚀 Installation

### Option 1: Direct Download
1. Download all files maintaining the folder structure
2. Open `index.html` in a modern web browser
3. Start tracking competitors!

### Option 2: Local Server (Recommended)
For best experience, use a local server to avoid CORS issues:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js http-server
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

## 📖 Usage

### Adding Competitors
1. Enter a competitor's website URL in the input field
2. Click "Fetch Competitor Data" or press Enter
3. The competitor will be added to your tracking dashboard

### Demo URLs
Try these pre-configured competitor URLs:
- `competitor1.com` - TechFlow (SaaS/Productivity)
- `competitor2.com` - DataPulse (Analytics/BI)
- `competitor3.com` - CloudMetrics (Cloud/DevOps)
- `competitor4.com` - InsightEdge (AI/ML)

### Filtering & Sorting
- **Search**: Type in the search box to filter by name or industry
- **Industry Filter**: Select a specific industry to view
- **Sort Options**:
  - Social Followers (default)
  - Monthly Traffic
  - Recent Updates
  - Name (A-Z)
- **Update Type Filter**: Filter updates by product, pricing, or news

### Viewing Details
- Click on any competitor card to open detailed modal
- View complete information including:
  - All social media metrics
  - Full product launch details
  - Pricing history
  - Technology stack
  - Complete update timeline

### Notifications
- Click the bell icon to view critical updates
- Badge shows number of high-priority notifications
- Auto-updates when new competitors are added

### Theme Toggle
- Click the sun/moon icon to switch between light and dark modes
- Theme preference is saved to localStorage

## 🛠 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid, Flexbox, and animations
- **Vanilla JavaScript**: No framework dependencies
- **Chart.js 4.4.0**: Interactive data visualizations
- **Lucide Icons**: Beautiful, customizable icons

## 🎨 Customization

### Adding New Competitors

Edit `data.json` to add new competitors:

```json
"yourcompetitor.com": {
  "id": 5,
  "name": "Your Competitor",
  "logo": "🎯",
  "website": "https://yourcompetitor.com",
  "industry": ["Your", "Industries"],
  "social": {
    "linkedin": 10000,
    "twitter": 8000,
    "facebook": 6000
  },
  // ... add other fields following the existing structure
}
```

### Modifying Colors

Edit CSS variables in `style.css`:

```css
:root {
    --primary-color: #3b82f6;  /* Change primary color */
    --success-color: #10b981;   /* Change success color */
    /* ... modify other colors */
}
```

### Adding New Chart Types

1. Add canvas element in `index.html`
2. Create chart function in `charts/chartConfig.js`
3. Call function from `script.js` in `renderCharts()`

### Connecting to Real API

Replace the `fetchCompetitorData()` function in `utils/fetchData.js`:

```javascript
async function fetchCompetitorData(url) {
    try {
        const response = await fetch(`https://your-api.com/competitors/${url}`);
        const data = await response.json();
        return {
            success: true,
            data: data
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}
```

## 🌐 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

### Required Features
- ES6+ JavaScript support
- CSS Grid and Flexbox
- Fetch API
- LocalStorage API

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px

## 🎯 Key Functions Reference

### Main Functions (script.js)
- `initApp()` - Initializes the application
- `handleFetchCompetitor()` - Fetches and adds competitors
- `render()` - Main rendering function
- `openCompetitorModal(id)` - Opens detail modal
- `toggleTheme()` - Switches between light/dark mode

### Data Functions (utils/fetchData.js)
- `fetchCompetitorData(url)` - Simulates fetching competitor data
- `initializeDatabase()` - Loads data.json
- `searchCompetitors(query)` - Searches competitors
- `isValidUrl(url)` - Validates URL format

### Chart Functions (charts/chartConfig.js)
- `createFollowerChart(competitors)` - Creates follower comparison
- `createMarketShareChart(competitors)` - Creates market share pie chart
- `createGrowthTrendChart(competitor)` - Creates growth trend line chart
- `setChartTheme(theme)` - Updates chart theme
- `updateAllCharts()` - Refreshes all charts

## 🐛 Troubleshooting

### Charts not displaying
- Ensure Chart.js CDN is loading
- Check browser console for errors
- Verify data format matches expected structure

### Modal not opening
- Check that `components/modal.html` is accessible
- Verify Lucide icons are loading
- Check for JavaScript errors in console

### Data not loading
- Ensure `data.json` is in the correct location
- Verify JSON syntax is valid
- Use local server to avoid CORS issues

## 📄 License

This project is free to use for educational and commercial purposes.

## 🤝 Contributing

Feel free to fork, modify, and enhance this project. Perfect for:
- Hackathons
- Portfolio projects
- Startup MVP
- Learning projects

## 📧 Support

For issues or questions:
1. Check the troubleshooting section
2. Review browser console for errors
3. Verify all files are in correct structure

---

**Built with ❤️ for Startups | Hackathon Ready 🚀**

Happy Tracking! 📊
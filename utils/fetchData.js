/**
 * fetchData.js
 * Utility functions for fetching and simulating competitor data scraping
 */

// Store for competitor database (loaded from data.json)
let competitorDatabase = {};

/**
 * Initialize the competitor database by loading data.json
 */
async function initializeDatabase() {
    try {
        const response = await fetch('data.json');
        competitorDatabase = await response.json();
        console.log('✅ Competitor database loaded successfully');
    } catch (error) {
        console.error('❌ Error loading competitor database:', error);
        // Fallback: Use inline data if fetch fails
        competitorDatabase = getInlineDatabase();
    }
}

/**
 * Inline database fallback (same structure as data.json)
 * Used if data.json cannot be loaded
 */
function getInlineDatabase() {
    return {
        "competitor1.com": {
            id: 1,
            name: "TechFlow",
            logo: "🚀",
            website: "https://techflow.com",
            industry: ["SaaS", "Productivity"],
            social: { linkedin: 45000, twitter: 32000, facebook: 28000 },
            latestLaunch: {
                product: "AI-Powered Analytics Dashboard",
                date: "2025-09-15",
                description: "Revolutionary analytics with predictive insights"
            },
            pricing: { current: "$49/month", previous: "$39/month", change: "+25.6%", date: "2025-09-01" },
            traffic: { monthly: 2500000, growth: "+18%" },
            technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
            bigChange: true,
            updates: [
                { type: "product", title: "New AI Dashboard Released", date: "2025-09-15", priority: "high" },
                { type: "pricing", title: "Price increase to $49/mo", date: "2025-09-01", priority: "high" },
                { type: "news", title: "Series B funding announced - $50M", date: "2025-08-20", priority: "medium" },
                { type: "product", title: "Mobile app update v3.2", date: "2025-08-10", priority: "low" }
            ],
            marketShare: 28,
            monthlyTrend: [
                { month: "Apr", followers: 38000, traffic: 2100000 },
                { month: "May", followers: 40000, traffic: 2200000 },
                { month: "Jun", followers: 42000, traffic: 2300000 },
                { month: "Jul", followers: 44000, traffic: 2400000 },
                { month: "Aug", followers: 45000, traffic: 2500000 }
            ]
        },
        "competitor2.com": {
            id: 2,
            name: "DataPulse",
            logo: "📊",
            website: "https://datapulse.com",
            industry: ["Analytics", "Business Intelligence"],
            social: { linkedin: 52000, twitter: 41000, facebook: 35000 },
            latestLaunch: {
                product: "Real-time Collaboration Suite",
                date: "2025-08-28",
                description: "Team collaboration features with live editing"
            },
            pricing: { current: "$79/month", previous: "$79/month", change: "0%", date: "2025-01-01" },
            traffic: { monthly: 3200000, growth: "+12%" },
            technologies: ["Vue.js", "Python", "MongoDB", "Google Cloud"],
            bigChange: false,
            updates: [
                { type: "product", title: "Collaboration Suite Launch", date: "2025-08-28", priority: "high" },
                { type: "news", title: "Partnership with Microsoft", date: "2025-08-15", priority: "medium" },
                { type: "product", title: "API v2.0 released", date: "2025-07-30", priority: "medium" },
                { type: "news", title: "Expanded to European market", date: "2025-07-10", priority: "low" }
            ],
            marketShare: 35,
            monthlyTrend: [
                { month: "Apr", followers: 48000, traffic: 2900000 },
                { month: "May", followers: 49000, traffic: 3000000 },
                { month: "Jun", followers: 50000, traffic: 3050000 },
                { month: "Jul", followers: 51000, traffic: 3150000 },
                { month: "Aug", followers: 52000, traffic: 3200000 }
            ]
        },
        "competitor3.com": {
            id: 3,
            name: "CloudMetrics",
            logo: "☁️",
            website: "https://cloudmetrics.com",
            industry: ["Cloud", "DevOps"],
            social: { linkedin: 38000, twitter: 29000, facebook: 22000 },
            latestLaunch: {
                product: "Infrastructure Monitoring 2.0",
                date: "2025-09-20",
                description: "Advanced cloud infrastructure monitoring"
            },
            pricing: { current: "$59/month", previous: "$69/month", change: "-14.5%", date: "2025-09-10" },
            traffic: { monthly: 1800000, growth: "+25%" },
            technologies: ["Angular", "Django", "Redis", "Azure"],
            bigChange: true,
            updates: [
                { type: "product", title: "Infrastructure Monitoring 2.0", date: "2025-09-20", priority: "high" },
                { type: "pricing", title: "Price reduced to $59/mo", date: "2025-09-10", priority: "high" },
                { type: "news", title: "Won 'Best DevOps Tool 2025'", date: "2025-08-25", priority: "medium" },
                { type: "product", title: "Kubernetes integration", date: "2025-08-05", priority: "medium" }
            ],
            marketShare: 22,
            monthlyTrend: [
                { month: "Apr", followers: 32000, traffic: 1400000 },
                { month: "May", followers: 34000, traffic: 1500000 },
                { month: "Jun", followers: 35000, traffic: 1600000 },
                { month: "Jul", followers: 36500, traffic: 1700000 },
                { month: "Aug", followers: 38000, traffic: 1800000 }
            ]
        },
        "competitor4.com": {
            id: 4,
            name: "InsightEdge",
            logo: "💡",
            website: "https://insightedge.com",
            industry: ["AI", "Machine Learning"],
            social: { linkedin: 29000, twitter: 24000, facebook: 18000 },
            latestLaunch: {
                product: "Predictive Analytics Engine",
                date: "2025-07-15",
                description: "ML-powered predictions for business metrics"
            },
            pricing: { current: "$99/month", previous: "$89/month", change: "+11.2%", date: "2025-08-01" },
            traffic: { monthly: 1500000, growth: "+8%" },
            technologies: ["React", "TensorFlow", "FastAPI", "AWS"],
            bigChange: false,
            updates: [
                { type: "pricing", title: "Price increase to $99/mo", date: "2025-08-01", priority: "medium" },
                { type: "product", title: "Predictive Analytics Engine", date: "2025-07-15", priority: "high" },
                { type: "news", title: "Acquired DataViz startup", date: "2025-07-01", priority: "medium" },
                { type: "product", title: "Custom model training", date: "2025-06-20", priority: "low" }
            ],
            marketShare: 15,
            monthlyTrend: [
                { month: "Apr", followers: 26000, traffic: 1350000 },
                { month: "May", followers: 27000, traffic: 1400000 },
                { month: "Jun", followers: 27500, traffic: 1425000 },
                { month: "Jul", followers: 28500, traffic: 1475000 },
                { month: "Aug", followers: 29000, traffic: 1500000 }
            ]
        }
    };
}

/**
 * Simulate fetching competitor data from a URL
 * In a real implementation, this would scrape the actual website
 * 
 * @param {string} url - The competitor's website URL
 * @returns {Object|null} - Competitor data or null if not found
 */
function fetchCompetitorData(url) {
    // Clean the URL (remove protocols, trailing slashes, www)
    const cleanUrl = url
        .toLowerCase()
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .replace(/\/$/, '');
    
    console.log(`🔍 Searching for competitor data: ${cleanUrl}`);
    
    // Simulate network delay
    return new Promise((resolve) => {
        setTimeout(() => {
            if (competitorDatabase[cleanUrl]) {
                console.log(`✅ Found competitor: ${competitorDatabase[cleanUrl].name}`);
                resolve({
                    success: true,
                    data: competitorDatabase[cleanUrl]
                });
            } else {
                console.log(`❌ No data found for: ${cleanUrl}`);
                resolve({
                    success: false,
                    error: `No competitor data found for "${url}". Try: competitor1.com, competitor2.com, competitor3.com, or competitor4.com`
                });
            }
        }, 800); // Simulate 800ms network delay
    });
}

/**
 * Get all available competitor URLs
 * Useful for suggestions or autocomplete
 * 
 * @returns {Array} - Array of available URLs
 */
function getAvailableUrls() {
    return Object.keys(competitorDatabase);
}

/**
 * Validate URL format
 * 
 * @param {string} url - URL to validate
 * @returns {boolean} - True if valid format
 */
function isValidUrl(url) {
    if (!url || url.trim() === '') {
        return false;
    }
    
    // Basic URL validation (allows domain.com format)
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return urlPattern.test(url);
}

/**
 * Get competitor by ID
 * Useful for quick lookups when you have the ID
 * 
 * @param {number} id - Competitor ID
 * @returns {Object|null} - Competitor data or null
 */
function getCompetitorById(id) {
    for (const url in competitorDatabase) {
        if (competitorDatabase[url].id === id) {
            return competitorDatabase[url];
        }
    }
    return null;
}

/**
 * Search competitors by name or industry
 * 
 * @param {string} query - Search query
 * @returns {Array} - Array of matching competitors
 */
function searchCompetitors(query) {
    const lowerQuery = query.toLowerCase();
    const results = [];
    
    for (const url in competitorDatabase) {
        const competitor = competitorDatabase[url];
        const nameMatch = competitor.name.toLowerCase().includes(lowerQuery);
        const industryMatch = competitor.industry.some(ind => 
            ind.toLowerCase().includes(lowerQuery)
        );
        
        if (nameMatch || industryMatch) {
            results.push(competitor);
        }
    }
    
    return results;
}
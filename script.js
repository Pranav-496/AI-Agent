// Global variable to store competitor data
let competitorsData = [];

// Function to load data from data.json
async function loadData() {
    try {
        const response = await fetch('data.json');
        competitorsData = await response.json();
        
        // Initialize the dashboard once data is loaded
        displayCompetitors(competitorsData);
        displayNotification(competitorsData);
        displayUpdatesFeed(competitorsData);
        createFollowersChart(competitorsData);
    } catch (error) {
        console.error('Error loading data:', error);
        document.getElementById('competitorsGrid').innerHTML = 
            '<p style="color: white; text-align: center;">Error loading competitor data. Please ensure data.json exists.</p>';
    }
}

// Function to display competitor cards
function displayCompetitors(competitors) {
    const grid = document.getElementById('competitorsGrid');
    grid.innerHTML = ''; // Clear existing content
    
    competitors.forEach(competitor => {
        // Create card element
        const card = document.createElement('div');
        card.className = 'competitor-card';
        
        // Determine activity status based on followers
        const status = competitor.followers > 100000 ? 'active' : 'moderate';
        const statusText = competitor.followers > 100000 ? 'High Activity' : 'Moderate Activity';
        
        // Build card HTML
        card.innerHTML = `
            <h3>🏢 ${competitor.name}</h3>
            <div class="followers-count">
                👥 ${competitor.followers.toLocaleString()} Followers
            </div>
            
            <div class="competitor-info">
                <span class="info-label">Latest Product Update:</span>
                <span class="info-value">${competitor.latestUpdate}</span>
            </div>
            
            <div class="competitor-info">
                <span class="info-label">Website/Pricing Change:</span>
                <span class="info-value">${competitor.pricingChange}</span>
            </div>
            
            <span class="status-badge status-${status}">${statusText}</span>
        `;
        
        grid.appendChild(card);
    });
}

// Function to display notification for the biggest recent change
function displayNotification(competitors) {
    const notificationText = document.getElementById('notificationText');
    
    // Find competitor with highest follower count (as proxy for "big change")
    const topCompetitor = competitors.reduce((max, comp) => 
        comp.followers > max.followers ? comp : max
    , competitors[0]);
    
    notificationText.textContent = 
        `${topCompetitor.name} is leading with ${topCompetitor.followers.toLocaleString()} followers! Latest: ${topCompetitor.latestUpdate}`;
}

// Function to create follower comparison chart using Chart.js
function createFollowersChart(competitors) {
    const ctx = document.getElementById('followersChart').getContext('2d');
    
    // Prepare data for the chart
    const labels = competitors.map(comp => comp.name);
    const data = competitors.map(comp => comp.followers);
    
    // Create gradient for chart bars
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    
    // Initialize Chart.js bar chart
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Followers Count',
                data: data,
                backgroundColor: gradient,
                borderColor: '#667eea',
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'Followers: ' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Function to display updates feed
function displayUpdatesFeed(competitors) {
    const feed = document.getElementById('updatesFeed');
    feed.innerHTML = ''; // Clear existing content
    
    // Create update items for each competitor
    competitors.forEach((competitor, index) => {
        const updateItem = document.createElement('div');
        updateItem.className = 'update-item';
        
        // Generate a fake recent date (within last 7 days)
        const daysAgo = index + 1;
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);
        const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        updateItem.innerHTML = `
            <div class="update-header">
                <span class="update-company">${competitor.name}</span>
                <span class="update-date">${dateStr}</span>
            </div>
            <div class="update-content">
                <strong>Product Update:</strong> ${competitor.latestUpdate}<br>
                <strong>Pricing:</strong> ${competitor.pricingChange}
            </div>
        `;
        
        feed.appendChild(updateItem);
    });
}

// Search/Filter functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        // Filter competitors based on search term
        const filteredCompetitors = competitorsData.filter(competitor =>
            competitor.name.toLowerCase().includes(searchTerm)
        );
        
        // Re-display filtered results
        displayCompetitors(filteredCompetitors);
    });
});

// Initialize the dashboard when page loads
loadData();
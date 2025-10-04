/**
 * chartConfig.js
 * Chart.js configuration and management for all charts
 */

// Store chart instances globally to enable updates
let chartInstances = {
    followerChart: null,
    marketShareChart: null,
    growthTrendChart: null
};

// Theme colors for charts
const chartColors = {
    light: {
        background: '#ffffff',
        text: '#111827',
        grid: '#e5e7eb',
        linkedin: '#0077b5',
        twitter: '#1da1f2',
        facebook: '#4267B2',
        followers: '#3b82f6',
        traffic: '#10b981'
    },
    dark: {
        background: '#1f2937',
        text: '#f9fafb',
        grid: '#374151',
        linkedin: '#0077b5',
        twitter: '#1da1f2',
        facebook: '#4267B2',
        followers: '#3b82f6',
        traffic: '#10b981'
    }
};

// Current theme
let currentTheme = 'light';

/**
 * Set the chart theme (light or dark)
 * @param {string} theme - 'light' or 'dark'
 */
function setChartTheme(theme) {
    currentTheme = theme;
    updateAllCharts();
}

/**
 * Get current theme colors
 * @returns {Object} Theme color object
 */
function getThemeColors() {
    return chartColors[currentTheme];
}

/**
 * Default chart configuration
 */
const defaultChartConfig = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        legend: {
            display: true,
            labels: {
                color: getThemeColors().text,
                padding: 15,
                font: {
                    size: 12,
                    family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto'
                }
            }
        },
        tooltip: {
            backgroundColor: currentTheme === 'dark' ? '#1f2937' : '#ffffff',
            titleColor: getThemeColors().text,
            bodyColor: getThemeColors().text,
            borderColor: getThemeColors().grid,
            borderWidth: 1,
            padding: 12,
            displayColors: true,
            boxPadding: 6
        }
    }
};

/**
 * Create Follower Comparison Bar Chart
 * @param {Array} competitors - Array of competitor objects
 */
function createFollowerChart(competitors) {
    const ctx = document.getElementById('followerChart');
    if (!ctx) return;

    // Destroy existing chart if it exists
    if (chartInstances.followerChart) {
        chartInstances.followerChart.destroy();
    }

    // Prepare data
    const labels = competitors.map(c => c.name);
    const linkedinData = competitors.map(c => c.social.linkedin);
    const twitterData = competitors.map(c => c.social.twitter);
    const facebookData = competitors.map(c => c.social.facebook);

    const colors = getThemeColors();

    chartInstances.followerChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'LinkedIn',
                    data: linkedinData,
                    backgroundColor: colors.linkedin,
                    borderRadius: 6,
                    borderSkipped: false
                },
                {
                    label: 'Twitter',
                    data: twitterData,
                    backgroundColor: colors.twitter,
                    borderRadius: 6,
                    borderSkipped: false
                },
                {
                    label: 'Facebook',
                    data: facebookData,
                    backgroundColor: colors.facebook,
                    borderRadius: 6,
                    borderSkipped: false
                }
            ]
        },
        options: {
            ...defaultChartConfig,
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: colors.text
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: colors.grid,
                        drawBorder: false
                    },
                    ticks: {
                        color: colors.text,
                        callback: function(value) {
                            return value >= 1000 ? (value / 1000) + 'K' : value;
                        }
                    }
                }
            }
        }
    });
}

/**
 * Create Market Share Pie Chart
 * @param {Array} competitors - Array of competitor objects
 */
function createMarketShareChart(competitors) {
    const ctx = document.getElementById('marketShareChart');
    if (!ctx) return;

    // Destroy existing chart if it exists
    if (chartInstances.marketShareChart) {
        chartInstances.marketShareChart.destroy();
    }

    // Prepare data
    const labels = competitors.map(c => c.name);
    const data = competitors.map(c => c.marketShare);
    
    // Generate colors
    const pieColors = [
        '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
        '#06b6d4', '#ec4899', '#14b8a6', '#f97316', '#6366f1'
    ];

    const colors = getThemeColors();

    chartInstances.marketShareChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: pieColors.slice(0, competitors.length),
                borderColor: colors.background,
                borderWidth: 3,
                hoverOffset: 10
            }]
        },
        options: {
            ...defaultChartConfig,
            plugins: {
                ...defaultChartConfig.plugins,
                legend: {
                    ...defaultChartConfig.plugins.legend,
                    position: 'right'
                },
                tooltip: {
                    ...defaultChartConfig.plugins.tooltip,
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            return `${label}: ${value}%`;
                        }
                    }
                }
            }
        }
    });
}

/**
 * Create Growth Trend Line Chart
 * @param {Object} competitor - Single competitor object
 */
function createGrowthTrendChart(competitor) {
    const ctx = document.getElementById('growthTrendChart');
    if (!ctx) return;

    // Destroy existing chart if it exists
    if (chartInstances.growthTrendChart) {
        chartInstances.growthTrendChart.destroy();
    }

    // Prepare data
    const labels = competitor.monthlyTrend.map(t => t.month);
    const followersData = competitor.monthlyTrend.map(t => t.followers);
    const trafficData = competitor.monthlyTrend.map(t => t.traffic);

    const colors = getThemeColors();

    chartInstances.growthTrendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Social Followers',
                    data: followersData,
                    borderColor: colors.followers,
                    backgroundColor: colors.followers + '20',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: colors.followers,
                    pointBorderColor: colors.background,
                    pointBorderWidth: 2
                },
                {
                    label: 'Monthly Traffic',
                    data: trafficData,
                    borderColor: colors.traffic,
                    backgroundColor: colors.traffic + '20',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: colors.traffic,
                    pointBorderColor: colors.background,
                    pointBorderWidth: 2,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            ...defaultChartConfig,
            interaction: {
                mode: 'index',
                intersect: false
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: colors.text
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    beginAtZero: false,
                    grid: {
                        color: colors.grid,
                        drawBorder: false
                    },
                    ticks: {
                        color: colors.text,
                        callback: function(value) {
                            return value >= 1000 ? (value / 1000) + 'K' : value;
                        }
                    },
                    title: {
                        display: true,
                        text: 'Followers',
                        color: colors.text
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    beginAtZero: false,
                    grid: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        color: colors.text,
                        callback: function(value) {
                            return value >= 1000000 ? (value / 1000000) + 'M' : (value / 1000) + 'K';
                        }
                    },
                    title: {
                        display: true,
                        text: 'Traffic',
                        color: colors.text
                    }
                }
            }
        }
    });
}

/**
 * Update all existing charts with current data
 * Useful for theme changes
 */
function updateAllCharts() {
    // Update chart defaults for theme
    Object.values(chartInstances).forEach(chart => {
        if (chart) {
            const colors = getThemeColors();
            
            // Update legend colors
            if (chart.options.plugins.legend) {
                chart.options.plugins.legend.labels.color = colors.text;
            }
            
            // Update tooltip colors
            if (chart.options.plugins.tooltip) {
                chart.options.plugins.tooltip.backgroundColor = colors.background;
                chart.options.plugins.tooltip.titleColor = colors.text;
                chart.options.plugins.tooltip.bodyColor = colors.text;
                chart.options.plugins.tooltip.borderColor = colors.grid;
            }
            
            // Update scales if they exist
            if (chart.options.scales) {
                Object.keys(chart.options.scales).forEach(scaleKey => {
                    const scale = chart.options.scales[scaleKey];
                    if (scale.ticks) {
                        scale.ticks.color = colors.text;
                    }
                    if (scale.grid) {
                        scale.grid.color = colors.grid;
                    }
                    if (scale.title) {
                        scale.title.color = colors.text;
                    }
                });
            }
            
            chart.update();
        }
    });
}

/**
 * Destroy all chart instances
 * Useful for cleanup
 */
function destroyAllCharts() {
    Object.keys(chartInstances).forEach(key => {
        if (chartInstances[key]) {
            chartInstances[key].destroy();
            chartInstances[key] = null;
        }
    });
}

/**
 * Get a specific chart instance
 * @param {string} chartName - Name of the chart
 * @returns {Chart|null} Chart instance or null
 */
function getChartInstance(chartName) {
    return chartInstances[chartName] || null;
}
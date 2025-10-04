/**
 * script.js
 * Main application logic for Competitive Intelligence Tracker
 */

// Global state
const appState = {
    competitors: [],
    selectedCompetitor: null,
    isDarkMode: false,
    searchTerm: '',
    filterIndustry: 'all',
    filterUpdateType: 'all',
    sortBy: 'followers',
    notifications: []
};

// DOM Elements
const elements = {
    urlInput: null,
    fetchBtn: null,
    messageBox: null,
    searchInput: null,
    industryFilter: null,
    sortBy: null,
    updateTypeFilter: null,
    competitorsGrid: null,
    emptyState: null,
    controlsSection: null,
    chartsSection: null,
    updatesSection: null,
    notificationBtn: null,
    notificationPanel: null,
    notificationList: null,
    notificationBadge: null,
    themeToggle: null,
    themeIcon: null,
    modalContainer: null,
    growthTrendCard: null
};

/**
 * Initialize the application
 */
async function initApp() {
    console.log('🚀 Initializing Competitive Intelligence Tracker...');
    
    // Initialize database
    await initializeDatabase();
    
    // Cache DOM elements
    cacheElements();
    
    // Load modal template
    await loadModalTemplate();
    
    // Setup event listeners
    setupEventListeners();
    
    // Check for saved theme preference
    loadThemePreference();
    
    // Initial render
    render();
    
    console.log('✅ Application initialized successfully');
}

/**
 * Cache all DOM elements
 */
function cacheElements() {
    elements.urlInput = document.getElementById('urlInput');
    elements.fetchBtn = document.getElementById('fetchBtn');
    elements.messageBox = document.getElementById('messageBox');
    elements.searchInput = document.getElementById('searchInput');
    elements.industryFilter = document.getElementById('industryFilter');
    elements.sortBy = document.getElementById('sortBy');
    elements.updateTypeFilter = document.getElementById('updateTypeFilter');
    elements.competitorsGrid = document.getElementById('competitorsGrid');
    elements.emptyState = document.getElementById('emptyState');
    elements.controlsSection = document.getElementById('controlsSection');
    elements.chartsSection = document.getElementById('chartsSection');
    elements.updatesSection = document.getElementById('updatesSection');
    elements.notificationBtn = document.getElementById('notificationBtn');
    elements.notificationPanel = document.getElementById('notificationPanel');
    elements.notificationList = document.getElementById('notificationList');
    elements.notificationBadge = document.getElementById('notificationBadge');
    elements.themeToggle = document.getElementById('themeToggle');
    elements.themeIcon = document.getElementById('themeIcon');
    elements.modalContainer = document.getElementById('modalContainer');
    elements.growthTrendCard = document.getElementById('growthTrendCard');
}

/**
 * Load modal template from components/modal.html
 */
async function loadModalTemplate() {
    try {
        const response = await fetch('components/modal.html');
        const html = await response.text();
        elements.modalContainer.innerHTML = html;
        console.log('✅ Modal template loaded');
    } catch (error) {
        console.error('❌ Error loading modal template:', error);
        // Create inline modal as fallback
        createInlineModal();
    }
}

/**
 * Create inline modal if template loading fails
 */
function createInlineModal() {
    elements.modalContainer.innerHTML = `
        <div class="modal-overlay" id="competitorModal" onclick="closeModal(event)" style="display: none;">
            <div class="modal" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <div class="modal-header-content">
                        <div class="modal-logo" id="modalLogo">🚀</div>
                        <div>
                            <h2 class="modal-title" id="modalName">Competitor Name</h2>
                            <a href="#" class="modal-website" id="modalWebsite" target="_blank">
                                <span id="modalWebsiteText">website.com</span>
                            </a>
                        </div>
                    </div>
                    <button class="modal-close" onclick="closeModal()">✕</button>
                </div>
                <div class="modal-body">
                    <div id="modalContent"></div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    // Fetch button
    elements.fetchBtn.addEventListener('click', handleFetchCompetitor);
    
    // Enter key in URL input
    elements.urlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleFetchCompetitor();
        }
    });
    
    // Search input
    elements.searchInput.addEventListener('input', (e) => {
        appState.searchTerm = e.target.value;
        render();
    });
    
    // Filters
    elements.industryFilter.addEventListener('change', (e) => {
        appState.filterIndustry = e.target.value;
        render();
    });
    
    elements.sortBy.addEventListener('change', (e) => {
        appState.sortBy = e.target.value;
        render();
    });
    
    elements.updateTypeFilter.addEventListener('change', (e) => {
        appState.filterUpdateType = e.target.value;
        renderUpdates();
    });
    
    // Theme toggle
    elements.themeToggle.addEventListener('click', toggleTheme);
    
    // Notification button
    elements.notificationBtn.addEventListener('click', toggleNotifications);
    
    // Close notifications button
    document.getElementById('closeNotifications')?.addEventListener('click', () => {
        elements.notificationPanel.classList.remove('active');
    });
}

/**
 * Handle fetching competitor data
 */
async function handleFetchCompetitor() {
    const url = elements.urlInput.value.trim();
    
    if (!url) {
        showMessage('Please enter a competitor URL', 'error');
        return;
    }
    
    if (!isValidUrl(url)) {
        showMessage('Please enter a valid URL format', 'error');
        return;
    }
    
    // Show loading state
    elements.fetchBtn.textContent = 'Fetching...';
    elements.fetchBtn.disabled = true;
    
    try {
        const result = await fetchCompetitorData(url);
        
        if (result.success) {
            // Check if already added
            const exists = appState.competitors.find(c => c.id === result.data.id);
            
            if (exists) {
                showMessage(`⚠️ ${result.data.name} is already being tracked!`, 'warning');
            } else {
                appState.competitors.push(result.data);
                showMessage(`✅ Successfully added ${result.data.name} to tracking!`, 'success');
                elements.urlInput.value = '';
                
                // Update notifications
                updateNotifications();
                
                // Render
                render();
            }
        } else {
            showMessage(result.error, 'error');
        }
    } catch (error) {
        showMessage('An error occurred while fetching data', 'error');
        console.error(error);
    } finally {
        elements.fetchBtn.textContent = 'Fetch Competitor Data';
        elements.fetchBtn.disabled = false;
    }
}

/**
 * Show message to user
 */
function showMessage(message, type = 'success') {
    elements.messageBox.textContent = message;
    elements.messageBox.className = `message active ${type}`;
    
    setTimeout(() => {
        elements.messageBox.classList.remove('active');
    }, 5000);
}

/**
 * Toggle theme between light and dark
 */
function toggleTheme() {
    appState.isDarkMode = !appState.isDarkMode;
    document.body.classList.toggle('dark-mode', appState.isDarkMode);
    document.body.classList.toggle('light-mode', !appState.isDarkMode);
    
    // Update icon
    elements.themeIcon.setAttribute('data-lucide', appState.isDarkMode ? 'sun' : 'moon');
    lucide.createIcons();
    
    // Save preference
    localStorage.setItem('theme', appState.isDarkMode ? 'dark' : 'light');
    
    // Update charts
    setChartTheme(appState.isDarkMode ? 'dark' : 'light');
}

/**
 * Load theme preference from localStorage
 */
function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        appState.isDarkMode = true;
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        elements.themeIcon.setAttribute('data-lucide', 'sun');
        setChartTheme('dark');
    } else {
        document.body.classList.add('light-mode');
        setChartTheme('light');
    }
    lucide.createIcons();
}

/**
 * Toggle notifications panel
 */
function toggleNotifications() {
    elements.notificationPanel.classList.toggle('active');
}

/**
 * Update notifications based on competitor updates
 */
function updateNotifications() {
    appState.notifications = [];
    
    appState.competitors.forEach(comp => {
        comp.updates
            .filter(update => update.priority === 'high')
            .forEach(update => {
                appState.notifications.push({
                    id: `${comp.id}-${update.date}`,
                    competitor: comp.name,
                    message: update.title,
                    date: update.date,
                    type: update.type
                });
            });
    });
    
    // Update badge
    if (appState.notifications.length > 0) {
        elements.notificationBadge.textContent = appState.notifications.length;
        elements.notificationBadge.classList.add('active');
    } else {
        elements.notificationBadge.classList.remove('active');
    }
    
    renderNotifications();
}

/**
 * Render notifications list
 */
function renderNotifications() {
    if (appState.notifications.length === 0) {
        elements.notificationList.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">No critical updates</p>';
        return;
    }
    
    elements.notificationList.innerHTML = appState.notifications
        .map(notif => `
            <div class="notification-item">
                <div class="notification-item-header">
                    <p class="notification-competitor">${notif.competitor}</p>
                    <span class="badge ${notif.type}">${notif.type}</span>
                </div>
                <p class="notification-message">${notif.message}</p>
                <p class="notification-date">${notif.date}</p>
            </div>
        `)
        .join('');
}

/**
 * Get filtered and sorted competitors
 */
function getFilteredCompetitors() {
    let filtered = [...appState.competitors];
    
    // Apply search filter
    if (appState.searchTerm) {
        const term = appState.searchTerm.toLowerCase();
        filtered = filtered.filter(comp => 
            comp.name.toLowerCase().includes(term) ||
            comp.industry.some(ind => ind.toLowerCase().includes(term))
        );
    }
    
    // Apply industry filter
    if (appState.filterIndustry !== 'all') {
        filtered = filtered.filter(comp => 
            comp.industry.includes(appState.filterIndustry)
        );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
        switch(appState.sortBy) {
            case 'followers':
                const aFollowers = a.social.linkedin + a.social.twitter + a.social.facebook;
                const bFollowers = b.social.linkedin + b.social.twitter + b.social.facebook;
                return bFollowers - aFollowers;
            case 'traffic':
                return b.traffic.monthly - a.traffic.monthly;
            case 'recent':
                return new Date(b.updates[0].date) - new Date(a.updates[0].date);
            case 'name':
                return a.name.localeCompare(b.name);
            default:
                return 0;
        }
    });
    
    return filtered;
}

/**
 * Main render function
 */
function render() {
    if (appState.competitors.length === 0) {
        // Show empty state
        elements.emptyState.style.display = 'block';
        elements.controlsSection.style.display = 'none';
        elements.competitorsGrid.style.display = 'none';
        elements.chartsSection.style.display = 'none';
        elements.updatesSection.style.display = 'none';
    } else {
        // Hide empty state
        elements.emptyState.style.display = 'none';
        elements.controlsSection.style.display = 'block';
        elements.chartsSection.style.display = 'block';
        elements.updatesSection.style.display = 'block';
        
        // Update industry filter options
        updateIndustryFilter();
        
        // Render competitors
        renderCompetitors();
        
        // Render charts
        renderCharts();
        
        // Render updates
        renderUpdates();
    }
}

/**
 * Update industry filter dropdown
 */
function updateIndustryFilter() {
    const industries = new Set();
    appState.competitors.forEach(comp => {
        comp.industry.forEach(ind => industries.add(ind));
    });
    
    const currentValue = elements.industryFilter.value;
    elements.industryFilter.innerHTML = '<option value="all">All Industries</option>';
    
    Array.from(industries).sort().forEach(ind => {
        const option = document.createElement('option');
        option.value = ind;
        option.textContent = ind;
        elements.industryFilter.appendChild(option);
    });
    
    // Restore selection if still valid
    if (currentValue !== 'all' && industries.has(currentValue)) {
        elements.industryFilter.value = currentValue;
    }
}

/**
 * Render competitor cards
 */
function renderCompetitors() {
    const filtered = getFilteredCompetitors();
    
    if (filtered.length === 0) {
        elements.competitorsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary); padding: 2rem;">No competitors match your filters</p>';
        elements.competitorsGrid.style.display = 'grid';
        return;
    }
    
    elements.competitorsGrid.style.display = 'grid';
    elements.competitorsGrid.innerHTML = filtered.map(comp => createCompetitorCard(comp)).join('');
    
    // Reinitialize icons
    lucide.createIcons();
}

/**
 * Create competitor card HTML
 */
function createCompetitorCard(comp) {
    const totalFollowers = comp.social.linkedin + comp.social.twitter + comp.social.facebook;
    const trafficM = (comp.traffic.monthly / 1000000).toFixed(1);
    
    return `
        <div class="competitor-card" onclick="openCompetitorModal(${comp.id})">
            ${comp.bigChange ? '<div class="big-change-badge">BIG CHANGE</div>' : ''}
            
            <div class="competitor-header">
                <div class="competitor-logo">${comp.logo}</div>
                <div class="competitor-info">
                    <h3 class="competitor-name">${comp.name}</h3>
                    <a href="${comp.website}" class="competitor-website" target="_blank"                     rel="noopener noreferrer">${comp.website.replace(/^https?:\/\//, '')}</a>
                </div>
            </div>

            <div class="competitor-stats">
                <p><strong>Followers:</strong> ${totalFollowers.toLocaleString()}</p>
                <p><strong>Monthly Traffic:</strong> ${trafficM}M</p>
                <p><strong>Industry:</strong> ${comp.industry.join(', ')}</p>
            </div>

            <div class="competitor-updates">
                <p><strong>Latest Update:</strong> ${comp.updates[0]?.title || 'N/A'}</p>
            </div>
        </div>
    `;
}

/**
 * Open competitor modal
 */
function openCompetitorModal(id) {
    const comp = appState.competitors.find(c => c.id === id);
    if (!comp) return;

    const modal = document.getElementById('competitorModal');
    modal.style.display = 'flex';

    document.getElementById('modalLogo').textContent = comp.logo;
    document.getElementById('modalName').textContent = comp.name;
    document.getElementById('modalWebsite').href = comp.website;
    document.getElementById('modalWebsiteText').textContent = comp.website.replace(/^https?:\/\//, '');

    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
        <p><strong>Industry:</strong> ${comp.industry.join(', ')}</p>
        <p><strong>Followers:</strong> ${comp.social.linkedin + comp.social.twitter + comp.social.facebook}</p>
        <p><strong>Monthly Traffic:</strong> ${(comp.traffic.monthly / 1000000).toFixed(1)}M</p>
        <p><strong>Technologies:</strong> ${comp.technologies.join(', ')}</p>
        <h4>Recent Updates:</h4>
        <ul>
            ${comp.updates.map(u => `<li><strong>${u.date}:</strong> ${u.title} (${u.type})</li>`).join('')}
        </ul>
    `;
}

/**
 * Close modal
 */
function closeModal(event) {
    if (!event || event.target.classList.contains('modal-overlay')) {
        const modal = document.getElementById('competitorModal');
        modal.style.display = 'none';
    }
}

/**
 * Render charts
 */
function renderCharts() {
    const filtered = getFilteredCompetitors();

    // Follower comparison chart
    const ctxFollowers = document.getElementById('followerChart').getContext('2d');
    const followerChartData = {
        labels: filtered.map(c => c.name),
        datasets: [{
            label: 'Total Followers',
            data: filtered.map(c => c.social.linkedin + c.social.twitter + c.social.facebook),
            backgroundColor: '#4e79a7'
        }]
    };

    if (window.followerChartInstance) window.followerChartInstance.destroy();
    window.followerChartInstance = new Chart(ctxFollowers, {
        type: 'bar',
        data: followerChartData,
        options: {
            responsive: true,
            plugins: { legend: { display: false } }
        }
    });

    // Growth trend chart (line)
    const ctxGrowth = document.getElementById('growthTrendChart')?.getContext('2d');
    if (ctxGrowth) {
        const growthData = {
            labels: ['Jan','Feb','Mar','Apr','May','Jun'],
            datasets: filtered.map(c => ({
                label: c.name,
                data: [50,60,70,80,90,100].map(v => Math.floor(Math.random()*1000 + v*10)),
                borderColor: getRandomColor(),
                fill: false
            }))
        };
        if (window.growthChartInstance) window.growthChartInstance.destroy();
        window.growthChartInstance = new Chart(ctxGrowth, {
            type: 'line',
            data: growthData,
            options: { responsive: true }
        });
    }
}

/**
 * Render updates/news section
 */
function renderUpdates() {
    const updatesContainer = document.getElementById('newsList');
    let updates = [];
    appState.competitors.forEach(comp => {
        comp.updates.forEach(u => updates.push({ ...u, competitor: comp.name }));
    });

    // Apply update type filter
    if (appState.filterUpdateType !== 'all') {
        updates = updates.filter(u => u.type === appState.filterUpdateType);
    }

    // Sort by date descending
    updates.sort((a,b) => new Date(b.date) - new Date(a.date));

    if (updates.length === 0) {
        updatesContainer.innerHTML = '<li>No updates found.</li>';
        return;
    }

    updatesContainer.innerHTML = updates.map(u => `
        <li>
            <strong>${u.competitor}:</strong> ${u.title} <em>(${u.type}, ${u.date})</em>
        </li>
    `).join('');
}

/**
 * Utility: check valid URL
 */
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

/**
 * Simulated fetch competitor data (dummy)
 */
async function fetchCompetitorData(url) {
    // Use data.json mapping
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        const comp = data.competitors.find(c => c.website === url || c.website === url.replace(/\/$/, ''));
        if (!comp) return { success: false, error: 'No data found for this URL.' };
        return { success: true, data: { ...comp, id: data.competitors.indexOf(comp) } };
    } catch (err) {
        console.error(err);
        return { success: false, error: 'Error fetching data.' };
    }
}

/**
 * Utility: generate random color
 */
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i=0; i<6; i++) color += letters[Math.floor(Math.random()*16)];
    return color;
}

/**
 * Initialize database (dummy)
 */
async function initializeDatabase() {
    // This can later be replaced with real API/database calls
    console.log('Initializing database...');
}

// Initialize app on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initApp);

// Admin Panel JavaScript

// DOM Elements
const adminMenu = document.querySelector('.admin-menu');
const contentSections = document.querySelectorAll('.content-section');
const logoutBtn = document.getElementById('logoutBtn');

// Check Authentication


// Initialize Admin Panel
function initAdminPanel() {
    loadDashboardStats();
    loadRecentActivity();
    setupEventListeners();
    loadUsers();
    loadListings();
    loadSwaps();
    initCharts();
}

// Event Listeners Setup
function setupEventListeners() {
    // Menu Navigation
    adminMenu.addEventListener('click', (e) => {
        const menuItem = e.target.closest('li');
        if (!menuItem) return;

        // Update active menu item
        document.querySelectorAll('.admin-menu li').forEach(item => {
            item.classList.remove('active');
        });
        menuItem.classList.add('active');

        // Show corresponding section
        const sectionId = menuItem.dataset.section;
        contentSections.forEach(section => {
            section.classList.remove('active');
            if (section.id === sectionId) {
                section.classList.add('active');
            }
        });
    });

    // Logout Handler
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('adminToken');
        window.location.href = 'login.html';
    });

    // Search Handlers
    document.querySelectorAll('.search-bar input').forEach(input => {
        input.addEventListener('input', debounce(handleSearch, 300));
    });

    // Filter Handlers
    document.querySelectorAll('.filters select').forEach(select => {
        select.addEventListener('change', handleFilter);
    });
}

// Dashboard Functions
function loadDashboardStats() {
    // Simulated API call to get dashboard statistics
    const stats = {
        users: { total: 1234, trend: '+12%' },
        listings: { total: 567, trend: '+8%' },
        swaps: { total: 89, trend: '+15%' },
        reviews: { total: 23, urgent: 5 }
    };

    // Update stats in the DOM
    updateDashboardStats(stats);
}

function updateDashboardStats(stats) {
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        const type = card.querySelector('h3').textContent.toLowerCase();
        if (type.includes('users')) {
            card.querySelector('.stat-number').textContent = stats.users.total;
            card.querySelector('.stat-trend').textContent = stats.users.trend + ' this month';
        }
        // Add similar updates for other stat types
    });
}

function loadRecentActivity() {
    // Simulated API call to get recent activity
    const activities = [
        { type: 'user', action: 'New user registration', time: '5 minutes ago' },
        { type: 'listing', action: 'New item listed', time: '10 minutes ago' },
        { type: 'swap', action: 'Swap completed', time: '15 minutes ago' }
    ];

    const activityList = document.querySelector('.activity-list');
    activityList.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <span class="activity-time">${activity.time}</span>
            <span class="activity-action">${activity.action}</span>
        </div>
    `).join('');
}

// User Management Functions
function loadUsers() {
    // Simulated API call to get users
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', joined: '2023-01-01' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'suspended', joined: '2023-02-15' }
    ];

    const userTableBody = document.querySelector('.users-table tbody');
    userTableBody.innerHTML = users.map(user => `
        <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td><span class="status-badge ${user.status}">${user.status}</span></td>
            <td>${user.joined}</td>
            <td>
                <button class="action-btn edit" onclick="editUser(${user.id})">Edit</button>
                <button class="action-btn ${user.status === 'active' ? 'suspend' : 'activate'}"
                    onclick="toggleUserStatus(${user.id})">
                    ${user.status === 'active' ? 'Suspend' : 'Activate'}
                </button>
            </td>
        </tr>
    `).join('');
}

function editUser(userId) {
    // Implement user editing functionality
    console.log('Editing user:', userId);
}

function toggleUserStatus(userId) {
    // Implement user status toggle functionality
    console.log('Toggling status for user:', userId);
}

// Listing Management Functions
function loadListings() {
    // Simulated API call to get listings
    const listings = [
        { id: 1, title: 'Blue Denim Jacket', status: 'active', user: 'John Doe' },
        { id: 2, title: 'Red T-Shirt', status: 'pending', user: 'Jane Smith' }
    ];

    const listingsGrid = document.querySelector('.listings-grid');
    listingsGrid.innerHTML = listings.map(listing => `
        <div class="listing-card">
            <img src="https://via.placeholder.com/150" alt="${listing.title}">
            <div class="listing-info">
                <h3>${listing.title}</h3>
                <p>Posted by: ${listing.user}</p>
                <span class="status-badge ${listing.status}">${listing.status}</span>
                <div class="listing-actions">
                    <button onclick="approveListing(${listing.id})">Approve</button>
                    <button onclick="removeListing(${listing.id})">Remove</button>
                </div>
            </div>
        </div>
    `).join('');
}

function approveListing(listingId) {
    // Implement listing approval functionality
    console.log('Approving listing:', listingId);
}

function removeListing(listingId) {
    // Implement listing removal functionality
    console.log('Removing listing:', listingId);
}

// Swap Management Functions
function loadSwaps() {
    // Simulated API call to get swaps
    const swaps = [
        { id: 1, users: ['John Doe', 'Jane Smith'], status: 'pending', date: '2023-05-01' },
        { id: 2, users: ['Alice Brown', 'Bob Wilson'], status: 'completed', date: '2023-05-02' }
    ];

    const swapsList = document.querySelector('.swaps-list');
    swapsList.innerHTML = swaps.map(swap => `
        <div class="swap-item">
            <div class="swap-info">
                <h3>Swap #${swap.id}</h3>
                <p>${swap.users[0]} ↔ ${swap.users[1]}</p>
                <span class="status-badge ${swap.status}">${swap.status}</span>
                <p>Date: ${swap.date}</p>
            </div>
            <div class="swap-actions">
                <button onclick="reviewSwap(${swap.id})">Review</button>
                ${swap.status === 'disputed' ? `<button onclick="resolveDispute(${swap.id})">Resolve</button>` : ''}
            </div>
        </div>
    `).join('');
}

function reviewSwap(swapId) {
    // Implement swap review functionality
    console.log('Reviewing swap:', swapId);
}

function resolveDispute(swapId) {
    // Implement dispute resolution functionality
    console.log('Resolving dispute for swap:', swapId);
}

// Chart Initialization
function initCharts() {
    // Initialize charts using a charting library (e.g., Chart.js)
    // This is a placeholder for chart initialization
    console.log('Charts initialized');
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const section = e.target.closest('.content-section').id;
    // Implement search functionality for each section
    console.log(`Searching in ${section} for: ${searchTerm}`);
}

function handleFilter(e) {
    const filterValue = e.target.value;
    const section = e.target.closest('.content-section').id;
    // Implement filter functionality for each section
    console.log(`Filtering ${section} by: ${filterValue}`);
}

// Initialize Admin Panel when DOM is loaded
document.addEventListener('DOMContentLoaded', initAdminPanel);

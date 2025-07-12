// Check if user is logged in
function checkAuth() {
    const user = localStorage.getItem('user');
    if (!user) {
        window.location.href = 'login.html';
        return null;
    }
    return JSON.parse(user);
}

// Initialize dashboard
function initDashboard() {
    const user = checkAuth();
    if (!user) return;

    // Set user information
    document.getElementById('userName').textContent = user.username;
    loadUserStats();
    loadMyListings();
    loadMyPurchases();
    loadActiveSwaps();
}

// Load user statistics
function loadUserStats() {
    // Simulate API call for user stats
    const stats = {
        listedItems: 12,
        completedSwaps: 8,
        rating: 4.5,
        communityScore: 85
    };

    document.getElementById('listedItems').textContent = stats.listedItems;
    document.getElementById('completedSwaps').textContent = stats.completedSwaps;
    document.getElementById('userRating').textContent = `${stats.rating}/5`;
    document.getElementById('communityScore').textContent = `${stats.communityScore}%`;
}

// Load user's listings
function loadMyListings() {
    // Simulate API call for listings
    const listings = [
        {
            id: 1,
            title: 'Denim Jacket',
            image: 'https://via.placeholder.com/200',
            status: 'active',
            price: 'Points: 500'
        },
        // Add more sample listings
    ];

    const listingsContainer = document.getElementById('myListings');
    listingsContainer.innerHTML = listings.map(item => createItemCard(item)).join('');
}

// Load user's purchases
function loadMyPurchases() {
    // Simulate API call for purchases
    const purchases = [
        {
            id: 1,
            title: 'Vintage T-Shirt',
            image: 'https://via.placeholder.com/200',
            status: 'completed',
            date: '2024-01-15'
        },
        // Add more sample purchases
    ];

    const purchasesContainer = document.getElementById('myPurchases');
    purchasesContainer.innerHTML = purchases.map(item => createItemCard(item)).join('');
}

// Load active swaps
function loadActiveSwaps() {
    // Simulate API call for active swaps
    const swaps = [
        {
            id: 1,
            offered: {
                title: 'Denim Jacket',
                image: 'https://via.placeholder.com/80'
            },
            requested: {
                title: 'Leather Boots',
                image: 'https://via.placeholder.com/80'
            },
            status: 'pending'
        },
        // Add more sample swaps
    ];

    const swapsContainer = document.getElementById('activeSwaps');
    swapsContainer.innerHTML = swaps.map(swap => createSwapItem(swap)).join('');
}

// Create item card HTML
function createItemCard(item) {
    return `
        <div class="item-card" data-id="${item.id}">
            <img src="${item.image}" alt="${item.title}" class="item-image">
            <div class="item-details">
                <h3 class="item-title">${item.title}</h3>
                <span class="item-status status-${item.status}">${item.status}</span>
                ${item.price ? `<p class="item-price">${item.price}</p>` : ''}
                ${item.date ? `<p class="item-date">Purchased: ${item.date}</p>` : ''}
            </div>
        </div>
    `;
}

// Create swap item HTML
function createSwapItem(swap) {
    return `
        <div class="swap-item" data-id="${swap.id}">
            <div class="swap-images">
                <img src="${swap.offered.image}" alt="${swap.offered.title}" class="swap-image">
                <i class="fas fa-exchange-alt"></i>
                <img src="${swap.requested.image}" alt="${swap.requested.title}" class="swap-image">
            </div>
            <div class="swap-details">
                <h4>${swap.offered.title} ↔ ${swap.requested.title}</h4>
                <span class="item-status status-${swap.status}">${swap.status}</span>
            </div>
            <div class="swap-actions">
                <button class="btn-accept" onclick="handleSwap(${swap.id}, 'accept')">Accept</button>
                <button class="btn-reject" onclick="handleSwap(${swap.id}, 'reject')">Reject</button>
            </div>
        </div>
    `;
}



// Handle swap actions
async function handleSwap(swapId, action) {
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Refresh active swaps
        loadActiveSwaps();
        
        alert(`Swap ${action}ed successfully!`);
    } catch (error) {
        alert(`Failed to ${action} swap. Please try again.`);
    }
}

// Handle logout
document.getElementById('logoutBtn')?.addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
});

// Mobile menu toggle
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });
}

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
    setupMobileMenu();
});
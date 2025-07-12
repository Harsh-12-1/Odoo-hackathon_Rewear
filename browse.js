// Browse Page JavaScript

// DOM Elements
const itemsContainer = document.querySelector('.items-container');
const sortSelect = document.getElementById('sortBy');
const filterCheckboxes = document.querySelectorAll('.filter-group input[type="checkbox"]');
const colorDots = document.querySelectorAll('.color-dot');
const applyFiltersBtn = document.querySelector('.apply-filters');
const loginBtn = document.getElementById('loginBtn');

// State Management
let currentFilters = {
    size: [],
    condition: [],
    color: [],
    category: '',
    exchangeType: ['points', 'swap', 'purchase']
};

let currentSort = 'newest';
let items = [];

// Initialize Browse Page
function initBrowsePage() {
    checkAuth();
    setupEventListeners();
    loadItems();
}

// Authentication Check
function checkAuth() {
    const token = localStorage.getItem('userToken');
    if (token) {
        loginBtn.textContent = 'Logout';
        loginBtn.href = '#';
        loginBtn.addEventListener('click', handleLogout);
    }
}

// Event Listeners Setup
function setupEventListeners() {
    // Sort Change Handler
    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        sortItems();
    });

    // Filter Checkboxes
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateFilters();
        });
    });

    // Color Selection
    colorDots.forEach(dot => {
        dot.addEventListener('click', () => {
            dot.classList.toggle('selected');
            updateFilters();
        });
    });

    // Apply Filters Button
    applyFiltersBtn.addEventListener('click', applyFilters);

    // Category Links
    document.querySelectorAll('.dropdown-content a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = e.target.getAttribute('href').substring(1);
            filterByCategory(category);
        });
    });
}

// Load Items
function loadItems() {
    // Simulated API call to get items
    // In a real application, this would be an API endpoint
    const mockItems = [
        {
            id: 1,
            title: 'Blue Denim Jacket',
            category: 'jackets',
            size: 'M',
            condition: 'like-new',
            color: 'blue',
            points: 100,
            price: 499,
            exchangeOptions: {
                allowPoints: true,
                allowSwap: true,
                allowPurchase: true
            },
            image: 'https://via.placeholder.com/250x300'
        },
        {
            id: 2,
            title: 'White T-Shirt',
            category: 'tshirts',
            size: 'L',
            condition: 'good',
            color: 'white',
            points: 50,
            price: 299,
            exchangeOptions: {
                allowPoints: true,
                allowSwap: true,
                allowPurchase: true
            },
            image: 'https://via.placeholder.com/250x300'
        },
        // Add more mock items here
    ];

    items = mockItems;
    renderItems(items);
}

// Render Items
function renderItems(itemsToRender) {
    itemsContainer.innerHTML = itemsToRender.map(item => `
        <div class="item-card" data-category="${item.category}">
            <img src="${item.image}" alt="${item.title}" class="item-image">
            <div class="item-info">
                <h3 class="item-title">${item.title}</h3>
                <div class="item-meta">
                    <span>${item.size} · ${item.condition}</span>
                    <div class="exchange-options">
                        ${item.exchangeOptions.allowPoints ? `<span class="item-points">${item.points} points</span>` : ''}
                        ${item.exchangeOptions.allowPurchase ? `<span class="item-price">₹${item.price}</span>` : ''}
                        ${item.exchangeOptions.allowSwap ? '<span class="item-swap"><i class="fas fa-exchange-alt"></i> Swap</span>' : ''}
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Add click event listeners to cards
    document.querySelectorAll('.item-card').forEach(card => {
        card.addEventListener('click', () => {
            window.location.href = `product.html?id=${card.dataset.id}`;
        });
    });
}

// Update Filters
function updateFilters() {
    currentFilters.size = Array.from(document.querySelectorAll('input[type="checkbox"]'))
        .filter(cb => cb.value.match(/^(xs|s|m|l|xl)$/) && cb.checked)
        .map(cb => cb.value);

    currentFilters.condition = Array.from(document.querySelectorAll('input[type="checkbox"]'))
        .filter(cb => cb.value.match(/^(new|like-new|good|fair)$/) && cb.checked)
        .map(cb => cb.value);

    currentFilters.color = Array.from(document.querySelectorAll('.color-dot.selected'))
        .map(dot => dot.dataset.color);

    currentFilters.exchangeType = Array.from(document.querySelectorAll('input[type="checkbox"]'))
        .filter(cb => ['points', 'swap', 'purchase'].includes(cb.value) && cb.checked)
        .map(cb => cb.value);
}

// Apply Filters
function applyFilters() {
    let filteredItems = items;

    // Apply size filter
    if (currentFilters.size.length > 0) {
        filteredItems = filteredItems.filter(item => 
            currentFilters.size.includes(item.size.toLowerCase()));
    }

    // Apply condition filter
    if (currentFilters.condition.length > 0) {
        filteredItems = filteredItems.filter(item => 
            currentFilters.condition.includes(item.condition));
    }

    // Apply color filter
    if (currentFilters.color.length > 0) {
        filteredItems = filteredItems.filter(item => 
            currentFilters.color.includes(item.color));
    }

    // Apply category filter
    if (currentFilters.category) {
        filteredItems = filteredItems.filter(item => 
            item.category === currentFilters.category);
    }

    // Apply exchange type filter
    if (currentFilters.exchangeType.length > 0) {
        filteredItems = filteredItems.filter(item => {
            return currentFilters.exchangeType.some(type => {
                switch(type) {
                    case 'points': return item.exchangeOptions.allowPoints;
                    case 'swap': return item.exchangeOptions.allowSwap;
                    case 'purchase': return item.exchangeOptions.allowPurchase;
                    default: return false;
                }
            });
        });
    }

    renderItems(filteredItems);
}

// Filter by Category
function filterByCategory(category) {
    currentFilters.category = category;
    applyFilters();

    // Update UI to show active category
    document.querySelectorAll('.dropdown-content a').forEach(link => {
        const linkCategory = link.getAttribute('href').substring(1);
        if (linkCategory === category) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Sort Items
function sortItems() {
    const sortedItems = [...items];

    switch (currentSort) {
        case 'points-low':
            sortedItems.sort((a, b) => a.points - b.points);
            break;
        case 'points-high':
            sortedItems.sort((a, b) => b.points - a.points);
            break;
        case 'price-low':
            sortedItems.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedItems.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
        default:
            // Assuming items are already sorted by newest first
            break;
    }

    renderItems(sortedItems);
}

// Logout Handler
function handleLogout() {
    localStorage.removeItem('userToken');
    window.location.href = 'login.html';
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', initBrowsePage);
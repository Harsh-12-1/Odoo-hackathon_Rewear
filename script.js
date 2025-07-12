// Check authentication status


// Mobile menu toggle
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
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
}

// Update navigation based on auth status
function updateNavigation() {
    const user = JSON.parse(localStorage.getItem('user'));
    const navLinks = document.querySelector('.nav-links');
    
    if (navLinks) {
        if (user) {
            // Show authenticated navigation
            navLinks.innerHTML = `
                <a href="index.html"${window.location.pathname.endsWith('index.html') ? ' class="active"' : ''}>Home</a>
                <a href="browse.html"${window.location.pathname.endsWith('browse.html') ? ' class="active"' : ''}>Browse</a>
                <a href="list-item.html"${window.location.pathname.endsWith('list-item.html') ? ' class="active"' : ''}>List Item</a>
                <a href="dashboard.html"${window.location.pathname.endsWith('dashboard.html') ? ' class="active"' : ''}>Dashboard</a>
                <a href="settings.html"${window.location.pathname.endsWith('settings.html') ? ' class="active"' : ''}>Settings</a>
            `;
        } else {
            // Show public navigation
            navLinks.innerHTML = `
                <a href="index.html"${window.location.pathname.endsWith('index.html') ? ' class="active"' : ''}>Home</a>
                <a href="browse.html"${window.location.pathname.endsWith('browse.html') ? ' class="active"' : ''}>Browse</a>
                <a href="login.html"${window.location.pathname.endsWith('login.html') ? ' class="active"' : ''}>Login</a>
                <a href="register.html"${window.location.pathname.endsWith('register.html') ? ' class="active"' : ''} class="signup-btn">Sign Up</a>
            `;
        }
    }
}

// Load featured items on homepage
function loadFeaturedItems() {
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        const featuredItems = [
            {
                image: 'https://via.placeholder.com/300x400',
                title: 'Vintage Denim Jacket',
                size: 'M',
                condition: 'Like New',
                points: 500
            },
            {
                image: 'https://via.placeholder.com/300x400',
                title: 'Summer Dress',
                size: 'S',
                condition: 'New',
                price: 1200
            },
            {
                image: 'https://via.placeholder.com/300x400',
                title: 'Casual Shirt',
                size: 'L',
                condition: 'Good',
                points: 300
            }
        ];

        carousel.innerHTML = featuredItems.map(item => `
            <div class="item-card">
                <img src="${item.image}" alt="${item.title}">
                <div class="item-info">
                    <h3>${item.title}</h3>
                    <p>Size: ${item.size} | Condition: ${item.condition}</p>
                    ${item.points ? `<p class="points">Points: ${item.points}</p>` : ''}
                    ${item.price ? `<p class="price">₹${item.price}</p>` : ''}
                    <button class="swap-btn">View Details</button>
                </div>
            </div>
        `).join('');
    }
}

// Initialize page
function initializePage() {
    checkAuth();
    setupMobileMenu();
    updateNavigation();
    loadFeaturedItems();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);

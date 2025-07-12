// Check authentication status
function checkAuth() {
    const user = localStorage.getItem('user');
    if (!user) {
        window.location.href = 'login.html';
        return null;
    }
    return JSON.parse(user);
}

// Initialize product page
function initProductPage() {
    setupImageGallery();
    setupSwapModal();
    loadSimilarItems();
    setupExchangeButtons();
}

// Image Gallery Functionality
function setupImageGallery() {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Update main image
            mainImage.src = this.src;
            
            // Update active thumbnail
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Swap Modal Functionality
function setupSwapModal() {
    const modal = document.getElementById('swapModal');
    const swapBtn = document.querySelector('.swap-btn');
    const closeBtn = document.querySelector('.close-modal');
    const submitSwapBtn = document.querySelector('.submit-swap-btn');

    // Load user's items for swap
    loadUserItems();

    swapBtn?.addEventListener('click', () => {
        if (!checkAuth()) return;
        modal.style.display = 'block';
    });

    closeBtn?.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    submitSwapBtn?.addEventListener('click', handleSwapSubmission);
}

// Load user's items for swap
function loadUserItems() {
    // Simulate API call to get user's items
    const userItems = [
        {
            id: 1,
            image: 'https://via.placeholder.com/150',
            title: 'Leather Jacket'
        },
        {
            id: 2,
            image: 'https://via.placeholder.com/150',
            title: 'Vintage Sweater'
        },
        // Add more items as needed
    ];

    const itemsGrid = document.querySelector('.your-items-grid');
    if (!itemsGrid) return;

    itemsGrid.innerHTML = userItems.map(item => `
        <div class="item-card" data-id="${item.id}">
            <img src="${item.image}" alt="${item.title}">
            <p>${item.title}</p>
            <button class="select-item-btn">Select</button>
        </div>
    `).join('');

    // Add click handlers for item selection
    setupItemSelection();
}

// Handle item selection for swap
function setupItemSelection() {
    const itemCards = document.querySelectorAll('.item-card');
    let selectedItem = null;

    itemCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove previous selection
            itemCards.forEach(c => c.classList.remove('selected'));
            
            // Add new selection
            this.classList.add('selected');
            selectedItem = this.dataset.id;
        });
    });
}

// Handle swap submission
async function handleSwapSubmission() {
    const selectedItem = document.querySelector('.item-card.selected');
    const message = document.getElementById('swapMessage').value;

    if (!selectedItem) {
        alert('Please select an item to swap');
        return;
    }

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Close modal and show success message
        document.getElementById('swapModal').style.display = 'none';
        alert('Swap proposal sent successfully!');

        // Reset form
        document.getElementById('swapMessage').value = '';
        document.querySelector('.item-card.selected')?.classList.remove('selected');
    } catch (error) {
        alert('Failed to send swap proposal. Please try again.');
    }
}

// Load similar items
function loadSimilarItems() {
    // Simulate API call to get similar items
    const similarItems = [
        {
            id: 1,
            image: 'https://via.placeholder.com/250',
            title: 'Blue Denim Jacket',
            points: 450,
            price: 399,
            exchangeOptions: {
                allowPoints: true,
                allowSwap: true,
                allowPurchase: true
            }
        },
        {
            id: 2,
            image: 'https://via.placeholder.com/250',
            title: 'Leather Jacket',
            points: 600,
            price: 799,
            exchangeOptions: {
                allowPoints: true,
                allowSwap: true,
                allowPurchase: true
            }
        },
        // Add more items as needed
    ];

    const itemsGrid = document.querySelector('.items-grid');
    if (!itemsGrid) return;

    itemsGrid.innerHTML = similarItems.map(item => `
        <div class="item-card" onclick="window.location.href='product.html?id=${item.id}'">
            <img src="${item.image}" alt="${item.title}" class="item-image">
            <div class="item-details">
                <h3>${item.title}</h3>
                <div class="exchange-options">
                    ${item.exchangeOptions.allowPoints ? `<span class="points">${item.points} points</span>` : ''}
                    ${item.exchangeOptions.allowPurchase ? `<span class="price">₹${item.price}</span>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// Setup exchange buttons
function setupExchangeButtons() {
    const redeemBtn = document.querySelector('.redeem-btn');
    const purchaseBtn = document.querySelector('.purchase-btn');
    
    redeemBtn?.addEventListener('click', async () => {
        if (!checkAuth()) return;

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert('Item redeemed successfully!');
            window.location.href = 'dashboard.html';
        } catch (error) {
            alert('Failed to redeem item. Please try again.');
        }
    });

    purchaseBtn?.addEventListener('click', async () => {
        if (!checkAuth()) return;

        try {
            // Simulate API call for purchase
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert('Purchase successful! The seller will be notified.');
            window.location.href = 'dashboard.html';
        } catch (error) {
            alert('Failed to complete purchase. Please try again.');
        }
    });
}

// Get product details from URL
function getProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Simulate API call to get product details
    // In a real application, you would fetch this data from your backend
    return {
        id: productId || 1,
        title: 'Vintage Denim Jacket',
        description: 'Classic vintage denim jacket in excellent condition.',
        category: 'Outerwear',
        size: 'M',
        condition: 'Excellent',
        points: 500,
        price: 499,
        exchangeOptions: {
            allowPoints: true,
            allowSwap: true,
            allowPurchase: true
        }
    };
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', initProductPage);
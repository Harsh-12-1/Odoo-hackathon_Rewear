// Check authentication status
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = 'login.html';
        return null;
    }
    return user;
}

// Initialize page
function initializePage() {
    const user = checkAuth();
    if (!user) return;

    // Load mock user data
    const mockUserData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+91 9876543210',
        address: '123 Main Street\nBangalore, Karnataka 560001',
        balance: 2500
    };

    // Populate form fields
    document.getElementById('name').value = mockUserData.name;
    document.getElementById('email').value = mockUserData.email;
    document.getElementById('phone').value = mockUserData.phone;
    document.getElementById('address').value = mockUserData.address;
    document.querySelector('.balance-amount').textContent = `₹${mockUserData.balance}`;

    // Setup event listeners
    setupEventListeners();
}

function setupEventListeners() {
    // Form submission
    document.getElementById('settings-form').addEventListener('submit', handleFormSubmit);

    // Add funds button
    document.querySelector('.add-funds-btn').addEventListener('click', handleAddFunds);

    // Delete account button
    document.getElementById('delete-account-btn').addEventListener('click', handleDeleteAccount);

    // Logout button
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
}

function handleFormSubmit(event) {
    event.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value
    };

    // Simulate API call
    setTimeout(() => {
        alert('Settings updated successfully!');
    }, 500);
}

function handleAddFunds() {
    const amount = prompt('Enter amount to add (in ₹):', '1000');
    if (amount && !isNaN(amount)) {
        // Simulate API call
        setTimeout(() => {
            const currentBalance = parseInt(document.querySelector('.balance-amount').textContent.slice(1));
            const newBalance = currentBalance + parseInt(amount);
            document.querySelector('.balance-amount').textContent = `₹${newBalance}`;
            alert(`Successfully added ₹${amount} to your balance!`);
        }, 500);
    }
}

function handleDeleteAccount() {
    const confirmation = confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (confirmation) {
        const password = prompt('Please enter your password to confirm account deletion:');
        if (password) {
            // Simulate API call
            setTimeout(() => {
                localStorage.removeItem('user');
                window.location.href = 'login.html';
            }, 500);
        }
    }
}

function handleLogout() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);
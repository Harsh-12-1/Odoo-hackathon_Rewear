// Toggle password visibility
document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', function() {
        const input = this.previousElementSibling;
        if (input.type === 'password') {
            input.type = 'text';
            this.classList.remove('fa-eye');
            this.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            this.classList.remove('fa-eye-slash');
            this.classList.add('fa-eye');
        }
    });
});

// Form validation and submission
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Basic validation
    if (!username || !password) {
        showError('Please fill in all fields');
        return;
    }

    // Simulate login API call
    login(username, password);
});

// Registration form handling (if present)
document.getElementById('registerForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Basic validation
    if (!username || !email || !password || !confirmPassword) {
        showError('Please fill in all fields');
        return;
    }

    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return;
    }

    if (password.length < 8) {
        showError('Password must be at least 8 characters long');
        return;
    }

    // Email validation
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }

    // Simulate registration API call
    register(username, email, password);
});

// Social login handlers
document.querySelector('.google')?.addEventListener('click', () => {
    // Implement Google OAuth login
    console.log('Google login clicked');
});

document.querySelector('.facebook')?.addEventListener('click', () => {
    // Implement Facebook OAuth login
    console.log('Facebook login clicked');
});

// Helper functions
function showError(message) {
    // Create error element if it doesn't exist
    let errorDiv = document.querySelector('.auth-error');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'auth-error';
        const form = document.querySelector('.auth-form');
        form.insertBefore(errorDiv, form.firstChild);
    }

    errorDiv.textContent = message;
    errorDiv.style.display = 'block';

    // Hide error after 3 seconds
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 3000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// API call simulations
async function login(username, password) {
    try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // For demo purposes, check if it's an admin login
        const isAdmin = username.toLowerCase() === 'admin' && password === 'admin123';
        const userData = {
            username,
            role: isAdmin ? 'admin' : 'user'
        };

        localStorage.setItem('user', JSON.stringify(userData));
        
        // Redirect based on role
        if (isAdmin) {
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'dashboard.html';
        }
    } catch (error) {
        showError('Login failed. Please try again.');
    }
}

async function register(username, email, password) {
    try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // For demo purposes, always succeed
        localStorage.setItem('user', JSON.stringify({ username, email }));
        window.location.href = 'dashboard.html';
    } catch (error) {
        showError('Registration failed. Please try again.');
    }
}

// Add loading state to buttons
function setLoading(button, isLoading) {
    if (isLoading) {
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    } else {
        button.disabled = false;
        button.innerHTML = button.getAttribute('data-original-text');
    }
}

// Store original button text
document.querySelectorAll('button[type="submit"]').forEach(button => {
    button.setAttribute('data-original-text', button.innerHTML);
});
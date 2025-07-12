// Check if user is authenticated
function checkAuth() {
    const user = localStorage.getItem('user');
    if (!user) {
        window.location.href = 'login.html';
        return null;
    }
    return JSON.parse(user);
}

// Initialize the page
function initializePage() {
    const user = checkAuth();
    if (!user) return;
    
    setupImageUpload();
    setupTagsInput();
    setupFormValidation();
    setupExchangePreferences();
}

// Handle image upload and preview
function setupImageUpload() {
    const imageUpload = document.getElementById('imageUpload');
    const imagePreview = document.getElementById('imagePreview');
    const uploadBox = document.querySelector('.image-upload-box');

    // Handle drag and drop
    uploadBox.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadBox.style.borderColor = '#4CAF50';
    });

    uploadBox.addEventListener('dragleave', () => {
        uploadBox.style.borderColor = '#ddd';
    });

    uploadBox.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadBox.style.borderColor = '#ddd';
        const files = e.dataTransfer.files;
        handleFiles(files);
    });

    // Handle click upload
    imageUpload.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });

    function handleFiles(files) {
        if (files.length > 5) {
            alert('You can only upload up to 5 images');
            return;
        }

        Array.from(files).forEach(file => {
            if (!file.type.startsWith('image/')) {
                alert('Please upload only image files');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const previewItem = document.createElement('div');
                previewItem.className = 'preview-item';
                previewItem.innerHTML = `
                    <img src="${e.target.result}" alt="Preview">
                    <span class="remove-image">
                        <i class="fas fa-times"></i>
                    </span>
                `;

                previewItem.querySelector('.remove-image').addEventListener('click', () => {
                    previewItem.remove();
                });

                imagePreview.appendChild(previewItem);
            };
            reader.readAsDataURL(file);
        });
    }
}

// Handle tags input
function setupTagsInput() {
    const tagInput = document.getElementById('tagInput');
    const tagsContainer = document.getElementById('tagsContainer');
    const tags = new Set();

    tagInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const tag = tagInput.value.trim().toLowerCase();

            if (tag && !tags.has(tag)) {
                tags.add(tag);
                const tagElement = document.createElement('span');
                tagElement.className = 'tag';
                tagElement.innerHTML = `
                    ${tag}
                    <span class="remove-tag">
                        <i class="fas fa-times"></i>
                    </span>
                `;

                tagElement.querySelector('.remove-tag').addEventListener('click', () => {
                    tags.delete(tag);
                    tagElement.remove();
                });

                tagsContainer.appendChild(tagElement);
                tagInput.value = '';
            }
        }
    });
}

// Handle form validation and submission
function setupFormValidation() {
    const form = document.getElementById('listItemForm');
    const saveDraftBtn = document.querySelector('.save-draft-btn');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const formData = collectFormData();
        try {
            // Simulate API call
            await submitItem(formData, false);
            alert('Item listed successfully!');
            window.location.href = 'dashboard.html';
        } catch (error) {
            alert('Error listing item. Please try again.');
        }
    });

    saveDraftBtn.addEventListener('click', async () => {
        const formData = collectFormData();
        try {
            // Simulate API call
            await submitItem(formData, true);
            alert('Draft saved successfully!');
            window.location.href = 'dashboard.html';
        } catch (error) {
            alert('Error saving draft. Please try again.');
        }
    });
}

function validateForm() {
    const requiredFields = [
        'itemTitle',
        'itemCategory',
        'itemSize',
        'itemDescription',
        'itemCondition',
        'itemColor'
    ];

    // Add conditional required fields
    if (document.getElementById('allowPoints').checked) {
        requiredFields.push('pointsValue');
    }
    if (document.getElementById('allowPurchase').checked) {
        requiredFields.push('itemPrice');
    }

    let isValid = true;
    requiredFields.forEach(field => {
        const element = document.getElementById(field);
        if (!element.value.trim()) {
            element.style.borderColor = '#d32f2f';
            isValid = false;
        } else {
            element.style.borderColor = '#ddd';
        }
    });

    const imagePreview = document.getElementById('imagePreview');
    if (imagePreview.children.length < 2) {
        alert('Please upload at least 2 images');
        isValid = false;
    }

    return isValid;
}

function collectFormData() {
    const formData = {
        title: document.getElementById('itemTitle').value,
        category: document.getElementById('itemCategory').value,
        size: document.getElementById('itemSize').value,
        brand: document.getElementById('itemBrand').value,
        description: document.getElementById('itemDescription').value,
        condition: document.getElementById('itemCondition').value,
        color: document.getElementById('itemColor').value,
        tags: Array.from(document.querySelectorAll('.tag')).map(tag => tag.textContent.trim()),
        images: Array.from(document.querySelectorAll('.preview-item img')).map(img => img.src),
        pointsValue: parseInt(document.getElementById('pointsValue').value),
        exchangeOptions: {
            allowPoints: document.getElementById('allowPoints').checked,
            allowSwap: document.getElementById('allowSwap').checked,
            allowPurchase: document.getElementById('allowPurchase').checked,
            price: document.getElementById('itemPrice').value ? parseFloat(document.getElementById('itemPrice').value) : null,
            swapPreferences: Array.from(document.querySelectorAll('input[name="swapCategory"]:checked'))
                .map(input => input.value)
        }
    };

    return formData;
}

// Handle exchange preferences visibility
function setupExchangePreferences() {
    const allowSwap = document.getElementById('allowSwap');
    const allowPoints = document.getElementById('allowPoints');
    const allowPurchase = document.getElementById('allowPurchase');
    const swapPreferences = document.getElementById('swapPreferences');
    const pointsValueGroup = document.getElementById('pointsValueGroup');
    const priceGroup = document.getElementById('priceGroup');

    allowSwap.addEventListener('change', () => {
        swapPreferences.style.display = allowSwap.checked ? 'block' : 'none';
    });

    allowPoints.addEventListener('change', () => {
        pointsValueGroup.style.display = allowPoints.checked ? 'block' : 'none';
        document.getElementById('pointsValue').required = allowPoints.checked;
    });

    allowPurchase.addEventListener('change', () => {
        priceGroup.style.display = allowPurchase.checked ? 'block' : 'none';
        document.getElementById('itemPrice').required = allowPurchase.checked;
    });

    // Initial state
    pointsValueGroup.style.display = allowPoints.checked ? 'block' : 'none';
    priceGroup.style.display = allowPurchase.checked ? 'block' : 'none';
    document.getElementById('pointsValue').required = allowPoints.checked;
    document.getElementById('itemPrice').required = allowPurchase.checked;
}

// Simulate API call
async function submitItem(formData, isDraft) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In a real application, this would be an API call
    console.log('Submitting item:', { ...formData, isDraft });
    return Promise.resolve();
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);
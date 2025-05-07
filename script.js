// script.js

// 1. Event Handling 🎈
document.getElementById('clickMe').addEventListener('click', function() {
    alert('You clicked the button!');
});

const hoverMeDiv = document.getElementById('hoverMe');
hoverMeDiv.addEventListener('mouseover', function() {
    hoverMeDiv.style.backgroundColor = '#007bff';
    hoverMeDiv.style.color = 'white';
    hoverMeDiv.textContent = 'Thanks for hovering!';
});
hoverMeDiv.addEventListener('mouseout', function() {
    hoverMeDiv.style.backgroundColor = '#ffc107';
    hoverMeDiv.style.color = '#212529';
    hoverMeDiv.textContent = 'Hover Over Me';
});

const keypressInput = document.getElementById('keypressInput');
const keypressOutput = document.getElementById('keypressOutput');
keypressInput.addEventListener('keypress', function(event) {
    keypressOutput.textContent = `You pressed: ${event.key}`;
});

const doubleClickButton = document.getElementById('doubleClickMe');
const doubleClickMessage = document.getElementById('doubleClickMessage');
doubleClickButton.addEventListener('dblclick', function() {
    doubleClickMessage.style.display = 'block';
    setTimeout(() => {
        doubleClickMessage.style.display = 'none';
    }, 2000);
});

// Bonus: Long Press (Simple implementation - might not be perfect cross-browser)
let timer;
doubleClickButton.addEventListener('mousedown', function() {
    timer = setTimeout(() => {
        alert('Long press detected!');
    }, 1500); // 1.5 seconds for long press
});
doubleClickButton.addEventListener('mouseup', function() {
    clearTimeout(timer);
});
doubleClickButton.addEventListener('mouseout', function() {
    clearTimeout(timer);
});

// 2. Interactive Elements 🎮
const changeTextButton = document.getElementById('changeTextButton');
const changingTextParagraph = document.getElementById('changingText');
changeTextButton.addEventListener('click', function() {
    if (changingTextParagraph.textContent === 'Initial Text') {
        changingTextParagraph.textContent = 'Text Changed!';
        changeTextButton.textContent = 'Change Back';
    } else {
        changingTextParagraph.textContent = 'Initial Text';
        changeTextButton.textContent = 'Change Text';
    }
});

const imageGallery = document.getElementById('imageGallery');
const selectedImageParagraph = document.getElementById('selectedImage');
imageGallery.addEventListener('click', function(event) {
    if (event.target.tagName === 'IMG') {
        selectedImageParagraph.textContent = `You clicked image ${parseInt(event.target.dataset.index) + 1}`;
    }
});

const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(button => {
    button.addEventListener('click', function() {
        const tabId = this.dataset.tab;

        // Deactivate all buttons and panels
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));

        // Activate the clicked button and corresponding panel
        this.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// 3. Form Validation 📋✅
const form = document.getElementById('myForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const validationMessage = document.getElementById('validationMessage');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    validateForm();
});

function validateForm() {
    let isValid = true;

    // Required field checks
    if (nameInput.value.trim() === '') {
        displayError(nameError, 'Name is required');
        isValid = false;
    } else {
        clearError(nameError);
    }

    if (emailInput.value.trim() === '') {
        displayError(emailError, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
        displayError(emailError, 'Invalid email format');
        isValid = false;
    } else {
        clearError(emailError);
    }

    if (passwordInput.value.trim() === '') {
        displayError(passwordError, 'Password is required');
        isValid = false;
    } else if (passwordInput.value.length < 8) {
        displayError(passwordError, 'Password must be at least 8 characters long');
        isValid = false;
    } else {
        clearError(passwordError);
    }

    if (isValid) {
        validationMessage.textContent = 'Form submitted successfully!';
        validationMessage.style.color = 'green';
        form.reset(); // Clear the form
        setTimeout(() => {
            validationMessage.textContent = '';
        }, 3000);
    } else {
        validationMessage.textContent = 'Please fix the errors above.';
        validationMessage.style.color = 'red';
    }
}

function isValidEmail(email) {
    // Basic email format validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function displayError(element, message) {
    element.textContent = message;
}

function clearError(element) {
    element.textContent = '';
}

// Bonus: Real-time feedback while typing (for password)
passwordInput.addEventListener('input', function() {
    if (passwordInput.value.length < 8) {
        displayError(passwordError, 'Password must be at least 8 characters long');
    } else {
        clearError(passwordError);
    }
});
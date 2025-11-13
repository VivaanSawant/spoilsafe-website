emailjs.init('nIV4LDfAz1wztYSY4');

const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const btnText = submitBtn.querySelector('.btn-text');
const btnLoading = submitBtn.querySelector('.btn-loading');
const successMessage = document.getElementById('success-message');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    toggleButtonState(true);

    const formData = new FormData(form);
    const templateParams = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        company: formData.get('company') || 'Not specified',
        interest: formData.get('interest'),
        message: formData.get('message'),
        date: new Date().toLocaleDateString()
    };

    emailjs.send('service_rhyzlcq', 'template_ta6cit7', templateParams)
        .then(() => {
            form.style.display = 'none';
            successMessage.style.display = 'grid';
        })
        .catch(() => {
            errorMessage.style.display = 'grid';
            setTimeout(() => (errorMessage.style.display = 'none'), 5000);
        })
        .finally(() => toggleButtonState(false));
});

const requiredInputs = form.querySelectorAll('input[required], select[required], textarea[required]');
requiredInputs.forEach((input) => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearFieldError);
});

function toggleButtonState(isSubmitting) {
    submitBtn.disabled = isSubmitting;
    btnText.style.display = isSubmitting ? 'none' : 'inline-flex';
    btnLoading.style.display = isSubmitting ? 'inline-flex' : 'none';
}

function validateField(event) {
    const field = event.target;
    const value = field.value.trim();

    if (!value) {
        showFieldError(field, 'This field is required');
    } else if (field.type === 'email' && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address');
    } else {
        clearFieldError({ target: field });
    }
}

function showFieldError(field, message) {
    clearFieldError({ target: field });
    field.classList.add('error');
    const error = document.createElement('div');
    error.className = 'field-error';
    error.textContent = message;
    field.closest('.form-group').appendChild(error);
}

function clearFieldError(event) {
    const field = event.target;
    field.classList.remove('error');
    const error = field.closest('.form-group').querySelector('.field-error');
    if (error) error.remove();
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


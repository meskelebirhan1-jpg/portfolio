document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');
    const logo = document.querySelector('.logo');
    const toggleMenu = () => {
        navLinksContainer.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    };
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinksContainer.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    if (logo) {
        logo.addEventListener('click', () => {
            if (navLinksContainer.classList.contains('active')) {
                toggleMenu();
            }
        });
    }
    const body = document.body;
    const modeToggle = document.getElementById('mode-toggle');
    const modeIcon = modeToggle ? modeToggle.querySelector('i') : null;
    const loadMode = () => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          const storedPreference = localStorage.getItem('darkMode');
        let initialDarkMode = false;
        if (storedPreference === 'true') {
            initialDarkMode = true;
        } else if (storedPreference === null && prefersDark) {
            initialDarkMode = true;
        }
        if (initialDarkMode) {
            body.classList.add('dark-mode');
            if (modeIcon) {
                modeIcon.classList.remove('fa-moon');
                modeIcon.classList.add('fa-sun');
            }
        } else {
            body.classList.remove('dark-mode');
        }
    };
    const toggleMode = () => {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
         localStorage.setItem('darkMode', isDarkMode);
        if (modeIcon) {
            if (isDarkMode) {
                modeIcon.classList.remove('fa-moon');
                modeIcon.classList.add('fa-sun');
            } else {
                modeIcon.classList.remove('fa-sun');
                modeIcon.classList.add('fa-moon');
            }
        }
    };
    if (modeToggle) {
        modeToggle.addEventListener('click', toggleMode);
    }
    loadMode();
    const hiddenElements = document.querySelectorAll('.hidden');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const delay = Array.from(hiddenElements).indexOf(entry.target) * 150;
                setTimeout(() => {
                    entry.target.classList.add('show');
                }, delay);
            } else {
                entry.target.classList.remove('show');
            }
        });
    }, {
        threshold: 0.1
    });
    hiddenElements.forEach((el) => observer.observe(el));
    const seeMoreBtn = document.querySelector('.see-more-btn');
    if (seeMoreBtn) {
        seeMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }
    const contactForm = document.getElementById('contact-form'); 
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const status = document.getElementById('form-success-message'); 
    const clearBtn = document.getElementById('clear-btn');
    const submitBtn = document.querySelector('.submit-btn');
    const btnText = document.querySelector('.btn-text');
    const spinnerOverlay = document.querySelector('.spinner-overlay');
    const isValidEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    const setError = (element, message) => {
        const formGroup = element.parentElement;
        const errorDisplay = formGroup.querySelector('.error-message');
        errorDisplay.innerText = message;
        formGroup.classList.add('error');
    }
    const setSuccess = (element) => {
        const formGroup = element.parentElement;
        const errorDisplay = formGroup.querySelector('.error-message');
        errorDisplay.innerText = '';
        formGroup.classList.remove('error');
    }
    const showLoading = () => {
        submitBtn.classList.add('loading');
        btnText.style.opacity = '0';
        spinnerOverlay.classList.remove('hidden');
    };
    const hideLoading = () => {
        submitBtn.classList.remove('loading');
        btnText.style.opacity = '1';
        spinnerOverlay.classList.add('hidden');
    };
    const clearForm = () => {
        contactForm.reset();
        [nameInput, emailInput, messageInput].forEach(input => setSuccess(input));
        status.style.display = 'none';
    }
    const validateInputs = () => {
        let isValid = true;
        const nameValue = nameInput.value.trim();
        const emailValue = emailInput.value.trim();
        const messageValue = messageInput.value.trim();
        if (nameValue === '') {
            setError(nameInput, '⚠️ Name is required');
            isValid = false;
        } else if (nameValue.length < 2 || nameValue.length > 30) {
            setError(nameInput, '⚠️ Name must be between 2 and 30 characters');
            isValid = false;
        } else if (!/^[a-zA-Z\s]+$/.test(nameValue)) {
            setError(nameInput, '⚠️ Name should only contain letters');
            isValid = false;
        } else {
            setSuccess(nameInput);
        }
        if (emailValue === '') {
            setError(emailInput, '❌ Email is required');
            isValid = false;
        } else if (!isValidEmail(emailValue)) {
            setError(emailInput, '❌ Please provide a valid email address');
            isValid = false;
        } else {
            setSuccess(emailInput);
        }
        if (messageValue === '') {
            setError(messageInput, '✉️ Message is required');
            isValid = false;
        } else if (messageValue.length < 2) {
             setError(messageInput, '✉️ Message must contain at least 2 characters');
            isValid = false;
        } else {
            setSuccess(messageInput);
        }
        return isValid;
    }
     if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            status.style.display = 'none';
            if (validateInputs()) {
                showLoading();
                setTimeout(() => {
                    status.innerText = '✅ Message sent successfully!';
                    status.style.display = 'block';
                    hideLoading();
                    clearForm();
                    setTimeout(() => {
                        status.style.display = 'none';
                    }, 5000); 
                }, 2000); 
            }
        });
    }
    if (clearBtn) {
        clearBtn.addEventListener('click', clearForm);
    }
});    
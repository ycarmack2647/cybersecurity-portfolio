// Navigation scroll effect
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animate skill progress bars on scroll
const animateSkills = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target;
                const progressValue = progress.getAttribute('data-progress');
                if (progressValue) {
                    setTimeout(() => {
                        progress.style.width = progressValue + '%';
                    }, 100);
                    observer.unobserve(progress);
                }
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => {
        const progressValue = bar.getAttribute('data-progress');
        if (progressValue) {
            bar.style.width = '0%';
            observer.observe(bar);
        }
    });
};

// Initialize skill animations
document.addEventListener('DOMContentLoaded', () => {
    animateSkills();
});

// Contact form validation and submission
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const showError = (fieldId, message) => {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + '-error');
    if (errorElement) {
        errorElement.textContent = message;
        field.style.borderColor = '#ff006e';
    }
};

const clearError = (fieldId) => {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + '-error');
    if (errorElement) {
        errorElement.textContent = '';
        field.style.borderColor = '';
    }
};

const validateForm = () => {
    let isValid = true;
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Clear previous errors
    clearError('name');
    clearError('email');
    clearError('subject');
    clearError('message');

    // Validate name
    if (name === '') {
        showError('name', 'Name is required');
        isValid = false;
    } else if (name.length < 2) {
        showError('name', 'Name must be at least 2 characters');
        isValid = false;
    }

    // Validate email
    if (email === '') {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate subject
    if (subject === '') {
        showError('subject', 'Subject is required');
        isValid = false;
    } else if (subject.length < 3) {
        showError('subject', 'Subject must be at least 3 characters');
        isValid = false;
    }

    // Validate message
    if (message === '') {
        showError('message', 'Message is required');
        isValid = false;
    } else if (message.length < 10) {
        showError('message', 'Message must be at least 10 characters');
        isValid = false;
    }

    return isValid;
};

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim()
    };

    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<span>Sending...</span>';
    submitButton.disabled = true;

    // Send form data to backend API
    try {
        // Automatically detects if running locally or on Netlify
        const API_URL = window.location.hostname === 'localhost' 
            ? 'http://localhost:3000/api/contact'  // Local Express server
            : '/api/contact'; // Netlify serverless function (or production)

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok && result.success) {
            showFormMessage('success', 'Thank you! Your message has been sent successfully. I will get back to you soon.');
            contactForm.reset();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        } else {
            throw new Error(result.error || 'Form submission failed');
        }

    } catch (error) {
        showFormMessage('error', 'Sorry, there was an error sending your message. Please try again later.');
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }
});

const showFormMessage = (type, message) => {
    formMessage.className = `form-message ${type}`;
    formMessage.textContent = message;
    formMessage.style.display = 'block';

    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
};

// Real-time validation
document.getElementById('name').addEventListener('blur', () => {
    const name = document.getElementById('name').value.trim();
    if (name !== '' && name.length < 2) {
        showError('name', 'Name must be at least 2 characters');
    } else {
        clearError('name');
    }
});

document.getElementById('email').addEventListener('blur', () => {
    const email = document.getElementById('email').value.trim();
    if (email !== '' && !validateEmail(email)) {
        showError('email', 'Please enter a valid email address');
    } else {
        clearError('email');
    }
});

document.getElementById('subject').addEventListener('blur', () => {
    const subject = document.getElementById('subject').value.trim();
    if (subject !== '' && subject.length < 3) {
        showError('subject', 'Subject must be at least 3 characters');
    } else {
        clearError('subject');
    }
});

document.getElementById('message').addEventListener('blur', () => {
    const message = document.getElementById('message').value.trim();
    if (message !== '' && message.length < 10) {
        showError('message', 'Message must be at least 10 characters');
    } else {
        clearError('message');
    }
});

// Fade in animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in to sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(section);
    });
});

// Update active navigation link on scroll
const updateActiveNav = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
};

window.addEventListener('scroll', updateActiveNav);

// Resume PDF loading and error handling
document.addEventListener('DOMContentLoaded', () => {
    const resumeIframe = document.getElementById('resume-iframe');
    const resumePlaceholder = document.getElementById('resume-placeholder');
    const resumeEmbed = document.getElementById('resume-embed');
    const errorMessage = document.getElementById('resume-error-message');
    
    if (resumeIframe) {
        // Check if PDF file exists and loads properly
        resumeIframe.onload = () => {
            // PDF loaded successfully
            resumePlaceholder.style.display = 'none';
            resumeIframe.style.display = 'block';
        };
        
        resumeIframe.onerror = () => {
            // Error loading PDF
            resumeIframe.style.display = 'none';
            resumePlaceholder.style.display = 'flex';
            errorMessage.textContent = 'Unable to load resume preview. The PDF file may not be found. Please use the "View Online" or "Download Resume" button above.';
        };
        
        // Fallback: Check after a delay if iframe didn't load
        setTimeout(() => {
            try {
                // Try to access iframe content - if it fails, show placeholder
                const iframeDoc = resumeIframe.contentDocument || resumeIframe.contentWindow.document;
                if (!iframeDoc || iframeDoc.body.innerHTML === '') {
                    throw new Error('PDF not loaded');
                }
            } catch (e) {
                // Cross-origin or loading error - show placeholder
                resumeIframe.style.display = 'none';
                resumePlaceholder.style.display = 'flex';
                errorMessage.textContent = 'Resume preview is not available. Please use the "View Online" or "Download Resume" button above to view your resume.';
            }
        }, 2000);
        
        // Also check if file exists via fetch
        fetch('Cloud Security Professional .pdf', { method: 'HEAD' })
            .then(response => {
                if (!response.ok) {
                    throw new Error('File not found');
                }
            })
            .catch(() => {
                // File doesn't exist or can't be accessed
                resumeIframe.style.display = 'none';
                resumePlaceholder.style.display = 'flex';
                errorMessage.textContent = 'Resume file not found. Please ensure "Cloud Security Professional .pdf" is in the project directory.';
            });
    }
});


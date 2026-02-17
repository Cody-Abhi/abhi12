// Wait for window load
window.onload = function () {
    // Hide Loader
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }

    // Scroll Animation Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });
};

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('open');
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('open');
    });
});


// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form Validation and Console Logging
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    // Log while typing
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', (e) => {
            console.log(`[Contact Form] Typing in ${e.target.name}:`, e.target.value);
        });
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Capture data
        const formData = new FormData(contactForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        console.log('--- Contact Form Submitted ---');
        console.log('Form Data:', data);
        console.log('------------------------------');

        alert('Thank you for your message! Check the console to see the captured data.');
        contactForm.reset();
    });
}

const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    const emailInput = newsletterForm.querySelector('input[type="email"]');

    // Log while typing
    if (emailInput) {
        emailInput.addEventListener('input', (e) => {
            console.log(`[Newsletter] Typing email:`, e.target.value);
        });
    }

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();

        console.log('--- Newsletter Subscription ---');
        console.log('Email:', emailInput.value);
        console.log('-------------------------------');

        alert('Thank you for feedback!');
        newsletterForm.reset();
    });
}

// --- New Features Logic ---

// 1. Scroll Progress Bar
window.addEventListener("scroll", () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById("scroll-progress");
    if (progressBar) {
        progressBar.style.width = scrolled + "%";
    }
});

// 2. Dark/Light Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check local storage
if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
    if (themeToggle) themeToggle.textContent = '☀️';
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');
        themeToggle.textContent = isLight ? '☀️' : '🌙';
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        console.log(`[Theme] Toggled to ${isLight ? 'light' : 'dark'} mode`);
    });
}

// 3. Quiz Modal Logic
const quizModal = document.getElementById('quiz-modal');
const uploadModal = document.getElementById('upload-modal');

function openQuiz() {
    if (quizModal) {
        quizModal.style.display = 'flex';
        quizModal.classList.add('fade-in-up');
    }
}

function closeQuiz() {
    if (quizModal) quizModal.style.display = 'none';
}

function quizAnswer(answer) {
    let recommendation = "";
    if (answer === 'mountain') recommendation = "We recommend our Himalayan Trek package!";
    else if (answer === 'beach') recommendation = "Try our Maldives Island Getaway!";
    else if (answer === 'forest') recommendation = "Explore the Amazon Rainforest tour!";

    alert(`Based on your choice (${answer}), ${recommendation}`);
    console.log(`[Quiz] User chose: ${answer}`);
    closeQuiz();
}

// 4. Testimonial Carousel (Auto-rotation)
const slides = document.querySelectorAll('.testimonial-slide');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) slide.classList.add('active');
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

if (slides.length > 0) {
    setInterval(nextSlide, 5000); // Change every 5 seconds
}

// 5. Typewriter Effect
const typeWriterElement = document.getElementById('typewriter-text');
const textToType = "ADVENTURE";
if (typeWriterElement) {
    typeWriterElement.textContent = "";
    let i = 0;
    function typeWriter() {
        if (i < textToType.length) {
            typeWriterElement.textContent += textToType.charAt(i);
            i++;
            setTimeout(typeWriter, 200);
        } else {
            // Remove cursor effect after typing
            typeWriterElement.style.borderRight = "none";
        }
    }
    // Start after loader
    setTimeout(typeWriter, 1000);
}

// 6. Particle Background (Canvas)
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particlesArray = [];
    const numberOfParticles = 50;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.size > 0.2) this.size -= 0.01; // Shrink
            if (this.size <= 0.2 || this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
            }
        }
        draw() {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}


// Upload Modal Placeholders
function openUploadModal() {
    if (uploadModal) uploadModal.style.display = 'flex';
}
function closeUploadModal() {
    if (uploadModal) uploadModal.style.display = 'none';
}

// Close modals on outside click
window.addEventListener('click', (event) => {
    if (event.target == quizModal) closeQuiz();
    if (event.target == uploadModal) closeUploadModal();
});


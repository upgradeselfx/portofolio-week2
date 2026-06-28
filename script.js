// Scroll Progress Bar
const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrolled + '%';
});

// Real-time Clock
function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').textContent = `${h}:${m}:${s}`;
}
updateClock();
setInterval(updateClock, 1000);

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Close mobile menu if open
            document.getElementById('navLinks').classList.remove('active');
            document.getElementById('hamburger').classList.remove('active');
        }
    });
});

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Dark/Light Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');

// Check saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeIcon.textContent = '';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    themeIcon.textContent = isLight ? '◑' : '◐';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Contact Form Validation
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    
    // Reset errors
    name.classList.remove('error');
    email.classList.remove('error');
    message.classList.remove('error');
    formMessage.textContent = '';
    formMessage.className = 'form-message';
    
    let isValid = true;
    
    // Validate Name
    if (name.value.trim() === '') {
        name.classList.add('error');
        isValid = false;
    }
    
    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        email.classList.add('error');
        isValid = false;
    }
    
    // Validate Message
    if (message.value.trim().length < 10) {
        message.classList.add('error');
        isValid = false;
    }
    
    if (isValid) {
        formMessage.textContent = '> Message sent successfully! (Simulation)';
        formMessage.classList.add('success');
        contactForm.reset();
        
        setTimeout(() => {
            formMessage.textContent = '';
        }, 5000);
    } else {
        formMessage.textContent = '> Error: Please fill all fields correctly.';
        formMessage.classList.add('error');
    }
});

// Console Easter Egg
console.log('%c> SYSTEM_INITIALIZED', 'color: #d4ff00; font-family: monospace; font-size: 14px;');
console.log('%c> Welcome to Mohamad Rosyadi\'s Portfolio v2.0', 'color: #888; font-family: monospace;');
console.log('%c> Built with pure HTML, CSS, and Vanilla JS.', 'color: #888; font-family: monospace;');
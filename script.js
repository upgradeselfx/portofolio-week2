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

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeIcon.textContent = '◑';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    themeIcon.textContent = isLight ? '◑' : '◐';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Projects Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Project Modal
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.querySelector('.modal-close');

const projectData = {
    'stark-puzzle': {
        title: 'Stark Puzzle',
        desc: 'An interactive puzzle game that uses computer vision to track hand gestures in real-time. Players can grab, move, and place puzzle pieces using only their hands in front of a webcam.',
        features: [
            'Real-time hand tracking using MediaPipe Hands',
            'Gesture recognition for grab, move, and release actions',
            'HTML5 Canvas for smooth rendering',
            'Built entirely with vanilla JavaScript',
            'No external frameworks or libraries'
        ],
        status: 'IN_DEVELOPMENT',
        link: 'https://stark-puzzle.vercel.app/'
    },
    'portfolio': {
        title: 'Portfolio Website',
        desc: 'A brutalist-style personal portfolio built as part of Codiora internship tasks. Features dark/light mode toggle, responsive navigation, and interactive form validation.',
        features: [
            'Responsive design with hamburger menu',
            'Dark/Light mode with localStorage persistence',
            'Projects gallery with filtering system',
            'Real-time form validation',
            'Scroll animations and progress bar'
        ],
        status: 'COMPLETED',
        link: window.location.href
    },
    'arisan': {
        title: 'Roda Arisan',
        desc: 'A digital arisan management system that allows families and communities to manage their savings groups online. Features real-time synchronization and automated draw system.',
        features: [
            'Real-time data sync using Firebase',
            'Automated participant rotation system',
            'Draw history and winner tracking',
            'Admin and public access modes',
            'Mobile-responsive interface'
        ],
        status: 'PLANNED',
        link: '#'
    }
};

document.querySelectorAll('.project-card-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const projectId = btn.dataset.project;
        const project = projectData[projectId];
        
        modalBody.innerHTML = `
            <h2>${project.title}</h2>
            <p>${project.desc}</p>
            <p><strong>Features:</strong></p>
            <ul>
                ${project.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
            <p><strong>Status:</strong> ${project.status}</p>
            ${project.link !== '#' ? `<a href="${project.link}" target="_blank" class="btn-primary" style="display: inline-block; margin-top: 20px;">VIEW_PROJECT</a>` : ''}
        `;
        
        modal.classList.add('active');
    });
});

modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// Resume Download
document.getElementById('downloadResume').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Resume download feature coming soon! For now, please contact me via email.');
});

// Enhanced Contact Form Validation
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const formMessage = document.getElementById('formMessage');
const submitBtn = contactForm.querySelector('.submit-btn');
const submitText = document.getElementById('submitText');

function validateName() {
    const value = nameInput.value.trim();
    if (value === '') {
        nameError.textContent = '> Name is required';
        nameInput.classList.add('error');
        nameInput.classList.remove('valid');
        return false;
    } else if (value.length < 2) {
        nameError.textContent = '> Name must be at least 2 characters';
        nameInput.classList.add('error');
        nameInput.classList.remove('valid');
        return false;
    } else {
        nameError.textContent = '';
        nameInput.classList.remove('error');
        nameInput.classList.add('valid');
        return true;
    }
}

function validateEmail() {
    const value = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value === '') {
        emailError.textContent = '> Email is required';
        emailInput.classList.add('error');
        emailInput.classList.remove('valid');
        return false;
    } else if (!emailRegex.test(value)) {
        emailError.textContent = '> Please enter a valid email';
        emailInput.classList.add('error');
        emailInput.classList.remove('valid');
        return false;
    } else {
        emailError.textContent = '';
        emailInput.classList.remove('error');
        emailInput.classList.add('valid');
        return true;
    }
}

function validateMessage() {
    const value = messageInput.value.trim();
    if (value === '') {
        messageError.textContent = '> Message is required';
        messageInput.classList.add('error');
        messageInput.classList.remove('valid');
        return false;
    } else if (value.length < 10) {
        messageError.textContent = '> Message must be at least 10 characters';
        messageInput.classList.add('error');
        messageInput.classList.remove('valid');
        return false;
    } else {
        messageError.textContent = '';
        messageInput.classList.remove('error');
        messageInput.classList.add('valid');
        return true;
    }
}

// Real-time validation
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
messageInput.addEventListener('input', validateMessage);

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();
    
    if (isNameValid && isEmailValid && isMessageValid) {
        submitBtn.disabled = true;
        submitText.textContent = 'SENDING...';
        
        setTimeout(() => {
            formMessage.textContent = '> Message sent successfully! (Simulation)';
            formMessage.classList.remove('error');
            formMessage.classList.add('success');
            contactForm.reset();
            
            nameInput.classList.remove('valid');
            emailInput.classList.remove('valid');
            messageInput.classList.remove('valid');
            
            submitBtn.disabled = false;
            submitText.textContent = 'SEND_MESSAGE';
            
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = 'form-message';
            }, 5000);
        }, 1500);
    } else {
        formMessage.textContent = '> Error: Please fix the errors above';
        formMessage.classList.remove('success');
        formMessage.classList.add('error');
    }
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .about-grid, .contact-form').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Console Easter Egg
console.log('%c> SYSTEM_INITIALIZED', 'color: #d4ff00; font-family: monospace; font-size: 14px;');
console.log('%c> Welcome to Mohamad Rosyadi\'s Portfolio v3.0', 'color: #888; font-family: monospace;');
console.log('%c> Built with pure HTML, CSS, and Vanilla JS.', 'color: #888; font-family: monospace;');
console.log('%c> Features: Projects Gallery, Modal, Filter, Form Validation, Scroll Animations', 'color: #888; font-family: monospace;');

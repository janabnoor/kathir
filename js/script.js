document.addEventListener('DOMContentLoaded', () => {
    // Navigation Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 16, 22, 0.95)';
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = 'rgba(15, 16, 22, 0.3)'; // Cleaner transparent look at top
            navbar.style.padding = '20px 0';
            navbar.style.boxShadow = 'none';
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            // Very simple toggle for now, can be animated later
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = '#0f1016';
                navLinks.style.padding = '20px';
                navLinks.style.borderTop = '1px solid rgba(255,255,255,0.1)';
            }
        });
    }

    // Scroll Reveal Animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });

    // Add CSS for fade-in via JS (or could be in CSS file)
    const style = document.createElement('style');
    style.innerHTML = `
        .fade-in-section {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .fade-in-section.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // Form Submission (Mock)
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Sending...';
            btn.style.opacity = '0.7';

            setTimeout(() => {
                btn.innerText = 'Message Sent!';
                btn.style.backgroundColor = '#4caf50'; // Green success
                btn.style.borderColor = '#4caf50';
                
                setTimeout(() => {
                    form.reset();
                    btn.innerText = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.borderColor = '';
                    btn.style.opacity = '1';
                }, 3000);
            }, 1500);
        });
    }
});

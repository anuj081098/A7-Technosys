// Load Header and Footer
async function loadIncludes() {
    // Load header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        try {
            const response = await fetch('includes/header.html');
            const html = await response.text();
            headerPlaceholder.innerHTML = html;
            // Initialize mobile navigation after header is loaded
            setTimeout(initMobileNav, 100);
        } catch (error) {
            console.error('Error loading header:', error);
            console.log('To fix CORS errors, run a local server: python -m http.server 8000');
            // Try to initialize anyway in case header is inline
            setTimeout(initMobileNav, 100);
        }
    }

    // Load footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        try {
            const response = await fetch('includes/footer.html');
            const html = await response.text();
            footerPlaceholder.innerHTML = html;
        } catch (error) {
            console.error('Error loading footer:', error);
        }
    }
}

// Mobile Navigation Toggle
function initMobileNav() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    console.log('Initializing mobile nav...', { menuToggle, nav });
    
    if (menuToggle && nav) {
        // Remove any existing listeners
        const newMenuToggle = menuToggle.cloneNode(true);
        menuToggle.parentNode.replaceChild(newMenuToggle, menuToggle);
        
        newMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Menu toggle clicked!');
            nav.classList.toggle('active');
            newMenuToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    newMenuToggle.classList.remove('active');
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('header') && nav.classList.contains('active')) {
                nav.classList.remove('active');
                newMenuToggle.classList.remove('active');
            }
        });
    } else {
        console.log('Menu toggle or nav not found. Retrying in 500ms...');
        setTimeout(initMobileNav, 500);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadIncludes();
    // Also try to initialize mobile nav directly in case header is inline
    setTimeout(initMobileNav, 100);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


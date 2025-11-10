// Unified loader for header & footer with file:// fallback
async function loadIncludes() {
    const isFileProtocol = window.location.protocol === 'file:';

    const headerFallbackHTML = `\n<header>\n  <div class="logo-nav">\n    <div class="logo">\n      <a href="index.html"><img src="images/logoa7.png" alt="A7 Technosys - PCB Manufacturing Company Logo" height="54"></a>\n    </div>\n    <nav>\n      <a href="index.html">Home</a>\n      <a href="about.html">About Us</a>\n      <a href="pcb-design.html">PCB Design</a>\n      <a href="manufacturing.html">Manufacturing</a>\n      <a href="products.html">Other Products</a>\n      <a href="industries.html">Industries</a>\n      <a href="blog.html">Blog</a>\n      <a href="gerber-viewer.html">Gerber View</a>\n      <a href="contact.html">Contact</a>\n    </nav>\n    <div class="menu-toggle">\n      <span></span><span></span><span></span>\n    </div>\n  </div>\n</header>`;

    const footerFallbackHTML = `\n<footer>\n  <div class="footer-content">\n    <p>© 2025 A7 Technosys. Headquartered in Delhi/Noida, India. | PCB Design, Manufacturing & Full Assembly.</p>\n    <p><strong>Reg. Address:</strong> 27, 1st Floor, DSIDC Shed, Scheme 3rd, Okhla Industrial Area Phase-2, New Delhi-110020</p>\n    <p><strong>Mfg. Unit:</strong> 8, DSIDC Shed, Scheme 1st, Okhla Industrial Area Phase-2, New Delhi-110020</p>\n    <p><a href="mailto:a7technosys@gmail.com">a7technosys@gmail.com</a> | <a href="tel:+919936531793">+91-9936531793</a> | <a href="https://wa.me/919936531793">WhatsApp</a></p>\n    <p><a href="https://www.a7technosys.com">www.a7technosys.com</a> | <a href="#">Privacy Policy</a></p>\n  </div>\n</footer>`;

    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    // Helper: attempt fetch else fallback
    async function inject(targetEl, url, fallbackHTML, label) {
        if (!targetEl) return;
        if (isFileProtocol) {
            targetEl.innerHTML = fallbackHTML;
            return;
        }
        try {
            const resp = await fetch(url);
            if (!resp.ok) throw new Error(resp.status + ' ' + resp.statusText);
            const html = await resp.text();
            targetEl.innerHTML = html || fallbackHTML;
        } catch (err) {
            console.warn(label + ' load failed, using fallback:', err);
            targetEl.innerHTML = fallbackHTML;
        }
    }

    await Promise.all([
        inject(headerPlaceholder, 'includes/header.html', headerFallbackHTML, 'Header'),
        inject(footerPlaceholder, 'includes/footer.html', footerFallbackHTML, 'Footer')
    ]);

    // Initialize mobile nav after injection
    setTimeout(initMobileNav, 100);
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

// Contact form enhancement (migrated from includes.js now that inline approach removed)
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const name = document.querySelector('input[name="name"]');
        const email = document.querySelector('input[name="email"]');
        const requirements = document.querySelector('textarea[name="requirements"]');

        const nameVal = name ? name.value.trim() : '';
        const emailVal = email ? email.value.trim() : '';
        const requirementsVal = requirements ? requirements.value.trim() : '';

        if (!nameVal || !emailVal || !requirementsVal) {
            e.preventDefault();
            alert('Please fill in all required fields (Name, Email, and Requirements).');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailVal)) {
            e.preventDefault();
            alert('Please enter a valid email address.');
            return false;
        }
    });
}


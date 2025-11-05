// Header and Footer HTML content
const headerHTML = `
<header>
  <div class="logo-nav">
    <div class="logo">
      <a href="index.html"><img src="images/logoa7.png" alt="A7 Technosys - PCB Manufacturing Company Logo" height="54"></a>
    </div>
    <nav>
      <a href="index.html">Home</a>
      <a href="about.html">About Us</a>
      <a href="pcb-design.html">PCB Design</a>
      <a href="manufacturing.html">Manufacturing</a>
      <a href="products.html">Other Products</a>
      <a href="industries.html">Industries</a>
      <a href="blog.html">Blog</a>
      <a href="gerber-viewer.html">Gerber View</a>
      <a href="contact.html">Contact</a>
    </nav>
    <div class="menu-toggle">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</header>
`;

const footerHTML = `
<footer>
  <div class="footer-content">
    <p>© 2025 A7 Technosys. Headquartered in Delhi/Noida, India. | PCB Design, Manufacturing & Full Assembly.</p>
    <p>
      <strong>Reg. Address:</strong> 27, 1st Floor, DSIDC Shed, Scheme 3rd, Okhla Industrial Area Phase-2, New Delhi-110020
    </p>
    <p>
      <strong>Mfg. Unit:</strong> 8, DSIDC Shed, Scheme 1st, Okhla Industrial Area Phase-2, New Delhi-110020
    </p>
    <p>
      <a href="mailto:a7technosys@gmail.com">a7technosys@gmail.com</a> | <a href="tel:+919936531793">+91-9936531793</a> | <a href="https://wa.me/919936531793">WhatsApp</a>
    </p>
    <p>
      <a href="https://www.a7technosys.com">www.a7technosys.com</a> | <a href="#">Privacy Policy</a>
    </p>
  </div>
</footer>
`;

// Load Header and Footer - Works with file:// protocol
function loadIncludes() {
    // Load header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = headerHTML;
    }

    // Load footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerHTML;
    }

    // Initialize mobile navigation after header is loaded
    setTimeout(initMobileNav, 100);
}

// Mobile Navigation Toggle
function initMobileNav() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('header') && nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadIncludes);

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

// Contact form enhancement
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const name = document.querySelector('input[name="name"]').value.trim();
        const email = document.querySelector('input[name="email"]').value.trim();
        const requirements = document.querySelector('textarea[name="requirements"]').value.trim();
        
        if (!name || !email || !requirements) {
            e.preventDefault();
            alert('Please fill in all required fields (Name, Email, and Requirements).');
            return false;
        }
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            e.preventDefault();
            alert('Please enter a valid email address.');
            return false;
        }
    });
}

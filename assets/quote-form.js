/* ==================== GET QUOTE FORM - JAVASCRIPT COMPONENT ==================== */

(function() {
  console.log('Quote form JS loaded');
  
  // Initialize quote form functionality
  function initQuoteForm() {
    console.log('Initializing quote form...');
    const quoteBtn = document.getElementById('quote-btn');
    const quotePopup = document.getElementById('quote-popup');
    const quoteOverlay = document.getElementById('quote-overlay');
    const closeBtn = document.getElementById('close-quote-popup');
    const quoteForm = document.getElementById('quoteForm');

    if (!quoteBtn || !quotePopup || !quoteOverlay || !closeBtn || !quoteForm) {
      console.error('Quote form elements not found:', {
        quoteBtn: !!quoteBtn,
        quotePopup: !!quotePopup,
        quoteOverlay: !!quoteOverlay,
        closeBtn: !!closeBtn,
        quoteForm: !!quoteForm
      });
      return;
    }

    console.log('Quote form initialized successfully');

    // Open quote popup
    quoteBtn.addEventListener('click', function() {
      console.log('Opening quote popup');
      quotePopup.classList.add('active');
      quoteOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    // Close popup function
    function closePopup() {
      quotePopup.classList.remove('active');
      quoteOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    // Close on button click
    closeBtn.addEventListener('click', closePopup);

    // Close on overlay click
    quoteOverlay.addEventListener('click', closePopup);

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && quotePopup.classList.contains('active')) {
        closePopup();
      }
    });

    // Form submission handler
    quoteForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const submitBtn = quoteForm.querySelector('.btn-submit');
      const statusBox = document.getElementById('quote-status');
      
      // Reset status
      statusBox.className = '';
      statusBox.textContent = '';

      // Honeypot spam check
      const honey = quoteForm.querySelector('input[name="_honey"]').value;
      if (honey) {
        statusBox.className = 'success';
        statusBox.textContent = 'Thank you! Your request has been received.';
        quoteForm.reset();
        return;
      }

      // Disable submit button
      submitBtn.disabled = true;
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'SENDING...';

      // Generate reference and offer code
      const reference = 'A7Q-' + new Date().toISOString().replace(/[-:TZ.]/g,'').slice(0,14) + '-' + Math.random().toString(36).substring(2,6).toUpperCase();
      const offerCode = 'WELCOME-' + reference.slice(-4);
      const userEmail = quoteForm.querySelector('input[name="email"]').value;
      
      // Prepare form data
      const formData = new FormData(quoteForm);
      formData.append('reference', reference);
      formData.append('offer_code', offerCode);
      formData.append('_subject', '🔔 New Quote Request (Ref ' + reference + ')');
      formData.append('_replyto', userEmail);
      formData.append('_autoresponse', 'Welcome to A7 Technosys!\n\nThank you for your quote request.\nReference: ' + reference + '\nSpecial Offer: Use code ' + offerCode + ' for a 5% discount on your first production order (valid 7 days).\n\nWhat happens next:\n1) Our team reviews your details.\n2) We may contact you for clarifications.\n3) You receive a formal quotation.\n\nNeed it faster? Call or WhatsApp +91-9936531793.\n\nRegards,\nA7 Technosys Team');

      // Submit form
      fetch('https://formsubmit.co/a7technosys@gmail.com', {
        method: 'POST',
        body: formData,
        headers: {'Accept': 'application/json'}
      })
      .then(response => response.json())
      .then(data => {
        if (data.success === 'true' || data.success === true) {
          statusBox.className = 'success';
          statusBox.innerHTML = '✅ Request sent! Ref <strong>' + reference + '</strong>. Offer: <strong>' + offerCode + '</strong>. Check your email.';
          submitBtn.textContent = 'Sent ✓';
          submitBtn.disabled = false;
          
          // Reset form after 3 seconds
          setTimeout(() => {
            quoteForm.reset();
            submitBtn.textContent = originalText;
            // Optionally close popup after successful submission
            // setTimeout(closePopup, 2000);
          }, 3000);
        } else {
          throw new Error('Submission failed');
        }
      })
      .catch(error => {
        statusBox.className = 'error';
        statusBox.textContent = '❌ Failed. Please try again or call +91-9936531793.';
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
    });
  }

  // Initialize with a small delay to ensure DOM elements are loaded
  setTimeout(function() {
    initQuoteForm();
  }, 100);

  // Also expose global function to open quote form programmatically
  window.openQuoteForm = function() {
    const quoteBtn = document.getElementById('quote-btn');
    if (quoteBtn) {
      quoteBtn.click();
    } else {
      console.error('Quote button not found!');
    }
  };
})();

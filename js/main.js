// ========================================
// MOBILE MENU
// ========================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

if (mobileMenuBtn && mobileNav) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });

  // Close mobile menu when clicking on a link
  const mobileLinks = mobileNav.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
    });
  });
}

// ========================================
// NAV SCROLL EFFECT
// ========================================
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// ========================================
// FORM HANDLING
// ========================================

// Donation Form
const donateForm = document.getElementById('donateForm');
if (donateForm) {
  donateForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // In production, this would integrate with Stripe or another payment processor
    const formData = new FormData(donateForm);
    const amount = formData.get('amount');

    alert(`Thank you for your generous donation! Payment processing will be integrated soon. For now, please contact us directly at 610 960 8205 to complete your donation of ${amount}.`);
  });
}

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // In production, this would send the form data to a backend service
    const formData = new FormData(contactForm);
    const firstName = formData.get('firstName');

    alert(`Thank you for your message, ${firstName}! We'll get back to you within 2-3 business days.`);
    contactForm.reset();
  });
}

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');

    // Don't prevent default for just "#" links
    if (href === '#') return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ========================================
// NEWSLETTER SUBSCRIPTION
// ========================================
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const emailInput = document.getElementById('emailInput');
    const subscribeBtn = document.getElementById('subscribeBtn');
    const btnText = subscribeBtn.querySelector('.btn-text');
    const btnLoading = subscribeBtn.querySelector('.btn-loading');
    const formMessage = document.getElementById('formMessage');

    // Get email and preferences
    const email = emailInput.value.trim();
    const checkboxes = newsletterForm.querySelectorAll('input[name="preferences"]:checked');
    const preferences = Array.from(checkboxes).map(cb => cb.value);

    // Disable form during submission
    subscribeBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    formMessage.style.display = 'none';

    try {
      const response = await fetch('/.netlify/functions/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, preferences })
      });

      const data = await response.json();

      if (response.ok) {
        // Success
        formMessage.textContent = data.message;
        formMessage.className = 'form-message success';
        formMessage.style.display = 'block';

        // Clear form
        newsletterForm.reset();
        // Re-check "general" by default
        const generalCheckbox = newsletterForm.querySelector('input[value="general"]');
        if (generalCheckbox) generalCheckbox.checked = true;
      } else {
        // Error
        formMessage.textContent = data.error || 'Something went wrong. Please try again.';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
      }
    } catch (error) {
      console.error('Subscription error:', error);
      formMessage.textContent = 'Network error. Please check your connection and try again.';
      formMessage.className = 'form-message error';
      formMessage.style.display = 'block';
    } finally {
      // Re-enable form
      subscribeBtn.disabled = false;
      btnText.style.display = 'inline';
      btnLoading.style.display = 'none';
    }
  });
}

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all cards and sections for fade-in animations
document.querySelectorAll('.feature-card, .service-card, .support-card, .leader-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

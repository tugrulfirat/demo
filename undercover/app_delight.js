/* ============================================================
   UNDERCOVER DIGITAL — Prototype Application Logic
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     1. VIEWPORT SIMULATOR
     ---------------------------------------------------------- */
  const viewportWrapper = document.getElementById('viewport-wrapper');
  const viewportBtns = document.querySelectorAll('[data-viewport]');

  function setViewport(mode) {
    // Remove all mode classes
    viewportWrapper.classList.remove('mode-desktop', 'mode-mobile', 'mode-responsive');
    viewportWrapper.classList.add('mode-' + mode);

    // Update active button
    viewportBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.viewport === mode);
    });

    // Store preference
    localStorage.setItem('ud_viewport', mode);
  }

  viewportBtns.forEach(btn => {
    btn.addEventListener('click', () => setViewport(btn.dataset.viewport));
  });

  // Initialize viewport
  const savedViewport = localStorage.getItem('ud_viewport') || 'desktop';
  setViewport(savedViewport);

  /* ----------------------------------------------------------
     2. ACCENT COLOR TOGGLER
     ---------------------------------------------------------- */
  const htmlEl = document.documentElement;
  const accentBtns = document.querySelectorAll('[data-accent]');

  function setAccent(accent) {
    htmlEl.setAttribute('data-accent', accent);
    accentBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.accent === accent);
    });
    localStorage.setItem('ud_accent', accent);
  }

  accentBtns.forEach(btn => {
    btn.addEventListener('click', () => setAccent(btn.dataset.accent));
  });

  // Initialize accent
  const savedAccent = localStorage.getItem('ud_accent') || 'red';
  setAccent(savedAccent);

  /* ----------------------------------------------------------
     3. PAGE ROUTER
     ---------------------------------------------------------- */
  const pages = {
    home:     document.getElementById('page-home'),
    about:    document.getElementById('page-about'),
    services: document.getElementById('page-services'),
    blog:     document.getElementById('page-blog'),
    contact:  document.getElementById('page-contact'),
    privacy:  document.getElementById('page-privacy'),
    terms:    document.getElementById('page-terms'),
  };

  const navLinks = document.querySelectorAll('[data-page]');
  let currentPage = 'home';

  function navigateTo(pageKey) {
    if (!pages[pageKey]) return;

    // Hide all pages
    Object.values(pages).forEach(el => el.classList.remove('active'));

    // Show target page
    pages[pageKey].classList.add('active');
    currentPage = pageKey;

    // Update nav active states
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.page === pageKey);
    });

    // Scroll to top of site frame
    const siteFrame = document.getElementById('site-frame');
    if (siteFrame) {
      siteFrame.scrollTo({ top: 0, behavior: 'instant' });
    }

    // For viewport modes that don't scroll inside frame, scroll the wrapper
    window.scrollTo({ top: 48, behavior: 'instant' });

    // Reset blog view when navigating to blog page fresh
    if (pageKey === 'blog') {
      resetBlogView();
    }

    // Trigger scroll animations for the new page
    setTimeout(() => {
      observeAnimations();
    }, 50);

    // Close mobile drawer
    closeMobileDrawer();
  }

  // Bind all [data-page] links
  function bindNavLinks() {
    document.querySelectorAll('[data-page]').forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        const target = el.dataset.page;
        if (target) navigateTo(target);
      });
    });
  }

  bindNavLinks();

  /* ----------------------------------------------------------
     4. MOBILE NAV DRAWER
     ---------------------------------------------------------- */
  const hamburger = document.getElementById('nav-hamburger');
  const mobileDrawer = document.getElementById('nav-mobile-drawer');

  function closeMobileDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });
  }

  /* ----------------------------------------------------------
     5. STICKY NAV SCROLL EFFECT
     ---------------------------------------------------------- */
  const siteNav = document.getElementById('site-nav');

  function handleNavScroll() {
    const scrollContainer = viewportWrapper.classList.contains('mode-desktop') || viewportWrapper.classList.contains('mode-mobile')
      ? document.getElementById('site-frame')
      : window;

    const scrollY = scrollContainer === window
      ? window.scrollY
      : scrollContainer.scrollTop;

    if (siteNav) {
      siteNav.classList.toggle('scrolled', scrollY > 10);
    }
  }

  // Listen on both window and site-frame for scroll
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  const siteFrame = document.getElementById('site-frame');
  if (siteFrame) {
    siteFrame.addEventListener('scroll', handleNavScroll, { passive: true });
  }

  /* ----------------------------------------------------------
     6. SCROLL ANIMATIONS (Intersection Observer)
     ---------------------------------------------------------- */
  let animObserver = null;

  function observeAnimations() {
    // Disconnect old observer
    if (animObserver) {
      animObserver.disconnect();
    }

    const elements = document.querySelectorAll('#page-' + currentPage + ' .animate-in');

    animObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    elements.forEach(el => {
      // Elements already in viewport get instant visibility
      animObserver.observe(el);
    });
  }

  // Initialize animations on load
  setTimeout(observeAnimations, 100);

  /* ----------------------------------------------------------
     7. BLOG DETAIL VIEW
     ---------------------------------------------------------- */
  const blogIndexView   = document.getElementById('blog-index-view');
  const blogDetailView  = document.getElementById('blog-detail-view');
  const blogBackBtn     = document.getElementById('blog-back-btn');
  const blogPosts       = [
    document.getElementById('blog-post-0'),
    document.getElementById('blog-post-1'),
  ];

  function showBlogPost(index) {
    if (!blogIndexView || !blogDetailView) return;

    // Hide index, show detail
    blogIndexView.style.display = 'none';
    blogDetailView.style.display = 'block';

    // Hide all posts, show targeted
    blogPosts.forEach((post, i) => {
      if (post) post.style.display = i === index ? 'block' : 'none';
    });

    // Scroll to top
    window.scrollTo({ top: 48, behavior: 'instant' });
    document.getElementById('site-frame').scrollTo({ top: 0, behavior: 'instant' });
  }

  function resetBlogView() {
    if (!blogIndexView || !blogDetailView) return;
    blogIndexView.style.display = 'block';
    blogDetailView.style.display = 'none';
  }

  // Bind blog card clicks (on all pages that have blog cards)
  document.querySelectorAll('[data-blog]').forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.dataset.blog, 10);
      navigateTo('blog');
      // Small delay to allow page transition
      setTimeout(() => showBlogPost(idx), 50);
    });
  });

  if (blogBackBtn) {
    blogBackBtn.addEventListener('click', () => {
      resetBlogView();
      observeAnimations();
    });
  }

  /* ----------------------------------------------------------
     8. CALENDLY MODAL
     ---------------------------------------------------------- */
  const modalOverlay  = document.getElementById('modal-calendly');
  const modalCloseBtn = document.getElementById('modal-close');

  function openModal() {
    if (modalOverlay) {
      modalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      // Focus close button for accessibility
      setTimeout(() => modalCloseBtn && modalCloseBtn.focus(), 100);
    }
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  // Bind all [data-modal="calendly"] triggers
  document.querySelectorAll('[data-modal="calendly"]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      openModal();
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  // Close on overlay click
  if (modalOverlay) {
    modalOverlay.addEventListener('click', e => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  /* ----------------------------------------------------------
     9. CONTACT FORM
     ---------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();

      const name    = document.getElementById('form-name').value.trim();
      const email   = document.getElementById('form-email').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        showFormFeedback('error', 'Please fill in all required fields.');
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showFormFeedback('error', 'Please enter a valid email address.');
        return;
      }

      const submitBtn = document.getElementById('form-submit-btn');
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;

      // Simulate API call
      setTimeout(() => {
        showFormFeedback('success', '✓ Message sent! We\'ll be in touch within 1–2 business days.');
        contactForm.reset();
        submitBtn.innerHTML = 'Send Message <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        submitBtn.disabled = false;
      }, 1500);
    });
  }

  function showFormFeedback(type, msg) {
    let feedbackEl = document.getElementById('form-feedback');
    if (!feedbackEl) {
      feedbackEl = document.createElement('p');
      feedbackEl.id = 'form-feedback';
      feedbackEl.style.cssText = 'margin-top: 12px; font-size: 0.875rem; font-weight: 600; padding: 12px 16px; border-radius: 8px;';
      contactForm.appendChild(feedbackEl);
    }

    if (type === 'success') {
      feedbackEl.style.background = 'rgba(167,201,87,0.12)';
      feedbackEl.style.color = '#5a7a1e';
      feedbackEl.style.border = '1px solid rgba(167,201,87,0.3)';
    } else {
      feedbackEl.style.background = 'rgba(217,71,47,0.08)';
      feedbackEl.style.color = '#be3924';
      feedbackEl.style.border = '1px solid rgba(217,71,47,0.2)';
    }

    feedbackEl.textContent = msg;
    feedbackEl.setAttribute('role', 'alert');
    feedbackEl.setAttribute('aria-live', 'polite');

    // Auto-clear error after 4 seconds
    if (type === 'error') {
      setTimeout(() => {
        if (feedbackEl.textContent === msg) {
          feedbackEl.textContent = '';
          feedbackEl.style.border = 'none';
        }
      }, 4000);
    }
  }

  /* ----------------------------------------------------------
     10. LOGO FALLBACK
     ---------------------------------------------------------- */
  document.querySelectorAll('.nav-logo img, .footer-brand__logo img').forEach(img => {
    img.addEventListener('error', function () {
      // Replace with text fallback if image fails to load
      const parent = this.closest('.nav-logo') || this.closest('.footer-brand__logo');
      if (parent) {
        this.style.display = 'none';
        const span = document.createElement('span');
        span.style.cssText = 'font-family: var(--font-display, sans-serif); font-weight: 800; font-size: 1.1rem; color: var(--color-black); letter-spacing: -0.02em;';
        span.textContent = 'UNDERCOVER DIGITAL';
        parent.appendChild(span);
      }
    });
  });

  // Footer logo gets inverted style — also handle its separate fallback
  document.querySelectorAll('.footer-brand__logo img').forEach(img => {
    img.addEventListener('error', function () {
      const span = document.createElement('span');
      span.style.cssText = 'font-family: var(--font-display, sans-serif); font-weight: 800; font-size: 1rem; color: rgba(255,255,255,0.7); letter-spacing: -0.02em;';
      span.textContent = 'UNDERCOVER DIGITAL';
      this.parentNode.replaceChild(span, this);
    });
  });

  /* ----------------------------------------------------------
     11. HERO CARD HOVER PARALLAX (subtle)
     ---------------------------------------------------------- */
  const heroCards = document.querySelectorAll('.hero-card');

  heroCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 8;
      card.style.transform = `translateY(-3px) rotateX(${-y * 0.4}deg) rotateY(${x * 0.4}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ----------------------------------------------------------
     12. PLATFORM BADGE STAGGER ON HOVER
     ---------------------------------------------------------- */
  const platformBadges = document.querySelectorAll('.platform-badge');
  platformBadges.forEach((badge, i) => {
    badge.style.transitionDelay = `${i * 30}ms`;
  });

  /* ----------------------------------------------------------
     13. INIT
     ---------------------------------------------------------- */
  console.log(
    '%c Undercover Digital · Design Prototype ',
    'background: #050505; color: #A7C957; font-weight: bold; padding: 4px 8px; border-radius: 4px; font-size: 12px;'
  );
  console.log('%cToggle accent colors and viewport modes using the prototype bar above.', 'color: #9A9589; font-size: 11px;');

})();

/* ========================================
   ZUMBA WITH YESI — JavaScript
   ======================================== */

'use strict';

// ===== LANGUAGE SYSTEM =====
let currentLang = localStorage.getItem('zumbaLang') || 'en';

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('zumbaLang', lang);

  // Update all elements with data-en / data-es
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (!text) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = text;
    } else {
      el.innerHTML = text;
    }
  });

  // Textarea placeholder special case
  document.querySelectorAll('[data-en-placeholder]').forEach(el => {
    const attr = `data-${lang}-placeholder`;
    if (el.getAttribute(attr)) {
      el.placeholder = el.getAttribute(attr);
    }
  });

  // Update HTML lang attribute
  document.documentElement.lang = lang;

  // Update toggle button
  const flag  = document.getElementById('langFlag');
  const label = document.getElementById('langLabel');
  if (flag && label) {
    flag.textContent  = lang === 'en' ? '🇺🇸' : '🇲🇽';
    label.textContent = lang === 'en' ? 'ES'   : 'EN';
  }

  // Update page title
  document.title = lang === 'en'
    ? 'Zumba with Rocio | Dance. Sweat. Transform.'
    : 'Zumba con Rocio | Baila. Suda. Transfórmate.';
}

function toggleLanguage() {
  applyLanguage(currentLang === 'en' ? 'es' : 'en');
}

// ===== NAVBAR =====
function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('nav-menu');

  // Scroll effect
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close on nav link click
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Smooth active link highlighting
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navMenu.querySelectorAll('.nav-link').forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
}

// ===== SCROLL ANIMATIONS =====
function initAnimations() {
  const animatable = document.querySelectorAll(
    '.class-card, .schedule-card, .pricing-card, .testimonial-card, ' +
    '.contact-item, .trust-item, .about-content, .about-visual'
  );

  animatable.forEach((el, i) => {
    el.setAttribute('data-animate', '');
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  animatable.forEach(el => observer.observe(el));
}

// ===== NEWSLETTER FORM =====
function handleNewsletter(e) {
  e.preventDefault();
  const name  = document.getElementById('nl-name').value.trim();
  const email = document.getElementById('nl-email').value.trim();
  const lang  = document.getElementById('nl-lang').value;

  if (!name || !email) return false;

  // Simulate submission (replace with your backend/Formspree/etc.)
  const btn = e.target.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.disabled = false;
    document.getElementById('nl-success').classList.add('show');
    e.target.reset();
    // Hide success after 5s
    setTimeout(() => document.getElementById('nl-success').classList.remove('show'), 5000);
  }, 1200);

  return false;
}

// ===== CONTACT FORM =====
function handleContact(e) {
  e.preventDefault();
  const name    = document.getElementById('c-name').value.trim();
  const email   = document.getElementById('c-email').value.trim();
  const message = document.getElementById('c-message').value.trim();

  if (!name || !email) return false;

  const btn = e.target.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.disabled = false;
    document.getElementById('c-success').classList.add('show');
    e.target.reset();
    setTimeout(() => document.getElementById('c-success').classList.remove('show'), 5000);
  }, 1200);

  return false;
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el  = entry.target;
      const raw = el.textContent.replace(/[^0-9]/g, '');
      if (!raw) return;
      const target = parseInt(raw);
      const suffix = el.textContent.replace(/[0-9]/g, '');
      let current  = 0;
      const step   = Math.ceil(target / 50);
      const timer  = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + suffix;
        if (current >= target) clearInterval(timer);
      }, 30);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

// ===== FLOATING BUTTON VISIBILITY =====
function initFloatBtn() {
  const btn = document.querySelector('.float-cta');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.style.opacity = window.scrollY > 300 ? '1' : '0';
    btn.style.pointerEvents = window.scrollY > 300 ? 'auto' : 'none';
  });
  btn.style.opacity = '0';
  btn.style.transition = 'opacity 0.3s ease';
}

// ===== PARALLAX HERO =====
function initParallax() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroBg.style.transform = `translateY(${y * 0.35}px)`;
  }, { passive: true });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  // Language toggle button
  const langBtn = document.getElementById('langToggle');
  if (langBtn) langBtn.addEventListener('click', toggleLanguage);

  // Apply saved language
  applyLanguage(currentLang);

  // Initialize modules
  initNavbar();
  initAnimations();
  animateCounters();
  initFloatBtn();
  initParallax();
});

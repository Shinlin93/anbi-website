/* ==========================================================================
   ANBI CONSULTING — MAIN SCRIPT
   Three small, independent behaviors. Safe to trim any block you don't need.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. Sticky navbar shadow on scroll ---------- */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 12);
    });
  }

  /* ---------- 2. Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
    navLinks.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', false);
      });
    });
  }

  /* ---------- 3. Language selector ---------- */
  const languageSelect = document.getElementById('languageSelect');
  const translations = {
    id: { about: 'Tentang Kami', services: 'Layanan', clients: 'Klien', why: 'Mengapa ANBI', blog: 'Blog', contact: 'Kontak' },
    en: { about: 'About Us', services: 'Services', clients: 'Clients', why: 'Why ANBI', blog: 'Blog', contact: 'Contact' }
  };
  const languageLinks = {
    about: document.querySelector('.nav-links a[href="#about"]'),
    services: document.querySelector('.nav-links a[href="/services/"]'),
    clients: document.querySelector('.nav-links a[href="#clients"]'),
    why: document.querySelector('.nav-links a[href="#why-anbi"]'),
    blog: document.querySelector('.nav-links a[href="/blog/"]'),
    contact: document.querySelector('.nav-links a[href="#contact"]')
  };
  const applyLanguage = (language) => {
    const selected = translations[language] || translations.id;
    Object.entries(languageLinks).forEach(([key, link]) => {
      if (link) link.textContent = selected[key];
    });
    document.documentElement.lang = language;
    if (languageSelect) languageSelect.value = language;
  };
  if (languageSelect) {
    const initialLanguage = new URLSearchParams(window.location.search).get('lang') === 'en' ? 'en' : 'id';
    applyLanguage(initialLanguage);
    languageSelect.addEventListener('change', (event) => applyLanguage(event.target.value));
  }

  /* ---------- 4. Reveal sections on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

});

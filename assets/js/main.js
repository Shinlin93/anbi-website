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

  /* ---------- 3. Reveal sections on scroll ---------- */
  const translations = {
    'About': 'About', 'Services': 'Services', 'Clients': 'Clients', 'Why ANBI': 'Why ANBI', 'Blog': 'Blog', 'Contact': 'Contact',
    'Buka menu': 'Open menu', 'Pilih bahasa': 'Choose language',
    'Mitra terpercaya untuk legalitas, perizinan, dan pertumbuhan bisnis Anda.': 'Your trusted partner for business licensing, legal compliance, and growth.',
    'PT Anara Business International membantu pelaku usaha dari UMKM hingga perusahaan internasional mengurus legalitas, kepatuhan, dan administrasi bisnis secara lengkap dalam satu pintu.': 'PT Anara Business International helps businesses from small enterprises to international companies manage legal compliance, licensing, and administration through one trusted partner.',
    'Kenali layanan kami': 'Explore our services', 'Fondasi yang tertata untuk bisnis yang ingin tumbuh dengan percaya diri.': 'A structured foundation for businesses ready to grow with confidence.',
    'Layanan Kami': 'Our Services', 'Solusi Satu Pintu untuk Legalitas & Administrasi Bisnis': 'One-stop solutions for business legalities and administration',
    'Pendirian Perusahaan': 'Company Formation', 'Perizinan Usaha': 'Business Licensing', 'Akuntansi & Pajak': 'Accounting & Tax', 'Layanan Ekspatriat': 'Expatriate Services',
    'Audit & Kepatuhan': 'Audit & Compliance', 'Konsultasi Bisnis': 'Business Consulting', 'Legal & Dokumen': 'Legal & Documents', 'Lihat Semua Layanan': 'View All Services',
    'Mari Bekerja Sama': 'Let’s Work Together', 'Konsultasikan kebutuhan legalitas dan pengembangan bisnis Anda bersama kami.': 'Discuss your legal and business development needs with our team.',
    'Konsultasikan Kebutuhan Anda': 'Discuss Your Needs', 'Proses Kerja': 'Our Process', 'Alur Kerja Kami': 'How We Work',
    'Proses yang sederhana, transparan, dan terdokumentasi': 'A simple, transparent, and documented process', 'Konsultasi Awal': 'Initial Consultation',
    'Penawaran & Kesepakatan': 'Proposal & Agreement', 'Pengurusan & Update': 'Processing & Updates', 'Serah Terima & Pendampingan': 'Handover & Support',
    'Mengapa ANBI': 'Why ANBI', 'Akses Pembiayaan': 'Access to Financing', 'Tender & Kemitraan': 'Tenders & Partnerships', 'Kepercayaan Pelanggan': 'Customer Trust',
    'Perlindungan Hukum': 'Legal Protection', 'Kepatuhan Pajak': 'Tax Compliance', 'Siap Berkembang': 'Ready to Grow', 'Tentang Kami': 'About Us',
    'Klien Kami': 'Our Clients', 'Kontak': 'Contact', 'Chat dengan Kami': 'Chat With Us', 'Layanan': 'Services', 'Perusahaan': 'Company',
    'Seluruh hak cipta dilindungi.': 'All rights reserved.'
  };

  const translatePage = (language) => {
    document.documentElement.lang = language === 'en' ? 'en' : 'id';
    document.querySelectorAll('.language-option').forEach((button) => {
      const active = button.dataset.language === language;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('body *:not(script):not(style)').forEach((element) => {
      if (element.children.length > 0) return;
      const original = element.dataset.originalText || element.textContent.trim();
      if (!element.dataset.originalText) element.dataset.originalText = original;
      element.textContent = language === 'en' ? (translations[original] || original) : original;
    });
  };
  document.querySelectorAll('.language-option').forEach((button) => {
    button.addEventListener('click', () => translatePage(button.dataset.language));
  });

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

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
    'Seluruh hak cipta dilindungi.': 'All rights reserved.',
    'Pendampingan untuk Legalitas dan Operasional Bisnis': 'Support for Business Legalities and Operations',
    'Dari mendirikan badan usaha hingga mengelola kepatuhan rutin, ANBI membantu Anda menata kebutuhan administratif, keuangan, SDM, dan dokumen bisnis dalam satu alur kerja yang jelas.': 'From establishing a business entity to managing ongoing compliance, ANBI helps you organize administrative, financial, HR, and business document needs through one clear workflow.',
    'Administrasi kepegawaian yang tertata membantu menjaga produktivitas sekaligus mengurangi risiko perselisihan hubungan industrial. Kami menangani pengelolaan SDM secara efisien dan patuh terhadap regulasi ketenagakerjaan.': 'Well-organized personnel administration helps maintain productivity while reducing the risk of industrial relations disputes. We manage HR efficiently and in compliance with employment regulations.',
    'Mempekerjakan tenaga kerja asing membutuhkan proses keimigrasian dan kepatuhan hukum ketenagakerjaan yang ketat. Kami menyediakan pendampingan menyeluruh agar seluruh izin tinggal dan kerja TKA diurus tepat waktu sesuai aturan imigrasi dan kementerian ketenagakerjaan.': 'Employing foreign workers requires strict immigration processes and compliance with employment regulations. We provide comprehensive support to ensure all foreign worker residence and work permits are handled on time in accordance with immigration and labor ministry rules.',
    'Jelajahi layanan kami': 'Explore our services',
    'Solusi yang jelas untuk bisnis yang ingin tumbuh dengan fondasi yang tertata.': 'Clear solutions for businesses ready to grow on a well-structured foundation.',
    'Pendirian Perusahaan': 'Company Formation',
    'Mendirikan badan usaha seperti PT Lokal, PT PMA, CV, maupun Yayasan merupakan langkah krusial untuk membangun fondasi bisnis yang legal dan tepercaya di Indonesia. Kami menyederhanakan penyusunan anggaran dasar bersama notaris, pengesahan legalitas, hingga penerbitan dokumen resmi perusahaan secara cepat dan transparan.': 'Establishing a business entity such as a local company, foreign investment company, CV, or foundation is a crucial step toward building a legal and trusted business foundation in Indonesia. We simplify the preparation of articles of association with a notary, legal approval, and issuance of official company documents quickly and transparently.',
    'Pendirian PT Lokal, PT PMA, CV, dan Yayasan': 'Establishment of local companies, foreign investment companies, CVs, and foundations',
    'Penyusunan anggaran dasar bersama notaris': 'Preparation of articles of association with a notary',
    'Pengurusan akta dan SK Kemenkumham': 'Processing of deeds and Ministry of Law and Human Rights approvals',
    'Penerbitan NPWP Badan dan dokumen resmi': 'Issuance of corporate tax ID and official documents',
    'Pengurusan Nomor Induk Berusaha (NIB)': 'Processing of Business Identification Number (NIB)',
    'Sertifikat Standar dan izin sektoral': 'Standard certificates and sector-specific licenses',
    'Persyaratan teknis dan kajian pendukung': 'Technical requirements and supporting studies',
    'PBG, SLF, dan izin lingkungan': 'Building approvals, certificates of proper function, and environmental permits',
    'Perizinan Usaha': 'Business Licensing',
    'Cost accounting dan pembukuan': 'Cost accounting and bookkeeping',
    'Penyusunan laporan keuangan': 'Preparation of financial statements',
    'Pelaporan PPN serta SPT Masa dan Tahunan': 'VAT and monthly and annual tax return filing',
    'Perencanaan pajak (tax planning)': 'Tax planning',
    'Kalkulasi gaji dan payroll bulanan': 'Salary calculation and monthly payroll',
    'Pemotongan serta pelaporan PPh 21': 'Income tax withholding and reporting',
    'Administrasi BPJS Kesehatan dan Ketenagakerjaan': 'Administration of health and employment social security',
    'Penyusunan Peraturan Perusahaan (PP)': 'Preparation of company regulations',
    'Pengurusan RPTKA': 'RPTKA processing',
    'Visa kerja dan KITAS': 'Work visas and KITAS',
    'SKTT dan dokumen keimigrasian': 'SKTT and immigration documents',
    'Pendampingan kepatuhan TKA': 'Foreign worker compliance support',
    'Audit dan Kepabeanan': 'Audit and Customs',
    'Audit internal dan peninjauan kepatuhan membantu mengidentifikasi celah operasional serta mencegah risiko sejak dini. Kami memeriksa administrasi, pembukuan, dan legalitas korporasi serta mendampingi audit eksternal melalui jaringan KAP terdaftar.': 'Internal audits and compliance reviews help identify operational gaps and prevent risks early. We review administration, bookkeeping, and corporate legality while supporting external audits through our network of registered public accounting firms.',
    'Audit internal dan compliance review': 'Internal audit and compliance review',
    'Pemeriksaan administrasi dan pembukuan': 'Administrative and bookkeeping review',
    'Peninjauan legalitas korporasi': 'Corporate legality review',
    'Pendampingan audit eksternal, tender, dan LKPM': 'Support for external audits, tenders, and LKPM reporting',
    'Penataan struktur perusahaan': 'Corporate structure planning',
    'Pertumbuhan bisnis membutuhkan keputusan strategis yang didukung analisis mendalam dan pemahaman terhadap regulasi serta industri di Indonesia. Kami menjadi mitra diskusi melalui layanan retainer maupun pendampingan ad-hoc dengan rekomendasi yang aplikatif dan sesuai anggaran.': 'Business growth requires strategic decisions supported by in-depth analysis and an understanding of Indonesian regulations and industries. We serve as a discussion partner through retainer services and ad-hoc support, providing practical recommendations aligned with your budget.',
    'Analisis kelayakan dan risiko bisnis': 'Business feasibility and risk analysis',
    'Konsultasi retainer dan ad-hoc': 'Retainer and ad-hoc consulting',
    'Rekomendasi strategi ekspansi': 'Expansion strategy recommendations',
    'Kontrak kerja sama dan dokumen korporasi yang disusun dengan cermat menjadi perlindungan utama bagi keberlangsungan bisnis. Kami menyediakan jasa pembuatan, peninjauan, dan legalisasi dokumen agar setiap klausa melindungi kepentingan bisnis Anda.': 'Carefully prepared cooperation contracts and corporate documents are essential protection for business continuity. We provide drafting, review, and legalization services to ensure every clause protects your business interests.',
    'Draft dan review perjanjian kerja sama': 'Drafting and review of cooperation agreements',
    'Perjanjian khusus dan nominee': 'Special and nominee agreements',
    'Risalah RUPS dan dokumen korporasi': 'Shareholders meeting minutes and corporate documents',
    'Pendaftaran HKI dan Merek Dagang': 'Intellectual property and trademark registration',
    'Perizinan Usaha': 'Business Licensing',
    'Akuntansi & Pajak': 'Accounting & Tax',
    'HR & Payroll': 'HR & Payroll',
    'Layanan Ekspatriat': 'Expatriate Services',
    'Audit dan Kepabeanan': 'Audit and Customs',
    'Konsultan Kepabeanan': 'Customs Consulting',
    'Konsultasi Bisnis': 'Business Consulting',
    'Legal & Dokumen': 'Legal & Documents',
    'Cara Kami Bekerja': 'How We Work',
    'Alur Kerja yang Jelas untuk Setiap Kebutuhan': 'A Clear Workflow for Every Need',
    'Konsultasi Awal': 'Initial Consultation',
    'Analisis & Perencanaan': 'Analysis & Planning',
    'Implementasi': 'Implementation',
    'Monitoring & Evaluasi': 'Monitoring & Evaluation',
    'Kami mendengarkan kebutuhan Anda secara mendalam untuk memahami tantangan dan tujuan bisnis Anda.': 'We listen closely to understand your business challenges and goals.',
    'Tim kami melakukan analisis menyeluruh dan merancang solusi yang sesuai dengan kebutuhan spesifik Anda.': 'Our team conducts a thorough analysis and designs a solution tailored to your specific needs.',
    'Kami mengeksekusi strategi dengan profesional dan memastikan setiap detail ditangani dengan baik.': 'We execute the strategy professionally and ensure every detail is handled properly.',
    'Kami terus memantau hasil dan melakukan evaluasi berkala untuk memastikan kesuksesan jangka panjang.': 'We continuously monitor results and conduct regular evaluations to ensure long-term success.'
  };

  const translatePage = (language) => {
    document.documentElement.lang = language === 'en' ? 'en' : 'id';
    document.querySelectorAll('.language-option').forEach((button) => {
      const active = button.dataset.language === language;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });

    const translateTextNode = (node) => {
      const original = node.__originalText || node.nodeValue;
      const trimmed = original.trim();
      if (!trimmed) return;
      if (!node.__originalText) node.__originalText = original;
      const translated = language === 'en' ? (translations[trimmed] || trimmed) : trimmed;
      node.nodeValue = original.replace(trimmed, translated);
    };

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => {
        const parent = node.parentElement;
        return parent && !['SCRIPT', 'STYLE'].includes(parent.tagName)
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      }
    });
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach(translateTextNode);

    const title = document.querySelector('title');
    if (title) {
      const original = title.dataset.originalText || title.textContent.trim();
      if (!title.dataset.originalText) title.dataset.originalText = original;
      title.textContent = language === 'en' ? (translations[original] || original) : original;
    }
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

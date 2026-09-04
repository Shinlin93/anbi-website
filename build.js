/**
 * build.js
 * ---------
 * 1. Assembles index.template.html + components/*.html into index.html.
 * 2. Assembles content/blog/*.html (one file per article) into a full
 *    blog system: blog/index.html (listing) + blog/<slug>/index.html
 *    (one page per article) — using templates/blog-*.template.html.
 *
 * Usage:
 *   node build.js
 *
 * Requires nothing but Node.js itself (no npm install needed).
 *
 * Run this every time you:
 *   - edit a file inside /components
 *   - add/edit/remove a file inside /content/blog
 *   - change index.template.html or templates/blog-*.template.html
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const TEMPLATE_PATH = path.join(ROOT, 'index.template.html');
const OUTPUT_PATH = path.join(ROOT, 'index.html');
const COMPONENTS_DIR = path.join(ROOT, 'components');
const TEMPLATES_DIR = path.join(ROOT, 'templates');
const CONTENT_BLOG_DIR = path.join(ROOT, 'content', 'blog');
const BLOG_OUTPUT_DIR = path.join(ROOT, 'blog');

const MONTHS_ID = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

/* ---------- Shared helpers ---------- */

// Replaces <!-- COMPONENT: filename.html --> with the file's contents.
// Used for both the homepage template and the blog templates, so navbar/
// footer components only need to be maintained in one place each.
function injectComponents(html) {
  return html.replace(
    /<!--\s*COMPONENT:\s*([\w-]+\.html)\s*-->/g,
    (match, filename) => {
      const componentPath = path.join(COMPONENTS_DIR, filename);
      if (!fs.existsSync(componentPath)) {
        console.warn(`⚠  Component not found: ${filename} (left as-is)`);
        return match;
      }
      return fs.readFileSync(componentPath, 'utf8').trim();
    }
  );
}

function escapeAttr(str) {
  return String(str || '').replace(/"/g, '&quot;');
}

function formatDateID(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${MONTHS_ID[m - 1]} ${y}`;
}

function slugify(str) {
  return String(str || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-+|-+$)/g, '');
}

/* ---------- 1. Build homepage (index.html) ---------- */

function buildHomepage() {
  const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');
  const result = injectComponents(template);
  fs.writeFileSync(OUTPUT_PATH, result);
  console.log(`✔ Built index.html (${(result.length / 1024).toFixed(0)} KB)`);
}

/* ---------- 2. Build blog (blog/index.html + blog/<slug>/index.html) ---------- */

// content/blog/*.html files look like:
//
//   ---
//   title: Judul Artikel
//   slug: judul-artikel
//   excerpt: Ringkasan singkat, dipakai di kartu listing & meta description.
//   date: 2026-09-01
//   image: /assets/images/blog/nama-file.jpg
//   author: Tim ANBI Consulting
//   ---
//   <p>Isi artikel dalam HTML biasa mulai di sini...</p>
//
// This parser just splits on the two "---" lines and reads "key: value"
// pairs — no external YAML/Markdown library needed.
function parseArticleFile(raw, fallbackSlug) {
  const fmMatch = raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n([\s\S]*)$/);
  if (!fmMatch) {
    throw new Error(
      'Front matter tidak ditemukan atau formatnya salah. ' +
      'File harus diawali baris "---", lalu metadata, lalu baris "---" lagi, baru isi artikel.'
    );
  }
  const [, fmBlock, body] = fmMatch;
  const meta = {};
  fmBlock.split(/\r?\n/).forEach((line) => {
    const idx = line.indexOf(':');
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    meta[key] = value;
  });
  if (!meta.slug) meta.slug = slugify(meta.title) || fallbackSlug;
  if (!meta.author) meta.author = 'Tim ANBI Consulting';
  return { meta, body: body.trim() };
}

function readArticles() {
  if (!fs.existsSync(CONTENT_BLOG_DIR)) return [];
  const files = fs.readdirSync(CONTENT_BLOG_DIR).filter((f) => f.endsWith('.html'));

  const articles = files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_BLOG_DIR, file), 'utf8');
    const fallbackSlug = file.replace(/\.html$/, '');
    try {
      const { meta, body } = parseArticleFile(raw, fallbackSlug);
      return { ...meta, body, sourceFile: file };
    } catch (err) {
      console.warn(`⚠  Lewati content/blog/${file}: ${err.message}`);
      return null;
    }
  }).filter(Boolean);

  // Newest first
  articles.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return articles;
}

function fillPlaceholders(html, data) {
  return html.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (match, key) => (
    Object.prototype.hasOwnProperty.call(data, key) ? data[key] : ''
  ));
}

function buildBlogPost(article, template) {
  const urlPath = `/blog/${article.slug}/`;
  const filled = fillPlaceholders(template, {
    TITLE: article.title || '',
    EXCERPT: article.excerpt || '',
    DATE_DISPLAY: formatDateID(article.date),
    DATE_ISO: article.date || '',
    IMAGE: article.image || '/assets/images/blog/placeholder.svg',
    AUTHOR: article.author || '',
    SLUG: article.slug,
    URL_PATH: urlPath,
    CONTENT: article.body,
  });
  const finalHtml = injectComponents(filled);

  const postDir = path.join(BLOG_OUTPUT_DIR, article.slug);
  fs.mkdirSync(postDir, { recursive: true });
  fs.writeFileSync(path.join(postDir, 'index.html'), finalHtml);
}

function buildBlogList(articles, template) {
  const cards = articles.map((a) => `
      <a class="blog-card reveal" href="/blog/${a.slug}/">
        <div class="blog-card-img">
          <img src="${a.image || '/assets/images/blog/placeholder.svg'}" alt="${escapeAttr(a.title)}" loading="lazy">
        </div>
        <div class="blog-card-body">
          <span class="blog-card-date">${formatDateID(a.date)}</span>
          <h3>${a.title || ''}</h3>
          <p>${a.excerpt || ''}</p>
          <span class="blog-card-link">Baca Selengkapnya →</span>
        </div>
      </a>`).join('\n');

  const finalHtml = injectComponents(template.replace('<!-- BLOG_CARDS -->', cards));
  fs.mkdirSync(BLOG_OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(BLOG_OUTPUT_DIR, 'index.html'), finalHtml);
}

function buildBlog() {
  const articles = readArticles();
  if (articles.length === 0) {
    console.log('ℹ Tidak ada artikel di content/blog — lewati build blog.');
    return;
  }

  const postTemplatePath = path.join(TEMPLATES_DIR, 'blog-post.template.html');
  const listTemplatePath = path.join(TEMPLATES_DIR, 'blog-list.template.html');

  if (fs.existsSync(postTemplatePath)) {
    const postTemplate = fs.readFileSync(postTemplatePath, 'utf8');
    articles.forEach((article) => {
      buildBlogPost(article, postTemplate);
      console.log(`✔ Built blog/${article.slug}/index.html`);
    });
  } else {
    console.warn('⚠  templates/blog-post.template.html tidak ditemukan — lewati halaman artikel.');
  }

  if (fs.existsSync(listTemplatePath)) {
    const listTemplate = fs.readFileSync(listTemplatePath, 'utf8');
    buildBlogList(articles, listTemplate);
    console.log(`✔ Built blog/index.html (${articles.length} artikel)`);
  } else {
    console.warn('⚠  templates/blog-list.template.html tidak ditemukan — lewati halaman listing blog.');
  }
}

/* ---------- Run ---------- */

buildHomepage();
buildBlog();

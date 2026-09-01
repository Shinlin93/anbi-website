/**
 * build.js
 * ---------
 * Assembles index.template.html + components/*.html into index.html.
 *
 * Usage:
 *   node build.js
 *
 * Requires nothing but Node.js itself (no npm install needed).
 * Run this every time you edit a file inside /components, add a new
 * component, or change the order of sections in index.template.html.
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const TEMPLATE_PATH = path.join(ROOT, 'index.template.html');
const OUTPUT_PATH = path.join(ROOT, 'index.html');
const COMPONENTS_DIR = path.join(ROOT, 'components');

function build() {
  const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');

  const result = template.replace(
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

  fs.writeFileSync(OUTPUT_PATH, result);
  console.log(`✔ Built index.html (${(result.length / 1024).toFixed(0)} KB)`);
}

build();

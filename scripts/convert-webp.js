const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SRC = path.join(__dirname, '..', 'public', 'images');

const FILES = [
  'hero-product.jpg',
  'logo.png',
  'product-1.png',
  'product-2.png',
  'product-3.png',
  'product-4.png',
];

async function run() {
  for (const f of FILES) {
    const ext = path.extname(f);
    const base = path.basename(f, ext);
    const inputPath = path.join(SRC, f);
    const outputPath = path.join(SRC, `${base}.webp`);
    
    console.log(`Converting ${f} to ${base}.webp...`);
    if (fs.existsSync(inputPath)) {
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
      console.log(`Done: ${base}.webp`);
    } else {
      console.warn(`File not found: ${inputPath}`);
    }
  }
}

run().catch(console.error);

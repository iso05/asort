const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputPath = 'C:\\Users\\User_124\\.gemini\\antigravity-ide\\brain\\ea0c0504-fdda-4d10-b089-d4e877ec20f3\\media__1785300169606.png';
const outputDir = path.join(__dirname, '..', 'public', 'images');

async function processLogo() {
  console.log('Processing new logo from:', inputPath);

  // First trim excess white borders
  const trimmedBuffer = await sharp(inputPath)
    .trim({ threshold: 10 })
    .toBuffer();

  // Create transparent background version (turning pure/near white pixels into transparent)
  const { data, info } = await sharp(trimmedBuffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixelData = new Uint8ClampedArray(data);
  for (let i = 0; i < pixelData.length; i += 4) {
    const r = pixelData[i];
    const g = pixelData[i + 1];
    const b = pixelData[i + 2];
    // If pixel is near white
    if (r > 240 && g > 240 && b > 240) {
      pixelData[i + 3] = 0; // set alpha to 0
    }
  }

  const transparentLogo = sharp(pixelData, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4
    }
  });

  // Save to public/images/logo.webp
  await transparentLogo
    .clone()
    .webp({ quality: 95 })
    .toFile(path.join(outputDir, 'logo.webp'));

  // Save to public/images/logo-home.webp (same logo for all)
  await transparentLogo
    .clone()
    .webp({ quality: 95 })
    .toFile(path.join(outputDir, 'logo-home.webp'));

  // Save to trimmed variants just in case
  await transparentLogo
    .clone()
    .webp({ quality: 95 })
    .toFile(path.join(outputDir, 'logo-trimmed.webp'));

  await transparentLogo
    .clone()
    .webp({ quality: 95 })
    .toFile(path.join(outputDir, 'logo-home-trimmed.webp'));

  console.log('Logo files written successfully! Dimensions:', info.width, 'x', info.height);
}

processLogo().catch(console.error);

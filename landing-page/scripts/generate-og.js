const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generate() {
  try {
    const svgPath = path.join(__dirname, '..', 'public', 'images', 'og-image.svg');
    const outWebP = path.join(__dirname, '..', 'public', 'images', 'og-image.webp');
    const outJpg = path.join(__dirname, '..', 'public', 'images', 'og-image.jpg');

    if (!fs.existsSync(svgPath)) {
      console.warn('SVG source not found:', svgPath);
      return;
    }

    const buffer = fs.readFileSync(svgPath);

    await sharp(buffer)
      .resize(1200, 630, { fit: 'cover' })
      .webp({ quality: 80 })
      .toFile(outWebP);

    await sharp(buffer)
      .resize(1200, 630, { fit: 'cover' })
      .jpeg({ quality: 80 })
      .toFile(outJpg);

    console.log('Generated og-image.webp and og-image.jpg in public/images');
  } catch (err) {
    console.error('Error generating OG images:', err);
    process.exitCode = 1;
  }
}

generate();

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateIcons() {
  const svgPath = path.join(__dirname, '../public/icon.svg');
  const iconsDir = path.join(__dirname, '../public/icons');
  
  // Ensure icons directory exists
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  // Read SVG content
  const svgBuffer = fs.readFileSync(svgPath);

  // Generate different sizes
  const sizes = [
    { size: 144, name: 'icon-144x144.png' },
    { size: 192, name: 'icon-192x192.png' },
    { size: 512, name: 'icon-512x512.png' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 16, name: 'favicon-16x16.png' }
  ];

  for (const { size, name } of sizes) {
    try {
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(path.join(iconsDir, name));
      
      console.log(`✅ Generated ${name} (${size}x${size})`);
    } catch (error) {
      console.error(`❌ Failed to generate ${name}:`, error.message);
    }
  }

  // Also generate favicon.ico
  try {
    await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toFile(path.join(__dirname, '../public/favicon.ico'));
    
    console.log('✅ Generated favicon.ico');
  } catch (error) {
    console.error('❌ Failed to generate favicon.ico:', error.message);
  }

  console.log('🎉 Icon generation complete!');
}

generateIcons().catch(console.error); 
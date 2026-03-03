const puppeteer = require('./node_modules/puppeteer');
const fs = require('fs');
const path = require('path');

const designsDir = '/Users/tugrulfirat/designs';
const outputDir = '/Users/tugrulfirat/designs/screenshots';

// Pages to screenshot per project (index.html + key pages)
const pagesToCapture = [
  'index.html',
  'home.html',
  'about.html',
  'contact.html',
  'shop.html',
  'cart.html',
  'account.html',
  'checkout.html'
];

async function screenshotFolder(folderPath) {
  // Resolve to absolute path
  folderPath = path.resolve(folderPath);
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const projectName = path.basename(folderPath);
  const projectOutputDir = path.join(outputDir, projectName);
  
  if (!fs.existsSync(projectOutputDir)) {
    fs.mkdirSync(projectOutputDir, { recursive: true });
  }
  
  // Only index files
  const files = fs.readdirSync(folderPath).filter(f => f === 'index.html' || f === 'index-*.html');
  
  console.log(`\n📁 ${projectName}: ${files.length} HTML files found`);
  
  for (const file of files) {
    const filePath = `file://${folderPath}/${file}`;
    const outputPath = path.join(projectOutputDir, `${file.replace('.html', '.png')}`);
    
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 390, height: 844 }); // iPhone 14 Pro
      await page.goto(filePath, { waitUntil: 'networkidle0', timeout: 15000 });
      
      // Wait a bit for any lazy-loaded content
      await new Promise(r => setTimeout(r, 1000));
      
      await page.screenshot({ path: outputPath, fullPage: false });
      console.log(`  ✅ ${file} → ${path.basename(outputPath)}`);
      
      await page.close();
    } catch (err) {
      console.log(`  ❌ ${file}: ${err.message}`);
    }
  }
  
  await browser.close();
  console.log(`\n📸 Screenshots saved to: ${projectOutputDir}`);
}

async function main() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const args = process.argv.slice(2);
  
  if (args.length > 0) {
    // Screenshot specific folder
    await screenshotFolder(args[0]);
  } else {
    // Screenshot all folders in designs/
    const folders = fs.readdirSync(designsDir).filter(f => {
      const stat = fs.statSync(path.join(designsDir, f));
      return stat.isDirectory() && !f.startsWith('.');
    });
    
    console.log(`Found ${folders.length} design folders. Starting screenshots...\n`);
    
    for (const folder of folders) {
      await screenshotFolder(path.join(designsDir, folder));
    }
  }
  
  console.log('\n✅ All done!');
}

main().catch(console.error);

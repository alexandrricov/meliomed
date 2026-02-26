import sharp from "sharp";
import { mkdir, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, "../public/icons");
const faviconPath = resolve(__dirname, "../public/favicon.svg");

await mkdir(outDir, { recursive: true });

// Read the existing favicon SVG and upscale the viewBox for sharp rendering
const faviconSvg = await readFile(faviconPath, "utf-8");

// Create a high-res version (512px) by replacing the viewBox but keeping proportions
const hiResSvg = faviconSvg
  .replace('viewBox="0 0 32 32"', 'viewBox="0 0 32 32" width="512" height="512"');

// Maskable version: full-bleed gradient (no rounded corners), "M" in safe zone (80%)
const maskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#8bec90"/>
      <stop offset="100%" stop-color="#17d792"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" fill="url(#g)"/>
  <text x="256" y="375" text-anchor="middle" font-family="Lato,Arial,Helvetica,sans-serif" font-weight="900" font-size="340" fill="#fff">M</text>
</svg>`;

const sizes = [
  { name: "apple-touch-icon.png", size: 180 },
  { name: "pwa-192.png", size: 192 },
  { name: "pwa-512.png", size: 512 },
];

const svgBuf = Buffer.from(hiResSvg);

for (const { name, size } of sizes) {
  await sharp(svgBuf).resize(size, size).png().toFile(resolve(outDir, name));
  console.log(`Created ${name} (${size}×${size})`);
}

// Maskable icon
await sharp(Buffer.from(maskableSvg))
  .resize(512, 512)
  .png()
  .toFile(resolve(outDir, "maskable-512.png"));
console.log("Created maskable-512.png (512×512)");

console.log("\nAll icons generated in public/icons/");

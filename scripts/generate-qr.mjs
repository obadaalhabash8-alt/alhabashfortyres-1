/**
 * Generates print-ready SVG QR codes for each shop branch.
 * Each QR links directly to the rating form on that shop's page.
 *
 * Usage:
 *   SITE_URL=https://your-domain.com node scripts/generate-qr.mjs
 *
 * Or edit the SITE_URL constant below and just run:
 *   node scripts/generate-qr.mjs
 *
 * Output: qrpictures/<shop-name>.svg  (vector — infinite resolution, ideal for glass printing)
 */

import QRCode from 'qrcode'
import { mkdir, writeFile } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

// ── Configuration ──────────────────────────────────────────────────────────
// Set your production URL here, or pass it as SITE_URL env variable.
const SITE_URL = process.env.SITE_URL?.replace(/\/$/, '') || 'https://movably-overtame-len.ngrok-free.dev'

const shops = [
  { id: 1, filename: 'main-branch-damascus' },
  { id: 2, filename: 'north-branch-riyadh' },
  { id: 3, filename: 'south-branch-riyadh' },
]

// QR options — level H = 30% error correction, best for physical surfaces
const QR_OPTIONS = {
  type: 'svg',
  errorCorrectionLevel: 'H',
  margin: 2,
  color: { dark: '#000000', light: '#FFFFFF' },
}
// ───────────────────────────────────────────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '..', 'qrpictures')

await mkdir(outDir, { recursive: true })

console.log(`Generating QR codes → ${outDir}\n`)

for (const shop of shops) {
  const url = `${SITE_URL}/shops/${shop.id}#rate-form`
  const outPath = join(outDir, `${shop.filename}.svg`)

  const svg = await QRCode.toString(url, QR_OPTIONS)
  await writeFile(outPath, svg, 'utf8')

  console.log(`✓  ${shop.filename}.svg`)
  console.log(`   ${url}\n`)
}

console.log('Done. Open qrpictures/ and send the SVG files to your printer.')

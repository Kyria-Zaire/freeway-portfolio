/**
 * Script de conversion SVG → PNG pour l'image Open Graph
 * Exécuter avec: node scripts/convert-og-image.mjs
 */

import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

const svgPath = join(publicDir, 'og-image.svg');
const pngPath = join(publicDir, 'og-image.png');

async function convert() {
  try {
    console.log('🔄 Conversion SVG → PNG en cours...');
    
    const svgBuffer = readFileSync(svgPath);
    
    await sharp(svgBuffer)
      .resize(1200, 630)
      .png({ quality: 100 })
      .toFile(pngPath);
    
    console.log('✅ Image OG créée avec succès !');
    console.log(`📁 Fichier: ${pngPath}`);
    console.log('🚀 Prêt pour le partage LinkedIn/WhatsApp !');
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

convert();


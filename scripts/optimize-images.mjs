import { stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Largura = tamanho exibido no site × 2 (telas retina). Os .png originais são mantidos.
const IMAGES = [
  { src: "public/foto_header.webp", width: 1160, quality: 80 },
  { src: "public/foto_header_fundo.webp", width: 1160, quality: 70 },
  { src: "public/servicos/eletrica.webp", width: 760, quality: 65 },
  { src: "public/servicos/seguranca-eletronica.webp", width: 760, quality: 65 },
  { src: "public/servicos/solucoes-tv.webp", width: 760, quality: 65 },
  { src: "public/servicos/starlink.webp", width: 760, quality: 65 },
];

const kb = async (file) => Math.round((await stat(file)).size / 1024);

for (const { src, width, quality } of IMAGES) {
  const out = src.replace(/\.png$/i, ".webp");
  try {
    await sharp(src)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality, alphaQuality: 90, effort: 5 }) // mantém a transparência da foto recortada
      .toFile(out);
    console.log(`${path.basename(src)}: ${await kb(src)} KB → ${await kb(out)} KB`);
  } catch (err) {
    console.warn(`Pulado ${src}: ${err.message}`);
  }
}
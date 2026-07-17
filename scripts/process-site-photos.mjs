import fs from "node:fs/promises";
import path from "node:path";
import { exec } from "node:child_process";
import { promisify } from "node:util";
import sharp from "sharp";

const execAsync = promisify(exec);

const sourceDir = path.join(process.cwd(), "app", "fotos-del-sitio");
const tempDir = path.join(process.cwd(), ".next", "photo-review", "selected");
const outDir = path.join(process.cwd(), "public", "site-photos");
const heifConvert = path.join(
  process.env.USERPROFILE,
  ".cache",
  "codex-runtimes",
  "codex-primary-runtime",
  "dependencies",
  "bin",
  "heif-convert.cmd"
);

const assets = [
  {
    source: "IMG_0934.HEIC",
    name: "hero-sucursal-autos",
    width: 1920,
    height: 1080,
    position: "center",
  },
  {
    source: "IMG_0934.HEIC",
    name: "hero-sucursal-autos-mobile",
    width: 900,
    height: 1200,
    position: "center",
  },
  {
    source: "IMG_1017.HEIC",
    name: "taller-interior-autos",
    width: 1600,
    height: 1050,
    position: "center",
  },
  {
    source: "IMG_1017.HEIC",
    name: "taller-interior-autos-mobile",
    width: 900,
    height: 1200,
    position: "center",
  },
  {
    source: "IMG_0915.HEIC",
    name: "auto-rampa-servicio",
    width: 1600,
    height: 1050,
    position: "attention",
  },
  {
    source: "IMG_0803.HEIC",
    name: "mecanica-auto-elevado",
    width: 1600,
    height: 1050,
    position: "attention",
  },
  {
    source: "IMG_1048.HEIC",
    name: "lavado-auto-premium",
    width: 1600,
    height: 1050,
    position: "attention",
  },
  {
    source: "IMG_0788.HEIC",
    name: "scanner-alineacion-equipo",
    width: 1600,
    height: 1050,
    position: "center",
  },
  {
    source: "IMG_1024.HEIC",
    name: "sucursal-frente",
    width: 1200,
    height: 820,
    position: "center",
  },
  {
    source: "IMG_0911.HEIC",
    name: "sucursal-exterior-autos",
    width: 1200,
    height: 820,
    position: "center",
  },
  {
    source: "IMG_1022.HEIC",
    name: "sucursal-interior-auto",
    width: 1200,
    height: 820,
    position: "center",
  },
  {
    source: "IMG_1060.HEIC",
    name: "sucursal-fachada",
    width: 1200,
    height: 820,
    position: "center",
  },
  {
    source: "IMG_0795.HEIC",
    name: "sucursal-rampa-autos",
    width: 1200,
    height: 820,
    position: "center",
  },
];

await fs.mkdir(tempDir, { recursive: true });
await fs.mkdir(outDir, { recursive: true });

async function convert(source) {
  const input = path.join(sourceDir, source);
  const output = path.join(tempDir, source.replace(/\.heic$/i, ".jpg"));

  try {
    await fs.access(output);
    return output;
  } catch {
    await execAsync(`"${heifConvert}" "${input}" "${output}"`);
    return output;
  }
}

for (const asset of assets) {
  const converted = await convert(asset.source);
  await sharp(converted)
    .rotate()
    .resize(asset.width, asset.height, {
      fit: "cover",
      position: asset.position,
    })
    .modulate({ brightness: 1.04, saturation: 1.12 })
    .linear(1.08, -7)
    .sharpen({ sigma: 0.8, m1: 0.7, m2: 1.4 })
    .webp({ quality: 84, effort: 5 })
    .toFile(path.join(outDir, `${asset.name}.webp`));
}

console.log(`Created ${assets.length} optimized photos in ${outDir}`);

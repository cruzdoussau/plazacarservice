import fs from "node:fs/promises";
import path from "node:path";
import { exec } from "node:child_process";
import { promisify } from "node:util";
import sharp from "sharp";

const sourceDir = path.join(process.cwd(), "app", "fotos-del-sitio");
const outDir = path.join(process.cwd(), ".next", "photo-review");
const convertedDir = path.join(outDir, "converted");
const heifConvert = path.join(
  process.env.USERPROFILE,
  ".cache",
  "codex-runtimes",
  "codex-primary-runtime",
  "dependencies",
  "bin",
  "heif-convert.cmd"
);
const execAsync = promisify(exec);
const thumbWidth = 260;
const thumbHeight = 195;
const labelHeight = 32;
const gap = 14;
const columns = 4;
const rows = 5;
const perSheet = columns * rows;

await fs.mkdir(outDir, { recursive: true });
await fs.mkdir(convertedDir, { recursive: true });

const files = (await fs.readdir(sourceDir))
  .filter((name) => name.toLowerCase().endsWith(".heic"))
  .sort();

function labelSvg(label) {
  return Buffer.from(`
    <svg width="${thumbWidth}" height="${labelHeight}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#111318"/>
      <text x="12" y="21" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="#ffffff">${label}</text>
    </svg>
  `);
}

for (let sheetIndex = 0; sheetIndex < Math.ceil(files.length / perSheet); sheetIndex += 1) {
  const sheetFiles = files.slice(sheetIndex * perSheet, (sheetIndex + 1) * perSheet);
  const width = columns * thumbWidth + (columns + 1) * gap;
  const height = rows * (thumbHeight + labelHeight) + (rows + 1) * gap;
  const composites = [];

  for (let index = 0; index < sheetFiles.length; index += 1) {
    const file = sheetFiles[index];
    const col = index % columns;
    const row = Math.floor(index / columns);
    const left = gap + col * (thumbWidth + gap);
    const top = gap + row * (thumbHeight + labelHeight + gap);
    const converted = path.join(convertedDir, file.replace(/\.heic$/i, ".jpg"));

    try {
      await fs.access(converted);
    } catch {
      await execAsync(
        `"${heifConvert}" "${path.join(sourceDir, file)}" "${converted}"`
      );
    }

    const thumb = await sharp(converted)
      .rotate()
      .resize(thumbWidth, thumbHeight, { fit: "cover", position: "attention" })
      .modulate({ brightness: 1.04, saturation: 1.08 })
      .linear(1.06, -5)
      .jpeg({ quality: 82 })
      .toBuffer();

    composites.push({ input: thumb, left, top });
    composites.push({ input: labelSvg(file), left, top: top + thumbHeight });
  }

  await sharp({
    create: {
      width,
      height,
      channels: 3,
      background: "#f4f5f7",
    },
  })
    .composite(composites)
    .jpeg({ quality: 88 })
    .toFile(path.join(outDir, `contact-sheet-${String(sheetIndex + 1).padStart(2, "0")}.jpg`));
}

console.log(`Created ${Math.ceil(files.length / perSheet)} contact sheets in ${outDir}`);

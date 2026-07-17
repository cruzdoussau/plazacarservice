import { execFile } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readFile, readdir, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import sharp from "sharp";

const execFileAsync = promisify(execFile);
const root = process.cwd();
const sourceRoot = path.join(root, "app", "fotos-del-sitio");
const publicRoot = path.join(root, "public", "site-photos");
const tmpRoot = path.join(root, ".tmp", "gallery-processing");
const generatedFile = path.join(root, "app", "generated-galleries.ts");

const heifConvertCandidates = [
  process.env.HEIF_CONVERT,
  path.join(
    process.env.USERPROFILE ?? "",
    ".cache",
    "codex-runtimes",
    "codex-primary-runtime",
    "dependencies",
    "bin",
    "heif-convert.cmd"
  ),
  "heif-convert.cmd",
].filter(Boolean);

const imageExtensions = new Set([".heic", ".heif", ".jpg", ".jpeg", ".png", ".webp"]);

const serviceSources = [
  ["mantencion-kilometraje", "mantencion por kilometraje"],
  ["frenos", "mantencion de frenos"],
  ["alineacion-balanceo", "alineacion y balanceo"],
  ["cambio-aceite", "cambio de aceite"],
  ["scanner", "scanner automotriz"],
  ["limpieza", "servicio de lavado"],
  ["pintura", "pintura"],
  ["mecanica-compleja", "mecanica compleja"],
  ["baterias", "venta de baterias"],
  ["neumaticos", "venta de neumaticos"],
  ["aire-acondicionado", "aire acondicionado"],
];

function sortByName(files) {
  return files.sort((a, b) => a.name.localeCompare(b.name, "es", { numeric: true }));
}

async function listImages(folder) {
  const fullPath = path.join(sourceRoot, folder);

  try {
    const entries = await readdir(fullPath, { withFileTypes: true });
    return sortByName(
      entries.filter((entry) => entry.isFile() && imageExtensions.has(path.extname(entry.name).toLowerCase()))
    ).map((entry) => path.join(fullPath, entry.name));
  } catch {
    return [];
  }
}

async function findHeifConvert() {
  for (const candidate of heifConvertCandidates) {
    if (candidate !== "heif-convert.cmd" && !existsSync(candidate)) {
      continue;
    }

    try {
      await runCmd(candidate, ["--help"], 5000);
      return candidate;
    } catch (error) {
      const output = `${error.stdout ?? ""}${error.stderr ?? ""}`;
      if (output.toLowerCase().includes("usage") || output.toLowerCase().includes("heif-convert")) {
        return candidate;
      }
    }
  }

  return null;
}

function psQuote(value) {
  return `'${String(value).replaceAll("'", "''")}'`;
}

async function runCmd(command, args, timeout) {
  const line = ["&", psQuote(command), ...args.map(psQuote)].join(" ");
  return execFileAsync("powershell.exe", ["-NoProfile", "-Command", line], { timeout });
}

async function readableInput(file, index, heifConvert) {
  const ext = path.extname(file).toLowerCase();

  if (ext !== ".heic" && ext !== ".heif") {
    return file;
  }

  if (!heifConvert) {
    throw new Error("No se encontro heif-convert para convertir imagenes HEIC.");
  }

  await mkdir(tmpRoot, { recursive: true });
  const jpgPath = path.join(tmpRoot, `converted-${index}.jpg`);
  await runCmd(heifConvert, [file, jpgPath], 30000);
  return jpgPath;
}

async function processImages({ sourceFolder, outputFolder, filePrefix, publicPrefix, altPrefix }) {
  const files = await listImages(sourceFolder);
  const outputPath = path.join(publicRoot, outputFolder);
  const generated = [];

  await rm(outputPath, { recursive: true, force: true });
  await mkdir(outputPath, { recursive: true });

  const heifConvert = await findHeifConvert();

  for (let index = 0; index < files.length; index += 1) {
    const input = await readableInput(files[index], index, heifConvert);
    const imageIndex = String(index + 1).padStart(2, "0");
    const filename = `${filePrefix}-${imageIndex}.webp`;
    const destination = path.join(outputPath, filename);

    await sharp(input)
      .rotate()
      .resize(1600, 1060, { fit: "cover", position: "attention", withoutEnlargement: true })
      .modulate({ brightness: 1.03, saturation: 1.06 })
      .linear(1.04, -4)
      .sharpen({ sigma: 0.65 })
      .webp({ quality: 84, effort: 5 })
      .toFile(destination);

    generated.push({
      src: `${publicPrefix}/${filename}`,
      alt: `${altPrefix} ${index + 1}`,
    });
  }

  return generated;
}

async function redactZones(file, zones) {
  if (!zones.length || !existsSync(file)) {
    return;
  }

  const source = await readFile(file);
  const overlays = await Promise.all(
    zones.map(async (zone) => ({
      input: await sharp(source).extract(zone).blur(28).toBuffer(),
      left: zone.left,
      top: zone.top,
    }))
  );
  const tmpFile = `${file}.tmp.webp`;

  await sharp(source).composite(overlays).webp({ quality: 84, effort: 5 }).toFile(tmpFile);
  await rm(file, { force: true });
  await rename(tmpFile, file);
}

function tsString(value) {
  return JSON.stringify(value, null, 2);
}

function renderGeneratedFile(homeGallery, serviceGalleries) {
  return `export const homeGalleryImages = ${tsString(
    homeGallery.map((image, index) => ({
      id: `home-gallery-${String(index + 1).padStart(2, "0")}`,
      src: image.src,
      alt: image.alt,
      imageClass: "object-cover object-center",
    }))
  )} as const;

export const serviceGalleries = ${tsString(serviceGalleries)} as const;
`;
}

async function main() {
  await rm(tmpRoot, { recursive: true, force: true });

  const homeGallery = await processImages({
    sourceFolder: "galeria - home",
    outputFolder: "home-gallery",
    filePrefix: "home-gallery",
    publicPrefix: "/site-photos/home-gallery",
    altPrefix: "Galeria Plaza Car Service",
  });
  await redactZones(path.join(publicRoot, "home-gallery", "home-gallery-05.webp"), [
    { left: 450, top: 705, width: 130, height: 58 },
  ]);

  const serviceGalleries = {};

  for (const [serviceId, sourceFolder] of serviceSources) {
    const images = await processImages({
      sourceFolder,
      outputFolder: path.join("service-galleries", serviceId),
      filePrefix: serviceId,
      publicPrefix: `/site-photos/service-galleries/${serviceId}`,
      altPrefix: `Servicio ${serviceId}`,
    });

    serviceGalleries[serviceId] = images.map((image) => image.src);
  }

  await writeFile(generatedFile, renderGeneratedFile(homeGallery, serviceGalleries), "utf8");
  await rm(tmpRoot, { recursive: true, force: true });

  console.log(`Home gallery: ${homeGallery.length} imagenes`);
  for (const [serviceId, images] of Object.entries(serviceGalleries)) {
    console.log(`${serviceId}: ${images.length} imagenes`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

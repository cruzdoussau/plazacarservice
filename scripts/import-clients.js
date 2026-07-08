const fs = require('fs');
const path = require('path');
const { neon } = require('@neondatabase/serverless');

// Función para cargar la variable de entorno DATABASE_URL desde .env.local
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local');
  if (!fs.existsSync(envPath)) {
    console.error("Error: No se encontró el archivo .env.local.");
    console.error("Por favor, asegúrate de crear el archivo .env.local y configurar DATABASE_URL.");
    process.exit(1);
  }
  
  const content = fs.readFileSync(envPath, 'utf8');
  const lines = content.split(/\r?\n/);
  let databaseUrl = '';
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('DATABASE_URL=')) {
      databaseUrl = trimmed.substring('DATABASE_URL='.length).trim();
      // Eliminar comillas si existen
      if (databaseUrl.startsWith('"') && databaseUrl.endsWith('"')) {
        databaseUrl = databaseUrl.slice(1, -1);
      } else if (databaseUrl.startsWith("'") && databaseUrl.endsWith("'")) {
        databaseUrl = databaseUrl.slice(1, -1);
      }
      break;
    }
  }
  
  if (!databaseUrl) {
    console.error("Error: No se encontró la variable DATABASE_URL en el archivo .env.local.");
    process.exit(1);
  }
  
  return databaseUrl;
}

function cleanRut(value) {
  if (!value) return '';
  return value.replace(/[^0-9kK]/g, "").toUpperCase();
}

function cleanPlate(value) {
  if (!value) return '';
  return value.replace(/[^0-9a-zA-Z]/g, "").toUpperCase();
}

async function main() {
  const dbUrl = loadEnv();
  const sql = neon(dbUrl);

  const csvPath = path.join(__dirname, '..', 'clientes.csv');
  if (!fs.existsSync(csvPath)) {
    console.error("Error: El archivo clientes.csv no existe en la raíz del proyecto.");
    process.exit(1);
  }

  console.log("Leyendo clientes.csv...");
  // Leemos como 'latin1' para decodificar acentos y Ñs del Excel en español de forma correcta
  const content = fs.readFileSync(csvPath, 'latin1');
  const lines = content.split(/\r?\n/);

  if (lines.length <= 1) {
    console.error("Error: El archivo clientes.csv está vacío o solo contiene la cabecera.");
    process.exit(1);
  }

  // Parsear la cabecera
  const headerLine = lines[0];
  const headers = headerLine.split(';').map(h => h.trim().toUpperCase());
  console.log("Cabeceras detectadas:", headers);

  // Buscar índices de las columnas
  const idxNombre = headers.indexOf('NOMBRE');
  const idxRut = headers.indexOf('RUT');
  const idxTelefono = headers.indexOf('TELEFONO');
  const idxPatente = headers.indexOf('PATENTE');
  const idxMarca = headers.indexOf('MARCA');
  
  // Usar indexación flexible para evitar problemas con espacios en blanco (ej. 'LAVADOS ')
  const idxLavados = headers.findIndex(h => h.startsWith('LAVADOS'));
  const idxPreRevision = headers.indexOf('PRE-REVISION');
  const idxRevisionFrenos = headers.indexOf('REVISION FRENOS');
  const idxAhorroPesos = headers.indexOf('AHORRO PESOS');
  const idxIngreso = headers.indexOf('INGRESO');

  if (idxNombre === -1) {
    console.error("Error: No se encontró la columna NOMBRE en la cabecera.");
    process.exit(1);
  }

  console.log("Iniciando importación masiva...");
  let successCount = 0;
  let errorCount = 0;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue; // omitir líneas vacías

    const cols = line.split(';').map(c => c.trim());
    
    const name = cols[idxNombre] || '';
    const rut = idxRut !== -1 ? (cols[idxRut] || '') : '';
    const phone = idxTelefono !== -1 ? (cols[idxTelefono] || '') : '';
    const plate = idxPatente !== -1 ? (cols[idxPatente] || '') : '';
    const brand = idxMarca !== -1 ? (cols[idxMarca] || '') : '';
    
    const washes = idxLavados !== -1 ? (parseInt(cols[idxLavados]) || 0) : 0;
    const technicalReview = idxPreRevision !== -1 ? (parseInt(cols[idxPreRevision]) || 0) : 0;
    const brakeReview = idxRevisionFrenos !== -1 ? (parseInt(cols[idxRevisionFrenos]) || 0) : 0;
    const savings = idxAhorroPesos !== -1 ? (parseInt(cols[idxAhorroPesos]) || 0) : 0;
    const referrer = idxIngreso !== -1 ? (cols[idxIngreso] || '') : '';

    if (!name) {
      console.log(`[Línea ${i + 1}] Omitida: Nombre vacío.`);
      continue;
    }

    const rutKey = cleanRut(rut);
    const plateKey = cleanPlate(plate);

    // Generar ID del cliente
    let id = `${rutKey}-${plateKey}`.replace(/^-|-$/, '').toLowerCase();
    if (!id) {
      id = `client-${Date.now()}-${i}`;
    }

    const today = new Date().toISOString().slice(0, 10);

    try {
      // 1. Guardar o actualizar datos de contacto/personales del cliente
      await sql`
        INSERT INTO ahorro_plus_clients 
          (id, registered_at, name, rut, rut_key, phone, plate, brand, referrer)
        VALUES 
          (${id}, ${today}, ${name.toUpperCase()}, ${rut}, ${rutKey}, ${phone}, ${plateKey}, ${brand.toUpperCase()}, ${referrer})
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          phone = EXCLUDED.phone,
          brand = EXCLUDED.brand,
          referrer = EXCLUDED.referrer
      `;

      // 2. Guardar o actualizar saldo/uso de sus beneficios
      await sql`
        INSERT INTO ahorro_plus_usage
          (client_id, washes, technical_review, brake_review, savings)
        VALUES
          (${id}, ${washes}, ${technicalReview}, ${brakeReview}, ${savings})
        ON CONFLICT (client_id) DO UPDATE SET
          washes = EXCLUDED.washes,
          technical_review = EXCLUDED.technical_review,
          brake_review = EXCLUDED.brake_review,
          savings = EXCLUDED.savings,
          updated_at = NOW()
      `;

      successCount++;
      if (successCount % 50 === 0) {
        console.log(`Progreso: ${successCount} registros importados correctamente...`);
      }
    } catch (err) {
      console.error(`[Error] Falló la inserción en línea ${i + 1} (${name}):`, err.message);
      errorCount++;
    }
  }

  console.log("\n------------------------------------------------");
  console.log(`Importación finalizada con éxito.`);
  console.log(`- Clientes procesados/actualizados: ${successCount}`);
  console.log(`- Errores encontrados: ${errorCount}`);
  console.log("------------------------------------------------\n");
}

main().catch(console.error);

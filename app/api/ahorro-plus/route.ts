import { neon } from "@neondatabase/serverless";
import {
  benefitLimits,
  preferredClients,
  type BenefitKey,
} from "../../intranet-ahorro-plus/data";

export const dynamic = "force-dynamic";

type CreateClientPayload = {
  action: "createClient";
  adminCode: string;
  client: {
    name: string;
    rut: string;
    phone: string;
    plate: string;
    brand: string;
  };
};

type RedeemPayload = {
  action: "redeem";
  adminCode: string;
  clientId: string;
  benefit: BenefitKey;
  amount: number;
  note: string;
};

type ResetPayload = {
  action: "reset";
  adminCode: string;
  clientId: string;
};

type VerifyPayload = {
  action: "verify";
  adminCode: string;
};

type Payload = CreateClientPayload | RedeemPayload | ResetPayload | VerifyPayload;

const adminPassword = process.env.AHORRO_PLUS_ADMIN_PASSWORD ?? "plazacar2026";

function getDatabaseUrl() {
  return process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? "";
}

function getSql() {
  const databaseUrl = getDatabaseUrl();
  if (!databaseUrl) {
    throw new Error("DATABASE_URL no configurada en Vercel.");
  }
  return neon(databaseUrl);
}

function cleanRut(value: string) {
  return value.replace(/[^0-9kK]/g, "").toUpperCase();
}

function cleanPlate(value: string) {
  return value.replace(/[^0-9a-zA-Z]/g, "").toUpperCase();
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function emptyUsage() {
  return {
    washes: 0,
    technicalReview: 0,
    brakeReview: 0,
    savings: 0,
  };
}

async function ensureSchema() {
  const sql = getSql();

  await sql`
    CREATE TABLE IF NOT EXISTS ahorro_plus_clients (
      id TEXT PRIMARY KEY,
      registered_at TEXT NOT NULL,
      name TEXT NOT NULL,
      rut TEXT NOT NULL,
      rut_key TEXT NOT NULL,
      phone TEXT NOT NULL DEFAULT '',
      plate TEXT NOT NULL DEFAULT '',
      brand TEXT NOT NULL DEFAULT '',
      referrer TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS ahorro_plus_usage (
      client_id TEXT PRIMARY KEY REFERENCES ahorro_plus_clients(id) ON DELETE CASCADE,
      washes INTEGER NOT NULL DEFAULT 0,
      technical_review INTEGER NOT NULL DEFAULT 0,
      brake_review INTEGER NOT NULL DEFAULT 0,
      savings INTEGER NOT NULL DEFAULT 0,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS ahorro_plus_logs (
      id TEXT PRIMARY KEY,
      date TEXT NOT NULL,
      client_id TEXT NOT NULL REFERENCES ahorro_plus_clients(id) ON DELETE CASCADE,
      benefit TEXT NOT NULL,
      amount INTEGER NOT NULL,
      note TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  for (const client of preferredClients) {
    await sql`
      INSERT INTO ahorro_plus_clients
        (id, registered_at, name, rut, rut_key, phone, plate, brand, referrer)
      VALUES
        (${client.id}, ${client.registeredAt}, ${client.name}, ${client.rut},
         ${client.rutKey}, ${client.phone}, ${client.plate}, ${client.brand}, ${client.referrer})
      ON CONFLICT (id) DO NOTHING
    `;
  }
}

async function getState() {
  await ensureSchema();
  const sql = getSql();

  const clients = await sql`
    SELECT
      c.id,
      c.registered_at AS "registeredAt",
      c.name,
      c.rut,
      c.rut_key AS "rutKey",
      c.phone,
      c.plate,
      c.brand,
      c.referrer,
      COALESCE(u.washes, 0) AS washes,
      COALESCE(u.technical_review, 0) AS "technicalReview",
      COALESCE(u.brake_review, 0) AS "brakeReview",
      COALESCE(u.savings, 0) AS savings
    FROM ahorro_plus_clients c
    LEFT JOIN ahorro_plus_usage u ON u.client_id = c.id
    ORDER BY c.name ASC
  `;

  const logs = await sql`
    SELECT
      id,
      date,
      client_id AS "clientId",
      benefit,
      amount,
      note
    FROM ahorro_plus_logs
    ORDER BY created_at DESC
    LIMIT 200
  `;

  return Response.json({ clients, logs });
}

function assertAdmin(adminCode: string) {
  if (adminCode !== adminPassword) {
    return Response.json({ error: "Clave de administrador incorrecta." }, { status: 401 });
  }
}

function remaining(current: number, benefit: BenefitKey) {
  return Math.max(0, benefitLimits[benefit] - current);
}

export async function GET() {
  try {
    return await getState();
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Error de base de datos." },
      { status: 503 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await ensureSchema();
    const payload = (await request.json()) as Payload;
    const adminError = assertAdmin(payload.adminCode);
    if (adminError) return adminError;

    if (payload.action === "verify") {
      return Response.json({ success: true });
    }

    const sql = getSql();

    if (payload.action === "createClient") {
      const rutKey = cleanRut(payload.client.rut);
      const plate = cleanPlate(payload.client.plate);
      const name = payload.client.name.trim().toUpperCase();
      const id = `${rutKey}-${plate || Date.now()}`.toLowerCase();

      if (!name || !rutKey || !plate) {
        return Response.json(
          { error: "Nombre, RUT y patente son obligatorios." },
          { status: 400 }
        );
      }

      await sql`
        INSERT INTO ahorro_plus_clients
          (id, registered_at, name, rut, rut_key, phone, plate, brand, referrer)
        VALUES
          (${id}, ${today()}, ${name}, ${payload.client.rut.trim().toUpperCase()},
           ${rutKey}, ${payload.client.phone.trim()}, ${plate},
           ${payload.client.brand.trim().toUpperCase()}, '')
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          phone = EXCLUDED.phone,
          brand = EXCLUDED.brand
      `;

      return await getState();
    }

    if (payload.action === "reset") {
      await sql`DELETE FROM ahorro_plus_usage WHERE client_id = ${payload.clientId}`;
      await sql`
        INSERT INTO ahorro_plus_logs (id, date, client_id, benefit, amount, note)
        VALUES (${`${payload.clientId}-${Date.now()}`}, ${today()}, ${payload.clientId},
          'reset', 0, 'Beneficios restaurados')
      `;
      return await getState();
    }

    if (payload.action === "redeem") {
      const benefit = payload.benefit;
      const amount =
        benefit === "savings"
          ? Math.max(0, Math.round(Number(payload.amount)))
          : 1;

      if (!benefitLimits[benefit] || amount <= 0) {
        return Response.json({ error: "Beneficio o monto invalido." }, { status: 400 });
      }

      const rows = await sql`
        SELECT
          COALESCE(washes, 0) AS washes,
          COALESCE(technical_review, 0) AS "technicalReview",
          COALESCE(brake_review, 0) AS "brakeReview",
          COALESCE(savings, 0) AS savings
        FROM ahorro_plus_usage
        WHERE client_id = ${payload.clientId}
      `;
      const usage = rows[0] ?? emptyUsage();
      const available = remaining(Number(usage[benefit] ?? 0), benefit);

      if (amount > available) {
        return Response.json(
          { error: "El cliente no tiene saldo disponible para ese beneficio." },
          { status: 400 }
        );
      }

      await sql`
        INSERT INTO ahorro_plus_usage
          (client_id, washes, technical_review, brake_review, savings)
        VALUES
          (${payload.clientId}, 0, 0, 0, 0)
        ON CONFLICT (client_id) DO NOTHING
      `;

      if (benefit === "washes") {
        await sql`
          UPDATE ahorro_plus_usage
          SET washes = washes + ${amount}, updated_at = NOW()
          WHERE client_id = ${payload.clientId}
        `;
      } else if (benefit === "technicalReview") {
        await sql`
          UPDATE ahorro_plus_usage
          SET technical_review = technical_review + ${amount}, updated_at = NOW()
          WHERE client_id = ${payload.clientId}
        `;
      } else if (benefit === "brakeReview") {
        await sql`
          UPDATE ahorro_plus_usage
          SET brake_review = brake_review + ${amount}, updated_at = NOW()
          WHERE client_id = ${payload.clientId}
        `;
      } else {
        await sql`
          UPDATE ahorro_plus_usage
          SET savings = savings + ${amount}, updated_at = NOW()
          WHERE client_id = ${payload.clientId}
        `;
      }

      await sql`
        INSERT INTO ahorro_plus_logs (id, date, client_id, benefit, amount, note)
        VALUES (${`${payload.clientId}-${Date.now()}`}, ${today()},
          ${payload.clientId}, ${benefit}, ${amount}, ${payload.note.trim()})
      `;

      return await getState();
    }

    return Response.json({ error: "Accion no soportada." }, { status: 400 });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Error de base de datos." },
      { status: 500 }
    );
  }
}

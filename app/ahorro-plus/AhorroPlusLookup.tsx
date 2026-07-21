"use client";

import React, { useState } from "react";
import {
  benefitLabels,
  benefitLimits,
  type BenefitKey,
} from "../intranet-ahorro-plus/data";

type ClientProfile = {
  id: string;
  name: string;
  plate: string;
  brand: string;
  washes: number;
  technicalReview: number;
  brakeReview: number;
  savings: number;
};

type BenefitLog = {
  id: string;
  date: string;
  benefit: BenefitKey | "reset";
  amount: number;
  note: string;
};

type LookupResponse = {
  client?: ClientProfile;
  logs?: BenefitLog[];
  error?: string;
};

const benefitOrder: BenefitKey[] = [
  "washes",
  "technicalReview",
  "brakeReview",
  "savings",
];

function cleanRut(value: string) {
  return value.replace(/[^0-9kK]/g, "").toUpperCase();
}

function formatRutInput(value: string) {
  const cleaned = cleanRut(value).slice(0, 9);
  if (cleaned.length <= 1) return cleaned;
  return `${cleaned.slice(0, -1)}-${cleaned.slice(-1)}`;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value);
}

function remainingFor(client: ClientProfile, benefit: BenefitKey) {
  return Math.max(0, benefitLimits[benefit] - Number(client[benefit] ?? 0));
}

export default function AhorroPlusLookup() {
  const [rut, setRut] = useState("");
  const [client, setClient] = useState<ClientProfile | null>(null);
  const [logs, setLogs] = useState<BenefitLog[]>([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const rutKey = cleanRut(rut);
    setClient(null);
    setLogs([]);
    setMessage("");

    if (rutKey.length < 7) {
      setMessage("Ingresa un RUT valido para revisar tus beneficios.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/ahorro-plus?rut=${encodeURIComponent(rutKey)}`,
        { cache: "no-store" }
      );
      const data = (await response.json()) as LookupResponse;
      if (!response.ok || !data.client) {
        throw new Error(data.error ?? "No fue posible consultar tus beneficios.");
      }
      setClient(data.client);
      setLogs(data.logs ?? []);
    } catch (caught) {
      setMessage(
        caught instanceof Error
          ? caught.message
          : "No fue posible consultar tus beneficios."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section
      id="consulta-puntos"
      className="border-y border-white/10 bg-[#08090b] px-5 py-10 lg:px-10"
    >
      <div className="mx-auto grid max-w-[1500px] gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-red-500">
            Consulta tus beneficios
          </p>
          <h2 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
            Revisa tu saldo Ahorro Plus
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/65">
            Ingresa tu RUT para ver tus beneficios y ahorro pesos disponibles.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
            <input
              value={rut}
              onChange={(event) => setRut(formatRutInput(event.target.value))}
              placeholder="Ingresa tu RUT"
              inputMode="text"
              maxLength={10}
              className="h-[52px] rounded-lg border border-white/10 bg-white px-4 text-sm font-black text-black outline-none transition focus:border-red-500"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="h-[52px] rounded-lg bg-red-600 px-6 text-sm font-black uppercase text-white transition hover:bg-[#c83a42] disabled:cursor-wait disabled:opacity-60"
            >
              {isLoading ? "Consultando" : "Revisar saldo"}
            </button>
          </form>

          {message && (
            <div className="mt-4 rounded-lg border border-red-500/25 bg-red-600/10 p-4 text-sm font-bold text-white/75">
              {message}
            </div>
          )}
        </div>

        <div className="rounded-lg border border-white/10 bg-[#15171b] p-5 shadow-2xl">
          {client ? (
            <>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-red-500">
                Perfil encontrado
              </p>
              <h3 className="mt-2 text-3xl font-black">{client.name}</h3>
              <p className="mt-1 text-sm font-bold text-white/55">
                {client.plate || "Patente registrada"} |{" "}
                {client.brand || "Vehiculo registrado"}
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {benefitOrder.map((benefit) => {
                  const available = remainingFor(client, benefit);
                  const used = Number(client[benefit] ?? 0);
                  const isSavings = benefit === "savings";
                  return (
                    <div key={benefit} className="rounded-lg bg-white/5 p-4">
                      <p className="text-xs font-black text-white/45">
                        {benefitLabels[benefit]}
                      </p>
                      <p className="mt-2 text-3xl font-black">
                        {isSavings ? formatCurrency(available) : available}
                      </p>
                      <p className="mt-1 text-xs font-bold text-white/45">
                        Usado: {isSavings ? formatCurrency(used) : used}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5">
                <p className="text-sm font-black">Ultimos movimientos</p>
                <div className="mt-2 grid gap-2">
                  {logs.length ? (
                    logs.map((log) => (
                      <div
                        key={log.id}
                        className="rounded-lg border border-white/10 px-3 py-2 text-xs font-bold text-white/58"
                      >
                        {log.date} |{" "}
                        {log.benefit === "reset"
                          ? "Beneficios restaurados"
                          : benefitLabels[log.benefit]}{" "}
                        |{" "}
                        {log.benefit === "savings"
                          ? formatCurrency(log.amount)
                          : log.amount}
                      </div>
                    ))
                  ) : (
                    <p className="rounded-lg border border-white/10 px-3 py-2 text-xs font-bold text-white/45">
                      Sin canjes registrados.
                    </p>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex min-h-[260px] items-center justify-center rounded-lg border border-dashed border-white/15 bg-black/20 p-6 text-center">
              <p className="max-w-md text-sm font-bold leading-relaxed text-white/52">
                Tu saldo aparecera aqui despues de ingresar un RUT registrado
                en el Programa Ahorro Plus.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

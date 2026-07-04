"use client";

import { useEffect, useMemo, useState } from "react";
import {
  benefitLabels,
  benefitLimits,
  preferredClients,
  type BenefitKey,
  type PreferredClient,
} from "./data";

type BenefitUsage = Record<BenefitKey, number>;

type BenefitLog = {
  id: string;
  date: string;
  clientId: string;
  benefit: BenefitKey;
  amount: number;
  note: string;
};

type DraftClient = {
  name: string;
  rut: string;
  phone: string;
  plate: string;
  brand: string;
};

const usageStorageKey = "plaza-preferente-benefit-usage-v1";
const customClientsStorageKey = "plaza-preferente-custom-clients-v1";
const logStorageKey = "plaza-preferente-benefit-log-v1";
const adminPassword = "plazacar2026";

const benefitOrder: BenefitKey[] = [
  "washes",
  "technicalReview",
  "brakeReview",
  "savings",
];

function cleanRut(value: string) {
  return value.replace(/[^0-9kK]/g, "").toUpperCase();
}

function cleanPlate(value: string) {
  return value.replace(/[^0-9a-zA-Z]/g, "").toUpperCase();
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value);
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function emptyUsage(): BenefitUsage {
  return {
    washes: 0,
    technicalReview: 0,
    brakeReview: 0,
    savings: 0,
  };
}

function remainingFor(usage: BenefitUsage, benefit: BenefitKey) {
  return Math.max(0, benefitLimits[benefit] - usage[benefit]);
}

function loadJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const saved = window.localStorage.getItem(key);
    return saved ? (JSON.parse(saved) as T) : fallback;
  } catch {
    window.localStorage.removeItem(key);
    return fallback;
  }
}

function makeClient(draft: DraftClient): PreferredClient {
  const rutKey = cleanRut(draft.rut);
  const plate = cleanPlate(draft.plate);
  return {
    id: `${rutKey}-${plate || Date.now()}`.toLowerCase(),
    registeredAt: today(),
    name: draft.name.trim().toUpperCase(),
    rut: draft.rut.trim().toUpperCase(),
    rutKey,
    phone: draft.phone.trim(),
    plate,
    brand: draft.brand.trim().toUpperCase(),
    referrer: "",
  };
}

export default function AhorroPlusIntranetPage() {
  const [usageByClient, setUsageByClient] = useState<Record<string, BenefitUsage>>(
    {}
  );
  const [customClients, setCustomClients] = useState<PreferredClient[]>([]);
  const [logs, setLogs] = useState<BenefitLog[]>([]);
  const [clientRut, setClientRut] = useState("");
  const [clientPlate, setClientPlate] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminQuery, setAdminQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [redeemNote, setRedeemNote] = useState("");
  const [draft, setDraft] = useState<DraftClient>({
    name: "",
    rut: "",
    phone: "",
    plate: "",
    brand: "",
  });

  useEffect(() => {
    setUsageByClient(loadJson<Record<string, BenefitUsage>>(usageStorageKey, {}));
    setCustomClients(
      loadJson<PreferredClient[]>(customClientsStorageKey, [])
    );
    setLogs(loadJson<BenefitLog[]>(logStorageKey, []));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(usageStorageKey, JSON.stringify(usageByClient));
  }, [usageByClient]);

  useEffect(() => {
    window.localStorage.setItem(
      customClientsStorageKey,
      JSON.stringify(customClients)
    );
  }, [customClients]);

  useEffect(() => {
    window.localStorage.setItem(logStorageKey, JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    const onStorage = () => {
      setUsageByClient(loadJson<Record<string, BenefitUsage>>(usageStorageKey, {}));
      setCustomClients(loadJson<PreferredClient[]>(customClientsStorageKey, []));
      setLogs(loadJson<BenefitLog[]>(logStorageKey, []));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const clients = useMemo(() => {
    const map = new Map<string, PreferredClient>();
    preferredClients.forEach((client) => map.set(client.id, client));
    customClients.forEach((client) => map.set(client.id, client));
    return Array.from(map.values()).sort((first, second) =>
      first.name.localeCompare(second.name, "es")
    );
  }, [customClients]);

  const selectedClient = clients.find((client) => client.id === selectedId);

  const clientProfile = useMemo(() => {
    const rut = cleanRut(clientRut);
    const plate = cleanPlate(clientPlate);
    if (!rut || !plate) return undefined;
    return clients.find(
      (client) => client.rutKey === rut && cleanPlate(client.plate) === plate
    );
  }, [clientPlate, clientRut, clients]);

  const filteredClients = useMemo(() => {
    const query = adminQuery.trim().toLowerCase();
    const rutQuery = cleanRut(adminQuery);
    const plateQuery = cleanPlate(adminQuery);
    if (!query) return clients.slice(0, 20);
    return clients
      .filter(
        (client) =>
          client.name.toLowerCase().includes(query) ||
          client.rut.toLowerCase().includes(query) ||
          client.rutKey.includes(rutQuery) ||
          client.phone.includes(query) ||
          client.plate.includes(plateQuery) ||
          client.brand.toLowerCase().includes(query)
      )
      .slice(0, 30);
  }, [adminQuery, clients]);

  const totals = useMemo(() => {
    return clients.reduce(
      (acc, client) => {
        const usage = usageByClient[client.id] ?? emptyUsage();
        acc.washes += remainingFor(usage, "washes");
        acc.technicalReview += remainingFor(usage, "technicalReview");
        acc.brakeReview += remainingFor(usage, "brakeReview");
        acc.savings += remainingFor(usage, "savings");
        return acc;
      },
      { washes: 0, technicalReview: 0, brakeReview: 0, savings: 0 }
    );
  }, [clients, usageByClient]);

  function getUsage(clientId: string) {
    return usageByClient[clientId] ?? emptyUsage();
  }

  function unlockAdmin() {
    if (adminCode.trim().toLowerCase() === adminPassword) {
      setIsAdmin(true);
      setAdminCode("");
      return;
    }
    window.alert("Clave de administrador incorrecta.");
  }

  function redeem(client: PreferredClient, benefit: BenefitKey, amount = 1) {
    const usage = getUsage(client.id);
    const available = remainingFor(usage, benefit);
    const normalizedAmount =
      benefit === "savings" ? Math.max(0, Math.round(amount)) : 1;

    if (available <= 0 || normalizedAmount > available) {
      window.alert("El cliente no tiene saldo disponible para ese beneficio.");
      return;
    }

    const updatedUsage = {
      ...usage,
      [benefit]: usage[benefit] + normalizedAmount,
    };
    const log: BenefitLog = {
      id: `${client.id}-${Date.now()}`,
      date: today(),
      clientId: client.id,
      benefit,
      amount: normalizedAmount,
      note: redeemNote.trim(),
    };

    setUsageByClient((current) => ({ ...current, [client.id]: updatedUsage }));
    setLogs((current) => [log, ...current].slice(0, 200));
    setRedeemNote("");
  }

  function redeemSavings(client: PreferredClient) {
    const available = remainingFor(getUsage(client.id), "savings");
    const answer = window.prompt(
      `Saldo disponible: ${formatCurrency(available)}\nMonto a descontar:`
    );
    if (!answer) return;
    const amount = Number(answer.replace(/[^0-9]/g, ""));
    if (!Number.isFinite(amount) || amount <= 0) return;
    redeem(client, "savings", amount);
  }

  function saveClient() {
    const client = makeClient(draft);
    if (!client.name || !client.rutKey || !client.plate) {
      window.alert("Ingresa nombre, RUT y patente para registrar al cliente.");
      return;
    }
    setCustomClients((current) => [client, ...current]);
    setSelectedId(client.id);
    setDraft({ name: "", rut: "", phone: "", plate: "", brand: "" });
  }

  function resetClient(client: PreferredClient) {
    const ok = window.confirm(`Restaurar beneficios de ${client.name}?`);
    if (!ok) return;
    setUsageByClient((current) => {
      const next = { ...current };
      delete next[client.id];
      return next;
    });
  }

  return (
    <main className="min-h-screen bg-[#0c0c0d] text-white">
      <header className="border-b border-white/10 bg-[#08090b]">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-5 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-10">
          <a href="/" className="inline-flex items-center gap-4">
            <img
              src="/logo-plaza-car-service-vfinal.png"
              alt="Plaza Car Service"
              className="h-16 w-36 object-contain"
            />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-red-500">
                Cliente preferente
              </p>
              <h1 className="text-2xl font-black">Programa Ahorro Plus</h1>
            </div>
          </a>
          <div className="flex flex-wrap gap-3">
            <a
              href="/ahorro-plus"
              className="rounded-lg border border-white/15 px-4 py-3 text-sm font-black transition hover:bg-white hover:text-black"
            >
              Que es el programa
            </a>
            <a
              href="/"
              className="rounded-lg bg-white px-4 py-3 text-sm font-black text-black transition hover:bg-red-600 hover:text-white"
            >
              Volver al sitio
            </a>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-[1500px] gap-6 px-5 py-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-10">
        <div className="rounded-lg border border-white/10 bg-[#15171b] p-6">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-red-500">
            Consulta cliente
          </p>
          <h2 className="mt-3 text-4xl font-black leading-tight">
            Revisa tus beneficios disponibles
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/62">
            Ingresa tu RUT y patente para ver lavados, pre-revision tecnica,
            revision de frenos y pesos ahorro disponibles.
          </p>

          <div className="mt-6 grid gap-3">
            <input
              value={clientRut}
              onChange={(event) => setClientRut(event.target.value)}
              placeholder="RUT"
              className="h-12 rounded-lg border border-white/10 bg-black/35 px-4 text-sm font-bold text-white outline-none focus:border-red-500"
            />
            <input
              value={clientPlate}
              onChange={(event) => setClientPlate(event.target.value)}
              placeholder="Patente"
              className="h-12 rounded-lg border border-white/10 bg-black/35 px-4 text-sm font-bold uppercase text-white outline-none focus:border-red-500"
            />
          </div>

          {clientRut && clientPlate && !clientProfile && (
            <div className="mt-5 rounded-lg border border-red-500/25 bg-red-600/10 p-4 text-sm font-bold text-white/75">
              No encontramos un cliente con esos datos. Verifica RUT y patente
              o solicita tu registro en sucursal.
            </div>
          )}

          {clientProfile && (
            <ClientBenefits
              client={clientProfile}
              usage={getUsage(clientProfile.id)}
              logs={logs.filter((log) => log.clientId === clientProfile.id)}
            />
          )}
        </div>

        <div className="rounded-lg border border-white/10 bg-[#111318] p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-red-500">
                Administracion
              </p>
              <h2 className="mt-3 text-3xl font-black">
                Registro y canje de beneficios
              </h2>
            </div>
            {!isAdmin && (
              <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
                <input
                  value={adminCode}
                  onChange={(event) => setAdminCode(event.target.value)}
                  type="password"
                  placeholder="Clave admin"
                  className="h-11 rounded-lg border border-white/10 bg-black/35 px-4 text-sm font-bold text-white outline-none focus:border-red-500"
                />
                <button
                  type="button"
                  onClick={unlockAdmin}
                  className="h-11 rounded-lg bg-red-600 px-5 text-sm font-black text-white transition hover:bg-[#c83a42]"
                >
                  Entrar
                </button>
              </div>
            )}
          </div>

          {!isAdmin ? (
            <div className="mt-6 rounded-lg bg-black/25 p-5 text-sm leading-relaxed text-white/65">
              El acceso administrador permite registrar clientes nuevos y
              descontar beneficios usados en sucursal.
            </div>
          ) : (
            <div className="mt-6 grid gap-5">
              <div className="grid gap-3 md:grid-cols-4">
                <Stat label="Clientes" value={String(clients.length)} />
                <Stat label="Lavados disponibles" value={String(totals.washes)} />
                <Stat
                  label="Pre-revisiones"
                  value={String(totals.technicalReview)}
                />
                <Stat label="Pesos ahorro" value={formatCurrency(totals.savings)} />
              </div>

              <div className="grid gap-3 md:grid-cols-[1fr_0.8fr]">
                <section className="rounded-lg border border-white/10 bg-black/20 p-4">
                  <h3 className="text-lg font-black">Buscar cliente</h3>
                  <input
                    value={adminQuery}
                    onChange={(event) => setAdminQuery(event.target.value)}
                    placeholder="Nombre, RUT, telefono, patente o marca"
                    className="mt-3 h-11 w-full rounded-lg border border-white/10 bg-black/35 px-4 text-sm font-bold text-white outline-none focus:border-red-500"
                  />
                  <div className="mt-3 max-h-[420px] overflow-auto">
                    {filteredClients.map((client) => (
                      <button
                        key={client.id}
                        type="button"
                        onClick={() => setSelectedId(client.id)}
                        className={`mb-2 grid w-full gap-1 rounded-lg border px-4 py-3 text-left transition ${
                          selectedId === client.id
                            ? "border-red-500 bg-red-600/15"
                            : "border-white/10 bg-white/5 hover:border-white/25"
                        }`}
                      >
                        <span className="font-black">{client.name}</span>
                        <span className="text-xs font-bold text-white/55">
                          {client.rut} | {client.plate || "Sin patente"} |{" "}
                          {client.brand || "Sin marca"}
                        </span>
                      </button>
                    ))}
                  </div>
                </section>

                <section className="rounded-lg border border-white/10 bg-black/20 p-4">
                  <h3 className="text-lg font-black">Nuevo cliente</h3>
                  <div className="mt-3 grid gap-2">
                    {[
                      ["name", "Nombre"],
                      ["rut", "RUT"],
                      ["phone", "Telefono"],
                      ["plate", "Patente"],
                      ["brand", "Marca"],
                    ].map(([field, label]) => (
                      <input
                        key={field}
                        value={draft[field as keyof DraftClient]}
                        onChange={(event) =>
                          setDraft((current) => ({
                            ...current,
                            [field]: event.target.value,
                          }))
                        }
                        placeholder={label}
                        className="h-10 rounded-lg border border-white/10 bg-black/35 px-3 text-sm font-bold text-white outline-none focus:border-red-500"
                      />
                    ))}
                    <button
                      type="button"
                      onClick={saveClient}
                      className="h-11 rounded-lg bg-red-600 text-sm font-black text-white transition hover:bg-[#c83a42]"
                    >
                      Registrar cliente
                    </button>
                  </div>
                </section>
              </div>

              {selectedClient && (
                <section className="rounded-lg border border-white/10 bg-[#15171b] p-5">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-red-500">
                        Cliente seleccionado
                      </p>
                      <h3 className="mt-2 text-2xl font-black">
                        {selectedClient.name}
                      </h3>
                      <p className="mt-1 text-sm font-bold text-white/55">
                        {selectedClient.rut} | {selectedClient.plate} |{" "}
                        {selectedClient.brand}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => resetClient(selectedClient)}
                      className="rounded-lg border border-white/15 px-4 py-3 text-sm font-black transition hover:bg-white hover:text-black"
                    >
                      Restaurar beneficios
                    </button>
                  </div>

                  <input
                    value={redeemNote}
                    onChange={(event) => setRedeemNote(event.target.value)}
                    placeholder="Nota opcional del canje"
                    className="mt-5 h-11 w-full rounded-lg border border-white/10 bg-black/35 px-4 text-sm font-bold text-white outline-none focus:border-red-500"
                  />

                  <div className="mt-4 grid gap-3 md:grid-cols-4">
                    {benefitOrder.map((benefit) => {
                      const usage = getUsage(selectedClient.id);
                      const available = remainingFor(usage, benefit);
                      const isSavings = benefit === "savings";
                      return (
                        <div
                          key={benefit}
                          className="rounded-lg border border-white/10 bg-black/25 p-4"
                        >
                          <p className="text-xs font-black text-white/45">
                            {benefitLabels[benefit]}
                          </p>
                          <p className="mt-2 text-2xl font-black">
                            {isSavings ? formatCurrency(available) : available}
                          </p>
                          <button
                            type="button"
                            onClick={() =>
                              isSavings
                                ? redeemSavings(selectedClient)
                                : redeem(selectedClient, benefit)
                            }
                            disabled={available <= 0}
                            className="mt-4 h-10 w-full rounded-lg bg-red-600 text-xs font-black text-white transition hover:bg-[#c83a42] disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            Descontar
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-black/25 p-4">
      <p className="text-xs font-black text-white/45">{label}</p>
      <p className="mt-1 text-2xl font-black">{value}</p>
    </div>
  );
}

function ClientBenefits({
  client,
  usage,
  logs,
}: {
  client: PreferredClient;
  usage: BenefitUsage;
  logs: BenefitLog[];
}) {
  return (
    <div className="mt-6 rounded-lg border border-white/10 bg-black/25 p-5">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-red-500">
        Perfil encontrado
      </p>
      <h3 className="mt-2 text-2xl font-black">{client.name}</h3>
      <p className="mt-1 text-sm font-bold text-white/55">
        {client.plate} | {client.brand || "Vehiculo registrado"}
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {benefitOrder.map((benefit) => {
          const available = remainingFor(usage, benefit);
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
                Usado: {isSavings ? formatCurrency(usage[benefit]) : usage[benefit]}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-5">
        <p className="text-sm font-black">Ultimos movimientos</p>
        <div className="mt-2 grid gap-2">
          {logs.length ? (
            logs.slice(0, 5).map((log) => (
              <div
                key={log.id}
                className="rounded-lg border border-white/10 px-3 py-2 text-xs font-bold text-white/58"
              >
                {log.date} | {benefitLabels[log.benefit]} |{" "}
                {log.benefit === "savings"
                  ? formatCurrency(log.amount)
                  : log.amount}
                {log.note ? ` | ${log.note}` : ""}
              </div>
            ))
          ) : (
            <p className="rounded-lg border border-white/10 px-3 py-2 text-xs font-bold text-white/45">
              Sin canjes registrados.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

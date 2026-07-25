"use client";

import { FormEvent } from "react";

const whatsappBase = "https://wa.me/56971257621";

export default function AhorroPlusRegisterForm() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const fullName = String(formData.get("fullName") || "").trim();
    const rut = String(formData.get("rut") || "").trim();

    const message = [
      "Hola, quiero registrarme para ser parte del Programa Ahorro Plus.",
      `Nombre completo: ${fullName}`,
      `RUT: ${rut}`,
    ].join("\n");

    window.open(
      `${whatsappBase}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label
            htmlFor="ahorro-full-name"
            className="mb-2 block text-xs font-black uppercase tracking-[0.12em] text-white/70"
          >
            Nombre completo
          </label>
          <input
            id="ahorro-full-name"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            placeholder="Ingresa tu nombre"
            className="w-full rounded-md border border-white/10 bg-black/35 px-4 py-3 text-sm font-semibold text-white outline-none transition placeholder:text-white/35 focus:border-red-500"
          />
        </div>

        <div>
          <label
            htmlFor="ahorro-rut"
            className="mb-2 block text-xs font-black uppercase tracking-[0.12em] text-white/70"
          >
            RUT
          </label>
          <input
            id="ahorro-rut"
            name="rut"
            type="text"
            required
            autoComplete="off"
            placeholder="12.345.678-9"
            className="w-full rounded-md border border-white/10 bg-black/35 px-4 py-3 text-sm font-semibold text-white outline-none transition placeholder:text-white/35 focus:border-red-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="inline-flex min-h-12 items-center justify-center rounded-md bg-red-600 px-6 py-3 text-xs font-black uppercase text-white transition hover:bg-[#a92f36]"
      >
        Registrarme
      </button>
    </form>
  );
}

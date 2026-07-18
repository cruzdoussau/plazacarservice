"use client";

import { useState } from "react";
import Link from "next/link";
import plazaCarLogo2026 from "../LOGO PLAZA CAR SERVICE 2026.png";

const whatsappBase = "https://wa.me/56971257621";

const serviceLinks = [
  ["mantencion-kilometraje", "Mantención por Kilometraje"],
  ["frenos", "Mantención de Frenos"],
  ["pre-revision-tecnica", "Pre-Revisión Técnica"],
  ["alineacion-balanceo", "Alineación + Balanceo + Rotación"],
  ["cambio-aceite", "Cambio de Aceite y Filtro"],
  ["scanner", "Scanner Automotriz"],
  ["limpieza", "Lavado y Estética Automotriz"],
  ["pintura", "Pintura y Estética Automotriz"],
  ["mecanica-compleja", "Mecánica Compleja"],
] as const;

const productLinks = [
  ["baterias", "Venta de Baterías"],
  ["neumaticos", "Venta de Neumáticos"],
] as const;

function WhatsAppIcon({ className = "" }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.52 0 .2 5.32.2 11.88c0 2.1.55 4.16 1.6 5.97L.1 24l6.3-1.65a11.9 11.9 0 0 0 5.68 1.45h.01c6.56 0 11.88-5.32 11.88-11.88 0-3.18-1.24-6.16-3.45-8.44ZM12.09 21.8h-.01a9.86 9.86 0 0 1-5.02-1.38l-.36-.21-3.74.98 1-3.64-.24-.37a9.83 9.83 0 0 1-1.5-5.3c0-5.45 4.43-9.88 9.88-9.88a9.8 9.8 0 0 1 6.99 2.9 9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.43 9.88-9.88 9.88Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.46 0 1.45 1.07 2.86 1.22 3.06.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}

function Logo() {
  return (
    <div className="relative flex h-[82px] w-[245px] items-center overflow-visible md:h-[96px] md:w-[290px] xl:w-[330px]">
      <img
        src={plazaCarLogo2026.src}
        alt="Plaza Car Service"
        className="absolute left-0 h-[122px] w-auto max-w-none object-contain md:h-[145px] xl:h-[160px]"
      />
    </div>
  );
}

export default function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0b0c0f]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1920px] items-center justify-between gap-4 px-4 py-3 md:px-6 xl:px-8">
        <Link href="/#home" aria-label="Plaza Car Service">
          <Logo />
        </Link>

        <nav className="hidden shrink-0 items-center gap-4 text-xs font-semibold text-white/70 xl:flex 2xl:gap-6 2xl:text-sm">
          <Link className="py-2 transition hover:text-white" href="/#home">
            Home
          </Link>
          <Link className="py-2 transition hover:text-white" href="/nosotros">
            Nosotros
          </Link>
          <Link className="py-2 transition hover:text-white" href="/#sucursales">
            Sucursales
          </Link>
          <div className="group relative py-1">
            <Link
              className="inline-flex items-center gap-2 py-2 text-white transition hover:text-white"
              href="/#servicios"
            >
              Servicios
              <span className="text-[10px] text-white/45 transition group-hover:text-white">
                ▾
              </span>
            </Link>
            <div className="invisible absolute left-1/2 top-full z-50 w-[360px] -translate-x-1/2 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="rounded-lg border border-white/10 bg-[#111318]/98 p-3 shadow-2xl shadow-black/45 backdrop-blur-xl">
                <div className="grid gap-1">
                  {serviceLinks.map(([id, title]) => (
                    <Link
                      key={id}
                      href={`/servicios/${id}`}
                      className="rounded-md px-4 py-2.5 text-sm font-bold text-white/68 transition hover:bg-white/10 hover:text-white"
                    >
                      {title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="group relative py-1">
            <Link
              className="inline-flex items-center gap-2 py-2 text-white transition hover:text-white"
              href="/#servicios"
            >
              Productos
              <span className="text-[10px] text-white/45 transition group-hover:text-white">
                ▾
              </span>
            </Link>
            <div className="invisible absolute left-1/2 top-full z-50 w-[260px] -translate-x-1/2 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="rounded-lg border border-white/10 bg-[#111318]/98 p-3 shadow-2xl shadow-black/45 backdrop-blur-xl">
                <div className="grid gap-1">
                  {productLinks.map(([id, title]) => (
                    <Link
                      key={id}
                      href={`/servicios/${id}`}
                      className="rounded-md px-4 py-2.5 text-sm font-bold text-white/68 transition hover:bg-white/10 hover:text-white"
                    >
                      {title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Link className="py-2 transition hover:text-white" href="/promociones">
            Promociones
          </Link>
          <Link className="py-2 transition hover:text-white" href="/#contacto">
            Contacto
          </Link>
        </nav>

        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <Link
            href="/ahorro-plus"
            className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white px-3 py-2.5 text-xs font-black text-black transition hover:bg-red-600 hover:text-white 2xl:px-4 2xl:py-3 2xl:text-sm"
          >
            Programa Ahorro Plus
          </Link>
          <a
            href={whatsappBase}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#c83a42] px-4 py-2.5 text-xs font-black text-white transition hover:bg-[#a92f36] 2xl:px-5 2xl:py-3 2xl:text-sm"
          >
            <WhatsAppIcon className="h-4 w-4" /> Agendar hora
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
          className="rounded-full border border-white/10 px-4 py-3 text-sm font-black text-white xl:hidden"
          aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? "Cerrar" : "Menú"}
        </button>

        {isMobileMenuOpen && (
          <div className="absolute left-4 right-4 top-[calc(100%+10px)] z-50 overflow-hidden rounded-2xl border border-white/10 bg-[#111318]/98 p-4 shadow-2xl shadow-black/50 backdrop-blur-xl xl:hidden">
            <nav className="grid gap-2 text-sm font-black text-white">
              <Link
                href="/#home"
                onClick={closeMobileMenu}
                className="rounded-xl bg-white/5 px-4 py-3 transition hover:bg-red-600"
              >
                Home
              </Link>
              <Link
                href="/nosotros"
                onClick={closeMobileMenu}
                className="rounded-xl bg-white/5 px-4 py-3 transition hover:bg-red-600"
              >
                Nosotros
              </Link>
              <Link
                href="/#sucursales"
                onClick={closeMobileMenu}
                className="rounded-xl bg-white/5 px-4 py-3 transition hover:bg-red-600"
              >
                Sucursales
              </Link>
              <details className="overflow-hidden rounded-xl bg-white/5">
                <summary className="cursor-pointer px-4 py-3 transition hover:bg-red-600">
                  Servicios
                </summary>
                <div className="grid gap-1 border-t border-white/10 p-2">
                  {serviceLinks.map(([id, title]) => (
                    <Link
                      key={id}
                      href={`/servicios/${id}`}
                      onClick={closeMobileMenu}
                      className="rounded-lg px-3 py-2.5 text-white/70 transition hover:bg-red-600 hover:text-white"
                    >
                      {title}
                    </Link>
                  ))}
                </div>
              </details>
              <details className="overflow-hidden rounded-xl bg-white/5">
                <summary className="cursor-pointer px-4 py-3 transition hover:bg-red-600">
                  Productos
                </summary>
                <div className="grid gap-1 border-t border-white/10 p-2">
                  {productLinks.map(([id, title]) => (
                    <Link
                      key={id}
                      href={`/servicios/${id}`}
                      onClick={closeMobileMenu}
                      className="rounded-lg px-3 py-2.5 text-white/70 transition hover:bg-red-600 hover:text-white"
                    >
                      {title}
                    </Link>
                  ))}
                </div>
              </details>
              <Link
                href="/promociones"
                onClick={closeMobileMenu}
                className="rounded-xl bg-white/5 px-4 py-3 transition hover:bg-red-600"
              >
                Promociones
              </Link>
              <Link
                href="/#contacto"
                onClick={closeMobileMenu}
                className="rounded-xl bg-white/5 px-4 py-3 transition hover:bg-red-600"
              >
                Contacto
              </Link>
              <Link
                href="/ahorro-plus"
                onClick={closeMobileMenu}
                className="mt-2 inline-flex items-center justify-center rounded-xl bg-white px-4 py-3 text-black transition hover:bg-red-600 hover:text-white"
              >
                Programa Ahorro Plus
              </Link>
              <a
                href={whatsappBase}
                target="_blank"
                rel="noreferrer"
                onClick={closeMobileMenu}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#c83a42] px-4 py-3 text-white transition hover:bg-[#a92f36]"
              >
                <WhatsAppIcon className="h-5 w-5" /> Agendar hora
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

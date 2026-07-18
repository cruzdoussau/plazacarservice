"use client";

import React, { useEffect, useState } from "react";
import plazaCarLogo2026 from "./LOGO PLAZA CAR SERVICE 2026.png";
import SiteHeader from "./components/SiteHeader";
import { homeGalleryImages } from "./generated-galleries";

const terminoPatenteMes = "1 o 2";
const whatsappBase = "https://wa.me/56971257621";

const slides = [
  {
    id: "red-integral",
    eyebrow: "Tu aliado automotriz del litoral central",
    title: "Bienvenidos a Plaza Car Service",
    titleAccent: "",
    text: "Somos la red integral de servicios automotriz multimarca del Litoral Central. Estamos más cerca de ti y de tu vehículo. Diseñamos este espacio web para que gestionar el mantenimiento de tu auto sea un proceso simple, rápido y transparente.",
    primary: "Escríbenos",
    secondary: "Nuestros servicios",
    href: `${whatsappBase}?text=${encodeURIComponent(
      "Hola, quiero recibir atención de un ejecutivo de Plaza Car Services"
    )}`,
    secondaryHref: "#servicios",
    image: "/slider/red-integral.png",
    mobileImage: "/slider-mobile/red-integral-mobile.png",
    imageClass: "object-contain object-center bg-black md:object-cover md:object-center",
  },
  {
    id: "comodidad",
    eyebrow: "Atención cercana y profesional",
    title: "Atención, comodidad y cercanía",
    titleAccent: "",
    text: "En nuestras instalaciones encontrarás una atención cercana y profesional, además de un espacio cómodo para esperar mientras atendemos las necesidades de tu vehículo.",
    primary: "Conoce nuestras sucursales",
    secondary: "Contáctanos",
    href: "/nosotros",
    secondaryHref: "#contacto",
    image: "/slider/comodidad.png",
    mobileImage: "/slider-mobile/comodidad-mobile.png",
    imageClass: "object-contain object-center bg-black md:object-cover md:object-[65%_center]",
  },
  {
    id: "ahorro-plus-slide",
    eyebrow: "Tu aliado automotriz del litoral central",
    title: "Haz tu mantención según pauta del fabricante",
    titleAccent: "fabricante",
    text: "Conoce nuestro servicio de ahorro plus y ayuda a prevenir desgastes mayores. ¡Agenda tu mantención hoy mismo!",
    primary: "Agendar mantención",
    secondary: "Ver servicio",
    href: "https://wa.me/56971257621?text=Hola,%20quiero%20agendar%20Mantenci%C3%B3n%20Ahorro%20Plus",
    secondaryHref: "#servicios",
    image: "/slider/ahorro-plus.png",
    mobileImage: "/slider-mobile/ahorro-plus-mobile.png",
    imageClass: "object-contain object-center bg-black md:object-cover md:object-center",
  },
  {
    id: "pre-revision-tecnica",
    eyebrow: "Pre-revisión técnica",
    title: `Si tu patente termina en ${terminoPatenteMes} ven por tu pre-revisión!`,
    titleAccent: "",
    text: "Entonces este mensaje es para ti. En Plaza Car Service te ayudamos a preparar tu vehículo para la revisión técnica con una pre revisión completa, enfocada en detectar observaciones a tiempo y ayudarte a evitar rechazos.",
    primary: "Agendar pre revisión",
    secondary: "Ver detalle",
    href: "https://wa.me/56971257621?text=Hola,%20quiero%20agendar%20una%20pre%20revisi%C3%B3n%20t%C3%A9cnica",
    secondaryHref: "/servicios/pre-revision-tecnica",
    image: "/slider/pre-revision-tecnica.png",
    mobileImage: "/slider-mobile/pre-revision-tecnica-mobile.png",
    imageClass: "object-contain object-center bg-black md:object-cover md:object-center",
  },
];

const services = [
  {
    id: "mantencion-kilometraje",
    badge: "Mantención preventiva",
    title: "Mantención por Kilometraje",
    subtitle: "Servicio programado según pauta y kilometraje de tu vehículo.",
    cta: "Cotizar mantención",
    more: "Ver más",
    image: "/site-photos/auto-rampa-servicio.webp",
    detailIntro:
      "Mantención preventiva para cuidar el rendimiento, revisar puntos críticos y prolongar la vida útil del vehículo según su kilometraje.",
    includes: [
      "Revisión según pauta",
      "Cambio de insumos según necesidad",
      "Chequeo de niveles",
      "Revisión visual preventiva",
      "Orientación sobre próximos servicios",
    ],
    idealFor:
      "Vehículos que ya cumplieron kilometraje o tiempo recomendado para mantención.",
    note: "El valor depende de la marca, modelo, kilometraje e insumos requeridos.",
  },
  {
    id: "frenos",
    badge: "Seguridad preventiva",
    title: "Mantención de Frenos",
    subtitle: "Cambio de pastillas delanteras, rectificación y limpieza del sistema.",    cta: "Agendar evaluación",
    more: "Ver más",
    image: "/site-photos/mecanica-auto-elevado.webp",
    detailIntro:
      "Servicio orientado a cuidar la seguridad del vehículo y mantener el sistema de frenado en buen estado con una mantención completa.",
    includes: [
      "Cambio de pastillas delanteras",
      "Rectificación de discos",
      "Limpieza del sistema",
      "Regulación de frenos traseros",
    ],
    idealFor:
      "Vehículos con ruidos al frenar, vibración en el pedal, mayor distancia de frenado o sensación esponjosa al frenar.",
    note: "Evita desgastes mayores, ruidos y fallas inesperadas.",
  },
  {
    id: "baterias",
    badge: "Energía y partida",
    title: "Venta de Baterías",
    subtitle: "Baterías de alto rendimiento para asegurar el encendido.",    cta: "Cotizar batería",
    more: "Ver más",
    image: "/site-photos/sucursal-interior-auto.webp",
    detailIntro:
      "¿A tu auto le cuesta arrancar? No esperes a quedarte botado. Asegura el encendido de tu motor al primer intento con nuestras baterías de alto rendimiento.",
    includes: [
      "Máxima potencia para vehículos de alta exigencia.",
      "Larga vida útil que protege tu inversión.",
      "Catálogo multimarca para encontrar tu ajuste perfecto.",
      "Garantía de Liderazgo: Llevamos años equipando los vehículos de la zona con los más altos estándares de calidad y seguridad.",
    ],
    idealFor:
      "Vehículos con partida débil, batería antigua o fallas eléctricas asociadas a baja carga.",
    note: "Garantía de Liderazgo: Llevamos años equipando los vehículos de la zona con los más altos estándares de calidad y seguridad.",
  },
  {
    id: "limpieza",
    badge: "Cuidado interior y exterior",
    title: "Lavado y Limpieza",
    subtitle: "Lavado exterior y limpieza interior disponibles de forma individual.",    cta: "Agendar limpieza",
    more: "Ver más",
    image: "/site-photos/lavado-auto-premium.webp",
    detailIntro:
      "Servicio pensado para mantener tu vehiculo limpio, cuidado y con una mejor presentacion interior y exterior. Puedes tomar lavado exterior o limpieza interior de forma individual, segun lo que necesites.",
    includes: [
      "Lavado exterior",
      "Limpieza interior",
      "Atención al detalle según condición del vehículo",
      "Procedimientos adecuados para el cuidado del vehículo",
    ],
    idealFor:
      "Vehiculos que necesitan una limpieza rapida, confiable y eficiente para uso diario, ya sea exterior, interior o ambas.",
    note: "Lavado exterior y limpieza interior se pueden solicitar por separado.",
  },
  {
    id: "alineacion-balanceo",
    badge: "Promoción Junio y Julio",
    title: "Alineación + Balanceo + Rotación",
    subtitle:
      "Servicio combinado para mejorar seguridad, estabilidad y vida útil de tus neumáticos.",    cta: "Agendar servicio",
    more: "Ver más",
    image: "/site-photos/auto-rampa-servicio.webp",
    detailIntro:
      "Oferta especial de alineación, balanceo y rotación pensada para mejorar seguridad, estabilidad y vida útil de tus neumáticos.",
    includes: [
      "Alineación",
      "Balanceo",
      "Rotación",
      "Mayor seguridad al conducir",
      "Menor desgaste y mayor vida útil de los neumáticos",
      "Mejor estabilidad y confort de manejo",
    ],
    idealFor:
      "Vehículos que se cargan hacia un lado, presentan vibración al conducir o tienen desgaste irregular en neumáticos.",
    note: "Servicio recomendado para cuidar la estabilidad, reducir desgaste irregular y mejorar el confort de manejo.",
  },
  {
    id: "cambio-aceite",
    badge: "Lubricación del motor",
    title: "Cambio de Aceite",
    subtitle:
      "Aceite ESSO con filtro incluido para cuidar el motor de tu vehículo.",    cta: "Agendar cambio",
    more: "Ver más",
    image: "/site-photos/mecanica-auto-elevado.webp",
    detailIntro:
      "Servicio esencial para proteger el motor, mantener una lubricación adecuada y evitar desgaste prematuro de componentes internos.",
    includes: [
      "Aceite ESSO",
      "Filtro incluido",
      "Revisión de niveles",
      "Orientación sobre aceite recomendado",
      "Chequeo visual preventivo",
    ],
    idealFor:
      "Vehículos que ya cumplieron kilometraje o tiempo recomendado para cambio de aceite.",
    note: "El valor puede variar según tipo de aceite, cantidad requerida y filtro.",
  },
  {
    id: "scanner",
    badge: "Diagnóstico electrónico",
    title: "Scanner Automotriz",
    subtitle:
      "Detecta fallas y códigos de alerta mediante diagnóstico electrónico especializado.",    cta: "Agendar scanner",
    more: "Ver más",
    image: "/site-photos/scanner-alineacion-equipo.webp",
    detailIntro:
      "Diagnóstico electrónico para identificar códigos de falla y orientar una reparación más precisa.",
    includes: [
      "Conexión de scanner automotriz",
      "Lectura de códigos de falla",
      "Orientación sobre posibles causas",
      "Recomendación de próximos pasos",
      "Apoyo para tomar decisiones de reparación",
    ],
    idealFor:
      "Vehículos con luces de advertencia encendidas, fallas intermitentes o pérdida de rendimiento.",
    note: "El scanner ayuda a orientar el diagnóstico, pero algunas fallas pueden requerir revisión mecánica adicional.",
  },
  {
    id: "pintura",
    badge: "Estética automotriz",
    title: "Pintura",
    subtitle: "Soluciones de pintura para recuperar presentación y acabado.",    cta: "Cotizar pintura",
    more: "Ver más",
    image: "/site-photos/sucursal-fachada.webp",
    detailIntro:
      "Servicio orientado a recuperar la presentación del vehículo mediante evaluación, preparación y trabajos de pintura según necesidad.",
    includes: [
      "Evaluación del estado de la superficie",
      "Orientación sobre alcance del trabajo",
      "Preparación de zona a intervenir",
      "Trabajo de pintura según diagnóstico",
      "Revisión de terminación",
    ],
    idealFor:
      "Vehículos con detalles estéticos, rayas, desgaste de pintura o necesidad de recuperación visual.",
    note: "Requiere evaluación para confirmar tiempos, alcance y valor.",
  },
  {
    id: "mecanica-compleja",
    badge: "Reparación especializada",
    title: "Mecánica Compleja",
    subtitle:
      "Diagnóstico y reparación para fallas mecánicas de mayor alcance.",    cta: "Solicitar evaluación",
    more: "Ver más",
    image: "/site-photos/mecanica-auto-elevado.webp",
    detailIntro:
      "Servicio para diagnosticar y resolver fallas mecánicas que requieren evaluación técnica, revisión profunda y reparación especializada.",
    includes: [
      "Evaluación inicial",
      "Diagnóstico técnico",
      "Revisión de componentes asociados",
      "Presupuesto según reparación",
      "Orientación sobre prioridades del vehículo",
    ],
    idealFor:
      "Vehículos con fallas persistentes, ruidos, pérdida de potencia o problemas mecánicos de mayor complejidad.",
    note: "El valor final depende del diagnóstico y repuestos requeridos.",
  },
  {
    id: "neumaticos",
    badge: "Seguridad en ruta",
    title: "Venta de Neumáticos",
    subtitle: "Tu Seguridad en Manos Expertas.",    cta: "Cotizar neumáticos",
    more: "Ver más",
    image: "/site-photos/sucursal-exterior-autos.webp",
    detailIntro:
      "El único punto de contacto entre tu vehículo y el asfalto no puede quedar al azar. Te brindamos asesoría experta para elegir la opción perfecta según tu estilo de conducción, el tipo de vehículo y las rutas que transitas todos los días.",
    includes: [
      "Stock Multimarca Premium.",
      "Máximo Rendimiento.",
      "Asesoría 100% Personalizada.",
      "Servicio Integral.",
    ],
    idealFor:
      "Vehículos con neumáticos gastados, desgaste irregular o necesidad de mejorar seguridad en ruta.",
    note: "Garantía de Liderazgo: Llevamos años equipando los vehículos de la zona con los más altos estándares de calidad y seguridad.",
  },

];

const serviceDisplayOrder = [
  "mantencion-kilometraje",
  "frenos",
  "alineacion-balanceo",
  "cambio-aceite",
  "scanner",
  "limpieza",
  "pintura",
  "mecanica-compleja",
  "baterias",
  "neumaticos",
];

const orderedServices = serviceDisplayOrder.flatMap((id) => {
  const service = services.find((item) => item.id === id);
  return service ? [service] : [];
});

const fallbackNosotrosImages = [
  {
    id: "auto-rampa-servicio",
    src: "/site-photos/auto-rampa-servicio.webp",
    alt: "Vehículo en atención en Plaza Car Service",
    imageClass: "object-cover object-center",
  },
  {
    id: "mecanica-auto-elevado",
    src: "/site-photos/mecanica-auto-elevado.webp",
    alt: "Revisión mecánica en elevador",
    imageClass: "object-cover object-center",
  },
  {
    id: "sucursal-exterior-autos",
    src: "/site-photos/sucursal-exterior-autos.webp",
    alt: "Sucursal Plaza Car Service con vehículos en atención",
    imageClass: "object-cover object-center",
  },
  {
    id: "sucursal-fachada",
    src: "/site-photos/sucursal-fachada.webp",
    alt: "Fachada de sucursal Plaza Car Service",
    imageClass: "object-cover object-center",
  },
  {
    id: "scanner-alineacion-equipo",
    src: "/site-photos/scanner-alineacion-equipo.webp",
    alt: "Equipamiento técnico Plaza Car Service",
    imageClass: "object-cover object-center",
  },
];

const nosotrosImages = homeGalleryImages.length
  ? homeGalleryImages
  : fallbackNosotrosImages;

const branches = [
  {
    id: "luz-divina",
    name: "Luz Divina",
    address: "Luz Divina N°1299",
    location: "Algarrobo · Litoral Central",
    description:
      "Atención completa para tu vehículo con profesionales calificados y equipamiento de última generación.",
    image: "/Sucursales/luz-divina.png",
    mapsUrl: "https://maps.app.goo.gl/mcuutuuJuUtsLCmN7",
  },
  {
    id: "alcazar-de-torres",
    name: "Alcázar de Torres",
    address: "Alcázar de Torres, Parcela N°20",
    location: "Ruta F-832 · Algarrobo",
    description:
      "Servicios de mantención y reparación con estándares de calidad y atención personalizada.",
    image: "/Sucursales/alcazar-de-torres.png",
    mapsUrl: "https://maps.app.goo.gl/x9WVuDHYq22k18tw9",
  },
  {
    id: "sector-aquelarre",
    name: "Sucursal El Tabo",
    address: "Sector Aquelarre",
    location: "Ruta G-98F · El Tabo",
    description:
      "Soluciones automotrices integrales con la confianza y cercanía que tu vehículo necesita.",
    image: "/Sucursales/sector-aquelarre.png",
    mapsUrl: "https://maps.app.goo.gl/uXNfdNYJbs4u2ZtK6",
  },
  {
    id: "el-quisco",
    name: "El Quisco",
    address: "Próximamente",
    location: "El Quisco · Litoral Central",
    description:
      "Muy pronto llegaremos a El Quisco para estar más cerca de ti y tu vehículo.",
    image: "/Sucursales/el-quisco.png",
    mapsUrl: "#",
    comingSoon: true,
  },
  {
    id: "san-antonio",
    name: "San Antonio",
    address: "Próximamente",
    location: "San Antonio · Litoral Central",
    description:
      "Muy pronto llegaremos a San Antonio para estar más cerca de ti y tu vehículo.",
    image: "/Sucursales/san-antonio.png",
    mapsUrl: "#",
    comingSoon: true,
  },
];

function getBranchWhatsAppUrl(branchName) {
  const message = `Hola, tengo una consulta para la sucursal ${branchName}. Mi vehículo necesita una atención y me gustaría recibir orientación sobre el servicio más adecuado.`;
  return `${whatsappBase}?text=${encodeURIComponent(message)}`;
}

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

function ArrowIcon({ className = "" }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function PinIcon({ className = "" }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PromoMarquee() {
  const message =
    "En este invierno congelamos los precios. Conoce nuestras promociones de julio.";
  const items = Array.from({ length: 8 }, (_, index) => index);

  return (
    <section className="overflow-hidden border-y border-red-500/30 bg-[#e30613] py-3 text-white shadow-lg shadow-black/20">
      <div className="promo-marquee-track flex w-max items-center gap-8 whitespace-nowrap">
        {[...items, ...items].map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="flex items-center gap-8 text-sm font-black uppercase tracking-[0.08em] md:text-base"
          >
            <span>{message}</span>
            <span className="h-2 w-2 rounded-full bg-white" />
          </div>
        ))}
      </div>
    </section>
  );
}

function MainSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = slides[activeSlide];
  const titleParts = slide.titleAccent ? slide.title.split(slide.titleAccent) : null;

  const previousSlide = () => {
    setActiveSlide((current) =>
      current === 0 ? slides.length - 1 : current - 1
    );
  };

  const nextSlide = () => {
    setActiveSlide((current) =>
      current === slides.length - 1 ? 0 : current + 1
    );
  };

  return (
    <section id="hero" className="bg-black text-white">
      <div className="relative overflow-hidden bg-black">
        <div className="mx-auto grid min-h-[620px] max-w-[1680px] items-center gap-8 px-5 pb-9 pt-24 sm:px-8 lg:grid-cols-[0.9fr_1.45fr] lg:gap-9 lg:px-14 lg:py-16 xl:px-20">
          <div className="relative z-10 max-w-[560px]">
            <p className="text-xs font-black uppercase leading-tight text-red-600 sm:text-sm">
              {slide.eyebrow}
            </p>
            <span className="mt-4 block h-[2px] w-16 bg-red-600" />

            <h1 className="mt-4 max-w-[620px] text-[2.55rem] font-black leading-[0.98] text-white sm:text-5xl lg:text-[3.4rem] xl:text-6xl 2xl:text-[4.4rem]">
              {titleParts ? (
                <>
                  {titleParts[0]}
                  <span className="text-red-600">{slide.titleAccent}</span>
                  {titleParts.slice(1).join(slide.titleAccent)}
                </>
              ) : (
                slide.title
              )}
            </h1>

            <p className="mt-5 max-w-[560px] text-base leading-relaxed text-white/76 lg:text-lg">
              {slide.text}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={slide.href}
                target={slide.href.startsWith("http") ? "_blank" : undefined}
                rel={slide.href.startsWith("http") ? "noreferrer" : undefined}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-red-600 px-6 py-3 text-sm font-black uppercase text-white transition hover:bg-[#a92f36]"
              >
                {slide.href.includes("wa.me") && (
                  <WhatsAppIcon className="h-5 w-5" />
                )}
                {slide.primary}
              </a>

              <a
                href={slide.secondaryHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/25 bg-white px-6 py-3 text-sm font-black uppercase text-black transition hover:border-red-600 hover:bg-red-600 hover:text-white"
              >
                {slide.secondary}
              </a>
            </div>
          </div>

          <div className="relative z-10">
            <div className="relative overflow-hidden rounded-lg border border-white/15 bg-[#101114] shadow-[0_24px_70px_rgba(0,0,0,0.5)]">
              <picture>
                <source
                  media="(max-width: 767px)"
                  srcSet={slide.mobileImage || slide.image}
                />
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="aspect-[16/9] h-full w-full object-cover object-center transition duration-500"
                />
              </picture>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 to-transparent" />

              <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-3">
                {slides.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSlide(index)}
                    className={`h-3 w-3 rounded-full transition ${
                      activeSlide === index
                        ? "bg-red-600"
                        : "bg-white/85 hover:bg-white"
                    }`}
                    aria-label={`Ver slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={previousSlide}
              className="absolute left-0 top-1/2 z-20 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white shadow-xl backdrop-blur transition hover:bg-white hover:text-black"
              aria-label="Slide anterior"
            >
              <ArrowIcon className="h-5 w-5 rotate-180" />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              className="absolute right-0 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white shadow-xl backdrop-blur transition hover:bg-white hover:text-black"
              aria-label="Slide siguiente"
            >
              <ArrowIcon className="h-5 w-5" />
            </button>

            <div className="mt-5 flex items-center justify-center gap-3 lg:hidden">
              {slides.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSlide(index)}
                  className={`h-1.5 rounded-full transition ${
                    activeSlide === index
                      ? "w-10 bg-red-600"
                      : "w-9 bg-white/70 hover:bg-white"
                  }`}
                  aria-label={`Ver slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="servicios" className="bg-[#f4f5f7] px-5 py-12 text-[#111318] md:px-10 md:py-16">
      <div className="mx-auto max-w-[1320px]">
        <div className="max-w-4xl">
          <p className="text-sm font-black uppercase text-red-600">
            Nuestros servicios
          </p>
          <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">
            Todo lo que tu vehículo necesita, en un solo lugar
          </h2>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {orderedServices.map((service) => (
            <a
              key={service.id}
              href={`/servicios/${service.id}`}
              className="group flex min-h-[92px] items-center justify-between gap-4 rounded-lg border border-[#d7dbe2] bg-white px-5 py-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-red-500 hover:shadow-lg"
            >
              <span className="text-base font-black leading-tight text-[#111318] md:text-lg">
                {service.title}
                <span className="mt-2 block text-sm font-black text-red-600">
                  Ver detalle del servicio
                </span>
              </span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600 text-white transition group-hover:bg-[#a92f36]">
                <ArrowIcon className="h-5 w-5" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function WebActionsSection() {
  const actions = [
    {
      title: "Agendar tu hora",
      text: "Reserva tu cita en línea en pocos pasos.",
      label: "Agendar hora",
      href: `${whatsappBase}?text=${encodeURIComponent(
        "Hola, quiero agendar una hora en Plaza Car Service."
      )}`,
      external: true,
    },
    {
      title: "Servicios multimarca",
      text: "Encuentra soluciones específicas para cualquier modelo.",
      label: "Ver servicios",
      href: "#servicios",
    },
    {
      title: "Presupuestos claros",
      text: "Solicita cotizaciones detalladas y sin sorpresas.",
      label: "Cotizar repuesto",
      href: `${whatsappBase}?text=${encodeURIComponent(
        "Hola, quiero cotizar un repuesto para mi vehículo."
      )}`,
      external: true,
    },
    {
      title: "Atención directa",
      text: "Resuelve tus dudas rápidamente a través de nuestros canales de contacto.",
      label: "Contacto",
      href: "#contacto",
    },
  ];

  return (
    <section className="bg-white px-5 py-14 text-[#111318] md:px-10 md:py-20">
      <div className="mx-auto max-w-[1320px]">
        <div className="max-w-4xl">
          <h2 className="text-3xl font-black leading-tight md:text-5xl">
            ¿Qué puedes hacer desde nuestra web?
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[#4c535d] md:text-xl">
            Nos enfocamos en entregarte la tranquilidad y confianza que necesitas
            en cada trayecto.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {actions.map((action) => (
            <article
              key={action.title}
              className="flex min-h-[220px] flex-col rounded-lg border border-[#d7dbe2] bg-[#f4f5f7] p-5"
            >
              <h3 className="text-xl font-black text-[#111318]">
                {action.title}
              </h3>
              <p className="mt-3 text-sm font-semibold leading-relaxed text-[#5c6470]">
                {action.text}
              </p>
              <a
                href={action.href}
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noreferrer" : undefined}
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#111318] px-4 py-3 text-sm font-black text-white transition hover:bg-red-600"
              >
                {action.label}
                <ArrowIcon className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-base font-black leading-relaxed text-[#111318] md:text-lg">
          Explora nuestro sitio y conoce nuestros servicios.
        </p>
      </div>
    </section>
  );
}

function ServiceDetailModal({ service, onClose }) {
  const serviceWhatsAppUrl = `${whatsappBase}?text=${encodeURIComponent(
    `Hola, quiero recibir más información sobre el servicio: ${service.title}`
  )}`;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 px-4 py-8 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-[1.5rem] border border-white/15 bg-[#111318] text-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition hover:bg-red-600 hover:text-white"
          aria-label="Cerrar ficha técnica"
        >
          ×
        </button>

        <div className="grid max-h-[90vh] overflow-y-auto md:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-[280px] bg-black md:min-h-full">
            <img
              src={service.image}
              alt={service.title}
              className="absolute inset-0 h-full w-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-flex rounded-full bg-red-600 px-4 py-2 text-xs font-black text-white">
                {service.badge}
              </span>
              <h3 className="mt-4 text-4xl font-black leading-tight text-white md:text-5xl">
                {service.title}
              </h3>

              <div className="mt-4 inline-flex rounded-xl border border-white/15 bg-black/45 px-5 py-3 backdrop-blur">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-white/55">
                    Atención personalizada
                  </p>
                  <p className="mt-1 text-lg font-black leading-tight">
                    Solicita orientación y cotización
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-red-500">
              Ficha técnica
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/72 md:text-lg">
              {service.detailIntro || service.subtitle}
            </p>

            <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h4 className="text-xl font-black text-white">¿Qué incluye?</h4>
              <div className="mt-4 grid gap-3">
                {(service.includes || []).map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-xl bg-black/25 p-3 text-sm font-semibold text-white/75"
                  >
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                      ✓
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
                <h4 className="text-base font-black text-white">Ideal para</h4>
                <p className="mt-3 text-sm leading-relaxed text-white/68">
                  {service.idealFor}
                </p>
              </div>
              <div className="rounded-2xl border border-red-500/25 bg-red-600/10 p-5">
                <h4 className="text-base font-black text-white">Importante</h4>
                <p className="mt-3 text-sm leading-relaxed text-white/68">
                  {service.note}
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={serviceWhatsAppUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#c83a42] px-6 py-3.5 text-sm font-black text-white transition hover:bg-[#a92f36]"
              >
                <WhatsAppIcon className="h-5 w-5" /> Consultar servicio
              </a>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white px-6 py-3.5 text-sm font-black text-black transition hover:bg-red-600 hover:text-white"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutBranchesSection() {
  const [activeAboutImage, setActiveAboutImage] = useState(0);
  const currentImage = nosotrosImages[activeAboutImage];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveAboutImage((current) =>
        current === nosotrosImages.length - 1 ? 0 : current + 1
      );
    }, 4500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      id="nosotros"
      className="bg-white px-5 py-16 text-[#111318] md:px-10 md:py-20"
    >
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase text-red-600">
              Nosotros
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-[#111318] md:text-5xl">
              Somos la red integral de servicios automotriz en el litoral central
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#5c6470] md:text-lg">
              Estamos más cerca de ti y tu vehículo. Conoce nuestras sucursales y
              encuentra una atención confiable, profesional y pensada para
              entregarte una experiencia simple y cercana.
            </p>
            <a
              href="#sucursales"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg bg-[#c83a42] px-6 py-3.5 text-sm font-black text-white transition hover:bg-[#a92f36]"
            >
              Ver sucursales
              <ArrowIcon className="h-5 w-5" />
            </a>
          </div>

          <div className="flex flex-col gap-7">
            <div className="group relative w-full overflow-hidden rounded-lg border border-[#d7dbe2] bg-[#f4f5f7] shadow-xl shadow-black/10">
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                className={`h-[230px] w-full opacity-95 transition duration-700 group-hover:scale-105 md:h-[280px] xl:h-[320px] ${currentImage.imageClass}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

              <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
                {nosotrosImages.map((image, index) => (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => setActiveAboutImage(index)}
                    className={`h-1.5 rounded-full transition ${
                      activeAboutImage === index
                        ? "w-8 bg-red-600"
                        : "w-4 bg-white/45 hover:bg-white"
                    }`}
                    aria-label={`Ver imagen de nosotros ${index + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

function BranchesSection() {
  return (
    <section
      id="sucursales"
      className="bg-[#f4f5f7] px-5 py-16 text-[#111318] md:px-10 md:py-20"
    >
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="text-sm font-black uppercase text-red-600">
              Sucursales
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">
              Nuestras sucursales
            </h2>
          </div>
          <p className="max-w-3xl text-base leading-relaxed text-[#5c6470] md:text-lg">
            Encuentra la sucursal más cercana y agenda la atención que tu
            vehículo necesita con nuestro equipo.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {branches.map((branch) => (
            <article
              key={branch.id}
              className="group overflow-hidden rounded-lg border border-[#d7dbe2] bg-white shadow-sm transition hover:-translate-y-1 hover:border-red-500/50 hover:shadow-xl"
            >
              <div className="relative h-[230px] overflow-hidden bg-[#111318]">
                <img
                  src={branch.image}
                  alt={branch.name}
                  className="h-full w-full object-cover opacity-92 transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/18 to-transparent" />
                <div className="absolute left-5 top-5 rounded bg-red-600 px-4 py-2 text-xs font-black text-white">
                  {branch.comingSoon ? "Próximamente" : "Sucursal"}
                </div>
                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="text-3xl font-black text-white">
                    {branch.name}
                  </h3>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-red-600/10 p-2 text-red-600">
                    <PinIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-lg font-black text-[#111318]">
                      {branch.address}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#6b7280]">
                      {branch.location}
                    </p>
                  </div>
                </div>

                <p className="mt-5 min-h-[72px] text-sm leading-relaxed text-[#5c6470] md:text-base">
                  {branch.description}
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={branch.comingSoon ? "#" : branch.mapsUrl}
                    target={branch.comingSoon ? undefined : "_blank"}
                    rel={branch.comingSoon ? undefined : "noreferrer"}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#c9ced8] px-5 py-3 text-sm font-black text-[#111318] transition hover:border-[#111318] hover:bg-[#111318] hover:text-white"
                  >
                    <PinIcon className="h-4 w-4" />
                    {branch.comingSoon ? "Próximamente" : "Ver local"}
                  </a>

                  <a
                    href={getBranchWhatsAppUrl(branch.name)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#c83a42] px-5 py-3 text-sm font-black text-white transition hover:bg-[#a92f36]"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Contactar
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AhorroPlusCtaSection() {
  const registerUrl = `${whatsappBase}?text=${encodeURIComponent(
    "Hola, quiero registrarme como cliente preferente del Programa Ahorro Plus."
  )}`;

  return (
    <section className="bg-[#f4f5f7] px-5 py-14 text-[#111318] md:px-10 md:py-20">
      <div className="mx-auto grid max-w-[1320px] gap-8 rounded-lg border border-[#d7dbe2] bg-white p-6 shadow-sm md:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase text-red-600">
            Cliente preferencial
          </p>
          <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">
            Conoce nuestro programa Ahorro Plus
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#5c6470] md:text-lg">
            Accede a grandes beneficios como cliente preferencial y mantén el
            cuidado de tu vehículo de forma simple, clara y conveniente.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
          <a
            href="/ahorro-plus"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#111318] px-6 py-3.5 text-sm font-black text-white transition hover:bg-red-600"
          >
            Ver programa Ahorro Plus
            <ArrowIcon className="h-5 w-5" />
          </a>
          <a
            href={registerUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#c83a42] px-6 py-3.5 text-sm font-black text-white transition hover:bg-[#a92f36]"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Solicitar registro
          </a>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      rut: formData.get("rut"),
      plate: formData.get("plate"),
      message: formData.get("message"),
    };

    try {
      setIsSending(true);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

     const contentType = response.headers.get("content-type");

if (!contentType || !contentType.includes("application/json")) {
  throw new Error("La ruta /api/contact no está respondiendo JSON. Puede que no exista en el hosting.");
}

const data = await response.json();

      if (!response.ok) {
        alert(data.message || "No se pudo enviar la solicitud.");
        return;
      }

      alert(
        "Solicitud enviada correctamente. Nuestro equipo te contactará a la brevedad."
      );

      form.reset();
    } catch (error) {
      console.error("Error al enviar formulario:", error);
      alert("Ocurrió un error al enviar el formulario. Inténtalo nuevamente.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      id="contacto"
      className="bg-[#0c0c0d] px-4 py-16 md:px-8 md:py-20"
    >
      <div className="mx-auto max-w-[1920px]">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-black text-red-500">Contacto</p>

            <h2 className="mt-3 text-3xl font-black leading-tight text-white md:text-5xl">
              Agenda tu atención o envíanos tu consulta
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/68 md:text-lg">
              Si necesitas orientación, cotizar un servicio o agendar una
              atención, completa el formulario y nuestro equipo te contactará a la
              brevedad. Estamos para ayudarte con la mantención, revisión y
              cuidado de tu vehículo en nuestras sucursales del Litoral Central.
            </p>
          </div>

          <div className="rounded-[1.25rem] border border-white/10 bg-[#15171b] p-6 shadow-2xl md:p-8">
            <form className="grid gap-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-bold text-white"
                  >
                    Nombre completo
                  </label>

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    placeholder="Ingresa tu nombre completo"
                    className="w-full rounded-lg border border-white/10 bg-[#0f1013] px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-red-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-bold text-white"
                  >
                    Correo electrónico
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="ejemplo@correo.com"
                    className="w-full rounded-lg border border-white/10 bg-[#0f1013] px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-bold text-white"
                  >
                    Número de teléfono
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+56 9 1234 5678"
                    className="w-full rounded-lg border border-white/10 bg-[#0f1013] px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-red-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="rut"
                    className="mb-2 block text-sm font-bold text-white"
                  >
                    RUT
                  </label>

                  <input
                    id="rut"
                    name="rut"
                    type="text"
                    placeholder="12.345.678-9"
                    className="w-full rounded-lg border border-white/10 bg-[#0f1013] px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="plate"
                  className="mb-2 block text-sm font-bold text-white"
                >
                  Número de patente
                </label>

                <input
                  id="plate"
                  name="plate"
                  type="text"
                  placeholder="ABCD12"
                  className="w-full rounded-lg border border-white/10 bg-[#0f1013] px-4 py-3 uppercase text-white outline-none transition placeholder:text-white/35 focus:border-red-500"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-bold text-white"
                >
                  Mensaje
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Cuéntanos qué servicio necesitas o en qué podemos ayudarte."
                  className="w-full resize-none rounded-lg border border-white/10 bg-[#0f1013] px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-red-500"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={isSending}
                  className="inline-flex items-center justify-center rounded-lg bg-red-600 px-6 py-3 text-sm font-black text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSending ? "Enviando solicitud..." : "Enviar solicitud"}
                </button>

                <a
                  href={whatsappBase}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white px-6 py-3 text-sm font-black text-black transition hover:bg-[#c83a42] hover:text-white"
                >
                  <WhatsAppIcon className="h-5 w-5" /> Contactar por WhatsApp
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingWhatsAppButton() {
  return (
    <a
      href={whatsappBase}
      target="_blank"
      rel="noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-5 right-5 z-[60] inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-2.5 py-1.5 text-white shadow-lg shadow-black/30 ring-1 ring-white/10 transition hover:scale-105 hover:bg-[#1fb957] md:bottom-7 md:right-7"
    >
      <span className="hidden text-xs font-black leading-none md:block">
        ¿Tienes dudas?
      </span>
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
        <WhatsAppIcon className="h-4 w-4" />
      </span>
    </a>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#08090b] px-5 py-10 text-white md:px-10">
      <div className="mx-auto flex max-w-[1920px] flex-col justify-between gap-6 md:flex-row md:items-center">
        <img
          src={plazaCarLogo2026.src}
          alt="Plaza Car Service"
          className="h-28 w-auto object-contain md:h-36"
        />
        <div className="flex flex-col gap-2 text-sm text-white/60 md:items-end">
          <p>
            Plaza Car Service es la red integral de servicios automotriz del
            Litoral Central.
          </p>
          <p>© 2024 Plaza Car Service. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

const tests = [
  slides.length === 4,
  services.length === 10,
  branches.length === 5,
  nosotrosImages.length >= 5,
  services.every((service) => service.title && service.image),
  services.every((service) => Array.isArray(service.includes)),
  whatsappBase === "https://wa.me/56971257621",
];

if (typeof console !== "undefined") {
  console.assert(
    tests.every(Boolean),
    "El prototipo debe mantener 4 slides, 10 servicios, 5 sucursales, modal de ficha técnica y WhatsApp correcto."
  );
}

export default function HomePage() {
  useEffect(() => {
    if (window.location.hash) return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }, []);

  return (
    <div id="home" className="min-h-screen bg-[#0c0c0d] text-white">
      <SiteHeader />
      <PromoMarquee />
      <MainSlider />
      <WebActionsSection />
      <ServicesSection />
      <AboutBranchesSection />
      <BranchesSection />
      <AhorroPlusCtaSection />
      <ContactSection />
      <Footer />
      <FloatingWhatsAppButton />
    </div>
  );
}


"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

const terminoPatenteMes = "1 o 2";
const whatsappBase = "https://wa.me/56971257621";

const slides = [
  {
    id: "red-integral",
    title: "Conoce nuestra red integral de servicios automotriz",
    text: "Estamos ubicados en Algarrobo y El Tabo, y próximamente en El Quisco y San Antonio, con una atención cercana, de calidad y adaptada a lo que tu vehículo necesita.",
    primary: "Ver nuestros servicios",
    secondary: "Conoce sucursales",
    href: "#servicios",
    secondaryHref: "#nosotros",
    image: "/slider/red-integral.png",
    mobileImage: "/slider-mobile/red-integral-mobile.png",
    imageClass: "object-contain object-center bg-black md:object-cover md:object-center",
  },
  {
    id: "comodidad",
    title: "Atención, comodidad y cercanía",
    text: "En nuestras instalaciones encontrarás una atención cercana y profesional, además de un espacio cómodo para esperar mientras atendemos las necesidades de tu vehículo.",
    primary: "Conoce nuestras sucursales",
    secondary: "Contáctanos",
    href: "#nosotros",
    secondaryHref: "#contacto",
    image: "/slider/comodidad.png",
    mobileImage: "/slider-mobile/comodidad-mobile.png",
    imageClass: "object-contain object-center bg-black md:object-cover md:object-[65%_center]",
  },
  {
    id: "ahorro-plus-slide",
    title: "Haz tu mantención según pauta del fabricante",
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
    title: `Si tu patente termina en ${terminoPatenteMes} ven por tu pre-revisión!`,
    text: "Entonces este mensaje es para ti. En Plaza Car Service te ayudamos a preparar tu vehículo para la revisión técnica con una pre revisión completa, enfocada en detectar observaciones a tiempo y ayudarte a evitar rechazos.",
    primary: "Agendar pre revisión",
    secondary: "Ver detalle",
    href: "https://wa.me/56971257621?text=Hola,%20quiero%20agendar%20una%20pre%20revisi%C3%B3n%20t%C3%A9cnica",
    secondaryHref: "#contacto",
    image: "/slider/pre-revision-tecnica.png",
    mobileImage: "/slider-mobile/pre-revision-tecnica-mobile.png",
    imageClass: "object-contain object-center bg-black md:object-cover md:object-center",
  },
];

const services = [
  {
    id: "ahorro-plus",
    badge: "Servicio de Mantención Preventiva",
    title: "Mantención Ahorro Plus",
    subtitle: "Mantén tu vehículo según pauta del fabricante.",
    price: "$109.000",
    cta: "Agendar mantención",
    more: "Ver más",
    image: "/Servicios/servicio-ahorro-plus.png",
    detailIntro:
      "Plan preventivo pensado para mantener tu vehículo según pauta del fabricante, cuidando el rendimiento y ayudando a prevenir fallas por falta de mantención.",
    includes: [
      "4 litros de aceite 5W30",
      "Filtro de aceite",
      "Filtro de polen",
      "Relleno de niveles",
      "Lubricación de puertas y bisagras",
      "Rotación y balanceo de 4 neumáticos",
      "Revisión de frenos, batería, luces, filtros, plumillas, tren delantero y cañerías",
    ],
    idealFor:
      "Vehículos que requieren una mantención completa y preventiva para seguir la pauta recomendada por el fabricante.",
    note: "Además acumulas puntos para canjear en productos de vitrina.",
  },
  {
    id: "frenos",
    badge: "Seguridad preventiva",
    title: "Mantención de Frenos",
    subtitle: "Cuida tu seguridad y evita desgastes mayores.",
    price: "$59.900 + IVA",
    cta: "Agendar evaluación",
    more: "Ver más",
    image: "/Servicios/servicio-frenos.png",
    detailIntro:
      "Servicio orientado a revisar el estado del sistema de frenado y detectar señales de desgaste antes de que se transformen en una falla mayor.",
    includes: [
      "Cambio de pastillas según evaluación",
      "Rectificación de discos según condición",
      "Revisión completa del sistema de frenado",
      "Diagnóstico preventivo",
      "Orientación sobre próximos pasos de mantención",
    ],
    idealFor:
      "Vehículos con ruidos al frenar, vibración en el pedal, mayor distancia de frenado o sensación esponjosa al frenar.",
    note: "Evita desgastes mayores, ruidos y fallas inesperadas.",
  },
  {
    id: "neumaticos",
    badge: "Estabilidad y rendimiento",
    title: "Mantención de Neumáticos",
    subtitle: "Alineación, balanceo y rotación para mejor rendimiento.",
    price: "$29.000",
    cta: "Agendar servicio",
    more: "Ver más",
    image: "/Servicios/servicios-neumaticos.png",
    detailIntro:
      "Mantención integral para mejorar la estabilidad, reducir vibraciones y prolongar la vida útil de tus neumáticos.",
    includes: [
      "Alineación de tren delantero",
      "Balanceo plomo de golpe",
      "Rotación de neumáticos",
      "Revisión visual de desgaste",
      "Orientación sobre estado de neumáticos",
    ],
    idealFor:
      "Vehículos con desgaste irregular, vibración al conducir, menor agarre en curvas o conducción inestable.",
    note: "Un buen estado de neumáticos es clave para tu seguridad.",
  },
  {
    id: "limpieza",
    badge: "Cuidado interior y exterior",
    title: "Lavado y Limpieza",
    subtitle: "Lavado exterior y limpieza interior disponibles de forma individual.",
    price: "$9.000 c/u",
    priceLines: ["Lavado exterior $9.000", "Limpieza interior $9.000"],
    cta: "Agendar limpieza",
    more: "Ver más",
    image: "/Servicios/servicio-lavado-y-limpieza.png",
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
    badge: "Dirección y estabilidad",
    title: "Alineación y Balanceo",
    subtitle:
      "Mejora la estabilidad, reduce vibraciones y evita el desgaste irregular de tus neumáticos.",
    price: "Consultar",
    cta: "Agendar servicio",
    more: "Ver más",
    image: "/Servicios/servicio-alineacion-y-balanceo.png",
    detailIntro:
      "Servicio enfocado en corregir la dirección y equilibrar las ruedas para mejorar la conducción y prevenir desgaste prematuro.",
    includes: [
      "Revisión de alineación",
      "Corrección de tren delantero según condición",
      "Balanceo de ruedas",
      "Revisión de vibraciones asociadas a neumáticos",
      "Orientación sobre estado general del tren delantero",
    ],
    idealFor:
      "Vehículos que se cargan hacia un lado, presentan vibración al conducir o tienen desgaste irregular en neumáticos.",
    note: "Recomendado después de golpes fuertes, cambio de neumáticos o mantenciones de tren delantero.",
  },
  {
    id: "cambio-aceite",
    badge: "Lubricación del motor",
    title: "Cambio de Aceite",
    subtitle:
      "Protege el motor de tu vehículo con un cambio de aceite oportuno y revisión de filtros.",
    price: "Consultar",
    cta: "Agendar cambio",
    more: "Ver más",
    image: "/Servicios/servicio-cambio-aceite.png",
    detailIntro:
      "Servicio esencial para proteger el motor, mantener una lubricación adecuada y evitar desgaste prematuro de componentes internos.",
    includes: [
      "Cambio de aceite según requerimiento del vehículo",
      "Revisión de filtro de aceite",
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
      "Detecta fallas y códigos de alerta mediante diagnóstico electrónico especializado.",
    price: "Consultar",
    cta: "Agendar scanner",
    more: "Ver más",
    image: "/Servicios/servicio-scanner.png",
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
];

const nosotrosImages = [
  {
    id: "equipo-plaza-car",
    src: "/Nosotros/nosotros-1.png",
    alt: "Equipo Plaza Car Service",
    imageClass: "object-contain object-center bg-black",
  },
  {
    id: "sucursal-plaza-car",
    src: "/Nosotros/nosotros-2.png",
    alt: "Sucursal Plaza Car Service",
    imageClass: "object-cover object-center",
  },
  {
    id: "atencion-plaza-car",
    src: "/Nosotros/nosotros-3.png",
    alt: "Atención Plaza Car Service",
    imageClass: "object-cover object-[60%_center]",
  },
];

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

function LogoMockup() {
  return (
    <div className="relative flex h-[58px] w-[190px] items-center overflow-visible md:h-[82px] md:w-[260px]">
      <img
        src="/logo-plaza-car-service-vfinal.png"
        alt="Plaza Car Service"
        className="absolute left-0 h-[82px] w-auto max-w-none object-contain md:h-[110px]"
      />
    </div>
  );
}

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0b0c0f]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1920px] items-center justify-between px-5 py-4 md:px-10">
        <a href="#home" aria-label="Plaza Car Service">
          <LogoMockup />
        </a>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-white/70 md:flex">
          <a className="border-b-2 border-red-600 pb-2 text-white" href="#home">
            Home
          </a>
          <a className="transition hover:text-white" href="#servicios">
            Servicios
          </a>
          <a className="transition hover:text-white" href="#nosotros">
            Nosotros
          </a>
          <a className="transition hover:text-white" href="#contacto">
            Contacto
          </a>
        </nav>

        <a
          href={whatsappBase}
          target="_blank"
          rel="noreferrer"
          className="hidden items-center gap-2 rounded-lg bg-[#c83a42] px-5 py-3 text-sm font-black text-white transition hover:bg-[#a92f36] md:inline-flex"
        >
          <WhatsAppIcon className="h-4 w-4" /> Agendar hora
        </a>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
          className="rounded-full border border-white/10 px-4 py-3 text-sm font-black text-white md:hidden"
          aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? "Cerrar" : "Menú"}
        </button>

        {isMobileMenuOpen && (
          <div className="absolute left-4 right-4 top-[calc(100%+10px)] z-50 overflow-hidden rounded-2xl border border-white/10 bg-[#111318]/98 p-4 shadow-2xl shadow-black/50 backdrop-blur-xl md:hidden">
            <nav className="grid gap-2 text-sm font-black text-white">
              <a
                href="#home"
                onClick={closeMobileMenu}
                className="rounded-xl bg-white/5 px-4 py-3 transition hover:bg-red-600"
              >
                Home
              </a>
              <a
                href="#servicios"
                onClick={closeMobileMenu}
                className="rounded-xl bg-white/5 px-4 py-3 transition hover:bg-red-600"
              >
                Servicios
              </a>
              <a
                href="#nosotros"
                onClick={closeMobileMenu}
                className="rounded-xl bg-white/5 px-4 py-3 transition hover:bg-red-600"
              >
                Nosotros
              </a>
              <a
                href="#contacto"
                onClick={closeMobileMenu}
                className="rounded-xl bg-white/5 px-4 py-3 transition hover:bg-red-600"
              >
                Contacto
              </a>
              <a
                href={whatsappBase}
                target="_blank"
                rel="noreferrer"
                onClick={closeMobileMenu}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#c83a42] px-4 py-3 text-white transition hover:bg-[#a92f36]"
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

function PromoMarquee() {
  const message =
    "Durante todo el mes de junio aprovecha nuestros servicios entre 3 a 6 cuotas sin interes.";
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
    <section id="home" className="bg-[#0c0c0d]">
      <div className="relative min-h-[560px] overflow-hidden bg-[#111318] md:min-h-[640px]">
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet={slide.mobileImage || slide.image}
          />
          <img
            src={slide.image}
            alt={slide.title}
            className={`absolute inset-0 h-full w-full opacity-85 transition duration-500 ${
              slide.imageClass ??
              "object-contain object-center bg-black md:object-cover md:object-center"
            }`}
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/10 md:bg-gradient-to-r md:from-black md:via-black/80 md:to-black/22" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />

        <button
          type="button"
          onClick={previousSlide}
          className="absolute left-5 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur transition hover:bg-white hover:text-black md:flex"
          aria-label="Slide anterior"
        >
          <ArrowIcon className="h-5 w-5 rotate-180" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-5 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur transition hover:bg-white hover:text-black md:flex"
          aria-label="Slide siguiente"
        >
          <ArrowIcon className="h-5 w-5" />
        </button>

        <div className="relative z-10 mx-auto flex min-h-[560px] max-w-[1920px] flex-col justify-end px-5 pb-8 pt-20 md:min-h-[640px] md:justify-between md:px-20 md:py-16">
          <div className="max-w-4xl pt-8 md:pt-12">
            <h1 className="max-w-4xl text-[2rem] font-black leading-[1.02] tracking-[-0.045em] text-white drop-shadow-2xl sm:text-4xl md:text-7xl">
              {slide.title}
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/76 md:mt-6 md:text-xl">
              {slide.text}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-8">
              <a
                href={slide.href}
                target={slide.href.startsWith("http") ? "_blank" : undefined}
                rel={slide.href.startsWith("http") ? "noreferrer" : undefined}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#c83a42] px-7 py-4 text-sm font-black text-white transition hover:bg-[#a92f36] md:text-base"
              >
                {slide.href.includes("wa.me") && (
                  <WhatsAppIcon className="h-5 w-5" />
                )}
                {slide.primary}
              </a>

              <a
                href={slide.secondaryHref}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white px-7 py-4 text-sm font-black text-black transition hover:bg-red-600 hover:text-white md:text-base"
              >
                {slide.secondary}
              </a>
            </div>
          </div>

          <div className="mt-8 flex justify-end md:mt-0">
            <div className="flex items-center gap-3">
              {slides.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSlide(index)}
                  className={`h-1 rounded-full transition ${
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
  const [activeId, setActiveId] = useState("ahorro-plus");
  const servicesScrollRef = useRef(null);
  const serviceItemRefs = useRef({});

  const active = useMemo(
    () => services.find((service) => service.id === activeId) || services[0],
    [activeId]
  );

  const activeServiceIndex = services.findIndex(
    (service) => service.id === activeId
  );

  const previousService = () => {
    const previousIndex =
      activeServiceIndex <= 0 ? services.length - 1 : activeServiceIndex - 1;
    setActiveId(services[previousIndex].id);
  };

  const nextService = () => {
    const nextIndex =
      activeServiceIndex >= services.length - 1 ? 0 : activeServiceIndex + 1;
    setActiveId(services[nextIndex].id);
  };

  const whatsappUrl = `${whatsappBase}?text=${encodeURIComponent(
    `Hola, quiero agendar el servicio: ${active.title}`
  )}`;

  useEffect(() => {
    const slider = servicesScrollRef.current;
    if (!slider) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let dragged = false;

    const handleMouseDown = (event) => {
      isDown = true;
      dragged = false;
      slider.classList.add("cursor-grabbing");
      startX = event.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const stopDragging = () => {
      isDown = false;
      slider.classList.remove("cursor-grabbing");
    };

    const handleMouseMove = (event) => {
      if (!isDown) return;
      event.preventDefault();
      const x = event.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.35;

      if (Math.abs(walk) > 6) dragged = true;
      slider.scrollLeft = scrollLeft - walk;
    };

    const handleClick = (event) => {
      if (!dragged) return;
      event.preventDefault();
      event.stopPropagation();
      dragged = false;
    };

    slider.addEventListener("mousedown", handleMouseDown);
    slider.addEventListener("mouseleave", stopDragging);
    slider.addEventListener("mouseup", stopDragging);
    slider.addEventListener("mousemove", handleMouseMove);
    slider.addEventListener("click", handleClick, true);

    return () => {
      slider.removeEventListener("mousedown", handleMouseDown);
      slider.removeEventListener("mouseleave", stopDragging);
      slider.removeEventListener("mouseup", stopDragging);
      slider.removeEventListener("mousemove", handleMouseMove);
      slider.removeEventListener("click", handleClick, true);
    };
  }, []);

  useEffect(() => {
    const activeButton = serviceItemRefs.current[activeId];
    if (!activeButton) return;

    activeButton.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeId]);

  return (
    <section
      id="servicios"
      className="bg-[#0c0c0d] px-4 py-10 md:px-8 md:py-14"
    >
      <div className="mx-auto max-w-[1920px]">
        <div className="mb-8 grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="text-sm font-black text-red-500">
              Nuestros servicios
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-white md:text-5xl">
              Conoce nuestros Servicios Destacados
            </h2>
          </div>

          <p className="max-w-3xl text-base leading-relaxed text-white/68 md:text-lg">
            Encuentra servicios pensados para la mantención, seguridad y limpieza
            de tu vehículo, con atención cercana y profesional en nuestras
            sucursales del Litoral Central.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[1.25rem] border border-white/15 bg-[#111318] p-4 shadow-2xl md:h-[550px] md:p-6">
          <button
            type="button"
            onClick={previousService}
            className="absolute left-3 top-[42%] z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur transition hover:bg-white hover:text-black md:left-5 md:h-11 md:w-11"
            aria-label="Servicio anterior"
          >
            <ArrowIcon className="h-5 w-5 rotate-180" />
          </button>

          <button
            type="button"
            onClick={nextService}
            className="absolute right-3 top-[42%] z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur transition hover:bg-white hover:text-black md:right-5 md:h-11 md:w-11"
            aria-label="Servicio siguiente"
          >
            <ArrowIcon className="h-5 w-5" />
          </button>

          <div className="absolute inset-0 opacity-40">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#1b1d22_0%,#08090b_52%,#17191d_100%)]" />
            <div className="absolute right-0 top-0 h-full w-[55%] bg-[radial-gradient(circle_at_65%_35%,rgba(227,6,19,0.2),transparent_35%)]" />
          </div>

          <div className="relative grid h-full gap-4 md:grid-rows-[1fr_96px]">
            <div className="relative min-h-[440px] overflow-hidden rounded-[1rem] bg-black md:min-h-0">
              <img
                src={active.image}
                alt={active.title}
                className="absolute inset-0 h-full w-full object-cover opacity-90 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/72 to-black/10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15" />

              <div className="relative z-10 grid h-full gap-6 p-6 md:grid-cols-[minmax(0,1fr)_220px] md:p-8">
                <div className="flex min-w-0 flex-col justify-between">
                  <div>
                    <span className="inline-flex rounded-full bg-red-600 px-6 py-3 text-xs font-black text-white shadow-xl shadow-red-600/30 md:text-sm">
                      {active.badge}
                    </span>
                  </div>

                  <div className="pb-2 pt-8 md:pt-10">
                    <h2 className="max-w-4xl text-4xl font-black leading-[0.98] tracking-[-0.035em] text-white drop-shadow-2xl md:text-6xl">
                      {active.title}
                    </h2>

                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/78 md:text-xl">
                      {active.subtitle}
                    </p>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#c83a42] px-6 py-3.5 text-sm font-black text-white transition hover:bg-[#a92f36] md:text-base"
                      >
                        <WhatsAppIcon className="h-5 w-5" /> {active.cta}
                      </a>

                      <a
                        href={`/servicios/${active.id}`}
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white px-6 py-3.5 text-sm font-black text-black transition hover:bg-red-600 hover:text-white md:text-base"
                      >
                        {active.more}
                      </a>
                    </div>
                  </div>
                </div>

                <aside className="flex items-end justify-start md:items-center md:justify-end">
                  <div className="w-fit min-w-[168px] rounded-[1.1rem] border border-white/15 bg-black/35 px-5 py-4 text-white shadow-xl backdrop-blur-md md:min-w-[188px] md:px-5 md:py-4">
                    <p className="text-center text-[11px] font-black uppercase tracking-[0.22em] text-white/55">
                      PRECIO
                    </p>

                    {active.priceLines ? (
                      <div className="mt-2 space-y-1 text-center">
                        {active.priceLines.map((line) => (
                          <p
                            key={line}
                            className="text-base font-black leading-tight tracking-[-0.02em] md:text-lg"
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-2 text-center text-2xl font-black leading-none tracking-[-0.03em] md:text-3xl">
                        {active.price}
                      </p>
                    )}
                  </div>
                </aside>
              </div>
            </div>

            <div
              ref={servicesScrollRef}
              className="flex cursor-grab select-none gap-3 overflow-x-auto scroll-smooth pb-3 pr-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {services.map((service) => {
                const isActive = active.id === service.id;

                return (
                  <button
                    key={service.id}
                    ref={(element) => {
                      serviceItemRefs.current[service.id] = element;
                    }}
                    onClick={() => setActiveId(service.id)}
                    className={`flex min-h-[96px] min-w-[230px] flex-shrink-0 flex-col justify-between rounded-lg p-3 text-left transition md:min-w-[260px] xl:min-w-[280px] ${
                      isActive
                        ? "bg-red-600 text-white shadow-xl shadow-red-600/25 ring-1 ring-red-300/25"
                        : "bg-[#202226] text-white/70 ring-1 ring-white/10 hover:bg-[#2b2d32] hover:text-white"
                    }`}
                  >
                    <div>
                      <p className="text-[11px] font-black leading-tight md:text-xs xl:text-sm">
                        {service.title}
                      </p>

                      {service.priceLines ? (
                        <div className="mt-2 space-y-1">
                          {service.priceLines.map((line) => (
                            <p
                              key={line}
                              className="text-xs font-black leading-tight md:text-sm"
                            >
                              {line}
                            </p>
                          ))}
                        </div>
                      ) : (
                        <p className="mt-2 text-sm font-black tracking-[-0.02em] md:text-base xl:text-lg">
                          {service.price}
                        </p>
                      )}
                    </div>

                    <div className="mt-3 h-px bg-white/55" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
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
                    Precio
                  </p>
                  {service.priceLines ? (
                    <div className="mt-1 space-y-1">
                      {service.priceLines.map((line) => (
                        <p key={line} className="text-lg font-black leading-tight">
                          {line}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-1 text-2xl font-black">{service.price}</p>
                  )}
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
      className="bg-[#0c0c0d] px-4 py-16 md:px-8 md:py-20"
    >
      <div className="mx-auto max-w-[1920px]">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <p className="text-sm font-black text-red-500">Nosotros</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-white md:text-5xl">
              Somos la red integral de servicios automotriz en el litoral central
            </h2>
          </div>

          <div className="flex flex-col gap-7">
            <div className="group relative w-full overflow-hidden rounded-lg border border-white/10 bg-[#15171b] shadow-2xl shadow-black/45">
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                className={`h-[230px] w-full opacity-95 transition duration-700 group-hover:scale-105 md:h-[280px] xl:h-[320px] ${currentImage.imageClass}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

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

            <p className="max-w-3xl text-base leading-relaxed text-white/68 md:text-lg lg:text-left">
              Estamos más cerca de ti y tu vehículo. Conoce nuestras sucursales y
              encuentra una atención confiable, profesional y pensada para
              entregarte una experiencia simple y cercana.
            </p>
          </div>
        </div>

        <div className="mt-14">
          <p className="text-sm font-black text-red-500">Sucursales</p>
          <h3 className="mt-3 text-3xl font-black leading-tight text-white md:text-5xl">
            Nuestras Sucursales
          </h3>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/68 md:text-lg">
            Encuentra la sucursal más cercana y agenda la atención que tu vehículo necesita.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {branches.map((branch) => (
            <article
              key={branch.id}
              className="group overflow-hidden rounded-lg border border-white/10 bg-[#15171b] shadow-xl transition hover:-translate-y-1 hover:border-red-500/45"
            >
              <div className="relative h-[230px] overflow-hidden bg-black">
                <img
                  src={branch.image}
                  alt={branch.name}
                  className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
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
                  <div className="mt-1 rounded-full bg-red-600/15 p-2 text-red-500">
                    <PinIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-lg font-black text-white">
                      {branch.address}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-white/55">
                      {branch.location}
                    </p>
                  </div>
                </div>

                <p className="mt-5 min-h-[72px] text-sm leading-relaxed text-white/68 md:text-base">
                  {branch.description}
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={branch.comingSoon ? "#" : branch.mapsUrl}
                    target={branch.comingSoon ? undefined : "_blank"}
                    rel={branch.comingSoon ? undefined : "noreferrer"}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/25 px-5 py-3 text-sm font-black text-white transition hover:bg-white hover:text-black"
                  >
                    <PinIcon className="h-4 w-4" /> {branch.comingSoon ? "Próximamente" : "Ver local"}
                  </a>

                  <a
                    href={getBranchWhatsAppUrl(branch.name)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#c83a42] px-5 py-3 text-sm font-black text-white transition hover:bg-[#c83a42]"
                  >
                    <WhatsAppIcon className="h-4 w-4" /> Contactar
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
        <LogoMockup />
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
  services.length === 7,
  branches.length === 5,
  nosotrosImages.length === 3,
  services.every((service) => service.title && service.price && service.image),
  services.every((service) => Array.isArray(service.includes)),
  services.some((service) => service.id === "limpieza" && service.priceLines?.length === 2),
  whatsappBase === "https://wa.me/56971257621",
];

if (typeof console !== "undefined") {
  console.assert(
    tests.every(Boolean),
    "El prototipo debe mantener 4 slides, 7 servicios, 5 sucursales, modal de ficha técnica y WhatsApp correcto."
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
    <div className="min-h-screen bg-[#0c0c0d] text-white">
      <Header />
      <PromoMarquee />
      <MainSlider />
      <ServicesSection />
      <AboutBranchesSection />
      <ContactSection />
      <Footer />
      <FloatingWhatsAppButton />
    </div>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";

import { serviceGalleries } from "../../generated-galleries";
import SiteHeader from "../../components/SiteHeader";

const whatsappBase = "https://wa.me/56971257621";

const services = [
  {
    id: "mantencion-kilometraje",
    badge: "Mantención preventiva",
    title: "Mantención por Kilometraje",
    subtitle: "Servicio programado cada 10.000 km o una vez al año.",
    image: "/site-photos/auto-rampa-servicio.webp",
    detailIntro:
      "Para garantizar el rendimiento óptimo y la vida útil de tu motor, es fundamental realizar la mantención de tu vehículo cada 10.000 km o una vez al año (según indique el manual del fabricante).",
    detailSectionLabel: "Nuestro plan de mantención",
    detailSectionTitle: "Incluye:",
    includes: [
      "Inspección de seguridad: cambio de aceite y filtro de aceite, cambio filtro de polen, revisión de filtro de aire, frenos, tren delantero y neumáticos, escáner de diagnóstico.",
      "Chequeo general: Revisión de todos los niveles, estado de correas, filtros, bujías y luces.",
      "Asesoría: Orientación personalizada sobre el estado general de tu vehículo.",
      "Garantía de Liderazgo: Llevamos años atendiendo los vehículos de la zona con los más altos estándares de calidad y seguridad.",
    ],
    idealFor:
      "Al cumplir rigurosamente con estas pautas mediante revisiones oportunas, evitarás cualquier tipo de falla mayor a futuro.",
    note: "Agenda tu mantención preventiva y recibe una revisión clara del estado general de tu vehículo.",
  },
  {
    id: "frenos",
    badge: "Seguridad preventiva",
    title: "Mantención de Frenos",
    subtitle: "Diagnóstico, cambio de componentes y mantención del sistema.",
    image: "/site-photos/mecanica-auto-elevado.webp",
    detailIntro:
      "El sistema de frenos es el componente de seguridad más importante de tu vehículo. No dejes tu tranquilidad al azar; nuestro equipo de técnicos expertos te asesorarán y utiliza repuestos de primera calidad para garantizarte un frenado preciso, seguro y de respuesta inmediata en cualquier situación.",
    detailSectionLabel: "Nuestros servicios de frenos",
    detailSectionTitle: "Incluyen:",
    includes: [
      "Diagnóstico e Inspección General: Revisión detallada del grosor de las pastillas, estado de los discos, mangueras y nivel de líquido para detectar cualquier desgaste antes de que se convierta en un problema.",
      "Cambio de Pastillas y Balatas: Reemplazo preventivo con repuestos certificados (cerámicos o semi-metálicos) de alta durabilidad para asegurar la mejor fricción y eliminar ruidos molestos.",
      "Rectificación y Cambio de Discos: Torneado de precisión para corregir vibraciones al frenar, o reemplazo completo de los discos si ya cumplieron su vida útil.",
      "Renovación de Líquido de Frenos y Purga: Drenaje del líquido viejo, eliminación de burbujas de aire en el sistema y llenado con líquido nuevo de alto rendimiento para mantener un pedal firme y seguro.",
      "Revisión del Sistema ABS: Escaneo y limpieza de sensores para garantizar que tu sistema de frenos antibloqueo responda a la perfección durante emergencias.",
      "Garantía de Liderazgo: Llevamos años equipando los vehículos de la zona con los más altos estándares de calidad y seguridad.",
    ],
    idealFor:
      "Vehículos con ruidos al frenar, vibración en el pedal, mayor distancia de frenado o señales de desgaste en el sistema.",
    note: "Agenda una revisión preventiva para mantener la respuesta de frenado segura y confiable.",
  },
  {
    id: "pre-revision-tecnica",
    badge: "Chequeo preventivo",
    title: "Servicio de Pre-Revisión Técnica",
    subtitle: "Chequeo completo para preparar tu vehículo antes de la revisión técnica.",
    image: "/site-photos/auto-rampa-servicio.webp",
    detailIntro:
      "Asegura la aprobación de tu vehículo con nuestro chequeo preventivo completo antes de presentarte a la revisión técnica.",
    includes: [
      "Revisión de luces, micas y cristales",
      "Revisión del sistema de frenos",
      "Revisión de cinturones de seguridad",
      "Control y medición de gases",
      "Inspección del tren delantero y estado de los neumáticos",
    ],
    idealFor:
      "Vehículos próximos a rendir revisión técnica o conductores que quieren detectar observaciones antes de presentarse.",
    note: "Este chequeo permite anticipar posibles rechazos y orientar las correcciones necesarias antes de la revisión oficial.",
  },
  {
    id: "baterias",
    badge: "Energía y partida",
    title: "Venta de Baterías",
    subtitle: "Baterías de alto rendimiento para asegurar el encendido.",
    image: "/site-photos/sucursal-interior-auto.webp",
    detailIntro:
      "¿A tu auto le cuesta arrancar? No esperes a quedarte botado. Asegura el encendido de tu motor al primer intento con nuestras baterías de alto rendimiento. Diseñadas con tecnología de arranque en frío superior, resisten los climas más extremos y te garantizan energía ininterrumpida.",
    detailSectionLabel: "Venta de Baterías",
    detailSectionTitle: "Incluye:",
    includes: [
      "Máxima potencia para vehículos de alta exigencia.",
      "Larga vida útil que protege tu inversión.",
      "Catálogo multimarca para encontrar tu ajuste perfecto.",
      "Garantía de Liderazgo: Llevamos años equipando los vehículos de la zona con los más altos estándares de calidad y seguridad.",
    ],
    idealFor:
      "Vehículos con partida débil, batería antigua o fallas eléctricas asociadas a baja carga.",
    note: "Disponibilidad y valores sujetos a stock.",
  },
  {
    id: "limpieza",
    badge: "Cuidado interior y exterior",
    title: "Lavado y Estética Automotriz",
    subtitle: "Limpieza interior, exterior y cuidado estético del vehículo.",    image: "/site-photos/lavado-auto-premium.webp",
    detailIntro:
      "No es solo apariencia, es protección. Removemos la suciedad acumulada, el salitre y los contaminantes que dañan la pintura y el interior de tu vehículo a largo plazo.",
    detailSectionLabel: "Servicios disponibles",
    detailSectionTitle: "Incluye:",
    includes: [
      "Lavado exterior premium.",
      "Aspirado profundo de alfombras.",
      "Acondicionamiento y limpieza de tapizados.",
      "Desinfección total del habitáculo.",
    ],
    idealFor:
      "Vehículos que necesitan una limpieza confiable, protección estética y una mejor presentación interior y exterior.",
    note: "Lavado exterior y limpieza interior se pueden solicitar por separado.",
  },
  {
    id: "alineacion-balanceo",
    badge: "Seguridad y confort",
    title: "Alineación + Balanceo + Rotación",
    subtitle:
      "Servicio combinado para mejorar seguridad, estabilidad y vida útil de tus neumáticos.",
    image: "/site-photos/auto-rampa-servicio.webp",
    detailIntro:
      "Maximiza la vida útil de tus neumáticos, ahorra combustible y conduce con total seguridad y confort con nuestro servicio 3 en 1.",
    detailSectionLabel: "Qué incluye nuestro servicio",
    detailSectionTitle: "Incluye:",
    includes: [
      "Alineación de precisión: Corrige la dirección para evitar que el auto \"tire\" hacia los lados y lograr una trayectoria recta.",
      "Balanceo computarizado: Elimina las molestas vibraciones en el volante a altas velocidades para un manejo suave.",
      "Rotación estratégica: Promueve un desgaste parejo en las cuatro ruedas, multiplicando los kilómetros de uso de tus neumáticos.",
    ],
    idealFor:
      "Vehículos que se cargan hacia un lado, presentan vibración al conducir o tienen desgaste irregular en neumáticos.",
    note: "Garantía de Liderazgo: Llevamos años atendiendo los vehículos de la zona con los más altos estándares de calidad y seguridad.",
  },
  {
    id: "cambio-aceite",
    badge: "Lubricación del motor",
    title: "Cambio de Aceite y Filtro",
    subtitle:
      "Lubricación adecuada para cuidar el rendimiento del motor.",
    image: "/site-photos/mecanica-auto-elevado.webp",
    detailIntro:
      "El motor es el corazón de tu vehículo y necesita la mejor lubricación para rendir al máximo. Un aceite de calidad reduce la fricción, regula la temperatura de las piezas internas y previene averías prematuras. Trabajamos exclusivamente con aceites sintéticos y semi-sintéticos homologados para todas las marcas del parque automotriz.",
    detailSectionLabel: "Qué incluye el servicio",
    detailSectionTitle: "Incluye:",
    includes: [
      "Cambio de aceite: Utilizamos exactamente la viscosidad recomendada por el fabricante de tu auto.",
      "Reemplazo del filtro: Instalación de un filtro de aceite nuevo para garantizar la pureza del lubricante.",
      "Ajuste electrónico: Reseteo del indicador de mantenimiento en el tablero.",
      "Garantía de Liderazgo: Llevamos años equipando y atendiendo los vehículos de la zona con los más altos estándares de calidad y seguridad.",
    ],
    idealFor:
      "Vehículos que ya cumplieron kilometraje o tiempo recomendado para cambio de aceite.",
    note: "Servicio esencial para proteger el motor y mantener una lubricación adecuada.",
  },
  {
    id: "scanner",
    badge: "Scanner Automotriz",
    title: "Diagnóstico Computarizado Avanzado:",
    subtitle:
      "Diagnóstico computarizado avanzado para detectar fallas ocultas.",
    image: "/site-photos/scanner-alineacion-equipo.webp",
    detailIntro:
      "Utilizamos tecnología de diagnóstico de vanguardia para comunicarnos directamente con la computadora de tu vehículo. Detectamos con total precisión cualquier anomalía electrónica en tiempo real, solucionando problemas ocultos antes de que se conviertan en reparaciones costosas.",
    detailSectionLabel: "Qué incluye este servicio",
    detailSectionTitle: "Incluye:",
    includes: [
      "Análisis de Motor: Lectura y borrado preciso de códigos de falla (apagamos esa molesta luz de Check Engine).",
      "Revisión de Seguridad: Diagnóstico exhaustivo de sistemas críticos como frenos ABS, control de tracción y Airbags (SRS).",
      "Monitoreo de Sensores: Verificación en tiempo real del correcto funcionamiento de todos los componentes electrónicos.",
      "Optimización General: Ajustes y calibraciones para asegurar que tu auto rinda al máximo de su capacidad.",
    ],
    idealFor:
      "Vehículos con luces de advertencia encendidas, fallas intermitentes o pérdida de rendimiento.",
    note: "El scanner ayuda a orientar el diagnóstico, pero algunas fallas pueden requerir revisión mecánica adicional.",
  },
  {
    id: "pintura",
    badge: "Estética automotriz",
    title: "Pintura y Estética Automotriz",
    subtitle: "Tu auto como nuevo.",
    image: "/site-photos/sucursal-fachada.webp",
    detailIntro:
      "¿Tu auto perdió su brillo o sufrió un percance? Nosotros nos encargamos de que vuelva a lucir impecable. Gracias a nuestro exclusivo laboratorio de colorimetría computarizada y a nuestras cabinas de pintura especializadas, garantizamos una igualación de color perfecta y acabados de fábrica que protegen y renuevan tu vehículo.",
    detailSectionLabel: "Qué podemos hacer por tu auto",
    detailSectionTitle: "Incluye:",
    includes: [
      "Desabolladura Express: Soluciones ágiles para que esos pequeños detalles desaparezcan en tiempo récord.",
      "Pintura por Piezas o General: Aplicamos pintura de alta resistencia que soporta el paso del tiempo y las condiciones del clima.",
      "Pulido Orbital Profesional: Eliminamos micro-rayones e imperfecciones, devolviéndole a la carrocería su brillo.",
      "Garantía de Liderazgo: Llevamos años atendiendo los vehículos de la zona con los más altos estándares de calidad y seguridad.",
    ],
    idealFor:
      "Vehículos con detalles estéticos, rayas, desgaste de pintura o necesidad de recuperación visual.",
    note: "Requiere evaluación para confirmar tiempos, alcance y valor.",
  },
  {
    id: "mecanica-compleja",
    badge: "Reparación especializada",
    title: "Mecánica Compleja y Reparaciones Mayores",
    subtitle: "Diagnóstico y reparación para fallas mecánicas de mayor alcance.",
    image: "/site-photos/mecanica-auto-elevado.webp",
    detailIntro:
      "Cuando tu vehículo necesita una intervención profunda, estás en las mejores manos. Nuestro equipo de ingenieros y mecánicos especialistas está capacitado para diagnosticar, desarmar y reparar los componentes más críticos de tu auto, respaldando cada trabajo con una garantía técnica total.",
    detailSectionLabel: "Nuestros servicios especializados",
    detailSectionTitle: "Incluyen:",
    includes: [
      "Motores: Reparación y ajuste completo (Overhaul).",
      "Transmisiones: Diagnóstico y reparación de cajas manuales y automáticas.",
      "Embragues: Revisión, ajuste y reemplazo.",
      "Suspensión y Dirección: Solución a fallas complejas y de alta exigencia.",
      "Garantía de Liderazgo: Llevamos años atendiendo los vehículos de la zona con los más altos estándares de calidad y seguridad.",
    ],
    idealFor:
      "Vehículos con fallas persistentes, ruidos, pérdida de potencia o problemas mecánicos de mayor complejidad.",
    note: "El valor final depende del diagnóstico y repuestos requeridos.",
  },
  {
    id: "neumaticos",
    badge: "Seguridad en ruta",
    title: "Venta de Neumáticos",
    subtitle: "Tu Seguridad en Manos Expertas.",
    image: "/site-photos/sucursal-exterior-autos.webp",
    detailIntro:
      "El único punto de contacto entre tu vehículo y el asfalto no puede quedar al azar. Como el centro automotriz líder de la zona, no solo vendemos neumáticos; te brindamos asesoría experta para que elijas la opción perfecta según tu estilo de conducción, el tipo de vehículo y las rutas que transitas todos los días.",
    detailSectionLabel: "Por qué elegirnos para renovar tus neumáticos",
    detailSectionTitle: "Incluye:",
    includes: [
      "Stock Multimarca Premium: Trabajamos con un amplio catálogo de las marcas más reconocidas a nivel mundial, garantizando disponibilidad inmediata.",
      "Máximo Rendimiento: Nuestros neumáticos aseguran un agarre óptimo en mojado, mayor durabilidad y distancias de frenado seguras para proteger a tu familia.",
      "Asesoría 100% Personalizada: Dime qué conduces y te diremos exactamente qué medida y compuesto necesitas para optimizar tu presupuesto y el confort de tu viaje.",
      "Servicio Integral: Instalación rápida y profesional en el mismo lugar para que vuelvas a la ruta sin perder tiempo.",
      "Garantía de Liderazgo: Llevamos años equipando los vehículos de la zona con los más altos estándares de calidad y seguridad.",
    ],
    idealFor:
      "Vehículos con neumáticos gastados, desgaste irregular o necesidad de mejorar seguridad en ruta.",
    note: "Disponibilidad y valores sujetos a stock.",
  },
];

function getService(slug: string) {
  return services.find((service) => service.id === slug);
}

function splitIncludeItem(item: string) {
  const separatorIndex = item.indexOf(":");

  if (separatorIndex === -1) {
    return {
      title: item,
      description: "",
    };
  }

  return {
    title: item.slice(0, separatorIndex),
    description: item.slice(separatorIndex + 1).trim(),
  };
}

function isProductPage(slug: string) {
  return slug === "baterias" || slug === "neumaticos";
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return {};
  }

  return {
    title: `${service.title} | Plaza Car Service`,
    description: service.detailIntro,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  const whatsappUrl = `${whatsappBase}?text=${encodeURIComponent(
    isProductPage(service.id)
      ? `Hola, quiero cotizar ${service.title} en Plaza Car Service`
      : `Hola, quiero recibir mas informacion sobre el servicio: ${service.title}`
  )}`;
  const serviceGallery =
    (serviceGalleries as Record<string, readonly string[]>)[service.id] ?? [];
  const gallery = serviceGallery.length ? serviceGallery : [service.image];

  if (isProductPage(service.id)) {
    return (
      <main className="min-h-screen bg-[#0c0c0d] text-white">
        <SiteHeader />
        <section className="relative overflow-hidden bg-black">
          <img
            src={service.image}
            alt={service.title}
            className="absolute inset-0 h-full w-full object-cover opacity-62"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/86 to-black/45" />
          <div className="relative mx-auto grid min-h-[610px] max-w-[1920px] gap-8 px-5 py-8 md:grid-cols-[1fr_0.78fr] md:px-10 md:py-12">
            <div className="flex flex-col justify-between">
              <Link
                href="/#servicios"
                className="w-fit rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-sm font-black text-white transition hover:bg-white hover:text-black"
              >
                Volver al inicio
              </Link>

              <div className="py-14">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-red-500">
                  Producto disponible
                </p>
                <h1 className="mt-4 max-w-4xl text-5xl font-black leading-[0.95] text-white md:text-7xl">
                  {service.title}
                </h1>
                <p className="mt-5 max-w-2xl text-2xl font-black leading-tight text-white md:text-4xl">
                  {service.subtitle}
                </p>
                <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/72 md:text-lg">
                  {service.detailIntro}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-lg bg-[#c83a42] px-7 py-4 text-sm font-black text-white transition hover:bg-[#a92f36] md:text-base"
                  >
                    Cotizar por WhatsApp
                  </a>
                  <a
                    href="#cotizar"
                    className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white px-7 py-4 text-sm font-black text-black transition hover:bg-red-600 hover:text-white md:text-base"
                  >
                    Ver beneficios
                  </a>
                </div>
              </div>
            </div>

            <aside className="flex items-end md:items-center md:justify-end">
              <div className="w-full max-w-md rounded-lg border border-white/15 bg-black/55 p-6 backdrop-blur">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-white/55">
                  Cotización rápida
                </p>
                <p className="mt-4 text-3xl font-black leading-tight">
                  Consulta disponibilidad y alternativas para tu vehículo
                </p>
                <p className="mt-5 text-sm leading-relaxed text-white/65">
                  Escríbenos con la marca, modelo y año de tu vehículo para orientarte.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section id="cotizar" className="px-5 py-14 md:px-10 md:py-20">
          <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[0.65fr_1.35fr]">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="text-sm font-black text-red-500">
                {service.detailSectionLabel ?? "Beneficios"}
              </p>
              <h2 className="mt-3 text-4xl font-black leading-tight md:text-5xl">
                {service.detailSectionTitle ?? "Cotiza hoy"}
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {service.includes.map((item) => {
                const include = splitIncludeItem(item);

                return (
                  <article
                    key={item}
                    className="rounded-lg border border-white/10 bg-[#15171b] p-5"
                  >
                    <span className="mb-5 block h-1.5 w-12 rounded-full bg-red-600" />
                    <h3 className="text-lg font-black leading-snug text-white">
                      {include.title}
                    </h3>
                    {include.description ? (
                      <p className="mt-3 text-sm font-semibold leading-relaxed text-white/66">
                        {include.description}
                      </p>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#111318] px-5 py-14 md:px-10 md:py-20">
          <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-black text-red-500">Cotiza tu compra</p>
              <h2 className="mt-3 max-w-4xl text-4xl font-black leading-tight md:text-5xl">
                Encuentra la alternativa correcta para tu vehículo
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/68 md:text-lg">
                {service.note}
              </p>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-lg bg-[#c83a42] px-7 py-4 text-sm font-black text-white transition hover:bg-[#a92f36] md:text-base"
            >
              Solicitar cotización
            </a>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0c0c0d] text-white">
      <SiteHeader />
      <section className="relative overflow-hidden bg-black">
        <img
          src={service.image}
          alt={service.title}
          className="absolute inset-0 h-full w-full object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/82 to-black/35" />
        <div className="relative mx-auto grid min-h-[560px] max-w-[1920px] gap-8 px-5 py-8 md:grid-cols-[1.05fr_0.95fr] md:px-10 md:py-12">
          <div className="flex flex-col justify-between">
            <Link
              href="/#servicios"
              className="w-fit rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-sm font-black text-white transition hover:bg-white hover:text-black"
            >
              Volver a servicios
            </Link>

            <div className="py-14">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-red-500">
                {service.badge}
              </p>
              <h1 className="mt-4 max-w-4xl text-5xl font-black leading-[0.95] text-white md:text-7xl">
                {service.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/76 md:text-xl">
                {service.detailIntro}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-[#c83a42] px-7 py-4 text-sm font-black text-white transition hover:bg-[#a92f36] md:text-base"
                >
                  Agendar por WhatsApp
                </a>
                <a
                  href="#detalle"
                  className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white px-7 py-4 text-sm font-black text-black transition hover:bg-red-600 hover:text-white md:text-base"
                >
                  Ver detalles
                </a>
              </div>
            </div>
          </div>

          <aside className="flex items-end md:items-center md:justify-end">
            <div className="w-full max-w-sm rounded-lg border border-white/15 bg-black/48 p-6 backdrop-blur">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-white/55">
                Atención personalizada
              </p>
              <p className="mt-4 text-3xl font-black leading-tight">
                Solicita orientación y cotización
              </p>
              <p className="mt-5 text-sm leading-relaxed text-white/65">
                Agenda una evaluacion y recibe orientacion segun el estado de tu vehiculo.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section id="detalle" className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-sm font-black text-red-500">
              {service.detailSectionLabel ?? "Ficha del servicio"}
            </p>
            <h2 className="mt-3 text-4xl font-black leading-tight md:text-5xl">
              {service.detailSectionTitle ?? "Qué incluye"}
            </h2>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {service.includes.map((item) => {
              const include = splitIncludeItem(item);

              return (
              <article
                key={item}
                className="grid gap-3 py-5 md:grid-cols-[0.38fr_0.62fr] md:gap-6 md:py-6"
              >
                <div className="flex items-start gap-4">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-red-600" />
                  <h3 className="text-base font-black leading-snug text-white md:text-lg">
                    {include.title}
                  </h3>
                </div>
                {include.description ? (
                  <p className="text-sm font-semibold leading-relaxed text-white/68 md:text-base">
                    {include.description}
                  </p>
                ) : null}
              </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#111318] px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-5 md:grid-cols-[0.75fr_1.25fr] md:items-end">
            <div>
              <p className="text-sm font-black text-red-500">Galeria</p>
              <h2 className="mt-3 text-4xl font-black leading-tight md:text-5xl">
                Fotos del servicio
              </h2>
            </div>
            <p className="text-base leading-relaxed text-white/65 md:text-lg">
              Dejamos este espacio preparado para sumar fotos reales de cada servicio y mostrar el proceso con mayor detalle.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {gallery.map((image, index) => (
              <figure
                key={`${image}-${index}`}
                className="overflow-hidden rounded-lg border border-white/10 bg-black"
              >
                <img
                  src={image}
                  alt={`${service.title} foto ${index + 1}`}
                  className="h-[260px] w-full object-cover opacity-90"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="aspect-video rounded-lg border border-white/10 bg-[#15171b] p-5">
            <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-white/20 bg-black/35 text-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-red-500">
                  Video promocional
                </p>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/62">
                  Aquí insertaremos el video de Instagram de este servicio.
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-black text-red-500">Agenda tu visita</p>
            <h2 className="mt-3 text-4xl font-black leading-tight md:text-5xl">
              Resuelve dudas antes de ir al taller
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/68 md:text-lg">
              {service.note}
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex rounded-lg bg-[#c83a42] px-7 py-4 text-sm font-black text-white transition hover:bg-[#a92f36] md:text-base"
            >
              Consultar este servicio
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}



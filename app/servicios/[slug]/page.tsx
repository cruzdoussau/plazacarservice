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
      "Para garantizar el rendimiento óptimo y la vida útil de tu motor, es fundamental realizar la mantención de tu vehículo cada 10.000 km o una vez al año, según indique el manual del fabricante.",
    includes: [
      "Cambio de aceite y filtro de aceite",
      "Cambio de filtro de polen y revisión de filtro de aire",
      "Revisión de frenos, tren delantero y neumáticos",
      "Escáner de diagnóstico",
      "Revisión de niveles, correas, filtros, bujías y luces",
      "Orientación personalizada sobre el estado general del vehículo",
    ],
    idealFor:
      "Vehículos que ya cumplieron kilometraje o tiempo recomendado para mantención y buscan prevenir fallas mayores a futuro.",
    note: "Llevamos años atendiendo los vehículos de la zona con altos estándares de calidad y seguridad.",
  },
  {
    id: "frenos",
    badge: "Seguridad preventiva",
    title: "Mantención de Frenos",
    subtitle: "Diagnóstico, cambio de componentes y mantención del sistema.",
    image: "/site-photos/mecanica-auto-elevado.webp",
    detailIntro:
      "El sistema de frenos es el componente de seguridad más importante de tu vehículo. Nuestro equipo técnico te asesora y trabaja con repuestos de primera calidad para lograr un frenado preciso, seguro y de respuesta inmediata.",
    includes: [
      "Diagnóstico e inspección general de pastillas, discos, mangueras y líquido",
      "Cambio de pastillas y balatas con repuestos certificados",
      "Rectificación o cambio de discos",
      "Renovación de líquido de frenos y purga del sistema",
      "Revisión del sistema ABS",
    ],
    idealFor:
      "Vehículos con ruidos al frenar, vibración en el pedal, mayor distancia de frenado o señales de desgaste en el sistema.",
    note: "Una revisión oportuna ayuda a detectar desgaste antes de que se convierta en un problema mayor.",
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
      "Asegura el encendido de tu motor al primer intento con baterías de alto rendimiento, diseñadas con tecnología de arranque en frío superior para resistir condiciones exigentes.",
    includes: [
      "Máxima potencia para vehículos de alta exigencia",
      "Larga vida útil que protege tu inversión",
      "Catálogo multimarca para encontrar el ajuste perfecto",
      "Revisión de compatibilidad",
      "Orientación sobre garantía",
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
      "No es solo apariencia, es protección. Removemos suciedad acumulada, salitre y contaminantes que dañan la pintura y el interior de tu vehículo a largo plazo.",
    includes: [
      "Lavado exterior premium",
      "Aspirado profundo de alfombras",
      "Acondicionamiento y limpieza de tapizados",
      "Desinfección total del habitáculo",
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
    includes: [
      "Alineación de precisión para corregir la dirección",
      "Balanceo computarizado para eliminar vibraciones",
      "Rotación estratégica para promover desgaste parejo",
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
    title: "Cambio de Aceite y Filtro",
    subtitle:
      "Lubricación adecuada para cuidar el rendimiento del motor.",
    image: "/site-photos/mecanica-auto-elevado.webp",
    detailIntro:
      "El motor es el corazón de tu vehículo y necesita la mejor lubricación para rendir al máximo. Un aceite de calidad reduce la fricción, regula la temperatura y previene averías prematuras.",
    includes: [
      "Cambio de aceite con la viscosidad recomendada por el fabricante",
      "Reemplazo del filtro de aceite",
      "Ajuste electrónico o reseteo del indicador de mantenimiento",
      "Revisión de niveles",
      "Orientación sobre aceite recomendado",
    ],
    idealFor:
      "Vehículos que ya cumplieron kilometraje o tiempo recomendado para cambio de aceite.",
    note: "Trabajamos con aceites sintéticos y semi-sintéticos homologados para distintas marcas del parque automotriz.",
  },
  {
    id: "scanner",
    badge: "Diagnóstico electrónico",
    title: "Scanner Automotriz",
    subtitle:
      "Diagnóstico computarizado avanzado para detectar fallas ocultas.",
    image: "/site-photos/scanner-alineacion-equipo.webp",
    detailIntro:
      "Utilizamos tecnología de diagnóstico para comunicarnos directamente con la computadora de tu vehículo y detectar anomalías electrónicas en tiempo real.",
    includes: [
      "Análisis de motor con lectura y borrado de códigos de falla",
      "Revisión de seguridad de frenos ABS, control de tracción y Airbags SRS",
      "Monitoreo de sensores en tiempo real",
      "Optimización general mediante ajustes y calibraciones",
      "Recomendación de próximos pasos",
    ],
    idealFor:
      "Vehículos con luces de advertencia encendidas, fallas intermitentes o pérdida de rendimiento.",
    note: "El scanner ayuda a orientar el diagnóstico, pero algunas fallas pueden requerir revisión mecánica adicional.",
  },
  {
    id: "pintura",
    badge: "Estética automotriz",
    title: "Pintura y Estética Automotriz",
    subtitle: "Soluciones de pintura para recuperar presentación y acabado.",
    image: "/site-photos/sucursal-fachada.webp",
    detailIntro:
      "¿Tu auto perdió su brillo o sufrió un percance? Nos encargamos de que vuelva a lucir impecable con trabajos de pintura, preparación y terminación profesional.",
    includes: [
      "Desabolladura express para detalles puntuales",
      "Pintura por piezas o general",
      "Pulido orbital profesional",
      "Preparación de zona a intervenir",
      "Revisión de terminación",
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
      "Cuando tu vehículo necesita una intervención profunda, nuestro equipo especialista diagnostica, desarma y repara componentes críticos con respaldo técnico.",
    includes: [
      "Reparación y ajuste completo de motores",
      "Diagnóstico y reparación de cajas manuales y automáticas",
      "Revisión, ajuste y reemplazo de embragues",
      "Solución de fallas complejas en suspensión y dirección",
      "Presupuesto según reparación",
    ],
    idealFor:
      "Vehículos con fallas persistentes, ruidos, pérdida de potencia o problemas mecánicos de mayor complejidad.",
    note: "El valor final depende del diagnóstico y repuestos requeridos.",
  },
  {
    id: "neumaticos",
    badge: "Seguridad en ruta",
    title: "Venta de Neumáticos",
    subtitle: "Asesoría experta para elegir neumáticos según tu vehículo y ruta.",
    image: "/site-photos/sucursal-exterior-autos.webp",
    detailIntro:
      "El único punto de contacto entre tu vehículo y el asfalto no puede quedar al azar. Te brindamos asesoría experta para elegir la opción adecuada según tu conducción, vehículo y rutas habituales.",
    includes: [
      "Stock multimarca premium",
      "Neumáticos con buen agarre en mojado y mayor durabilidad",
      "Asesoría personalizada por medida y estilo de conducción",
      "Instalación rápida y profesional",
      "Consulta por balanceo",
    ],
    idealFor:
      "Vehículos con neumáticos gastados, desgaste irregular o necesidad de mejorar seguridad en ruta.",
    note: "Disponibilidad y valores sujetos a stock.",
  },
  {
    id: "aire-acondicionado",
    badge: "Confort interior",
    title: "Aire Acondicionado",
    subtitle: "Revisión y servicio para mantener el climatizador funcionando bien.",
    image: "/site-photos/taller-interior-autos.webp",
    detailIntro:
      "Servicio para revisar el funcionamiento del aire acondicionado y orientar la solución adecuada según el estado del sistema.",
    includes: [
      "Revisión de funcionamiento",
      "Evaluación de rendimiento",
      "Orientación sobre posibles causas",
      "Presupuesto según diagnóstico",
      "Recomendación de próximos pasos",
    ],
    idealFor:
      "Vehículos con baja refrigeración, malos olores, ruidos o fallas en el sistema de climatización.",
    note: "Puede requerir diagnóstico adicional según la falla detectada.",
  },
];

function getService(slug: string) {
  return services.find((service) => service.id === slug);
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
    `Hola, quiero recibir mas informacion sobre el servicio: ${service.title}`
  )}`;
  const serviceGallery =
    (serviceGalleries as Record<string, readonly string[]>)[service.id] ?? [];
  const gallery = serviceGallery.length ? serviceGallery : [service.image];

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
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-black text-red-500">Ficha del servicio</p>
            <h2 className="mt-3 text-4xl font-black leading-tight md:text-5xl">
              Qué incluye
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/68 md:text-lg">
              {service.idealFor}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {service.includes.map((item) => (
              <div
                key={item}
                className="rounded-lg border border-white/10 bg-[#15171b] p-4 text-sm font-semibold leading-relaxed text-white/76"
              >
                <span className="mb-3 flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-xs font-black text-white">
                  OK
                </span>
                {item}
              </div>
            ))}
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



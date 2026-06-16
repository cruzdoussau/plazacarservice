import { notFound } from "next/navigation";

const whatsappBase = "https://wa.me/56971257621";

const services = [
  {
    id: "ahorro-plus",
    badge: "Servicio de Mantencion Preventiva",
    title: "Mantencion Ahorro Plus",
    subtitle: "Manten tu vehiculo segun pauta del fabricante.",
    price: "$109.000",
    image: "/Servicios/servicio-ahorro-plus.png",
    detailIntro:
      "Plan preventivo pensado para mantener tu vehiculo segun pauta del fabricante, cuidando el rendimiento y ayudando a prevenir fallas por falta de mantencion.",
    includes: [
      "4 litros de aceite 5W30",
      "Filtro de aceite",
      "Filtro de polen",
      "Relleno de niveles",
      "Lubricacion de puertas y bisagras",
      "Rotacion y balanceo de 4 neumaticos",
      "Revision de frenos, bateria, luces, filtros, plumillas, tren delantero y canerias",
    ],
    idealFor:
      "Vehiculos que requieren una mantencion completa y preventiva para seguir la pauta recomendada por el fabricante.",
    note: "Ademas acumulas puntos para canjear en productos de vitrina.",
  },
  {
    id: "frenos",
    badge: "Seguridad preventiva",
    title: "Mantencion de Frenos",
    subtitle: "Cuida tu seguridad y evita desgastes mayores.",
    price: "$59.900 + IVA",
    image: "/Servicios/servicio-frenos.png",
    detailIntro:
      "Servicio orientado a revisar el estado del sistema de frenado y detectar senales de desgaste antes de que se transformen en una falla mayor.",
    includes: [
      "Cambio de pastillas segun evaluacion",
      "Rectificacion de discos segun condicion",
      "Revision completa del sistema de frenado",
      "Diagnostico preventivo",
      "Orientacion sobre proximos pasos de mantencion",
    ],
    idealFor:
      "Vehiculos con ruidos al frenar, vibracion en el pedal, mayor distancia de frenado o sensacion esponjosa al frenar.",
    note: "Evita desgastes mayores, ruidos y fallas inesperadas.",
  },
  {
    id: "neumaticos",
    badge: "Estabilidad y rendimiento",
    title: "Mantencion de Neumaticos",
    subtitle: "Alineacion, balanceo y rotacion para mejor rendimiento.",
    price: "$29.000",
    image: "/Servicios/servicios-neumaticos.png",
    detailIntro:
      "Mantencion integral para mejorar la estabilidad, reducir vibraciones y prolongar la vida util de tus neumaticos.",
    includes: [
      "Alineacion de tren delantero",
      "Balanceo plomo de golpe",
      "Rotacion de neumaticos",
      "Revision visual de desgaste",
      "Orientacion sobre estado de neumaticos",
    ],
    idealFor:
      "Vehiculos con desgaste irregular, vibracion al conducir, menor agarre en curvas o conduccion inestable.",
    note: "Un buen estado de neumaticos es clave para tu seguridad.",
  },
  {
    id: "limpieza",
    badge: "Cuidado interior y exterior",
    title: "Lavado y Limpieza",
    subtitle: "Lavado exterior y limpieza interior disponibles de forma individual.",
    price: "$9.000 c/u",
    priceLines: ["Lavado exterior $9.000", "Limpieza interior $9.000"],
    image: "/Servicios/servicio-lavado-y-limpieza.png",
    detailIntro:
      "Servicio pensado para mantener tu vehiculo limpio, cuidado y con una mejor presentacion interior y exterior. Puedes tomar lavado exterior o limpieza interior de forma individual, segun lo que necesites.",
    includes: [
      "Lavado exterior",
      "Limpieza interior",
      "Atencion al detalle segun condicion del vehiculo",
      "Procedimientos adecuados para el cuidado del vehiculo",
    ],
    idealFor:
      "Vehiculos que necesitan una limpieza rapida, confiable y eficiente para uso diario, ya sea exterior, interior o ambas.",
    note: "Lavado exterior y limpieza interior se pueden solicitar por separado.",
  },
  {
    id: "alineacion-balanceo",
    badge: "Direccion y estabilidad",
    title: "Alineacion y Balanceo",
    subtitle:
      "Mejora la estabilidad, reduce vibraciones y evita el desgaste irregular de tus neumaticos.",
    price: "Consultar",
    image: "/Servicios/servicio-alineacion-y-balanceo.png",
    detailIntro:
      "Servicio enfocado en corregir la direccion y equilibrar las ruedas para mejorar la conduccion y prevenir desgaste prematuro.",
    includes: [
      "Revision de alineacion",
      "Correccion de tren delantero segun condicion",
      "Balanceo de ruedas",
      "Revision de vibraciones asociadas a neumaticos",
      "Orientacion sobre estado general del tren delantero",
    ],
    idealFor:
      "Vehiculos que se cargan hacia un lado, presentan vibracion al conducir o tienen desgaste irregular en neumaticos.",
    note: "Recomendado despues de golpes fuertes, cambio de neumaticos o mantenciones de tren delantero.",
  },
  {
    id: "cambio-aceite",
    badge: "Lubricacion del motor",
    title: "Cambio de Aceite",
    subtitle:
      "Protege el motor de tu vehiculo con un cambio de aceite oportuno y revision de filtros.",
    price: "Consultar",
    image: "/Servicios/servicio-cambio-aceite.png",
    detailIntro:
      "Servicio esencial para proteger el motor, mantener una lubricacion adecuada y evitar desgaste prematuro de componentes internos.",
    includes: [
      "Cambio de aceite segun requerimiento del vehiculo",
      "Revision de filtro de aceite",
      "Revision de niveles",
      "Orientacion sobre aceite recomendado",
      "Chequeo visual preventivo",
    ],
    idealFor:
      "Vehiculos que ya cumplieron kilometraje o tiempo recomendado para cambio de aceite.",
    note: "El valor puede variar segun tipo de aceite, cantidad requerida y filtro.",
  },
  {
    id: "scanner",
    badge: "Diagnostico electronico",
    title: "Scanner Automotriz",
    subtitle:
      "Detecta fallas y codigos de alerta mediante diagnostico electronico especializado.",
    price: "Consultar",
    image: "/Servicios/servicio-scanner.png",
    detailIntro:
      "Diagnostico electronico para identificar codigos de falla y orientar una reparacion mas precisa.",
    includes: [
      "Conexion de scanner automotriz",
      "Lectura de codigos de falla",
      "Orientacion sobre posibles causas",
      "Recomendacion de proximos pasos",
      "Apoyo para tomar decisiones de reparacion",
    ],
    idealFor:
      "Vehiculos con luces de advertencia encendidas, fallas intermitentes o perdida de rendimiento.",
    note: "El scanner ayuda a orientar el diagnostico, pero algunas fallas pueden requerir revision mecanica adicional.",
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
  const gallery = [service.image, service.image, service.image];

  return (
    <main className="min-h-screen bg-[#0c0c0d] text-white">
      <section className="relative overflow-hidden bg-black">
        <img
          src={service.image}
          alt={service.title}
          className="absolute inset-0 h-full w-full object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/82 to-black/35" />
        <div className="relative mx-auto grid min-h-[560px] max-w-[1920px] gap-8 px-5 py-8 md:grid-cols-[1.05fr_0.95fr] md:px-10 md:py-12">
          <div className="flex flex-col justify-between">
            <a
              href="/#servicios"
              className="w-fit rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-sm font-black text-white transition hover:bg-white hover:text-black"
            >
              Volver a servicios
            </a>

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
                Valor del servicio
              </p>
              {service.priceLines ? (
                <div className="mt-4 space-y-2">
                  {service.priceLines.map((line) => (
                    <p key={line} className="text-2xl font-black">
                      {line}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-5xl font-black">{service.price}</p>
              )}
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
              Que incluye
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
                  Aqui insertaremos el video de Instagram de este servicio.
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

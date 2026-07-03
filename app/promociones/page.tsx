const whatsappBase = "https://wa.me/56971257621";

const offers = [
  {
    id: "alineacion-balanceo-rotacion",
    label: "Oferta N\u00b01",
    title: "Alineaci\u00f3n + Balanceo + Rotaci\u00f3n",
    price: "$19.900",
    intro: "Precio promocional",
    benefitsTitle: "Beneficios",
    benefits: [
      "Mayor seguridad al conducir.",
      "Menor desgaste de neum\u00e1ticos.",
      "Mayor vida \u00fatil de los neum\u00e1ticos.",
      "Mejor estabilidad y confort de manejo.",
    ],
  },
  {
    id: "baterias-neumaticos",
    label: "Oferta N\u00b02",
    title: "Bater\u00edas y Neum\u00e1ticos",
    price: "Desde $33.500",
    intro: "Bater\u00edas desde $33.500",
    benefitsTitle: "Productos disponibles",
    benefits: [
      "Olimpo 55Ah.",
      "Black Tiger 55Ah.",
      "Neum\u00e1ticos desde $26.500.",
      "175/70R13 Goodride.",
      "165/70R14 81T Roadwing.",
      "165/70R14 81T RW-581 Risen.",
      "Hasta 6 cuotas sin inter\u00e9s.",
    ],
  },
  {
    id: "servicio-frenos",
    label: "Oferta N\u00b03",
    title: "Servicio de Frenos",
    price: "Desde $59.900",
    intro: "Servicio completo para cuidar tu seguridad",
    benefitsTitle: "Incluye",
    benefits: [
      "Cambio de pastillas delanteras.",
      "Rectificaci\u00f3n de discos.",
      "Limpieza del sistema.",
      "Regulaci\u00f3n de frenos traseros.",
    ],
  },
];

export const metadata = {
  title: "Promociones de Julio | Plaza Car Service",
  description:
    "Conoce las promociones de julio de Plaza Car Service: alineacion, balanceo, rotacion, baterias, neumaticos y frenos.",
};

export default function PromotionsPage() {
  const whatsappUrl = `${whatsappBase}?text=${encodeURIComponent(
    "Hola, quiero consultar por las promociones de julio de Plaza Car Service."
  )}`;

  return (
    <main className="min-h-screen bg-[#0c0c0d] text-white">
      <section className="px-5 py-10 md:px-10 md:py-16">
        <div className="mx-auto max-w-[1400px]">
          <a
            href="/#servicios"
            className="inline-flex rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-sm font-black text-white transition hover:bg-white hover:text-black"
          >
            Volver al sitio
          </a>

          <div className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-red-500">
                Promociones de julio
              </p>
              <h1 className="mt-4 text-5xl font-black leading-[0.98] md:text-7xl">
                En este invierno congelamos los precios
              </h1>
            </div>
            <p className="max-w-3xl text-lg leading-relaxed text-white/70 md:text-xl">
              Seguimos con valores especiales para que mantengas tu vehiculo
              seguro, estable y listo para el invierno.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {offers.map((offer) => (
              <article
                key={offer.id}
                className="rounded-lg border border-white/10 bg-[#15171b] p-6 shadow-xl"
              >
                <p className="text-sm font-black uppercase tracking-[0.18em] text-red-500">
                  {offer.label}
                </p>
                <h2 className="mt-4 min-h-[88px] text-3xl font-black leading-tight">
                  {offer.title}
                </h2>
                <div className="mt-6 rounded-lg border border-red-500/25 bg-red-600/12 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-white/55">
                    {offer.intro}
                  </p>
                  <p className="mt-2 text-4xl font-black text-white">
                    {offer.price}
                  </p>
                </div>
                <p className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-white/45">
                  {offer.benefitsTitle}
                </p>
                <div className="mt-3 grid gap-3">
                  {offer.benefits.map((benefit) => (
                    <div
                      key={benefit}
                      className="rounded-lg bg-black/25 p-3 text-sm font-semibold leading-relaxed text-white/72"
                    >
                      {benefit}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-lg border border-white/10 bg-[#111318] p-6 md:flex md:items-center md:justify-between">
            <div>
              <p className="text-sm font-black text-red-500">
                Agenda tu atenci\u00f3n
              </p>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-white/68">
                Consulta disponibilidad, formas de pago y sucursal mas cercana
                por WhatsApp.
              </p>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex rounded-lg bg-[#c83a42] px-7 py-4 text-sm font-black text-white transition hover:bg-[#a92f36] md:mt-0"
            >
              Consultar promociones
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

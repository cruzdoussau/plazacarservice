import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";

const whatsappBase = "https://wa.me/56971257621";

export const metadata: Metadata = {
  title: "Nosotros | Plaza Car Service",
  description:
    "Conoce la misión, visión y sucursales de Plaza Car Service, red integral de servicios automotriz multimarca del Litoral Central.",
};

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

function getBranchWhatsAppUrl(branchName: string) {
  const message = `Hola, tengo una consulta para la sucursal ${branchName}. Mi vehículo necesita una atención y me gustaría recibir orientación sobre el servicio más adecuado.`;
  return `${whatsappBase}?text=${encodeURIComponent(message)}`;
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

export default function NosotrosPage() {
  return (
    <main className="min-h-screen bg-[#0c0c0d] text-white">
      <SiteHeader />

      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase text-red-500">
              Nosotros
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
              Somos Plaza Car Service
            </h1>
          </div>
          <p className="text-base leading-relaxed text-white/72 md:text-xl">
            Somos la red integral de servicios automotriz multimarca del Litoral
            Central. Estamos más cerca de ti y de tu vehículo, con una atención
            profesional, transparente y pensada para simplificar cada etapa del
            mantenimiento.
          </p>
        </div>
      </section>

      <section className="bg-[#f4f5f7] px-5 py-14 text-[#111318] md:px-10 md:py-20">
        <div className="mx-auto grid max-w-[1320px] gap-5 md:grid-cols-2">
          <article className="rounded-lg border border-[#d7dbe2] bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase text-red-600">Misión</p>
            <h2 className="mt-3 text-3xl font-black leading-tight">
              Entregar confianza en cada atención
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#5c6470]">
              Brindar soluciones automotrices integrales, claras y oportunas,
              combinando experiencia técnica, cercanía y un servicio multimarca
              que ayude a prolongar el cuidado de cada vehículo.
            </p>
          </article>

          <article className="rounded-lg border border-[#d7dbe2] bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase text-red-600">Visión</p>
            <h2 className="mt-3 text-3xl font-black leading-tight">
              Ser la red referente del Litoral Central
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#5c6470]">
              Consolidarnos como la red automotriz multimarca más cercana y
              confiable del Litoral Central, creciendo con sucursales modernas,
              procesos simples y una experiencia de atención transparente.
            </p>
          </article>
        </div>
      </section>

      <section id="sucursales" className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1320px]">
          <p className="text-sm font-black uppercase text-red-500">
            Sucursales
          </p>
          <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">
            Nuestras sucursales
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/68 md:text-lg">
            Encuentra la sucursal más cercana y agenda la atención que tu
            vehículo necesita.
          </p>

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
                      <PinIcon className="h-4 w-4" />
                      {branch.comingSoon ? "Próximamente" : "Ver local"}
                    </a>

                    <a
                      href={getBranchWhatsAppUrl(branch.name)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#c83a42] px-5 py-3 text-sm font-black text-white transition hover:bg-[#c83a42]"
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
    </main>
  );
}

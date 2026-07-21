import SiteHeader from "../components/SiteHeader";
import AhorroPlusLookup from "./AhorroPlusLookup";
import AhorroPlusHeroSlider from "./AhorroPlusHeroSlider";

export const metadata = {
  title: "Programa Ahorro Plus | Plaza Car Service",
  description:
    "Conoce el programa Ahorro Plus y accede a beneficios exclusivos como cliente preferente de Plaza Car Service.",
};

const programBenefits = [
  {
    value: "3",
    title: "Lavados sin costo",
    text: "Tres lavados al año para mantener tu vehículo limpio y cuidado.",
  },
  {
    value: "1",
    title: "Pre-revisión técnica",
    text: "Una pre-revisión técnica anual sin costo para preparar tu vehículo.",
  },
  {
    value: "1",
    title: "Revisión de frenos",
    text: "Una revisión anual del sistema de frenado para cuidar tu seguridad.",
  },
];

const reasons = [
  "Retiramos tu vehículo o te acercamos a tu hogar y/o lugar de trabajo.",
  "Mantención según pauta del fabricante para cuidar desempeño y vida útil.",
  "Mayor calidad, confianza y precios convenientes en cada servicio.",
  "Acumulas Ahorro Pesos por cada mantención y/o servicio que realices.",
];

export default function AhorroPlusPage() {
  const whatsappUrl = `https://wa.me/56971257621?text=${encodeURIComponent(
    "Hola, quiero unirme al Programa Ahorro Plus de Plaza Car Service."
  )}`;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0c0c0d] text-white">
      <SiteHeader />

      <section className="overflow-x-hidden bg-black px-4 py-4 md:px-6 lg:px-8 lg:py-5">
        <div className="mx-auto grid max-w-[1760px] gap-5 lg:grid-cols-[1.38fr_0.62fr] lg:items-start">
          <div className="rounded-lg border border-white/10 bg-[#111318] p-4 shadow-2xl md:p-5 lg:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-red-500">
                Cliente preferente
              </p>
              <span className="rounded-full bg-red-600/15 px-4 py-2 text-[11px] font-black uppercase text-red-500">
                Programa automotriz
              </span>
            </div>

            <h1 className="mt-4 max-w-5xl text-4xl font-black leading-[0.96] text-white md:text-5xl">
              Conoce nuestro programa Ahorro Plus
            </h1>
            <p className="mt-4 max-w-4xl text-sm font-semibold leading-relaxed text-white/70">
              Hazte cliente preferente y accede a nuestros grandes beneficios
              para mantener tu vehículo cuidado, seguro y al día.
            </p>

            <div className="mt-5">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-red-500">
                Qué incluye nuestro programa
              </p>
              <h2 className="mt-2 text-2xl font-black leading-tight text-white">
                Incluye:
              </h2>

              <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {programBenefits.map((benefit) => (
                  <article
                    key={benefit.title}
                    className="rounded-md border border-white/10 bg-black/24 p-3"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl font-black leading-none text-red-500">
                        {benefit.value}
                      </span>
                      <div>
                        <h3 className="text-sm font-black leading-snug text-white">
                          {benefit.title}
                        </h3>
                        <p className="mt-2 text-xs font-semibold leading-relaxed text-white/68">
                          {benefit.text}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-5 grid gap-3 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-md border border-red-500/25 bg-red-600/10 p-4">
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-red-500">
                  Acumula Ahorro pesos
                </p>
                <p className="mt-2 text-xs font-semibold leading-relaxed text-white/72">
                  Al realizar mantenciones anuales o por kilometraje, sumas{" "}
                  <strong className="text-white">$15.000</strong> a tu cuenta de
                  cliente preferencial para usar en productos y/o servicios.
                </p>
              </div>

              <div className="rounded-md border border-white/10 bg-black/24 p-4">
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-red-500">
                  Por qué contratarlo
                </p>
                <div className="mt-3 grid gap-2">
                  {reasons.map((reason) => (
                    <div key={reason} className="flex gap-2">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-600" />
                      <p className="text-xs font-semibold leading-relaxed text-white/68">
                        {reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl text-xs font-bold leading-relaxed text-white/55">
                Únete a nuestro programa y garantiza el cuidado que tu vehículo
                necesita.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center justify-center rounded-md bg-red-600 px-6 py-3 text-xs font-black uppercase text-white transition hover:bg-[#a92f36]"
              >
                Cotizar Ahorro Plus
              </a>
            </div>
          </div>

          <AhorroPlusHeroSlider />
        </div>
      </section>

      <AhorroPlusLookup />
    </main>
  );
}

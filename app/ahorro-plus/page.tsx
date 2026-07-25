import SiteHeader from "../components/SiteHeader";
import AhorroPlusLookup from "./AhorroPlusLookup";
import AhorroPlusHeroSlider from "./AhorroPlusHeroSlider";
import AhorroPlusRegisterForm from "./AhorroPlusRegisterForm";

export const metadata = {
  title: "Programa Ahorro Plus | Plaza Car Service",
  description:
    "Conoce el programa Ahorro Plus y accede a beneficios exclusivos como cliente preferente de Plaza Car Service.",
};

const programBenefits = [
  {
    value: "3",
    title: "Lavados sin costo",
    lead: "Lavados exterior",
    highlight: "sin costo",
    text: "para mantener tu vehículo limpio y cuidado.",
  },
  {
    value: "1",
    title: "Pre-revisión técnica",
    lead: "Pre-revisión técnica Anual",
    highlight: "sin costo",
    text: "para preparar tu vehículo.",
  },
  {
    value: "1",
    title: "Revisión de frenos",
    lead: "Revisión de frenos",
    highlight: "anual",
    text: "del sistema de frenado para cuidar tu seguridad.",
  },
];

const reasons = [
  "Realizamos la mantención según pauta del fabricante, asegurando que tu vehículo reciba las mantenciones indicadas para cuidar su desempeño y vida útil.",
  "Retiramos y/o entregamos tu vehículo para servicios agendados, desde tu hogar, lugar de trabajo y/o actividades.",
  "Ofrecemos servicio de acercamiento a tu hogar o lugar de trabajo.",
  "Te ofrecemos los mejores precios de la zona.",
];

export default function AhorroPlusPage() {
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
              Hazte cliente preferente, únete y accede a nuestros grandes
              beneficios para mantener tu vehículo cuidado, seguro y al día.
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
                          {benefit.lead}
                        </h3>
                        <p className="mt-2 text-xs font-black leading-relaxed text-white">
                          <span>{benefit.highlight}</span>{" "}
                          <span className="text-white/80">{benefit.text}</span>
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <div className="rounded-md border border-red-500/25 bg-red-600/10 p-4 md:p-5">
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-red-500">
                  Acumula Ahorro pesos
                </p>
                <p className="mt-2 max-w-4xl text-sm font-semibold leading-relaxed text-white/78">
                  Al realizar tu mantención por kilometraje, acumula{" "}
                  <strong className="text-white">$15.000 Ahorro Pesos</strong>,
                  los que podrás utilizar en el pago de futuros servicios o
                  compra de productos.
                </p>
                <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-white">
                  Disfruta de nuestros beneficios:
                </p>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {reasons.map((reason) => (
                    <div
                      key={reason}
                      className="flex gap-2 rounded-md border border-white/10 bg-black/24 p-3"
                    >
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-500" />
                      <p className="text-xs font-semibold leading-relaxed text-white/72">
                        {reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-4 border-t border-white/10 pt-5 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
              <p className="max-w-xl text-xs font-bold leading-relaxed text-white/55">
                Únete a nuestro programa y garantiza el cuidado que tu vehículo
                necesita.
              </p>
              <AhorroPlusRegisterForm />
            </div>
          </div>

          <AhorroPlusHeroSlider />
        </div>
      </section>

      <AhorroPlusLookup />
    </main>
  );
}

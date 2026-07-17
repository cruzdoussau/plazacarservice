import SiteHeader from "../components/SiteHeader";

export const metadata = {
  title: "Programa Ahorro Plus | Plaza Car Service",
  description:
    "Conoce el programa de mantencion Ahorro Plus y registrate como cliente preferente de Plaza Car Service.",
};

const benefits = [
  {
    value: "3",
    title: "Lavados sin costo",
    text: "Tres lavados al ano para mantener tu vehiculo limpio y cuidado.",
  },
  {
    value: "1",
    title: "Pre-revision tecnica",
    text: "Una pre-revision tecnica anual sin costo para preparar tu vehiculo.",
  },
  {
    value: "1",
    title: "Revision de frenos",
    text: "Una revision anual del sistema de frenado para cuidar tu seguridad.",
  },
  {
    value: "$15.000",
    title: "Pesos ahorro",
    text: "Credito disponible para utilizar en productos y servicios de Plaza Car Service.",
  },
];

const highlights = [
  "Mantencion segun pauta del fabricante.",
  "Beneficios anuales exclusivos para clientes preferentes.",
  "Control de beneficios disponibles desde el portal.",
  "Atencion en sucursales de Plaza Car Service del Litoral Central.",
];

export default function AhorroPlusPage() {
  const whatsappUrl = `https://wa.me/56971257621?text=${encodeURIComponent(
    "Hola, quiero registrarme como cliente preferente del Programa Ahorro Plus."
  )}`;

  return (
    <main className="min-h-screen bg-[#0c0c0d] text-white">
      <SiteHeader />

      <section className="mx-auto grid max-w-[1500px] gap-8 px-5 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-10">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-red-500">
            Cliente preferente
          </p>
          <h1 className="mt-4 text-5xl font-black leading-[0.96] md:text-7xl">
            Mantencion Ahorro Plus
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            Un programa pensado para quienes quieren mantener su vehiculo al dia,
            sumar beneficios y acceder a controles clave durante el ano.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-red-600 px-6 py-4 text-sm font-black text-white transition hover:bg-[#c83a42]"
            >
              Solicitar registro
            </a>
            <a
              href="/intranet-ahorro-plus"
              className="rounded-lg bg-white px-6 py-4 text-sm font-black text-black transition hover:bg-red-600 hover:text-white"
            >
              Revisar mi perfil
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-white/10 bg-[#15171b]">
          <img
            src="/ahorro-plus/mantencion-ahorro-plus.png"
            alt="Programa Mantencion Ahorro Plus"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#111318] px-5 py-8 lg:px-10">
        <div className="mx-auto grid max-w-[1500px] gap-4 md:grid-cols-4">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="rounded-lg border border-white/10 bg-black/25 p-5"
            >
              <p className="text-4xl font-black text-red-500">{benefit.value}</p>
              <h2 className="mt-3 text-xl font-black">{benefit.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/62">
                {benefit.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1500px] gap-8 px-5 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10">
        <div className="overflow-hidden rounded-lg border border-white/10 bg-[#15171b]">
          <img
            src="/ahorro-plus/cliente-preferente.png"
            alt="Cliente preferente Plaza Car Service"
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-red-500">
            Como funciona
          </p>
          <h2 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
            Beneficios visibles y controlados desde tu perfil
          </h2>
          <div className="mt-6 grid gap-3">
            {highlights.map((item) => (
              <div
                key={item}
                className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm font-bold text-white/72"
              >
                {item}
              </div>
            ))}
          </div>
          <div className="mt-7 rounded-lg border border-red-500/25 bg-red-600/10 p-5">
            <p className="text-sm leading-relaxed text-white/75">
              Cada vez que el administrador registra un canje, el perfil del
              cliente muestra el saldo actualizado de lavados, pre-revision,
              revision de frenos y pesos ahorro.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

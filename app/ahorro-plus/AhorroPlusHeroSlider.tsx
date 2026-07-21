"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    src: "/ahorro-plus/ahorro-plus-lavado.webp",
    alt: "Lavado incluido en Programa Ahorro Plus",
  },
  {
    src: "/ahorro-plus/ahorro-plus-pre-revision.webp",
    alt: "Pre-revisión técnica incluida en Programa Ahorro Plus",
  },
  {
    src: "/ahorro-plus/ahorro-plus-frenos.webp",
    alt: "Revisión de frenos incluida en Programa Ahorro Plus",
  },
  {
    src: "/ahorro-plus/ahorro-plus-retiro-domicilio.webp",
    alt: "Retiro de vehículo a domicilio para Programa Ahorro Plus",
  },
  {
    src: "/ahorro-plus/ahorro-plus-pesos-ahorro.webp",
    alt: "Pesos ahorro disponibles para productos y servicios",
  },
];

export default function AhorroPlusHeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) =>
        current === slides.length - 1 ? 0 : current + 1
      );
    }, 4200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-lg border border-white/15 bg-black shadow-2xl lg:sticky lg:top-32">
      <div className="relative aspect-[4/5] min-h-[360px] md:aspect-[16/10] lg:h-[calc(100svh-230px)] lg:min-h-[520px] lg:max-h-[720px]">
        {slides.map((slide, index) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              index === activeSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
      </div>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Ver imagen ${index + 1}`}
            onClick={() => setActiveSlide(index)}
            className={`h-2.5 w-2.5 rounded-full transition ${
              index === activeSlide ? "bg-red-600" : "bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

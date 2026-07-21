"use client";

import React, { useEffect, useState } from "react";

type ServiceGallerySliderProps = {
  images: readonly string[];
  title: string;
};

export default function ServiceGallerySlider({
  images,
  title,
}: ServiceGallerySliderProps) {
  const [activeImage, setActiveImage] = useState(0);
  const hasMultipleImages = images.length > 1;
  const image = images[activeImage] ?? images[0];

  useEffect(() => {
    if (!hasMultipleImages) return;

    const timer = window.setInterval(() => {
      setActiveImage((current) =>
        current === images.length - 1 ? 0 : current + 1
      );
    }, 4200);

    return () => window.clearInterval(timer);
  }, [hasMultipleImages, images.length]);

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-white/12 bg-black shadow-2xl md:aspect-[3/4] lg:sticky lg:top-32 lg:mx-auto lg:h-[calc(100svh-220px)] lg:min-h-[520px] lg:w-full lg:max-w-[520px]">
      <img
        src={image}
        alt={`${title} foto ${activeImage + 1}`}
        className="h-full w-full object-cover transition duration-500"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

      {hasMultipleImages && (
        <>
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2.5">
            {images.map((item, index) => (
              <button
                key={item}
                type="button"
                onClick={() => setActiveImage(index)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  activeImage === index
                    ? "bg-red-600"
                    : "bg-white/80 hover:bg-white"
                }`}
                aria-label={`Ver foto ${index + 1}`}
              />
            ))}
          </div>

          <div className="absolute bottom-5 right-5 rounded-full bg-black/70 px-3 py-1 text-xs font-black text-white/80">
            {activeImage + 1}/{images.length}
          </div>
        </>
      )}
    </div>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://plazacarservice.cl"),
  title: "Plaza Car Service | Red integral de servicios automotriz",
  description:
    "Plaza Car Service es tu red integral de servicios automotriz en el Litoral Central. Atención en Algarrobo y El Tabo, y próximamente en El Quisco y San Antonio.",
  keywords: [
    "Plaza Car Service",
    "servicios automotrices",
    "mantención automotriz",
    "alineación y balanceo",
    "cambio de aceite",
    "scanner automotriz",
    "lavado de vehículos",
    "Algarrobo",
    "El Tabo",
    "El Quisco",
    "San Antonio",
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Plaza Car Service | Red integral de servicios automotriz",
    description:
      "Atención automotriz en Algarrobo y El Tabo, y próximamente en El Quisco y San Antonio.",
    url: "https://plazacarservice.cl",
    siteName: "Plaza Car Service",
    images: [
      {
        url: "/og-plaza-car-service.png",
        width: 1200,
        height: 630,
        alt: "Plaza Car Service",
      },
    ],
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plaza Car Service | Red integral de servicios automotriz",
    description:
      "Atención automotriz en Algarrobo y El Tabo, y próximamente en El Quisco y San Antonio.",
    images: ["/og-plaza-car-service.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
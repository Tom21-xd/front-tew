import type { Metadata } from "next";
import "./globals.css";
import "@fontsource/rajdhani";
import Header from "@/components/Header";
import '../lib/Leaflet-MiniMap-3.6.1/src/Control.MiniMap.css';
import '../lib/leaflet.fullscreen/Control.FullScreen.css';
import '../lib/Leaflet.markercluster-1.4.1/dist/MarkerCluster.css';
import '../lib/Leaflet.markercluster-1.4.1/dist/MarkerCluster.Default.css';

export const metadata: Metadata = {
  title: "TEW - Los Ojos del Mundo" ,
  description: "Apicacion web mapping para la visualizacion de datos geoespaciales enfocado en los aeropuestos del mundo", 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="font-rajdhani">
      <body className="antialiased flex flex-col h-screen overflow-hidden">
         <Header></Header>
         <div className="flex-1 overflow-hidden">{children}</div>
      </body>
    </html>
  );
}

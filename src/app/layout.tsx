import type { Metadata } from "next";
import "./globals.css";
import "@fontsource/rajdhani";
import Header from "@/components/Header";


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

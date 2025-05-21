"use client";

import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import Script from "next/script";
import dynamic from "next/dynamic";

const MapNoSSR = dynamic(() => import('@/components/Map'), { ssr: false });


export default function Home() {
  
  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.css"
      />

      <Script
        src="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.js"
        strategy="afterInteractive"
        onLoad={() => {
        }}
      />
      <main className="relative flex items-center justify-center h-full w-full bg-black overflow-hidden">
        <InteractiveGridPattern
          className={cn(
            "absolute inset-0 w-full h-full",
            "skew-y-6 opacity-40"
          )}
          width={60}
          height={60}
          squares={[30, 30]}
          squaresClassName="hover:fill-blue-500"
        />
        <div className="relative z-10 w-full max-w-4xl h-full flex items-center justify-center">
          <MapNoSSR className="w-full h-[90%] max-h-full" />
        </div>
      </main>

    </>
  );
}

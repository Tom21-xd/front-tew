"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";

declare global {
  interface Window {
    L: any; // Leaflet global con plugin
  }
}

export default function MiniMapControl() {
  const map = useMap();

  useEffect(() => {
    if (!window.L.Control.MiniMap) {
      console.error("Leaflet MiniMap plugin no está cargado");
      return;
    }

    // Capa base para el minimapa (puedes usar la misma que el mapa principal)
    const baseLayer = new window.L.TileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      { attribution: "&copy; OpenStreetMap contributors" }
    );

    // Crear control MiniMap
    const miniMap = new window.L.Control.MiniMap(baseLayer, {
      toggleDisplay: true,  // Botón para mostrar/ocultar minimapa
      minimized: false,     // Empieza visible
      position: "bottomright",
    });

    miniMap.addTo(map);

    // Limpieza al desmontar componente
    return () => {
      miniMap.remove();
    };
  }, [map]);

  return null;
}

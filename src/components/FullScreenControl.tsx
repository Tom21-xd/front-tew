"use client";

import { useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";

let fullscreenControlInstance: L.Control | null = null;

const FullscreenControl = () => {
  const map = useMap();

  useEffect(() => {
    // @ts-ignore
    fullscreenControlInstance = L.control.fullscreen({
      position: "topleft",
    }).addTo(map);

  }, [map]);

  return null;
};

export default FullscreenControl;

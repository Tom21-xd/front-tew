"use client";

import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { getAirports } from "@/services/airports_tew";
import AirportPopup from "./AirportPopUp";
import L from "leaflet";
import '../lib/Leaflet-MiniMap-3.6.1/src/Control.MiniMap.js';
import MiniMapControl from "./MiniMapControl";


const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

const customIcon = new L.Icon({
  iconUrl: "/img/aeropuerto.png", // asegúrate que está en /public/img/
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

interface MapProps {
  className?: string;
}

const Map = ({ className }: MapProps) => {
  const [geoJsonData, setGeoJsonData] = useState<any>(null);

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const data = await getAirports();
        if (data.type === "FeatureCollection") {
          setGeoJsonData(data);
        } else if (data.features) {
          setGeoJsonData({ type: "FeatureCollection", features: data.features });
        } else if (data.value) {
          setGeoJsonData(data.value);
        } else {
          setGeoJsonData(data);
        }
      } catch (error) {
        console.error("Error al cargar aeropuertos:", error);
      }
    };
    fetchAirports();
  }, []);

  return (
    <MapContainer
      center={[1.7572, -75.5906]}
      zoom={6}
      scrollWheelZoom={true}
      className={cn("w-full h-[800px] rounded-lg shadow-md", className)}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geoJsonData?.features?.map((feature: any) => {
        if (!feature.geometry || feature.geometry.type !== "Point") return null;
        const [lng, lat] = feature.geometry.coordinates;
        return (
          <Marker key={feature.id || feature.properties.id} position={[lat, lng]} icon={customIcon}>
            <Popup>
              <AirportPopup properties={feature.properties} />
            </Popup>
          </Marker>
        );
      })}
      <MiniMapControl />

    </MapContainer>
  );
};

export default Map;

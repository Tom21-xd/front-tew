"use client";

import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { useEffect, useState, useRef } from "react";
import { getAirports } from "@/services/airports_tew";
import L from "leaflet";
import ReactDOM from "react-dom/client";

import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

import '../lib/Leaflet-MiniMap-3.6.1/src/Control.MiniMap.js';
import '../lib/leaflet.fullscreen/Control.FullScreen.js';
import '../lib/Leaflet.markercluster-1.4.1/dist/leaflet.markercluster.js';
import '../lib/Leaflet.markercluster-1.4.1/dist/MarkerCluster.css';
import '../lib/Leaflet.markercluster-1.4.1/dist/MarkerCluster.Default.css';
import '../lib/leaflet-search-master/dist/leaflet-search.src.css';
import '../lib/leaflet-search-master/dist/leaflet-search.src.js';

import FullscreenControl from "./FullScreenControl";
import MiniMapControl from "./MiniMapControl";

import {
  useMap,
  ScaleControl,
  MapContainer as LeafletMapContainer,
} from "react-leaflet";

const customIcon = new L.Icon({
  iconUrl: "/img/aeropuerto.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const userIcon = new L.Icon({
  iconUrl: "/img/ubicacion.png",
  iconSize: [25, 25],
  iconAnchor: [12, 12],
});

interface MapProps {
  className?: string;
}

function MapListener({ onMapReady }: { onMapReady: (map: L.Map) => void }) {
  const map = useMap();
  useEffect(() => {
    onMapReady(map);
  }, [map, onMapReady]);
  return null;
}

const Map = ({ className }: MapProps) => {
  const [countryGeoJson, setCountryGeoJson] = useState<any>(null);
  const [geoJsonData, setGeoJsonData] = useState<any>(null);
  const [userPosition, setUserPosition] = useState<L.LatLngExpression | null>(null);
  const [showClusters, setShowClusters] = useState(true);
  const [hidrografiaGeoJson, setHidrografiaGeoJson] = useState<any>(null);

  const mapRef = useRef<L.Map | null>(null);
  //@ts-ignore
  const markerClusterGroupRef = useRef<L.MarkerClusterGroup | null>(null);
  const routingControlRef = useRef<L.Control | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  const requestUserLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocalización no soportada por este navegador");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: L.LatLngExpression = [pos.coords.latitude, pos.coords.longitude];
        setUserPosition(coords);

        if (mapRef.current) {
          mapRef.current.setView(coords, 13, { animate: true });
          if (userMarkerRef.current) {
            userMarkerRef.current.setLatLng(coords);
          } else {
            userMarkerRef.current = L.marker(coords, { icon: userIcon }).addTo(mapRef.current);
            userMarkerRef.current.bindPopup("Tu ubicación actual").openPopup();
          }
        }
      },
      (error) => {
        alert("No se pudo obtener la ubicación: " + error.message);
      },
      { enableHighAccuracy: true }
    );
  };

  const traceRouteTo = (destLatLng: L.LatLngExpression) => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    if (!userPosition) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords: L.LatLngExpression = [pos.coords.latitude, pos.coords.longitude];
          setUserPosition(coords);
          addUserMarker(coords);

          createRoutingControl(coords, destLatLng);
        },
        (error) => {
          alert("No se pudo obtener la ubicación: " + error.message);
        },
        { enableHighAccuracy: true }
      );
    } else {
      createRoutingControl(userPosition, destLatLng);
    }
  };

  const addUserMarker = (coords: L.LatLngExpression) => {
    if (!mapRef.current) return;
    if (userMarkerRef.current) {
      userMarkerRef.current.setLatLng(coords);
    } else {
      userMarkerRef.current = L.marker(coords, { icon: userIcon }).addTo(mapRef.current!);
      userMarkerRef.current.bindPopup("Tu ubicación actual");
    }
  };

  const createRoutingControl = (start: L.LatLngExpression, end: L.LatLngExpression) => {
    if (!mapRef.current) return;
    if (routingControlRef.current) {
      mapRef.current.removeControl(routingControlRef.current);
      routingControlRef.current = null;
    }
    //@ts-ignore
    routingControlRef.current = L.Routing.control({
      //@ts-ignore
      waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
      lineOptions: { styles: [{ color: "#6FA1EC", weight: 4 }] },
      //@ts-ignore
      createMarker: (i, wp) =>
        L.marker(wp.latLng, {
          draggable: false,
          icon: i === 0 ? userIcon : customIcon,
        }),
      routeWhileDragging: false,
      addWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
    }).addTo(mapRef.current);
  };

  const createMarkers = () => {
    const markers: L.Marker[] = [];
    if (geoJsonData?.features) {
      for (const feature of geoJsonData.features) {
        if (!feature.geometry || feature.geometry.type !== "Point") continue;
        const [lng, lat] = feature.geometry.coordinates;

        const marker = L.marker([lat, lng], { icon: customIcon, title: feature.properties.name });

        const popupContainer = document.createElement("div");

        //@ts-ignore
        const root = ReactDOM.createRoot(popupContainer);

        root.render(
          <div style={{ maxWidth: "300px" }}>
            <h3 style={{ fontWeight: "bold", marginBottom: "4px" }}>
              {feature.properties.name || "Aeropuerto"}
            </h3>
            {feature.properties.iata_code && (
              <p>
                <strong>IATA:</strong> {feature.properties.iata_code}
              </p>
            )}
            {feature.properties.gps_code && (
              <p>
                <strong>GPS:</strong> {feature.properties.gps_code}
              </p>
            )}
            {feature.properties.location && (
              <p>
                <strong>Ubicación:</strong> {feature.properties.location}
              </p>
            )}
            {feature.properties.wikipedia && (
              <p>
                <a
                  href={feature.properties.wikipedia}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#007bff" }}
                >
                  Más info en Wikipedia
                </a>
              </p>
            )}

            <button
              style={{
                marginTop: 8,
                padding: "6px 10px",
                width: "100%",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
              }}
              onClick={() => traceRouteTo([lat, lng])}
            >
              Traza la ruta aquí
            </button>
          </div>
        );

        marker.bindPopup(popupContainer);

        markers.push(marker);
      }
    }
    return markers;
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dataOntology, dataGeom] = await Promise.all([
          fetch("https://vkcr9k49-4000.use.devtunnels.ms/country/getAllContriesSparql").then(res => res.json()),
          fetch("https://vkcr9k49-4000.use.devtunnels.ms/country/getAllCountries").then(res => res.json()),
        ]);
        const combinedFeatures = dataGeom.map((geomFeature: any, idx: number) => {
          const ontologyData = dataOntology.find((o: any) => o.name === geomFeature.name) || {};
          return {
            type: "Feature",
            geometry: geomFeature.geom,
            properties: {
              ...ontologyData,
            },
          };
        });


        const geoJsonCombined = {
          type: "FeatureCollection",
          features: combinedFeatures,
        };

        setCountryGeoJson(geoJsonCombined);

      } catch (error) {
        console.error("Error cargando datos combinados:", error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dataOntology, dataGeom] = await Promise.all([
          fetch("https://vkcr9k49-4000.use.devtunnels.ms/hydrography/getAllHydrographySparql").then(res => res.json()),
          fetch("https://vkcr9k49-4000.use.devtunnels.ms/hydrography/getAllHydrography").then(res => res.json()),
        ]);
        const combinedFeatures = dataGeom.map((geomFeature: any, idx: number) => {
          const ontologyData = dataOntology.find((o: any) => o.name === geomFeature.nombre) || {};
          return {
            type: "Feature",
            geometry: geomFeature.geom,
            properties: {
              ...ontologyData,
            },
          };
        });


        const geoJsonCombined = {
          type: "FeatureCollection",
          features: combinedFeatures,
        };

        setHidrografiaGeoJson(geoJsonCombined);

      } catch (error) {
        console.error("Error cargando datos combinados:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    /*const fetchAirports = async () => {
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
    */

    const fetchAirports = async () => {
      try {
        const response = await fetch("https://vkcr9k49-4000.use.devtunnels.ms/layers/airports/getAllAirportsSparql");
        const data = await response.json();

        const features = data.map((airport: any) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [airport.longitude, airport.latitude],
          },
          properties: {
            id: airport.id,
            name: airport.name,
            location: airport.location,
            type: airport.type,
            iata_code: airport.iataCode,
          },
        }));

        setGeoJsonData({
          type: "FeatureCollection",
          features,
        });
      } catch (error) {
        console.error("Error al cargar aeropuertos:", error);
      }

    }
    fetchAirports();
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    //@ts-ignore
    const baseLayers = {
      "OpenStreetMap": L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }),
      "Google": L.tileLayer("https://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
        attribution: "&copy; Google",
      }),
    };

    //@ts-ignore
    const overlays: Record<string, any> = {
      // No WMS, las capas vectoriales combinadas abajo
      //@ts-ignore
      "Aeropuertos (Clusters)": L.markerClusterGroup({
        zIndexOffset: -1000,
      }),
    };

    baseLayers["OpenStreetMap"].addTo(map);

    if (markerClusterGroupRef.current) {
      markerClusterGroupRef.current.clearLayers();
      map.removeLayer(markerClusterGroupRef.current);
      markerClusterGroupRef.current = null;
    }

    if (!geoJsonData) return;

    // Crea capa GeoJSON para países
    const countryLayer = countryGeoJson
      ? L.geoJSON(countryGeoJson, {
        style: {
          color: "#3388ff",
          weight: 2,
          opacity: 1,
          fillOpacity: 0.3,
        },
        onEachFeature: (feature, layer) => {
          const props = feature.properties;
          let popupContent = `<b>${props.name || "País"}</b><br/>` +
            `Población: ${props.population || "N/A"}<br/>` +
            `Continente: ${props.continent || "N/A"}<br/>` +
            `Área: ${props.area || "N/A"} km²`;
          layer.bindPopup(popupContent);
        },
      })
      : null;

    const hidrografiaLayer = hidrografiaGeoJson
      ? L.geoJSON(hidrografiaGeoJson, {
        style: {
          color: "#1f78b4",
          weight: 2,
          opacity: 1,
          fillOpacity: 0.4,
        },
        onEachFeature: (feature, layer) => {
          const props = feature.properties;
          let popupContent = `<b>${props.name || "Hidrografía"}</b><br/>` +
            `Tipo: ${props.type || "N/A"}<br/>` +
            `Descripción: ${props.description || "N/A"}`;
          layer.bindPopup(popupContent);
        },
      })
      : null;

    // Añadir estas capas a overlays para control de capas
    if (countryLayer) overlays["Países (Vector)"] = countryLayer;
    if (hidrografiaLayer) overlays["Hidrografía (Vector)"] = hidrografiaLayer;

    // Añadir capa aeropuertos con clusters y búsqueda
    const searchLayer = L.layerGroup();

    const markers = createMarkers();

    markers.forEach(marker => {
      overlays["Aeropuertos (Clusters)"].addLayer(marker);
      searchLayer.addLayer(marker);
    });

    overlays["Aeropuertos (Clusters)"].addTo(map);

    //@ts-ignore
    const searchControl = new L.Control.Search({
      layer: overlays["Aeropuertos (Clusters)"],
      propertyName: "title",
      zoom: 12,
      marker: false,
      textPlaceholder: "Buscar aeropuerto...",
    });
    map.addControl(searchControl);

    // Añadir control de capas
    const control = L.control.layers(baseLayers, overlays, { collapsed: false }).addTo(map);

    // Añadir las capas vectoriales al mapa por defecto (opcional)
    if (countryLayer) countryLayer.addTo(map);
    if (hidrografiaLayer) hidrografiaLayer.addTo(map);

    map.on("overlayadd", (e: any) => {
      if (e.name === "Aeropuertos (Clusters)") {
        //@ts-ignore
        setShowClusters(true);
      }
    });
    map.on("overlayremove", (e: any) => {
      if (e.name === "Aeropuertos (Clusters)") {
        //@ts-ignore
        setShowClusters(false);
      }
    });

    mapRef.current = map;

    return () => {
      map.removeControl(searchControl);
      control.remove();
      if (countryLayer) countryLayer.remove();
      if (hidrografiaLayer) hidrografiaLayer.remove();
      Object.values(overlays).forEach(layer => {
        if (map.hasLayer(layer)) map.removeLayer(layer);
      });
      Object.values(baseLayers).forEach(layer => {
        if (map.hasLayer(layer)) map.removeLayer(layer);
      });
    };
  }, [geoJsonData, countryGeoJson, hidrografiaGeoJson]);


  /*
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    console.log(countryGeoJson);
    //@ts-ignore
    const baseLayers = {
      "OpenStreetMap": L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }),
      "Google": L.tileLayer("https://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
        attribution: "&copy; Google",
      }),
    };

    //@ts-ignore
    const overlays = {
      "Hidrografia": L.tileLayer.wms("http://localhost:8081/geoserver/Danna/wms", {
        layers: "Danna:hidrografia",
        format: "image/png",
        transparent: true,
        zIndex: 10,
      }),
      "Paises": L.tileLayer.wms("http://localhost:8081/geoserver/Danna/wms", {
        layers: "Danna:pais",
        format: "image/png",
        transparent: true,
        zIndex: 20,
      }),
      "Departamento": L.tileLayer.wms("http://localhost:8081/geoserver/Danna/wms", {
        layers: "Danna:departamento",
        format: "image/png",
        transparent: true,
        zIndex: 30,
      }),
      "Ciudades": L.tileLayer.wms("http://localhost:8081/geoserver/Danna/wms", {
        layers: "Danna:ciudad",
        format: "image/png",
        transparent: true,
        zIndex: 40,
      }),
      //@ts-ignore
      "Aeropuertos (Clusters)": L.markerClusterGroup({
        zIndexOffset: -1000,
      }),
    };

    baseLayers["OpenStreetMap"].addTo(map);

    if (markerClusterGroupRef.current) {
      markerClusterGroupRef.current.clearLayers();
      map.removeLayer(markerClusterGroupRef.current);
      markerClusterGroupRef.current = null;
    }

    if (!geoJsonData) return;

    const searchLayer = L.layerGroup();

    const markers = createMarkers();

    markers.forEach(marker => {
      overlays["Aeropuertos (Clusters)"].addLayer(marker);
      searchLayer.addLayer(marker);
    });

    overlays["Aeropuertos (Clusters)"].addTo(map);
    searchLayer.addTo(map);

    //@ts-ignore
    const searchControl = new L.Control.Search({
      layer: searchLayer,
      propertyName: "title",
      zoom: 12,
      marker: false,
      textPlaceholder: "Buscar aeropuerto...",
    });
    map.addControl(searchControl);

    const control = L.control.layers(baseLayers, overlays, { collapsed: false }).addTo(map);

    map.on("overlayadd", (e: any) => {
      if (e.name === "Aeropuertos (Clusters)") {
        //@ts-ignore
        setShowClusters(true);
      }
    });
    map.on("overlayremove", (e: any) => {
      if (e.name === "Aeropuertos (Clusters)") {
        //@ts-ignore
        setShowClusters(false);
      }
    });

    mapRef.current = map;

    return () => {
      map.removeControl(searchControl);
      control.remove();
      Object.values(overlays).forEach(layer => {
        if (map.hasLayer(layer)) map.removeLayer(layer);
      });
      Object.values(baseLayers).forEach(layer => {
        if (map.hasLayer(layer)) map.removeLayer(layer);
      });
    };
  }, [geoJsonData]);
  */

  // Leyenda como componente React
  /*const Legend = () => (
    <div
      style={{
        position: "absolute",
        top: 240,
        right: 852,
        zIndex: 1000,
        backgroundColor: "white",
        padding: "6px 8px",
        borderRadius: 5,
        boxShadow: "0 0 15px rgba(0,0,0,0.2)",
        fontSize: 14,
        width: 180,
        userSelect: "none",
      }}
      className="info legend"
    >
      <div>
        <i
          style={{
            background: "#6FA1EC",
            width: 18,
            height: 18,
            float: "left",
            marginRight: 8,
            opacity: 0.9,
          }}
        />
        Ruta trazada
      </div>
      <div>
        <i
          style={{
            backgroundImage: "url(/img/aeropuerto.png)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "contain",
            width: 18,
            height: 18,
            display: "inline-block",
            marginRight: 8,
            float: "left",
            opacity: 0.9,
          }}
        />
        Aeropuertos
      </div>
      <div>
        <i style={{ background: "#1f78b4", width: 18, height: 18, float: "left", marginRight: 8, opacity: 0.9 }} />
        Hidrografía
      </div>
      <div>
        <i style={{ background: "#33a02c", width: 18, height: 18, float: "left", marginRight: 8, opacity: 0.9 }} />
        Países
      </div>
      <div>
        <i style={{ background: "#fb9a99", width: 18, height: 18, float: "left", marginRight: 8, opacity: 0.9 }} />
        Departamentos
      </div>
      <div>
        <i style={{ background: "#e31a1c", width: 18, height: 18, float: "left", marginRight: 8, opacity: 0.9 }} />
        Ciudades
      </div>
      <div>
        <i
          style={{
            background: "rgba(255, 165, 0, 0.6)",
            border: "1px solid #FFA500",
            width: 18,
            height: 18,
            float: "left",
            marginRight: 8,
            opacity: 0.9,
          }}
        />
        Clústeres de Aeropuertos
      </div>
    </div>
  ); */

  return (
    <>
      {/*<Legend />*/}
      <button
        onClick={requestUserLocation}
        style={{
          position: "absolute",
          top: '50%',
          right: '92%',
          zIndex: 1000,
          backgroundColor: "white",
          borderRadius: "4px",
          border: "1px solid #ccc",
          cursor: "pointer",
        }}
        title="Mostrar mi ubicación"
      >
        <img src="/img/gps.png" alt="ubicacion" className="size-8" />
      </button>


      <LeafletMapContainer
        center={[1.7572, -75.5906]}
        zoom={6}
        scrollWheelZoom={true}
        className={cn("w-full h-[600px] rounded-lg shadow-md", className)}
      >
        <MiniMapControl />
        <FullscreenControl />
        <ScaleControl />
        <MapListener onMapReady={(map) => (mapRef.current = map)} />
      </LeafletMapContainer>
    </>
  );
};

export default Map;

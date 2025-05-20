import axios from "axios";

const GEOSERVER_BASE_URL = process.env.NEXT_PUBLIC_GEOSERVER_URL || "http://localhost:8081/geoserver/Danna/ows";

export const getAirports = async (
  outputFormat: string = "application/json",
  additionalParams: Record<string, any> = {}
) => {
  try {
    const params = {
      service: "WFS",
      version: "1.0.0",
      request: "GetFeature",
      typeName: "Danna:aeropuerto",
      outputFormat,
      srsName: "EPSG:4326",
      ...additionalParams,
    };

    // Log para verificar URL completa con params
    const urlParams = new URLSearchParams(params).toString();
    console.log("GeoServer WFS URL:", `${GEOSERVER_BASE_URL}?${urlParams}`);

    const response = await axios.get(GEOSERVER_BASE_URL, { params });

    // Revisa status y contenido para asegurarte que es correcto
    if (response.status !== 200) {
      throw new Error(`GeoServer responded with status ${response.status}`);
    }

    return response.data;
  } catch (error: any) {
    console.error("Error al obtener aeropuertos desde GeoServer:", error.message || error);
    throw error.response?.data || error.message || error;
  }
};

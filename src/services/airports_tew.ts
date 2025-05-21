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

    const urlParams = new URLSearchParams(params).toString();

    const response = await axios.get(GEOSERVER_BASE_URL, { params });

    if (response.status !== 200) {
      throw new Error(`GeoServer responded with status ${response.status}`);
    }

    return response.data;
  } catch (error: any) {
    console.error("Error al obtener aeropuertos desde GeoServer:", error.message || error);
    throw error.response?.data || error.message || error;
  }
};

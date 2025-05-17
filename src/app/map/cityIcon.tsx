import L from 'leaflet';

export const CityIcon = new L.Icon({
  iconUrl: '/assets/city-icon.png',  // Icono de ciudad
  iconSize: [32, 32],  // Ajustar tamaño
  iconAnchor: [16, 32],  // Ajustar el anclaje
  popupAnchor: [0, -32],  // Ajustar popup
});

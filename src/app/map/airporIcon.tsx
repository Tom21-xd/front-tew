import L from 'leaflet';

export const AirportIcon = new L.Icon({
  iconUrl: '/assets/airplane-icon.png', // Aquí puedes usar el ícono de avión
  iconSize: [32, 32],  // Ajustar tamaño
  iconAnchor: [16, 32],  // Ajustar el anclaje
  popupAnchor: [0, -32],  // Ajustar popup
});

import React from "react";

interface AirportPopupProps {
  properties: {
    name?: string;
    iata_code?: string;
    gps_code?: string;
    wikipedia?: string;
    location?: string;
  };
}

const AirportPopup: React.FC<AirportPopupProps> = ({ properties }) => {
  return (
    <div>
      <h3 style={{ fontWeight: "bold", marginBottom: "4px" }}>{properties.name || "Aeropuerto"}</h3>
      {properties.iata_code && <p><strong>IATA:</strong> {properties.iata_code}</p>}
      {properties.gps_code && <p><strong>GPS:</strong> {properties.gps_code}</p>}
      {properties.location && <p><strong>Ubicación:</strong> {properties.location}</p>}
      {properties.wikipedia && (
        <p>
          <a href={properties.wikipedia} target="_blank" rel="noopener noreferrer" style={{ color: "#007bff" }}>
            Más info en Wikipedia
          </a>
        </p>
      )}
    </div>
  );
};

export default AirportPopup;

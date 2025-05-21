import React from "react";

interface Airport {
  id: string;
  nombre: string;
  tipo: string;
  abreviatura: string;
  locacion: string;
  wikipedia?: string;
}

// Datos de ejemplo
const airports: Airport[] = [
  {
    id: "MEX",
    nombre: "Aeropuerto Internacional Benito Juárez",
    tipo: "Internacional",
    abreviatura: "MMMX",
    locacion: "Ciudad de México, México",
    wikipedia: "https://es.wikipedia.org/wiki/Aeropuerto_Internacional_de_la_Ciudad_de_México"
  },
  {
    id: "CUN",
    nombre: "Aeropuerto Internacional de Cancún",
    tipo: "Internacional",
    abreviatura: "MMUN",
    locacion: "Cancún, Quintana Roo, México",
    wikipedia: "https://es.wikipedia.org/wiki/Aeropuerto_Internacional_de_Cancún"
  },
  // Puedes añadir más aeropuertos según necesites
];

export default function CardAirports() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Información de Aeropuertos</h1>

      <div className="grid gap-6 md:grid-cols-1">
        {airports.map((airport) => (
          <div key={airport.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="flex justify-between items-center p-4">
                <div className="font-bold text-xl text-gray-800">{airport.nombre}</div>
                <div className="text-sm font-medium text-gray-500">ID: {airport.id}</div>
              </div>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-500 block">Tipo</span>
                      <span className="text-gray-800">{airport.tipo}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500 block">Abreviatura</span>
                      <span className="text-gray-800">{airport.abreviatura}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500 block">Locación</span>
                      <span className="text-gray-800">{airport.locacion}</span>
                    </div>
                    {airport.wikipedia && (
                      <div>
                        <span className="text-sm font-medium text-gray-500 block">Wikipedia</span>
                        <a
                          href={airport.wikipedia}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Enlace
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
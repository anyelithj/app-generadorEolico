"use client";
import React, { useState, useEffect } from "react";
import { Flame, Thermometer, Droplets, Wind, Gauge, Ruler } from "lucide-react";

type Sensor = {
  id: string;
  name: string;
  value: string | number;
  unit?: string;
  enabled: boolean;
  type: string;
};

export default function IoTPanel() {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchSensors = async () => {
    try {
      const resp = await fetch("https://proyectofisicaarquimedes-production.up.railway.app/latest");
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

      const data = await resp.json();
      console.log("RAW DATA:", data);

    
      const items = Array.isArray(data) ? data : [data];

      const sensorsList: Sensor[] = items
        .map((obj: any) => {
          console.log("OBJ:", obj);

        
          if (
            obj.type === "multi" &&
            (obj.distance !== undefined ||
              obj.temperature !== undefined ||
              obj.humidity !== undefined)
          ) {
            return [
              {
                id: "distance",
                name: "Distancia",
                value: obj.distance,
                unit: obj.unit ?? "cm",
                enabled: true,
                type: "distance",
              },
              {
                id: "temperature",
                name: "Temperatura",
                value: obj.temperature,
                unit: "°C",
                enabled: true,
                type: "temperature",
              },
              {
                id: "humidity",
                name: "Humedad",
                value: obj.humidity,
                unit: "%",
                enabled: true,
                type: "humidity",
              },
            ];
          }

          if (obj.type === "multi" && obj.Esp32_2) {
            const arr: Sensor[] = [
              {
                id: "flame",
                name: "Sensor de Llama",
                value: obj.flame,
                enabled: true,
                type: "flame",
              },
              {
                id: "rpm",
                name: "Velocidad (RPM)",
                value: obj.rpm,
                enabled: true,
                type: "rpm",
              },
            ];

            if (obj.windSpeed !== undefined) {
              arr.push({
                id: "wind",
                name: "Velocidad del Viento",
                value: obj.windSpeed,
                unit: "m/s",
                enabled: true,
                type: "wind",
              });
            }

            return arr;
          }

          return [];
        })
        .flat();

      setSensors(sensorsList);
      setError(null);
    } catch (err) {
      console.error("Error al obtener sensores:", err);
      setError("No se pudieron obtener los datos de los sensores.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSensors();
    const interval = setInterval(fetchSensors, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleSensor = async (sensorId: string) => {
    setLoadingId(sensorId);
    setSensors((prev) =>
      prev.map((s) =>
        s.id === sensorId ? { ...s, enabled: !s.enabled } : s
      )
    );
    await new Promise((r) => setTimeout(r, 400)); // simular latencia
    setLoadingId(null);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "flame":
        return <Flame className="text-red-500" size={22} />;
      case "temperature":
        return <Thermometer className="text-orange-500" size={22} />;
      case "humidity":
        return <Droplets className="text-blue-500" size={22} />;
      case "rpm":
        return <Gauge className="text-emerald-500" size={22} />;
      case "wind":
        return <Wind className="text-cyan-500" size={22} />;
      case "distance":
        return <Ruler className="text-violet-500" size={22} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-sm min-h-[420px] md:min-h-[380px]">
      <h3 className="text-xl font-bold mb-7 flex items-center gap-2">
        Estado de Sensores
      </h3>

      {loading ? (
        <p className="text-slate-500">Cargando datos...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul className="space-y-5 mt-5">
          {sensors.map((s) => (
            <li
              key={s.id}
              className="flex items-center justify-between border-b pb-3"
            >
              <div className="flex items-center gap-3">
                {getIcon(s.type)}
                <div>
                  <div className="font-medium text-base">{s.name}</div>
                  {/* <div className="text-sm text-slate-600">
                    Valor: {s.value} {s.unit ?? ""}
                  </div> */}
                  <div
                    className={`text-sm font-medium ${
                      s.enabled ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    Estado: {s.enabled ? "🟢 Encendido" : "🔴 Apagado"}
                  </div>
                </div>
              </div>
              {/* <button
                onClick={() => toggleSensor(s.id)}
                disabled={loadingId === s.id}
                className={`px-4 py-2 rounded text-sm font-medium shadow-sm transition-all duration-200 ${
                  s.enabled
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-gray-300 hover:bg-gray-400 text-gray-700"
                }`}
              >
                {loadingId === s.id ? "..." : s.enabled ? "Apagar" : "Encender"}
              </button> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

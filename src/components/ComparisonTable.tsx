"use client";

import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

type Simulation = {
  id: string;
  name: string;
  radius: number;
  windSpeed: number;
  pg: number;
  pUseful: number;
  pElectric: number;
};

interface ComparisonTableProps {
  onDataChange: (data: { x: number; y: number }[]) => void;
}

export default function ComparisonTable({ onDataChange }: ComparisonTableProps) {
  const [simulations, setSimulations] = useState<Simulation[]>([]);


  const loadSimulations = () => {
    const stored = localStorage.getItem("simulations");
    const parsed: Simulation[] = stored ? JSON.parse(stored) : [];
    setSimulations(parsed);
    onDataChange(parsed.map((s) => ({ x: s.windSpeed, y: s.pElectric })));
  };

 
  useEffect(() => {
    loadSimulations();
    const updateHandler = () => loadSimulations();
    window.addEventListener("simulationsUpdated", updateHandler);
    return () => window.removeEventListener("simulationsUpdated", updateHandler);
  }, []);

  const handleDelete = (id: string) => {
    const updated = simulations.filter((sim) => sim.id !== id);
    setSimulations(updated);
    localStorage.setItem("simulations", JSON.stringify(updated));
    onDataChange(updated.map((s) => ({ x: s.windSpeed, y: s.pElectric })));
    window.dispatchEvent(new Event("simulationsUpdated"));
  };

  const handleDeleteAll = () => {
    localStorage.removeItem("simulations");
    setSimulations([]);
    onDataChange([]);
    window.dispatchEvent(new Event("simulationsUpdated"));
  };

  if (simulations.length === 0) {
    return (
      <div className="bg-white p-4 rounded-md text-center text-slate-600">
        No hay simulaciones guardadas aún.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Simulaciones guardadas</h2>
        <button
          onClick={handleDeleteAll}
          className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Eliminar todas
        </button>
      </div>

      <div className="min-w-[650px]">
        <table className="w-full border-collapse border border-slate-300 text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="border px-3 py-2">Nombre</th>
              <th className="border px-3 py-2">Radio (m)</th>
              <th className="border px-3 py-2">Velocidad (m/s)</th>
              <th className="border px-3 py-2">Pot. Viento (W)</th>
              <th className="border px-3 py-2">Pot. Útil (W)</th>
              <th className="border px-3 py-2">Pot. Eléctrica (W)</th>
              <th className="border px-3 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {simulations.map((sim) => (
              <tr key={sim.id} className="hover:bg-slate-50">
                <td className="border px-3 py-2">{sim.name}</td>
                <td className="border px-3 py-2">{sim.radius}</td>
                <td className="border px-3 py-2">{sim.windSpeed}</td>
                <td className="border px-3 py-2">{sim.pg.toFixed(2)}</td>
                <td className="border px-3 py-2">{sim.pUseful.toFixed(2)}</td>
                <td className="border px-3 py-2">{sim.pElectric.toFixed(2)}</td>
                <td className="border px-3 py-2 text-center">
                  <button
                    onClick={() => handleDelete(sim.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Eliminar simulación"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


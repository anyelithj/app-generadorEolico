"use client";

import React, { useState } from "react";
import { useAppDispatch } from "../features/store";
import { setInputs, calculateResults } from "../features/windCalculatorSlice";
import useWindCalculator from "../hooks/useWindCalculator";
import Swal from "sweetalert2";

export default function CalculatorForm() {
  const dispatch = useAppDispatch();
  const { computePreview } = useWindCalculator();

  
  const [radius, setRadius] = useState<number | "">("");
  const [windSpeed, setWindSpeed] = useState<number | "">("");
  const [density, setDensity] = useState<number | "">("");
  const [efficiency, setEfficiency] = useState<number | "">("");
  const [saving, setSaving] = useState(false);

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (radius === "" || windSpeed === "" || density === "" || efficiency === "") {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos antes de calcular.",
      });
      return;
    }


    dispatch(setInputs({ radius, windSpeed, density, efficiency }));
    dispatch(calculateResults());


    const results = computePreview({ radius, windSpeed, density, efficiency });


    const newSimulation = {
      id: crypto.randomUUID(),
      name: `Simulación ${new Date().toLocaleTimeString()}`,
      radius,
      windSpeed,
      pg: results.pg,
      pUseful: results.pUseful,
      pElectric: results.pElectric,
    };


    setSaving(true);
    const stored = localStorage.getItem("simulations");
    const simulations = stored ? JSON.parse(stored) : [];
    simulations.push(newSimulation);
    localStorage.setItem("simulations", JSON.stringify(simulations));
    setSaving(false);

 
    Swal.fire({
      icon: "success",
      title: "Simulación guardada",
      text: "La simulación se ha agregado correctamente.",
      timer: 1500,
      showConfirmButton: false,
    });

   
    setRadius("");
    setWindSpeed("");
    setDensity("");
    setEfficiency("");


    window.dispatchEvent(new Event("simulationsUpdated"));
  };

  const preview =
    radius && windSpeed && density && efficiency
      ? computePreview({ radius, windSpeed, density, efficiency })
      : { pg: 0, pUseful: 0, pElectric: 0 };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-md shadow-sm space-y-4"
    >
      <h2 className="text-2xl font-semibold mb-4">Calcula la Potencia del Viento</h2>

      <div className="grid gap-4">
        <label className="block">
          Radio (m)
          <input
            type="number"
            value={radius}
            placeholder="Ej: 2.5"
            step="0.1"
            onChange={(e) =>
              setRadius(e.target.value ? parseFloat(e.target.value) : "")
            }
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </label>

        <label className="block">
          Velocidad del viento (m/s)
          <input
            type="number"
            value={windSpeed}
            placeholder="Ej: 5.0"
            step="0.1"
            onChange={(e) =>
              setWindSpeed(e.target.value ? parseFloat(e.target.value) : "")
            }
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </label>

        <label className="block">
          Densidad del aire (kg/m³)
          <input
            type="number"
            value={density}
            placeholder="Ej: 1.225"
            step="0.001"
            onChange={(e) =>
              setDensity(e.target.value ? parseFloat(e.target.value) : "")
            }
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </label>

        <label className="block">
          Eficiencia (0 a 1)
          <input
            type="number"
            value={efficiency}
            placeholder="Ej: 0.35"
            step="0.01"
            min="0"
            max="1"
            onChange={(e) =>
              setEfficiency(e.target.value ? parseFloat(e.target.value) : "")
            }
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </label>
      </div>

     
      <div className="flex items-center justify-between mt-6">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
          disabled={saving}
        >
          {saving ? "Guardando..." : "Calcular"}
        </button>

        <div className="text-sm text-slate-600">
          Potencia eléctrica estimada:{" "}
          <strong>{preview.pElectric.toFixed(2)} W</strong>
        </div>
      </div>
    </form>
  );
}

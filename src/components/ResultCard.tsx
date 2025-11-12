"use client";

import React from "react";
import { useAppSelector } from "../features/store";

export default function ResultCard() {
  const results = useAppSelector((state) => state.windCalculator.results);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md ">
      <h3 className="text-xl font-semibold mb-4 text-blue-700">Resultados</h3>

      {results ? (
        <ul className="space-y-3 text-slate-700">
          <li>
            Potencia del viento (Pg):{" "}
            <strong>{results.pg.toFixed(3)} W</strong>
          </li>
          <li>
            Potencia útil (P útil, Cp aplicado):{" "}
            <strong>{results.pUseful.toFixed(3)} W</strong>
          </li>
          <li>
            Potencia eléctrica (ηₘ aplicada):{" "}
            <strong>{results.pElectric.toFixed(3)} W</strong>
          </li>
        </ul>
      ) : (
        <p className="text-slate-500">
          Aún no hay resultados. Ingresa los valores y presiona “Calcular”.
        </p>
      )}
    </div>
  );
}


"use client";

import React from "react";

export default function ThreeDWindTurbine() {
  return (
    <div className="bg-white p-4 rounded-md shadow-sm flex flex-col items-center justify-center">
      <h4 className="font-semibold mb-2">Modelo 3D (opcional)</h4>
      <p className="text-xs text-slate-500 text-center">
        Placeholder para integrar <strong>Three.js</strong> o <strong>React Three Fiber</strong>. Aquí se puede mostrar
        un aerogenerador rotando según la velocidad del viento.
      </p>

      <div className="mt-4 w-full h-48 border rounded flex items-center justify-center bg-slate-50">
        <div className="text-slate-400">Canvas 3D (integrar React Three Fiber aquí)</div>
      </div>
    </div>
  );
}

// final

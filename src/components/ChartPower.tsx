"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartPowerProps {
  data: { x: number; y: number }[];
}

export default function ChartPower({ data }: ChartPowerProps) {
  if (data.length === 0) {
    return (
      <div className="bg-white p-4 rounded-md shadow-md text-center text-slate-500">
        No hay datos para mostrar.
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h3 className="text-lg font-semibold mb-3 text-blue-600">
        Gráfica de Potencia Eléctrica
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="x"
            label={{
              value: "Velocidad del viento (m/s)",
              position: "insideBottom",
              dy: 10,
            }}
          />
          <YAxis
            label={{
              value: "Potencia eléctrica (W)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="y"
            stroke="#2563eb"
            strokeWidth={2}
            dot={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

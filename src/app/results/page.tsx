"use client";

import React, { useState } from "react";
import Layout from "../../components/Layout";
import ComparisonTable from "../../components/ComparisonTable";
import ChartPower from "../../components/ChartPower";

export default function ResultsPage() {
  const [chartData, setChartData] = useState<{ x: number; y: number }[]>([]);

  return (
    <Layout>
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
          Visualización de Datos
        </h1>

      
        <div className="flex flex-col gap-6 md:grid md:grid-cols-2">
          {/* 📈 Gráfica */}
          <div className="w-full overflow-hidden rounded-md bg-white p-3 shadow-sm">
            <p className="mb-4 text-slate-700 text-justify">
              Se comparan los resultados de las simulaciones y se visualiza cómo varía 
              la potencia eléctrica con la velocidad del viento.
            </p>
            <div className="w-full h-[300px] md:h-[350px]">
              <ChartPower data={chartData} />
            </div>
          </div>

          <aside className="w-full overflow-x-auto rounded-md bg-white p-3 shadow-sm">
            <ComparisonTable onDataChange={setChartData} />
          </aside>
        </div>
      </section>
    </Layout>
  );
}

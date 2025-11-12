"use client";

import React, { useState } from "react";
import Layout from "../../components/Layout";
import ComparisonTable from "../../components/ComparisonTable";
import ChartPower from "../../components/ChartPower";

export default function ResultsPage() {
  const [chartData, setChartData] = useState<{ x: number; y: number }[]>([]);

  return (
    <Layout>
      <section className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">
          Visualización de Datos
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="mb-4 text-slate-700">
              Esta sección permite comparar los resultados de las simulaciones y
              visualizar cómo varía la potencia eléctrica con la velocidad del
              viento.
            </p>

            <ChartPower data={chartData} />
          </div>

          <aside>
            <ComparisonTable onDataChange={setChartData} />
          </aside>
        </div>
      </section>
    </Layout>
  );
}

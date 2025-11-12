import React from "react";
import Layout from "../components/Layout";
import CalculatorForm from "../components/CalculatorForm";
import ResultCard from "../components/ResultCard";

export default function Page() {
  return (
    <Layout>
      <section className="container mx-auto py-8">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4 text-blue-700">
              Generador Eólico
            </h1>
            <p className="text-lg mb-6 text-slate-700">
              Simula la generación de energía eléctrica a través del viento y observa los resultados en tiempo real.
            </p>
            <a
              href="#simulador"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 
                         text-white font-medium rounded-md shadow-sm transition 
                         focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              Ir al Simulador
            </a>
          </div>

          <div>
            <img
              src="/images/wind-turbine.svg"
              alt="Aerogenerador"
              className="w-full max-w-md mx-auto"
            />
          </div>
        </div>
      </section>


      <section id="simulador" className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row gap-6 w-full">

          <div className="w-full md:w-[60%]">
            <CalculatorForm />
          </div>

          <div className="w-full md:w-[40%]">
            <ResultCard />
          </div>
        </div>
      </section>
    </Layout>
  );
}


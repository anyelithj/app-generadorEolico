import React from "react";
import Layout from "@/components/Layout";
import MethodCard from "@/components/MethodCard";

export default function TheoryPage() {
  const steps = [
    {
      title: "Observación",
      description: "Recolectar datos, información del entorno natural e identificando el problema energético.",
      icon: "/images/observation.svg",
      content:
        `En esta fase, se analizan fenómenos naturales que están relacionados con la energía eólica. Se toman en cuenta variables como la velocidad del viento que es una fuente de energía renovable que está siempre presente en la naturaleza Su energía cinética se puede utilizar para producir electricidad a través de un aerogenerador, la densidad del aire que fluye sobre las aspas acopladas a un generador, la energía cinética del viento se convierte en energía mecánica de rotación y luego en energía eléctrica.
       `,
    },
    {
      title: "Hipótesis",
      description: "Proponer una explicación sobre el fenómeno observado.",
      icon: "/images/method-science.svg",
      content:
      `Se formula una hipótesis que relacione la potencia generada por el viento con la velocidad del flujo y el tamaño del radio de las aspas tiene un impacto directo en la generación de energía eléctrica. Cuanto mayor sea el radio, superior será el área de barrido y más cantidad de energía cinética que se puede capturar del viento. Incrementando la potencia eléctrica generada, manteniendo constantes las variables como la velocidad del viento, la densidad del aire y la eficiencia del motor.`,
    },
    {
      title: "Experimentación",
      description: "Comprobar la hipótesis mediante simulaciones o mediciones.",
      icon: "/images/experimentation.svg",
      content:
      `Se simulan distintos valores de velocidad y radio para evaluar el impacto sobre la potencia. Las simulaciones se tomaron en cuenta 3 radios diferentes para el tamaño de las aspas para entender teóricamente cómo se comporta la potencia del generador según el radio de las aspas, permiten validar la relación teórica mediante datos cuantitativos.`
    },
    {
      title: "Conclusiones",
      description: "Analizar los resultados obtenidos y verificar la hipótesis.",
      icon: "/images/conclusions.svg",
      content:
      `Se comparan los resultados experimentales, los datos de la realización a escala del aerogenerador podemos encontrar muy viable la generación de energía eléctrica por medio de este dispositivo, ya que los datos teóricos obtenidos nos permiten visualizar su funcionamiento en la aplicación de los principios físicos de la conversión de energía cinética – mecánica a eléctrica y la influencia directa del radio del rotor en el rendimiento.`
    },
  ];

  return (
    <Layout>
      <section id="teoria" className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-4">Método Científico</h1>
        <p className="mb-6 text-slate-700">
          El proceso utilizado para obtener conocimiento a través de la observación, la formulación de hipótesis, la experimentación, el análisis y la obtención de conclusiones.
          Etapas aplicadas en el proyecto:
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {steps.map((s) => (
            <MethodCard
              key={s.title}
              title={s.title}
              description={s.description}
              icon={s.icon}
              content={s.content}
            />
          ))}
        </div>

        <div className="mt-12 bg-white p-6 rounded-2xl shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold mb-3">Fórmulas clave</h2>
          <ul className="list-disc pl-5 text-slate-700">
            <li>
              Potencia del viento: <code>Pg = 0.5 · ρ · π · r² · v³</code>
            </li>
            <li>
              Potencia útil: <code>Pútil = Cp · Pg</code>
            </li>
            <li>
              Potencia eléctrica: <code>Pe = ηₘ · Pútil</code>
            </li>
          </ul>
        </div>
      </section>
    </Layout>
  );
}

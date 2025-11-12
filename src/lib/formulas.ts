export const EXPLANATION = {
  pg:
    "Potencia del viento: Pg = 0.5 · ρ · π · r² · v³. ρ es la densidad del aire (kg/m³), r es el radio del rotor (m) y v la velocidad del viento (m/s).",
  pUseful: "Potencia útil: Pútil = Cp · Pg. Cp es el coeficiente de potencia (máx. teórico ~0.59, límite de Betz).",
  pElectric: "Potencia eléctrica: Pe = ηₘ · Pútil. ηₘ es la eficiencia mecánica/electrónica del sistema.",
}

export function calculaPotenciaViento(radius: number, windSpeed: number, density: number) {
  const area = Math.PI * Math.pow(radius, 2) // A = π r^2
  const pg = 0.5 * density * area * Math.pow(windSpeed, 3)
  return pg
}

export function calculaPotenciaUtil(pg: number, cp: number) {
  return cp * pg
}


export function calculaPotenciaElectrica(pUseful: number, efficiency: number) {
  return pUseful * efficiency
}


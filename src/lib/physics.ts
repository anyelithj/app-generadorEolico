export interface PhysicsInputs {
  radius: number; 
  windSpeed: number; 
  density: number; 
  cp?: number; 
  efficiency?: number; 
}

export interface PhysicsResults {
  pg: number; 
  pUseful: number; 
  pElectric: number; 
}

export function calculateWindPower(radius: number, windSpeed: number, density: number): number {
  const area = Math.PI * Math.pow(radius, 2); 
  const pg = 0.5 * density * area * Math.pow(windSpeed, 3);
  return pg;
}


export function computeAll(inputs: PhysicsInputs): PhysicsResults {
  const { radius, windSpeed, density, cp = 0.4, efficiency = 0.3 } = inputs;
  const _radius = Math.max(0, radius);
  const _windSpeed = Math.max(0, windSpeed);
  const _density = Math.max(0, density);

  const pg = calculateWindPower(_radius, _windSpeed, _density);
  const pUseful = cp * pg;
  const pElectric = efficiency * pUseful;

  return {
    pg,
    pUseful,
    pElectric,
  };
}



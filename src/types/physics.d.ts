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



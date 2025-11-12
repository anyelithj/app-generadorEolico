export interface NFSInputs {
  radius: number; 
  windSpeed: number; 
  density: number; 
  cp?: number;
  efficiency?: number; 
}

export interface NFSResults {
  pg: number; 
  pUseful: number; 
  pElectric: number; 
}

export interface NFSData {
  id: string; 
  name?: string; 
  createdAt: number; 
  inputs: NFSInputs; 
  results: NFSResults; 
  path?: string;
}



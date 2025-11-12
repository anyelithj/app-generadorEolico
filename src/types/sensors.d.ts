export type SensorId = string;

export interface SensorData {
  id: SensorId; 
  name: string; 
  enabled: boolean; 
  value?: number | string; 
  lastUpdated?: number; 
}

export interface SensorState {
  sensors: SensorData[]; 
  isConnected: boolean; 
  error?: string | null; 
}


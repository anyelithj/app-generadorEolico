import fs from "fs";
import path from "path";

export interface Simulation {
  id: string;
  name: string;
  radius: number;
  windSpeed: number;
  pg: number;
  pUseful: number;
  pElectric: number;
}

const filePath = path.join(process.cwd(), "src/lib/data/simulations.json");

export function getSimulations(): Simulation[] {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveSimulations(simulations: Simulation[]) {
  fs.writeFileSync(filePath, JSON.stringify(simulations, null, 2));
}


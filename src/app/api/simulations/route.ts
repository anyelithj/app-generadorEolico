import { NextResponse } from "next/server";
import { getSimulations, saveSimulations, Simulation } from "@/lib/data";

export async function GET() {
  const simulations = getSimulations();
  return NextResponse.json(simulations);
}

export async function POST(request: Request) {
  const newSim: Simulation = await request.json();
  const simulations = getSimulations(); 

  const updatedSimulations = [...simulations, newSim];
  saveSimulations(updatedSimulations);

  return NextResponse.json({
    message: "Simulación agregada correctamente",
    simulations: updatedSimulations,
  });
}

export async function DELETE() {
  saveSimulations([]);
  return NextResponse.json({ message: "Todas las simulaciones eliminadas" });
}

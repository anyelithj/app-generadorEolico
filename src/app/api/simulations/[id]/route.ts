import { NextResponse, NextRequest } from "next/server";
import { getSimulations, saveSimulations, Simulation } from "@/lib/data/data";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  let simulations = getSimulations();

  const index = simulations.findIndex((sim) => sim.id === id);

  if (index === -1) {
    return NextResponse.json(
      { error: "Simulación no encontrada" },
      { status: 404 }
    );
  }

 
  simulations.splice(index, 1);
  saveSimulations(simulations);

  return NextResponse.json({
    message: `Simulación con ID ${id} eliminada correctamente`,
    simulations,
  });
}


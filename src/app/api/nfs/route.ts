import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const saved = { id: `sim-${Date.now()}`, ...body };
    return NextResponse.json({ saved }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Error al guardar la simulación" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const sampleList = [
    { id: "sim-1", name: "Simulación A", timestamp: Date.now() - 3600000 },
    { id: "sim-2", name: "Simulación B", timestamp: Date.now() - 7200000 },
  ];
  return NextResponse.json({ simulations: sampleList });
}

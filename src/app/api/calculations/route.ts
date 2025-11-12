
import { NextResponse } from "next/server";
import { computeAll } from "../../../lib/physics";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { radius, windSpeed, density, cp = 0.4, efficiency = 0.3 } = body;
    const r = Number(radius);
    const v = Number(windSpeed);
    const rho = Number(density);

    if (isNaN(r) || isNaN(v) || isNaN(rho)) {
      return NextResponse.json({ error: "Entradas inválidas" }, { status: 400 });
    }

    const results = computeAll({ radius: r, windSpeed: v, density: rho, cp, efficiency });

    return NextResponse.json({ results });
  } catch (err) {
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}



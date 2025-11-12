import { NextResponse } from "next/server";

type SensorCommand = {
  sensorId: string;
  action: "on" | "off" | "status";
};

export async function POST(request: Request) {
  try {
    const body: SensorCommand = await request.json();
    const response = {
      sensorId: body.sensorId,
      status: body.action === "status" ? "online" : body.action === "on" ? "enabled" : "disabled",
      timestamp: Date.now(),
    };
    return NextResponse.json({ result: response });
  } catch (err) {
    return NextResponse.json({ error: "Error al procesar comando del sensor" }, { status: 500 });
  }
}


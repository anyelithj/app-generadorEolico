import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ssid, deviceId } = body;
    const accepted = { deviceId, ssid, status: "configured", timestamp: Date.now() };
    return NextResponse.json({ accepted }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Error al configurar Wi-Fi" }, { status: 500 });
  }
}


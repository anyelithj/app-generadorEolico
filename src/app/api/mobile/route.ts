import { NextResponse } from "next/server";

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const url = `${baseUrl}/iot`;

    return NextResponse.json({ url });
  } catch (error) {
    return NextResponse.json({ error: "Error generando URL móvil" }, { status: 500 });
  }
}

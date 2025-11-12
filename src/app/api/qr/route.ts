import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json(
        { error: "Falta la URL para el QR" },
        { status: 400 }
      );
    }

    const payload = { url, createdAt: new Date().toISOString() };
    return NextResponse.json({ payload });
  } catch (error) {
    return NextResponse.json(
      { error: "Error generando QR" },
      { status: 500 }
    );
  }
}

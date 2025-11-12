import type { QRPayload } from "@/types/qr"

export async function createQRDataUrl(payload: QRPayload): Promise<{ dataUrl?: string; payload: QRPayload; ok: boolean; error?: string }> {
  try {
    const qrcode = await import("qrcode")
    const toDataURL = qrcode.toDataURL as (text: string) => Promise<string>
    const dataUrl = await toDataURL(payload.url)
    return { ok: true, dataUrl, payload }
  } catch (err: any) {
    return { ok: false, payload, error: err?.message ?? "qrcode generation failed" }
  }
}



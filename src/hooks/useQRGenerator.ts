"use client";

import { useCallback, useState } from "react";
import type { QRPayload } from "@/types/qr";

export default function useQRGenerator() {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [payload, setPayload] = useState<QRPayload | null>(null);

  const generate = useCallback(async (url?: string) => {
    setLoading(true);
    setError(null);

    try {
      let targetUrl = url;
      if (!targetUrl) {
        const resMobile = await fetch("/api/mobile");
        const jsonMobile = await resMobile.json();
        if (!resMobile.ok)
          throw new Error(jsonMobile?.error ?? "Error obteniendo URL móvil");
        targetUrl = jsonMobile.url;
      }

      const res = await fetch("/api/qr", {
        method: "POST",
        body: JSON.stringify({ url: targetUrl }),
        headers: { "Content-Type": "application/json" },
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Error generando QR en API");

      const payloadResponse = json.payload as QRPayload;
      setPayload(payloadResponse);

      try {
        const qrcode = await import("qrcode");
        const toDataURL = qrcode.toDataURL as (text: string) => Promise<string>;
        const d = await toDataURL(payloadResponse.url);
        setDataUrl(d);
      } catch (err) {
        console.warn("No se pudo importar qrcode dinámicamente", err);
        setDataUrl(null);
      }

      setLoading(false);
      return { payload: payloadResponse, dataUrl };
    } catch (err: any) {
      setError(err.message ?? "Error desconocido");
      setLoading(false);
      return null;
    }
  }, []);

  return { dataUrl, payload, loading, error, generate, setDataUrl };
}

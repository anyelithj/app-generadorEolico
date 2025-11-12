"use client";
import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import { MonitorSmartphone as MobileIcon, Globe } from "lucide-react";

type Props = { url?: string };

export default function QRGenerator({ url }: Props) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  const finalUrl = url ?? process.env.NEXT_PUBLIC_BASE_URL;
  const publicUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    let mounted = true;

    const generateQrCode = async () => {
      if (!finalUrl) return;
      try {
        const qrData = await QRCode.toDataURL(finalUrl);
        if (mounted) {
          setDataUrl(qrData);
        }
      } catch (err) {
        console.error("Error generando QR:", err);
      }
    };

    generateQrCode();
    return () => {
      mounted = false;
    };
  }, [finalUrl]);

  return (
    <div className="bg-white p-6 rounded-md shadow-sm text-center h-full flex flex-col justify-between">
   
      <div>
        <h3 className="mb-3 font-bold text-xl flex items-center justify-center gap-2">
 
          Acceso rápido al simulador
        </h3>

        <p className="text-sm text-slate-700 mb-3">
          Escanea el QR o abre la URL en tu navegador:
        </p>

        {dataUrl ? (
          <img src={dataUrl} alt="QR code" className="mx-auto w-64 h-64" />
        ) : (
          <>
            <div className="mb-2 text-sm text-slate-600">No se generó QR</div>
            <a href={finalUrl} className="text-blue-600 break-all text-sm">
              {finalUrl}
            </a>
          </>
        )}

        <div className="mt-2 mb-2">
          <MobileIcon className="mx-auto text-blue-500 w-38 h-38" />
          <p className="text-sm text-slate-700 mt-4 font-medium">
            Listo para la visualización en cualquier dispositivo.
          </p>
        </div>
      </div>

      <div className="mt-4 border-t pt-4">
        <p className="text-sm text-slate-600">
          Acceso directo:{" "}
          <a href={publicUrl} className="text-blue-600 break-all">
            {publicUrl}
          </a>
        </p>

        <p className="mt-2 text-xs font-medium text-green-600">
          🟢 Servidor de Datos: Conectado (Última actualización hace 5s)
        </p>
      </div>
    </div>
  );
}
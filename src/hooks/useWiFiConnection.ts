
"use client";

import { useCallback, useState } from "react";

export default function useWiFiConnection() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastConfig, setLastConfig] = useState<{ deviceId?: string; ssid?: string } | null>(null)


  const configureWiFi = useCallback(async (deviceId: string, ssid: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/sensors/wifi", {
        method: "POST",
        body: JSON.stringify({ deviceId, ssid, password }),
        headers: { "Content-Type": "application/json" },
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error ?? "Error configurando Wi-Fi")
      setLastConfig({ deviceId, ssid })
      setLoading(false)
      return json.accepted ?? { deviceId, ssid, status: "configured" }
    } catch (err: any) {
      setError(err.message ?? "Error desconocido")
      setLoading(false)
      return null
    }
  }, [])

  return { loading, error, configureWiFi, lastConfig }
}



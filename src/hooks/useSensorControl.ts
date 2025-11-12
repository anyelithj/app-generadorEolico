"use client";

import { useCallback, useState } from "react";
import type { SensorData } from "@/types/sensors";

export default function useSensorControl() {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const toggleSensor = useCallback(async (sensorId: string, action: "on" | "off") => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/sensors", {
        method: "POST",
        body: JSON.stringify({ sensorId, action }),
        headers: { "Content-Type": "application/json" },
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error ?? "Error controlando el sensor")
 
      setLoading(false)
      return json.result as { sensorId: string; status: string; timestamp: number }
    } catch (err: any) {
      setError(err.message ?? "Error desconocido")
      setLoading(false)
      return null
    }
  }, [])


  const getStatus = useCallback(async (sensorId: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/sensors", {
        method: "POST",
        body: JSON.stringify({ sensorId, action: "status" }),
        headers: { "Content-Type": "application/json" },
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error ?? "Error consultando estado")
      setLoading(false)
      return json.result as { sensorId: string; status: string; timestamp: number }
    } catch (err: any) {
      setError(err.message ?? "Error desconocido")
      setLoading(false)
      return null
    }
  }, [])

  return {
    loading,
    error,
    toggleSensor,
    getStatus,
  }
}



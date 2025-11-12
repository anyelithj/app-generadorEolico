import type { SensorData } from "@/types/sensors"

export async function sendSensorCommand(sensorId: string, action: "on" | "off" | "status") {
  try {
    const res = await fetch("/api/sensors", {
      method: "POST",
      body: JSON.stringify({ sensorId, action }),
      headers: { "Content-Type": "application/json" },
    })
    const json = await res.json()
    if (!res.ok) {
      return { ok: false, error: json?.error ?? "Error en comando sensor" }
    }
    return { ok: true, data: json.result }
  } catch (err: any) {
    return { ok: false, error: err.message ?? "Error desconocido" }
  }
}

export async function configureDeviceWiFi(deviceId: string, ssid: string, password: string) {
  try {
    const res = await fetch("/api/sensors/wifi", {
      method: "POST",
      body: JSON.stringify({ deviceId, ssid, password }),
      headers: { "Content-Type": "application/json" },
    })
    const json = await res.json()
    if (!res.ok) return { ok: false, error: json?.error ?? "Error configurando WiFi" }
    return { ok: true, data: json.accepted }
  } catch (err: any) {
    return { ok: false, error: err.message ?? "Error desconocido" }
  }
}



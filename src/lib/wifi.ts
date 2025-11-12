
export async function requestMobileAccessUrl() {
  try {
    const res = await fetch("/api/mobile")
    const json = await res.json()
    if (!res.ok) return { ok: false, error: json?.error ?? "Error obteniendo URL móvil" }
    return { ok: true, data: json }
  } catch (err: any) {
    return { ok: false, error: err.message ?? "Error desconocido" }
  }
}

export async function configureWiFi(deviceId: string, ssid: string, password: string) {
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




import type { NFSData } from "@/types/nfs"
import type { ApiResponse } from "@/types"

export async function fetchSimulations(): Promise<ApiResponse<NFSData[]>> {
  try {
    const res = await fetch("/api/nfs")
    const json = await res.json()
    if (!res.ok) return { ok: false, error: json?.error ?? "Error fetching simulations" }
    return { ok: true, data: json.simulations as NFSData[] }
  } catch (err: any) {
    return { ok: false, error: err.message ?? "Error desconocido" }
  }
}

export async function saveSimulationToNFS(payload: Omit<NFSData, "id" | "createdAt">) {
  try {
    const res = await fetch("/api/nfs", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    })
    const json = await res.json()
    if (!res.ok) return { ok: false, error: json?.error ?? "Error saving simulation" }
    return { ok: true, data: json.saved as NFSData }
  } catch (err: any) {
    return { ok: false, error: err.message ?? "Error desconocido" }
  }
}


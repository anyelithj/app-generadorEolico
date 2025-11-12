"use client";

import { useCallback, useState } from "react";
import type { NFSData } from "@/types/nfs";


export default function useNFSStorage() {
  const [simulations, setSimulations] = useState<NFSData[]>([]) 
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)


  const loadSimulations = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/nfs")
      const json = await res.json()
      if (!res.ok) {
        throw new Error(json?.error ?? "Error al cargar simulaciones")
      }
      setSimulations(json.simulations ?? [])
      setLoading(false)
      return json.simulations as NFSData[]
    } catch (err: any) {
      setError(err.message ?? "Error desconocido")
      setLoading(false)
      return []
    }
  }, [])


  const saveSimulation = useCallback(async (payload: Omit<NFSData, "id" | "createdAt"> & { id?: string }) => {
    setLoading(true)
    setError(null)
    try {
      const body = {
        ...payload,
      }
      const res = await fetch("/api/nfs", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      })
      const json = await res.json()
      if (!res.ok) {
        throw new Error(json?.error ?? "Error al guardar simulación")
      }

      const saved = json.saved as NFSData
      setSimulations((s) => [...s, saved])
      setLoading(false)
      return saved
    } catch (err: any) {
      setError(err.message ?? "Error desconocido")
      setLoading(false)
      return null
    }
  }, [])

  return {
    simulations,
    loading,
    error,
    loadSimulations,
    saveSimulation,
  }
}



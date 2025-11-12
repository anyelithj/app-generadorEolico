"use client";

import { useMemo } from "react";
import type { NFSData } from "@/types/nfs";

type ComparisonResult = {
  id: string
  name?: string
  pg: number
  pUseful: number
  pElectric: number
  relativeToMax?: {
    pgPct: number
    pUsefulPct: number
    pElectricPct: number
  }
}

export default function useComparison(sims: NFSData[] | null) {
  const result = useMemo(() => {
    if (!sims || sims.length === 0) return { items: [] as ComparisonResult[], max: null }

 
    const maxPg = Math.max(...sims.map(s => s.results.pg))
    const maxPUseful = Math.max(...sims.map(s => s.results.pUseful))
    const maxPE = Math.max(...sims.map(s => s.results.pElectric))

    const items: ComparisonResult[] = sims.map(s => ({
      id: s.id,
      name: s.name,
      pg: s.results.pg,
      pUseful: s.results.pUseful,
      pElectric: s.results.pElectric,
      relativeToMax: {
        pgPct: maxPg > 0 ? (s.results.pg / maxPg) * 100 : 0,
        pUsefulPct: maxPUseful > 0 ? (s.results.pUseful / maxPUseful) * 100 : 0,
        pElectricPct: maxPE > 0 ? (s.results.pElectric / maxPE) * 100 : 0,
      },
    }))

    items.sort((a, b) => b.pElectric - a.pElectric)

    return {
      items,
      max: { pg: maxPg, pUseful: maxPUseful, pElectric: maxPE },
    }
  }, [sims])

  return result
}



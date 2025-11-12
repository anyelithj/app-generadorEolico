"use client";

import { useCallback } from "react";
import { computeAll } from "../lib/physics";



export default function useWindCalculator() {
  const computePreview = useCallback(
    ({
      radius,
      windSpeed,
      density,
      efficiency,
      cp = 0.4,
    }: {
      radius: number;
      windSpeed: number;
      density: number;
      efficiency: number;
      cp?: number;
    }) => {
      return computeAll({ radius, windSpeed, density, efficiency, cp });
    },
    []
  );

  return {
    computePreview,
  };
}


// features/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import windCalculatorReducer from "./windCalculatorSlice";
import themeReducer from "./themeSlice";
import qrReducer from "./qrSlice";
import sensorsSlice from "./sensorsSlice";
import nfsSlice from "./nfsSlice";

/**
 * store.ts - Configuración del store global con Redux Toolkit
 *
 * Notas:
 * - Singleton pattern implícito: configureStore crea el store central.
 * - Tipado: se exportan hooks tipados useAppDispatch y useAppSelector para seguridad en TS.
 * - Observer Pattern: Redux actúa como pub-sub para componentes suscritos.
 */

export const store = configureStore({
  reducer: {
    windCalculator: windCalculatorReducer,
    theme: themeReducer, // 👈 agrega el slice 'theme'
    qr: qrReducer, //
    sensors: sensorsSlice,
    nfs: nfsSlice,
    // otros slices (nfs, sensors, qr, theme) se agregarían aquí según la especificación
  },
});

// Tipos derivados automáticamente a partir del store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hooks tipados para usar en componentes cliente
export const useAppDispatch = () => useDispatch<AppDispatch>(); // hook para dispatch tipado
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; // selector tipado

export default store;

// final

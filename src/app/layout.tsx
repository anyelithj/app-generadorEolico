import "@/styles/globals.css";
import { ReactNode } from "react";
import type { Metadata } from "next";
import ReduxProvider from "../providers/ReduxProvider";

export const metadata: Metadata = {
  title: "Eólico Simulator",
  description: "Aplicación para análisis y simulación de energía eólica",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}

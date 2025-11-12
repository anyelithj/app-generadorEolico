"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react"; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <img src="/images/logo.svg" alt="Logo" className="h-8 w-8" />
          <span className="font-semibold text-xl">Eólico Simulator</span>
        </a>

        <nav className="hidden md:flex gap-4">
          <a href="/" className="hover:underline">Inicio</a>
          <a href="#simulador" className="hover:underline">Simulador</a>
          <a href="/theory" className="hover:underline">Teoría</a>
          <a href="/results" className="hover:underline">Resultados</a>
          <a href="/iot" className="hover:underline">Panel IoT</a>
        </nav>
        <button
          className="md:hidden p-2 rounded hover:bg-gray-100"
          onClick={toggleMenu}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <nav className="md:hidden bg-white shadow-md px-4 py-4 flex flex-col gap-2">
          <a href="/" className="hover:underline" onClick={() => setIsOpen(false)}>Inicio</a>
          <a href="#simulador" className="hover:underline" onClick={() => setIsOpen(false)}>Simulador</a>
          <a href="/theory" className="hover:underline" onClick={() => setIsOpen(false)}>Teoría</a>
          <a href="/results" className="hover:underline" onClick={() => setIsOpen(false)}>Análisis</a>
          <a href="/iot" className="hover:underline" onClick={() => setIsOpen(false)}>Panel IoT</a>
        </nav>
      )}
    </header>
  );
}

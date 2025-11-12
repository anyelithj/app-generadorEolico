"use client";

import React from "react";
import Layout from "../../components/Layout";
import IoTPanel from "../../components/IoTPanel";
import QRGenerator from "../../components/QRGenerator";

export default function IoTPage() {
  return (
    <Layout>
      <section className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Panel IoT</h1>
        <p className="mb-4 text-slate-700">
          Monitoreo y control de sensores, y acceso móvil vía QR.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <IoTPanel />
          </div>

 
          <aside className="flex flex-col h-full"> 
            <QRGenerator />
          </aside>
        </div>
      </section>
    </Layout>
  );
}
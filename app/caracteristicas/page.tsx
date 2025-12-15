"use client";

import Caracteristica from "@/components/Caracteristica";
import { caracteristicas } from "@/app/data/caracteristicas";

export default function CaracteristicasPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8">
      <h2 className="mb-6 text-center text-3xl font-bold text-slate-100">
        Características do React e Next.js
      </h2>

      <ul className="mx-auto max-w-2xl list-disc space-y-2 pl-6">
        {caracteristicas.map((caracteristica, index) => (
          <Caracteristica key={index} index={index} texto={caracteristica} />
        ))}
      </ul>
    </main>
  );
}

"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { caracteristicas } from "@/app/data/caracteristicas";

export default function CaracteristicaPage() {
  const params = useParams();
  const raw = (params?.caracteristica as string | undefined) ?? "";
  const index = Number(raw);

  const ok =
    !Number.isNaN(index) && index >= 0 && index < caracteristicas.length;

  if (!ok) {
    return (
      <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
        <h2 className="text-2xl font-bold">Característica não encontrada.</h2>

        <Link
          href="/caracteristicas"
          className="mt-4 inline-block text-emerald-400 underline"
        >
          Voltar
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 flex items-center justify-center">
      <div className="w-full max-w-xl">
        <p className="text-center text-slate-100 text-lg">
          {caracteristicas[index]}
        </p>

        <div className="mt-6 flex justify-center">
          <Link
            href="/caracteristicas"
            className="rounded-md bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-700 transition"
          >
            Voltar
          </Link>
        </div>
      </div>
    </main>
  );
}

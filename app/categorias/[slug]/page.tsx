"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function CategoriaPage() {
  const params = useParams();
  const slug = (params?.slug as string | undefined) ?? "";

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <h2 className="mb-6 text-center text-3xl font-bold">
        Produtos da categoria
      </h2>

      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <p className="text-slate-300">
          Categoria:{" "}
          <span className="font-semibold text-slate-100">{slug || "—"}</span>
        </p>

        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
          <p className="text-sm text-slate-400">
            Aqui vais mostrar os produtos desta categoria quando integrares a API.
          </p>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="h-32 rounded-xl bg-slate-900/60" />
            <div className="h-32 rounded-xl bg-slate-900/60" />
            <div className="h-32 rounded-xl bg-slate-900/60" />
          </div>
        </div>

        <div className="mt-6">
          <Link
            href="/categorias"
            className="rounded-md bg-slate-800 px-4 py-2 text-sm font-semibold hover:bg-slate-700 transition"
          >
            Voltar
          </Link>
        </div>
      </div>
    </main>
  );
}

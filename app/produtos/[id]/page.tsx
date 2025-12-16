"use client";

import useSWR from "swr";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { Product } from "@/models/interfaces";
import { apiUrl, swrFetcher } from "@/lib/deisishop";
import ProdutoDetalhe from "@/components/ProdutoDetalhe/ProdutoDetalhe";

export default function ProdutoPage() {
  const params = useParams();
  const id = (params?.id as string | undefined) ?? "";

  const url = id ? `${apiUrl}/products/${id}` : null;

  const { data, error, isLoading } = useSWR<Product>(url, swrFetcher);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8">
      <h2 className="mb-8 text-center text-3xl font-bold text-slate-100">
        Produto
      </h2>

      {error && (
        <div className="mx-auto max-w-xl rounded-xl border border-red-700 bg-red-950/40 p-4 text-red-200">
          Erro a obter produto: {error.message}
        </div>
      )}

      {!data && isLoading && (
        <div className="flex justify-center py-10">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-slate-200" />
        </div>
      )}

      {data && (
        <div className="flex justify-center">
          <ProdutoDetalhe product={data} />
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <Link
          href="/produtos"
          className="rounded-md bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-700 transition"
        >
          Voltar à lista
        </Link>
      </div>
    </main>
  );
}

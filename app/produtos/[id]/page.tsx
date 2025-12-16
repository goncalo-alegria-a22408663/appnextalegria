import Link from "next/link";

export default function ProdutosPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <h2 className="mb-6 text-center text-3xl font-bold">
        Produtos (DEISIShop)
      </h2>

      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <p className="text-slate-300">
          Aqui vais apresentar a lista de produtos e as respetivas imagens quando integrares a API.
        </p>

        <div className="mt-6">
          <p className="mb-2 text-sm font-semibold text-slate-200">
            Links de teste (rota dinâmica):
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/produtos/1"
              className="rounded-md bg-slate-800 px-4 py-2 text-sm font-semibold hover:bg-slate-700 transition"
            >
              Ver produto 1
            </Link>

            <Link
              href="/produtos/2"
              className="rounded-md bg-slate-800 px-4 py-2 text-sm font-semibold hover:bg-slate-700 transition"
            >
              Ver produto 2
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

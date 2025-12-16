import Link from "next/link";

export default function CategoriasPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <h2 className="mb-6 text-center text-3xl font-bold">
        Categorias
      </h2>

      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <p className="text-slate-300">
          Aqui vais listar as categorias e os respetivos logos quando integrares a API.
        </p>

        <div className="mt-6">
          <p className="mb-2 text-sm font-semibold text-slate-200">
            Links de teste (rota dinâmica):
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/categorias/tecnologia"
              className="rounded-md bg-slate-800 px-4 py-2 text-sm font-semibold hover:bg-slate-700 transition"
            >
              Categoria: tecnologia
            </Link>

            <Link
              href="/categorias/acessorios"
              className="rounded-md bg-slate-800 px-4 py-2 text-sm font-semibold hover:bg-slate-700 transition"
            >
              Categoria: acessorios
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

import Contador from "@/components/Contador/Contador";

export default function ContadorPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8">
      <h2 className="mb-8 text-center text-3xl font-bold text-slate-100">
        Contador
      </h2>

      <div className="flex justify-center">
        <Contador />
      </div>
    </main>
  );
}

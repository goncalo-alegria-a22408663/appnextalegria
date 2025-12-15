import tecnologiasJson from "../data/tecnologias.json";
import TecnologiaCard from "@/components/TecnologiaCard/TecnologiaCard";
import Link from "next/link";

type Tecnologia = {
  title: string;
  image: string;
  description: string;
  rating: number;
};

const tecnologias = tecnologiasJson as Tecnologia[];

export default function TecnologiasPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8">
      <h2 className="mb-8 text-center text-3xl font-bold text-slate-100">
        Tecnologias Exploradas
      </h2>

      <div className="mt-4 flex flex-wrap justify-center gap-6">
        {tecnologias.map((t, i) => (
          <Link key={t.title} href={`/tecnologias/${i}`} className="block">
            <TecnologiaCard title={t.title} image={t.image} index={i} />
          </Link>
        ))}
      </div>
    </main>
  );
}

"use client";

import tecnologiasJson from "../../data/tecnologias.json";
import TecnologiaDetailsCard from "@/components/TecnologiaDetailsCard/TecnologiaDetailsCard";
import Link from "next/link";
import { useParams } from "next/navigation";

type Tecnologia = {
  title: string;
  image: string;
  description: string;
  rating: number;
};

const tecnologias = tecnologiasJson as Tecnologia[];

export default function TecnologiaPage() {
  const params = useParams();
  const raw = (params?.tecnologia as string | undefined) ?? "";
  const index = Number(raw);

  if (Number.isNaN(index) || index < 0 || index >= tecnologias.length) {
    return (
      <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
        <h2 className="text-2xl font-bold">Tecnologia não encontrada.</h2>

        <Link
          href="/tecnologias"
          className="mt-4 inline-block text-emerald-400 underline"
        >
          Voltar
        </Link>
      </main>
    );
  }

  const tech = tecnologias[index];

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8">
      <TecnologiaDetailsCard
        title={tech.title}
        image={tech.image}
        description={tech.description}
        rating={tech.rating}
        index={index}
      />

      <div className="mt-6 flex justify-center">
        <Link
          href="/tecnologias"
          className="rounded-md bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-700 transition"
        >
          Voltar
        </Link>
      </div>
    </main>
  );
}

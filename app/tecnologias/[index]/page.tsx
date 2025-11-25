import React from 'react';
import Link from 'next/link';
import tecnologias from '@/app/data/tecnologias.json';
import TecnologiaDetailsCard, {
  Tecnologia,
} from '@/components/TecnologiaDetailsCard';

type TecnologiaPageProps = {
  params: {
    index: string;
  };
};

const tecnologiasData: Tecnologia[] = JSON.parse(
  JSON.stringify(tecnologias)
);

export default function TecnologiaPage({ params }: TecnologiaPageProps) {
  const idx = parseInt(params.index, 10);

  const tecnologia = tecnologiasData[idx];

  if (!tecnologia) {
    return (
      <main className="min-h-screen bg-slate-950 px-4 py-8 text-center text-slate-100">
        <p>Tecnologia não encontrada.</p>
        <Link
          href="/tecnologias"
          className="mt-4 inline-block rounded-md bg-emerald-500 px-4 py-2 text-slate-950 font-semibold"
        >
          Voltar às tecnologias
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8">
      <TecnologiaDetailsCard tecnologia={tecnologia} />

      <div className="mt-6 text-center">
        <Link
          href="/tecnologias"
          className="inline-block rounded-md bg-emerald-500 px-4 py-2 text-slate-950 font-semibold hover:bg-emerald-400 transition"
        >
          Voltar
        </Link>
      </div>
    </main>
  );
}

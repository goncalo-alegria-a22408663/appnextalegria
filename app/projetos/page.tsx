import React from 'react';
import DescricaoProjetos from '@/components/DescricaoProjetos'

export default function ProjetosPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8">
      <h2 className="mb-6 text-center text-3xl font-bold text-slate-100">
        Projetos
      </h2>

      <DescricaoProjetos/>
    </main>
  );
}

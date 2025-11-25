import React from 'react';

type ProjetoProps = {
  nome: string;
  url: string;
};

const Projeto: React.FC<ProjetoProps> = ({ nome, url }) => {
  return (
    <article className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-900/80 p-4 shadow">
      <p className="text-sm text-slate-200">
        {' '}
        <span className="font-semibold text-slate-50">{nome}</span>.
      </p>

      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="inline-flex w-fit items-center justify-center rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition"
      >
        Ver projeto
      </a>
    </article>
  );
};

export default Projeto;

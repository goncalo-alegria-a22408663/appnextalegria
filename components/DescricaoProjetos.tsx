import React from 'react';
import Projeto from './Projeto';

const DescricaoProjetos: React.FC = () => {
  return (
    <section className="space-y-6">
      <p className="text-slate-200">
        Ao longo da disciplina desenvolvi vários projetos, todos publicados no
        GitHub Pages.
      </p>

      <p className="text-slate-200">
        Podes ver todos os projetos na minha homepage de GitHub Pages:{' '}
        <a
          href="https://github.com/goncalo-alegria-a22408663?tab=repositories"
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-emerald-400 hover:underline"
        >
          abrir GitHub Pages
        </a>
        .
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        
        <Projeto
          nome="Loja de Produtos (DIW)"
          url="https://github.com/goncalo-alegria-a22408663/goncalo-alegria-a22408663.github.io"
        />

       
      </div>
    </section>
  );
};

export default DescricaoProjetos;

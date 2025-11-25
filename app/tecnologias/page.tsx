import React from 'react';
import Image from 'next/image';
import tecnologias from '@/app/data/tecnologias.json';

type Tecnologia = {
  title: string;
  image: string;
  description: string;
  rating: number;
};

const tecnologiasData: Tecnologia[] = JSON.parse(
  JSON.stringify(tecnologias)
);

const Tecnologias: React.FC = () => {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8">
      <h2 className="mb-8 text-center text-3xl font-bold text-slate-100">
        Tecnologias Exploradas
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tecnologiasData.map((tech) => (
          <article
            key={tech.title}
            className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg"
          >
            
            <div className="flex items-center gap-4">
              <Image
                src={`/tecnologias/${tech.image}`}
                alt={`Logotipo de ${tech.title}`}
                width={200}
                height={200}
              />

              <div>
                <h3 className="text-lg font-semibold text-slate-50">
                  {tech.title}
                </h3>
                <p className="text-sm text-amber-400">
                  {'★'.repeat(tech.rating)}
                  {'☆'.repeat(5 - tech.rating)}
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-slate-200">
              {tech.description}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
};

export default Tecnologias;

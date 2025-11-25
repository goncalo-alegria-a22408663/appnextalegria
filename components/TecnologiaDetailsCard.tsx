import React from 'react';
import Image from 'next/image';

export type Tecnologia = {
  title: string;
  image: string;
  description: string;
  rating: number;
};

type Props = {
  tecnologia: Tecnologia;
};

const TecnologiaDetailsCard: React.FC<Props> = ({ tecnologia }) => {
  return (
    <article className="mx-auto max-w-md rounded-xl border border-slate-800 bg-slate-900/90 p-6 shadow-lg flex flex-col items-center gap-4">
      <Image
        src={`/tecnologias/${tecnologia.image}`}
        alt={tecnologia.title}
        width={200}
        height={200}
      />

      <h2 className="text-2xl font-bold text-slate-50">
        {tecnologia.title}
      </h2>

      <p className="text-sm text-slate-200 text-center">
        {tecnologia.description}
      </p>

      <p className="text-amber-400 text-lg">
        {'★'.repeat(tecnologia.rating)}
        {'☆'.repeat(5 - tecnologia.rating)}
      </p>
    </article>
  );
};

export default TecnologiaDetailsCard;

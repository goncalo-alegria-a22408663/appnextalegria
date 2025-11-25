import React from 'react';
import Link from 'next/link';

export interface CaracteristicaProps {
  texto: string;
}

const Caracteristica: React.FC<CaracteristicaProps> = ({ texto }) => {
  return (
    <Link
      href={`/caracteristicas/${encodeURIComponent(texto)}`}
      className="block"
    >
      <div className="w-64 h-20 rounded-xl bg-slate-900 border border-slate-800 shadow flex items-center justify-center px-4 hover:border-emerald-400 transition">
        <span className="text-slate-50 text-center font-medium">
          {texto}
        </span>
      </div>
    </Link>
  );
};

export default Caracteristica;

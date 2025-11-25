import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface TecnologiaCardProps {
  title: string;
  image: string;
  index: number;
}

const TecnologiaCard: React.FC<TecnologiaCardProps> = ({ title, image, index, }) => {
  return (
    <Link href={`/tecnologia/${index}`} className="block">
      <div className="w-60 h-60 rounded-xl bg-slate-900 border border-slate-800 shadow flex flex-col items-center justify-center gap-4 p-4 hover:border-emerald-400 transition">
        <Image
          src={`/tecnologias/${image}`} 
          alt={title} width={120} height={120}/>

        <h3 className="text-center text-lg font-semibold text-slate-50">
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default TecnologiaCard;

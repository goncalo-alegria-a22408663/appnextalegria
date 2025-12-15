import Link from "next/link";

export type CaracteristicaProps = {
  index: number;
  texto: string;
};

export default function Caracteristica({ index, texto }: CaracteristicaProps) {
  return (
    <Link
      href={`/caracteristicas/${index}`}
      className="block w-full max-w-xl"
    >
      <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 text-slate-100 hover:bg-slate-900 transition">
        <p className="text-base">{texto}</p>
      </div>
    </Link>
  );
}

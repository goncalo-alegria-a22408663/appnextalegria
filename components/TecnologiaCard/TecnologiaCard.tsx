import Image from "next/image";

export type TecnologiaCardProps = {
  title: string;
  image: string;
  index: number;
};

export default function TecnologiaCard({ title, image }: TecnologiaCardProps) {
  return (
    <div className="bg-blue-300 p-4 m-2 rounded-2xl w-56 h-56 flex flex-col items-center justify-center gap-3">
      <p className="font-bold">{title}</p>

      <Image
        src={`/tecnologias/${image}`}
        alt={`Logotipo do ${title}`}
        width={90}
        height={90}
      />
    </div>
  );
}

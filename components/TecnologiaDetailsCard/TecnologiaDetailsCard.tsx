import Image from "next/image";

export type TecnologiaDetailsCardProps = {
  title: string;
  image: string;
  description: string;
  rating: number;
  index: number;
};

export default function TecnologiaDetailsCard({
  title,
  image,
  description,
  rating,
}: TecnologiaDetailsCardProps) {
  return (
    <div className="bg-blue-200/70 rounded-2xl p-6 text-center flex flex-col items-center gap-4">
      <h2 className="text-xl font-bold">{title}</h2>

      <Image
        src={`/tecnologias/${image}`}
        alt={`Logotipo do ${title}`}
        width={110}
        height={110}
      />

      <p>{description}</p>
      <p className="font-semibold">Rating: {rating}</p>
    </div>
  );
}

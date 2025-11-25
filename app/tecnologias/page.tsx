import tecnologias from '@/app/data/tecnologias.json';
import TecnologiaCard, {
  TecnologiaCardProps,
} from '@/components/TecnologiaCard';

type TecnologiaExtra = {
  description: string;
  rating: number;
};

type Tecnologia = TecnologiaCardProps & TecnologiaExtra;

const tecnologiasData: Tecnologia[] = JSON.parse(
  JSON.stringify(tecnologias)
);

export default function TecnologiasPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8">
      <h2 className="mb-8 text-center text-3xl font-bold text-slate-100">
        Tecnologias Exploradas
      </h2>

      <div className="flex flex-wrap justify-center gap-6">
        {tecnologiasData.map((tech, index) => (
          <TecnologiaCard
            key={tech.title}
            title={tech.title}
            image={tech.image}
            index={index}
          />
        ))}
      </div>
    </main>
  );
}

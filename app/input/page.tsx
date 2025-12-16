import InputPageClient from '@/components/InputPage/InputPageClient';

export default function InputPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8">
      <h2 className="mb-8 text-center text-3xl font-bold text-slate-100">
        Input
      </h2>

      <div className="flex justify-center">
        <InputPageClient />
      </div>
    </main>
  );
}

import Image from "next/image";
import type { Product } from "@/models/interfaces";
import { toAbsoluteUrl } from "@/lib/deisishop";

type Props = {
  product: Product;
};

export default function ProdutoDetalhe({ product }: Props) {
  const img = toAbsoluteUrl(product.image);

  return (
    <div className="w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/70 p-6 text-slate-100">
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex justify-center rounded-xl bg-slate-950/60 p-4 md:w-1/2">
          <Image src={img} alt={product.title} width={320} height={320} />
        </div>

        <div className="flex flex-1 flex-col gap-3">
          <h3 className="text-2xl font-bold">{product.title}</h3>

          <p className="text-slate-300">{product.description}</p>

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-200">
              Categoria: {product.category}
            </span>

            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-semibold text-emerald-300">
              Preço: {product.price}€
            </span>
          </div>

          <div className="mt-2 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <p className="text-sm font-semibold text-slate-200">Rating</p>
            <p className="mt-1 text-sm text-slate-300">
              Rate: <span className="font-semibold text-slate-100">{product.rating.rate}</span>
              {"  "} | {"  "}
              Count: <span className="font-semibold text-slate-100">{product.rating.count}</span>
            </p>
          </div>

          <p className="text-xs text-slate-400">
            ID: {product.id}
          </p>
        </div>
      </div>
    </div>
  );
}

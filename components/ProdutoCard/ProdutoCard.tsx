"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Product } from "@/models/interfaces";
import { toAbsoluteUrl } from "@/lib/deisishop";

type Props = {
  product: Product;
  variant?: "list" | "cart";
  quantity?: number;

  onAddToCart?: (product: Product) => void;
  onRemoveOneFromCart?: (productId: number) => void;
};

export default function ProdutoCard({
  product,
  variant = "list",
  quantity,
  onAddToCart,
  onRemoveOneFromCart,
}: Props) {
  const img = toAbsoluteUrl(product.image);
  const router = useRouter();

  

  return (
    <div className="w-64 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
      <Link href={`/produtos/${product.id}`} className="block">
        <div className="flex flex-col items-center gap-3">
          <p className="text-center font-bold text-slate-100">{product.title}</p>

          <div className="flex h-40 w-full items-center justify-center rounded-xl bg-slate-950/60 p-3">
            <Image src={img} alt={product.title} width={160} height={160} />
          </div>

          <p className="font-semibold text-emerald-400">{Number(product.price).toFixed(2)}€</p>

          {variant === "cart" && typeof quantity === "number" && (
            <p className="text-sm text-slate-300">
              Quantidade: <span className="font-semibold text-slate-100">{quantity}</span>
            </p>
          )}
        </div>
      </Link>

      <div className="mt-4 flex justify-center gap-2">
        {variant === "list" ? (
          <button
            onClick={() => onAddToCart?.(product)}
            className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition"
          >
            Adicionar
          </button>
          
        ) : (
          <button
            onClick={() => onRemoveOneFromCart?.(product.id)}
            className="rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-red-400 transition"
          >
            Remover 1
          </button>
        )}
      </div>


    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import type { Product } from "@/models/interfaces";
import { toAbsoluteUrl } from "@/lib/deisishop";

const STORAGE_KEY = "produtosRecentes";
const MAX_ITEMS = 5;

export function addProdutoRecente(product: Product) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const arr: Product[] = raw ? JSON.parse(raw) : [];

    const filtered = arr.filter((p) => p.id !== product.id);
    filtered.unshift(product);
    const finalArr = filtered.slice(0, MAX_ITEMS);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(finalArr));
    window.dispatchEvent(new CustomEvent("produtosRecentesUpdated"));
  } catch (e) {
    // ignore
  }
}

function ProdutoRecenteCard({ product }: { product: Product }) {
  const img = toAbsoluteUrl(product.image);

  return (
    <div className="min-w-[160px] shrink-0 rounded-xl border border-slate-800 bg-slate-900/60 p-3 flex flex-col items-center gap-2">
      <div className="flex items-center justify-center">
        <Image src={img} alt={product.title} width={120} height={120} />
      </div>
      <p className="text-sm font-semibold text-emerald-400">{Number(product.price).toFixed(2)}€</p>
    </div>
  );
}

export default function ProdutosRecentes() {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    function read() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const arr: Product[] = raw ? JSON.parse(raw) : [];
        setItems(arr.slice(0, MAX_ITEMS));
      } catch {
        setItems([]);
      }
    }

    read();
    const onUpdate = () => read();
    window.addEventListener("produtosRecentesUpdated", onUpdate);
    window.addEventListener("storage", onUpdate);
    return () => {
      window.removeEventListener("produtosRecentesUpdated", onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, []);

  if (!items || items.length === 0) return null;

  return (
    <section className="mb-8">
      <h3 className="mb-3 text-lg font-bold text-slate-100">Últimos produtos vistos</h3>

      <div className="flex gap-4 overflow-x-auto py-2">
        {items.map((p) => (
          <ProdutoRecenteCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

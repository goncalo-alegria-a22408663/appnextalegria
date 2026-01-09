"use client";

import useSWR from "swr";
import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/models/interfaces";
import { apiUrl, swrFetcher } from "@/lib/deisishop";
import ProdutoCard from "@/components/ProdutoCard/ProdutoCard";

const PRODUCTS_URL = `${apiUrl}/products`;
const BUY_URL = `${apiUrl}/buy`;
const CART_KEY = "deisishop_cart";

type SortOption = "name-asc" | "name-desc" | "price-asc" | "price-desc";

type CartItem = { product: Product; quantity: number };

type PurchaseInfo = {
  subtotal: number;
  totalCost: number | null;
  reference?: string;
  message?: string;
  error?: string;
};

function readCartFromStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    const parsed = raw ? JSON.parse(raw) : [];

    // formato novo: [{ product, quantity }]
    if (
      Array.isArray(parsed) &&
      parsed.every((it) => it?.product?.id != null && typeof it.quantity === "number")
    ) {
      return parsed;
    }

    // formato antigo: [Product]
    if (Array.isArray(parsed) && parsed.every((p) => p?.id != null && p?.title != null)) {
      return parsed.map((p) => ({ product: p, quantity: 1 }));
    }
  } catch {}

  return [];
}

export default function ProdutosPage() {
  const { data, error, isLoading } = useSWR<Product[]>(PRODUCTS_URL, swrFetcher);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("name-asc");

  const [cart, setCart] = useState<CartItem[]>([]);

  const [name, setName] = useState("");
  const [student, setStudent] = useState(false);
  const [coupon, setCoupon] = useState("");

  const [buying, setBuying] = useState(false);
  const [buyError, setBuyError] = useState<string | null>(null);
  const [purchaseInfo, setPurchaseInfo] = useState<PurchaseInfo | null>(null);

  const resetBuyUI = () => (setBuyError(null), setPurchaseInfo(null));
  const discountActive = student || coupon.trim().length > 0;

  useEffect(() => setCart(readCartFromStorage()), []);
  useEffect(() => localStorage.setItem(CART_KEY, JSON.stringify(cart)), [cart]);

  const shownProducts = useMemo(() => {
    if (!data) return [];
    const q = search.toLowerCase().trim();

    const filtered = !q ? data : data.filter((p) => p.title.toLowerCase().includes(q));

    return [...filtered].sort((a, b) => {
      switch (sort) {
        case "name-asc":
          return a.title.localeCompare(b.title);
        case "name-desc":
          return b.title.localeCompare(a.title);
        case "price-asc":
          return Number(a.price) - Number(b.price);
        case "price-desc":
          return Number(b.price) - Number(a.price);
      }
    });
  }, [data, search, sort]);

  function addToCart(product: Product) {
    resetBuyUI();
    setCart((prev) => {
      const found = prev.find((it) => it.product.id === product.id);
      return found
        ? prev.map((it) =>
            it.product.id === product.id ? { ...it, quantity: it.quantity + 1 } : it
          )
        : [...prev, { product, quantity: 1 }];
    });
  }

  function removeOneFromCart(productId: number) {
    resetBuyUI();
    setCart((prev) =>
      prev
        .map((it) =>
          it.product.id === productId ? { ...it, quantity: it.quantity - 1 } : it
        )
        .filter((it) => it.quantity > 0)
    );
  }

  const subtotal = cart.reduce(
    (sum, it) => sum + Number(it.product.price) * it.quantity,
    0
  );

  const savings =
    purchaseInfo?.totalCost != null ? purchaseInfo.subtotal - purchaseInfo.totalCost : null;

  async function handleBuy() {
    if (cart.length === 0 || !name.trim()) return;

    setBuying(true);
    setBuyError(null);

    const subtotalNow = subtotal;
    const productIds = cart.flatMap((it) =>
      Array.from({ length: it.quantity }, () => it.product.id)
    );

    try {
      const res = await fetch(BUY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          products: productIds,
          name: name.trim(),
          student,
          coupon: coupon.trim(),
        }),
      });

      if (!res.ok) throw new Error((await res.text().catch(() => "")) || res.statusText);

      const json = await res.json();
      const apiTotal = json?.totalCost != null ? Number(json.totalCost) : null;

      setPurchaseInfo({
        subtotal: subtotalNow,
        totalCost: apiTotal,
        reference: json?.reference,
        message: json?.message,
        error: json?.error,
      });

      setCart([]);
      localStorage.setItem(CART_KEY, "[]");
    } catch (e: any) {
      setBuyError(e?.message ?? "Erro ao comprar");
    } finally {
      setBuying(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8">
      <h2 className="mb-6 text-center text-3xl font-bold text-slate-100">
        Produtos (DEISIShop)
      </h2>

      {/* Pesquisa + Ordenação */}
      <div className="mx-auto mb-8 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-200">
            Pesquisa
          </label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar produtos pelo nome..."
            className="w-full rounded-md border border-slate-800 bg-slate-900/70 px-4 py-3 text-slate-100 outline-none focus:border-emerald-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-200">
            Ordenação
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="w-full rounded-md border border-slate-800 bg-slate-900/70 px-4 py-3 text-slate-100 outline-none focus:border-emerald-400"
          >
            <option value="name-asc">Nome (A → Z)</option>
            <option value="name-desc">Nome (Z → A)</option>
            <option value="price-asc">Preço (crescente)</option>
            <option value="price-desc">Preço (decrescente)</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="mx-auto max-w-xl rounded-xl border border-red-700 bg-red-950/40 p-4 text-red-200">
          Erro a obter produtos: {error.message}
        </div>
      )}

      {!data && isLoading && (
        <div className="flex justify-center py-10">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-slate-200" />
        </div>
      )}

      {/* LISTA DE PRODUTOS */}
      {data && (
        <section>
          <h3 className="mb-4 text-xl font-bold text-slate-100">Produtos</h3>

          {shownProducts.length ? (
            <div className="flex flex-wrap justify-center gap-6">
              {shownProducts.map((p) => (
                <ProdutoCard
                  key={p.id}
                  product={p}
                  variant="list"
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-300">
              Nenhum produto encontrado{search.trim() ? ` para “${search}”` : ""}.
            </p>
          )}
        </section>
      )}

      {/* CARRINHO + COMPRAR */}
      <section className="mx-auto mt-12 w-full max-w-6xl rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-xl font-bold text-slate-100">Carrinho</h3>

          <div className="text-left sm:text-right">
            <p className="text-sm text-slate-300">
              Subtotal:{" "}
              <span className="font-semibold text-slate-100">
                {subtotal.toFixed(2)}€
              </span>
            </p>

            {purchaseInfo?.totalCost != null && discountActive && (
              <>
                <p className="text-sm font-semibold text-emerald-300">
                  Total (compra): {purchaseInfo.totalCost.toFixed(2)}€
                </p>
                {savings != null && savings > 0 && (
                  <p className="text-xs text-emerald-200">
                    Poupança: {savings.toFixed(2)}€
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        <div className="mb-6 space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h4 className="text-lg font-bold text-slate-100">Finalizar compra</h4>
                <p className="text-sm text-slate-400">
                  Confirma os dados e finaliza o pedido.
                </p>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-xs text-slate-400">Subtotal</p>
                <p className="font-semibold text-slate-100">{subtotal.toFixed(2)}€</p>

                {purchaseInfo?.totalCost != null && discountActive && (
                  <>
                    <p className="mt-2 text-xs text-slate-400">Total (desconto)</p>
                    <p className="font-semibold text-emerald-300">
                      {purchaseInfo.totalCost.toFixed(2)}€
                    </p>
                    {savings != null && savings > 0 && (
                      <p className="text-xs text-emerald-200">
                        Poupança: {savings.toFixed(2)}€
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-200">
                  Nome
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="O teu nome"
                  className="w-full rounded-md border border-slate-800 bg-slate-900/70 px-3 py-2 text-slate-100 outline-none focus:border-emerald-400"
                />
              </div>

              <label className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 p-3 text-slate-100">
                <input
                  type="checkbox"
                  checked={student}
                  onChange={(e) => setStudent(e.target.checked)}
                  className="h-4 w-4"
                />
                Estudante DEISI
              </label>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-200">
                  Cupão de desconto
                </label>
                <input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="ex: DEISI10"
                  className="w-full rounded-md border border-slate-800 bg-slate-900/70 px-3 py-2 text-slate-100 outline-none focus:border-emerald-400"
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  onClick={handleBuy}
                  disabled={buying || cart.length === 0 || !name.trim()}
                  className="w-full rounded-md bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {buying ? "A comprar..." : "Comprar"}
                </button>

                {!name.trim() && (
                  <p className="mt-2 text-xs text-slate-400">
                    Preenche o nome para comprar.
                  </p>
                )}

                {buyError && (
                  <div className="mt-3 rounded-xl border border-red-700 bg-red-950/40 p-3 text-sm text-red-200">
                    Erro ao comprar: {buyError}
                  </div>
                )}
              </div>
            </div>
          </div>

          {purchaseInfo && (
            <div className="rounded-2xl border border-emerald-700 bg-emerald-950/20 p-5 text-emerald-200">
              <p className="text-lg font-semibold">Compra registada ✅</p>

              {purchaseInfo.message && (
                <p className="mt-2 text-slate-100">{purchaseInfo.message}</p>
              )}

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-3">
                  <p className="text-xs text-slate-400">Subtotal</p>
                  <p className="font-semibold text-slate-100">
                    {purchaseInfo.subtotal.toFixed(2)}€
                  </p>
                </div>

                <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-3">
                  <p className="text-xs text-slate-400">Total</p>
                  <p className="font-semibold text-emerald-200">
                    {(purchaseInfo.totalCost ?? purchaseInfo.subtotal).toFixed(2)}€
                  </p>
                </div>

                <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-3">
                  <p className="text-xs text-slate-400">Referência</p>
                  <p className="font-semibold text-slate-100">
                    {purchaseInfo.reference ?? "—"}
                  </p>
                </div>
              </div>

              {savings != null && savings > 0 && (
                <p className="mt-3 text-sm text-emerald-300">
                  Poupaste{" "}
                  <span className="font-semibold">{savings.toFixed(2)}€</span>.
                </p>
              )}

              {purchaseInfo.error && (
                <p className="mt-3 text-sm text-red-200">Aviso: {purchaseInfo.error}</p>
              )}
            </div>
          )}
        </div>

        {cart.length === 0 ? (
          <p className="text-slate-300">Carrinho vazio.</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-6">
            {cart.map((it) => (
              <ProdutoCard
                key={it.product.id}
                product={it.product}
                variant="cart"
                quantity={it.quantity}
                onRemoveOneFromCart={removeOneFromCart}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

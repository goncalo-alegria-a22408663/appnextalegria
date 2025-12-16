"use client";

import { useEffect, useMemo, useState } from "react";

const LS_VALUE = "contador:value";
const LS_HISTORY = "contador:history";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function Contador() {
  const [value, setValue] = useState<number>(0);
  const [history, setHistory] = useState<number[]>([]);

  // carregar do localStorage (só no client)
  useEffect(() => {
    try {
      const vRaw = localStorage.getItem(LS_VALUE);
      const hRaw = localStorage.getItem(LS_HISTORY);

      const v = vRaw !== null ? Number(vRaw) : 0;
      const h = hRaw ? (JSON.parse(hRaw) as unknown) : [];

      setValue(Number.isFinite(v) ? clamp(v, 0, 10) : 0);
      setHistory(Array.isArray(h) ? (h.filter((x) => Number.isFinite(x)) as number[]) : []);
    } catch {
      setValue(0);
      setHistory([]);
    }
  }, []);

  // guardar no localStorage
  useEffect(() => {
    localStorage.setItem(LS_VALUE, String(value));
  }, [value]);

  useEffect(() => {
    localStorage.setItem(LS_HISTORY, JSON.stringify(history));
  }, [history]);

  const colorClass = useMemo(() => {
    if (value >= 0 && value <= 3) return "text-red-500";
    if (value >= 4 && value <= 7) return "text-yellow-400";
    return "text-green-500"; // 8..10
  }, [value]);

  function pushHistory(next: number) {
    setHistory((prev) => [...prev, next]);
  }

  function inc() {
    setValue((prev) => {
      const next = clamp(prev + 1, 0, 10);
      if (next !== prev) pushHistory(next);
      return next;
    });
  }

  function dec() {
    setValue((prev) => {
      const next = clamp(prev - 1, 0, 10);
      if (next !== prev) pushHistory(next);
      return next;
    });
  }

  function reset() {
    setValue(0);
    pushHistory(0);
  }

  return (
    <section className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900/80 p-6 text-slate-100 shadow">
      <div className="flex flex-col items-center gap-4">
        <div className={`text-6xl font-extrabold ${colorClass}`}>{value}</div>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={dec}
            className="rounded-md bg-slate-800 px-4 py-2 text-sm font-semibold hover:bg-slate-700 transition"
          >
            Decrementar
          </button>

          <button
            onClick={reset}
            className="rounded-md bg-slate-800 px-4 py-2 text-sm font-semibold hover:bg-slate-700 transition"
          >
            Reset
          </button>

          <button
            onClick={inc}
            className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition"
          >
            Incrementar
          </button>
        </div>

        <div className="w-full">
          <h3 className="mb-2 text-lg font-bold">Histórico</h3>
          {history.length === 0 ? (
            <p className="text-sm text-slate-400">Ainda não há valores no histórico.</p>
          ) : (
            <ul className="list-disc pl-6 text-sm text-slate-200 space-y-1">
              {history.map((n, i) => (
                <li key={`${n}-${i}`}>{n}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

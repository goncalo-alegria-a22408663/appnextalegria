"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  title: string;
};

function storageKey(title: string) {
  return `likes:${title}`;
}

export default function ContadorPersonalizado({ title }: Props) {
  const key = useMemo(() => storageKey(title), [title]);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      const n = raw !== null ? Number(raw) : 0;
      setCount(Number.isFinite(n) ? n : 0);
    } catch {
      setCount(0);
    }
  }, [key]);

  function like() {
    setCount((prev) => {
      const next = prev + 1;
      localStorage.setItem(key, String(next));
      return next;
    });
  }

  return (
    <button
      onClick={like}
      className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition"
    >
      ❤️ {count}
    </button>
  );
}

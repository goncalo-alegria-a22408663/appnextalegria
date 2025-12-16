"use client";

import { useEffect, useState } from "react";

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export default function Relogio() {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const h = pad2(now.getHours());
  const m = pad2(now.getMinutes());
  const s = pad2(now.getSeconds());

  return (
    <div className="text-sm text-slate-300">
      {h}:{m}:{s}
    </div>
  );
}

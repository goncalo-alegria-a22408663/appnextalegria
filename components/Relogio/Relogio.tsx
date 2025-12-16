"use client";

import { useEffect, useState } from "react";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function Relogio() {


  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`);
    };

    tick(); 
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="text-sm text-slate-300 tabular-nums">
      {time}
    </div>
  );
}

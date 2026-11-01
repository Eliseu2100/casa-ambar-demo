"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// O Three.js (~600 KB) só baixa quando a seção chega perto da tela.
const EstudoDeSol = dynamic(() => import("./EstudoDeSol"), { ssr: false });

export function EstudoDeSolLazy() {
  const ref = useRef<HTMLDivElement>(null);
  const [carregar, setCarregar] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observador = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setCarregar(true);
          observador.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    observador.observe(el);
    return () => observador.disconnect();
  }, []);

  return (
    <div ref={ref} className="min-h-[300px]">
      {carregar ? <EstudoDeSol /> : <div className="aspect-[5/4] bg-papel sm:aspect-[4/3] lg:w-2/3" aria-hidden />}
    </div>
  );
}

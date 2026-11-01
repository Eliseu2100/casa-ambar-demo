"use client";

import { useEffect } from "react";

// Marca com .in os elementos [data-reveal] quando 30% deles entra na tela.
// A classe .js (que esconde antes de revelar) só entra aqui: se o JavaScript falhar, nada fica escondido.
export function Revelar() {
  useEffect(() => {
    const alvos = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!("IntersectionObserver" in window)) return;
    document.documentElement.classList.add("js");
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            observador.unobserve(e.target);
          }
        }
      },
      { threshold: 0.3 },
    );
    alvos.forEach((el) => observador.observe(el));
    return () => observador.disconnect();
  }, []);

  return null;
}

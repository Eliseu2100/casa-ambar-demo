"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

// Abertura em que o vídeo da fachada avança conforme a rolagem (quadros em /film).
const TOTAL_QUADROS = 80;
// d = 1280 px (computador), m = 720 px (celular)
const quadro = (i: number, pasta: "d" | "m") => `/film/${pasta}/f-${String(i + 1).padStart(3, "0")}.webp`;

function suave(inicio: number, fim: number, x: number) {
  const t = Math.min(Math.max((x - inicio) / (fim - inicio), 0), 1);
  return t * t * (3 - 2 * t);
}

export function FilmeRolagem({ children, final }: { children: React.ReactNode; final: React.ReactNode }) {
  const reduzir = useReducedMotion();
  const secaoRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textoRef = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);
  const dicaRef = useRef<HTMLParagraphElement>(null);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    if (reduzir) return;
    const secao = secaoRef.current;
    const canvas = canvasRef.current;
    if (!secao || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imagens: (HTMLImageElement | null)[] = Array(TOTAL_QUADROS).fill(null);
    let cancelado = false;
    let ultimoDesenhado = -1;
    let pedido = 0;

    const desenhar = (indice: number) => {
      let i = indice;
      while (i > 0 && !imagens[i]) i--;
      const img = imagens[i];
      if (!img || i === ultimoDesenhado) return;
      ultimoDesenhado = i;
      const { width: lc, height: ac } = canvas;
      const escala = Math.max(lc / img.naturalWidth, ac / img.naturalHeight);
      const l = img.naturalWidth * escala;
      const a = img.naturalHeight * escala;
      ctx.drawImage(img, (lc - l) * 0.6, (ac - a) / 2, l, a);
    };

    const progresso = () => {
      const caixa = secao.getBoundingClientRect();
      const total = secao.offsetHeight - window.innerHeight;
      return total > 0 ? Math.min(Math.max(-caixa.top / total, 0), 1) : 0;
    };

    const atualizar = () => {
      pedido = 0;
      const p = progresso();
      desenhar(Math.round(p * (TOTAL_QUADROS - 1)));
      const sumir = 1 - suave(0.06, 0.32, p);
      if (textoRef.current) {
        textoRef.current.style.opacity = String(sumir);
        textoRef.current.style.transform = `translateY(${-p * 60}px)`;
      }
      if (dicaRef.current) dicaRef.current.style.opacity = String(1 - suave(0, 0.08, p));
      if (finalRef.current) {
        const aparecer = suave(0.72, 0.92, p);
        finalRef.current.style.opacity = String(aparecer);
        finalRef.current.style.transform = `translateY(${(1 - aparecer) * 24}px)`;
        finalRef.current.style.pointerEvents = aparecer > 0.5 ? "auto" : "none";
      }
    };
    const agendar = () => {
      if (!pedido) pedido = requestAnimationFrame(atualizar);
    };

    const redimensionar = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      ultimoDesenhado = -1;
      agendar();
    };

    // Carrega os quadros em ordem; o primeiro libera o canvas.
    const pasta = window.innerWidth < 768 ? "m" : "d";
    (async () => {
      for (let i = 0; i < TOTAL_QUADROS && !cancelado; i++) {
        const img = new window.Image();
        img.decoding = "async";
        img.src = quadro(i, pasta);
        try {
          await img.decode();
        } catch {
          continue;
        }
        if (cancelado) return;
        imagens[i] = img;
        if (i === 0) setPronto(true);
        ultimoDesenhado = -1;
        agendar();
      }
    })();

    redimensionar();
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", redimensionar);
    return () => {
      cancelado = true;
      if (pedido) cancelAnimationFrame(pedido);
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", redimensionar);
    };
  }, [reduzir]);

  const estatico = reduzir === true;

  return (
    <section id="inicio" ref={secaoRef} className={`relative bg-mata text-papel ${estatico ? "" : "h-[260svh]"}`}>
      <div className={`${estatico ? "relative min-h-[94svh]" : "sticky top-0 h-[100svh]"} flex items-end overflow-hidden`}>
        <Image
          src="/images/fachada-2400.webp"
          alt="Casa modernista de concreto e vidro ao entardecer, com jardim tropical e espelho d'água"
          fill
          priority
          sizes="100vw"
          className="hero-foto object-cover object-[60%_center]"
        />
        {!estatico && (
          <canvas
            ref={canvasRef}
            aria-hidden
            className={`absolute inset-0 size-full transition-opacity duration-700 ${pronto ? "opacity-100" : "opacity-0"}`}
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(20_24_20/0.82)_0%,rgb(20_24_20/0.35)_45%,rgb(20_24_20/0.15)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(20_24_20/0.55)_0%,rgb(20_24_20/0.2)_45%,transparent_70%)]" />

        <div ref={textoRef} className="relative w-full will-change-transform">
          {children}
        </div>

        {!estatico && (
          <>
            <div
              ref={finalRef}
              className="pointer-events-none absolute inset-x-0 bottom-0 opacity-0"
            >
              {final}
            </div>
            <p
              ref={dicaRef}
              className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-[0.14em] text-papel/70 uppercase"
            >
              Role para chegar à casa
            </p>
          </>
        )}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Play } from "@phosphor-icons/react";
import { criarCena, fachadasComSol, posicaoDoSol, type Estacao } from "./cena";

type Cena = ReturnType<typeof criarCena>;

function temWebGL() {
  try {
    const teste = document.createElement("canvas");
    return !!(teste.getContext("webgl2") || teste.getContext("webgl"));
  } catch {
    return false;
  }
}

function formatarHora(h: number) {
  const horas = Math.floor(h);
  const minutos = Math.round((h - horas) * 60);
  return `${String(horas).padStart(2, "0")}:${String(minutos).padStart(2, "0")}`;
}

export default function EstudoDeSol() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cenaRef = useRef<Cena | null>(null);
  const animacaoRef = useRef<number | null>(null);
  const reduzir = useReducedMotion();
  const [hora, setHora] = useState(9);
  const [estacao, setEstacao] = useState<Estacao>("inverno");
  // Componente só roda no navegador (carregado com ssr: false), então dá para testar o WebGL aqui.
  const [semWebGL] = useState(() => !temWebGL());
  const comSol = fachadasComSol(posicaoDoSol(hora, estacao)).map((f) => `${f.nome} (${f.lado})`);

  // Cria a cena uma vez; pausa quando sai da tela.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || semWebGL) return;
    let cena: Cena;
    try {
      cena = criarCena(canvas, { leve: window.innerWidth < 768, girar: !reduzir });
    } catch {
      return;
    }
    cenaRef.current = cena;
    const aoRedimensionar = () => cena.redimensionar();
    window.addEventListener("resize", aoRedimensionar);
    const observador = new IntersectionObserver(([e]) => cena.pausar(!e.isIntersecting));
    observador.observe(canvas);
    return () => {
      observador.disconnect();
      window.removeEventListener("resize", aoRedimensionar);
      cena.destruir();
      cenaRef.current = null;
    };
  }, [reduzir, semWebGL]);

  useEffect(() => {
    cenaRef.current?.ajustarSol(hora, estacao);
  }, [hora, estacao, reduzir]);

  useEffect(() => () => {
    if (animacaoRef.current) cancelAnimationFrame(animacaoRef.current);
  }, []);

  function verODia() {
    cenaRef.current?.pararGiro();
    if (reduzir) {
      setHora(17);
      return;
    }
    if (animacaoRef.current) cancelAnimationFrame(animacaoRef.current);
    const inicio = performance.now();
    const passo = (agora: number) => {
      const t = Math.min((agora - inicio) / 8000, 1);
      setHora(6.5 + t * 11);
      if (t < 1) animacaoRef.current = requestAnimationFrame(passo);
    };
    animacaoRef.current = requestAnimationFrame(passo);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <div className="relative aspect-[5/4] bg-papel sm:aspect-[4/3] lg:col-span-8">
        {semWebGL ? (
          <p className="absolute inset-0 flex items-center justify-center p-8 text-center text-tinta-2">
            Seu navegador não exibe 3D. A ficha e as fotos acima mostram o imóvel.
          </p>
        ) : (
          <canvas
            ref={canvasRef}
            className="block size-full cursor-grab touch-pan-y active:cursor-grabbing"
            aria-label="Maquete 3D da casa térrea no Jardim Europa com a posição do sol. Arraste para girar."
            onPointerDown={() => cenaRef.current?.pararGiro()}
          />
        )}
        <p className="pointer-events-none absolute top-4 left-4 font-mono text-[12px] text-tinta-2">
          Frente da casa voltada para o norte · arraste para girar
        </p>
      </div>

      <div className="flex flex-col gap-7 lg:col-span-4">
        <div>
          <p className="rotulo text-tinta-2">Horário</p>
          <p className="mt-1 font-mono text-[44px] leading-none tabular-nums">{formatarHora(hora)}</p>
          <label htmlFor="hora-do-sol" className="sr-only">
            Horário do dia
          </label>
          <input
            id="hora-do-sol"
            type="range"
            min={6}
            max={18}
            step={0.25}
            value={hora}
            onChange={(e) => {
              if (animacaoRef.current) cancelAnimationFrame(animacaoRef.current);
              setHora(Number(e.target.value));
            }}
            className="mt-5 w-full accent-jacaranda"
          />
          <div className="mt-1 flex justify-between font-mono text-[12px] text-tinta-2">
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
          </div>
        </div>

        <fieldset>
          <legend className="rotulo text-tinta-2">Época do ano</legend>
          <div className="mt-3 inline-flex rounded-full border border-linha p-1">
            {(["inverno", "verao"] as const).map((e) => (
              <button
                key={e}
                type="button"
                aria-pressed={estacao === e}
                onClick={() => setEstacao(e)}
                className={`min-h-10 rounded-full px-5 text-[14px] font-medium transition-colors ${
                  estacao === e ? "bg-tinta text-papel" : "text-tinta hover:bg-papel"
                }`}
              >
                {e === "inverno" ? "Inverno" : "Verão"}
              </button>
            ))}
          </div>
        </fieldset>

        <div aria-live="polite" className="border-t border-linha pt-5">
          <p className="rotulo text-tinta-2">Sol direto em</p>
          <p className="mt-2 text-[18px] leading-snug">{comSol.length ? comSol.join(" · ") : "nenhuma fachada (sol baixo)"}</p>
        </div>

        <button
          type="button"
          onClick={verODia}
          className="inline-flex min-h-12 w-fit items-center gap-2 rounded-full border border-tinta/40 px-6 text-[15px] font-medium transition-colors hover:border-tinta hover:bg-tinta hover:text-papel"
        >
          <Play size={16} weight="light" aria-hidden />
          Ver o dia passar
        </button>
      </div>
    </div>
  );
}

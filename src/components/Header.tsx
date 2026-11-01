"use client";

import { useEffect, useState } from "react";
import { contato, linkWhatsApp, mensagens } from "@/data/site";

const links = [
  { href: "#selecao", rotulo: "Seleção" },
  { href: "#venda-discreta", rotulo: "Venda discreta" },
  { href: "#bairros", rotulo: "Bairros" },
  { href: "#perguntas", rotulo: "Perguntas" },
];

export function Header() {
  const [solido, setSolido] = useState(false);

  useEffect(() => {
    // Transparente enquanto a abertura (filme) está na tela.
    const aoRolar = () => {
      const abertura = document.getElementById("inicio")?.offsetHeight ?? 0;
      setSolido(window.scrollY > Math.max(abertura - 88, 80));
    };
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 pt-[env(safe-area-inset-top)] transition-colors duration-300 ${
        solido ? "bg-concreto/95 text-tinta shadow-[0_1px_0_var(--color-linha)] backdrop-blur" : "text-papel"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-[1320px] items-center justify-between gap-6 px-[max(20px,env(safe-area-inset-left))] md:px-10">
        <a href="#inicio" className="flex min-h-11 items-center gap-3" aria-label="Casa Âmbar, voltar ao início">
          <span className="font-display text-[26px] leading-none">Casa Âmbar</span>
          <span className={`hidden font-mono text-[11px] tracking-[0.12em] sm:inline ${solido ? "text-tinta-2" : "text-papel/80"}`}>
            {contato.creci}
          </span>
        </a>
        <nav aria-label="Seções" className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="inline-flex min-h-11 items-center text-[15px] opacity-85 transition-opacity hover:opacity-100">
              {l.rotulo}
            </a>
          ))}
        </nav>
        <a
          href={linkWhatsApp(mensagens.procuro)}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex min-h-11 items-center rounded-full px-5 text-[14px] font-medium transition-colors ${
            solido ? "bg-jacaranda text-papel hover:bg-jacaranda-escuro" : "border border-papel/60 hover:bg-papel hover:text-tinta"
          }`}
        >
          Agendar conversa
        </a>
      </div>
    </header>
  );
}

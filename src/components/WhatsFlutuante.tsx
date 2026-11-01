"use client";

import { useEffect, useState } from "react";
import { WhatsappLogo } from "@phosphor-icons/react";
import { linkWhatsApp, mensagens } from "@/data/site";

// Só no celular, depois que o hero sai da tela.
export function WhatsFlutuante() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const aoRolar = () => setVisivel(window.scrollY > window.innerHeight * 0.8);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return (
    <a
      href={linkWhatsApp(mensagens.procuro)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar com a Casa Âmbar pelo WhatsApp"
      tabIndex={visivel ? 0 : -1}
      className={`fixed right-[max(16px,env(safe-area-inset-right))] bottom-[max(16px,env(safe-area-inset-bottom))] z-40 flex size-14 items-center justify-center rounded-full bg-jacaranda text-papel shadow-[0_8px_24px_rgb(28_26_23/0.25)] transition-all duration-300 md:hidden ${
        visivel ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <WhatsappLogo size={26} weight="light" aria-hidden />
    </a>
  );
}

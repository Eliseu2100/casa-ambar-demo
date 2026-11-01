"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Plus } from "@phosphor-icons/react";
import { perguntas } from "@/data/site";

export function Perguntas() {
  const [aberta, setAberta] = useState<number | null>(0);
  const reduzir = useReducedMotion();

  return (
    <ul className="border-t border-linha">
      {perguntas.map((item, i) => {
        const estaAberta = aberta === i;
        return (
          <li key={item.p} className="border-b border-linha">
            <h3>
              <button
                type="button"
                id={`pergunta-${i}`}
                aria-expanded={estaAberta}
                aria-controls={`resposta-${i}`}
                onClick={() => setAberta(estaAberta ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left text-[19px] font-medium md:text-[21px]"
              >
                {item.p}
                <Plus
                  size={20}
                  weight="light"
                  aria-hidden
                  className={`shrink-0 transition-transform duration-300 ${estaAberta ? "rotate-45" : ""}`}
                />
              </button>
            </h3>
            {/* A resposta fica sempre no HTML (Google e IA leem); só a altura abre e fecha. */}
            <motion.div
              id={`resposta-${i}`}
              role="region"
              aria-labelledby={`pergunta-${i}`}
              aria-hidden={!estaAberta}
              initial={false}
              animate={estaAberta ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
              transition={reduzir ? { duration: 0 } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p className="max-w-[62ch] pb-7 text-[17px] leading-relaxed text-tinta-2">{item.r}</p>
            </motion.div>
          </li>
        );
      })}
    </ul>
  );
}

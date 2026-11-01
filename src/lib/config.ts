// Endereço público e chave de indexação.
// INDEXAR fica desligado neste site de demonstração (marca, imóveis e CRECI fictícios não podem aparecer
// em buscadores nem em respostas de IA como se fossem reais). Num cliente real: NEXT_PUBLIC_INDEXAR=1.

const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? (vercel ? `https://${vercel}` : "http://localhost:3100")
).replace(/\/$/, "");

export const INDEXAR = process.env.NEXT_PUBLIC_INDEXAR === "1";

export const DEMO = true;

// Robôs de busca e de IA liberados quando INDEXAR estiver ligado.
export const ROBOS_DE_IA = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
];

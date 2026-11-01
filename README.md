# Casa Âmbar (site de demonstração)

Projeto conceito de imobiliária de alto padrão feito por **Eliseu Souza · Criação de Sites Premium**.
Marca, imóveis, valores e registro CRECI são fictícios; fotos e vídeo são ilustrativos.

- Next.js 16, React 19, Tailwind 4, Framer Motion, Three.js
- Abertura com vídeo controlado pela rolagem e maquete 3D com estudo de sol
- SEO completo: metadados, Open Graph, JSON-LD (RealEstateAgent, ofertas, FAQ), sitemap, robots e `llms.txt`

## Indexação
Desligada de propósito (`noindex` e `robots.txt` bloqueando), porque a empresa é fictícia.
Num cliente real, definir `NEXT_PUBLIC_INDEXAR=1` (libera Google e robôs de IA: GPTBot, ClaudeBot, PerplexityBot,
Google-Extended) e `NEXT_PUBLIC_SITE_URL` com o domínio.

## Rodar
```bash
npm install
npm run dev     # http://localhost:3100
npm run build && npm run start
```

// JSON-LD (schema.org): o que Google e assistentes de IA leem para entender a empresa, os imóveis e o FAQ.
import { SITE_URL } from "@/lib/config";
import { bairros, contato, imoveis, perguntas } from "@/data/site";

const numero = (s: string) => Number(s.replace(/[^\d]/g, ""));
const campo = (i: (typeof imoveis)[number], rotulo: string) => i.ficha.find((f) => f.rotulo === rotulo)?.valor;

export function DadosEstruturados() {
  const empresa = `${SITE_URL}/#empresa`;
  const grafo = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateAgent",
        "@id": empresa,
        name: "Casa Âmbar · Imóveis de Alto Padrão",
        description:
          "Site de demonstração (marca, imóveis e registro fictícios) de uma imobiliária de alto padrão em São Paulo: carteira pequena de casas e coberturas, venda discreta e visitas com hora marcada.",
        url: `${SITE_URL}/`,
        image: `${SITE_URL}/og.jpg`,
        logo: `${SITE_URL}/icon.svg`,
        telephone: `+${contato.whatsappNumero}`,
        identifier: contato.creci,
        address: { "@type": "PostalAddress", addressLocality: "São Paulo", addressRegion: "SP", addressCountry: "BR" },
        areaServed: bairros.map((b) => ({ "@type": "Place", name: `${b.nome}, São Paulo` })),
        knowsAbout: ["Imóveis de alto padrão", "Casas em condomínio", "Coberturas", "Venda discreta de imóveis"],
        priceRange: "R$ 9.600.000 – R$ 24.500.000",
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#site`,
        url: `${SITE_URL}/`,
        name: "Casa Âmbar",
        inLanguage: "pt-BR",
        publisher: { "@id": empresa },
      },
      {
        "@type": "ItemList",
        name: "Seleção atual de imóveis",
        itemListElement: imoveis.map((i, n) => ({
          "@type": "ListItem",
          position: n + 1,
          item: {
            "@type": "Offer",
            url: `${SITE_URL}/#${i.id}`,
            price: numero(i.preco),
            priceCurrency: "BRL",
            seller: { "@id": empresa },
            itemOffered: {
              "@type": i.titulo === "Cobertura" ? "Apartment" : "SingleFamilyResidence",
              name: `${i.titulo} no ${i.bairro}`,
              description: i.frase,
              image: `${SITE_URL}${i.imagem}`,
              numberOfBedrooms: numero(campo(i, "Suítes") ?? "0"),
              floorSize: {
                "@type": "QuantitativeValue",
                value: numero(campo(i, "Construída") ?? campo(i, "Privativa") ?? "0"),
                unitCode: "MTK",
              },
              address: { "@type": "PostalAddress", addressLocality: i.bairro, addressRegion: "SP", addressCountry: "BR" },
            },
          },
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: perguntas.map((q) => ({
          "@type": "Question",
          name: q.p,
          acceptedAnswer: { "@type": "Answer", text: q.r },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(grafo).replace(/</g, "\\u003c") }}
    />
  );
}

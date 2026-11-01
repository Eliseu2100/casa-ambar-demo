// Texto aprovado em docs/COPY.md. Marca, imóveis, valores e CRECI são fictícios (demonstração).

// No ar como demonstração, o WhatsApp fala com o Eliseu (quem fez o site), nunca com um número inventado.
export const contato = {
  creci: "CRECI/SP 00000-J",
  whatsappExibicao: "(11) 91272-5107",
  whatsappNumero: "5511912725107",
};

export function linkWhatsApp(mensagem: string) {
  return `https://wa.me/${contato.whatsappNumero}?text=${encodeURIComponent(`[Demo Casa Âmbar] ${mensagem}`)}`;
}

export const linkEliseu = `https://wa.me/${contato.whatsappNumero}?text=${encodeURIComponent(
  "Olá, Eliseu! Vi o site de demonstração da Casa Âmbar e quero conversar sobre um site assim.",
)}`;

export const mensagens = {
  procuro: "Olá! Vi o site da Casa Âmbar e procuro um imóvel.",
  vender: "Olá! Tenho um imóvel e quero saber como funciona a venda discreta.",
  reservada: "Olá! Gostaria de conhecer a coleção reservada.",
  avaliacao: "Olá! Quero pedir uma avaliação reservada do meu imóvel.",
  perfil: "Olá! Não encontrei no site o imóvel que procuro. Posso contar o que busco?",
};

export const confianca = [
  "Atendimento com hora marcada",
  "Visitas acompanhadas pelo corretor",
  "Documentação conferida antes da visita",
  "Imóveis anunciados com autorização do proprietário",
];

export type Imovel = {
  id: string;
  titulo: string;
  bairro: string;
  frase: string;
  imagem: string;
  alt: string;
  ficha: { rotulo: string; valor: string }[];
  preco: string;
};

export const imoveis: Imovel[] = [
  {
    id: "jardim-europa",
    titulo: "Casa térrea",
    bairro: "Jardim Europa",
    frase: "Concreto aparente, freijó e um jardim que entra na sala.",
    imagem: "/images/sala-2400.webp",
    alt: "Sala de pé-direito duplo com brise de madeira, sofá claro e vista para o jardim tropical",
    ficha: [
      { rotulo: "Terreno", valor: "1.150 m²" },
      { rotulo: "Construída", valor: "780 m²" },
      { rotulo: "Suítes", valor: "4" },
      { rotulo: "Vagas", valor: "6" },
    ],
    preco: "R$ 24.500.000",
  },
  {
    id: "alto-de-pinheiros",
    titulo: "Cobertura",
    bairro: "Alto de Pinheiros",
    frase: "Terraço com piscina voltado para o pôr do sol e para o verde do bairro.",
    imagem: "/images/cobertura-2400.webp",
    alt: "Terraço de cobertura com deck de madeira, piscina e vista da cidade ao pôr do sol",
    ficha: [
      { rotulo: "Privativa", valor: "420 m²" },
      { rotulo: "Suítes", valor: "3" },
      { rotulo: "Vagas", valor: "5" },
    ],
    preco: "R$ 11.800.000",
  },
  {
    id: "granja-viana",
    titulo: "Casa em condomínio",
    bairro: "Granja Viana",
    frase: "Um pavimento só, piscina de pedra escura e gramado de frente para a mata.",
    imagem: "/images/condominio-2400.webp",
    alt: "Casa térrea de concreto e madeira com piscina de pedra escura e gramado ao entardecer",
    ficha: [
      { rotulo: "Terreno", valor: "2.400 m²" },
      { rotulo: "Construída", valor: "690 m²" },
      { rotulo: "Suítes", valor: "5" },
      { rotulo: "Vagas", valor: "4" },
    ],
    preco: "R$ 9.600.000",
  },
];

export const compromissos = [
  {
    titulo: "Avaliação fundamentada",
    texto: "Com base em vendas comparáveis da região, sem inflar o valor para captar o imóvel.",
  },
  {
    titulo: "Divulgação sob medida",
    texto: "Fotos de arquitetura e anúncio criterioso, ou nenhuma divulgação pública, se você preferir.",
  },
  {
    titulo: "Visitas filtradas",
    texto: "Só visita quem passou por uma conversa de qualificação e teve a identidade conferida.",
  },
];

export const bairros = [
  { nome: "Jardim Europa", texto: "Casas em terrenos amplos, ruas arborizadas e tráfego local." },
  { nome: "Jardim América", texto: "Traçado de bairro-jardim, muros cobertos de vegetação e a Avenida Brasil a poucas quadras." },
  { nome: "Cidade Jardim", texto: "Casas e coberturas na margem do Rio Pinheiros, com acesso rápido à Marginal." },
  { nome: "Alto de Pinheiros", texto: "Bairro residencial de praças, com coberturas voltadas para o verde." },
  { nome: "Granja Viana", texto: "Casas em condomínio fechado, na região oeste da Grande São Paulo." },
];

export const etapas = [
  { titulo: "Conversa", texto: "Você conta o que procura, o prazo e do que não abre mão. Sem cadastro." },
  { titulo: "Curadoria", texto: "Separamos só imóveis que a equipe já visitou e cuja documentação foi conferida." },
  { titulo: "Visitas", texto: "Com hora marcada e acompanhadas pelo corretor responsável." },
  { titulo: "Negociação", texto: "Proposta, análise dos documentos e acompanhamento até a escritura." },
];

export const perguntas = [
  {
    p: "Quem compra paga corretagem?",
    r: "Não. A corretagem é paga pelo proprietário, como é o padrão do mercado. Você tem um corretor do seu lado sem custo.",
  },
  {
    p: "Como funciona a venda discreta?",
    r: "Começa com uma visita de avaliação e uma conversa sobre estratégia. Você decide o nível de exposição: anúncio criterioso, só a coleção reservada ou apenas compradores já qualificados. Tudo fica por escrito.",
  },
  {
    p: "O site mostra todos os imóveis?",
    r: "Não. O site mostra parte da seleção. A carteira muda toda semana e parte dela não é anunciada.",
  },
  {
    p: "Que documentos preciso para começar?",
    r: "Nenhum para começar a procurar. A lista completa entra na fase de proposta, e a equipe confere a documentação do imóvel antes da sua visita.",
  },
  {
    p: "Vocês atendem fora desses bairros?",
    r: "Sim, quando o imóvel e o cliente têm o perfil da carteira. Conte o que procura e dizemos com franqueza se faz sentido.",
  },
];

import Image from "next/image";
import { FilmeRolagem } from "@/components/FilmeRolagem";
import { Header } from "@/components/Header";
import { EstudoDeSolLazy } from "@/components/maquete/EstudoDeSolLazy";
import { Perguntas } from "@/components/Perguntas";
import { Revelar } from "@/components/Revelar";
import { WhatsFlutuante } from "@/components/WhatsFlutuante";
import { BotaoLink, Rotulo } from "@/components/ui";
import { DadosEstruturados } from "@/components/DadosEstruturados";
import {
  bairros,
  compromissos,
  confianca,
  contato,
  etapas,
  imoveis,
  linkWhatsApp,
  linkEliseu,
  mensagens,
  type Imovel,
} from "@/data/site";

const largura = "mx-auto max-w-[1320px] px-[max(20px,env(safe-area-inset-left))] md:px-10";

export default function Home() {
  const [destaque, ...outros] = imoveis;

  return (
    <>
      <Header />
      <Revelar />
      <main>
        {/* 1. Hero: o vídeo da fachada avança com a rolagem */}
        <FilmeRolagem
          final={
            <div className={`pb-16 md:pb-20 ${largura}`}>
              <p className="rotulo text-papel/85">Na capa · 01 · Jardim Europa</p>
              <p className="mt-3 font-display text-[clamp(36px,5vw,64px)] leading-[1.02]">Uma casa térrea de concreto e freijó.</p>
              <a
                href="#jardim-europa"
                className="mt-6 inline-flex min-h-12 items-center rounded-full border border-papel/70 px-6 text-[15px] font-medium transition-colors hover:bg-papel hover:text-tinta"
              >
                Ver a ficha da casa
              </a>
            </div>
          }
        >
            <div className={`pt-40 pb-14 md:pb-20 ${largura}`}>
              <p className="hero-item rotulo text-papel/85" style={{ animationDelay: "0.2s" }}>
                Imobiliária de alto padrão · São Paulo
              </p>
              <h1
                className="hero-item mt-5 max-w-[13ch] font-display text-[clamp(44px,8vw,96px)] leading-[0.98] tracking-[-0.01em]"
                style={{ animationDelay: "0.32s" }}
              >
                Poucas casas. <em className="italic">Escolhidas</em> uma a uma.
              </h1>
              <p className="hero-item mt-7 max-w-[54ch] text-[17px] leading-relaxed text-papel/90 md:text-[19px]" style={{ animationDelay: "0.44s" }}>
                A Casa Âmbar trabalha com uma carteira pequena de casas e coberturas nos Jardins, em Cidade Jardim e no Alto de
                Pinheiros. Atendimento com hora marcada, direto com o corretor responsável.
              </p>
              <div className="hero-item mt-9 flex flex-wrap gap-3" style={{ animationDelay: "0.56s" }}>
                <BotaoLink href={linkWhatsApp(mensagens.procuro)}>Procuro um imóvel</BotaoLink>
                <BotaoLink href={linkWhatsApp(mensagens.vender)} variante="contorno-claro">
                  Quero vender com discrição
                </BotaoLink>
              </div>
              <div className="hero-item mt-14 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-linha-clara pt-3" style={{ animationDelay: "0.68s" }}>
                <p className="font-mono text-[13px] tracking-[0.08em] text-papel/90">{contato.creci}</p>
                <a href="#jardim-europa" className="inline-flex min-h-11 items-center font-mono text-[12px] tracking-[0.08em] text-papel/80 underline-offset-4 hover:underline">
                  Na capa: casa térrea no Jardim Europa
                </a>
              </div>
            </div>
        </FilmeRolagem>

        {/* 2. Barra de confiança */}
        <section aria-label="Como atendemos" className="border-b border-linha bg-papel">
          <ul className={`grid grid-cols-1 gap-x-10 gap-y-4 py-8 sm:grid-cols-2 lg:grid-cols-4 ${largura}`}>
            {confianca.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[15px] leading-snug">
                <span aria-hidden className="mt-[7px] size-1.5 shrink-0 rounded-full bg-jacaranda" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* 3. Seleção atual */}
        <section id="selecao" className={`py-24 md:py-36 ${largura}`}>
          <div data-reveal className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-5">
              <Rotulo>Seleção atual</Rotulo>
              <h2 className="mt-4 font-display text-[clamp(40px,5vw,64px)] leading-[1.02]">Três imóveis para conhecer este mês.</h2>
            </div>
            <p className="max-w-[46ch] self-end text-[17px] leading-relaxed text-tinta-2 md:col-span-5 md:col-start-8">
              Cada imóvel desta lista foi visitado pela equipe e teve a documentação conferida antes de aparecer aqui.
            </p>
          </div>

          <ImovelDestaque imovel={destaque} />

          <div className="mt-20 border-t border-linha pt-10 md:mt-28">
            <div data-reveal className="mb-10 grid gap-6 md:grid-cols-12">
              <div className="md:col-span-6">
                <Rotulo>Estudo de sol · Casa térrea no Jardim Europa</Rotulo>
                <h3 className="mt-4 font-display text-[clamp(32px,3.6vw,48px)] leading-[1.05]">Onde bate o sol, hora a hora.</h3>
              </div>
              <p className="max-w-[46ch] self-end text-[17px] leading-relaxed text-tinta-2 md:col-span-5 md:col-start-8">
                Mova o horário e troque a época do ano para ver a luz percorrer a casa. A sala e o jardim ficam voltados para o
                norte: no inverno, recebem sol direto a maior parte do dia.
              </p>
            </div>
            <EstudoDeSolLazy />
            <p className="mt-6 font-mono text-[12px] text-tinta-2">
              Maquete e orientação ilustrativas (demonstração). Posição do sol aproximada para São Paulo.
            </p>
          </div>

          <div className="mt-24 grid gap-16 md:mt-32 md:grid-cols-2 md:gap-10">
            {outros.map((imovel, i) => (
              <ImovelCartao key={imovel.id} imovel={imovel} numero={i + 2} />
            ))}
          </div>

          <div data-reveal className="mt-20 flex flex-col gap-6 border-t border-linha pt-10 md:flex-row md:items-center md:justify-between">
            <p className="max-w-[58ch] text-[17px] leading-relaxed">
              Não encontrou o que procura? A carteira completa não cabe no site. Conte o que você busca e avisamos quando entrar um
              imóvel com esse perfil.
            </p>
            <BotaoLink href={linkWhatsApp(mensagens.perfil)} variante="contorno">
              Contar o que procuro
            </BotaoLink>
          </div>
          <p className="mt-6 font-mono text-[12px] text-tinta-2">Imóveis e valores ilustrativos (site de demonstração).</p>
        </section>

        {/* 4. Coleção reservada */}
        <section className="bg-mata text-papel">
          <div className={`grid items-center gap-12 py-24 md:grid-cols-12 md:py-32 ${largura}`}>
            <div data-reveal="foto" className="relative aspect-[3/2] md:col-span-7">
              <Image
                src="/images/jardim-2400.webp"
                alt="Caminho de pedra em jardim tropical, ao lado de um muro de concreto"
                fill
                sizes="(min-width: 768px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
            <div data-reveal className="md:col-span-4 md:col-start-9">
              <Rotulo claro>Coleção reservada</Rotulo>
              <h2 className="mt-4 font-display text-[clamp(36px,4vw,52px)] leading-[1.05]">Parte da carteira não está anunciada.</h2>
              <p className="mt-6 text-[17px] leading-relaxed text-papel/85">
                Alguns proprietários preferem que a casa não apareça em portal nem em rede social. Esses imóveis são apresentados
                em conversa, com fotos e ficha completa, para quem já falou com a equipe e tem interesse real.
              </p>
              <div className="mt-8">
                <BotaoLink href={linkWhatsApp(mensagens.reservada)} variante="contorno-claro">
                  Conhecer a coleção reservada
                </BotaoLink>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Venda discreta */}
        <section id="venda-discreta" className={`py-24 md:py-36 ${largura}`}>
          <div className="grid gap-14 md:grid-cols-12">
            <div data-reveal className="md:col-span-6">
              <Rotulo>Para proprietários</Rotulo>
              <h2 className="mt-4 font-display text-[clamp(40px,5.4vw,72px)] leading-[1.0]">
                Seu imóvel não precisa estar em <em className="italic">todo lugar</em>.
              </h2>
              <p className="mt-8 max-w-[48ch] text-[17px] leading-relaxed text-tinta-2">
                Anunciar em todos os portais ao mesmo tempo expõe a casa e atrai visitas sem perfil. Trabalhamos com poucos imóveis
                por corretor e damos retorno sobre cada interessado.
              </p>
              <div className="mt-9">
                <BotaoLink href={linkWhatsApp(mensagens.avaliacao)}>Pedir avaliação reservada</BotaoLink>
              </div>
            </div>
            <ul className="border-t border-linha md:col-span-5 md:col-start-8 md:mt-3">
              {compromissos.map((c) => (
                <li key={c.titulo} data-reveal className="border-b border-linha py-8">
                  <h3 className="text-[20px] font-medium">{c.titulo}</h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-tinta-2">{c.texto}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 6. Bairros */}
        <section id="bairros" className="bg-papel">
          <div className={`grid gap-12 py-24 md:grid-cols-12 md:py-32 ${largura}`}>
            <div className="md:col-span-6">
              <div data-reveal>
                <Rotulo>Onde atuamos</Rotulo>
                <h2 className="mt-4 font-display text-[clamp(40px,5vw,64px)] leading-[1.02]">Bairros que conhecemos de perto.</h2>
              </div>
              <div data-reveal="foto" className="relative mt-10 aspect-[16/10]">
                <Image
                  src="/images/rua-2400.webp"
                  alt="Rua residencial arborizada com muros cobertos de trepadeira e calçada de pedra portuguesa"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <dl className="self-end border-t border-linha md:col-span-5 md:col-start-8">
              {bairros.map((b) => (
                <div key={b.nome} data-reveal className="grid gap-1 border-b border-linha py-6">
                  <dt className="font-display text-[28px] leading-tight">{b.nome}</dt>
                  <dd className="text-[16px] leading-relaxed text-tinta-2">{b.texto}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* 7. Como trabalhamos */}
        <section className={`py-24 md:py-36 ${largura}`}>
          <div data-reveal>
            <Rotulo>Como trabalhamos</Rotulo>
            <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(40px,5vw,64px)] leading-[1.02]">Do primeiro recado à escritura.</h2>
          </div>
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {etapas.map((e, i) => (
              <li key={e.titulo} data-reveal className="border-t border-tinta pt-5">
                <span className="font-mono text-[13px] text-tinta-2">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-[21px] font-medium">{e.titulo}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-tinta-2">{e.texto}</p>
              </li>
            ))}
          </ol>
          <p className="mt-14 font-mono text-[12px] text-tinta-2">Corretores responsáveis: [nomes e CRECI a confirmar com o cliente]</p>
        </section>

        {/* 8. Perguntas */}
        <section id="perguntas" className="border-t border-linha">
          <div className={`grid gap-12 py-24 md:grid-cols-12 md:py-32 ${largura}`}>
            <div data-reveal className="md:col-span-4">
              <Rotulo>Perguntas frequentes</Rotulo>
              <h2 className="mt-4 font-display text-[clamp(36px,4vw,52px)] leading-[1.05]">Antes da primeira conversa.</h2>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <Perguntas />
            </div>
          </div>
        </section>

        {/* 9. Chamada final */}
        <section className="bg-mata text-papel">
          <div className={`py-28 text-center md:py-40 ${largura}`}>
            <h2 data-reveal className="font-display text-[clamp(48px,7vw,104px)] leading-[0.98]">
              Uma conversa <em className="italic">resolve</em>.
            </h2>
            <p data-reveal className="mx-auto mt-7 max-w-[46ch] text-[18px] leading-relaxed text-papel/85">
              Procurando uma casa ou pensando em vender a sua com discrição? Fale direto com a equipe pelo WhatsApp.
            </p>
            <div data-reveal className="mt-10 flex flex-wrap justify-center gap-3">
              <BotaoLink href={linkWhatsApp(mensagens.procuro)} variante="contorno-claro">
                Procuro um imóvel
              </BotaoLink>
              <BotaoLink href={linkWhatsApp(mensagens.vender)} variante="contorno-claro">
                Tenho um imóvel
              </BotaoLink>
            </div>
          </div>
        </section>
      </main>

      {/* 10. Rodapé */}
      <footer className="bg-mata-escuro text-papel/80">
        <div className={`grid gap-8 py-14 pb-[max(56px,env(safe-area-inset-bottom))] md:grid-cols-12 ${largura}`}>
          <address className="not-italic md:col-span-5">
            <p className="font-display text-[28px] text-papel">Casa Âmbar</p>
            <p className="mt-1 text-[14px]">Imóveis de Alto Padrão · São Paulo, SP</p>
            <p className="mt-4 font-mono text-[13px] text-papel">{contato.creci}</p>
          </address>
          <div className="text-[14px] leading-relaxed md:col-span-6 md:col-start-7">
            <p>Imóveis anunciados com autorização dos proprietários. Valores e disponibilidade sujeitos a confirmação.</p>
            <p className="mt-4 border-t border-linha-clara pt-4 text-[13px] text-papel/70">
              Site de demonstração feito por Eliseu Souza · Criação de Sites Premium. Marca, imóveis, valores e registro são
              fictícios; fotos ilustrativas. Os botões de WhatsApp falam com o Eliseu:{" "}
              <a href={linkEliseu} target="_blank" rel="noopener noreferrer" className="font-mono text-papel underline-offset-4 hover:underline">
                {contato.whatsappExibicao}
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
      <a
        href={linkEliseu}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-[max(16px,env(safe-area-inset-bottom))] left-[max(16px,env(safe-area-inset-left))] z-40 inline-flex min-h-10 items-center rounded-full bg-tinta/85 px-4 font-mono text-[11px] tracking-[0.08em] text-papel backdrop-blur hover:bg-tinta"
      >
        Demonstração · Eliseu Souza
      </a>
      <WhatsFlutuante />
      <DadosEstruturados />
    </>
  );
}

function Ficha({ imovel, compacta = false }: { imovel: Imovel; compacta?: boolean }) {
  return (
    <dl className={`grid grid-cols-2 border-t border-linha ${compacta ? "" : "sm:grid-cols-4"}`}>
      {imovel.ficha.map((f) => (
        <div key={f.rotulo} className="border-b border-linha py-3 pr-4">
          <dt className="rotulo text-[11px] text-tinta-2">{f.rotulo}</dt>
          <dd className="mt-1 font-mono text-[16px] tabular-nums">{f.valor}</dd>
        </div>
      ))}
    </dl>
  );
}

function ImovelDestaque({ imovel }: { imovel: Imovel }) {
  return (
    <article id={imovel.id} className="mt-16 grid gap-10 md:mt-24 md:grid-cols-12 md:gap-10">
      <div data-reveal="foto" className="relative aspect-[4/5] md:col-span-7">
        <Image src={imovel.imagem} alt={imovel.alt} fill sizes="(min-width: 768px) 58vw, 100vw" className="object-cover" />
      </div>
      <div className="flex flex-col md:col-span-5">
        <div data-reveal>
          <p className="font-mono text-[13px] text-tinta-2">01 · {imovel.bairro}</p>
          <h3 className="mt-3 font-display text-[clamp(36px,4vw,52px)] leading-[1.05]">{imovel.titulo}</h3>
          <p className="mt-4 max-w-[40ch] text-[18px] leading-relaxed text-tinta-2">{imovel.frase}</p>
        </div>
        <div data-reveal className="mt-8">
          <Ficha imovel={imovel} />
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono text-[22px] tabular-nums">{imovel.preco}</p>
            <BotaoLink href={linkWhatsApp(`Olá! Vi a ${imovel.titulo.toLowerCase()} no ${imovel.bairro} no site e quero agendar uma visita.`)}>
              Agendar visita
            </BotaoLink>
          </div>
        </div>
        <div className="mt-auto grid grid-cols-2 gap-3 pt-10">
          <div data-reveal="foto" className="relative aspect-[4/3]">
            <Image
              src="/images/cozinha-2400.webp"
              alt="Cozinha com ilha monolítica de travertino e marcenaria escura"
              fill
              sizes="(min-width: 768px) 20vw, 50vw"
              className="object-cover"
            />
          </div>
          <div data-reveal="foto" className="relative aspect-[4/3]">
            <Image
              src="/images/suite-2400.webp"
              alt="Suíte com parede ripada de madeira e janela para o jardim tropical"
              fill
              sizes="(min-width: 768px) 20vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </article>
  );
}

function ImovelCartao({ imovel, numero }: { imovel: Imovel; numero: number }) {
  return (
    <article id={imovel.id} className="flex flex-col">
      <div data-reveal="foto" className="relative aspect-[4/5]">
        <Image src={imovel.imagem} alt={imovel.alt} fill sizes="(min-width: 768px) 46vw, 100vw" className="object-cover" />
      </div>
      <div data-reveal className="mt-7 flex flex-1 flex-col">
        <p className="font-mono text-[13px] text-tinta-2">
          {String(numero).padStart(2, "0")} · {imovel.bairro}
        </p>
        <h3 className="mt-3 font-display text-[clamp(32px,3.2vw,44px)] leading-[1.05]">{imovel.titulo}</h3>
        <p className="mt-3 max-w-[44ch] text-[17px] leading-relaxed text-tinta-2">{imovel.frase}</p>
        <div className="mt-6">
          <Ficha imovel={imovel} compacta />
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-[20px] tabular-nums">{imovel.preco}</p>
          <BotaoLink href={linkWhatsApp(`Olá! Vi a ${imovel.titulo.toLowerCase()} no ${imovel.bairro} no site e quero agendar uma visita.`)}>
            Agendar visita
          </BotaoLink>
        </div>
      </div>
    </article>
  );
}

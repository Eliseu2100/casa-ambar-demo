import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

type Variante = "primario" | "contorno-claro" | "contorno";

const estilos: Record<Variante, string> = {
  primario: "bg-jacaranda text-papel hover:bg-jacaranda-escuro",
  "contorno-claro": "border border-papel/70 text-papel hover:bg-papel hover:text-tinta",
  contorno: "border border-tinta/40 text-tinta hover:border-tinta hover:bg-tinta hover:text-papel",
};

export function BotaoLink({
  href,
  children,
  variante = "primario",
  externo = true,
}: {
  href: string;
  children: React.ReactNode;
  variante?: Variante;
  externo?: boolean;
}) {
  return (
    <a
      href={href}
      {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-medium transition-colors duration-200 ${estilos[variante]}`}
    >
      {children}
      <ArrowUpRight size={16} weight="light" className="seta" aria-hidden />
    </a>
  );
}

export function Rotulo({ children, claro = false }: { children: React.ReactNode; claro?: boolean }) {
  return <p className={`rotulo ${claro ? "text-ambar" : "text-tinta-2"}`}>{children}</p>;
}

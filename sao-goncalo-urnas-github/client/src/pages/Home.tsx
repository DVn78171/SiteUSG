import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Clock3,
  Factory,
  Gem,
  HeartHandshake,
  Menu,
  MapPin,
  MessageCircle,
  PackageCheck,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Truck,
  X,
} from "lucide-react";

const imageBase = "/images/";

const productImages = {
  plano: `${imageBase}products/plano-01.jpg`,
  pax: `${imageBase}products/pax.jpg`,
  paxLuxo: `${imageBase}products/pax-luxo-visor-inteiro.jpg`,
  paxVisor: `${imageBase}products/pax-luxo-visor-34.jpg`,
  decorada: `${imageBase}products/pax-decorada.jpg`,
  imagem: `${imageBase}products/pax-com-imagem.jpg`,
  infantil: `${imageBase}products/infantil-luxo.jpg`,
  infantilSuper: `${imageBase}products/infantil-super-luxo.jpg`,
  detalhe: `${imageBase}sao-goncalo-detail.jpg`,
};

const rawProducts = [
  ["Expositor p/ urnas carrinho", "Expositores", "expositor", "detalhe"],
  ["Expositor p/ urnas pezinho", "Expositores", "expositor", "detalhe"],
  ["Expositor para roupas", "Expositores", "expositor", "detalhe"],
  ["Urna 00 X", "Urnas", "linha clássica", "plano"],
  ["Urna 00 X comprida", "Urnas", "linha clássica", "plano"],
  ["Urna 00 X gorda", "Urnas", "linha clássica", "pax"],
  ["Urna 00 X visor 3/4", "Urnas", "linha clássica", "paxVisor"],
  ["Urna 115", "Urnas", "linha padrão", "paxLuxo"],
  ["Urna 130 E marmorizada", "Urnas", "marmorizada", "decorada"],
  ["Urna 130 L lisa", "Urnas", "linha padrão", "pax"],
  ["Urna 130 L lisa c/ imagem", "Urnas", "com imagem", "imagem"],
  ["Urna 130 L ondulada", "Urnas", "linha padrão", "pax"],
  ["Urna 130 L tampa entalhada", "Urnas", "entalhada", "detalhe"],
  ["Urna 130L/10 cerejeira", "Urnas", "cerejeira", "detalhe"],
  ["Urna 150", "Urnas", "linha padrão", "pax"],
  ["Urna 150 c/ imagem", "Urnas", "com imagem", "imagem"],
  ["Urna 150 marmorizada", "Urnas", "marmorizada", "decorada"],
  ["Urna 190 L comprida", "Urnas", "linha padrão", "pax"],
  ["Urna 190 S comprida", "Urnas", "linha padrão", "pax"],
  ["Urna 270", "Urnas", "linha padrão", "pax"],
  ["Urna 270 Baú", "Urnas", "baú", "detalhe"],
  ["Urna 290 L", "Urnas", "linha padrão", "pax"],
  ["Urna 290 S", "Urnas", "linha padrão", "pax"],
  ["Urna 310 Lisa", "Urnas", "linha padrão", "pax"],
  ["Urna 310 Vime", "Urnas", "vime", "detalhe"],
  ["Urna 310/15 cerejeira", "Urnas", "cerejeira", "detalhe"],
  ["Urna 330 entalhada", "Urnas", "entalhada", "detalhe"],
  ["Urna 350 Lisa", "Urnas", "linha padrão", "pax"],
  ["Urna 350 Vime", "Urnas", "vime", "detalhe"],
  ["Urna 350/20 cerejeira", "Urnas", "cerejeira", "detalhe"],
  ["Urna 400", "Urnas", "linha padrão", "pax"],
  ["Urna 400/25 cerejeira", "Urnas", "cerejeira", "detalhe"],
  ["Urna anjo infantil simples 0,40 / 0,50 / 0,60 / 0,80 / 1,00 / 1,20 / 1,40 / 1,60", "Infantil", "infantil · múltiplos tamanhos", "infantil"],
  ["Urna cascão", "Urnas", "linha especial", "detalhe"],
  ["Urna extra gorda", "Urnas", "linha especial", "pax"],
  ["Urna Infantil luxo 0,60 / 0,80 / 1,00 / 1,20 / 1,40 / 1,60", "Infantil", "infantil · múltiplos tamanhos", "infantil"],
  ["Urna infantil super luxo cerejeira 0,60 / 0,80", "Infantil", "infantil · 0,60 / 0,80", "infantilSuper"],
  ["Urna Pax", "Pax", "Pax clássica", "pax"],
  ["Urna Pax c/ imagem", "Pax", "Pax personalizada", "imagem"],
  ["Urna Pax decorada", "Pax", "Pax decorada", "decorada"],
  ["Urna pax luxo visor 3/4", "Pax", "Pax luxo", "paxVisor"],
  ["Urna pax luxo visor inteiro", "Pax", "Pax luxo", "paxLuxo"],
  ["Urna Plano 01", "Plano", "linha plano", "plano"],
] as const;

const familyDescriptions: Record<string, string> = {
  Expositores: "Estrutura de apoio para organização e apresentação de urnas e roupas.",
  Urnas: "Modelo do catálogo São Gonçalo. Consulte a equipe sobre medidas, acabamentos e disponibilidade.",
  Pax: "Modelo da família Pax. Consulte a equipe sobre medidas, acabamentos e disponibilidade.",
  Infantil: "Modelo da linha infantil São Gonçalo. Consulte a equipe sobre tamanhos e acabamentos.",
  Plano: "Modelo da linha Plano São Gonçalo. Consulte a equipe sobre medidas e disponibilidade.",
};

const products = rawProducts.map(([name, family, label, image]) => ({
  name,
  family,
  label,
  image: productImages[image],
  description: familyDescriptions[family],
  details: "Produto do catálogo oficial São Gonçalo",
}));

const filters = ["Todos", "Urnas", "Pax", "Infantil", "Expositores", "Plano"];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[number] | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const visibleProducts = useMemo(
    () => (activeFilter === "Todos" ? products : products.filter((product) => product.family === activeFilter)),
    [activeFilter],
  );

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f4f1ec] text-[#17191b] selection:bg-[#bc9460] selection:text-white">
      <div className="topline bg-[#17191b] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d7c09f] sm:px-8">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span>Indústria de Urnas São Gonçalo · Feira de Santana — BA</span>
          <span className="hidden text-[#a9aaa7] sm:block">Entregas em todo o Brasil</span>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-[#17191b]/10 bg-[#f4f1ec]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[78px] max-w-[1320px] items-center justify-between px-5 sm:px-8">
          <a href="#inicio" className="group flex items-center gap-3" onClick={() => scrollToId("inicio")}>
            <span className="grid h-10 w-10 place-items-center rounded-full border border-[#bc9460]/60 bg-[#17191b] text-[#d7c09f] transition-transform duration-200 group-hover:rotate-6">
              <span className="font-serif text-xl leading-none">S</span>
            </span>
            <span className="leading-tight">
              <span className="block font-serif text-[18px] font-semibold tracking-[-0.03em] text-[#17191b]">São Gonçalo</span>
              <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-[#8e7657]">Urnas funerárias</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-[11px] font-bold uppercase tracking-[0.16em] text-[#565a5b] lg:flex">
            <a href="#catalogo" className="transition-colors hover:text-[#a77f4b]">Catálogo</a>
            <a href="#qualidade" className="transition-colors hover:text-[#a77f4b]">Qualidade</a>
            <a href="#empresa" className="transition-colors hover:text-[#a77f4b]">A empresa</a>
            <a href="#contato" className="transition-colors hover:text-[#a77f4b]">Contato</a>
          </nav>

          <a href="tel:+557533225900" className="hidden items-center gap-2 rounded-full border border-[#17191b]/15 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#17191b] transition-all hover:border-[#bc9460] hover:bg-[#17191b] hover:text-white sm:flex">
            <Phone size={13} strokeWidth={2.2} />
            <span>(75) 3322-5900</span>
          </a>
          <button aria-label="Abrir menu" className="rounded-full p-2 lg:hidden" onClick={() => setMobileMenuOpen((value) => !value)}>
            {mobileMenuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="border-t border-[#17191b]/10 bg-[#f4f1ec] px-5 py-5 lg:hidden">
            <div className="flex flex-col gap-4 text-[11px] font-bold uppercase tracking-[0.16em]">
              {[['catalogo', 'Catálogo'], ['qualidade', 'Qualidade'], ['empresa', 'A empresa'], ['contato', 'Contato']].map(([id, label]) => (
                <a key={id} href={`#${id}`} onClick={() => setMobileMenuOpen(false)}>{label}</a>
              ))}
            </div>
          </div>
        )}
      </header>

      <section id="inicio" className="relative isolate overflow-hidden border-b border-[#17191b]/10 bg-[#ece6de]">
        <div className="absolute -right-24 -top-28 -z-10 h-[460px] w-[460px] rounded-full bg-[#d4b98f]/30 blur-3xl" />
        <div className="mx-auto grid min-h-[660px] max-w-[1320px] grid-cols-1 items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 lg:py-20">
          <div className="relative z-10 max-w-[600px]">
            <div className="mb-7 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#a77f4b]">
              <span className="h-px w-10 bg-[#bc9460]" />
              Desde Feira de Santana para todo o Brasil
            </div>
            <h1 className="max-w-[680px] font-serif text-[clamp(3.6rem,7vw,7.7rem)] leading-[0.9] tracking-[-0.065em] text-[#17191b]">
              Respeito em cada <em className="font-normal text-[#a77f4b]">detalhe.</em>
            </h1>
            <p className="mt-8 max-w-[470px] text-[16px] leading-7 text-[#5d605f] sm:text-[18px]">
              Urnas funerárias produzidas com tecnologia, agilidade e a atenção que cada despedida merece.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => scrollToId("catalogo")} className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#17191b] px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#a77f4b] active:scale-[0.97]">
                Ver catálogo <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <a href="https://wa.me/557533225900" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 rounded-full border border-[#17191b]/20 px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#17191b] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#a77f4b] hover:text-[#a77f4b]">
                Falar com a equipe <MessageCircle size={15} />
              </a>
            </div>
            <div className="mt-14 grid max-w-[520px] grid-cols-3 gap-5 border-t border-[#17191b]/15 pt-5">
              <div><strong className="font-serif text-3xl tracking-[-0.05em]">01</strong><span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.13em] text-[#727472]">Tecnologia</span></div>
              <div><strong className="font-serif text-3xl tracking-[-0.05em]">02</strong><span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.13em] text-[#727472]">Qualidade</span></div>
              <div><strong className="font-serif text-3xl tracking-[-0.05em]">BR</strong><span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.13em] text-[#727472]">Todo o país</span></div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[680px] lg:translate-y-6">
            <div className="absolute -left-5 top-8 z-10 hidden w-[142px] rounded-2xl border border-white/20 bg-[#17191b]/90 p-4 text-white shadow-2xl backdrop-blur md:block">
              <span className="mb-8 block text-[9px] font-bold uppercase tracking-[0.2em] text-[#d7c09f]">Nosso compromisso</span>
              <span className="block font-serif text-[26px] leading-none">Feito com</span>
              <span className="mt-1 block font-serif text-[26px] leading-none italic text-[#d7c09f]">cuidado.</span>
            </div>
            <div className="relative aspect-[0.93] overflow-hidden rounded-[2rem] bg-[#242526] shadow-[0_30px_80px_rgba(37,33,27,0.28)] sm:aspect-[1.06]">
              <img src={`${imageBase}sao-goncalo-hero.jpg`} alt="Detalhe de urna funerária em madeira e metal" className="h-full w-full object-cover object-center opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#111214]/60 via-transparent to-[#c29a65]/15" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between sm:bottom-7 sm:left-7 sm:right-7">
                <div className="max-w-[220px] text-white">
                  <span className="mb-2 block text-[9px] font-bold uppercase tracking-[0.22em] text-[#dec6a1]">Produção São Gonçalo</span>
                  <p className="font-serif text-2xl leading-none sm:text-3xl">Precisão que acolhe.</p>
                </div>
                <span className="grid h-12 w-12 place-items-center rounded-full border border-white/40 text-white"><ArrowUpRight size={19} /></span>
              </div>
            </div>
            <div className="absolute -bottom-7 -right-3 hidden h-[108px] w-[108px] rotate-12 place-items-center rounded-full border border-[#bc9460] bg-[#bc9460] text-center text-[9px] font-bold uppercase leading-4 tracking-[0.12em] text-[#17191b] shadow-xl sm:grid">Entrega<br />em todo<br />o Brasil</div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#17191b]/10 bg-[#17191b] text-white">
        <div className="mx-auto grid max-w-[1320px] grid-cols-2 px-5 sm:px-8 lg:grid-cols-4">
          {[
            ["Qualidade", "Padrões internacionais"],
            ["Tecnologia", "Fluxo produtivo moderno"],
            ["Atendimento", "Equipe pronta para apoiar"],
            ["Logística", "Entregas em todo o Brasil"],
          ].map(([title, detail], index) => (
            <div key={title} className={`flex min-h-[140px] flex-col justify-center gap-2 border-[#ffffff]/10 py-8 ${index % 2 === 0 ? 'border-r' : ''} ${index < 2 ? 'border-b lg:border-b-0' : ''} ${index !== 0 ? 'lg:border-l' : ''} lg:px-8`}>
              <span className="font-serif text-xl tracking-[-0.03em] text-[#d7c09f]">0{index + 1}</span>
              <strong className="text-[11px] font-bold uppercase tracking-[0.16em]">{title}</strong>
              <span className="text-[12px] text-[#a9aaa7]">{detail}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="catalogo" className="scroll-mt-24 px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-[1320px]">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-[660px]">
              <div className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#a77f4b]"><span className="h-px w-10 bg-[#bc9460]" />Catálogo completo</div>
              <h2 className="font-serif text-[clamp(2.8rem,5vw,5.4rem)] leading-[0.94] tracking-[-0.06em]">Modelos para cada <em className="font-normal text-[#a77f4b]">necessidade.</em></h2>
              <p className="mt-6 max-w-[520px] text-[15px] leading-7 text-[#6d706f]">Conheça os produtos recentes da São Gonçalo. Consulte nossa equipe para disponibilidade, medidas, acabamento e condições de fornecimento.</p>
            </div>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              {filters.map((filter) => (
                <button key={filter} onClick={() => setActiveFilter(filter)} className={`rounded-full border px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.16em] transition-all duration-200 active:scale-[0.97] ${activeFilter === filter ? 'border-[#17191b] bg-[#17191b] text-white' : 'border-[#17191b]/15 bg-transparent text-[#6d706f] hover:border-[#a77f4b] hover:text-[#a77f4b]'}`}>
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-14 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {visibleProducts.map((product, index) => (
              <article key={product.name} className="group cursor-pointer" onClick={() => setSelectedProduct(product)}>
                <div className="relative aspect-[1.16] overflow-hidden rounded-2xl bg-[#ddd4ca]">
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover mix-blend-multiply transition duration-500 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#17191b]/55 via-transparent to-transparent opacity-70" />
                  <span className="absolute left-4 top-4 rounded-full bg-[#f4f1ec]/90 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-[#5b5146]">{product.label}</span>
                  <span className="absolute bottom-4 right-4 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-[#17191b] opacity-0 shadow-lg transition duration-200 group-hover:opacity-100"><ArrowUpRight size={16} /></span>
                  <span className="absolute bottom-4 left-4 font-serif text-3xl text-white/90">0{index + 1}</span>
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-[22px] leading-none tracking-[-0.03em] text-[#252729]">{product.name}</h3>
                    <p className="mt-2 text-[12px] leading-5 text-[#777a78]">{product.description}</p>
                  </div>
                  <ChevronRight size={18} className="mt-1 shrink-0 text-[#a77f4b]" />
                </div>
              </article>
            ))}
          </div>
          <div className="mt-16 flex flex-col items-start justify-between gap-5 border-t border-[#17191b]/10 pt-5 text-[11px] text-[#7a7b78] sm:flex-row sm:items-center"><span>Mostrando {visibleProducts.length} de {products.length} modelos do catálogo público.</span><button onClick={() => scrollToId("contato")} className="group inline-flex items-center gap-2 font-bold uppercase tracking-[0.16em] text-[#a77f4b]">Solicitar catálogo completo <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></button></div>
        </div>
      </section>

      <section id="qualidade" className="scroll-mt-24 bg-[#e6dfd6] px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto grid max-w-[1320px] items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[0.92] overflow-hidden rounded-[2rem] bg-[#b9a18a] shadow-[0_22px_50px_rgba(64,52,39,0.15)] sm:aspect-[1.08]">
              <img src={`${imageBase}sao-goncalo-detail_edfc6b3d.jpg`} alt="Textura de madeira e detalhes metálicos de uma urna funerária" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-[#4a3421]/10 mix-blend-multiply" />
            </div>
            <div className="absolute -bottom-6 -right-3 max-w-[190px] rounded-2xl bg-[#17191b] p-5 text-white shadow-2xl sm:-right-8"><Gem size={21} className="mb-8 text-[#d7c09f]" /><p className="font-serif text-xl leading-[1.05]">Tecnologia com olhar humano.</p></div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#a77f4b]"><span className="h-px w-10 bg-[#bc9460]" />Como fazemos</div>
            <h2 className="max-w-[640px] font-serif text-[clamp(2.8rem,5vw,5rem)] leading-[0.96] tracking-[-0.06em]">Alta tecnologia.<br /><em className="font-normal text-[#a77f4b]">Mais cuidado.</em></h2>
            <p className="mt-7 max-w-[560px] text-[15px] leading-7 text-[#666966]">Com equipamentos de última geração e um fluxo de produção moderno, a São Gonçalo segue padrões internacionais de qualidade e otimização de processos.</p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {[
                [Factory, "Processo produtivo", "Agilidade, velocidade e segurança em cada etapa."],
                [ShieldCheck, "Padrões de qualidade", "Uma produção preparada para atender com consistência."],
                [HeartHandshake, "Atendimento próximo", "Tudo para apoiar parceiros e famílias com respeito."],
                [Truck, "Distribuição nacional", "Entregas em todo o Brasil com planejamento."],
              ].map(([Icon, title, text]) => {
                const IconComponent = Icon as typeof Factory;
                return <div key={title as string} className="border-t border-[#17191b]/15 pt-4"><IconComponent size={20} className="mb-5 text-[#a77f4b]" /><strong className="block text-[12px] font-bold uppercase tracking-[0.13em]">{title as string}</strong><p className="mt-2 text-[12px] leading-5 text-[#777a78]">{text as string}</p></div>;
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="empresa" className="scroll-mt-24 bg-[#17191b] px-5 py-24 text-white sm:px-8 lg:py-32">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid gap-12 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20">
            <div><div className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#d7c09f]"><span className="h-px w-10 bg-[#bc9460]" />São Gonçalo</div><h2 className="font-serif text-[clamp(2.8rem,5vw,5.2rem)] leading-[0.94] tracking-[-0.06em]">Uma indústria<br /><em className="font-normal text-[#d7c09f]">que entrega.</em></h2></div>
            <div className="grid gap-10 md:grid-cols-2 md:pt-14"><div><p className="font-serif text-[25px] leading-[1.1] text-[#f3ede4]">“Produzindo com a melhor qualidade.”</p><p className="mt-5 max-w-[380px] text-[14px] leading-7 text-[#a9aaa7]">A São Gonçalo une alta tecnologia, fluxo de produção moderno e atendimento próximo para servir o mercado funerário com agilidade e segurança.</p></div><div className="border-l border-[#ffffff]/15 pl-6"><div className="mb-8 flex items-center gap-3 text-[#d7c09f]"><Sparkles size={18} /><span className="text-[10px] font-bold uppercase tracking-[0.2em]">Em números</span></div><div className="grid grid-cols-2 gap-y-8"><div><strong className="font-serif text-4xl">08</strong><span className="mt-1 block text-[10px] uppercase tracking-[0.14em] text-[#a9aaa7]">modelos recentes</span></div><div><strong className="font-serif text-4xl">BR</strong><span className="mt-1 block text-[10px] uppercase tracking-[0.14em] text-[#a9aaa7]">entrega nacional</span></div><div><strong className="font-serif text-4xl">BA</strong><span className="mt-1 block text-[10px] uppercase tracking-[0.14em] text-[#a9aaa7]">base produtiva</span></div><div><strong className="font-serif text-4xl">24/7</strong><span className="mt-1 block text-[10px] uppercase tracking-[0.14em] text-[#a9aaa7]">respeito sempre</span></div></div></div></div>
          </div>
        </div>
      </section>

      <section id="contato" className="scroll-mt-24 px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
            <div>
              <div className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#a77f4b]"><span className="h-px w-10 bg-[#bc9460]" />Fale com a São Gonçalo</div>
              <h2 className="font-serif text-[clamp(2.8rem,5vw,5.2rem)] leading-[0.94] tracking-[-0.06em]">Vamos conversar<br /><em className="font-normal text-[#a77f4b]">com cuidado.</em></h2>
              <p className="mt-7 max-w-[480px] text-[15px] leading-7 text-[#6d706f]">Nossa equipe está pronta para orientar sobre modelos, disponibilidade, medidas, acabamento, logística e condições de fornecimento.</p>
              <div className="mt-9 flex flex-col gap-4 text-[13px] text-[#4e5251]">
                <a href="tel:+557533225900" className="group flex items-center gap-4"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#e6dfd6] text-[#a77f4b]"><Phone size={17} /></span><span><strong className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#17191b]">Telefone</strong><span className="group-hover:text-[#a77f4b]">(75) 3322-5900 · (75) 3322-5909</span></span></a>
                <a href="mailto:financeiro@urnassaogoncalo.com.br" className="group flex items-center gap-4"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#e6dfd6] text-[#a77f4b]"><MessageCircle size={17} /></span><span><strong className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#17191b]">E-mail</strong><span className="group-hover:text-[#a77f4b]">financeiro@urnassaogoncalo.com.br</span></span></a>
                <div className="flex items-center gap-4"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#e6dfd6] text-[#a77f4b]"><MapPin size={17} /></span><span><strong className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#17191b]">Endereço</strong><span>Rua dos Operários nº 85 · Bairro Cis/Tomba<br />CEP 44010-655 · Feira de Santana — BA</span></span></div>
              </div>
            </div>
            <div className="rounded-[2rem] bg-[#e6dfd6] p-6 sm:p-9">
              <div className="flex items-start justify-between gap-4"><div><span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a77f4b]">Atendimento</span><h3 className="mt-3 font-serif text-3xl tracking-[-0.04em]">Estamos aqui.</h3></div><Clock3 size={24} className="text-[#a77f4b]" /></div>
              <div className="mt-8 border-y border-[#17191b]/15 py-5 text-[13px] leading-7 text-[#5f625f]"><div className="flex justify-between gap-5"><span>Seg — Sex</span><strong className="text-[#17191b]">08:00 — 12:00<br />13:30 — 17:30</strong></div><div className="mt-3 flex justify-between gap-5"><span>Sábado</span><strong className="text-[#17191b]">08:00 — 12:00</strong></div></div>
              <p className="mt-7 text-[13px] leading-6 text-[#6d706f]">Para agilizar seu atendimento, fale com a equipe pelo telefone ou WhatsApp e informe o modelo de interesse.</p>
              <a href="https://wa.me/557533225900" target="_blank" rel="noreferrer" className="mt-7 flex items-center justify-between rounded-xl bg-[#17191b] px-5 py-4 text-white transition-all hover:bg-[#a77f4b] active:scale-[0.98]"><span className="text-[11px] font-bold uppercase tracking-[0.16em]">Chamar no WhatsApp</span><ArrowUpRight size={17} /></a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#17191b]/10 bg-[#ece6de] px-5 py-9 sm:px-8">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7b7d7a] sm:flex-row sm:items-center sm:justify-between"><span>© 2026 Indústria de Urnas São Gonçalo</span><span>Qualidade · Tecnologia · Atendimento</span><a href="#inicio" className="flex items-center gap-2 text-[#a77f4b]">Voltar ao topo <ChevronDown size={13} className="rotate-180" /></a></div>
      </footer>

      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#17191b]/65 p-4 backdrop-blur-sm sm:items-center" onClick={() => setSelectedProduct(null)}>
          <div className="max-h-[92vh] w-full max-w-[760px] overflow-auto rounded-[1.8rem] bg-[#f4f1ec] shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="grid sm:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-[260px] bg-[#ddd4ca] sm:min-h-[430px]"><img src={selectedProduct.image} alt={selectedProduct.name} className="h-full w-full object-cover mix-blend-multiply" /><button aria-label="Fechar detalhes" onClick={() => setSelectedProduct(null)} className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-[#17191b]"><X size={17} /></button></div>
              <div className="p-7 sm:p-10"><span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a77f4b]">{selectedProduct.label}</span><h3 className="mt-4 font-serif text-4xl leading-[0.95] tracking-[-0.05em]">{selectedProduct.name}</h3><p className="mt-6 text-[14px] leading-7 text-[#666966]">{selectedProduct.description}</p><div className="mt-8 border-t border-[#17191b]/15 pt-5 text-[11px] uppercase tracking-[0.12em] text-[#7b7d7a]">{selectedProduct.details}</div><a href="https://wa.me/557533225900" target="_blank" rel="noreferrer" className="mt-8 flex items-center justify-between rounded-xl bg-[#17191b] px-5 py-4 text-white transition-all hover:bg-[#a77f4b]"><span className="text-[11px] font-bold uppercase tracking-[0.15em]">Consultar este modelo</span><ArrowUpRight size={17} /></a></div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

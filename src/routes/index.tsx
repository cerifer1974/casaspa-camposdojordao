import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Bath,
  BedDouble,
  Calendar,
  ChevronRight,
  Coffee,
  Flame,
  Instagram,
  MapPin,
  MessageCircle,
  Mountain,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Trees,
  UtensilsCrossed,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConciergeBooking } from "@/components/ConciergeBooking";
const heroAsset = { url: "/images/SaveClip.App_785265639_18609305545022245_7413330073285849987_n.jpg" };
const bedroomAsset = { url: "/images/SaveClip.App_766764969_18601739062022245_6884120617230699439_n.jpg" };
const spaNightAsset = { url: "/images/SaveClip.App_768348017_18601738975022245_5622541170481989607_n.jpg" };
const mistAsset = { url: "/images/SaveClip.App_780238939_18608639719022245_1841419069032026891_n.jpg" };
const fireplaceAsset = { url: "/images/SaveClip.App_791483644_18609672109022245_1319292181042678013_n.jpg" };
const mountainsAsset = { url: "/images/SaveClip.App_790945582_18610120210022245_5709095221848406257_n.jpg" };
const breakfastAsset = { url: "/images/SaveClip.App_790669120_18610448164022245_5020404322209434489_n.jpg" };
const deckAsset = { url: "/images/SaveClip.App_813872616_18615497563022245_1367223161965432837_n.jpg" };
const bathAsset = { url: "/images/SaveClip.App_814229732_18615344434022245_1170989918068715585_n.jpg" };

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Casa Spa Campos do Jordão | Refúgio de luxo para dois" },
      {
        name: "description",
        content:
          "Casa exclusiva para dois na Serra da Mantiqueira, com spa privativo, lareira e vista para a Pedra do Baú.",
      },
      { property: "og:title", content: "Casa Spa Campos do Jordão" },
      {
        property: "og:description",
        content: "Silêncio, vapor e mata atlântica. Uma casa de luxo inteira, só para vocês dois.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const WHATSAPP_URL = "https://wa.me/5512999999999";
const AIRBNB_URL = "https://www.airbnb.com.br/";

const features = [
  { icon: Bath, title: "Circuito de Spa Privativo", text: "Sauna a vapor envidraçada, ofurô aquecido e ducha externa imersa na floresta." },
  { icon: Flame, title: "Lareira & Atmosfera Noturna", text: "Fogo aceso, adega e a noite fria da Mantiqueira do lado de fora das vidraças." },
  { icon: Mountain, title: "Vista para a Pedra do Baú", text: "Arquitetura aberta que enquadra o nascer do sol e a névoa sobre os vales da serra." },
  { icon: Coffee, title: "Cozinha Gourmet & Nespresso", text: "Espaço planejado para jantares a dois, com liberdade e privacidade total." },
  { icon: Sparkles, title: "Enxoval Nobre & Roupões", text: "Roupões aveludados, pantufas e cama macia para um descanso sem hora marcada." },
  { icon: ShieldCheck, title: "Check-in 100% Autônomo", text: "Acesso por senha digital com total privacidade e segurança ao lado do Palácio." },
];

const gallery = [
  { src: mistAsset.url, alt: "Casa Spa aberta para a mata em uma manhã de neblina", className: "gallery-a" },
  { src: spaNightAsset.url, alt: "Spa privativo iluminado durante a noite", className: "gallery-b" },
  { src: breakfastAsset.url, alt: "Mesa para dois diante das montanhas", className: "gallery-c" },
  { src: bathAsset.url, alt: "Ofurô integrado à arquitetura e à vista", className: "gallery-d" },
  { src: fireplaceAsset.url, alt: "Sala com lareira e cinema em uma noite na serra", className: "gallery-e" },
];

const testimonials = [
  {
    quote: "O lugar é um verdadeiro paraíso! Totalmente imersa na natureza, proporcionando uma paz indescritível. E um destaque especial para o Filipe, extremamente atencioso e solícito durante toda a estadia, sempre disponível pelo WhatsApp e com ótimas dicas gastronômicas.",
    author: "Patrícia",
    context: "Avaliação 5.0 ★ no Airbnb · Julho de 2026",
  },
  {
    quote: "O lugar é exatamente como as fotos: lindo, confortável e privativo! Filipe muito prestativo desde a reserva, indicando fornecedores e cafés. Passei um dia e foi tão relaxante que pareceu uma estadia de 5 dias. Voltarei com certeza!",
    author: "Camila",
    context: "Avaliação 5.0 ★ no Airbnb (10 anos na plataforma) · Maio de 2026",
  },
  {
    quote: "A casa é exatamente como anunciado: muito confortável, silenciosa e com uma vista impecável! O ideal é ir para curtir a casa em si, pois ela é um espetáculo. Aproveitem cada momento!",
    author: "Paulo Augusto",
    context: "Avaliação 5.0 ★ no Airbnb · Maio de 2026",
  },
  {
    quote: "Uma noite surreal, valeu cada centavo! Sauna, ofurô, jacuzzi, cozinha completa e cama de altíssima qualidade. O Filipe ainda indicou serviços extras de massagista e arranjos. Um dos lugares mais completos que já ficamos!",
    author: "Edivaldo",
    context: "Avaliação 5.0 ★ no Airbnb · Março de 2026",
  },
];

function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

function Brand() {
  return (
    <a href="#inicio" className="group leading-none" aria-label="Casa Spa — início">
      <span className="block font-display text-xl uppercase tracking-[0.18em] sm:text-2xl">Casa Spa</span>
      <span className="mt-1 block text-[0.52rem] uppercase tracking-[0.38em] opacity-75">Campos do Jordão</span>
    </a>
  );
}

function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [testimonial, setTestimonial] = useState(0);
  const testimonialRef = useRef<HTMLDivElement>(null);
  useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const changeTestimonial = (next: number) => {
    setTestimonial((next + testimonials.length) % testimonials.length);
    testimonialRef.current?.focus();
  };

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <header className={`site-header ${scrolled ? "site-header-scrolled" : ""}`}>
        <div className="mx-auto grid h-full max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:px-8 lg:px-12">
          <Brand />
          <div className="flex shrink-0 items-center gap-3 sm:gap-8">
            <nav className="hidden items-center gap-7 text-xs uppercase tracking-[0.14em] lg:flex" aria-label="Navegação principal">
              <a className="nav-link" href="#experiencia">Experiência</a>
              <a className="nav-link" href="#galeria">Galeria</a>
              <a className="nav-link" href="#localizacao">Localização</a>
            </nav>
            <Button variant="luxury" size="luxury" asChild className="h-10 px-4 sm:h-11 sm:px-5">
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                <MessageCircle aria-hidden="true" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
            </Button>
          </div>
        </div>
      </header>

      <section id="inicio" className="hero-section">
        <img src={heroAsset.url} alt="Casa Spa iluminada ao anoitecer, cercada pela mata" className="hero-image" />
        <div className="hero-shade" />
        <div className="relative z-10 mx-auto flex min-h-[92svh] max-w-[1440px] flex-col justify-end px-5 pb-14 pt-32 sm:px-8 sm:pb-20 lg:min-h-screen lg:px-12 lg:pb-24">
          <p className="mb-5 text-xs uppercase tracking-[0.28em] text-primary-foreground/80">Casa inteira · 138 m² · Apenas 2 hóspedes</p>
          <h1 className="max-w-5xl font-display text-[clamp(3.2rem,7vw,7.4rem)] leading-[0.92] text-primary-foreground">
            Um spa de luxo escondido nas montanhas.
            <em className="mt-2 block font-normal text-accent">Só para vocês dois.</em>
          </h1>
          <div className="mt-8 flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-10">
            <p className="max-w-sm text-sm leading-relaxed text-primary-foreground/80 sm:text-base">
              Serra da Mantiqueira, Campos do Jordão. Vidro, madeira, fogo e silêncio dentro de uma reserva de Mata Atlântica.
            </p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button variant="luxury" size="luxury" asChild>
                <a href="#reserva">Verificar disponibilidade <ChevronRight /></a>
              </Button>
              <Button variant="luxuryOutline" size="luxury" asChild>
                <a href="#experiencia">Ver a experiência <ArrowDown /></a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Reconhecimento" className="proof-strip">
        <div className="mx-auto grid max-w-[1440px] divide-y divide-border/30 px-5 sm:grid-cols-2 sm:divide-x sm:divide-y-0 sm:px-8 lg:grid-cols-4 lg:px-12">
          <Proof icon={Star} main="4,98 no Airbnb" sub="125 avaliações" />
          <Proof icon={ShieldCheck} main="Superhost" sub="há 6 anos" />
          <Proof icon={Sparkles} main="Nota 10 no Google" sub="9,8 no Airbnb · 9,5 Pousadas Top" />
          <Proof icon={Instagram} main="+53 mil" sub="seguidores no Instagram" />
        </div>
      </section>

      <section id="experiencia" className="section-space bg-background">
        <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-24 lg:px-12">
          <div className="relative" data-reveal>
            <img src={bedroomAsset.url} alt="Cama voltada para a varanda e as montanhas" className="h-[64svh] max-h-[780px] min-h-[520px] w-full object-cover" />
            <div className="absolute -bottom-8 right-0 bg-primary px-7 py-6 text-primary-foreground sm:right-8 sm:px-10">
              <span className="block font-display text-4xl">138 m²</span>
              <span className="text-[0.65rem] uppercase tracking-[0.24em] opacity-75">de absoluta privacidade</span>
            </div>
          </div>
          <div className="pt-8 lg:pt-0" data-reveal>
            <Eyebrow>Uma casa. Um casal. Nenhuma pressa.</Eyebrow>
            <h2 className="section-title">Não é hotel.<br />É um lugar inteiro para vocês.</h2>
            <div className="mt-8 max-w-xl space-y-5 text-base leading-8 text-muted-foreground">
              <p>Uma única casa, aberta para a floresta por vidraças do chão ao teto. Não há corredores, recepção ou outros hóspedes. Só o som da mata e o tempo de vocês.</p>
              <p>Pela manhã, a névoa atravessa o vale. À noite, a lareira crepita enquanto o vapor da sauna encontra o ar frio da serra.</p>
              <p>A experiência é self-service premium: cozinha completa, Nespresso e liberdade para criar o próprio ritmo — sem pensão ou café da manhã incluso.</p>
            </div>
            <div className="mt-10 flex items-center gap-4 border-t border-border pt-6 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <BedDouble className="text-accent-strong" />
              Exclusivo para dois adultos
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24 sm:py-32">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div data-reveal>
            <Eyebrow>Dentro da experiência</Eyebrow>
            <h2 className="section-title max-w-3xl">O essencial, elevado ao extraordinário.</h2>
          </div>
          <div className="mt-16 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3" data-reveal>
            {features.map(({ icon: Icon, title, text }, index) => (
              <article key={title} className="feature-cell">
                <div className="flex items-start justify-between gap-5">
                  <Icon className="h-7 w-7 text-accent-strong" strokeWidth={1.4} />
                  <span className="font-display text-sm text-muted-foreground/60">0{index + 1}</span>
                </div>
                <h3 className="mt-12 font-display text-3xl">{title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="galeria" className="section-space bg-background">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="mb-12 flex items-end justify-between gap-8" data-reveal>
            <div>
              <Eyebrow>A casa em cada estação</Eyebrow>
              <h2 className="section-title">Entre a névoa e o fogo.</h2>
            </div>
            <p className="hidden max-w-xs text-right text-sm leading-6 text-muted-foreground md:block">A paisagem muda. A sensação de estar longe de tudo permanece.</p>
          </div>
          <div className="editorial-gallery" data-reveal>
            {gallery.map((image) => (
              <figure key={image.src} className={image.className}>
                <img src={image.src} alt={image.alt} loading="lazy" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="localizacao" className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-2">
          <div className="relative min-h-[560px] overflow-hidden">
            <img src={mountainsAsset.url} alt="Vista ampla da Serra da Mantiqueira" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-primary/25" />
            <div className="map-mark absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="map-pulse" />
              <MapPin className="h-8 w-8" />
              <span className="mt-3 whitespace-nowrap bg-primary/85 px-4 py-2 text-[0.65rem] uppercase tracking-[0.2em]">Casa Spa</span>
            </div>
          </div>
          <div className="px-5 py-20 sm:px-12 lg:px-16 lg:py-28" data-reveal>
            <Eyebrow light>Isolada, sem estar distante</Eyebrow>
            <h2 className="section-title text-primary-foreground">Perto da cidade.<br />Dentro da mata.</h2>
            <p className="mt-7 max-w-lg leading-7 text-primary-foreground/70">Próxima ao Palácio do Governo, a casa preserva silêncio e segurança sem abrir mão do acesso ao melhor de Campos do Jordão.</p>
            <div className="mt-12 divide-y divide-primary-foreground/20 border-y border-primary-foreground/20">
              <Distance time="2h" label="Aeroporto de Guarulhos" />
              <Distance time="10 min" label="Centro de Campos do Jordão" />
              <Distance time="2 min" label="Restaurante Vecchia Toscana" />
              <Distance time="4 min" label="Museu Felicia Leirner" />
            </div>
            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-xs uppercase tracking-[0.14em] text-primary-foreground/60">
              <span>Restaurante Horizonte</span><span>Vinícola Santa Maria</span><span>Auditório Claudio Santoro</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space bg-secondary" aria-label="Avaliações de hóspedes">
        <div className="mx-auto max-w-5xl px-5 text-center sm:px-8" data-reveal>
          <div className="mx-auto flex w-fit items-center gap-2 text-accent-strong">
            {[0, 1, 2, 3, 4].map((star) => <Star key={star} className="h-4 w-4 fill-current" />)}
          </div>
          <p className="mt-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">4,98 de 5 · 125 avaliações no Airbnb</p>
          <Quote className="mx-auto mt-12 h-10 w-10 text-accent-strong/55" strokeWidth={1} />
          <div ref={testimonialRef} tabIndex={-1} className="mt-8 min-h-[170px] outline-none" aria-live="polite">
            <blockquote className="font-display text-2xl leading-relaxed sm:text-4xl">“{testimonials[testimonial].quote}”</blockquote>
            <div className="mt-6">
              <span className="block font-medium text-sm text-foreground">{testimonials[testimonial].author}</span>
              <span className="text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">{testimonials[testimonial].context}</span>
            </div>
          </div>
          <div className="mt-8 flex items-center justify-center gap-4">
            <button className="carousel-button" onClick={() => changeTestimonial(testimonial - 1)} aria-label="Avaliação anterior"><ArrowLeft /></button>
            <span className="min-w-14 text-xs tracking-[0.22em] text-muted-foreground">0{testimonial + 1} / 04</span>
            <button className="carousel-button" onClick={() => changeTestimonial(testimonial + 1)} aria-label="Próxima avaliação"><ArrowRight /></button>
          </div>
          <div className="mx-auto mt-14 inline-flex items-center gap-3 border border-border bg-background px-5 py-3 text-xs uppercase tracking-[0.16em]">
            <ShieldCheck className="text-accent-strong" /> Superhost há 6 anos
          </div>
        </div>
      </section>

      <section id="reserva" className="relative isolate min-h-[840px] overflow-hidden py-24 sm:py-32">
        <img src={deckAsset.url} alt="Deck da Casa Spa envolto pela neblina" className="absolute inset-0 -z-20 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 -z-10 bg-primary/80 backdrop-blur-[2px]" />
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12 text-primary-foreground">
          <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16" data-reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">A serra espera por vocês</p>
            <h2 className="mt-5 font-display text-[clamp(2.6rem,5.5vw,5.2rem)] leading-[0.98]">Dois dias podem mudar o ritmo de tudo.</h2>
            <p className="mx-auto mt-5 max-w-xl text-sm sm:text-base leading-relaxed text-primary-foreground/80">
              Consulte as datas de sua preferência com atendimento privativo e descubra as vantagens exclusivas da reserva direta.
            </p>
          </div>

          <div data-reveal>
            <ConciergeBooking />
          </div>
        </div>
      </section>

      {/* Floating Concierge Bar no Mobile (quando rolar) */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 flex items-center justify-between border-t border-border/80 bg-background/95 px-4 py-3 shadow-2xl backdrop-blur-lg transition-transform duration-300 md:hidden ${
          scrolled ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div>
          <span className="block font-display text-sm leading-tight text-foreground">Casa Spa</span>
          <span className="text-[0.65rem] uppercase tracking-[0.16em] text-accent-strong">
            Exclusivo para 2 adultos
          </span>
        </div>
        <Button variant="luxury" size="sm" asChild className="h-10 px-4 text-xs">
          <a href="#reserva">
            <Calendar className="h-3.5 w-3.5" />
            <span>Consultar Datas</span>
          </a>
        </Button>
      </div>

      <footer className="bg-footer py-14 text-footer-foreground pb-24 md:pb-14">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 sm:px-8 md:grid-cols-[1fr_auto] md:items-end lg:px-12">
          <div>
            <Brand />
            <p className="mt-5 max-w-md text-sm leading-6 text-footer-foreground/60">Uma casa de luxo para dois, dentro de uma reserva de Mata Atlântica em Campos do Jordão.</p>
          </div>
          <div className="grid gap-4 text-sm md:text-right">
            <a className="footer-link" href="https://instagram.com/casaspacamposdojordao" target="_blank" rel="noreferrer">@casaspacamposdojordao</a>
            <span className="text-footer-foreground/45">WhatsApp e e-mail: adicionar contatos oficiais</span>
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-[1440px] flex-col gap-3 border-t border-footer-foreground/15 px-5 pt-7 text-[0.68rem] uppercase tracking-[0.15em] text-footer-foreground/45 sm:px-8 md:flex-row md:justify-between lg:px-12">
          <span>© 2026 Casa Spa Campos do Jordão</span>
          <span>Idade mínima 18 anos · Não aceita pets · Hospedagem sem pensão</span>
        </div>
      </footer>
    </main>
  );
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`mb-5 text-xs uppercase tracking-[0.24em] ${light ? "text-accent" : "text-accent-strong"}`}>{children}</p>;
}

function Proof({ icon: Icon, main, sub }: { icon: typeof Star; main: string; sub: string }) {
  return (
    <div className="flex min-h-28 items-center gap-4 py-6 sm:px-6 lg:px-8">
      <Icon className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.5} />
      <div><strong className="block font-display text-lg font-normal">{main}</strong><span className="text-[0.68rem] uppercase tracking-[0.12em] text-primary-foreground/55">{sub}</span></div>
    </div>
  );
}

function Distance({ time, label }: { time: string; label: string }) {
  return <div className="grid grid-cols-[5rem_minmax(0,1fr)] items-center gap-4 py-5"><strong className="font-display text-2xl font-normal text-accent">{time}</strong><span className="text-sm text-primary-foreground/80">{label}</span></div>;
}
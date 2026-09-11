"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TICKET_URL = "https://museuflamengo.eleventickets.com/#!/home";

const gallery = [
  { src: "/images/museu-entrada.webp", alt: "Entrada imersiva do Museu Flamengo", label: "A porta de entrada" },
  { src: "/images/museu-trofeus.webp", alt: "Galeria de troféus do Flamengo", label: "Conquistas de perto" },
  { src: "/images/gavea-05.webp", alt: "Campo da sede da Gávea com arquibancada rubro-negra", label: "A casa do clube" },
  { src: "/images/museu-imersao.webp", alt: "Sala imersiva do Museu Flamengo", label: "História em movimento" },
  { src: "/images/gavea-07.webp", alt: "Fachada histórica da sede da Gávea", label: "Por dentro da Gávea" },
  { src: "/images/museu-camisas.webp", alt: "Camisas históricas expostas no museu", label: "O Manto através do tempo" },
];

const benefits = [
  ["01", "Visita guiada", "Caminhe pela sede da Gávea com histórias e contexto contados por quem conhece a casa."],
  ["02", "Memória viva", "Troféus, camisas, imagens e símbolos que aproximam você dos capítulos marcantes do clube."],
  ["03", "Experiência interativa", "Totens, projeções e ativações transformam a visita em algo para sentir e participar."],
  ["04", "Para guardar", "Cenários e espaços feitos para viver o momento e registrar uma lembrança rubro-negra."],
];

function TicketLink({ className = "primary-button", children }: { className?: string; children: React.ReactNode }) {
  return (
    <a className={className} href={TICKET_URL} target="_blank" rel="noreferrer">
      {children} <span aria-hidden="true">↗</span>
    </a>
  );
}

export default function LandingPage() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-frame", { clipPath: "inset(100% 0 0 0)", duration: 1.25 })
        .from(".hero-line > span", { yPercent: 115, duration: 0.95, stagger: 0.1 }, "-=0.8")
        .from(".hero-copy", { y: 24, opacity: 0, duration: 0.7 }, "-=0.45")
        .from(".hero-actions", { y: 20, opacity: 0, duration: 0.65 }, "-=0.4");

      gsap.to(".hero-frame img", {
        scale: 1.13,
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 56,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
        const image = element.querySelector("img");
        if (!image) return;
        gsap.fromTo(
          image,
          { yPercent: -7, scale: 1.08 },
          { yPercent: 7, ease: "none", scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });

      const mm = gsap.matchMedia();
      mm.add("(min-width: 901px)", () => {
        const stage = document.querySelector<HTMLElement>(".gallery-stage");
        const track = document.querySelector<HTMLElement>(".gallery-track");
        if (!stage || !track) return;
        const distance = () => Math.max(0, track.scrollWidth - stage.clientWidth + 56);
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      mm.add("(max-width: 900px)", () => {
        const mobileBuy = document.querySelector<HTMLElement>(".mobile-buy");
        if (!mobileBuy) return;

        gsap.set(mobileBuy, { yPercent: 110 });
        const trigger = ScrollTrigger.create({
          trigger: ".manifesto",
          start: "top bottom",
          onEnter: () => gsap.to(mobileBuy, { yPercent: 0, duration: 0.45, ease: "power3.out" }),
          onLeaveBack: () => gsap.to(mobileBuy, { yPercent: 110, duration: 0.35, ease: "power3.in" }),
        });

        return () => trigger.kill();
      });

      return () => mm.revert();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={root}>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Museu Flamengo — início">
          <Image src="/images/museu-flamengo-logo.png" alt="Museu Flamengo" width={1013} height={313} priority />
        </a>
        <nav aria-label="Navegação principal">
          <a href="#experiencia">A experiência</a>
          <a href="#por-dentro">Por dentro</a>
          <a href="#visita">Planeje sua visita</a>
        </nav>
        <TicketLink className="header-cta">Comprar ingresso</TicketLink>
      </header>

      <section className="hero" id="top">
        <div className="hero-frame" aria-hidden="true">
          <Image src="/images/gavea-06.webp" alt="" fill priority sizes="100vw" />
          <div className="hero-shade" />
        </div>
        <div className="hero-grid">
          <div className="hero-kicker"><span>Rio de Janeiro</span><span>Gávea</span></div>
          <h1>
            <span className="hero-line"><span>Entre na</span></span>
            <span className="hero-line accent"><span>história.</span></span>
            <span className="hero-line"><span>Viva o</span></span>
            <span className="hero-line"><span>Flamengo.</span></span>
          </h1>
          <div className="hero-bottom">
            <p className="hero-copy">Museu Flamengo + Tour guiado pela sede da Gávea. Dois lados da mesma paixão, em uma experiência que só existe aqui.</p>
            <div className="hero-actions">
              <TicketLink>Garanta seu ingresso</TicketLink>
              <a className="text-link" href="#experiencia">Descubra a experiência <span>↓</span></a>
            </div>
          </div>
        </div>
        <div className="hero-index" aria-hidden="true">01 / A CASA DA NAÇÃO</div>
      </section>

      <div className="motion-strip" aria-hidden="true">
        <div className="motion-strip-track">
          <span>Museu Flamengo</span><i>✦</i><span>Tour da Gávea</span><i>✦</i><span>A casa da Nação</span><i>✦</i>
          <span>Museu Flamengo</span><i>✦</i><span>Tour da Gávea</span><i>✦</i><span>A casa da Nação</span><i>✦</i>
        </div>
      </div>

      <section className="manifesto section-pad" id="experiencia">
        <div className="section-label" data-reveal><span>02</span> A experiência</div>
        <div className="manifesto-layout">
          <h2 data-reveal>Não é só sobre o que você vai ver.</h2>
          <div className="manifesto-side" data-reveal>
            <p>É sobre atravessar os lugares onde a história continua acontecendo. Entrar na Gávea. Reconhecer o Manto. Chegar perto das conquistas. E sair sentindo que a casa também é sua.</p>
            <span className="small-rule">Pode acontecer.</span>
          </div>
        </div>
        <div className="duo-grid">
          <article className="experience-card tour-card" data-reveal>
            <div className="card-image" data-parallax>
              <Image src="/images/gavea-07.webp" alt="Sede histórica do Flamengo na Gávea" fill sizes="(max-width: 900px) 100vw, 50vw" />
            </div>
            <div className="card-number">01</div>
            <div className="card-content">
              <p className="eyebrow">Comece por aqui</p>
              <h3>Tour da Gávea</h3>
              <p>Uma visita guiada pelos espaços da sede, com paradas que revelam a história e o cotidiano do clube.</p>
              <ul><li>Cerca de 50 minutos</li><li>Horário agendado</li><li>Grupos de até 40 pessoas</li></ul>
            </div>
          </article>
          <article className="experience-card museum-card" data-reveal>
            <div className="card-image" data-parallax>
              <Image src="/images/museu-protagonistas.webp" alt="Escultura e ambientação do Museu Flamengo" fill sizes="(max-width: 900px) 100vw, 50vw" />
            </div>
            <div className="card-number">02</div>
            <div className="card-content">
              <p className="eyebrow">Continue vivendo</p>
              <h3>Museu Flamengo</h3>
              <p>Uma jornada interativa entre troféus, camisas, protagonistas e momentos que atravessam gerações.</p>
              <ul><li>Cerca de 40 minutos</li><li>Aberto diariamente, das 9h às 18h</li><li>Mediadores e recursos interativos</li></ul>
            </div>
          </article>
        </div>
        <p className="sequence-note" data-reveal><span>O roteiro ideal</span> Faça o Tour primeiro. Depois, mergulhe no Museu no seu ritmo.</p>
      </section>

      <section className="dark-feature">
        <div className="dark-feature-media" data-parallax>
          <Image src="/images/museu-imersao.webp" alt="Experiência audiovisual imersiva dentro do Museu Flamengo" fill sizes="(max-width: 900px) 100vw, 58vw" />
        </div>
        <div className="dark-feature-copy">
          <div className="section-label light" data-reveal><span>03</span> Mais que uma exposição</div>
          <h2 data-reveal>Você não vem só ver. Vem sentir.</h2>
          <p data-reveal>A experiência combina memória, imagem, som e interação para transformar cada sala em uma aproximação real com o Flamengo.</p>
          <TicketLink>Quero viver isso</TicketLink>
        </div>
      </section>

      <section className="benefits section-pad">
        <div className="benefits-head">
          <div className="section-label" data-reveal><span>04</span> O que está incluído</div>
          <h2 data-reveal>Uma visita.<br />Muitos jeitos de se arrepiar.</h2>
        </div>
        <div className="benefits-list">
          {benefits.map(([number, title, copy]) => (
            <article key={number} className="benefit-row" data-reveal>
              <span>{number}</span><h3>{title}</h3><p>{copy}</p><i aria-hidden="true">↗</i>
            </article>
          ))}
        </div>
      </section>

      <section className="gallery-stage" id="por-dentro">
        <div className="gallery-intro">
          <div className="section-label light"><span>05</span> Por dentro da experiência</div>
          <h2>Veja de perto.<br /><em>Leve para sempre.</em></h2>
          <p>Arraste para descobrir</p>
        </div>
        <div className="gallery-track">
          {gallery.map((item, index) => (
            <figure className={`gallery-item gallery-item-${index + 1}`} key={item.src}>
              <Image src={item.src} alt={item.alt} fill sizes="(max-width: 900px) 78vw, 38vw" />
              <figcaption><span>{String(index + 1).padStart(2, "0")}</span>{item.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="visit section-pad" id="visita">
        <div className="visit-title">
          <div className="section-label" data-reveal><span>06</span> Planeje sua visita</div>
          <h2 data-reveal>Seu próximo capítulo começa na Gávea.</h2>
        </div>
        <div className="visit-image" data-parallax data-reveal>
          <Image src="/images/gavea-03.webp" alt="Vista da sede do Flamengo na Gávea" fill sizes="(max-width: 900px) 100vw, 58vw" />
          <div className="map-stamp"><span>RJ</span> Gávea</div>
        </div>
        <div className="visit-info" data-reveal>
          <div><span>Onde</span><strong>Sede da Gávea<br />Rio de Janeiro</strong></div>
          <div><span>Museu</span><strong>Todos os dias<br />9h — 18h</strong></div>
          <div><span>Tour</span><strong>Horários agendados<br />Vagas limitadas</strong></div>
          <TicketLink>Ver datas e ingressos</TicketLink>
          <small>Horários, valores e disponibilidade podem variar. Consulte as opções atualizadas na bilheteria oficial.</small>
        </div>
      </section>

      <section className="faq section-pad" aria-labelledby="faq-title">
        <div className="faq-heading">
          <div className="section-label light"><span>07</span> Antes de ir</div>
          <h2 id="faq-title">Perguntas<br />frequentes.</h2>
        </div>
        <div className="faq-list">
          <details><summary>O que o ingresso combinado inclui?<span>+</span></summary><p>O combo reúne o Tour guiado pela sede da Gávea e a entrada no Museu Flamengo. As opções disponíveis para cada data aparecem na bilheteria oficial.</p></details>
          <details><summary>Quanto tempo reservar para a experiência?<span>+</span></summary><p>O Tour dura em média 50 minutos e a visita ao Museu, cerca de 40 minutos. Vale reservar um pouco mais de tempo para aproveitar tudo com calma.</p></details>
          <details><summary>É preciso escolher horário?<span>+</span></summary><p>Sim, o Tour acontece em horários agendados e tem grupos limitados. O Museu funciona diariamente e pode completar o seu roteiro no mesmo passeio.</p></details>
          <details><summary>Onde compro o ingresso?<span>+</span></summary><p>A compra é feita pela bilheteria oficial online. Lá você encontra as datas, categorias, valores e disponibilidades atualizados.</p></details>
        </div>
      </section>

      <section className="final-cta">
        <div className="final-cta-bg" aria-hidden="true">
          <Image src="/images/museu-trofeus.webp" alt="" fill sizes="100vw" />
        </div>
        <div className="final-cta-content">
          <p data-reveal>A história está esperando por você.</p>
          <h2 data-reveal><span>O Flamengo</span><span>fica na memória.</span></h2>
          <TicketLink>Garanta seu ingresso</TicketLink>
        </div>
      </section>

      <footer>
        <Image src="/images/museu-flamengo-logo.png" alt="Museu Flamengo" width={1013} height={313} />
        <p>Museu Flamengo + Tour da Gávea</p>
        <a href="#top">Voltar ao topo ↑</a>
      </footer>

      <TicketLink className="mobile-buy">Comprar ingresso</TicketLink>
    </main>
  );
}

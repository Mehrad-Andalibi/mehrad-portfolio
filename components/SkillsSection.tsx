"use client";

import { useRef } from "react";
import { BarChart3, Code2, Database, GitBranch, Monitor, Server, Sparkles, Terminal } from "lucide-react";
import SplitWords from "@/components/motion/SplitWords";
import { useReveal } from "@/components/motion/useReveal";
import IconBadge from "@/components/ui/IconBadge";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

const LANGUAGES = ["Java", "SQL", "JavaScript", "Python", "PHP", "Dart", "Shell"];

// Ordered like a request travelling through a three-tier application
const TIERS = [
  { id: "web", icon: Monitor, name: "Web", role: "Presentation", skills: ["HTML", "CSS", "JavaScript", "PHP"] },
  {
    id: "backend",
    icon: Server,
    name: "Backend",
    role: "Business logic",
    skills: ["Spring Boot", "Java Servlets", "MVC Architecture", "RESTful APIs", "DAO Pattern", "JUnit Testing", "Session Management", "Auth & Access Control"],
  },
  { id: "data", icon: Database, name: "Databases", role: "Persistence", skills: ["MySQL", "Oracle", "SQL Server", "Microsoft Access", "MongoDB", "Neo4j"] },
];

const BEYOND = [
  { id: "data", icon: BarChart3, name: "Data & analysis", note: "Querying, analysing and reporting on data", skills: ["SQL", "Python", "Statistics", "Google Analytics"], learning: false },
  { id: "learning", icon: Sparkles, name: "Learning now", note: "Where I'm growing next", skills: ["AWS cloud architecture", "Business intelligence", "AI agents & LLM APIs", "AI coding tools"], learning: true },
];

const TOOLS = [
  { icon: GitBranch, name: "Git" },
  { icon: Terminal, name: "Linux / UNIX" },
  { icon: Terminal, name: "RHEL" },
  { icon: Terminal, name: "Ubuntu" },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // the three tiers assemble: they start spread apart and slide together as you scroll
        gsap.utils.toArray<HTMLElement>(".tier").forEach((tier, i) => {
          gsap.fromTo(
            tier,
            { yPercent: (i - 1) * 18, opacity: 0.35, scale: 0.94 },
            {
              yPercent: 0,
              opacity: 1,
              scale: 1,
              ease: "power1.out",
              scrollTrigger: { trigger: ".tiers", start: "top 90%", end: "top 35%", scrub: 0.8 },
            },
          );
          gsap.from(tier.querySelectorAll(".chip"), {
            opacity: 0,
            y: 10,
            duration: 0.5,
            stagger: 0.035,
            ease: "power2.out",
            scrollTrigger: { trigger: tier, start: "top 75%", once: true },
          });
        });
        gsap.utils.toArray<HTMLElement>(".tier-link-line").forEach((line) => {
          gsap.fromTo(line, { scale: 0 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".tiers", start: "top 60%", end: "top 35%", scrub: true } });
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section id="skills" ref={sectionRef} className="overflow-hidden bg-paper py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-5 text-center md:px-6">
        <div className="flex justify-center">
          <IconBadge icon={Code2} size="lg" pop={0} />
        </div>
        <p className="label mt-6 text-muted" data-reveal>
          Skills
        </p>
        <h2 className="mx-auto mt-3 font-display text-[clamp(2.4rem,6vw,5rem)] leading-[1.02] font-medium tracking-[-0.035em] text-ink" data-split>
          <SplitWords text="Technical stack." />
        </h2>
        <p className="mx-auto mt-5 max-w-[46ch] font-serif text-[1.1rem] leading-relaxed text-muted" data-reveal="1">
          The languages, frameworks and tools I work with, from the tiers of an application to data and analysis, plus what
          I&apos;m learning next.
        </p>
      </div>

      {/* Languages marquee */}
      <div className="marquee relative mt-14 md:mt-20" aria-label="Languages">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-paper to-transparent md:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-paper to-transparent md:w-40" />
        <ul className="sr-only">
          {LANGUAGES.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
        <div className="marquee-track flex w-max gap-3 md:gap-4" aria-hidden="true">
          {[...LANGUAGES, ...LANGUAGES, ...LANGUAGES, ...LANGUAGES].map((l, i) => (
            <span
              key={i}
              className="rounded-full bg-surface px-6 py-3 font-display text-[clamp(1.1rem,2.2vw,1.6rem)] tracking-tight text-ink shadow-card md:px-8 md:py-4"
            >
              {l}
            </span>
          ))}
        </div>
      </div>

      {/* Three tiers */}
      <div className="tiers mx-auto mt-16 grid max-w-6xl gap-3 px-5 md:mt-24 md:px-6 lg:grid-cols-[1fr_auto_1.35fr_auto_1fr] lg:items-stretch lg:gap-0">
        {TIERS.map((tier, i) => (
          <div key={tier.id} className="contents">
            <article className="tier rounded-[28px] bg-surface p-6 text-left shadow-card md:p-8">
              <div className="flex items-start justify-between gap-4">
                <IconBadge icon={tier.icon} tone={i === 1 ? "ink" : "accent"} />
                <span className="label pt-1 text-muted">Tier {i + 1}</span>
              </div>
              <h3 className="mt-6 font-display text-[1.6rem] font-medium tracking-tight text-ink">{tier.name}</h3>
              <p className="label mt-1 text-muted">{tier.role}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {tier.skills.map((s) => (
                  <li
                    key={s}
                    className="chip rounded-full border border-line bg-paper/60 px-3 py-1.5 font-mono text-[0.78rem] text-ink/85 transition-[border-color,background-color,transform] duration-300 ease-film hover:-translate-y-0.5 hover:border-accent hover:bg-white"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </article>
            {i < TIERS.length - 1 && (
              <div className="relative flex h-10 items-center justify-center lg:h-auto lg:w-10" aria-hidden="true">
                <span className="tier-link-line block h-full w-px origin-top bg-line lg:h-px lg:w-full lg:origin-left" />
                <span className="packet absolute h-2 w-2 rounded-full bg-accent" />
                <span className="packet packet-back absolute h-2 w-2 rounded-full bg-signal" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Beyond the application tiers */}
      <div className="mx-auto mt-3 grid max-w-6xl gap-3 px-5 md:grid-cols-2 md:px-6 lg:mt-4 lg:gap-4">
        {BEYOND.map((b, i) => (
          <article key={b.id} className="rounded-[28px] bg-surface p-6 text-left shadow-card md:p-8" data-reveal={i}>
            <div className="flex items-center gap-4">
              <IconBadge icon={b.icon} tone={b.learning ? "signal" : "accent"} pop={i} />
              <div>
                <h3 className="font-display text-[1.4rem] font-medium tracking-tight text-ink">{b.name}</h3>
                <p className="font-serif text-[0.95rem] text-muted">{b.note}</p>
              </div>
            </div>
            <ul className="mt-6 flex flex-wrap gap-2">
              {b.skills.map((s) => (
                <li
                  key={s}
                  className={`rounded-full px-3 py-1.5 font-mono text-[0.78rem] transition-transform duration-300 ease-film hover:-translate-y-0.5 ${
                    b.learning ? "border border-dashed border-signal/50 text-signal" : "border border-line bg-paper/60 text-ink/85"
                  }`}
                >
                  {s}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {/* Tooling */}
      <div className="mx-auto mt-10 flex max-w-6xl flex-wrap items-center justify-center gap-3 px-5 md:px-6" data-reveal>
        <span className="label mr-1 text-muted">Runs on</span>
        {TOOLS.map((t) => (
          <span key={t.name} className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 font-mono text-[0.82rem] text-ink/85 shadow-card">
            <t.icon className="h-4 w-4 text-accent" strokeWidth={1.75} aria-hidden="true" />
            {t.name}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes pk-y { 0% { transform: translateY(-16px); opacity: 0 } 20%, 80% { opacity: 1 } 100% { transform: translateY(16px); opacity: 0 } }
        @keyframes pk-x { 0% { transform: translateX(-16px); opacity: 0 } 20%, 80% { opacity: 1 } 100% { transform: translateX(16px); opacity: 0 } }
        .packet { opacity: 0; animation: pk-y 2.2s cubic-bezier(.5,0,.5,1) infinite }
        .packet-back { animation-direction: reverse; animation-delay: 1.1s }
        @media (min-width: 1024px) { .packet { animation-name: pk-x } }
        @media (prefers-reduced-motion: reduce) { .packet { display: none } }
      `}</style>
    </section>
  );
}

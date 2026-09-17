"use client";

import { useRef, type ComponentType } from "react";
import { Bot, BusFront, Flag, GitCommitVertical, LayoutGrid, Newspaper, Radio, Truck, UtensilsCrossed, type LucideIcon } from "lucide-react";
import SplitWords from "@/components/motion/SplitWords";
import { useReveal } from "@/components/motion/useReveal";
import IconBadge from "@/components/ui/IconBadge";
import FlowDiagram from "@/components/projects/FlowDiagram";
import { BlogFeed, SchemaDiagram, ShipmentBoard, TransitMap } from "@/components/projects/Visuals";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

type Project = {
  id: string;
  icon: LucideIcon;
  kicker: string;
  title: string;
  summary: string;
  stack: string[];
  Visual: ComponentType;
};

const PROJECTS: Project[] = [
  {
    id: "ptfms",
    icon: BusFront,
    kicker: "Enterprise Java web application · 3-tier",
    title: "Public Transit Fleet Management System",
    summary:
      "Enterprise-level Java web application built with Servlets, MVC architecture and the DAO pattern. Modular vehicle management, GPS tracking, secure authentication with role-based access control, and JUnit-validated business logic.",
    stack: ["Java Servlets", "MVC", "MySQL", "JUnit"],
    Visual: TransitMap,
  },
  {
    id: "blog",
    icon: Newspaper,
    kicker: "Full-stack web application",
    title: "Algonquin College Blog",
    summary:
      "Responsive full-stack web application for managing dynamic college blog content, with a database-driven backend and a clean, responsive front end.",
    stack: ["PHP", "SQL", "HTML/CSS", "JavaScript"],
    Visual: BlogFeed,
  },
  {
    id: "logistics",
    icon: Truck,
    kicker: "Object-oriented Java",
    title: "Logistics Company Core",
    summary:
      "A foundational Java application for shipping and inventory management. Applies strict object-oriented principles to practical business logic, integrated directly with SQL databases.",
    stack: ["Java", "SQL", "OOP", "Inventory tracking"],
    Visual: ShipmentBoard,
  },
  {
    id: "lavender-grill",
    icon: UtensilsCrossed,
    kicker: "Database design",
    title: "Lavender Grill Database",
    summary:
      "SQL Server database architecture for a restaurant, centred on structured relational schema design. Efficiently manages and queries complex menu and order relationships.",
    stack: ["Microsoft SQL Server", "RDBMS", "Schema design"],
    Visual: SchemaDiagram,
  },
];

const FLEET_POINTS = [
  {
    icon: Radio,
    label: "ADR-001",
    title: "Wildcard subscriptions",
    text: "Subscribe to uagv/v2/+/+/state so new robots appear without configuration changes.",
  },
  {
    icon: GitCommitVertical,
    label: "ADR-002",
    title: "Raw state, derived view",
    text: "Store each robot's raw last State message and derive the view from it, rather than mutating a model.",
  },
  {
    icon: Flag,
    label: "Release plan",
    title: "v0.1 → v0.2",
    text: "Happy path with two simulated robots by October 2026, failure recovery by November 2026. Dashboard later.",
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Fleet Orchestrator: the diagram card grows from inset to full width
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          ".fleet-stage",
          { scale: 0.86, borderRadius: 48 },
          {
            scale: 1,
            borderRadius: 32,
            ease: "none",
            scrollTrigger: { trigger: ".fleet-stage", start: "top 95%", end: "top 30%", scrub: true },
          },
        );
      });

      // Stacking cards (tablet and up): each card shrinks and dims as the next one covers it
      mm.add(`${MOTION_OK} and (min-width: 768px)`, () => {
        const cards = gsap.utils.toArray<HTMLElement>(".stack-card");
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          gsap.to(card.querySelector(".stack-card-inner"), {
            scale: 0.9,
            opacity: 0.45,
            filter: "blur(2px)",
            ease: "none",
            scrollTrigger: { trigger: next, start: "top bottom", end: "top 18%", scrub: true },
          });
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section id="projects" ref={sectionRef} className="bg-paper py-24 md:py-36">
      {/* ---------- intro ---------- */}
      <div className="mx-auto max-w-6xl px-5 text-center md:px-6">
        <div className="flex justify-center">
          <IconBadge icon={LayoutGrid} size="lg" pop={0} />
        </div>
        <p className="label mt-6 text-muted" data-reveal>
          Projects
        </p>
        <h2 className="mx-auto mt-3 max-w-[16ch] font-display text-[clamp(2.4rem,6vw,5rem)] leading-[1.02] font-medium tracking-[-0.035em] text-ink" data-split>
          <SplitWords text="Business rules, turned into working software." />
        </h2>
      </div>

      {/* ---------- Now building: Fleet Orchestrator ---------- */}
      <article id="fleet-orchestrator" className="mx-auto mt-20 max-w-6xl scroll-mt-24 px-5 md:mt-32 md:px-6">
        <div className="text-center">
          <span className="label inline-flex items-center gap-2 rounded-full bg-signal-bg px-3 py-1.5 text-signal" data-reveal>
            <i className="soft-blink inline-block h-1.5 w-1.5 rounded-full bg-current" />
            Now building · Project 01
          </span>
          <div className="mt-6 flex justify-center">
            <IconBadge icon={Bot} size="lg" tone="ink" pop={1} />
          </div>
          <h3 className="mt-5 font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.04] font-medium tracking-[-0.03em] text-ink" data-reveal="1">
            Fleet Orchestrator
          </h3>
          <p className="mx-auto mt-5 max-w-[58ch] font-serif text-[1.1rem] leading-[1.7] text-muted" data-reveal="2">
            A fleet manager for autonomous mobile robots that speaks <strong className="font-semibold text-ink">VDA 5050</strong>,
            the open standard warehouse robots use to receive orders and report their state. It dispatches transport orders
            over MQTT, tracks each robot&apos;s live state, and is being built to recover cleanly when things go wrong.
          </p>
          <ul className="mt-7 flex flex-wrap justify-center gap-2" aria-label="Stack" data-reveal="3">
            {["Java", "Spring Boot", "Maven", "MQTT · Mosquitto", "Docker", "VDA 5050"].map((s) => (
              <li key={s} className="rounded-full bg-surface px-3.5 py-1.5 font-mono text-[0.78rem] text-ink/80 shadow-card">
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="fleet-stage mt-12 origin-top rounded-[32px] bg-surface p-4 shadow-lift md:mt-16 md:p-10">
          <FlowDiagram />
        </div>

        <ul className="mt-4 grid gap-3 md:grid-cols-3 md:gap-4">
          {FLEET_POINTS.map((pt, i) => (
            <li key={pt.label} className="rounded-[26px] bg-surface p-6 shadow-card md:p-7" data-reveal={i}>
              <IconBadge icon={pt.icon} size="sm" pop={i} />
              <p className="label mt-5 text-muted">{pt.label}</p>
              <p className="mt-1.5 font-display text-[1.15rem] font-medium tracking-tight text-ink">{pt.title}</p>
              <p className="mt-2 font-serif text-[0.97rem] leading-relaxed text-muted">{pt.text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-center font-serif text-sm text-muted italic" data-reveal>
          The laptop screen in the intro film and this diagram are illustrative previews, not captured output. The repository
          goes public with v0.1.
        </p>
      </article>

      {/* ---------- Earlier projects: stacking cards ---------- */}
      <div className="mx-auto mt-28 max-w-6xl px-5 md:mt-44 md:px-6">
        <p className="label text-center text-muted" data-reveal>
          Earlier projects
        </p>
        <div className="mt-8 space-y-4 md:mt-12 md:space-y-0">
          {PROJECTS.map(({ Visual, icon, ...p }, i) => (
            <article
              key={p.id}
              id={p.id}
              className="stack-card scroll-mt-24 md:sticky md:pb-[12vh]"
              style={{ top: `calc(5.5rem + ${i * 18}px)` }}
            >
              <div data-reveal-zoom>
              <div className="stack-card-inner origin-top rounded-[32px] bg-surface p-6 shadow-lift will-change-transform md:p-10 lg:p-12">
                <div className="grid items-center gap-8 md:grid-cols-[1fr_1.05fr] md:gap-12">
                  <div>
                    <IconBadge icon={icon} tone={i % 2 ? "accent" : "ink"} />
                    <p className="label mt-6 text-muted">{p.kicker}</p>
                    <h3 className="mt-2 font-display text-[clamp(1.7rem,3vw,2.5rem)] leading-[1.08] font-medium tracking-[-0.02em] text-ink">
                      {p.title}
                    </h3>
                    <p className="mt-4 max-w-[52ch] font-serif text-[1.03rem] leading-[1.7] text-muted">{p.summary}</p>
                    <ul className="mt-6 flex flex-wrap gap-2" aria-label="Stack">
                      {p.stack.map((s) => (
                        <li key={s} className="rounded-full border border-line px-3 py-1 font-mono text-[0.76rem] text-ink/75">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Visual />
                </div>
              </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

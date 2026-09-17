"use client";

import { useRef, type ComponentType } from "react";
import SplitWords from "@/components/motion/SplitWords";
import { useReveal } from "@/components/motion/useReveal";
import FlowDiagram from "@/components/projects/FlowDiagram";
import { BlogFeed, SchemaDiagram, ShipmentBoard, TransitMap } from "@/components/projects/Visuals";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

type Project = {
  id: string;
  kicker: string;
  title: string;
  summary: string;
  meta?: string;
  stack: string[];
  Visual: ComponentType;
};

const PROJECTS: Project[] = [
  {
    id: "ptfms",
    kicker: "Enterprise Java web application",
    title: "Public Transit Fleet Management System",
    meta: "3-tier architecture",
    summary:
      "Enterprise-level Java web application built with Servlets, MVC architecture and the DAO pattern. Features modular vehicle management, GPS tracking, secure authentication with role-based access control, and JUnit-validated business logic.",
    stack: ["Java Servlets", "MVC", "MySQL", "JUnit"],
    Visual: TransitMap,
  },
  {
    id: "blog",
    kicker: "Full-stack web application",
    title: "Algonquin College Blog",
    summary:
      "Responsive full-stack web application for managing dynamic college blog content, with a database-driven backend and a clean, responsive front end.",
    stack: ["PHP", "SQL", "HTML/CSS", "JavaScript"],
    Visual: BlogFeed,
  },
  {
    id: "logistics",
    kicker: "Object-oriented Java",
    title: "Logistics Company Core",
    summary:
      "A foundational Java application for shipping and inventory management. Applies strict object-oriented principles to practical business logic, integrated directly with SQL databases.",
    stack: ["Java", "SQL", "OOP", "Inventory tracking"],
    Visual: ShipmentBoard,
  },
  {
    id: "lavender-grill",
    kicker: "Database design",
    title: "Lavender Grill Database",
    summary:
      "SQL Server database architecture for a restaurant, centred on structured relational schema design. Efficiently manages and queries complex menu and order relationships.",
    stack: ["Microsoft SQL Server", "RDBMS", "Schema design"],
    Visual: SchemaDiagram,
  },
];

const MILESTONES = [
  { ver: "v0.1", title: "Happy path", text: "Two simulated robots, one transport order carried end to end. Target: October 2026." },
  { ver: "v0.2", title: "Failure recovery", text: "Lost connections, stale state and interrupted orders handled by a recovery policy. Target: November 2026." },
  { ver: "Later", title: "Dashboard and multi-vendor fleets", text: "Deferred until the core is solid." },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Section rules draw across as they reach the viewport
        gsap.utils.toArray<HTMLElement>(".draw-rule").forEach((rule) => {
          gsap.fromTo(
            rule,
            { scaleX: 0 },
            { scaleX: 1, ease: "none", scrollTrigger: { trigger: rule, start: "top 92%", end: "top 55%", scrub: true } },
          );
        });
        // Illustrations lift with a little parallax against their text
        gsap.utils.toArray<HTMLElement>(".project-visual").forEach((v) => {
          gsap.fromTo(
            v,
            { y: 40 },
            { y: -40, ease: "none", scrollTrigger: { trigger: v, start: "top bottom", end: "bottom top", scrub: true } },
          );
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section id="projects" ref={sectionRef} className="border-t border-line bg-paper px-5 py-24 md:px-6 md:py-36">
      <div className="mx-auto max-w-6xl">
        <p className="label rule-draw text-muted" data-split>
          Projects
        </p>
        <h2
          className="mt-4 max-w-[18ch] font-display text-[clamp(2.1rem,4.4vw,3.6rem)] leading-[1.04] font-medium tracking-[-0.028em] text-ink"
          data-split
        >
          <SplitWords text="Systems that turn business rules into working software." />
        </h2>

        {/* ---------- Now building ---------- */}
        <article id="fleet-orchestrator" className="relative mt-16 scroll-mt-24 pt-8 md:mt-24">
          <span className="draw-rule absolute inset-x-0 top-0 h-px origin-left bg-ink" aria-hidden="true" />
          <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
            <div>
              <div className="flex flex-wrap items-center gap-3" data-reveal>
                <span className="label inline-flex items-center gap-2 rounded-[3px] bg-signal-bg px-2.5 py-1 text-signal">
                  <i className="soft-blink inline-block h-1.5 w-1.5 rounded-full bg-current" />
                  In progress
                </span>
                <span className="label text-muted">Project 01 · Now building</span>
              </div>
              <h3 className="mt-5 font-display text-[clamp(1.8rem,3.2vw,2.6rem)] leading-tight font-medium tracking-tight text-ink" data-reveal="1">
                Fleet Orchestrator
              </h3>
              <p className="mt-4 max-w-[60ch] font-serif text-[1.08rem] leading-[1.7] text-ink/90" data-reveal="2">
                A fleet manager for autonomous mobile robots that speaks <strong className="font-semibold">VDA 5050</strong>, the
                open standard warehouse robots use to receive orders and report their state. It dispatches transport orders over
                MQTT, tracks each robot&apos;s live state, and is being built to recover cleanly when things go wrong.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Stack" data-reveal="3">
                {["Java", "Spring Boot", "Maven", "MQTT · Mosquitto", "Docker", "VDA 5050"].map((s) => (
                  <li key={s} className="rounded-[3px] border border-line px-2.5 py-1 font-mono text-[0.78rem] text-muted">
                    {s}
                  </li>
                ))}
              </ul>
              <dl className="mt-9 space-y-4 border-l border-line pl-5" data-reveal="4">
                <div>
                  <dt className="label text-muted">Decision · ADR-001</dt>
                  <dd className="mt-1 font-serif text-ink/90">
                    Subscribe with a wildcard topic (<code className="font-mono text-[0.9em]">uagv/v2/+/+/state</code>) so new robots
                    appear without configuration changes.
                  </dd>
                </div>
                <div>
                  <dt className="label text-muted">Decision · ADR-002</dt>
                  <dd className="mt-1 font-serif text-ink/90">
                    Store each robot&apos;s raw last State message and derive the view from it, rather than mutating a model.
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <div data-reveal="1">
                <FlowDiagram />
              </div>
              <p className="label mt-10 mb-2 text-muted" data-reveal>
                Release plan
              </p>
              <ol>
                {MILESTONES.map((m, i) => (
                  <li key={m.ver} className="relative grid grid-cols-[4.5rem_1fr] gap-4 py-4" data-reveal={i + 1}>
                    <span className="font-mono text-[0.85rem] text-accent">{m.ver}</span>
                    <span>
                      <span className="block font-display text-ink">{m.title}</span>
                      <span className="block font-serif text-[0.95rem] text-muted">{m.text}</span>
                    </span>
                    <span className="draw-rule absolute inset-x-0 bottom-0 h-px origin-left bg-line" aria-hidden="true" />
                  </li>
                ))}
              </ol>
              <p className="mt-6 font-serif text-sm text-muted italic" data-reveal>
                The laptop screen in the intro film and this diagram are illustrative previews, not captured output. The
                repository goes public with v0.1.
              </p>
            </div>
          </div>
        </article>

        {/* ---------- Completed work ---------- */}
        <div className="mt-28 flex items-baseline justify-between gap-6 md:mt-40">
          <p className="label text-muted" data-reveal>
            Earlier projects
          </p>
        </div>

        <div className="mt-6 space-y-24 md:space-y-36">
          {PROJECTS.map(({ Visual, ...p }, i) => (
            <article key={p.id} id={p.id} className="relative scroll-mt-24 pt-8">
              <span className="draw-rule absolute inset-x-0 top-0 h-px origin-left bg-line" aria-hidden="true" />
              <div className={`grid items-center gap-10 md:grid-cols-2 lg:gap-20 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div>
                  <p className="label text-muted" data-reveal>
                    {p.kicker}
                    {p.meta ? ` · ${p.meta}` : ""}
                  </p>
                  <h3 className="mt-4 font-display text-[clamp(1.6rem,2.8vw,2.3rem)] leading-tight font-medium tracking-tight text-ink" data-reveal="1">
                    {p.title}
                  </h3>
                  <p className="mt-4 max-w-[56ch] font-serif text-[1.05rem] leading-[1.7] text-ink/85" data-reveal="2">
                    {p.summary}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Stack" data-reveal="3">
                    {p.stack.map((s) => (
                      <li
                        key={s}
                        className="rounded-[3px] border border-line px-2.5 py-1 font-mono text-[0.78rem] text-muted transition-colors duration-300 hover:border-accent hover:text-ink"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div data-reveal="1">
                  <Visual />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { useInView, useReducedMotion } from "@/lib/useReducedMotion";

/*
 * Small animated illustrations, one per project. They describe what each
 * project does; they are not screenshots, and the frame says so.
 */

export function VisualFrame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="project-visual relative overflow-hidden rounded-[4px] border border-line bg-surface">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="font-mono text-[0.72rem] text-muted">{title}</span>
        <span className="label text-muted/70">Illustration</span>
      </div>
      <div className="relative aspect-[4/3]">{children}</div>
    </div>
  );
}

/* ---------- Public Transit Fleet Management: vehicles moving along routes ---------- */
const ROUTES = [
  { id: "r1", d: "M30 250 C120 250 130 150 220 150 S340 70 440 70", cls: "stroke-accent" },
  { id: "r2", d: "M40 70 C140 80 170 200 260 210 S390 240 450 200", cls: "stroke-signal" },
  { id: "r3", d: "M60 300 L200 230 L300 260 L430 290", cls: "stroke-ink/40" },
];

export function TransitMap() {
  const reduced = useReducedMotion();
  return (
    <VisualFrame title="ptfms · live fleet">
      <svg viewBox="0 0 480 360" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0H0V24" fill="none" className="stroke-line" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="480" height="360" fill="url(#grid)" />
        {ROUTES.map((r) => (
          <g key={r.id}>
            <path id={r.id} d={r.d} fill="none" strokeWidth="3" strokeLinecap="round" className={r.cls} />
            {!reduced &&
              [0, 0.5].map((offset) => (
                <g key={offset}>
                  <circle r="7" className="fill-paper stroke-ink" strokeWidth="2">
                    <animateMotion dur="9s" repeatCount="indefinite" begin={`${-9 * offset}s`} rotate="auto">
                      <mpath href={`#${r.id}`} />
                    </animateMotion>
                  </circle>
                </g>
              ))}
          </g>
        ))}
        {[[220, 150], [440, 70], [260, 210], [200, 230], [300, 260]].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="4" className="fill-surface stroke-ink" strokeWidth="1.5" />
        ))}
      </svg>
      <div className="absolute right-3 bottom-3 left-3 flex flex-wrap gap-2">
        {["Vehicle management", "GPS tracking", "RBAC"].map((t) => (
          <span key={t} className="rounded-[3px] border border-line bg-paper/90 px-2 py-1 font-mono text-[0.7rem] text-ink/80 backdrop-blur">
            {t}
          </span>
        ))}
      </div>
    </VisualFrame>
  );
}

/* ---------- Algonquin College Blog: posts publishing into a feed ---------- */
const POSTS = [
  { title: "Welcome week schedule", tag: "Campus", w: "78%" },
  { title: "Co-op fair: what to bring", tag: "Careers", w: "64%" },
  { title: "New study rooms open", tag: "Library", w: "71%" },
  { title: "Hackathon results", tag: "Tech", w: "58%" },
];

export function BlogFeed() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const [head, setHead] = useState(0);
  useEffect(() => {
    if (reduced || !inView) return;
    const id = window.setInterval(() => setHead((h) => (h + 1) % POSTS.length), 2200);
    return () => clearInterval(id);
  }, [reduced, inView]);
  const ordered = POSTS.map((_, i) => POSTS[(head + i) % POSTS.length]);
  return (
    <VisualFrame title="blog-posts.php">
      <div ref={ref} className="absolute inset-0 flex flex-col gap-3 p-5 md:p-7">
        {ordered.slice(0, 3).map((p, i) => (
          <article
            key={p.title}
            className="rounded-[4px] border border-line bg-paper p-4 transition-all duration-700 ease-film"
            style={{ opacity: 1 - i * 0.22, transform: `scale(${1 - i * 0.03})` }}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="label text-accent">{p.tag}</span>
              <span className="font-mono text-[0.68rem] text-muted">{i === 0 ? "published" : "draft"}</span>
            </div>
            <p className="font-display text-[1.05rem] text-ink">{p.title}</p>
            <div className="mt-3 h-1.5 rounded-full bg-sunken">
              <div className="h-full rounded-full bg-line" style={{ width: p.w }} />
            </div>
          </article>
        ))}
      </div>
    </VisualFrame>
  );
}

/* ---------- Logistics Company Core: shipments moving through states ---------- */
const STATES = ["Picked", "In transit", "Delivered"] as const;
const SHIPMENTS = [
  { id: "SHP-1042", sku: "Pallet · 24 units", start: 0 },
  { id: "SHP-1043", sku: "Crate · 6 units", start: 1 },
  { id: "SHP-1044", sku: "Parcel · 2 units", start: 2 },
  { id: "SHP-1045", sku: "Pallet · 18 units", start: 0 },
];

export function ShipmentBoard() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (reduced || !inView) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 1600);
    return () => clearInterval(id);
  }, [reduced, inView]);
  const stock = 62 + ((tick * 7) % 30);
  return (
    <VisualFrame title="logistics-core · shipments">
      <div ref={ref} className="absolute inset-0 flex flex-col p-5 md:p-7">
        <div className="mb-3 flex items-end justify-between">
          <span className="label text-muted">Inventory</span>
          <span className="font-mono text-sm text-ink tabular-nums">{stock}% stocked</span>
        </div>
        <div className="mb-5 h-2 overflow-hidden rounded-full bg-sunken">
          <div className="h-full rounded-full bg-accent transition-[width] duration-700 ease-film" style={{ width: `${stock}%` }} />
        </div>
        <ul className="divide-y divide-line border-y border-line">
          {SHIPMENTS.map((s, i) => {
            const state = STATES[(s.start + Math.floor((tick + i) / 2)) % STATES.length];
            const tone = state === "Delivered" ? "text-ok" : state === "In transit" ? "text-signal" : "text-muted";
            return (
              <li key={s.id} className="flex items-center justify-between py-2.5">
                <span>
                  <span className="block font-mono text-[0.8rem] text-ink">{s.id}</span>
                  <span className="block font-mono text-[0.68rem] text-muted">{s.sku}</span>
                </span>
                <span className={`label inline-flex items-center gap-1.5 ${tone}`}>
                  <i className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
                  <span key={state} className="animate-[fadeIn_.5s_ease]">
                    {state}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}`}</style>
    </VisualFrame>
  );
}

/* ---------- Lavender Grill: relational schema that draws on scroll ---------- */
const TABLES = [
  { name: "Customer", x: 20, y: 30, cols: ["customer_id PK", "name", "phone"] },
  { name: "Order", x: 180, y: 130, cols: ["order_id PK", "customer_id FK", "placed_at"] },
  { name: "OrderItem", x: 340, y: 30, cols: ["order_id FK", "item_id FK", "qty"] },
  { name: "MenuItem", x: 340, y: 210, cols: ["item_id PK", "name", "price"] },
];
const RELATIONS = ["M130 70 C160 70 150 170 180 170", "M290 170 C320 170 310 70 340 70", "M400 118 L400 210"];

export function SchemaDiagram() {
  const ref = useRef<SVGSVGElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const paths = ref.current!.querySelectorAll<SVGPathElement>(".relation");
        paths.forEach((p) => {
          const len = p.getTotalLength();
          gsap.fromTo(
            p,
            { strokeDasharray: len, strokeDashoffset: len },
            { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: ref.current, start: "top 80%", end: "center 45%", scrub: true } },
          );
        });
        gsap.from(ref.current!.querySelectorAll(".table"), {
          opacity: 0,
          y: 14,
          stagger: 0.12,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        });
      });
    },
    { scope: ref },
  );
  return (
    <VisualFrame title="lavender_grill.sql · schema">
      <svg ref={ref} viewBox="0 0 480 360" className="absolute inset-0 h-full w-full p-3" aria-hidden="true">
        {RELATIONS.map((d) => (
          <path key={d} d={d} className="relation stroke-accent" fill="none" strokeWidth="1.5" />
        ))}
        {TABLES.map((t) => (
          <g key={t.name} transform={`translate(${t.x} ${t.y})`}>
           <g className="table">
            <rect width="120" height="88" rx="4" className="fill-paper stroke-line" />
            <rect width="120" height="24" rx="4" className="fill-ink" />
            <text x="10" y="16" className="fill-paper font-display text-[12px]">
              {t.name}
            </text>
            {t.cols.map((c, i) => (
              <text key={c} x="10" y={42 + i * 16} className={`font-mono text-[9.5px] ${c.includes("PK") || c.includes("FK") ? "fill-accent" : "fill-muted"}`}>
                {c}
              </text>
            ))}
           </g>
          </g>
        ))}
      </svg>
    </VisualFrame>
  );
}

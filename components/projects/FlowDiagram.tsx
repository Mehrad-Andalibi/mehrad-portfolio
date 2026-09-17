"use client";

import { useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "@/lib/useReducedMotion";

/*
 * Simulated VDA 5050 message flow for Fleet Orchestrator.
 * The fleet manager publishes orders through the MQTT broker; robots report
 * state back. Purely illustrative: labelled as simulated in the caption.
 */

type Hop = [wire: "mb" | "ba" | "bb", reverse: boolean];
type Step = { hops: Hop[]; kind: "order" | "state"; label: string; robot: "a" | "b"; status?: string };

const STEPS: Step[] = [
  { hops: [["mb", false], ["ba", false]], kind: "order", label: "order → agv-a", robot: "a", status: "DRIVING" },
  { hops: [["ba", true], ["mb", true]], kind: "state", label: "state · agv-a", robot: "a" },
  { hops: [["mb", false], ["bb", false]], kind: "order", label: "order → agv-b", robot: "b", status: "DRIVING" },
  { hops: [["bb", true], ["mb", true]], kind: "state", label: "state · agv-b", robot: "b" },
  { hops: [["ba", true], ["mb", true]], kind: "state", label: "state · agv-a", robot: "a", status: "IDLE" },
  { hops: [["bb", true], ["mb", true]], kind: "state", label: "state · agv-b", robot: "b", status: "IDLE" },
];

const easeInOut = (f: number) => (f < 0.5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2);

export default function FlowDiagram() {
  const figRef = useRef<HTMLElement>(null);
  const wires = useRef<Record<string, SVGPathElement | null>>({});
  const packet = useRef<SVGGElement>(null);
  const dot = useRef<SVGCircleElement>(null);
  const text = useRef<SVGTextElement>(null);
  const status = useRef<Record<string, SVGTextElement | null>>({});
  const battery = useRef<Record<string, SVGRectElement | null>>({});

  const reduced = useReducedMotion();
  const inView = useInView(figRef, 0.2);

  useEffect(() => {
    if (reduced || !inView) return;
    let raf = 0;
    let timer = 0;
    let step = 0;
    const charge = { a: 0.86, b: 0.71 };
    const wireEls = wires.current;

    const run = () => {
      const s = STEPS[step++ % STEPS.length];
      const segs = s.hops.map(([w, rev]) => [wires.current[w]!, rev] as const);
      segs.forEach(([w]) => w.classList.add("hot"));
      dot.current!.setAttribute("class", s.kind === "order" ? "fill-accent" : "fill-signal");
      text.current!.textContent = s.label;
      const t0 = performance.now();
      const per = 900;

      const frame = (now: number) => {
        const t = (now - t0) / per;
        const i = Math.min(Math.floor(t), segs.length - 1);
        const [w, rev] = segs[i];
        const e = easeInOut(Math.min(1, Math.max(0, t - i)));
        const pt = w.getPointAtLength(w.getTotalLength() * (rev ? 1 - e : e));
        packet.current!.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
        packet.current!.style.opacity = "1";
        text.current!.style.opacity = Math.pow(Math.sin(Math.PI * Math.min(1, t / segs.length)), 3).toFixed(2);
        if (t < segs.length) {
          raf = requestAnimationFrame(frame);
          return;
        }
        segs.forEach(([wire]) => wire.classList.remove("hot"));
        packet.current!.style.opacity = "0";
        if (s.status) status.current[s.robot]!.textContent = s.status;
        if (s.kind === "state") {
          charge[s.robot] = Math.max(0.2, charge[s.robot] - 0.01);
          battery.current[s.robot]!.setAttribute("width", (20 * charge[s.robot]).toFixed(1));
        }
        timer = window.setTimeout(run, 420);
      };
      raf = requestAnimationFrame(frame);
    };
    run();
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      Object.values(wireEls).forEach((w) => w?.classList.remove("hot"));
    };
  }, [reduced, inView]);

  const wire = (id: string, d: string) => (
    <path
      ref={(el) => {
        wires.current[id] = el;
      }}
      d={d}
      fill="none"
      strokeWidth={1.5}
      className="stroke-line transition-colors duration-300 [&.hot]:stroke-accent"
    />
  );

  const robot = (id: "a" | "b", y: number, width: number) => (
    <g>
      <rect x="380" y={y} width="130" height="60" rx="4" className="fill-paper stroke-line" />
      <text x="394" y={y + 25} className="fill-ink font-display text-[14px]">
        agv-{id}
      </text>
      <text
        ref={(el) => {
          status.current[id] = el;
        }}
        x="394"
        y={y + 44}
        className="fill-muted font-mono text-[10.5px] tracking-wider"
      >
        {reduced ? "DRIVING" : "IDLE"}
      </text>
      <rect x="470" y={y + 15} width="26" height="11" rx="2" className="fill-none stroke-line" />
      <rect
        ref={(el) => {
          battery.current[id] = el;
        }}
        x="473"
        y={y + 18}
        width={width}
        height="5"
        className="fill-ok"
      />
    </g>
  );

  return (
    <figure ref={figRef} className="rounded-[22px] bg-paper p-4 md:p-7">
      <figcaption className="label mb-2 flex flex-wrap justify-between gap-3 text-muted">
        <span>Message flow · simulated</span>
        <span className="flex gap-4">
          <span className="inline-flex items-center gap-1.5">
            <i className="inline-block h-2 w-2 rounded-full bg-accent" /> order
          </span>
          <span className="inline-flex items-center gap-1.5">
            <i className="inline-block h-2 w-2 rounded-full bg-signal" /> state
          </span>
        </span>
      </figcaption>
      <svg
        viewBox="0 0 520 250"
        className="block h-auto w-full"
        role="img"
        aria-label="Diagram: the fleet manager sends orders through the Mosquitto MQTT broker to robots agv-a and agv-b, and the robots report their state back through the broker."
      >
        {wire("mb", "M150 125 H205")}
        {wire("ba", "M315 125 C350 125 350 60 380 60")}
        {wire("bb", "M315 125 C350 125 350 190 380 190")}
        <g>
          <rect x="10" y="95" width="140" height="60" rx="4" className="fill-paper stroke-line" />
          <text x="24" y="121" className="fill-ink font-display text-[14px]">
            Fleet manager
          </text>
          <text x="24" y="140" className="fill-muted font-mono text-[10.5px] tracking-wider">
            SPRING BOOT
          </text>
        </g>
        <g>
          <rect x="205" y="95" width="110" height="60" rx="4" className="fill-paper stroke-line" />
          <text x="219" y="121" className="fill-ink font-display text-[14px]">
            Broker
          </text>
          <text x="219" y="140" className="fill-muted font-mono text-[10.5px] tracking-wider">
            MOSQUITTO
          </text>
        </g>
        {robot("a", 30, 17)}
        {robot("b", 160, 14)}
        <g ref={packet} style={{ opacity: reduced ? 1 : 0 }} transform={reduced ? "translate(350 92)" : undefined}>
          <circle ref={dot} r="5" className="fill-accent" />
          <text ref={text} x="9" y="-9" className="fill-muted font-mono text-[10px]">
            {reduced ? "order" : ""}
          </text>
        </g>
      </svg>
    </figure>
  );
}

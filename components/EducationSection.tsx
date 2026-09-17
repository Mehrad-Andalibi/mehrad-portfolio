"use client";

import { useRef } from "react";
import SplitWords from "@/components/motion/SplitWords";
import { useReveal } from "@/components/motion/useReveal";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

type Entry = {
  title: string;
  place: string;
  when: string;
  status?: string;
  detail?: React.ReactNode;
};

const EDUCATION: Entry[] = [
  {
    title: "Bachelor of Technology, Business Systems Development",
    place: "Algonquin College, Ottawa, ON",
    when: "Now",
    status: "In progress",
    detail: "Building the business, systems-analysis and project-management side on top of a software foundation.",
  },
  {
    title: "Computer Programming Diploma",
    place: "Algonquin College, Ottawa, ON",
    when: "May 2024 – December 2025",
    detail: (
      <>
        <span className="font-semibold text-ink">Relevant coursework:</span> Data Structures &amp; Algorithms, Database Systems,
        Web Development, Object-Oriented Programming, Software Engineering.
      </>
    ),
  },
];

const CERTIFICATIONS: Entry[] = [
  { title: "AWS Certified Solutions Architect – Associate", place: "Amazon Web Services", when: "Preparing", status: "Preparing" },
  { title: "Advanced Google Analytics", place: "Google Digital Academy", when: "2021" },
  { title: "Digital Marketing", place: "Tehran Institute of Technology", when: "2020" },
];

function Timeline({ entries, gpa }: { entries: Entry[]; gpa?: boolean }) {
  return (
    <ol className="relative">
      <span className="timeline-line absolute top-2 bottom-2 left-[5px] w-px origin-top bg-line" aria-hidden="true" />
      {entries.map((e, i) => (
        <li key={e.title} className="relative pb-10 pl-9 last:pb-0" data-reveal={i}>
          <span
            className={`absolute top-[0.45rem] left-0 h-[11px] w-[11px] rounded-full border-2 ${e.status ? "border-signal bg-signal-bg" : "border-accent bg-paper"}`}
            aria-hidden="true"
          />
          <p className="label flex flex-wrap gap-x-3 text-muted">
            <span>{e.when}</span>
            {e.status && e.status !== e.when && <span className="text-signal">{e.status}</span>}
          </p>
          <h3 className="mt-2 font-display text-[1.3rem] leading-snug font-medium tracking-tight text-ink md:text-[1.5rem]">{e.title}</h3>
          <p className="mt-1 font-serif text-accent">{e.place}</p>
          {gpa && i === 1 && (
            <p className="mt-3 flex items-baseline gap-2">
              <span className="gpa font-display text-[2.4rem] leading-none font-medium tracking-tight text-ink tabular-nums" data-value="3.95">
                3.95
              </span>
              <span className="label text-muted">GPA / 4.0</span>
            </p>
          )}
          {e.detail && <p className="mt-3 max-w-[60ch] font-serif leading-relaxed text-muted">{e.detail}</p>}
        </li>
      ))}
    </ol>
  );
}

export default function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>(".timeline-line").forEach((line) => {
          gsap.fromTo(
            line,
            { scaleY: 0 },
            { scaleY: 1, ease: "none", scrollTrigger: { trigger: line, start: "top 80%", end: "bottom 60%", scrub: true } },
          );
        });
        gsap.utils.toArray<HTMLElement>(".gpa").forEach((el) => {
          const value = Number(el.dataset.value);
          const counter = { v: 0 };
          gsap.to(counter, {
            v: value,
            duration: 1.4,
            ease: "power3.out",
            onUpdate: () => {
              el.textContent = counter.v.toFixed(2);
            },
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section id="education" ref={sectionRef} className="border-t border-line bg-surface px-5 py-24 md:px-6 md:py-36">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[4fr_7fr] lg:gap-24">
        <div>
          <p className="label rule-draw text-muted" data-split>
            Education
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.1rem,4.4vw,3.6rem)] leading-[1.04] font-medium tracking-[-0.028em] text-ink" data-split>
            <SplitWords text="Education & certifications." />
          </h2>
        </div>
        <div className="space-y-16">
          <Timeline entries={EDUCATION} gpa />
          <div>
            <p className="label mb-8 text-muted" data-reveal>
              Certifications
            </p>
            <Timeline entries={CERTIFICATIONS} />
          </div>
        </div>
      </div>
    </section>
  );
}

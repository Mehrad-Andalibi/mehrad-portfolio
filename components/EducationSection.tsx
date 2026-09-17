"use client";

import { useRef } from "react";
import { Award, BarChart3, Cloud, GraduationCap, Megaphone, School, type LucideIcon } from "lucide-react";
import SplitWords from "@/components/motion/SplitWords";
import { useReveal } from "@/components/motion/useReveal";
import IconBadge from "@/components/ui/IconBadge";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

type Entry = {
  icon: LucideIcon;
  title: string;
  place: string;
  when: string;
  current?: boolean;
  detail?: string;
  gpa?: number;
};

const EDUCATION: Entry[] = [
  {
    icon: GraduationCap,
    title: "Bachelor of Technology, Business Systems Development",
    place: "Algonquin College, Ottawa, ON",
    when: "In progress",
    current: true,
    detail: "Building the business, systems-analysis and project-management side on top of a software foundation.",
  },
  {
    icon: School,
    title: "Computer Programming Diploma",
    place: "Algonquin College, Ottawa, ON",
    when: "May 2024 – December 2025",
    gpa: 3.95,
    detail: "Data Structures & Algorithms, Database Systems, Web Development, Object-Oriented Programming, Software Engineering.",
  },
];

const CERTIFICATIONS: Entry[] = [
  { icon: Cloud, title: "AWS Certified Solutions Architect – Associate", place: "Amazon Web Services", when: "Preparing", current: true },
  { icon: BarChart3, title: "Advanced Google Analytics", place: "Google Digital Academy", when: "2021" },
  { icon: Megaphone, title: "Digital Marketing", place: "Tehran Institute of Technology", when: "2020" },
];

export default function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          ".edu-line",
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".edu-list", start: "top 75%", end: "bottom 60%", scrub: true } },
        );
        gsap.utils.toArray<HTMLElement>(".gpa").forEach((el) => {
          const value = Number(el.dataset.value);
          const counter = { v: 0 };
          gsap.to(counter, {
            v: value,
            duration: 1.6,
            ease: "power3.out",
            onUpdate: () => {
              el.textContent = counter.v.toFixed(2);
            },
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section id="education" ref={sectionRef} className="bg-paper px-5 py-24 md:px-6 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <div className="flex justify-center">
            <IconBadge icon={GraduationCap} size="lg" pop={0} />
          </div>
          <p className="label mt-6 text-muted" data-reveal>
            Education
          </p>
          <h2 className="mx-auto mt-3 font-display text-[clamp(2.4rem,6vw,5rem)] leading-[1.02] font-medium tracking-[-0.035em] text-ink" data-split>
            <SplitWords text="Education & certifications." />
          </h2>
        </div>

        <div className="mt-14 grid gap-4 md:mt-20 lg:grid-cols-[1.4fr_1fr]">
          {/* Degrees, as a timeline */}
          <ol className="edu-list relative rounded-[32px] bg-surface p-6 shadow-card md:p-10">
            <span className="edu-line absolute top-16 bottom-16 left-[3rem] w-px origin-top bg-line md:left-[4rem]" aria-hidden="true" />
            {EDUCATION.map((e, i) => (
              <li key={e.title} className="relative grid grid-cols-[3rem_1fr] gap-5 pb-10 last:pb-0" data-reveal={i}>
                <IconBadge icon={e.icon} tone={e.current ? "signal" : "accent"} pop={i} className="relative z-10" />
                <div>
                  <p className="label flex flex-wrap gap-x-3 pt-1 text-muted">
                    <span className={e.current ? "text-signal" : undefined}>{e.when}</span>
                  </p>
                  <h3 className="mt-2 font-display text-[1.35rem] leading-snug font-medium tracking-tight text-ink md:text-[1.6rem]">{e.title}</h3>
                  <p className="mt-1 font-serif text-accent">{e.place}</p>
                  {e.gpa && (
                    <p className="mt-5 flex items-baseline gap-2">
                      <span className="gpa font-display text-[3.4rem] leading-none font-medium tracking-[-0.03em] text-ink" data-value={e.gpa}>
                        {e.gpa.toFixed(2)}
                      </span>
                      <span className="label text-muted">GPA / 4.0</span>
                    </p>
                  )}
                  {e.detail && (
                    <p className="mt-4 max-w-[58ch] font-serif leading-relaxed text-muted">
                      {e.gpa && <span className="font-semibold text-ink">Relevant coursework: </span>}
                      {e.detail}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>

          {/* Certifications, as tiles */}
          <div className="rounded-[32px] bg-surface p-6 shadow-card md:p-10" data-reveal="1">
            <div className="flex items-center gap-3">
              <Award className="h-5 w-5 text-accent" strokeWidth={1.75} aria-hidden="true" />
              <p className="label text-muted">Certifications</p>
            </div>
            <ul className="mt-6 space-y-3">
              {CERTIFICATIONS.map((c, i) => (
                <li
                  key={c.title}
                  className="flex items-start gap-4 rounded-[20px] bg-paper/70 p-4 transition-transform duration-500 ease-film hover:-translate-y-0.5"
                  data-reveal={i + 1}
                >
                  <IconBadge icon={c.icon} size="sm" tone={c.current ? "signal" : "accent"} />
                  <div>
                    <p className="font-display leading-snug font-medium text-ink">{c.title}</p>
                    <p className="mt-0.5 font-serif text-[0.95rem] text-muted">
                      {c.place} · <span className={c.current ? "text-signal" : undefined}>{c.when}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

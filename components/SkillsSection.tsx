"use client";

import { useRef } from "react";
import SplitWords from "@/components/motion/SplitWords";
import { useReveal } from "@/components/motion/useReveal";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

const LANGUAGES = ["Java", "SQL", "JavaScript", "Python", "PHP", "Dart", "Shell"];

// Ordered like a request travelling through a three-tier application
const TIERS = [
  { id: "web", name: "Web", role: "Presentation", skills: ["HTML", "CSS", "JavaScript", "PHP"] },
  {
    id: "backend",
    name: "Backend",
    role: "Business logic",
    skills: ["Spring Boot", "Java Servlets", "MVC Architecture", "RESTful APIs", "DAO Pattern", "JUnit Testing", "Session Management", "Auth & Access Control"],
  },
  { id: "data", name: "Databases", role: "Persistence", skills: ["MySQL", "Oracle", "SQL Server", "Microsoft Access", "MongoDB", "Neo4j"] },
];

const TOOLS = ["Git", "Linux / UNIX", "RHEL", "Ubuntu"];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // connectors between tiers draw as the stack scrolls into view
        gsap.utils.toArray<HTMLElement>(".tier-link").forEach((link) => {
          gsap.fromTo(
            link,
            { scaleY: 0 },
            { scaleY: 1, ease: "none", scrollTrigger: { trigger: link, start: "top 85%", end: "top 55%", scrub: true } },
          );
        });
        // chips ripple in per tier
        gsap.utils.toArray<HTMLElement>(".tier").forEach((tier) => {
          gsap.from(tier.querySelectorAll(".chip"), {
            opacity: 0,
            y: 12,
            duration: 0.6,
            stagger: 0.04,
            ease: "power2.out",
            scrollTrigger: { trigger: tier, start: "top 85%", once: true },
          });
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section id="skills" ref={sectionRef} className="border-t border-line bg-surface px-5 py-24 md:px-6 md:py-36">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[4fr_7fr] lg:gap-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="label rule-draw text-muted" data-split>
            Skills
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.1rem,4.4vw,3.6rem)] leading-[1.04] font-medium tracking-[-0.028em] text-ink" data-split>
            <SplitWords text="Technical stack." />
          </h2>
          <p className="mt-6 max-w-[40ch] font-serif text-[1.08rem] leading-relaxed text-muted" data-reveal="1">
            The languages, frameworks and architecture I use to build robust applications, laid out the way a request
            moves through them.
          </p>

          <div className="mt-10" data-reveal="2">
            <p className="label mb-3 text-muted">Languages</p>
            <ul className="flex flex-wrap gap-2">
              {LANGUAGES.map((l) => (
                <li
                  key={l}
                  className="rounded-[3px] bg-ink px-3 py-1.5 font-mono text-[0.8rem] text-paper transition-transform duration-300 ease-film hover:-translate-y-0.5"
                >
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div aria-label="Skills by application tier">
          {TIERS.map((tier, i) => (
            <div key={tier.id}>
              <div className="tier group rounded-[4px] border border-line bg-paper p-5 transition-colors duration-300 hover:border-accent/60 md:p-7" data-reveal>
                <div className="mb-4 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-xl font-medium tracking-tight text-ink md:text-2xl">{tier.name}</h3>
                  <span className="label text-muted">
                    Tier {i + 1} · {tier.role}
                  </span>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {tier.skills.map((s) => (
                    <li
                      key={s}
                      className="chip rounded-[3px] border border-line bg-surface px-3 py-1.5 font-mono text-[0.8rem] text-ink/85 transition-[border-color,transform] duration-300 ease-film hover:-translate-y-0.5 hover:border-accent"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              {i < TIERS.length - 1 && (
                <div className="relative mx-auto flex h-14 w-10 justify-center" aria-hidden="true">
                  <span className="tier-link block h-full w-px origin-top bg-line" />
                  <span className="packet absolute top-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-accent" />
                  <span className="packet packet-up absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-signal" />
                </div>
              )}
            </div>
          ))}

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-dashed border-line pt-5" data-reveal>
            <span className="label text-muted">Runs on</span>
            {TOOLS.map((t) => (
              <span key={t} className="font-mono text-[0.85rem] text-ink/80">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes packet-down { 0% { transform: translate(-50%, 0); opacity: 0 } 15% { opacity: 1 } 85% { opacity: 1 } 100% { transform: translate(-50%, 48px); opacity: 0 } }
        @keyframes packet-up { 0% { transform: translate(-50%, 0); opacity: 0 } 15% { opacity: 1 } 85% { opacity: 1 } 100% { transform: translate(-50%, -48px); opacity: 0 } }
        .packet { animation: packet-down 2.4s cubic-bezier(.5,0,.5,1) infinite; opacity: 0 }
        .packet-up { animation-name: packet-up; animation-delay: 1.2s }
        @media (prefers-reduced-motion: reduce) { .packet { display: none } }
      `}</style>
    </section>
  );
}

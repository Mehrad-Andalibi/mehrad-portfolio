"use client";

import { useRef } from "react";
import { Cloud, GraduationCap, MapPin, Network } from "lucide-react";
import ScrollHighlight from "@/components/motion/ScrollHighlight";
import { useReveal } from "@/components/motion/useReveal";
import IconBadge from "@/components/ui/IconBadge";

const FACTS = [
  { icon: GraduationCap, term: "Studying", detail: "Bachelor of Technology, Business Systems Development", sub: "Algonquin College" },
  { icon: Network, term: "Focus", detail: "Backend systems and the orchestration layer", sub: "Autonomous systems ↔ business software" },
  { icon: Cloud, term: "Preparing for", detail: "AWS Certified Solutions Architect", sub: "Associate" },
  { icon: MapPin, term: "Based in", detail: "Ottawa, Canada", sub: "Open to co-op roles" },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <section id="about" ref={sectionRef} className="bg-paper px-5 pt-28 pb-24 md:px-6 md:pt-44 md:pb-36">
      <div className="mx-auto max-w-6xl">
        <p className="label rule-draw text-muted" data-split>
          About
        </p>

        <ScrollHighlight
          className="mt-6 max-w-[22ch] font-display text-[clamp(2rem,5.2vw,4.6rem)] leading-[1.06] font-medium tracking-[-0.03em] text-balance"
          text="I build backend systems in Java and Spring Boot, and I study the business side on purpose, so the software fits how organizations actually run."
          emphasis={["backend", "business"]}
        />

        {/* Fact tiles */}
        <ul className="mt-16 grid gap-3 sm:grid-cols-2 md:mt-24 lg:grid-cols-4 lg:gap-4">
          {FACTS.map((f, i) => (
            <li
              key={f.term}
              className="group rounded-[26px] bg-surface p-6 shadow-card transition-[transform,box-shadow] duration-500 ease-film hover:-translate-y-1 hover:shadow-lift md:p-7"
              data-reveal={i}
            >
              <IconBadge icon={f.icon} pop={i + 1} className="transition-transform duration-500 ease-film group-hover:scale-110" />
              <p className="label mt-6 text-muted">{f.term}</p>
              <p className="mt-2 font-display text-[1.15rem] leading-snug font-medium tracking-tight text-ink">{f.detail}</p>
              <p className="mt-1 font-serif text-[0.95rem] text-muted">{f.sub}</p>
            </li>
          ))}
        </ul>

        {/* Story */}
        <div className="mt-16 grid gap-8 font-serif text-[1.08rem] leading-[1.75] text-ink/85 md:mt-24 md:grid-cols-2 md:gap-16">
          <p data-reveal>
            I&apos;m a software developer in Ottawa. After graduating from Algonquin College&apos;s Computer Programming diploma,
            I&apos;m now completing a Bachelor of Technology in Business Systems Development. My foundation is backend
            engineering: Java, Servlets and Spring Boot services, MVC architecture and RESTful APIs, with database-driven designs
            and clean patterns like DAO, Builder and Observer.
          </p>
          <p data-reveal="2">
            I&apos;m focused on the orchestration layer, the software that connects autonomous systems such as robot fleets and
            AI agents to the business systems that give their work meaning. I&apos;m open to co-op and backend developer
            opportunities where I can build scalable, maintainable systems.
          </p>
        </div>
      </div>
    </section>
  );
}

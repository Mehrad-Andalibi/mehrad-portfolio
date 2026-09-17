"use client";

import { useRef } from "react";
import { Cloud, Compass, GraduationCap, MapPin } from "lucide-react";
import ScrollHighlight from "@/components/motion/ScrollHighlight";
import { useReveal } from "@/components/motion/useReveal";
import IconBadge from "@/components/ui/IconBadge";

const FACTS = [
  { icon: GraduationCap, term: "Studying", detail: "Bachelor of Technology, Business Systems Development", sub: "Algonquin College" },
  { icon: Compass, term: "Open to", detail: "Software, IT, data & BI, and AI roles", sub: "Including co-op" },
  { icon: Cloud, term: "Preparing for", detail: "AWS Certified Solutions Architect", sub: "Associate" },
  { icon: MapPin, term: "Based in", detail: "Ottawa, Ontario", sub: "Canada" },
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
          text="I build software, work with data and keep learning, and I study the business side on purpose, so the technology fits how organizations actually run."
          emphasis={["software", "data", "business"]}
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
            I&apos;m now completing a Bachelor of Technology in Business Systems Development. My foundation is in Java and Spring
            Boot, RESTful APIs and relational databases, and I&apos;ve built on it with SQL, Python and statistics for working with
            data.
          </p>
          <p data-reveal="2">
            I&apos;m most interested in the places where technology meets the business: data analysis and business intelligence,
            AI tools and agents, IT systems, and the orchestration layer that connects autonomous systems to the software
            organizations run on. I&apos;m open to software, IT, data, BI and AI roles, and eager to keep learning wherever the
            work takes me.
          </p>
        </div>
      </div>
    </section>
  );
}

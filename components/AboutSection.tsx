"use client";

import { useRef } from "react";
import Image from "next/image";
import SplitWords from "@/components/motion/SplitWords";
import { useReveal } from "@/components/motion/useReveal";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

const FACTS = [
  { term: "Studying", detail: "Bachelor of Technology, Business Systems Development · Algonquin College" },
  { term: "Focus", detail: "Backend systems and the orchestration layer between autonomous systems and business software" },
  { term: "Preparing for", detail: "AWS Certified Solutions Architect – Associate" },
  { term: "Based in", detail: "Ottawa, Canada" },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  useReveal(sectionRef);

  // Portrait drifts inside its frame as the section scrolls past (depth cue)
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          photoRef.current,
          { yPercent: -6, scale: 1.12 },
          {
            yPercent: 6,
            scale: 1.04,
            ease: "none",
            scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section id="about" ref={sectionRef} className="border-t border-line bg-paper px-5 py-24 md:px-6 md:py-36">
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[5fr_7fr] md:gap-20 lg:gap-28">
        {/* Portrait */}
        <figure className="mx-auto w-full max-w-sm md:mx-0 md:max-w-none" data-reveal>
          <div className="relative aspect-[3/4] overflow-hidden rounded-[4px] bg-sunken">
            <div ref={photoRef} className="absolute inset-0 will-change-transform">
              <Image
                src="/images/about/mehrad-portrait.webp"
                alt="Portrait of Mehrad Andalibi"
                fill
                sizes="(max-width: 768px) 90vw, 420px"
                className="object-cover object-[50%_30%]"
              />
            </div>
          </div>
          <figcaption className="label mt-4 flex justify-between text-muted">
            <span>Mehrad Andalibi</span>
            <span>Ottawa, ON</span>
          </figcaption>
        </figure>

        {/* Text */}
        <div className="flex flex-col justify-center">
          <p className="label rule-draw text-muted" data-split>
            About
          </p>
          <h2
            className="mt-4 max-w-[16ch] font-display text-[clamp(2.1rem,4.4vw,3.6rem)] leading-[1.04] font-medium tracking-[-0.028em] text-balance text-ink"
            data-split
          >
            <SplitWords text="Engineer first, learning the business side on purpose." />
          </h2>

          <div className="mt-8 max-w-[62ch] space-y-5 font-serif text-[1.08rem] leading-[1.7] text-ink/90">
            <p data-reveal="1">
              I&apos;m a software developer in Ottawa. After graduating from Algonquin College&apos;s Computer Programming
              diploma, I&apos;m now completing a Bachelor of Technology in Business Systems Development.
            </p>
            <p data-reveal="2">
              My foundation is backend engineering: Java, Servlets and Spring Boot services, MVC architecture and RESTful
              APIs, with database-driven designs and clean patterns like DAO, Builder and Observer.
            </p>
            <p data-reveal="3">
              I&apos;m focused on the orchestration layer, the software that connects autonomous systems such as robot
              fleets and AI agents to the business systems that give their work meaning. I study the business side on
              purpose, so what I build fits how organizations actually run.
            </p>
            <p data-reveal="4">
              I&apos;m open to co-op and backend developer opportunities where I can build scalable, maintainable systems.
            </p>
          </div>

          <dl className="mt-10 border-t border-line">
            {FACTS.map((f, i) => (
              <div key={f.term} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[9.5rem_1fr] sm:gap-6" data-reveal={i + 1}>
                <dt className="label pt-1 text-muted">{f.term}</dt>
                <dd className="font-serif text-ink">{f.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

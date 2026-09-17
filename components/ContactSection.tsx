"use client";

import { useRef, useState } from "react";
import SplitWords from "@/components/motion/SplitWords";
import { useReveal } from "@/components/motion/useReveal";
import { ScrollTrigger, useGSAP, MOTION_OK, gsap } from "@/lib/gsap";

const LINKS = [
  { cmd: "mail", label: "mehradandalibi@gmail.com", href: "mailto:mehradandalibi@gmail.com", external: false },
  { cmd: "open", label: "linkedin.com/in/mehrad-andalibi", href: "https://www.linkedin.com/in/mehrad-andalibi", external: true },
  { cmd: "open", label: "github.com/mehrad-andalibi", href: "https://github.com/mehrad-andalibi", external: true },
  { cmd: "get", label: "Mehrad-Andalibi-Resume.pdf", href: "/resume/Mehrad-Andalibi-Resume.pdf", external: true },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [filmFailed, setFilmFailed] = useState(false);
  useReveal(sectionRef);

  // The closing film plays once when the section comes into view
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const video = videoRef.current;
        if (!video) return;
        const st = ScrollTrigger.create({
          trigger: video,
          start: "top 60%",
          once: true,
          onEnter: () => {
            video.preload = "auto";
            const pr = video.play();
            if (pr) pr.catch(() => {});
          },
        });
        return () => st.kill();
      });
    },
    { scope: sectionRef },
  );

  return (
    <section id="contact" ref={sectionRef} className="border-t border-line bg-paper">
      {/* Closing film with the invitation on the quiet left side of the frame */}
      <div className="relative">
        <div className="relative aspect-[4/5] overflow-hidden bg-film sm:aspect-[16/10] lg:aspect-[16/8]">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover object-[64%_30%] md:object-[64%_42%]"
            muted
            playsInline
            preload="none"
            poster="/film/frame-04.webp"
            aria-hidden="true"
            disablePictureInPicture
            onError={() => setFilmFailed(true)}
          >
            {!filmFailed && <source src="/film/closing.mp4" type="video/mp4" />}
            {!filmFailed && <source src="/film/closing.webm" type="video/webm" />}
          </video>
        </div>

        <div className="px-5 pt-10 md:absolute md:inset-y-0 md:left-[clamp(24px,6vw,96px)] md:flex md:w-[min(42%,34rem)] md:flex-col md:justify-center md:px-0 md:pt-0">
          <p className="label rule-draw text-muted md:text-photo-muted" data-split>
            Contact
          </p>
          <h2
            className="mt-4 font-display text-[clamp(2.2rem,5vw,4.4rem)] leading-[1.02] font-medium tracking-[-0.03em] text-ink md:text-photo-ink"
            data-split
          >
            <SplitWords text="Let's build something useful." />
          </h2>
          <p className="mt-5 max-w-[36ch] font-serif text-[1.08rem] leading-relaxed text-muted md:text-photo-muted" data-reveal="1">
            I&apos;m open to co-op and backend developer opportunities. Reach out about a role, a project or a collaboration.
          </p>
          <div className="mt-7 flex flex-wrap gap-3" data-reveal="2">
            <a
              href="mailto:mehradandalibi@gmail.com"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-display text-[0.95rem] font-medium text-paper transition-transform duration-300 ease-film hover:-translate-y-0.5 md:bg-[#1e2022] md:text-[#f6f5f2]"
            >
              Say hello
              <span aria-hidden="true" className="transition-transform duration-300 ease-film group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/mehrad-andalibi"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-line px-6 py-3 font-display text-[0.95rem] font-medium text-ink transition-colors duration-300 hover:border-ink md:border-[#1e2022]/25 md:bg-[#f6f5f2]/45 md:text-photo-ink md:backdrop-blur-sm md:hover:border-[#1e2022]/60"
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Links, written as the commands you'd type */}
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-6 md:py-28">
        <ul className="border-t border-line">
          {LINKS.map((l, i) => (
            <li key={l.href} data-reveal={i}>
              <a
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noreferrer" : undefined}
                className="group flex items-center justify-between gap-4 border-b border-line py-5 md:py-6"
              >
                <span className="flex min-w-0 items-baseline gap-4 font-mono md:gap-6">
                  <span className="w-10 shrink-0 text-[0.8rem] text-muted md:w-12">$ {l.cmd}</span>
                  <span className="truncate font-display text-[clamp(1.05rem,2.6vw,1.9rem)] tracking-tight text-ink transition-colors duration-300 group-hover:text-accent">
                    {l.label}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="shrink-0 font-display text-xl text-muted transition-transform duration-300 ease-film group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent"
                >
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <footer className="border-t border-line px-5 pt-8 pb-[calc(env(safe-area-inset-bottom,0px)+2rem)] md:px-6">
        <div className="label mx-auto flex max-w-6xl flex-col gap-3 text-muted sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Mehrad Andalibi · Ottawa</p>
          <a href="#hero" className="hover:text-ink">
            Back to top ↑
          </a>
        </div>
      </footer>
    </section>
  );
}

"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, FileText, Github, Linkedin, Mail, type LucideIcon } from "lucide-react";
import SplitWords from "@/components/motion/SplitWords";
import { useReveal } from "@/components/motion/useReveal";
import IconBadge from "@/components/ui/IconBadge";
import { ScrollTrigger, useGSAP, MOTION_OK, gsap } from "@/lib/gsap";

const LINKS: { icon: LucideIcon; label: string; value: string; href: string; external: boolean }[] = [
  { icon: Mail, label: "Email", value: "mehradandalibi@gmail.com", href: "mailto:mehradandalibi@gmail.com", external: false },
  { icon: Linkedin, label: "LinkedIn", value: "in/mehrad-andalibi", href: "https://www.linkedin.com/in/mehrad-andalibi", external: true },
  { icon: Github, label: "GitHub", value: "mehrad-andalibi", href: "https://github.com/mehrad-andalibi", external: true },
  { icon: FileText, label: "Resume", value: "Download PDF", href: "/resume/Mehrad-Andalibi-Resume.pdf", external: true },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const filmRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [filmFailed, setFilmFailed] = useState(false);
  useReveal(sectionRef);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const video = videoRef.current;
        // The film card opens up from an inset rounded card to nearly full width
        gsap.fromTo(
          filmRef.current,
          { clipPath: "inset(6% 7% 6% 7% round 48px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 32px)",
            ease: "none",
            scrollTrigger: { trigger: filmRef.current, start: "top 90%", end: "top 20%", scrub: true },
          },
        );
        // The closing film plays once when it is well in view
        const st = ScrollTrigger.create({
          trigger: filmRef.current,
          start: "top 45%",
          once: true,
          onEnter: () => {
            if (!video) return;
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
    <section id="contact" ref={sectionRef} className="bg-paper pt-8 md:pt-16">
      <div className="mx-auto max-w-[88rem] px-3 md:px-6">
        <div ref={filmRef} className="relative overflow-hidden rounded-[32px] bg-film">
          <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/8]">
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

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#efece7] via-[#efece7]/85 to-transparent px-6 pt-24 pb-7 md:inset-y-0 md:right-auto md:flex md:w-[min(46%,36rem)] md:flex-col md:justify-center md:bg-none md:pt-0 md:pb-0 md:pl-[clamp(24px,5vw,80px)]">
            <p className="label rule-draw text-photo-muted" data-split>
              Contact
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.2rem,5.4vw,4.8rem)] leading-[1.02] font-medium tracking-[-0.035em] text-photo-ink md:mt-4" data-split>
              <SplitWords text="Let's build something useful." />
            </h2>
            <p className="mt-4 hidden max-w-[34ch] font-serif text-[1.08rem] leading-relaxed text-photo-muted sm:block" data-reveal="1">
              Open to co-op and backend developer opportunities. Reach out about a role, a project or a collaboration.
            </p>
            <div className="mt-6" data-reveal="2">
              <a
                href="mailto:mehradandalibi@gmail.com"
                className="group inline-flex items-center gap-2 rounded-full bg-[#1e2022] px-6 py-3 font-display text-[0.95rem] font-medium text-[#f6f5f2] transition-transform duration-300 ease-film hover:-translate-y-0.5"
              >
                Say hello
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-film group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Link tiles */}
      <ul className="mx-auto mt-4 grid max-w-[88rem] gap-3 px-3 sm:grid-cols-2 md:px-6 lg:grid-cols-4 lg:gap-4">
        {LINKS.map((l, i) => (
          <li key={l.href} data-reveal={i}>
            <a
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noreferrer" : undefined}
              className="group flex h-full flex-col justify-between gap-10 rounded-[28px] bg-surface p-6 shadow-card transition-[transform,box-shadow] duration-500 ease-film hover:-translate-y-1 hover:shadow-lift md:p-7"
            >
              <span className="flex items-start justify-between">
                <IconBadge icon={l.icon} tone={i === 0 ? "ink" : "accent"} className="transition-transform duration-500 ease-film group-hover:scale-110 group-hover:-rotate-6" />
                <ArrowUpRight
                  className="h-5 w-5 text-muted transition-[transform,color] duration-300 ease-film group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
                  aria-hidden="true"
                />
              </span>
              <span>
                <span className="label block text-muted">{l.label}</span>
                <span className="mt-1 block truncate font-display text-[1.2rem] font-medium tracking-tight text-ink">{l.value}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <footer className="px-5 pt-16 pb-[calc(env(safe-area-inset-bottom,0px)+2rem)] md:px-6">
        <div className="label mx-auto flex max-w-6xl flex-col gap-3 border-t border-line pt-8 text-muted sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Mehrad Andalibi · Ottawa</p>
          <a href="#hero" className="hover:text-ink">
            Back to top ↑
          </a>
        </div>
      </footer>
    </section>
  );
}

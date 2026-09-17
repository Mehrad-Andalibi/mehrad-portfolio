"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SplitWords from "@/components/motion/SplitWords";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK, MOTION_REDUCED } from "@/lib/gsap";

/*
 * Film hero
 * ---------
 * A 9.7 s film (public/film/intro.*) is scrubbed by scroll while the section is
 * pinned. Three chapters of copy sit on top of it.
 *
 *   mode "film"    video follows scroll (default)
 *   mode "stills"  the video could not load: the three keyframes crossfade instead
 *   mode "static"  reduced motion: no pinning, one still frame, chapter 1 only
 *
 * Everything a visitor needs (name, buttons, navigation) is plain HTML and works
 * before the media has loaded.
 */

type Mode = "film" | "stills" | "static";

// Scroll progress -> video time. The two dissolves in the film (01 -> 02 and the
// cut to the laptop shot) are crossed quickly so a paused scroll never rests on
// a ghosted frame.
const FALLBACK_DURATION = 9.73;
function timeFor(p: number, duration: number) {
  const end = (duration || FALLBACK_DURATION) - 0.05;
  const keys: [number, number][] = [[0, 0], [0.27, 2.33], [0.29, 2.76], [0.5, 4.62], [0.52, 5.02], [1, end]];
  for (let i = 1; i < keys.length; i++) {
    if (p <= keys[i][0]) {
      const [p0, t0] = keys[i - 1];
      const [p1, t1] = keys[i];
      return t0 + ((t1 - t0) * (p - p0)) / (p1 - p0);
    }
  }
  return end;
}

// Which chapter's copy is on screen at a given progress (-1 = between chapters)
const COPY_WINDOWS: [number, number][] = [[0, 0.2], [0.33, 0.51], [0.64, 1.01]];
const CHAPTER_STARTS = [0, 0.3, 0.58, 1];
const CHAPTER_NAMES = ["Intro", "Building", "Project 01"];

function formatTimecode(t: number) {
  const s = Math.floor(t);
  const f = Math.floor((t % 1) * 30);
  return `00:${String(s).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timecodeRef = useRef<HTMLSpanElement>(null);
  const railRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const chapter3Ref = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<Mode>("film");
  const [visible, setVisible] = useState(0); // chapter whose copy is showing
  const [shot, setShot] = useState(0); // chapter whose still is showing (stills mode)
  const [ready, setReady] = useState(false); // plays the chapter-1 entrance after mount

  const modeRef = useRef<Mode>("film");
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  // Entrance for chapter 1 on first paint
  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)));
    return () => cancelAnimationFrame(id);
  }, []);

  // Keep chapter 3's copy on the wall above the laptop, whatever the crop
  useEffect(() => {
    const place = () => {
      const stage = stageRef.current;
      const el = chapter3Ref.current;
      if (!stage || !el) return;
      const W = stage.clientWidth;
      const H = stage.clientHeight;
      const Lw = Math.max(W, (H * 16) / 9);
      const Lh = (Lw * 9) / 16;
      const left = Math.min(0, Math.max(W - Lw, W / 2 - 0.64 * Lw));
      const x = left + 0.5 * Lw;
      el.style.setProperty("--c3-left", `${x}px`);
      el.style.setProperty("--c3-top", `${Math.max((H - Lh) / 2 + 0.08 * Lh, 88)}px`);
      el.style.setProperty("--c3-width", `${Math.min(0.28 * Lw, W - x - 24)}px`);
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_REDUCED, () => {
        setMode("static");
        setVisible(0);
      });

      mm.add(MOTION_OK, () => {
        const video = videoRef.current;
        const section = sectionRef.current;
        if (!video || !section) return;
        setMode((m) => (m === "static" ? "film" : m));

        let target = 0;
        let current = 0;
        let lastVisible = 0;
        let lastShot = 0;
        const toStills = () => setMode("stills");

        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            const p = self.progress;
            target = timeFor(p, video.duration);

            const v = COPY_WINDOWS.findIndex(([a, b]) => p >= a && p < b);
            if (v !== lastVisible) setVisible((lastVisible = v));

            const s = p < CHAPTER_STARTS[1] ? 0 : p < CHAPTER_STARTS[2] ? 1 : 2;
            if (s !== lastShot) setShot((lastShot = s));

            railRefs.current.forEach((bar, i) => {
              if (!bar) return;
              const fill = (p - CHAPTER_STARTS[i]) / (CHAPTER_STARTS[i + 1] - CHAPTER_STARTS[i]);
              bar.style.transform = `scaleX(${Math.min(1, Math.max(0, fill))})`;
            });
          },
        });

        // Ease the playhead toward the scroll target and seek when it moves.
        const tick = () => {
          const d = target - current;
          current += Math.abs(d) < 0.004 ? d : d * 0.16;
          if (modeRef.current === "film" && video.readyState >= 1 && !video.seeking && Math.abs(video.currentTime - current) > 1 / 60) {
            try {
              video.currentTime = current;
            } catch {
              /* seeking before metadata can throw on some browsers */
            }
          }
          if (timecodeRef.current) timecodeRef.current.textContent = formatTimecode(current);
        };
        gsap.ticker.add(tick);

        // iOS paints seeked frames only after one play() inside a user gesture
        const prime = () => {
          const pr = video.play();
          if (pr) pr.then(() => video.pause()).catch(() => {});
        };
        window.addEventListener("touchstart", prime, { once: true, passive: true });

        const sources = video.querySelectorAll("source");
        const lastSource = sources[sources.length - 1];
        video.addEventListener("error", toStills);
        lastSource?.addEventListener("error", toStills);
        // A source may already have failed before hydration attached the listeners
        if (video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) toStills();
        const timeout = window.setTimeout(() => {
          if (video.readyState < 1) toStills();
        }, 9000);

        return () => {
          trigger.kill();
          gsap.ticker.remove(tick);
          window.removeEventListener("touchstart", prime);
          video.removeEventListener("error", toStills);
          lastSource?.removeEventListener("error", toStills);
          window.clearTimeout(timeout);
        };
      });
    },
    { scope: sectionRef },
  );

  const isStatic = mode === "static";
  const chapterProps = (i: number) => ({
    "data-active": String(visible === i) as "true" | "false",
    "aria-hidden": isStatic ? i !== 0 : visible !== i,
  });

  return (
    <section
      id="hero"
      ref={sectionRef}
      data-ready={String(ready)}
      aria-label="Introduction"
      className={`relative ${isStatic ? "h-auto" : "h-[460svh]"}`}
    >
      <div
        ref={stageRef}
        className={`${isStatic ? "relative h-svh min-h-[600px]" : "sticky top-0 h-svh"} overflow-hidden bg-film`}
      >
        {/* ---------- media ---------- */}
        <div className="absolute inset-x-0 top-0 h-[56%] md:h-full" aria-hidden="true">
          {mode === "film" && (
            <video
              ref={videoRef}
              className="h-full w-full object-cover object-[62%_40%] md:object-[64%_45%]"
              muted
              playsInline
              preload="auto"
              poster="/film/frame-01.webp"
              disablePictureInPicture
            >
              <source src="/film/intro.mp4" type="video/mp4" />
              <source src="/film/intro.webm" type="video/webm" />
            </video>
          )}
          {mode !== "film" &&
            ["/film/frame-01.webp", "/film/frame-02.webp", "/film/frame-03.webp"].map((src, i) =>
              isStatic && i > 0 ? null : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={src}
                  src={src}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover object-[62%_40%] transition-opacity duration-700 ease-film md:object-[64%_45%]"
                  style={{ opacity: isStatic || shot === i ? 1 : 0 }}
                />
              ),
            )}
        </div>

        {/* mobile: copy panel under the picture */}
        <div className="absolute inset-x-0 bottom-0 h-[44%] bg-paper md:hidden" aria-hidden="true" />

        {/* ---------- chapter 1: who ---------- */}
        <div
          {...chapterProps(0)}
          className="film-chapter absolute inset-x-0 bottom-0 h-[44%] px-5 pt-5 md:inset-auto md:left-[clamp(24px,6vw,96px)] md:top-1/2 md:h-auto md:w-[min(46%,38rem)] md:-translate-y-1/2 md:px-0 md:pt-0"
          style={isStatic ? { opacity: 1, visibility: "visible" } : undefined}
        >
          <p className="label rule-draw text-muted md:text-photo-muted">Software developer · Ottawa</p>
          <h1 className="mt-3 font-display text-[clamp(2.3rem,9vw,2.9rem)] leading-[1.02] font-medium tracking-[-0.03em] text-ink md:mt-4 md:text-[clamp(3rem,5.4vw,5.2rem)] md:text-photo-ink">
            <SplitWords text="Mehrad Andalibi" />
          </h1>
          <p className="mt-2 font-display text-[clamp(1.05rem,4.4vw,1.3rem)] leading-snug text-muted md:mt-3 md:text-[clamp(1.25rem,2vw,1.75rem)] md:text-photo-muted">
            <SplitWords text="Software development, with a business perspective." offset={2} />
          </p>
          <p className="mt-5 hidden max-w-[34ch] font-serif text-[1.05rem] leading-relaxed text-photo-muted md:block">
            Backend systems in Java and Spring Boot, REST APIs and relational databases, built to be read, tested and run.
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5 md:mt-7 md:gap-3">
            <Link
              href="#projects"
              className="rounded-full bg-ink px-5 py-2.5 font-display text-sm font-medium text-paper md:bg-[#1e2022] md:text-[#f6f5f2] transition-transform duration-300 ease-film hover:-translate-y-0.5 md:px-6 md:py-3 md:text-[0.95rem]"
            >
              View projects
            </Link>
            <a
              href="/resume/Mehrad-Andalibi-Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-line px-5 py-2.5 font-display text-sm font-medium text-ink transition-colors duration-300 hover:border-ink md:border-[#1e2022]/25 md:bg-[#f6f5f2]/40 md:px-6 md:py-3 md:text-[0.95rem] md:text-photo-ink md:backdrop-blur-sm md:hover:border-[#1e2022]/60"
            >
              Resume (PDF)
            </a>
            <Link
              href="#contact"
              className="hidden rounded-full border border-[#1e2022]/25 bg-[#f6f5f2]/40 px-6 py-3 font-display text-[0.95rem] font-medium text-photo-ink backdrop-blur-sm transition-colors duration-300 hover:border-[#1e2022]/60 md:inline-block"
            >
              Contact
            </Link>
          </div>
          {!isStatic && (
            <a href="#about" className="label mt-9 hidden items-center gap-3 text-photo-muted md:inline-flex">
              <span className="hint-line block h-9 w-px bg-current opacity-60" aria-hidden="true" />
              Scroll, or skip the intro
            </a>
          )}
        </div>

        {/* ---------- chapter 2: what ---------- */}
        {!isStatic && (
          <div
            {...chapterProps(1)}
            className="film-chapter absolute inset-x-0 bottom-0 h-[44%] px-5 pt-5 md:inset-auto md:left-[clamp(24px,6vw,96px)] md:top-1/2 md:h-auto md:w-[min(42%,34rem)] md:-translate-y-1/2 md:px-0 md:pt-0"
          >
            <p className="label rule-draw text-muted md:text-photo-muted">Java · Spring Boot · REST</p>
            <h2 className="mt-3 font-display text-[clamp(2rem,8.4vw,2.6rem)] leading-[1.04] font-medium tracking-[-0.028em] text-ink md:mt-4 md:text-[clamp(2.4rem,4.6vw,4.4rem)] md:text-photo-ink">
              <SplitWords text="Building useful software." />
            </h2>
            <p className="mt-3 max-w-[32ch] font-serif text-base leading-relaxed text-muted md:mt-5 md:text-[1.1rem] md:text-photo-muted">
              Services that move real work forward: clean architecture, tested business logic, databases designed to last.
            </p>
          </div>
        )}

        {/* ---------- chapter 3: now ---------- */}
        {!isStatic && (
          <div
            ref={chapter3Ref}
            {...chapterProps(2)}
            className="film-chapter absolute inset-x-0 bottom-0 h-[44%] px-5 pt-5 md:inset-auto md:left-[var(--c3-left,50%)] md:top-[var(--c3-top,8%)] md:h-auto md:w-[var(--c3-width,28%)] md:px-0 md:pt-0"
          >
            <p className="label rule-draw text-muted md:text-photo-muted">Now building · Project 01</p>
            <h2 className="mt-3 font-display text-[clamp(2rem,8.4vw,2.6rem)] leading-[1.04] font-medium tracking-[-0.028em] text-ink md:mt-4 md:text-[clamp(1.8rem,3.1vw,3.2rem)] md:text-photo-ink">
              <SplitWords text="Connecting software, data and business." />
            </h2>
            <Link href="#fleet-orchestrator" className="label mt-4 inline-flex items-center gap-2 text-accent md:mt-5 md:text-photo-muted md:hover:text-photo-ink">
              See the project <span aria-hidden="true">↓</span>
            </Link>
          </div>
        )}

        {/* ---------- HUD ---------- */}
        {!isStatic && (
          <>
            <div
              className="label absolute top-[calc(56%-34px)] left-5 z-10 flex items-center gap-3 text-[#f6f5f2] tabular-nums md:top-auto md:bottom-[calc(env(safe-area-inset-bottom,0px)+22px)] md:left-[clamp(24px,6vw,96px)] md:gap-4 md:text-photo-muted"
              aria-hidden="true"
            >
              <span className="rec-dot block h-[7px] w-[7px] rounded-full bg-[#b24a36]" />
              <span ref={timecodeRef}>00:00:00</span>
              <span className="hidden sm:inline">{CHAPTER_NAMES[Math.max(0, shot)]}</span>
            </div>
            <div
              className="absolute top-[calc(56%-27px)] right-5 z-10 flex items-center gap-1.5 text-[#f6f5f2] md:top-auto md:right-[clamp(24px,6vw,96px)] md:bottom-[calc(env(safe-area-inset-bottom,0px)+28px)] md:text-photo-muted"
              aria-hidden="true"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`relative block h-0.5 overflow-hidden transition-[width,opacity] duration-500 ease-film ${shot === i ? "w-11 opacity-90" : "w-6 opacity-30"}`}
                >
                  <span className="absolute inset-0 bg-current opacity-30" />
                  <span
                    ref={(el) => {
                      railRefs.current[i] = el;
                    }}
                    className="absolute inset-0 origin-left scale-x-0 bg-current"
                  />
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

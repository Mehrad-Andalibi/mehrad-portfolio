"use client";

import type { RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";

/**
 * Scroll reveals shared by every content section.
 *
 *  - [data-reveal]        rises in with a soft blur when it enters the viewport.
 *                         data-reveal="2" delays it by 2 stagger steps (90ms each).
 *  - [data-reveal-zoom]   scales up from 0.92 with the same blur (cards, media).
 *  - [data-pop]           icon badges: spring in with a slight turn.
 *  - [data-split]         gets .split-play on enter, which slides its SplitWords in.
 *
 * Elements are visible by default; nothing is hidden when reduced motion is
 * requested or before JavaScript runs.
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const root = scope.current;
        if (!root) return;

        root.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top 88%",
            once: true,
            onEnter: () => el.classList.add("split-play"),
          });
        });

        root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
          const step = Number(el.dataset.reveal || 0);
          gsap.from(el, {
            opacity: 0,
            y: 36,
            filter: "blur(8px)",
            duration: 1.1,
            delay: step * 0.09,
            ease: "power3.out",
            clearProps: "filter",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });

        root.querySelectorAll<HTMLElement>("[data-reveal-zoom]").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            scale: 0.92,
            filter: "blur(10px)",
            duration: 1.3,
            ease: "expo.out",
            clearProps: "filter",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        root.querySelectorAll<HTMLElement>("[data-pop]").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            scale: 0.4,
            rotate: -14,
            duration: 1,
            delay: Number(el.dataset.pop || 0) * 0.09,
            ease: "back.out(2.2)",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          });
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        scope.current?.querySelectorAll("[data-split]").forEach((el) => el.classList.add("split-play"));
      });
    },
    { scope },
  );
}

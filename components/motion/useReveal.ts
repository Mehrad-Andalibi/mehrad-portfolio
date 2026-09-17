"use client";

import type { RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";

/**
 * Scroll reveals shared by every content section.
 *
 *  - [data-reveal]      rises in (opacity + y) when it enters the viewport.
 *                       data-reveal="2" adds a stagger step of 90ms per unit.
 *  - [data-split]       gets .split-play when it enters, which slides its
 *                       SplitWords in (CSS transition).
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

        gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-reveal]")).forEach((el) => {
          const step = Number(el.dataset.reveal || 0);
          gsap.from(el, {
            opacity: 0,
            y: 28,
            duration: 0.9,
            delay: step * 0.09,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
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

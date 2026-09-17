"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

type Props = {
  text: string;
  className?: string;
  /** words to emphasise in the accent colour once lit */
  emphasis?: string[];
};

/**
 * A large statement whose words light up from grey to ink as it scrolls
 * through the viewport, in the style of Apple's product pages.
 * With reduced motion (or before JS) the text is simply fully lit.
 */
export default function ScrollHighlight({ text, className, emphasis = [] }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const words = ref.current!.querySelectorAll<HTMLElement>(".hl-word");
        gsap.fromTo(
          words,
          { color: "#b9b5ad" },
          {
            color: (_i: number, el: HTMLElement) => (el.dataset.em ? "#3e5563" : "#1e2022"),
            stagger: 0.6,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top 82%", end: "bottom 42%", scrub: 0.6 },
          },
        );
      });
    },
    { scope: ref },
  );

  const clean = (w: string) => w.replace(/[^\p{L}\p{N}-]/gu, "").toLowerCase();
  const em = new Set(emphasis.map((e) => e.toLowerCase()));

  return (
    <p ref={ref} className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i}>
          <span className="hl-word" data-em={em.has(clean(word)) ? "1" : undefined}>
            {word}
          </span>{" "}
        </span>
      ))}
    </p>
  );
}

"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register plugins once for the whole app.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const MOTION_REDUCED = "(prefers-reduced-motion: reduce)";

export { gsap, ScrollTrigger, useGSAP };

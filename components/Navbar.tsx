"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [overFilm, setOverFilm] = useState(true); // transparent while the film is on screen
  const [tucked, setTucked] = useState(false); // hides while scrolling down past the film
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const hero = document.getElementById("hero");
      const heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
      setOverFilm(heroBottom > 72);
      if (heroBottom < 0 && y > lastY + 4) setTucked(true);
      else if (y < lastY - 4 || heroBottom >= 0) setTucked(false);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section in view
  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(Boolean) as Element[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const solid = !overFilm || isOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b pt-[env(safe-area-inset-top,0px)] transition-[background-color,border-color,transform] duration-500 ease-film ${
        solid ? "border-line bg-paper/85 backdrop-blur-md" : "border-transparent bg-transparent"
      } ${tucked && !isOpen ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-[4.5rem] md:px-6">
        <Link
          href="#hero"
          className={`font-display text-[1.05rem] font-semibold tracking-tight ${solid ? "text-ink" : "text-photo-ink [text-shadow:0_0_14px_rgb(246_245_242/0.85)]"}`}
          onClick={() => setIsOpen(false)}
        >
          Mehrad Andalibi
        </Link>

        <nav className="hidden gap-7 md:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active === l.href ? "true" : undefined}
              className={`group relative font-display text-[0.92rem] transition-colors ${
                solid ? "text-muted hover:text-ink aria-[current]:text-ink" : "text-photo-muted hover:text-photo-ink"
              }`}
            >
              {l.label}
              <span
                className={`absolute inset-x-0 -bottom-1 h-px origin-left bg-current transition-transform duration-300 ease-film group-hover:scale-x-100 ${
                  active === l.href && solid ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </Link>
          ))}
        </nav>

        <button
          className={`-mr-2 p-2 md:hidden ${solid ? "text-ink" : "text-photo-ink"}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-line bg-paper px-5 pb-6 md:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setIsOpen(false)}
              className="block border-b border-line py-4 font-display text-2xl tracking-tight text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

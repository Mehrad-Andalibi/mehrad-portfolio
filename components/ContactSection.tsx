"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // DESKTOP: Parallax & Timeline
    mm.add("(min-width: 1024px)", () => {
      // 1. Initial State
      gsap.set(terminalRef.current, { opacity: 0, y: 30, scale: 0.95 });
      gsap.set(contentRef.current?.children ? gsap.utils.toArray(contentRef.current.children) : [], { 
        opacity: 0, 
        y: 20 
      });

      // 2. Main Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%", // Trigger slightly before the section comes fully into view
          toggleActions: "play none none reverse"
        }
      });

      // 3. Animation Sequence
      tl.to(terminalRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out"
      })
      .to(contentRef.current?.children ? gsap.utils.toArray(contentRef.current.children) : [], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
      }, "-=0.6");

      // 4. Parallax effect for the Terminal
      gsap.to(terminalRef.current, {
        y: -40, // Move upwards as we scroll down
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      return () => { }
    });

    // TABLET: Clean text/terminal fade, no parallax
    mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
      gsap.set(terminalRef.current, { opacity: 0, y: 20 });
      gsap.set(contentRef.current?.children ? gsap.utils.toArray(contentRef.current.children) : [], { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      tl.to(terminalRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
        .to(contentRef.current?.children ? gsap.utils.toArray(contentRef.current.children) : [], { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }, "-=0.4");
        
      return () => { }
    });

    // MOBILE: Fallback
    mm.add("(max-width: 767px)", () => {
      gsap.fromTo([terminalRef.current, contentRef.current], 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          stagger: 0.2,
          scrollTrigger: { trigger: containerRef.current, start: "top 85%" }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <section id="contact" ref={containerRef} className="relative py-32 px-6 bg-slate-900 dark:bg-[#050505] overflow-hidden border-t border-slate-800 dark:border-white/5">
      
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
        
        {/* Subtle Terminal/Code Visual Anchor */}
        <div ref={terminalRef} className="w-full max-w-sm bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] mb-12 overflow-hidden transform-gpu">
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 border-b border-white/5 bg-white/5">
            <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-slate-600" />
            <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-slate-600" />
            <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-slate-600" />
            <span className="text-[9px] sm:text-[10px] font-mono text-slate-500 ml-1 sm:ml-2">guest@mehrad-portfolio:~</span>
          </div>
          <div className="p-4 sm:p-5 font-mono text-[11px] sm:text-sm relative">
            {/* Custom blink animation style */}
            <style jsx>{`
              @keyframes cursor-blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
              }
              .terminal-cursor {
                animation: cursor-blink 1s step-end infinite;
              }
            `}</style>
            
            <div className="flex items-center gap-3 text-emerald-400">
               <span>$</span>
               <span className="text-slate-300 relative inline-flex">
                 ./init-contact-sequence.sh
                 <span className="absolute -right-3 top-[3px] w-2 h-3.5 bg-emerald-400 terminal-cursor" />
               </span>
            </div>
            <div className="mt-2 text-slate-500 text-xs text-opacity-80">Awaiting connection...</div>
          </div>
        </div>

        {/* Text and Actions */}
        <div ref={contentRef} className="text-center w-full flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6 text-white leading-tight">
            Let&apos;s build something <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">impactful.</span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-10 sm:mb-12 max-w-2xl leading-relaxed px-4">
            I’m currently open to Software Developer and Backend Developer opportunities. Feel free to reach out for collaboration, projects, or full-time roles.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-24">
            <a 
              href="mailto:mehradandalibi@gmail.com" 
              className="group relative px-8 py-4 rounded-full bg-white text-slate-900 font-semibold hover:bg-slate-100 transition-all w-full sm:w-auto text-center overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Say Hello
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </span>
            </a>
            <a 
              href="https://www.linkedin.com/in/mehrad-andalibi" 
              target="_blank" 
              rel="noreferrer"
              className="px-8 py-4 rounded-full border border-slate-700 hover:border-slate-500 hover:bg-slate-800 text-white font-medium transition-all w-full sm:w-auto text-center"
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>

        {/* Footer Polish */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-8 mt-4 font-mono text-[10px] sm:text-xs text-slate-500 gap-6 md:gap-0">
          <p className="text-center md:text-left">&copy; {new Date().getFullYear()} Mehrad Andalibi. All sequences online.</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a href="https://github.com/mehrad-andalibi" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">GITHUB</a>
            <a href="https://www.linkedin.com/in/mehrad-andalibi" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">LINKEDIN</a>
            <a href="mailto:mehradandalibi@gmail.com" className="hover:text-blue-400 transition-colors">EMAIL</a>
          </div>
        </div>
        
      </div>
    </section>
  );
}

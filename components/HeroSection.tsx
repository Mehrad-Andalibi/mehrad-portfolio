"use client";

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function HeroSection() {
  // GSAP Refs
  const containerRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const baseDeveloperRef = useRef<HTMLDivElement>(null);
  const codeStreamRef = useRef<HTMLDivElement>(null);
  const laptopScreenRef = useRef<HTMLDivElement>(null);
  const syntaxLinesRef = useRef<HTMLDivElement>(null);
  const svgLinesRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    // Media query matching to disable advanced animations on mobile if needed,
    // but GSAP ScrollTrigger handles responsive scrubbing well.
    let mm = gsap.matchMedia();

    // DESKTOP: Full rich storytelling
    mm.add("(min-width: 1024px)", () => {
      // 1. Initial State Setup
      gsap.set(glowRef.current, { opacity: 0.3, scale: 0.8 });
      
      // Main Editor Panel (Starts slightly pushed back, faded, and desaturated)
      gsap.set(baseDeveloperRef.current, { 
        opacity: 0, 
        y: 80,
        scale: 0.9,
        rotateX: 10, // More pronounced 3D tilt
        filter: "brightness(0.6) saturate(0.5)"
      });

      // Syntax Lines Hidden
      if (syntaxLinesRef.current) {
        gsap.set(syntaxLinesRef.current.children, { opacity: 0, x: -10 });
      }

      // SVG Connectors Hidden
      gsap.set(svgLinesRef.current, { opacity: 0 });
      
      // Left Stream Widget (Starts lower and off to left)
      gsap.set(codeStreamRef.current, { 
        opacity: 0, 
        x: -50, 
        y: 40,
        scale: 0.9
      });
      
      // Right Laptop/Build Overlay (Starts lower and off to right)
      gsap.set(laptopScreenRef.current, { 
        opacity: 0, 
        x: 50,
        y: 60, 
        scale: 0.9 
      });
      
      // 2. Create the Timeline linked to the ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top", // When top of container hits top of viewport
          end: "bottom bottom", // When bottom of container hits bottom of viewport
          scrub: 1.5, // Extremely smooth scrubbing
        }
      });

      // 3. Animation Sequence (Premium Staggered Parallax)
      
      // Glow softly expands and moves slightly for background parallax
      tl.to(glowRef.current, {
        opacity: 0.8,
        scale: 1.2,
        y: -30,
        duration: 4,
        ease: "power1.inOut"
      }, 0)
      
      // Main Center Panel slides up, scales up, and becomes fully saturated ("Active")
      .to(baseDeveloperRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        filter: "brightness(1) saturate(1)",
        duration: 3,
        ease: "power2.out"
      }, 0.5)

      // Syntax glowing lines stagger in as the panel settles
      .to(syntaxLinesRef.current?.children ? gsap.utils.toArray(syntaxLinesRef.current.children) : [], {
        opacity: 1,
        x: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power2.out"
      }, 1)

      // SVG Connectors slowly power on
      .to(svgLinesRef.current, {
        opacity: 0.4,
        duration: 2,
        ease: "power2.inOut"
      }, 1.2)

      // Left Widget floats in slightly after center panel
      .to(codeStreamRef.current, {
        opacity: 1,
        x: 0,
        y: -20, // Continues to float upwards slightly representing parallax depth
        scale: 1,
        duration: 3,
        ease: "power2.out"
      }, 1)

      // Right Overlay pops into focus last
      .to(laptopScreenRef.current, {
        opacity: 1,
        x: 0,
        y: -15, // Slight parallax float
        scale: 1,
        duration: 3,
        ease: "power3.out"
      }, 1.5);
      
      return () => {
        // Cleanup function for this media query
      };
    });

    // TABLET & MOBILE: Clean fade-in without scroll scrub or sticky pinning
    mm.add("(max-width: 1023px)", () => {
      const elementsToAnimate = [
        glowRef.current, 
        baseDeveloperRef.current,
        codeStreamRef.current, 
        laptopScreenRef.current,
        svgLinesRef.current
      ].filter(Boolean); // Filter out nulls safely

      // Start hidden
      gsap.set(elementsToAnimate, { opacity: 0, y: 20 });
      if (syntaxLinesRef.current) gsap.set(syntaxLinesRef.current.children, { opacity: 0, x: -10 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        }
      });

      tl.to(elementsToAnimate, { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power2.out" });
      if (syntaxLinesRef.current) {
        tl.to(syntaxLinesRef.current.children, { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }, "-=0.5");
      }
      
      return () => {};
    });

  }, { scope: containerRef });

  return (
    <section id="hero" ref={containerRef} className="relative h-auto lg:h-[150vh] xl:h-[200vh]">
      {/* Sticky Inner Container */}
      <div className="lg:sticky lg:top-0 h-auto lg:h-screen flex items-center justify-center pt-24 pb-16 md:pt-32 md:pb-24 lg:py-12 px-6 overflow-hidden">
        
        <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 mt-4 lg:mt-0">
          
          {/* Left Side: Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 md:gap-8 z-10">
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                Mehrad Andalibi
              </h1>
              <h2 className="text-xl sm:text-2xl lg:text-4xl font-semibold text-blue-600 dark:text-blue-400">
                Software Developer
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                Building scalable applications using Java, Python, and modern web technologies. Experienced in backend development, REST APIs, and relational databases, with a strong foundation in data analysis, data structures, and efficient problem solving.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
              <Link 
                href="#projects" 
                className="px-8 py-4 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors w-full sm:w-auto text-center"
              >
                View Projects
              </Link>
              <a 
                href="/resume/Mehrad-Andalibi-Resume.pdf" 
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 rounded-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors w-full sm:w-auto text-center"
              >
                Download Resume
              </a>
              <Link 
                href="#contact" 
                className="px-8 py-4 rounded-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors w-full sm:w-auto text-center"
              >
                Contact Me
              </Link>
            </div>
          </div>

          {/* Right Side: Abstract Premium Visual Scene */}
          <div className="w-full lg:w-1/2 relative flex items-center justify-center min-h-[350px] sm:min-h-[450px] lg:min-h-[550px] z-10 perspective-1000 mt-8 lg:mt-0">
            <div className="relative w-full max-w-lg aspect-square transform-gpu flex items-center justify-center">
              
              {/* 1. Background Ambient Glows */}
              <div 
                ref={glowRef} 
                className="absolute inset-0 bg-gradient-to-tr from-cyan-600/20 via-blue-500/10 to-indigo-500/20 blur-[80px] rounded-full mix-blend-screen z-0" 
              />
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/30 blur-[60px] rounded-full mix-blend-screen z-0" />
              <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-cyan-500/20 blur-[60px] rounded-full mix-blend-screen z-0" />

              {/* 2. Luminous Connector Lines (SVG) - Placed behind panels */}
              <svg ref={svgLinesRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-40">
                <defs>
                  <linearGradient id="line-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
                    <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
                    <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="line-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#818cf8" stopOpacity="0" />
                    <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                {/* Connecting Terminal (left) to Editor (center) */}
                <path d="M 80 150 Q 150 150 150 250 T 250 250" fill="none" stroke="url(#line-grad-1)" strokeWidth="1.5" filter="url(#glow)" />
                {/* Connecting Editor (center) to Dev Card (right) */}
                <path d="M 350 300 Q 400 300 400 380 T 450 400" fill="none" stroke="url(#line-grad-2)" strokeWidth="1.5" filter="url(#glow)" />
              </svg>

              {/* 3. Main Editor Panel (Base Layer) */}
              <div 
                ref={baseDeveloperRef} 
                className="absolute w-[90%] sm:w-[80%] h-[60%] sm:h-[70%] z-10 bg-slate-900/60 dark:bg-[#0a0a0d]/70 backdrop-blur-2xl rounded-2xl border border-white/10 dark:border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden scale-90 sm:scale-100 origin-center"
              >
                {/* Editor Top Bar */}
                <div className="w-full h-10 bg-black/20 border-b border-white/5 flex items-center px-4 justify-between">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 mr-2">main.ts</div>
                </div>

                {/* Editor Syntax Area */}
                <div ref={syntaxLinesRef} className="flex-1 p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-600 font-mono text-xs w-4">1</span>
                    <div className="h-2 w-16 bg-purple-400/80 rounded" />
                    <div className="h-2 w-24 bg-cyan-400/80 rounded" />
                  </div>
                  <div className="flex items-center gap-3 pl-7">
                    <span className="text-slate-600 font-mono text-xs w-4">2</span>
                    <div className="h-2 w-32 bg-blue-400/80 rounded" />
                  </div>
                  <div className="flex items-center gap-3 pl-7">
                    <span className="text-slate-600 font-mono text-xs w-4">3</span>
                    <div className="h-2 w-40 bg-slate-500/50 rounded" />
                  </div>
                  <div className="flex items-center gap-3 pl-14 pt-2">
                    <span className="text-slate-600 font-mono text-xs w-4">4</span>
                    <div className="h-2 w-20 bg-green-400/80 rounded" />
                    <div className="h-2 w-16 bg-yellow-400/80 rounded" />
                  </div>
                  <div className="flex items-center gap-3 pl-14">
                    <span className="text-slate-600 font-mono text-xs w-4">5</span>
                    <div className="h-2 w-48 bg-blue-400/60 rounded" />
                  </div>
                  <div className="flex items-center gap-3 pl-7 pt-2">
                    <span className="text-slate-600 font-mono text-xs w-4">6</span>
                    <div className="h-2 w-8 bg-slate-500/50 rounded" />
                  </div>
                </div>
              </div>

              {/* 4. Smaller Terminal Panel (Stream Layer) */}
              <div 
                ref={codeStreamRef} 
                className="absolute z-20 left-0 sm:-left-4 top-[10%] sm:top-1/4 w-44 sm:w-56 h-32 sm:h-40 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-3 sm:p-4 shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex flex-col scale-75 sm:scale-100 origin-top-left"
              >
                <div className="text-[10px] font-mono text-slate-400 mb-3 flex items-center gap-2 border-b border-white/10 pb-2">
                  <div className="w-2 h-2 rounded-sm bg-slate-500" />
                  <span>Terminal</span>
                </div>
                <div className="flex-1 font-mono text-[10px] leading-relaxed flex flex-col gap-1.5 opacity-80">
                  <div className="flex gap-2">
                     <span className="text-emerald-400">➜</span>
                     <span className="text-cyan-300">npm</span>
                     <span className="text-slate-300">run build</span>
                  </div>
                  <div className="text-slate-400 pl-4">Compiling...</div>
                  <div className="text-slate-400 pl-4">Done in 2.4s.</div>
                  <div className="flex gap-2 mt-1">
                     <span className="text-emerald-400">➜</span>
                     <span className="w-2 h-3 bg-white/70 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* 5. Floating Dev-Tools / Deployment Card (Laptop Overlay Layer) */}
              <div 
                ref={laptopScreenRef} 
                className="absolute z-30 right-0 sm:-right-8 bottom-[10%] sm:bottom-1/4 w-48 sm:w-60 bg-white/5 dark:bg-white/[0.03] backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-2xl p-4 sm:p-5 shadow-[0_25px_50px_rgba(0,0,0,0.4)] scale-75 sm:scale-100 origin-bottom-right"
              >
                 <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                       <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                       </svg>
                     </div>
                     <div>
                       <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">Deployment</div>
                       <div className="text-[10px] text-emerald-500 font-mono mt-0.5 flex items-center gap-1">
                         <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                         LIVE
                       </div>
                     </div>
                   </div>
                 </div>
                 
                 <div className="space-y-3">
                   <div className="w-full bg-black/20 rounded-full h-1.5">
                     <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-1.5 rounded-full w-full relative">
                        <div className="absolute inset-0 bg-white/20 blur-[1px]" />
                     </div>
                   </div>
                   <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 px-1">
                     <span>v2.4.1</span>
                     <span className="text-cyan-400">0ms latency</span>
                   </div>
                 </div>
              </div>
              
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

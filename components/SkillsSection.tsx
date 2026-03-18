"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function SkillsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const visualSceneRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // DESKTOP: Full floating and parallax
    mm.add("(min-width: 1024px)", () => {
      // 1. Initial State
      gsap.set(visualSceneRef.current, { opacity: 0, scale: 0.95, y: 50 });
      gsap.set(iconsRef.current?.children ? gsap.utils.toArray(iconsRef.current.children) : [], { 
        opacity: 0, 
        y: 40,
        scale: 0.8
      });
      gsap.set(contentRef.current?.children ? gsap.utils.toArray(contentRef.current.children) : [], { 
        opacity: 0, 
        y: 30 
      });

      // 2. Timeline synchronized with Scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%", // Start early
          end: "center 40%", 
          toggleActions: "play none none reverse", // Play forward when entering, reverse when leaving
        }
      });

      // 3. Animation Sequence
      // Bring up the main visual container base
      tl.to(visualSceneRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out"
      })
      // Stagger the skill icons floating into the visual container
      .to(iconsRef.current?.children ? gsap.utils.toArray(iconsRef.current.children) : [], {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        stagger: 0.15, // Smooth ripple effect
        ease: "power2.out"
      }, "-=0.5")
      // Finally, smoothly reveal the actual text content categories below it
      .to(contentRef.current?.children ? gsap.utils.toArray(contentRef.current.children) : [], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
      }, "-=0.2");
      
      // Floating infinite subtle parallax effect for icons once they land
      const icons = iconsRef.current?.children ? gsap.utils.toArray(iconsRef.current.children) : [];
      icons.forEach((icon: any, i) => {
        gsap.to(icon, {
          y: i % 2 === 0 ? -4 : -8, // Gentle float heights
          duration: 3 + (i * 0.4), // Smoother timing
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: 1.8 // Start after initial reveal completes
        });
      });

      // Add gentle scroll parallax to the entire icon cluster
      gsap.to(iconsRef.current, {
        y: -35,
        ease: "none",
        scrollTrigger: {
          trigger: visualSceneRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      return () => { }
    });

    // TABLET & MOBILE: Clean staggered reveal without continuous floating, parallax, or scaling
    mm.add("(max-width: 1023px)", () => {
      // 1. Initial State - very light offsets to prevent layout shifting
      gsap.set(visualSceneRef.current, { opacity: 0, y: 15 });
      gsap.set(iconsRef.current?.children ? gsap.utils.toArray(iconsRef.current.children) : [], { opacity: 0, y: 10 });
      gsap.set(contentRef.current?.children ? gsap.utils.toArray(contentRef.current.children) : [], { opacity: 0, y: 15 });

      // 2. Main Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%", 
          toggleActions: "play none none reverse", 
        }
      });

      tl.to(visualSceneRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
        .to(iconsRef.current?.children ? gsap.utils.toArray(iconsRef.current.children) : [], { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }, "-=0.2")
        .to(contentRef.current?.children ? gsap.utils.toArray(contentRef.current.children) : [], { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }, "-=0.2");
        
      return () => {}
    });

  }, { scope: containerRef });

  return (
    <section id="skills" ref={containerRef} className="py-24 md:py-32 px-6 bg-slate-50 dark:bg-slate-950 overflow-hidden relative">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Header Section */}
        <div className="text-center mb-16 z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
            Technical Stack.
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A carefully curated set of languages, frameworks, and architectural concepts used to build robust, scalable applications.
          </p>
        </div>

        {/* Top Visual Scene: Abstract Icon Showcase */}
        <div 
          ref={visualSceneRef}
          className="relative w-full max-w-4xl h-64 sm:h-80 mb-20 rounded-3xl border border-slate-200 dark:border-white/5 bg-white/50 dark:bg-[#0a0a0d]/40 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)] flex items-center justify-center pointer-events-none"
        >
          {/* Subtle glowing background specifically for the skills */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent rounded-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 blur-[60px] rounded-full z-0" />

          {/* Abstract Floating Icons Setup */}
          <div ref={iconsRef} className="relative z-10 flex flex-wrap max-w-3xl justify-center items-center gap-3 sm:gap-4 md:gap-8 px-2 sm:px-4 w-full">
            
            {/* 1. Java */}
            <div className="w-14 h-14 sm:w-16 sm:h-20 bg-[#0c0c0f]/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_15px_30px_rgba(0,0,0,0.4)] flex items-center justify-center transform-gpu relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="font-mono font-bold text-orange-400/90 text-[10px] sm:text-sm md:text-base tracking-widest relative z-10">JAVA</div>
            </div>
            
            {/* 2. Python */}
            <div className="w-12 h-12 sm:w-14 sm:h-16 bg-[#0c0c0f]/90 backdrop-blur-xl rounded-xl border border-white/10 shadow-[0_15px_30px_rgba(0,0,0,0.4)] flex items-center justify-center transform-gpu relative group overflow-hidden mt-0 sm:mt-6">
              <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="font-mono font-bold text-blue-400/90 text-[10px] sm:text-xs md:text-sm tracking-widest relative z-10">PY</div>
            </div>

            {/* 3. SQL / Relational Databases */}
            <div className="w-14 h-14 sm:w-16 sm:h-20 bg-[#0c0c0f]/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center transform-gpu relative group overflow-hidden gap-1 sm:gap-1.5 focus:outline-none">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex flex-col gap-1 sm:gap-1.5 items-center justify-center relative z-10 w-full px-3 sm:px-4">
                <div className="w-full h-1.5 bg-emerald-500/70 rounded-full" />
                <div className="w-full h-1.5 bg-emerald-500/70 rounded-full" />
                <div className="w-full h-1.5 bg-emerald-500/70 rounded-full" />
              </div>
            </div>
            
            {/* 4. AI / Data Analysis */}
            <div className="w-12 h-12 sm:w-14 sm:h-16 bg-[#0c0c0f]/90 backdrop-blur-xl rounded-xl border border-white/10 shadow-[0_15px_30px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center transform-gpu relative group overflow-hidden mt-0 sm:mt-6">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-5 sm:w-6 md:w-8 h-5 sm:h-6 md:h-8 relative z-10 flex items-end justify-between px-0.5">
                <div className="w-1 sm:w-1.5 h-[40%] bg-purple-400/80 rounded-sm" />
                <div className="w-1 sm:w-1.5 h-[70%] bg-purple-400/80 rounded-sm" />
                <div className="w-1 sm:w-1.5 h-[100%] bg-purple-400/80 rounded-sm" />
              </div>
            </div>

            {/* 5. Web / Backend Development */}
            <div className="w-14 h-14 sm:w-16 sm:h-20 bg-[#0c0c0f]/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex items-center justify-center transform-gpu relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tl from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex items-center gap-1 sm:gap-1.5 font-mono font-bold text-cyan-400/80 text-[10px] sm:text-sm md:text-base relative z-10">
                <span>{`{`}</span>
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/80" />
                <span>{`}`}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Content Categories Grid */}
        <div ref={contentRef} className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 z-10">
          
          {/* Category 1 */}
          <div className="bg-white dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl p-8 hover:border-blue-500/50 transition-colors flex flex-col">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              Languages
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Java', 'SQL', 'JavaScript', 'Python', 'PHP', 'Dart', 'Shell'].map(skill => (
                <span key={skill} className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300">{skill}</span>
              ))}
            </div>
          </div>
          
          {/* Category 2 */}
          <div className="bg-white dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl p-8 hover:border-cyan-500/50 transition-colors flex flex-col">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              Backend Development
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Java Servlets', 'MVC Architecture', 'RESTful APIs', 'DAO Pattern', 'JUnit Testing', 'Session Management', 'Auth & Access Control'].map(skill => (
                <span key={skill} className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300">{skill}</span>
              ))}
            </div>
          </div>

          {/* Category 3 */}
          <div className="bg-white dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl p-8 hover:border-purple-500/50 transition-colors flex flex-col">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              Databases
            </h3>
            <div className="flex flex-wrap gap-2">
              {['MySQL', 'Oracle', 'SQL Server', 'Microsoft Access', 'MongoDB', 'Neo4j'].map(skill => (
                <span key={skill} className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300">{skill}</span>
              ))}
            </div>
          </div>

          {/* Category 4 */}
          <div className="bg-white dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl p-8 hover:border-emerald-500/50 transition-colors flex flex-col lg:col-span-1 md:col-span-2">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              Tools & Systems
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Git', 'Linux / UNIX', 'RHEL', 'Ubuntu'].map(skill => (
                <span key={skill} className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300">{skill}</span>
              ))}
            </div>
          </div>

          {/* Category 5 */}
          <div className="bg-white dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl p-8 hover:border-rose-500/50 transition-colors flex flex-col lg:col-span-2 md:col-span-2">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-rose-500" />
              Web Development
            </h3>
            <div className="flex flex-wrap gap-2">
              {['HTML', 'CSS', 'JavaScript', 'PHP'].map(skill => (
                <span key={skill} className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300">{skill}</span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

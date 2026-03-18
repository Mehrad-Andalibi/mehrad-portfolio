"use client";

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  
  // Portrait image refs for the transition
  const neutralImageRef = useRef<HTMLDivElement>(null);
  const winkImageRef = useRef<HTMLDivElement>(null);
  const portraitGlowRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // 1. Initial setups
      gsap.set(textContentRef.current?.children ? gsap.utils.toArray(textContentRef.current.children) : [], { 
        opacity: 0, 
        y: 30 
      });

      // Portrait explicit setup
      gsap.set(neutralImageRef.current, { opacity: 1 });
      gsap.set(winkImageRef.current, { opacity: 0 });
      gsap.set(portraitGlowRef.current, { opacity: 0, scale: 0.8 });

      // 2. Main Reveal Timeline (Text only)
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 60%", // Start revealing when the section is 60% down the viewport
        animation: gsap.timeline()
          .to(textContentRef.current?.children ? gsap.utils.toArray(textContentRef.current.children) : [], {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
          })
      });

      // 3. The Dual Portrait Transition & Subtle Glow (Scroll Scrubbed)
      // This trigger happens exactly as the user reads the text
      const portraitTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "center 60%", // When the center of the About section hits 60% viewport
          end: "center 30%",   // Ends a bit further down
          scrub: 1.5 // Smooth interaction
        }
      });

      portraitTl.to(winkImageRef.current, {
        opacity: 1,
        ease: "power1.inOut",
      })
      .to(neutralImageRef.current, {
        opacity: 0, // Crossfade: fade the neutral portrait out
        ease: "power1.inOut",
      }, "<") // Run exactly at the same time
      .to(portraitGlowRef.current, {
        opacity: 1,
        scale: 1,
        ease: "power2.out"
      }, "<"); // Run synchronously with the wink fade-in
      
      return () => { }
    });

    // Mobile specific fallback
    mm.add("(max-width: 767px)", () => {
      // 1. Initial State
      gsap.set(neutralImageRef.current, { opacity: 1 });
      gsap.set(winkImageRef.current, { opacity: 0 });
      gsap.set(portraitGlowRef.current, { opacity: 0, scale: 0.8 });

      // 2. Text Reveal
      gsap.fromTo(textContentRef.current?.children ? gsap.utils.toArray(textContentRef.current.children) : [], 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, scrollTrigger: { trigger: textContentRef.current, start: "top 80%" } }
      );

      // 3. Mobile Portrait Crossfade
      const mobilePortraitTl = gsap.timeline({
        scrollTrigger: {
          trigger: imageContainerRef.current,
          start: "center 70%", // Start when image is in lower-middle view
          end: "center 30%",   // End when higher up
          scrub: 1
        }
      });

      mobilePortraitTl.to(winkImageRef.current, { opacity: 1, ease: "power1.inOut" })
        .to(neutralImageRef.current, { opacity: 0, ease: "power1.inOut" }, "<")
        .to(portraitGlowRef.current, { opacity: 1, scale: 1, ease: "power2.out" }, "<");
    });

  }, { scope: containerRef });

  return (
    <section id="about" ref={containerRef} className="py-24 md:py-32 px-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/50 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-16 lg:gap-24">
          
          {/* Left Column: Portrait Container */}
          <div className="w-full max-w-sm md:w-5/12 perspective-1000 z-10 relative">
            
            {/* Soft background glow that reveals with the wink */}
            <div 
               ref={portraitGlowRef}
               className="absolute inset-0 bg-blue-500/20 blur-[60px] rounded-full z-0 transform-gpu pointer-events-none"
            />

            {/* Aspect wrapper for the portraits */}
            <div 
              ref={imageContainerRef}
              className="relative aspect-[3/4] w-full bg-slate-200 dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200/50 dark:border-white/5 shadow-2xl"
            >
               {/* 1. Neutral Portrait (Base) */}
               <div 
                  ref={neutralImageRef}
                  className="absolute inset-0 z-0"
               >
                  <Image 
                     src="/images/about/mehrad-neutral.png" 
                     alt="Mehrad Andalibi" 
                     fill 
                     className="object-cover"
                     priority
                     sizes="(max-width: 768px) 100vw, 384px"
                  />
               </div>

               {/* 2. Winking Portrait (Overlay, initially hidden) */}
               <div 
                  ref={winkImageRef}
                  className="absolute inset-0 z-10"
               >
                 <Image 
                     src="/images/about/mehrad-wink.png" 
                     alt="Mehrad Andalibi Winking" 
                     fill 
                     className="object-cover"
                     sizes="(max-width: 768px) 100vw, 384px"
                  />
               </div>
            </div>
          </div>

          {/* Right Column: Text Content */}
          <div className="w-full md:w-7/12 flex flex-col justify-center text-center md:text-left" ref={textContentRef}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 md:mb-8 text-slate-900 dark:text-white">
              About Me.
            </h2>
            
            <div className="text-lg text-slate-600 dark:text-slate-400 space-y-6 leading-relaxed font-normal">
              <p>
                I am a Computer Programming graduate with a strong focus on backend development and enterprise application design. I specialize in building scalable Java-based systems using Servlets, MVC architecture, and RESTful APIs.
              </p>
              <p>
                My experience includes developing multi-module applications with secure authentication, database-driven architecture, and clean design patterns such as DAO, Builder, and Observer.
              </p>
              <p>
                I enjoy solving real-world problems by designing efficient systems, optimizing database performance, and writing maintainable, production-ready code.
              </p>
              <p>
                Currently, I am seeking an entry-level Software Developer or Backend Developer role where I can contribute to scalable and high-quality software systems.
              </p>
            </div>
            
            {/* Premium stylistic detail line */}
            <div className="mt-12 w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
          </div>

        </div>
      </div>
    </section>
  );
}

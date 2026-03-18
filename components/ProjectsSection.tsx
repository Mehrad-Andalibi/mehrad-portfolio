"use client";

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    let mm = gsap.matchMedia();

    // DESKTOP: Full staggered reveal
    mm.add("(min-width: 1024px)", () => {
      // Select all project rows
      const projects = gsap.utils.toArray('.project-row');
      
      projects.forEach((project: any) => {
        const visual = project.querySelector('.project-visual');
        const contentElements = project.querySelectorAll('.project-content > *');

        // Initial State setup
        gsap.set(visual, { opacity: 0, scale: 0.95, y: 40 });
        gsap.set(contentElements, { opacity: 0, y: 20 });

        // ScrollTrigger Timeline for each project
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: project,
            start: "top 75%",
            toggleActions: "play none none reverse",
          }
        });

        // 1. Visual container reveals first
        tl.to(visual, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "power3.out"
        })
        // 2. Text content staggers in afterward
        .to(contentElements, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out"
        }, "-=0.5"); // Overlap slightly with the visual reveal
      });

      return () => { }
    });

    // TABLET: Cleaner staggered reveal without scale changes
    mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
      const projects = gsap.utils.toArray('.project-row');
      
      projects.forEach((project: any) => {
        const visual = project.querySelector('.project-visual');
        const contentElements = project.querySelectorAll('.project-content > *');

        gsap.set(visual, { opacity: 0, y: 20 });
        gsap.set(contentElements, { opacity: 0, y: 10 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: project,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        });

        tl.to(visual, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
          .to(contentElements, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }, "-=0.4");
      });

      return () => { }
    });

    // MOBILE: Lightweight singular element fade
    mm.add("(max-width: 767px)", () => {
      const projects = gsap.utils.toArray('.project-row');
      projects.forEach((project: any) => {
        gsap.fromTo(project, 
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: project,
              start: "top 85%"
            }
          }
        );
      });
    });

  }, { scope: containerRef });

  return (
    <section id="projects" ref={containerRef} className="py-24 md:py-32 px-6 bg-white dark:bg-[#0a0a0d] border-t border-slate-100 dark:border-white/5 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            Featured Projects.
          </h2>
          <div className="w-20 h-1 bg-blue-600 rounded-full" />
        </div>
        
        <div className="space-y-24 md:space-y-32">
          
          {/* Featured Project 1 (Image Right, Text Left) */}
          <div className="project-row flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12 lg:gap-20">
            {/* Content Side */}
            <div className="project-content w-full md:w-1/2 flex flex-col justify-center text-left">
              <div className="text-blue-600 dark:text-blue-400 font-mono text-sm font-semibold mb-4 tracking-wider">FEATURED PROJECT</div>
              <h3 className="text-3xl lg:text-4xl font-bold mb-6 text-slate-900 dark:text-white leading-tight">Public Transit Fleet Management System</h3>
              
              <div className="bg-slate-50 dark:bg-slate-900/50 p-5 sm:p-6 md:p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm mb-6 relative z-10 md:-mr-12">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs sm:text-sm mb-2 font-mono uppercase tracking-wide">Enterprise Java Web Application • 3-Tier Architecture</p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                  Enterprise-level Java web application built using Servlets, MVC architecture, and DAO pattern. Features modular Vehicle Management, GPS Tracking, secure authentication with RBAC, and JUnit validated business logic.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mb-8 text-sm font-mono text-slate-500 dark:text-slate-400">
                <span>Java Servlets</span>
                <span>•</span>
                <span>MVC Pattern</span>
                <span>•</span>
                <span>MySQL</span>
                <span>•</span>
                <span>JUnit</span>
              </div>
            </div>

            {/* Visual Side */}
            <div className="project-visual w-full md:w-1/2 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center">
               <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-slate-800 to-slate-900 mix-blend-overlay" />
               <div className="absolute inset-x-8 top-12 bottom-0 bg-slate-900 rounded-t-xl border-t border-x border-white/10 shadow-[0_-20px_40px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col">
                  {/* Mock Browser/App Header */}
                  <div className="h-8 bg-slate-800/80 border-b border-white/5 flex items-center px-4 gap-2">
                     <div className="w-2 h-2 rounded-full bg-slate-600" />
                     <div className="w-2 h-2 rounded-full bg-slate-600" />
                     <div className="w-2 h-2 rounded-full bg-slate-600" />
                     <span className="text-[10px] text-slate-500 ml-2 font-mono border border-slate-600/50 rounded px-2 w-full max-w-xs text-center flex items-center justify-center h-4">ptfms.enterprise.local</span>
                  </div>
                  {/* Mock App Content - Dashboard */}
                  <div className="flex-1 p-6 flex flex-col gap-4 opacity-70">
                     <div className="w-1/3 h-6 bg-slate-700 rounded-md" /> {/* Title */}
                     <div className="flex gap-4">
                        <div className="flex-1 h-20 bg-blue-500/20 rounded-lg border border-blue-500/30" />
                        <div className="flex-1 h-20 bg-emerald-500/20 rounded-lg border border-emerald-500/30" />
                     </div>
                     <div className="w-full h-32 bg-zinc-800/50 rounded-lg border border-white/5" /> {/* Map/Grid */}
                  </div>
               </div>
            </div>
          </div>

          {/* Featured Project 2 (Image Left, Text Right) */}
          <div className="project-row flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-20">
            {/* Visual Side */}
            <div className="project-visual w-full md:w-1/2 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center">
               <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 via-slate-800 to-slate-900 mix-blend-overlay" />
               <div className="absolute inset-y-12 left-8 right-8 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col">
                  {/* Mock Editor Header */}
                  <div className="h-8 border-b border-white/5 flex items-center px-4 gap-4 bg-black/20">
                     <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-slate-600"/><div className="w-2 h-2 rounded-full bg-slate-600"/></div>
                     <span className="text-[10px] font-mono text-slate-400">blog-posts.php</span>
                  </div>
                  {/* Mock Content */}
                  <div className="flex-1 p-5 flex flex-col gap-3 opacity-60 font-mono text-xs">
                     <div className="flex gap-4"><span className="text-slate-500">1</span><div className="w-24 h-2 bg-purple-400/80 rounded" /></div>
                     <div className="flex gap-4"><span className="text-slate-500">2</span><div className="w-48 h-2 bg-slate-500/80 rounded" /></div>
                     <div className="flex gap-4"><span className="text-slate-500">3</span><div className="w-32 h-2 bg-blue-400/80 rounded" /></div>
                     <div className="flex gap-4"><span className="text-slate-500">4</span><div className="w-16 h-2 bg-emerald-400/80 rounded" /></div>
                     <div className="flex gap-4"><span className="text-slate-500">5</span><div className="w-40 h-2 bg-cyan-400/80 rounded" /></div>
                  </div>
               </div>
            </div>

            {/* Content Side */}
            <div className="project-content w-full md:w-1/2 flex flex-col justify-center text-left md:items-end md:text-right">
              <div className="text-cyan-500 font-mono text-sm font-semibold mb-4 tracking-wider">PROJECT</div>
              <h3 className="text-3xl lg:text-4xl font-bold mb-6 text-slate-900 dark:text-white leading-tight">Algonquin College Blog</h3>
              
              <div className="bg-slate-50 dark:bg-slate-900/50 p-5 sm:p-6 md:p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm mb-6 relative z-10 md:-ml-12 text-left md:text-right">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base sm:text-lg">
                  Responsive full-stack web application built to manage dynamic college blog content. Includes a database-driven backend and a responsive front-end crafted for a clean user experience.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mb-8 text-sm font-mono text-slate-500 dark:text-slate-400 md:justify-end">
                <span>PHP</span>
                <span>•</span>
                <span>SQL</span>
                <span>•</span>
                <span>HTML/CSS</span>
                <span>•</span>
                <span>JavaScript</span>
              </div>
            </div>
          </div>

          {/* Featured Project 3 (Image Right, Text Left) */}
          <div className="project-row flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12 lg:gap-20">
            {/* Content Side */}
            <div className="project-content w-full md:w-1/2 flex flex-col justify-center text-left">
              <div className="text-purple-500 font-mono text-sm font-semibold mb-4 tracking-wider">PROJECT</div>
              <h3 className="text-3xl lg:text-4xl font-bold mb-6 text-slate-900 dark:text-white leading-tight">Logistics Company Core</h3>
              
              <div className="bg-slate-50 dark:bg-slate-900/50 p-5 sm:p-6 md:p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm mb-6 relative z-10 md:-mr-12">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base sm:text-lg">
                  A foundational Java-based application for shipping and inventory management. Implements strict object-oriented programming principles to handle practical business logic integrated directly with SQL databases.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mb-8 text-sm font-mono text-slate-500 dark:text-slate-400">
                <span>Java</span>
                <span>•</span>
                <span>SQL</span>
                <span>•</span>
                <span>OOP</span>
                <span>•</span>
                <span>Inventory Tracking</span>
              </div>
            </div>

            {/* Visual Side */}
            <div className="project-visual w-full md:w-1/2 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-800/50 flex flex-col p-6 lg:p-12 items-center justify-center">
               <div className="absolute inset-0 bg-gradient-to-b from-purple-600/10 to-indigo-900/40 mix-blend-overlay" />
               <div className="relative z-10 flex gap-6 mt-8">
                 <div className="w-16 h-16 rounded bg-slate-800 border border-purple-500/30 flex items-center justify-center animate-pulse"><div className="w-8 h-8 rounded-full border-4 border-purple-400/50" /></div>
                 <div className="w-16 h-16 rounded bg-slate-800 border border-blue-500/30 flex items-center justify-center"><div className="w-8 h-8 rounded-full border-4 border-blue-400/50" /></div>
                 <div className="w-16 h-16 rounded bg-slate-800 border border-emerald-500/30 flex items-center justify-center animate-pulse"><div className="w-8 h-8 rounded-full border-4 border-emerald-400/50" /></div>
               </div>
               <div className="relative z-10 w-full max-w-[200px] h-20 border-x-2 border-b-2 border-slate-700/50 rounded-b-xl mt-[-2rem] -z-10" />
            </div>
          </div>

          {/* Featured Project 4 (Image Left, Text Right) */}
          <div className="project-row flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-20">
            {/* Visual Side */}
            <div className="project-visual w-full md:w-1/2 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center p-6 sm:p-8">
               <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-slate-900 mix-blend-overlay" />
               <div className="w-full h-full bg-slate-900/60 backdrop-blur-lg rounded-xl flex flex-col border border-white/5 overflow-hidden">
                 <div className="h-6 bg-emerald-900/30 border-b border-emerald-500/20 font-mono text-[8px] flex items-center px-4 text-emerald-400">SQL Server Management Studio</div>
                 <div className="flex-1 p-4 flex flex-col gap-2">
                   <div className="h-4 w-3/4 bg-slate-800 rounded" />
                   <div className="h-4 w-1/2 bg-slate-800 rounded" />
                   <div className="flex gap-2 mt-4">
                     <div className="h-16 flex-1 bg-emerald-500/10 border border-emerald-500/20 rounded" />
                     <div className="h-16 flex-1 bg-blue-500/10 border border-blue-500/20 rounded" />
                     <div className="h-16 flex-1 bg-purple-500/10 border border-purple-500/20 rounded" />
                   </div>
                 </div>
               </div>
            </div>

            {/* Content Side */}
            <div className="project-content w-full md:w-1/2 flex flex-col justify-center text-left md:items-end md:text-right">
              <div className="text-emerald-500 font-mono text-sm font-semibold mb-4 tracking-wider">PROJECT</div>
              <h3 className="text-3xl lg:text-4xl font-bold mb-6 text-slate-900 dark:text-white leading-tight">Lavender Grill Database Base</h3>
              
              <div className="bg-slate-50 dark:bg-slate-900/50 p-5 sm:p-6 md:p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm mb-6 relative z-10 md:-ml-12 text-left md:text-right">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base sm:text-lg">
                  SQL Server database system architecture for a restaurant prioritizing structured relational schema design. Efficiently manages and queries complex menu and order relationships.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mb-8 text-sm font-mono text-slate-500 dark:text-slate-400 md:justify-end">
                <span>Microsoft SQL Server</span>
                <span>•</span>
                <span>RDMS</span>
                <span>•</span>
                <span>Schema Design</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

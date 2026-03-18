"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
        <Link 
           href="#hero" 
           className="text-lg md:text-xl font-bold tracking-tight text-slate-900 dark:text-white"
           onClick={() => setIsOpen(false)}
        >
           Mehrad Andalibi
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 font-medium">
          <Link href="#about" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</Link>
          <Link href="#skills" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Skills</Link>
          <Link href="#projects" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Projects</Link>
          <Link href="#contact" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-slate-600 dark:text-slate-300 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-6 py-4 shadow-xl">
          <nav className="flex flex-col gap-4 font-medium">
            <Link href="#about" onClick={() => setIsOpen(false)} className="block py-2 text-slate-600 dark:text-slate-300 hover:text-blue-600">About</Link>
            <Link href="#skills" onClick={() => setIsOpen(false)} className="block py-2 text-slate-600 dark:text-slate-300 hover:text-blue-600">Skills</Link>
            <Link href="#projects" onClick={() => setIsOpen(false)} className="block py-2 text-slate-600 dark:text-slate-300 hover:text-blue-600">Projects</Link>
            <Link href="#contact" onClick={() => setIsOpen(false)} className="block py-2 text-slate-600 dark:text-slate-300 hover:text-blue-600">Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
}

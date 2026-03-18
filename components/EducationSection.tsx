export default function EducationSection() {
  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-12 text-slate-900 dark:text-white">Education & Certifications</h2>
        
        <div className="space-y-12">
          {/* Main Education */}
          <div className="border-l-2 border-slate-200 dark:border-slate-800 pl-6 relative">
            <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-[7px] top-2"></div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Computer Programming Diploma</h3>
            <p className="text-blue-600 dark:text-blue-400 font-medium mb-1">Algonquin College, Ottawa, ON</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">May 2024 – December 2025</p>
            <p className="text-slate-900 dark:text-slate-300 font-medium text-sm mb-4">GPA: 3.95 / 4.0</p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Relevant Coursework:</span> Data Structures & Algorithms, Database Systems, Web Development, Object-Oriented Programming, Software Engineering.
            </p>
          </div>

          {/* Certifications Category */}
          <div className="pt-6">
            <h3 className="text-2xl font-bold tracking-tight mb-8 text-slate-900 dark:text-white">Certifications</h3>
            <div className="space-y-8">
              <div className="border-l-2 border-slate-200 dark:border-slate-800 pl-6 relative">
                <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-[7px] top-2"></div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">Advanced Google Analytics</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Google Digital Academy (2021)</p>
              </div>

              <div className="border-l-2 border-slate-200 dark:border-slate-800 pl-6 relative">
                <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-[7px] top-2"></div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">Digital Marketing</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Tehran Institute of Technology (2020)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

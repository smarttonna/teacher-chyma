import React from 'react';
import { 
  BookOpen, 
  Baby, 
  Radical, 
  Award, 
  Globe2, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function CurriculumSection() {
  const curriculums = [
    {
      title: "Primary 4 - 6 Mathematics",
      level: "Primary Level",
      icon: Baby,
      badgeColor: "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
      topics: [
        "Fractions & Decimals Mastery",
        "Factors, Multiples, LCM & HCF",
        "Basic Geometry & Perimeter",
        "Word Problems & Number Systems"
      ]
    },
    {
      title: "Junior Secondary (JSS 1 - 3)",
      level: "JSS Level",
      icon: BookOpen,
      badgeColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
      topics: [
        "Algebraic Expressions & Equations",
        "Percentages, Ratio & Proportion",
        "Plane Geometry & Angles",
        "Introductory Probability & Data"
      ]
    },
    {
      title: "Senior Secondary (SSS 1 - 3)",
      level: "SSS Level",
      icon: Radical,
      badgeColor: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300",
      topics: [
        "Quadratic & Simultaneous Equations",
        "Logarithms & Indices",
        "Trigonometry & Circle Theorems",
        "Calculus (Differentiation & Integration)"
      ]
    },
    {
      title: "WAEC, NECO & BECE Prep",
      level: "National Exams",
      icon: Award,
      badgeColor: "bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300",
      topics: [
        "Past Question Drills (2010 - 2026)",
        "Theory Step-by-Step Marking Scheme",
        "Objective Speed Techniques",
        "Mock Diagnostic Examinations"
      ]
    },
    {
      title: "IGCSE & SAT Math prep",
      level: "International Exam",
      icon: Globe2,
      badgeColor: "bg-sky-100 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300",
      topics: [
        "SAT Heart of Algebra & Problem Solving",
        "Passport to Advanced Math",
        "IGCSE Core & Extended Curriculum",
        "Desmos & Calculator Strategies"
      ]
    }
  ];

  return (
    <section id="specializations" className="py-20 relative border-t border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
            <Sparkles className="w-4 h-4" /> Curriculum & Standards
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[var(--text-main)]">
            Tailored Math Specializations
          </h2>
          <p className="text-[var(--text-muted)] text-base sm:text-lg">
            Structured modules designed to meet local Nigerian standards and global international exam requirements.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {curriculums.map((c, i) => {
            const Icon = c.icon;
            return (
              <div 
                key={i} 
                className="p-7 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${c.badgeColor}`}>
                      {c.level}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-[var(--text-main)] mb-4">
                    {c.title}
                  </h3>

                  <ul className="space-y-2.5 mb-6">
                    {c.topics.map((t, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-muted)]">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a 
                  href="#contact" 
                  className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 transition-colors"
                >
                  Enroll Student in {c.level}
                </a>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

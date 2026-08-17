import React from 'react';
import QuizPlayer from '../components/quiz/QuizPlayer';
import { GraduationCap } from 'lucide-react';

export default function QuizPage() {
  return (
    <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
          <GraduationCap className="w-4 h-4" /> Interactive Student Portal
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-[var(--text-main)]">
          Mathematics <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">Practice Quiz Hub</span>
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-muted)]">
          Test your math skills by Grade Level and Topic. Each trial features dynamically randomized questions and answer choices!
        </p>
      </div>

      <QuizPlayer />

    </main>
  );
}

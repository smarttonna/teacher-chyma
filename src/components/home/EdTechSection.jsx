import React from 'react';
import { 
  Bot, 
  Video, 
  Gamepad, 
  BarChart2, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';

export default function EdTechSection() {
  return (
    <section id="methodology" className="py-20 relative border-t border-[var(--border-color)] bg-[var(--bg-main)]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
              <Bot className="w-4 h-4" /> Next-Gen Learning
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[var(--text-main)] leading-tight">
              AI Worksheets & <br />
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                Gamified EdTech Pedagogy
              </span>
            </h2>

            <p className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed">
              We leverage modern digital whiteboards, gamified drills, and AI prompt engineering to craft hyper-personalized worksheets tailored to each student's specific weak spots.
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-[var(--text-main)]">Live HD Zoom & Virtual Whiteboards</h4>
                  <p className="text-xs text-[var(--text-muted)]">Crystal clear equation step breakdowns, recorded for student review.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center shrink-0">
                  <Gamepad className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-[var(--text-main)]">Kahoot & Quizizz Live Competitions</h4>
                  <p className="text-xs text-[var(--text-muted)]">Gamified mental math drills that make learning high-energy and engaging.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-950/50 text-pink-600 flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-[var(--text-main)]">AI-Powered Diagnostic Practice</h4>
                  <p className="text-xs text-[var(--text-muted)]">Instant target question generation based on past missed questions.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xl space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <span className="font-heading font-bold text-sm text-[var(--text-main)]">AI Worksheet Prompt Generator</span>
                </div>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">Active Module</span>
              </div>

              <div className="space-y-3 font-mono text-xs p-4 rounded-xl bg-slate-900 text-slate-200 border border-slate-800">
                <div className="text-emerald-400">// Teacher Chyma AI Prompt Engine</div>
                <div className="text-indigo-300">&gt; Generate 5 WAEC Quadratic Equation problems with step-by-step BODMAS hints for Grade 11 student...</div>
                <div className="text-amber-300">[SUCCESS]: 5 Diagnostic Questions Ready with KaTeX LaTeX formatting!</div>
              </div>

              <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-xs space-y-2">
                <div className="font-bold text-indigo-900 dark:text-indigo-300">Sample Generated Question:</div>
                <div className="font-mono text-slate-800 dark:text-slate-200">Evaluate: 2x² - 5x + 2 = 0</div>
                <div className="text-[var(--text-muted)] italic">Hint: Factorize into (2x - 1)(x - 2) = 0.</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

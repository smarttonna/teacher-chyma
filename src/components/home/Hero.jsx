import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe, 
  Laptop, 
  Bot, 
  Award, 
  Lightbulb, 
  Calendar, 
  Gamepad2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Badges Pill Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                <Globe className="w-3.5 h-3.5" /> Local & Global Students
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                <Laptop className="w-3.5 h-3.5" /> Online & Offline Classes
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
                <Bot className="w-3.5 h-3.5" /> AI-Enhanced Pedagogy
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-[var(--text-main)] tracking-tight leading-[1.15]">
              Making Maths <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                Simple, Engaging
              </span> & Fun!
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-[var(--text-muted)] leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Hi! I am <strong className="text-[var(--text-main)] font-semibold">Chidimma Mary</strong> (M.Sc. Mathematics Educator). I empower primary, secondary, and exam candidates to build lifelong numerical confidence using modern AI tools and interactive whiteboards.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a 
                href="#contact" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/40 hover:-translate-y-0.5 transition-all duration-200"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Trial Session</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>

              <Link 
                to="/quiz" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-bold text-[var(--text-main)] bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-indigo-400 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Gamepad2 className="w-5 h-5 text-indigo-600" />
                <span>Try Math Quiz</span>
              </Link>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[var(--border-color)] max-w-lg mx-auto lg:mx-0">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-heading text-indigo-600">100%</div>
                <div className="text-xs sm:text-sm text-[var(--text-muted)] font-medium">Pass Improvement</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-heading text-purple-600">5+ Yrs</div>
                <div className="text-xs sm:text-sm text-[var(--text-muted)] font-medium">Teaching Experience</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-heading text-emerald-600">WAEC / SAT</div>
                <div className="text-xs sm:text-sm text-[var(--text-muted)] font-medium">Exam Prep Mastery</div>
              </div>
            </div>

          </div>

          {/* Hero Right Media Graphic Column */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-none">
              
              {/* Outer Decorative Ring */}
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl transform scale-95" />

              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden border border-[var(--border-color)] shadow-2xl bg-[var(--bg-card-solid)]">
                <img 
                  src="/assets/hero_teacher_math.png" 
                  alt="Teacher Chidimma Mary - Professional Mathematics Educator" 
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating Glass Badge Top Left */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-[var(--bg-card)] backdrop-blur-md border border-[var(--border-color)] p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce-slow">
                <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/50 text-teal-600 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-xs sm:text-sm font-bold block text-[var(--text-main)]">M.Sc. Education</strong>
                  <span className="text-[11px] text-[var(--text-muted)]">Mathematics Specialist</span>
                </div>
              </div>

              {/* Floating Glass Badge Bottom Right */}
              <div className="absolute -bottom-4 -right-4 sm:-right-6 bg-[var(--bg-card)] backdrop-blur-md border border-[var(--border-color)] p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce-slow">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-600 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-xs sm:text-sm font-bold block text-[var(--text-main)]">Interactive EdTech</strong>
                  <span className="text-[11px] text-[var(--text-muted)]">Kahoot & AI Practice</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

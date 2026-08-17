import React, { useState } from 'react';
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  Heart, 
  CheckCircle2,
  Building2,
  Calendar
} from 'lucide-react';

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState('bio');

  return (
    <section id="about" className="py-20 relative border-t border-[var(--border-color)] bg-[var(--bg-main)]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
            <GraduationCap className="w-4 h-4" /> Educator Profile
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[var(--text-main)]">
            Meet Teacher Chyma
          </h2>
          <p className="text-[var(--text-muted)] text-base sm:text-lg">
            Explore my academic qualifications, core teaching philosophy, and certifications interactively below.
          </p>

          {/* Interactive Tab Selector Buttons */}
          <div className="flex justify-center p-1.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] max-w-md mx-auto shadow-sm">
            <button
              onClick={() => setActiveTab('bio')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'bio'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              <Heart className="w-4 h-4" /> Bio & Philosophy
            </button>

            <button
              onClick={() => setActiveTab('education')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'education'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              <GraduationCap className="w-4 h-4" /> Education
            </button>

            <button
              onClick={() => setActiveTab('certs')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'certs'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              <Award className="w-4 h-4" /> Certifications
            </button>
          </div>
        </div>

        {/* Tab Content 1: Bio & Philosophy */}
        {activeTab === 'bio' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-[var(--border-color)] shadow-xl bg-[var(--bg-card-solid)] p-4 text-center">
                <img 
                  src="/assets/math_edtech_3d.png" 
                  alt="Teacher Chyma EdTech Workspace" 
                  className="w-full h-auto rounded-2xl object-cover"
                />
                <div className="mt-4 pb-2">
                  <h3 className="font-heading font-bold text-xl text-[var(--text-main)]">Chidimma Mary</h3>
                  <p className="text-xs text-indigo-600 font-semibold">M.Sc. Educational Mathematics Specialist</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-2xl font-bold font-heading text-[var(--text-main)]">
                Simplifying Abstract Concepts into Joyful Problem-Solving
              </h3>
              <p className="text-[var(--text-muted)] leading-relaxed">
                With over half a decade of active classroom and digital instruction experience, I believe every student possesses intrinsic mathematical capability. My teaching methodology combines traditional step-by-step analytical reasoning with modern 3D visualizations, interactive Kahoot games, and customized AI worksheets.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-[var(--text-main)]">Personalized Pace</h4>
                    <p className="text-xs text-[var(--text-muted)]">Adapting worksheets to match student diagnostic needs.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-[var(--text-main)]">Interactive Whiteboards</h4>
                    <p className="text-xs text-[var(--text-muted)]">Live Zoom step-by-step equation solving.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-[var(--text-main)]">Exam Focus</h4>
                    <p className="text-xs text-[var(--text-muted)]">Proven strategies for WAEC, NECO, IGCSE & SAT Math.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-[var(--text-main)]">Growth Mindset</h4>
                    <p className="text-xs text-[var(--text-muted)]">Transforming math anxiety into confident mastery.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 2: Education Timeline */}
        {activeTab === 'education' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-md flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 flex items-center justify-center shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h4 className="font-bold text-lg text-[var(--text-main)]">Master of Science (M.Sc.) in Educational Mathematics</h4>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600">Graduated</span>
                </div>
                <div className="text-sm font-semibold text-[var(--text-muted)] flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-indigo-500" /> Nnamdi Azikiwe University (UNIZIK), Awka
                </div>
                <p className="text-xs text-[var(--text-muted)] pt-2">
                  Advanced research in curriculum development, pedagogical diagnostics, and technology integration in secondary school mathematics education.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-md flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h4 className="font-bold text-lg text-[var(--text-main)]">Bachelor of Science (B.Sc.) in Mathematics Education</h4>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600">Second Class Upper</span>
                </div>
                <div className="text-sm font-semibold text-[var(--text-muted)] flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-500" /> University of Nigeria, Nsukka (UNN)
                </div>
                <p className="text-xs text-[var(--text-muted)] pt-2">
                  Comprehensive grounding in pure and applied mathematics, statistics, algebra, calculus, geometry, and classroom instruction methods.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-md flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h4 className="font-bold text-lg text-[var(--text-main)]">Senior Mathematics Educator & STEM Facilitator</h4>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-600">5+ Years Experience</span>
                </div>
                <div className="text-sm font-semibold text-[var(--text-muted)] flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-purple-500" /> Oragram Technical College & Online Tutoring
                </div>
                <p className="text-xs text-[var(--text-muted)] pt-2">
                  Led hundreds of students to achieve A1 distinctions in WAEC/NECO and high percentile scores in IGCSE and SAT Mathematics.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 3: Certifications */}
        {activeTab === 'certs' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-md text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center mx-auto">
                <Award className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-base text-[var(--text-main)]">TRCN Certified Educator</h4>
              <p className="text-xs text-[var(--text-muted)]">
                Teachers Registration Council of Nigeria official license holder for professional practice.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-md text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 flex items-center justify-center mx-auto">
                <Award className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-base text-[var(--text-main)]">Google Certified Educator</h4>
              <p className="text-xs text-[var(--text-muted)]">
                Mastery in Google Classroom, Forms, Sheets & digital interactive whiteboards.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-md text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center mx-auto">
                <Award className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-base text-[var(--text-main)]">IGCSE & SAT Math Specialist</h4>
              <p className="text-xs text-[var(--text-muted)]">
                Certified in international curriculum test prep, problem solving, and calculator strategies.
              </p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

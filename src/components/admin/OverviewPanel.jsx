import React from 'react';
import { Users, TrendingUp, Database, UserCheck, Lightbulb, ArrowRight } from 'lucide-react';

export default function OverviewPanel({ submissions, quizzes, students, onNavigate }) {
  const totalAttempts = submissions.length;
  
  const avgScore = totalAttempts > 0 
    ? Math.round(submissions.reduce((acc, curr) => acc + (curr.percentage || 0), 0) / totalAttempts) 
    : 0;

  const totalQuestions = quizzes.length;
  const totalStudents = students.length;

  return (
    <div className="space-y-6">
      
      <div>
        <h3 className="font-heading font-extrabold text-2xl text-[var(--text-main)] mb-1">
          Performance Analytics & KPI Overview
        </h3>
        <p className="text-xs text-[var(--text-muted)]">
          Real-time summary of student quiz attempts, class average score, registered roster, and active question bank.
        </p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold font-heading text-[var(--text-main)]">{totalAttempts}</div>
            <div className="text-xs text-[var(--text-muted)]">Student Quiz Attempts</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold font-heading text-emerald-600">{avgScore}%</div>
            <div className="text-xs text-[var(--text-muted)]">Average Class Score</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center shrink-0">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold font-heading text-purple-600">{totalQuestions}</div>
            <div className="text-xs text-[var(--text-muted)]">MCQs Published</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center shrink-0">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold font-heading text-amber-600">{totalStudents}</div>
            <div className="text-xs text-[var(--text-muted)]">Registered Students</div>
          </div>
        </div>

      </div>

      {/* Class Health Summary */}
      <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <h4 className="font-heading font-bold text-base text-[var(--text-main)]">Quick Insights & Class Health</h4>
        </div>

        <p className="text-xs text-[var(--text-muted)] leading-relaxed">
          Your LMS currently has <strong className="text-[var(--text-main)]">{totalQuestions} active questions</strong> spanning 20 Mathematics topics. Review student trial diagnostic breakdowns in the <strong>Student Trial Results</strong> tab to identify topics requiring revision.
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate('submissions')}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm flex items-center gap-1.5"
          >
            View Student Trial Results <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onNavigate('bank')}
            className="px-4 py-2 rounded-xl text-xs font-bold text-[var(--text-main)] bg-[var(--bg-main)] border border-[var(--border-color)] hover:border-indigo-400"
          >
            Explore Question Directory
          </button>
        </div>
      </div>

    </div>
  );
}

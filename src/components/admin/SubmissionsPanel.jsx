import React, { useState } from 'react';
import { Search, RefreshCw, Eye, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { QuizService } from '../../services/quizService';

export default function SubmissionsPanel({ submissions, onRefresh }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const filtered = submissions.filter(sub => {
    const matchesSearch = (sub.studentName || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === 'all' || sub.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this student submission record?')) return;
    try {
      await QuizService.deleteSubmission(id);
      toast.success('Submission deleted.');
      onRefresh();
    } catch (err) {
      toast.error('Failed to delete submission.');
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-heading font-extrabold text-2xl text-[var(--text-main)] mb-1">
            Student Trial Results
          </h3>
          <p className="text-xs text-[var(--text-muted)]">
            Detailed breakdown of passed and failed student answers across practice trials.
          </p>
        </div>

        <button
          onClick={onRefresh}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800"
        >
          <RefreshCw className="w-4 h-4" /> Refresh Data
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)]">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-3 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search student name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)] focus:outline-none focus:border-indigo-600"
          />
        </div>

        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          className="px-3 py-2 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)]"
        >
          <option value="all">All Grade Levels</option>
          <option value="primary">Primary 4 - 6</option>
          <option value="jss">Junior Secondary</option>
          <option value="sss">Senior Secondary</option>
          <option value="waec">WAEC / NECO</option>
          <option value="sat_igcse">IGCSE / SAT</option>
        </select>
      </div>

      {/* Submissions Table */}
      <div className="rounded-2xl border border-[var(--border-color)] overflow-hidden bg-[var(--bg-card-solid)] shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[var(--text-main)]">
            <thead className="bg-[var(--bg-main)] text-[var(--text-muted)] font-bold uppercase text-[10px] border-b border-[var(--border-color)]">
              <tr>
                <th className="p-4">Student Name</th>
                <th className="p-4">Grade Level</th>
                <th className="p-4">Score Ratio</th>
                <th className="p-4">Percentage</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[var(--text-muted)]">
                    No student submission records found.
                  </td>
                </tr>
              ) : (
                filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-indigo-50/30 dark:hover:bg-indigo-950/20 transition-colors">
                    <td className="p-4 font-bold">{s.studentName || 'Anonymous'}</td>
                    <td className="p-4 uppercase font-mono text-[10px]">{s.level}</td>
                    <td className="p-4 font-mono font-bold">{s.score} / {s.totalQuestions}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${s.percentage >= 70 ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {s.percentage}%
                        </span>
                        <div className="w-16 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                          <div 
                            className={`h-full ${s.percentage >= 70 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                            style={{ width: `${s.percentage}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-[var(--text-muted)]">
                      {new Date(s.submittedAt || Date.now()).toLocaleString()}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedSubmission(s)}
                        className="p-1.5 rounded-lg text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100"
                        title="View Detailed Diagnostics"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDelete(s.id)}
                        className="p-1.5 rounded-lg text-red-600 bg-red-50 dark:bg-red-950/50 hover:bg-red-100"
                        title="Delete Submission"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Diagnostics Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[var(--bg-card-solid)] border border-[var(--border-color)] p-6 sm:p-8 rounded-3xl max-w-2xl w-full shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
              <h3 className="font-heading font-bold text-xl text-[var(--text-main)]">
                Student Quiz Attempt Diagnostics
              </h3>
              <button onClick={() => setSelectedSubmission(null)} className="text-xl font-bold text-[var(--text-muted)]">&times;</button>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-lg text-[var(--text-main)]">{selectedSubmission.studentName}</h4>
                <div className="text-xs text-[var(--text-muted)]">Grade Level: {selectedSubmission.level.toUpperCase()}</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-extrabold font-heading text-indigo-600">
                  {selectedSubmission.score} / {selectedSubmission.totalQuestions} ({selectedSubmission.percentage}%)
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-sm text-[var(--text-main)]">Question Breakdown & Solutions</h4>
              {(selectedSubmission.detailedAnswers || []).map((ans, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 rounded-2xl border text-xs space-y-2 ${
                    ans.isCorrect 
                      ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40' 
                      : 'bg-red-50/40 dark:bg-red-950/20 border-red-200 dark:border-red-900/40'
                  }`}
                >
                  <div className="flex items-start gap-2 font-bold text-[var(--text-main)]">
                    {ans.isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> : <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />}
                    <span>Q{idx + 1}: {ans.questionText}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                    <div>
                      <span className="text-[var(--text-muted)]">Selected: </span>
                      <strong className={ans.isCorrect ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300'}>
                        {ans.selectedOption}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[var(--text-muted)]">Correct Option: </span>
                      <strong className="text-emerald-700 dark:text-emerald-300">{ans.correctOption}</strong>
                    </div>
                  </div>

                  {ans.explanation && (
                    <div className="text-[10px] text-[var(--text-muted)] italic pt-1 border-t border-[var(--border-color)]">
                      Solution Hint: {ans.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

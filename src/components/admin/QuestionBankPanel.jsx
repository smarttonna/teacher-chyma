import React, { useState } from 'react';
import { 
  Search, 
  Trash2, 
  Edit3, 
  Database, 
  RefreshCw, 
  CheckSquare, 
  Square,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { QuizService } from '../../services/quizService';

export default function QuestionBankPanel({ quizzes, onRefresh }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [topicFilter, setTopicFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');

  const [selectedIds, setSelectedIds] = useState([]);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [loadingAction, setLoadingAction] = useState(false);

  const filteredQuizzes = quizzes.filter(q => {
    const matchesSearch = (q.question || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTopic = topicFilter === 'all' || q.topic === topicFilter;
    const matchesLevel = levelFilter === 'all' || q.level === levelFilter;
    return matchesSearch && matchesTopic && matchesLevel;
  });

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredQuizzes.map(q => q.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Delete ${selectedIds.length} selected question(s)?`)) return;

    setLoadingAction(true);
    try {
      await QuizService.deleteMultipleQuizzes(selectedIds);
      toast.success(`Deleted ${selectedIds.length} question(s).`);
      setSelectedIds([]);
      onRefresh();
    } catch (err) {
      toast.error('Failed to delete selected questions.');
    } finally {
      setLoadingAction(false);
    }
  };

  const handleSeed404 = async () => {
    if (!window.confirm('Wipe current question database and seed all 404 parsed DOCX questions?')) return;
    setLoadingAction(true);
    try {
      await QuizService.seed200Quizzes();
      toast.success('Successfully seeded 404 DOCX Mathematics Questions!');
      onRefresh();
    } catch (err) {
      toast.error('Failed to seed questions.');
    } finally {
      setLoadingAction(false);
    }
  };

  const handleWipeAll = async () => {
    if (!window.confirm('CAUTION: Wipe ALL questions from database? This action cannot be undone!')) return;
    setLoadingAction(true);
    try {
      await QuizService.deleteAllQuizzes();
      toast.success('Question database wiped clean.');
      onRefresh();
    } catch (err) {
      toast.error('Failed to wipe questions.');
    } finally {
      setLoadingAction(false);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!editingQuiz) return;

    setLoadingAction(true);
    try {
      await QuizService.updateQuiz(editingQuiz.id, {
        level: editingQuiz.level,
        topic: editingQuiz.topic,
        question: editingQuiz.question,
        options: editingQuiz.options,
        correctIndex: editingQuiz.correctIndex,
        explanation: editingQuiz.explanation
      });
      toast.success('Question updated!');
      setEditingQuiz(null);
      onRefresh();
    } catch (err) {
      toast.error('Failed to update question.');
    } finally {
      setLoadingAction(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-heading font-extrabold text-2xl text-[var(--text-main)] mb-1 flex items-center gap-2">
            <Database className="w-6 h-6 text-indigo-600" /> Question Directory ({filteredQuizzes.length})
          </h3>
          <p className="text-xs text-[var(--text-muted)]">
            Manage published questions, batch delete selected MCQs, or seed 404 DOCX exam questions.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleSeed404}
            disabled={loadingAction}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 shadow-md"
          >
            <Sparkles className="w-4 h-4" /> Seed 404 DOCX Questions
          </button>

          <button
            onClick={handleWipeAll}
            disabled={loadingAction}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-red-600 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/40 hover:bg-red-100"
          >
            <AlertTriangle className="w-4 h-4" /> Wipe All
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)]">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-3 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)] focus:outline-none focus:border-indigo-600"
          />
        </div>

        <select
          value={topicFilter}
          onChange={(e) => setTopicFilter(e.target.value)}
          className="px-3 py-2 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)]"
        >
          <option value="all">🌐 All Topics</option>
          <option value="Fractions">🍕 Fractions (204 Qs)</option>
          <option value="Factors, Multiples, LCM & HCF">🔢 Factors, Multiples, LCM & HCF (200 Qs)</option>
          <option value="Algebra">🧮 Algebra & Equations</option>
          <option value="Geometry">📐 Geometry & Shapes</option>
          <option value="Trigonometry">📐 Trigonometry & Angles</option>
          <option value="Statistics">📊 Statistics & Probability</option>
        </select>
      </div>

      {/* Batch Select Controls */}
      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40">
        <label className="flex items-center gap-2 text-xs font-bold text-[var(--text-main)] cursor-pointer">
          <input
            type="checkbox"
            checked={selectedIds.length === filteredQuizzes.length && filteredQuizzes.length > 0}
            onChange={handleSelectAll}
            className="accent-indigo-600 w-4 h-4 cursor-pointer"
          />
          <span>Select All ({filteredQuizzes.length})</span>
        </label>

        <button
          onClick={handleDeleteSelected}
          disabled={selectedIds.length === 0 || loadingAction}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 disabled:opacity-40 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" /> Delete Selected ({selectedIds.length})
        </button>
      </div>

      {/* Level Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {['all', 'primary', 'jss', 'sss', 'waec', 'sat_igcse'].map(lvl => (
          <button
            key={lvl}
            onClick={() => setLevelFilter(lvl)}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all border whitespace-nowrap ${
              levelFilter === lvl
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                : 'bg-[var(--bg-card)] text-[var(--text-muted)] border-[var(--border-color)] hover:border-indigo-400'
            }`}
          >
            {lvl === 'all' ? 'All Levels' : lvl}
          </button>
        ))}
      </div>

      {/* Question Directory List */}
      <div className="space-y-3">
        {filteredQuizzes.length === 0 ? (
          <div className="p-8 text-center text-xs text-[var(--text-muted)] bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)]">
            No questions found.
          </div>
        ) : (
          filteredQuizzes.map((q, idx) => {
            const isSelected = selectedIds.includes(q.id);
            return (
              <div 
                key={q.id || idx}
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  isSelected 
                    ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-400' 
                    : 'bg-[var(--bg-card)] border-[var(--border-color)] hover:border-indigo-300'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggleSelect(q.id)}
                      className="accent-indigo-600 w-4 h-4 cursor-pointer mt-1"
                    />
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300">
                          {q.level}
                        </span>
                        {q.topic && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">
                            {q.topic}
                          </span>
                        )}
                      </div>

                      <h4 className="font-heading font-bold text-sm text-[var(--text-main)]">
                        {q.question}
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                        {(q.options || []).map((opt, optIdx) => (
                          <div 
                            key={optIdx} 
                            className={`p-2 rounded-lg border text-[11px] ${
                              q.correctIndex === optIdx 
                                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 font-bold text-emerald-700 dark:text-emerald-300' 
                                : 'bg-[var(--bg-main)] border-[var(--border-color)] text-[var(--text-muted)]'
                            }`}
                          >
                            {String.fromCharCode(65 + optIdx)}: {opt}
                          </div>
                        ))}
                      </div>

                      {q.explanation && (
                        <div className="text-[10px] text-[var(--text-muted)] italic pt-1">
                          Hint: {q.explanation}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setEditingQuiz(q)}
                      className="p-2 rounded-xl text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100"
                      title="Edit Question"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={async () => {
                        if (!window.confirm('Delete this question?')) return;
                        await QuizService.deleteQuiz(q.id);
                        toast.success('Question deleted.');
                        onRefresh();
                      }}
                      className="p-2 rounded-xl text-red-600 bg-red-50 dark:bg-red-950/50 hover:bg-red-100"
                      title="Delete Question"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Edit Question Dialog */}
      {editingQuiz && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[var(--bg-card-solid)] border border-[var(--border-color)] p-6 sm:p-8 rounded-3xl max-w-xl w-full shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
              <h3 className="font-heading font-bold text-xl text-[var(--text-main)]">Edit Question</h3>
              <button onClick={() => setEditingQuiz(null)} className="text-xl font-bold text-[var(--text-muted)]">&times;</button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[var(--text-main)]">Target Level *</label>
                  <select
                    value={editingQuiz.level}
                    onChange={(e) => setEditingQuiz({ ...editingQuiz, level: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)]"
                  >
                    <option value="primary">Primary 4 - 6</option>
                    <option value="jss">Junior Sec (JSS)</option>
                    <option value="sss">Senior Sec (SSS)</option>
                    <option value="waec">WAEC / NECO</option>
                    <option value="sat_igcse">IGCSE / SAT</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[var(--text-main)]">Topic *</label>
                  <input
                    type="text"
                    required
                    value={editingQuiz.topic || ''}
                    onChange={(e) => setEditingQuiz({ ...editingQuiz, topic: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[var(--text-main)]">Question Text *</label>
                <input
                  type="text"
                  required
                  value={editingQuiz.question}
                  onChange={(e) => setEditingQuiz({ ...editingQuiz, question: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[var(--text-main)] block">Options *</label>
                {(editingQuiz.options || []).map((opt, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)]">
                    <input
                      type="radio"
                      name="editCorrectRadio"
                      checked={editingQuiz.correctIndex === i}
                      onChange={() => setEditingQuiz({ ...editingQuiz, correctIndex: i })}
                      className="accent-indigo-600 w-4 h-4 cursor-pointer"
                    />
                    <span className="text-xs font-bold text-[var(--text-muted)] w-16">Option {String.fromCharCode(65 + i)}:</span>
                    <input
                      type="text"
                      required
                      value={opt}
                      onChange={(e) => {
                        const newOpts = [...editingQuiz.options];
                        newOpts[i] = e.target.value;
                        setEditingQuiz({ ...editingQuiz, options: newOpts });
                      }}
                      className="flex-1 px-2 py-1 bg-transparent text-xs text-[var(--text-main)] focus:outline-none"
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[var(--text-main)]">Explanation</label>
                <input
                  type="text"
                  value={editingQuiz.explanation || ''}
                  onChange={(e) => setEditingQuiz({ ...editingQuiz, explanation: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md"
              >
                Save & Update Question
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

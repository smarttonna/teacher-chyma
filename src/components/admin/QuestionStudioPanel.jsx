import React, { useState } from 'react';
import { PlusCircle, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import { QuizService } from '../../services/quizService';

export default function QuestionStudioPanel({ onRefresh }) {
  const [level, setLevel] = useState('sss');
  const [topic, setTopic] = useState('Algebra');
  const [question, setQuestion] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctIndex, setCorrectIndex] = useState(0);
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim() || !optA.trim() || !optB.trim() || !optC.trim() || !optD.trim()) {
      toast.error('Please complete question text and all 4 options.');
      return;
    }

    setLoading(true);
    try {
      await QuizService.createQuiz({
        level,
        topic,
        question,
        options: [optA, optB, optC, optD],
        correctIndex,
        explanation
      });
      toast.success('Question published to Question Directory!');
      setQuestion('');
      setOptA('');
      setOptB('');
      setOptC('');
      setOptD('');
      setExplanation('');
      onRefresh();
    } catch (err) {
      toast.error('Failed to save question.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Left MCQ Form */}
      <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-xl space-y-6">
        <div className="flex items-center gap-2">
          <PlusCircle className="w-5 h-5 text-indigo-600" />
          <h3 className="font-heading font-bold text-xl text-[var(--text-main)]">
            Publish New Question
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[var(--text-main)]">Target Student Level *</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)]"
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
                placeholder="e.g. Algebra or Fractions"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)] focus:outline-none focus:border-indigo-600"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[var(--text-main)]">Question Text *</label>
            <input
              type="text"
              required
              placeholder="e.g. Solve for x: 4x - 7 = 17"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)] focus:outline-none focus:border-indigo-600"
            />
          </div>

          {/* Options with Correct Answer Radio */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-bold text-[var(--text-main)] block">
              Options (Select radio button for Correct Answer) *
            </label>

            {[
              { val: 0, label: 'Option A', value: optA, setter: setOptA },
              { val: 1, label: 'Option B', value: optB, setter: setOptB },
              { val: 2, label: 'Option C', value: optC, setter: setOptC },
              { val: 3, label: 'Option D', value: optD, setter: setOptD }
            ].map((opt) => (
              <div key={opt.val} className="flex items-center gap-3 p-2 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)]">
                <input
                  type="radio"
                  name="correctOption"
                  checked={correctIndex === opt.val}
                  onChange={() => setCorrectIndex(opt.val)}
                  className="accent-indigo-600 w-4 h-4 cursor-pointer"
                />
                <span className="text-xs font-bold text-[var(--text-muted)] w-16">{opt.label}:</span>
                <input
                  type="text"
                  required
                  placeholder={`${opt.label} text`}
                  value={opt.value}
                  onChange={(e) => opt.setter(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-transparent text-xs text-[var(--text-main)] focus:outline-none"
                />
              </div>
            ))}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[var(--text-main)]">Solution Explanation (Optional)</label>
            <input
              type="text"
              placeholder="Step-by-step solution hint..."
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)] focus:outline-none focus:border-indigo-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-600/30 transition-all"
          >
            {loading ? 'Publishing...' : 'Save Question to Directory'}
          </button>
        </form>
      </div>

      {/* Right Live Student Preview Card */}
      <div className="lg:col-span-5 p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs">
            <Eye className="w-4 h-4" /> Live Student Preview
          </div>
          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">
            {level.toUpperCase()}
          </span>
        </div>

        <h4 className="font-heading font-bold text-lg text-[var(--text-main)] leading-relaxed min-h-[50px]">
          {question || 'Your question text will appear here as you type...'}
        </h4>

        <div className="space-y-2">
          {[
            { label: 'A', text: optA },
            { label: 'B', text: optB },
            { label: 'C', text: optC },
            { label: 'D', text: optD }
          ].map((opt, i) => (
            <div 
              key={i}
              className={`p-3 rounded-xl text-xs flex items-center justify-between border ${
                correctIndex === i 
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 font-bold text-emerald-700 dark:text-emerald-300' 
                  : 'bg-[var(--bg-main)] border-[var(--border-color)] text-[var(--text-muted)]'
              }`}
            >
              <span>{opt.label}: {opt.text || `Option ${opt.label} text`}</span>
              {correctIndex === i && <span className="text-[10px] uppercase font-bold text-emerald-600">(Correct Answer)</span>}
            </div>
          ))}
        </div>

        {explanation && (
          <div className="p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-[11px] text-[var(--text-muted)] italic">
            <strong className="text-indigo-600">Solution: </strong> {explanation}
          </div>
        )}
      </div>

    </div>
  );
}

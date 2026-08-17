import React, { useState, useEffect, useMemo } from 'react';
import { 
  GraduationCap, 
  SlidersHorizontal, 
  User, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Calendar, 
  Award,
  Sparkles,
  Clock,
  ChevronRight,
  BookOpen,
  CheckCircle2
} from 'lucide-react';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { QuizService } from '../../services/quizService';

const LEVEL_TOPICS_MAP = {
  primary: [
    "Fractions",
    "Factors, Multiples, LCM & HCF",
    "Basic Arithmetic & Word Problems",
    "Geometry & Perimeter"
  ],
  jss: [
    "Fractions",
    "Factors, Multiples, LCM & HCF",
    "Algebraic Expressions",
    "Plane Geometry & Angles",
    "Percentages, Ratio & Proportion"
  ],
  sss: [
    "Fractions",
    "Factors, Multiples, LCM & HCF",
    "Quadratic & Simultaneous Equations",
    "Logarithms & Indices",
    "Trigonometry & Circle Theorems",
    "Calculus"
  ],
  waec: [
    "Past Question Objectives & Theory",
    "Algebra & Equations",
    "Trigonometry & Geometry",
    "Statistics & Probability"
  ],
  sat_igcse: [
    "Heart of Algebra",
    "Passport to Advanced Math",
    "Problem Solving & Data Analysis",
    "IGCSE Extended Mathematics"
  ]
};

export default function QuizPlayer() {
  const [studentName, setStudentName] = useState(() => localStorage.getItem('chyma_student_name') || 'Guest Student');
  const [showNameModal, setShowNameModal] = useState(() => !localStorage.getItem('chyma_student_name'));
  const [showLevelModal, setShowLevelModal] = useState(false);

  const [selectedLevel, setSelectedLevel] = useState('sss');
  const [selectedTopic, setSelectedTopic] = useState('all');

  const [quizzes, setQuizzes] = useState([]);
  const [loadingQuizzes, setLoadingQuizzes] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);

  // Available topics for currently selected level
  const availableTopics = useMemo(() => {
    return LEVEL_TOPICS_MAP[selectedLevel] || ["Fractions", "Factors, Multiples, LCM & HCF"];
  }, [selectedLevel]);

  // Fetch questions from Firestore / local storage
  const fetchQuestions = async (lvl, tpc) => {
    setLoadingQuizzes(true);
    try {
      let data = await QuizService.getQuizzes(lvl, tpc);
      if (!data || data.length === 0) {
        // Sample fallback questions if collection is empty
        data = [
          {
            id: `sample_1_${lvl}`,
            level: lvl,
            topic: tpc !== 'all' ? tpc : 'Mathematics',
            question: `[${lvl.toUpperCase()} Practice] Evaluate: 3x - 7 = 14`,
            options: ['x = 5', 'x = 7', 'x = 6', 'x = 8'],
            correctIndex: 1,
            explanation: '3x = 21 -> x = 7.'
          },
          {
            id: `sample_2_${lvl}`,
            level: lvl,
            topic: tpc !== 'all' ? tpc : 'Mathematics',
            question: `[${lvl.toUpperCase()} Practice] Evaluate 3/5 + 1/4`,
            options: ['17/20', '4/9', '7/20', '3/20'],
            correctIndex: 0,
            explanation: 'LCM of 5 and 4 is 20. (12 + 5)/20 = 17/20.'
          }
        ];
      }

      // Shuffle order
      const shuffled = [...data].sort(() => 0.5 - Math.random());
      setQuizzes(shuffled);
      setCurrentIndex(0);
      setSelectedAnswers({});
      setIsCompleted(false);
      setScore(0);
      setTimerSeconds(0);
    } catch (err) {
      toast.error('Failed to load practice questions.');
    } finally {
      setLoadingQuizzes(false);
    }
  };

  useEffect(() => {
    fetchQuestions(selectedLevel, selectedTopic);
  }, []);

  // Handle grade level selection in modal -> automatically update available topics
  const handleLevelChange = (lvlId) => {
    setSelectedLevel(lvlId);
    setSelectedTopic('all'); // default to all topics for selected grade
  };

  // Quiz timer
  useEffect(() => {
    if (isCompleted || loadingQuizzes || quizzes.length === 0) return;
    const interval = setInterval(() => {
      setTimerSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isCompleted, loadingQuizzes, quizzes]);

  const handleSelectOption = (optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIndex]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentIndex < quizzes.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const finishQuiz = async () => {
    let finalScore = 0;
    const detailedAnswers = [];

    quizzes.forEach((q, idx) => {
      const selected = selectedAnswers[idx];
      const isCorrect = selected === q.correctIndex;
      if (isCorrect) finalScore += 1;

      detailedAnswers.push({
        questionText: q.question,
        selectedOption: selected !== undefined ? q.options[selected] : 'Not Answered',
        correctOption: q.options[q.correctIndex],
        isCorrect,
        explanation: q.explanation || ''
      });
    });

    setScore(finalScore);
    setIsCompleted(true);

    const percentage = Math.round((finalScore / quizzes.length) * 100);
    if (percentage >= 70) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }

    try {
      await QuizService.saveSubmission({
        studentName,
        level: selectedLevel,
        score: finalScore,
        totalQuestions: quizzes.length,
        detailedAnswers
      });
      toast.success('Quiz results saved successfully!');
    } catch (err) {
      console.warn("Save submission notice:", err);
    }
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const currentQ = quizzes[currentIndex];
  const progressPct = quizzes.length > 0 ? ((currentIndex + 1) / quizzes.length) * 100 : 0;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Student Profile & Level Header Card */}
      <div className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-lg space-y-4">
        
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-color)] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-extrabold flex items-center justify-center text-lg shadow-md">
              {studentName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-[10px] font-extrabold uppercase text-[var(--text-muted)] tracking-wider">
                Student Profile
              </div>
              <div className="font-heading font-bold text-lg text-[var(--text-main)]">
                {studentName}
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowNameModal(true)}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-indigo-600 border border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-950/30 hover:bg-indigo-100 transition-colors"
          >
            Change Name
          </button>
        </div>

        {/* Level & Active Topic Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[var(--text-muted)]">Grade Level:</span>
              <strong className="text-indigo-600 font-bold uppercase">{selectedLevel}</strong>
            </div>

            <span className="text-[var(--border-color)]">|</span>

            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[var(--text-muted)]">Topic Filter:</span>
              <strong className="text-emerald-600 font-bold">
                {selectedTopic === 'all' ? '🌐 All Related Topics' : selectedTopic}
              </strong>
            </div>
          </div>

          <button
            onClick={() => setShowLevelModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-indigo-600 bg-white dark:bg-slate-900 shadow-sm border border-indigo-200 dark:border-indigo-800 hover:scale-105 transition-all"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" /> Select Grade & Related Topic
          </button>
        </div>

      </div>

      {/* Main Quiz View */}
      {!isCompleted ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-xl space-y-6">
          
          {loadingQuizzes ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-[var(--text-muted)]">Loading randomized practice trial...</p>
            </div>
          ) : quizzes.length === 0 ? (
            <div className="py-12 text-center space-y-4">
              <BookOpen className="w-12 h-12 text-[var(--text-muted)] mx-auto" />
              <p className="text-sm text-[var(--text-muted)]">No questions found for the selected filter.</p>
              <button
                onClick={() => fetchQuestions('all', 'all')}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              {/* Question Header & Timer */}
              <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
                <div className="space-y-1">
                  <div className="text-xs font-extrabold uppercase text-indigo-600">
                    Question {currentIndex + 1} of {quizzes.length}
                  </div>
                  <div className="w-36 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-mono font-bold text-[var(--text-main)]">
                  <Clock className="w-4 h-4 text-indigo-600" /> {formatTime(timerSeconds)}
                </div>
              </div>

              {/* Question Text */}
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[var(--text-main)] leading-relaxed">
                {currentQ.question}
              </h3>

              {/* Options Grid */}
              <div className="space-y-3">
                {currentQ.options.map((opt, i) => {
                  const isSelected = selectedAnswers[currentIndex] === i;
                  return (
                    <button
                      key={i}
                      onClick={() => handleSelectOption(i)}
                      className={`w-full p-4.5 rounded-2xl text-left text-sm font-medium transition-all border flex items-center justify-between ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md font-bold'
                          : 'bg-[var(--bg-main)] text-[var(--text-main)] border-[var(--border-color)] hover:border-indigo-400'
                      }`}
                    >
                      <span>{opt}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                        isSelected ? 'bg-indigo-700 text-white' : 'bg-slate-200 dark:bg-slate-800 text-[var(--text-muted)]'
                      }`}>
                        Option {String.fromCharCode(65 + i)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-[var(--border-color)]">
                <button
                  disabled={currentIndex === 0}
                  onClick={handlePrev}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-[var(--text-main)] bg-[var(--bg-main)] border border-[var(--border-color)] disabled:opacity-40"
                >
                  Previous
                </button>

                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/30 transition-all"
                >
                  <span>{currentIndex === quizzes.length - 1 ? 'Finish & Submit' : 'Next Question'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}

        </div>
      ) : (
        /* Results View */
        <div className="p-8 sm:p-12 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xl text-center space-y-8">
          
          <div className="w-20 h-20 rounded-3xl bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 flex items-center justify-center mx-auto shadow-lg">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[var(--text-main)]">
              Quiz Completed!
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              Great job, {studentName}! Here is your diagnostic result.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 inline-block">
            <div className="text-5xl font-extrabold font-heading text-indigo-600">
              {score} / {quizzes.length}
            </div>
            <div className="text-sm font-bold text-[var(--text-muted)] mt-1">
              Percentage: {Math.round((score / quizzes.length) * 100)}%
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => fetchQuestions(selectedLevel, selectedTopic)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold text-[var(--text-main)] bg-[var(--bg-main)] border border-[var(--border-color)] shadow-sm hover:border-indigo-400"
            >
              <RotateCcw className="w-4 h-4" /> Retake Quiz (New Shuffled Order)
            </button>

            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-600/30"
            >
              <Calendar className="w-4 h-4" /> Book Session with Teacher Chyma
            </a>
          </div>

        </div>
      )}

      {/* Student Name Entry Dialog */}
      {showNameModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[var(--bg-card-solid)] border border-[var(--border-color)] p-6 sm:p-8 rounded-3xl max-w-md w-full shadow-2xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[var(--text-main)]">
                Enter Student Name
              </h3>
            </div>

            <p className="text-xs text-[var(--text-muted)]">
              Please enter your name so Teacher Chyma can track your quiz diagnostics!
            </p>

            <form onSubmit={(e) => {
              e.preventDefault();
              if (studentName.trim()) {
                localStorage.setItem('chyma_student_name', studentName.trim());
                setShowNameModal(false);
              }
            }} className="space-y-4">
              <input
                type="text"
                required
                placeholder="e.g. Grace Eze"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-main)] focus:outline-none focus:border-indigo-600"
              />

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md"
              >
                Start Practice Quiz
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Level & Dynamic Topic Dialog */}
      {showLevelModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[var(--bg-card-solid)] border border-[var(--border-color)] p-6 sm:p-8 rounded-3xl max-w-lg w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
              <h3 className="font-heading font-bold text-xl text-[var(--text-main)] flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-indigo-600" /> Select Grade Level & Related Topic
              </h3>
              <button onClick={() => setShowLevelModal(false)} className="text-xl font-bold text-[var(--text-muted)]">&times;</button>
            </div>

            <div className="space-y-5">
              {/* STEP 1: Select Grade Level */}
              <div>
                <label className="text-xs font-bold text-[var(--text-main)] block mb-2">
                  1. Select Grade Level *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'primary', label: 'Primary 4 - 6 Math' },
                    { id: 'jss', label: 'Junior Sec (JSS)' },
                    { id: 'sss', label: 'Senior Sec (SSS)' },
                    { id: 'waec', label: 'WAEC / NECO Prep' },
                    { id: 'sat_igcse', label: 'IGCSE / SAT Math' },
                  ].map(lvl => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => handleLevelChange(lvl.id)}
                      className={`p-3 rounded-xl text-xs font-bold border transition-all text-left flex items-center justify-between ${
                        selectedLevel === lvl.id
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm font-extrabold'
                          : 'bg-[var(--bg-main)] text-[var(--text-main)] border-[var(--border-color)] hover:border-indigo-400'
                      }`}
                    >
                      <span>{lvl.label}</span>
                      {selectedLevel === lvl.id && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* STEP 2: Related Topics Automatically Loaded for Selected Grade */}
              <div>
                <label className="text-xs font-bold text-[var(--text-main)] block mb-2 flex items-center justify-between">
                  <span>2. Select Related Topic for {selectedLevel.toUpperCase()} *</span>
                  <span className="text-[10px] text-emerald-600 font-bold font-mono">
                    ({availableTopics.length} Topics Available)
                  </span>
                </label>

                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs font-bold text-[var(--text-main)] focus:outline-none focus:border-indigo-600"
                >
                  <option value="all">🌐 All Topics under {selectedLevel.toUpperCase()} (Combined Practice)</option>
                  {availableTopics.map((tpc, idx) => (
                    <option key={idx} value={tpc}>
                      📐 {tpc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={() => {
                setShowLevelModal(false);
                fetchQuestions(selectedLevel, selectedTopic);
              }}
              className="w-full py-4 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-600/30 transition-all"
            >
              Start Practice Trial ({selectedLevel.toUpperCase()} - {selectedTopic})
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

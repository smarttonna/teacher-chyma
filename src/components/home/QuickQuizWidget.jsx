import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, CheckCircle, XCircle, ArrowRight, HelpCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function QuickQuizWidget() {
  const sampleQuestions = [
    {
      question: "What is 15 + (4 × 3)?",
      options: ["57", "27", "21", "30"],
      correctIndex: 1,
      explanation: "Follow BODMAS: Multiply first (4 × 3 = 12), then add 15 (15 + 12 = 27)."
    },
    {
      question: "Rectangle length = 8cm, width = 5cm. What is its perimeter?",
      options: ["40cm", "26cm", "13cm", "52cm"],
      correctIndex: 1,
      explanation: "Perimeter = 2 × (Length + Width) = 2 × (8 + 5) = 26cm."
    },
    {
      question: "Solve for x: 3x - 7 = 14",
      options: ["x = 5", "x = 7", "x = 6", "x = 8"],
      correctIndex: 1,
      explanation: "3x = 14 + 7 -> 3x = 21 -> x = 7."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQ = sampleQuestions[currentIndex];

  const handleSelectOption = (index) => {
    if (isAnswered) return;
    setSelectedOpt(index);
    setIsAnswered(true);

    if (index === currentQ.correctIndex) {
      setScore(prev => prev + 1);
      toast.success('Correct answer! 🎉');
    } else {
      toast.error('Incorrect option!');
    }
  };

  const handleNext = () => {
    if (currentIndex < sampleQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    }
  };

  return (
    <section id="quiz" className="py-20 relative border-t border-[var(--border-color)] bg-[var(--bg-main)]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            <Gamepad2 className="w-4 h-4" /> Quick Test
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[var(--text-main)]">
            Test Your Math Skills
          </h2>
          <p className="text-[var(--text-muted)] text-base sm:text-lg">
            Try a 3-question sample math challenge right now!
          </p>
        </div>

        <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
            <span className="text-xs font-bold uppercase text-indigo-600 tracking-wider">
              Question {currentIndex + 1} of {sampleQuestions.length}
            </span>
            <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600">
              Score: {score}
            </span>
          </div>

          <h3 className="font-heading font-bold text-lg sm:text-xl text-[var(--text-main)]">
            {currentQ.question}
          </h3>

          <div className="space-y-3">
            {currentQ.options.map((opt, i) => {
              let btnStyle = "bg-[var(--bg-main)] border-[var(--border-color)] text-[var(--text-main)] hover:border-indigo-400";
              if (isAnswered) {
                if (i === currentQ.correctIndex) {
                  btnStyle = "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold";
                } else if (i === selectedOpt) {
                  btnStyle = "bg-red-50 dark:bg-red-950/50 border-red-500 text-red-700 dark:text-red-300";
                }
              }

              return (
                <button
                  key={i}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(i)}
                  className={`w-full p-4 rounded-xl text-left text-sm transition-all border flex items-center justify-between ${btnStyle}`}
                >
                  <span className="font-medium">{opt}</span>
                  {isAnswered && i === currentQ.correctIndex && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                  {isAnswered && i === selectedOpt && i !== currentQ.correctIndex && <XCircle className="w-5 h-5 text-red-500" />}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-xs text-[var(--text-muted)] space-y-1">
              <strong className="text-indigo-600 font-bold block">Solution Explanation:</strong>
              <p>{currentQ.explanation}</p>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-[var(--border-color)]">
            {currentIndex < sampleQuestions.length - 1 ? (
              <button
                disabled={!isAnswered}
                onClick={handleNext}
                className="ml-auto inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-colors"
              >
                <span>Next Question</span> <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <Link
                to="/quiz"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md"
              >
                <span>Explore Full 400+ Question Hub</span> <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}

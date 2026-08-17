import React, { useState } from 'react';
import { 
  BadgeDollarSign, 
  Calculator, 
  Send, 
  MessageSquare, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import toast from 'react-hot-toast';
import { QuizService } from '../../services/quizService';

export default function FeeEstimator() {
  const [sessionsPerWeek, setSessionsPerWeek] = useState(3);
  const [gradeLevel, setGradeLevel] = useState('sss');
  const [mode, setMode] = useState('online');
  const [studentName, setStudentName] = useState('');
  const [phone, setPhone] = useState('');

  // Base rate calculation per session
  const getRatePerSession = () => {
    let base = 5000; // default for JSS
    if (gradeLevel === 'primary') base = 4000;
    if (gradeLevel === 'sss') base = 6000;
    if (gradeLevel === 'waec') base = 7000;
    if (gradeLevel === 'sat_igcse') base = 10000;

    if (mode === 'physical') base *= 1.25; // 25% surcharge for home physical sessions
    return base;
  };

  const ratePerSession = getRatePerSession();
  const monthlySessions = sessionsPerWeek * 4;
  const estimatedMonthlyFee = monthlySessions * ratePerSession;

  const handleWhatsAppInquiry = async (e) => {
    e.preventDefault();
    if (!studentName.trim() || !phone.trim()) {
      toast.error('Please enter student name and phone number.');
      return;
    }

    try {
      await QuizService.saveInquiry({
        name: studentName,
        phone,
        gradeLevel,
        estimatedMonthlyFee,
        message: `${sessionsPerWeek} sessions/wk (${mode}) - Monthly Est: ₦${estimatedMonthlyFee.toLocaleString()}`
      });
    } catch (err) {
      console.warn("Inquiry save notice:", err);
    }

    const message = encodeURIComponent(
      `Hello Teacher Chyma! 👋\n` +
      `I would like to inquire about Mathematics tutoring for my child.\n\n` +
      `📌 *Student Name*: ${studentName}\n` +
      `📱 *Phone / WhatsApp*: ${phone}\n` +
      `📚 *Grade Level*: ${gradeLevel.toUpperCase()}\n` +
      `💻 *Learning Mode*: ${mode.toUpperCase()}\n` +
      `🗓 *Frequency*: ${sessionsPerWeek} sessions / week (${monthlySessions} monthly sessions)\n` +
      `💰 *Estimated Monthly Fee*: ₦${estimatedMonthlyFee.toLocaleString()}\n\n` +
      `Please let me know your availability for a free trial session!`
    );

    const whatsappUrl = `https://wa.me/2349127245516?text=${message}`;
    toast.success('Opening WhatsApp inquiry link...');
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="estimator" className="py-20 relative border-t border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
            <BadgeDollarSign className="w-4 h-4" /> Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[var(--text-main)]">
            Learning Plan & Fee Estimator
          </h2>
          <p className="text-[var(--text-muted)] text-base sm:text-lg">
            Customize your weekly session frequency and generate a direct WhatsApp booking inquiry.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* Left Controls Card */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-xl space-y-6">
            
            {/* Grade Level Select */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                1. Student Grade Level
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'primary', label: 'Primary 4-6' },
                  { id: 'jss', label: 'Junior Sec (JSS)' },
                  { id: 'sss', label: 'Senior Sec (SSS)' },
                  { id: 'waec', label: 'WAEC / NECO' },
                  { id: 'sat_igcse', label: 'SAT / IGCSE' },
                ].map(g => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setGradeLevel(g.id)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border text-center ${
                      gradeLevel === g.id
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                        : 'bg-[var(--bg-main)] text-[var(--text-main)] border-[var(--border-color)] hover:border-indigo-400'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mode Select */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                2. Class Delivery Mode
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setMode('online')}
                  className={`py-3 px-4 rounded-xl text-xs font-bold transition-all border text-center ${
                    mode === 'online'
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                      : 'bg-[var(--bg-main)] text-[var(--text-main)] border-[var(--border-color)]'
                  }`}
                >
                  💻 Online Class (Zoom/Meet)
                </button>

                <button
                  type="button"
                  onClick={() => setMode('physical')}
                  className={`py-3 px-4 rounded-xl text-xs font-bold transition-all border text-center ${
                    mode === 'physical'
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                      : 'bg-[var(--bg-main)] text-[var(--text-main)] border-[var(--border-color)]'
                  }`}
                >
                  🏡 Physical / Home Tutoring
                </button>
              </div>
            </div>

            {/* Weekly Sessions Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  3. Weekly Sessions
                </label>
                <span className="text-sm font-extrabold text-indigo-600">
                  {sessionsPerWeek} Sessions / Week ({monthlySessions} Monthly)
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={sessionsPerWeek}
                onChange={(e) => setSessionsPerWeek(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

          </div>

          {/* Right Summary & WhatsApp Trigger Card */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-2xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg">Monthly Estimate</h3>
                <p className="text-xs text-slate-400">Flexible pay-as-you-learn plans</p>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-4 space-y-3">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Rate per session:</span>
                <span className="font-mono font-bold">₦{ratePerSession.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Monthly sessions:</span>
                <span className="font-mono font-bold">{monthlySessions} sessions</span>
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-between items-end">
                <span className="text-sm font-bold text-slate-200">Total Monthly Est:</span>
                <div className="text-right">
                  <div className="text-3xl font-extrabold text-amber-400 font-heading">
                    ₦{estimatedMonthlyFee.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-400">Cancel or pause anytime</div>
                </div>
              </div>
            </div>

            {/* Quick Contact Inputs */}
            <form onSubmit={handleWhatsAppInquiry} className="space-y-3 pt-2">
              <input 
                type="text"
                placeholder="Parent / Student Full Name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
              />

              <input 
                type="tel"
                placeholder="WhatsApp Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
              />

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20"
              >
                <MessageSquare className="w-4 h-4" /> Send Pre-Filled WhatsApp Inquiry
              </button>
            </form>

          </div>

        </div>

      </div>
    </section>
  );
}

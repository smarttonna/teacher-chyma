import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import OverviewPanel from '../components/admin/OverviewPanel';
import SubmissionsPanel from '../components/admin/SubmissionsPanel';
import RosterPanel from '../components/admin/RosterPanel';
import QuestionStudioPanel from '../components/admin/QuestionStudioPanel';
import QuestionBankPanel from '../components/admin/QuestionBankPanel';
import SalesPanel from '../components/admin/SalesPanel';

import { 
  ShieldCheck, 
  Key, 
  Lock, 
  Cloud, 
  Layers, 
  PieChart, 
  BarChart2, 
  IdCard, 
  PlusCircle, 
  Database, 
  BadgeDollarSign,
  LogOut,
  Eye,
  EyeOff
} from 'lucide-react';
import toast from 'react-hot-toast';
import { QuizService } from '../services/quizService';

export default function AdminPage() {
  const { isLoggedIn, role, loginWithPasscode, logout } = useAuth();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [passcode, setPasscode] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  // Dashboard Data State
  const [submissions, setSubmissions] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [students, setStudents] = useState([]);

  const refreshAllData = async () => {
    try {
      const [subs, qzs, stds] = await Promise.all([
        QuizService.getSubmissions(),
        QuizService.getQuizzes('all', 'all'),
        QuizService.getStudentAccounts()
      ]);
      setSubmissions(subs || []);
      setQuizzes(qzs || []);
      setStudents(stds || []);
    } catch (err) {
      console.warn("Refresh data notice:", err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      refreshAllData();
    }
  }, [isLoggedIn]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      await loginWithPasscode(passcode, password);
      toast.success('Logged in to Educator Control Center!');
      setPasscode('');
      setPassword('');
      refreshAllData();
    } catch (err) {
      toast.error(err.message || 'Login failed.');
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {!isLoggedIn ? (
        /* LOGGED OUT VIEW */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto py-8">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
              <ShieldCheck className="w-4 h-4" /> Educator Control Center
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-[var(--text-main)] leading-tight">
              Empowering Math Excellence with <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                Teacher Chyma
              </span>
            </h1>

            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Access your centralized admin dashboard to publish questions, register student accounts, and track live student performance diagnostics in real time.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center gap-3">
                <Cloud className="w-5 h-5 text-indigo-600" />
                <div>
                  <h4 className="font-bold text-xs text-[var(--text-main)]">Live Cloud Firestore Sync</h4>
                  <p className="text-[11px] text-[var(--text-muted)]">Connected live to teacherchyma-db300 database.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center gap-3">
                <Layers className="w-5 h-5 text-emerald-600" />
                <div>
                  <h4 className="font-bold text-xs text-[var(--text-main)]">400+ MCQs Across 20 Math Topics</h4>
                  <p className="text-[11px] text-[var(--text-muted)]">Curated questions from Primary 4 to SAT & IGCSE Math.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Login Card */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-indigo-600/30">
                <Lock className="w-7 h-7" />
              </div>
              <h2 className="font-heading font-bold text-2xl text-[var(--text-main)]">Educator Portal Login</h2>
              <p className="text-xs text-[var(--text-muted)]">Enter passcode or authorized email to log in.</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[var(--text-main)]">Teacher Passcode / Email *</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter passcode or authorized email"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full px-4 py-3 pr-10 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)] focus:outline-none focus:border-indigo-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-[var(--text-muted)]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-600/30 transition-all"
              >
                <Key className="w-4 h-4" />
                <span>{loginLoading ? 'Logging In...' : 'Log In to Admin Control Center'}</span>
              </button>
            </form>
          </div>

        </div>
      ) : (
        /* LOGGED IN VIEW */
        <div className="space-y-6">
          
          {/* Welcome Banner */}
          <div className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-lg flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-extrabold flex items-center justify-center text-lg shadow-md">
                C
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-heading font-extrabold text-xl text-[var(--text-main)]">
                    Welcome back, Teacher Chyma 👋
                  </h2>
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                    role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {role} Role
                  </span>
                </div>
                <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                  ● Live Cloud Sync Active
                </div>
              </div>
            </div>

            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-red-600 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/40 hover:bg-red-100"
            >
              <LogOut className="w-4 h-4" /> Log Out
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[var(--border-color)]">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              <PieChart className="w-4 h-4" /> Overview
            </button>

            <button
              onClick={() => setActiveTab('submissions')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'submissions'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              <BarChart2 className="w-4 h-4" /> Student Trial Results
            </button>

            <button
              onClick={() => setActiveTab('roster')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'roster'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              <IdCard className="w-4 h-4" /> Student Accounts
            </button>

            {role === 'admin' && (
              <>
                <button
                  onClick={() => setActiveTab('create')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === 'create'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                  }`}
                >
                  <PlusCircle className="w-4 h-4" /> Create Question
                </button>

                <button
                  onClick={() => setActiveTab('bank')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === 'bank'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                  }`}
                >
                  <Database className="w-4 h-4" /> Question Directory
                </button>
              </>
            )}

            <button
              onClick={() => setActiveTab('sales')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'sales'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              <BadgeDollarSign className="w-4 h-4 text-amber-400" /> Sales & Inquiries
            </button>
          </div>

          {/* Active Panel View */}
          <div className="pt-2">
            {activeTab === 'overview' && (
              <OverviewPanel 
                submissions={submissions} 
                quizzes={quizzes} 
                students={students} 
                onNavigate={(t) => setActiveTab(t)} 
              />
            )}

            {activeTab === 'submissions' && (
              <SubmissionsPanel 
                submissions={submissions} 
                onRefresh={refreshAllData} 
              />
            )}

            {activeTab === 'roster' && (
              <RosterPanel 
                students={students} 
                onRefresh={refreshAllData} 
              />
            )}

            {activeTab === 'create' && role === 'admin' && (
              <QuestionStudioPanel 
                onRefresh={refreshAllData} 
              />
            )}

            {activeTab === 'bank' && role === 'admin' && (
              <QuestionBankPanel 
                quizzes={quizzes} 
                onRefresh={refreshAllData} 
              />
            )}

            {activeTab === 'sales' && (
              <SalesPanel />
            )}
          </div>

        </div>
      )}

    </main>
  );
}

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { 
  Radical, 
  GraduationCap, 
  ShieldCheck, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  Key, 
  Home, 
  Phone,
  LogOut,
  BadgeDollarSign
} from 'lucide-react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { role, isLoggedIn, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-main)]/90 backdrop-blur-md border-b border-[var(--border-color)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-300">
            <Radical className="w-6 h-6" />
          </div>
          <span className="font-heading font-extrabold text-xl sm:text-2xl text-[var(--text-main)]">
            Teacher <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">Chyma</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          <Link 
            to="/" 
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
              isActive('/') ? 'text-indigo-600 font-semibold bg-indigo-50 dark:bg-indigo-950/30' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
            }`}
          >
            <Home className="w-4 h-4" /> Home
          </Link>

          <Link 
            to="/quiz" 
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
              isActive('/quiz') ? 'text-indigo-600 font-semibold bg-indigo-50 dark:bg-indigo-950/30' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-emerald-500" /> Student Quiz Hub
          </Link>

          <Link 
            to="/admin" 
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
              isActive('/admin') ? 'text-indigo-600 font-semibold bg-indigo-50 dark:bg-indigo-950/30' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-indigo-500" /> Educator Portal
            {role !== 'guest' && (
              <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-full ${
                role === 'admin' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
              }`}>
                {role}
              </span>
            )}
          </Link>

          <a 
            href="/#estimator" 
            className="px-3 py-2 rounded-lg text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors flex items-center gap-1.5"
          >
            <BadgeDollarSign className="w-4 h-4 text-amber-500" /> Fee Estimator
          </a>

          <a 
            href="/#contact" 
            className="px-3 py-2 rounded-lg text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors flex items-center gap-1.5"
          >
            <Phone className="w-4 h-4" /> Contact
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Light/Dark Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            className="w-10 h-10 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-main)] flex items-center justify-center hover:scale-105 transition-all shadow-sm"
            title="Toggle Light/Dark Theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5 text-indigo-600" /> : <Sun className="w-5 h-5 text-amber-400" />}
          </button>

          {isLoggedIn ? (
            <button 
              onClick={logout} 
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl text-red-600 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 transition-all border border-red-200 dark:border-red-900/40"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          ) : (
            <Link 
              to="/admin" 
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl text-indigo-600 border border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-950/30 hover:bg-indigo-100 transition-all"
            >
              <Key className="w-4 h-4" /> Teacher Login
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileOpen(!mobileOpen)} 
            className="md:hidden w-10 h-10 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-main)] flex items-center justify-center shadow-sm"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Navigation */}
      {mobileOpen && (
        <div className="md:hidden border-b border-[var(--border-color)] bg-[var(--bg-card-solid)] px-4 py-6 space-y-3 shadow-xl">
          <Link 
            to="/" 
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-[var(--text-main)] hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
          >
            <Home className="w-5 h-5 text-indigo-600" /> Home
          </Link>
          
          <Link 
            to="/quiz" 
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-[var(--text-main)] hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
          >
            <GraduationCap className="w-5 h-5 text-emerald-500" /> Student Quiz Hub
          </Link>
          
          <Link 
            to="/admin" 
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-[var(--text-main)] hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
          >
            <ShieldCheck className="w-5 h-5 text-indigo-500" /> Educator Portal ({role})
          </Link>

          <a 
            href="/#estimator" 
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-[var(--text-main)] hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
          >
            <BadgeDollarSign className="w-5 h-5 text-amber-500" /> Fee Estimator
          </a>

          <a 
            href="/#contact" 
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-[var(--text-main)] hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
          >
            <Phone className="w-5 h-5 text-indigo-500" /> Contact
          </a>

          {isLoggedIn ? (
            <button 
              onClick={() => { logout(); setMobileOpen(false); }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl text-red-600 bg-red-50 dark:bg-red-950/30"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          ) : (
            <Link 
              to="/admin" 
              onClick={() => setMobileOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl text-white bg-indigo-600 shadow-md"
            >
              <Key className="w-4 h-4" /> Teacher Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

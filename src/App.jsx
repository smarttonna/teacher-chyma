import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col relative bg-[var(--bg-main)] text-[var(--text-main)]">
            
            {/* Background Floating Mathematical Symbols */}
            <div className="bg-math-patterns">
              <div className="math-symbol" style={{ top: '15%', left: '6%', fontSize: '3rem', animationDelay: '0s' }}>π</div>
              <div className="math-symbol" style={{ top: '25%', right: '8%', fontSize: '3rem', animationDelay: '-2s' }}>√x</div>
              <div className="math-symbol" style={{ top: '55%', left: '4%', fontSize: '3.5rem', animationDelay: '-4s' }}>∑</div>
              <div className="math-symbol" style={{ top: '70%', right: '6%', fontSize: '3rem', animationDelay: '-1s' }}>Δ</div>
              <div className="math-symbol" style={{ top: '85%', left: '8%', fontSize: '3.5rem', animationDelay: '-5s' }}>∫</div>
            </div>

            <Navbar />

            <div className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="*" element={<HomePage />} />
              </Routes>
            </div>

            <Footer />

            <Toaster 
              position="top-right"
              toastOptions={{
                className: 'rounded-2xl bg-[var(--bg-card-solid)] text-[var(--text-main)] border border-[var(--border-color)] text-xs font-bold shadow-xl',
              }}
            />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

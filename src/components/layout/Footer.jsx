import React from 'react';
import { Radical, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-card-solid)] py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md">
              <Radical className="w-5 h-5" />
            </div>
            <div>
              <span className="font-heading font-extrabold text-lg text-[var(--text-main)]">
                Teacher <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">Chyma</span>
              </span>
              <p className="text-xs text-[var(--text-muted)]">Professional Mathematics Educator & EdTech Specialist</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-[var(--text-muted)]">
            <a href="/#about" className="hover:text-indigo-600 transition-colors">About</a>
            <a href="/#specializations" className="hover:text-indigo-600 transition-colors">Curriculum</a>
            <a href="/#estimator" className="hover:text-indigo-600 transition-colors">Fee Estimator</a>
            <a href="/quiz" className="hover:text-indigo-600 transition-colors">Student Quiz Hub</a>
            <a href="/admin" className="hover:text-indigo-600 transition-colors">Educator Portal</a>
          </div>

          <div className="text-xs text-[var(--text-muted)] text-center md:text-right space-y-1">
            <div>&copy; {new Date().getFullYear()} Chidimma Mary. All rights reserved.</div>
            <div className="flex items-center justify-center md:justify-end gap-1">
              <span>Designed with</span>
              <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
              <span>by <strong className="text-indigo-600 font-semibold">Tonna</strong></span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

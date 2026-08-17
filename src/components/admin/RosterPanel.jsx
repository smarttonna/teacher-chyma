import React, { useState } from 'react';
import { UserPlus, UserCheck, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { QuizService } from '../../services/quizService';

export default function RosterPanel({ students, onRefresh }) {
  const [name, setName] = useState('');
  const [level, setLevel] = useState('sss');
  const [pin, setPin] = useState('1234');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    try {
      await QuizService.saveStudentAccount({ name, email, level, pin });
      toast.success(`Registered account for ${name}`);
      setName('');
      setEmail('');
      setPin('1234');
      onRefresh();
    } catch (err) {
      toast.error('Failed to register student.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove student account from roster?')) return;
    try {
      await QuizService.deleteStudentAccount(id);
      toast.success('Student removed from roster.');
      onRefresh();
    } catch (err) {
      toast.error('Failed to delete student.');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Registration Form */}
      <div className="lg:col-span-5 p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-lg space-y-6">
        <div className="flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-indigo-600" />
          <h3 className="font-heading font-bold text-xl text-[var(--text-main)]">
            Register New Student Account
          </h3>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-[var(--text-main)]">Full Student Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Grace Eze"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)] focus:outline-none focus:border-indigo-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[var(--text-main)]">Grade Level *</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)]"
              >
                <option value="primary">Primary 4 - 6</option>
                <option value="jss">Junior Sec (JSS)</option>
                <option value="sss">Senior Sec (SSS)</option>
                <option value="waec">WAEC / NECO</option>
                <option value="sat_igcse">IGCSE / SAT</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[var(--text-main)]">Access PIN *</label>
              <input
                type="text"
                required
                placeholder="1234"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)] focus:outline-none focus:border-indigo-600"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[var(--text-main)]">Student Email (Optional)</label>
            <input
              type="email"
              placeholder="grace@student.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)] focus:outline-none focus:border-indigo-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md transition-all"
          >
            {loading ? 'Registering...' : 'Register Student Account'}
          </button>
        </form>
      </div>

      {/* Roster Table */}
      <div className="lg:col-span-7 p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-bold text-xl text-[var(--text-main)] flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-indigo-600" /> Registered Student Roster
          </h3>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">
            {students.length} Registered
          </span>
        </div>

        <div className="rounded-2xl border border-[var(--border-color)] overflow-hidden bg-[var(--bg-card-solid)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[var(--text-main)]">
              <thead className="bg-[var(--bg-main)] text-[var(--text-muted)] font-bold uppercase text-[10px] border-b border-[var(--border-color)]">
                <tr>
                  <th className="p-3.5">Student Name</th>
                  <th className="p-3.5">Level</th>
                  <th className="p-3.5">PIN</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)]">
                {students.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-6 text-center text-[var(--text-muted)]">No registered students.</td>
                  </tr>
                ) : (
                  students.map((s) => (
                    <tr key={s.id} className="hover:bg-indigo-50/20">
                      <td className="p-3.5 font-bold">{s.name}</td>
                      <td className="p-3.5 uppercase font-mono text-[10px]">{s.level}</td>
                      <td className="p-3.5 font-mono font-bold text-indigo-600">{s.pin}</td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => handleDelete(s.id)}
                          className="p-1.5 rounded-lg text-red-600 bg-red-50 dark:bg-red-950/50 hover:bg-red-100"
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
      </div>

    </div>
  );
}

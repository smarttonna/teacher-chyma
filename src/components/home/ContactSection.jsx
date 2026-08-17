import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import { QuizService } from '../../services/quizService';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gradeLevel: 'sss',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast.error('Please complete name and phone fields.');
      return;
    }

    setLoading(true);
    try {
      await QuizService.saveInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        gradeLevel: formData.gradeLevel,
        message: formData.message
      });
      toast.success('Inquiry submitted! Teacher Chyma will contact you shortly.');
      setFormData({ name: '', email: '', phone: '', gradeLevel: 'sss', message: '' });
    } catch (err) {
      toast.error('Failed to submit inquiry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative border-t border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
            <Mail className="w-4 h-4" /> Direct Inquiry
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[var(--text-main)]">
            Book a Free Trial Session
          </h2>
          <p className="text-[var(--text-muted)] text-base sm:text-lg">
            Have questions about tutoring, class schedules, or exam preparation? Reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-lg space-y-6">
              <h3 className="font-heading font-bold text-xl text-[var(--text-main)]">
                Contact Information
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[var(--text-muted)]">Official Email</div>
                    <a href="mailto:teacherchyma@gmail.com" className="font-bold text-[var(--text-main)] hover:text-indigo-600">
                      teacherchyma@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[var(--text-muted)]">WhatsApp / Mobile</div>
                    <a href="https://wa.me/2349127245516" target="_blank" rel="noreferrer" className="font-bold text-[var(--text-main)] hover:text-emerald-600">
                      +234 912 724 5516
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[var(--text-muted)]">Location</div>
                    <span className="font-bold text-[var(--text-main)]">
                      Anambra, Nigeria (Global Online Tutoring)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[var(--text-muted)]">Class Availability</div>
                    <span className="font-bold text-[var(--text-main)]">
                      Monday - Saturday (Flexible Online Slots)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Direct Contact Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-xl space-y-6">
            <h3 className="font-heading font-bold text-xl text-[var(--text-main)]">
              Send Educator Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[var(--text-main)]">Full Name *</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Chinedu Okeke"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)] focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[var(--text-main)]">Phone / WhatsApp *</label>
                  <input 
                    type="tel"
                    required
                    placeholder="e.g. +234 801 234 5678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)] focus:outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[var(--text-main)]">Email Address (Optional)</label>
                  <input 
                    type="email"
                    placeholder="e.g. name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)] focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[var(--text-main)]">Target Level *</label>
                  <select
                    value={formData.gradeLevel}
                    onChange={(e) => setFormData({ ...formData, gradeLevel: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)] focus:outline-none focus:border-indigo-600"
                  >
                    <option value="primary">Primary 4 - 6</option>
                    <option value="jss">Junior Secondary (JSS)</option>
                    <option value="sss">Senior Secondary (SSS)</option>
                    <option value="waec">WAEC / NECO Prep</option>
                    <option value="sat_igcse">IGCSE / SAT Math</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[var(--text-main)]">Message / Learning Goals</label>
                <textarea
                  rows={4}
                  placeholder="Describe current student math level, topics needing help, or exam preparation goals..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)] focus:outline-none focus:border-indigo-600 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-600/30 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? 'Submitting...' : 'Submit Trial Session Request'}</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}

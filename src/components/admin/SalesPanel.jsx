import React, { useState, useEffect } from 'react';
import { BadgeDollarSign, MessageSquare, Phone, Mail, Calendar, CheckCircle2 } from 'lucide-react';
import { QuizService } from '../../services/quizService';

export default function SalesPanel() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const data = await QuizService.getInquiries();
      setInquiries(data);
    } catch (err) {
      console.warn("Fetch inquiries notice:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading font-extrabold text-2xl text-[var(--text-main)] mb-1 flex items-center gap-2">
          <BadgeDollarSign className="w-6 h-6 text-amber-500" /> Sales & Student Inquiry Leads
        </h3>
        <p className="text-xs text-[var(--text-muted)]">
          Manage incoming tutoring session requests, fee estimate calculations, and lead conversions.
        </p>
      </div>

      <div className="rounded-2xl border border-[var(--border-color)] overflow-hidden bg-[var(--bg-card-solid)] shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[var(--text-main)]">
            <thead className="bg-[var(--bg-main)] text-[var(--text-muted)] font-bold uppercase text-[10px] border-b border-[var(--border-color)]">
              <tr>
                <th className="p-4">Contact Name</th>
                <th className="p-4">Phone / WhatsApp</th>
                <th className="p-4">Target Level</th>
                <th className="p-4">Monthly Fee Est.</th>
                <th className="p-4">Message / Goal</th>
                <th className="p-4">Received Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[var(--text-muted)]">
                    Loading student inquiry leads...
                  </td>
                </tr>
              ) : inquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[var(--text-muted)]">
                    No lead inquiries received yet.
                  </td>
                </tr>
              ) : (
                inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-amber-50/20 transition-colors">
                    <td className="p-4 font-bold">{inq.name}</td>
                    <td className="p-4">
                      <a 
                        href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-emerald-600 font-bold hover:underline flex items-center gap-1"
                      >
                        <Phone className="w-3.5 h-3.5" /> {inq.phone}
                      </a>
                    </td>
                    <td className="p-4 uppercase font-mono text-[10px]">{inq.gradeLevel}</td>
                    <td className="p-4 font-mono font-bold text-amber-600">
                      ₦{(inq.estimatedMonthlyFee || 0).toLocaleString()}
                    </td>
                    <td className="p-4 text-[var(--text-muted)] max-w-xs truncate">
                      {inq.message || 'No additional message'}
                    </td>
                    <td className="p-4 text-[var(--text-muted)]">
                      {new Date(inq.createdAt || Date.now()).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

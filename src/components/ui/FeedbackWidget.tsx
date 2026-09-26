import React, { useState, useEffect } from 'react';
import { MessageSquarePlus, Check, Send, Trash2 } from 'lucide-react';
import { Button, Input, Modal } from '@/components/ui';

export interface FeedbackItem {
  id: string;
  text: string;
  date: string;
}

export function FeedbackForm() {
  const [feedbackText, setFeedbackText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    const stored = localStorage.getItem('oop_universe_feedback');
    const feedbacks = stored ? JSON.parse(stored) : [];

    const newItem: FeedbackItem = {
      id: Date.now().toString(),
      text: feedbackText,
      date: new Date().toLocaleString()
    };

    localStorage.setItem('oop_universe_feedback', JSON.stringify([...feedbacks, newItem]));
    setSubmitted(true);
    setFeedbackText('');
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="p-6 rounded-xl border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] text-center flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
          <Check className="w-6 h-6 text-emerald-400" />
        </div>
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Thank you!</h3>
        <p className="text-[var(--color-text-secondary)] mt-1">Aapka suggestion save ho gaya hai.</p>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-xl border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] max-w-2xl w-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-[var(--color-accent-primary)]/10 flex items-center justify-center">
          <MessageSquarePlus className="w-5 h-5 text-[var(--color-accent-primary)]" />
        </div>
        <div>
          <h3 className="font-semibold text-[var(--color-text-primary)]">Suggest a Feature</h3>
          <p className="text-xs text-[var(--color-text-secondary)]">Platform mein aur kya add karna chahiye?</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          placeholder="Apna idea yahan likhein (Koi naam dene ki zaroorat nahi)..."
          className="w-full h-24 rounded-lg bg-[var(--color-bg-input)] border border-[var(--color-border-primary)] p-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] resize-none"
          required
        />
        <div className="flex justify-end">
          <Button variant="primary" type="submit">Submit <Send className="w-4 h-4 ml-2" /></Button>
        </div>
      </form>
    </div>
  );
}

export function AdminFeedbackModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [passcode, setPasscode] = useState('');
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);

  useEffect(() => {
    if (isOpen) {
      const stored = localStorage.getItem('oop_universe_feedback');
      if (stored) {
        try { setFeedbacks(JSON.parse(stored)); } catch (e) {}
      }
      setIsAdminAuth(false);
      setPasscode('');
    }
  }, [isOpen]);

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.toLowerCase() === 'saqib') {
      setIsAdminAuth(true);
    } else {
      alert('Incorrect passcode!');
    }
  };

  const clearFeedbacks = () => {
    if (confirm('Are you sure you want to delete all feedback?')) {
      localStorage.removeItem('oop_universe_feedback');
      setFeedbacks([]);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Admin Dashboard">
      {!isAdminAuth ? (
        <form onSubmit={handleAdminAuth} className="space-y-4 pt-4">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Enter passcode to view student suggestions. (Only for Saqib Ali Rind)
          </p>
          <Input type="password" value={passcode} onChange={(e) => setPasscode(e.target.value)} placeholder="Passcode" required />
          <Button variant="primary" type="submit" className="w-full">Unlock</Button>
        </form>
      ) : (
        <div className="space-y-4 pt-2 max-h-[60vh] flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">Student Suggestions ({feedbacks.length})</h3>
            {feedbacks.length > 0 && (
              <button onClick={clearFeedbacks} className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1">
                <Trash2 className="w-3 h-3" /> Clear All
              </button>
            )}
          </div>
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
            {feedbacks.length === 0 ? (
              <p className="text-sm text-[var(--color-text-tertiary)] py-4 text-center">No feedback yet.</p>
            ) : (
              feedbacks.map(fb => (
                <div key={fb.id} className="p-3 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border-primary)]">
                  <p className="text-sm text-[var(--color-text-primary)] whitespace-pre-wrap">{fb.text}</p>
                  <p className="text-[10px] text-[var(--color-text-tertiary)] mt-2 font-mono">{fb.date}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}

export function FeedbackWidget() {
  return null;
}

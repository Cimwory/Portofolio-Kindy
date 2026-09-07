import React, { useState } from 'react';
import { Language } from '../../types';
import { PERSONAL_INFO } from '../../data/content';
import { SpotlightCard } from './SpotlightCard';
import { DecryptedText } from './DecryptedText';
import { ShinyText } from './ShinyText';
import { Mail, Copy, Check, Download, ArrowUpRight, Send } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../SocialIcons';

interface DissectedContactStageProps {
  lang: Language;
  isActive: boolean;
}

export const DissectedContactStage: React.FC<DissectedContactStageProps> = ({
  lang,
  isActive,
}) => {
  const [emailCopied, setEmailCopied] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2500);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:${PERSONAL_INFO.email}?subject=Mission Inquiry: Kindy Portfolio&body=${encodeURIComponent(
      `Name: ${contactForm.name}\nEmail: ${contactForm.email}\n\n${contactForm.message}`
    )}`;
    window.open(mailto, '_blank');
  };

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center transition-all duration-700 pointer-events-auto ${
        isActive
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
      }`}
    >
      <div className="max-w-lg w-full">
        <SpotlightCard
          chipLabel="LAYER_06 // DISPATCH_LINK"
          spotlightColor="rgba(6, 182, 212, 0.25)"
          borderColor="rgba(6, 182, 212, 0.45)"
          className="p-5 sm:p-7 backdrop-blur-xl bg-[#081024]/90 space-y-3.5 shadow-2xl"
        >
          <div className="text-center space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-mono">
              <Mail className="w-3.5 h-3.5" />
              <DecryptedText text="DISSECTED LAYER 06 // INITIATE LINK" speed={35} />
            </div>
            <h2 className="text-lg sm:text-2xl font-bold text-slate-100">
              <ShinyText text="Let’s Build Mission-Critical IoT" shineColor="#38bdf8" />
            </h2>
            <p className="text-xs text-slate-400">
              Surabaya, Jawa Timur • EEPIS / PENS • Open for Engineering Opportunities
            </p>
          </div>

          <div className="space-y-2 font-mono text-xs">
            {/* Copy Email */}
            <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center gap-2 truncate">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-slate-200 truncate">{PERSONAL_INFO.email}</span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer shrink-0 ml-2"
                title="Copy Email"
              >
                {emailCopied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
              >
                <LinkedinIcon className="w-4 h-4 text-cyan-400" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-slate-500" />
              </a>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
              >
                <GithubIcon className="w-4 h-4 text-cyan-400" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 text-slate-500" />
              </a>
            </div>

            {/* Download CV */}
            <a
              href="./Profile.pdf"
              download="CV_Ulinnuha_Alkindi.pdf"
              className="flex items-center justify-center gap-2 w-full p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold hover:opacity-95 transition-all shadow-md shadow-cyan-500/20"
            >
              <Download className="w-4 h-4" />
              <span>{lang === 'en' ? 'Download Full CV (PDF)' : 'Unduh CV Lengkap (PDF)'}</span>
            </a>
          </div>

          {/* Quick Message Form */}
          <form onSubmit={handleContactSubmit} className="space-y-2 pt-0.5">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder={lang === 'en' ? 'Your Name' : 'Nama Anda'}
                required
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                className="p-2 text-xs rounded-lg bg-slate-950/80 border border-slate-800 text-slate-200 focus:border-cyan-500 outline-none font-mono"
              />
              <input
                type="email"
                placeholder={lang === 'en' ? 'Your Email' : 'Email Anda'}
                required
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                className="p-2 text-xs rounded-lg bg-slate-950/80 border border-slate-800 text-slate-200 focus:border-cyan-500 outline-none font-mono"
              />
            </div>
            <textarea
              placeholder={lang === 'en' ? 'Engineering Inquiry / Message...' : 'Pesan / Tawaran Proyek...'}
              required
              rows={2}
              value={contactForm.message}
              onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
              className="w-full p-2 text-xs rounded-lg bg-slate-950/80 border border-slate-800 text-slate-200 focus:border-cyan-500 outline-none font-mono resize-none"
            />
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'DISPATCH MESSAGE' : 'KIRIM PESAN'}</span>
            </button>
          </form>
        </SpotlightCard>
      </div>
    </div>
  );
};

export default DissectedContactStage;

import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, Download, Copy, ExternalLink, MessageSquare } from 'lucide-react';
import { LinkedinIcon } from './SocialIcons';
import { Language } from '../types';
import { PERSONAL_INFO } from '../data/content';

interface ContactProps {
  lang: Language;
}

export const Contact: React.FC<ContactProps> = ({ lang }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Open mail client
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      formData.subject || 'IoT Collaboration / Inquiry'
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.open(mailtoUrl, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-[#070c17]/75 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 text-xs font-mono">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'INITIATE CONNECTION' : 'HUBUNGI SAYA'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            {lang === 'en' ? 'Let’s Build Mission-Critical IoT Systems' : 'Mari Berkolaborasi Mengembangkan Solusi IoT'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {lang === 'en'
              ? 'Open for engineering roles, industrial IoT project consultations, or research discussions.'
              : 'Terbuka untuk peluang kerja rekayasa sistem tertanam, konsultasi proyek IoT industri, maupun diskusi riset teknologi.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Contact Card */}
            <div className="bg-[#0c1428] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-bold text-slate-100 font-mono flex items-center gap-2">
                <span>&gt; DIRECT_CHANNELS</span>
              </h3>

              <div className="space-y-4">
                {/* Email Item */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-800 flex items-center justify-center text-cyan-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-slate-400">EMAIL</div>
                      <a
                        href={`mailto:${PERSONAL_INFO.email}`}
                        className="text-xs sm:text-sm font-semibold text-slate-200 hover:text-cyan-400 transition-colors"
                      >
                        {PERSONAL_INFO.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 transition-all cursor-pointer text-xs flex items-center gap-1"
                    title="Copy Email"
                  >
                    {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* LinkedIn Item */}
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-950/80 border border-blue-800 flex items-center justify-center text-blue-400">
                      <LinkedinIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-slate-400">LINKEDIN</div>
                      <div className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors">
                        in/ulinnuha-alkindi-67ba11299
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </a>

                {/* Location Item */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="w-9 h-9 rounded-lg bg-emerald-950/80 border border-emerald-800 flex items-center justify-center text-emerald-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400">LOCATION</div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-200">
                      {PERSONAL_INFO.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* CV Download button */}
              <div className="pt-2">
                <a
                  href="./Profile.pdf"
                  download="CV_Ulinnuha_Alkindi.pdf"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold text-xs font-mono shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>{lang === 'en' ? 'DOWNLOAD COMPLETE CV (PDF)' : 'UNDUH CV LENGKAP (PDF)'}</span>
                </a>
              </div>

            </div>

          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-[#0c1428] border border-slate-800 rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-bold text-slate-100 font-mono mb-6 flex items-center gap-2">
                <span>&gt; TRANSMIT_MESSAGE</span>
                <span className="text-xs text-slate-500 font-normal">
                  {lang === 'en' ? '(Direct to inbox)' : '(Langsung ke email)'}
                </span>
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-slate-400">{lang === 'en' ? 'YOUR NAME' : 'NAMA ANDA'}</label>
                    <input
                      type="text"
                      required
                      placeholder={lang === 'en' ? 'e.g. John Doe' : 'Contoh: Budi Santoso'}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#080d1a] border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-400">{lang === 'en' ? 'YOUR EMAIL' : 'EMAIL ANDA'}</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. contact@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#080d1a] border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-400">{lang === 'en' ? 'SUBJECT' : 'SUBJEK / PERIHAL'}</label>
                  <input
                    type="text"
                    required
                    placeholder={
                      lang === 'en'
                        ? 'e.g. Industrial IoT Project Opportunity / Collaboration'
                        : 'Contoh: Diskusi Proyek IoT Industri / Tawaran Magang & Karir'
                    }
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#080d1a] border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-400">{lang === 'en' ? 'MESSAGE' : 'PESAN'}</label>
                  <textarea
                    rows={5}
                    required
                    placeholder={
                      lang === 'en'
                        ? 'Describe your project, timeline, or engineering inquiry...'
                        : 'Tuliskan detail proyek, ruang lingkup, atau pertanyaan Anda...'
                    }
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#080d1a] border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold tracking-wider hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
                >
                  <Send className="w-4 h-4" />
                  <span>{lang === 'en' ? 'TRANSMIT INQUIRY' : 'KIRIM PESAN SEKARANG'}</span>
                </button>

                {submitted && (
                  <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>
                      {lang === 'en'
                        ? 'Mail application opened. You can also directly reach out at alkindirosyadi@gmail.com!'
                        : 'Aplikasi email terbuka. Anda juga dapat langsung mengirim ke alkindirosyadi@gmail.com!'}
                    </span>
                  </div>
                )}
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

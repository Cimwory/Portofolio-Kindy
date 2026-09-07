import React, { useState, useEffect } from 'react';
import { Cpu, Globe, Menu, X, FileText, ChevronRight } from 'lucide-react';
import { Language } from '../types';
import { PERSONAL_INFO } from '../data/content';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, onToggleLang }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#experience', label: lang === 'en' ? 'Experience' : 'Pengalaman' },
    { href: '#skills', label: lang === 'en' ? 'Skills' : 'Keahlian' },
    { href: '#projects', label: lang === 'en' ? 'Projects' : 'Proyek' },
    { href: '#simulator', label: lang === 'en' ? 'IoT Telemetry' : 'Simulasi IoT' },
    { href: '#education', label: lang === 'en' ? 'Education' : 'Pendidikan' },
    { href: '#contact', label: lang === 'en' ? 'Contact' : 'Kontak' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#070b12]/90 backdrop-blur-md border-b border-cyan-950/60 shadow-lg shadow-black/40 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="font-display text-sm tracking-tight font-bold text-slate-100 flex items-center gap-1.5">
              <span>ULINNUHA</span>
              <span className="text-cyan-400">ALKINDI</span>
            </div>
            <div className="font-mono text-[9px] text-emerald-400 flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>EMBEDDED & IoT // PENS</span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-[#080d19]/80 border border-white/[0.08] rounded-full px-3 py-1.5 backdrop-blur-md shadow-xl">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => {
                window.location.hash = item.href;
                window.dispatchEvent(new HashChangeEvent('hashchange'));
              }}
              className="text-[11px] font-mono font-medium text-slate-300 hover:text-cyan-300 px-3 py-1.5 rounded-full hover:bg-cyan-950/40 transition-all"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Controls (Lang Toggle + Resume) */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Language Switcher */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold rounded-lg bg-slate-900/80 border border-slate-700 hover:border-cyan-500/50 text-slate-200 hover:text-cyan-400 transition-all cursor-pointer"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span className={lang === 'en' ? 'text-cyan-400 font-bold' : 'text-slate-500'}>EN</span>
            <span className="text-slate-600">/</span>
            <span className={lang === 'id' ? 'text-cyan-400 font-bold' : 'text-slate-500'}>ID</span>
          </button>

          {/* Download CV */}
          <a
            href="./Profile.pdf"
            download="CV_Ulinnuha_Alkindi.pdf"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all font-mono"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Download CV' : 'Unduh CV'}</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onToggleLang}
            className="px-2.5 py-1 text-xs font-mono rounded bg-slate-900 border border-slate-700 text-cyan-400 font-bold"
          >
            {lang.toUpperCase()}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-cyan-400 rounded-lg bg-slate-900 border border-slate-800"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0f1d] border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 mt-2">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => {
                setMobileMenuOpen(false);
                window.location.hash = item.href;
                window.dispatchEvent(new HashChangeEvent('hashchange'));
              }}
              className="flex items-center justify-between py-2 text-sm text-slate-300 hover:text-cyan-400 border-b border-slate-900"
            >
              <span>{item.label}</span>
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </a>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <a
              href="./Profile.pdf"
              download="CV_Ulinnuha_Alkindi.pdf"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-sm"
            >
              <FileText className="w-4 h-4" />
              <span>{lang === 'en' ? 'Download CV (PDF)' : 'Unduh CV (PDF)'}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

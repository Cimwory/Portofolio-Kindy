import React from 'react';
import { Language } from '../../types';
import { PERSONAL_INFO } from '../../data/content';
import { CountUp } from './CountUp';
import { ChevronRight, Download } from 'lucide-react';

interface DissectedHeroStageProps {
  lang: Language;
  isActive: boolean;
  onDissectClick: () => void;
}

export const DissectedHeroStage: React.FC<DissectedHeroStageProps> = ({
  lang,
  isActive,
  onDissectClick,
}) => {
  return (
    <div
      className={`absolute inset-0 flex items-center transition-all duration-700 pointer-events-auto ${
        isActive
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 -translate-y-8 scale-95 pointer-events-none'
      }`}
    >
      <div className="max-w-xl space-y-4 sm:space-y-5">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#091122]/90 border border-cyan-500/40 text-cyan-300 text-xs font-mono backdrop-blur-md shadow-lg shadow-cyan-950/40">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{PERSONAL_INFO.status[lang]}</span>
        </div>

        {/* Name & Title */}
        <div className="space-y-1">
          <div className="font-mono text-cyan-400 text-xs font-bold tracking-widest uppercase">
            &lt;SYSTEM_CORE // ESP32 DUAL-CORE HARDWARE&gt;
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-100 tracking-tight leading-none">
            ULINNUHA{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              ALKINDI
            </span>
          </h1>
          <p className="text-base sm:text-lg font-semibold text-slate-300 font-mono pt-1 flex items-center gap-2">
            <span>{PERSONAL_INFO.title[lang]}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-400">
              PENS
            </span>
          </p>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg">
          {lang === 'en'
            ? 'Computer Engineering undergraduate at EEPIS (PENS). Currently architecting industrial wastewater telemetry, Modbus/MQTT protocols, and sensor acquisition nodes at PT Petrokimia Gresik.'
            : 'Mahasiswa Teknik Komputer PENS. Mengembangkan telemetri pemantauan kualitas air limbah industri, protokol Modbus/MQTT, dan integrasi sensor di PT Petrokimia Gresik.'}
        </p>

        {/* 4 Core Competency Stats with CountUp */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          <div className="p-2 sm:p-2.5 rounded-xl bg-[#091224]/80 border border-slate-800 font-mono">
            <div className="text-base sm:text-lg font-black text-cyan-400">
              <CountUp to={9} suffix="+ Mos" />
            </div>
            <div className="text-[10px] text-slate-400">{lang === 'en' ? 'Field Exp' : 'Pengalaman'}</div>
          </div>
          <div className="p-2 sm:p-2.5 rounded-xl bg-[#091224]/80 border border-slate-800 font-mono">
            <div className="text-base sm:text-lg font-black text-emerald-400">
              <CountUp to={4} suffix="+" />
            </div>
            <div className="text-[10px] text-slate-400">{lang === 'en' ? 'Hardware Arch' : 'Arsitektur'}</div>
          </div>
          <div className="p-2 sm:p-2.5 rounded-xl bg-[#091224]/80 border border-slate-800 font-mono">
            <div className="text-base sm:text-lg font-black text-teal-300">
              <CountUp to={100} suffix="%" />
            </div>
            <div className="text-[10px] text-slate-400">{lang === 'en' ? 'Telemetry RT' : 'Real-Time'}</div>
          </div>
          <div className="p-2 sm:p-2.5 rounded-xl bg-[#091224]/80 border border-slate-800 font-mono">
            <div className="text-base sm:text-lg font-black text-amber-400">
              <CountUp to={3} suffix="+" />
            </div>
            <div className="text-[10px] text-slate-400">{lang === 'en' ? 'Industrial Sys' : 'Sistem Pabrik'}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center gap-3 font-mono text-xs">
          <button
            onClick={onDissectClick}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold tracking-wider hover:opacity-95 shadow-lg shadow-cyan-500/25 cursor-pointer"
          >
            <span>{lang === 'en' ? 'DISSECT HARDWARE' : 'BEDAH HARDWARE CHIP'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <a
            href="./Profile.pdf"
            download="CV_Ulinnuha_Alkindi.pdf"
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#0b1426]/80 border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>CV (PDF)</span>
          </a>
        </div>

        {/* Prompt */}
        <div className="pt-2 flex items-center gap-2 text-xs font-mono text-slate-500">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>
            {lang === 'en'
              ? 'Scroll down to dissect the chip and reveal portfolio'
              : 'Scroll ke bawah untuk membedah chip dan melihat portofolio'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DissectedHeroStage;

import React from 'react';
import { Terminal, Layers, Activity, Briefcase, Cpu, Mail, GraduationCap } from 'lucide-react';
import { Language } from '../../types';

interface ScrollytellingNavProps {
  currentStage: number;
  progress: number;
  onSelectStage: (stageIndex: number) => void;
  lang: Language;
}

export const STAGES = [
  { id: 'hero', label: { en: '01 IDENTITY', id: '01 IDENTITAS' }, icon: Terminal, layer: 'SURF' },
  { id: 'experience', label: { en: '02 EXPERIENCE', id: '02 PENGALAMAN' }, icon: Briefcase, layer: 'L-01' },
  { id: 'skills', label: { en: '03 SKILLS', id: '03 KEAHLIAN' }, icon: Cpu, layer: 'L-02' },
  { id: 'projects', label: { en: '04 PROJECTS', id: '04 PROYEK' }, icon: Layers, layer: 'L-03' },
  { id: 'telemetry', label: { en: '05 SCADA LAB', id: '05 LAB SCADA' }, icon: Activity, layer: 'L-04' },
  { id: 'education', label: { en: '06 EDUCATION', id: '06 PENDIDIKAN' }, icon: GraduationCap, layer: 'L-05' },
  { id: 'contact', label: { en: '07 CONTACT', id: '07 KONTAK' }, icon: Mail, layer: 'L-06' },
];

export const ScrollytellingNav: React.FC<ScrollytellingNavProps> = ({
  currentStage,
  progress,
  onSelectStage,
  lang,
}) => {
  return (
    <aside
      className="hidden xl:flex fixed right-4 2xl:right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-2 pointer-events-auto select-none"
      aria-label="Hardware Dissection Timeline Navigation"
    >
      {/* Header Pill */}
      <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1.5 bg-[#080d19]/90 border border-slate-800/90 px-2.5 py-1 rounded-full backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        <span>DISSECTION // {Math.round(progress * 100)}%</span>
      </div>

      {/* Navigation Buttons Container */}
      <div className="flex flex-col gap-1 bg-[#070c17]/95 border border-cyan-950/80 backdrop-blur-xl p-1.5 rounded-xl shadow-2xl w-44">
        {STAGES.map((stage, idx) => {
          const isActive = currentStage === idx;
          const Icon = stage.icon;

          return (
            <button
              key={stage.id}
              onClick={() => onSelectStage(idx)}
              className={`flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 group cursor-pointer ${
                isActive
                  ? 'bg-cyan-950/80 border border-cyan-400/80 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-1.5 truncate">
                <span
                  className={`text-[8px] px-1 py-0.2 rounded font-bold ${
                    isActive ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {stage.layer}
                </span>
                <span
                  className={`text-[10px] font-bold truncate ${
                    isActive ? 'text-cyan-300 font-extrabold' : 'text-slate-400'
                  }`}
                >
                  {stage.label[lang]}
                </span>
              </div>
              <div
                className={`w-5 h-5 rounded flex items-center justify-center shrink-0 transition-all ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-800/80 text-slate-400 group-hover:text-cyan-300'
                }`}
              >
                <Icon className="w-3 h-3" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Progress Track Line */}
      <div className="w-44 h-1 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 transition-all duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </aside>
  );
};

export default ScrollytellingNav;

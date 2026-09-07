import React, { useState } from 'react';
import { Language } from '../../types';
import { PROJECTS } from '../../data/content';
import { SpotlightCard } from './SpotlightCard';
import { DecryptedText } from './DecryptedText';
import { Layers, Check } from 'lucide-react';

interface DissectedProjectsStageProps {
  lang: Language;
  isActive: boolean;
}

const PROJECT_PILL_LABELS = [
  { en: '01. WWTP IoT', id: '01. WWTP IoT' },
  { en: '02. Plant Factory', id: '02. Pabrik Tanaman' },
  { en: '03. Biometric Absen', id: '03. Presensi Absen' },
  { en: '04. Warehouse', id: '04. IoT Gudang' },
  { en: '05. Smart Home', id: '05. Smart Home' },
  { en: '06. Vision AI', id: '06. Visi AI' },
];

export const DissectedProjectsStage: React.FC<DissectedProjectsStageProps> = ({
  lang,
  isActive,
}) => {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const currentProject = PROJECTS[activeProjectIdx] || PROJECTS[0];

  return (
    <div
      className={`absolute inset-0 flex items-center justify-between transition-all duration-700 pointer-events-auto ${
        isActive
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
      }`}
    >
      <div className="w-full lg:w-[38rem] space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-mono">
            <Layers className="w-3.5 h-3.5" />
            <DecryptedText text="DISSECTED LAYER 03 // 38 GOLD PIN TERMINALS" speed={35} />
          </div>
          <span className="text-xs font-mono text-slate-400">
            {activeProjectIdx + 1} / {PROJECTS.length}
          </span>
        </div>

        {/* Project Selector Pills - 2 rows x 3 cols */}
        <div className="grid grid-cols-3 gap-1.5 font-mono text-xs">
          {PROJECTS.map((p, idx) => {
            const pillLabel = PROJECT_PILL_LABELS[idx]
              ? PROJECT_PILL_LABELS[idx][lang]
              : `${idx + 1}. ${p.id}`;
            return (
              <button
                key={p.id}
                onClick={() => setActiveProjectIdx(idx)}
                className={`px-2 py-1.5 rounded-lg text-center transition-all cursor-pointer text-[11px] leading-tight truncate ${
                  activeProjectIdx === idx
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/25 ring-1 ring-cyan-300'
                    : 'bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
                title={p.title[lang]}
              >
                {pillLabel}
              </button>
            );
          })}
        </div>

        {/* Featured Project Complete Card */}
        <SpotlightCard
          chipLabel={`LAYER_03 // PIN_NODE_${activeProjectIdx + 1}`}
          spotlightColor="rgba(6, 182, 212, 0.25)"
          borderColor="rgba(6, 182, 212, 0.45)"
          className="p-4 sm:p-5 backdrop-blur-xl bg-[#081020]/90 space-y-2.5 shadow-2xl"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-0.5 min-w-0">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/90 border border-cyan-800 text-cyan-300">
                {currentProject.period}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-100 pt-1 leading-snug truncate">
                {currentProject.title[lang]}
              </h3>
              <div className="text-xs text-emerald-400 font-mono truncate">{currentProject.subtitle[lang]}</div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 uppercase shrink-0">
              {currentProject.category}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 sm:line-clamp-none">
            {currentProject.description[lang]}
          </p>

          {/* Key Features */}
          <div className="space-y-1 text-xs">
            <div className="text-[10px] font-mono text-slate-400 font-bold uppercase">
              {lang === 'en' ? 'ENGINEERING HIGHLIGHTS:' : 'FITUR REKAYASA SISTEM:'}
            </div>
            {currentProject.keyFeatures[lang].slice(0, 4).map((f, idx) => (
              <div key={idx} className="flex items-start gap-2 text-slate-300 text-[11px] leading-relaxed">
                <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>{f}</span>
              </div>
            ))}
          </div>

          {/* 3 Live Performance Metrics */}
          {currentProject.metrics && (
            <div className="grid grid-cols-3 gap-2 pt-1 font-mono border-t border-slate-800/80">
              {currentProject.metrics.map((m, idx) => (
                <div key={idx} className="p-1.5 sm:p-2 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
                  <div className="text-xs sm:text-sm font-bold text-cyan-400">{m.value}</div>
                  <div className="text-[9px] text-slate-400 truncate">{m.label[lang]}</div>
                </div>
              ))}
            </div>
          )}

          {/* Hardware & Protocols Inventory */}
          <div className="flex flex-wrap gap-1 pt-0.5 max-h-12 overflow-hidden">
            {currentProject.hardware.concat(currentProject.protocols).map((t, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-900 border border-slate-800 text-slate-300"
              >
                {t}
              </span>
            ))}
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
};

export default DissectedProjectsStage;

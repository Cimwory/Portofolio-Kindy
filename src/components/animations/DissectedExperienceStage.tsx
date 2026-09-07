import React, { useState } from 'react';
import { Language } from '../../types';
import { EXPERIENCES } from '../../data/content';
import { SpotlightCard } from './SpotlightCard';
import { DecryptedText } from './DecryptedText';
import { Shield, Briefcase, CheckCircle2, Factory, Users, Award } from 'lucide-react';

interface DissectedExperienceStageProps {
  lang: Language;
  isActive: boolean;
}

const EXP_TAB_LABELS = [
  { en: '01. Industry · Petrokimia', id: '01. Industri · Petrokimia' },
  { en: '02. Org · HMCE PENS', id: '02. Organisasi · HMCE PENS' },
  { en: '03. Bootcamp · Samsung', id: '03. Bootcamp · Samsung' },
];

export const DissectedExperienceStage: React.FC<DissectedExperienceStageProps> = ({
  lang,
  isActive,
}) => {
  const [activeExpIdx, setActiveExpIdx] = useState(0);
  const currentExp = EXPERIENCES[activeExpIdx] || EXPERIENCES[0];

  const getTrackIcon = (type: string) => {
    switch (type) {
      case 'internship':
        return <Factory className="w-3.5 h-3.5 text-emerald-400" />;
      case 'organization':
        return <Users className="w-3.5 h-3.5 text-indigo-400" />;
      case 'training':
      default:
        return <Award className="w-3.5 h-3.5 text-amber-400" />;
    }
  };

  const getTrackColors = (type: string) => {
    switch (type) {
      case 'internship':
        return {
          pill: 'bg-emerald-950/90 border-emerald-500/50 text-emerald-300',
          badge: 'bg-emerald-950/90 text-emerald-300 border-emerald-500/60 shadow-[0_0_10px_rgba(16,185,129,0.25)]',
          roleColor: 'text-emerald-400',
          spotlight: 'rgba(16, 185, 129, 0.25)',
          border: 'rgba(16, 185, 129, 0.45)',
          chipLabel: 'LAYER_01 // INDUSTRIAL_TRACK',
        };
      case 'organization':
        return {
          pill: 'bg-indigo-950/90 border-indigo-500/50 text-indigo-300',
          badge: 'bg-indigo-950/90 text-indigo-300 border-indigo-500/60 shadow-[0_0_10px_rgba(99,102,241,0.25)]',
          roleColor: 'text-indigo-400',
          spotlight: 'rgba(99, 102, 241, 0.25)',
          border: 'rgba(99, 102, 241, 0.45)',
          chipLabel: 'LAYER_01 // LEADERSHIP_TRACK',
        };
      case 'training':
      default:
        return {
          pill: 'bg-amber-950/90 border-amber-500/50 text-amber-300',
          badge: 'bg-amber-950/90 text-amber-300 border-amber-500/60 shadow-[0_0_10px_rgba(245,158,11,0.25)]',
          roleColor: 'text-amber-400',
          spotlight: 'rgba(245, 158, 11, 0.25)',
          border: 'rgba(245, 158, 11, 0.45)',
          chipLabel: 'LAYER_01 // BOOTCAMP_TRACK',
        };
    }
  };

  const currentColors = getTrackColors(currentExp.type);

  return (
    <div
      className={`absolute inset-0 flex items-center justify-between transition-all duration-700 pointer-events-auto ${
        isActive
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
      }`}
    >
      {/* Left HUD Callout: Metal RF Shield Physical Function */}
      <div className="hidden lg:block w-72 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-mono">
          <Shield className="w-3.5 h-3.5" />
          <DecryptedText text="DISSECTED LAYER 01" speed={35} />
        </div>

        <SpotlightCard
          chipLabel="SHIELD // EMI_GUARD"
          spotlightColor="rgba(6, 182, 212, 0.2)"
          borderColor="rgba(6, 182, 212, 0.4)"
          className="p-4 backdrop-blur-md bg-[#091122]/85 space-y-2 font-mono text-xs"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 text-cyan-400 font-bold">
            <span>LIFTED RF SHIELD</span>
            <span className="text-[10px] text-emerald-400">+1.45u LIFT</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
            {lang === 'en'
              ? 'Custom metallic enclosure protecting low-voltage analog sensor signals from harsh petrochemical factory EMI and electric motor fields.'
              : 'Pelindung logam untuk meredam interferensi elektromagnetik mesin pabrik kimia terhadap pembacaan sensor analog bertegangan rendah.'}
          </p>
          <div className="pt-1 text-[10px] text-slate-400 border-t border-slate-800 flex justify-between">
            <span>THERMAL PAD: SILICON</span>
            <span className="text-cyan-300 font-bold">DETACHED</span>
          </div>
        </SpotlightCard>
      </div>

      {/* Right Portfolio Showcase: 3 Distinct Experience Tracks */}
      <div className="w-full lg:w-[28rem] xl:w-[32rem] space-y-2.5 lg:ml-auto">
        <div className="flex items-center justify-between">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono transition-all ${currentColors.pill}`}
          >
            {getTrackIcon(currentExp.type)}
            <DecryptedText
              key={currentExp.id}
              text={currentExp.categoryLabel[lang].toUpperCase()}
              speed={35}
            />
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            {activeExpIdx + 1} / {EXPERIENCES.length}
          </span>
        </div>

        {/* Experience Switcher Tabs with Category Indicators */}
        <div className="grid grid-cols-3 gap-1.5 font-mono text-xs">
          {EXPERIENCES.map((exp, idx) => (
            <button
              key={exp.id}
              onClick={() => setActiveExpIdx(idx)}
              className={`px-2 py-1.5 rounded-lg transition-all cursor-pointer text-center text-[11px] leading-tight truncate ${
                activeExpIdx === idx
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30 ring-1 ring-cyan-300'
                  : 'bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
              title={`${exp.categoryLabel[lang]} — ${exp.company}`}
            >
              {EXP_TAB_LABELS[idx] ? EXP_TAB_LABELS[idx][lang] : `${idx + 1}. ${exp.company}`}
            </button>
          ))}
        </div>

        {/* Detailed Active Experience Card */}
        <SpotlightCard
          chipLabel={currentColors.chipLabel}
          spotlightColor={currentColors.spotlight}
          borderColor={currentColors.border}
          className="p-4 sm:p-5 backdrop-blur-xl bg-[#081020]/90 space-y-3 shadow-2xl"
        >
          {/* Header Tag Bar with Distinct Track Badge */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${currentColors.badge}`}
              >
                {getTrackIcon(currentExp.type)}
                <span>{currentExp.categoryLabel[lang]}</span>
              </span>
              {currentExp.type === 'internship' && (
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-700 text-cyan-300">
                  CURRENT
                </span>
              )}
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
              {currentExp.period[lang]}
            </span>
          </div>

          {/* Title Header: Company & Role */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-100 leading-snug">
              {currentExp.company}
            </h3>
            <div className={`text-xs font-mono font-semibold pt-0.5 ${currentColors.roleColor}`}>
              {currentExp.role[lang]}
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {currentExp.description[lang]}
          </p>

          {/* Key Achievements */}
          <div className="space-y-1 pt-0.5">
            <div className="text-[10px] font-mono text-slate-400 font-bold tracking-wider uppercase">
              {lang === 'en' ? 'KEY RESPONSIBILITIES & CONTRIBUTIONS:' : 'KONTRIBUSI & PENCAPAIAN UTAMA:'}
            </div>
            {currentExp.achievements[lang].map((ach, idx) => (
              <div key={idx} className="flex items-start gap-2 text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{ach}</span>
              </div>
            ))}
          </div>

          {/* Skills tags */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
            {currentExp.skills.map((s, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-900 border border-slate-800 text-cyan-300"
              >
                {s}
              </span>
            ))}
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
};

export default DissectedExperienceStage;

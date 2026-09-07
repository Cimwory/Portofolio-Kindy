import React from 'react';
import { Language } from '../../types';
import { EDUCATION } from '../../data/content';
import { SpotlightCard } from './SpotlightCard';
import { DecryptedText } from './DecryptedText';
import { GraduationCap } from 'lucide-react';

interface DissectedEducationStageProps {
  lang: Language;
  isActive: boolean;
}

export const DissectedEducationStage: React.FC<DissectedEducationStageProps> = ({
  lang,
  isActive,
}) => {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-between transition-all duration-700 pointer-events-auto ${
        isActive
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
      }`}
    >
      <div className="w-full lg:w-[36rem] space-y-3.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-mono">
          <GraduationCap className="w-3.5 h-3.5" />
          <DecryptedText text="DISSECTED LAYER 05 // PCB SUBSTRATE & EDUCATION" speed={35} />
        </div>

        <div className="space-y-2.5 font-mono">
          {EDUCATION.map((edu, idx) => (
            <SpotlightCard
              key={idx}
              chipLabel={`LAYER_05 // EDU_TRACE_${idx + 1}`}
              spotlightColor="rgba(6, 182, 212, 0.2)"
              borderColor="rgba(6, 182, 212, 0.4)"
              className="p-4 sm:p-5 backdrop-blur-xl bg-[#081020]/90 space-y-1.5 shadow-2xl"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[11px] text-cyan-400 font-bold">{edu.badge}</div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-100">{edu.institution}</h3>
                  <div className="text-xs text-emerald-400 font-semibold">{edu.degree[lang]}</div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                  {edu.period}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed pt-1">
                {edu.description[lang]}
              </p>
            </SpotlightCard>
          ))}
        </div>

        {/* Engineering Philosophy Badge */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 font-sans leading-relaxed">
          <span className="text-cyan-400 font-mono font-bold">
            {lang === 'en' ? 'ENGINEERING PHILOSOPHY: ' : 'FILOSOFI REKAYASA: '}
          </span>
          {lang === 'en'
            ? 'Bridging physical sensor physics with fail-safe industrial microcontrollers and low-latency cloud infrastructure.'
            : 'Menghubungkan fisika sensor lapangan dengan mikrokontroler industri yang fail-safe serta arsitektur cloud berlatensi rendah.'}
        </div>
      </div>
    </div>
  );
};

export default DissectedEducationStage;

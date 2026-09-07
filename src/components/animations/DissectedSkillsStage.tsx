import React, { useState } from 'react';
import { Language } from '../../types';
import { SKILL_CATEGORIES } from '../../data/content';
import { SpotlightCard } from './SpotlightCard';
import { DecryptedText } from './DecryptedText';
import { Cpu } from 'lucide-react';

interface DissectedSkillsStageProps {
  lang: Language;
  isActive: boolean;
}

export const DissectedSkillsStage: React.FC<DissectedSkillsStageProps> = ({
  lang,
  isActive,
}) => {
  const [activeSkillCatIdx, setActiveSkillCatIdx] = useState(0);
  const currentSkillCat = SKILL_CATEGORIES[activeSkillCatIdx] || SKILL_CATEGORIES[0];

  return (
    <div
      className={`absolute inset-0 flex items-center justify-between transition-all duration-700 pointer-events-auto ${
        isActive
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
      }`}
    >
      {/* Left Skills Category Selector & Active Skills List */}
      <div className="w-full lg:w-[32rem] space-y-3">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-mono">
            <Cpu className="w-3.5 h-3.5" />
            <DecryptedText text="DISSECTED LAYER 02 // SILICON DIE" speed={35} />
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold">XTENSA 240MHz</span>
        </div>

        {/* Category Selector Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 font-mono text-xs">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSkillCatIdx(idx)}
              className={`px-2 py-1.5 rounded-lg text-center transition-all cursor-pointer text-[11px] leading-tight ${
                activeSkillCatIdx === idx
                  ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {idx === 0 ? 'Embedded' : idx === 1 ? 'Protocols' : idx === 2 ? 'Sensors' : 'Software'}
            </button>
          ))}
        </div>

        {/* Active Category Skills List */}
        <SpotlightCard
          chipLabel="LAYER_02 // XTENSA_DIE"
          spotlightColor="rgba(6, 182, 212, 0.25)"
          borderColor="rgba(6, 182, 212, 0.45)"
          className="p-4 sm:p-5 backdrop-blur-xl bg-[#081020]/90 space-y-3 shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs sm:text-sm font-bold text-slate-100 font-mono">
              {currentSkillCat.title[lang]}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-cyan-400 border border-slate-800">
              {currentSkillCat.skills.length} Technical Modules
            </span>
          </div>

          <div className="space-y-2.5">
            {currentSkillCat.skills.map((skill, idx) => (
              <div key={idx} className="space-y-1 font-mono">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-200 font-semibold">{skill.name}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                      skill.level === 'Expert'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : skill.level === 'Advanced'
                        ? 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {skill.level}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {skill.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] px-1.5 py-0.2 rounded bg-slate-900 border border-slate-800 text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SpotlightCard>
      </div>

      {/* Right HUD Callout: Dual-Core RTOS Mapping */}
      <div className="hidden lg:block w-64 xl:w-72 space-y-3 ml-auto">
        <SpotlightCard
          chipLabel="CORE_MAPPING // RTOS"
          spotlightColor="rgba(16, 185, 129, 0.2)"
          borderColor="rgba(16, 185, 129, 0.4)"
          className="p-4 backdrop-blur-md bg-[#091122]/85 space-y-3 font-mono text-xs"
        >
          <div className="text-emerald-400 font-bold border-b border-slate-800 pb-1.5 flex justify-between">
            <span>DUAL-CORE RTOS</span>
            <span className="text-cyan-400">520KB SRAM</span>
          </div>
          <div className="p-2 rounded bg-slate-900/90 border border-slate-800 text-[11px] space-y-1">
            <span className="text-cyan-400 font-bold">CORE 0:</span>
            <p className="text-slate-300 font-sans">
              Dedicated ADC sampling, digital Kalman/moving-average filtering, Modbus RTU polling.
            </p>
          </div>
          <div className="p-2 rounded bg-slate-900/90 border border-slate-800 text-[11px] space-y-1">
            <span className="text-emerald-400 font-bold">CORE 1:</span>
            <p className="text-slate-300 font-sans">
              FreeRTOS task scheduler, MQTT-TLS payload transmission, offline SPIFFS flash logging.
            </p>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
};

export default DissectedSkillsStage;

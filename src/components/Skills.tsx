import React from 'react';
import { Cpu, Network, Activity, Code, Layers, Wrench, Shield, CheckCircle } from 'lucide-react';
import { Language } from '../types';
import { SKILL_CATEGORIES } from '../data/content';
import { SpotlightCard } from './animations/SpotlightCard';
import { ScrollReveal } from './animations/ScrollReveal';
import { DecryptedText } from './animations/DecryptedText';
import { ShinyText } from './animations/ShinyText';

interface SkillsProps {
  lang: Language;
}

export const Skills: React.FC<SkillsProps> = ({ lang }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-cyan-400" />;
      case 'Network':
        return <Network className="w-5 h-5 text-teal-400" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-emerald-400" />;
      case 'Code':
        return <Code className="w-5 h-5 text-sky-400" />;
      default:
        return <Cpu className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="skills" className="py-24 bg-[#070b14]/75 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 text-xs font-mono">
            <Wrench className="w-3.5 h-3.5" />
            <DecryptedText
              text={lang === 'en' ? 'TECHNICAL ARSENAL' : 'KOMPETENSI & KEAHLIAN TEKNIS'}
              speed={35}
              animateOn="view"
            />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            <ShinyText
              text={lang === 'en' ? 'Hardware, Protocol & Software Mastery' : 'Keahlian Sistem Tertanam, Protokol & Perangkat Lunak'}
              shineColor="#38bdf8"
              speed={4}
            />
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {lang === 'en'
              ? 'Comprehensive technical capabilities spanning bare-metal embedded programming, industrial networking, analog signal conditioning, and full telemetry pipelines.'
              : 'Kemampuan teknis terpadu dari pemrograman bare-metal mikrokontroler, jaringan industri, pengkondisian sinyal analog, hingga arsitektur telemetri terintegrasi.'}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SKILL_CATEGORIES.map((category, idx) => (
            <ScrollReveal key={idx} delay={idx * 120} distance={25}>
              <SpotlightCard
                spotlightColor="rgba(6, 182, 212, 0.2)"
                borderColor="rgba(6, 182, 212, 0.35)"
                className="p-6 sm:p-8 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all h-full"
              >
                {/* Category Header */}
              <div className="flex items-center gap-3 pb-5 border-b border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center">
                  {getIcon(category.iconName)}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-100">
                    {category.title[lang]}
                  </h3>
                  <span className="text-[11px] font-mono text-slate-500">
                    Core Technical Domain #{idx + 1}
                  </span>
                </div>
              </div>

              {/* Skills List */}
              <div className="mt-6 space-y-4">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="bg-[#080d1c] p-3.5 rounded-xl border border-slate-800/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-slate-200">
                        {skill.name}
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                        {skill.level}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {skill.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Industrial Standards Banner */}
        <div className="mt-12 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-emerald-950/40 border border-cyan-900/50 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg font-bold text-slate-100 flex items-center justify-center md:justify-start gap-2">
              <Shield className="w-5 h-5 text-cyan-400" />
              <span>{lang === 'en' ? 'Industrial Quality & Reliability Standard' : 'Standar Kualitas & Reliabilitas Industri'}</span>
            </h4>
            <p className="text-xs text-slate-400 max-w-2xl">
              {lang === 'en'
                ? 'Firmware written with watchdogs, non-blocking asynchronous state machines, CRC checksum verification, and hardware transient suppression (ESD/EMI protection) for high-noise plant floors.'
                : 'Firmware dirancang dengan pengawas watchdog, non-blocking asynchronous state machine, verifikasi checksum CRC, serta proteksi transien interferensi elektromagnetik untuk lingkungan pabrik yang keras.'}
            </p>
          </div>
          <div className="flex-shrink-0">
            <span className="font-mono text-xs px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-bold">
              Production Tested
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

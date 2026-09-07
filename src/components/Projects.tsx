import React, { useState } from 'react';
import { Cpu, Layers, ExternalLink, Activity, Radio, GitBranch, Check, HardDrive } from 'lucide-react';
import { Language, ProjectItem } from '../types';
import { PROJECTS } from '../data/content';
import { SpotlightCard } from './animations/SpotlightCard';
import { ScrollReveal } from './animations/ScrollReveal';
import { DecryptedText } from './animations/DecryptedText';
import { ShinyText } from './animations/ShinyText';

interface ProjectsProps {
  lang: Language;
}

export const Projects: React.FC<ProjectsProps> = ({ lang }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories = [
    { id: 'all', label: lang === 'en' ? 'All Projects' : 'Semua Proyek' },
    { id: 'industrial', label: lang === 'en' ? 'Industrial IoT' : 'IoT Industri' },
    { id: 'agriculture', label: lang === 'en' ? 'Smart Agrotech' : 'Agroteknologi' },
    { id: 'automation', label: lang === 'en' ? 'Automation & Edge' : 'Otomasi & Edge' },
    { id: 'embedded', label: lang === 'en' ? 'Embedded Systems' : 'Sistem Tertanam' },
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 bg-[#080d19]/75 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 text-xs font-mono">
            <Layers className="w-3.5 h-3.5" />
            <DecryptedText
              text={lang === 'en' ? 'ENGINEERING PORTFOLIO' : 'PORTOFOLIO REKAYASA'}
              speed={35}
              animateOn="view"
            />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            <ShinyText
              text={lang === 'en' ? 'Featured IoT & Embedded Projects' : 'Proyek Unggulan IoT & Sistem Tertanam'}
              shineColor="#38bdf8"
              speed={4}
            />
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {lang === 'en'
              ? 'Field-tested hardware prototypes, real-time telemetry architectures, and industrial network integrations.'
              : 'Purwarupa perangkat keras teruji, arsitektur telemetri real-time, dan integrasi jaringan sistem otomasi industri.'}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/30'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <ScrollReveal key={project.id} delay={idx * 120} distance={28}>
              <SpotlightCard
                spotlightColor="rgba(6, 182, 212, 0.22)"
                borderColor="rgba(6, 182, 212, 0.4)"
                className="hover:shadow-[0_0_30px_rgba(6,182,212,0.18)] transition-all duration-300 flex flex-col justify-between h-full group"
              >
                {/* Card Top */}
              <div className="p-6 sm:p-8 space-y-5">
                
                {/* Header Tag Bar */}
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs px-2.5 py-1 rounded bg-cyan-950/70 border border-cyan-800 text-cyan-400 font-semibold uppercase">
                    {project.period}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    <Radio className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{project.protocols[0]}</span>
                  </div>
                </div>

                {/* Titles */}
                <div>
                  <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                    {project.title[lang]}
                  </h3>
                  <p className="text-xs font-mono text-emerald-400 mt-1">
                    {project.subtitle[lang]}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed">
                  {project.description[lang]}
                </p>

                {/* Metrics Badges */}
                {project.metrics && (
                  <div className="grid grid-cols-3 gap-2 py-3 bg-[#080e1c] rounded-xl border border-slate-800/80 px-3">
                    {project.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="text-center">
                        <div className="font-mono font-bold text-cyan-400 text-sm">{m.value}</div>
                        <div className="text-[10px] text-slate-400 truncate font-mono mt-0.5">{m.label[lang]}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Hardware & Protocols Badges */}
                <div className="space-y-2">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    {lang === 'en' ? 'Hardware & Sensors:' : 'Perangkat Keras & Sensor:'}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.hardware.map((hw, hIdx) => (
                      <span
                        key={hIdx}
                        className="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-900 border border-slate-800 text-slate-300"
                      >
                        {hw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    {lang === 'en' ? 'Protocols & Stack:' : 'Protokol & Stack:'}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.protocols.concat(project.techStack).map((item, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 text-[11px] font-mono rounded bg-cyan-950/40 border border-cyan-900/60 text-cyan-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Card Footer Actions */}
              <div className="px-6 sm:px-8 py-4 bg-[#080e1e] border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  <span>{lang === 'en' ? 'View Technical Specs' : 'Detail Spesifikasi Teknis'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                <span className="text-[11px] font-mono text-slate-500">
                  EEPIS Embedded Lab
                </span>
              </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>

      </div>

      {/* Detail Specs Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0d162a] border border-cyan-500/40 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono text-cyan-400">{selectedProject.period}</span>
                <h3 className="text-2xl font-bold text-slate-100 mt-1">
                  {selectedProject.title[lang]}
                </h3>
                <p className="text-sm text-emerald-400 font-mono mt-0.5">
                  {selectedProject.subtitle[lang]}
                </p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-slate-400 hover:text-slate-200 p-2 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {selectedProject.description[lang]}
            </p>

            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                {lang === 'en' ? 'Key Architecture & Features' : 'Fitur & Arsitektur Utama'}
              </h4>
              <div className="space-y-2">
                {selectedProject.keyFeatures[lang].map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hardware list */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                {lang === 'en' ? 'Hardware & Sensors Specified' : 'Spesifikasi Komponen & Sensor'}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.hardware.map((hw, idx) => (
                  <span key={idx} className="px-2.5 py-1 text-xs font-mono rounded bg-slate-900 border border-slate-700 text-slate-200">
                    {hw}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs font-mono hover:bg-cyan-400 transition-colors cursor-pointer"
              >
                {lang === 'en' ? 'Close Inspector' : 'Tutup Spesifikasi'}
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

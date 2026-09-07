import React, { useState } from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Award, Factory, Users } from 'lucide-react';
import { Language } from '../types';
import { EXPERIENCES } from '../data/content';
import { SpotlightCard } from './animations/SpotlightCard';
import { ScrollReveal } from './animations/ScrollReveal';
import { DecryptedText } from './animations/DecryptedText';
import { ShinyText } from './animations/ShinyText';

interface ExperienceProps {
  lang: Language;
}

export const Experience: React.FC<ExperienceProps> = ({ lang }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: lang === 'en' ? 'All Tracks' : 'Semua Rekam Jejak', icon: Briefcase },
    { id: 'internship', label: lang === 'en' ? 'Industrial Internship' : 'Magang Industri', icon: Factory },
    { id: 'organization', label: lang === 'en' ? 'Student Organization' : 'Pengalaman Organisasi', icon: Users },
    { id: 'training', label: lang === 'en' ? 'Tech Bootcamp' : 'Bootcamp & Pelatihan', icon: Award },
  ];

  const filteredExperiences =
    activeCategory === 'all'
      ? EXPERIENCES
      : EXPERIENCES.filter((exp) => exp.type === activeCategory);

  const getTrackBadge = (type: string, label: string) => {
    switch (type) {
      case 'internship':
        return (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
            <Factory className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{label}</span>
          </span>
        );
      case 'organization':
        return (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg bg-indigo-950/90 border border-indigo-500/50 text-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.2)]">
            <Users className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span>{label}</span>
          </span>
        );
      case 'training':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg bg-amber-950/90 border border-amber-500/50 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
            <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{label}</span>
          </span>
        );
    }
  };

  return (
    <section id="experience" className="py-24 relative bg-[#070c16]/75">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 text-xs font-mono">
            <Briefcase className="w-3.5 h-3.5" />
            <DecryptedText
              text={lang === 'en' ? 'CAREER, LEADERSHIP & BOOTCAMPS' : 'PENGALAMAN INDUSTRI, ORGANISASI & BOOTCAMP'}
              speed={35}
              animateOn="view"
            />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            <ShinyText
              text={
                lang === 'en'
                  ? 'Industry Internship, Organization & Tech Bootcamps'
                  : 'Magang Industri, Organisasi & Bootcamp Teknologi'
              }
              shineColor="#38bdf8"
              speed={3.5}
            />
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {lang === 'en'
              ? 'Distinguished career journey across industrial petrochemical IoT engineering, departmental student leadership, and high-impact technology training.'
              : 'Rekam jejak terstruktur yang membedakan pengalaman magang industri kimia petrokimia, kepemimpinan organisasi himpunan mahasiswa, serta pelatihan akselerasi teknologi.'}
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/30 ring-1 ring-cyan-300'
                    : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : 'text-cyan-400'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Timeline List */}
        <div className="relative border-l-2 border-slate-800 ml-4 md:ml-32 space-y-12">
          {filteredExperiences.map((exp, idx) => {
            const isLatest = exp.id === 'petrokimia-gresik';

            return (
              <div key={exp.id} className="relative pl-6 md:pl-10 group">
                
                {/* Timeline Pin */}
                <div
                  className={`absolute -left-[9px] top-2 w-4 h-4 rounded-full border-2 transition-all ${
                    isLatest
                      ? 'bg-cyan-400 border-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.8)]'
                      : 'bg-slate-900 border-slate-600 group-hover:border-cyan-400'
                  }`}
                />

                {/* Experience Card */}
                <ScrollReveal delay={idx * 150} distance={30}>
                  <SpotlightCard
                    spotlightColor="rgba(6, 182, 212, 0.2)"
                    borderColor="rgba(6, 182, 212, 0.35)"
                    className="p-6 md:p-8 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all"
                  >
                  
                  {/* Top Bar with Clear Track Distinction */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 pb-4 border-b border-slate-800/80">
                    <div className="space-y-1.5">
                      {/* Prominent Track Badge */}
                      <div className="flex items-center gap-2">
                        {getTrackBadge(exp.type, exp.categoryLabel[lang])}
                        {isLatest && (
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                            CURRENT ROLE
                          </span>
                        )}
                      </div>

                      <div className="pt-1">
                        <h3 className="text-lg sm:text-xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                          {exp.role[lang]}
                        </h3>
                        <div className="text-sm font-semibold text-emerald-400 font-mono mt-0.5">
                          {exp.company}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1 text-xs text-slate-400 font-mono shrink-0">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{exp.period[lang]}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>{exp.location}</span>
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-300 leading-relaxed mt-4 font-normal">
                    {exp.description[lang]}
                  </p>

                  {/* Achievements List */}
                  <div className="mt-5 space-y-2.5">
                    <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                      {lang === 'en' ? 'Key Deliverables & Responsibilities:' : 'Tanggung Jawab & Kontribusi Utama:'}
                    </div>
                    {exp.achievements[lang].map((ach, aIdx) => (
                      <div key={aIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                    {exp.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-900 border border-slate-800 text-slate-300 hover:border-cyan-500/40 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  </SpotlightCard>
                </ScrollReveal>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Experience;

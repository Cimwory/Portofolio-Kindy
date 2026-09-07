import React from 'react';
import { GraduationCap, Award, Calendar, MapPin, BookOpen } from 'lucide-react';
import { Language } from '../types';
import { EDUCATION } from '../data/content';

interface EducationProps {
  lang: Language;
}

export const Education: React.FC<EducationProps> = ({ lang }) => {
  return (
    <section id="education" className="py-24 bg-[#080d19]/75 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 text-xs font-mono">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'ACADEMIC FOUNDATION' : 'LATAR BELAKANG PENDIDIKAN'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            {lang === 'en' ? 'Education & Academic Training' : 'Pendidikan Formal & Pelatihan'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {lang === 'en'
              ? 'Rigorous academic preparation in computer engineering and applied electronics from Indonesia’s premier vocational polytechnic.'
              : 'Pendidikan teknik komputer dan elektronika terapan di salah satu politeknik teknologi terbaik di Indonesia.'}
          </p>
        </div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EDUCATION.map((edu, idx) => (
            <div
              key={idx}
              className="bg-[#0c1428] border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-6 sm:p-8 transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-300 font-semibold">
                    {edu.badge}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{edu.period}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-100">
                    {edu.institution}
                  </h3>
                  <div className="text-sm font-semibold text-emerald-400 font-mono mt-1">
                    {edu.degree[lang]}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500 font-mono mt-1">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    <span>{edu.location}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed pt-2">
                  {edu.description[lang]}
                </p>
              </div>

              {idx === 0 && (
                <div className="mt-6 pt-4 border-t border-slate-800/80">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                    {lang === 'en' ? 'Core Coursework Focus:' : 'Fokus Pembelajaran Utama:'}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      'Embedded Systems',
                      'Microcontroller Programming',
                      'Computer Networks',
                      'Sensor Interfacing',
                      'Digital Signal Processing',
                      'Operating Systems',
                    ].map((course, cIdx) => (
                      <span
                        key={cIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

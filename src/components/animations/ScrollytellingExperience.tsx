import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../../types';
import { Microchip3DScrollScene } from './Microchip3DScrollScene';
import { ScrollytellingNav } from './ScrollytellingNav';
import { DissectedHeroStage } from './DissectedHeroStage';
import { DissectedExperienceStage } from './DissectedExperienceStage';
import { DissectedSkillsStage } from './DissectedSkillsStage';
import { DissectedProjectsStage } from './DissectedProjectsStage';
import { DissectedTelemetryStage } from './DissectedTelemetryStage';
import { DissectedEducationStage } from './DissectedEducationStage';
import { DissectedContactStage } from './DissectedContactStage';

interface ScrollytellingExperienceProps {
  lang: Language;
}

export const ScrollytellingExperience: React.FC<ScrollytellingExperienceProps> = ({ lang }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Smooth scroll tracking
  useEffect(() => {
    let animationId: number;
    let target = 0;
    let current = 0;

    const onScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;
      const totalHeight = container.offsetHeight - window.innerHeight;
      if (totalHeight > 0) {
        target = Math.min(1, Math.max(0, window.scrollY / totalHeight));
      }
    };

    const updateLoop = () => {
      current += (target - current) * 0.08;
      setScrollProgress(current);
      animationId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    animationId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Compute active stage index for 7 stages
  const currentStage = Math.min(
    6,
    Math.max(
      0,
      scrollProgress < 0.15
        ? 0
        : scrollProgress < 0.30
        ? 1
        : scrollProgress < 0.45
        ? 2
        : scrollProgress < 0.62
        ? 3
        : scrollProgress < 0.78
        ? 4
        : scrollProgress < 0.90
        ? 5
        : 6
    )
  );

  const stageTargets = [0.05, 0.22, 0.37, 0.53, 0.70, 0.84, 0.96];

  const scrollToStage = (stageIndex: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const totalHeight = container.offsetHeight - window.innerHeight;
    const targetY = stageTargets[stageIndex] * totalHeight;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  // Support URL hash navigation
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase().replace('#', '');
      const hashToStage: Record<string, number> = {
        hero: 0,
        home: 0,
        experience: 1,
        internship: 1,
        about: 1,
        petrokimia: 1,
        skills: 2,
        arsenal: 2,
        hardware: 2,
        projects: 3,
        project: 3,
        simulator: 4,
        telemetry: 4,
        scada: 4,
        education: 5,
        academic: 5,
        pens: 5,
        contact: 6,
        dispatch: 6,
      };
      if (hash in hashToStage) {
        scrollToStage(hashToStage[hash]);
      }
    };

    window.addEventListener('hashchange', handleHash);
    if (window.location.hash) {
      setTimeout(handleHash, 100);
    }
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      className="relative h-[800vh] bg-[#070b12] text-slate-100 font-sans select-none"
    >
      {/* Pinned Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Full-screen 3D Microchip & Dissection Scene */}
        <Microchip3DScrollScene />

        {/* Minimalist 3D Dissection Timeline Navigation on the Right */}
        <ScrollytellingNav
          currentStage={currentStage}
          progress={scrollProgress}
          onSelectStage={scrollToStage}
          lang={lang}
        />

        {/* Main Stage Presentation Viewport */}
        <div className="relative z-20 flex-grow flex items-center justify-center px-4 sm:px-6 lg:pl-10 xl:pl-12 lg:pr-10 xl:pr-56 2xl:pr-64 pt-16 pb-10 pointer-events-none">
          <div className="max-w-5xl xl:max-w-6xl w-full h-full relative flex items-center justify-center">
            {/* Stage 0: Surface Casing / Hero Identity */}
            <DissectedHeroStage
              lang={lang}
              isActive={currentStage === 0}
              onDissectClick={() => scrollToStage(1)}
            />

            {/* Stage 1: Layer 01 — Lifted RF Shield / Work Experience */}
            <DissectedExperienceStage lang={lang} isActive={currentStage === 1} />

            {/* Stage 2: Layer 02 — Silicon Die / Technical Skills */}
            <DissectedSkillsStage lang={lang} isActive={currentStage === 2} />

            {/* Stage 3: Layer 03 — 38 Gold Pins / All 4 Projects */}
            <DissectedProjectsStage lang={lang} isActive={currentStage === 3} />

            {/* Stage 4: Layer 04 — Silicon Bus / Dual-Node SCADA Lab */}
            <DissectedTelemetryStage lang={lang} isActive={currentStage === 4} />

            {/* Stage 5: Layer 05 — PCB Substrate / Formal Education */}
            <DissectedEducationStage lang={lang} isActive={currentStage === 5} />

            {/* Stage 6: Layer 06 — Top-Down Blueprint / Contact & Links */}
            <DissectedContactStage lang={lang} isActive={currentStage === 6} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollytellingExperience;

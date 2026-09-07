import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Top progress line */}
      <div className="h-[2px] w-full bg-slate-900">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 shadow-[0_0_12px_rgba(6,182,212,0.8)] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating mini telemetry badge at bottom-right */}
      <div className="fixed bottom-4 right-4 z-40 bg-[#070e1c]/90 border border-cyan-900/60 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg text-[10px] font-mono text-slate-400 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        <span className="text-cyan-400 font-bold">{Math.round(scrollProgress)}% SCROLL</span>
        <span className="text-slate-600">|</span>
        <span className="text-emerald-400">TELEMETRY SYNCED</span>
      </div>
    </div>
  );
};

export default ScrollProgressBar;

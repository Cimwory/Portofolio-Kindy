import React, { useRef, useState } from 'react';

export interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  borderColor?: string;
  showCornerMarks?: boolean;
  enableTilt?: boolean;
  chipLabel?: string;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(6, 182, 212, 0.18)',
  borderColor = 'rgba(6, 182, 212, 0.45)',
  showCornerMarks = true,
  enableTilt = true,
  chipLabel,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [transform, setTransform] = useState(
    'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });

    if (enableTilt) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3.2; // subtle elegant tilt
      const rotateY = ((x - centerX) / centerX) * 3.2;
      setTransform(
        `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.008, 1.008, 1.008)`
      );
    }
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    if (enableTilt) {
      setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: opacity === 0 ? 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
      }}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#070d1a]/85 backdrop-blur-xl shadow-2xl transition-all duration-300 ${className}`}
    >
      {/* Top Specular Rim Light */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-75" />

      {/* Dynamic Radial Spotlight (React Bits) */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(450px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
        }}
      />

      {/* Border glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity,
          boxShadow: `inset 0 0 0 1px ${borderColor}`,
        }}
      />

      {/* Technical Corner Crosshairs (Anime.js / Aerospace aesthetic) */}
      {showCornerMarks && (
        <>
          <span className="pointer-events-none absolute top-2 left-2.5 font-mono text-[9px] text-cyan-500/40 select-none">
            +
          </span>
          <span className="pointer-events-none absolute top-2 right-2.5 font-mono text-[9px] text-cyan-500/40 select-none">
            +
          </span>
          <span className="pointer-events-none absolute bottom-2 left-2.5 font-mono text-[9px] text-cyan-500/40 select-none">
            +
          </span>
          <span className="pointer-events-none absolute bottom-2 right-2.5 font-mono text-[9px] text-cyan-500/40 select-none">
            +
          </span>
        </>
      )}

      {/* Optional Top Chip Header Tag */}
      {chipLabel && (
        <div className="flex items-center justify-between px-4 pt-3 pb-1 border-b border-white/[0.05] font-mono text-[10px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-300/90 tracking-wider font-semibold">{chipLabel}</span>
          </div>
          <span className="text-slate-500 text-[9px]">ESP32 // RTOS</span>
        </div>
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default SpotlightCard;

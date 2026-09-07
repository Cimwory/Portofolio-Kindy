import React from 'react';

export interface ShinyTextProps {
  text: string;
  className?: string;
  speed?: number; // duration in seconds
  color?: string;
  shineColor?: string;
}

export const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  className = '',
  speed = 3,
  color = '#e2e8f0',
  shineColor = '#06b6d4',
}) => {
  return (
    <span
      className={`inline-block relative overflow-hidden bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(120deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
        backgroundSize: '200% 100%',
        animation: `shineMove ${speed}s linear infinite`,
      }}
    >
      {text}
      <style>{`
        @keyframes shineMove {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
      `}</style>
    </span>
  );
};

export default ShinyText;

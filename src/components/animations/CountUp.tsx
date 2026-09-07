import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  to,
  from = 0,
  duration = 1200,
  decimals = 0,
  suffix = '',
  prefix = '',
  className = '',
}) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const objRef = useRef({ val: from });

  useEffect(() => {
    if (!nodeRef.current) return;

    objRef.current.val = from;
    const anim = animate(objRef.current, {
      val: to,
      ease: 'outExpo',
      duration: duration,
      onUpdate: () => {
        if (nodeRef.current) {
          const formatted =
            decimals > 0
              ? objRef.current.val.toFixed(decimals)
              : Math.round(objRef.current.val).toString();
          nodeRef.current.textContent = `${prefix}${formatted}${suffix}`;
        }
      },
    });

    return () => {
      try {
        anim.pause();
      } catch {}
    };
  }, [to, from, duration, decimals, prefix, suffix]);

  return (
    <span ref={nodeRef} className={className}>
      {prefix}
      {from}
      {suffix}
    </span>
  );
};

export default CountUp;

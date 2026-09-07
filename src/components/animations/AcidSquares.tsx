import React, { useRef, useEffect } from 'react';
import { Renderer, Triangle, Program, Mesh, RenderTarget } from 'ogl';

export interface AcidSquaresProps {
  color1?: string;
  color2?: string;
  color3?: string;
  detail?: 'low' | 'medium' | 'high';
  speed?: number;
  waveDepth?: number;
  zoom?: number;
  density?: number;
  glow?: number;
  exposure?: number;
  spread?: number;
  stepSize?: number;
  colorShift?: number;
  contrast?: number;
  brightness?: number;
  opacity?: number;
  mouseInteraction?: boolean;
  mouseStrength?: number;
  mouseRadius?: number;
  blur?: number;
  grain?: boolean;
  grainIntensity?: number;
  lightMode?: boolean;
  className?: string;
}

const hexToRgb = (hex: string): [number, number, number] => {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return match
    ? [
        parseInt(match[1], 16) / 255,
        parseInt(match[2], 16) / 255,
        parseInt(match[3], 16) / 255,
      ]
    : [1, 1, 1];
};

const STEP_PRESETS = { low: 20, medium: 32, high: 48 };

const VERTEX_SHADER = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uSpeed;
uniform float uWaveDepth;
uniform float uZoom;
uniform float uDensity;
uniform float uSpread;
uniform float uStepSize;
uniform float uGlow;
uniform float uExposure;
uniform float uColorShift;
uniform float uContrast;
uniform float uBrightness;
uniform float uOpacity;
uniform float uSteps;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec2 uMouse;
uniform float uMouseStrength;
uniform float uMouseRadius;
uniform float uEnableMouse;
uniform float uMouseActive;
uniform float uGrain;
uniform float uGrainIntensity;
uniform float uLightMode;
out vec4 fragColor;

void main() {
  vec2 frag = gl_FragCoord.xy;
  float zoom = max(uZoom, 0.05);
  float aspect = iResolution.x / iResolution.y;
  vec2 ndc = (2.0 * frag - iResolution.xy) / iResolution.y;
  vec2 dir = ndc * (0.5 / zoom);

  vec2 mouseNdc = vec2(uMouse.x * aspect, uMouse.y);
  float mr = max(uMouseRadius, 0.01);
  vec2 md = ndc - mouseNdc;
  float dent = exp(-dot(md, md) / (mr * mr)) * (3.0 * uMouseStrength * uEnableMouse * uMouseActive);

  float travel = sin(iTime * uSpeed) * uWaveDepth;
  float density = max(uDensity, 1.0);
  float spread = clamp(uSpread, 0.05, 0.6);
  float stepSize = max(uStepSize, 0.0005);
  float glowGain = max(uGlow, 0.0);

  vec3 tOffset = vec3(0.0, dent, travel);
  vec3 p = vec3(0.0);
  float s = 0.0;
  float glow = 0.0;

  for (int i = 0; i < 64; i++) {
    if (float(i) >= uSteps) break;
    p += vec3(dir * s, s);
    vec3 q = p + tOffset;
    s += density - length(q.xz) + length(ceil(q).xy);
    s = stepSize + abs(s) * spread;
    glow += glowGain / s;
  }

  float e = glow / max(uExposure, 1.0);
  float shimmer = 0.5 + 0.5 * dot(cos(iTime * uColorShift + p), vec3(0.3333));
  float v = tanh(e * uBrightness * mix(0.7, 1.05, shimmer));
  v = clamp((v - 0.5) * uContrast + 0.5, 0.0, 1.0);

  vec3 col = mix(uColor1, uColor2, smoothstep(0.0, 0.55, v));
  col = mix(col, uColor3, smoothstep(0.55, 1.0, v));
  col *= v;

  float a = clamp(v, 0.0, 1.0) * uOpacity;
  vec3 outRgb = col * a;
  if (uGrain > 0.5) {
    float gv = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)) + iTime) * 43758.5453) - 0.5) * uGrainIntensity;
    outRgb = clamp(outRgb + gv, 0.0, 1.0);
    a = clamp(a + gv, 0.0, 1.0);
  }
  if (uLightMode > 0.5) {
    float peak = max(col.r, max(col.g, col.b));
    vec3 chroma = pow(clamp(col / max(peak, 0.0001), 0.0, 1.0), vec3(1.16));
    fragColor = vec4(mix(vec3(1.0), chroma, a * 0.94), 1.0);
  } else {
    fragColor = vec4(outRgb, a);
  }
}
`;

const BLUR_FRAGMENT_SHADER = `#version 300 es
precision highp float;
uniform sampler2D tMap;
uniform vec2 iResolution;
uniform vec2 uDirection;
uniform float uRadius;
uniform float uGrain;
uniform float uGrainIntensity;
uniform float iTime;
out vec4 fragColor;

vec4 samp(vec2 uv) {
  return texture(tMap, uv);
}

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution;
  vec2 texel = uDirection / iResolution;
  float st = uRadius * 0.25;
  vec4 sum = samp(uv) * 0.2026;
  sum += (samp(uv + texel * st) + samp(uv - texel * st)) * 0.179;
  sum += (samp(uv + texel * (st * 2.0)) + samp(uv - texel * (st * 2.0))) * 0.124;
  sum += (samp(uv + texel * (st * 3.0)) + samp(uv - texel * (st * 3.0))) * 0.0672;
  sum += (samp(uv + texel * (st * 4.0)) + samp(uv - texel * (st * 4.0))) * 0.0285;
  vec4 col = sum;
  if (uGrain > 0.5) {
    float gv = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)) + iTime) * 43758.5453) - 0.5) * uGrainIntensity;
    col.rgb = clamp(col.rgb + gv, 0.0, 1.0);
    col.a = clamp(col.a + gv, 0.0, 1.0);
  }
  fragColor = col;
}
`;

export const AcidSquares: React.FC<AcidSquaresProps> = ({
  color1 = '#06b6d4',
  color2 = '#0d9488',
  color3 = '#38bdf8',
  detail = 'medium',
  speed = 0.6,
  waveDepth = 0.8,
  zoom = 1.2,
  density = 10,
  glow = 1,
  exposure = 2700,
  spread = 0.3,
  stepSize = 0.002,
  colorShift = 0,
  contrast = 1,
  brightness = 1,
  opacity = 0.45,
  mouseInteraction = true,
  mouseStrength = 0.1,
  mouseRadius = 0.35,
  blur = 0,
  grain = true,
  grainIntensity = 0.04,
  lightMode = false,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetMouse = useRef<[number, number]>([0, 0]);
  const smoothMouse = useRef<[number, number]>([0, 0]);
  const isMouseInteractive = useRef(mouseInteraction);
  const mouseStrengthRef = useRef(mouseStrength);
  const mouseActiveRef = useRef(0);
  const mouseHoveringRef = useRef(0);
  const blurRef = useRef(blur);
  const grainRef = useRef(grain);
  const grainIntensityRef = useRef(grainIntensity);

  // Store active WebGL references
  const webglRef = useRef<{
    renderer: Renderer;
    program: Program;
    mesh: Mesh;
  } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      webgl: 2,
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    container.appendChild(canvas);

    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex: VERTEX_SHADER,
      fragment: FRAGMENT_SHADER,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) },
        uSpeed: { value: 0.7 },
        uWaveDepth: { value: 1 },
        uZoom: { value: 1.3 },
        uDensity: { value: 10 },
        uSpread: { value: 0.3 },
        uStepSize: { value: 0.002 },
        uGlow: { value: 1 },
        uExposure: { value: 2700 },
        uColorShift: { value: 0 },
        uContrast: { value: 1 },
        uBrightness: { value: 1 },
        uOpacity: { value: 1 },
        uSteps: { value: 32 },
        uColor1: { value: new Float32Array([1, 1, 1]) },
        uColor2: { value: new Float32Array([1, 1, 1]) },
        uColor3: { value: new Float32Array([1, 1, 1]) },
        uMouse: { value: new Float32Array([0, 0]) },
        uMouseStrength: { value: 0.1 },
        uMouseRadius: { value: 0.35 },
        uEnableMouse: { value: 1 },
        uMouseActive: { value: 0 },
        uGrain: { value: 1 },
        uGrainIntensity: { value: 0.05 },
        uLightMode: { value: 0 },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    const blurProgram = new Program(gl, {
      vertex: VERTEX_SHADER,
      fragment: BLUR_FRAGMENT_SHADER,
      uniforms: {
        tMap: { value: null },
        iResolution: { value: new Float32Array([1, 1]) },
        uDirection: { value: new Float32Array([1, 0]) },
        uRadius: { value: 0 },
        uGrain: { value: 0 },
        uGrainIntensity: { value: 0.05 },
        iTime: { value: 0 },
      },
    });

    const blurMesh = new Mesh(gl, { geometry, program: blurProgram });

    let rt1: RenderTarget | null = null;
    let rt2: RenderTarget | null = null;

    const initRenderTargets = () => {
      if (!rt1) {
        const w = gl.drawingBufferWidth;
        const h = gl.drawingBufferHeight;
        rt1 = new RenderTarget(gl, { width: w, height: h, depth: false });
        rt2 = new RenderTarget(gl, { width: w, height: h, depth: false });
      }
    };

    const render = () => {
      const g = grainRef.current ? 1 : 0;
      const gi = grainIntensityRef.current;
      program.uniforms.uGrainIntensity.value = gi;
      blurProgram.uniforms.uGrainIntensity.value = gi;

      if (blurRef.current > 0) {
        initRenderTargets();
        program.uniforms.uGrain.value = 0;
        renderer.render({ scene: mesh, target: rt1! });

        const blurUniforms = blurProgram.uniforms;
        blurUniforms.uRadius.value = blurRef.current * 14;
        blurUniforms.tMap.value = rt1!.texture;
        blurUniforms.uDirection.value[0] = 1;
        blurUniforms.uDirection.value[1] = 0;
        blurUniforms.uGrain.value = 0;
        renderer.render({ scene: blurMesh, target: rt2! });

        blurUniforms.tMap.value = rt2!.texture;
        blurUniforms.uDirection.value[0] = 0;
        blurUniforms.uDirection.value[1] = 1;
        blurUniforms.uGrain.value = g;
        renderer.render({ scene: blurMesh });
      } else {
        program.uniforms.uGrain.value = g;
        renderer.render({ scene: mesh });
      }
    };

    webglRef.current = { renderer, program, mesh };

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      renderer.setSize(w, h);

      const bw = gl.drawingBufferWidth;
      const bh = gl.drawingBufferHeight;
      const res = program.uniforms.iResolution.value;
      res[0] = bw;
      res[1] = bh;

      const blurRes = blurProgram.uniforms.iResolution.value;
      blurRes[0] = bw;
      blurRes[1] = bh;

      if (rt1 && rt2) {
        rt1.setSize(bw, bh);
        rt2.setSize(bw, bh);
      }
      render();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    handleResize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
      targetMouse.current = [nx, ny];
      mouseHoveringRef.current = 1;
    };

    const handleMouseLeave = () => {
      mouseHoveringRef.current = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    let animationId = 0;
    let isIntersecting = true;
    let isVisible = !document.hidden;
    const startTime = performance.now();

    const loop = (currentTime: number) => {
      program.uniforms.iTime.value = (currentTime - startTime) * 0.001;

      const sm = smoothMouse.current;
      const tm = targetMouse.current;
      sm[0] += 0.05 * (tm[0] - sm[0]);
      sm[1] += 0.05 * (tm[1] - sm[1]);

      const mouseU = program.uniforms.uMouse.value;
      mouseU[0] = sm[0];
      mouseU[1] = sm[1];

      const activeTarget = isMouseInteractive.current ? mouseHoveringRef.current : 0;
      mouseActiveRef.current += 0.05 * (activeTarget - mouseActiveRef.current);
      program.uniforms.uMouseActive.value = mouseActiveRef.current;
      program.uniforms.uEnableMouse.value = isMouseInteractive.current ? 1 : 0;
      program.uniforms.uMouseStrength.value = mouseStrengthRef.current;

      blurProgram.uniforms.iTime.value = program.uniforms.iTime.value;

      render();
      animationId = requestAnimationFrame(loop);
    };

    const startAnimation = () => {
      if (isIntersecting && isVisible && animationId === 0) {
        animationId = requestAnimationFrame(loop);
      }
    };

    const stopAnimation = () => {
      if (animationId !== 0) {
        cancelAnimationFrame(animationId);
        animationId = 0;
      }
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) startAnimation();
        else stopAnimation();
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(container);

    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible) startAnimation();
      else stopAnimation();
    };
    document.addEventListener('visibilitychange', handleVisibility);

    startAnimation();

    return () => {
      stopAnimation();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      webglRef.current = null;

      if (rt1 && rt2) {
        gl.deleteFramebuffer(rt1.buffer);
        gl.deleteFramebuffer(rt2.buffer);
        rt1.textures.forEach((t) => gl.deleteTexture(t.texture));
        rt2.textures.forEach((t) => gl.deleteTexture(t.texture));
      }

      try {
        if (canvas.parentNode === container) {
          container.removeChild(canvas);
        }
      } catch {}

      const ext = gl.getExtension('WEBGL_lose_context');
      ext?.loseContext();
    };
  }, []);

  // Update uniforms when props change
  useEffect(() => {
    const webgl = webglRef.current;
    if (!webgl) return;

    const { program } = webgl;
    const u = program.uniforms;

    u.uSpeed.value = speed;
    u.uWaveDepth.value = waveDepth;
    u.uZoom.value = zoom;
    u.uDensity.value = density;
    u.uSpread.value = spread;
    u.uStepSize.value = stepSize;
    u.uGlow.value = glow;
    u.uExposure.value = exposure;
    u.uColorShift.value = colorShift;
    u.uContrast.value = contrast;
    u.uBrightness.value = brightness;
    u.uOpacity.value = opacity;
    u.uLightMode.value = lightMode ? 1 : 0;
    u.uSteps.value = STEP_PRESETS[detail] || STEP_PRESETS.medium;
    u.uMouseRadius.value = mouseRadius;

    const rgb1 = hexToRgb(color1);
    u.uColor1.value[0] = rgb1[0];
    u.uColor1.value[1] = rgb1[1];
    u.uColor1.value[2] = rgb1[2];

    const rgb2 = hexToRgb(color2);
    u.uColor2.value[0] = rgb2[0];
    u.uColor2.value[1] = rgb2[1];
    u.uColor2.value[2] = rgb2[2];

    const rgb3 = hexToRgb(color3);
    u.uColor3.value[0] = rgb3[0];
    u.uColor3.value[1] = rgb3[1];
    u.uColor3.value[2] = rgb3[2];

    isMouseInteractive.current = mouseInteraction;
    mouseStrengthRef.current = mouseStrength;
    blurRef.current = blur;
    grainRef.current = grain;
    grainIntensityRef.current = grainIntensity;
  }, [
    color1,
    color2,
    color3,
    detail,
    speed,
    waveDepth,
    zoom,
    density,
    glow,
    exposure,
    spread,
    stepSize,
    colorShift,
    contrast,
    brightness,
    opacity,
    mouseInteraction,
    mouseStrength,
    mouseRadius,
    blur,
    grain,
    grainIntensity,
    lightMode,
  ]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}
    />
  );
};

export default AcidSquares;

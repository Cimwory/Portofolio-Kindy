import React from 'react';
import { Terminal, ShieldCheck, ChevronRight, Activity, Cpu, Sparkles, MapPin, Download } from 'lucide-react';
import { AcidSquares } from './animations/AcidSquares';
import { Language } from '../types';
import { PERSONAL_INFO } from '../data/content';

interface HeroProps {
  lang: Language;
}

export const Hero: React.FC<HeroProps> = ({ lang }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-circuit-grid">
      {/* React Bits AcidSquares WebGL Corridor Background */}
      <div className="absolute inset-0 z-0 opacity-45 pointer-events-none overflow-hidden">
        <AcidSquares
          color1="#06b6d4"
          color2="#0891b2"
          color3="#10b981"
          speed={0.5}
          zoom={1.2}
          waveDepth={0.6}
          density={8}
          opacity={0.6}
          mouseInteraction={true}
          mouseStrength={0.15}
          grain={true}
          grainIntensity={0.03}
        />
      </div>

      {/* Radial Gradient Glow in background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-600/15 via-emerald-500/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[400px] h-[400px] bg-blue-600/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wide shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{PERSONAL_INFO.status[lang]}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h2 className="font-mono text-cyan-400 text-sm md:text-base font-semibold tracking-wider flex items-center gap-2">
                <span>&lt;SYSTEM_INIT /&gt;</span>
                <span className="text-slate-500">//</span>
                <span>{PERSONAL_INFO.title[lang]}</span>
              </h2>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-100 tracking-tight leading-[1.1]">
                Bridging Physical Hardware &{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                  Industrial Telemetry
                </span>
              </h1>
            </div>

            {/* Bio Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              {PERSONAL_INFO.headline[lang]}.{' '}
              {lang === 'en'
                ? 'Currently engineering robust telemetry and sensor integration for industrial wastewater at PT Petrokimia Gresik.'
                : 'Saat ini aktif mengembangkan telemetri dan integrasi sensor limbah cair industri di PT Petrokimia Gresik.'}
            </p>

            {/* Quick Metadata badges */}
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded bg-slate-900/90 border border-slate-700/70 text-slate-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Surabaya, ID (EEPIS / PENS)</span>
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900/90 border border-slate-700/70 text-slate-300 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-teal-400" />
                <span>ESP32 • STM32 • Modbus • MQTT</span>
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900/90 border border-slate-700/70 text-slate-300 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>Wireshark Analysis</span>
              </span>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#simulator"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all cursor-pointer"
              >
                <Activity className="w-4 h-4" />
                <span>{lang === 'en' ? 'Launch IoT Simulator' : 'Buka Simulator IoT'}</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-200 font-semibold text-sm hover:border-cyan-500/50 hover:bg-slate-800 transition-all cursor-pointer"
              >
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>{lang === 'en' ? 'View Projects' : 'Lihat Proyek'}</span>
              </a>

              <a
                href="./Profile.pdf"
                download="CV_Ulinnuha_Alkindi.pdf"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/40 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-all text-sm"
              >
                <Download className="w-4 h-4" />
                <span>CV (PDF)</span>
              </a>
            </div>

            {/* Stats Row */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {PERSONAL_INFO.stats.map((stat, idx) => (
                <div key={idx} className="bg-slate-900/40 border border-slate-800/60 p-3 rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-400">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 leading-tight">
                    {stat.label[lang]}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Hero Column: Interactive Hardware Telemetry Box */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-[#0b1329] border border-cyan-500/30 p-1 shadow-2xl shadow-cyan-950/50 glow-cyan">
              
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#070d1d] rounded-t-xl border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-xs text-slate-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    <span>esp32_rtos_core0.elf</span>
                  </span>
                </div>
                <div className="font-mono text-[10px] text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                  QoS 1 • MODBUS TCP
                </div>
              </div>

              {/* Terminal Screen Body */}
              <div className="p-4 sm:p-5 font-mono text-xs space-y-3 bg-[#080e1e]/95 rounded-b-xl">
                <div className="text-slate-500 text-[11px]">
                  # Firmware Architecture: Dual-Core FreeRTOS 240MHz
                </div>

                <div className="space-y-1 text-slate-300">
                  <div className="text-cyan-400 flex items-center justify-between">
                    <span>&gt; target: PT_PETROKIMIA_GRESIK_WWTP</span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded">
                      ONLINE
                    </span>
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    &gt; protocol: Modbus RTU/RS485 -&gt; MQTT JSON Bridge
                  </div>
                </div>

                {/* Simulated Register Values */}
                <div className="grid grid-cols-2 gap-2 my-3">
                  <div className="bg-slate-900/90 border border-slate-800 rounded p-2.5">
                    <div className="text-[10px] text-slate-400">REG_40001 (pH Probe)</div>
                    <div className="text-lg font-bold text-emerald-400 flex items-baseline justify-between mt-1">
                      <span>7.28</span>
                      <span className="text-[10px] text-slate-400 font-normal">pH</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1 rounded mt-1.5 overflow-hidden">
                      <div className="bg-emerald-400 h-full w-[52%]" />
                    </div>
                  </div>

                  <div className="bg-slate-900/90 border border-slate-800 rounded p-2.5">
                    <div className="text-[10px] text-slate-400">REG_40002 (Conductivity)</div>
                    <div className="text-lg font-bold text-cyan-400 flex items-baseline justify-between mt-1">
                      <span>1,248</span>
                      <span className="text-[10px] text-slate-400 font-normal">µS/cm</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1 rounded mt-1.5 overflow-hidden">
                      <div className="bg-cyan-400 h-full w-[42%]" />
                    </div>
                  </div>

                  <div className="bg-slate-900/90 border border-slate-800 rounded p-2.5">
                    <div className="text-[10px] text-slate-400">REG_40003 (TDS PPM)</div>
                    <div className="text-lg font-bold text-teal-400 flex items-baseline justify-between mt-1">
                      <span>624</span>
                      <span className="text-[10px] text-slate-400 font-normal">ppm</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1 rounded mt-1.5 overflow-hidden">
                      <div className="bg-teal-400 h-full w-[41%]" />
                    </div>
                  </div>

                  <div className="bg-slate-900/90 border border-slate-800 rounded p-2.5">
                    <div className="text-[10px] text-slate-400">REG_40004 (Effluent Temp)</div>
                    <div className="text-lg font-bold text-amber-400 flex items-baseline justify-between mt-1">
                      <span>29.6</span>
                      <span className="text-[10px] text-slate-400 font-normal">°C</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1 rounded mt-1.5 overflow-hidden">
                      <div className="bg-amber-400 h-full w-[58%]" />
                    </div>
                  </div>
                </div>

                {/* Simulated Packet Hex Stream */}
                <div className="bg-[#050914] border border-cyan-950 rounded p-2.5 text-[10px] space-y-1 text-slate-400">
                  <div className="flex items-center justify-between text-cyan-400 font-semibold">
                    <span>WIRESHARK PACKET CAPTURE</span>
                    <span className="text-emerald-400">0.02ms Jitter</span>
                  </div>
                  <div className="font-mono break-all text-slate-500">
                    [TCP-ACK] 01 03 08 02 D8 04 E0 02 70 01 28 8F C2
                  </div>
                  <div className="text-slate-300">
                    MQTT &quot;factory/wwtp/telemetry&quot; payload: 24 bytes dispatched
                  </div>
                </div>

                {/* Prompt blinking */}
                <div className="flex items-center gap-1 text-cyan-400 pt-1 text-xs">
                  <span className="text-emerald-400">kindy@eepis-telemetry:~$</span>
                  <span className="animate-pulse">_</span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

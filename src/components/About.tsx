import React from 'react';
import { User, Cpu, Radio, ShieldCheck, Terminal, Compass, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { PERSONAL_INFO } from '../data/content';
import { ScrollReveal } from './animations/ScrollReveal';
import { DecryptedText } from './animations/DecryptedText';
import { ShinyText } from './animations/ShinyText';

interface AboutProps {
  lang: Language;
}

export const About: React.FC<AboutProps> = ({ lang }) => {
  const pipelineSteps = [
    {
      num: '01',
      title: lang === 'en' ? 'Physical Sensing' : 'Sensor Fisik',
      desc: 'pH, EC, TDS, Temperature, 4-20mA',
      badge: 'Analog & Transducers',
    },
    {
      num: '02',
      title: lang === 'en' ? 'Signal Conditioning' : 'Kondisioning Sinyal',
      desc: lang === 'en' ? 'Filtering, ADC Calibration, Temp Drift' : 'Filter Analog, Kalibrasi ADC, Kompensasi Suhu',
      badge: 'Hardware Signal',
    },
    {
      num: '03',
      title: lang === 'en' ? 'Firmware / RTOS' : 'Firmware & RTOS',
      desc: 'ESP32 / STM32 / FreeRTOS / C/C++',
      badge: 'Microcontroller Edge',
    },
    {
      num: '04',
      title: lang === 'en' ? 'Industrial Protocol' : 'Protokol Industri',
      desc: 'Modbus RTU (RS485) / MQTT / Wireshark',
      badge: 'Reliable Field Bus',
    },
    {
      num: '05',
      title: lang === 'en' ? 'Visualization & Cloud' : 'Visualisasi & Kontrol',
      desc: 'Real-Time Telemetry, SCADA, Mobile Apps',
      badge: 'Mission-Critical UI',
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#080d19]/75 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 text-xs font-mono">
            <User className="w-3.5 h-3.5" />
            <DecryptedText
              text={lang === 'en' ? 'ENGINEERING IDENTITY' : 'TENTANG SAYA'}
              speed={35}
              animateOn="view"
            />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            <ShinyText
              text={lang === 'en' ? 'Engineering Embedded Solutions for Real-World Industry' : 'Membangun Solusi Sistem Tertanam untuk Industri Nyata'}
              shineColor="#38bdf8"
              speed={4}
            />
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {lang === 'en'
              ? 'Rooted in rigorous engineering at EEPIS (PENS) and tested on petrochemical factory floors.'
              : 'Ditempa oleh kurikulum teknik terapan di PENS dan dibuktikan langsung di lantai pabrik industri petrokimia.'}
          </p>
        </div>

        {/* 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Narrative */}
          <div className="lg:col-span-7 space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              {PERSONAL_INFO.about[lang]}
            </p>
            <p className="text-slate-400">
              {lang === 'en'
                ? 'Unlike traditional software developers, my focus starts at the bare metal: understanding voltage dividers, noise suppression, signal drift over extended wire runs, and low-latency serial queues before the first byte hits the cloud. My internship at PT Petrokimia Gresik provided real-world exposure to continuous plant operations, where system reliability and environmental compliance are non-negotiable.'
                : 'Berbeda dengan pengembangan software konvensional, fokus saya berakar dari level sirkuit fisik: memahami pembagi tegangan, reduksi derau (noise), deviasi pembacaan sensor pada kabel transmisi panjang, hingga antrean serial minim latensi sebelum data dikirim ke server. Pengalaman magang di PT Petrokimia Gresik mengasah ketelitian saya pada operasional pabrik berkelanjutan dengan standar baku mutu lingkungan yang ketat.'}
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#0d162b] border border-slate-800">
                <div className="font-mono text-cyan-400 text-xs font-bold uppercase mb-1">
                  {lang === 'en' ? 'Hardware Reliability' : 'Keandalan Perangkat Keras'}
                </div>
                <div className="text-xs text-slate-300">
                  {lang === 'en'
                    ? 'Watchdog timers, SPIFFS offline caching, and automatic reconnection logic.'
                    : 'Watchdog timer otomatis, penyimpanan cadangan lokal saat koneksi putus, dan pemulihan mandiri.'}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0d162b] border border-slate-800">
                <div className="font-mono text-emerald-400 text-xs font-bold uppercase mb-1">
                  {lang === 'en' ? 'Protocol Precision' : 'Presisi Protokol Jaringan'}
                </div>
                <div className="text-xs text-slate-300">
                  {lang === 'en'
                    ? 'Modbus CRC verification, Wireshark packet capture, and deterministic response.'
                    : 'Validasi checksum Modbus CRC, debugging paket Wireshark, dan transmisi deterministik.'}
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Architecture Box */}
          <div className="lg:col-span-5">
            <div className="bg-[#0b1326] border border-cyan-900/40 rounded-2xl p-6 relative overflow-hidden shadow-xl">
              <div className="text-xs font-mono text-cyan-400 mb-4 flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-4 h-4" />
                  <span>SYSTEM_TOPOLOGY.svg</span>
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">
                  SYNCHRONIZED
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">INSTITUTION</span>
                  <span className="text-slate-100 font-bold">EEPIS / PENS Surabaya</span>
                </div>
                <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">CORE SPECIALIZATION</span>
                  <span className="text-cyan-400 font-bold">Embedded & Industrial IoT</span>
                </div>
                <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">FIELD INDUSTRY</span>
                  <span className="text-emerald-400 font-bold">Petrochemicals (Petrokimia)</span>
                </div>
                <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">HARDWARE ECOSYSTEM</span>
                  <span className="text-slate-200">ESP32, STM32, Arduino, Pi</span>
                </div>
                <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">FIELD BUSSES</span>
                  <span className="text-teal-400 font-bold">Modbus RTU, MQTT, RS485</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* End-to-End Pipeline Visualization */}
        <div className="bg-[#090f20] border border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
            <Radio className="w-4 h-4 text-cyan-400" />
            <span>{lang === 'en' ? 'End-to-End Engineering Methodology: Sensor to Cloud' : 'Metodologi Rekayasa Menyeluruh: Dari Sensor Fisik ke Cloud'}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {pipelineSteps.map((step, idx) => (
              <ScrollReveal key={idx} delay={idx * 100} distance={20}>
                <div className="bg-[#0c1428] border border-slate-800 rounded-xl p-4 relative group hover:border-cyan-500/50 transition-all h-full">
                  <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-2">
                    <span className="font-bold">{step.num}</span>
                    <span className="text-[10px] text-slate-500">{step.badge}</span>
                  </div>
                  <div className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {step.title}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {step.desc}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

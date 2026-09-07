import React, { useState, useEffect } from 'react';
import { Language } from '../../types';
import { SpotlightCard } from './SpotlightCard';
import { RefreshCw, Power, Activity, Zap } from 'lucide-react';

interface DissectedTelemetryStageProps {
  lang: Language;
  isActive: boolean;
}

export const DissectedTelemetryStage: React.FC<DissectedTelemetryStageProps> = ({
  lang,
  isActive,
}) => {
  const [activeNodeIdx, setActiveNodeIdx] = useState(0);

  // Petrokimia WWTP Node values
  const [phVal, setPhVal] = useState(7.24);
  const [ecVal, setEcVal] = useState(1240);
  const [tdsVal, setTdsVal] = useState(620);
  const [tempVal, setTempVal] = useState(29.4);
  const [valveOpen, setValveOpen] = useState(false);
  const [aeratorRunning, setAeratorRunning] = useState(true);

  // Buncop Agrotech Node values
  const [buncopPh, setBuncopPh] = useState(6.12);
  const [buncopEc, setBuncopEc] = useState(1480);
  const [buncopTemp, setBuncopTemp] = useState(24.8);
  const [buncopHum, setBuncopHum] = useState(68.5);
  const [dosingAOpen, setDosingAOpen] = useState(false);
  const [growLightOn, setGrowLightOn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhVal((prev) => +(prev + (Math.random() - 0.5) * 0.04).toFixed(2));
      setEcVal((prev) => Math.round(prev + (Math.random() - 0.5) * 6));
      setTdsVal((prev) => Math.round(prev + (Math.random() - 0.5) * 4));
      setTempVal((prev) => +(prev + (Math.random() - 0.5) * 0.1).toFixed(1));

      setBuncopPh((prev) => +(prev + (Math.random() - 0.5) * 0.03).toFixed(2));
      setBuncopEc((prev) => Math.round(prev + (Math.random() - 0.5) * 8));
      setBuncopTemp((prev) => +(prev + (Math.random() - 0.5) * 0.08).toFixed(1));
      setBuncopHum((prev) => +(prev + (Math.random() - 0.5) * 0.2).toFixed(1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center transition-all duration-700 pointer-events-auto ${
        isActive
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
      }`}
    >
      <div className="max-w-2xl w-full">
        <SpotlightCard
          chipLabel="LAYER_04 // SCADA_ENGINE"
          spotlightColor="rgba(6, 182, 212, 0.25)"
          borderColor="rgba(6, 182, 212, 0.5)"
          className="p-4 sm:p-6 backdrop-blur-xl bg-[#081024]/90 space-y-3.5 shadow-2xl"
        >
          {/* Top Bar with Node Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5 font-mono text-xs">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => setActiveNodeIdx(0)}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer text-[11px] ${
                  activeNodeIdx === 0
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-900 border border-slate-800 text-slate-400'
                }`}
              >
                01: PETROKIMIA WWTP
              </button>
              <button
                onClick={() => setActiveNodeIdx(1)}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer text-[11px] ${
                  activeNodeIdx === 1
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'bg-slate-900 border border-slate-800 text-slate-400'
                }`}
              >
                02: BUNCOP AGROTECH
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-cyan-400 text-[10px] sm:text-[11px]">
              <RefreshCw className="w-3 h-3 animate-spin text-cyan-400" />
              <span>{activeNodeIdx === 0 ? 'MODBUS RTU / MQTT' : 'MQTT QoS 1 / WIFI'}</span>
            </div>
          </div>

          {/* 4 Sensor Metric Gauges for Active Node */}
          {activeNodeIdx === 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
              <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl">
                <div className="text-[10px] text-slate-400">pH LEVEL</div>
                <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-0.5">{phVal}</div>
                <div className="text-[9px] text-emerald-500/80 mt-0.5">Optimal (6.5-8.5)</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl">
                <div className="text-[10px] text-slate-400">CONDUCTIVITY</div>
                <div className="text-xl sm:text-2xl font-black text-cyan-400 mt-0.5">{ecVal}</div>
                <div className="text-[9px] text-cyan-500/80 mt-0.5">µS/cm (Normal)</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl">
                <div className="text-[10px] text-slate-400">TDS LEVEL</div>
                <div className="text-xl sm:text-2xl font-black text-teal-400 mt-0.5">{tdsVal}</div>
                <div className="text-[9px] text-teal-500/80 mt-0.5">ppm (Compliant)</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl">
                <div className="text-[10px] text-slate-400">EFFLUENT TEMP</div>
                <div className="text-xl sm:text-2xl font-black text-amber-400 mt-0.5">{tempVal}°C</div>
                <div className="text-[9px] text-amber-500/80 mt-0.5">RTD Sensor</div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
              <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl">
                <div className="text-[10px] text-slate-400">NUTRIENT pH</div>
                <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-0.5">{buncopPh}</div>
                <div className="text-[9px] text-emerald-500/80 mt-0.5">Target (5.8-6.5)</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl">
                <div className="text-[10px] text-slate-400">EC NUTRITION</div>
                <div className="text-xl sm:text-2xl font-black text-cyan-400 mt-0.5">{buncopEc}</div>
                <div className="text-[9px] text-cyan-500/80 mt-0.5">µS/cm (AB Mix)</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl">
                <div className="text-[10px] text-slate-400">CANOPY TEMP</div>
                <div className="text-xl sm:text-2xl font-black text-teal-400 mt-0.5">{buncopTemp}°C</div>
                <div className="text-[9px] text-teal-500/80 mt-0.5">SHT30 Precision</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl">
                <div className="text-[10px] text-slate-400">REL. HUMIDITY</div>
                <div className="text-xl sm:text-2xl font-black text-amber-400 mt-0.5">{buncopHum}%</div>
                <div className="text-[9px] text-amber-500/80 mt-0.5">Microclimate</div>
              </div>
            </div>
          )}

          {/* Actuators Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
            {activeNodeIdx === 0 ? (
              <>
                <button
                  onClick={() => setValveOpen(!valveOpen)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                    valveOpen
                      ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Power className={`w-3.5 h-3.5 ${valveOpen ? 'text-emerald-400' : 'text-slate-500'}`} />
                    <span>Alkali Dosing Valve</span>
                  </div>
                  <span className="font-bold text-[10px]">{valveOpen ? 'OPEN (DOSING)' : 'CLOSED'}</span>
                </button>

                <button
                  onClick={() => setAeratorRunning(!aeratorRunning)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                    aeratorRunning
                      ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-300'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Activity
                      className={`w-3.5 h-3.5 ${aeratorRunning ? 'text-cyan-400' : 'text-slate-500'}`}
                    />
                    <span>Aeration Blower</span>
                  </div>
                  <span className="font-bold text-[10px]">{aeratorRunning ? 'RUNNING' : 'STANDBY'}</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setDosingAOpen(!dosingAOpen)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                    dosingAOpen
                      ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Power
                      className={`w-3.5 h-3.5 ${dosingAOpen ? 'text-emerald-400' : 'text-slate-500'}`}
                    />
                    <span>Pump A (Stock Nutrient)</span>
                  </div>
                  <span className="font-bold text-[10px]">{dosingAOpen ? 'PUMPING' : 'IDLE'}</span>
                </button>

                <button
                  onClick={() => setGrowLightOn(!growLightOn)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                    growLightOn
                      ? 'bg-amber-950/60 border-amber-500/50 text-amber-300'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Zap className={`w-3.5 h-3.5 ${growLightOn ? 'text-amber-400' : 'text-slate-500'}`} />
                    <span>LED Quantum Board</span>
                  </div>
                  <span className="font-bold text-[10px]">{growLightOn ? 'ACTIVE (16H)' : 'OFF'}</span>
                </button>
              </>
            )}
          </div>

          {/* Packet Ticker */}
          <div className="p-2 rounded-lg bg-[#040814] border border-cyan-950 text-[10px] font-mono text-slate-400 flex items-center justify-between">
            <span className="truncate">WIRESHARK: [TCP-ACK] 01 03 08 02 D4 04 D8 02 6C</span>
            <span className="text-emerald-400 shrink-0 ml-2">Jitter &lt; 0.02ms</span>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
};

export default DissectedTelemetryStage;

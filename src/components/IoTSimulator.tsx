import React, { useState, useEffect } from 'react';
import { Activity, Wifi, Radio, Cpu, RefreshCw, Power, Server, ShieldCheck, Terminal, Layers } from 'lucide-react';
import { Language } from '../types';
import { TELEMETRY_SIMULATOR_NODES } from '../data/content';

interface IoTSimulatorProps {
  lang: Language;
}

interface PacketLog {
  id: number;
  time: string;
  source: string;
  destination: string;
  protocol: string;
  length: number;
  info: string;
}

export const IoTSimulator: React.FC<IoTSimulatorProps> = ({ lang }) => {
  const [selectedNodeIndex, setSelectedNodeIndex] = useState(0);
  const currentNode = TELEMETRY_SIMULATOR_NODES[selectedNodeIndex];

  // Sensor dynamic values
  const [sensorValues, setSensorValues] = useState<{ [key: string]: number }>(() => {
    const initial: { [key: string]: number } = {};
    currentNode.sensors.forEach((s) => {
      initial[s.key] = s.value;
    });
    return initial;
  });

  // Actuator states
  const [actuators, setActuators] = useState(() => currentNode.actuators);

  // Inspector mode: 'mqtt' | 'modbus' | 'wireshark'
  const [inspectorMode, setInspectorMode] = useState<'mqtt' | 'modbus' | 'wireshark'>('mqtt');

  // Wireshark live packets
  const [packets, setPackets] = useState<PacketLog[]>([
    { id: 1, time: '12:40:01.120', source: '10.128.44.18', destination: '10.128.44.1', protocol: 'Modbus/TCP', length: 66, info: 'Query [FC: 0x03] Read Holding Registers: 40001 - 40004' },
    { id: 2, time: '12:40:01.145', source: '10.128.44.1', destination: '10.128.44.18', protocol: 'Modbus/TCP', length: 74, info: 'Response [FC: 0x03] Bytes: 8 [pH: 7.24, EC: 1240, TDS: 620, Temp: 29.4]' },
    { id: 3, time: '12:40:01.300', source: '10.128.44.18', destination: '10.128.1.50:1883', protocol: 'MQTT', length: 112, info: 'Publish [QoS: 1] "factory/wwtp01/telemetry" (104 bytes)' },
    { id: 4, time: '12:40:01.312', source: '10.128.1.50:1883', destination: '10.128.44.18', protocol: 'MQTT', length: 54, info: 'PubAck [Message ID: 1042]' },
  ]);

  // Sync sensors on node switch
  useEffect(() => {
    const updated: { [key: string]: number } = {};
    currentNode.sensors.forEach((s) => {
      updated[s.key] = s.value;
    });
    setSensorValues(updated);
    setActuators(currentNode.actuators);
  }, [selectedNodeIndex, currentNode]);

  // Real-time jitter simulator (realistic IoT sensor noise)
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorValues((prev) => {
        const next = { ...prev };
        currentNode.sensors.forEach((s) => {
          const current = next[s.key] ?? s.value;
          // Random slight drift within nominal range
          const jitter = (Math.random() - 0.5) * (s.unit === 'pH' ? 0.04 : s.unit === '°C' ? 0.1 : 5);
          const raw = Number((current + jitter).toFixed(s.unit === 'pH' || s.unit === '°C' ? 2 : 0));
          // Clamping
          next[s.key] = Math.max(s.min, Math.min(s.max, raw));
        });
        return next;
      });

      // Append live packet
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
      setPackets((prev) => {
        const nextId = prev.length + 1;
        const newPacket: PacketLog = {
          id: nextId,
          time: timeStr,
          source: currentNode.ipAddress,
          destination: '10.128.1.50:1883',
          protocol: Math.random() > 0.4 ? 'MQTT' : 'Modbus/TCP',
          length: Math.floor(Math.random() * 40) + 60,
          info: `Telemetry heartbeat: node=${currentNode.id} status=ACK`,
        };
        return [newPacket, ...prev.slice(0, 15)];
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [currentNode]);

  const toggleActuator = (id: string) => {
    setActuators((prev) =>
      prev.map((act) => (act.id === id ? { ...act, state: !act.state } : act))
    );
  };

  return (
    <section id="simulator" className="py-24 bg-[#080d18] border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 text-xs font-mono">
            <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>{lang === 'en' ? 'LIVE TELEMETRY LAB' : 'LABORATORIUM TELEMETRI REAL-TIME'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            {lang === 'en' ? 'Interactive IoT Telemetry & Protocol Inspector' : 'Simulasi Telemetri & Analisis Jaringan IoT'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {lang === 'en'
              ? 'Experience simulated live field data acquisition, Modbus/MQTT payload streams, and packet debugging based on actual industrial deployments at PT Petrokimia Gresik and Buncop Agrotech.'
              : 'Eksplorasi akuisisi data sensor lapangan, streaming protokol Modbus/MQTT, serta analisis paket Wireshark seperti pada implementasi nyata di PT Petrokimia Gresik dan Buncop Agrotech.'}
          </p>
        </div>

        {/* Node Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {TELEMETRY_SIMULATOR_NODES.map((node, idx) => (
            <button
              key={node.id}
              onClick={() => setSelectedNodeIndex(idx)}
              className={`flex items-center gap-3 px-5 py-3 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                selectedNodeIndex === idx
                  ? 'bg-gradient-to-r from-cyan-950/80 to-slate-900 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.25)]'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  selectedNodeIndex === idx ? 'bg-cyan-400 animate-ping' : 'bg-slate-600'
                }`}
              />
              <div className="text-left">
                <div className="font-mono text-xs">{node.name}</div>
                <div className="text-[11px] text-slate-400 font-normal">{node.badge}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Simulator Dashboard Container */}
        <div className="bg-[#0b1324] border border-cyan-900/40 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl relative overflow-hidden">
          
          {/* Top Node Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold font-mono text-slate-100">{currentNode.name}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-mono">
                  {currentNode.status}
                </span>
              </div>
              <div className="text-xs font-mono text-slate-400 mt-1 flex flex-wrap gap-x-4 gap-y-1">
                <span>GATEWAY: <strong className="text-slate-300">{currentNode.ipAddress}</strong></span>
                <span>PROTOCOL: <strong className="text-cyan-400">{currentNode.protocol}</strong></span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <RefreshCw className="w-3 h-3 text-cyan-400 animate-spin" />
                <span>Sampling: 500ms</span>
              </span>
            </div>
          </div>

          {/* Sensor Gauges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
            {currentNode.sensors.map((sensor) => {
              const currentVal = sensorValues[sensor.key] ?? sensor.value;
              const percentage = Math.min(
                100,
                Math.max(0, ((currentVal - sensor.min) / (sensor.max - sensor.min)) * 100)
              );

              return (
                <div
                  key={sensor.key}
                  className="bg-[#0f1a33] border border-slate-800 hover:border-cyan-500/40 rounded-xl p-4 transition-all hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] group"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
                    <span className="group-hover:text-cyan-300 transition-colors">{sensor.label}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-400">
                      {sensor.status}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-3xl font-extrabold font-mono text-slate-100 group-hover:text-cyan-400 transition-colors">
                      {currentVal}
                    </span>
                    <span className="font-mono text-xs text-slate-400 font-semibold">{sensor.unit}</span>
                  </div>

                  {/* Meter Progress Bar */}
                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 transition-all duration-700"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                    <span>{sensor.min} {sensor.unit}</span>
                    <span>Nominal: {sensor.nominalRange[0]}-{sensor.nominalRange[1]}</span>
                    <span>{sensor.max} {sensor.unit}</span>
                  </div>

                  <p className="text-[11px] text-slate-400 mt-2 line-clamp-1 italic">
                    {sensor.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Actuator Controls Row */}
          <div className="bg-[#090f20] border border-slate-800/80 rounded-xl p-4 mb-6">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>{lang === 'en' ? 'Hardware Actuator Override (Closed-Loop Testing)' : 'Kontrol Aktuator Lapangan (Uji Loop Tertutup)'}</span>
              </span>
              <span className="text-[11px] text-slate-500 font-normal">
                {lang === 'en' ? 'Click to toggle relay/pump states' : 'Klik untuk mengubah status relay/pompa'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {actuators.map((act) => (
                <button
                  key={act.id}
                  onClick={() => toggleActuator(act.id)}
                  className={`flex items-center justify-between p-3 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                    act.state
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Power className={`w-3.5 h-3.5 ${act.state ? 'text-emerald-400' : 'text-slate-600'}`} />
                    <span className="font-semibold">{act.name}</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                      act.state ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {act.state ? 'ENGAGED' : 'STANDBY'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Protocol & Wireshark Packet Inspector */}
          <div className="bg-[#060a14] border border-slate-800 rounded-xl overflow-hidden font-mono text-xs">
            {/* Inspector Tab Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#090e1c] border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="text-slate-200 font-bold">
                  {lang === 'en' ? 'Protocol & Packet Inspector' : 'Inspektur Protokol & Paket Jaringan'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {(['mqtt', 'modbus', 'wireshark'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setInspectorMode(mode)}
                    className={`px-3 py-1 rounded text-xs uppercase font-bold transition-all cursor-pointer ${
                      inspectorMode === mode
                        ? 'bg-cyan-500 text-slate-950'
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Inspector Content */}
            <div className="p-4 text-slate-300">
              {inspectorMode === 'mqtt' && (
                <div className="space-y-2">
                  <div className="text-xs text-slate-400">
                    MQTT Broker: <span className="text-cyan-400">tls://mqtt.petrokimia-plant.internal:8883</span> (QoS 1)
                  </div>
                  <div className="bg-[#03060c] p-3 rounded border border-slate-800 text-slate-200 overflow-x-auto">
                    <pre className="text-emerald-400 font-mono text-xs">
{`{
  "device_id": "${currentNode.id}",
  "timestamp": ${Math.floor(Date.now() / 1000)},
  "firmware": "v2.4.1-esp32-freertos",
  "telemetry": {
${currentNode.sensors.map((s) => `    "${s.key}": ${sensorValues[s.key] ?? s.value}`).join(',\n')}
  },
  "actuators": {
${actuators.map((a) => `    "${a.id}": ${a.state}`).join(',\n')}
  },
  "rssi_dbm": -58,
  "status": "NOMINAL"
}`}
                    </pre>
                  </div>
                </div>
              )}

              {inspectorMode === 'modbus' && (
                <div className="space-y-3">
                  <div className="text-xs text-slate-400">
                    RS-485 Modbus RTU Frame [Baud: 9600 8-N-1 | Slave ID: 0x01 | FC: 0x03 Read Holding Registers]
                  </div>
                  <div className="bg-[#03060c] p-3 rounded border border-slate-800 space-y-2">
                    <div className="text-cyan-400 font-mono text-xs">
                      Master Request: <span className="text-slate-300">01 03 9C 41 00 04 1B 8E</span> (Read 4 registers starting 40001)
                    </div>
                    <div className="text-emerald-400 font-mono text-xs">
                      Slave Response: <span className="text-slate-300">01 03 08 02 D4 04 D8 02 6C 01 26 7A B3</span> (Bytes: 8, CRC Valid)
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    * Modbus RTU registers directly mapped via FreeRTOS DMA ring buffer with hardware RS-485 automatic direction control pin (DE/RE).
                  </div>
                </div>
              )}

              {inspectorMode === 'wireshark' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span>Live Packet Capture (Interface: eth0/wlan0 - Promiscuous)</span>
                    <span className="text-emerald-400">Capture Active</span>
                  </div>
                  <div className="max-h-56 overflow-y-auto space-y-1 pr-1">
                    {packets.map((pkt) => (
                      <div
                        key={pkt.id}
                        className="bg-[#03060c] p-2 rounded border border-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-1 text-[11px] hover:border-cyan-500/40 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500">#{pkt.id}</span>
                          <span className="text-slate-400">{pkt.time}</span>
                          <span className="px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 font-bold text-[10px]">
                            {pkt.protocol}
                          </span>
                          <span className="text-slate-300">{pkt.source} &rarr; {pkt.destination}</span>
                        </div>
                        <div className="text-slate-400 truncate max-w-md text-[10px]">
                          {pkt.info}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

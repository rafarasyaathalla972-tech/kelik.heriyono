import React, { useState } from 'react';
import { 
  Activity, 
  Flame, 
  Wind, 
  Droplets, 
  Layers, 
  Settings, 
  Gauge, 
  CheckCircle2, 
  RotateCw,
  Sparkles,
  Sliders
} from 'lucide-react';
import { VideoChapter } from '../types';

interface PaperMachineRealisticSimulationProps {
  isPlaying: boolean;
  playbackSpeed: number;
  currentChapterIndex: number;
  activeChapterData?: VideoChapter;
  machineId?: string; // 'PM1' | 'PM2' | 'PM5' | 'TISSUE_PM'
}

export const PaperMachineRealisticSimulation: React.FC<PaperMachineRealisticSimulationProps> = ({
  isPlaying,
  playbackSpeed,
  currentChapterIndex,
  activeChapterData,
  machineId = 'TISSUE_PM'
}) => {
  // Machine sub-section tabs
  const [activeSection, setActiveSection] = useState<'all' | 'wetEnd' | 'yankee' | 'pope'>('all');

  // Dynamic Parameters
  const [yankeeTemp, setYankeeTemp] = useState<number>(88); // 85-90°C
  const [crepingAngle, setCrepingAngle] = useState<number>(15); // 15% creping
  const [needlePressure, setNeedlePressure] = useState<number>(11.5); // 10 - 12 bar
  const [isOscillating, setIsOscillating] = useState<boolean>(true);

  // Machine-specific specs
  const machineSpecs = {
    PM1: { speed: 150, width: 2.20, feltTop: 18.8, feltBottom: 25.0, feltWidth: 2.40, capacity: '1.000 ton' },
    PM2: { speed: 180, width: 2.25, feltTop: 18.8, feltBottom: 25.0, feltWidth: 2.45, capacity: '1.200 ton' },
    PM5: { speed: 160, width: 3.30, feltTop: 0, feltBottom: 30.0, feltWidth: 3.50, capacity: '1.500 ton' },
    TISSUE_PM: { speed: 150, width: 2.20, feltTop: 18.8, feltBottom: 25.0, feltWidth: 2.40, capacity: 'Standar Tissue' }
  }[machineId] || { speed: 150, width: 2.20, feltTop: 18.8, feltBottom: 25.0, feltWidth: 2.40, capacity: 'Tissue Paper' };

  const calculatedPopeSpeed = (machineSpecs.speed * (1 - crepingAngle / 100)).toFixed(1);

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-slate-950 via-slate-900 to-black overflow-hidden flex flex-col justify-between select-none p-3 sm:p-4">
      {/* Top Section Tabs & Status */}
      <div className="flex flex-wrap items-center justify-between gap-2 z-10 bg-slate-950/80 backdrop-blur-md p-2.5 rounded-xl border border-blue-900/50">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-950/80 border border-blue-500/60 rounded-lg text-blue-400">
            <Activity className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-extrabold text-xs sm:text-sm">
                Simulasi Mesin Kertas {machineId.replace('_', ' ')} (Alur Wet End &rarr; Yankee &rarr; Pope Reel)
              </span>
              <span className="bg-blue-500/20 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-500/40">
                Speed: {machineSpecs.speed} mpm
              </span>
            </div>
            <span className="text-[11px] text-slate-400 block">
              Lebar Wire: {machineSpecs.width} M &bull; Felt Lebar: {machineSpecs.feltWidth} M
            </span>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setActiveSection('all')}
            className={`px-2 py-1 rounded font-bold transition-all ${
              activeSection === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Alur Lengkap
          </button>
          <button
            onClick={() => setActiveSection('wetEnd')}
            className={`px-2 py-1 rounded font-bold transition-all ${
              activeSection === 'wetEnd' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Cylinder Mould & Felt
          </button>
          <button
            onClick={() => setActiveSection('yankee')}
            className={`px-2 py-1 rounded font-bold transition-all ${
              activeSection === 'yankee' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Yankee & Creping
          </button>
          <button
            onClick={() => setActiveSection('pope')}
            className={`px-2 py-1 rounded font-bold transition-all ${
              activeSection === 'pope' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Pope Reel
          </button>
        </div>
      </div>

      {/* Main Interactive Machine Stage Canvas */}
      <div className="relative flex-1 w-full my-2 rounded-xl bg-slate-950/95 border border-slate-800/80 overflow-hidden flex items-center justify-center">
        <svg viewBox="0 0 800 320" className="w-full h-full max-h-[360px]">
          <defs>
            {/* Gradients */}
            <linearGradient id="feltGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <radialGradient id="yankeeGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#78350f" />
              <stop offset="60%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#451a03" />
            </radialGradient>
            <linearGradient id="paperGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
          </defs>

          {/* Machine Structural Frame Baseline */}
          <line x1="30" y1="280" x2="770" y2="280" stroke="#334155" strokeWidth="6" strokeLinecap="round" />

          {/* ========================================================================= */}
          {/* SECTION 1: WET END - CYLINDER MOULD VAT (Left: x 60 - 180)                */}
          {/* ========================================================================= */}
          <g>
            {/* Vat Tank Base */}
            <path d="M 60 210 Q 120 270 180 210 L 180 160 L 60 160 Z" fill="#0f172a" stroke="#0ea5e9" strokeWidth="2.5" />
            {/* Pulp Slurry Liquid (Consistency 0.18-0.20%) */}
            <path d="M 62 205 Q 120 260 178 205 L 178 175 L 62 175 Z" fill="#0369a1" opacity="0.45" />

            {/* Cylinder Mould Wire Cage */}
            <g className={isPlaying ? 'animate-spin origin-[120px_195px]' : ''} style={{ animationDuration: `${4 / playbackSpeed}s` }}>
              <circle cx="120" cy="195" r="45" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 2" />
              <line x1="120" y1="150" x2="120" y2="240" stroke="#64748b" strokeWidth="1.5" />
              <line x1="75" y1="195" x2="165" y2="195" stroke="#64748b" strokeWidth="1.5" />
              <circle cx="120" cy="195" r="10" fill="#94a3b8" />
            </g>

            {/* Couch Roll on Top of Mould */}
            <g className={isPlaying ? 'animate-spin origin-[120px_130px]' : ''} style={{ animationDirection: 'reverse', animationDuration: `${2.5 / playbackSpeed}s` }}>
              <circle cx="120" cy="130" r="20" fill="#475569" stroke="#cbd5e1" strokeWidth="2" />
              <circle cx="120" cy="130" r="5" fill="#0f172a" />
            </g>

            <text x="120" y="275" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">
              Cylinder Mould
            </text>
          </g>

          {/* ========================================================================= */}
          {/* SECTION 2: PRESS & FELT LINTASAN + NEEDLE SHOWER (x 180 - 380)           */}
          {/* ========================================================================= */}
          <g>
            {/* Bottom Felt Continuous Loop Path */}
            <path 
              d="M 120 110 L 260 110 L 360 160 L 320 240 L 180 240 Z" 
              fill="none" 
              stroke="url(#feltGrad)" 
              strokeWidth="4.5" 
              strokeDasharray={isPlaying ? '6 3' : 'none'} 
            />

            {/* Needle Shower Bar (High Pressure 10 - 12 bar) */}
            <rect x="230" y="85" width="60" height="12" rx="3" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="260" y="94" fill="#38bdf8" fontSize="7" fontWeight="black" textAnchor="middle">
              SHOWER 11.5 bar
            </text>

            {/* Needle Water Sprays (Oscillating) */}
            {isPlaying && (
              <g className="animate-pulse">
                <line x1="240" y1="97" x2="240" y2="108" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 1" />
                <line x1="250" y1="97" x2="250" y2="108" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 1" />
                <line x1="260" y1="97" x2="260" y2="108" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 1" />
                <line x1="270" y1="97" x2="270" y2="108" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 1" />
                <line x1="280" y1="97" x2="280" y2="108" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 1" />
              </g>
            )}

            {/* U-Box Vacuum Dewatering (-30 kPa) */}
            <rect x="210" y="112" width="35" height="16" rx="2" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.5" />
            <text x="227" y="123" fill="#06b6d4" fontSize="6" fontWeight="bold" textAnchor="middle">U-BOX</text>

            {/* Press Roll (Presses web against Yankee) */}
            <circle cx="395" cy="180" r="28" fill="#475569" stroke="#94a3b8" strokeWidth="2.5" />
          </g>

          {/* ========================================================================= */}
          {/* SECTION 3: YANKEE DRYER (MG CYLINDER) & DOCTOR CREPING BLADE (x 380 - 580)*/}
          {/* ========================================================================= */}
          <g>
            {/* Yankee Cylinder Giant Drum */}
            <g className={isPlaying ? 'animate-spin origin-[460px_140px]' : ''} style={{ animationDuration: `${3.5 / playbackSpeed}s` }}>
              <circle cx="460" cy="140" r="75" fill="url(#yankeeGrad)" stroke="#f59e0b" strokeWidth="4" />
              {/* Internal spoke structure */}
              <line x1="460" y1="65" x2="460" y2="215" stroke="#78350f" strokeWidth="3" />
              <line x1="385" y1="140" x2="535" y2="140" stroke="#78350f" strokeWidth="3" />
              <circle cx="460" cy="140" r="25" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
            </g>

            {/* Hot Air Hood (Heated Hood Canopy on Top) */}
            <path d="M 400 70 A 80 80 0 0 1 520 70 L 530 50 A 100 100 0 0 0 390 50 Z" fill="#b45309" stroke="#f59e0b" strokeWidth="2" />
            <text x="460" y="58" fill="#fef3c7" fontSize="8" fontWeight="black" textAnchor="middle">
              HOOD HE 85 - 90°C
            </text>

            {/* Doctor Creping Blade Holder (Right side of Yankee) */}
            <path d="M 525 180 L 555 200 L 545 208 L 522 188 Z" fill="#334155" stroke="#f43f5e" strokeWidth="2" />
            <line x1="525" y1="180" x2="520" y2="175" stroke="#f43f5e" strokeWidth="3" />
            <text x="560" y="222" fill="#fda4af" fontSize="8" fontWeight="bold">
              Creping {crepingAngle}%
            </text>

            {/* Yankee Center Temp Badge */}
            <text x="460" y="144" fill="#ffffff" fontSize="10" fontWeight="black" textAnchor="middle">
              {yankeeTemp}°C
            </text>
          </g>

          {/* ========================================================================= */}
          {/* SECTION 4: POPE REEL JUMBO ROLL WINDING (Right: x 600 - 750)              */}
          {/* ========================================================================= */}
          <g>
            {/* Paper Web Span from Doctor to Reel Drum */}
            <path 
              d="M 525 180 Q 570 195 620 200" 
              fill="none" 
              stroke="#f8fafc" 
              strokeWidth="2.5" 
              strokeDasharray={isPlaying ? '4 2' : 'none'} 
            />

            {/* Reel Drum Roll */}
            <circle cx="630" cy="200" r="28" fill="#334155" stroke="#94a3b8" strokeWidth="2" />

            {/* Jumbo Roll Paper Reeling */}
            <g className={isPlaying ? 'animate-spin origin-[680px_160px]' : ''} style={{ animationDuration: `${4.5 / playbackSpeed}s` }}>
              <circle cx="680" cy="160" r="50" fill="url(#paperGrad)" stroke="#64748b" strokeWidth="3" />
              <circle cx="680" cy="160" r="14" fill="#334155" />
            </g>

            {/* Trim Suction Blower Nozzle */}
            <path d="M 610 230 L 640 230 L 650 250 L 600 250 Z" fill="#1e293b" stroke="#a855f7" strokeWidth="1.5" />
            <text x="625" y="244" fill="#c084fc" fontSize="6" fontWeight="bold" textAnchor="middle">TRIM HISAP</text>

            <text x="680" y="235" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle">
              Jumbo Roll ({calculatedPopeSpeed} mpm)
            </text>
          </g>
        </svg>

        {/* Live Gauges Overlay in Top Corner */}
        <div className="absolute top-2 left-2 bg-black/85 p-2 rounded-lg border border-slate-800 text-[11px] font-mono space-y-1">
          <div className="text-cyan-300">Wire Forming: 0.19% Konsistensi</div>
          <div className="text-amber-300">Suhu Yankee: {yankeeTemp}°C</div>
          <div className="text-emerald-300">Pope Speed: {calculatedPopeSpeed} mpm</div>
        </div>
      </div>

      {/* Bottom Technical Context Bar & Controls */}
      <div className="bg-slate-950/90 border border-slate-800/80 p-2.5 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              {activeChapterData?.note || 'Menjaga kebersihan felt, keseragaman tekanan uap Yankee, dan sudut creping dokter.'}
            </span>
          </div>
        </div>

        {/* Live Adjusters */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-amber-300 text-[11px]">
            <span>Suhu Yankee:</span>
            <button
              onClick={() => setYankeeTemp(prev => Math.max(80, prev - 1))}
              className="px-1.5 py-0.5 bg-slate-800 rounded font-bold hover:text-white"
            >
              -
            </button>
            <span className="font-mono font-bold">{yankeeTemp}°C</span>
            <button
              onClick={() => setYankeeTemp(prev => Math.min(95, prev + 1))}
              className="px-1.5 py-0.5 bg-slate-800 rounded font-bold hover:text-white"
            >
              +
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-rose-300 text-[11px]">
            <span>Creping:</span>
            <button
              onClick={() => setCrepingAngle(prev => Math.max(10, prev - 1))}
              className="px-1.5 py-0.5 bg-slate-800 rounded font-bold hover:text-white"
            >
              -
            </button>
            <span className="font-mono font-bold">{crepingAngle}%</span>
            <button
              onClick={() => setCrepingAngle(prev => Math.min(20, prev + 1))}
              className="px-1.5 py-0.5 bg-slate-800 rounded font-bold hover:text-white"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

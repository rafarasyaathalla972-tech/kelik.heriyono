import React, { useState } from 'react';
import { 
  Activity, 
  Droplets, 
  Settings, 
  Gauge, 
  Flame, 
  CheckCircle2, 
  RotateCw, 
  Sliders,
  Layers,
  ArrowDown,
  RefreshCw
} from 'lucide-react';
import { VideoChapter } from '../types';

interface StockPrepRealisticSimulationProps {
  isPlaying: boolean;
  playbackSpeed: number;
  currentChapterIndex: number;
  activeChapterData?: VideoChapter;
}

export const StockPrepRealisticSimulation: React.FC<StockPrepRealisticSimulationProps> = ({
  isPlaying,
  playbackSpeed,
  currentChapterIndex,
  activeChapterData
}) => {
  // Sub-machine mode within Stock Prep
  const [activeStage, setActiveStage] = useState<'hdc' | 'ddr' | 'peo'>('hdc');

  // HDC Valve Simulation State
  const [junkTrapMode, setJunkTrapMode] = useState<'normal' | 'flushing'>('normal');

  // DDR Parameters
  const [ddrGap, setDdrGap] = useState<number>(0.45); // mm
  const [ddrAmpere, setDdrAmpere] = useState<number>(185); // Amperes

  // PEO Parameters
  const [peoViscosity, setPeoViscosity] = useState<number>(18.2); // Cps

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-slate-950 via-slate-900 to-black overflow-hidden flex flex-col justify-between select-none p-3 sm:p-4">
      {/* Top Header & Stage Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-2 z-10 bg-slate-950/80 backdrop-blur-md p-2.5 rounded-xl border border-emerald-900/50">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-emerald-950/80 border border-emerald-500/60 rounded-lg text-emerald-400">
            <Settings className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-extrabold text-xs sm:text-sm">
                Simulasi Proses Stock Preparation (Seksi Pembersihan & Fibrilasi)
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/40">
                12 Peralatan Terintegrasi
              </span>
            </div>
            <span className="text-[11px] text-slate-400 block">
              SOP Mesin PT. Panca Usahatama Paramita
            </span>
          </div>
        </div>

        {/* Machine Mode Buttons */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setActiveStage('hdc')}
            className={`px-2.5 py-1 rounded font-bold transition-all ${
              activeStage === 'hdc' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            HDC & Junk Trap
          </button>
          <button
            onClick={() => setActiveStage('ddr')}
            className={`px-2.5 py-1 rounded font-bold transition-all ${
              activeStage === 'ddr' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            DDR Refiner
          </button>
          <button
            onClick={() => setActiveStage('peo')}
            className={`px-2.5 py-1 rounded font-bold transition-all ${
              activeStage === 'peo' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Pelarutan PEO
          </button>
        </div>
      </div>

      {/* Main Visual Stage Canvas */}
      <div className="relative flex-1 w-full my-2 rounded-xl bg-slate-950/95 border border-slate-800/80 overflow-hidden flex items-center justify-center">
        {/* ========================================================================= */}
        {/* STAGE 1: HDC CLEANER & JUNK TRAP (VALVE A, B, C, D, E)                   */}
        {/* ========================================================================= */}
        {activeStage === 'hdc' && (
          <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-around p-4 gap-4">
            {/* SVG HDC Cleaner Cone Schematic */}
            <div className="relative w-72 h-64 shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 320 300" className="w-full h-full">
                {/* Upper Body (Cylindrical Inlet Chamber) */}
                <rect x="110" y="30" width="100" height="60" rx="8" fill="#1e293b" stroke="#0ea5e9" strokeWidth="2.5" />
                
                {/* Tangential Inlet Pipe */}
                <path d="M 40 50 L 110 50 L 110 70 L 40 70 Z" fill="#0f172a" stroke="#0ea5e9" strokeWidth="2" />
                <text x="75" y="44" fill="#38bdf8" fontSize="8" fontWeight="bold" textAnchor="middle">INLET 1.5 bar</text>

                {/* Accept Pipe (Vortex Finder Upward) */}
                <path d="M 145 30 L 145 10 L 175 10 L 175 30 Z" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <text x="160" y="8" fill="#34d399" fontSize="8" fontWeight="bold" textAnchor="middle">ACCEPT 0.5 bar</text>

                {/* Conical Separator Body */}
                <polygon points="110,90 210,90 175,190 145,190" fill="#0f172a" stroke="#0ea5e9" strokeWidth="2.5" />

                {/* Dynamic Vortex Spiral Animation inside Cone */}
                <g className={isPlaying ? 'animate-pulse' : ''}>
                  <ellipse cx="160" cy="110" rx="35" ry="8" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="5 3" />
                  <ellipse cx="160" cy="140" rx="22" ry="6" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 2" />
                  <ellipse cx="160" cy="170" rx="12" ry="4" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
                </g>

                {/* Valve B (Chamber Isolation Valve) */}
                <rect x="140" y="190" width="40" height="15" rx="3" fill={junkTrapMode === 'normal' ? '#10b981' : '#ef4444'} stroke="#ffffff" strokeWidth="1.5" />
                <text x="160" y="201" fill="#ffffff" fontSize="8" fontWeight="black" textAnchor="middle">
                  {junkTrapMode === 'normal' ? 'VALVE B (BUKA)' : 'VALVE B (TUTUP)'}
                </text>

                {/* Junk Trap Chamber */}
                <rect x="130" y="210" width="60" height="45" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="160" y="235" fill="#fcd34d" fontSize="8" fontWeight="bold" textAnchor="middle">JUNK TRAP</text>

                {/* Valve E (Elutriation Water) */}
                <circle cx="115" cy="232" r="10" fill={junkTrapMode === 'normal' ? '#10b981' : '#10b981'} stroke="#ffffff" strokeWidth="1.5" />
                <text x="115" y="235" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">E</text>

                {/* Valve C (Drain Valve at bottom) */}
                <rect x="140" y="260" width="40" height="15" rx="3" fill={junkTrapMode === 'flushing' ? '#10b981' : '#ef4444'} stroke="#ffffff" strokeWidth="1.5" />
                <text x="160" y="271" fill="#ffffff" fontSize="8" fontWeight="black" textAnchor="middle">
                  {junkTrapMode === 'flushing' ? 'VALVE C (BUKA)' : 'VALVE C (TUTUP)'}
                </text>
              </svg>

              {/* Real-time Indicator Badge */}
              <div className="absolute top-2 left-2 bg-black/80 px-2 py-1 rounded border border-cyan-500/60 text-[10px] text-cyan-300 font-mono">
                Delta P: 1.0 bar (Pemisahan Optimal)
              </div>
            </div>

            {/* Valve Controller and Operating Guide */}
            <div className="max-w-md space-y-2.5 text-xs text-slate-200">
              <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  Mode Siklus Junk Trap:
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setJunkTrapMode('normal')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      junkTrapMode === 'normal' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Operasi Normal
                  </button>
                  <button
                    onClick={() => setJunkTrapMode('flushing')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      junkTrapMode === 'flushing' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Flushing Kotoran
                  </button>
                </div>
              </div>

              {/* Valve Status Summary Table */}
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-2">
                <span className="font-extrabold text-cyan-300 text-xs block">
                  {junkTrapMode === 'normal' 
                    ? 'Status Operasi Normal (Menangkap Pasir & Staples):' 
                    : 'Status Pembuangan Kotoran (Flushing Reject):'}
                </span>
                
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-slate-950 p-2 rounded border border-slate-800">
                    <span className="text-slate-400 block">Katup B (Isolasi Atas):</span>
                    <strong className={junkTrapMode === 'normal' ? 'text-emerald-400' : 'text-rose-400'}>
                      {junkTrapMode === 'normal' ? 'TERBUKA PENUH' : 'TERTUTUP RAPAT (WAJIB)'}
                    </strong>
                  </div>
                  <div className="bg-slate-950 p-2 rounded border border-slate-800">
                    <span className="text-slate-400 block">Katup C (Pembuangan):</span>
                    <strong className={junkTrapMode === 'flushing' ? 'text-emerald-400' : 'text-rose-400'}>
                      {junkTrapMode === 'flushing' ? 'TERBUKA MENGALIR' : 'TERTUTUP RAPAT'}
                    </strong>
                  </div>
                  <div className="bg-slate-950 p-2 rounded border border-slate-800">
                    <span className="text-slate-400 block">Katup E (Air Elutriasi):</span>
                    <strong className="text-emerald-400">TERBUKA (Tekanan &ge; 1.5 bar)</strong>
                  </div>
                  <div className="bg-slate-950 p-2 rounded border border-slate-800">
                    <span className="text-slate-400 block">Frekuensi Flushing:</span>
                    <strong className="text-amber-300">Setiap 2 - 4 Jam Operasi</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STAGE 2: DOUBLE DISC REFINER (DDR) & FIBRILASI SERAT                     */}
        {/* ========================================================================= */}
        {activeStage === 'ddr' && (
          <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-around p-4 gap-4">
            {/* SVG of Rotating Pattern Disc Blades */}
            <div className="relative w-64 h-64 shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 260 260" className="w-full h-full">
                {/* Fixed Stator Disc Body */}
                <circle cx="130" cy="130" r="110" fill="#1e293b" stroke="#475569" strokeWidth="4" />
                
                {/* Bar & Groove Rotating Pattern Rotor Disc */}
                <g className={isPlaying ? 'animate-spin origin-[130px_130px]' : ''} style={{ animationDuration: `${4 / playbackSpeed}s` }}>
                  <circle cx="130" cy="130" r="85" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
                  {/* Radial bar teeth */}
                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                    <line
                      key={deg}
                      x1="130"
                      y1="55"
                      x2="130"
                      y2="90"
                      stroke="#f59e0b"
                      strokeWidth="4"
                      strokeLinecap="round"
                      transform={`rotate(${deg} 130 130)`}
                    />
                  ))}
                  <circle cx="130" cy="130" r="30" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                </g>

                {/* Center Hub */}
                <circle cx="130" cy="130" r="14" fill="#cbd5e1" />
                <text x="130" y="134" fill="#0f172a" fontSize="8" fontWeight="black" textAnchor="middle">DDR</text>
              </svg>

              <div className="absolute bottom-2 bg-black/80 px-2.5 py-1 rounded border border-amber-500/50 text-[10px] text-amber-300 font-mono">
                Disc Gap: {ddrGap} mm &bull; Arus: {ddrAmpere} A
              </div>
            </div>

            {/* DDR Control Settings & Technical Rules */}
            <div className="max-w-md space-y-2.5 text-xs text-slate-200">
              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 space-y-2">
                <span className="font-extrabold text-amber-300 text-xs block">
                  Kontrol Fibrilasi Serat & Freeness (320 - 350 CSF):
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Penggilingan Double Disc Refiner memecah ikatan serat primer tanpa memotong panjang serat (cutting) secara berlebihan. Kunci kekuatan tarik lembaran tissue berada pada kontrol arus Ampere dan celah piringan.
                </p>

                <div className="space-y-2 pt-1 border-t border-slate-800 text-[11px]">
                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Celah Pisau (Gap): <strong>{ddrGap} mm</strong></span>
                      <span>Target Freeness: <strong className="text-emerald-400">335 CSF</strong></span>
                    </div>
                    <input
                      type="range"
                      min="0.2"
                      max="0.8"
                      step="0.05"
                      value={ddrGap}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        setDdrGap(val);
                        setDdrAmpere(Math.round(230 - val * 90));
                      }}
                      className="w-full h-1.5 bg-slate-800 rounded accent-amber-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block">Konsistensi Masuk:</span>
                  <strong className="text-cyan-300">3.5% - 4.5%</strong>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block">Manometer Gauge:</span>
                  <strong className="text-emerald-400">Tekanan Inlet &gt; Outlet</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STAGE 3: PELARUTAN PEO (AXFLOC 17-19 Cps) & SCREW PUMP                   */}
        {/* ========================================================================= */}
        {activeStage === 'peo' && (
          <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-around p-4 gap-4">
            {/* SVG Visual of PEO Stirring Tank */}
            <div className="relative w-64 h-64 shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 260 260" className="w-full h-full">
                {/* Tank Vessel */}
                <rect x="50" y="30" width="160" height="190" rx="14" fill="#1e293b" stroke="#a855f7" strokeWidth="3" />
                
                {/* Liquid Level */}
                <rect x="53" y="80" width="154" height="137" rx="10" fill="#581c87" opacity="0.45" />

                {/* Agitator Shaft & Propeller Blades */}
                <line x1="130" y1="15" x2="130" y2="185" stroke="#cbd5e1" strokeWidth="4" />
                <g className={isPlaying ? 'animate-pulse' : ''}>
                  <ellipse cx="130" cy="180" rx="45" ry="12" fill="#c084fc" opacity="0.7" />
                  <ellipse cx="130" cy="140" rx="35" ry="9" fill="#c084fc" opacity="0.5" />
                </g>

                {/* Screw Pump Outlet Pipe */}
                <path d="M 210 190 L 245 190" stroke="#a855f7" strokeWidth="6" />
                <text x="210" y="225" fill="#e9d5ff" fontSize="8" fontWeight="bold" textAnchor="end">
                  Screw Pump (Low Shear)
                </text>
              </svg>

              <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 rounded border border-purple-500/60 text-[10px] text-purple-300 font-mono">
                Viskositas: {peoViscosity} Cps
              </div>
            </div>

            {/* PEO Standard Guidelines */}
            <div className="max-w-md space-y-2.5 text-xs text-slate-200">
              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 space-y-1.5">
                <span className="font-extrabold text-purple-300 text-xs block">
                  Standar Pelarutan Serbuk Axfloc (1729 / 1730):
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  PEO dituang sedikit demi sedikit ke pusaran air berkecepatan lambat agar tidak membentuk <strong>fish-eye</strong> (lendir gumpalan tak larut). Setelah masa hidrasi 60 menit di Tangki 1/2/4, batch disaring ke Tangki 3.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block">Standar Viskositas:</span>
                  <strong className="text-emerald-400 font-mono">17 - 19 Cps (Tissue)</strong>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block">Tipe Pompa:</span>
                  <strong className="text-purple-300">Screw Pump (Rendah Gesek)</strong>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Technical Context Bar */}
      <div className="bg-slate-950/90 border border-slate-800/80 p-2.5 rounded-xl flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            {activeChapterData?.note || 'Menjaga kebersihan pulp dan homogenitas freeness sebelum menuju Paper Machine.'}
          </span>
        </div>
        <span className="text-[10px] text-cyan-400 font-mono bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60 font-bold">
          Target Kualitas: Bebas Shives & Pasir
        </span>
      </div>
    </div>
  );
};

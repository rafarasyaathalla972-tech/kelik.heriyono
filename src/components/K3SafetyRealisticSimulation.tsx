import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  Bell, 
  RotateCcw, 
  Power, 
  Eye, 
  Activity,
  ZapOff,
  Radio
} from 'lucide-react';
import { VideoChapter } from '../types';

interface K3SafetyRealisticSimulationProps {
  isPlaying: boolean;
  playbackSpeed: number;
  currentChapterIndex: number;
  activeChapterData?: VideoChapter;
}

export const K3SafetyRealisticSimulation: React.FC<K3SafetyRealisticSimulationProps> = ({
  isPlaying,
  playbackSpeed,
  currentChapterIndex,
  activeChapterData
}) => {
  // Interactive LOTO step state
  const [lotoStep, setLotoStep] = useState<number>(3); // 1 to 6
  const [isPullWireTripped, setIsPullWireTripped] = useState<boolean>(false);
  const [activeHazardZone, setActiveHazardZone] = useState<'nip' | 'blade' | 'estop'>('nip');

  // LOTO 6 Steps
  const lotoSteps = [
    { step: 1, title: 'Matikan Panel Operasi', detail: 'Hentikan putaran drum dan pisau melalui tombol Normal Stop di kontrol meja operator.' },
    { step: 2, title: 'Putus Saklar Daya Utama', detail: 'Tarik tuas isolator pemutus daya utama (Main Circuit Breaker Isolator) ke posisi OFF.' },
    { step: 3, title: 'Pasang Gembok LOTO & Tag Pribadi', detail: 'Kunci saklar menggunakan gembok pribadi (padlock) dan tempelkan label bahaya bertuliskan nama operator & tanggal.' },
    { step: 4, title: 'Buang Sisa Energi Pneumatik', detail: 'Buka exhaust valve pembuangan udara tekan hingga manometer pneumatik menunjukkan 0.0 bar (Zero Pressure).' },
    { step: 5, title: 'Uji Zero Energy State', detail: 'Tekan tombol Start untuk membuktikan mesin tidak dapat hidup kembali sebelum pekerjaan dimulai.' },
    { step: 6, title: 'Kenakan APD Sarung Tangan Level 5', detail: 'Wajib gunakan sarung tangan Kevlar anti-sayat Level 5 sebelum menyentuh mata pisau slitter atau drum.' }
  ];

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-slate-950 via-slate-900 to-black overflow-hidden flex flex-col justify-between select-none p-3 sm:p-4">
      {/* Top Status Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 z-10 bg-slate-950/80 backdrop-blur-md p-2.5 rounded-xl border border-rose-900/50">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-rose-950/80 border border-rose-500/60 rounded-lg text-rose-400">
            <ShieldAlert className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-extrabold text-xs sm:text-sm">
                Simulasi K3 & SOP Penanganan Mesin Kertas
              </span>
              <span className="bg-rose-500/20 text-rose-300 text-[10px] font-bold px-2 py-0.5 rounded border border-rose-500/40">
                Zero Accident Target
              </span>
            </div>
            <span className="text-[11px] text-slate-400 block">
              Standar Operasional Keselamatan Kerja PT. Panca Usahatama Paramita
            </span>
          </div>
        </div>

        {/* Hazard Zone Selector Tabs */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setActiveHazardZone('nip')}
            className={`px-2.5 py-1 rounded font-bold transition-all ${
              activeHazardZone === 'nip' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Titik Jepit Nip
          </button>
          <button
            onClick={() => setActiveHazardZone('blade')}
            className={`px-2.5 py-1 rounded font-bold transition-all ${
              activeHazardZone === 'blade' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            LOTO Ganti Pisau
          </button>
          <button
            onClick={() => setActiveHazardZone('estop')}
            className={`px-2.5 py-1 rounded font-bold transition-all ${
              activeHazardZone === 'estop' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Tali Emergency Pull-Wire
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Area */}
      <div className="relative flex-1 w-full my-2 rounded-xl bg-slate-950/90 border border-slate-800/80 overflow-hidden flex items-center justify-center">
        {/* ========================================================================= */}
        {/* VIEW 1: TITIK JEPIT NIP ROLL (PINCH POINT HAZARD)                         */}
        {/* ========================================================================= */}
        {activeHazardZone === 'nip' && (
          <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-around p-4 gap-4">
            {/* SVG Visual of Rotating Nip Point */}
            <div className="relative w-64 h-64 shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 300 300" className="w-full h-full">
                {/* Background Danger Hatching */}
                <rect x="10" y="10" width="280" height="280" rx="16" fill="#0f172a" stroke="#ef4444" strokeWidth="2" strokeDasharray="6 4" />
                
                {/* Top Roll (Rubber / Steel Roll) */}
                <g className={isPlaying && !isPullWireTripped ? 'animate-spin origin-[150px_90px]' : ''} style={{ animationDuration: `${3 / playbackSpeed}s` }}>
                  <circle cx="150" cy="90" r="55" fill="#334155" stroke="#94a3b8" strokeWidth="3" />
                  <line x1="150" y1="35" x2="150" y2="145" stroke="#64748b" strokeWidth="2" />
                  <line x1="95" y1="90" x2="205" y2="90" stroke="#64748b" strokeWidth="2" />
                  <circle cx="150" cy="90" r="10" fill="#cbd5e1" />
                </g>

                {/* Bottom Roll (Drum Roll) */}
                <g className={isPlaying && !isPullWireTripped ? 'animate-spin origin-[150px_210px]' : ''} style={{ animationDirection: 'reverse', animationDuration: `${3 / playbackSpeed}s` }}>
                  <circle cx="150" cy="210" r="55" fill="#1e293b" stroke="#64748b" strokeWidth="3" />
                  <line x1="150" y1="155" x2="150" y2="265" stroke="#475569" strokeWidth="2" />
                  <line x1="95" y1="210" x2="205" y2="210" stroke="#475569" strokeWidth="2" />
                  <circle cx="150" cy="210" r="10" fill="#94a3b8" />
                </g>

                {/* Nip Point Red Warning Zone */}
                <ellipse cx="150" cy="150" rx="40" ry="12" fill="#ef4444" opacity="0.35" className="animate-pulse" />
                <line x1="90" y1="150" x2="210" y2="150" stroke="#ef4444" strokeWidth="3" strokeDasharray="4 2" />

                {/* Warning Callout Line */}
                <path d="M 150 150 L 230 110" stroke="#ef4444" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
                <rect x="180" y="80" width="100" height="24" rx="4" fill="#7f1d1d" stroke="#ef4444" />
                <text x="230" y="96" fill="#fecaca" fontSize="9" fontWeight="bold" textAnchor="middle">
                  TITIK JEPIT (NIP)
                </text>
              </svg>

              {/* Status Badge */}
              <div className="absolute bottom-2 left-2 bg-black/80 px-2 py-1 rounded border border-rose-500/60 text-[10px] text-rose-300 font-mono">
                {isPlaying && !isPullWireTripped ? 'Status: ROLL BERPUTAR' : 'Status: BERHENTI AMAN'}
              </div>
            </div>

            {/* Explanatory Safety Rules for Nip */}
            <div className="max-w-md space-y-2.5 text-xs text-slate-200">
              <div className="bg-rose-950/60 border border-rose-700/60 p-3 rounded-xl">
                <span className="font-extrabold text-rose-300 text-sm flex items-center gap-1.5 mb-1">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  Larangan Mutlak (Zero Tolerance)
                </span>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  Dilarang keras membersihkan roll dengan kain lap, sarung tangan, atau tangan kosong saat mesin berputar. Gaya tarik inersia nip roll mencapai ribuan Newton yang dapat menarik tubuh dalam hitungan milidetik.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-amber-400 font-bold block">Pembersihan Aman:</span>
                  <span className="text-slate-400">Gunakan stik pembersih berjarak minimal 1.5 meter atau matikan mesin total.</span>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block">Interlock Sensor:</span>
                  <span className="text-slate-400">Pintu pengaman roll dilengkapi limit switch otomatis yang memutus daya jika terbuka.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: PROSEDUR LOTO & PENGGANTIAN PISAU SLITTER                         */}
        {/* ========================================================================= */}
        {activeHazardZone === 'blade' && (
          <div className="w-full h-full flex flex-col justify-between p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-extrabold text-white">
                  6 Langkah Baku LOTO Sebelum Pergantian Mata Pisau Slitter
                </span>
              </div>
              <span className="text-xs bg-amber-950 border border-amber-500/50 text-amber-300 font-bold px-2.5 py-0.5 rounded">
                Langkah {lotoStep} dari 6
              </span>
            </div>

            {/* Interactive Step Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {lotoSteps.map((s) => {
                const isCurrent = lotoStep === s.step;
                const isPassed = lotoStep > s.step;
                return (
                  <button
                    key={s.step}
                    onClick={() => setLotoStep(s.step)}
                    className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      isCurrent
                        ? 'bg-amber-600/30 border-amber-400 ring-2 ring-amber-400/40 text-white'
                        : isPassed
                        ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-200'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-black font-mono px-1.5 py-0.5 rounded bg-black/40">
                        STEP {s.step}
                      </span>
                      {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                      {isCurrent && <Activity className="w-3.5 h-3.5 text-amber-400 animate-spin" />}
                    </div>
                    <span className="text-xs font-bold leading-tight block">{s.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Detailed Current Step Box */}
            <div className="bg-slate-900/90 border border-amber-500/40 p-3.5 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-amber-300 font-extrabold text-xs uppercase tracking-wider block">
                  Panduan Detail Langkah {lotoStep}: {lotoSteps[lotoStep - 1].title}
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {lotoSteps[lotoStep - 1].detail}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setLotoStep(prev => Math.max(1, prev - 1))}
                  disabled={lotoStep === 1}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold disabled:opacity-40"
                >
                  Sebelumnya
                </button>
                <button
                  onClick={() => setLotoStep(prev => Math.min(6, prev + 1))}
                  disabled={lotoStep === 6}
                  className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 text-white text-xs font-bold disabled:opacity-40 shadow"
                >
                  Lanjut Langkah Berikutnya
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: SIMULASI UJI KAWAT EMERGENCY STOP (PULL-WIRE TRIP)               */}
        {/* ========================================================================= */}
        {activeHazardZone === 'estop' && (
          <div className="w-full h-full flex flex-col items-center justify-around p-4 space-y-3">
            <div className="text-center space-y-1">
              <span className="text-sm font-extrabold text-white flex items-center justify-center gap-2">
                <Bell className={`w-5 h-5 ${isPullWireTripped ? 'text-rose-500 animate-bounce' : 'text-purple-400'}`} />
                Simulasi Uji Tarik Tali Kawat Darurat (Emergency Pull-Wire Switch)
              </span>
              <p className="text-xs text-slate-400 max-w-lg mx-auto">
                Tali kawat darurat membentang di sekeliling mesin Rewinder dan lini PM. Tarikan di titik mana pun wajib memutus sirkuit pengaman dalam waktu &lt; 2.5 detik.
              </p>
            </div>

            {/* Interactive Pull-Wire Wire Graphic */}
            <div className="w-full max-w-lg bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="relative h-12 flex items-center justify-between px-4 bg-slate-950 rounded-lg border border-slate-800">
                <div className="w-4 h-8 bg-slate-700 rounded-sm" title="Anchor Switch DS" />
                
                {/* The Cable Line */}
                <div 
                  className={`flex-1 h-1.5 mx-2 rounded-full transition-all ${
                    isPullWireTripped ? 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.8)]' : 'bg-amber-400'
                  }`} 
                />
                
                <div className="w-4 h-8 bg-slate-700 rounded-sm" title="Anchor Switch OS" />

                {/* Alarm Strobe */}
                {isPullWireTripped && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-rose-600 text-white font-black text-[10px] px-3 py-1 rounded-full animate-ping">
                    E-STOP AKTIF!
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-300">
                  Status Sistem: <strong className={isPullWireTripped ? 'text-rose-400' : 'text-emerald-400'}>
                    {isPullWireTripped ? 'TERPUTUS DARURAT (REKONDISI WAJIB OLEH KARU)' : 'STANDBY OPERASIONAL NORMAL'}
                  </strong>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPullWireTripped(true)}
                    className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg transition-all shadow flex items-center gap-1.5"
                  >
                    <Power className="w-3.5 h-3.5" />
                    <span>Tarik Kawat Darurat</span>
                  </button>

                  <button
                    onClick={() => setIsPullWireTripped(false)}
                    disabled={!isPullWireTripped}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-lg transition-all disabled:opacity-40 flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Kunci (Karu)</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="text-[11px] bg-slate-900/80 border border-slate-800 text-slate-300 px-4 py-2 rounded-xl text-center">
              <strong>SOP Pemeriksaan:</strong> Pengetesan respon tali darurat wajib dilakukan <strong>setiap awal shift</strong> oleh Kepala Regu bersama Operator Mesin.
            </div>
          </div>
        )}
      </div>

      {/* Bottom Technical Context Bar */}
      <div className="bg-slate-950/90 border border-slate-800/80 p-2.5 rounded-xl flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            {activeChapterData?.note || 'Patuhi seluruh standar APD dan regulasi K3 di lantai produksi PT. PUP.'}
          </span>
        </div>
        <span className="text-[10px] text-amber-400 font-mono bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60 font-bold">
          Standard: ISO 45001 & SMK3
        </span>
      </div>
    </div>
  );
};

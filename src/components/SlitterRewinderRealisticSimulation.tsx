import React, { useState, useEffect, useRef } from 'react';
import { 
  Maximize2, 
  RotateCw, 
  Layers, 
  Scissors, 
  ShieldCheck, 
  Activity, 
  Compass, 
  ArrowRight, 
  Sparkles,
  Gauge,
  Sliders,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export type CameraViewMode = 'overview' | 'slitter' | 'banana_roll' | 'calender' | 'winder';

interface SlitterRewinderRealisticSimulationProps {
  isPlaying: boolean;
  playbackSpeed: number;
  currentChapterIndex: number;
  activeChapterData?: {
    topic: string;
    note: string;
    detailedExplanation?: string;
    technicalSpecs?: { label: string; val: string }[];
  };
  onSelectCameraView?: (view: CameraViewMode) => void;
}

export const SlitterRewinderRealisticSimulation: React.FC<SlitterRewinderRealisticSimulationProps> = ({
  isPlaying,
  playbackSpeed,
  currentChapterIndex,
  activeChapterData,
  onSelectCameraView
}) => {
  const [cameraView, setCameraView] = useState<CameraViewMode>('overview');
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [bowApexAngle, setBowApexAngle] = useState<number>(20); // 15-30 degrees
  const [cantingAngle, setCantingAngle] = useState<number>(0.5); // 0.5 - 1.0 degree
  const [overlapMm, setOverlapMm] = useState<number>(1.2); // 1.0 - 1.5 mm
  const [riderRollPressure, setRiderRollPressure] = useState<number>(3.8); // kN/m
  const [rollDiameter, setRollDiameter] = useState<number>(450); // mm
  const [webSpeed, setWebSpeed] = useState<number>(650); // mpm
  const [separationGapMm, setSeparationGapMm] = useState<number>(3.5); // mm

  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(Date.now());

  // Auto-switch camera based on active chapter if user hasn't explicitly locked it
  useEffect(() => {
    if (currentChapterIndex === 0) setCameraView('overview');
    else if (currentChapterIndex === 1) setCameraView('calender');
    else if (currentChapterIndex === 2) setCameraView('slitter');
    else if (currentChapterIndex === 3) setCameraView('banana_roll');
    else if (currentChapterIndex === 4) setCameraView('winder');
    else if (currentChapterIndex >= 5) setCameraView('overview');
  }, [currentChapterIndex]);

  // Animation Loop for rotational & linear motion
  useEffect(() => {
    if (!isPlaying) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    lastTimeRef.current = Date.now();

    const loop = () => {
      const now = Date.now();
      const delta = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      const speedFactor = playbackSpeed * (webSpeed / 400);

      // Continuous rotation angle in degrees
      setRotationAngle((prev) => (prev + delta * 180 * speedFactor) % 360);

      // Dynamically calculate roll diameter growth and rider roll relief
      setRollDiameter((prev) => {
        const next = prev + delta * 0.8 * speedFactor;
        return next > 1250 ? 300 : next;
      });

      // Rider roll relief pressure decreases as diameter increases
      setRiderRollPressure((prev) => {
        const minPressure = 1.2;
        const maxPressure = 4.2;
        // Linear relief curve
        const pressure = maxPressure - ((rollDiameter - 300) / (1250 - 300)) * (maxPressure - minPressure);
        return Math.max(minPressure, Math.min(maxPressure, parseFloat(pressure.toFixed(2))));
      });

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, playbackSpeed, webSpeed, rollDiameter]);

  const handleCameraChange = (view: CameraViewMode) => {
    setCameraView(view);
    if (onSelectCameraView) onSelectCameraView(view);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-slate-950 select-none font-sans">
      {/* Top Camera & Tooling Bar */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 p-2.5 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
          <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 mr-1 flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            Kamera Sudut Pandang:
          </span>

          <button
            onClick={() => handleCameraChange('overview')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
              cameraView === 'overview'
                ? 'bg-amber-500 text-black shadow-md'
                : 'bg-slate-800/90 text-slate-300 hover:text-white'
            }`}
          >
            <span>1. Lini Lengkap</span>
          </button>

          <button
            onClick={() => handleCameraChange('calender')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
              cameraView === 'calender'
                ? 'bg-amber-500 text-black shadow-md'
                : 'bg-slate-800/90 text-slate-300 hover:text-white'
            }`}
          >
            <span>2. Calender Nip</span>
          </button>

          <button
            onClick={() => handleCameraChange('slitter')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
              cameraView === 'slitter'
                ? 'bg-amber-500 text-black shadow-md'
                : 'bg-slate-800/90 text-slate-300 hover:text-white'
            }`}
          >
            <Scissors className="w-3 h-3" />
            <span>3. Pisau Slitter</span>
          </button>

          <button
            onClick={() => handleCameraChange('banana_roll')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
              cameraView === 'banana_roll'
                ? 'bg-amber-500 text-black shadow-md ring-2 ring-emerald-400'
                : 'bg-slate-800/90 text-emerald-300 hover:text-white'
            }`}
          >
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>4. Banana Bowed Roll</span>
          </button>

          <button
            onClick={() => handleCameraChange('winder')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
              cameraView === 'winder'
                ? 'bg-amber-500 text-black shadow-md'
                : 'bg-slate-800/90 text-slate-300 hover:text-white'
            }`}
          >
            <span>5. Two-Drum Winder</span>
          </button>
        </div>

        {/* Live Operational Status */}
        <div className="flex items-center gap-2 font-mono text-[11px] text-slate-300">
          <div className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Speed: <strong className="text-amber-300">{webSpeed} mpm</strong></span>
          </div>
          <div className="hidden sm:flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded border border-slate-800">
            <span>Tension: <strong className="text-cyan-300">185 N/m</strong></span>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative flex-1 w-full h-full min-h-[300px] sm:min-h-[360px] flex items-center justify-center p-2 sm:p-4 overflow-hidden">
        {/* Engineering Background Grid */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}
        />

        {/* ------------------------------------------------------------- */}
        {/* VIEW 1: LINI LENGKAP REWINDER & SLITTER (FULL LINE OVERVIEW) */}
        {/* ------------------------------------------------------------- */}
        {cameraView === 'overview' && (
          <div className="relative w-full h-full max-w-4xl flex flex-col justify-between">
            <div className="relative w-full flex-1 flex items-center justify-center">
              <svg viewBox="0 0 960 380" className="w-full h-full max-h-[340px] drop-shadow-2xl">
                <defs>
                  {/* Gradients */}
                  <linearGradient id="jumboRollGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="50%" stopColor="#b45309" />
                    <stop offset="100%" stopColor="#78350f" />
                  </linearGradient>
                  <linearGradient id="steelRollGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#e2e8f0" />
                    <stop offset="50%" stopColor="#94a3b8" />
                    <stop offset="100%" stopColor="#475569" />
                  </linearGradient>
                  <linearGradient id="rubberRollGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#047857" />
                    <stop offset="100%" stopColor="#064e3b" />
                  </linearGradient>
                  <linearGradient id="bananaRollGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="50%" stopColor="#0284c7" />
                    <stop offset="100%" stopColor="#0369a1" />
                  </linearGradient>
                  <linearGradient id="paperSheetGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#fef9c3" stopOpacity="0.95" />
                  </linearGradient>
                </defs>

                {/* Machine Floor & Foundation */}
                <rect x="20" y="340" width="920" height="24" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                <line x1="20" y1="340" x2="940" y2="340" stroke="#f59e0b" strokeWidth="3" strokeDasharray="8 6" />

                {/* ================= SECTION 1: UNWIND STAND ================= */}
                <g id="unwind-station">
                  {/* Stand Stanchion */}
                  <path d="M 60 340 L 95 190 L 135 190 L 170 340 Z" fill="#0f172a" stroke="#475569" strokeWidth="2.5" />
                  <rect x="90" y="180" width="50" height="20" rx="3" fill="#334155" />
                  
                  {/* Spool Shaft & Core Chuck */}
                  <circle cx="115" cy="190" r="16" fill="#64748b" stroke="#94a3b8" strokeWidth="2" />
                  <circle cx="115" cy="190" r="7" fill="#0284c7" />

                  {/* Jumbo Roll (Animated Rotation) */}
                  <g transform={`rotate(${-rotationAngle * 0.4}, 115, 190)`}>
                    <circle cx="115" cy="190" r="78" fill="url(#jumboRollGrad)" stroke="#fef08a" strokeWidth="2" strokeDasharray="16 8" />
                    <line x1="115" y1="115" x2="115" y2="265" stroke="#fef08a" strokeWidth="1.5" strokeOpacity="0.6" />
                    <line x1="40" y1="190" x2="190" y2="190" stroke="#fef08a" strokeWidth="1.5" strokeOpacity="0.6" />
                  </g>

                  {/* Multi-Disc Brake Caliper Callout */}
                  <rect x="55" y="175" width="24" height="30" rx="3" fill="#dc2626" stroke="#fca5a5" strokeWidth="1.5" />
                  <text x="67" y="165" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">Rem Cakram</text>
                  <text x="67" y="218" fill="#fef08a" fontSize="9" fontWeight="bold" textAnchor="middle">3.5 bar</text>

                  {/* Unwind Label */}
                  <text x="115" y="295" fill="#f8fafc" fontSize="12" fontWeight="900" textAnchor="middle">1. UNWIND STAND</text>
                  <text x="115" y="312" fill="#94a3b8" fontSize="10" textAnchor="middle">Jumbo Roll (Ø 2.200 mm)</text>
                </g>

                {/* ================= SECTION 2: DANCER ROLL & TENSION ================= */}
                <g id="dancer-roll-station">
                  {/* Tension Load Cell Guide Roll 1 */}
                  <circle cx="215" cy="190" r="16" fill="url(#steelRollGrad)" stroke="#cbd5e1" strokeWidth="2" />
                  <circle cx="215" cy="190" r="4" fill="#0f172a" />

                  {/* Dancer Roll (oscillates vertically) */}
                  <g transform={`translate(0, ${Math.sin(rotationAngle * 0.05) * 6})`}>
                    <line x1="260" y1="210" x2="260" y2="280" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="260" cy="210" r="18" fill="url(#steelRollGrad)" stroke="#38bdf8" strokeWidth="2.5" />
                    <circle cx="260" cy="210" r="5" fill="#0284c7" />
                  </g>
                  <text x="260" y="312" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Dancer Roll (Tension)</text>
                </g>

                {/* ================= SECTION 3: CALENDER UNIT ================= */}
                <g id="calender-station">
                  {/* Stand */}
                  <rect x="330" y="100" width="60" height="240" fill="#0f172a" stroke="#334155" strokeWidth="2" />

                  {/* Top Calender Rubber Roll */}
                  <circle cx="360" cy="155" r="28" fill="url(#rubberRollGrad)" stroke="#34d399" strokeWidth="2.5" />
                  <circle cx="360" cy="155" r="6" fill="#064e3b" />
                  
                  {/* Bottom Calender Steel Roll */}
                  <circle cx="360" cy="215" r="32" fill="url(#steelRollGrad)" stroke="#e2e8f0" strokeWidth="2.5" />
                  <circle cx="360" cy="215" r="7" fill="#0f172a" />

                  {/* Nip Line Arrow */}
                  <line x1="330" y1="185" x2="390" y2="185" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="3 3" />
                  <polygon points="360,178 356,172 364,172" fill="#ef4444" />
                  <polygon points="360,192 356,198 364,198" fill="#ef4444" />

                  <text x="360" y="88" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Top Rubber (Ø 400)</text>
                  <text x="360" y="275" fill="#f8fafc" fontSize="12" fontWeight="900" textAnchor="middle">2. CALENDER NIP</text>
                  <text x="360" y="292" fill="#94a3b8" fontSize="10" textAnchor="middle">Nip Load: 25 N/mm</text>
                </g>

                {/* ================= SECTION 4: SLITTER SECTION ================= */}
                <g id="slitter-station">
                  {/* Top Slitter Dished Blade */}
                  <circle cx="480" cy="160" r="22" fill="#f8fafc" stroke="#38bdf8" strokeWidth="2" />
                  <circle cx="480" cy="160" r="6" fill="#0284c7" />
                  
                  {/* Bottom Carbide Anvil Ring */}
                  <circle cx="482" cy="192" r="24" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
                  <circle cx="482" cy="192" r="7" fill="#0f172a" />

                  {/* Overlap point indicator */}
                  <circle cx="481" cy="178" r="4" fill="#f59e0b" />
                  <line x1="481" y1="178" x2="520" y2="140" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="525" y="142" fill="#f59e0b" fontSize="10" fontWeight="bold">Overlap 1.2 mm &bull; Canting 0.5°</text>

                  {/* Trim Suction Chute */}
                  <path d="M 465 190 L 450 250 L 470 250 Z" fill="#0284c7" fillOpacity="0.4" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="450" y="265" fill="#38bdf8" fontSize="9" fontWeight="bold">Blower Trim (0.45 bar)</text>

                  <text x="480" y="295" fill="#f8fafc" fontSize="12" fontWeight="900" textAnchor="middle">3. SLITTER SHEAR-CUT</text>
                  <text x="480" y="312" fill="#94a3b8" fontSize="10" textAnchor="middle">Pisau Atas & Bawah</text>
                </g>

                {/* ================= SECTION 5: BANANA BOWED ROLL ================= */}
                <g id="banana-station">
                  {/* Distinct Bowed Curved Roll */}
                  <path 
                    d="M 570 215 Q 605 185 640 215" 
                    fill="none" 
                    stroke="url(#bananaRollGrad)" 
                    strokeWidth="20" 
                    strokeLinecap="round" 
                  />
                  {/* Segmented Rubber Sleeves Marker */}
                  <line x1="585" y1="202" x2="585" y2="218" stroke="#f8fafc" strokeWidth="2" />
                  <line x1="605" y1="190" x2="605" y2="208" stroke="#f59e0b" strokeWidth="3" />
                  <line x1="625" y1="202" x2="625" y2="218" stroke="#f8fafc" strokeWidth="2" />

                  {/* Apex indicator arrow */}
                  <polygon points="605,178 601,186 609,186" fill="#f59e0b" />
                  <text x="605" y="172" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">Puncak Apex 20°</text>

                  {/* Spreading force arrows */}
                  <line x1="580" y1="230" x2="560" y2="230" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow)" />
                  <line x1="630" y1="230" x2="650" y2="230" stroke="#10b981" strokeWidth="2" />

                  <text x="605" y="275" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">Celah Terbuka: +3.5 mm</text>
                  <text x="605" y="295" fill="#f8fafc" fontSize="12" fontWeight="900" textAnchor="middle">4. BANANA BOWED ROLL</text>
                  <text x="605" y="312" fill="#94a3b8" fontSize="10" textAnchor="middle">Anti-Interweaving Expander</text>
                </g>

                {/* ================= SECTION 6: TWO-DRUM WINDER & RIDER ROLL ================= */}
                <g id="winder-station">
                  {/* Front Drum Roll */}
                  <circle cx="740" cy="225" r="38" fill="url(#steelRollGrad)" stroke="#e2e8f0" strokeWidth="2.5" />
                  <circle cx="740" cy="225" r="10" fill="#0f172a" />
                  <text x="740" y="230" fill="#f8fafc" fontSize="9" fontWeight="bold" textAnchor="middle">Front Drum</text>

                  {/* Rear Drum Roll */}
                  <circle cx="820" cy="225" r="38" fill="url(#steelRollGrad)" stroke="#e2e8f0" strokeWidth="2.5" />
                  <circle cx="820" cy="225" r="10" fill="#0f172a" />
                  <text x="820" y="230" fill="#f8fafc" fontSize="9" fontWeight="bold" textAnchor="middle">Rear Drum</text>

                  {/* Rewound Roll (Growing in the cradle) */}
                  <g transform={`rotate(${rotationAngle * 0.6}, 780, 160)`}>
                    <circle cx="780" cy="160" r="48" fill="url(#jumboRollGrad)" stroke="#fef08a" strokeWidth="2" strokeDasharray="12 6" />
                    <circle cx="780" cy="160" r="12" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
                  </g>

                  {/* Programmed Rider Roll (Top Press) */}
                  <circle cx="780" cy="98" r="20" fill="url(#rubberRollGrad)" stroke="#34d399" strokeWidth="2" />
                  <line x1="780" y1="98" x2="780" y2="40" stroke="#38bdf8" strokeWidth="3" />
                  <rect x="765" y="35" width="30" height="15" rx="2" fill="#0284c7" />
                  <text x="780" y="28" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">Hydraulic Relief</text>

                  {/* Doffing Arm Cradle */}
                  <path d="M 850 240 L 890 280 L 920 280" fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
                  <text x="890" y="300" fill="#f59e0b" fontSize="9" fontWeight="bold">Doffer</text>

                  <text x="780" y="295" fill="#f8fafc" fontSize="12" fontWeight="900" textAnchor="middle">5. TWO-DRUM WINDER</text>
                  <text x="780" y="312" fill="#94a3b8" fontSize="10" textAnchor="middle">Rider Roll Relief ({riderRollPressure} kN/m)</text>
                </g>

                {/* ================= MOVING PAPER WEB SHEET ================= */}
                {/* Paper path traveling smoothly across all sections */}
                <path
                  d="M 115 112 L 215 174 L 260 228 L 360 185 L 480 178 L 605 198 L 740 187 L 780 208"
                  fill="none"
                  stroke="#fef08a"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={isPlaying ? "12 6" : "none"}
                  className={isPlaying ? "animate-pulse" : ""}
                />
              </svg>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 2: CLOSE-UP CALENDER NIP (RUBBER & STEEL ROLL)           */}
        {/* ------------------------------------------------------------- */}
        {cameraView === 'calender' && (
          <div className="relative w-full h-full max-w-3xl flex flex-col items-center justify-center">
            <svg viewBox="0 0 700 340" className="w-full h-full max-h-[320px]">
              {/* Stand */}
              <rect x="160" y="20" width="380" height="300" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="2.5" />

              {/* Top Calender Rubber Roll */}
              <circle cx="350" cy="95" r="55" fill="url(#rubberRollGrad)" stroke="#10b981" strokeWidth="3" />
              <circle cx="350" cy="95" r="14" fill="#064e3b" />
              <text x="350" y="100" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Top Rubber Roll (Ø 400 mm)</text>

              {/* Bottom Calender Steel Roll */}
              <circle cx="350" cy="225" r="65" fill="url(#steelRollGrad)" stroke="#e2e8f0" strokeWidth="3" />
              <circle cx="350" cy="225" r="16" fill="#0f172a" />
              <text x="350" y="230" fill="#0f172a" fontSize="11" fontWeight="bold" textAnchor="middle">Bottom Steel Roll (Ø 450 mm)</text>

              {/* High-Pressure Nip Zone */}
              <rect x="220" y="147" width="260" height="8" fill="#fef08a" opacity="0.9" rx="2" />
              <line x1="220" y1="151" x2="480" y2="151" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="6 4" />

              {/* Pressure Vectors */}
              <g transform="translate(350, 151)">
                <polygon points="0,-15 -6,-24 6,-24" fill="#ef4444" />
                <polygon points="0,15 -6,24 6,24" fill="#ef4444" />
              </g>

              {/* Technical Callouts */}
              <rect x="40" y="50" width="100" height="60" rx="8" fill="#022c22" stroke="#10b981" strokeWidth="1.5" />
              <text x="90" y="72" fill="#6ee7b7" fontSize="10" fontWeight="bold" textAnchor="middle">Kekerasan Karet</text>
              <text x="90" y="92" fill="#ffffff" fontSize="14" fontWeight="black" textAnchor="middle">85 - 90 ShA</text>

              <rect x="40" y="180" width="100" height="60" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
              <text x="90" y="202" fill="#a5b4fc" fontSize="10" fontWeight="bold" textAnchor="middle">Tekanan Nip</text>
              <text x="90" y="224" fill="#ffffff" fontSize="13" fontWeight="black" textAnchor="middle">15 - 30 N/mm</text>

              <rect x="560" y="115" width="120" height="80" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="620" y="140" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">Tujuan Calendering:</text>
              <text x="620" y="160" fill="#f8fafc" fontSize="9" textAnchor="middle">&bull; Haluskan Serat Tissue</text>
              <text x="620" y="176" fill="#f8fafc" fontSize="9" textAnchor="middle">&bull; Kontrol Ketebalan Caliper</text>
            </svg>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 3: CLOSE-UP PISAU SLITTER SHEAR-CUT & CANTING ANGLE      */}
        {/* ------------------------------------------------------------- */}
        {cameraView === 'slitter' && (
          <div className="relative w-full h-full max-w-3xl flex flex-col items-center justify-center">
            <svg viewBox="0 0 760 340" className="w-full h-full max-h-[330px]">
              {/* Top Dished Blade Cross Section */}
              <g transform="translate(340, 100) rotate(2.5)">
                <ellipse cx="0" cy="0" rx="90" ry="24" fill="#f8fafc" stroke="#38bdf8" strokeWidth="3" />
                <ellipse cx="0" cy="0" rx="30" ry="8" fill="#0284c7" />
                <line x1="-90" y1="0" x2="90" y2="0" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 2" />
                <text x="0" y="-35" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
                  Top Slitter (Circular Dished Blade)
                </text>
              </g>

              {/* Bottom Carbide Anvil Ring */}
              <g transform="translate(344, 210)">
                <rect x="-95" y="-22" width="190" height="44" rx="6" fill="#334155" stroke="#94a3b8" strokeWidth="3" />
                <circle cx="0" cy="0" r="14" fill="#0f172a" />
                <text x="0" y="44" fill="#cbd5e1" fontSize="12" fontWeight="bold" textAnchor="middle">
                  Bottom Slitter Ring (Tungsten Carbide 1.1x Speed)
                </text>
              </g>

              {/* Overlap & Canting Zoom Graphic */}
              <g transform="translate(425, 140)">
                <circle cx="0" cy="0" r="42" fill="#0f172a" stroke="#f59e0b" strokeWidth="2.5" />
                <line x1="-30" y1="-12" x2="30" y2="-12" stroke="#38bdf8" strokeWidth="2" />
                <line x1="-30" y1="6" x2="30" y2="6" stroke="#94a3b8" strokeWidth="2" />
                <line x1="0" y1="-12" x2="0" y2="6" stroke="#f59e0b" strokeWidth="2" />
                <text x="0" y="24" fill="#f59e0b" fontSize="9" fontWeight="bold" textAnchor="middle">
                  Overlap: {overlapMm} mm
                </text>
              </g>

              {/* Paper Slicing Ribbon Demonstration */}
              <path d="M 60 148 L 415 148" stroke="#fef08a" strokeWidth="6" strokeLinecap="round" />
              <path d="M 430 142 L 700 120" stroke="#fef08a" strokeWidth="4" strokeLinecap="round" />
              <path d="M 430 154 L 700 176" stroke="#fef08a" strokeWidth="4" strokeLinecap="round" />

              {/* Side Trim Suction Vacuum Chute */}
              <path d="M 410 160 Q 420 220 490 250" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="4 4" />
              <rect x="480" y="235" width="150" height="42" rx="6" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1.5" />
              <text x="555" y="254" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">Blower Hisap Trim Pinggir</text>
              <text x="555" y="268" fill="#fef08a" fontSize="9" textAnchor="middle">Vakum 0.45 bar &rarr; Pulper</text>

              {/* Technical Box Left */}
              <rect x="30" y="40" width="160" height="90" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="110" y="62" fill="#38bdf8" fontSize="11" fontWeight="black" textAnchor="middle">Parameter Slitter:</text>
              <text x="110" y="82" fill="#ffffff" fontSize="10" textAnchor="middle">&bull; Sudut Canting: 0.5° - 1.0°</text>
              <text x="110" y="98" fill="#ffffff" fontSize="10" textAnchor="middle">&bull; Overlap Kedalaman: 1.2 mm</text>
              <text x="110" y="114" fill="#ffffff" fontSize="10" textAnchor="middle">&bull; Tekanan Silinder: 2.0 bar</text>
            </svg>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 4: CLOSE-UP BANANA BOWED ROLL (ANTI-INTERWEAVING FISIKA) */}
        {/* ------------------------------------------------------------- */}
        {cameraView === 'banana_roll' && (
          <div className="relative w-full h-full max-w-4xl flex flex-col items-center justify-center">
            <svg viewBox="0 0 880 340" className="w-full h-full max-h-[330px]">
              {/* Machine Centerline */}
              <line x1="60" y1="170" x2="820" y2="170" stroke="#334155" strokeWidth="1.5" strokeDasharray="8 6" />
              <text x="820" y="165" fill="#64748b" fontSize="10">Sumbu Mesin (CL)</text>

              {/* 3 Paper Ribbons Entering with 0 mm Gap */}
              <g id="infeed-ribbons">
                <rect x="60" y="100" width="220" height="38" rx="2" fill="#fef08a" opacity="0.85" />
                <rect x="60" y="142" width="220" height="42" rx="2" fill="#fef08a" opacity="0.9" />
                <rect x="60" y="188" width="220" height="38" rx="2" fill="#fef08a" opacity="0.85" />
                
                {/* 0 mm Gap Alert */}
                <rect x="80" y="55" width="170" height="36" rx="6" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1.5" />
                <text x="165" y="72" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">
                  Celah Pasca Slitter: 0.0 mm
                </text>
                <text x="165" y="84" fill="#fef08a" fontSize="8.5" textAnchor="middle">
                  Rawan Fatal "Interweaving" / Roll Gandeng!
                </text>
              </g>

              {/* THE BANANA BOWED ROLL (Curved Body with 5 Segmented Rotating Sleeves) */}
              <g id="banana-roll-body">
                {/* Curved Axle (Poros Lengkung) */}
                <path
                  d="M 330 90 Q 430 170 330 250"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="38"
                  strokeLinecap="round"
                />

                {/* 5 Rotating Rubber Segment Lines */}
                <path d="M 330 105 Q 390 150 340 180" fill="none" stroke="#f8fafc" strokeWidth="3" strokeDasharray="6 8" />
                <path d="M 345 140 Q 410 170 345 200" fill="none" stroke="#f59e0b" strokeWidth="4" />
                <path d="M 330 190 Q 390 210 330 235" fill="none" stroke="#f8fafc" strokeWidth="3" strokeDasharray="6 8" />

                {/* Apex Crown Indicator (Puncak Lengkungan) */}
                <circle cx="410" cy="170" r="10" fill="#f59e0b" stroke="#fef08a" strokeWidth="2" />
                <polygon points="426,170 416,164 416,176" fill="#f59e0b" />
                <text x="410" y="145" fill="#f59e0b" fontSize="12" fontWeight="black" textAnchor="middle">
                  APEX ({bowApexAngle}°)
                </text>
              </g>

              {/* 3 Paper Ribbons Exiting EXPANDED by Lateral Vector Force */}
              <g id="outfeed-ribbons">
                {/* Top ribbon diverges upward */}
                <path d="M 400 115 L 750 80" fill="none" stroke="#fef08a" strokeWidth="36" strokeLinecap="round" />
                {/* Center ribbon continues straight */}
                <path d="M 425 170 L 750 170" fill="none" stroke="#fef08a" strokeWidth="38" strokeLinecap="round" />
                {/* Bottom ribbon diverges downward */}
                <path d="M 400 225 L 750 260" fill="none" stroke="#fef08a" strokeWidth="36" strokeLinecap="round" />

                {/* Lateral Force Vectors Arrows */}
                <g transform="translate(560, 115)">
                  <line x1="0" y1="0" x2="0" y2="-28" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow)" />
                  <polygon points="0,-28 -5,-20 5,-20" fill="#10b981" />
                  <text x="10" y="-12" fill="#34d399" fontSize="11" fontWeight="bold">F_lateral (Atas)</text>
                </g>

                <g transform="translate(560, 225)">
                  <line x1="0" y1="0" x2="0" y2="28" stroke="#10b981" strokeWidth="3" />
                  <polygon points="0,28 -5,20 5,20" fill="#10b981" />
                  <text x="10" y="18" fill="#34d399" fontSize="11" fontWeight="bold">F_lateral (Bawah)</text>
                </g>

                {/* Separation Gap Box Indicator */}
                <rect x="620" y="112" width="190" height="48" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                <text x="715" y="132" fill="#a7f3d0" fontSize="11" fontWeight="black" textAnchor="middle">
                  CELAH SEPARASI: +{separationGapMm} mm
                </text>
                <text x="715" y="148" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">
                  INTERWEAVING 0% (AMAN TOTAL)
                </text>
              </g>
            </svg>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 5: TWO-DRUM SURFACE WINDER & PROGRAMMED RIDER ROLL       */}
        {/* ------------------------------------------------------------- */}
        {cameraView === 'winder' && (
          <div className="relative w-full h-full max-w-3xl flex flex-col items-center justify-center">
            <svg viewBox="0 0 740 340" className="w-full h-full max-h-[320px]">
              {/* Front & Rear Drum */}
              <circle cx="270" cy="220" r="62" fill="url(#steelRollGrad)" stroke="#e2e8f0" strokeWidth="3" />
              <circle cx="270" cy="220" r="16" fill="#0f172a" />
              <text x="270" y="226" fill="#0f172a" fontSize="11" fontWeight="bold" textAnchor="middle">Front Drum (Nip 1)</text>

              <circle cx="430" cy="220" r="62" fill="url(#steelRollGrad)" stroke="#e2e8f0" strokeWidth="3" />
              <circle cx="430" cy="220" r="16" fill="#0f172a" />
              <text x="430" y="226" fill="#0f172a" fontSize="11" fontWeight="bold" textAnchor="middle">Rear Drum (Nip 2)</text>

              {/* Rewound Roll sitting in cradle between the 2 drums */}
              <circle cx="350" cy="120" r={Math.min(95, Math.max(45, rollDiameter / 10))} fill="url(#jumboRollGrad)" stroke="#fef08a" strokeWidth="2.5" />
              <circle cx="350" cy="120" r="18" fill="#475569" stroke="#cbd5e1" strokeWidth="2" />
              <text x="350" y="125" fill="#f8fafc" fontSize="11" fontWeight="black" textAnchor="middle">
                Roll Jadi (Ø {Math.round(rollDiameter)} mm)
              </text>

              {/* Top Rider Roll applying relief pressure */}
              <circle cx="350" cy={120 - Math.min(95, Math.max(45, rollDiameter / 10)) - 24} r="24" fill="url(#rubberRollGrad)" stroke="#34d399" strokeWidth="2" />
              <line x1="350" y1={120 - Math.min(95, Math.max(45, rollDiameter / 10)) - 24} x2="350" y2="15" stroke="#38bdf8" strokeWidth="4" />
              
              {/* Programmed Relief Box */}
              <rect x="530" y="40" width="180" height="95" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="620" y="62" fill="#38bdf8" fontSize="11" fontWeight="black" textAnchor="middle">
                Programmed Nip Relief:
              </text>
              <text x="620" y="82" fill="#ffffff" fontSize="10" textAnchor="middle">
                Tekanan Rider: <strong className="text-amber-300">{riderRollPressure} kN/m</strong>
              </text>
              <text x="620" y="98" fill="#94a3b8" fontSize="9" textAnchor="middle">
                Awal: 4.2 kN/m &rarr; Akhir: 1.2 kN/m
              </text>
              <text x="620" y="118" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">
                Cegah Kerusakan Core & Crepe Burst
              </text>

              {/* Hydraulic Doffing Arms */}
              <path d="M 480 240 L 550 280 L 620 280" fill="none" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
              <text x="560" y="305" fill="#f59e0b" fontSize="11" fontWeight="bold">Lengan Doffing Hidrolik</text>
            </svg>
          </div>
        )}
      </div>

      {/* Bottom Parameter Telemetry Display */}
      <div className="relative z-20 p-2.5 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-amber-400 font-bold flex items-center gap-1">
            <Gauge className="w-3.5 h-3.5" />
            Parameter Aktif:
          </span>
          <span className="text-slate-300">
            Canting: <strong className="text-white">0.5°</strong> &bull; Overlap: <strong className="text-white">1.2 mm</strong> &bull; Apex Bowed: <strong className="text-white">20°</strong> &bull; Separasi: <strong className="text-emerald-400 font-bold">+3.5 mm</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-bold">
            Interweaving Risk: 0%
          </span>
        </div>
      </div>
    </div>
  );
};

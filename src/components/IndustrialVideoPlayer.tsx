import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  SkipForward,
  SkipBack,
  Gauge,
  ExternalLink,
  ShieldCheck,
  Radio,
  CheckCircle2,
  Sparkles,
  AlertTriangle,
  Scissors,
  Layers,
  Settings,
  Flame,
  Info
} from 'lucide-react';
import { MachineVideoTutorial } from '../types';

interface IndustrialVideoPlayerProps {
  video: MachineVideoTutorial;
  allVideos: MachineVideoTutorial[];
  onSelectVideo: (videoId: string) => void;
  activeChapterIndex: number;
  onSelectChapter: (index: number) => void;
  machineName?: string;
}

export const IndustrialVideoPlayer: React.FC<IndustrialVideoPlayerProps> = ({
  video,
  allVideos,
  onSelectVideo,
  activeChapterIndex,
  onSelectChapter,
  machineName = 'Mesin Pabrik Kertas'
}) => {
  // Playback States
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isVoiceNarrationActive, setIsVoiceNarrationActive] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [playerMode, setPlayerMode] = useState<'simulator' | 'youtube'>('simulator');
  const [webSpeedTelemetry, setWebSpeedTelemetry] = useState<number>(420);
  const [tensionTelemetry, setTensionTelemetry] = useState<number>(185);

  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTickTimeRef = useRef<number>(Date.now());

  // Parse duration string "MM:SS" into total seconds
  const totalDurationSec = React.useMemo(() => {
    if (!video?.duration) return 300;
    const parts = video.duration.split(':');
    if (parts.length === 2) {
      return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    }
    return 300;
  }, [video?.duration]);

  // Convert seconds into "MM:SS" format
  const formatTime = (sec: number): string => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Determine current chapter from currentTimeSec
  const currentChapter = React.useMemo(() => {
    if (!video?.chapters || video.chapters.length === 0) return null;
    const chapterCount = video.chapters.length;
    const timePerChapter = totalDurationSec / chapterCount;
    const calculatedIndex = Math.min(
      Math.floor(currentTimeSec / timePerChapter),
      chapterCount - 1
    );
    return {
      index: calculatedIndex,
      data: video.chapters[calculatedIndex]
    };
  }, [video?.chapters, currentTimeSec, totalDurationSec]);

  // Keep parent chapter index in sync
  useEffect(() => {
    if (currentChapter && currentChapter.index !== activeChapterIndex) {
      onSelectChapter(currentChapter.index);
    }
  }, [currentChapter?.index]);

  // Optional Indonesian voice narration synthesis using Web Speech API
  useEffect(() => {
    if (!isPlaying || isMuted || !isVoiceNarrationActive) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      return;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window && currentChapter?.data) {
      window.speechSynthesis.cancel(); // Cancel previous speech
      const text = `${currentChapter.data.topic}. ${currentChapter.data.note}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = playbackSpeed;
      utterance.pitch = 1.0;
      
      // Try to select Indonesian voice if available
      const voices = window.speechSynthesis.getVoices();
      const idVoice = voices.find(v => v.lang.startsWith('id') || v.lang.includes('ID'));
      if (idVoice) utterance.voice = idVoice;

      window.speechSynthesis.speak(utterance);
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentChapter?.index, isPlaying, isMuted, isVoiceNarrationActive, playbackSpeed]);

  // Playback timer loop with requestAnimationFrame
  useEffect(() => {
    if (!isPlaying) {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      return;
    }

    lastTickTimeRef.current = Date.now();

    const loop = () => {
      const now = Date.now();
      const deltaSec = ((now - lastTickTimeRef.current) / 1000) * playbackSpeed;
      lastTickTimeRef.current = now;

      setCurrentTimeSec((prev) => {
        const next = prev + deltaSec;
        if (next >= totalDurationSec) {
          setIsPlaying(false);
          return totalDurationSec;
        }
        return next;
      });

      // Fluctuate telemetry slightly for realism
      setWebSpeedTelemetry((prev) => {
        const jitter = (Math.random() - 0.5) * 4;
        return Math.min(500, Math.max(380, Math.round(prev + jitter)));
      });
      setTensionTelemetry((prev) => {
        const jitter = (Math.random() - 0.5) * 2;
        return Math.min(220, Math.max(160, Math.round(prev + jitter)));
      });

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying, playbackSpeed, totalDurationSec]);

  // Handle timeline scrubbing
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTimeSec(newTime);
  };

  // Jump to specific chapter
  const jumpToChapter = (idx: number) => {
    if (!video?.chapters || video.chapters.length === 0) return;
    const timePerChapter = totalDurationSec / video.chapters.length;
    const targetSec = idx * timePerChapter;
    setCurrentTimeSec(targetSec);
    onSelectChapter(idx);
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Youtube search / direct watch fallback URL
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${video?.title || 'slitter rewinder paper machine'} tutorial industri`
  )}`;

  // Determine machine simulation type
  const isRewinder = video.id.includes('rew') || video.title.toLowerCase().includes('rewinder') || video.title.toLowerCase().includes('slitter');
  const isK3Safety = video.title.toLowerCase().includes('k3') || video.title.toLowerCase().includes('loto') || video.title.toLowerCase().includes('keselamatan');
  const isStockPrep = video.id.includes('sp') || video.title.toLowerCase().includes('hdc') || video.title.toLowerCase().includes('ddr') || video.title.toLowerCase().includes('peo');
  const isTissuePm = video.id.includes('tm') || video.id.includes('pm') || video.title.toLowerCase().includes('cylinder') || video.title.toLowerCase().includes('tissue');

  return (
    <div 
      ref={containerRef}
      id="industrial-video-player"
      className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl space-y-4 p-4 transition-all"
    >
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-amber-500/20 text-amber-300 border border-amber-500/40">
              <Radio className={`w-3 h-3 text-amber-400 ${isPlaying ? 'animate-pulse text-emerald-400' : ''}`} />
              {isPlaying ? 'Video Sedang Berputar' : 'Video Siap Ditonton'}
            </span>
            <span className="text-slate-400 text-xs font-semibold">
              {video.category}
            </span>
          </div>
          <h4 className="text-base sm:text-lg font-black text-white leading-snug flex items-center gap-2">
            {video.title}
          </h4>
        </div>

        {/* Mode Selector & Video Switcher */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 flex items-center gap-1">
            <button
              onClick={() => setPlayerMode('simulator')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                playerMode === 'simulator'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Player Interaktif (100% Lancar)</span>
            </button>

            <button
              onClick={() => setPlayerMode('youtube')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                playerMode === 'youtube'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Streaming YouTube</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Player Display Frame */}
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-black border-2 border-slate-800/90 shadow-2xl flex flex-col justify-between group">
        {playerMode === 'simulator' ? (
          /* NATIVE INTERACTIVE SIMULATOR & PROCESS CANVAS */
          <div className="relative w-full h-full flex flex-col justify-between p-4 overflow-hidden select-none">
            {/* Background Grid Pattern */}
            <div 
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, #06b6d4 1px, transparent 0)',
                backgroundSize: '24px 24px'
              }}
            />

            {/* Dynamic Telemetry HUD on Top */}
            <div className="relative z-10 flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 flex items-center gap-2">
                  <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[11px] text-slate-300 font-mono">
                    Kecepatan Web: <strong className="text-cyan-300 font-bold">{webSpeedTelemetry} mpm</strong>
                  </span>
                </div>

                <div className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 flex items-center gap-2">
                  <Radio className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[11px] text-slate-300 font-mono">
                    Tension: <strong className="text-amber-300 font-bold">{tensionTelemetry} N/m</strong>
                  </span>
                </div>
              </div>

              <div className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[11px] text-emerald-300 font-bold">
                  SOP Terverifikasi: {machineName}
                </span>
              </div>
            </div>

            {/* Visual Mechanical Simulation Center Stage */}
            <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center px-4">
              {isRewinder && !isK3Safety && (
                /* REWINDER & SLITTER ANIMATED VISUALIZATION */
                <div className="w-full max-w-2xl bg-slate-900/80 border border-amber-500/30 rounded-2xl p-4 backdrop-blur-md shadow-2xl space-y-3">
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800 text-amber-300 font-bold">
                    <div className="flex items-center gap-2">
                      <Scissors className="w-4 h-4 text-amber-400" />
                      <span>Simulasi Mekanisme Pemotongan Slitter & Banana Roll</span>
                    </div>
                    <span className="bg-amber-950/80 px-2 py-0.5 rounded text-[10px] text-amber-200 border border-amber-800">
                      Canting: 0.5° &bull; Overlap: 1.2 mm
                    </span>
                  </div>

                  {/* Mechanical Schematic Diagram */}
                  <div className="grid grid-cols-4 gap-2 text-center text-xs py-2">
                    <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase font-extrabold block">1. Unwinder Stand</span>
                      <div className={`h-12 rounded-lg bg-amber-950/40 border border-amber-800/60 flex items-center justify-center font-mono text-amber-300 text-xs ${isPlaying ? 'animate-pulse' : ''}`}>
                        Jumbo Roll
                      </div>
                      <span className="text-[9px] text-slate-400">Pneumatic Disc Brake</span>
                    </div>

                    <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase font-extrabold block">2. Slitter Shear Cut</span>
                      <div className={`h-12 rounded-lg bg-cyan-950/40 border border-cyan-800/60 flex items-center justify-center font-mono text-cyan-300 text-xs ${isPlaying ? 'ring-2 ring-cyan-400' : ''}`}>
                        Top & Bottom Slitter
                      </div>
                      <span className="text-[9px] text-cyan-400">Pisau Cincin Karbida</span>
                    </div>

                    <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase font-extrabold block">3. Banana Bowed Roll</span>
                      <div className={`h-12 rounded-lg bg-emerald-950/40 border border-emerald-800/60 flex items-center justify-center font-mono text-emerald-300 text-xs ${isPlaying ? 'animate-bounce' : ''}`}>
                        Lengkung Apex Aktif
                      </div>
                      <span className="text-[9px] text-emerald-400">Pemisah Celah Roll</span>
                    </div>

                    <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase font-extrabold block">4. Drum Roll Winder</span>
                      <div className={`h-12 rounded-lg bg-purple-950/40 border border-purple-800/60 flex items-center justify-center font-mono text-purple-300 text-xs ${isPlaying ? 'animate-pulse' : ''}`}>
                        Rider Roll Press
                      </div>
                      <span className="text-[9px] text-purple-400">Gulungan Siap Doffing</span>
                    </div>
                  </div>

                  <div className="text-[11px] bg-slate-950/90 text-slate-300 p-2 rounded-lg border border-slate-800 flex items-center justify-between">
                    <span>
                      <strong className="text-amber-400">Status Aksi: </strong>
                      {currentChapter?.data.topic || 'Operasi Mesin Rewinder Normal'}
                    </span>
                    <span className="text-emerald-400 font-bold font-mono">
                      Bebas Interweaving &bull; Tension Terkendali
                    </span>
                  </div>
                </div>
              )}

              {isK3Safety && (
                /* K3 SAFETY & LOTO VISUALIZATION */
                <div className="w-full max-w-2xl bg-slate-900/80 border border-rose-500/40 rounded-2xl p-4 backdrop-blur-md shadow-2xl space-y-3">
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800 text-rose-400 font-bold">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-rose-400" />
                      <span>Prosedur Keselamatan Kerja K3 & Lock Out Tag Out (LOTO)</span>
                    </div>
                    <span className="bg-rose-950 px-2 py-0.5 rounded text-[10px] text-rose-300 border border-rose-800">
                      Zero Energy Rule
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 text-xs text-center py-2">
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <AlertTriangle className="w-6 h-6 text-amber-400 mx-auto mb-1" />
                      <span className="font-bold text-white block">Titik Jepit Roll</span>
                      <span className="text-[10px] text-slate-400">Dilarang membersihkan roll manual saat berputar</span>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-xl border border-rose-900/60 bg-rose-950/20">
                      <ShieldCheck className="w-6 h-6 text-rose-400 mx-auto mb-1" />
                      <span className="font-bold text-rose-300 block">Kunci LOTO Terpasang</span>
                      <span className="text-[10px] text-rose-200">Gembok isolasi saklar utama saat ganti pisau</span>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
                      <span className="font-bold text-emerald-300 block">Emergency Pull-Wire</span>
                      <span className="text-[10px] text-slate-400">Kabel kawat darurat berfungsi 100% responsif</span>
                    </div>
                  </div>

                  <div className="text-[11px] bg-rose-950/60 text-rose-200 p-2 rounded-lg border border-rose-900/70 flex items-center justify-between">
                    <span>
                      <strong>Instruksi K3: </strong>
                      {currentChapter?.data.note || 'Wajib APD sarung tangan anti-potong level 5.'}
                    </span>
                    <span className="font-bold text-amber-300">Wajib Dipatuhi</span>
                  </div>
                </div>
              )}

              {isStockPrep && (
                /* STOCK PREPARATION SIMULATOR */
                <div className="w-full max-w-2xl bg-slate-900/80 border border-emerald-500/40 rounded-2xl p-4 backdrop-blur-md shadow-2xl space-y-3">
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800 text-emerald-400 font-bold">
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4 text-emerald-400" />
                      <span>Alur Sirkulasi Stock Prep: HDC, DDR, & Larutan PEO</span>
                    </div>
                    <span className="bg-emerald-950 px-2 py-0.5 rounded text-[10px] text-emerald-300 border border-emerald-800">
                      Freeness: 320 - 350 CSF
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 text-xs text-center py-2">
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="font-bold text-cyan-300 block">HDC Cleaner</span>
                      <span className="text-[10px] text-slate-400 block mt-1">Inlet 1.5 bar &bull; Accept 0.5 bar</span>
                      <span className="text-[10px] text-emerald-400 font-mono">Delta P: 1.0 bar</span>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="font-bold text-amber-300 block">DDR Refiner</span>
                      <span className="text-[10px] text-slate-400 block mt-1">Konsistensi: 3.5 - 4.5%</span>
                      <span className="text-[10px] text-amber-300 font-mono">Fibrilasi Terkendali</span>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="font-bold text-purple-300 block">Larutan PEO Axfloc</span>
                      <span className="text-[10px] text-slate-400 block mt-1">Standar Viskositas:</span>
                      <span className="text-[10px] text-purple-300 font-mono font-bold">17 - 19 Cps</span>
                    </div>
                  </div>

                  <div className="text-[11px] bg-emerald-950/60 text-emerald-200 p-2 rounded-lg border border-emerald-900/70 flex items-center justify-between">
                    <span>
                      <strong>Proses Aktif: </strong>
                      {currentChapter?.data.topic || 'Siklus Pembersihan & Pencampuran'}
                    </span>
                    <span className="font-bold text-cyan-300 font-mono">Kualitas Bubur Prima</span>
                  </div>
                </div>
              )}

              {isTissuePm && (
                /* TISSUE MACHINE (PM) SIMULATOR */
                <div className="w-full max-w-2xl bg-slate-900/80 border border-blue-500/40 rounded-2xl p-4 backdrop-blur-md shadow-2xl space-y-3">
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800 text-blue-400 font-bold">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-blue-400" />
                      <span>Forming Cylinder Mould &rarr; Yankee 85-90°C &rarr; Pope Reel 127.5 mpm</span>
                    </div>
                    <span className="bg-blue-950 px-2 py-0.5 rounded text-[10px] text-blue-300 border border-blue-800">
                      Creping Ratio: 15%
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 text-xs text-center py-2">
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="font-bold text-cyan-300 block">Wet End Forming</span>
                      <span className="text-[10px] text-slate-400 block mt-1">Cylinder Vat Mould</span>
                      <span className="text-[10px] text-cyan-300 font-mono">Kain Felt 2.4 M</span>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="font-bold text-amber-300 block flex items-center justify-center gap-1">
                        <Flame className="w-3 h-3 text-amber-400" />
                        Yankee MG Dryer
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-1">Uap Steam 1.0 - 3.0 bar</span>
                      <span className="text-[10px] text-amber-300 font-mono">Suhu 85 - 90°C</span>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="font-bold text-purple-300 block">Pope Reel & Creping</span>
                      <span className="text-[10px] text-slate-400 block mt-1">Doctor Blade Creping</span>
                      <span className="text-[10px] text-purple-300 font-mono font-bold">Speed 127.5 mpm</span>
                    </div>
                  </div>

                  <div className="text-[11px] bg-blue-950/60 text-blue-200 p-2 rounded-lg border border-blue-900/70 flex items-center justify-between">
                    <span>
                      <strong>Fase Pembelajaran: </strong>
                      {currentChapter?.data.topic || 'Kontinuitas Pembentukan & Pengeringan Lembaran'}
                    </span>
                    <span className="font-bold text-emerald-300 font-mono">BW: 12 - 42 gsm</span>
                  </div>
                </div>
              )}
            </div>

            {/* Subtitle & Narration Display Box */}
            <div className="relative z-10 bg-black/85 backdrop-blur-md rounded-xl p-3 border border-slate-800 text-xs space-y-1 shadow-lg">
              <div className="flex items-center justify-between text-[11px] text-slate-400 pb-1 border-b border-slate-800/80">
                <span className="font-bold text-amber-400 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-amber-400" />
                  Bab {currentChapter ? currentChapter.index + 1 : 1}: {currentChapter?.data.topic || 'Pendahuluan Materi'}
                </span>
                <span className="font-mono text-slate-300">
                  {currentChapter?.data.time || '00:00'}
                </span>
              </div>
              <p className="text-white font-medium leading-relaxed text-xs sm:text-sm">
                "{currentChapter?.data.note || video.description}"
              </p>
            </div>
          </div>
        ) : (
          /* YOUTUBE STREAMING MODE WITH DIRECT WORKING LINK */
          <div className="relative w-full h-full bg-black flex flex-col items-center justify-center">
            {video.youtubeId ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?rel=0&modestbranding=1&enablejsapi=1`}
                title={video.title}
                referrerPolicy="no-referrer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            ) : null}

            {/* External Direct Watch Overlay if iframe blocked */}
            <div className="absolute top-3 right-3 z-20">
              <a
                href={youtubeSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-1.5 transition-all transform hover:scale-105"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Tonton di YouTube (Tab Baru)</span>
              </a>
            </div>
          </div>
        )}

        {/* Video Big Play Overlay Button when paused in simulator mode */}
        {playerMode === 'simulator' && !isPlaying && (
          <div 
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 z-20 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-black/30"
          >
            <div className="p-5 bg-gradient-to-tr from-amber-600 to-orange-500 rounded-full shadow-2xl text-white transform group-hover:scale-110 transition-transform flex items-center justify-center ring-4 ring-amber-400/40">
              <Play className="w-10 h-10 fill-current translate-x-0.5" />
            </div>
            <span className="text-white font-black text-sm sm:text-base mt-3 drop-shadow">
              Klik untuk Memutar Video Tutorial & Simulasi
            </span>
            <span className="text-xs text-amber-300 mt-1 font-semibold">
              Bisa ditonton langsung 100% tanpa hambatan jaringan
            </span>
          </div>
        )}
      </div>

      {/* Modern Video Control Bar */}
      <div className="bg-slate-900/90 border border-slate-800/90 rounded-xl p-3 space-y-2.5 shadow-inner">
        {/* Seekable Progress Slider */}
        <div className="space-y-1">
          <div className="relative flex items-center">
            <input
              type="range"
              min={0}
              max={totalDurationSec}
              step={0.5}
              value={currentTimeSec}
              onChange={handleSeek}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500 hover:accent-amber-400"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span className="text-amber-300 font-bold">{formatTime(currentTimeSec)}</span>
            <span>Total Durasi: {formatTime(totalDurationSec)}</span>
          </div>
        </div>

        {/* Action Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* Left: Play/Pause, Rewind, Next Chapter */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`p-2 rounded-xl text-white font-bold transition-all shadow ${
                isPlaying 
                  ? 'bg-amber-600 hover:bg-amber-500' 
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400'
              }`}
              title={isPlaying ? 'Jeda Video' : 'Putar Video'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            <button
              onClick={() => {
                setCurrentTimeSec(0);
                setIsPlaying(true);
              }}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
              title="Ulangi dari Awal"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Chapter Step Buttons */}
            <button
              onClick={() => {
                if (currentChapter && currentChapter.index > 0) {
                  jumpToChapter(currentChapter.index - 1);
                }
              }}
              disabled={!currentChapter || currentChapter.index === 0}
              className="p-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 rounded-xl transition-colors"
              title="Bab Sebelumnya"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                if (currentChapter && currentChapter.index < (video.chapters.length - 1)) {
                  jumpToChapter(currentChapter.index + 1);
                }
              }}
              disabled={!currentChapter || currentChapter.index >= (video.chapters.length - 1)}
              className="p-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 rounded-xl transition-colors"
              title="Bab Berikutnya"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            {/* Voice Audio Narration Toggle */}
            <button
              onClick={() => {
                setIsVoiceNarrationActive(!isVoiceNarrationActive);
                setIsMuted(false);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isVoiceNarrationActive && !isMuted
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
                  : 'bg-slate-800 text-slate-400'
              }`}
              title="Narasi Suara Otomatis"
            >
              {isVoiceNarrationActive && !isMuted ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>Narasi Audio</span>
            </button>
          </div>

          {/* Right: Speed controls, Fullscreen, Video Playlist Selector */}
          <div className="flex items-center gap-2">
            {/* Speed Selector */}
            <div className="flex items-center bg-slate-950 rounded-lg p-0.5 border border-slate-800 text-xs">
              {[0.75, 1, 1.25, 1.5].map((speed) => (
                <button
                  key={speed}
                  onClick={() => setPlaybackSpeed(speed)}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                    playbackSpeed === speed
                      ? 'bg-amber-500 text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
              title={isFullscreen ? 'Keluar Layar Penuh' : 'Layar Penuh'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Chapter Grid & Playlist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2">
        {/* Chapters List */}
        <div className="lg:col-span-2 bg-slate-900/80 rounded-xl p-3 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Daftar Bab Pembelajaran (Klik untuk Langsung Lompat ke Menit Terkait):</span>
            </span>
            <span className="text-[11px] text-amber-400 font-mono">
              {video.chapters.length} Bab Tutorial
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {video.chapters.map((ch, idx) => {
              const isCurrent = currentChapter?.index === idx;
              return (
                <button
                  key={idx}
                  onClick={() => jumpToChapter(idx)}
                  className={`text-left p-2.5 rounded-xl text-xs transition-all border flex flex-col justify-between gap-1 group ${
                    isCurrent
                      ? 'bg-amber-500/20 border-amber-500 text-white ring-1 ring-amber-400/40 shadow'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-300 group-hover:text-amber-200">
                      {idx + 1}. {ch.topic}
                    </span>
                    <span className="font-mono text-[10px] bg-slate-900 px-1.5 py-0.5 rounded text-slate-400 border border-slate-800">
                      {ch.time}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                    {ch.note}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Video Playlist & Other Videos */}
        <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800 space-y-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 mb-2">
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                Video Terkait Mesin Ini
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 rounded">
                {allVideos.length} Video
              </span>
            </div>

            <div className="space-y-1.5">
              {allVideos.map((vid, vIdx) => {
                const isActive = vid.id === video.id;
                return (
                  <button
                    key={vid.id}
                    onClick={() => {
                      onSelectVideo(vid.id);
                      setCurrentTimeSec(0);
                      setIsPlaying(true);
                    }}
                    className={`w-full text-left p-2 rounded-xl text-xs transition-all border flex items-center gap-2.5 ${
                      isActive
                        ? 'bg-cyan-950/60 border-cyan-500/80 text-white ring-1 ring-cyan-400/40'
                        : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg text-white font-bold text-xs shrink-0 ${
                      isActive ? 'bg-cyan-600' : 'bg-slate-800'
                    }`}>
                      {vIdx + 1}
                    </div>
                    <div className="overflow-hidden">
                      <span className="font-bold block truncate text-slate-200 text-xs">
                        {vid.title}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        Durasi: {vid.duration}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* External Fallback Links */}
          <div className="pt-2 border-t border-slate-800 mt-2">
            <a
              href={youtubeSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-2 px-3 bg-red-950/60 hover:bg-red-900/60 border border-red-800/60 rounded-xl text-red-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Buka Video YouTube di Tab Baru</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

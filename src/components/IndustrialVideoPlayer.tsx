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
  BookOpen,
  ChevronDown,
  ChevronUp,
  Cpu
} from 'lucide-react';
import { MachineVideoTutorial } from '../types';
import { SlitterRewinderRealisticSimulation, CameraViewMode } from './SlitterRewinderRealisticSimulation';
import { K3SafetyRealisticSimulation } from './K3SafetyRealisticSimulation';
import { StockPrepRealisticSimulation } from './StockPrepRealisticSimulation';
import { PaperMachineRealisticSimulation } from './PaperMachineRealisticSimulation';
import { industrialAudio } from '../utils/industrialAudioEngine';

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
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [playerMode, setPlayerMode] = useState<'simulator' | 'youtube'>('simulator');
  const [isDetailsExpanded, setIsDetailsExpanded] = useState<boolean>(true);
  const [, setActiveCameraView] = useState<CameraViewMode>('overview');

  // Telemetry simulation jitter
  const [webSpeedTelemetry, setWebSpeedTelemetry] = useState<number>(650);
  const [tensionTelemetry, setTensionTelemetry] = useState<number>(185);

  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTickTimeRef = useRef<number>(Date.now());
  const lastSpokenChapterIndexRef = useRef<number>(-1);

  // Parse total duration from "MM:SS"
  const totalDurationSec = React.useMemo(() => {
    if (!video?.duration) return 300;
    const parts = video.duration.split(':').map((p) => parseInt(p, 10));
    if (parts.length === 2) {
      return (parts[0] || 0) * 60 + (parts[1] || 0);
    }
    return 300;
  }, [video?.duration]);

  // Compute active chapter based on currentTimeSec
  const currentChapter = React.useMemo(() => {
    if (!video?.chapters || video.chapters.length === 0) return null;
    const timePerChapter = totalDurationSec / video.chapters.length;
    const calculatedIndex = Math.min(
      video.chapters.length - 1,
      Math.max(0, Math.floor(currentTimeSec / timePerChapter))
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

  // Handle Voice Narration with zero-stutter industrial audio engine
  useEffect(() => {
    if (!isPlaying || isMuted || !isVoiceNarrationActive) {
      industrialAudio.stopSpeech();
      industrialAudio.stopMachineHum();
      return;
    }

    // Start background running hum
    industrialAudio.startMachineHum(0.06);

    // Speak chapter narration when chapter index changes
    if (currentChapter && currentChapter.index !== lastSpokenChapterIndexRef.current) {
      lastSpokenChapterIndexRef.current = currentChapter.index;

      // Play soft transition chime
      industrialAudio.playChapterChime(0.18);

      const chapterData = currentChapter.data;
      // Prefer spokenNarration if present, otherwise detailedExplanation, or note
      const narrationText = chapterData.spokenNarration || chapterData.detailedExplanation || `${chapterData.topic}. ${chapterData.note}`;
      industrialAudio.speakIndonesian(narrationText, speechRate);
    }
  }, [currentChapter?.index, isPlaying, isMuted, isVoiceNarrationActive, speechRate]);

  // Stop audio on unmount or pause
  useEffect(() => {
    return () => {
      industrialAudio.stopSpeech();
      industrialAudio.stopMachineHum();
    };
  }, []);

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
          industrialAudio.stopMachineHum();
          industrialAudio.stopSpeech();
          return totalDurationSec;
        }
        return next;
      });

      // Fluctuate telemetry slightly for realism
      setWebSpeedTelemetry((prev) => {
        const jitter = (Math.random() - 0.5) * 4;
        return Math.min(850, Math.max(500, Math.round(prev + jitter)));
      });
      setTensionTelemetry((prev) => {
        const jitter = (Math.random() - 0.5) * 2;
        return Math.min(210, Math.max(165, Math.round(prev + jitter)));
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
    const targetSec = idx * timePerChapter + 0.1;
    setCurrentTimeSec(targetSec);
    lastSpokenChapterIndexRef.current = -1; // Reset to force re-reading
    onSelectChapter(idx);
  };

  // Manual replay narration button
  const handleReplayNarration = () => {
    if (!currentChapter) return;
    const chapterData = currentChapter.data;
    const narrationText = chapterData.spokenNarration || chapterData.detailedExplanation || `${chapterData.topic}. ${chapterData.note}`;
    industrialAudio.speakIndonesian(narrationText, speechRate);
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

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

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
              {isPlaying ? 'Video Simulasi Sedang Berputar' : 'Video Siap Ditonton'}
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
              <span>Simulasi Nyata & Narasi</span>
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
          <div className="relative w-full h-full flex flex-col justify-between overflow-hidden select-none">
            {/* REALISTIC SLITTER REWINDER SIMULATION COMPONENT */}
            {isRewinder && !isK3Safety ? (
              <div className="w-full h-full">
                <SlitterRewinderRealisticSimulation
                  isPlaying={isPlaying}
                  playbackSpeed={playbackSpeed}
                  currentChapterIndex={currentChapter?.index || 0}
                  activeChapterData={currentChapter?.data}
                  onSelectCameraView={(view) => setActiveCameraView(view)}
                />
              </div>
            ) : isK3Safety ? (
              /* K3 SAFETY & LOTO INTERACTIVE REALISTIC SIMULATION */
              <div className="w-full h-full">
                <K3SafetyRealisticSimulation
                  isPlaying={isPlaying}
                  playbackSpeed={playbackSpeed}
                  currentChapterIndex={currentChapter?.index || 0}
                  activeChapterData={currentChapter?.data}
                />
              </div>
            ) : isStockPrep ? (
              /* STOCK PREPARATION INTERACTIVE REALISTIC SIMULATION */
              <div className="w-full h-full">
                <StockPrepRealisticSimulation
                  isPlaying={isPlaying}
                  playbackSpeed={playbackSpeed}
                  currentChapterIndex={currentChapter?.index || 0}
                  activeChapterData={currentChapter?.data}
                />
              </div>
            ) : (
              /* PAPER MACHINE (PM1, PM2, PM5, TISSUE PM) INTERACTIVE REALISTIC SIMULATION */
              <div className="w-full h-full">
                <PaperMachineRealisticSimulation
                  isPlaying={isPlaying}
                  playbackSpeed={playbackSpeed}
                  currentChapterIndex={currentChapter?.index || 0}
                  activeChapterData={currentChapter?.data}
                  machineId={video.id.includes('pm1') ? 'PM1' : video.id.includes('pm2') ? 'PM2' : video.id.includes('pm5') ? 'PM5' : 'TISSUE_PM'}
                />
              </div>
            )}
          </div>
        ) : (
          /* YOUTUBE STREAMING MODE WITH DIRECT WORKING LINK & RESILIENT FALLBACK */
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
            ) : (
              <div className="text-center p-6 text-slate-400 space-y-3">
                <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto" />
                <p className="text-sm font-medium">ID Video YouTube belum dikonfigurasi untuk modul ini.</p>
                <button
                  onClick={() => setPlayerMode('simulator')}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl"
                >
                  Beralih ke Simulasi Nyata
                </button>
              </div>
            )}

            {/* Notification & Quick Navigation Banner if iframe is restricted */}
            <div className="absolute top-2 left-2 right-2 z-20 flex flex-wrap items-center justify-between gap-2 p-2.5 bg-slate-950/90 backdrop-blur-md rounded-xl border border-slate-800/90 shadow-xl">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="font-semibold text-white">Streaming YouTube:</span>
                <span className="hidden sm:inline text-slate-400">Jika video dibatasi hak siar atau jaringan pabrik:</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPlayerMode('simulator')}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-lg shadow-md flex items-center gap-1.5 transition-all transform hover:scale-105"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Buka Simulasi Nyata (100% Aktif)</span>
                </button>
                <a
                  href={youtubeSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg shadow-md flex items-center gap-1.5 transition-all transform hover:scale-105"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Buka di YouTube (Tab Baru)</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Video Big Play Overlay Button when paused in simulator mode */}
        {playerMode === 'simulator' && !isPlaying && (
          <div 
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 z-30 bg-black/50 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-black/40"
          >
            <div className="p-5 bg-gradient-to-tr from-amber-600 to-orange-500 rounded-full shadow-2xl text-white transform group-hover:scale-110 transition-transform flex items-center justify-center ring-4 ring-amber-400/40">
              <Play className="w-10 h-10 fill-current translate-x-0.5" />
            </div>
            <span className="text-white font-black text-sm sm:text-base mt-3 drop-shadow">
              Klik untuk Memutar Simulasi Mesin & Narasi Suara
            </span>
            <span className="text-xs text-amber-300 mt-1 font-semibold">
              Dilengkapi animasi mekanik nyata dan penjelasan teknis mendalam
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
                const nextState = !isVoiceNarrationActive;
                setIsVoiceNarrationActive(nextState);
                if (!nextState) {
                  industrialAudio.stopSpeech();
                } else if (isPlaying) {
                  handleReplayNarration();
                }
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isVoiceNarrationActive && !isMuted
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
                  : 'bg-slate-800 text-slate-400'
              }`}
              title="Narasi Suara Otomatis"
            >
              {isVoiceNarrationActive && !isMuted ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>Narasi Audio Suara</span>
            </button>

            {/* Replay Narration Audio */}
            <button
              onClick={handleReplayNarration}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
              title="Ulangi Narasi Audio Bab Ini"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Baca Ulang Suara</span>
            </button>
          </div>

          {/* Right: Speech Speed, Video Speed, Fullscreen */}
          <div className="flex items-center gap-2">
            {/* Speech Rate Selector */}
            <div className="hidden sm:flex items-center bg-slate-950 rounded-lg p-0.5 border border-slate-800 text-xs">
              <span className="text-[10px] text-slate-400 px-1.5">Suara:</span>
              {[0.85, 1.0, 1.15].map((rate) => (
                <button
                  key={rate}
                  onClick={() => setSpeechRate(rate)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-semibold transition-all ${
                    speechRate === rate
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title={`Kecepatan Suara ${rate}x`}
                >
                  {rate}x
                </button>
              ))}
            </div>

            {/* Video Speed Selector */}
            <div className="flex items-center bg-slate-950 rounded-lg p-0.5 border border-slate-800 text-xs">
              <span className="text-[10px] text-slate-400 px-1.5">Video:</span>
              {[0.75, 1, 1.25, 1.5].map((speed) => (
                <button
                  key={speed}
                  onClick={() => setPlaybackSpeed(speed)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-semibold transition-all ${
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

      {/* Subtitle & Deep Technical Explanation Card */}
      {currentChapter && (
        <div className="bg-slate-900/95 border border-amber-500/30 rounded-xl p-4 space-y-3 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="bg-amber-500 text-black text-[10px] font-black px-2 py-0.5 rounded uppercase">
                Bab {currentChapter.index + 1}
              </span>
              <h5 className="text-sm sm:text-base font-black text-white">
                {currentChapter.data.topic}
              </h5>
            </div>
            <button
              onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
            >
              <span>{isDetailsExpanded ? 'Tutup Spesifikasi' : 'Buka Spesifikasi Lengkap'}</span>
              {isDetailsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Spoken Text Highlight */}
          <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800">
            <span className="text-[10px] text-amber-400 font-extrabold uppercase tracking-wide block mb-1 flex items-center gap-1">
              <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
              Narasi Suara Pelatihan:
            </span>
            <p className="text-white text-xs sm:text-sm font-medium leading-relaxed">
              "{currentChapter.data.spokenNarration || currentChapter.data.detailedExplanation || currentChapter.data.note}"
            </p>
          </div>

          {/* Expandable In-Depth Engineering Details & Specs */}
          {isDetailsExpanded && (
            <div className="space-y-3 pt-2 border-t border-slate-800/80">
              {currentChapter.data.detailedExplanation && (
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                    Penjelasan Teori & Mekanika Mesin:
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/50 p-3 rounded-lg border border-slate-800/70">
                    {currentChapter.data.detailedExplanation}
                  </p>
                </div>
              )}

              {currentChapter.data.technicalSpecs && currentChapter.data.technicalSpecs.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5 text-amber-400" />
                    Standar Teknis & Batas Toleransi Pabrik:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentChapter.data.technicalSpecs.map((spec, sIdx) => (
                      <div key={sIdx} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
                        <span className="text-slate-400">{spec.label}:</span>
                        <strong className="text-amber-300 font-mono text-[11px]">{spec.val}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

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
              {allVideos.map((vid) => {
                const isActive = vid.id === video.id;
                return (
                  <button
                    key={vid.id}
                    onClick={() => {
                      onSelectVideo(vid.id);
                      setIsPlaying(true);
                      lastSpokenChapterIndexRef.current = -1;
                    }}
                    className={`w-full text-left p-2 rounded-xl text-xs transition-all border flex items-center gap-2.5 ${
                      isActive
                        ? 'bg-amber-500/20 border-amber-500 text-white'
                        : 'bg-slate-950/60 border-slate-800/60 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 overflow-hidden relative">
                      <img
                        src={vid.thumbnailUrl}
                        alt=""
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play className="w-3.5 h-3.5 text-white fill-current" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="font-bold text-white truncate block text-[11px]">
                        {vid.title}
                      </span>
                      <span className="text-[10px] text-slate-400 block font-mono">
                        {vid.duration} &bull; {vid.instructorRole}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Key Takeaways Card */}
          {video.keyTakeaways && video.keyTakeaways.length > 0 && (
            <div className="mt-3 p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-amber-400" />
                Poin Kunci Wajib Diingat:
              </span>
              <ul className="space-y-1 text-[11px] text-slate-300 list-disc list-inside leading-tight">
                {video.keyTakeaways.map((takeaway, tIdx) => (
                  <li key={tIdx} className="text-slate-300">
                    <span className="text-slate-200">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

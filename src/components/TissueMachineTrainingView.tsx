import React, { useState, useMemo } from 'react';
import { 
  TissueMachineEquipmentDetail, 
  TissueMachineQuizItem, 
  MachinePhotoItem,
  RoleResponsibilityGuide,
  TissueStageId
} from '../types';
import { 
  Factory, 
  Layers, 
  Filter, 
  Wrench, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Sliders, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Info, 
  AlertTriangle, 
  Gauge, 
  Zap, 
  Droplets, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Search, 
  Maximize2, 
  Activity, 
  FileText, 
  Settings, 
  Check, 
  Clock, 
  Users, 
  Compass,
  Play,
  Flame,
  Beaker,
  FileSpreadsheet,
  Calculator,
  RefreshCw,
  Eye,
  SlidersHorizontal,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

interface TissueMachineTrainingViewProps {
  equipments: TissueMachineEquipmentDetail[];
  quizzes: TissueMachineQuizItem[];
  roleGuides?: RoleResponsibilityGuide[];
  activeSubTab: string;
  onOpenPhoto?: (photo: MachinePhotoItem) => void;
  onWatchVideo?: (videoId?: string) => void;
  galleryPhotos?: MachinePhotoItem[];
}

export const TissueMachineTrainingView: React.FC<TissueMachineTrainingViewProps> = ({
  equipments,
  quizzes,
  roleGuides,
  activeSubTab,
  onOpenPhoto,
  onWatchVideo,
  galleryPhotos = []
}) => {
  // Local Stage Filter
  const [selectedStage, setSelectedStage] = useState<TissueStageId>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedEquipmentId, setExpandedEquipmentId] = useState<string | null>('tm-eq-2'); // Default open CRC
  const [activeRoleTab, setActiveRoleTab] = useState<'all' | 'operator' | 'helper' | 'karu' | 'kepalaPm'>('all');

  // Interactive Creping & Speed Calculator State (Slide 15 & Slide 17/18 Soal #3)
  const [yankeeSpeedInput, setYankeeSpeedInput] = useState<number>(150);
  const [crepingPercentInput, setCrepingPercentInput] = useState<number>(15);

  // Calculated Speed
  const calculatedPopeSpeed = useMemo(() => {
    const ratio = 1 - (crepingPercentInput / 100);
    return Number((yankeeSpeedInput * ratio).toFixed(1));
  }, [yankeeSpeedInput, crepingPercentInput]);

  // Interactive CRC & Dilution Simulator State (Slide 2 & 3)
  const [crcActualConsistency, setCrcActualConsistency] = useState<number>(2.76);
  const [crcSetPoint, setCrcSetPoint] = useState<number>(2.80);
  const [flowSetting, setFlowSetting] = useState<number>(36.0);
  const [dilutionState, setDilutionState] = useState<'normal' | 'high' | 'low'>('normal');

  const simulatedValveOpening = useMemo(() => {
    if (dilutionState === 'high') return 62.4; // Lebih membuka untuk encerkan
    if (dilutionState === 'low') return 24.5;  // Menutup
    return 39.67; // Normal (Slide 3)
  }, [dilutionState]);

  const simulatedActualFlow = useMemo(() => {
    if (dilutionState === 'high') return 72.8;
    if (dilutionState === 'low') return 48.2;
    return 65.52; // Actual dari foto Slide 3
  }, [dilutionState]);

  // Interactive Quiz State (Slide 17 & 18)
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [expandedQuizNumber, setExpandedQuizNumber] = useState<number | null>(null);

  // Filtered equipments
  const filteredEquipments = useMemo(() => {
    return equipments.filter(eq => {
      const matchStage = selectedStage === 'ALL' || eq.stage === selectedStage;
      const matchSearch = searchTerm.trim() === '' || 
        eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        eq.function.toLowerCase().includes(searchTerm.toLowerCase()) ||
        eq.workingPrinciple.toLowerCase().includes(searchTerm.toLowerCase()) ||
        eq.slideRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
        eq.categoryTag.toLowerCase().includes(searchTerm.toLowerCase());
      return matchStage && matchSearch;
    });
  }, [equipments, selectedStage, searchTerm]);

  // Calculate Quiz Score
  const quizScore = useMemo(() => {
    let score = 0;
    quizzes.forEach(q => {
      if (userAnswers[q.number] === q.correctAnswer) {
        score += 1;
      }
    });
    return score;
  }, [quizzes, userAnswers]);

  const handleSelectQuizAnswer = (quizNum: number, option: string) => {
    if (quizSubmitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [quizNum]: option
    }));
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setQuizSubmitted(false);
    setExpandedQuizNumber(null);
  };

  // Helper to open photo from equipment
  const handlePhotoClickForEquipment = (photoTitle?: string) => {
    if (!onOpenPhoto || !galleryPhotos.length) return;
    if (!photoTitle) {
      onOpenPhoto(galleryPhotos[0]);
      return;
    }
    const found = galleryPhotos.find(p => p.title.toLowerCase().includes(photoTitle.toLowerCase()) || p.subtitle.toLowerCase().includes(photoTitle.toLowerCase()));
    if (found) {
      onOpenPhoto(found);
    } else {
      onOpenPhoto(galleryPhotos[0]);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* ========================================================= */}
      {/* 1. HERO BANNER: MODUL RESMI TRAINING TISSUE MESIN (PM)     */}
      {/* ========================================================= */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/40 border border-blue-900/40 p-5 sm:p-6 shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-blue-500/20 text-blue-300 border border-blue-500/50 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <Factory className="w-3.5 h-3.5" /> Modul Training Resmi Paper Machine (PM)
              </span>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/50 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> 18 Slide Standar Operasional Industri
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Terintegrasi Seluruh Operator, Helper & Karu
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow">
              Panduan Komprehensif Operasional Mesin Tissue (PM)
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Membedah alur lengkap pembuatan kertas tissue dari buburan pulp di <strong>Wet End</strong> (Chest 4, CRC, Stuffbox, Headbox, Silinder Mould, Felt Needle Shower 10-12 bar), 
              proses pengeringan <strong>Dry End</strong> (Yankee 85-90°C, Blower Heat Exchanger, Spray Coating & Release min 2.5 bar, Creping 15%), 
              hingga penggulungan kontinu <strong>Pope Reel</strong> dan penanda sambungan (joint marker).
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0">
            <button
              onClick={() => setSelectedStage('ALL')}
              className="px-3.5 py-2 bg-blue-600/80 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all shadow flex items-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>Jelajahi 18 Peralatan</span>
            </button>
            {onWatchVideo && (
              <button
                onClick={() => onWatchVideo('tm-vid-1')}
                className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition-all shadow flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Video Tutorial Lengkap</span>
              </button>
            )}
          </div>
        </div>

        {/* 3 Tahapan Utama Visual Pipeline Bar */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
          <button
            onClick={() => setSelectedStage('WET_END')}
            className={`p-3 rounded-xl border text-left transition-all flex items-start gap-2.5 ${
              selectedStage === 'WET_END' 
                ? 'bg-cyan-950/60 border-cyan-500 text-cyan-200 shadow-md ring-1 ring-cyan-500/50' 
                : 'bg-slate-950/50 border-slate-800 text-slate-300 hover:bg-slate-900'
            }`}
          >
            <div className="p-1.5 rounded-lg bg-cyan-900/60 text-cyan-300 shrink-0 mt-0.5">
              <Droplets className="w-4 h-4" />
            </div>
            <div>
              <div className="font-extrabold text-white text-xs flex items-center gap-1.5">
                <span>1. Wet End & Forming</span>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.2 rounded font-mono">12 Alat</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                Chest 4, CRC, Stuffbox, PEO, Silinder Mould, Needle 10-12 bar, U-box
              </p>
            </div>
          </button>

          <button
            onClick={() => setSelectedStage('DRY_END')}
            className={`p-3 rounded-xl border text-left transition-all flex items-start gap-2.5 ${
              selectedStage === 'DRY_END' 
                ? 'bg-amber-950/60 border-amber-500 text-amber-200 shadow-md ring-1 ring-amber-500/50' 
                : 'bg-slate-950/50 border-slate-800 text-slate-300 hover:bg-slate-900'
            }`}
          >
            <div className="p-1.5 rounded-lg bg-amber-900/60 text-amber-300 shrink-0 mt-0.5">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <div className="font-extrabold text-white text-xs flex items-center gap-1.5">
                <span>2. Dry End & Creping 15%</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-mono">4 Alat</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                Silinder Yankee 85-90°C, Sirip HE Steam, Coating min 2.5 bar, Blade
              </p>
            </div>
          </button>

          <button
            onClick={() => setSelectedStage('POPE_REEL')}
            className={`p-3 rounded-xl border text-left transition-all flex items-start gap-2.5 ${
              selectedStage === 'POPE_REEL' 
                ? 'bg-purple-950/60 border-purple-500 text-purple-200 shadow-md ring-1 ring-purple-500/50' 
                : 'bg-slate-950/50 border-slate-800 text-slate-300 hover:bg-slate-900'
            }`}
          >
            <div className="p-1.5 rounded-lg bg-purple-900/60 text-purple-300 shrink-0 mt-0.5">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <div className="font-extrabold text-white text-xs flex items-center gap-1.5">
                <span>3. Pope Reel Winding</span>
                <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.2 rounded font-mono">2 Alat</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                Jumbo Roll kontinu, Speed 150→127.5 mpm, Debu Trim, Flagging Joint
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. DUA SIMULATOR INTERAKTIF: SPEED CREPING & CRC DILUTION  */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* SIMULATOR 1: KALKULATOR SPEED POPE REEL VS YANKEE (Slide 15 & Slide 17/18 Soal 3) */}
        <div className="bg-slate-950/80 border border-blue-900/50 rounded-2xl p-4 sm:p-5 shadow-md flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-900/50 text-blue-300 rounded-lg">
                  <Calculator className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>Kalkulator Rasio Speed Yankee vs Pope Reel</span>
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-mono">
                      Slide 15 & Kuis #3
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Formula baku pengerutan: Speed Pope Reel = Speed Yankee &times; (1 - Creping%)
                  </p>
                </div>
              </div>
              <button 
                onClick={() => { setYankeeSpeedInput(150); setCrepingPercentInput(15); }}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors text-xs flex items-center gap-1"
                title="Reset ke Nilai Standar Slide 17/18"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="text-[10px]">Standar</span>
              </button>
            </div>

            {/* Interactive Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-semibold">Speed Silinder Yankee:</span>
                  <span className="font-mono font-bold text-blue-300 text-sm">{yankeeSpeedInput} mpm</span>
                </div>
                <input 
                  type="range" 
                  min={100} 
                  max={250} 
                  step={5}
                  value={yankeeSpeedInput}
                  onChange={(e) => setYankeeSpeedInput(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>100 mpm</span>
                  <span className="text-blue-400 font-bold">150 mpm (Standar)</span>
                  <span>250 mpm</span>
                </div>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-semibold">Rasio Creping (Pengerutan):</span>
                  <span className="font-mono font-bold text-amber-300 text-sm">{crepingPercentInput}%</span>
                </div>
                <input 
                  type="range" 
                  min={5} 
                  max={30} 
                  step={1}
                  value={crepingPercentInput}
                  onChange={(e) => setCrepingPercentInput(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>5%</span>
                  <span className="text-amber-400 font-bold">15% (Standar Slide 15)</span>
                  <span>30%</span>
                </div>
              </div>
            </div>

            {/* Calculated Output Box */}
            <div className="mt-3 bg-gradient-to-r from-blue-950/70 via-slate-900 to-indigo-950/70 p-3 rounded-xl border border-blue-800/60 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-300 tracking-wider block">
                  Kecepatan Pope Reel Terhitung:
                </span>
                <span className="text-xl sm:text-2xl font-black text-white font-mono flex items-baseline gap-1">
                  {calculatedPopeSpeed} <span className="text-xs text-slate-300 font-normal">mpm (meter/menit)</span>
                </span>
              </div>
              <div className="text-right text-[11px] text-slate-300 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800">
                <span className="font-mono text-cyan-300 block">{yankeeSpeedInput} &times; (1 - {crepingPercentInput / 100})</span>
                <span className="text-slate-400 text-[10px]">{yankeeSpeedInput} &times; {(1 - crepingPercentInput / 100).toFixed(2)} = {calculatedPopeSpeed} mpm</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/80 flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <p leading-tight>
              <strong>Penjelasan Ahli:</strong> Pada Slide 17 Soal #3: <em>"Berapa speed di pope reel kalau speed Yankee 150 mpm dengan creping 15%?"</em> 
              Jawabannya adalah <strong>127,5 mpm</strong>. Selisih kecepatan inilah yang mempertahankan kelembutan kerutan mikro tissue tanpa terentang kembali.
            </p>
          </div>
        </div>

        {/* SIMULATOR 2: INTERAKTIF PANEL KONTROL CRC & FLOW CONTROL (Slide 2 & 3) */}
        <div className="bg-slate-950/80 border border-cyan-900/50 rounded-2xl p-4 sm:p-5 shadow-md flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-cyan-900/50 text-cyan-300 rounded-lg">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>Simulasi Panel Layar Sentuh CRC & Flow Control</span>
                    <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.2 rounded font-mono">
                      Slide 2 & 3
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Interlocking pembacaan sensor konsistensi & pergerakan otomatis valve delusen
                  </p>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-semibold">
                DCS Mode: AUTO
              </span>
            </div>

            {/* Simulasi Layar Panel Sentuh (Meniru Foto Slide 3) */}
            <div className="mt-3 bg-slate-900/90 border border-slate-700/80 rounded-xl p-3.5 space-y-3 font-mono">
              <div className="grid grid-cols-2 gap-2 text-xs">
                {/* Bagian Atas: Actual Consistency */}
                <div className="bg-black/70 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-sans">Layar Atas: Actual CRC</div>
                  <div className="text-lg font-black text-cyan-300">{crcActualConsistency.toFixed(2)} %</div>
                  <div className="text-[9px] text-slate-500 font-sans">Sensor geser bypass Chest 4</div>
                </div>

                {/* Bagian Bawah: Set Point Batas */}
                <div className="bg-black/70 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-sans">Layar Bawah: Set Point CRC</div>
                  <div className="text-lg font-black text-amber-300">{crcSetPoint.toFixed(2)} %</div>
                  <div className="text-[9px] text-slate-500 font-sans">Batas maks picu valve delusen</div>
                </div>
              </div>

              {/* Data Flow Control Panel (Nilai Asli Slide 3) */}
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs grid grid-cols-3 gap-2 text-center">
                <div>
                  <span className="text-[9px] text-slate-400 block font-sans">Flow Setting</span>
                  <span className="font-bold text-white text-sm">{flowSetting.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block font-sans">Actual Flow</span>
                  <span className="font-bold text-cyan-300 text-sm">{simulatedActualFlow.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block font-sans">Valve Opening</span>
                  <span className="font-bold text-amber-300 text-sm">{simulatedValveOpening.toFixed(2)} %</span>
                </div>
              </div>
            </div>

            {/* Tombol Skenario Lapangan */}
            <div className="mt-3 flex items-center gap-1.5">
              <span className="text-[10px] text-slate-400 font-semibold">Uji Skenario:</span>
              <button
                onClick={() => {
                  setDilutionState('normal');
                  setCrcActualConsistency(2.76);
                }}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                  dilutionState === 'normal' 
                    ? 'bg-cyan-600 text-white shadow' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Normal (Slide 3)
              </button>
              <button
                onClick={() => {
                  setDilutionState('high');
                  setCrcActualConsistency(2.98); // Terlalu kental
                }}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                  dilutionState === 'high' 
                    ? 'bg-amber-600 text-white shadow' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Pulp Terlalu Kental (&gt;2.80%)
              </button>
              <button
                onClick={() => {
                  setDilutionState('low');
                  setCrcActualConsistency(2.55); // Terlalu encer
                }}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                  dilutionState === 'low' 
                    ? 'bg-blue-600 text-white shadow' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Pulp Encer (&lt;2.60%)
              </button>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/80 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p leading-tight>
              {dilutionState === 'high' && (
                <span className="text-amber-300">
                  <strong>Respons Otomatis:</strong> Nilai konsistensi (2.98%) melebihi set point (2.80%). CRC memberi sinyal perintah agar control valve delusen membuka lebih lebar ({simulatedValveOpening}%) sehingga air pengencer bertambah.
                </span>
              )}
              {dilutionState === 'low' && (
                <span className="text-blue-300">
                  <strong>Respons Otomatis:</strong> Konsistensi rendah (2.55%). Katup delusen menyempit ({simulatedValveOpening}%) agar buburan tidak terlalu encer sebelum masuk ke stuffbox.
                </span>
              )}
              {dilutionState === 'normal' && (
                <span>
                  <strong>Prinsip Slide 2 & 3:</strong> Operator mengawasi keselarasan Flow Setting (36.00), Actual Flow (65.52), dan bukaan katup (39.67%). Jika kurang atau lebih, operator dapat mengoreksi via tombol Open/Close di panel.
                </span>
              )}
            </p>
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 3. PENCARIAN & FILTER KATEGORI PERALATAN TISSUE MESIN      */}
      {/* ========================================================= */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5 text-blue-400" /> Filter Tahap:
          </span>
          <button
            onClick={() => setSelectedStage('ALL')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              selectedStage === 'ALL'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Semua (18 Alat)
          </button>
          <button
            onClick={() => setSelectedStage('WET_END')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              selectedStage === 'WET_END'
                ? 'bg-cyan-600 text-white shadow'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Wet End & Forming (12)
          </button>
          <button
            onClick={() => setSelectedStage('DRY_END')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              selectedStage === 'DRY_END'
                ? 'bg-amber-600 text-white shadow'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Dry End & Yankee (4)
          </button>
          <button
            onClick={() => setSelectedStage('POPE_REEL')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              selectedStage === 'POPE_REEL'
                ? 'bg-purple-600 text-white shadow'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Pope Reel Winding (2)
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari alat (CRC, PEO, Yankee, dll)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <XCircle className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. DAFTAR PERALATAN DETAIL TISSUE MESIN (SLIDE 1 - 16)     */}
      {/* ========================================================= */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
            <Settings className="w-4 h-4 text-blue-400" />
            <span>Katalog & Analisis Presisi Peralatan Tissue Mesin</span>
            <span className="text-xs font-normal text-slate-400">
              (Menampilkan {filteredEquipments.length} dari {equipments.length} komponen)
            </span>
          </h4>
          <button
            onClick={() => {
              if (expandedEquipmentId) setExpandedEquipmentId(null);
              else setExpandedEquipmentId(filteredEquipments[0]?.id || null);
            }}
            className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
          >
            {expandedEquipmentId ? 'Tutup Rincian' : 'Buka Rincian Pertama'}
          </button>
        </div>

        {filteredEquipments.map((eq) => {
          const isExpanded = expandedEquipmentId === eq.id;
          return (
            <div
              key={eq.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? 'bg-slate-900 border-blue-600/70 shadow-lg ring-1 ring-blue-500/30'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Card Header (Accordion Button) */}
              <button
                onClick={() => setExpandedEquipmentId(isExpanded ? null : eq.id)}
                className="w-full p-4 text-left flex items-start sm:items-center justify-between gap-3 hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <span className="h-7 w-7 rounded-xl bg-blue-950 border border-blue-600/50 text-blue-300 font-bold flex items-center justify-center text-xs shrink-0 font-mono">
                    {eq.number}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] bg-slate-800 border border-slate-700 text-amber-300 font-bold px-2 py-0.5 rounded font-mono">
                        {eq.slideRef}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        eq.stage === 'WET_END' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' :
                        eq.stage === 'DRY_END' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                        'bg-purple-950 text-purple-300 border border-purple-800'
                      }`}>
                        {eq.stageName}
                      </span>
                      <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded hidden sm:inline-block">
                        {eq.categoryTag}
                      </span>
                    </div>
                    <h5 className="font-extrabold text-white text-sm sm:text-base mt-1 group-hover:text-blue-300 transition-colors">
                      {eq.name}
                    </h5>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="p-1 rounded-lg bg-slate-800 text-slate-400">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </button>

              {/* Card Body (Expanded Details) */}
              {isExpanded && (
                <div className="px-4 pb-5 pt-1 space-y-4 border-t border-slate-800/80 bg-slate-950/50 animate-fadeIn text-xs">
                  
                  {/* Fungsi & Prinsip Kerja */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-cyan-400 font-bold text-xs flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5" /> Fungsi Utama Komponen:
                      </span>
                      <p className="text-slate-200 leading-relaxed font-medium">
                        {eq.function}
                      </p>
                    </div>

                    <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-amber-400 font-bold text-xs flex items-center gap-1.5">
                        <Settings className="w-3.5 h-3.5" /> Prinsip Kerja & Mekanisme Lapangan:
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        {eq.workingPrinciple}
                      </p>
                    </div>
                  </div>

                  {/* Parameter Kritis & Batas Operasi */}
                  <div className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-800 space-y-2.5">
                    <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Gauge className="w-3.5 h-3.5 text-blue-400" />
                      <span>Parameter Kritis & Standar Angka Lapangan:</span>
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {eq.criticalParameters.map((param, pIdx) => (
                        <div key={pIdx} className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800 flex flex-col justify-between">
                          <div>
                            <span className="text-[11px] text-slate-400 font-semibold block">{param.label}</span>
                            <span className="text-sm font-bold text-cyan-300 font-mono block mt-0.5">{param.value}</span>
                          </div>
                          <span className="text-[10px] text-amber-300/90 mt-1 leading-tight block">
                            &bull; {param.importance}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Matriks Pembagian Tugas Jabatan (Operator, Helper, Karu, Ka. PM) */}
                  <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-800 gap-2">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Fokus Tugas Lapangan Berdasarkan Jabatan:</span>
                      </span>
                      <div className="flex items-center gap-1 text-[11px]">
                        <button
                          onClick={() => setActiveRoleTab('all')}
                          className={`px-2 py-0.5 rounded font-semibold ${activeRoleTab === 'all' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                          Semua
                        </button>
                        <button
                          onClick={() => setActiveRoleTab('operator')}
                          className={`px-2 py-0.5 rounded font-semibold ${activeRoleTab === 'operator' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                          Operator
                        </button>
                        <button
                          onClick={() => setActiveRoleTab('helper')}
                          className={`px-2 py-0.5 rounded font-semibold ${activeRoleTab === 'helper' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                          Helper
                        </button>
                        <button
                          onClick={() => setActiveRoleTab('karu')}
                          className={`px-2 py-0.5 rounded font-semibold ${activeRoleTab === 'karu' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                          Karu
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5 text-[11px]">
                      {/* Operator */}
                      {(activeRoleTab === 'all' || activeRoleTab === 'operator') && (
                        <div className="bg-blue-950/30 p-2.5 rounded-lg border border-blue-900/50 space-y-1.5">
                          <span className="font-bold text-blue-300 block pb-1 border-b border-blue-900/50">
                            Operator Pelaksana:
                          </span>
                          <ul className="space-y-1 text-slate-300">
                            {eq.operatorKeyPoints.map((item, i) => (
                              <li key={i} className="flex items-start gap-1 leading-snug">
                                <span className="text-blue-400">&bull;</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Pembantu Operator (Helper) */}
                      {(activeRoleTab === 'all' || activeRoleTab === 'helper') && (
                        <div className="bg-amber-950/30 p-2.5 rounded-lg border border-amber-900/50 space-y-1.5">
                          <span className="font-bold text-amber-300 block pb-1 border-b border-amber-900/50">
                            Pembantu Operator (Helper):
                          </span>
                          <ul className="space-y-1 text-slate-300">
                            {eq.helperDuties.map((item, i) => (
                              <li key={i} className="flex items-start gap-1 leading-snug">
                                <span className="text-amber-400">&bull;</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Kepala Regu */}
                      {(activeRoleTab === 'all' || activeRoleTab === 'karu') && (
                        <div className="bg-purple-950/30 p-2.5 rounded-lg border border-purple-900/50 space-y-1.5">
                          <span className="font-bold text-purple-300 block pb-1 border-b border-purple-900/50">
                            Kepala Regu (Karu):
                          </span>
                          <ul className="space-y-1 text-slate-300">
                            {eq.karuInspectionPoints.map((item, i) => (
                              <li key={i} className="flex items-start gap-1 leading-snug">
                                <span className="text-purple-400">&bull;</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Kepala PM */}
                      {(activeRoleTab === 'all' || activeRoleTab === 'kepalaPm') && (
                        <div className="bg-emerald-950/30 p-2.5 rounded-lg border border-emerald-900/50 space-y-1.5">
                          <span className="font-bold text-emerald-300 block pb-1 border-b border-emerald-900/50">
                            Kepala PM / Superintendent:
                          </span>
                          <ul className="space-y-1 text-slate-300">
                            {eq.kepalaPmGovernance.map((item, i) => (
                              <li key={i} className="flex items-start gap-1 leading-snug">
                                <span className="text-emerald-400">&bull;</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Troubleshooting & Solusi Lapangan */}
                  <div className="bg-slate-900/90 border border-amber-900/40 rounded-xl p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-300 flex items-center gap-1.5 text-xs">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                        Kendala Khas: {eq.troubleshooting.fault}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Indikasi: {eq.troubleshooting.indication}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs pt-1">
                      <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
                        <span className="text-cyan-400 font-bold block mb-0.5">Tindakan Cepat Lapangan (Operator):</span>
                        <p className="text-slate-300 leading-relaxed">{eq.troubleshooting.immediateAction}</p>
                      </div>
                      <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
                        <span className="text-emerald-400 font-bold block mb-0.5">Solusi Permanen / Akar Masalah:</span>
                        <p className="text-slate-300 leading-relaxed">{eq.troubleshooting.permanentSolution}</p>
                      </div>
                    </div>
                  </div>

                  {/* Peringatan K3 & Tombol Akses Visual */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-800">
                    <div className="flex items-start gap-2 text-rose-300 text-[11px] max-w-xl">
                      <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span><strong>Standar K3:</strong> {eq.k3SafetyWarning}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                      <button
                        onClick={() => handlePhotoClickForEquipment(eq.associatedPhotoTitle)}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-all shadow"
                        title="Buka Foto Komponen Ini"
                      >
                        <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Lihat Foto Komponen</span>
                      </button>

                      {onWatchVideo && (
                        <button
                          onClick={() => onWatchVideo('tm-vid-1')}
                          className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow"
                          title="Tonton Tutorial Terkait"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Video SOP</span>
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* 5. EVALUASI 10 KUIS UJI KOMPETENSI RESMI (SLIDE 17 & 18)   */}
      {/* ========================================================= */}
      <div className="bg-slate-950/80 border border-purple-900/50 rounded-2xl p-5 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-purple-950/80 border border-purple-500/50 rounded-xl text-purple-300">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-white text-base flex items-center gap-2">
                <span>10 Evaluasi Pertanyaan & Kunci Jawaban Resmi Uji Kompetensi</span>
                <span className="text-xs bg-purple-950 text-purple-300 border border-purple-800 px-2 py-0.5 rounded font-mono">
                  Slide 17 & 18
                </span>
              </h4>
              <p className="text-xs text-slate-400">
                Uji pemahaman komprehensif bagi Operator, Pembantu Operator, Kepala Regu, dan Pimpinan PM
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {quizSubmitted ? (
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                  quizScore >= 8 
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-800' 
                    : 'bg-amber-950 text-amber-300 border-amber-800'
                }`}>
                  Skor Anda: {quizScore} / 10 ({quizScore >= 8 ? 'LULUS KOMPETEN' : 'PERLU BELAJAR ULANG'})
                </span>
                <button
                  onClick={resetQuiz}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Ulangi</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setQuizSubmitted(true)}
                className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold transition-all shadow flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Kirim & Periksa Jawaban</span>
              </button>
            )}
          </div>
        </div>

        {/* Quiz Items Grid */}
        <div className="space-y-3">
          {quizzes.map((quiz) => {
            const isAnswered = !!userAnswers[quiz.number];
            const isCorrect = userAnswers[quiz.number] === quiz.correctAnswer;
            const isExpanded = expandedQuizNumber === quiz.number;

            return (
              <div 
                key={quiz.number}
                className={`rounded-xl border p-4 transition-all ${
                  quizSubmitted 
                    ? (isCorrect ? 'bg-emerald-950/20 border-emerald-800/60' : 'bg-rose-950/20 border-rose-800/60')
                    : 'bg-slate-900/80 border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <span className="h-6 w-6 rounded-full bg-purple-900 border border-purple-500/60 text-purple-200 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5 font-mono">
                      {quiz.number}
                    </span>
                    <div>
                      <h5 className="font-bold text-white text-sm leading-snug">
                        {quiz.question}
                      </h5>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        Target Penguasaan: <strong className="text-purple-300">{quiz.whoMustMaster}</strong>
                      </span>
                    </div>
                  </div>

                  {quizSubmitted && (
                    <div className="shrink-0">
                      {isCorrect ? (
                        <span className="flex items-center gap-1 text-emerald-400 font-bold text-xs bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Benar
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-rose-400 font-bold text-xs bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800">
                          <XCircle className="w-3.5 h-3.5" /> Kurang Tepat
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Options List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-xs">
                  {quiz.options.map((opt, optIdx) => {
                    const isSelected = userAnswers[quiz.number] === opt;
                    const isOptionCorrect = opt === quiz.correctAnswer;

                    let btnClass = 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/80';
                    if (isSelected && !quizSubmitted) {
                      btnClass = 'bg-purple-600/30 border-purple-500 text-purple-200 ring-1 ring-purple-500';
                    } else if (quizSubmitted) {
                      if (isOptionCorrect) {
                        btnClass = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                      } else if (isSelected && !isOptionCorrect) {
                        btnClass = 'bg-rose-950/80 border-rose-500 text-rose-200 line-through';
                      } else {
                        btnClass = 'opacity-50 bg-slate-950 border-slate-800 text-slate-500';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={quizSubmitted}
                        onClick={() => handleSelectQuizAnswer(quiz.number, opt)}
                        className={`p-2.5 rounded-lg border text-left transition-all flex items-start gap-2 ${btnClass}`}
                      >
                        <span className="font-mono text-slate-400 font-bold">
                          {String.fromCharCode(65 + optIdx)}.
                        </span>
                        <span className="leading-snug">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Kunci Jawaban Resmi & Penjelasan Slide 18 */}
                {(quizSubmitted || isExpanded) && (
                  <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-2 text-xs">
                    <div className="bg-emerald-950/40 border border-emerald-900/60 p-2.5 rounded-lg">
                      <span className="font-bold text-emerald-300 flex items-center gap-1 mb-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        Kunci Jawaban Resmi Slide 18:
                      </span>
                      <p className="text-emerald-100 font-medium leading-relaxed">
                        {quiz.officialSlideAnswer}
                      </p>
                    </div>

                    <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                      <span className="font-bold text-cyan-300 block mb-0.5">
                        Penjelasan Teknis Mendalam:
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        {quiz.technicalDeepDive}
                      </p>
                    </div>

                    <div className="bg-amber-950/30 p-2 rounded-lg border border-amber-900/40 flex items-start gap-2 text-[11px] text-amber-200">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong>Dampak di Lantai Produksi jika Diabaikan: </strong>
                        {quiz.operationalImpact}
                      </div>
                    </div>
                  </div>
                )}

                {/* Toggle Pembahasan jika kuis belum disubmit */}
                {!quizSubmitted && (
                  <div className="mt-2 text-right">
                    <button
                      onClick={() => setExpandedQuizNumber(isExpanded ? null : quiz.number)}
                      className="text-[11px] text-purple-400 hover:text-purple-300 font-semibold"
                    >
                      {isExpanded ? 'Tutup Kunci Jawaban' : 'Lihat Kunci Jawaban Slide 18'}
                    </button>
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};

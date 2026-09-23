import React, { useState } from 'react';
import { 
  X, 
  GraduationCap, 
  Cpu, 
  AlertOctagon, 
  ShieldAlert, 
  CheckCircle2, 
  Settings, 
  Info, 
  FileSpreadsheet, 
  Printer, 
  Layers,
  Scissors,
  RotateCcw,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Users,
  CheckSquare,
  Sparkles,
  Sliders,
  Eye,
  Play,
  Maximize2,
  Video,
  Image as ImageIcon,
  Film,
  ExternalLink,
  BookOpen,
  Award,
  Gauge,
  Factory,
  Building2
} from 'lucide-react';
import { TRAINING_MODULES } from '../data/trainingData';
import { TRAINING_MEDIA_DATA } from '../data/trainingMediaData';
import { TrainingModuleId, MachinePhotoItem, MachineVideoTutorial } from '../types';
import { StockPrepTrainingView } from './StockPrepTrainingView';
import { TissueMachineTrainingView } from './TissueMachineTrainingView';
import { IndustrialVideoPlayer } from './IndustrialVideoPlayer';
import { PupmsTrainingView } from './PupmsTrainingView';

interface TrainingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMachine?: TrainingModuleId;
}

export const TrainingModal: React.FC<TrainingModalProps> = ({
  isOpen,
  onClose,
  defaultMachine = 'TISSUE_PM'
}) => {
  const [selectedMachine, setSelectedMachine] = useState<TrainingModuleId>(defaultMachine);
  const [activeSubTab, setActiveSubTab] = useState<string>('all');
  
  // Interactive Lightbox State
  const [selectedPhoto, setSelectedPhoto] = useState<MachinePhotoItem | null>(null);

  // Video Tutorial State
  const [activeVideoId, setActiveVideoId] = useState<string>('');
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);

  // Interactive accordion state for QA Quiz
  const [expandedQA, setExpandedQA] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true
  });

  const toggleQA = (num: number) => {
    setExpandedQA(prev => ({
      ...prev,
      [num]: !prev[num]
    }));
  };

  if (!isOpen) return null;

  const data = TRAINING_MODULES[selectedMachine] || TRAINING_MODULES['TISSUE_PM'] || TRAINING_MODULES['STOCK_PREP'];
  const media = TRAINING_MEDIA_DATA[selectedMachine];
  const isTissuePm = selectedMachine === 'TISSUE_PM';
  const isRewinder = selectedMachine === 'REWINDER';
  const isStockPrep = selectedMachine === 'STOCK_PREP';
  const isPupms = selectedMachine === 'PUPMS';

  // Determine current active video tutorial
  const currentVideo: MachineVideoTutorial | undefined = media?.videoTutorials.find(v => v.id === activeVideoId) || media?.videoTutorials[0];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-md flex justify-end animate-fadeIn">
      <div className="w-full max-w-5xl bg-slate-900 border-l border-slate-700 h-full flex flex-col shadow-2xl text-slate-100">
        
        {/* Header Bar */}
        <div className="px-5 py-3.5 border-b border-slate-800 bg-slate-950/90 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-emerald-600 via-teal-700 to-amber-700 border border-emerald-500/60 rounded-xl text-white shadow-md">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-extrabold text-white tracking-wide">
                  Materi Pelatihan Visual & Teknis Mesin Pabrik
                </h2>
                <span className="text-[10px] sm:text-[11px] bg-emerald-950 border border-emerald-600/60 text-emerald-300 font-bold px-2 py-0.5 rounded-full">
                  Dokumentasi Resmi PT. PUP
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Lengkap dengan Foto Nyata, Rincian Komponen Mekanik, Video Tutorial, & Standar Operasional Shift
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 border border-slate-700"
              title="Cetak Materi Training"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Cetak / PDF</span>
            </button>
            <button
              id="btn-close-training"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Tutup (Kembali ke Aplikasi)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Machine Navigation Tabs (PUPMS, TISSUE PM, STOCK PREP, REWINDER, PM1, PM2, PM5) */}
        <div className="border-b border-slate-800 bg-slate-950/70 px-4 py-2 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            {/* PUPMS Highlight Tab (Panca Usahatama Paramita Management System) */}
            <button
              id="training-tab-PUPMS"
              onClick={() => {
                setSelectedMachine('PUPMS');
                setActiveSubTab('all');
                setActiveVideoId('');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                selectedMachine === 'PUPMS'
                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 text-white shadow-lg ring-2 ring-amber-400/40'
                  : 'bg-amber-950/60 text-amber-300 hover:bg-amber-900/60 border border-amber-700/50'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-amber-300" />
              <span>SISTEM MANAJEMEN PUPMS</span>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded font-black">4 Pilar &bull; 5C &bull; Kuis</span>
            </button>

            {/* Tissue PM Highlight Tab (Official 18-Slide Tissue Machine) */}
            <button
              id="training-tab-TISSUE_PM"
              onClick={() => {
                setSelectedMachine('TISSUE_PM');
                setActiveSubTab('all');
                setActiveVideoId('');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                selectedMachine === 'TISSUE_PM'
                  ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white shadow-lg ring-2 ring-blue-400/40'
                  : 'bg-blue-950/60 text-blue-300 hover:bg-blue-900/60 border border-blue-700/50'
              }`}
            >
              <Factory className="w-3.5 h-3.5" />
              <span>MODUL TISSUE MESIN (PM)</span>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded font-black">18 Slide + 10 Kuis</span>
            </button>

            {/* Stock Preparation Highlight Tab */}
            <button
              id="training-tab-STOCK_PREP"
              onClick={() => {
                setSelectedMachine('STOCK_PREP');
                setActiveSubTab('all');
                setActiveVideoId('');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                selectedMachine === 'STOCK_PREP'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg ring-2 ring-emerald-400/40'
                  : 'bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900/60 border border-emerald-700/50'
              }`}
            >
              <Factory className="w-3.5 h-3.5" />
              <span>MODUL STOCK PREP</span>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded font-black">12 Alat + Kuis</span>
            </button>

            {/* Rewinder Highlight Tab */}
            <button
              id="training-tab-REWINDER"
              onClick={() => {
                setSelectedMachine('REWINDER');
                setActiveSubTab('all');
                setActiveVideoId('');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                selectedMachine === 'REWINDER'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg ring-2 ring-amber-400/40'
                  : 'bg-amber-950/60 text-amber-300 hover:bg-amber-900/60 border border-amber-700/50'
              }`}
            >
              <Scissors className="w-3.5 h-3.5" />
              <span>MODUL REWINDER & SLITTER</span>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded font-black">Foto + Video</span>
            </button>

            {/* PM1, PM2, PM5 Tabs */}
            {(['PM1', 'PM2', 'PM5'] as TrainingModuleId[]).map((mId) => {
              const isActive = selectedMachine === mId;
              return (
                <button
                  key={mId}
                  id={`training-tab-${mId}`}
                  onClick={() => {
                    setSelectedMachine(mId);
                    setActiveSubTab('all');
                    setActiveVideoId('');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>MODUL {mId}</span>
                  <span className="text-[9px] bg-slate-900/60 px-1 rounded text-slate-300">Foto + Video</span>
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs text-amber-400/90 font-medium">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>{data.name}</span>
          </div>
        </div>

        {/* Sub-navigation filter bar (shown for machines, hidden for PUPMS since it has its own internal nav) */}
        {!isPupms ? (
          <div className="bg-slate-900/95 border-b border-slate-800 px-4 py-1.5 flex items-center gap-1 overflow-x-auto shrink-0 text-xs">
          <span className="text-slate-400 text-[11px] font-medium mr-1 flex items-center gap-1 shrink-0">
            <Sliders className="w-3 h-3 text-amber-400" /> Menu:
          </span>
          
          <button
            onClick={() => setActiveSubTab('all')}
            className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
              activeSubTab === 'all'
                ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Semua Materi
          </button>

          <button
            onClick={() => setActiveSubTab('media')}
            className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeSubTab === 'media'
                ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                : 'text-amber-400/90 hover:text-amber-200 font-semibold'
            }`}
          >
            <Film className="w-3 h-3 text-amber-400" />
            <span>Galeri Foto & Video</span>
            <span className="bg-amber-500/30 text-[9px] px-1 rounded text-amber-200">Media</span>
          </button>

          {isTissuePm ? (
            <>
              <button
                onClick={() => setActiveSubTab('wetend')}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                  activeSubTab === 'wetend'
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Wet End & Forming (12)
              </button>
              <button
                onClick={() => setActiveSubTab('dryend')}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                  activeSubTab === 'dryend'
                    ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Dry End & Creping 15% (4)
              </button>
              <button
                onClick={() => setActiveSubTab('popereel')}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                  activeSubTab === 'popereel'
                    ? 'bg-purple-500/20 text-purple-300 font-bold border border-purple-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Pope Reel (Speed 127.5 mpm)
              </button>
              <button
                onClick={() => setActiveSubTab('roles')}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                  activeSubTab === 'roles'
                    ? 'bg-blue-500/20 text-blue-300 font-bold border border-blue-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Tugas: Helper &bull; Operator &bull; Karu
              </button>
              <button
                onClick={() => setActiveSubTab('quiz')}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                  activeSubTab === 'quiz'
                    ? 'bg-purple-500/20 text-purple-300 font-bold border border-purple-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                10 Kuis Evaluasi (Slide 17 & 18)
              </button>
            </>
          ) : isStockPrep ? (
            <>
              <button
                onClick={() => setActiveSubTab('flow')}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                  activeSubTab === 'flow'
                    ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                12 Peralatan & Parameter
              </button>
              <button
                onClick={() => setActiveSubTab('junktrap')}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                  activeSubTab === 'junktrap'
                    ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Simulator Junk Trap HDC
              </button>
              <button
                onClick={() => setActiveSubTab('peo')}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                  activeSubTab === 'peo'
                    ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Kimia PEO (17-19 Cps)
              </button>
              <button
                onClick={() => setActiveSubTab('roles')}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                  activeSubTab === 'roles'
                    ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Peran: Operator &bull; Karu &bull; PM
              </button>
              <button
                onClick={() => setActiveSubTab('quiz')}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                  activeSubTab === 'quiz'
                    ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                10 Kuis Evaluasi Kompetensi
              </button>
            </>
          ) : isRewinder ? (
            <>
              <button
                onClick={() => setActiveSubTab('components')}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                  activeSubTab === 'components'
                    ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                7 Komponen Penting
              </button>
              <button
                onClick={() => setActiveSubTab('workflow')}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                  activeSubTab === 'workflow'
                    ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Alur Kerja 6 Tahap
              </button>
              <button
                onClick={() => setActiveSubTab('roles')}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                  activeSubTab === 'roles'
                    ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Peran: Operator &bull; Karu &bull; PM
              </button>
              <button
                onClick={() => setActiveSubTab('quiz')}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                  activeSubTab === 'quiz'
                    ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                5 Soal Evaluasi & Jawaban
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setActiveSubTab('specs')}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                  activeSubTab === 'specs'
                    ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Spesifikasi & Kapasitas
              </button>
              <button
                onClick={() => setActiveSubTab('limits')}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                  activeSubTab === 'limits'
                    ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Batas Operasi & DCS
              </button>
              <button
                onClick={() => setActiveSubTab('checkpoints')}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                  activeSubTab === 'checkpoints'
                    ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Titik Cek Rutin
              </button>
            </>
          )}

          <button
            onClick={() => setActiveSubTab('trouble')}
            className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
              activeSubTab === 'trouble'
                ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Troubleshooting & K3
          </button>
        </div>
        ) : null}

        {/* Training Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-sm print:p-0 print:space-y-4">
          {isPupms ? (
            <PupmsTrainingView />
          ) : (
            <>
          {/* 1. Header Banner & Identity */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                <span className="bg-amber-500/10 text-amber-400 px-2.5 py-0.5 rounded border border-amber-500/30">
                  {data.machineId === 'REWINDER' ? 'Seksi Finishing & Converting' : `Unit Mesin ${data.machineId}`}
                </span>
                <span>&bull;</span>
                <span>Dokumen Resmi Departemen Produksi PT. PUP</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                <span>Untuk: Operator &bull; Kepala Regu &bull; Kepala PM</span>
              </div>
            </div>

            <h3 className="text-xl font-extrabold text-white mb-1.5 flex items-center gap-2">
              {data.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{data.tagline}</p>

            {data.specialCharacteristics && (
              <div className="mt-3.5 bg-blue-950/60 border border-blue-800/60 rounded-xl p-3.5 text-xs text-blue-200 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong className="text-blue-100 font-bold block mb-0.5">Peran Strategis & Karakteristik Mesin:</strong>
                  {data.specialCharacteristics}
                </div>
              </div>
            )}

            {data.differencesFromOthers && (
              <div className="mt-2.5 bg-indigo-950/60 border border-indigo-800/60 rounded-xl p-3.5 text-xs text-indigo-200 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong className="text-indigo-100 font-bold block mb-0.5">Fokus Operasional Khusus:</strong>
                  {data.differencesFromOthers}
                </div>
              </div>
            )}
          </div>

          {/* ========================================================= */}
          {/* SPESIFIKASI RESMI PM CYLINDER MOULD (PM-1, PM-2 & PM-5)   */}
          {/* ========================================================= */}
          {!isRewinder && !isStockPrep && (
            <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/30 border-2 border-emerald-500/40 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-slate-800 gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-emerald-500/20 border border-emerald-500/50 rounded-xl text-emerald-400 shadow-sm">
                    <Gauge className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-white text-base tracking-wide">
                        Standar Spesifikasi Mesin Paper Machine (PM-1, PM-2 & PM-5)
                      </h4>
                      <span className="bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Official Spec
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Spesifikasi teknis acuan wajib untuk seluruh Operator, Kepala Regu, dan Kepala PM
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700">
                  <span className="text-[11px] text-slate-400">Unit Aktif:</span>
                  <span className="text-xs font-black text-amber-300">{data.machineId}</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950 px-1.5 py-0.2 rounded font-mono font-bold">
                    Cylinder Mould
                  </span>
                </div>
              </div>

              {/* 8 Main Parameters Highlight Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
                {/* 1. Tipe Mesin */}
                <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 hover:border-emerald-500/50 transition-colors">
                  <span className="text-slate-400 text-[11px] block">● Tipe Mesin</span>
                  <div className="text-white font-black text-sm mt-0.5 flex items-center gap-1.5">
                    <span className="text-emerald-400 font-bold">Cylinder Mould</span>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">PM-1, PM-2 & PM-5 Seragam</span>
                </div>

                {/* 2. Produksi */}
                <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 hover:border-emerald-500/50 transition-colors">
                  <span className="text-slate-400 text-[11px] block">● Jenis Produksi</span>
                  <div className="text-amber-300 font-bold text-xs mt-0.5 leading-snug">
                    Tissue, MG Paper, Doorslag
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">Kertas halus & wrapping</span>
                </div>

                {/* 3. Basis Weight (BW) */}
                <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 hover:border-emerald-500/50 transition-colors">
                  <span className="text-slate-400 text-[11px] block">● Rentang BW (Gramatur)</span>
                  <div className="text-cyan-300 font-mono font-black text-xs mt-0.5 leading-snug">
                    12-16, 18-22, 24-26, 36-42 gsm
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">4 grade gramatur standar</span>
                </div>

                {/* 4. Speed Mesin */}
                <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 hover:border-emerald-500/50 transition-colors">
                  <span className="text-slate-400 text-[11px] block">● Speed Mesin (SOP)</span>
                  <div className="text-emerald-400 font-mono font-black text-sm mt-0.5">
                    100 - 150 mpm
                  </div>
                  <span className="text-[10px] text-amber-300 font-semibold mt-1 block">
                    Standar Target SOP: 100-150 mpm ({selectedMachine}: maks {selectedMachine === 'PM1' ? '150' : selectedMachine === 'PM2' ? '180' : '160'} mpm)
                  </span>
                </div>

                {/* 5. Lebar Felt */}
                <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 hover:border-emerald-500/50 transition-colors">
                  <span className="text-slate-400 text-[11px] block">● Lebar Felt</span>
                  <div className="text-white font-mono font-black text-sm mt-0.5">
                    {selectedMachine === 'PM5' ? '3,5 M (3.500 mm)' : '2,4 M (2.400 mm)'}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">PM1 & PM2: 2,4 M | PM5: 3,5 M</span>
                </div>

                {/* 6. Panjang Felt */}
                <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 hover:border-emerald-500/50 transition-colors">
                  <span className="text-slate-400 text-[11px] block">● Panjang Felt</span>
                  <div className="text-amber-300 font-mono font-bold text-xs mt-0.5 leading-snug">
                    {selectedMachine === 'PM5' ? '30,0 M (Single Felt)' : 'Top: 18,8 M | Bottom: 25,0 M'}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {selectedMachine === 'PM5' ? 'Single felt continuous system' : 'Dual felt top/bottom configuration'}
                  </span>
                </div>

                {/* 7. Life Time Felt */}
                <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 hover:border-emerald-500/50 transition-colors">
                  <span className="text-slate-400 text-[11px] block">● Life Time Felt</span>
                  <div className="text-rose-300 font-bold text-xs mt-0.5">
                    6 - 8 Bulan
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold mt-1 block">1.000 ton paper up</span>
                </div>

                {/* 8. Lebar Kertas */}
                <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 hover:border-emerald-500/50 transition-colors">
                  <span className="text-slate-400 text-[11px] block">● Lebar Kertas (Trim)</span>
                  <div className="text-teal-300 font-mono font-black text-sm mt-0.5">
                    {selectedMachine === 'PM1' ? '2,20 M' : selectedMachine === 'PM2' ? '2,25 M' : '3,30 M'}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">PM1: 2,20 M | PM2: 2,25 M | PM5: 3,30 M</span>
                </div>
              </div>

              {/* Matriks Komparasi Lengkap Seluruh Mesin (PM-1 vs PM-2 vs PM-5) */}
              <div className="bg-slate-950/90 rounded-xl border border-slate-800 overflow-hidden">
                <div className="bg-slate-900/90 px-3.5 py-2 border-b border-slate-800 flex items-center justify-between">
                  <span className="font-bold text-xs text-white flex items-center gap-1.5">
                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                    Tabel Matriks Perbandingan Spesifikasi PM-1, PM-2 & PM-5
                  </span>
                  <span className="text-[10px] text-slate-400">Pembaruan Resmi Departemen Produksi</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-900 text-slate-300 border-b border-slate-800">
                      <tr>
                        <th className="p-2.5 font-bold">Parameter Spesifikasi</th>
                        <th className={`p-2.5 font-bold text-center ${selectedMachine === 'PM1' ? 'bg-amber-950/40 text-amber-300 border-b-2 border-amber-500' : ''}`}>
                          PM-1
                        </th>
                        <th className={`p-2.5 font-bold text-center ${selectedMachine === 'PM2' ? 'bg-amber-950/40 text-amber-300 border-b-2 border-amber-500' : ''}`}>
                          PM-2
                        </th>
                        <th className={`p-2.5 font-bold text-center ${selectedMachine === 'PM5' ? 'bg-amber-950/40 text-amber-300 border-b-2 border-amber-500' : ''}`}>
                          PM-5
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 text-slate-200">
                      <tr className="hover:bg-slate-900/50">
                        <td className="p-2.5 text-slate-400 font-medium">Tipe Mesin</td>
                        <td className="p-2.5 text-center font-bold text-emerald-400">Cylinder Mould</td>
                        <td className="p-2.5 text-center font-bold text-emerald-400">Cylinder Mould</td>
                        <td className="p-2.5 text-center font-bold text-emerald-400">Cylinder Mould</td>
                      </tr>
                      <tr className="hover:bg-slate-900/50 bg-slate-900/30">
                        <td className="p-2.5 text-slate-400 font-medium">Jenis Produksi</td>
                        <td className="p-2.5 text-center text-slate-200">Tissue, MG Paper, Doorslag</td>
                        <td className="p-2.5 text-center text-slate-200">Tissue, MG Paper, Doorslag</td>
                        <td className="p-2.5 text-center text-slate-200">Tissue, MG Paper, Doorslag</td>
                      </tr>
                      <tr className="hover:bg-slate-900/50">
                        <td className="p-2.5 text-slate-400 font-medium">Pilihan Gramatur (BW)</td>
                        <td className="p-2.5 text-center font-mono text-cyan-300" colSpan={3}>
                          12-16, 18-22, 24-26 gsm, 36-42 gsm
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-900/50 bg-slate-900/30">
                        <td className="p-2.5 text-slate-400 font-medium">Standar Target SOP Speed</td>
                        <td className="p-2.5 text-center font-mono font-bold text-emerald-400">
                          100 - 150 mpm
                        </td>
                        <td className="p-2.5 text-center font-mono font-bold text-emerald-400">
                          100 - 150 mpm
                        </td>
                        <td className="p-2.5 text-center font-mono font-bold text-emerald-400">
                          100 - 150 mpm
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-900/50">
                        <td className="p-2.5 text-slate-400 font-medium">Tekanan Uap Silinder Yankee (SOP)</td>
                        <td className="p-2.5 text-center font-mono font-bold text-amber-300">
                          1 - 3 bar
                        </td>
                        <td className="p-2.5 text-center font-mono font-bold text-amber-300">
                          1 - 3 bar
                        </td>
                        <td className="p-2.5 text-center font-mono font-bold text-amber-300">
                          1 - 3 bar
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-900/50 bg-slate-900/30">
                        <td className="p-2.5 text-slate-400 font-medium">Speed Maksimal Mesin</td>
                        <td className={`p-2.5 text-center font-mono ${selectedMachine === 'PM1' ? 'text-amber-300 font-bold bg-amber-950/30' : 'text-slate-300'}`}>
                          150 mpm
                        </td>
                        <td className={`p-2.5 text-center font-mono ${selectedMachine === 'PM2' ? 'text-amber-300 font-bold bg-amber-950/30' : 'text-slate-300'}`}>
                          180 mpm
                        </td>
                        <td className={`p-2.5 text-center font-mono ${selectedMachine === 'PM5' ? 'text-amber-300 font-bold bg-amber-950/30' : 'text-slate-300'}`}>
                          160 mpm
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-900/50">
                        <td className="p-2.5 text-slate-400 font-medium">Lebar Felt</td>
                        <td className="p-2.5 text-center font-mono font-bold text-slate-100">2,4 M</td>
                        <td className="p-2.5 text-center font-mono font-bold text-slate-100">2,4 M</td>
                        <td className="p-2.5 text-center font-mono font-bold text-cyan-300">3,5 M</td>
                      </tr>
                      <tr className="hover:bg-slate-900/50 bg-slate-900/30">
                        <td className="p-2.5 text-slate-400 font-medium">Panjang Felt</td>
                        <td className="p-2.5 text-center font-mono text-slate-200">
                          Top: 18,8 M<br />Bottom: 25,0 M
                        </td>
                        <td className="p-2.5 text-center font-mono text-slate-200">
                          Top: 18,8 M<br />Bottom: 25,0 M
                        </td>
                        <td className="p-2.5 text-center font-mono font-bold text-amber-300">
                          30,0 M<br /><span className="text-[10px] text-slate-400 font-normal">(Single Felt)</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-900/50">
                        <td className="p-2.5 text-slate-400 font-medium">Life Time Felt</td>
                        <td className="p-2.5 text-center text-rose-300 font-semibold" colSpan={3}>
                          6 - 8 Bulan (atau 1.000 ton paper up)
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-900/50 bg-slate-900/30">
                        <td className="p-2.5 text-slate-400 font-medium">Lebar Kertas (Trim Width)</td>
                        <td className={`p-2.5 text-center font-mono font-bold ${selectedMachine === 'PM1' ? 'text-amber-300 bg-amber-950/30' : 'text-teal-300'}`}>
                          2,20 M
                        </td>
                        <td className={`p-2.5 text-center font-mono font-bold ${selectedMachine === 'PM2' ? 'text-amber-300 bg-amber-950/30' : 'text-teal-300'}`}>
                          2,25 M
                        </td>
                        <td className={`p-2.5 text-center font-mono font-bold ${selectedMachine === 'PM5' ? 'text-amber-300 bg-amber-950/30' : 'text-teal-300'}`}>
                          3,30 M
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* HERO VISUAL SHOWCASE CARD (FOTO NYATA MESIN)              */}
          {/* ========================================================= */}
          {media && (
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
              <div className="relative group">
                <img 
                  src={media.heroImage} 
                  alt={data.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-56 sm:h-72 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-4 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-emerald-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                          <CheckCircle2 className="w-3 h-3" /> Foto Asli Unit Operasional
                        </span>
                        <span className="bg-slate-900/80 text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-700">
                          {selectedMachine}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 font-medium max-w-2xl drop-shadow">
                        {media.heroCaption}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (media.galleryPhotos[0]) {
                            setSelectedPhoto(media.galleryPhotos[0]);
                          }
                        }}
                        className="px-3 py-1.5 bg-slate-900/90 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg border border-slate-700 transition-all flex items-center gap-1.5 shadow"
                        title="Buka tampilan foto resolusi tinggi"
                      >
                        <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Perbesar Foto</span>
                      </button>

                      {media.videoTutorials.length > 0 && (
                        <button
                          onClick={() => {
                            setActiveSubTab('media');
                            if (!activeVideoId && media.videoTutorials[0]) {
                              setActiveVideoId(media.videoTutorials[0].id);
                            }
                            setTimeout(() => {
                              const el = document.getElementById('industrial-video-player');
                              if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }, 100);
                          }}
                          className="px-3.5 py-1.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-lg ring-2 ring-amber-400/30"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Tonton Video Tutorial</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* GALERI FOTO & VIDEO EDUKASI LENGKAP                       */}
          {/* ========================================================= */}
          {media && (activeSubTab === 'all' || activeSubTab === 'media') && (
            <div className="bg-slate-950/70 border border-cyan-900/40 rounded-2xl p-5 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-slate-800 gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-cyan-950/80 border border-cyan-500/50 rounded-xl text-cyan-400">
                    <Film className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-base">
                      Galeri Foto Nyata & Video Tutorial Interaktif {data.machineId}
                    </h4>
                    <p className="text-xs text-slate-400">
                      Dokumentasi visual langsung dari lini produksi dan simulasi pembelajaran langkah-demi-langkah
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-[11px] bg-cyan-950 border border-cyan-600/40 text-cyan-300 font-semibold px-2.5 py-1 rounded-full">
                    {media.galleryPhotos.length} Foto Detail &bull; {media.videoTutorials.length} Video Panduan
                  </span>
                </div>
              </div>

              {/* 1. Galeri Foto Komponen & Lini Mesin */}
              <div>
                <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-cyan-400" />
                  <span>Foto Komponen & Detail Konstruksi Nyata (Klik untuk Memperbesar)</span>
                </h5>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {media.galleryPhotos.map((photo) => (
                    <div 
                      key={photo.id}
                      className="bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 rounded-xl overflow-hidden transition-all duration-200 flex flex-col justify-between group cursor-pointer"
                      onClick={() => setSelectedPhoto(photo)}
                    >
                      <div className="relative overflow-hidden aspect-video bg-slate-950">
                        <img 
                          src={photo.imageSrc} 
                          alt={photo.title} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm p-1.5 rounded-lg text-white opacity-90 group-hover:opacity-100 transition-opacity">
                          <Maximize2 className="w-3.5 h-3.5 text-cyan-300" />
                        </div>
                        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
                          {photo.tags.map((tag, idx) => (
                            <span key={idx} className="bg-slate-950/80 backdrop-blur-sm text-cyan-300 border border-cyan-800/60 text-[10px] font-semibold px-2 py-0.5 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-3.5 flex-1 flex flex-col justify-between">
                        <div>
                          <h6 className="font-extrabold text-white text-sm group-hover:text-cyan-300 transition-colors">
                            {photo.title}
                          </h6>
                          <span className="text-[11px] text-amber-400 font-semibold block mt-0.5">
                            {photo.subtitle}
                          </span>
                          <p className="text-slate-300 text-xs mt-1.5 leading-relaxed">
                            {photo.description}
                          </p>
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-slate-800/80 space-y-1">
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                            Bagian Kunci yang Diperhatikan:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px]">
                            {photo.keyCallouts.slice(0, 2).map((call, cIdx) => (
                              <div key={cIdx} className="bg-slate-950/60 p-1.5 rounded border border-slate-800">
                                <span className="font-bold text-cyan-300 block">{call.label}</span>
                                <span className="text-slate-400 text-[10px] leading-tight block">{call.detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Video Tutorial Interaktif & Simulator Pembelajaran */}
              {media.videoTutorials.length > 0 && currentVideo && (
                <div id="industrial-video-container" className="pt-3 border-t border-slate-800">
                  <IndustrialVideoPlayer
                    video={currentVideo}
                    allVideos={media.videoTutorials}
                    onSelectVideo={(vidId) => {
                      setActiveVideoId(vidId);
                      setActiveChapterIndex(0);
                    }}
                    activeChapterIndex={activeChapterIndex}
                    onSelectChapter={(cIdx) => setActiveChapterIndex(cIdx)}
                    machineName={data.name}
                  />
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* KHUSUS TISSUE PM / PM CYLINDER MOULD: 18 ALAT, KUIS & SIM */}
          {/* ========================================================= */}
          {data.tissueEquipments && data.tissueQuizzes && (
            <TissueMachineTrainingView
              equipments={data.tissueEquipments}
              quizzes={data.tissueQuizzes}
              roleGuides={data.roleGuides}
              activeSubTab={activeSubTab}
              onOpenPhoto={(photo) => setSelectedPhoto(photo)}
              onWatchVideo={(videoId) => {
                setActiveSubTab('media');
                if (videoId) setActiveVideoId(videoId);
              }}
              galleryPhotos={media?.galleryPhotos || []}
            />
          )}

          {/* ========================================================= */}
          {/* KHUSUS STOCK PREPARATION: 12 PERALATAN, SIMULATOR, KUIS  */}
          {/* ========================================================= */}
          {isStockPrep && data.stockPrepEquipments && data.stockPrepQuizzes && (
            <StockPrepTrainingView
              equipments={data.stockPrepEquipments}
              quizzes={data.stockPrepQuizzes}
              roleGuides={data.roleGuides}
              activeSubTab={activeSubTab}
              onOpenPhoto={(photo) => setSelectedPhoto(photo)}
              onWatchVideo={(videoId) => {
                setActiveSubTab('media');
                if (videoId) setActiveVideoId(videoId);
              }}
              galleryPhotos={media?.galleryPhotos || []}
            />
          )}

          {/* ========================================================= */}
          {/* BANNER VIDEO TUTORIAL REWINDER & SLITTER KHUSUS          */}
          {/* ========================================================= */}
          {isRewinder && media && media.videoTutorials.length > 0 && (
            <div className="bg-gradient-to-r from-amber-950/70 via-slate-900 to-orange-950/70 border border-amber-500/40 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-500/20 border border-amber-500/40 rounded-xl text-amber-300 shrink-0">
                  <Video className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h4 className="font-extrabold text-white text-sm sm:text-base flex items-center gap-2">
                    <span>Video Tutorial Praktik Mesin Rewinder & Slitter</span>
                    <span className="text-[10px] bg-amber-500 text-black font-black px-2 py-0.5 rounded-full">
                      Tersedia 2 Video
                    </span>
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Putar video simulasi interaktif & alur kerja lengkap (Slitter Knives, Banana Bowed Roll, & SOP K3 LOTO)
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    setActiveSubTab('media');
                    setActiveVideoId('rew-vid-1');
                    setActiveChapterIndex(0);
                    setTimeout(() => {
                      const el = document.getElementById('industrial-video-player');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="px-3 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 whitespace-nowrap"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Putar Video 1 (Slitter & Banana Roll)</span>
                </button>

                <button
                  onClick={() => {
                    setActiveSubTab('media');
                    setActiveVideoId('rew-vid-2');
                    setActiveChapterIndex(0);
                    setTimeout(() => {
                      const el = document.getElementById('industrial-video-player');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs rounded-xl border border-amber-500/40 transition-all flex items-center gap-1.5 whitespace-nowrap"
                >
                  <Play className="w-3.5 h-3.5 fill-current text-rose-400" />
                  <span>Putar Video 2 (K3 & LOTO)</span>
                </button>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* KHUSUS REWINDER: 7 KOMPONEN PENTING REWINDER             */}
          {/* ========================================================= */}
          {isRewinder && data.componentsList && (activeSubTab === 'all' || activeSubTab === 'components') && (
            <div className="bg-slate-950/70 border border-amber-900/40 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-slate-800 gap-1">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-amber-900/60 border border-amber-500/50 rounded-lg text-amber-300">
                    <Settings className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-base">
                      7 Komponen Utama Mesin Rewinder & Fungsi Presisinya
                    </h4>
                    <p className="text-xs text-slate-400">
                      Pemahaman menyeluruh mengenai fungsi mekanis, konstruksi, dan tips pengoperasian di lapangan
                    </p>
                  </div>
                </div>
                <span className="text-[11px] bg-amber-950 border border-amber-600/40 text-amber-300 font-semibold px-2.5 py-1 rounded-full self-start sm:self-auto">
                  Materi Inti PDF Slide 4 - 8
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
                {data.componentsList.map((comp) => (
                  <div 
                    key={comp.id} 
                    className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 rounded-xl p-4 transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-800/80">
                        <span className="font-bold text-amber-300 text-sm">{comp.name}</span>
                        <span className="text-[10px] bg-slate-800 text-slate-300 font-semibold px-2 py-0.5 rounded border border-slate-700">
                          {comp.category}
                        </span>
                      </div>

                      <div className="mb-2.5">
                        <span className="text-slate-400 text-[11px] font-semibold block mb-0.5">Fungsi Utama:</span>
                        <p className="text-slate-100 leading-relaxed font-medium">{comp.function}</p>
                      </div>

                      <div className="mb-2.5 bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/60">
                        <span className="text-cyan-400 text-[11px] font-semibold block mb-0.5">Konstruksi Mekanik:</span>
                        <p className="text-slate-300 text-[11px] leading-relaxed">{comp.constructionDetails}</p>
                      </div>

                      <div className="mb-2.5 bg-amber-950/30 p-2.5 rounded-lg border border-amber-900/30">
                        <span className="text-amber-400 text-[11px] font-semibold block mb-0.5">Tips Operasional & Pemeliharaan:</span>
                        <p className="text-amber-200/90 text-[11px] leading-relaxed">{comp.operationTips}</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{comp.roleAttention}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* KHUSUS REWINDER: ALUR KERJA 6 TAHAP (WORKFLOW SOP)         */}
          {/* ========================================================= */}
          {isRewinder && data.workflowSteps && (activeSubTab === 'all' || activeSubTab === 'workflow') && (
            <div className="bg-slate-950/70 border border-blue-900/40 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-slate-800 gap-1">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-900/60 border border-blue-500/50 rounded-lg text-blue-300">
                    <RotateCcw className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-base">
                      Alur Kerja & Prosedur Operasional Rewinder (6 Tahapan Standar)
                    </h4>
                    <p className="text-xs text-slate-400">
                      Tahapan sekuensial dari muat Jumbo Roll (JR) hingga doffing gulungan jadi siap kirim
                    </p>
                  </div>
                </div>
                <span className="text-[11px] bg-blue-950 border border-blue-600/40 text-blue-300 font-semibold px-2.5 py-1 rounded-full self-start sm:self-auto">
                  SOP Terintegrasi Shift
                </span>
              </div>

              <div className="space-y-3.5">
                {data.workflowSteps.map((step) => (
                  <div 
                    key={step.stepNumber} 
                    className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 text-xs space-y-2.5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="h-6 w-6 rounded-full bg-blue-600 text-white font-black flex items-center justify-center text-xs shrink-0">
                          {step.stepNumber}
                        </span>
                        <span className="font-extrabold text-white text-sm">{step.title}</span>
                      </div>
                      <span className="text-[11px] bg-slate-800 text-blue-300 font-semibold px-2 py-0.5 rounded border border-slate-700 self-start sm:self-auto">
                        Fase: {step.phase}
                      </span>
                    </div>

                    <p className="text-slate-300 leading-relaxed font-normal">{step.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
                      <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                        <span className="text-emerald-400 font-bold block mb-0.5">Tindakan Operator:</span>
                        <p className="text-slate-200 leading-relaxed">{step.operatorAction}</p>
                      </div>
                      <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                        <span className="text-amber-400 font-bold block mb-0.5">Pemeriksaan Kepala Regu (Karu):</span>
                        <p className="text-slate-200 leading-relaxed">{step.karuCheck}</p>
                      </div>
                    </div>

                    <div className="bg-rose-950/40 border border-rose-900/50 rounded-lg p-2 flex items-center gap-2 text-rose-300 font-medium">
                      <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>{step.safetyCaution}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* KHUSUS REWINDER: MATRIKS PERAN (OPERATOR, KARU, KEPALA PM)*/}
          {/* ========================================================= */}
          {isRewinder && data.roleGuides && (activeSubTab === 'all' || activeSubTab === 'roles') && (
            <div className="bg-slate-950/70 border border-emerald-900/40 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-slate-800 gap-1">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-emerald-900/60 border border-emerald-500/50 rounded-lg text-emerald-300">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-base">
                      Matriks Tanggung Jawab & Pembagian Tugas di Lini Rewinder
                    </h4>
                    <p className="text-xs text-slate-400">
                      Panduan peran terstruktur agar Operator, Kepala Regu, dan Kepala PM saling bersinergi tanpa salah koordinasi
                    </p>
                  </div>
                </div>
                <span className="text-[11px] bg-emerald-950 border border-emerald-600/40 text-emerald-300 font-semibold px-2.5 py-1 rounded-full self-start sm:self-auto">
                  Akuntabilitas Tim
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs">
                {data.roleGuides.map((rg, idx) => (
                  <div 
                    key={idx} 
                    className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                        <span className="font-extrabold text-white text-sm">{rg.role}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          rg.badgeColor === 'emerald'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                            : rg.badgeColor === 'amber'
                            ? 'bg-amber-950 text-amber-300 border border-amber-700'
                            : 'bg-blue-950 text-blue-300 border border-blue-700'
                        }`}>
                          Level {idx + 1}
                        </span>
                      </div>

                      <p className="text-slate-300 text-[11px] mb-3 leading-relaxed">{rg.summary}</p>

                      <div className="space-y-1.5 mb-3">
                        <span className="font-bold text-amber-400 text-[11px] block">Fokus Harian & Rutinitas:</span>
                        <ul className="space-y-1 text-slate-300">
                          {rg.dailyFocus.map((foc, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="leading-snug">{foc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-2.5 border-t border-slate-800/80 bg-slate-950/60 p-2.5 rounded-lg">
                      <span className="font-bold text-cyan-300 text-[11px] block mb-1">Otoritas Keputusan:</span>
                      <ul className="space-y-0.5 text-[11px] text-slate-300">
                        {rg.decisionAuthority.map((auth, aIdx) => (
                          <li key={aIdx} className="flex items-start gap-1">
                            <span className="text-cyan-400">&bull;</span>
                            <span>{auth}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* KHUSUS REWINDER: 5 SOAL TANYA JAWAB & EVALUASI KOMPETENSI */}
          {/* ========================================================= */}
          {isRewinder && data.competencyQAs && (activeSubTab === 'all' || activeSubTab === 'quiz') && (
            <div className="bg-slate-950/70 border border-purple-900/40 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-slate-800 gap-1">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-purple-900/60 border border-purple-500/50 rounded-lg text-purple-300">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-base">
                      Uji Kompetensi Mandiri: 5 Pertanyaan Kritis & Pembahasan Mendalam
                    </h4>
                    <p className="text-xs text-slate-400">
                      Berdasarkan materi evaluasi slide 9 & 10 dengan penjabaran teknis mendalam dan dampak operasional
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      const allOpen = Object.values(expandedQA).every(Boolean);
                      const nextState: Record<number, boolean> = {};
                      [1, 2, 3, 4, 5].forEach(k => {
                        nextState[k] = !allOpen;
                      });
                      setExpandedQA(nextState);
                    }}
                    className="text-[11px] bg-purple-950 border border-purple-700/60 text-purple-300 hover:bg-purple-900/50 font-semibold px-2.5 py-1 rounded-lg transition-colors"
                  >
                    {Object.values(expandedQA).every(Boolean) ? 'Tutup Semua Jawaban' : 'Buka Semua Jawaban'}
                  </button>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                {data.competencyQAs.map((qa) => {
                  const isExpanded = expandedQA[qa.number] ?? false;
                  return (
                    <div 
                      key={qa.number} 
                      className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden transition-all duration-200"
                    >
                      <button
                        onClick={() => toggleQA(qa.number)}
                        className="w-full text-left p-3.5 flex items-start justify-between gap-3 hover:bg-slate-800/50 transition-colors"
                      >
                        <div className="flex items-start gap-2.5">
                          <span className="h-5 w-5 rounded-full bg-purple-900 border border-purple-500/60 text-purple-200 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                            {qa.number}
                          </span>
                          <div>
                            <span className="font-bold text-white text-sm block">{qa.question}</span>
                            <span className="text-[11px] text-slate-400 mt-0.5 block">
                              Target Penguasaan: <strong className="text-purple-300">{qa.whoMustMaster}</strong>
                            </span>
                          </div>
                        </div>
                        <div className="p-1 rounded bg-slate-800 text-slate-400 shrink-0">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="px-4 pb-4 pt-1 space-y-2.5 border-t border-slate-800/80 bg-slate-950/40 animate-fadeIn">
                          <div className="bg-emerald-950/40 border border-emerald-900/60 rounded-lg p-3">
                            <span className="text-emerald-400 font-bold text-xs flex items-center gap-1.5 mb-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              Jawaban Cepat Lapangan:
                            </span>
                            <p className="text-emerald-100 font-semibold text-xs leading-relaxed">
                              {qa.quickAnswer}
                            </p>
                          </div>

                          <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                            <span className="text-cyan-400 font-bold text-xs block mb-1">
                              Penjelasan Teknis Mendalam (Engineering Deep-Dive):
                            </span>
                            <p className="text-slate-300 text-xs leading-relaxed">
                              {qa.deepDiveExplanation}
                            </p>
                          </div>

                          <div className="bg-amber-950/30 border border-amber-900/40 rounded-lg p-2.5 flex items-start gap-2 text-amber-300 text-[11px]">
                            <AlertOctagon className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                            <div>
                              <strong className="text-amber-200">Dampak Operasional jika Diabaikan: </strong>
                              {qa.operationalImpact}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* SPESIFIKASI TEKNIS & KAPASITAS NOMINAL                     */}
          {/* ========================================================= */}
          {!isRewinder && !isStockPrep && (activeSubTab === 'all' || activeSubTab === 'specs') && data.technicalSpecs && (
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
              <h4 className="font-bold text-slate-100 mb-3 flex items-center gap-2 text-sm">
                <Settings className="w-4 h-4 text-blue-400" />
                Spesifikasi Teknis & Kapasitas Desain {data.machineId}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {data.technicalSpecs.map((spec, i) => (
                  <div key={i} className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 flex flex-col justify-between">
                    <span className="text-slate-400">{spec.label}</span>
                    <span className="font-semibold text-slate-100 mt-0.5">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* BATAS OPERASI AMAN & DANGER ZONES                         */}
          {/* ========================================================= */}
          {!isRewinder && !isStockPrep && (activeSubTab === 'all' || activeSubTab === 'limits' || activeSubTab === 'trouble') && data.operatingLimits && (
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
              <h4 className="font-bold text-rose-400 mb-3 flex items-center gap-2 text-sm">
                <AlertOctagon className="w-4 h-4" />
                Batas Operasi & Parameter Kritis (Danger Zones) {data.machineId}
              </h4>
              <div className="space-y-2">
                {data.operatingLimits.map((lim, i) => (
                  <div key={i} className="bg-slate-900/80 border border-rose-950/80 rounded-lg p-2.5 text-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <div className="font-medium text-slate-200">
                      {lim.label}: <span className="font-bold font-mono text-emerald-400">{lim.limit}</span>
                    </div>
                    <div className="text-rose-400 text-[11px] font-medium bg-rose-950/70 px-2 py-0.5 rounded border border-rose-900/50">
                      Bahaya: {lim.dangerZone}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* KATALOG PRODUK / GRADE KERTAS                             */}
          {/* ========================================================= */}
          {!isRewinder && !isStockPrep && (activeSubTab === 'all' || activeSubTab === 'specs') && data.paperGrades && (
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
              <h4 className="font-bold text-emerald-400 mb-3 flex items-center gap-2 text-sm">
                <Layers className="w-4 h-4" />
                {isRewinder ? 'Kategori Grade Produk yang Diproses di Rewinder' : `Katalog Jenis Kertas / Grade Produk ${data.machineId}`}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
                {data.paperGrades.map((g, i) => (
                  <div key={i} className="bg-slate-900/80 border border-emerald-950/80 rounded-lg p-3">
                    <div className="font-mono font-bold text-emerald-300 text-sm">{g.code}</div>
                    <div className="font-semibold text-slate-200 mt-0.5">{g.name}</div>
                    <div className="text-[11px] text-amber-400 font-medium mt-1">Rentang: {g.gsmRange}</div>
                    <p className="text-slate-400 text-[11px] mt-1.5 leading-relaxed">{g.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TITIK PEMERIKSAAN RUTIN HARIAN                            */}
          {/* ========================================================= */}
          {!isRewinder && !isStockPrep && (activeSubTab === 'all' || activeSubTab === 'checkpoints') && data.dailyCheckpoints && (
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
              <h4 className="font-bold text-teal-400 mb-3 flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4" />
                Titik Pemeriksaan Rutin Harian per Bagian Mesin
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {data.dailyCheckpoints.map((cp, i) => (
                  <div key={i} className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                    <div className="font-bold text-teal-300 mb-1.5 pb-1 border-b border-slate-800">
                      Area: {cp.area}
                    </div>
                    <ul className="space-y-1 text-slate-300">
                      {cp.items.map((it, j) => (
                        <li key={j} className="flex items-start gap-1.5">
                          <span className="text-teal-400">&bull;</span>
                          <span className="leading-snug">{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* PARAMETER OPERASI & DCS / MONITOR KONTROL                 */}
          {/* ========================================================= */}
          {!isRewinder && !isStockPrep && (activeSubTab === 'all' || activeSubTab === 'limits') && data.standardParameters && data.dcsIndicatorsGuide && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Standar Parameter */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                <h4 className="font-bold text-cyan-400 mb-3 flex items-center gap-2 text-sm">
                  <FileSpreadsheet className="w-4 h-4" />
                  Standar Parameter Operasi Standar
                </h4>
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-800 text-slate-300">
                    <tr>
                      <th className="p-2 rounded-l">Parameter</th>
                      <th className="p-2">Nilai Standar</th>
                      <th className="p-2 rounded-r">Satuan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-200">
                    {data.standardParameters.map((p, i) => (
                      <tr key={i}>
                        <td className="p-2 font-medium">{p.parameter}</td>
                        <td className="p-2 font-mono text-cyan-300 font-bold">{p.range}</td>
                        <td className="p-2 text-slate-400">{p.unit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Indikator DCS / Sensor Monitor */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                <h4 className="font-bold text-purple-400 mb-3 flex items-center gap-2 text-sm">
                  <Cpu className="w-4 h-4" />
                  Panduan Membaca Layar Kontrol DCS & Sensor {data.machineId}
                </h4>
                <div className="space-y-2 text-xs">
                  {data.dcsIndicatorsGuide.map((ind, i) => (
                    <div key={i} className="bg-slate-900/80 p-2.5 rounded-lg border border-purple-950/80">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-purple-300">{ind.code}</span>
                        <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">
                          Normal: {ind.normalState}
                        </span>
                      </div>
                      <div className="text-slate-300 mt-1 font-medium">{ind.meaning}</div>
                      <div className="text-[11px] text-amber-400 mt-1">
                        Aksi jika abnormal: {ind.actionIfAbnormal}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* GANGGUAN KHAS & SOLUSI REKAYASA (TROUBLESHOOTING)          */}
          {/* ========================================================= */}
          {(activeSubTab === 'all' || activeSubTab === 'trouble') && data.commonFaultsAndSolutions && (
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
              <h4 className="font-bold text-amber-400 mb-3 flex items-center gap-2 text-sm">
                <AlertOctagon className="w-4 h-4" />
                Gangguan Khas {data.machineId} & Solusi Cepat Lapangan
              </h4>
              <div className="space-y-3">
                {data.commonFaultsAndSolutions.map((fault, i) => (
                  <div key={i} className="bg-slate-900/90 border border-amber-950/80 rounded-lg p-3.5 text-xs">
                    <div className="font-bold text-amber-300 text-sm mb-1">{fault.fault}</div>
                    <div className="text-slate-400 mb-1">Indikasi: {fault.indication}</div>
                    {fault.cause && (
                      <div className="text-amber-400/90 text-[11px] mb-2">Penyebab: {fault.cause}</div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-2 border-t border-slate-800">
                      <div className="bg-slate-950/60 p-2.5 rounded">
                        <span className="text-cyan-400 font-semibold block mb-0.5">Tindakan Cepat Lapangan:</span>
                        <p className="text-slate-200 leading-relaxed">{fault.immediateAction}</p>
                      </div>
                      <div className="bg-slate-950/60 p-2.5 rounded">
                        <span className="text-emerald-400 font-semibold block mb-0.5">Solusi Permanen / Akar Masalah:</span>
                        <p className="text-emerald-200 leading-relaxed">{fault.permanentFix}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* STANDAR K3 KESELAMATAN KERJA                             */}
          {/* ========================================================= */}
          {(activeSubTab === 'all' || activeSubTab === 'trouble') && data.k3SafetyProcedures && (
            <div className="bg-slate-950/60 border border-rose-900/60 rounded-xl p-4">
              <h4 className="font-bold text-rose-300 mb-2.5 flex items-center gap-2 text-sm">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                Batas Aman & Standar Keselamatan Kerja (K3) {data.machineId}
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {data.k3SafetyProcedures.map((k3, i) => (
                  <li key={i} className="flex items-start gap-2 bg-slate-900/70 p-2.5 rounded-lg border border-rose-950">
                    <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{k3}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
            </>
          )}

        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-200">PT. Panca Usahatama Paramita</span>
            <span>&bull;</span>
            <span>Dept. Training Mesin & Finishing Produksi Kertas</span>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-medium transition-colors flex items-center gap-1 border border-slate-700"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span>Cetak Modul Ini</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-bold transition-colors shadow"
            >
              Tutup & Kembali
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* FULLSCREEN PHOTO LIGHTBOX MODAL                           */}
      {/* ========================================================= */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-60 bg-black/90 backdrop-blur-lg flex flex-col items-center justify-center p-4 animate-fadeIn">
          <div className="max-w-5xl w-full bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            
            {/* Lightbox Header */}
            <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <span className="bg-cyan-500/20 text-cyan-300 text-xs font-bold px-2 py-0.5 rounded border border-cyan-500/40">
                  {selectedPhoto.subtitle}
                </span>
                <h4 className="font-bold text-white text-sm sm:text-base">
                  {selectedPhoto.title}
                </h4>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title="Tutup Preview Gambar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Image View */}
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-black/60">
              <img 
                src={selectedPhoto.imageSrc} 
                alt={selectedPhoto.title} 
                referrerPolicy="no-referrer"
                className="max-h-[60vh] w-auto max-w-full object-contain rounded-lg shadow-2xl border border-slate-800"
              />
            </div>

            {/* Lightbox Footer & Callouts */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 shrink-0 text-xs space-y-2">
              <p className="text-slate-300 leading-relaxed">
                {selectedPhoto.description}
              </p>

              <div className="pt-2 border-t border-slate-800/80">
                <span className="font-bold text-cyan-300 text-[11px] block mb-1">
                  Titik Kunci Anatomi & Pemeriksaan:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {selectedPhoto.keyCallouts.map((call, cIdx) => (
                    <div key={cIdx} className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                      <span className="font-bold text-amber-300 block">{call.label}</span>
                      <span className="text-slate-400 text-[11px] block mt-0.5 leading-tight">{call.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

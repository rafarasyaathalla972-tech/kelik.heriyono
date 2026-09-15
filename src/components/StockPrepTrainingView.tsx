import React, { useState, useMemo } from 'react';
import { 
  StockPrepEquipmentDetail, 
  StockPrepQuizItem, 
  MachinePhotoItem,
  RoleResponsibilityGuide
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
  FileSpreadsheet
} from 'lucide-react';

interface StockPrepTrainingViewProps {
  equipments: StockPrepEquipmentDetail[];
  quizzes: StockPrepQuizItem[];
  roleGuides?: RoleResponsibilityGuide[];
  activeSubTab: string;
  onOpenPhoto?: (photo: MachinePhotoItem) => void;
  onWatchVideo?: (videoId?: string) => void;
  galleryPhotos?: MachinePhotoItem[];
}

export const StockPrepTrainingView: React.FC<StockPrepTrainingViewProps> = ({
  equipments,
  quizzes,
  roleGuides,
  activeSubTab,
  onOpenPhoto,
  onWatchVideo,
  galleryPhotos = []
}) => {
  // Search and category filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [expandedEquipmentId, setExpandedEquipmentId] = useState<string | null>('sp-eq-1');

  // Interactive Junk Trap Simulator State
  const [junkTrapMode, setJunkTrapMode] = useState<'normal' | 'flushing'>('normal');

  // Interactive Quiz State
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [expandedQuizId, setExpandedQuizId] = useState<string | null>(null);

  // Categories list
  const categories = useMemo(() => {
    const cats = Array.from(new Set(equipments.map(e => e.category)));
    return ['ALL', ...cats];
  }, [equipments]);

  // Filtered equipments
  const filteredEquipments = useMemo(() => {
    return equipments.filter(eq => {
      const matchCat = selectedCategory === 'ALL' || eq.category === selectedCategory;
      const matchSearch = searchTerm.trim() === '' || 
        eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        eq.function.toLowerCase().includes(searchTerm.toLowerCase()) ||
        eq.targetConsistency.toLowerCase().includes(searchTerm.toLowerCase()) ||
        eq.workingPrinciple.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [equipments, selectedCategory, searchTerm]);

  // Handle quiz option selection
  const handleSelectOption = (quizId: string, optionIdx: number) => {
    if (quizSubmitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [quizId]: optionIdx
    }));
  };

  // Calculate score
  const quizScore = useMemo(() => {
    let score = 0;
    quizzes.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswerIndex) {
        score += 1;
      }
    });
    return score;
  }, [quizzes, userAnswers]);

  const resetQuiz = () => {
    setUserAnswers({});
    setQuizSubmitted(false);
    setExpandedQuizId(null);
  };

  return (
    <div className="space-y-6">

      {/* ========================================================= */}
      {/* 1. HERO OVERVIEW: TUJUAN TRAINING & DEFINISI STOCK PREP   */}
      {/* ========================================================= */}
      {(activeSubTab === 'all' || activeSubTab === 'flow') && (
        <div className="bg-gradient-to-br from-emerald-950/70 via-slate-900 to-slate-950 border border-emerald-800/60 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-800/40 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-900/80 border border-emerald-500/50 rounded-xl text-emerald-400">
                <Factory className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base sm:text-lg flex items-center gap-2">
                  Fundamental & Tujuan Pelatihan Stock Preparation
                </h3>
                <p className="text-xs text-emerald-300/80">
                  Materi Resmi Departemen Produksi Kertas PT. Panca Usahatama Paramita
                </p>
              </div>
            </div>
            <span className="text-[11px] bg-emerald-950 border border-emerald-600/50 text-emerald-300 font-bold px-3 py-1 rounded-full">
              12 Tahap Alur Proses Lengkap
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Definisi & Sasaran */}
            <div className="bg-slate-900/90 border border-emerald-900/60 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-sm">
                <Compass className="w-4 h-4" />
                <span>Definisi & Sasaran Utama Stock Prep</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Stock Preparation adalah seksi pengolahan awal yang mempersiapkan serat mentah (Virgin Pulp, Broke, dan Recycle OCC) menjadi suspensi bubur kertas siap kirim ke Paper Machine (PM1, PM2, dan PM5).
              </p>
              <div className="space-y-1 text-slate-300 pt-1">
                <div className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">&bull;</span>
                  <span><strong>Freeness Terkontrol:</strong> Menggiling serat pada nilai CSF optimal (Deflaker 360-380 CSF, DDR 320-350 CSF) agar formasi dan dewatering di PM sempurna.</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">&bull;</span>
                  <span><strong>Bebas Kontaminan:</strong> Mengeliminasi partikel berat (pasir, staples, kawat) dan kontaminan ringan (plastik, lem, getah/pitch) yang merusak silinder Yankee & kain felt.</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">&bull;</span>
                  <span><strong>Bahan Aditif Kimiawi:</strong> Pelarutan serbuk PEO Axfloc presisi (17 - 19 Cps) untuk meningkatkan kelembutan lembaran tissue.</span>
                </div>
              </div>
            </div>

            {/* 6 Target Pembelajaran Mandat PDF */}
            <div className="bg-slate-900/90 border border-emerald-900/60 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold text-sm">
                <Award className="w-4 h-4" />
                <span>6 Kompetensi Wajib Operator & Pimpinan</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300">
                <div className="bg-slate-950/70 p-2 rounded border border-slate-800 flex items-start gap-1.5">
                  <span className="text-emerald-400 font-black">1.</span>
                  <span>Paham nama & fungsi seluruh 12 peralatan stock prep</span>
                </div>
                <div className="bg-slate-950/70 p-2 rounded border border-slate-800 flex items-start gap-1.5">
                  <span className="text-emerald-400 font-black">2.</span>
                  <span>Kuasai cara pembuangan kotoran & parameter kontrol</span>
                </div>
                <div className="bg-slate-950/70 p-2 rounded border border-slate-800 flex items-start gap-1.5">
                  <span className="text-emerald-400 font-black">3.</span>
                  <span>Mengerti prinsip kerja internal hidrodinamika alat</span>
                </div>
                <div className="bg-slate-950/70 p-2 rounded border border-slate-800 flex items-start gap-1.5">
                  <span className="text-emerald-400 font-black">4.</span>
                  <span>Kuasai target konsistensi & freeness tiap tahap</span>
                </div>
                <div className="bg-slate-950/70 p-2 rounded border border-slate-800 flex items-start gap-1.5">
                  <span className="text-emerald-400 font-black">5.</span>
                  <span>Paham alur proses sistematis dari awal s/d PM</span>
                </div>
                <div className="bg-slate-950/70 p-2 rounded border border-slate-800 flex items-start gap-1.5">
                  <span className="text-emerald-400 font-black">6.</span>
                  <span>Mampu melarutkan PEO bebas fish-eye (17-19 Cps)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Diagram Alur Singkat 12 Peralatan */}
          <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800 overflow-x-auto">
            <span className="text-[11px] font-bold text-slate-400 block mb-2 uppercase tracking-wider">
              Urutan Aliran Bubur (Process Flow Diagram):
            </span>
            <div className="flex items-center gap-1.5 min-w-[760px] text-[11px] text-slate-200">
              <span className="bg-emerald-950 border border-emerald-600/60 px-2 py-1 rounded font-bold text-emerald-300">1. Pulper</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="bg-slate-900 border border-slate-700 px-2 py-1 rounded font-bold text-cyan-300">2. HDC Cleaner</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="bg-slate-900 border border-slate-700 px-2 py-1 rounded font-bold text-slate-200">3. Vibrating</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="bg-slate-900 border border-slate-700 px-2 py-1 rounded font-bold text-slate-200">4. Turboseparator</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="bg-slate-900 border border-slate-700 px-2 py-1 rounded font-bold text-slate-200">5. MCC Cleaner</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="bg-blue-950 border border-blue-600/60 px-2 py-1 rounded font-bold text-blue-300">6. Pressure Screen</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="bg-slate-900 border border-slate-700 px-2 py-1 rounded font-bold text-slate-200">7. LCC Cleaner</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="bg-amber-950 border border-amber-600/60 px-2 py-1 rounded font-bold text-amber-300">8. Thickener</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="bg-slate-900 border border-slate-700 px-2 py-1 rounded font-bold text-slate-200">9. Washer</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="bg-orange-950 border border-orange-600/60 px-2 py-1 rounded font-bold text-orange-300">10. Deflaker</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="bg-rose-950 border border-rose-600/60 px-2 py-1 rounded font-bold text-rose-300">11. DDR</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="bg-teal-950 border border-teal-600/60 px-2 py-1 rounded font-bold text-teal-300">12. PEO Dosing</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="bg-emerald-600 text-white px-2.5 py-1 rounded font-black">Paper Machine (PM)</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. SIMULATOR INTERAKTIF: JUNK TRAP HDC (KATUP A, B, C, D, E) */}
      {/* ========================================================= */}
      {(activeSubTab === 'all' || activeSubTab === 'junktrap') && (
        <div className="bg-slate-950/90 border border-cyan-800/60 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-slate-800 gap-2">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-cyan-950/80 border border-cyan-500/50 rounded-xl text-cyan-400">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-white text-base flex items-center gap-2">
                  Simulator Interaktif Katup Junk Trap & HDC Cleaner
                </h4>
                <p className="text-xs text-cyan-300/80">
                  Panduan Operasional Valve X, G, Y, H, A, B, C, D, E (Materi Wajib Operator & Karu)
                </p>
              </div>
            </div>

            {/* Toggle Mode Buttons */}
            <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
              <button
                onClick={() => setJunkTrapMode('normal')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  junkTrapMode === 'normal'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Kondisi Normal Operasi</span>
              </button>
              <button
                onClick={() => setJunkTrapMode('flushing')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  junkTrapMode === 'flushing'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Pembuangan Reject (Flushing)</span>
              </button>
            </div>
          </div>

          {/* Valve Schematic Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Schematic Visual Box */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  Status Valve Saat: <span className={junkTrapMode === 'normal' ? 'text-emerald-400' : 'text-amber-400'}>
                    {junkTrapMode === 'normal' ? 'OPERASI NORMAL' : 'PEMBUANGAN KOTORAN (FLUSHING)'}
                  </span>
                </span>
                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">
                  Delta P min 1.0 bar
                </span>
              </div>

              {/* Status Katup Detail */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {/* Valve X (Inlet) */}
                <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-mono">Valve X (Inlet Utama)</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                    <Check className="w-3 h-3" /> TERBUKA
                  </span>
                  <span className="text-[10px] text-slate-400">Tekanan PI-G &ge; 1.5 bar</span>
                </div>

                {/* Valve Y (Accept) */}
                <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-mono">Valve Y (Accept Bersih)</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                    <Check className="w-3 h-3" /> TERBUKA
                  </span>
                  <span className="text-[10px] text-slate-400">Tekanan PI-H 0.5 bar</span>
                </div>

                {/* Valve A (Filling) */}
                <div className={`p-2 rounded-lg border ${
                  junkTrapMode === 'normal'
                    ? 'bg-rose-950/30 border-rose-900/60'
                    : 'bg-rose-950/30 border-rose-900/60'
                }`}>
                  <span className="text-[10px] text-slate-400 block font-mono">Valve A (Filling Water)</span>
                  <span className="text-rose-400 font-bold flex items-center gap-1 mt-0.5">
                    <XCircle className="w-3 h-3" /> TERTUTUP
                  </span>
                  <span className="text-[10px] text-slate-400">Hanya buka saat isi ulang</span>
                </div>

                {/* Valve B (Reject Chamber) */}
                <div className={`p-2 rounded-lg border ${
                  junkTrapMode === 'normal'
                    ? 'bg-emerald-950/30 border-emerald-900/60'
                    : 'bg-rose-950/30 border-rose-900/60'
                }`}>
                  <span className="text-[10px] text-slate-400 block font-mono">Valve B (Reject Masuk)</span>
                  {junkTrapMode === 'normal' ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                      <Check className="w-3 h-3" /> TERBUKA
                    </span>
                  ) : (
                    <span className="text-rose-400 font-bold flex items-center gap-1 mt-0.5">
                      <XCircle className="w-3 h-3" /> TERTUTUP RAPAT
                    </span>
                  )}
                  <span className="text-[10px] text-slate-400">
                    {junkTrapMode === 'normal' ? 'Kotoran turun ke trap' : 'Wajib tutup agar bubur tidak ikut'}
                  </span>
                </div>

                {/* Valve C (Drain Dump) */}
                <div className={`p-2 rounded-lg border ${
                  junkTrapMode === 'normal'
                    ? 'bg-rose-950/30 border-rose-900/60'
                    : 'bg-emerald-950/30 border-emerald-900/60'
                }`}>
                  <span className="text-[10px] text-slate-400 block font-mono">Valve C (Drain Pembuang)</span>
                  {junkTrapMode === 'normal' ? (
                    <span className="text-rose-400 font-bold flex items-center gap-1 mt-0.5">
                      <XCircle className="w-3 h-3" /> TERTUTUP
                    </span>
                  ) : (
                    <span className="text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                      <Check className="w-3 h-3" /> TERBUKA PENUH
                    </span>
                  )}
                  <span className="text-[10px] text-slate-400">
                    {junkTrapMode === 'normal' ? 'Menahan air & kotoran' : 'Kotoran keluar ke bak reject'}
                  </span>
                </div>

                {/* Valve D (Vacuum Breaker) */}
                <div className={`p-2 rounded-lg border ${
                  junkTrapMode === 'normal'
                    ? 'bg-rose-950/30 border-rose-900/60'
                    : 'bg-emerald-950/30 border-emerald-900/60'
                }`}>
                  <span className="text-[10px] text-slate-400 block font-mono">Valve D (Vacuum Breaker)</span>
                  {junkTrapMode === 'normal' ? (
                    <span className="text-rose-400 font-bold flex items-center gap-1 mt-0.5">
                      <XCircle className="w-3 h-3" /> TERTUTUP
                    </span>
                  ) : (
                    <span className="text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                      <Check className="w-3 h-3" /> TERBUKA
                    </span>
                  )}
                  <span className="text-[10px] text-slate-400">Udara masuk, kotoran jatuh bebas</span>
                </div>
              </div>

              {/* Valve E (Elutriasi Water) */}
              <div className="bg-cyan-950/40 border border-cyan-800/60 p-3 rounded-lg flex items-center justify-between">
                <div>
                  <span className="font-bold text-cyan-300 block">Valve E (Air Reducer / Elutriasi Sentrifugal)</span>
                  <span className="text-[11px] text-slate-300">
                    Menyemburkan air berlawanan arah pusaran (tekanan &ge; 1.5 bar) untuk menahan serat pulp agar tidak terbuang.
                  </span>
                </div>
                <span className="bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-1 rounded border border-emerald-500/40 text-[11px] shrink-0">
                  SELALU TERBUKA
                </span>
              </div>
            </div>

            {/* SOP Step-by-Step Operator */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3">
              <div>
                <span className="font-bold text-amber-400 text-sm block mb-1.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  SOP Standar 5 Langkah Pembuangan Reject HDC:
                </span>
                <ol className="space-y-2 text-slate-200 text-[11px]">
                  <li className="bg-slate-950/60 p-2 rounded border border-slate-800 flex items-start gap-2">
                    <span className="bg-amber-600 text-white font-bold w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[10px]">1</span>
                    <span><strong>Tutup Valve B & Valve A:</strong> Mengisolasi chamber junk trap dari cone cleaner agar bubur proses tidak ikut terbuang.</span>
                  </li>
                  <li className="bg-slate-950/60 p-2 rounded border border-slate-800 flex items-start gap-2">
                    <span className="bg-amber-600 text-white font-bold w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[10px]">2</span>
                    <span><strong>Buka Valve C & Valve D:</strong> Valve C membuka pipa pembuangan, Valve D memasukkan udara atmosfer sehingga kotoran jatuh tuntas tanpa efek vakum.</span>
                  </li>
                  <li className="bg-slate-950/60 p-2 rounded border border-slate-800 flex items-start gap-2">
                    <span className="bg-amber-600 text-white font-bold w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[10px]">3</span>
                    <span><strong>Bilas dengan Valve E:</strong> Biarkan semprotan air elutriasi membersihkan sisa pasir dan staples hingga bersih (5 - 10 detik).</span>
                  </li>
                  <li className="bg-slate-950/60 p-2 rounded border border-slate-800 flex items-start gap-2">
                    <span className="bg-amber-600 text-white font-bold w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[10px]">4</span>
                    <span><strong>Tutup Valve C & D, lalu Buka Valve A (Filling):</strong> Isi kembali ruang trap dengan air sampai penuh untuk mencegah lonjakan udara masuk ke cone.</span>
                  </li>
                  <li className="bg-slate-950/60 p-2 rounded border border-slate-800 flex items-start gap-2">
                    <span className="bg-emerald-600 text-white font-bold w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[10px]">5</span>
                    <span><strong>Tutup Valve A, Buka Kembali Valve B:</strong> HDC kembali beroperasi normal membersihkan serat pulp!</span>
                  </li>
                </ol>
              </div>

              <div className="bg-rose-950/40 border border-rose-800/60 p-2.5 rounded-lg text-[11px] text-rose-200 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>
                  <strong>Peringatan Karu:</strong> Dilarang membuka Valve B sebelum Valve C & D tertutup dan ruang trap terisi air penuh oleh Valve A.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. ALUR & RINCIAN 12 PERALATAN STOCK PREPARATION          */}
      {/* ========================================================= */}
      {(activeSubTab === 'all' || activeSubTab === 'flow' || activeSubTab === 'components') && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-slate-800 gap-3">
            <div>
              <h4 className="font-extrabold text-white text-base sm:text-lg flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-400" />
                12 Peralatan Utama Stock Preparation & Standar Operasional
              </h4>
              <p className="text-xs text-slate-400">
                Pilih peralatan untuk melihat prinsip hidrodinamika, target konsistensi, checklist peran, dan troubleshooting
              </p>
            </div>

            {/* Quick Filter & Search Bar */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari alat / parameter..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg pl-8 pr-3 py-1.5 focus:outline-none focus:border-emerald-500 w-44 sm:w-56"
                />
              </div>

              {/* Category Dropdown/Pills */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c === 'ALL' ? 'Semua Kategori' : c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Equipments Cards List */}
          <div className="space-y-3">
            {filteredEquipments.map((eq) => {
              const isExpanded = expandedEquipmentId === eq.id;
              return (
                <div 
                  key={eq.id}
                  className={`bg-slate-950/80 border rounded-xl overflow-hidden transition-all duration-200 shadow-sm ${
                    isExpanded ? 'border-emerald-500/60 ring-1 ring-emerald-500/20' : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Card Header (Clickable Accordion) */}
                  <div 
                    onClick={() => setExpandedEquipmentId(isExpanded ? null : eq.id)}
                    className="p-4 bg-slate-900/90 cursor-pointer flex items-center justify-between gap-3 hover:bg-slate-900 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-7 h-7 rounded-lg bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-extrabold flex items-center justify-center shrink-0 text-xs">
                        {eq.stepNumber}
                      </span>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h5 className="font-extrabold text-white text-sm sm:text-base truncate">
                            {eq.name}
                          </h5>
                          <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">
                            {eq.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                          {eq.function}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="hidden sm:inline-block text-[11px] font-mono font-bold text-cyan-300 bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded">
                        {eq.targetConsistency}
                      </span>
                      <button 
                        className="p-1 text-slate-400 hover:text-white rounded transition-colors"
                        title={isExpanded ? 'Tutup Detail' : 'Buka Detail'}
                      >
                        {isExpanded ? <ChevronUp className="w-5 h-5 text-emerald-400" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Content Body */}
                  {isExpanded && (
                    <div className="p-4 sm:p-5 border-t border-slate-800 space-y-4 text-xs">
                      {/* 1. Working Principle */}
                      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                          <Zap className="w-3.5 h-3.5" />
                          <span>Prinsip Kerja Mekanik & Gaya Hidrodinamika:</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed text-xs">
                          {eq.workingPrinciple}
                        </p>
                      </div>

                      {/* 2. Key Parameters Table */}
                      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-cyan-300 flex items-center gap-1.5 text-xs">
                            <Gauge className="w-3.5 h-3.5" />
                            <span>Parameter Teknis & Target Operasional:</span>
                          </span>
                          <span className="text-[10px] text-slate-400">Standar Departemen Produksi</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                          {eq.keyParameters.map((param, pIdx) => (
                            <div key={pIdx} className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                              <span className="text-slate-400 text-[10px] block">{param.label}</span>
                              <div className="font-mono font-bold text-white text-xs mt-0.5">
                                {param.value} <span className="text-[10px] text-amber-400">{param.unit}</span>
                              </div>
                              <span className="text-[10px] text-slate-400 mt-1 block leading-tight">{param.note}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 3. Role Responsibilities (Operator, Karu, PM) */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {/* Operator */}
                        <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-xl p-3 space-y-1.5">
                          <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Checklist Operator:</span>
                          </div>
                          <ul className="space-y-1 text-slate-300 text-[11px]">
                            {eq.operatorDuties.map((duty, dIdx) => (
                              <li key={dIdx} className="flex items-start gap-1.5 leading-tight">
                                <span className="text-emerald-400 font-bold">&bull;</span>
                                <span>{duty}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Karu */}
                        <div className="bg-amber-950/20 border border-amber-900/40 rounded-xl p-3 space-y-1.5">
                          <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Inspeksi Kepala Regu (Karu):</span>
                          </div>
                          <ul className="space-y-1 text-slate-300 text-[11px]">
                            {eq.karuInspection.map((insp, iIdx) => (
                              <li key={iIdx} className="flex items-start gap-1.5 leading-tight">
                                <span className="text-amber-400 font-bold">&bull;</span>
                                <span>{insp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Kepala PM */}
                        <div className="bg-blue-950/20 border border-blue-900/40 rounded-xl p-3 space-y-1.5">
                          <div className="flex items-center gap-1.5 text-blue-400 font-bold text-xs">
                            <Users className="w-3.5 h-3.5" />
                            <span>Fokus Kepala PM / Superintendent:</span>
                          </div>
                          <ul className="space-y-1 text-slate-300 text-[11px]">
                            {eq.kepalaPmFocus.map((foc, fIdx) => (
                              <li key={fIdx} className="flex items-start gap-1.5 leading-tight">
                                <span className="text-blue-400 font-bold">&bull;</span>
                                <span>{foc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* 4. Troubleshooting Guide */}
                      {eq.troubleshootingGuide.length > 0 && (
                        <div className="bg-slate-900/80 border border-rose-950 rounded-xl p-3.5 space-y-2">
                          <span className="font-bold text-rose-300 flex items-center gap-1.5 text-xs">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                            <span>Troubleshooting Cepat di Lapangan:</span>
                          </span>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                            {eq.troubleshootingGuide.map((tb, tIdx) => (
                              <div key={tIdx} className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800 space-y-1">
                                <span className="font-bold text-amber-300 block">{tb.fault}</span>
                                <span className="text-[11px] text-slate-400 block">Indikasi: {tb.indication}</span>
                                <div className="pt-1.5 border-t border-slate-800 text-[11px] space-y-0.5">
                                  <div className="text-cyan-300"><strong>Tindakan Segera:</strong> {tb.immediateAction}</div>
                                  <div className="text-emerald-300"><strong>Akar Solusi:</strong> {tb.permanentFix}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. DEEP DIVE: SISTEM PEO & CHEMICAL ADITIF                */}
      {/* ========================================================= */}
      {(activeSubTab === 'all' || activeSubTab === 'peo') && (
        <div className="bg-gradient-to-br from-teal-950/70 via-slate-900 to-slate-950 border border-teal-800/60 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-teal-800/40 gap-2">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-teal-900/80 border border-teal-500/50 rounded-xl text-teal-400">
                <Beaker className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-white text-base flex items-center gap-2">
                  Prosedur Preparasi Kimiawi Polyethylene Oxide (PEO)
                </h4>
                <p className="text-xs text-teal-300/80">
                  Standar Pelarutan Serbuk Axfloc & Kontrol Viskositas 17 - 19 Cps untuk Formasi Lembaran Tissue
                </p>
              </div>
            </div>
            <span className="text-[11px] bg-teal-950 border border-teal-600/50 text-teal-300 font-bold px-3 py-1 rounded-full">
              Pompa Distribusi: Screw Pump Rendah Shear
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Box 1: Bahan Kimia & Larutan */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
              <span className="font-bold text-white text-sm flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-teal-400" />
                <span>Bahan & Target Parameter</span>
              </span>
              <div className="space-y-1.5 text-slate-300 text-[11px]">
                <div><strong>Tipe Polimer:</strong> Serbuk Axfloc (1729, 1730, 7090) atau F 1220 FA.</div>
                <div><strong>Standar Viskositas Tissue:</strong> <span className="text-emerald-400 font-bold font-mono">17 - 19 Cps</span>.</div>
                <div><strong>Standar Viskositas Karton/Kraft:</strong> 25 - 35 Cps.</div>
                <div><strong>Efek Fish-Eye:</strong> Terjadi jika serbuk dituang sekaligus tanpa pusaran air; membentuk lendir tak larut yang menyumbat spray nozzle di PM.</div>
              </div>
            </div>

            {/* Box 2: Alur Konfigurasi Tangki */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
              <span className="font-bold text-white text-sm flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Alur Tangki 1, 2, 4 &rarr; Tangki 3</span>
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Tangki 1, 2, dan 4 berfungsi sebagai tangki pemasakan dan hidrasi (cooking/aging). Setelah larutan homogen dan lolos uji viskositas, batch ditransfer ke <strong>Tangki 3</strong> yang dilengkapi saringan kasa sebelum dialirkan ke Paper Machine.
              </p>
              <div className="bg-slate-950/70 p-2 rounded border border-slate-800 text-[11px] text-amber-300">
                <strong>Penting:</strong> Saringan tangki 3 wajib dibersihkan rutin setiap shift agar serat atau lendir beku tidak lolos ke pompa.
              </div>
            </div>

            {/* Box 3: Mengapa Screw Pump? */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
              <span className="font-bold text-white text-sm flex items-center gap-1.5">
                <Settings className="w-4 h-4 text-amber-400" />
                <span>Distribusi via Screw Pump</span>
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                PEO adalah polimer rantai panjang yang sangat sensitif terhadap gaya geser mekanis (shear sensitive). Pompa sentrifugal berputar tinggi akan memotong rantai polimer sehingga daya rekat antar-serat hilang.
              </p>
              <div className="bg-teal-950/50 p-2 rounded border border-teal-800/60 text-[11px] text-teal-200">
                <strong>Standar Mesin:</strong> Menggunakan Screw Pump (Progressive Cavity) berkecepatan rendah agar rantai polimer tetap utuh.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. PANDUAN PERAN (OPERATOR, KARU, KEPALA PM)             */}
      {/* ========================================================= */}
      {(activeSubTab === 'all' || activeSubTab === 'roles') && roleGuides && roleGuides.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <div className="p-1.5 bg-indigo-900/60 border border-indigo-500/50 rounded-lg text-indigo-300">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-white text-base">
                Struktur Peran & Tanggung Jawab Operasional Stock Preparation
              </h4>
              <p className="text-xs text-slate-400">
                Pembagian wewenang dan fokus kerja harian sesuai panduan manajemen produksi PT. PUP
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {roleGuides.map((rg, idx) => (
              <div 
                key={idx}
                className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3 shadow-sm hover:border-slate-700 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="font-extrabold text-white text-sm">{rg.role}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${rg.badgeColor}`}>
                      Tingkat {idx + 1}
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    {rg.summary}
                  </p>

                  <div className="pt-2 border-t border-slate-800/80 space-y-1">
                    <span className="font-bold text-amber-300 text-[11px] block">Fokus Aktivitas Harian:</span>
                    <ul className="space-y-1 text-slate-300 text-[11px]">
                      {rg.dailyFocus.map((df, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-1.5 leading-tight">
                          <span className="text-emerald-400 font-bold">&bull;</span>
                          <span>{df}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-slate-800 bg-slate-900/50 -mx-4 -mb-4 p-3 rounded-b-xl">
                  <span className="font-bold text-cyan-300 text-[10px] uppercase tracking-wider block mb-1">
                    Otoritas & Batas Keputusan:
                  </span>
                  <ul className="space-y-1 text-slate-400 text-[10px]">
                    {rg.decisionAuthority.map((auth, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-1.5 leading-tight">
                        <span className="text-cyan-400 font-bold">&bull;</span>
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
      {/* 6. KUIS EVALUASI KOMPETENSI 10 SOAL (SLIDE 42-44 PDF)     */}
      {/* ========================================================= */}
      {(activeSubTab === 'all' || activeSubTab === 'quiz') && (
        <div className="bg-slate-950/90 border border-amber-800/60 rounded-2xl p-5 shadow-lg space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-slate-800 gap-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-amber-950/80 border border-amber-500/50 rounded-xl text-amber-400">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-white text-base flex items-center gap-2">
                  Kuis Evaluasi Kompetensi Stock Preparation (10 Soal Resmi)
                </h4>
                <p className="text-xs text-amber-300/80">
                  Uji Pemahaman Operator, Karu, & Kepala PM Berdasarkan Materi Slide 42, 43, 44 PDF
                </p>
              </div>
            </div>

            {/* Score Badge & Reset */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              {quizSubmitted ? (
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-lg text-xs font-black border ${
                    quizScore >= 8 
                      ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                      : quizScore >= 6
                      ? 'bg-amber-950 border-amber-500 text-amber-300'
                      : 'bg-rose-950 border-rose-500 text-rose-300'
                  }`}>
                    Skor: {quizScore} / {quizzes.length} ({quizScore >= 8 ? 'Lulus Istimewa' : quizScore >= 6 ? 'Lulus Cukup' : 'Perlu Remedial'})
                  </span>
                  <button
                    onClick={resetQuiz}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                    title="Ulangi Kuis"
                  >
                    <RotateCcw className="w-4 h-4 text-amber-400" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setQuizSubmitted(true)}
                  disabled={Object.keys(userAnswers).length === 0}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow ${
                    Object.keys(userAnswers).length > 0
                      ? 'bg-amber-600 hover:bg-amber-500 text-white cursor-pointer'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Kirim & Periksa Jawaban ({Object.keys(userAnswers).length}/{quizzes.length})
                </button>
              )}
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            {quizzes.map((quiz, qIdx) => {
              const selectedOpt = userAnswers[quiz.id];
              const isCorrect = selectedOpt === quiz.correctAnswerIndex;
              const isExpanded = expandedQuizId === quiz.id;

              return (
                <div 
                  key={quiz.id}
                  className={`bg-slate-900/90 border rounded-xl p-4 transition-all duration-200 ${
                    quizSubmitted
                      ? isCorrect
                        ? 'border-emerald-500/60 bg-emerald-950/10'
                        : 'border-rose-500/60 bg-rose-950/10'
                      : selectedOpt !== undefined
                      ? 'border-amber-500/50'
                      : 'border-slate-800'
                  }`}
                >
                  {/* Question Header */}
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-md bg-slate-800 text-amber-300 font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                        {qIdx + 1}
                      </span>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                          {quiz.topic}
                        </span>
                        <h5 className="font-bold text-white text-xs sm:text-sm leading-snug">
                          {quiz.question}
                        </h5>
                      </div>
                    </div>

                    {quizSubmitted && (
                      <span className="shrink-0">
                        {isCorrect ? (
                          <span className="flex items-center gap-1 text-emerald-400 font-bold text-xs bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-600/50">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Benar
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-rose-400 font-bold text-xs bg-rose-950/80 px-2 py-0.5 rounded border border-rose-600/50">
                            <XCircle className="w-3.5 h-3.5" /> Salah
                          </span>
                        )}
                      </span>
                    )}
                  </div>

                  {/* Options List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-2 text-xs">
                    {quiz.options.map((option, optIdx) => {
                      const isChosen = selectedOpt === optIdx;
                      const isOptionCorrect = quiz.correctAnswerIndex === optIdx;

                      let optStyle = 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/80';
                      if (quizSubmitted) {
                        if (isOptionCorrect) {
                          optStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold ring-1 ring-emerald-500/40';
                        } else if (isChosen && !isCorrect) {
                          optStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 ring-1 ring-rose-500/40';
                        } else {
                          optStyle = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
                        }
                      } else if (isChosen) {
                        optStyle = 'bg-amber-500/20 border-amber-500 text-amber-200 font-semibold ring-1 ring-amber-500/40';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={quizSubmitted}
                          onClick={() => handleSelectOption(quiz.id, optIdx)}
                          className={`p-2.5 rounded-lg border text-left transition-all flex items-start gap-2 ${optStyle}`}
                        >
                          <span className="font-mono font-bold text-[11px] w-4 shrink-0 text-slate-400">
                            {String.fromCharCode(65 + optIdx)}.
                          </span>
                          <span className="leading-snug">{option}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation Box (Visible after submission or toggle) */}
                  {quizSubmitted && (
                    <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs">
                      <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 space-y-1">
                        <div className="flex items-center gap-1.5 text-cyan-300 font-bold text-[11px]">
                          <Info className="w-3.5 h-3.5" />
                          <span>Kunci & Penjelasan Teknis:</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed text-[11px]">
                          {quiz.explanation}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};

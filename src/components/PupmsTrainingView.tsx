import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  HeartHandshake, 
  Compass, 
  Award, 
  Wrench, 
  ShieldCheck, 
  Users, 
  HelpCircle, 
  Search, 
  Printer, 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen, 
  ArrowRight, 
  Layers, 
  Clock, 
  Sparkles, 
  FileText, 
  BarChart2, 
  Lightbulb, 
  ChevronDown, 
  ChevronUp, 
  RefreshCw,
  Info,
  Check
} from 'lucide-react';
import { 
  PUPMS_CHAPTERS, 
  PUPMS_QUIZ_QUESTIONS, 
  PUPMS_METADATA, 
  PupmsChapter 
} from '../data/pupmsTrainingData';

export const PupmsTrainingView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'intro-0': true,
    'intro-1': true,
    'intro-2': true,
    'pilar1-0': true,
    'pilar1-1': true,
    'pilar2-0': true,
    'productivity-tools-0': true,
    'productivity-tools-1': true,
    'productivity-tools-3': true,
    'productivity-tools-4': true
  });

  // Quiz state
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);

  const toggleSection = (id: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (isQuizSubmitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionIdx
    }));
  };

  const quizScore = useMemo(() => {
    let score = 0;
    PUPMS_QUIZ_QUESTIONS.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) {
        score += 10;
      }
    });
    return score;
  }, [userAnswers]);

  const handleResetQuiz = () => {
    setUserAnswers({});
    setIsQuizSubmitted(false);
  };

  // Filtered chapters based on active tab and search query
  const filteredChapters = useMemo(() => {
    return PUPMS_CHAPTERS.filter(chapter => {
      if (activeTab !== 'all' && activeTab !== 'quiz' && activeTab !== 'glossary') {
        if (chapter.id !== activeTab) return false;
      }
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchTitle = chapter.title.toLowerCase().includes(q);
      const matchSummary = chapter.summary.toLowerCase().includes(q);
      const matchContent = chapter.contentSections.some(
        s => s.heading.toLowerCase().includes(q) || 
             (s.simpleExplanation && s.simpleExplanation.toLowerCase().includes(q)) ||
             s.details.some(d => d.toLowerCase().includes(q))
      );
      return matchTitle || matchSummary || matchContent;
    });
  }, [activeTab, searchQuery]);

  // Simple Glossary Data for quick learning
  const GLOSSARY_TERMS = [
    { term: 'PUPMS', meaning: 'Panca Usahatama Paramita Management System - Sistem kerja bersama seluruh jajaran PT. PUP demi kepuasan pelanggan dan keunggulan mutu.' },
    { term: '5C (Mentalitas Dasar)', meaning: 'Lima karakter wajib insan PT. PUP: Caring (Peduli), Credible (Jujur/Bisa dipercaya), Competent (Cakap/Terampil), Competitive (Unggul bersaing), dan Customer Delight (Melebihi harapan pelanggan).' },
    { term: 'PDCA', meaning: 'Plan (Rencanakan), Do (Jalankan), Check (Periksa hasilnya), Action (Tindak lanjuti dan standarisasi perbaikan).' },
    { term: 'BPR (Reengineering)', meaning: 'Merombak total proses kerja lama dari nol secara radikal untuk lompatan kinerja besar.' },
    { term: 'BPE (Enhancement)', meaning: 'Penyempurnaan proses kerja yang sudah ada secara bertahap dan terus-menerus agar lebih cepat dan hemat.' },
    { term: 'HORENSO', meaning: 'Budaya komunikasi 30 menit sebelum shift: HOUKOKU (Lapor), RENRAKU (Komunikasi), SOUDAN (Konsultasi/Rundingan).' },
    { term: '5R (Seiri-Seiton-Seiso-Seiketsu-Shitsuke)', meaning: 'Ringkas (pilah), Rapi (tata pada tempatnya), Resik (bersihkan), Rawat (jaga standarnya), Rajin (disiplin diri).' },
    { term: 'TPM & OEE', meaning: 'Total Productive Maintenance untuk merawat mesin bersama-sama demi mencapai Zero Accident, Zero Defect, Zero Breakdown.' },
    { term: 'OPL (One Point Lesson)', meaning: 'Lembar petunjuk singkat 1 halaman yang memuat 1 standar kerja praktis disertai contoh benar vs salah.' },
    { term: 'Kaizen & Format A3', meaning: 'Perbaikan berkesinambungan 8 langkah yang ditulis ringkas di lembar A3 untuk menghilangkan pemborosan.' },
    { term: 'Quality Day & CPAR', meaning: 'Forum 2 mingguan membahas keluhan pelanggan (KP) dan mencari akar masalahnya dengan 5-Why agar tak terulang.' },
    { term: 'MIL-STD-105E', meaning: 'Metode pengambilan sampel acak untuk menentukan kelayakan mutu satu partai (lot) roll tisu berdasarkan batas AQL.' },
    { term: 'VSM (Value Stream Mapping)', meaning: 'Peta alur proses dari pelanggan hingga bahan baku untuk memangkas waktu tunggu yang sia-sia.' },
    { term: 'OTIF (On Time In Full)', meaning: 'Ketepatan pengiriman order pelanggan: barang sampai tepat waktu dan jumlahnya lengkap sesuai pesanan.' }
  ];

  return (
    <div className="space-y-6 pb-12 animate-fadeIn text-slate-100">
      
      {/* Hero Banner with Official Identity */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border-2 border-blue-500/40 p-6 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-500/20 text-blue-300 border border-blue-400/40 tracking-wider uppercase">
                Materi Pelatihan Resmi
              </span>
              <span className="text-xs text-slate-400 font-semibold">
                PT. Panca Usahatama Paramita
              </span>
              <span className="text-xs bg-emerald-950 text-emerald-300 border border-emerald-700/50 px-2 py-0.5 rounded-full font-bold">
                Standar 4 Pilar & Budaya 5C
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
              <Building2 className="w-8 h-8 text-blue-400 shrink-0" />
              <span>PUPMS: Sistem Manajemen Terpadu PT. PUP</span>
            </h1>

            <p className="mt-2 text-sm text-slate-300 max-w-3xl leading-relaxed">
              Panduan terstruktur, sistematis, dan mudah dipahami semua tingkatan karyawan: dari Manajemen Puncak, Kepala Departemen, Kepala Shift, hingga Operator dan Helper lapangan.
            </p>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all flex items-center gap-2 shadow-sm"
              title="Cetak Materi Pelatihan PUPMS"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>Cetak Materi</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('quiz');
                const el = document.getElementById('pupms-content-area');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-extrabold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-emerald-950/50 hover:scale-[1.02]"
            >
              <HelpCircle className="w-4 h-4 text-emerald-200" />
              <span>Kuis Pemahaman (10 Soal)</span>
            </button>
          </div>
        </div>

        {/* 4 Pilar Visual Jump Cards */}
        <div className="relative z-10 mt-6 pt-5 border-t border-slate-800/80">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Struktur Rumah PUPMS &mdash; Klik Pilar untuk Langsung Mempelajari:</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Pilar 1 */}
            <button
              type="button"
              onClick={() => setActiveTab('pilar1')}
              className={`p-3.5 rounded-xl border text-left transition-all group ${
                activeTab === 'pilar1' 
                  ? 'bg-rose-950/80 border-rose-500 shadow-md ring-2 ring-rose-500/30' 
                  : 'bg-slate-900/90 border-slate-800 hover:border-rose-500/50 hover:bg-rose-950/30'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-black uppercase text-rose-400 font-mono tracking-wider">
                  Pilar 1
                </span>
                <HeartHandshake className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="font-extrabold text-sm text-white group-hover:text-rose-200">
                Mentalitas Dasar
              </div>
              <div className="text-[11px] text-slate-400 mt-1 font-medium">
                Budaya 5C: Caring, Credible, Competent, Competitive, Delight.
              </div>
            </button>

            {/* Pilar 2 */}
            <button
              type="button"
              onClick={() => setActiveTab('pilar2')}
              className={`p-3.5 rounded-xl border text-left transition-all group ${
                activeTab === 'pilar2' 
                  ? 'bg-amber-950/80 border-amber-500 shadow-md ring-2 ring-amber-500/30' 
                  : 'bg-slate-900/90 border-slate-800 hover:border-amber-500/50 hover:bg-amber-950/30'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-black uppercase text-amber-400 font-mono tracking-wider">
                  Pilar 2
                </span>
                <Compass className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="font-extrabold text-sm text-white group-hover:text-amber-200">
                Manajemen Strategi
              </div>
              <div className="text-[11px] text-slate-400 mt-1 font-medium">
                Pola PDCA, 6 Tahap Strategi, BPR vs BPE, Progress Review.
              </div>
            </button>

            {/* Pilar 3 */}
            <button
              type="button"
              onClick={() => setActiveTab('productivity-tools')}
              className={`p-3.5 rounded-xl border text-left transition-all group ${
                activeTab === 'productivity-tools' 
                  ? 'bg-blue-950/80 border-blue-500 shadow-md ring-2 ring-blue-500/30' 
                  : 'bg-slate-900/90 border-slate-800 hover:border-blue-500/50 hover:bg-blue-950/30'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-black uppercase text-blue-400 font-mono tracking-wider">
                  Pilar 3
                </span>
                <Wrench className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="font-extrabold text-sm text-white group-hover:text-blue-200">
                Manajemen Operasi
              </div>
              <div className="text-[11px] text-slate-400 mt-1 font-medium">
                ISO 9001, Horenso, 5R, TPM, Kaizen, 7 Tools, Sampling MIL-STD.
              </div>
            </button>

            {/* Pilar 4 */}
            <button
              type="button"
              onClick={() => setActiveTab('pilar4')}
              className={`p-3.5 rounded-xl border text-left transition-all group ${
                activeTab === 'pilar4' 
                  ? 'bg-purple-950/80 border-purple-500 shadow-md ring-2 ring-purple-500/30' 
                  : 'bg-slate-900/90 border-slate-800 hover:border-purple-500/50 hover:bg-purple-950/30'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-black uppercase text-purple-400 font-mono tracking-wider">
                  Pilar 4
                </span>
                <ShieldCheck className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="font-extrabold text-sm text-white group-hover:text-purple-200">
                Pemberdaya & Prasyarat
              </div>
              <div className="text-[11px] text-slate-400 mt-1 font-medium">
                Komitmen, Penyelarasan, Bimbingan & Mengatasi 4 Hambatan.
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Filter Tabs & Search Bar */}
      <div id="pupms-content-area" className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            Semua Modul (1-8)
          </button>
          <button
            onClick={() => setActiveTab('pilar1')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'pilar1'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            Pilar 1: Mentalitas (5C)
          </button>
          <button
            onClick={() => setActiveTab('pilar2')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'pilar2'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            Pilar 2: Manajemen Strategi
          </button>
          <button
            onClick={() => setActiveTab('strategic-tools')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'strategic-tools'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            Alat Strategi Bisnis
          </button>
          <button
            onClick={() => setActiveTab('pilar3-iso')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'pilar3-iso'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            ISO 9001:2015
          </button>
          <button
            onClick={() => setActiveTab('productivity-tools')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'productivity-tools'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            14 Alat Kualitas & Shift
          </button>
          <button
            onClick={() => setActiveTab('pilar4')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'pilar4'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            Pilar 4: Pemberdaya
          </button>
          <button
            onClick={() => setActiveTab('org-kpi')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'org-kpi'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            Struktur & KPI
          </button>
          <button
            onClick={() => setActiveTab('glossary')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'glossary'
                ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                : 'bg-slate-900 text-amber-300 hover:bg-slate-800'
            }`}
          >
            Kamus Istilah Sederhana
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'quiz'
                ? 'bg-emerald-500 text-slate-950 font-black shadow-sm'
                : 'bg-slate-900 text-emerald-300 hover:bg-slate-800'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Kuis Interaktif</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative shrink-0 md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari topik (Horenso, 5R, TPM...)"
            className="w-full bg-slate-900 border border-slate-700 text-xs text-white rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:border-blue-500 placeholder-slate-500"
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* GLOSSARY VIEW: KAMUS ISTILAH RAMAH SEMUA ORANG                            */}
      {/* ========================================================================= */}
      {activeTab === 'glossary' && (
        <section className="space-y-4">
          <div className="p-4 bg-amber-950/40 border border-amber-500/40 rounded-xl flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-base font-bold text-amber-200">
                Kamus Istilah Singkat PUPMS (Bahasa Mudah Dipahami)
              </h3>
              <p className="text-xs text-amber-300/80 mt-1">
                Kumpulan singkatan dan istilah teknis sistem manajemen yang disederhanakan agar mudah dipelajari oleh operator, helper, maupun seluruh staf pabrik.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {GLOSSARY_TERMS.map((item, idx) => (
              <div key={idx} className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl hover:border-amber-500/50 transition-colors">
                <div className="flex items-center gap-2 text-sm font-extrabold text-amber-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{item.term}</span>
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {item.meaning}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* QUIZ VIEW: KUIS PEMAHAMAN INTERAKTIF 10 SOAL                              */}
      {/* ========================================================================= */}
      {activeTab === 'quiz' && (
        <section className="space-y-6">
          {/* Quiz Header Banner */}
          <div className="p-5 bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 border-2 border-emerald-500/50 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-black uppercase text-emerald-400 font-mono tracking-wider bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-700/60">
                Uji Kompetensi Karyawan
              </span>
              <h2 className="text-xl font-black text-white mt-1 flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-emerald-400" />
                <span>Kuis Pemahaman Sistem Manajemen PUPMS (10 Soal)</span>
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                Jawablah 10 pertanyaan berikut untuk menguji pemahaman Anda mengenai 4 Pilar PUPMS, nilai 5C, TPM, Horenso, 5R, dan struktur organisasi PT. PUP.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {isQuizSubmitted && (
                <div className="text-right">
                  <div className="text-xs text-slate-400 font-medium">Nilai Akhir:</div>
                  <div className={`text-3xl font-black font-mono ${quizScore >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {quizScore} / 100
                  </div>
                </div>
              )}
              <button
                type="button"
                onClick={handleResetQuiz}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-1.5 transition-colors"
                title="Reset Jawaban Kuis"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Kuis</span>
              </button>
            </div>
          </div>

          {/* Quiz Result Feedback Card */}
          {isQuizSubmitted && (
            <div className={`p-4 rounded-xl border ${
              quizScore >= 80 
                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200' 
                : quizScore >= 60 
                ? 'bg-amber-950/80 border-amber-500 text-amber-200' 
                : 'bg-rose-950/80 border-rose-500 text-rose-200'
            }`}>
              <div className="flex items-center gap-2 font-bold text-sm">
                {quizScore >= 80 ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertTriangle className="w-5 h-5 text-amber-400" />}
                <span>
                  {quizScore >= 80 
                    ? 'Luar Biasa! Anda Sangat Memahami Sistem Manajemen PUPMS PT. PUP.' 
                    : quizScore >= 60 
                    ? 'Bagus! Pemahaman Anda Cukup Baik, Silakan Tinjau Ulang Materi yang Keliru.' 
                    : 'Perlu Belajar Lagi. Tinjau Kembali 4 Pilar dan Alat Operasional PUPMS.'}
                </span>
              </div>
            </div>
          )}

          {/* Quiz Questions List */}
          <div className="space-y-4">
            {PUPMS_QUIZ_QUESTIONS.map((q, idx) => {
              const selectedOpt = userAnswers[q.id];
              const isCorrect = selectedOpt === q.correctAnswer;
              return (
                <div key={q.id} className="p-4 bg-slate-950/90 border border-slate-800 rounded-xl">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-900/60 border border-blue-600/50 text-blue-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {q.id}
                    </span>
                    <div className="flex-1">
                      <p className="font-bold text-sm text-white leading-snug">
                        {q.question}
                      </p>

                      <div className="mt-3 grid grid-cols-1 gap-2">
                        {q.options.map((opt, optIdx) => {
                          const isOptionSelected = selectedOpt === optIdx;
                          let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700';

                          if (isQuizSubmitted) {
                            if (optIdx === q.correctAnswer) {
                              btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                            } else if (isOptionSelected && !isCorrect) {
                              btnStyle = 'bg-rose-950 border-rose-500 text-rose-300 line-through';
                            }
                          } else if (isOptionSelected) {
                            btnStyle = 'bg-blue-950 border-blue-500 text-white font-bold ring-1 ring-blue-500';
                          }

                          return (
                            <button
                              key={optIdx}
                              type="button"
                              onClick={() => handleSelectOption(q.id, optIdx)}
                              className={`w-full text-left px-3.5 py-2.5 rounded-lg border text-xs transition-all flex items-center justify-between gap-2 ${btnStyle}`}
                            >
                              <span>{String.fromCharCode(65 + optIdx)}. {opt}</span>
                              {isQuizSubmitted && optIdx === q.correctAnswer && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation if submitted */}
                      {isQuizSubmitted && (
                        <div className="mt-2.5 pt-2 border-t border-slate-800 text-xs text-slate-400 flex items-start gap-1.5 bg-slate-900/50 p-2.5 rounded-lg">
                          <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-slate-300">Pembahasan: </strong>
                            <span>{q.explanation}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Submit Quiz Action */}
          {!isQuizSubmitted && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsQuizSubmitted(true)}
                disabled={Object.keys(userAnswers).length === 0}
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all"
              >
                Periksa & Kirim Jawaban
              </button>
            </div>
          )}
        </section>
      )}

      {/* ========================================================================= */}
      {/* CHAPTERS VIEW: MATERI LENGKAP & TERSTRUKTUR (BAB 1 - 8)                   */}
      {activeTab !== 'quiz' && activeTab !== 'glossary' && (
        <section className="space-y-6">
          {filteredChapters.map((chapter) => (
            <article 
              key={chapter.id}
              className="bg-slate-950/90 border border-slate-800 hover:border-slate-700/80 rounded-2xl overflow-hidden shadow-lg transition-all"
            >
              {/* Chapter Header */}
              <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-500/50 flex items-center justify-center text-blue-400 font-mono font-black text-sm shrink-0">
                    0{chapter.number}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-blue-950 text-blue-300 border border-blue-700/50">
                        {chapter.badge}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        Bab {chapter.number} &bull; PUPMS
                      </span>
                    </div>
                    <h2 className="text-base sm:text-lg font-black text-white mt-0.5">
                      {chapter.title}
                    </h2>
                  </div>
                </div>

                <p className="text-xs text-slate-400 max-w-md sm:text-right">
                  {chapter.summary}
                </p>
              </div>

              {/* Key Takeaways Highlight Box */}
              <div className="px-5 py-3 bg-blue-950/30 border-b border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs">
                <span className="font-black text-blue-300 uppercase tracking-wider text-[10px] shrink-0 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Poin Kunci:</span>
                </span>
                <div className="flex flex-wrap gap-2 text-slate-300">
                  {chapter.keyPoints.map((kp, kpIdx) => (
                    <span key={kpIdx} className="inline-flex items-center gap-1 bg-slate-900/90 px-2.5 py-1 rounded-md border border-slate-800 text-[11px]">
                      <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>{kp}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Chapter Content Sections */}
              <div className="p-4 sm:p-6 space-y-5">
                {chapter.contentSections.map((section, sIdx) => {
                  const sectionKey = `${chapter.id}-${sIdx}`;
                  const isExpanded = expandedSections[sectionKey] !== false;

                  return (
                    <div 
                      key={sIdx}
                      className="border border-slate-800/90 rounded-xl overflow-hidden bg-slate-900/40"
                    >
                      {/* Section Toggle Header */}
                      <button
                        type="button"
                        onClick={() => toggleSection(sectionKey)}
                        className="w-full text-left p-3.5 bg-slate-900/80 hover:bg-slate-800/60 transition-colors flex items-center justify-between gap-3"
                      >
                        <div>
                          <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                            <span>{section.heading}</span>
                          </h3>
                          {section.subheading && (
                            <p className="text-xs text-blue-300 font-semibold mt-0.5">
                              {section.subheading}
                            </p>
                          )}
                        </div>
                        <div className="text-slate-400">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </button>

                      {/* Section Body */}
                      {isExpanded && (
                        <div className="p-4 space-y-3.5 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80">
                          {/* "Arti Sederhana" Callout - Ramah Semua Orang */}
                          {section.simpleExplanation && (
                            <div className="p-3 bg-emerald-950/40 border border-emerald-600/40 rounded-xl flex items-start gap-2.5">
                              <Lightbulb className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-extrabold text-emerald-300 text-[11px] uppercase tracking-wider block">
                                  Arti Sederhana (Mudah Dipahami):
                                </span>
                                <p className="text-emerald-100/90 mt-0.5 text-xs">
                                  {section.simpleExplanation}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Bullet Points Details */}
                          <ul className="space-y-1.5 pl-1">
                            {section.details.map((detail, dIdx) => (
                              <li key={dIdx} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1.5" />
                                <span className="text-slate-200">{detail}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Structured Table (if available) */}
                          {section.tableData && (
                            <div className="mt-3 overflow-x-auto rounded-xl border border-slate-800">
                              <table className="w-full text-left text-xs border-collapse">
                                <thead>
                                  <tr className="bg-slate-950 text-slate-300 border-b border-slate-800">
                                    {section.tableData.headers.map((h, hIdx) => (
                                      <th key={hIdx} className="p-2.5 font-bold uppercase tracking-wider text-[10px]">
                                        {h}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
                                  {section.tableData.rows.map((row, rIdx) => (
                                    <tr key={rIdx} className="hover:bg-slate-900/60 transition-colors">
                                      {row.map((cell, cIdx) => (
                                        <td key={cIdx} className={`p-2.5 ${cIdx === 0 ? 'font-bold text-white' : 'text-slate-300'}`}>
                                          {cell}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}

                          {/* Structured Diagram/Workflow (if available) */}
                          {section.diagramInfo && (
                            <div className="mt-3 p-3.5 bg-slate-950 border border-blue-900/50 rounded-xl">
                              <div className="text-[11px] font-bold text-blue-300 mb-2 flex items-center gap-1.5">
                                <Layers className="w-3.5 h-3.5 text-blue-400" />
                                <span>{section.diagramInfo.type}: {section.diagramInfo.description}</span>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                                {section.diagramInfo.steps.map((st, stIdx) => (
                                  <div key={stIdx} className="p-2 bg-slate-900/90 border border-slate-800 rounded-lg text-[11px] text-slate-300 flex items-center gap-1.5">
                                    <span className="w-4 h-4 rounded-full bg-blue-950 text-blue-300 border border-blue-700/60 text-[10px] font-bold flex items-center justify-center shrink-0">
                                      {stIdx + 1}
                                    </span>
                                    <span>{st}</span>
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
            </article>
          ))}

          {filteredChapters.length === 0 && (
            <div className="p-8 text-center bg-slate-950/60 rounded-2xl border border-slate-800 text-slate-400 text-xs">
              Tidak ditemukan materi yang cocok dengan kata kunci &quot;{searchQuery}&quot;. Silakan coba kata kunci lain.
            </div>
          )}
        </section>
      )}

      {/* Footer Info Callout */}
      <div className="p-4 bg-slate-950/90 border border-slate-800 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-blue-400 shrink-0" />
          <span>Dokumen Resmi: <strong>PT. Panca Usahatama Paramita (PUPMS)</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <span>Pemimpin Pelaksana: <strong className="text-white">Kelik Heriyono (Koordinator Pabrik)</strong></span>
        </div>
      </div>
    </div>
  );
};

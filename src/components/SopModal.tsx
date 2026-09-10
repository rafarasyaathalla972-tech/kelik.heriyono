import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Gauge, 
  Wrench, 
  Sparkles, 
  Printer, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { SOP_PROCESS_STEPS } from '../data/sopData';

interface SopModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SopModal: React.FC<SopModalProps> = ({ isOpen, onClose }) => {
  const [selectedStepId, setSelectedStepId] = useState<string>('pulper');
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!isOpen) return null;

  const currentStep = SOP_PROCESS_STEPS.find(s => s.id === selectedStepId) || SOP_PROCESS_STEPS[0];

  const filteredSteps = SOP_PROCESS_STEPS.filter(step => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      step.title.toLowerCase().includes(q) ||
      step.purpose.toLowerCase().includes(q) ||
      step.troubleshooting.some(t => t.issue.toLowerCase().includes(q) || t.solution.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div className="w-full max-w-4xl bg-slate-900 border-l border-slate-700 h-full flex flex-col shadow-2xl text-slate-100">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-950/90 border border-emerald-600/60 rounded-lg text-emerald-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-wide">
                  SOP Standar Operasional Prosedur
                </h2>
                <span className="text-[11px] bg-emerald-900/60 text-emerald-300 font-semibold px-2 py-0.5 rounded border border-emerald-700/50">
                  4 Tahapan Proses
                </span>
              </div>
              <p className="text-xs text-slate-400">
                PT. Panca Usahatama Paramita &bull; Panduan Operasional Mesin PM1, PM2, PM5
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Cetak SOP"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              id="btn-close-sop"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Tutup (Kembali ke Laporan)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Process Stage Selector Tabs */}
        <div className="border-b border-slate-800 bg-slate-900/90 px-4 py-2 flex flex-wrap items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none w-full sm:w-auto">
            {SOP_PROCESS_STEPS.map((step) => {
              const isActive = step.id === selectedStepId;
              return (
                <button
                  key={step.id}
                  id={`sop-tab-${step.id}`}
                  onClick={() => setSelectedStepId(step.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <span>{step.title.split('(')[0].trim()}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="ml-auto w-full sm:w-60 relative mt-1 sm:mt-0">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari SOP atau masalah..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-700/80 rounded-md text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* SOP Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 text-sm">
          
          {/* Section 1: Title & Purpose */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <h3 className="text-base font-bold text-emerald-400 mb-2 flex items-center gap-2">
              <Layers className="w-5 h-5" />
              {currentStep.title}
            </h3>
            <div className="text-slate-300 leading-relaxed bg-slate-900/80 p-3 rounded-lg border border-slate-800/80">
              <span className="font-semibold text-white">Tujuan Proses: </span>
              {currentStep.purpose}
            </div>
          </div>

          {/* Section 2: Key Operational Parameters */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <h4 className="font-bold text-slate-100 mb-3 flex items-center gap-2 text-sm">
              <Gauge className="w-4 h-4 text-cyan-400" />
              Parameter Kunci yang Dijaga & Standar Operasi
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-800/90 text-slate-300 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="px-3 py-2 rounded-l">Parameter Operasi</th>
                    <th className="px-3 py-2">Standar Target</th>
                    <th className="px-3 py-2 rounded-r">Catatan Pengawasan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {currentStep.keyParameters.map((param, i) => (
                    <tr key={i} className="hover:bg-slate-900/70 transition-colors">
                      <td className="px-3 py-2.5 font-semibold text-slate-100">{param.name}</td>
                      <td className="px-3 py-2.5 font-mono text-emerald-300 font-bold">{param.standard}</td>
                      <td className="px-3 py-2.5 text-slate-400">{param.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Preparation & Operational Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Persiapan Sebelum Operasi */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
              <h4 className="font-bold text-amber-400 mb-3 flex items-center gap-2 text-sm">
                <AlertTriangle className="w-4 h-4" />
                Persiapan Sebelum Operasi & K3
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {currentStep.preparation.map((prep, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-amber-950/80 border border-amber-600/50 text-amber-400 flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-bold">
                      {i + 1}
                    </span>
                    <span>{prep}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Langkah Kerja Pengoperasian */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
              <h4 className="font-bold text-blue-400 mb-3 flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4" />
                Langkah Kerja Pengoperasian
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {currentStep.operationalSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-blue-950/80 border border-blue-600/50 text-blue-400 flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-bold">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 4: Raw Materials & Chemical Additives (if applicable) */}
          {currentStep.rawMaterialsAndAdditives && (
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
              <h4 className="font-bold text-purple-400 mb-2.5 flex items-center gap-2 text-sm">
                <Sparkles className="w-4 h-4" />
                Bahan Baku & Bahan Kimia Tambah
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {currentStep.rawMaterialsAndAdditives.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">&bull;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Section 5: Routine Checks During Process */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <h4 className="font-bold text-teal-400 mb-2.5 flex items-center gap-2 text-sm">
              <Gauge className="w-4 h-4" />
              Pemeriksaan Rutin Selama Proses Berlangsung
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              {currentStep.routineChecks.map((chk, i) => (
                <li key={i} className="flex items-start gap-2 bg-slate-900/60 p-2 rounded border border-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                  <span>{chk}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 6: Troubleshooting & Cara Mengatasi Masalah Umum */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <h4 className="font-bold text-rose-400 mb-3 flex items-center gap-2 text-sm">
              <Wrench className="w-4 h-4" />
              Cara Mengatasi Masalah Umum (Troubleshooting Guide)
            </h4>
            <div className="space-y-3">
              {currentStep.troubleshooting.map((item, i) => (
                <div key={i} className="bg-slate-900/90 border border-rose-950/80 rounded-lg p-3 text-xs">
                  <div className="font-bold text-rose-300 mb-1 flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-rose-950 text-rose-400 rounded text-[10px] font-mono border border-rose-800/50">
                      Problem #{i + 1}
                    </span>
                    <span>{item.issue}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-800">
                    <div>
                      <span className="text-slate-400 font-medium">Kemungkinan Penyebab:</span>
                      <p className="text-slate-200 mt-0.5">{item.cause}</p>
                    </div>
                    <div>
                      <span className="text-emerald-400 font-medium">Tindakan Solusi / Perbaikan:</span>
                      <p className="text-emerald-200 mt-0.5 font-medium">{item.solution}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 7: Shutdown & Cleaning */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <h4 className="font-bold text-slate-300 mb-2 flex items-center gap-2 text-sm">
              <AlertTriangle className="w-4 h-4 text-slate-400" />
              Langkah Penutup, Pencucian & Prosedur Shutdown
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {currentStep.shutdownAndCleaning.map((clean, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-slate-500 font-bold">&bull;</span>
                  <span>{clean}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <div>
            PT. Panca Usahatama Paramita &bull; Divisi Produksi & QC &bull; Terdaftar ISO 9001
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold transition-colors"
          >
            Tutup & Lanjutkan Form
          </button>
        </div>

      </div>
    </div>
  );
};

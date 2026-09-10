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
  Layers
} from 'lucide-react';
import { TRAINING_MODULES } from '../data/trainingData';
import { MachineId } from '../types';

interface TrainingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMachine?: MachineId;
}

export const TrainingModal: React.FC<TrainingModalProps> = ({
  isOpen,
  onClose,
  defaultMachine = 'PM1'
}) => {
  const [selectedMachine, setSelectedMachine] = useState<MachineId>(defaultMachine);

  if (!isOpen) return null;

  const data = TRAINING_MODULES[selectedMachine] || TRAINING_MODULES['PM1'];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div className="w-full max-w-4xl bg-slate-900 border-l border-slate-700 h-full flex flex-col shadow-2xl text-slate-100">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-950/90 border border-amber-600/60 rounded-lg text-amber-400">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-wide">
                  Materi Pelatihan Kerja Mesin Kertas
                </h2>
                <span className="text-[11px] bg-amber-900/60 text-amber-300 font-semibold px-2 py-0.5 rounded border border-amber-700/50">
                  Standar Operator Pabrik
                </span>
              </div>
              <p className="text-xs text-slate-400">
                PT. Panca Usahatama Paramita &bull; Program Peningkatan Kompetensi Petugas Shift
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Cetak Materi"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              id="btn-close-training"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Tutup (Kembali ke Laporan)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Machine Switcher Tabs */}
        <div className="border-b border-slate-800 bg-slate-900/90 px-4 py-2 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            {(['PM1', 'PM2', 'PM5'] as MachineId[]).map((mId) => {
              const isActive = selectedMachine === mId;
              return (
                <button
                  key={mId}
                  id={`training-tab-${mId}`}
                  onClick={() => setSelectedMachine(mId)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>MODUL {mId}</span>
                </button>
              );
            })}
          </div>

          <span className="text-xs text-amber-400/90 font-medium hidden sm:inline">
            {data.name}
          </span>
        </div>

        {/* Training Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 text-sm">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
              <span>Unit Mesin {data.machineId}</span>
              <span>&bull;</span>
              <span>Dokumen Pelatihan Resmi</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{data.name}</h3>
            <p className="text-xs text-slate-300">{data.tagline}</p>

            {data.specialCharacteristics && (
              <div className="mt-3 bg-blue-950/60 border border-blue-800/60 rounded-lg p-3 text-xs text-blue-200 flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-blue-100">Karakteristik Khusus {data.machineId}: </strong>
                  {data.specialCharacteristics}
                </div>
              </div>
            )}

            {data.differencesFromOthers && (
              <div className="mt-3 bg-cyan-950/60 border border-cyan-800/60 rounded-lg p-3 text-xs text-cyan-200 flex items-start gap-2">
                <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-cyan-100">Perbedaan Pengaturan Utama: </strong>
                  {data.differencesFromOthers}
                </div>
              </div>
            )}
          </div>

          {/* 1. Spesifikasi Teknis & Kapasitas Nominal */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <h4 className="font-bold text-slate-100 mb-3 flex items-center gap-2 text-sm">
              <Settings className="w-4 h-4 text-blue-400" />
              Spesifikasi Teknis & Kapasitas Nominal {data.machineId}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {data.technicalSpecs.map((spec, i) => (
                <div key={i} className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 flex flex-col justify-between">
                  <span className="text-slate-400">{spec.label}</span>
                  <span className="font-semibold text-slate-100 mt-0.5">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Batas Operasi Aman (Operating Limits & Danger Zones) */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <h4 className="font-bold text-rose-400 mb-3 flex items-center gap-2 text-sm">
              <AlertOctagon className="w-4 h-4" />
              Batas Operasi & Parameter Kritis (Danger Zones)
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

          {/* 3. Jenis Produk yang Diproduksi (Paper Grades) */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <h4 className="font-bold text-emerald-400 mb-3 flex items-center gap-2 text-sm">
              <Layers className="w-4 h-4" />
              Katalog Jenis Kertas / Grade Produk {data.machineId}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
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

          {/* 4. Titik Pemeriksaan Rutin Harian (Daily Checkpoints) */}
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
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Standar Parameter Operasi & Cara Membaca DCS */}
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

            {/* Cara Baca Indikator DCS */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
              <h4 className="font-bold text-purple-400 mb-3 flex items-center gap-2 text-sm">
                <Cpu className="w-4 h-4" />
                Panduan Membaca Layar Kontrol DCS
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
                    <div className="text-slate-300 mt-1">{ind.meaning}</div>
                    <div className="text-[11px] text-amber-400 mt-1">
                      Aksi jika abnormal: {ind.actionIfAbnormal}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 6. Gangguan Khas Mesin & Solusi Teknis */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <h4 className="font-bold text-amber-400 mb-3 flex items-center gap-2 text-sm">
              <AlertOctagon className="w-4 h-4" />
              Gangguan Khas {data.machineId} & Solusi Rekayasa
            </h4>
            <div className="space-y-3">
              {data.commonFaultsAndSolutions.map((fault, i) => (
                <div key={i} className="bg-slate-900/90 border border-amber-950/80 rounded-lg p-3 text-xs">
                  <div className="font-bold text-amber-300 text-sm mb-1">{fault.fault}</div>
                  <div className="text-slate-400 mb-1">Indikasi: {fault.indication}</div>
                  {fault.cause && (
                    <div className="text-amber-400/90 text-[11px] mb-2">Penyebab: {fault.cause}</div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                    <div>
                      <span className="text-cyan-400 font-semibold">Tindakan Cepat Lapangan:</span>
                      <p className="text-slate-200 mt-0.5">{fault.immediateAction}</p>
                    </div>
                    <div>
                      <span className="text-emerald-400 font-semibold">Solusi Permanen / Akar Masalah:</span>
                      <p className="text-emerald-200 mt-0.5">{fault.permanentFix}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 7. Batas Aman & Prosedur Keselamatan Kerja K3 */}
          <div className="bg-slate-950/60 border border-rose-900/60 rounded-xl p-4">
            <h4 className="font-bold text-rose-300 mb-2.5 flex items-center gap-2 text-sm">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              Batas Aman & Standar Keselamatan Kerja (K3) {data.machineId}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {data.k3SafetyProcedures.map((k3, i) => (
                <li key={i} className="flex items-start gap-2 bg-slate-900/70 p-2 rounded border border-rose-950">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                  <span>{k3}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <div>
            PT. Panca Usahatama Paramita &bull; Dept. Training & Technical Support
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

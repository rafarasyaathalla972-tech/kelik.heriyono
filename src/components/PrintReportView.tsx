import React from 'react';
import { ShiftReport } from '../types';
import { Printer, X, Layers } from 'lucide-react';
import { findProductByCodeOrName } from '../data/pmProductData';

interface PrintReportViewProps {
  report: ShiftReport;
  onClose: () => void;
}

export const PrintReportView: React.FC<PrintReportViewProps> = ({ report, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const matchedProd = findProductByCodeOrName(report.productCode || report.paperGradeCode);
  const displayProdCode = report.productCode || matchedProd?.kodeBarang || '-';
  const displayItemName = report.productItemName || matchedProd?.itemBarang || report.paperGradeCode;
  const displayRawMat = report.rawMaterial || matchedProd?.bahanBaku || 'HVS';
  const displayTargetGsm = report.targetGsm || matchedProd?.gsm;
  const displayTolerance = report.gsmTolerance || matchedProd?.gsmTolerance || '-';
  const displayTensileMd = report.tensileMdStandard || matchedProd?.tensileMd || '-';
  const displayTensileCd = report.tensileCdStandard || matchedProd?.tensileCd || '-';
  const displayThicknessMm = report.thicknessMmStandard || matchedProd?.thicknessMm;
  const displayCreeping = report.creepingStandard || matchedProd?.creeping || '-';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      {/* Container */}
      <div className="bg-white text-slate-900 w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden flex flex-col my-auto border border-slate-300">
        
        {/* Action Header - hidden during print */}
        <div className="bg-slate-900 text-white px-5 py-3 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm">Pratinjau Cetak Lembar Laporan Kinerja Shift</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              id="btn-print-action"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-colors shadow"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE DOCUMENT BODY */}
        <div className="p-8 space-y-6 text-xs bg-white" id="printable-shift-sheet">
          
          {/* Header PT Panca Usahatama Paramita */}
          <div className="border-b-2 border-slate-900 pb-3 flex items-start justify-between">
            <div>
              <h1 className="text-base sm:text-lg font-black tracking-wide text-slate-950 uppercase">
                PT. PANCA USAHATAMA PARAMITA
              </h1>
              <p className="text-[11px] font-semibold text-slate-700">
                Pabrik Kertas & Kemasan Karton Industri
              </p>
              <p className="text-[10px] text-slate-500">
                Dokumen Resmi Divisi Produksi & QC &bull; Form No: PUP/OPS/P-04/REV.02
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 border-2 border-slate-900 text-slate-900 font-bold uppercase text-[11px]">
                LAPORAN SHIFT: {report.machine}
              </span>
              <div className="text-[10px] text-slate-500 mt-1">
                Ref ID: {report.id}
              </div>
            </div>
          </div>

          {/* Section A: Data Umum */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-slate-100 p-3 rounded border border-slate-300 text-xs">
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Tanggal Laporan</span>
              <span className="font-bold text-slate-900 text-sm font-mono">{report.date}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Shift & Regu</span>
              <span className="font-bold text-slate-900 text-sm">{report.shift} ({report.groupShift || 'Group 1'})</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Operator Utama</span>
              <span className="font-bold text-slate-900 text-sm">{report.operatorName}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Pembantu (Helper)</span>
              <span className="font-bold text-slate-900 text-sm">{report.assistantOperatorName || '-'}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Unit Mesin</span>
              <span className="font-bold text-slate-900 text-sm">{report.machine}</span>
            </div>
          </div>

          {/* Section B: Hasil Produksi & Pencapaian */}
          <div>
            <h2 className="font-bold uppercase text-slate-900 text-xs mb-1.5 border-b border-slate-300 pb-1 flex justify-between">
              <span>I. Hasil Produksi Mesin {report.machine} & Identifikasi Produk Jumbo Roll</span>
              <span className="font-bold">
                Pencapaian: {report.achievementPercentage}%
              </span>
            </h2>
            <table className="w-full text-left border-collapse border border-slate-300">
              <tbody>
                <tr className="border-b border-slate-300">
                  <td className="p-2 font-semibold bg-slate-50 w-1/4">Item Barang Produk</td>
                  <td className="p-2 font-bold text-slate-950" colSpan={3}>
                    {displayItemName}
                  </td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td className="p-2 font-semibold bg-slate-50">Kode Barang Resmi</td>
                  <td className="p-2 font-mono font-bold text-slate-900">{displayProdCode}</td>
                  <td className="p-2 font-semibold bg-slate-50">Bahan Baku (Pulp/HVS)</td>
                  <td className="p-2 font-semibold text-slate-900">{displayRawMat}</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td className="p-2 font-semibold bg-slate-50">Target Produksi</td>
                  <td className="p-2 font-mono">{report.targetProductionTon} Ton</td>
                  <td className="p-2 font-semibold bg-slate-50">Produksi Aktual</td>
                  <td className="p-2 font-mono font-bold text-slate-900">{report.actualProductionTon} Ton</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td className="p-2 font-semibold bg-slate-50">Berat Bersih (Net)</td>
                  <td className="p-2 font-mono">{report.netWeightKg?.toLocaleString('id-ID')} Kg</td>
                  <td className="p-2 font-semibold bg-slate-50">Jumlah Gulungan</td>
                  <td className="p-2 font-mono">{report.reelCount} Reel / Roll</td>
                </tr>
                {report.oee && (
                  <tr className="border-b border-slate-300 bg-blue-50/60 font-semibold">
                    <td className="p-2 bg-blue-100/70 text-blue-950 font-bold">Skor OEE Shift</td>
                    <td className="p-2 font-mono font-bold text-blue-900 text-sm">
                      {report.oee.oee}% ({report.oee.status === 'WORLD_CLASS' ? 'World Class' : report.oee.status === 'GOOD' ? 'Optimal' : report.oee.status === 'FAIR' ? 'Fair / Cukup' : 'Perlu Kaizen'})
                    </td>
                    <td className="p-2 bg-blue-100/70 text-blue-950">Rincian TPM (A / P / Q)</td>
                    <td className="p-2 font-mono text-xs text-slate-800">
                      Avail: {report.oee.availability}% | Perf: {report.oee.performance}% | Qual: {report.oee.quality}%
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Section C: Kualitas Produk & Standar Dokumen */}
          <div>
            <h2 className="font-bold uppercase text-slate-900 text-xs mb-1.5 border-b border-slate-300 pb-1">
              II. Evaluasi Kualitas Produk & Standar Mutu Lab (PT. PUP)
            </h2>
            
            {/* Standar Spesifikasi Dokumen Pabrik */}
            <div className="bg-slate-50 p-2.5 rounded border border-slate-300 mb-2">
              <div className="text-[10px] font-bold uppercase text-slate-600 mb-1">
                Standar Mutu Dokumen Produk ({displayProdCode})
              </div>
              <div className="grid grid-cols-5 gap-2 text-center text-[11px]">
                <div className="p-1 border border-slate-200 bg-white rounded">
                  <span className="text-[9px] text-slate-500 block">Target GSM</span>
                  <strong className="font-mono">{displayTargetGsm ? `${displayTargetGsm} ${displayTolerance}` : '-'}</strong>
                </div>
                <div className="p-1 border border-slate-200 bg-white rounded">
                  <span className="text-[9px] text-slate-500 block">Kekuatan Tarik MD</span>
                  <strong className="font-mono">{displayTensileMd}</strong>
                </div>
                <div className="p-1 border border-slate-200 bg-white rounded">
                  <span className="text-[9px] text-slate-500 block">Kekuatan Tarik CD</span>
                  <strong className="font-mono">{displayTensileCd}</strong>
                </div>
                <div className="p-1 border border-slate-200 bg-white rounded">
                  <span className="text-[9px] text-slate-500 block">Ketebalan Standar</span>
                  <strong className="font-mono">{displayThicknessMm ? `${displayThicknessMm} mm` : '-'}</strong>
                </div>
                <div className="p-1 border border-slate-200 bg-white rounded">
                  <span className="text-[9px] text-slate-500 block">Creeping</span>
                  <strong className="font-mono">{displayCreeping}</strong>
                </div>
              </div>
            </div>

            {/* Grade Breakdown Table */}
            <div className="grid grid-cols-4 gap-2 mb-2 text-center">
              <div className="p-2 border border-slate-300 bg-slate-50 rounded">
                <div className="text-[10px] text-slate-500 uppercase">Grade A</div>
                <div className="font-bold font-mono text-sm">{report.qualityGradeA_Ton} T</div>
              </div>
              <div className="p-2 border border-slate-300 bg-slate-50 rounded">
                <div className="text-[10px] text-slate-500 uppercase">Grade B</div>
                <div className="font-bold font-mono text-sm">{report.qualityGradeB_Ton} T</div>
              </div>
              <div className="p-2 border border-slate-300 bg-slate-50 rounded">
                <div className="text-[10px] text-slate-500 uppercase">Grade C</div>
                <div className="font-bold font-mono text-sm">{report.qualityGradeC_Ton} T</div>
              </div>
              <div className="p-2 border border-rose-300 bg-rose-50 text-rose-900 rounded">
                <div className="text-[10px] uppercase font-bold text-rose-700">Cacat / Reject</div>
                <div className="font-bold font-mono text-sm">{report.qualityGradeDefect_Ton} T ({report.defectPercentage}%)</div>
              </div>
            </div>

            {/* Test Parameters */}
            <table className="w-full text-left border border-slate-300">
              <thead className="bg-slate-100 text-[10px] uppercase text-slate-700 font-bold">
                <tr>
                  <th className="p-1.5 border-b border-slate-300">Ketebalan Uji (Caliper)</th>
                  <th className="p-1.5 border-b border-slate-300">Kelembapan (Moisture)</th>
                  <th className="p-1.5 border-b border-slate-300">Kekuatan Tarik (Tensile)</th>
                  <th className="p-1.5 border-b border-slate-300">Kerataan (Smoothness)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="font-mono">
                  <td className="p-1.5 border-b border-slate-300">{report.thicknessMicron} µm</td>
                  <td className="p-1.5 border-b border-slate-300">{report.moisturePercent}%</td>
                  <td className="p-1.5 border-b border-slate-300">{report.tensileStrength} kN/m</td>
                  <td className="p-1.5 border-b border-slate-300">{report.surfaceSmoothness} ml/min</td>
                </tr>
              </tbody>
            </table>

            {report.defectTypes && report.defectTypes.length > 0 && (
              <div className="mt-2 text-[11px]">
                <strong className="text-slate-700">Jenis Cacat yang Ditemukan: </strong>
                <span>{report.defectTypes.join(', ')}</span>
              </div>
            )}
          </div>

          {/* Section D: Kendala & Downtime */}
          <div>
            <div className="flex justify-between items-center border-b border-slate-300 pb-1 mb-1.5">
              <h2 className="font-bold uppercase text-slate-900 text-xs">
                III. Kendala & Masalah Selama Shift
              </h2>
              <span className="font-bold text-xs">
                Total Downtime: {report.totalDowntimeMinutes} Menit
              </span>
            </div>
            {report.incidents && report.incidents.length > 0 ? (
              <table className="w-full text-left border border-slate-300 text-[11px]">
                <thead className="bg-slate-100 uppercase text-[10px] text-slate-700">
                  <tr>
                    <th className="p-1.5 border-b border-slate-300 w-16">Jam</th>
                    <th className="p-1.5 border-b border-slate-300 w-32">Bagian</th>
                    <th className="p-1.5 border-b border-slate-300">Uraian Masalah</th>
                    <th className="p-1.5 border-b border-slate-300 w-24 text-right">Durasi</th>
                  </tr>
                </thead>
                <tbody>
                  {report.incidents.map((inc, i) => (
                    <tr key={i} className="border-b border-slate-200">
                      <td className="p-1.5 font-mono">{inc.time}</td>
                      <td className="p-1.5 font-semibold">{inc.location}</td>
                      <td className="p-1.5">{inc.description}</td>
                      <td className="p-1.5 font-mono text-right font-bold">{inc.downtimeMinutes} mnt</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-2 border border-slate-200 text-slate-500 italic text-[11px]">
                Tidak ada kendala / mesin beroperasi lancar 100% tanpa henti.
              </div>
            )}
          </div>

          {/* Section E: Rekomendasi & Handover */}
          <div className="space-y-2 border border-slate-300 p-3 rounded bg-slate-50">
            <h2 className="font-bold uppercase text-slate-900 text-xs border-b border-slate-300 pb-1">
              IV. Tindakan Korektif & Catatan Serah Terima (Handover)
            </h2>
            <div>
              <span className="font-bold text-slate-700 block text-[10px] uppercase">Tindakan yang Dilakukan:</span>
              <p className="text-slate-900">{report.actionsTaken || '-'}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="font-bold text-slate-700 block text-[10px] uppercase">Saran Jangka Pendek:</span>
                <p className="text-slate-900">{report.shortTermRecommendation || '-'}</p>
              </div>
              <div>
                <span className="font-bold text-slate-700 block text-[10px] uppercase">Saran Jangka Panjang:</span>
                <p className="text-slate-900">{report.longTermRecommendation || '-'}</p>
              </div>
            </div>
            <div className="pt-1 border-t border-slate-200">
              <span className="font-bold text-amber-900 block text-[10px] uppercase">Catatan Handover untuk Shift Berikutnya:</span>
              <p className="text-slate-900 font-medium">{report.handoverNotes || '-'}</p>
            </div>
          </div>

          {/* Audit Trail (if edited) */}
          {report.editHistory && report.editHistory.length > 0 && (
            <div className="text-[10px] text-slate-500 border-t border-slate-200 pt-1">
              <strong>Riwayat Revisi: </strong>
              {report.editHistory.map((h, i) => (
                <span key={i} className="mr-2">
                  [{new Date(h.editedAt).toLocaleString('id-ID')}] Diubah oleh {h.editedBy} ({h.reason})
                </span>
              ))}
            </div>
          )}

          {/* Signatures Footer */}
          <div className="pt-6 grid grid-cols-4 gap-3 text-center text-xs">
            <div>
              <div className="text-slate-500 text-[10px] uppercase font-semibold">Pembantu (Helper)</div>
              <div className="h-12 border-b border-slate-400 mt-2"></div>
              <div className="font-bold mt-1 text-slate-900 text-[11px] truncate">
                {report.assistantOperatorName || '( ........................ )'}
              </div>
            </div>
            <div>
              <div className="text-slate-500 text-[10px] uppercase font-semibold">Operator Utama</div>
              <div className="h-12 border-b border-slate-400 mt-2"></div>
              <div className="font-bold mt-1 text-slate-900 text-[11px] truncate">
                {report.operatorName}
              </div>
            </div>
            <div>
              <div className="text-slate-500 text-[10px] uppercase font-semibold">Kepala Regu / Karu</div>
              <div className="h-12 border-b border-slate-400 mt-2"></div>
              <div className="font-bold mt-1 text-slate-900 text-[11px] truncate">
                {report.karuName || '( ........................ )'}
              </div>
            </div>
            <div>
              <div className="text-slate-500 text-[10px] uppercase font-semibold">Kepala Pabrik</div>
              <div className="h-12 border-b border-slate-400 mt-2"></div>
              <div className="font-bold mt-1 text-slate-900 text-[11px] truncate">
                Kelik Heriyono
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

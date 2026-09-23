import React, { useState, useMemo } from 'react';
import { 
  History, 
  Search, 
  Filter, 
  Download, 
  Printer, 
  Edit3, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Layers, 
  Eye,
  FileText,
  Users,
  HardHat,
  ShieldCheck,
  Gauge
} from 'lucide-react';
import { ShiftReport, MachineId } from '../types';
import { PrintReportView } from './PrintReportView';
import { findProductByCodeOrName } from '../data/pmProductData';
import { PmProductsModal } from './PmProductsModal';

interface ReportListProps {
  reports: ShiftReport[];
  onEditReport: (report: ShiftReport) => void;
  onDeleteReport: (id: string) => void;
}

export const ReportList: React.FC<ReportListProps> = ({
  reports,
  onEditReport,
  onDeleteReport
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [machineFilter, setMachineFilter] = useState<'ALL' | MachineId>('ALL');
  const [shiftFilter, setShiftFilter] = useState<string>('ALL');
  const [bahanBakuFilter, setBahanBakuFilter] = useState<'ALL' | 'HVS' | 'PULP'>('ALL');
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>('');
  const [showCatalogModal, setShowCatalogModal] = useState<boolean>(false);
  const [catalogMachine, setCatalogMachine] = useState<MachineId>('PM1');
  
  // Expanded report detail row
  const [expandedReportId, setExpandedReportId] = useState<string | null>(null);

  // Print view state
  const [printReport, setPrintReport] = useState<ShiftReport | null>(null);

  // Filter logic
  const filteredReports = useMemo(() => {
    return reports.filter(rep => {
      const matchMachine = machineFilter === 'ALL' || rep.machine === machineFilter;
      const matchShift = shiftFilter === 'ALL' || 
        rep.shift === shiftFilter ||
        (shiftFilter === 'Shift 1' && (rep.shift as string) === 'Pagi') ||
        (shiftFilter === 'Shift 2' && (rep.shift as string) === 'Siang') ||
        (shiftFilter === 'Shift 3' && (rep.shift as string) === 'Malam');
      const matchDate = !selectedDateFilter || rep.date === selectedDateFilter;
      
      const matchedProd = findProductByCodeOrName(rep.productCode || rep.paperGradeCode);
      const repBahan = rep.rawMaterial || matchedProd?.bahanBaku;
      const matchBahan = bahanBakuFilter === 'ALL' || repBahan === bahanBakuFilter;

      const q = searchQuery.toLowerCase();
      const matchQuery = !searchQuery || 
        rep.operatorName.toLowerCase().includes(q) ||
        rep.paperGradeCode.toLowerCase().includes(q) ||
        rep.productCode?.toLowerCase().includes(q) ||
        rep.productItemName?.toLowerCase().includes(q) ||
        matchedProd?.kodeBarang?.toLowerCase().includes(q) ||
        matchedProd?.itemBarang?.toLowerCase().includes(q) ||
        rep.actionsTaken?.toLowerCase().includes(q) ||
        rep.handoverNotes?.toLowerCase().includes(q) ||
        rep.id.toLowerCase().includes(q);

      return matchMachine && matchShift && matchDate && matchBahan && matchQuery;
    });
  }, [reports, machineFilter, shiftFilter, bahanBakuFilter, selectedDateFilter, searchQuery]);

  // Export to CSV Function
  const handleExportCSV = () => {
    if (filteredReports.length === 0) {
      alert('Tidak ada data laporan untuk diekspor.');
      return;
    }

    const headers = [
      'ID Laporan',
      'Tanggal',
      'Shift',
      'Mesin',
      'Petugas Pengisi',
      'Item Barang Produk',
      'Kode Barang PM',
      'Bahan Baku',
      'Target GSM',
      'Toleransi GSM',
      'Kekuatan Tarik MD',
      'Kekuatan Tarik CD',
      'Tebal Standar (mm)',
      'Creeping Standar',
      'Target (Ton)',
      'Aktual (Ton)',
      'Pencapaian (%)',
      'Berat Bersih (Kg)',
      'Jumlah Reel',
      'Grade A (Ton)',
      'Grade B (Ton)',
      'Grade C (Ton)',
      'Cacat (Ton)',
      'Cacat (%)',
      'Caliper Uji (um)',
      'Moisture (%)',
      'Tensile (kN/m)',
      'Smoothness (ml/min)',
      'Total Downtime (Menit)',
      'OEE (%)',
      'Availability (%)',
      'Performance (%)',
      'Quality (%)',
      'Tindakan Dilakukan',
      'Saran Jangka Pendek',
      'Saran Jangka Panjang',
      'Catatan Handover',
      'Jumlah Revisi'
    ];

    const rows = filteredReports.map(r => {
      const prod = findProductByCodeOrName(r.productCode || r.paperGradeCode);
      return [
        `"${r.id}"`,
        `"${r.date}"`,
        `"${r.shift}"`,
        `"${r.machine}"`,
        `"${r.operatorName}"`,
        `"${r.productItemName || prod?.itemBarang || r.paperGradeCode}"`,
        `"${r.productCode || prod?.kodeBarang || '-'}"`,
        `"${r.rawMaterial || prod?.bahanBaku || '-'}"`,
        r.targetGsm || prod?.gsm || '-',
        `"${r.gsmTolerance || prod?.gsmTolerance || '-'}"`,
        `"${r.tensileMdStandard || prod?.tensileMd || '-'}"`,
        `"${r.tensileCdStandard || prod?.tensileCd || '-'}"`,
        r.thicknessMmStandard || prod?.thicknessMm || '-',
        `"${r.creepingStandard || prod?.creeping || '-'}"`,
        r.targetProductionTon,
        r.actualProductionTon,
        r.achievementPercentage,
        r.netWeightKg,
        r.reelCount,
        r.qualityGradeA_Ton,
        r.qualityGradeB_Ton,
        r.qualityGradeC_Ton,
        r.qualityGradeDefect_Ton,
        r.defectPercentage,
        r.thicknessMicron,
        r.moisturePercent,
        r.tensileStrength,
        r.surfaceSmoothness,
        r.totalDowntimeMinutes,
        r.oee ? r.oee.oee : '-',
        r.oee ? r.oee.availability : '-',
        r.oee ? r.oee.performance : '-',
        r.oee ? r.oee.quality : '-',
        `"${(r.actionsTaken || '').replace(/"/g, '""')}"`,
        `"${(r.shortTermRecommendation || '').replace(/"/g, '""')}"`,
        `"${(r.longTermRecommendation || '').replace(/"/g, '""')}"`,
        `"${(r.handoverNotes || '').replace(/"/g, '""')}"`,
        r.editHistory ? r.editHistory.length : 0
      ];
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(row => row.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Laporan_Shift_PUP_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleExpand = (id: string) => {
    setExpandedReportId(expandedReportId === id ? null : id);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Top Header & Export Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-sm">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <History className="w-5 h-5 text-blue-400" />
            Riwayat & Arsip Laporan Shift Mesin Kertas
          </h1>
          <p className="text-xs text-slate-400">
            Daftar lengkap laporan shift PT. Panca Usahatama Paramita dengan log audit perubahan.
          </p>
        </div>

        {/* Export & Count */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            id="btn-export-csv"
            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold transition-colors shadow-sm"
            title="Download Spreadsheet Excel (CSV)"
          >
            <Download className="w-4 h-4" />
            <span>Ekspor CSV / Excel</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
          {/* Keyword Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama petugas, grade, catatan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Machine Filter */}
          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 border border-slate-700 rounded-lg">
            <span className="text-slate-400 font-semibold">Mesin:</span>
            <select
              value={machineFilter}
              onChange={(e) => setMachineFilter(e.target.value as 'ALL' | MachineId)}
              className="bg-transparent text-slate-100 font-bold focus:outline-none flex-1 cursor-pointer"
            >
              <option value="ALL" className="bg-slate-900">Semua Unit (PM1, PM2, PM5)</option>
              <option value="PM1" className="bg-slate-900">PM1</option>
              <option value="PM2" className="bg-slate-900">PM2</option>
              <option value="PM5" className="bg-slate-900">PM5</option>
            </select>
          </div>

          {/* Shift Filter */}
          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 border border-slate-700 rounded-lg">
            <span className="text-slate-400 font-semibold">Shift:</span>
            <select
              value={shiftFilter}
              onChange={(e) => setShiftFilter(e.target.value)}
              className="bg-transparent text-slate-100 font-bold focus:outline-none flex-1 cursor-pointer"
            >
              <option value="ALL" className="bg-slate-900">Semua Shift</option>
              <option value="Shift 1" className="bg-slate-900">Shift 1</option>
              <option value="Shift 2" className="bg-slate-900">Shift 2</option>
              <option value="Shift 3" className="bg-slate-900">Shift 3</option>
            </select>
          </div>

          {/* Date Filter */}
          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 border border-slate-700 rounded-lg">
            <span className="text-slate-400 font-semibold">Tanggal:</span>
            <input
              type="date"
              value={selectedDateFilter}
              onChange={(e) => setSelectedDateFilter(e.target.value)}
              className="bg-transparent text-slate-100 font-mono focus:outline-none flex-1"
            />
            {selectedDateFilter && (
              <button
                onClick={() => setSelectedDateFilter('')}
                className="text-slate-500 hover:text-slate-300 text-xs px-1"
              >
                ✕
              </button>
            )}
          </div>

          {/* Bahan Baku Filter (HVS vs PULP) */}
          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 border border-slate-700 rounded-lg">
            <span className="text-slate-400 font-semibold">Bahan:</span>
            <select
              value={bahanBakuFilter}
              onChange={(e) => setBahanBakuFilter(e.target.value as any)}
              className="bg-transparent text-slate-100 font-bold focus:outline-none flex-1 cursor-pointer"
            >
              <option value="ALL" className="bg-slate-900">Semua Bahan</option>
              <option value="HVS" className="bg-slate-900">HVS</option>
              <option value="PULP" className="bg-slate-900">PULP</option>
            </select>
          </div>
        </div>

        {/* Filter Results Info */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 pt-1 border-t border-slate-800/80">
          <div className="flex items-center gap-3">
            <span>
              Menampilkan <strong>{filteredReports.length}</strong> dari <strong>{reports.length}</strong> laporan
            </span>
            <button
              type="button"
              onClick={() => {
                setCatalogMachine(machineFilter === 'ALL' ? 'PM1' : machineFilter);
                setShowCatalogModal(true);
              }}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold hover:underline"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Lihat Master Produk PM (PT. PUP)</span>
            </button>
          </div>
          {(machineFilter !== 'ALL' || shiftFilter !== 'ALL' || bahanBakuFilter !== 'ALL' || selectedDateFilter || searchQuery) && (
            <button
              onClick={() => {
                setMachineFilter('ALL');
                setShiftFilter('ALL');
                setBahanBakuFilter('ALL');
                setSelectedDateFilter('');
                setSearchQuery('');
              }}
              className="text-blue-400 hover:text-blue-300 font-semibold"
            >
              Reset Semua Filter
            </button>
          )}
        </div>
      </div>

      {/* Reports Table / Card List */}
      <div className="space-y-3">
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => {
            const isExpanded = expandedReportId === report.id;
            const hasAudit = report.editHistory && report.editHistory.length > 0;
            const matchedProd = findProductByCodeOrName(report.productCode || report.paperGradeCode);
            const displayCode = report.productCode || matchedProd?.kodeBarang;
            const displayItem = report.productItemName || matchedProd?.itemBarang || report.paperGradeCode;
            const displayBahan = report.rawMaterial || matchedProd?.bahanBaku;
            const displayTargetGsm = report.targetGsm || matchedProd?.gsm;
            const displayTolerance = report.gsmTolerance || matchedProd?.gsmTolerance;
            const displayTensileMd = report.tensileMdStandard || matchedProd?.tensileMd;
            const displayTensileCd = report.tensileCdStandard || matchedProd?.tensileCd;
            const displayThicknessMm = report.thicknessMmStandard || matchedProd?.thicknessMm;
            const displayCreeping = report.creepingStandard || matchedProd?.creeping;

            return (
              <div
                key={report.id}
                id={`report-card-${report.id}`}
                className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-sm transition-all hover:border-slate-700"
              >
                {/* Header Row */}
                <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-slate-950/40">
                  
                  {/* Left: Identity badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 bg-blue-950 border border-blue-700/60 text-blue-300 font-bold font-mono text-xs rounded-md">
                      {report.machine}
                    </span>
                    <span className="px-2 py-1 bg-slate-800 text-slate-200 font-semibold text-xs rounded-md font-mono">
                      {report.date}
                    </span>
                    <span className="px-2 py-1 bg-slate-800/90 text-slate-300 text-xs font-semibold rounded-md">
                      {report.shift.startsWith('Shift') ? report.shift : `Shift ${report.shift}`}
                    </span>
                    {report.groupShift && (
                      <span className="px-2 py-0.5 bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs font-semibold rounded-md">
                        {report.groupShift}
                      </span>
                    )}
                    {displayCode && (
                      <span className="px-2 py-0.5 bg-amber-950/80 border border-amber-600/60 text-amber-300 font-mono text-xs font-bold rounded-md flex items-center gap-1">
                        <Layers className="w-3 h-3 text-amber-400" />
                        {displayCode}
                      </span>
                    )}
                    {displayBahan && (
                      <span className={`px-2 py-0.5 text-[11px] font-bold rounded-md border ${
                        displayBahan === 'HVS' 
                          ? 'bg-blue-950/70 border-blue-700/60 text-blue-300' 
                          : 'bg-emerald-950/70 border-emerald-700/60 text-emerald-300'
                      }`}>
                        {displayBahan}
                      </span>
                    )}
                    <span className="text-xs font-semibold text-slate-200 pl-1">
                      Op: <strong className="text-white">{report.operatorName}</strong>
                    </span>
                    {report.assistantOperatorName && (
                      <span className="text-xs font-semibold text-amber-300/90 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-800/40 flex items-center gap-1">
                        <HardHat className="w-3 h-3 text-amber-400" />
                        Helper: <strong className="text-amber-200">{report.assistantOperatorName}</strong>
                      </span>
                    )}

                    {/* Audit badge if modified */}
                    {hasAudit && (
                      <span 
                        className="px-2 py-0.5 bg-amber-950/80 border border-amber-600/50 text-amber-400 text-[10px] font-bold rounded-full flex items-center gap-1"
                        title={`Telah direvisi ${report.editHistory.length} kali`}
                      >
                        <History className="w-3 h-3" />
                        Revisi ({report.editHistory.length})
                      </span>
                    )}
                  </div>

                  {/* Right: Numbers & Actions */}
                  <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
                    {/* OEE Pill if present */}
                    {report.oee && (
                      <div className="text-right border-r border-slate-800 pr-3 hidden sm:block">
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-slate-400">OEE:</span>
                          <span className={`font-mono font-bold text-sm ${
                            report.oee.oee >= 85 ? 'text-emerald-400' : report.oee.oee >= 75 ? 'text-cyan-400' : 'text-amber-400'
                          }`}>
                            {report.oee.oee}%
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          A:{report.oee.availability}% P:{report.oee.performance}%
                        </div>
                      </div>
                    )}

                    {/* Achievement Pill */}
                    <div className="text-right">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-slate-400">Pencapaian:</span>
                        <span className={`font-mono font-bold text-sm ${
                          report.achievementPercentage >= 100 ? 'text-emerald-400' : 'text-blue-400'
                        }`}>
                          {report.achievementPercentage}%
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        {report.actualProductionTon} / {report.targetProductionTon} Ton
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-1.5 pl-2 border-l border-slate-800">
                      <button
                        id={`btn-print-${report.id}`}
                        onClick={() => setPrintReport(report)}
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                        title="Cetak Laporan / Cetak Form Resmi"
                      >
                        <Printer className="w-4 h-4" />
                      </button>

                      <button
                        id={`btn-edit-${report.id}`}
                        onClick={() => onEditReport(report)}
                        className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors"
                        title="Edit / Koreksi Data Laporan"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        id={`btn-delete-${report.id}`}
                        onClick={() => {
                          if (confirm(`Hapus laporan ${report.id}?`)) {
                            onDeleteReport(report.id);
                          }
                        }}
                        className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                        title="Hapus Laporan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => toggleExpand(report.id)}
                        className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors ml-1"
                      >
                        <span>{isExpanded ? 'Tutup' : 'Rincian'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Compact Info Summary Row */}
                <div className="px-4 py-2 text-xs text-slate-400 bg-slate-900/60 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span>Item: <strong className="text-slate-100 font-semibold">{displayItem}</strong></span>
                    {displayCode && (
                      <>
                        <span>&bull;</span>
                        <span>Kode: <strong className="text-amber-300 font-mono font-semibold">{displayCode}</strong></span>
                      </>
                    )}
                    <span>&bull;</span>
                    <span>Reels: <strong className="text-slate-200">{report.reelCount} Roll</strong></span>
                    <span>&bull;</span>
                    <span>Downtime: <strong className={report.totalDowntimeMinutes > 0 ? 'text-amber-400' : 'text-slate-200'}>{report.totalDowntimeMinutes} Menit</strong></span>
                  </div>
                  <div>
                    <span>Grade A: <strong className="text-emerald-400">{report.qualityGradeA_Ton} T</strong></span>
                    <span className="mx-1">&bull;</span>
                    <span>Cacat: <strong className="text-rose-400">{report.defectPercentage}%</strong></span>
                  </div>
                </div>

                {/* EXPANDED FULL REPORT DETAILS */}
                {isExpanded && (
                  <div className="p-4 border-t border-slate-800 bg-slate-950/80 space-y-4 text-xs animate-fadeIn">
                    
                    {/* Shift Personnel Team PT. PUP */}
                    <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-400" />
                        <span className="font-bold text-slate-200">Personel Shift Regu:</span>
                        <span className="px-2 py-0.5 bg-blue-950 text-blue-300 rounded border border-blue-800/60 font-semibold text-[11px]">
                          {report.groupShift || 'Group 1'}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-[11px]">
                        <div>
                          <span className="text-slate-400">Operator Utama: </span>
                          <strong className="text-white">{report.operatorName}</strong>
                        </div>
                        {report.assistantOperatorName && (
                          <div className="flex items-center gap-1 text-amber-300">
                            <HardHat className="w-3.5 h-3.5 text-amber-400" />
                            <span>Pembantu (Helper): </span>
                            <strong className="text-amber-200">{report.assistantOperatorName}</strong>
                          </div>
                        )}
                        {report.karuName && (
                          <div className="flex items-center gap-1 text-cyan-300">
                            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Pengawas/Karu: </span>
                            <strong className="text-cyan-200">{report.karuName}</strong>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* PM Jumbo Roll Product Specifications & Standards (PT. PUP) */}
                    {report.oee && (
                      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-indigo-900/50 rounded-lg p-3 space-y-2">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                          <div className="flex items-center gap-2">
                            <Gauge className="w-4 h-4 text-indigo-400" />
                            <span className="font-bold text-slate-100 text-xs">
                              Metrik Efektivitas Mesin (OEE: {report.oee.oee}%)
                            </span>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                            report.oee.status === 'WORLD_CLASS' ? 'bg-emerald-950 text-emerald-300 border-emerald-700' :
                            report.oee.status === 'GOOD' ? 'bg-blue-950 text-blue-300 border-blue-700' :
                            'bg-amber-950 text-amber-300 border-amber-700'
                          }`}>
                            {report.oee.status === 'WORLD_CLASS' ? 'World Class (TPM)' : report.oee.status === 'GOOD' ? 'Optimal' : 'Perlu Kaizen'}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                          <div className="bg-slate-950/70 p-2 rounded border border-slate-800">
                            <span className="text-slate-500 block text-[10px]">Availability (A):</span>
                            <span className="font-mono font-bold text-blue-400">{report.oee.availability}%</span>
                            <span className="text-[10px] text-slate-500 block">DT: {report.oee.unplannedDowntimeMinutes} mnt</span>
                          </div>
                          <div className="bg-slate-950/70 p-2 rounded border border-slate-800">
                            <span className="text-slate-500 block text-[10px]">Performance (P):</span>
                            <span className="font-mono font-bold text-cyan-400">{report.oee.performance}%</span>
                            <span className="text-[10px] text-slate-500 block">{report.oee.actualProductionTon}T / {report.oee.targetProductionTon}T</span>
                          </div>
                          <div className="bg-slate-950/70 p-2 rounded border border-slate-800">
                            <span className="text-slate-500 block text-[10px]">Quality (Q):</span>
                            <span className="font-mono font-bold text-emerald-400">{report.oee.quality}%</span>
                            <span className="text-[10px] text-slate-500 block">Baik: {report.oee.goodProductionTon} Ton</span>
                          </div>
                          <div className="bg-slate-950/70 p-2 rounded border border-slate-800">
                            <span className="text-slate-500 block text-[10px]">Waktu Bersih Operasi:</span>
                            <span className="font-mono font-bold text-slate-200">{report.oee.operatingTimeMinutes} Menit</span>
                            <span className="text-[10px] text-slate-500 block">dari {report.oee.plannedTimeMinutes - report.oee.plannedDowntimeMinutes} mnt</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* PM Jumbo Roll Product Specifications & Standards (PT. PUP) */}
                    <div className="bg-gradient-to-r from-slate-900 to-slate-900/90 border border-amber-500/30 rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                        <div className="flex items-center gap-2">
                          <Layers className="w-4 h-4 text-amber-400" />
                          <span className="font-bold text-slate-100 text-xs">
                            Spesifikasi Jumbo Roll & Standar Dokumen PM ({displayCode || report.machine})
                          </span>
                        </div>
                        <span className="text-[10px] text-amber-300/80 bg-amber-950/60 border border-amber-800/40 px-2 py-0.5 rounded font-mono">
                          Bahan: {displayBahan || 'HVS'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 text-slate-300">
                        <div className="bg-slate-950/60 p-2 rounded border border-slate-800/70">
                          <span className="text-slate-500 block text-[10px]">Item Barang:</span>
                          <span className="font-bold text-slate-200 truncate block" title={displayItem}>
                            {displayItem}
                          </span>
                        </div>
                        <div className="bg-slate-950/60 p-2 rounded border border-slate-800/70">
                          <span className="text-slate-500 block text-[10px]">Target GSM & Toleransi:</span>
                          <span className="font-mono font-bold text-amber-300">
                            {displayTargetGsm ? `${displayTargetGsm} ${displayTolerance || ''}` : '-'}
                          </span>
                        </div>
                        <div className="bg-slate-950/60 p-2 rounded border border-slate-800/70">
                          <span className="text-slate-500 block text-[10px]">Kekuatan Tarik MD / CD:</span>
                          <span className="font-mono font-bold text-slate-200">
                            {displayTensileMd || '-'} / {displayTensileCd || '-'}
                          </span>
                        </div>
                        <div className="bg-slate-950/60 p-2 rounded border border-slate-800/70">
                          <span className="text-slate-500 block text-[10px]">Ketebalan Standar (mm):</span>
                          <span className="font-mono font-bold text-slate-200">
                            {displayThicknessMm ? `${displayThicknessMm} mm` : '-'}
                          </span>
                        </div>
                        <div className="bg-slate-950/60 p-2 rounded border border-slate-800/70">
                          <span className="text-slate-500 block text-[10px]">Creeping Standar:</span>
                          <span className="font-mono font-bold text-slate-200">
                            {displayCreeping || '-'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Grid: Quality Parameters & Incident List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Physical Quality Parameters */}
                      <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-2">
                        <span className="font-bold text-slate-200 flex items-center gap-1.5 text-xs pb-1 border-b border-slate-800">
                          <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                          Parameter Kualitas Fisik & Lab
                        </span>
                        <div className="grid grid-cols-2 gap-2 text-slate-300">
                          <div>
                            <span className="text-slate-500 block text-[11px]">Ketebalan (Caliper):</span>
                            <span className="font-mono font-bold text-slate-200">{report.thicknessMicron} µm</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[11px]">Kelembapan (Moisture):</span>
                            <span className="font-mono font-bold text-slate-200">{report.moisturePercent}%</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[11px]">Kekuatan Tarik (Tensile):</span>
                            <span className="font-mono font-bold text-slate-200">{report.tensileStrength} kN/m</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[11px]">Kerataan (Smoothness):</span>
                            <span className="font-mono font-bold text-slate-200">{report.surfaceSmoothness} ml/min</span>
                          </div>
                        </div>

                        {report.defectTypes && report.defectTypes.length > 0 && (
                          <div className="pt-2 border-t border-slate-800">
                            <span className="text-rose-400 font-semibold block text-[11px] mb-1">
                              Jenis Cacat Ditemukan:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {report.defectTypes.map((def, idx) => (
                                <span key={idx} className="px-2 py-0.5 bg-rose-950 text-rose-300 border border-rose-800 rounded text-[10px]">
                                  {def}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Incident & Downtime List */}
                      <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-2">
                        <span className="font-bold text-slate-200 flex items-center gap-1.5 text-xs pb-1 border-b border-slate-800">
                          <Clock className="w-3.5 h-3.5 text-amber-400" />
                          Kendala & Waktu Terhenti ({report.totalDowntimeMinutes} Menit)
                        </span>

                        {report.incidents && report.incidents.length > 0 ? (
                          <div className="space-y-1.5">
                            {report.incidents.map((inc, i) => (
                              <div key={i} className="p-2 bg-slate-950 rounded border border-slate-800 text-[11px] flex justify-between gap-2">
                                <div>
                                  <span className="font-bold text-amber-400 font-mono mr-1.5">{inc.time}</span>
                                  <span className="font-semibold text-slate-300 bg-slate-800 px-1.5 py-0.5 rounded text-[10px] mr-1.5">
                                    {inc.location}
                                  </span>
                                  <span className="text-slate-300">{inc.description}</span>
                                </div>
                                <span className="font-bold font-mono text-rose-400 shrink-0">
                                  {inc.downtimeMinutes} mnt
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-slate-500 italic py-2">
                            Tidak ada kendala teknis yang tercatat selama shift.
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Recommendations & Handover */}
                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-2">
                      <div className="font-bold text-slate-200 text-xs pb-1 border-b border-slate-800">
                        Tindakan, Saran Perbaikan & Catatan Handover
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
                        <div>
                          <strong className="text-slate-400 block text-[11px]">Tindakan Dilakukan:</strong>
                          <p className="mt-0.5">{report.actionsTaken || '-'}</p>
                        </div>
                        <div>
                          <strong className="text-slate-400 block text-[11px]">Saran Jangka Pendek:</strong>
                          <p className="mt-0.5">{report.shortTermRecommendation || '-'}</p>
                        </div>
                        <div>
                          <strong className="text-slate-400 block text-[11px]">Saran Jangka Panjang:</strong>
                          <p className="mt-0.5">{report.longTermRecommendation || '-'}</p>
                        </div>
                        <div className="bg-amber-950/30 p-2 rounded border border-amber-800/40">
                          <strong className="text-amber-400 block text-[11px]">Perlu Perhatian Shift Berikutnya:</strong>
                          <p className="mt-0.5 text-slate-200">{report.handoverNotes || '-'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Change Audit Log (if edited) */}
                    {hasAudit && (
                      <div className="bg-slate-900 p-3 rounded-lg border border-amber-950 space-y-2">
                        <span className="font-bold text-amber-400 flex items-center gap-1.5 text-xs pb-1 border-b border-slate-800">
                          <History className="w-3.5 h-3.5" />
                          Catatan Riwayat Audit Perubahan Data
                        </span>
                        <div className="space-y-1.5">
                          {report.editHistory.map((item, idx) => (
                            <div key={idx} className="text-[11px] bg-slate-950 p-2 rounded border border-slate-800 text-slate-300">
                              <div className="flex items-center justify-between text-[10px] text-slate-500 mb-0.5">
                                <span className="font-mono">{new Date(item.editedAt).toLocaleString('id-ID')}</span>
                                <span className="font-semibold text-amber-400">Petugas: {item.editedBy}</span>
                              </div>
                              <p className="text-slate-200">
                                <strong>Alasan: </strong>{item.reason}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="p-10 text-center bg-slate-900 border border-slate-800 rounded-xl space-y-2">
            <History className="w-8 h-8 text-slate-600 mx-auto" />
            <h3 className="font-bold text-slate-300 text-sm">Tidak ada laporan yang sesuai kriteria</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Cobalah ubah filter tanggal, shift, atau hapus kata pencarian untuk melihat laporan lainnya.
            </p>
          </div>
        )}
      </div>

      {/* Print View Modal */}
      {printReport && (
        <PrintReportView
          report={printReport}
          onClose={() => setPrintReport(null)}
        />
      )}

      {/* PM Master Product Catalog Modal */}
      <PmProductsModal
        isOpen={showCatalogModal}
        onClose={() => setShowCatalogModal(false)}
        initialMachine={catalogMachine}
      />

    </div>
  );
};

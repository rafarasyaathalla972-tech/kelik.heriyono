import React, { useState, useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  ReferenceLine
} from 'recharts';
import { 
  TrendingUp, 
  BarChart3, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Layers, 
  Filter,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
  FileText,
  PlusCircle,
  Sparkles,
  Zap
} from 'lucide-react';
import { ShiftReport, MachineId } from '../types';
import { findProductByCodeOrName } from '../data/pmProductData';
import { PmProductsModal } from './PmProductsModal';

interface DashboardChartsProps {
  reports: ShiftReport[];
  onSelectReportForView?: (report: ShiftReport) => void;
  onNavigateToForm?: () => void;
}

export const DashboardCharts: React.FC<DashboardChartsProps> = ({ reports, onNavigateToForm }) => {
  const [selectedMachineFilter, setSelectedMachineFilter] = useState<'ALL' | MachineId>('ALL');
  const [selectedShiftFilter, setSelectedShiftFilter] = useState<string>('ALL');
  const [showCatalogModal, setShowCatalogModal] = useState<boolean>(false);
  const [catalogMachine, setCatalogMachine] = useState<MachineId>('PM1');

  // Dynamic today's date formatted (YYYY-MM-DD)
  const todayStr = useMemo(() => {
    try {
      return new Date().toISOString().split('T')[0];
    } catch (e) {
      return '2026-09-22';
    }
  }, []);

  // Sorted list of unique dates available in reports (descending)
  const availableReportDates = useMemo(() => {
    const set = new Set(reports.map(r => r.date));
    set.add(todayStr);
    return Array.from(set).sort().reverse();
  }, [reports, todayStr]);

  // Selected date for highlight view (defaults to today)
  const [highlightDate, setHighlightDate] = useState<string>(todayStr);
  const activeHighlightDate = highlightDate || todayStr;

  // Format Indonesian date text (e.g. "Rabu, 23 September 2026")
  const formatIndonesianDate = (dateStr: string) => {
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const dateObj = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
        return new Intl.DateTimeFormat('id-ID', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }).format(dateObj);
      }
      return dateStr;
    } catch (e) {
      return dateStr;
    }
  };

  const formattedHighlightDate = useMemo(() => {
    return formatIndonesianDate(activeHighlightDate);
  }, [activeHighlightDate]);

  // HIGHLIGHT METRICS FOR TARGET DATE (TODAY)
  const todayHighlightMetrics = useMemo(() => {
    const dayReports = reports.filter(r => r.date === activeHighlightDate);

    // 1. Total Produksi Hari Ini
    const totalActualTon = dayReports.reduce((acc, r) => acc + (r.actualProductionTon || 0), 0);
    const totalTargetTon = dayReports.reduce((acc, r) => acc + (r.targetProductionTon || 0), 0);

    // 2. Efisiensi Rata-rata (%)
    // Rata-rata persentase pencapaian target dari seluruh shift hari ini
    const avgEfficiency = dayReports.length > 0
      ? Number((dayReports.reduce((acc, r) => acc + (r.achievementPercentage || 0), 0) / dayReports.length).toFixed(1))
      : 0;

    // 3. Jumlah Laporan yang Masuk
    const totalReportsCount = dayReports.length;

    // Additional valuable production insights
    const totalReels = dayReports.reduce((acc, r) => acc + (r.reelCount || 0), 0);
    const totalDowntime = dayReports.reduce((acc, r) => acc + (r.totalDowntimeMinutes || 0), 0);
    const netWeightKg = dayReports.reduce((acc, r) => acc + (r.netWeightKg || (r.actualProductionTon * 1000)), 0);

    // Shift breakdown
    const s1 = dayReports.filter(r => r.shift === 'Shift 1' || (r.shift as string) === 'Pagi').length;
    const s2 = dayReports.filter(r => r.shift === 'Shift 2' || (r.shift as string) === 'Siang').length;
    const s3 = dayReports.filter(r => r.shift === 'Shift 3' || (r.shift as string) === 'Malam').length;

    // PM Machine breakdown
    const pm1Actual = dayReports.filter(r => r.machine === 'PM1').reduce((acc, r) => acc + (r.actualProductionTon || 0), 0);
    const pm2Actual = dayReports.filter(r => r.machine === 'PM2').reduce((acc, r) => acc + (r.actualProductionTon || 0), 0);
    const pm5Actual = dayReports.filter(r => r.machine === 'PM5').reduce((acc, r) => acc + (r.actualProductionTon || 0), 0);

    // Quality breakdown today
    const totalQuality = dayReports.reduce(
      (acc, r) => acc + (r.qualityGradeA_Ton + r.qualityGradeB_Ton + r.qualityGradeC_Ton + r.qualityGradeDefect_Ton),
      0
    );
    const totalGradeA = dayReports.reduce((acc, r) => acc + (r.qualityGradeA_Ton || 0), 0);
    const gradeAPercent = totalQuality > 0 ? Number(((totalGradeA / totalQuality) * 100).toFixed(1)) : 0;

    return {
      date: activeHighlightDate,
      totalActualTon: Number(totalActualTon.toFixed(1)),
      totalTargetTon: Number(totalTargetTon.toFixed(1)),
      avgEfficiency,
      totalReportsCount,
      totalReels,
      totalDowntime,
      netWeightKg: Math.round(netWeightKg),
      shift1Count: s1,
      shift2Count: s2,
      shift3Count: s3,
      pm1Ton: Number(pm1Actual.toFixed(1)),
      pm2Ton: Number(pm2Actual.toFixed(1)),
      pm5Ton: Number(pm5Actual.toFixed(1)),
      gradeAPercent,
      reports: dayReports
    };
  }, [reports, activeHighlightDate]);

  // Filtered reports based on user controls
  const filteredReports = useMemo(() => {
    return reports.filter(r => {
      const matchMachine = selectedMachineFilter === 'ALL' || r.machine === selectedMachineFilter;
      const matchShift = selectedShiftFilter === 'ALL' || 
        r.shift === selectedShiftFilter ||
        (selectedShiftFilter === 'Shift 1' && (r.shift as string) === 'Pagi') ||
        (selectedShiftFilter === 'Shift 2' && (r.shift as string) === 'Siang') ||
        (selectedShiftFilter === 'Shift 3' && (r.shift as string) === 'Malam');
      return matchMachine && matchShift;
    });
  }, [reports, selectedMachineFilter, selectedShiftFilter]);

  // Aggregate Metrics for Top KPI Cards
  const kpiMetrics = useMemo(() => {
    if (filteredReports.length === 0) {
      return {
        totalActualTon: 0,
        totalTargetTon: 0,
        avgAchievement: 0,
        totalDowntime: 0,
        avgDefectRate: 0,
        totalReels: 0,
        gradeAPercentage: 0
      };
    }

    const totalActualTon = filteredReports.reduce((acc, r) => acc + (r.actualProductionTon || 0), 0);
    const totalTargetTon = filteredReports.reduce((acc, r) => acc + (r.targetProductionTon || 0), 0);
    const avgAchievement = totalTargetTon > 0 
      ? Number(((totalActualTon / totalTargetTon) * 100).toFixed(1)) 
      : 0;

    const totalDowntime = filteredReports.reduce((acc, r) => acc + (r.totalDowntimeMinutes || 0), 0);
    const totalReels = filteredReports.reduce((acc, r) => acc + (r.reelCount || 0), 0);

    const totalQualityTon = filteredReports.reduce(
      (acc, r) => acc + (r.qualityGradeA_Ton + r.qualityGradeB_Ton + r.qualityGradeC_Ton + r.qualityGradeDefect_Ton),
      0
    );
    const totalDefectTon = filteredReports.reduce((acc, r) => acc + (r.qualityGradeDefect_Ton || 0), 0);
    const avgDefectRate = totalQualityTon > 0 
      ? Number(((totalDefectTon / totalQualityTon) * 100).toFixed(2)) 
      : 0;

    const totalGradeATon = filteredReports.reduce((acc, r) => acc + (r.qualityGradeA_Ton || 0), 0);
    const gradeAPercentage = totalQualityTon > 0 
      ? Number(((totalGradeATon / totalQualityTon) * 100).toFixed(1)) 
      : 0;

    return {
      totalActualTon: Number(totalActualTon.toFixed(1)),
      totalTargetTon: Number(totalTargetTon.toFixed(1)),
      avgAchievement,
      totalDowntime,
      avgDefectRate,
      totalReels,
      gradeAPercentage
    };
  }, [filteredReports]);

  // Chart 1: Produksi vs Target per Mesin (PM1, PM2, PM5)
  const productionByMachineData = useMemo(() => {
    const machines: MachineId[] = ['PM1', 'PM2', 'PM5'];
    return machines.map(mId => {
      const machineReports = filteredReports.filter(r => r.machine === mId);
      const target = machineReports.reduce((acc, r) => acc + (r.targetProductionTon || 0), 0);
      const actual = machineReports.reduce((acc, r) => acc + (r.actualProductionTon || 0), 0);
      const ach = target > 0 ? Number(((actual / target) * 100).toFixed(1)) : 0;

      return {
        machine: mId,
        TargetTon: Number(target.toFixed(1)),
        AktualTon: Number(actual.toFixed(1)),
        PencapaianPersen: ach,
        JumlahShift: machineReports.length
      };
    });
  }, [filteredReports]);

  // Chart 2: Perbandingan Kualitas antar Mesin (% Grade A, B, C, Cacat)
  const qualityComparisonData = useMemo(() => {
    const machines: MachineId[] = ['PM1', 'PM2', 'PM5'];
    return machines.map(mId => {
      const mReports = filteredReports.filter(r => r.machine === mId);
      const gradeA = mReports.reduce((acc, r) => acc + (r.qualityGradeA_Ton || 0), 0);
      const gradeB = mReports.reduce((acc, r) => acc + (r.qualityGradeB_Ton || 0), 0);
      const gradeC = mReports.reduce((acc, r) => acc + (r.qualityGradeC_Ton || 0), 0);
      const defect = mReports.reduce((acc, r) => acc + (r.qualityGradeDefect_Ton || 0), 0);
      const total = gradeA + gradeB + gradeC + defect;

      return {
        machine: mId,
        GradeA: Number(gradeA.toFixed(1)),
        GradeB: Number(gradeB.toFixed(1)),
        GradeC: Number(gradeC.toFixed(1)),
        CacatReject: Number(defect.toFixed(1)),
        GradeAPersen: total > 0 ? Number(((gradeA / total) * 100).toFixed(1)) : 0,
        CacatPersen: total > 0 ? Number(((defect / total) * 100).toFixed(2)) : 0
      };
    });
  }, [filteredReports]);

  // Chart 3: Tren Pencapaian Harian & Shift (Chronological sorted)
  const trendData = useMemo(() => {
    // Sort ascending by date and shift
    const sorted = [...filteredReports].sort((a, b) => {
      const dComp = a.date.localeCompare(b.date);
      if (dComp !== 0) return dComp;
      const shiftOrder: Record<string, number> = {
        'Shift 1': 1,
        'Shift 2': 2,
        'Shift 3': 3,
        Pagi: 1,
        Siang: 2,
        Malam: 3
      };
      return (shiftOrder[a.shift] || 0) - (shiftOrder[b.shift] || 0);
    });

    return sorted.map(r => {
      const shiftCode = r.shift.replace('Shift ', 'S');
      return {
        label: `${r.date.slice(5)} (${shiftCode}-${r.machine})`,
        target: r.targetProductionTon,
        aktual: r.actualProductionTon,
        persentase: r.achievementPercentage,
        downtime: r.totalDowntimeMinutes,
        operator: r.operatorName
      };
    });
  }, [filteredReports]);

  // Downtime breakdown by process location
  const downtimeByLocation = useMemo(() => {
    const map: Record<string, number> = {};
    filteredReports.forEach(r => {
      r.incidents?.forEach(inc => {
        const loc = inc.location || 'Lainnya';
        map[loc] = (map[loc] || 0) + (inc.downtimeMinutes || 0);
      });
    });

    return Object.entries(map)
      .map(([location, minutes]) => ({ location, minutes }))
      .sort((a, b) => b.minutes - a.minutes);
  }, [filteredReports]);

  // Production aggregation by PM Jumbo Roll product
  const productionByProduct = useMemo(() => {
    const map: Record<string, {
      productName: string;
      productCode: string;
      rawMaterial: string;
      targetGsm: number;
      gsmTolerance: string;
      machine: string;
      totalTon: number;
      reels: number;
      reportsCount: number;
      gradeATon: number;
      defectTon: number;
    }> = {};

    filteredReports.forEach(r => {
      const prod = findProductByCodeOrName(r.productCode || r.paperGradeCode);
      const key = r.productCode || prod?.kodeBarang || r.paperGradeCode;
      const name = r.productItemName || prod?.itemBarang || r.paperGradeCode;
      const code = r.productCode || prod?.kodeBarang || '-';
      const raw = r.rawMaterial || prod?.bahanBaku || 'HVS';
      const gsm = r.targetGsm || prod?.gsm || 0;
      const tol = r.gsmTolerance || prod?.gsmTolerance || '';

      if (!map[key]) {
        map[key] = {
          productName: name,
          productCode: code,
          rawMaterial: raw,
          targetGsm: gsm,
          gsmTolerance: tol,
          machine: r.machine,
          totalTon: 0,
          reels: 0,
          reportsCount: 0,
          gradeATon: 0,
          defectTon: 0
        };
      }
      map[key].totalTon += (r.actualProductionTon || 0);
      map[key].reels += (r.reelCount || 0);
      map[key].reportsCount += 1;
      map[key].gradeATon += (r.qualityGradeA_Ton || 0);
      map[key].defectTon += (r.qualityGradeDefect_Ton || 0);
    });

    return Object.values(map).sort((a, b) => b.totalTon - a.totalTon);
  }, [filteredReports]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Top Filter & Summary Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 shadow-sm">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-400" />
            Dashboard Grafik & Analisis Kinerja Shift
          </h1>
          <p className="text-xs text-slate-400">
            Monitoring produksi vs target, evaluasi kualitas kertas, dan catatan downtime mesin PM1, PM2, PM5.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-700/80 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400 font-medium">Mesin:</span>
            <select
              value={selectedMachineFilter}
              onChange={(e) => setSelectedMachineFilter(e.target.value as 'ALL' | MachineId)}
              className="bg-transparent text-slate-100 font-bold focus:outline-none cursor-pointer"
            >
              <option value="ALL" className="bg-slate-900">Semua Mesin (PM1, PM2, PM5)</option>
              <option value="PM1" className="bg-slate-900">PM1 (Medium Paper)</option>
              <option value="PM2" className="bg-slate-900">PM2 (High ECT / Kraft)</option>
              <option value="PM5" className="bg-slate-900">PM5 (White Top Kraft)</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-700/80 text-xs">
            <span className="text-slate-400 font-medium">Shift:</span>
            <select
              value={selectedShiftFilter}
              onChange={(e) => setSelectedShiftFilter(e.target.value)}
              className="bg-transparent text-slate-100 font-bold focus:outline-none cursor-pointer"
            >
              <option value="ALL" className="bg-slate-900">Semua Shift</option>
              <option value="Shift 1" className="bg-slate-900">Shift 1</option>
              <option value="Shift 2" className="bg-slate-900">Shift 2</option>
              <option value="Shift 3" className="bg-slate-900">Shift 3</option>
            </select>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* KARTU RINGKASAN: HIGHLIGHT SHIFT HARI INI                                 */}
      {/* ========================================================================= */}
      <section 
        aria-label="Highlight Shift Hari Ini"
        className="relative overflow-hidden rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 p-5 sm:p-6 shadow-xl shadow-emerald-950/20 backdrop-blur-sm"
      >
        {/* Subtle Ambient Glowing Spheres */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Section */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-4 border-b border-slate-800/90">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span>MONITORING REAL-TIME SHIFT</span>
              </span>
              <span className="text-xs text-slate-400 font-medium">
                PT. Panca Usahatama Paramita
              </span>
            </div>

            <h2 className="text-lg sm:text-2xl font-black text-white flex items-center gap-2.5 tracking-tight">
              <Calendar className="w-6 h-6 text-emerald-400 shrink-0" />
              <span>Highlight Shift Hari Ini</span>
              <span className="text-xs sm:text-sm font-semibold text-emerald-400/90 font-mono bg-emerald-950/60 px-2.5 py-0.5 rounded-lg border border-emerald-800/60">
                {formattedHighlightDate}
              </span>
            </h2>
          </div>

          {/* Quick Date Control & New Report Button */}
          <div className="flex items-center gap-2 flex-wrap">
            {availableReportDates.length > 1 && (
              <div className="flex items-center gap-1.5 bg-slate-950/90 px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-300 shadow-inner">
                <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="text-[11px] text-slate-400 font-medium">Tanggal:</span>
                <select
                  value={activeHighlightDate}
                  onChange={(e) => setHighlightDate(e.target.value)}
                  className="bg-transparent text-emerald-300 font-bold text-xs focus:outline-none cursor-pointer"
                >
                  <option value={todayStr} className="bg-slate-900">
                    Hari Ini ({todayStr})
                  </option>
                  {availableReportDates
                    .filter(d => d !== todayStr)
                    .map(d => (
                      <option key={d} value={d} className="bg-slate-900">
                        {d} ({reports.filter(r => r.date === d).length} Laporan)
                      </option>
                    ))}
                </select>
              </div>
            )}

            {activeHighlightDate !== todayStr && (
              <button
                type="button"
                onClick={() => setHighlightDate(todayStr)}
                className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
                title="Kembali ke tanggal hari ini"
              >
                Hari Ini
              </button>
            )}

            {onNavigateToForm && (
              <button
                type="button"
                onClick={onNavigateToForm}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl transition-all shadow-md shadow-emerald-950/50 hover:scale-[1.02]"
              >
                <PlusCircle className="w-4 h-4 stroke-[2.5]" />
                <span>+ Input Laporan Shift</span>
              </button>
            )}
          </div>
        </div>

        {/* 3 Main Highlights Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 mt-5">
          
          {/* 1. TOTAL PRODUKSI HARI INI */}
          <div className="bg-slate-950/85 border border-slate-800/90 hover:border-emerald-500/50 rounded-xl p-4 transition-all flex flex-col justify-between group shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-emerald-300 transition-colors">
                  Total Produksi Hari Ini
                </span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 tracking-tight">
                    {todayHighlightMetrics.totalActualTon.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                  </span>
                  <span className="text-sm font-bold text-slate-400 font-mono">Ton</span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-950/70 border border-emerald-600/40 text-emerald-400 group-hover:scale-110 transition-transform shrink-0">
                <Layers className="w-5 h-5" />
              </div>
            </div>

            <div className="mt-3.5 pt-2.5 border-t border-slate-800/80 text-[11px] text-slate-400 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span>Target Shift Hari Ini:</span>
                <span className="font-mono font-bold text-slate-200">{todayHighlightMetrics.totalTargetTon} Ton</span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <span>Berat Bersih (Netto):</span>
                <span className="font-mono text-slate-400">
                  ~{todayHighlightMetrics.netWeightKg.toLocaleString('id-ID')} Kg ({todayHighlightMetrics.totalReels} Roll)
                </span>
              </div>
            </div>
          </div>

          {/* 2. EFISIENSI RATA-RATA */}
          <div className="bg-slate-950/85 border border-slate-800/90 hover:border-blue-500/50 rounded-xl p-4 transition-all flex flex-col justify-between group shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-blue-300 transition-colors">
                  Efisiensi Rata-rata
                </span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className={`text-2xl sm:text-3xl font-black font-mono tracking-tight ${
                    todayHighlightMetrics.avgEfficiency >= 100 
                      ? 'text-emerald-400' 
                      : todayHighlightMetrics.avgEfficiency >= 95 
                      ? 'text-blue-400' 
                      : todayHighlightMetrics.avgEfficiency > 0 
                      ? 'text-amber-400' 
                      : 'text-slate-500'
                  }`}>
                    {todayHighlightMetrics.avgEfficiency}%
                  </span>
                  {todayHighlightMetrics.avgEfficiency > 0 && (
                    <span className="text-xs text-slate-400 font-semibold font-mono">
                      {todayHighlightMetrics.avgEfficiency >= 100 ? '▲ Melampaui' : '● Standar'}
                    </span>
                  )}
                </div>
              </div>
              <div className={`p-2.5 rounded-xl border group-hover:scale-110 transition-transform shrink-0 ${
                todayHighlightMetrics.avgEfficiency >= 100
                  ? 'bg-emerald-950/70 border-emerald-600/40 text-emerald-400'
                  : todayHighlightMetrics.avgEfficiency >= 95
                  ? 'bg-blue-950/70 border-blue-600/40 text-blue-400'
                  : 'bg-amber-950/70 border-amber-600/40 text-amber-400'
              }`}>
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>

            <div className="mt-3.5 pt-2.5 border-t border-slate-800/80 text-[11px] text-slate-400 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span>Evaluasi Kinerja:</span>
                <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                  todayHighlightMetrics.avgEfficiency >= 100
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : todayHighlightMetrics.avgEfficiency >= 95
                    ? 'bg-blue-950 text-blue-300 border border-blue-800'
                    : todayHighlightMetrics.avgEfficiency > 0
                    ? 'bg-amber-950 text-amber-300 border border-amber-800'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {todayHighlightMetrics.avgEfficiency >= 100
                    ? '✓ Target Tercapai'
                    : todayHighlightMetrics.avgEfficiency >= 95
                    ? '✓ Optimal Standar'
                    : todayHighlightMetrics.avgEfficiency > 0
                    ? '⚠ Perlu Evaluasi'
                    : 'Belum Ada Shift'}
                </span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <span>Total Downtime Hari Ini:</span>
                <span className="font-mono text-amber-400 font-semibold">{todayHighlightMetrics.totalDowntime} Menit</span>
              </div>
            </div>
          </div>

          {/* 3. JUMLAH LAPORAN YANG MASUK */}
          <div className="bg-slate-950/85 border border-slate-800/90 hover:border-amber-500/50 rounded-xl p-4 transition-all flex flex-col justify-between group shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-amber-300 transition-colors">
                  Jumlah Laporan yang Masuk
                </span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-amber-300 tracking-tight">
                    {todayHighlightMetrics.totalReportsCount}
                  </span>
                  <span className="text-sm font-bold text-slate-400">Laporan Masuk</span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-950/70 border border-amber-600/40 text-amber-400 group-hover:scale-110 transition-transform shrink-0">
                <FileText className="w-5 h-5" />
              </div>
            </div>

            <div className="mt-3.5 pt-2.5 border-t border-slate-800/80 text-[11px] text-slate-400 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span>Status Shift Hari Ini:</span>
                <div className="flex items-center gap-1.5 font-mono text-[10px]">
                  <span className={`px-1.5 py-0.5 rounded ${todayHighlightMetrics.shift1Count > 0 ? 'bg-blue-950 text-blue-300 border border-blue-800 font-bold' : 'bg-slate-900 text-slate-600'}`}>
                    S1: {todayHighlightMetrics.shift1Count}
                  </span>
                  <span className={`px-1.5 py-0.5 rounded ${todayHighlightMetrics.shift2Count > 0 ? 'bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold' : 'bg-slate-900 text-slate-600'}`}>
                    S2: {todayHighlightMetrics.shift2Count}
                  </span>
                  <span className={`px-1.5 py-0.5 rounded ${todayHighlightMetrics.shift3Count > 0 ? 'bg-indigo-950 text-indigo-300 border border-indigo-800 font-bold' : 'bg-slate-900 text-slate-600'}`}>
                    S3: {todayHighlightMetrics.shift3Count}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <span>Kualitas Grade A Hari Ini:</span>
                <span className="font-mono text-emerald-400 font-bold">{todayHighlightMetrics.gradeAPercent}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Unit PM Breakdown Strip */}
        <div className="relative z-10 mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Realisasi per Unit PM ({activeHighlightDate === todayStr ? 'Hari Ini' : activeHighlightDate}):</span>
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono">
                <span className="text-slate-400">PM1:</span> <strong className="text-emerald-400">{todayHighlightMetrics.pm1Ton} Ton</strong>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono">
                <span className="text-slate-400">PM2:</span> <strong className="text-cyan-400">{todayHighlightMetrics.pm2Ton} Ton</strong>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono">
                <span className="text-slate-400">PM5:</span> <strong className="text-amber-400">{todayHighlightMetrics.pm5Ton} Ton</strong>
              </span>
            </div>
          </div>

          {todayHighlightMetrics.totalReportsCount === 0 && (
            <div className="flex items-center gap-2 text-amber-400 text-xs bg-amber-950/40 px-3 py-1.5 rounded-lg border border-amber-800/60">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Belum ada laporan shift yang masuk untuk {activeHighlightDate === todayStr ? 'hari ini' : activeHighlightDate}.</span>
              {availableReportDates.length > 0 && availableReportDates[0] !== activeHighlightDate && (
                <button
                  type="button"
                  onClick={() => setHighlightDate(availableReportDates[0])}
                  className="underline hover:text-amber-300 font-bold ml-1 cursor-pointer"
                >
                  Lihat tanggal {availableReportDates[0]}
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* KPI Highlight Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: Total Tonase Produksi */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Total Produksi Aktual</span>
            <span className="p-1.5 bg-blue-950/80 border border-blue-700/50 rounded-lg text-blue-400">
              <Layers className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-bold font-mono text-white">
              {kpiMetrics.totalActualTon.toLocaleString('id-ID')}
            </span>
            <span className="text-xs text-slate-400 font-medium">Ton</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            Target gabungan: {kpiMetrics.totalTargetTon} Ton &bull; {kpiMetrics.totalReels} Roll
          </div>
        </div>

        {/* Card 2: Rata-rata Pencapaian Target (%) */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Pencapaian Target</span>
            <span className={`p-1.5 rounded-lg border ${
              kpiMetrics.avgAchievement >= 100 
                ? 'bg-emerald-950/80 border-emerald-700/50 text-emerald-400' 
                : 'bg-blue-950/80 border-blue-700/50 text-blue-400'
            }`}>
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className={`text-xl sm:text-2xl font-bold font-mono ${
              kpiMetrics.avgAchievement >= 100 ? 'text-emerald-400' : 'text-blue-400'
            }`}>
              {kpiMetrics.avgAchievement}%
            </span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            {kpiMetrics.avgAchievement >= 100 ? 'Memenuhi target pabrik' : 'Dibawah target nominal'}
          </div>
        </div>

        {/* Card 3: Tingkat Kualitas Grade A */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Kualitas Grade A</span>
            <span className="p-1.5 bg-emerald-950/80 border border-emerald-700/50 rounded-lg text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-300">
              {kpiMetrics.gradeAPercentage}%
            </span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            Defect / Cacat: <span className="text-rose-400 font-bold">{kpiMetrics.avgDefectRate}%</span>
          </div>
        </div>

        {/* Card 4: Total Downtime (Waktu Terhenti) */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Total Waktu Terhenti</span>
            <span className="p-1.5 bg-amber-950/80 border border-amber-700/50 rounded-lg text-amber-400">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-bold font-mono text-amber-400">
              {kpiMetrics.totalDowntime}
            </span>
            <span className="text-xs text-slate-400 font-medium">Menit</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            Setara {(kpiMetrics.totalDowntime / 60).toFixed(1)} Jam terganggu
          </div>
        </div>
      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* CHART 1: PRODUKSI AKTUAL VS TARGET PER MESIN */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                Pencapaian Produksi vs Target per Mesin
              </h2>
              <p className="text-[11px] text-slate-400">
                Perbandingan tonase target vs realisasi aktual (PM1, PM2, PM5)
              </p>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productionByMachineData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="machine" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  labelStyle={{ color: '#f8fafc', fontWeight: 'bold' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                <Bar dataKey="TargetTon" name="Target (Ton)" fill="#475569" radius={[4, 4, 0, 0]} />
                <Bar dataKey="AktualTon" name="Aktual (Ton)" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Mini Legend & Summary */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-xs">
            {productionByMachineData.map((item) => (
              <div key={item.machine} className="bg-slate-950 p-2 rounded-lg text-center border border-slate-800">
                <div className="font-bold text-slate-200">{item.machine}</div>
                <div className="text-[11px] text-emerald-400 font-mono font-bold mt-0.5">
                  {item.PencapaianPersen}%
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  {item.AktualTon} / {item.TargetTon} T
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CHART 2: PERBANDINGAN KUALITAS ANTAR MESIN */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                Perbandingan Kualitas Produk Antar Mesin (Ton)
              </h2>
              <p className="text-[11px] text-slate-400">
                Distribusi kualitas Grade A, Grade B, Grade C, dan Cacat Reject
              </p>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={qualityComparisonData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="machine" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  labelStyle={{ color: '#f8fafc', fontWeight: 'bold' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                <Bar dataKey="GradeA" name="Grade A" fill="#059669" stackId="a" />
                <Bar dataKey="GradeB" name="Grade B" fill="#0284c7" stackId="a" />
                <Bar dataKey="GradeC" name="Grade C" fill="#d97706" stackId="a" />
                <Bar dataKey="CacatReject" name="Cacat" fill="#e11d48" stackId="a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-xs">
            {qualityComparisonData.map((item) => (
              <div key={item.machine} className="bg-slate-950 p-2 rounded-lg text-center border border-slate-800">
                <div className="font-bold text-slate-200">{item.machine}</div>
                <div className="text-[11px] text-emerald-400 font-mono font-bold mt-0.5">
                  A: {item.GradeAPersen}%
                </div>
                <div className="text-[10px] text-rose-400 mt-0.5 font-medium">
                  Cacat: {item.CacatPersen}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CHART 3: TREN PENCAPAIAN PRODUKSI HARIAN / SHIFT */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-3 lg:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                Tren Pencapaian Produksi (% Target) Tiap Shift
              </h2>
              <p className="text-[11px] text-slate-400">
                Garis acuan standar pabrik 100% &bull; Riwayat performa kronologis
              </p>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAch" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="label" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11 }} domain={[70, 120]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(val: any) => [`${val}%`, 'Pencapaian']}
                />
                <ReferenceLine y={100} stroke="#10b981" strokeDasharray="3 3" label={{ value: 'Target 100%', fill: '#10b981', fontSize: 11, position: 'right' }} />
                <Area type="monotone" dataKey="persentase" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorAch)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SECTION 4: DISTRIBUSI DOWNTIME PER BAGIAN PROSES */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-3 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Distribusi Waktu Terhenti (Downtime) Berdasarkan Lokasi Proses
              </h2>
              <p className="text-[11px] text-slate-400">
                Identifikasi area yang paling sering mengalami kendala teknis
              </p>
            </div>
            <span className="text-xs text-amber-400 font-bold bg-amber-950/70 border border-amber-800/50 px-2.5 py-1 rounded">
              Total: {kpiMetrics.totalDowntime} Menit
            </span>
          </div>

          {downtimeByLocation.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
              {downtimeByLocation.map((item, idx) => (
                <div key={idx} className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-200 block">{item.location}</span>
                    <span className="text-[11px] text-slate-400">
                      {((item.minutes / (kpiMetrics.totalDowntime || 1)) * 100).toFixed(0)}% dari total downtime
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-sm text-amber-400">{item.minutes}</span>
                    <span className="text-[10px] text-slate-500 block">Menit</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-slate-500 bg-slate-950/40 rounded-lg">
              Tidak ada catatan downtime pada periode / filter yang dipilih.
            </div>
          )}
        </div>

        {/* SECTION 5: DISTRIBUSI & AKUMULASI PRODUKSI BERDASARKAN PRODUK PM JUMBO ROLL */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-3 lg:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                Akumulasi Produksi Berdasarkan Produk Jumbo Roll (PM Master Data PT. PUP)
              </h2>
              <p className="text-[11px] text-slate-400">
                Pemetaan tonase riil, roll count, dan persentase kualitas Grade A per item kode barang PM.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setCatalogMachine(selectedMachineFilter === 'ALL' ? 'PM1' : selectedMachineFilter);
                setShowCatalogModal(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-amber-950/80 hover:bg-amber-900 text-amber-300 border border-amber-600/50 rounded-lg transition-colors self-start sm:self-auto"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Buka Katalog Standar PM</span>
            </button>
          </div>

          {productionByProduct.length > 0 ? (
            <div className="overflow-x-auto pt-1">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase text-[10px]">
                    <th className="py-2.5 px-3">Kode Barang</th>
                    <th className="py-2.5 px-3">Item Produk</th>
                    <th className="py-2.5 px-3">Mesin</th>
                    <th className="py-2.5 px-3">Bahan Baku</th>
                    <th className="py-2.5 px-3">Target GSM</th>
                    <th className="py-2.5 px-3 text-right">Laporan</th>
                    <th className="py-2.5 px-3 text-right">Total Reel</th>
                    <th className="py-2.5 px-3 text-right">Produksi Aktual</th>
                    <th className="py-2.5 px-3 text-right">Grade A</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {productionByProduct.map((p, idx) => {
                    const gradeAPct = p.totalTon > 0 ? ((p.gradeATon / p.totalTon) * 100).toFixed(1) : '0';
                    return (
                      <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-2.5 px-3 font-mono font-bold text-amber-300">
                          {p.productCode}
                        </td>
                        <td className="py-2.5 px-3 font-semibold text-slate-100">
                          {p.productName}
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="px-2 py-0.5 bg-blue-950 text-blue-300 border border-blue-800/60 rounded text-[10px] font-mono font-bold">
                            {p.machine}
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                            p.rawMaterial === 'HVS'
                              ? 'bg-blue-950/60 border-blue-700/50 text-blue-300'
                              : 'bg-emerald-950/60 border-emerald-700/50 text-emerald-300'
                          }`}>
                            {p.rawMaterial}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-mono text-slate-300">
                          {p.targetGsm ? `${p.targetGsm} ${p.gsmTolerance}` : '-'}
                        </td>
                        <td className="py-2.5 px-3 text-right text-slate-400 font-mono">
                          {p.reportsCount}x
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono text-slate-200">
                          {p.reels} Roll
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-400">
                          {p.totalTon.toFixed(1)} Ton
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono font-semibold text-cyan-300">
                          {gradeAPct}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-slate-500 bg-slate-950/40 rounded-lg">
              Tidak ada data produk pada filter yang dipilih.
            </div>
          )}
        </div>

      </div>

      {/* Catalog Modal */}
      <PmProductsModal
        isOpen={showCatalogModal}
        onClose={() => setShowCatalogModal(false)}
        initialMachine={catalogMachine}
      />

    </div>
  );
};

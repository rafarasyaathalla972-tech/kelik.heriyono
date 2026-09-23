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
  Zap,
  Award,
  Activity,
  TrendingDown,
  Minus,
  Info,
  ChevronDown,
  ChevronUp,
  Table
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

  // =========================================================================
  // ANALISIS STATISTIK TREN EFISIENSI PRODUKSI PER SHIFT (7 HARI TERAKHIR)
  // =========================================================================
  const [statMachineFilter, setStatMachineFilter] = useState<'ALL' | MachineId>('ALL');
  const [showStatTable, setShowStatTable] = useState<boolean>(true);

  const sevenDayShiftStats = useMemo(() => {
    // 1. Tentukan tanggal acuan (anchor date): tanggal laporan terbaru atau hari ini
    const reportDates = reports.map(r => r.date).filter(Boolean);
    const maxReportDate = reportDates.length > 0 
      ? reportDates.reduce((max, d) => (d > max ? d : max), todayStr)
      : todayStr;
    const anchorDate = maxReportDate > todayStr ? maxReportDate : todayStr;

    // 2. Bentuk daftar 7 hari kalender berurutan (dari 6 hari lalu sampai anchorDate)
    const [year, month, day] = anchorDate.split('-').map(Number);
    const baseDate = new Date(year, month - 1, day);
    
    const datesList: string[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(baseDate);
      d.setDate(d.getDate() - i);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      datesList.push(`${yyyy}-${mm}-${dd}`);
    }

    const dayNamesShort = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    const monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

    // 3. Filter laporan berdasarkan mesin jika dipilih
    const eligibleReports = reports.filter(r => {
      if (statMachineFilter !== 'ALL' && r.machine !== statMachineFilter) return false;
      return true;
    });

    // 4. Hitung efisiensi per shift untuk tiap tanggal
    interface DayShiftData {
      date: string;
      displayDate: string;
      fullDateLabel: string;
      'Shift 1': number | null;
      'Shift 2': number | null;
      'Shift 3': number | null;
      shift1Actual: number;
      shift1Target: number;
      shift1Count: number;
      shift2Actual: number;
      shift2Target: number;
      shift2Count: number;
      shift3Actual: number;
      shift3Target: number;
      shift3Count: number;
      totalActual: number;
      totalTarget: number;
      overallEfficiency: number | null;
    }

    const chartData: DayShiftData[] = datesList.map(dateStr => {
      const [dY, dM, dD] = dateStr.split('-').map(Number);
      const dObj = new Date(dY, dM - 1, dD);
      const dayName = dayNamesShort[dObj.getDay()];
      const monthName = monthNamesShort[dM - 1];
      const displayDate = `${dayName} ${dD}/${dM}`;
      const fullDateLabel = `${dayName}, ${dD} ${monthName} ${dY}`;

      const dayReports = eligibleReports.filter(r => r.date === dateStr);

      const calcShift = (shiftName: 'Shift 1' | 'Shift 2' | 'Shift 3') => {
        const matching = dayReports.filter(r => {
          let s = r.shift;
          if (s === 'Pagi') s = 'Shift 1';
          if (s === 'Siang') s = 'Shift 2';
          if (s === 'Malam') s = 'Shift 3';
          return s === shiftName;
        });
        if (matching.length === 0) {
          return { eff: null, actual: 0, target: 0, count: 0 };
        }
        const actual = matching.reduce((acc, r) => acc + (r.actualProductionTon || 0), 0);
        const target = matching.reduce((acc, r) => acc + (r.targetProductionTon || 0), 0);
        const eff = target > 0 ? Number(((actual / target) * 100).toFixed(1)) : 0;
        return { eff, actual: Number(actual.toFixed(2)), target: Number(target.toFixed(2)), count: matching.length };
      };

      const s1 = calcShift('Shift 1');
      const s2 = calcShift('Shift 2');
      const s3 = calcShift('Shift 3');

      const dayTotalActual = Number((s1.actual + s2.actual + s3.actual).toFixed(2));
      const dayTotalTarget = Number((s1.target + s2.target + s3.target).toFixed(2));
      const overallEff = dayTotalTarget > 0 
        ? Number(((dayTotalActual / dayTotalTarget) * 100).toFixed(1)) 
        : null;

      return {
        date: dateStr,
        displayDate,
        fullDateLabel,
        'Shift 1': s1.eff,
        'Shift 2': s2.eff,
        'Shift 3': s3.eff,
        shift1Actual: s1.actual,
        shift1Target: s1.target,
        shift1Count: s1.count,
        shift2Actual: s2.actual,
        shift2Target: s2.target,
        shift2Count: s2.count,
        shift3Actual: s3.actual,
        shift3Target: s3.target,
        shift3Count: s3.count,
        totalActual: dayTotalActual,
        totalTarget: dayTotalTarget,
        overallEfficiency: overallEff
      };
    });

    // 5. Analisis Statistik Tiap Shift selama 7 Hari
    const getShiftMetrics = (shiftKey: 'Shift 1' | 'Shift 2' | 'Shift 3') => {
      const values: number[] = [];
      let totalActualTon = 0;
      let totalTargetTon = 0;
      let totalReportsCount = 0;

      chartData.forEach(d => {
        const val = d[shiftKey];
        if (val !== null && typeof val === 'number') {
          values.push(val);
        }
        if (shiftKey === 'Shift 1') {
          totalActualTon += d.shift1Actual;
          totalTargetTon += d.shift1Target;
          totalReportsCount += d.shift1Count;
        } else if (shiftKey === 'Shift 2') {
          totalActualTon += d.shift2Actual;
          totalTargetTon += d.shift2Target;
          totalReportsCount += d.shift2Count;
        } else {
          totalActualTon += d.shift3Actual;
          totalTargetTon += d.shift3Target;
          totalReportsCount += d.shift3Count;
        }
      });

      if (values.length === 0) {
        return {
          avg: 0,
          min: 0,
          max: 0,
          stdDev: 0,
          count: 0,
          totalActualTon: 0,
          totalTargetTon: 0,
          totalReportsCount: 0,
          status: 'Belum Ada Data'
        };
      }

      const sum = values.reduce((acc, v) => acc + v, 0);
      const avg = Number((sum / values.length).toFixed(1));
      const min = Math.min(...values);
      const max = Math.max(...values);

      // Standar Deviasi (Mengukur Variabilitas dan Konsistensi Shift)
      const variance = values.reduce((acc, v) => acc + Math.pow(v - avg, 2), 0) / values.length;
      const stdDev = Number(Math.sqrt(variance).toFixed(2));

      return {
        avg,
        min,
        max,
        stdDev,
        count: values.length,
        totalActualTon: Number(totalActualTon.toFixed(2)),
        totalTargetTon: Number(totalTargetTon.toFixed(2)),
        totalReportsCount,
        status: avg >= 100 ? 'Melampaui Target' : avg >= 95 ? 'Optimal Standar' : 'Perlu Evaluasi'
      };
    };

    const s1Metrics = getShiftMetrics('Shift 1');
    const s2Metrics = getShiftMetrics('Shift 2');
    const s3Metrics = getShiftMetrics('Shift 3');

    // 6. Rata-rata Gabungan 7 Hari (Semua Shift)
    const validOverallEffs = chartData.map(d => d.overallEfficiency).filter((v): v is number => v !== null);
    const overall7DayAvg = validOverallEffs.length > 0 
      ? Number((validOverallEffs.reduce((a, b) => a + b, 0) / validOverallEffs.length).toFixed(1))
      : 0;

    // 7. Penentuan Shift Terbaik
    const shiftsComparison = [
      { name: 'Shift 1 (Pagi)', shiftKey: 'Shift 1' as const, metrics: s1Metrics, color: '#3b82f6', badgeBg: 'bg-blue-950 text-blue-300 border-blue-800' },
      { name: 'Shift 2 (Siang)', shiftKey: 'Shift 2' as const, metrics: s2Metrics, color: '#06b6d4', badgeBg: 'bg-cyan-950 text-cyan-300 border-cyan-800' },
      { name: 'Shift 3 (Malam)', shiftKey: 'Shift 3' as const, metrics: s3Metrics, color: '#f59e0b', badgeBg: 'bg-amber-950 text-amber-300 border-amber-800' }
    ].sort((a, b) => b.metrics.avg - a.metrics.avg);

    const bestShift = shiftsComparison[0];

    // 8. Penentuan Shift Paling Stabil (Deviasi Standar Terendah)
    const shiftsByStability = [...shiftsComparison]
      .filter(s => s.metrics.count > 1)
      .sort((a, b) => a.metrics.stdDev - b.metrics.stdDev);
    const mostConsistentShift = shiftsByStability.length > 0 ? shiftsByStability[0] : shiftsComparison[0];

    // 9. Rekor Puncak & Terendah Selama 7 Hari
    let peakRecord: { date: string; shift: string; value: number } | null = null;
    let lowestRecord: { date: string; shift: string; value: number } | null = null;

    chartData.forEach(d => {
      (['Shift 1', 'Shift 2', 'Shift 3'] as const).forEach(s => {
        const val = d[s];
        if (val !== null) {
          if (!peakRecord || val > peakRecord.value) {
            peakRecord = { date: d.displayDate, shift: s, value: val };
          }
          if (!lowestRecord || val < lowestRecord.value) {
            lowestRecord = { date: d.displayDate, shift: s, value: val };
          }
        }
      });
    });

    // 10. Arah Tren Efisiensi (3 Hari Pertama vs 3 Hari Terakhir)
    let trendDirection: 'NAIK' | 'TURUN' | 'STABIL' = 'STABIL';
    let trendDelta = 0;
    if (chartData.length >= 6) {
      const firstHalf = chartData.slice(0, 3).map(d => d.overallEfficiency).filter((v): v is number => v !== null);
      const secondHalf = chartData.slice(-3).map(d => d.overallEfficiency).filter((v): v is number => v !== null);
      if (firstHalf.length > 0 && secondHalf.length > 0) {
        const avgFirst = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
        const avgSecond = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
        trendDelta = Number((avgSecond - avgFirst).toFixed(1));
        if (trendDelta >= 1.0) trendDirection = 'NAIK';
        else if (trendDelta <= -1.0) trendDirection = 'TURUN';
        else trendDirection = 'STABIL';
      }
    }

    return {
      chartData,
      datesList,
      s1Metrics,
      s2Metrics,
      s3Metrics,
      overall7DayAvg,
      bestShift,
      mostConsistentShift,
      peakRecord,
      lowestRecord,
      trendDirection,
      trendDelta,
      totalReportsIn7Days: eligibleReports.filter(r => datesList.includes(r.date)).length
    };
  }, [reports, todayStr, statMachineFilter]);

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
        
        {/* ========================================================================= */}
        {/* FITUR ANALISIS STATISTIK TREN EFISIENSI PER SHIFT (7 HARI TERAKHIR)       */}
        {/* ========================================================================= */}
        <div className="bg-slate-900/95 border border-blue-900/50 hover:border-blue-500/50 rounded-2xl p-4 sm:p-6 shadow-md space-y-5 lg:col-span-2 transition-all">
          {/* Section Header with Title & Machine Filter Buttons */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between pb-4 border-b border-slate-800 gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="p-1.5 bg-blue-950/80 border border-blue-600/50 rounded-lg text-blue-400">
                  <Activity className="w-5 h-5" />
                </span>
                <h2 className="text-base sm:text-lg font-extrabold text-white tracking-wide">
                  Analisis Statistik Tren Efisiensi Produksi per Shift (7 Hari Terakhir)
                </h2>
                <span className="hidden sm:inline-block bg-blue-950 text-blue-300 border border-blue-700/60 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  Grafik Batang Berkelompok
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Perbandingan efisiensi Shift 1 (Pagi), Shift 2 (Siang), dan Shift 3 (Malam) terhadap target standar 100% (2 Ton/shift)
              </p>
            </div>

            {/* Filter Unit Mesin Kertas PM */}
            <div className="flex items-center gap-1.5 flex-wrap self-start lg:self-auto">
              <span className="text-[11px] font-semibold text-slate-400 mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3 text-blue-400" /> Unit:
              </span>
              <button
                type="button"
                onClick={() => setStatMachineFilter('ALL')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  statMachineFilter === 'ALL'
                    ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-400'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                Semua PM (Gabungan)
              </button>
              <button
                type="button"
                onClick={() => setStatMachineFilter('PM1')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  statMachineFilter === 'PM1'
                    ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-400'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                PM1 (2,20 M)
              </button>
              <button
                type="button"
                onClick={() => setStatMachineFilter('PM2')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  statMachineFilter === 'PM2'
                    ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-400'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                PM2 (2,25 M)
              </button>
              <button
                type="button"
                onClick={() => setStatMachineFilter('PM5')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  statMachineFilter === 'PM5'
                    ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-400'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                PM5 (3,30 M)
              </button>
            </div>
          </div>

          {/* 4 Statistical Summary Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {/* 1. Kinerja Shift 1 (Pagi) */}
            <div className="bg-slate-950/90 border border-slate-800 hover:border-blue-500/40 rounded-xl p-3.5 space-y-2 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  <span className="font-bold text-slate-200">Shift 1 (Pagi: 07-15)</span>
                </div>
                <span className="text-[10px] bg-blue-950 text-blue-300 border border-blue-800/60 px-1.5 py-0.2 rounded font-mono font-semibold">
                  {sevenDayShiftStats.s1Metrics.count} Hari Aktif
                </span>
              </div>
              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Rata-rata 7 Hari</span>
                  <span className={`text-2xl font-black font-mono ${
                    sevenDayShiftStats.s1Metrics.avg >= 100 ? 'text-emerald-400' : 'text-blue-400'
                  }`}>
                    {sevenDayShiftStats.s1Metrics.avg}%
                  </span>
                </div>
                <div className="text-right text-[11px]">
                  <span className="text-slate-400 block">Stabilitas (σ)</span>
                  <span className="font-mono font-bold text-slate-300">±{sevenDayShiftStats.s1Metrics.stdDev}%</span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>Rentang Nilai:</span>
                <span className="font-mono font-medium text-slate-300">
                  {sevenDayShiftStats.s1Metrics.min}% &bull; {sevenDayShiftStats.s1Metrics.max}%
                </span>
              </div>
            </div>

            {/* 2. Kinerja Shift 2 (Siang) */}
            <div className="bg-slate-950/90 border border-slate-800 hover:border-cyan-500/40 rounded-xl p-3.5 space-y-2 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                  <span className="font-bold text-slate-200">Shift 2 (Siang: 15-23)</span>
                </div>
                <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800/60 px-1.5 py-0.2 rounded font-mono font-semibold">
                  {sevenDayShiftStats.s2Metrics.count} Hari Aktif
                </span>
              </div>
              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Rata-rata 7 Hari</span>
                  <span className={`text-2xl font-black font-mono ${
                    sevenDayShiftStats.s2Metrics.avg >= 100 ? 'text-emerald-400' : 'text-cyan-400'
                  }`}>
                    {sevenDayShiftStats.s2Metrics.avg}%
                  </span>
                </div>
                <div className="text-right text-[11px]">
                  <span className="text-slate-400 block">Stabilitas (σ)</span>
                  <span className="font-mono font-bold text-slate-300">±{sevenDayShiftStats.s2Metrics.stdDev}%</span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>Rentang Nilai:</span>
                <span className="font-mono font-medium text-slate-300">
                  {sevenDayShiftStats.s2Metrics.min}% &bull; {sevenDayShiftStats.s2Metrics.max}%
                </span>
              </div>
            </div>

            {/* 3. Kinerja Shift 3 (Malam) */}
            <div className="bg-slate-950/90 border border-slate-800 hover:border-amber-500/40 rounded-xl p-3.5 space-y-2 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  <span className="font-bold text-slate-200">Shift 3 (Malam: 23-07)</span>
                </div>
                <span className="text-[10px] bg-amber-950 text-amber-300 border border-amber-800/60 px-1.5 py-0.2 rounded font-mono font-semibold">
                  {sevenDayShiftStats.s3Metrics.count} Hari Aktif
                </span>
              </div>
              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Rata-rata 7 Hari</span>
                  <span className={`text-2xl font-black font-mono ${
                    sevenDayShiftStats.s3Metrics.avg >= 100 
                      ? 'text-emerald-400' 
                      : sevenDayShiftStats.s3Metrics.avg >= 95 
                      ? 'text-amber-400' 
                      : 'text-rose-400'
                  }`}>
                    {sevenDayShiftStats.s3Metrics.avg}%
                  </span>
                </div>
                <div className="text-right text-[11px]">
                  <span className="text-slate-400 block">Stabilitas (σ)</span>
                  <span className="font-mono font-bold text-slate-300">±{sevenDayShiftStats.s3Metrics.stdDev}%</span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>Rentang Nilai:</span>
                <span className="font-mono font-medium text-slate-300">
                  {sevenDayShiftStats.s3Metrics.min}% &bull; {sevenDayShiftStats.s3Metrics.max}%
                </span>
              </div>
            </div>

            {/* 4. Highlight Statistik & Rekor Kinerja */}
            <div className="bg-gradient-to-br from-slate-950 to-indigo-950/40 border border-indigo-900/40 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-indigo-300 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-400" /> Highlight Statistik
                </span>
                <span className="text-[10px] bg-indigo-950 text-indigo-300 border border-indigo-800 px-1.5 py-0.2 rounded font-bold">
                  7 Hari
                </span>
              </div>
              <div className="space-y-1.5 pt-0.5 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Shift Terbaik:</span>
                  <span className="font-bold text-amber-300 font-mono">
                    {sevenDayShiftStats.bestShift.name} ({sevenDayShiftStats.bestShift.metrics.avg}%)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Shift Terkonsisten:</span>
                  <span className="font-bold text-cyan-300 font-mono">
                    {sevenDayShiftStats.mostConsistentShift.name} (σ ±{sevenDayShiftStats.mostConsistentShift.metrics.stdDev}%)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Arah Tren Efisiensi:</span>
                  <span className={`font-bold flex items-center gap-1 ${
                    sevenDayShiftStats.trendDirection === 'NAIK'
                      ? 'text-emerald-400'
                      : sevenDayShiftStats.trendDirection === 'TURUN'
                      ? 'text-rose-400'
                      : 'text-slate-300'
                  }`}>
                    {sevenDayShiftStats.trendDirection === 'NAIK' && <TrendingUp className="w-3 h-3 text-emerald-400" />}
                    {sevenDayShiftStats.trendDirection === 'TURUN' && <TrendingDown className="w-3 h-3 text-rose-400" />}
                    {sevenDayShiftStats.trendDirection === 'STABIL' && <Minus className="w-3 h-3 text-slate-400" />}
                    <span>{sevenDayShiftStats.trendDirection} ({sevenDayShiftStats.trendDelta > 0 ? `+${sevenDayShiftStats.trendDelta}%` : `${sevenDayShiftStats.trendDelta}%`})</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* THE GROUPED BAR CHART */}
          <div className="pt-2">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-xs">
              <div className="flex items-center gap-3 text-slate-300">
                <span className="font-bold text-slate-200 flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4 text-blue-400" />
                  Grafik Batang Efisiensi per Shift:
                </span>
                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  (Batas hijau putus-putus menunjukkan Target Standar 100%)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowStatTable(!showStatTable)}
                  className="px-2.5 py-1 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors flex items-center gap-1"
                >
                  <Table className="w-3.5 h-3.5 text-blue-400" />
                  <span>{showStatTable ? 'Sembunyikan Tabel' : 'Tampilkan Tabel Rincian'}</span>
                  {showStatTable ? <ChevronUp className="w-3 h-3 ml-0.5" /> : <ChevronDown className="w-3 h-3 ml-0.5" />}
                </button>
              </div>
            </div>

            <div className="h-72 sm:h-80 w-full bg-slate-950/60 p-2 sm:p-3 rounded-xl border border-slate-800/80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={sevenDayShiftStats.chartData} 
                  margin={{ top: 15, right: 15, left: -10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis 
                    dataKey="displayDate" 
                    stroke="#94a3b8" 
                    tick={{ fill: '#cbd5e1', fontSize: 11, fontWeight: 600 }} 
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    tick={{ fill: '#94a3b8', fontSize: 11 }} 
                    domain={[80, 115]} 
                    unit="%" 
                  />
                  <Tooltip 
                    content={({ active, payload, label }: any) => {
                      if (!active || !payload || payload.length === 0) return null;
                      const itemData = payload[0]?.payload;
                      return (
                        <div className="bg-slate-950 border border-slate-700 p-3 rounded-xl shadow-2xl text-xs space-y-2 max-w-xs">
                          <div className="border-b border-slate-800 pb-1.5 flex items-center justify-between gap-2">
                            <span className="font-bold text-white text-xs sm:text-sm">{itemData?.fullDateLabel || label}</span>
                            {itemData?.overallEfficiency !== null && (
                              <span className={`px-1.5 py-0.5 rounded font-mono text-[10px] font-bold ${
                                itemData.overallEfficiency >= 100 
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                  : 'bg-blue-950 text-blue-300 border border-blue-800'
                              }`}>
                                Rata-rata: {itemData.overallEfficiency}%
                              </span>
                            )}
                          </div>

                          <div className="space-y-1.5">
                            {[
                              { name: 'Shift 1 (Pagi)', eff: itemData['Shift 1'], actual: itemData.shift1Actual, target: itemData.shift1Target, color: '#3b82f6' },
                              { name: 'Shift 2 (Siang)', eff: itemData['Shift 2'], actual: itemData.shift2Actual, target: itemData.shift2Target, color: '#06b6d4' },
                              { name: 'Shift 3 (Malam)', eff: itemData['Shift 3'], actual: itemData.shift3Actual, target: itemData.shift3Target, color: '#f59e0b' }
                            ].map((s, idx) => (
                              <div key={idx} className="flex items-center justify-between gap-3 text-[11px]">
                                <div className="flex items-center gap-1.5">
                                  <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: s.color }}></span>
                                  <span className="text-slate-300 font-medium">{s.name}:</span>
                                </div>
                                {s.eff !== null ? (
                                  <div className="text-right font-mono">
                                    <strong className={s.eff >= 100 ? 'text-emerald-400' : 'text-slate-200'}>{s.eff}%</strong>
                                    <span className="text-[10px] text-slate-500 ml-1">({s.actual}/{s.target}T)</span>
                                  </div>
                                ) : (
                                  <span className="text-slate-600 text-[10px] italic">Tidak ada shift</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} 
                    formatter={(value) => <span className="text-slate-300 font-semibold">{value}</span>}
                  />
                  <ReferenceLine 
                    y={100} 
                    stroke="#10b981" 
                    strokeDasharray="4 4" 
                    strokeWidth={2}
                    label={{ 
                      value: 'Target Standar 100%', 
                      fill: '#10b981', 
                      fontSize: 10, 
                      fontWeight: 'bold',
                      position: 'top' 
                    }} 
                  />
                  <Bar 
                    dataKey="Shift 1" 
                    name="Shift 1 (Pagi 07-15)" 
                    fill="#3b82f6" 
                    radius={[4, 4, 0, 0]} 
                    maxBarSize={28}
                  />
                  <Bar 
                    dataKey="Shift 2" 
                    name="Shift 2 (Siang 15-23)" 
                    fill="#06b6d4" 
                    radius={[4, 4, 0, 0]} 
                    maxBarSize={28}
                  />
                  <Bar 
                    dataKey="Shift 3" 
                    name="Shift 3 (Malam 23-07)" 
                    fill="#f59e0b" 
                    radius={[4, 4, 0, 0]} 
                    maxBarSize={28}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* TABEL DATA RINCIAN STATISTIK HARIAN (7 HARI) */}
          {showStatTable && (
            <div className="pt-2 animate-fadeIn space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200 flex items-center gap-1.5">
                  <Table className="w-3.5 h-3.5 text-blue-400" />
                  Tabel Rincian Efisiensi Produksi 7 Hari Terakhir:
                </span>
                <span className="text-[11px] text-slate-400">
                  Target Standar: 2.0 Ton / Shift
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/80">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900/90 text-slate-400 border-b border-slate-800">
                      <th className="p-2.5 font-semibold">Tanggal & Hari</th>
                      <th className="p-2.5 font-semibold text-center text-blue-300">
                        Shift 1 (Pagi)
                      </th>
                      <th className="p-2.5 font-semibold text-center text-cyan-300">
                        Shift 2 (Siang)
                      </th>
                      <th className="p-2.5 font-semibold text-center text-amber-300">
                        Shift 3 (Malam)
                      </th>
                      <th className="p-2.5 font-semibold text-center text-slate-200">
                        Rata-rata Harian
                      </th>
                      <th className="p-2.5 font-semibold text-right">
                        Tonase Aktual / Target
                      </th>
                      <th className="p-2.5 font-semibold text-center">
                        Status Kinerja
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                    {sevenDayShiftStats.chartData.map((row) => {
                      const isTargetMet = row.overallEfficiency !== null && row.overallEfficiency >= 100;
                      return (
                        <tr key={row.date} className="hover:bg-slate-900/50 transition-colors">
                          <td className="p-2.5 font-sans font-medium text-slate-200">
                            {row.fullDateLabel}
                          </td>

                          {/* Shift 1 */}
                          <td className="p-2.5 text-center">
                            {row['Shift 1'] !== null ? (
                              <span className={`font-bold ${row['Shift 1'] >= 100 ? 'text-emerald-400' : 'text-blue-300'}`}>
                                {row['Shift 1']}%
                              </span>
                            ) : (
                              <span className="text-slate-600 text-[10px] font-sans italic">-</span>
                            )}
                          </td>

                          {/* Shift 2 */}
                          <td className="p-2.5 text-center">
                            {row['Shift 2'] !== null ? (
                              <span className={`font-bold ${row['Shift 2'] >= 100 ? 'text-emerald-400' : 'text-cyan-300'}`}>
                                {row['Shift 2']}%
                              </span>
                            ) : (
                              <span className="text-slate-600 text-[10px] font-sans italic">-</span>
                            )}
                          </td>

                          {/* Shift 3 */}
                          <td className="p-2.5 text-center">
                            {row['Shift 3'] !== null ? (
                              <span className={`font-bold ${
                                row['Shift 3'] >= 100 
                                  ? 'text-emerald-400' 
                                  : row['Shift 3'] >= 95 
                                  ? 'text-amber-300' 
                                  : 'text-rose-400'
                              }`}>
                                {row['Shift 3']}%
                              </span>
                            ) : (
                              <span className="text-slate-600 text-[10px] font-sans italic">-</span>
                            )}
                          </td>

                          {/* Rata-rata Harian */}
                          <td className="p-2.5 text-center">
                            {row.overallEfficiency !== null ? (
                              <span className={`px-2 py-0.5 rounded font-bold ${
                                row.overallEfficiency >= 100 
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' 
                                  : 'bg-slate-800 text-slate-200'
                              }`}>
                                {row.overallEfficiency}%
                              </span>
                            ) : (
                              <span className="text-slate-600 text-[10px] font-sans italic">-</span>
                            )}
                          </td>

                          {/* Tonase */}
                          <td className="p-2.5 text-right text-slate-300">
                            {row.totalActual > 0 ? (
                              <span>{row.totalActual} / {row.totalTarget} Ton</span>
                            ) : (
                              <span className="text-slate-600 text-[10px] font-sans italic">-</span>
                            )}
                          </td>

                          {/* Status */}
                          <td className="p-2.5 text-center font-sans">
                            {row.overallEfficiency !== null ? (
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                isTargetMet
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                  : row.overallEfficiency >= 95
                                  ? 'bg-blue-950 text-blue-300 border border-blue-800'
                                  : 'bg-amber-950 text-amber-300 border border-amber-800'
                              }`}>
                                {isTargetMet ? '✓ Melampaui' : row.overallEfficiency >= 95 ? '● Standar' : '⚠ Perlu Evaluasi'}
                              </span>
                            ) : (
                              <span className="text-slate-600 text-[10px] italic">Tidak ada data</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PUPMS Kaizen Recommendation Card */}
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3.5 text-xs text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Catatan Rekomendasi Kaizen & Horenso (PUPMS):</strong>
                <span>
                  {sevenDayShiftStats.s3Metrics.avg < 100 
                    ? `Shift 3 (Malam) mencatat deviasi tertinggi (σ ±${sevenDayShiftStats.s3Metrics.stdDev}%). Disarankan evaluasi kestabilan suplai steam boiler dan pemeriksaan felt cleaner pada pergantian shift malam.`
                    : 'Seluruh shift berhasil mempertahankan efisiensi di atas standar 100%. Lanjutkan monitoring konsistensi pada Horenso harian.'}
                </span>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <span className="text-[11px] bg-slate-900 text-slate-400 px-2.5 py-1 rounded-lg border border-slate-800">
                Pilar 3: Seven Tools &bull; Histogram & Peta Kendali
              </span>
            </div>
          </div>
        </div>

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

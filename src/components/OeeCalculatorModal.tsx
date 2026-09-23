import React, { useState, useEffect, useMemo } from 'react';
import {
  Calculator,
  Gauge,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Zap,
  TrendingUp,
  X,
  Copy,
  Check,
  RefreshCw,
  Info,
  Sliders,
  HelpCircle,
  Award,
  Layers,
  FileCheck
} from 'lucide-react';
import { MachineId, OeeCalculation } from '../types';

interface OeeCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  machine: MachineId;
  targetProductionTon: number;
  actualProductionTon: number;
  qualityGradeA: number;
  qualityGradeB: number;
  qualityGradeC: number;
  qualityGradeDefect: number;
  totalDowntimeMinutes: number;
  shiftName: string;
  onApplyOee: (calculation: OeeCalculation, summaryNote?: string) => void;
}

export const OeeCalculatorModal: React.FC<OeeCalculatorModalProps> = ({
  isOpen,
  onClose,
  machine,
  targetProductionTon,
  actualProductionTon,
  qualityGradeA,
  qualityGradeB,
  qualityGradeC,
  qualityGradeDefect,
  totalDowntimeMinutes,
  shiftName,
  onApplyOee
}) => {
  // Machine Speed Presets (Design / Rated Speed)
  const defaultDesignSpeed = useMemo(() => {
    switch (machine) {
      case 'PM1': return 160;
      case 'PM2': return 180;
      case 'PM5': return 170;
      default: return 160;
    }
  }, [machine]);

  // Calculation Parameters (Initialized from ReportForm props)
  const [plannedShiftMinutes, setPlannedShiftMinutes] = useState<number>(480); // 8 Hours = 480 mins
  const [plannedDowntimeMinutes, setPlannedDowntimeMinutes] = useState<number>(30); // 30 mins (Istirahat & P5M/Briefing)
  const [unplannedDowntimeMinutes, setUnplannedDowntimeMinutes] = useState<number>(totalDowntimeMinutes);
  const [targetTon, setTargetTon] = useState<number>(targetProductionTon > 0 ? targetProductionTon : 2.0);
  const [actualTon, setActualTon] = useState<number>(actualProductionTon > 0 ? actualProductionTon : 2.0);
  
  // Good tonase = Grade A + Grade B (Grade C bisa dipilih apakah masuk reject atau downgraded good)
  const [includeGradeCAsGood, setIncludeGradeCAsGood] = useState<boolean>(true);
  const [manualGoodTon, setManualGoodTon] = useState<number>(
    Number((qualityGradeA + qualityGradeB + (includeGradeCAsGood ? qualityGradeC : 0)).toFixed(2))
  );
  const [manualDefectTon, setManualDefectTon] = useState<number>(qualityGradeDefect);

  // Optional Machine Speed Performance Method
  const [performanceMethod, setPerformanceMethod] = useState<'tonnage' | 'speed'>('tonnage');
  const [designSpeedMpm, setDesignSpeedMpm] = useState<number>(defaultDesignSpeed);
  const [actualSpeedMpm, setActualSpeedMpm] = useState<number>(defaultDesignSpeed);

  // UI state
  const [copied, setCopied] = useState<boolean>(false);
  const [showLossesExplanation, setShowLossesExplanation] = useState<boolean>(false);

  // Sync when props change or modal reopens
  useEffect(() => {
    if (isOpen) {
      setUnplannedDowntimeMinutes(totalDowntimeMinutes);
      setTargetTon(targetProductionTon > 0 ? targetProductionTon : 2.0);
      setActualTon(actualProductionTon > 0 ? actualProductionTon : 2.0);
      const computedGood = Number((qualityGradeA + qualityGradeB + (includeGradeCAsGood ? qualityGradeC : 0)).toFixed(2));
      setManualGoodTon(computedGood > 0 ? computedGood : actualProductionTon > 0 ? actualProductionTon : 1.95);
      setManualDefectTon(qualityGradeDefect);
      setDesignSpeedMpm(defaultDesignSpeed);
      setActualSpeedMpm(defaultDesignSpeed);
    }
  }, [
    isOpen,
    totalDowntimeMinutes,
    targetProductionTon,
    actualProductionTon,
    qualityGradeA,
    qualityGradeB,
    qualityGradeC,
    qualityGradeDefect,
    defaultDesignSpeed,
    includeGradeCAsGood
  ]);

  // Recalculate good ton when checkbox changes
  const handleToggleGradeC = (checked: boolean) => {
    setIncludeGradeCAsGood(checked);
    const newGood = Number((qualityGradeA + qualityGradeB + (checked ? qualityGradeC : 0)).toFixed(2));
    setManualGoodTon(newGood > 0 ? newGood : actualTon);
  };

  // Re-sync directly with parent values
  const handleResetToFormValues = () => {
    setPlannedShiftMinutes(480);
    setPlannedDowntimeMinutes(30);
    setUnplannedDowntimeMinutes(totalDowntimeMinutes);
    setTargetTon(targetProductionTon > 0 ? targetProductionTon : 2.0);
    setActualTon(actualProductionTon > 0 ? actualProductionTon : 2.0);
    const computedGood = Number((qualityGradeA + qualityGradeB + (includeGradeCAsGood ? qualityGradeC : 0)).toFixed(2));
    setManualGoodTon(computedGood);
    setManualDefectTon(qualityGradeDefect);
    setDesignSpeedMpm(defaultDesignSpeed);
    setActualSpeedMpm(defaultDesignSpeed);
  };

  // =========================================================================
  // CORE OEE MATHEMATICAL FORMULAS
  // =========================================================================
  const calculationResult: OeeCalculation = useMemo(() => {
    // 1. Planned Operating Time (Waktu Operasi Terjadwal)
    const plannedOperatingMinutes = Math.max(1, plannedShiftMinutes - plannedDowntimeMinutes);

    // 2. Actual Operating Time (Waktu Berjalan Aktual)
    const actualOperatingMinutes = Math.max(0, plannedOperatingMinutes - unplannedDowntimeMinutes);

    // A. AVAILABILITY RATE (%)
    // Formula: (Operating Time / Planned Operating Time) * 100
    const rawAvailability = (actualOperatingMinutes / plannedOperatingMinutes) * 100;
    const availability = Math.min(100, Math.max(0, Number(rawAvailability.toFixed(2))));

    // B. PERFORMANCE RATE (%)
    let rawPerformance = 0;
    if (performanceMethod === 'speed') {
      // Speed-based: Actual Speed / Design Speed * 100
      rawPerformance = designSpeedMpm > 0 ? (actualSpeedMpm / designSpeedMpm) * 100 : 0;
    } else {
      // Tonnage / Capacity-based during operating time:
      // If machine operates for actualOperatingMinutes, expected production is (targetTon / plannedOperatingMinutes) * actualOperatingMinutes
      const expectedTonDuringOperatingTime = (targetTon / plannedOperatingMinutes) * actualOperatingMinutes;
      if (expectedTonDuringOperatingTime > 0) {
        rawPerformance = (actualTon / expectedTonDuringOperatingTime) * 100;
      } else if (targetTon > 0) {
        rawPerformance = (actualTon / targetTon) * 100;
      } else {
        rawPerformance = 100;
      }
    }
    const performance = Math.min(120, Math.max(0, Number(rawPerformance.toFixed(2))));

    // C. QUALITY RATE (%)
    // Formula: (Good Production / Total Production) * 100
    const totalProdTon = Math.max(0.01, actualTon);
    const goodTon = Math.min(totalProdTon, Math.max(0, manualGoodTon));
    const rawQuality = (goodTon / totalProdTon) * 100;
    const quality = Math.min(100, Math.max(0, Number(rawQuality.toFixed(2))));

    // TOTAL OEE (%)
    // Formula: (Availability * Performance * Quality) / 10000
    const rawOee = (availability * performance * quality) / 10000;
    const oee = Math.min(100, Math.max(0, Number(rawOee.toFixed(2))));

    // Status classification based on TPM / World Class Paper Manufacturing standards
    let status: OeeCalculation['status'] = 'NEEDS_IMPROVEMENT';
    if (oee >= 85) {
      status = 'WORLD_CLASS';
    } else if (oee >= 75) {
      status = 'GOOD';
    } else if (oee >= 65) {
      status = 'FAIR';
    } else {
      status = 'NEEDS_IMPROVEMENT';
    }

    return {
      availability,
      performance,
      quality,
      oee,
      plannedTimeMinutes: plannedShiftMinutes,
      plannedDowntimeMinutes,
      unplannedDowntimeMinutes,
      operatingTimeMinutes: actualOperatingMinutes,
      targetProductionTon: targetTon,
      actualProductionTon: actualTon,
      goodProductionTon: goodTon,
      defectProductionTon: manualDefectTon,
      machineSpeedActualMpm: performanceMethod === 'speed' ? actualSpeedMpm : undefined,
      machineSpeedDesignMpm: performanceMethod === 'speed' ? designSpeedMpm : undefined,
      status,
      calculatedAt: new Date().toISOString()
    };
  }, [
    plannedShiftMinutes,
    plannedDowntimeMinutes,
    unplannedDowntimeMinutes,
    targetTon,
    actualTon,
    manualGoodTon,
    manualDefectTon,
    performanceMethod,
    actualSpeedMpm,
    designSpeedMpm
  ]);

  // Generated concise summary text for handover notes
  const summaryText = useMemo(() => {
    const statusLabel = 
      calculationResult.status === 'WORLD_CLASS' ? 'World Class 🏆' :
      calculationResult.status === 'GOOD' ? 'Baik / Optimal ✓' :
      calculationResult.status === 'FAIR' ? 'Cukup (Peluang Kaizen) ⚠' : 'Perlu Tindakan Korektif ⚡';

    return `[Analisis OEE ${machine} - ${shiftName}]: OEE ${calculationResult.oee}% (${statusLabel}) | Availability: ${calculationResult.availability}% (Downtime: ${calculationResult.unplannedDowntimeMinutes} mnt) | Performance: ${calculationResult.performance}% (${calculationResult.actualProductionTon}T / ${calculationResult.targetProductionTon}T) | Quality: ${calculationResult.quality}% (Good: ${calculationResult.goodProductionTon}T).`;
  }, [calculationResult, machine, shiftName]);

  const handleCopySummary = () => {
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleApply = () => {
    onApplyOee(calculationResult, summaryText);
    onClose();
  };

  if (!isOpen) return null;

  // Status visual configurations
  const statusConfig = {
    WORLD_CLASS: {
      label: 'World Class (TPM Standard)',
      sub: 'Kinerja Kelas Dunia (≥ 85%)',
      badgeBg: 'bg-emerald-950 text-emerald-300 border-emerald-700',
      textColor: 'text-emerald-400',
      ringColor: 'stroke-emerald-400',
      cardBorder: 'border-emerald-500/50',
      icon: Award
    },
    GOOD: {
      label: 'Optimal / Standar Baik',
      sub: 'Memenuhi Standar Operasi (75% - 84.9%)',
      badgeBg: 'bg-cyan-950 text-cyan-300 border-cyan-700',
      textColor: 'text-cyan-400',
      ringColor: 'stroke-cyan-400',
      cardBorder: 'border-cyan-500/50',
      icon: CheckCircle2
    },
    FAIR: {
      label: 'Cukup / Perlu Kaizen',
      sub: 'Potensi Kehilangan Efisiensi (65% - 74.9%)',
      badgeBg: 'bg-amber-950 text-amber-300 border-amber-700',
      textColor: 'text-amber-400',
      ringColor: 'stroke-amber-400',
      cardBorder: 'border-amber-500/50',
      icon: AlertTriangle
    },
    NEEDS_IMPROVEMENT: {
      label: 'Perlu Perbaikan Segera',
      sub: 'Tingkat Losses Tinggi (< 65%)',
      badgeBg: 'bg-rose-950 text-rose-300 border-rose-700',
      textColor: 'text-rose-400',
      ringColor: 'stroke-rose-400',
      cardBorder: 'border-rose-500/50',
      icon: AlertTriangle
    }
  }[calculationResult.status];

  const StatusIcon = statusConfig.icon;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div 
        className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-blue-600/30 border border-blue-500/50 rounded-xl text-blue-400 shadow-sm">
              <Calculator className="w-5 h-5 sm:w-6 sm:h-6" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                  Kalkulator OEE (Overall Equipment Effectiveness)
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-950 text-blue-300 border border-blue-800">
                  {machine} &bull; {shiftName}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Hitung otomatis metrik Availability, Performance, dan Quality sesuai prinsip Total Productive Maintenance (TPM)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleResetToFormValues}
              className="p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-colors flex items-center gap-1"
              title="Kembalikan data kalkulator sesuai nilai formulir shift saat ini"
            >
              <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Sinkron Ulang Form</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Tutup dialog kalkulator"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* MODAL BODY (SCROLLABLE) */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-slate-200">

          {/* MAIN OEE HERO SCORECARD */}
          <div className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border ${statusConfig.cardBorder} shadow-lg space-y-4`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Radial Meter / Visual Display */}
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      className="stroke-slate-800"
                      strokeWidth="8"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      className={`${statusConfig.ringColor} transition-all duration-700 ease-out`}
                      strokeWidth="8"
                      strokeDasharray={251.2}
                      strokeDashoffset={251.2 - (251.2 * Math.min(100, calculationResult.oee)) / 100}
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">OEE</span>
                    <span className={`text-xl sm:text-2xl font-black font-mono ${statusConfig.textColor}`}>
                      {calculationResult.oee}%
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${statusConfig.badgeBg}`}>
                      <StatusIcon className="w-3.5 h-3.5" />
                      {statusConfig.label}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {statusConfig.sub}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-md pt-1">
                    Formula Standar: <strong className="text-white">OEE = Availability ({calculationResult.availability}%) × Performance ({calculationResult.performance}%) × Quality ({calculationResult.quality}%)</strong>
                  </p>
                </div>
              </div>

              {/* Quick Preset Buttons for Shift Duration */}
              <div className="flex flex-col sm:flex-row md:flex-col gap-2 w-full md:w-auto shrink-0 border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-4">
                <span className="text-[11px] font-semibold text-slate-400">Durasi Shift Kerja:</span>
                <div className="grid grid-cols-3 md:flex gap-1.5">
                  {[
                    { label: '8 Jam (480m)', val: 480 },
                    { label: '7 Jam (420m)', val: 420 },
                    { label: '12 Jam (720m)', val: 720 }
                  ].map(p => (
                    <button
                      key={p.val}
                      type="button"
                      onClick={() => setPlannedShiftMinutes(p.val)}
                      className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
                        plannedShiftMinutes === p.val
                          ? 'bg-blue-600 text-white font-bold shadow'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* THREE PILLAR METRIC GAUGES (A, P, Q) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800/80">
              {/* 1. AVAILABILITY CARD */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-blue-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    Availability (A)
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Target: ≥ 90%
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-black font-mono text-white">
                    {calculationResult.availability}%
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {calculationResult.operatingTimeMinutes} / {plannedShiftMinutes - plannedDowntimeMinutes} mnt
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      calculationResult.availability >= 90 ? 'bg-blue-500' : calculationResult.availability >= 80 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${Math.min(100, calculationResult.availability)}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-400">
                  Waktu Operasi aktual setelah dikurangi downtime ({unplannedDowntimeMinutes} mnt).
                </p>
              </div>

              {/* 2. PERFORMANCE CARD */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-cyan-400 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    Performance (P)
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Target: ≥ 95%
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-black font-mono text-white">
                    {calculationResult.performance}%
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {actualTon} / {targetTon} Ton
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      calculationResult.performance >= 95 ? 'bg-cyan-500' : calculationResult.performance >= 85 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${Math.min(100, calculationResult.performance)}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-400">
                  Rasio kecepatan/tonase terhadap target kapasitas jam operasi.
                </p>
              </div>

              {/* 3. QUALITY CARD */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5" />
                    Quality (Q)
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Target: ≥ 99%
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-black font-mono text-white">
                    {calculationResult.quality}%
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Good: {calculationResult.goodProductionTon} Ton
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      calculationResult.quality >= 99 ? 'bg-emerald-500' : calculationResult.quality >= 95 ? 'bg-cyan-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${Math.min(100, calculationResult.quality)}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-400">
                  Produk layak (Grade A + B) dibanding total tonase lembaran.
                </p>
              </div>
            </div>
          </div>

          {/* INTERACTIVE INPUT CONTROLS SECTION */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
                <Sliders className="w-4 h-4 text-blue-400" />
                Parameter Input & Penyesuaian Real-Time
              </h3>
              <span className="text-[11px] text-slate-400">
                Nilai otomatis sinkron dengan data formulir
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* GROUP 1: AVAILABILITY INPUTS */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 space-y-3">
                <div className="flex items-center gap-1.5 border-b border-slate-800/80 pb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  <h4 className="text-xs font-bold text-slate-200">1. Parameter Waktu & Downtime</h4>
                </div>

                {/* Planned Downtime */}
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span>Istirahat/Briefing Terencana:</span>
                    <span className="font-mono text-slate-200 font-bold">{plannedDowntimeMinutes} mnt</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="60"
                    step="5"
                    value={plannedDowntimeMinutes}
                    onChange={(e) => setPlannedDowntimeMinutes(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                {/* Unplanned Downtime */}
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span className="flex items-center gap-1">
                      Downtime Tidak Terencana:
                      <span className="text-[9px] bg-rose-950 text-rose-300 px-1 py-0.2 rounded border border-rose-800">
                        Insiden
                      </span>
                    </span>
                    <span className="font-mono text-rose-400 font-bold">{unplannedDowntimeMinutes} mnt</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max="480"
                      value={unplannedDowntimeMinutes}
                      onChange={(e) => setUnplannedDowntimeMinutes(Math.max(0, Number(e.target.value)))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold text-white focus:outline-none focus:border-blue-500"
                    />
                    <span className="text-xs text-slate-400 font-mono">Menit</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-[10px]">
                    {[0, 10, 15, 30, 45].map(m => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setUnplannedDowntimeMinutes(m)}
                        className={`px-1.5 py-0.5 rounded border transition-colors ${
                          unplannedDowntimeMinutes === m
                            ? 'bg-blue-600 border-blue-500 text-white font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {m}m
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calculated Operating Minutes */}
                <div className="pt-2 border-t border-slate-800/80 text-[11px] flex justify-between text-slate-400">
                  <span>Waktu Operasi Bersih:</span>
                  <span className="font-mono font-bold text-blue-300">
                    {calculationResult.operatingTimeMinutes} Menit
                  </span>
                </div>
              </div>

              {/* GROUP 2: PERFORMANCE INPUTS */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>
                    <h4 className="text-xs font-bold text-slate-200">2. Parameter Output / Kinerja</h4>
                  </div>
                  <div className="flex items-center gap-1 text-[10px]">
                    <button
                      type="button"
                      onClick={() => setPerformanceMethod('tonnage')}
                      className={`px-1.5 py-0.5 rounded font-semibold transition-colors ${
                        performanceMethod === 'tonnage' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Tonase
                    </button>
                    <button
                      type="button"
                      onClick={() => setPerformanceMethod('speed')}
                      className={`px-1.5 py-0.5 rounded font-semibold transition-colors ${
                        performanceMethod === 'speed' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Kecepatan mpm
                    </button>
                  </div>
                </div>

                {performanceMethod === 'tonnage' ? (
                  <>
                    {/* Target Tonase */}
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                        <span>Target Produksi Shift:</span>
                        <span className="font-mono text-slate-200 font-bold">{targetTon} Ton</span>
                      </div>
                      <input
                        type="number"
                        step="0.05"
                        min="0.1"
                        value={targetTon}
                        onChange={(e) => setTargetTon(Math.max(0.1, Number(e.target.value)))}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    {/* Actual Tonase */}
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                        <span>Aktual Tonase Dihasilkan:</span>
                        <span className="font-mono text-cyan-400 font-bold">{actualTon} Ton</span>
                      </div>
                      <input
                        type="number"
                        step="0.05"
                        min="0"
                        value={actualTon}
                        onChange={(e) => setActualTon(Math.max(0, Number(e.target.value)))}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Design Speed vs Actual Speed */}
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                        <span>Kecepatan Desain {machine}:</span>
                        <span className="font-mono text-slate-200 font-bold">{designSpeedMpm} mpm</span>
                      </div>
                      <input
                        type="number"
                        min="50"
                        max="300"
                        value={designSpeedMpm}
                        onChange={(e) => setDesignSpeedMpm(Math.max(1, Number(e.target.value)))}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                        <span>Kecepatan Berjalan Aktual:</span>
                        <span className="font-mono text-cyan-400 font-bold">{actualSpeedMpm} mpm</span>
                      </div>
                      <input
                        type="number"
                        min="0"
                        max="300"
                        value={actualSpeedMpm}
                        onChange={(e) => setActualSpeedMpm(Math.max(0, Number(e.target.value)))}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </>
                )}

                <div className="pt-2 border-t border-slate-800/80 text-[11px] flex justify-between text-slate-400">
                  <span>Efisiensi Output:</span>
                  <span className="font-mono font-bold text-cyan-300">
                    {calculationResult.performance}%
                  </span>
                </div>
              </div>

              {/* GROUP 3: QUALITY INPUTS */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 space-y-3">
                <div className="flex items-center gap-1.5 border-b border-slate-800/80 pb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <h4 className="text-xs font-bold text-slate-200">3. Parameter Kualitas & Mutu</h4>
                </div>

                {/* Good Ton */}
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span>Tonase Baik (Grade A+B):</span>
                    <span className="font-mono text-emerald-400 font-bold">{manualGoodTon} Ton</span>
                  </div>
                  <input
                    type="number"
                    step="0.05"
                    min="0"
                    max={actualTon}
                    value={manualGoodTon}
                    onChange={(e) => setManualGoodTon(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Grade C Option */}
                <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800 text-[11px] flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="checkbox"
                      checked={includeGradeCAsGood}
                      onChange={(e) => handleToggleGradeC(e.target.checked)}
                      className="rounded text-emerald-500 focus:ring-0 bg-slate-950 border-slate-700"
                    />
                    <span>Sertakan Grade C sebagai Produk Layak</span>
                  </label>
                  <span className="text-[10px] text-slate-500 font-mono">({qualityGradeC} Ton)</span>
                </div>

                {/* Broke / Defect Ton */}
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span>Tonase Cacat / Reject (Broke):</span>
                    <span className="font-mono text-rose-400 font-bold">{manualDefectTon} Ton</span>
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={manualDefectTon}
                    onChange={(e) => setManualDefectTon(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div className="pt-2 border-t border-slate-800/80 text-[11px] flex justify-between text-slate-400">
                  <span>Rasio Mutu Kertas:</span>
                  <span className="font-mono font-bold text-emerald-300">
                    {calculationResult.quality}%
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* SIX BIG LOSSES REFERENCE (TPM KAISEN ACCORDION) */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl overflow-hidden text-xs">
            <button
              type="button"
              onClick={() => setShowLossesExplanation(!showLossesExplanation)}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-900/60 transition-colors text-left"
            >
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-400" />
                <span className="font-bold text-slate-200">
                  Panduan TPM: 6 Sumber Kerugian Efisiensi (Six Big Losses) Pabrik Kertas
                </span>
              </div>
              <span className="text-[11px] text-blue-400 font-semibold">
                {showLossesExplanation ? 'Sembunyikan' : 'Pelajari Detail'}
              </span>
            </button>

            {showLossesExplanation && (
              <div className="p-4 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-950/40 text-[11px]">
                <div className="space-y-1.5 p-2.5 bg-slate-900/60 rounded-lg border border-slate-800/80">
                  <div className="font-bold text-blue-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> 1. Downtime Losses (Availability)
                  </div>
                  <ul className="text-slate-400 space-y-1 list-disc list-inside">
                    <li><strong className="text-slate-300">Kerusakan Alat:</strong> Pompa stock mati, roll macet, motor trip.</li>
                    <li><strong className="text-slate-300">Setup & Penyetelan:</strong> Ganti jenis kertas, cuci kawat felt, ganti pisau.</li>
                  </ul>
                </div>

                <div className="space-y-1.5 p-2.5 bg-slate-900/60 rounded-lg border border-slate-800/80">
                  <div className="font-bold text-cyan-400 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5" /> 2. Speed Losses (Performance)
                  </div>
                  <ul className="text-slate-400 space-y-1 list-disc list-inside">
                    <li><strong className="text-slate-300">Stop Singkat (Idling):</strong> Putus kertas sesaat, trim tersumbat di pulper.</li>
                    <li><strong className="text-slate-300">Penurunan Kecepatan:</strong> Tekanan steam boiler drop, felt basah.</li>
                  </ul>
                </div>

                <div className="space-y-1.5 p-2.5 bg-slate-900/60 rounded-lg border border-slate-800/80">
                  <div className="font-bold text-emerald-400 flex items-center gap-1">
                    <FileCheck className="w-3.5 h-3.5" /> 3. Quality Losses (Quality)
                  </div>
                  <ul className="text-slate-400 space-y-1 list-disc list-inside">
                    <li><strong className="text-slate-300">Cacat Produk (Defects):</strong> Bintik kotor, kerut, gramatur tidak rata.</li>
                    <li><strong className="text-slate-300">Broke Startup:</strong> Kertas sisa awal saat threading sebelum stabil.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* GENERATED SUMMARY TEXT BOX FOR EASY COPY / HANDOVER */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300 flex items-center gap-1.5">
                <Copy className="w-3.5 h-3.5 text-blue-400" />
                Format Ringkasan OEE (Untuk Catatan Handover / Tindakan Shift):
              </span>
              <button
                type="button"
                onClick={handleCopySummary}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md border border-slate-700 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                <span>{copied ? 'Tersalin!' : 'Salin Teks'}</span>
              </button>
            </div>
            <p className="font-mono text-xs text-slate-300 bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 break-all select-all">
              {summaryText}
            </p>
          </div>

        </div>

        {/* MODAL FOOTER BUTTONS */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400 self-start sm:self-center">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Nilai OEE akan disimpan bersama laporan shift</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-colors border border-slate-700"
            >
              Tutup
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white rounded-xl text-xs font-extrabold shadow-lg transition-all"
            >
              <Check className="w-4 h-4" />
              <span>Terapkan Hasil ke Laporan Shift</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

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
  ShieldCheck
} from 'lucide-react';
import { ShiftReport, MachineId } from '../types';

interface DashboardChartsProps {
  reports: ShiftReport[];
  onSelectReportForView?: (report: ShiftReport) => void;
}

export const DashboardCharts: React.FC<DashboardChartsProps> = ({ reports }) => {
  const [selectedMachineFilter, setSelectedMachineFilter] = useState<'ALL' | MachineId>('ALL');
  const [selectedShiftFilter, setSelectedShiftFilter] = useState<string>('ALL');

  // Filtered reports based on user controls
  const filteredReports = useMemo(() => {
    return reports.filter(r => {
      const matchMachine = selectedMachineFilter === 'ALL' || r.machine === selectedMachineFilter;
      const matchShift = selectedShiftFilter === 'ALL' || r.shift === selectedShiftFilter;
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
      const shiftOrder = { Pagi: 1, Siang: 2, Malam: 3 };
      return (shiftOrder[a.shift] || 0) - (shiftOrder[b.shift] || 0);
    });

    return sorted.map(r => ({
      label: `${r.date.slice(5)} (${r.shift[0]}-${r.machine})`,
      target: r.targetProductionTon,
      aktual: r.actualProductionTon,
      persentase: r.achievementPercentage,
      downtime: r.totalDowntimeMinutes,
      operator: r.operatorName
    }));
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
              <option value="Pagi" className="bg-slate-900">Shift Pagi</option>
              <option value="Siang" className="bg-slate-900">Shift Siang</option>
              <option value="Malam" className="bg-slate-900">Shift Malam</option>
            </select>
          </div>
        </div>
      </div>

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

      </div>

    </div>
  );
};

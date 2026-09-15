import React, { useState, useEffect, useMemo } from 'react';
import { 
  Save, 
  Send, 
  Plus, 
  Trash2, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  BookOpen, 
  GraduationCap, 
  Info, 
  Layers, 
  History, 
  Sparkles,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  UserCheck,
  Zap,
  Check,
  RotateCcw,
  Sliders,
  ShieldCheck
} from 'lucide-react';
import { 
  ShiftReport, 
  MachineId, 
  ShiftType, 
  IncidentReport 
} from '../types';

interface ReportFormProps {
  onSaveReport: (report: ShiftReport, editReason?: string, editorName?: string) => void;
  onOpenSop: () => void;
  onOpenTraining: (machine?: MachineId) => void;
  editingReport?: ShiftReport | null;
  onCancelEdit?: () => void;
  existingReports?: ShiftReport[];
}

const COMMON_DEFECT_TYPES = [
  'Kerut / Wrinkle',
  'Robek / Sheet Break',
  'Bintik Gelap / Dark Spots',
  'Ketebalan Tidak Rata (Caliper Wedge)',
  'Kelembapan Tinggi / Basah',
  'Tepi Kasar / Edge Crack',
  'Lubang Jarum / Pinholes',
  'Serat Lepas / Fluff',
  'Telescoping Roll',
  'Noda Minyak / Oil Stain'
];

const PAPER_GRADE_PRESETS: Record<MachineId, string[]> = {
  PM1: [
    'Tissue 12-16 gsm (Facial / Soft)',
    'Tissue 18-22 gsm (Toilet / Napkin)',
    'MG Paper 24-26 gsm (Machine Glazed)',
    'Doorslag 36-42 gsm (Pola & Wrapping)'
  ],
  PM2: [
    'Tissue 12-16 gsm (Facial / Soft)',
    'Tissue 18-22 gsm (Toilet / Napkin)',
    'MG Paper 24-26 gsm (Machine Glazed)',
    'Doorslag 36-42 gsm (Pola & Wrapping)'
  ],
  PM5: [
    'Tissue 12-16 gsm (Facial / Soft)',
    'Tissue 18-22 gsm (Toilet / Napkin)',
    'MG Paper 24-26 gsm (Machine Glazed)',
    'Doorslag 36-42 gsm (Pola & Wrapping)'
  ]
};

// Preset kendala umum pabrik kertas untuk 1-klik input
const QUICK_INCIDENT_PRESETS = [
  {
    title: 'Kertas Putus di Wire',
    location: 'Wire Section' as const,
    description: 'Lembaran kertas putus saat pembentukan di wire table akibat gumpalan serat.',
    downtime: 15
  },
  {
    title: 'Kertas Putus di Dryer',
    location: 'Dryer Section' as const,
    description: 'Kertas putus di silinder pengering seksi 2, pembersihan broke kertas di kanvas.',
    downtime: 20
  },
  {
    title: 'Cuci Felt Press Section',
    location: 'Press Section' as const,
    description: 'Pembersihan dan pencucian felt press kotor untuk mengembalikan drainase air.',
    downtime: 25
  },
  {
    title: 'Tekanan Steam Boiler Drop',
    location: 'Utilitas (Boiler/Listrik/Air)' as const,
    description: 'Tekanan uap boiler turun sementara (< 6 bar), kecepatan mesin diperlambat.',
    downtime: 30
  },
  {
    title: 'Ganti Pisau Rewinder',
    location: 'Rewinder' as const,
    description: 'Penggantian bilah pisau slitter rewinder yang aus agar potongan tepi rapi.',
    downtime: 15
  },
  {
    title: 'Pembersihan Doctor Blade',
    location: 'Dryer Section' as const,
    description: 'Pembersihan kerak kertas pada bilah doctor roll dryer silinder.',
    downtime: 10
  }
];

// Preset pesan handover serah terima
const QUICK_HANDOVER_PRESETS = [
  'Kondisi operasi mesin stabil, lanjutkan target gramatur & gulungan sesuai schedule.',
  'Perhatikan freeness bubur refiner dan kontrol suhu silinder dryer seksi awal.',
  'Rencana pembersihan kawat (wire wash) dijadwalkan pada pertengahan shift berikutnya.',
  'Tingkat air tangki broke cukup tinggi, mohon proporsi pencampuran disesuaikan.'
];

// Operator bawaan pabrik
const DEFAULT_OPERATOR_NAMES = [
  'Dedi Kurniawan',
  'Budi Santoso',
  'Agus Setiawan',
  'Rian Hidayat',
  'Eko Prasetyo',
  'Bambang Wijaya',
  'Ahmad Fauzi'
];

export const ReportForm: React.FC<ReportFormProps> = ({
  onSaveReport,
  onOpenSop,
  onOpenTraining,
  editingReport,
  onCancelEdit,
  existingReports = []
}) => {
  // Input Mode: 'wizard' (Mode Cepat / 3 Langkah) vs 'classic' (Mode Formulir Lengkap)
  const [inputMode, setInputMode] = useState<'wizard' | 'classic'>('wizard');
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // A. Data Umum
  const [date, setDate] = useState<string>(
    editingReport?.date || new Date().toISOString().split('T')[0]
  );
  const [shift, setShift] = useState<ShiftType>(() => {
    if (editingReport?.shift) {
      if (editingReport.shift === 'Pagi') return 'Shift 1';
      if (editingReport.shift === 'Siang') return 'Shift 2';
      if (editingReport.shift === 'Malam') return 'Shift 3';
      return editingReport.shift;
    }
    return 'Shift 1';
  });
  const [operatorName, setOperatorName] = useState<string>(editingReport?.operatorName || '');
  const [machine, setMachine] = useState<MachineId>(editingReport?.machine || 'PM1');

  // B. Hasil Produksi
  const [targetProductionTon, setTargetProductionTon] = useState<number>(
    editingReport?.targetProductionTon || 40.0
  );
  const [actualProductionTon, setActualProductionTon] = useState<number>(
    editingReport?.actualProductionTon || 40.0
  );
  const [netWeightKg, setNetWeightKg] = useState<number>(
    editingReport?.netWeightKg || 40000
  );
  const [reelCount, setReelCount] = useState<number>(editingReport?.reelCount || 7);
  const [paperGradeCode, setPaperGradeCode] = useState<string>(
    editingReport?.paperGradeCode || PAPER_GRADE_PRESETS.PM1[1]
  );

  // C. Kualitas Produk
  const [qualityGradeA, setQualityGradeA] = useState<number>(editingReport?.qualityGradeA_Ton || 37.0);
  const [qualityGradeB, setQualityGradeB] = useState<number>(editingReport?.qualityGradeB_Ton || 2.5);
  const [qualityGradeC, setQualityGradeC] = useState<number>(editingReport?.qualityGradeC_Ton || 0.5);
  const [qualityGradeDefect, setQualityGradeDefect] = useState<number>(editingReport?.qualityGradeDefect_Ton || 0.0);

  // Parameter Kualitas Fisik Lab
  const [thicknessMicron, setThicknessMicron] = useState<number>(editingReport?.thicknessMicron || 172);
  const [moisturePercent, setMoisturePercent] = useState<number>(editingReport?.moisturePercent || 7.8);
  const [tensileStrength, setTensileStrength] = useState<number>(editingReport?.tensileStrength || 4.2);
  const [surfaceSmoothness, setSurfaceSmoothness] = useState<number>(editingReport?.surfaceSmoothness || 300);

  const [selectedDefects, setSelectedDefects] = useState<string[]>(editingReport?.defectTypes || []);
  const [customDefectInput, setCustomDefectInput] = useState<string>('');

  // D. Kendala & Masalah
  const [hasIncidentOption, setHasIncidentOption] = useState<'NO' | 'YES'>(
    editingReport && editingReport.incidents && editingReport.incidents.length > 0 ? 'YES' : 'NO'
  );
  const [incidents, setIncidents] = useState<IncidentReport[]>(editingReport?.incidents || []);
  
  // Incident draft input
  const [incidentTime, setIncidentTime] = useState<string>('09:30');
  const [incidentLocation, setIncidentLocation] = useState<IncidentReport['location']>('Wire Section');
  const [incidentDesc, setIncidentDesc] = useState<string>('');
  const [incidentDowntime, setIncidentDowntime] = useState<number>(15);

  // E. Rekomendasi & Tindakan
  const [actionsTaken, setActionsTaken] = useState<string>(
    editingReport?.actionsTaken || ''
  );
  const [shortTermRec, setShortTermRec] = useState<string>(
    editingReport?.shortTermRecommendation || ''
  );
  const [longTermRec, setLongTermRec] = useState<string>(
    editingReport?.longTermRecommendation || ''
  );
  const [handoverNotes, setHandoverNotes] = useState<string>(
    editingReport?.handoverNotes || ''
  );

  // Audit info if editing
  const [editorName, setEditorName] = useState<string>('');
  const [editReason, setEditReason] = useState<string>('');
  const [showEditAuditModal, setShowEditAuditModal] = useState<boolean>(false);

  // Auto-saved banner status & Quick notification
  const [lastAutoSaveTime, setLastAutoSaveTime] = useState<string>('');
  const [quickNotification, setQuickNotification] = useState<string | null>(null);

  // Calculated properties
  const achievementPercentage = targetProductionTon > 0 
    ? Number(((actualProductionTon / targetProductionTon) * 100).toFixed(2)) 
    : 0;

  const totalQualityTon = qualityGradeA + qualityGradeB + qualityGradeC + qualityGradeDefect;
  const defectPercentage = totalQualityTon > 0 
    ? Number(((qualityGradeDefect / totalQualityTon) * 100).toFixed(2)) 
    : 0;

  const totalDowntimeMinutes = incidents.reduce((acc, inc) => acc + (inc.downtimeMinutes || 0), 0);

  // List of operator suggestions
  const operatorSuggestions = useMemo(() => {
    const list = new Set<string>(DEFAULT_OPERATOR_NAMES);
    existingReports.forEach(r => {
      if (r.operatorName && r.operatorName.trim()) {
        list.add(r.operatorName.trim());
      }
    });
    return Array.from(list).slice(0, 8);
  }, [existingReports]);

  const flashNotification = (msg: string) => {
    setQuickNotification(msg);
    setTimeout(() => {
      setQuickNotification(null);
    }, 3500);
  };

  // Set default target based on machine when machine changes (unless in edit mode)
  const handleMachineChange = (newMachine: MachineId) => {
    setMachine(newMachine);
    if (!editingReport) {
      if (newMachine === 'PM1') {
        setTargetProductionTon(40.0);
        setPaperGradeCode(PAPER_GRADE_PRESETS.PM1[1]);
      } else if (newMachine === 'PM2') {
        setTargetProductionTon(62.0);
        setPaperGradeCode(PAPER_GRADE_PRESETS.PM2[0]);
      } else if (newMachine === 'PM5') {
        setTargetProductionTon(110.0);
        setPaperGradeCode(PAPER_GRADE_PRESETS.PM5[0]);
      }
    }
  };

  // 1-Click Auto Fill Normal Standard
  const handleQuickFillNormal = () => {
    if (machine === 'PM1') {
      setTargetProductionTon(40.0);
      setActualProductionTon(40.5);
      setNetWeightKg(40500);
      setReelCount(7);
      setQualityGradeA(37.5);
      setQualityGradeB(2.5);
      setQualityGradeC(0.5);
      setQualityGradeDefect(0.0);
      setThicknessMicron(172);
      setMoisturePercent(7.8);
      setTensileStrength(4.2);
      setSurfaceSmoothness(300);
      setPaperGradeCode(PAPER_GRADE_PRESETS.PM1[1]);
    } else if (machine === 'PM2') {
      setTargetProductionTon(62.0);
      setActualProductionTon(63.0);
      setNetWeightKg(63000);
      setReelCount(8);
      setQualityGradeA(58.5);
      setQualityGradeB(3.5);
      setQualityGradeC(1.0);
      setQualityGradeDefect(0.0);
      setThicknessMicron(210);
      setMoisturePercent(7.5);
      setTensileStrength(5.1);
      setSurfaceSmoothness(350);
      setPaperGradeCode(PAPER_GRADE_PRESETS.PM2[0]);
    } else if (machine === 'PM5') {
      setTargetProductionTon(110.0);
      setActualProductionTon(111.5);
      setNetWeightKg(111500);
      setReelCount(9);
      setQualityGradeA(104.0);
      setQualityGradeB(6.0);
      setQualityGradeC(1.5);
      setQualityGradeDefect(0.0);
      setThicknessMicron(245);
      setMoisturePercent(7.2);
      setTensileStrength(6.4);
      setSurfaceSmoothness(240);
      setPaperGradeCode(PAPER_GRADE_PRESETS.PM5[0]);
    }
    setHasIncidentOption('NO');
    setIncidents([]);
    setSelectedDefects([]);
    setActionsTaken('Semua seksi beroperasi normal sesuai standar parameter mesin.');
    setHandoverNotes('Kondisi mesin prima, lanjutkan target gulungan berikutnya.');
    flashNotification(`Nilai standar normal ${machine} berhasil diisikan otomatis!`);
  };

  // Adjust Tonase with +/- buttons
  const adjustActualTon = (amount: number) => {
    const newVal = Math.max(0, Number((actualProductionTon + amount).toFixed(1)));
    handleActualTonChange(newVal);
  };

  const adjustReelCount = (amount: number) => {
    setReelCount(Math.max(1, reelCount + amount));
  };

  // Keep net weight synced and re-apportion quality
  const handleActualTonChange = (val: number) => {
    setActualProductionTon(val);
    setNetWeightKg(Math.round(val * 1000));
    // Auto calculate proportions
    setQualityGradeA(Number((val * 0.92).toFixed(1)));
    setQualityGradeB(Number((val * 0.06).toFixed(1)));
    setQualityGradeC(Number((val * 0.015).toFixed(1)));
    setQualityGradeDefect(Number((val * 0.005).toFixed(1)));
  };

  // Add Incident handler
  const handleAddIncident = () => {
    if (!incidentDesc.trim()) return;
    const newInc: IncidentReport = {
      id: `inc-${Date.now()}`,
      time: incidentTime,
      location: incidentLocation,
      description: incidentDesc.trim(),
      downtimeMinutes: Number(incidentDowntime) || 0
    };
    setIncidents([...incidents, newInc]);
    setIncidentDesc('');
    setIncidentDowntime(10);
  };

  // 1-Click quick incident preset
  const handleAddPresetIncident = (preset: typeof QUICK_INCIDENT_PRESETS[0]) => {
    const now = new Date();
    const currentTimeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace('.', ':');
    const newInc: IncidentReport = {
      id: `inc-${Date.now()}`,
      time: currentTimeStr,
      location: preset.location,
      description: preset.description,
      downtimeMinutes: preset.downtime
    };
    setIncidents([...incidents, newInc]);
    setHasIncidentOption('YES');
    flashNotification(`Kendala "${preset.title}" ditambahkan (+${preset.downtime} mnt)`);
  };

  const handleRemoveIncident = (id: string) => {
    const remaining = incidents.filter(inc => inc.id !== id);
    setIncidents(remaining);
    if (remaining.length === 0) {
      setHasIncidentOption('NO');
    }
  };

  const toggleDefectType = (type: string) => {
    if (selectedDefects.includes(type)) {
      setSelectedDefects(selectedDefects.filter(d => d !== type));
    } else {
      setSelectedDefects([...selectedDefects, type]);
    }
  };

  const handleAddCustomDefect = () => {
    if (customDefectInput.trim() && !selectedDefects.includes(customDefectInput.trim())) {
      setSelectedDefects([...selectedDefects, customDefectInput.trim()]);
      setCustomDefectInput('');
    }
  };

  // Draft auto-save to localStorage every 10 seconds or on changes (only when creating a new report)
  useEffect(() => {
    if (!editingReport) {
      const draftData = {
        date,
        shift,
        operatorName,
        machine,
        targetProductionTon,
        actualProductionTon,
        netWeightKg,
        reelCount,
        paperGradeCode,
        qualityGradeA,
        qualityGradeB,
        qualityGradeC,
        qualityGradeDefect,
        thicknessMicron,
        moisturePercent,
        tensileStrength,
        surfaceSmoothness,
        selectedDefects,
        incidents,
        actionsTaken,
        shortTermRec,
        longTermRec,
        handoverNotes,
        hasIncidentOption
      };

      try {
        localStorage.setItem('panca_paper_report_draft', JSON.stringify(draftData));
        const timeNow = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
        setLastAutoSaveTime(timeNow);
      } catch (e) {
        // ignore storage error
      }
    }
  }, [
    date,
    shift,
    operatorName,
    machine,
    targetProductionTon,
    actualProductionTon,
    netWeightKg,
    reelCount,
    paperGradeCode,
    qualityGradeA,
    qualityGradeB,
    qualityGradeC,
    qualityGradeDefect,
    thicknessMicron,
    moisturePercent,
    tensileStrength,
    surfaceSmoothness,
    selectedDefects,
    incidents,
    actionsTaken,
    shortTermRec,
    longTermRec,
    handoverNotes,
    hasIncidentOption,
    editingReport
  ]);

  // Load draft on mount if not editing
  useEffect(() => {
    if (!editingReport) {
      const savedDraft = localStorage.getItem('panca_paper_report_draft');
      if (savedDraft) {
        try {
          const parsed = JSON.parse(savedDraft);
          if (parsed.operatorName) setOperatorName(parsed.operatorName);
          if (parsed.shift) {
            let s = parsed.shift;
            if (s === 'Pagi') s = 'Shift 1';
            else if (s === 'Siang') s = 'Shift 2';
            else if (s === 'Malam') s = 'Shift 3';
            setShift(s);
          }
        } catch (e) {
          // ignore corrupted draft
        }
      }
    }
  }, [editingReport]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!operatorName.trim()) {
      alert('Mohon masukkan atau pilih Nama Petugas Pengisi Shift.');
      setCurrentStep(1);
      return;
    }

    if (actualProductionTon <= 0) {
      alert('Mohon periksa Hasil Produksi Aktual (Ton) tidak boleh nol.');
      setCurrentStep(2);
      return;
    }

    if (editingReport) {
      setShowEditAuditModal(true);
      return;
    }

    // Build new report
    const shiftSlug = shift.toLowerCase().replace(/\s+/g, '');
    const newReport: ShiftReport = {
      id: `rep-${machine.toLowerCase()}-${date}-${shiftSlug}-${Date.now().toString().slice(-4)}`,
      date,
      shift,
      operatorName: operatorName.trim(),
      machine,
      targetProductionTon: Number(targetProductionTon) || 0,
      actualProductionTon: Number(actualProductionTon) || 0,
      achievementPercentage,
      netWeightKg: Number(netWeightKg) || 0,
      reelCount: Number(reelCount) || 0,
      paperGradeCode,
      qualityGradeA_Ton: Number(qualityGradeA) || 0,
      qualityGradeB_Ton: Number(qualityGradeB) || 0,
      qualityGradeC_Ton: Number(qualityGradeC) || 0,
      qualityGradeDefect_Ton: Number(qualityGradeDefect) || 0,
      thicknessMicron: Number(thicknessMicron) || 0,
      moisturePercent: Number(moisturePercent) || 0,
      tensileStrength: Number(tensileStrength) || 0,
      surfaceSmoothness: Number(surfaceSmoothness) || 0,
      defectPercentage,
      defectTypes: selectedDefects,
      incidents: hasIncidentOption === 'YES' ? incidents : [],
      totalDowntimeMinutes: hasIncidentOption === 'YES' ? totalDowntimeMinutes : 0,
      actionsTaken: actionsTaken.trim() || 'Operasi mesin berjalan sesuai standar pengawasan shift.',
      shortTermRecommendation: shortTermRec.trim(),
      longTermRecommendation: longTermRec.trim(),
      handoverNotes: handoverNotes.trim() || 'Kondisi mesin berjalan baik, lanjutkan target selanjutnya.',
      createdAt: new Date().toISOString(),
      editHistory: []
    };

    onSaveReport(newReport);
    localStorage.removeItem('panca_paper_report_draft');
  };

  const handleConfirmEdit = () => {
    if (!editorName.trim()) {
      alert('Nama Petugas yang Mengubah wajib diisi untuk catatan riwayat audit.');
      return;
    }
    if (!editReason.trim()) {
      alert('Mohon cantumkan alasan atau ringkasan perbaikan data.');
      return;
    }

    if (editingReport) {
      const updatedReport: ShiftReport = {
        ...editingReport,
        date,
        shift,
        operatorName: operatorName.trim(),
        machine,
        targetProductionTon: Number(targetProductionTon) || 0,
        actualProductionTon: Number(actualProductionTon) || 0,
        achievementPercentage,
        netWeightKg: Number(netWeightKg) || 0,
        reelCount: Number(reelCount) || 0,
        paperGradeCode,
        qualityGradeA_Ton: Number(qualityGradeA) || 0,
        qualityGradeB_Ton: Number(qualityGradeB) || 0,
        qualityGradeC_Ton: Number(qualityGradeC) || 0,
        qualityGradeDefect_Ton: Number(qualityGradeDefect) || 0,
        thicknessMicron: Number(thicknessMicron) || 0,
        moisturePercent: Number(moisturePercent) || 0,
        tensileStrength: Number(tensileStrength) || 0,
        surfaceSmoothness: Number(surfaceSmoothness) || 0,
        defectPercentage,
        defectTypes: selectedDefects,
        incidents: hasIncidentOption === 'YES' ? incidents : [],
        totalDowntimeMinutes: hasIncidentOption === 'YES' ? totalDowntimeMinutes : 0,
        actionsTaken: actionsTaken.trim(),
        shortTermRecommendation: shortTermRec.trim(),
        longTermRecommendation: longTermRec.trim(),
        handoverNotes: handoverNotes.trim(),
        updatedAt: new Date().toISOString()
      };

      onSaveReport(updatedReport, editReason.trim(), editorName.trim());
      setShowEditAuditModal(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      
      {/* Toast Notifikasi Ringan */}
      {quickNotification && (
        <div className="fixed top-20 right-4 z-50 bg-blue-900 border border-blue-400 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-pulse">
          <Sparkles className="w-4 h-4 text-cyan-300" />
          <span>{quickNotification}</span>
        </div>
      )}

      {/* Top Banner & Mode Selector */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-wide">
              {editingReport ? `Perbaikan Laporan: ${editingReport.id}` : 'Formulir Laporan Kinerja Shift'}
            </h1>
            {editingReport && (
              <span className="px-2 py-0.5 bg-amber-900/60 border border-amber-600/50 text-amber-300 text-xs font-bold rounded">
                REVISI
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Didesain praktis untuk layar HP maupun laptop &bull; Draf tersimpan otomatis
          </p>
        </div>

        {/* Action Controls & Mode Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Quick Fill Button */}
          <button
            type="button"
            onClick={handleQuickFillNormal}
            id="btn-quick-fill-normal"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
            title="Isi otomatis target & estimasi aktual standar normal pabrik"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Isi Cepat Standar Normal</span>
          </button>

          {/* Mode Switcher Toggle */}
          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setInputMode('wizard')}
              className={`px-3 py-1 rounded-md transition-all ${
                inputMode === 'wizard'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ✨ Mode Cepat (3 Langkah)
            </button>
            <button
              type="button"
              onClick={() => setInputMode('classic')}
              className={`px-3 py-1 rounded-md transition-all ${
                inputMode === 'classic'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              📋 Mode Lengkap
            </button>
          </div>

          {/* SOP shortcut */}
          <button
            type="button"
            onClick={onOpenSop}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-lg border border-slate-700 transition-colors"
            title="Buka SOP 4 Tahap Proses"
          >
            <BookOpen className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onOpenTraining(machine)}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg border border-slate-700 transition-colors"
            title={`Buka Materi Mesin ${machine}`}
          >
            <GraduationCap className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editing Banner */}
      {editingReport && onCancelEdit && (
        <div className="bg-amber-950/40 border border-amber-800/60 rounded-xl p-3 flex items-center justify-between text-xs text-amber-300">
          <span>
            Anda sedang mengedit laporan: <strong>{editingReport.date} - {editingReport.shift} - {editingReport.machine}</strong>
          </span>
          <button
            type="button"
            onClick={onCancelEdit}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-semibold border border-slate-700"
          >
            Batal Edit
          </button>
        </div>
      )}

      {/* STEPPER BAR FOR WIZARD MODE */}
      {inputMode === 'wizard' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 shadow-sm">
          <div className="grid grid-cols-3 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className={`flex items-center justify-center gap-2 py-2.5 px-2 rounded-lg font-bold border transition-all text-center ${
                currentStep === 1
                  ? 'bg-blue-600 border-blue-500 text-white shadow'
                  : operatorName.trim()
                  ? 'bg-emerald-950/60 border-emerald-700/60 text-emerald-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-black/30 flex items-center justify-center text-[11px] font-mono">
                1
              </span>
              <span className="truncate">Shift & Mesin</span>
              {operatorName.trim() && currentStep !== 1 && (
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className={`flex items-center justify-center gap-2 py-2.5 px-2 rounded-lg font-bold border transition-all text-center ${
                currentStep === 2
                  ? 'bg-blue-600 border-blue-500 text-white shadow'
                  : actualProductionTon > 0
                  ? 'bg-emerald-950/60 border-emerald-700/60 text-emerald-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-black/30 flex items-center justify-center text-[11px] font-mono">
                2
              </span>
              <span className="truncate">Produksi & Kualitas</span>
              {actualProductionTon > 0 && currentStep !== 2 && (
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className={`flex items-center justify-center gap-2 py-2.5 px-2 rounded-lg font-bold border transition-all text-center ${
                currentStep === 3
                  ? 'bg-blue-600 border-blue-500 text-white shadow'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-black/30 flex items-center justify-center text-[11px] font-mono">
                3
              </span>
              <span className="truncate">Kendala & Selesai</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* ========================================================================= */}
        {/* STEP 1 / SECTION A: DATA UMUM & MESIN */}
        {/* ========================================================================= */}
        {(inputMode === 'classic' || currentStep === 1) && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600/30 border border-blue-500 text-blue-400 font-bold text-xs flex items-center justify-center">
                  1
                </span>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wide">
                    Identitas Shift & Pemilihan Mesin
                  </h2>
                  <p className="text-[11px] text-slate-400">Pilih unit mesin, shift kerja, dan nama Anda</p>
                </div>
              </div>
              {lastAutoSaveTime && (
                <span className="text-[11px] text-emerald-400/80 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Auto-tersimpan: {lastAutoSaveTime}
                </span>
              )}
            </div>

            {/* Pilihan Mesin (Kartu Besar Ramah Sentuh) */}
            <div>
              <label className="block text-slate-300 font-semibold text-xs mb-2">
                Pilih Unit Mesin Kertas <span className="text-rose-400">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {([
                  { id: 'PM1' as MachineId, name: 'PM1 - Medium Paper', spec: 'Single Wire • 110-150 gsm', target: '40 Ton' },
                  { id: 'PM2' as MachineId, name: 'PM2 - High ECT Kraft', spec: 'Twin Wire • 140-175 gsm', target: '62 Ton' },
                  { id: 'PM5' as MachineId, name: 'PM5 - White Top Kraft', spec: 'Multi-Ply + DCS • 140-200 gsm', target: '110 Ton' }
                ]).map((m) => {
                  const isSelected = machine === m.id;
                  return (
                    <button
                      type="button"
                      key={m.id}
                      id={`machine-select-${m.id}`}
                      onClick={() => handleMachineChange(m.id)}
                      className={`p-3 rounded-xl border text-left transition-all relative ${
                        isSelected
                          ? 'bg-emerald-950/80 border-emerald-500 shadow-md ring-1 ring-emerald-500'
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-base font-black font-mono ${isSelected ? 'text-emerald-300' : 'text-white'}`}>
                          {m.id}
                        </span>
                        {isSelected && (
                          <span className="p-1 bg-emerald-500 text-slate-950 rounded-full">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-bold text-slate-200 mt-1">{m.name.split(' - ')[1]}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{m.spec}</div>
                      <div className="mt-2 text-[10px] text-emerald-400/90 font-mono font-semibold">
                        Target Standar: {m.target} / shift
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Shift & Tanggal */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              {/* Shift 1 / Shift 2 / Shift 3 */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">
                  Shift Kerja <span className="text-rose-400">*</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['Shift 1', 'Shift 2', 'Shift 3'] as ShiftType[]).map((s) => (
                    <button
                      type="button"
                      key={s}
                      id={`shift-select-${s.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => setShift(s)}
                      className={`py-2.5 px-2 text-center font-bold text-xs rounded-xl border transition-all ${
                        shift === s
                          ? 'bg-blue-600 border-blue-500 text-white shadow'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tanggal */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">
                  Tanggal Laporan <span className="text-rose-400">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 font-mono text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Nama Petugas Pengisi */}
            <div className="pt-1">
              <label className="block text-slate-300 font-semibold text-xs mb-1.5">
                Nama Petugas Pengisi Shift <span className="text-rose-400">*</span>
              </label>

              {/* Quick Chip Selection */}
              <div className="flex flex-wrap gap-1.5 mb-2">
                {operatorSuggestions.map((name) => (
                  <button
                    type="button"
                    key={name}
                    onClick={() => setOperatorName(name)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                      operatorName === name
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    + {name}
                  </button>
                ))}
              </div>

              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Ketik nama Anda atau klik nama di atas..."
                  value={operatorName}
                  onChange={(e) => setOperatorName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-blue-500"
                />
                {operatorName && (
                  <span className="absolute right-3 top-2.5 text-xs text-emerald-400 flex items-center gap-1 font-semibold">
                    <UserCheck className="w-4 h-4" /> Siap
                  </span>
                )}
              </div>
            </div>

            {/* Navigation Button for Wizard */}
            {inputMode === 'wizard' && (
              <div className="pt-3 border-t border-slate-800 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    if (!operatorName.trim()) {
                      alert('Silakan pilih atau isi Nama Petugas Pengisi terlebih dahulu.');
                      return;
                    }
                    setCurrentStep(2);
                  }}
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow transition-colors"
                >
                  <span>Lanjut ke Input Produksi</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2 / SECTION B: HASIL PRODUKSI & KUALITAS */}
        {/* ========================================================================= */}
        {(inputMode === 'classic' || currentStep === 2) && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-600/30 border border-emerald-500 text-emerald-400 font-bold text-xs flex items-center justify-center">
                  2
                </span>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wide">
                    Hasil Produksi & Kualitas Produk ({machine})
                  </h2>
                  <p className="text-[11px] text-slate-400">Gunakan tombol (+ / -) untuk memudahkan penyesuaian angka</p>
                </div>
              </div>
              
              {/* Pencapaian Badge */}
              <div className={`px-3 py-1 rounded-lg border font-bold text-xs flex items-center gap-1.5 ${
                achievementPercentage >= 100
                  ? 'bg-emerald-950/80 border-emerald-600 text-emerald-300'
                  : achievementPercentage >= 90
                  ? 'bg-blue-950/80 border-blue-600 text-blue-300'
                  : 'bg-amber-950/80 border-amber-600 text-amber-300'
              }`}>
                <span>Pencapaian:</span>
                <span className="font-mono text-sm">{achievementPercentage}%</span>
              </div>
            </div>

            {/* Grid Produksi Utama */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              
              {/* Target Produksi */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <label className="block text-slate-400 font-semibold mb-1">
                  Target Produksi (Ton)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    required
                    value={targetProductionTon}
                    onChange={(e) => setTargetProductionTon(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 text-sm font-mono focus:outline-none focus:border-emerald-500 font-bold"
                  />
                  <span className="absolute right-3 top-2.5 text-slate-500 font-semibold">Ton</span>
                </div>
                <span className="text-[10px] text-slate-500 block mt-1">Standar {machine}: {machine === 'PM1' ? '40' : machine === 'PM2' ? '62' : '110'} Ton</span>
              </div>

              {/* Produksi Aktual dengan Tombol +/- Cepat */}
              <div className="bg-slate-950 p-3 rounded-xl border border-emerald-950 ring-1 ring-emerald-900/40">
                <label className="block text-emerald-300 font-bold mb-1">
                  Realisasi Aktual Produksi (Ton) <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    required
                    value={actualProductionTon}
                    onChange={(e) => handleActualTonChange(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-900 border border-emerald-700 rounded-lg text-emerald-300 text-base font-mono font-black focus:outline-none"
                  />
                  <span className="absolute right-3 top-2.5 text-slate-400 font-bold">Ton</span>
                </div>
                {/* Tombol Cepat (+ / -) */}
                <div className="grid grid-cols-4 gap-1 mt-2">
                  <button
                    type="button"
                    onClick={() => adjustActualTon(-5)}
                    className="py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded font-mono font-bold text-[11px] border border-slate-800"
                  >
                    -5T
                  </button>
                  <button
                    type="button"
                    onClick={() => adjustActualTon(-1)}
                    className="py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded font-mono font-bold text-[11px] border border-slate-800"
                  >
                    -1T
                  </button>
                  <button
                    type="button"
                    onClick={() => adjustActualTon(1)}
                    className="py-1 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 rounded font-mono font-bold text-[11px] border border-emerald-800"
                  >
                    +1T
                  </button>
                  <button
                    type="button"
                    onClick={() => adjustActualTon(5)}
                    className="py-1 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 rounded font-mono font-bold text-[11px] border border-emerald-800"
                  >
                    +5T
                  </button>
                </div>
              </div>

              {/* Jumlah Roll / Reel */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <label className="block text-slate-400 font-semibold mb-1">
                  Jumlah Gulungan (Reel / Roll)
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => adjustReelCount(-1)}
                    className="w-9 h-9 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded-lg font-bold text-base flex items-center justify-center shrink-0"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="0"
                    value={reelCount}
                    onChange={(e) => setReelCount(Number(e.target.value))}
                    className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 text-center font-mono font-bold text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => adjustReelCount(1)}
                    className="w-9 h-9 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded-lg font-bold text-base flex items-center justify-center shrink-0"
                  >
                    +
                  </button>
                </div>
                <span className="text-[10px] text-slate-500 block mt-2 text-center">
                  Berat bersih otomatis: ~{netWeightKg?.toLocaleString('id-ID')} Kg
                </span>
              </div>
            </div>

            {/* Pilihan Jenis / Grade Kertas */}
            <div>
              <label className="block text-slate-300 font-semibold text-xs mb-1.5">
                Jenis Kertas yang Diproduksi
              </label>
              <select
                value={paperGradeCode}
                onChange={(e) => setPaperGradeCode(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-emerald-500 font-medium cursor-pointer"
              >
                {PAPER_GRADE_PRESETS[machine].map((preset, i) => (
                  <option key={i} value={preset}>
                    {preset}
                  </option>
                ))}
                <option value="CUSTOM">-- Jenis / Pesanan Kertas Lainnya --</option>
              </select>
              {paperGradeCode === 'CUSTOM' && (
                <input
                  type="text"
                  placeholder="Masukkan nama kode / gramatur pesanan custom..."
                  onChange={(e) => setPaperGradeCode(e.target.value)}
                  className="w-full mt-2 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-xs"
                />
              )}
            </div>

            {/* Evaluasi Kualitas (Grade A, B, C, Cacat) */}
            <div className="pt-2 border-t border-slate-800/80">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-slate-300 font-semibold text-xs">
                  Distribusi Kualitas Kertas (Ton)
                </label>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
                  defectPercentage <= 1.0 
                    ? 'bg-emerald-950 border-emerald-700 text-emerald-300' 
                    : 'bg-rose-950 border-rose-700 text-rose-300'
                }`}>
                  Rasio Cacat: {defectPercentage}%
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">Grade A (Prima)</span>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={qualityGradeA}
                      onChange={(e) => setQualityGradeA(Number(e.target.value))}
                      className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700 rounded text-slate-100 font-mono font-bold text-sm"
                    />
                    <span className="absolute right-2 top-1.5 text-slate-500">T</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-blue-400 font-bold block mb-1">Grade B (Standar)</span>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={qualityGradeB}
                      onChange={(e) => setQualityGradeB(Number(e.target.value))}
                      className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700 rounded text-slate-100 font-mono text-sm"
                    />
                    <span className="absolute right-2 top-1.5 text-slate-500">T</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-amber-400 font-bold block mb-1">Grade C (Turun Kelas)</span>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={qualityGradeC}
                      onChange={(e) => setQualityGradeC(Number(e.target.value))}
                      className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700 rounded text-slate-100 font-mono text-sm"
                    />
                    <span className="absolute right-2 top-1.5 text-slate-500">T</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-rose-950">
                  <span className="text-rose-400 font-bold block mb-1">Cacat (Reject)</span>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={qualityGradeDefect}
                      onChange={(e) => setQualityGradeDefect(Number(e.target.value))}
                      className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700 rounded text-rose-300 font-mono font-bold text-sm"
                    />
                    <span className="absolute right-2 top-1.5 text-slate-500">T</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pilihan Cacat Kertas dengan Tombol Cepat */}
            <div className="pt-2 border-t border-slate-800/80">
              <label className="block text-slate-300 font-semibold text-xs mb-1.5">
                Ada Cacat Tertentu? (Opsional, klik untuk memilih):
              </label>
              <div className="flex flex-wrap gap-1.5">
                {COMMON_DEFECT_TYPES.map((defect, i) => {
                  const isSelected = selectedDefects.includes(defect);
                  return (
                    <button
                      type="button"
                      key={i}
                      onClick={() => toggleDefectType(defect)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${
                        isSelected
                          ? 'bg-rose-900/80 border-rose-500 text-rose-200'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '}
                      {defect}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Parameter Lab Sederhana (Default sudah terisi otomatis) */}
            <div className="pt-2 border-t border-slate-800/80">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-slate-400 font-semibold text-xs">
                  Hasil Uji Fisik Lab (Otomatis Standar)
                </span>
                <span className="text-[10px] text-slate-500">Dapat diedit jika ada hasil uji lab spesifik</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Caliper</span>
                  <input
                    type="number"
                    value={thicknessMicron}
                    onChange={(e) => setThicknessMicron(Number(e.target.value))}
                    className="w-full bg-transparent text-slate-100 font-mono font-bold text-xs"
                  />
                </div>
                <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Moisture (%)</span>
                  <input
                    type="number"
                    step="0.1"
                    value={moisturePercent}
                    onChange={(e) => setMoisturePercent(Number(e.target.value))}
                    className="w-full bg-transparent text-slate-100 font-mono font-bold text-xs"
                  />
                </div>
                <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Tensile (kN/m)</span>
                  <input
                    type="number"
                    step="0.1"
                    value={tensileStrength}
                    onChange={(e) => setTensileStrength(Number(e.target.value))}
                    className="w-full bg-transparent text-slate-100 font-mono font-bold text-xs"
                  />
                </div>
                <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Smoothness</span>
                  <input
                    type="number"
                    value={surfaceSmoothness}
                    onChange={(e) => setSurfaceSmoothness(Number(e.target.value))}
                    className="w-full bg-transparent text-slate-100 font-mono font-bold text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Navigation Buttons for Wizard */}
            {inputMode === 'wizard' && (
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Kembali ke Data Shift</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow transition-colors"
                >
                  <span>Lanjut ke Catatan & Kendala</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3 / SECTION C: KENDALA, DOWNTIME & CATATAN HANDOVER */}
        {/* ========================================================================= */}
        {(inputMode === 'classic' || currentStep === 3) && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-600/30 border border-amber-500 text-amber-400 font-bold text-xs flex items-center justify-center">
                  3
                </span>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wide">
                    Kendala, Downtime & Catatan Serah Terima
                  </h2>
                  <p className="text-[11px] text-slate-400">Pilih status operasional dan catatan untuk shift berikutnya</p>
                </div>
              </div>
              
              <div className="text-xs font-semibold text-amber-400 bg-amber-950/70 border border-amber-700/60 px-2.5 py-1 rounded-md font-mono">
                Downtime: {hasIncidentOption === 'YES' ? totalDowntimeMinutes : 0} Mnt
              </div>
            </div>

            {/* Pilihan Super Mudah: Lancar Normal vs Ada Kendala */}
            <div>
              <label className="block text-slate-300 font-semibold text-xs mb-2">
                Bagaimana Kondisi Mesin {machine} Selama Shift Anda? <span className="text-rose-400">*</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Opsi 1: Lancar Normal */}
                <button
                  type="button"
                  id="btn-incident-option-no"
                  onClick={() => {
                    setHasIncidentOption('NO');
                    setIncidents([]);
                    flashNotification('Mesin diset berjalan lancar (0 Menit Downtime)!');
                  }}
                  className={`p-4 rounded-xl border text-left transition-all relative ${
                    hasIncidentOption === 'NO'
                      ? 'bg-emerald-950/80 border-emerald-500 shadow-md ring-1 ring-emerald-500'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-emerald-400 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      Mesin Berjalan Normal & Lancar
                    </span>
                    {hasIncidentOption === 'NO' && (
                      <span className="p-1 bg-emerald-500 text-slate-950 rounded-full">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Tidak ada kendala fatal &bull; Total waktu terhenti <strong>0 Menit</strong>.
                  </p>
                </button>

                {/* Opsi 2: Ada Kendala */}
                <button
                  type="button"
                  id="btn-incident-option-yes"
                  onClick={() => setHasIncidentOption('YES')}
                  className={`p-4 rounded-xl border text-left transition-all relative ${
                    hasIncidentOption === 'YES'
                      ? 'bg-amber-950/80 border-amber-500 shadow-md ring-1 ring-amber-500'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-amber-400 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Ada Kendala / Mesin Terhenti
                    </span>
                    {hasIncidentOption === 'YES' && (
                      <span className="p-1 bg-amber-500 text-slate-950 rounded-full">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Catat kertas putus, pencucian felt, kendala steam, atau masalah mekanis.
                  </p>
                </button>
              </div>
            </div>

            {/* KOTAK INPUT KENDALA (Hanya muncul jika memilih 'Ada Kendala') */}
            {hasIncidentOption === 'YES' && (
              <div className="bg-slate-950 p-3.5 rounded-xl border border-amber-900/60 space-y-3">
                <span className="text-xs font-bold text-amber-300 block">
                  Pilih Kendala Umum (1-Klik Tambah):
                </span>

                {/* Tombol Pintas Kendala Pabrik Kertas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {QUICK_INCIDENT_PRESETS.map((preset, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => handleAddPresetIncident(preset)}
                      className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-left transition-colors"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                        <span>{preset.title}</span>
                        <span className="text-amber-400 font-mono text-[11px]">+{preset.downtime}m</span>
                      </div>
                      <span className="text-[10px] text-slate-500 block mt-0.5">{preset.location}</span>
                    </button>
                  ))}
                </div>

                {/* Daftar Kendala yang Sudah Dicatat */}
                {incidents.length > 0 && (
                  <div className="pt-2 border-t border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-slate-300 block">
                      Daftar Kendala yang Dicatat ({incidents.length} kejadian):
                    </span>
                    {incidents.map((inc) => (
                      <div
                        key={inc.id}
                        className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between text-xs gap-2"
                      >
                        <div>
                          <span className="font-mono font-bold text-amber-400 mr-2">{inc.time}</span>
                          <span className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-slate-300 mr-2">
                            {inc.location}
                          </span>
                          <span className="text-slate-200">{inc.description}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-bold font-mono text-rose-400">{inc.downtimeMinutes} mnt</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveIncident(inc.id)}
                            className="text-slate-500 hover:text-rose-400 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Input Kendala Manual Tambahan */}
                <div className="pt-2 border-t border-slate-800 text-xs">
                  <span className="text-slate-400 block mb-1.5 font-semibold">
                    Atau Ketik Kendala Manual Lainnya:
                  </span>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder="Uraian kendala / lokasi / apa yang terjadi..."
                      value={incidentDesc}
                      onChange={(e) => setIncidentDesc(e.target.value)}
                      className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        value={incidentDowntime}
                        onChange={(e) => setIncidentDowntime(Number(e.target.value))}
                        className="w-20 px-2 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 font-mono text-center"
                        title="Menit downtime"
                      />
                      <span className="text-slate-500">Mnt</span>
                      <button
                        type="button"
                        onClick={handleAddIncident}
                        className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg shrink-0"
                      >
                        + Catat
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Template Pesan Handover / Serah Terima (1-Klik) */}
            <div className="pt-2 border-t border-slate-800/80 text-xs space-y-2">
              <label className="block text-slate-300 font-semibold">
                Catatan Serah Terima (Handover) untuk Shift Berikutnya:
              </label>

              {/* Quick Template Handover Chips */}
              <div className="flex flex-wrap gap-1.5">
                {QUICK_HANDOVER_PRESETS.map((tpl, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => {
                      setHandoverNotes(tpl);
                      flashNotification('Template handover diterapkan!');
                    }}
                    className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-lg text-[11px] transition-colors text-left"
                  >
                    + {tpl.length > 45 ? tpl.slice(0, 45) + '...' : tpl}
                  </button>
                ))}
              </div>

              <textarea
                rows={2}
                value={handoverNotes}
                onChange={(e) => setHandoverNotes(e.target.value)}
                placeholder="Pesan catatan penting untuk operator shift selanjutnya..."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Tindakan Korektif yang Dilakukan */}
            <div className="text-xs">
              <label className="block text-slate-400 font-semibold mb-1">
                Tindakan yang Dilakukan Selama Shift:
              </label>
              <input
                type="text"
                value={actionsTaken}
                onChange={(e) => setActionsTaken(e.target.value)}
                placeholder="Contoh: Pembersihan kanvas, penyesuaian freeness refiner, atau operasi lancar."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Wizard Navigation / Submit */}
            {inputMode === 'wizard' && (
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Kembali ke Produksi</span>
                </button>

                <button
                  type="submit"
                  id="btn-submit-wizard"
                  className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg transition-all active:scale-[0.98]"
                >
                  <Send className="w-4 h-4" />
                  <span>{editingReport ? 'Simpan Revisi Laporan' : 'Kirim Laporan Shift'}</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* SUBMIT FOOTER FOR CLASSIC MODE */}
        {/* ========================================================================= */}
        {inputMode === 'classic' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
            <div className="text-xs text-slate-400">
              <span className="font-semibold text-slate-200">PT. Panca Usahatama Paramita</span> &bull; 
              Laporan akan langsung masuk ke riwayat & grafik kinerja.
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {editingReport && onCancelEdit && (
                <button
                  type="button"
                  onClick={onCancelEdit}
                  className="w-full sm:w-auto px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold text-xs"
                >
                  Batal
                </button>
              )}

              <button
                type="submit"
                id="btn-submit-classic"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-md transition-all active:scale-[0.98]"
              >
                <Send className="w-4 h-4" />
                <span>{editingReport ? 'Simpan Perubahan Laporan' : 'Kirim & Simpan Laporan Shift'}</span>
              </button>
            </div>
          </div>
        )}

      </form>

      {/* Edit Audit Modal Confirmation */}
      {showEditAuditModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full p-5 space-y-4 shadow-2xl text-slate-100">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-base pb-2 border-b border-slate-800">
              <History className="w-5 h-5" />
              <h3>Catat Riwayat Audit Perubahan Data</h3>
            </div>

            <p className="text-xs text-slate-300">
              Untuk kepatuhan SOP pabrik, mohon cantumkan nama petugas yang merevisi dan alasan singkat perubahan.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Nama Petugas yang Mengubah <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nama lengkap Anda..."
                  value={editorName || operatorName}
                  onChange={(e) => setEditorName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Alasan Perbaikan Data <span className="text-rose-400">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Contoh: Koreksi tonase timbangan akhir roll, atau penambahan kendala..."
                  value={editReason}
                  onChange={(e) => setEditReason(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowEditAuditModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-semibold text-xs"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmEdit}
                className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-bold text-xs shadow"
              >
                Konfirmasi & Simpan Audit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

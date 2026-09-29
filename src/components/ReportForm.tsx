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
  ShieldCheck,
  Building2,
  Users,
  HardHat,
  UserPlus,
  ChevronDown,
  Calculator,
  Gauge
} from 'lucide-react';
import { 
  ShiftReport, 
  MachineId, 
  ShiftType, 
  IncidentReport,
  PupPersonnel,
  PupGroup,
  PmJumboRollProduct,
  ProducedProductItem,
  OeeCalculation
} from '../types';
import { 
  PUP_PERSONNEL_ROSTER, 
  PT_PUP_METADATA 
} from '../data/orgStructureData';
import {
  PM_JUMBO_ROLL_PRODUCTS,
  getProductsByMachine,
  findProductByCodeOrName,
  formatPaperGradeCode,
  formatProductOptionLabel
} from '../data/pmProductData';
import { PmProductsModal } from './PmProductsModal';
import { OeeCalculatorModal } from './OeeCalculatorModal';

interface ReportFormProps {
  onSaveReport: (report: ShiftReport, editReason?: string, editorName?: string) => void;
  onOpenSop: () => void;
  onOpenTraining: (machine?: MachineId) => void;
  onOpenOrgStructure?: (initialTab?: 'chart' | 'jobdesc' | 'roster' | 'helpers' | 'matrix') => void;
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
  PM1: getProductsByMachine('PM1').map(p => formatPaperGradeCode(p)),
  PM2: getProductsByMachine('PM2').map(p => formatPaperGradeCode(p)),
  PM5: getProductsByMachine('PM5').map(p => formatPaperGradeCode(p))
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
  onOpenOrgStructure,
  editingReport,
  onCancelEdit,
  existingReports = []
}) => {
  // Input Mode: 'wizard' (Mode Cepat / 3 Langkah) vs 'classic' (Mode Formulir Lengkap)
  const [inputMode, setInputMode] = useState<'wizard' | 'classic'>('wizard');
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // A. Data Umum & Struktur Regu PT. PUP
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
  const [groupShift, setGroupShift] = useState<'Group 1' | 'Group 2' | 'Group 3'>(
    editingReport?.groupShift || 'Group 1'
  );
  const [operatorName, setOperatorName] = useState<string>(editingReport?.operatorName || '');
  const [assistantOperatorName, setAssistantOperatorName] = useState<string>(
    editingReport?.assistantOperatorName || ''
  );
  const [karuName, setKaruName] = useState<string>(
    editingReport?.karuName || ''
  );
  const [machine, setMachine] = useState<MachineId>(editingReport?.machine || 'PM1');

  // Quick Personnel Picker Dialog State
  const [showRosterModal, setShowRosterModal] = useState<boolean>(false);
  const [rosterTargetField, setRosterTargetField] = useState<'operator' | 'assistant' | 'karu'>('operator');
  const [rosterSearch, setRosterSearch] = useState<string>('');

  // B. Hasil Produksi (Standar Satuan Kg: 2.000 Kg / Shift untuk Semua Unit Mesin Kertas PM)
  const [targetProductionKg, setTargetProductionKg] = useState<number>(() => {
    if (editingReport?.targetProductionKg) return editingReport.targetProductionKg;
    if (editingReport?.targetProductionTon) return Math.round(editingReport.targetProductionTon * 1000);
    return 2000;
  });
  const [actualProductionKg, setActualProductionKg] = useState<number>(() => {
    if (editingReport?.actualProductionKg) return editingReport.actualProductionKg;
    if (editingReport?.netWeightKg) return editingReport.netWeightKg;
    if (editingReport?.actualProductionTon) return Math.round(editingReport.actualProductionTon * 1000);
    return 2000;
  });

  // Kompatibilitas Ton (sinkron dengan Kg)
  const targetProductionTon = Number((targetProductionKg / 1000).toFixed(2));
  const actualProductionTon = Number((actualProductionKg / 1000).toFixed(2));

  const [netWeightKg, setNetWeightKg] = useState<number>(() => {
    if (editingReport?.netWeightKg) return editingReport.netWeightKg;
    if (editingReport?.actualProductionKg) return editingReport.actualProductionKg;
    return 2000;
  });
  const [reelCount, setReelCount] = useState<number>(editingReport?.reelCount || 2);
  
  // Data Terintegrasi Produk Jumbo Roll PM (Mendukung 1 s/d 4 produk per shift)
  const initialMatchedProd = useMemo(() => {
    if (editingReport?.productCode) {
      return findProductByCodeOrName(editingReport.productCode);
    }
    if (editingReport?.paperGradeCode) {
      return findProductByCodeOrName(editingReport.paperGradeCode);
    }
    const machProds = getProductsByMachine(machine);
    return machProds[0];
  }, [editingReport, machine]);

  // State Array Produk yang Diproduksi Shift Ini (Bisa memilih 1 sampai 4 produk)
  const [selectedProducts, setSelectedProducts] = useState<ProducedProductItem[]>(() => {
    if (editingReport?.productsProduced && editingReport.productsProduced.length > 0) {
      return editingReport.productsProduced.slice(0, 4);
    }
    const defaultProd = initialMatchedProd || getProductsByMachine(machine)[0];
    if (defaultProd) {
      return [{
        id: `prod-init-1`,
        productCode: defaultProd.kodeBarang,
        productItemName: defaultProd.itemBarang,
        reelCount: editingReport?.reelCount || 2,
        weightKg: editingReport?.netWeightKg || 2000,
        targetGsm: defaultProd.gsm,
        gsmTolerance: defaultProd.gsmTolerance,
        tensileMdStandard: defaultProd.tensileMd,
        tensileCdStandard: defaultProd.tensileCd,
        thicknessMmStandard: defaultProd.thicknessMm,
        creepingStandard: defaultProd.creeping,
        rawMaterial: defaultProd.bahanBaku
      }];
    }
    return [{
      id: `prod-init-1`,
      productCode: '60.A.61.2.18.0275',
      productItemName: 'Mg HVS 1 Ply Putih 18 gsm Uk. 0275 mm A',
      reelCount: 2,
      weightKg: 2000,
      targetGsm: 18,
      gsmTolerance: '± 1',
      tensileMdStandard: '1200 - 1500',
      tensileCdStandard: '500-600',
      thicknessMmStandard: 0.05,
      creepingStandard: '-',
      rawMaterial: 'HVS'
    }];
  });

  const [selectedProduct, setSelectedProduct] = useState<PmJumboRollProduct | null>(initialMatchedProd || null);
  const [productCode, setProductCode] = useState<string>(
    editingReport?.productCode || initialMatchedProd?.kodeBarang || ''
  );
  const [productItemName, setProductItemName] = useState<string>(
    editingReport?.productItemName || initialMatchedProd?.itemBarang || ''
  );
  const [targetGsm, setTargetGsm] = useState<number>(
    editingReport?.targetGsm || initialMatchedProd?.gsm || 18.0
  );
  const [gsmTolerance, setGsmTolerance] = useState<string>(
    editingReport?.gsmTolerance || initialMatchedProd?.gsmTolerance || '± 1'
  );
  const [tensileMdStandard, setTensileMdStandard] = useState<string>(
    editingReport?.tensileMdStandard || initialMatchedProd?.tensileMd || ''
  );
  const [tensileCdStandard, setTensileCdStandard] = useState<string>(
    editingReport?.tensileCdStandard || initialMatchedProd?.tensileCd || ''
  );
  const [thicknessMmStandard, setThicknessMmStandard] = useState<number>(
    editingReport?.thicknessMmStandard || initialMatchedProd?.thicknessMm || 0.05
  );
  const [creepingStandard, setCreepingStandard] = useState<string>(
    editingReport?.creepingStandard || initialMatchedProd?.creeping || '-'
  );
  const [rawMaterial, setRawMaterial] = useState<'HVS' | 'PULP'>(
    editingReport?.rawMaterial || initialMatchedProd?.bahanBaku || 'HVS'
  );
  const [showProductCatalogModal, setShowProductCatalogModal] = useState<boolean>(false);

  const [paperGradeCode, setPaperGradeCode] = useState<string>(() => {
    if (editingReport?.paperGradeCode) return editingReport.paperGradeCode;
    if (initialMatchedProd) return formatPaperGradeCode(initialMatchedProd);
    return PAPER_GRADE_PRESETS.PM1[0];
  });

  // Handler penambahan slot produk (mendukung 1 s/d 4 produk dalam satu shift)
  const handleAddProductSlot = () => {
    if (selectedProducts.length >= 4) {
      flashNotification('Maksimal 4 produk dalam satu shift sesuai kapasitas operasional mesin.');
      return;
    }
    const machineProds = getProductsByMachine(machine);
    const existingCodes = selectedProducts.map(p => p.productCode);
    const candidate = machineProds.find(p => !existingCodes.includes(p.kodeBarang)) || machineProds[0];

    const newSlot: ProducedProductItem = {
      id: `prod-${Date.now()}-${selectedProducts.length + 1}`,
      productCode: candidate.kodeBarang,
      productItemName: candidate.itemBarang,
      reelCount: 1,
      weightKg: 500,
      targetGsm: candidate.gsm,
      gsmTolerance: candidate.gsmTolerance,
      tensileMdStandard: candidate.tensileMd,
      tensileCdStandard: candidate.tensileCd,
      thicknessMmStandard: candidate.thicknessMm,
      creepingStandard: candidate.creeping,
      rawMaterial: candidate.bahanBaku
    };

    const nextProducts = [...selectedProducts, newSlot];
    setSelectedProducts(nextProducts);

    // Hitung ulang total rol & berat gabungan
    const totalReels = nextProducts.reduce((acc, p) => acc + (p.reelCount || 0), 0);
    const totalKg = nextProducts.reduce((acc, p) => acc + (p.weightKg || 0), 0);
    setReelCount(totalReels);
    handleActualKgChange(totalKg);

    flashNotification(`Produk #${nextProducts.length} (${candidate.itemBarang}) ditambahkan ke shift ini.`);
  };

  // Handler penghapusan slot produk
  const handleRemoveProductSlot = (index: number) => {
    if (selectedProducts.length <= 1) {
      flashNotification('Minimal harus ada 1 produk yang dipilih untuk shift ini.');
      return;
    }
    const nextProducts = selectedProducts.filter((_, idx) => idx !== index);
    setSelectedProducts(nextProducts);

    // Sync produk utama jika slot 0 berubah
    if (nextProducts.length > 0) {
      const p1 = nextProducts[0];
      setProductCode(p1.productCode);
      setProductItemName(p1.productItemName);
      setPaperGradeCode(`${p1.productItemName} [${p1.productCode}]`);
      const matched = findProductByCodeOrName(p1.productCode);
      if (matched) setSelectedProduct(matched);
    }

    const totalReels = nextProducts.reduce((acc, p) => acc + (p.reelCount || 0), 0);
    const totalKg = nextProducts.reduce((acc, p) => acc + (p.weightKg || 0), 0);
    setReelCount(totalReels);
    handleActualKgChange(totalKg);

    flashNotification('Produk berhasil dihapus dari daftar shift.');
  };

  // Handler update atribut produk tertentu
  const handleUpdateProductSlot = (index: number, updates: Partial<ProducedProductItem>) => {
    const nextProducts = selectedProducts.map((p, idx) => {
      if (idx === index) {
        return { ...p, ...updates };
      }
      return p;
    });
    setSelectedProducts(nextProducts);

    if (index === 0) {
      if (updates.productCode) setProductCode(updates.productCode);
      if (updates.productItemName) setProductItemName(updates.productItemName);
      if (updates.targetGsm) setTargetGsm(updates.targetGsm);
      if (updates.gsmTolerance) setGsmTolerance(updates.gsmTolerance);
      if (updates.tensileMdStandard) setTensileMdStandard(updates.tensileMdStandard);
      if (updates.tensileCdStandard) setTensileCdStandard(updates.tensileCdStandard);
      if (updates.thicknessMmStandard) setThicknessMmStandard(updates.thicknessMmStandard);
      if (updates.creepingStandard) setCreepingStandard(updates.creepingStandard);
      if (updates.rawMaterial) setRawMaterial(updates.rawMaterial);
      if (updates.productCode || updates.productItemName) {
        setPaperGradeCode(`${updates.productItemName || selectedProducts[0].productItemName} [${updates.productCode || selectedProducts[0].productCode}]`);
      }
    }

    if (updates.reelCount !== undefined || updates.weightKg !== undefined) {
      const totalReels = nextProducts.reduce((acc, p) => acc + (p.reelCount || 0), 0);
      const totalKg = nextProducts.reduce((acc, p) => acc + (p.weightKg || 0), 0);
      setReelCount(totalReels);
      handleActualKgChange(totalKg);
    }
  };

  // Handler saat memilih produk Jumbo Roll resmi
  const handleSelectProduct = (prod: PmJumboRollProduct, slotIndex: number = 0) => {
    if (slotIndex === 0) {
      setSelectedProduct(prod);
      setProductCode(prod.kodeBarang);
      setProductItemName(prod.itemBarang);
      setPaperGradeCode(formatPaperGradeCode(prod));
      setTargetGsm(prod.gsm);
      setGsmTolerance(prod.gsmTolerance);
      setTensileMdStandard(prod.tensileMd);
      setTensileCdStandard(prod.tensileCd);
      setThicknessMmStandard(prod.thicknessMm);
      setCreepingStandard(prod.creeping);
      setRawMaterial(prod.bahanBaku);
      setThicknessMicron(prod.thicknessMicron);
    }

    setSelectedProducts(prev => {
      const next = [...prev];
      if (slotIndex < next.length) {
        next[slotIndex] = {
          ...next[slotIndex],
          productCode: prod.kodeBarang,
          productItemName: prod.itemBarang,
          targetGsm: prod.gsm,
          gsmTolerance: prod.gsmTolerance,
          tensileMdStandard: prod.tensileMd,
          tensileCdStandard: prod.tensileCd,
          thicknessMmStandard: prod.thicknessMm,
          creepingStandard: prod.creeping,
          rawMaterial: prod.bahanBaku
        };
      }
      return next;
    });

    flashNotification(`Produk ${prod.itemBarang} (${prod.kodeBarang}) berhasil dimuat.`);
  };

  // Parsing daftar personel multi-select (Operator Utama, Pembantu Operator, Kepala Regu)
  // Tidak ada batasan 6 orang: bisa memilih bebas lebih dari 6 orang!
  const selectedOperatorList = useMemo(() => {
    return operatorName.split(',').map(s => s.trim()).filter(Boolean);
  }, [operatorName]);

  const selectedHelperList = useMemo(() => {
    return assistantOperatorName.split(',').map(s => s.trim()).filter(Boolean);
  }, [assistantOperatorName]);

  const selectedKaruList = useMemo(() => {
    return karuName.split(',').map(s => s.trim()).filter(Boolean);
  }, [karuName]);

  // Toggle multi-select operator utama
  const toggleOperator = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const current = operatorName.split(',').map(s => s.trim()).filter(Boolean);
    let updated: string[];
    if (current.includes(trimmed)) {
      updated = current.filter(n => n !== trimmed);
    } else {
      updated = [...current, trimmed];
    }
    setOperatorName(updated.join(', '));
  };

  // Toggle multi-select pembantu operator (helper)
  const toggleHelper = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const current = assistantOperatorName.split(',').map(s => s.trim()).filter(Boolean);
    let updated: string[];
    if (current.includes(trimmed)) {
      updated = current.filter(n => n !== trimmed);
    } else {
      updated = [...current, trimmed];
    }
    setAssistantOperatorName(updated.join(', '));
  };

  // Toggle multi-select kepala regu / wakil PM
  const toggleKaru = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const current = karuName.split(',').map(s => s.trim()).filter(Boolean);
    let updated: string[];
    if (current.includes(trimmed)) {
      updated = current.filter(n => n !== trimmed);
    } else {
      updated = [...current, trimmed];
    }
    setKaruName(updated.join(', '));
  };

  // C. Kualitas Produk (Satuan Kg)
  const [qualityGradeA, setQualityGradeA] = useState<number>(() => {
    if (editingReport?.qualityGradeA_Ton) {
      return editingReport.qualityGradeA_Ton > 10 ? Math.round(editingReport.qualityGradeA_Ton) : Math.round(editingReport.qualityGradeA_Ton * 1000);
    }
    return 1850;
  });
  const [qualityGradeB, setQualityGradeB] = useState<number>(() => {
    if (editingReport?.qualityGradeB_Ton) {
      return editingReport.qualityGradeB_Ton > 10 ? Math.round(editingReport.qualityGradeB_Ton) : Math.round(editingReport.qualityGradeB_Ton * 1000);
    }
    return 120;
  });
  const [qualityGradeC, setQualityGradeC] = useState<number>(() => {
    if (editingReport?.qualityGradeC_Ton) {
      return editingReport.qualityGradeC_Ton > 10 ? Math.round(editingReport.qualityGradeC_Ton) : Math.round(editingReport.qualityGradeC_Ton * 1000);
    }
    return 30;
  });
  const [qualityGradeDefect, setQualityGradeDefect] = useState<number>(() => {
    if (editingReport?.qualityGradeDefect_Ton) {
      return editingReport.qualityGradeDefect_Ton > 10 ? Math.round(editingReport.qualityGradeDefect_Ton) : Math.round(editingReport.qualityGradeDefect_Ton * 1000);
    }
    return 0;
  });

  // Parameter Kualitas Fisik Lab
  const [thicknessMicron, setThicknessMicron] = useState<number>(
    editingReport?.thicknessMicron || initialMatchedProd?.thicknessMicron || 50
  );
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

  // Calculated properties (Standar Satuan Kg: 2000 Kg / shift)
  const achievementPercentage = targetProductionKg > 0 
    ? Number(((actualProductionKg / targetProductionKg) * 100).toFixed(2)) 
    : 0;

  const totalQualityTon = qualityGradeA + qualityGradeB + qualityGradeC + qualityGradeDefect;
  const defectPercentage = totalQualityTon > 0 
    ? Number(((qualityGradeDefect / totalQualityTon) * 100).toFixed(2)) 
    : 0;

  // Total Downtime
  const totalDowntimeMinutes = incidents.reduce((acc, inc) => acc + (inc.downtimeMinutes || 0), 0);

  // Utilitas OEE (Overall Equipment Effectiveness) State
  const [oeeCalculation, setOeeCalculation] = useState<OeeCalculation | undefined>(editingReport?.oee);
  const [showOeeModal, setShowOeeModal] = useState<boolean>(false);

  // Perhitungan Real-Time Estimasi Cepat OEE (Availability, Performance, Quality)
  const quickOeeEstimate = useMemo<OeeCalculation>(() => {
    if (oeeCalculation) return oeeCalculation;

    const plannedOperatingMinutes = 450; // 480 menit standar - 30 menit istirahat & briefing
    const downtime = hasIncidentOption === 'YES' ? totalDowntimeMinutes : 0;
    const actualOperatingMinutes = Math.max(0, plannedOperatingMinutes - downtime);

    // Availability Rate (%)
    const rawAvail = (actualOperatingMinutes / plannedOperatingMinutes) * 100;
    const availability = Math.min(100, Math.max(0, Number(rawAvail.toFixed(2))));

    // Performance Rate (%)
    const expectedTon = (targetProductionTon / plannedOperatingMinutes) * actualOperatingMinutes;
    let rawPerf = 100;
    if (expectedTon > 0) {
      rawPerf = (actualProductionTon / expectedTon) * 100;
    } else if (targetProductionTon > 0) {
      rawPerf = (actualProductionTon / targetProductionTon) * 100;
    }
    const performance = Math.min(120, Math.max(0, Number(rawPerf.toFixed(2))));

    // Quality Rate (%)
    const totalProd = Math.max(0.01, actualProductionTon);
    const goodTon = Math.max(0, qualityGradeA + qualityGradeB + qualityGradeC);
    const rawQual = (goodTon / totalProd) * 100;
    const quality = Math.min(100, Math.max(0, Number(rawQual.toFixed(2))));

    // OEE Total (%)
    const rawOee = (availability * performance * quality) / 10000;
    const oee = Math.min(100, Math.max(0, Number(rawOee.toFixed(2))));

    let status: OeeCalculation['status'] = 'NEEDS_IMPROVEMENT';
    if (oee >= 85) status = 'WORLD_CLASS';
    else if (oee >= 75) status = 'GOOD';
    else if (oee >= 65) status = 'FAIR';

    return {
      availability,
      performance,
      quality,
      oee,
      plannedTimeMinutes: 480,
      plannedDowntimeMinutes: 30,
      unplannedDowntimeMinutes: downtime,
      operatingTimeMinutes: actualOperatingMinutes,
      targetProductionTon,
      actualProductionTon,
      goodProductionTon: Number(goodTon.toFixed(2)),
      defectProductionTon: qualityGradeDefect,
      status
    };
  }, [
    oeeCalculation,
    hasIncidentOption,
    totalDowntimeMinutes,
    targetProductionTon,
    actualProductionTon,
    qualityGradeA,
    qualityGradeB,
    qualityGradeC,
    qualityGradeDefect
  ]);

  // Handler saat operator menerapkan hasil kalkulator OEE ke laporan
  const handleApplyOee = (calculation: OeeCalculation, summaryNote?: string) => {
    setOeeCalculation(calculation);
    if (summaryNote) {
      setHandoverNotes(prev => {
        if (!prev) return summaryNote;
        if (prev.includes(summaryNote)) return prev;
        return `${prev}\n${summaryNote}`;
      });
    }
    flashNotification(`Hasil OEE (${calculation.oee}%) berhasil disimpan dan diterapkan ke laporan shift!`);
  };

  // Daftar Operator Resmi PT. PUP yang relevan dengan Mesin & Group aktif (Bebas tanpa batasan >6 orang)
  const operatorsForActiveSelection = useMemo(() => {
    const matching = PUP_PERSONNEL_ROSTER.filter(p => 
      !p.isHelper &&
      (p.unit === machine || p.unit === 'STOCK_PREP' || p.unit === 'REWINDER' || p.unit === 'MANAGEMENT')
    );
    const names = new Set<string>(matching.map(m => m.name));
    existingReports.forEach(r => {
      if (r.operatorName && r.operatorName.trim()) {
        r.operatorName.split(',').forEach(n => {
          if (n.trim()) names.add(n.trim());
        });
      }
    });
    DEFAULT_OPERATOR_NAMES.forEach(n => names.add(n));
    return Array.from(names);
  }, [machine, existingReports]);

  // Daftar Pembantu Operator (Helper) Resmi PT. PUP yang relevan dengan group / mesin (Bebas tanpa batasan >6 orang)
  const helpersForActiveSelection = useMemo(() => {
    const matching = PUP_PERSONNEL_ROSTER.filter(p => p.isHelper);
    const names = new Set<string>(matching.map(m => m.name));
    existingReports.forEach(r => {
      if (r.assistantOperatorName && r.assistantOperatorName.trim()) {
        r.assistantOperatorName.split(',').forEach(n => {
          if (n.trim()) names.add(n.trim());
        });
      }
    });
    return Array.from(names);
  }, [existingReports]);

  // Daftar Kepala Regu / Unit Head PT. PUP (Bebas tanpa batasan >6 orang)
  const foremenList = useMemo(() => [
    { name: 'Untung S', title: 'Kepala PM 1', unit: 'PM1' },
    { name: 'Sarino', title: 'Wakil 1 PM 1', unit: 'PM1' },
    { name: 'Piih Samboja', title: 'Wakil 2 PM 1', unit: 'PM1' },
    { name: 'Rumawan', title: 'Kepala PM 2', unit: 'PM2' },
    { name: 'CANDRA S', title: 'Wakil 1 PM 2', unit: 'PM2' },
    { name: 'Lukman A', title: 'Wakil 2 PM 2', unit: 'PM2' },
    { name: 'Suwardi', title: 'Kepala PM 5', unit: 'PM5' },
    { name: 'Bambang JH', title: 'Wakil 1 PM 5', unit: 'PM5' },
    { name: 'Warsito', title: 'Wakil 2 PM 5', unit: 'PM5' },
    { name: 'YANA ANDRIYANA', title: 'Kepala Boiler', unit: 'BOILER' },
    { name: 'Kelik Heriyono', title: 'Kepala Pabrik', unit: 'MANAGEMENT' }
  ], []);

  // Backward-compatible alias
  const operatorSuggestions = operatorsForActiveSelection;

  const flashNotification = (msg: string) => {
    setQuickNotification(msg);
    setTimeout(() => {
      setQuickNotification(null);
    }, 3500);
  };

  // Set default target based on machine when machine changes (unless in edit mode)
  // Sesuai instruksi: Target standar untuk semua unit mesin kertas (PM1, PM2, PM5) per shift adalah 2000 Kg / shift (2 Ton)
  const handleMachineChange = (newMachine: MachineId) => {
    setMachine(newMachine);
    if (!editingReport) {
      const machineProds = getProductsByMachine(newMachine);
      if (machineProds.length > 0) {
        const prod = machineProds[0];
        handleSelectProduct(prod, 0);
        setSelectedProducts([{
          id: `prod-init-${Date.now()}-1`,
          productCode: prod.kodeBarang,
          productItemName: prod.itemBarang,
          reelCount: 2,
          weightKg: 2000,
          targetGsm: prod.gsm,
          gsmTolerance: prod.gsmTolerance,
          tensileMdStandard: prod.tensileMd,
          tensileCdStandard: prod.tensileCd,
          thicknessMmStandard: prod.thicknessMm,
          creepingStandard: prod.creeping,
          rawMaterial: prod.bahanBaku
        }]);
      }
      setTargetProductionKg(2000);
      setActualProductionKg(2000);
      setNetWeightKg(2000);
      setReelCount(2);
      setQualityGradeA(1.85);
      setQualityGradeB(0.12);
      setQualityGradeC(0.03);
      setQualityGradeDefect(0.0);
    }
  };

  // 1-Click Auto Fill Normal Standard (Target 2000 Kg per Shift untuk Semua Mesin)
  const handleQuickFillNormal = () => {
    setTargetProductionKg(2000);
    setActualProductionKg(2000);
    setNetWeightKg(2000);
    setReelCount(2);
    setQualityGradeA(1.85);
    setQualityGradeB(0.12);
    setQualityGradeC(0.03);
    setQualityGradeDefect(0.0);

    const machProds = getProductsByMachine(machine);
    if (machProds.length > 0) {
      const prod = machProds[0];
      handleSelectProduct(prod, 0);
      setSelectedProducts([{
        id: `prod-init-${Date.now()}-1`,
        productCode: prod.kodeBarang,
        productItemName: prod.itemBarang,
        reelCount: 2,
        weightKg: 2000,
        targetGsm: prod.gsm,
        gsmTolerance: prod.gsmTolerance,
        tensileMdStandard: prod.tensileMd,
        tensileCdStandard: prod.tensileCd,
        thicknessMmStandard: prod.thicknessMm,
        creepingStandard: prod.creeping,
        rawMaterial: prod.bahanBaku
      }]);
    }

    if (machine === 'PM1') {
      setMoisturePercent(7.8);
      setTensileStrength(1350);
      setSurfaceSmoothness(300);
    } else if (machine === 'PM2') {
      setMoisturePercent(7.5);
      setTensileStrength(1350);
      setSurfaceSmoothness(350);
    } else if (machine === 'PM5') {
      setMoisturePercent(6.5);
      setTensileStrength(320);
      setSurfaceSmoothness(120);
    }
    setHasIncidentOption('NO');
    setIncidents([]);
    setSelectedDefects([]);
    setActionsTaken('Semua seksi beroperasi normal sesuai standar parameter mesin.');
    setHandoverNotes('Kondisi mesin prima, target standar 2.000 Kg / shift tercapai.');
    flashNotification(`Nilai standar normal ${machine} (2.000 Kg / shift) berhasil diisikan otomatis!`);
  };

  // Adjust Realisasi Kg with +/- buttons
  const adjustActualKg = (amount: number) => {
    const newVal = Math.max(0, actualProductionKg + amount);
    handleActualKgChange(newVal);
    if (selectedProducts.length === 1) {
      setSelectedProducts([{ ...selectedProducts[0], weightKg: newVal }]);
    }
  };

  // Adjust Tonase (kompatibilitas)
  const adjustActualTon = (amount: number) => {
    adjustActualKg(Math.round(amount * 1000));
  };

  const adjustReelCount = (amount: number) => {
    const newCount = Math.max(1, reelCount + amount);
    setReelCount(newCount);
    if (selectedProducts.length === 1) {
      setSelectedProducts([{ ...selectedProducts[0], reelCount: newCount }]);
    }
  };

  // Handler perubahan realisasi aktual dalam Kg (Standar 2000 Kg / shift)
  const handleActualKgChange = (val: number) => {
    const validVal = Math.max(0, val);
    setActualProductionKg(validVal);
    setNetWeightKg(validVal);
    
    // Proporsi distribusi kualitas berdasarkan Kg
    setQualityGradeA(Math.round(validVal * 0.92));
    setQualityGradeB(Math.round(validVal * 0.06));
    setQualityGradeC(Math.round(validVal * 0.015));
    setQualityGradeDefect(Math.round(validVal * 0.005));
  };

  // Keep net weight synced and re-apportion quality (kompatibilitas ton)
  const handleActualTonChange = (valTon: number) => {
    handleActualKgChange(Math.round(valTon * 1000));
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
        groupShift,
        operatorName,
        assistantOperatorName,
        karuName,
        machine,
        targetProductionKg,
        actualProductionKg,
        targetProductionTon,
        actualProductionTon,
        netWeightKg,
        reelCount,
        paperGradeCode,
        selectedProducts,
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
        oeeCalculation
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
    groupShift,
    operatorName,
    assistantOperatorName,
    karuName,
    machine,
    targetProductionKg,
    actualProductionKg,
    targetProductionTon,
    actualProductionTon,
    netWeightKg,
    reelCount,
    paperGradeCode,
    selectedProducts,
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
    oeeCalculation,
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
          if (parsed.assistantOperatorName) setAssistantOperatorName(parsed.assistantOperatorName);
          if (parsed.karuName) setKaruName(parsed.karuName);
          if (parsed.groupShift) setGroupShift(parsed.groupShift);
          if (parsed.targetProductionKg) setTargetProductionKg(parsed.targetProductionKg);
          if (parsed.actualProductionKg) setActualProductionKg(parsed.actualProductionKg);
          if (parsed.selectedProducts && Array.isArray(parsed.selectedProducts) && parsed.selectedProducts.length > 0) {
            setSelectedProducts(parsed.selectedProducts.slice(0, 4));
          }
          if (parsed.shift) {
            let s = parsed.shift;
            if (s === 'Pagi') s = 'Shift 1';
            else if (s === 'Siang') s = 'Shift 2';
            else if (s === 'Malam') s = 'Shift 3';
            setShift(s);
          }
          if (parsed.oeeCalculation) {
            setOeeCalculation(parsed.oeeCalculation);
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

    if (actualProductionKg <= 0 && actualProductionTon <= 0) {
      alert('Mohon periksa Hasil Produksi Aktual (Kg) tidak boleh nol.');
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
      groupShift,
      operatorName: operatorName.trim(),
      operatorNames: selectedOperatorList,
      assistantOperatorName: assistantOperatorName.trim(),
      assistantOperatorNames: selectedHelperList,
      karuName: karuName.trim(),
      karuNames: selectedKaruList,
      machine,
      targetProductionKg: Number(targetProductionKg) || 2000,
      actualProductionKg: Number(actualProductionKg) || Number(netWeightKg) || 2000,
      targetProductionTon: Number((targetProductionKg / 1000).toFixed(2)),
      actualProductionTon: Number((actualProductionKg / 1000).toFixed(2)),
      achievementPercentage,
      netWeightKg: Number(netWeightKg) || Number(actualProductionKg) || 2000,
      reelCount: Number(reelCount) || 0,
      paperGradeCode,
      productCode: productCode || selectedProduct?.kodeBarang,
      productItemName: productItemName || selectedProduct?.itemBarang,
      targetGsm: Number(targetGsm) || selectedProduct?.gsm,
      gsmTolerance: gsmTolerance || selectedProduct?.gsmTolerance,
      tensileMdStandard: tensileMdStandard || selectedProduct?.tensileMd,
      tensileCdStandard: tensileCdStandard || selectedProduct?.tensileCd,
      thicknessMmStandard: Number(thicknessMmStandard) || selectedProduct?.thicknessMm,
      creepingStandard: creepingStandard || selectedProduct?.creeping,
      rawMaterial: rawMaterial || selectedProduct?.bahanBaku,
      productsProduced: selectedProducts,
      qualityGradeA_Ton: Number((qualityGradeA / 1000).toFixed(3)),
      qualityGradeB_Ton: Number((qualityGradeB / 1000).toFixed(3)),
      qualityGradeC_Ton: Number((qualityGradeC / 1000).toFixed(3)),
      qualityGradeDefect_Ton: Number((qualityGradeDefect / 1000).toFixed(3)),
      thicknessMicron: Number(thicknessMicron) || 0,
      moisturePercent: Number(moisturePercent) || 0,
      tensileStrength: Number(tensileStrength) || 0,
      surfaceSmoothness: Number(surfaceSmoothness) || 0,
      defectPercentage,
      defectTypes: selectedDefects,
      incidents: hasIncidentOption === 'YES' ? incidents : [],
      totalDowntimeMinutes: hasIncidentOption === 'YES' ? totalDowntimeMinutes : 0,
      oee: oeeCalculation || quickOeeEstimate,
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
        groupShift,
        operatorName: operatorName.trim(),
        operatorNames: selectedOperatorList,
        assistantOperatorName: assistantOperatorName.trim(),
        assistantOperatorNames: selectedHelperList,
        karuName: karuName.trim(),
        karuNames: selectedKaruList,
        machine,
        targetProductionKg: Number(targetProductionKg) || 2000,
        actualProductionKg: Number(actualProductionKg) || Number(netWeightKg) || 2000,
        targetProductionTon: Number((targetProductionKg / 1000).toFixed(2)),
        actualProductionTon: Number((actualProductionKg / 1000).toFixed(2)),
        achievementPercentage,
        netWeightKg: Number(netWeightKg) || Number(actualProductionKg) || 2000,
        reelCount: Number(reelCount) || 0,
        paperGradeCode,
        productCode: productCode || selectedProduct?.kodeBarang,
        productItemName: productItemName || selectedProduct?.itemBarang,
        targetGsm: Number(targetGsm) || selectedProduct?.gsm,
        gsmTolerance: gsmTolerance || selectedProduct?.gsmTolerance,
        tensileMdStandard: tensileMdStandard || selectedProduct?.tensileMd,
        tensileCdStandard: tensileCdStandard || selectedProduct?.tensileCd,
        thicknessMmStandard: Number(thicknessMmStandard) || selectedProduct?.thicknessMm,
        creepingStandard: creepingStandard || selectedProduct?.creeping,
        rawMaterial: rawMaterial || selectedProduct?.bahanBaku,
        productsProduced: selectedProducts,
        qualityGradeA_Ton: Number((qualityGradeA / 1000).toFixed(3)),
        qualityGradeB_Ton: Number((qualityGradeB / 1000).toFixed(3)),
        qualityGradeC_Ton: Number((qualityGradeC / 1000).toFixed(3)),
        qualityGradeDefect_Ton: Number((qualityGradeDefect / 1000).toFixed(3)),
        thicknessMicron: Number(thicknessMicron) || 0,
        moisturePercent: Number(moisturePercent) || 0,
        tensileStrength: Number(tensileStrength) || 0,
        surfaceSmoothness: Number(surfaceSmoothness) || 0,
        defectPercentage,
        defectTypes: selectedDefects,
        incidents: hasIncidentOption === 'YES' ? incidents : [],
        totalDowntimeMinutes: hasIncidentOption === 'YES' ? totalDowntimeMinutes : 0,
        oee: oeeCalculation || quickOeeEstimate,
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

          {/* OEE Calculator Shortcut Button */}
          <button
            type="button"
            onClick={() => setShowOeeModal(true)}
            id="btn-open-oee-calculator"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white rounded-lg text-xs font-bold transition-all shadow-sm ring-1 ring-blue-400/40"
            title="Buka Utilitas Kalkulator OEE (Availability, Performance, Quality)"
          >
            <Calculator className="w-3.5 h-3.5 text-cyan-300" />
            <span>Kalkulator OEE</span>
            <span className={`px-1.5 py-0.2 rounded font-mono text-[10px] font-bold ${
              quickOeeEstimate.oee >= 85 
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' 
                : quickOeeEstimate.oee >= 75 
                ? 'bg-blue-950 text-blue-300 border border-blue-700' 
                : 'bg-amber-950 text-amber-300 border border-amber-700'
            }`}>
              {quickOeeEstimate.oee}%
            </span>
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

            {/* Pilihan Mesin & Produk Resmi PT. PUP (Data Produksi Jumbo Roll) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-slate-300 font-semibold text-xs">
                  Pilih Unit Mesin Kertas <span className="text-rose-400">*</span>
                </label>
                <span className="text-[11px] text-amber-400/90 font-medium">
                  Sesuai Master Dokumen Data Produksi Jumbo Roll PT. PUP
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {([
                  { 
                    id: 'PM1' as MachineId, 
                    title: 'MESIN PM 1',
                    productName: 'MG HVS, Facial, Toilet & Napkin Pulp', 
                    spec: '13 - 20 GSM • Putih (Bahan Baku: HVS & PULP)', 
                    target: '2 Ton',
                    itemCount: '9 Item Produk',
                    itemsSummary: 'MG HVS (Putih) • Facial Pulp (3 uk.) • Toilet Pulp (2 uk.) • Napkin Pulp (2 uk.)'
                  },
                  { 
                    id: 'PM2' as MachineId, 
                    title: 'MESIN PM 2',
                    productName: 'MG HVS 1 PLY (Kuning, Pink, Putih)', 
                    spec: '18 GSM (± 1) • Tebal 0.05 mm (Bahan Baku: HVS)', 
                    target: '2 Ton',
                    itemCount: '6 Item Produk',
                    itemsSummary: 'MG HVS Kuning (2 uk.) • MG HVS Pink (2 uk.) • MG HVS Putih (2 uk.)'
                  },
                  { 
                    id: 'PM5' as MachineId, 
                    title: 'MESIN PM 5',
                    productName: 'TOILET HVS 2 PLY PUTIH', 
                    spec: '17 GSM (± 1) • Creeping 20% • Tebal 0.13 mm', 
                    target: '2 Ton',
                    itemCount: '8 Item Produk',
                    itemsSummary: 'Toilet HVS 2 Ply Putih (Lebar: 200, 380, 400, 530, 800, 1140, 2200, 1300 mm)'
                  }
                ]).map((m) => {
                  const isSelected = machine === m.id;
                  return (
                    <button
                      type="button"
                      key={m.id}
                      id={`machine-select-${m.id}`}
                      onClick={() => handleMachineChange(m.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                        isSelected
                          ? 'bg-emerald-950/80 border-emerald-500 shadow-md ring-1 ring-emerald-500'
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className={`text-base font-black font-mono tracking-wide ${isSelected ? 'text-emerald-300' : 'text-white'}`}>
                            {m.title}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono font-bold">
                              {m.itemCount}
                            </span>
                            {isSelected && (
                              <span className="p-1 bg-emerald-500 text-slate-950 rounded-full">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Nama Produk Resmi PM */}
                        <div className="text-xs font-bold text-amber-300 mt-1.5 leading-snug">
                          {m.productName}
                        </div>
                        
                        {/* Spesifikasi Teknis */}
                        <div className="text-[11px] text-slate-300 mt-1">
                          {m.spec}
                        </div>

                        {/* Ringkasan Varian Item */}
                        <div className="text-[10px] text-slate-400 mt-1.5 leading-relaxed bg-slate-900/70 p-1.5 rounded border border-slate-800/80">
                          {m.itemsSummary}
                        </div>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                        <span className="text-emerald-400 font-mono font-bold">
                          Target Standar: {m.target} / shift
                        </span>
                        <span className="text-slate-400">
                          {isSelected ? '✓ Terpilih' : 'Klik untuk Pilih'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Sub-Panel: Pilihan Cepat Produk Jumbo Roll untuk Mesin Aktif */}
              <div className="mt-3 p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-200">
                      Pilih Item Produk Mesin {machine}:
                    </span>
                    <span className="text-[11px] text-amber-400 font-mono">
                      ({getProductsByMachine(machine).length} varian resmi PT. PUP)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowProductCatalogModal(true)}
                    className="text-[11px] text-amber-400 hover:text-amber-300 underline font-semibold flex items-center gap-1"
                  >
                    <Layers className="w-3 h-3" />
                    <span>Lihat Tabel Master Produk</span>
                  </button>
                </div>

                {/* Quick Interactive Product Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5 max-h-52 overflow-y-auto pr-1">
                  {getProductsByMachine(machine).map((prod) => {
                    const isProdActive = selectedProduct?.id === prod.id || productCode === prod.kodeBarang;
                    return (
                      <button
                        type="button"
                        key={prod.id}
                        onClick={() => handleSelectProduct(prod)}
                        className={`p-2 rounded-lg border text-left text-xs transition-all flex items-start justify-between gap-2 ${
                          isProdActive
                            ? 'bg-amber-950/60 border-amber-500 text-white shadow-sm ring-1 ring-amber-500/50'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850'
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-[11px] truncate text-slate-100">
                            {prod.no}. {prod.itemBarang}
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5 font-mono">
                            <span>{prod.kodeBarang}</span>
                            <span>•</span>
                            <span className="text-amber-300 font-semibold">{prod.gsm} GSM</span>
                            <span>•</span>
                            <span>{prod.bahanBaku}</span>
                          </div>
                        </div>
                        {isProdActive && (
                          <span className="shrink-0 p-0.5 bg-amber-500 text-slate-950 rounded">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Shift, Group Kerja & Tanggal */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
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
                      className={`py-2 px-1.5 text-center font-bold text-xs rounded-xl border transition-all ${
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

              {/* Group Kerja PT. PUP (Group 1, 2, 3) */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5 flex items-center justify-between">
                  <span>Group Regu Kerja PT. PUP <span className="text-rose-400">*</span></span>
                  <span className="text-[10px] text-cyan-400 font-mono">Rotasi 3 Regu</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['Group 1', 'Group 2', 'Group 3'] as const).map((grp) => (
                    <button
                      type="button"
                      key={grp}
                      id={`group-select-${grp.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => setGroupShift(grp)}
                      className={`py-2 px-1.5 text-center font-bold text-xs rounded-xl border transition-all ${
                        groupShift === grp
                          ? 'bg-cyan-600 border-cyan-500 text-white shadow'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {grp}
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
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 font-mono text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Sub-Section: Struktur Personel Regu Shift PT. PUP */}
            <div className="mt-4 p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3.5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-900/60 border border-blue-600/50 flex items-center justify-center text-blue-300">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <span>Penugasan Personel Shift ({groupShift})</span>
                      <span className="text-[10px] font-normal px-2 py-0.5 rounded bg-blue-950 border border-blue-700/50 text-blue-300">
                        {machine}
                      </span>
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Sesuai Struktur Organisasi Pabrik PT. Panca Usahatama Paramita
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setRosterTargetField('operator');
                      setRosterSearch('');
                      setShowRosterModal(true);
                    }}
                    className="px-2.5 py-1 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    <UserPlus className="w-3.5 h-3.5 text-blue-400" />
                    <span>Daftar Personel PT. PUP</span>
                  </button>

                  {onOpenOrgStructure && (
                    <>
                      <button
                        type="button"
                        onClick={() => onOpenOrgStructure('jobdesc')}
                        className="px-2.5 py-1 text-xs font-semibold bg-indigo-950/80 hover:bg-indigo-900 text-indigo-200 border border-indigo-600/50 rounded-lg flex items-center gap-1.5 transition-colors"
                        title="Buka Bagan Struktur Lengkap & SOP Job Desc Tiap Jabatan"
                      >
                        <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Job Desc & Bagan</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onOpenOrgStructure('matrix')}
                        className="px-2.5 py-1 text-xs font-semibold bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 border border-emerald-600/50 rounded-lg flex items-center gap-1.5 transition-colors"
                        title="Buka Matriks Tanggung Jawab Operasional & RACI Matrix Shift"
                      >
                        <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Matriks RACI</span>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Grid 3 Kolom: Operator Utama, Pembantu Operator (Helper), Kepala Regu - Bebas Memilih Lebih Dari 6 Orang */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {/* 1. Operator Utama */}
                <div className="space-y-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <span>Operator Utama ({machine})</span>
                      <span className="text-rose-400">*</span>
                    </label>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-blue-950 text-blue-300 border border-blue-700/60">
                      {selectedOperatorList.length} Terpilih (Bebas &gt;6)
                    </span>
                  </div>

                  {/* Selected Pills / Tags */}
                  {selectedOperatorList.length > 0 && (
                    <div className="flex flex-wrap gap-1 p-1.5 bg-slate-950/80 rounded-lg border border-slate-800 max-h-24 overflow-y-auto">
                      {selectedOperatorList.map((name) => (
                        <span
                          key={name}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-900/80 text-blue-200 border border-blue-500/50 shadow-sm"
                        >
                          <span>{name}</span>
                          <button
                            type="button"
                            onClick={() => toggleOperator(name)}
                            className="text-blue-300 hover:text-rose-300 font-bold ml-0.5 text-xs"
                            title={`Hapus ${name}`}
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Quick Chip Selection Operator (TIDAK DIBATASI 6 ORANG) */}
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block mb-1">
                      Klik untuk pilih / batal (Daftar Lengkap):
                    </span>
                    <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto p-1 bg-slate-950/40 rounded-lg border border-slate-800/60">
                      {operatorsForActiveSelection.map((name) => {
                        const isSelected = selectedOperatorList.includes(name);
                        return (
                          <button
                            type="button"
                            key={name}
                            onClick={() => toggleOperator(name)}
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold border transition-all flex items-center gap-1 ${
                              isSelected
                                ? 'bg-blue-600 border-blue-400 text-white shadow-sm ring-1 ring-blue-400/40'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                            }`}
                          >
                            <span>{isSelected ? '✓' : '+'}</span>
                            <span>{name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="relative pt-1">
                    <input
                      type="text"
                      required
                      placeholder="Nama Operator Utama (pisahkan koma untuk multi)..."
                      value={operatorName}
                      onChange={(e) => setOperatorName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-blue-500"
                    />
                    {selectedOperatorList.length > 0 && (
                      <span className="absolute right-2.5 top-3 text-[11px] text-emerald-400 flex items-center gap-0.5 font-semibold">
                        <UserCheck className="w-3.5 h-3.5" /> {selectedOperatorList.length} Orang
                      </span>
                    )}
                  </div>
                </div>

                {/* 2. Pembantu Operator (Helper) - Bebas Memilih Lebih Dari 6 Orang */}
                <div className="space-y-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-amber-300 flex items-center gap-1">
                      <HardHat className="w-3.5 h-3.5 text-amber-400" />
                      <span>Pembantu Operator (Helper)</span>
                    </label>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-950 text-amber-300 border border-amber-600/40">
                      {selectedHelperList.length} Terpilih (Bebas &gt;6)
                    </span>
                  </div>

                  {/* Selected Pills / Tags */}
                  {selectedHelperList.length > 0 && (
                    <div className="flex flex-wrap gap-1 p-1.5 bg-slate-950/80 rounded-lg border border-slate-800 max-h-24 overflow-y-auto">
                      {selectedHelperList.map((name) => (
                        <span
                          key={name}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-950 text-amber-200 border border-amber-600/50 shadow-sm"
                        >
                          <span>{name}</span>
                          <button
                            type="button"
                            onClick={() => toggleHelper(name)}
                            className="text-amber-300 hover:text-rose-300 font-bold ml-0.5 text-xs"
                            title={`Hapus ${name}`}
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Quick Chip Selection Helper (TIDAK DIBATASI 6 ORANG) */}
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block mb-1">
                      Klik untuk pilih / batal (Daftar Lengkap):
                    </span>
                    <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto p-1 bg-slate-950/40 rounded-lg border border-slate-800/60">
                      {helpersForActiveSelection.map((name) => {
                        const isSelected = selectedHelperList.includes(name);
                        return (
                          <button
                            type="button"
                            key={name}
                            onClick={() => toggleHelper(name)}
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold border transition-all flex items-center gap-1 ${
                              isSelected
                                ? 'bg-amber-600 border-amber-400 text-slate-950 shadow-sm font-bold ring-1 ring-amber-400/40'
                                : 'bg-slate-900 border-slate-800 text-amber-300/80 hover:text-amber-200 hover:bg-slate-800'
                            }`}
                          >
                            <span>{isSelected ? '✓' : '+'}</span>
                            <span>{name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="relative pt-1">
                    <input
                      type="text"
                      placeholder="Nama Pembantu Operator (Helper, pisahkan koma)..."
                      value={assistantOperatorName}
                      onChange={(e) => setAssistantOperatorName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-amber-500"
                    />
                    {selectedHelperList.length > 0 && (
                      <span className="absolute right-2.5 top-3 text-[11px] text-amber-400 flex items-center gap-0.5 font-semibold">
                        <Check className="w-3.5 h-3.5" /> {selectedHelperList.length} Helper
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 italic leading-tight">
                    Tugas: Bantu reel drum, tali pope, broke & pelumasan area mesin.
                  </p>
                </div>

                {/* 3. Kepala Regu / Pengawas Shift (Karu) - Bebas Memilih Lebih Dari 6 Orang */}
                <div className="space-y-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-200 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Kepala Regu / Wakil PM</span>
                    </label>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-cyan-950 text-cyan-300 border border-cyan-600/40">
                      {selectedKaruList.length} Terpilih (Bebas &gt;6)
                    </span>
                  </div>

                  {/* Selected Pills / Tags */}
                  {selectedKaruList.length > 0 && (
                    <div className="flex flex-wrap gap-1 p-1.5 bg-slate-950/80 rounded-lg border border-slate-800 max-h-24 overflow-y-auto">
                      {selectedKaruList.map((name) => (
                        <span
                          key={name}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-cyan-950 text-cyan-200 border border-cyan-600/50 shadow-sm"
                        >
                          <span>{name}</span>
                          <button
                            type="button"
                            onClick={() => toggleKaru(name)}
                            className="text-cyan-300 hover:text-rose-300 font-bold ml-0.5 text-xs"
                            title={`Hapus ${name}`}
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Quick Chip Selection Karu / Foremen */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-slate-400 font-semibold block">
                        Pilih Kepala Regu / Pengawas:
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          if (machine === 'PM1') toggleKaru('Untung S');
                          else if (machine === 'PM2') toggleKaru('Rumawan');
                          else if (machine === 'PM5') toggleKaru('Suwardi');
                        }}
                        className="text-[10px] text-blue-400 hover:text-blue-300 underline font-semibold"
                      >
                        + Kepala {machine}
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto p-1 bg-slate-950/40 rounded-lg border border-slate-800/60">
                      {foremenList.map((f) => {
                        const isSelected = selectedKaruList.includes(f.name);
                        return (
                          <button
                            type="button"
                            key={f.name}
                            onClick={() => toggleKaru(f.name)}
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold border transition-all flex items-center gap-1 ${
                              isSelected
                                ? 'bg-cyan-700 border-cyan-400 text-white shadow-sm ring-1 ring-cyan-400/40 font-bold'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                            }`}
                            title={`${f.title} (${f.unit})`}
                          >
                            <span>{isSelected ? '✓' : '+'}</span>
                            <span>{f.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="relative pt-1">
                    <input
                      type="text"
                      placeholder="Nama Kepala Regu / Pengawas (pisahkan koma)..."
                      value={karuName}
                      onChange={(e) => setKaruName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
                    />
                    {selectedKaruList.length > 0 && (
                      <span className="absolute right-2.5 top-3 text-[11px] text-cyan-400 flex items-center gap-0.5 font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5" /> {selectedKaruList.length} Karu
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Modal: Pencarian & Pemilihan Personel PT. PUP (Bebas Memilih >6 Orang) */}
            {showRosterModal && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-400" />
                        <span>Pilih Personel PT. PANCA USAHATAMA PARAMITA</span>
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Target input: <strong className="text-cyan-300 uppercase">
                          {rosterTargetField === 'operator' ? 'Operator Utama' : rosterTargetField === 'assistant' ? 'Pembantu Operator (Helper)' : 'Kepala Regu / Pengawas'}
                        </strong>
                        <span className="ml-2 text-emerald-400 font-semibold">(Bisa memilih &gt;6 orang tanpa batasan)</span>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowRosterModal(false)}
                      className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
                    >
                      &times;
                    </button>
                  </div>

                  <div className="p-3 border-b border-slate-800 bg-slate-950/60 flex flex-wrap gap-2 items-center justify-between">
                    <input
                      type="text"
                      placeholder="Ketik nama atau peran personel (misal: Bambang, Topik, Helper, PM1)..."
                      value={rosterSearch}
                      onChange={(e) => setRosterSearch(e.target.value)}
                      className="flex-1 min-w-[200px] px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                      autoFocus
                    />
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => setRosterTargetField('operator')}
                        className={`px-2 py-1 text-xs rounded font-semibold border ${
                          rosterTargetField === 'operator' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        Operator ({selectedOperatorList.length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setRosterTargetField('assistant')}
                        className={`px-2 py-1 text-xs rounded font-semibold border ${
                          rosterTargetField === 'assistant' ? 'bg-amber-600 border-amber-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        Helper ({selectedHelperList.length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setRosterTargetField('karu')}
                        className={`px-2 py-1 text-xs rounded font-semibold border ${
                          rosterTargetField === 'karu' ? 'bg-cyan-600 border-cyan-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        Karu ({selectedKaruList.length})
                      </button>
                    </div>
                  </div>

                  <div className="p-3 overflow-y-auto flex-1 divide-y divide-slate-800/60 text-xs">
                    {PUP_PERSONNEL_ROSTER
                      .filter(p => {
                        const q = rosterSearch.toLowerCase();
                        if (!q) return true;
                        return (
                          p.name.toLowerCase().includes(q) ||
                          p.role.toLowerCase().includes(q) ||
                          p.unit.toLowerCase().includes(q) ||
                          p.group.toLowerCase().includes(q)
                        );
                      })
                      .map((person) => {
                        const isHelper = person.isHelper;
                        const isSelected = rosterTargetField === 'operator'
                          ? selectedOperatorList.includes(person.name)
                          : rosterTargetField === 'assistant'
                          ? selectedHelperList.includes(person.name)
                          : selectedKaruList.includes(person.name);

                        return (
                          <div
                            key={person.id}
                            className={`py-2.5 px-2 rounded-lg flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                              isSelected ? 'bg-blue-950/40 border border-blue-800/60' : 'hover:bg-slate-800/60'
                            }`}
                            onClick={() => {
                              if (rosterTargetField === 'operator') {
                                toggleOperator(person.name);
                              } else if (rosterTargetField === 'assistant') {
                                toggleHelper(person.name);
                              } else {
                                toggleKaru(person.name);
                              }
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => {}} // handled by row click
                                className="w-4 h-4 rounded text-blue-600 border-slate-700 bg-slate-900 focus:ring-0 cursor-pointer"
                              />
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className={`font-bold text-sm ${isSelected ? 'text-cyan-300' : 'text-white'}`}>{person.name}</span>
                                  <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                                    isHelper
                                      ? 'bg-amber-950 text-amber-300 border border-amber-700/50'
                                      : 'bg-blue-950 text-blue-300 border border-blue-700/50'
                                  }`}>
                                    {person.role}
                                  </span>
                                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                                    {person.group}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-400 mt-0.5">
                                  Unit: <strong className="text-slate-300">{person.unit}</strong> &bull; Shift: {person.shiftPreference || 'Bergilir 3 Shift'}
                                </p>
                              </div>
                            </div>

                            <button
                              type="button"
                              className={`px-3 py-1 rounded font-bold text-xs shrink-0 transition-colors ${
                                isSelected
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                              }`}
                            >
                              {isSelected ? '✓ Terpilih' : '+ Pilih'}
                            </button>
                          </div>
                        );
                      })}
                  </div>

                  <div className="p-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
                    <div>
                      <span>Terpilih untuk <strong>{rosterTargetField}</strong>: </span>
                      <strong className="text-cyan-300 font-mono text-sm">
                        {rosterTargetField === 'operator' ? selectedOperatorList.length : rosterTargetField === 'assistant' ? selectedHelperList.length : selectedKaruList.length} Personel
                      </strong>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowRosterModal(false)}
                      className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-xs shadow-md transition-colors"
                    >
                      Selesai Memilih
                    </button>
                  </div>
                </div>
              </div>
            )}

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

            {/* OEE LIVE SCORECARD & QUICK CALCULATOR BAR */}
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/40 border border-indigo-900/40 hover:border-indigo-500/50 rounded-xl p-3.5 shadow-sm transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-600/20 border border-indigo-500/40 rounded-xl text-indigo-400 shrink-0">
                    <Gauge className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white tracking-wide">
                        Indikator OEE Shift (Overall Equipment Effectiveness)
                      </span>
                      {oeeCalculation ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-950 text-emerald-300 border border-emerald-700 flex items-center gap-1">
                          <Check className="w-3 h-3" /> Terverifikasi ({oeeCalculation.oee}%)
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-950 text-blue-300 border border-blue-800">
                          Estimasi Otomatis
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Standar TPM: Availability × Performance × Quality &bull; World Class ≥ 85%
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setShowOeeModal(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all shadow-sm ring-1 ring-indigo-400/50"
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Buka Kalkulator OEE Lengkap</span>
                  </button>
                </div>
              </div>

              {/* 4 Mini Gauges / Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 mt-3 border-t border-slate-800/80 text-xs">
                {/* OEE Total */}
                <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 block font-medium">Skor OEE Total:</span>
                  <div className="flex items-baseline justify-between mt-0.5">
                    <span className={`text-base font-black font-mono ${
                      quickOeeEstimate.oee >= 85 ? 'text-emerald-400' : quickOeeEstimate.oee >= 75 ? 'text-cyan-400' : 'text-amber-400'
                    }`}>
                      {quickOeeEstimate.oee}%
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">
                      {quickOeeEstimate.status === 'WORLD_CLASS' ? 'World Class' : quickOeeEstimate.status === 'GOOD' ? 'Optimal' : 'Kaizen'}
                    </span>
                  </div>
                </div>

                {/* Availability */}
                <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 block font-medium">Availability (A):</span>
                  <div className="flex items-baseline justify-between mt-0.5">
                    <span className="text-base font-black font-mono text-blue-400">
                      {quickOeeEstimate.availability}%
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      DT: {hasIncidentOption === 'YES' ? totalDowntimeMinutes : 0}m
                    </span>
                  </div>
                </div>

                {/* Performance */}
                <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 block font-medium">Performance (P):</span>
                  <div className="flex items-baseline justify-between mt-0.5">
                    <span className="text-base font-black font-mono text-cyan-400">
                      {quickOeeEstimate.performance}%
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {actualProductionTon}T/{targetProductionTon}T
                    </span>
                  </div>
                </div>

                {/* Quality */}
                <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 block font-medium">Quality (Q):</span>
                  <div className="flex items-baseline justify-between mt-0.5">
                    <span className="text-base font-black font-mono text-emerald-400">
                      {quickOeeEstimate.quality}%
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Cacat: {qualityGradeDefect}T
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid Produksi Utama (Standar Satuan Kg: 2.000 Kg / shift) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              
              {/* Target Produksi Standar (Kg) */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-slate-300 font-bold">
                    Target Produksi Standar (Kg)
                  </label>
                  <span className="text-[10px] px-1.5 py-0.2 bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 rounded font-semibold">
                    Standar Shift
                  </span>
                </div>
                <div className="relative mt-1">
                  <input
                    type="number"
                    step="50"
                    min="0"
                    required
                    value={targetProductionKg}
                    onChange={(e) => setTargetProductionKg(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 text-base font-mono focus:outline-none focus:border-emerald-500 font-bold"
                  />
                  <span className="absolute right-3 top-2.5 text-slate-400 font-bold">Kg</span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1.5">
                  <span>Standar {machine}: <strong className="text-emerald-400">2.000 Kg / shift</strong></span>
                </div>
              </div>

              {/* Produksi Aktual dengan Tombol +/- Cepat (Kg) */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-emerald-950 ring-1 ring-emerald-900/40">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-emerald-300 font-bold">
                    Realisasi Aktual Produksi (Kg) <span className="text-rose-400">*</span>
                  </label>
                  <span className="text-[10px] px-1.5 py-0.2 bg-emerald-900/40 text-emerald-200 border border-emerald-700/50 rounded font-mono font-bold">
                    {actualProductionKg.toLocaleString('id-ID')} Kg
                  </span>
                </div>
                <div className="relative mt-1">
                  <input
                    type="number"
                    step="50"
                    min="0"
                    required
                    value={actualProductionKg}
                    onChange={(e) => handleActualKgChange(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-900 border border-emerald-700 rounded-lg text-emerald-300 text-lg font-mono font-black focus:outline-none"
                  />
                  <span className="absolute right-3 top-2.5 text-emerald-400 font-bold">Kg</span>
                </div>
                {/* Tombol Cepat Penyesuaian (+ / - Kg) */}
                <div className="grid grid-cols-4 gap-1 mt-2">
                  <button
                    type="button"
                    onClick={() => adjustActualKg(-500)}
                    className="py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded font-mono font-bold text-[11px] border border-slate-800"
                    title="Kurangi 500 Kg"
                  >
                    -500Kg
                  </button>
                  <button
                    type="button"
                    onClick={() => adjustActualKg(-100)}
                    className="py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded font-mono font-bold text-[11px] border border-slate-800"
                    title="Kurangi 100 Kg"
                  >
                    -100Kg
                  </button>
                  <button
                    type="button"
                    onClick={() => adjustActualKg(100)}
                    className="py-1 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 rounded font-mono font-bold text-[11px] border border-emerald-800"
                    title="Tambah 100 Kg"
                  >
                    +100Kg
                  </button>
                  <button
                    type="button"
                    onClick={() => adjustActualKg(500)}
                    className="py-1 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 rounded font-mono font-bold text-[11px] border border-emerald-800"
                    title="Tambah 500 Kg"
                  >
                    +500Kg
                  </button>
                </div>
              </div>

              {/* Jumlah Roll / Reel */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-slate-400 font-semibold">
                    Jumlah Gulungan (Reel / Roll)
                  </label>
                  <span className="text-[10px] text-slate-500">
                    Total shift
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => adjustReelCount(-1)}
                    className="w-10 h-10 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded-lg font-bold text-base flex items-center justify-center shrink-0"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="0"
                    value={reelCount}
                    onChange={(e) => {
                      const count = Number(e.target.value) || 0;
                      setReelCount(count);
                      if (selectedProducts.length === 1) {
                        setSelectedProducts([{ ...selectedProducts[0], reelCount: count }]);
                      }
                    }}
                    className="flex-1 px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 text-center font-mono font-bold text-base"
                  />
                  <button
                    type="button"
                    onClick={() => adjustReelCount(1)}
                    className="w-10 h-10 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded-lg font-bold text-base flex items-center justify-center shrink-0"
                  >
                    +
                  </button>
                </div>
                <span className="text-[10px] text-slate-500 block mt-2 text-center">
                  Berat total terhitung: ~{actualProductionKg?.toLocaleString('id-ID')} Kg
                </span>
              </div>
            </div>

            {/* Pilihan 1 s/d 4 Jenis / Grade Kertas & Data Produk Jumbo Roll PM */}
            <div className="space-y-3 p-4 bg-slate-950/70 border border-amber-500/30 rounded-xl">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-400" />
                    <h3 className="font-bold text-slate-100 text-xs sm:text-sm">
                      Produk Jumbo Roll Mesin {machine} (Mendukung 1 s/d 4 Produk per Shift)
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-950 text-amber-300 border border-amber-700">
                      {selectedProducts.length} / 4 Produk Terpilih
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Satu mesin dalam satu shift dapat memproduksi 1 hingga 4 jenis produk berbeda (sesuai instruksi operasional).
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAddProductSlot}
                    disabled={selectedProducts.length >= 4}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm ${
                      selectedProducts.length >= 4
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                        : 'bg-amber-600 hover:bg-amber-500 text-slate-950 border border-amber-400 ring-1 ring-amber-400/50'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Produk ({selectedProducts.length}/4)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowProductCatalogModal(true)}
                    className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs rounded-lg font-semibold border border-amber-500/40"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Katalog ({getProductsByMachine(machine).length})</span>
                  </button>
                </div>
              </div>

              {/* List of 1 to 4 Selected Products */}
              <div className="space-y-3">
                {selectedProducts.map((prodItem, idx) => {
                  const matchedProd = findProductByCodeOrName(prodItem.productCode) || findProductByCodeOrName(prodItem.productItemName);
                  const isPrimary = idx === 0;

                  return (
                    <div 
                      key={prodItem.id || `prod-slot-${idx}`}
                      className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 rounded-xl p-3 space-y-3 transition-colors text-xs"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                            isPrimary
                              ? 'bg-blue-900 text-blue-200 border border-blue-600'
                              : 'bg-slate-800 text-slate-300 border border-slate-700'
                          }`}>
                            Produk #{idx + 1} {isPrimary ? '(Utama)' : ''}
                          </span>
                          <span className="font-mono font-bold text-amber-300 text-xs">
                            {prodItem.productCode || 'Belum dipilih'}
                          </span>
                          <span className="font-semibold text-slate-100 truncate max-w-[260px] sm:max-w-md">
                            {prodItem.productItemName}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            prodItem.rawMaterial === 'HVS'
                              ? 'bg-amber-950 text-amber-300 border border-amber-700'
                              : 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                          }`}>
                            Bahan: {prodItem.rawMaterial || 'HVS'}
                          </span>

                          {selectedProducts.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveProductSlot(idx)}
                              className="flex items-center gap-1 px-2 py-0.5 bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800 rounded text-[10px] font-bold"
                              title="Hapus produk ini dari shift"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Hapus</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Dropdown Pilihan Produk untuk Slot Ini */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div className="md:col-span-2">
                          <label className="text-[10px] text-slate-400 font-semibold mb-1 block">
                            Pilih Kode & Item Produk {machine}:
                          </label>
                          <select
                            value={prodItem.productCode}
                            onChange={(e) => {
                              const code = e.target.value;
                              const matched = findProductByCodeOrName(code);
                              if (matched) {
                                handleSelectProduct(matched, idx);
                              } else {
                                handleUpdateProductSlot(idx, { productCode: code });
                              }
                            }}
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 text-xs focus:outline-none focus:border-amber-500 font-medium cursor-pointer"
                          >
                            <optgroup label={`Produk Mesin ${machine} (PT. PUP)`}>
                              {getProductsByMachine(machine).map((p) => (
                                <option key={p.id} value={p.kodeBarang}>
                                  {p.kodeBarang} - {p.itemBarang} ({p.gsm} gsm | {p.bahanBaku})
                                </option>
                              ))}
                            </optgroup>
                          </select>
                        </div>

                        {/* Input Jumlah Rol & Berat untuk Produk ini */}
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] text-slate-400 font-semibold mb-1 block">
                              Jumlah Rol (Reel):
                            </label>
                            <input
                              type="number"
                              min="1"
                              value={prodItem.reelCount}
                              onChange={(e) => handleUpdateProductSlot(idx, { reelCount: Math.max(1, Number(e.target.value) || 1) })}
                              className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 font-mono font-bold text-center text-xs"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] text-amber-300 font-bold mb-1 block">
                              Berat (Kg):
                            </label>
                            <input
                              type="number"
                              min="0"
                              step="50"
                              value={prodItem.weightKg}
                              onChange={(e) => handleUpdateProductSlot(idx, { weightKg: Math.max(0, Number(e.target.value) || 0) })}
                              className="w-full px-2.5 py-1.5 bg-slate-950 border border-amber-600/70 rounded-lg text-amber-300 font-mono font-bold text-center text-xs"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Technical Specs Pills for This Product */}
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 text-center pt-1 border-t border-slate-800/60 text-[10px]">
                        <div className="bg-slate-950/60 p-1.5 rounded border border-slate-800">
                          <span className="text-slate-500 block text-[9px]">Target GSM:</span>
                          <span className="font-mono font-bold text-amber-300">
                            {prodItem.targetGsm || matchedProd?.gsm || 18} {prodItem.gsmTolerance || matchedProd?.gsmTolerance || '± 1'}
                          </span>
                        </div>

                        <div className="bg-slate-950/60 p-1.5 rounded border border-slate-800">
                          <span className="text-slate-500 block text-[9px]">Tarik MD:</span>
                          <span className="font-mono font-semibold text-slate-200">
                            {prodItem.tensileMdStandard || matchedProd?.tensileMd || '-'}
                          </span>
                        </div>

                        <div className="bg-slate-950/60 p-1.5 rounded border border-slate-800">
                          <span className="text-slate-500 block text-[9px]">Tarik CD:</span>
                          <span className="font-mono font-semibold text-slate-200">
                            {prodItem.tensileCdStandard || matchedProd?.tensileCd || '-'}
                          </span>
                        </div>

                        <div className="bg-slate-950/60 p-1.5 rounded border border-slate-800">
                          <span className="text-slate-500 block text-[9px]">Tebal (Caliper):</span>
                          <span className="font-mono font-semibold text-cyan-300">
                            {prodItem.thicknessMmStandard || matchedProd?.thicknessMm || 0.05} mm
                          </span>
                        </div>

                        <div className="bg-slate-950/60 p-1.5 rounded border border-slate-800 col-span-2 sm:col-span-1">
                          <span className="text-slate-500 block text-[9px]">Creeping:</span>
                          <span className="font-mono font-semibold text-emerald-300">
                            {prodItem.creepingStandard || matchedProd?.creeping || '-'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary Bar of Multiple Products */}
              <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-slate-400">Total Produk: </span>
                    <strong className="text-white font-mono">{selectedProducts.length} Produk</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Total Rol Gabungan: </span>
                    <strong className="text-cyan-300 font-mono">{reelCount} Roll</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Total Berat Gabungan: </span>
                    <strong className="text-emerald-300 font-mono">{actualProductionKg.toLocaleString('id-ID')} Kg</strong>
                  </div>
                </div>

                {selectedProducts.length < 4 && (
                  <button
                    type="button"
                    onClick={handleAddProductSlot}
                    className="text-amber-400 hover:text-amber-300 font-bold underline flex items-center gap-1 text-[11px]"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Tambah Produk ke-{selectedProducts.length + 1} (Maksimal 4)</span>
                  </button>
                )}
              </div>
            </div>

            {/* Evaluasi Kualitas (Grade A, B, C, Cacat) - Satuan Kg */}
            <div className="pt-2 border-t border-slate-800/80">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-slate-300 font-semibold text-xs">
                  Distribusi Kualitas Kertas (Kg)
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
                      step="10"
                      min="0"
                      value={qualityGradeA}
                      onChange={(e) => setQualityGradeA(Number(e.target.value))}
                      className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700 rounded text-slate-100 font-mono font-bold text-sm"
                    />
                    <span className="absolute right-2 top-2 text-slate-400 font-bold text-xs">Kg</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-blue-400 font-bold block mb-1">Grade B (Standar)</span>
                  <div className="relative">
                    <input
                      type="number"
                      step="10"
                      min="0"
                      value={qualityGradeB}
                      onChange={(e) => setQualityGradeB(Number(e.target.value))}
                      className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700 rounded text-slate-100 font-mono text-sm"
                    />
                    <span className="absolute right-2 top-2 text-slate-400 font-bold text-xs">Kg</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-amber-400 font-bold block mb-1">Grade C (Turun Kelas)</span>
                  <div className="relative">
                    <input
                      type="number"
                      step="10"
                      min="0"
                      value={qualityGradeC}
                      onChange={(e) => setQualityGradeC(Number(e.target.value))}
                      className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700 rounded text-slate-100 font-mono text-sm"
                    />
                    <span className="absolute right-2 top-2 text-slate-400 font-bold text-xs">Kg</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-rose-950">
                  <span className="text-rose-400 font-bold block mb-1">Cacat (Reject)</span>
                  <div className="relative">
                    <input
                      type="number"
                      step="10"
                      min="0"
                      value={qualityGradeDefect}
                      onChange={(e) => setQualityGradeDefect(Number(e.target.value))}
                      className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700 rounded text-rose-300 font-mono font-bold text-sm"
                    />
                    <span className="absolute right-2 top-2 text-slate-400 font-bold text-xs">Kg</span>
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

      {/* Modal Katalog Produk Jumbo Roll PM (PT. PUP) */}
      <PmProductsModal
        isOpen={showProductCatalogModal}
        onClose={() => setShowProductCatalogModal(false)}
        onSelectProduct={handleSelectProduct}
        initialMachine={machine}
      />

      {/* Utilitas Kalkulator OEE (Overall Equipment Effectiveness) */}
      <OeeCalculatorModal
        isOpen={showOeeModal}
        onClose={() => setShowOeeModal(false)}
        machine={machine}
        targetProductionTon={targetProductionTon}
        actualProductionTon={actualProductionTon}
        qualityGradeA={qualityGradeA}
        qualityGradeB={qualityGradeB}
        qualityGradeC={qualityGradeC}
        qualityGradeDefect={qualityGradeDefect}
        totalDowntimeMinutes={hasIncidentOption === 'YES' ? totalDowntimeMinutes : 0}
        shiftName={`${shift} (${groupShift})`}
        onApplyOee={handleApplyOee}
      />

    </div>
  );
};

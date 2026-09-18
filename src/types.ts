export type MachineId = 'PM1' | 'PM2' | 'PM5';
export type TrainingModuleId = 'STOCK_PREP' | 'REWINDER' | 'PM1' | 'PM2' | 'PM5' | 'TISSUE_PM';
export type ShiftType = 'Shift 1' | 'Shift 2' | 'Shift 3' | 'Pagi' | 'Siang' | 'Malam';
export type QualityGrade = 'A' | 'B' | 'C' | 'Cacat';

export interface DefectItem {
  id: string;
  type: string;
  percentage: number;
}

export interface IncidentReport {
  id: string;
  time: string; // e.g. "09:30"
  location: 'Pulper' | 'Stock Prep' | 'Wire Section' | 'Press Section' | 'Dryer Section' | 'Calender' | 'Rewinder' | 'Utilitas (Boiler/Listrik/Air)' | 'Lainnya';
  description: string;
  downtimeMinutes: number;
}

export interface EditAuditLog {
  id: string;
  editedAt: string;
  editedBy: string;
  reason: string;
  summary?: string;
}

export interface PmJumboRollProduct {
  id: string;
  no: number;
  machine: MachineId;
  itemBarang: string;
  kodeBarang: string;
  gsm: number;
  gsmTolerance: string;
  tensileMd: string;
  tensileCd: string;
  thicknessMm: number;
  thicknessMicron: number;
  creeping: string;
  bahanBaku: 'HVS' | 'PULP';
}

export interface ShiftReport {
  id: string;
  // A. Data Umum
  date: string; // YYYY-MM-DD
  shift: ShiftType;
  operatorName: string;
  assistantOperatorName?: string; // Pembantu Operator / Helper Shift
  karuName?: string;              // Kepala Regu / Wakil PM
  groupShift?: 'Group 1' | 'Group 2' | 'Group 3';
  machine: MachineId;

  // B. Hasil Produksi
  targetProductionTon: number;
  actualProductionTon: number;
  achievementPercentage: number; // calculated: (actual / target) * 100
  netWeightKg: number;
  reelCount: number;
  paperGradeCode: string; // e.g. "MG HVS 1 PLY PUTIH UK.0275 MM [60.A/B.61.2.18.0275]"
  
  // Data Terintegrasi Produk Jumbo Roll PM
  productCode?: string;         // Kode Barang, e.g. "60.A/B.61.2.18.0275"
  productItemName?: string;     // Item Barang, e.g. "MG HVS 1 PLY PUTIH UK.0275 MM"
  targetGsm?: number;           // GSM target, e.g. 18.0
  gsmTolerance?: string;        // Toleransi GSM, e.g. "± 1"
  tensileMdStandard?: string;   // MD Tensile Standard, e.g. "1200 - 1500"
  tensileCdStandard?: string;   // CD Tensile Standard, e.g. "500-600"
  thicknessMmStandard?: number; // Ketebalan mm, e.g. 0.05
  creepingStandard?: string;    // Creeping standard, e.g. "14%" atau "-"
  rawMaterial?: 'HVS' | 'PULP'; // Bahan Baku, e.g. 'HVS' | 'PULP'

  // B. Kualitas Produk
  qualityGradeA_Ton: number;
  qualityGradeB_Ton: number;
  qualityGradeC_Ton: number;
  qualityGradeDefect_Ton: number;
  
  // Parameter Kualitas
  thicknessMicron: number; // Ketebalan (Caliper in µm)
  moisturePercent: number; // Kelembapan (%)
  tensileStrength: number; // Kekuatan Tarik (kN/m)
  surfaceSmoothness: number; // Kerataan Permukaan (Bendtsen ml/min)
  
  defectPercentage: number; // %
  defectTypes: string[]; // e.g. ['Kerut / Wrinkle', 'Robek / Sheet Break', 'Bintik / Spots']

  // Kendala & Masalah
  incidents: IncidentReport[];
  totalDowntimeMinutes: number;

  // Rekomendasi & Tindakan
  actionsTaken: string;
  shortTermRecommendation: string;
  longTermRecommendation: string;
  handoverNotes: string; // Perlu perhatian tim / shift berikutnya

  // Metadata & Audit
  createdAt: string;
  updatedAt?: string;
  editHistory: EditAuditLog[];
}

export interface SopStep {
  id: string;
  title: string;
  purpose: string;
  preparation: string[];
  operationalSteps: string[];
  keyParameters: { name: string; standard: string; note: string }[];
  rawMaterialsAndAdditives?: string[];
  routineChecks: string[];
  troubleshooting: { issue: string; cause: string; solution: string }[];
  shutdownAndCleaning: string[];
}

export interface RewinderComponentDetail {
  id: string;
  name: string;
  category: 'Unwind' | 'Web Guidance' | 'Calendering' | 'Slitting' | 'Spreading' | 'Winding' | 'Auxiliary';
  function: string;
  constructionDetails: string;
  operationTips: string;
  roleAttention: string;
}

export interface RewinderWorkflowStep {
  stepNumber: number;
  title: string;
  phase: string;
  description: string;
  operatorAction: string;
  karuCheck: string;
  safetyCaution: string;
}

export interface RewinderCompetencyQA {
  number: number;
  question: string;
  quickAnswer: string;
  deepDiveExplanation: string;
  operationalImpact: string;
  whoMustMaster: string;
}

export interface RoleResponsibilityGuide {
  role: 'Pembantu Operator (Helper)' | 'Operator Pelaksana' | 'Kepala Regu (Karu)' | 'Kepala PM & Superintendent' | string;
  badgeColor: string;
  summary: string;
  dailyFocus: string[];
  decisionAuthority: string[];
}

export interface MachinePhotoItem {
  id: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  aspectRatio: string;
  tags: string[];
  description: string;
  keyCallouts: { label: string; detail?: string; value?: string }[];
}

export interface VideoChapter {
  time: string;
  topic: string;
  note: string;
  detailedExplanation?: string;
  technicalSpecs?: { label: string; val: string }[];
  spokenNarration?: string;
}

export interface MachineVideoTutorial {
  id: string;
  title: string;
  duration: string;
  youtubeId?: string;
  videoUrl?: string;
  simulatedType?: 'rewinder_core' | 'slitter_k3' | 'stockprep_hdc' | 'stockprep_ddr' | 'peo_dissolving' | 'cylinder_forming' | 'yankee_creping' | 'pope_reeling';
  thumbnailUrl: string;
  category: string;
  instructorRole: string;
  description: string;
  chapters: VideoChapter[];
  keyTakeaways: string[];
}

export interface MachineMediaConfig {
  heroImage: string;
  heroCaption: string;
  galleryPhotos: MachinePhotoItem[];
  videoTutorials: MachineVideoTutorial[];
}

export interface StockPrepQuizItem {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  calculationFormula?: string;
  category: string;
}

export interface StockPrepEquipmentDetail {
  id: string;
  stepNumber: number;
  name: string;
  category: 'Pulping & Slushing' | 'Centrifugal Cleaning' | 'Coarse Screening' | 'Fine Screening & Fractionation' | 'Washing & Thickening' | 'Fiber Dispersion & Refining' | 'Chemical Additive System';
  targetConsistency: string;
  function: string;
  workingPrinciple: string;
  keyParameters: { label: string; value: string; unit: string; note: string }[];
  operatorDuties: string[];
  karuInspection: string[];
  kepalaPmFocus: string[];
  troubleshootingGuide: { fault: string; indication: string; immediateAction: string; permanentFix: string }[];
  mediaThumbnail?: string;
}

export type TissueStageId = 'ALL' | 'WET_END' | 'DRY_END' | 'POPE_REEL';

export interface TissueMachineEquipmentDetail {
  id: string;
  number: number;
  slideRef: string;
  name: string;
  stage: 'WET_END' | 'DRY_END' | 'POPE_REEL';
  stageName: string;
  categoryTag: string;
  function: string;
  workingPrinciple: string;
  criticalParameters: { label: string; value: string; unit?: string; importance: string }[];
  operatorKeyPoints: string[];
  helperDuties: string[];
  karuInspectionPoints: string[];
  kepalaPmGovernance: string[];
  troubleshooting: { fault: string; indication: string; immediateAction: string; permanentFix?: string; permanentSolution?: string };
  k3SafetyWarning: string;
  associatedPhotoTitle?: string;
  videoTimecode?: string;
}

export interface TissueMachineQuizItem {
  number: number;
  question: string;
  options: string[];
  correctAnswer: string;
  officialSlideAnswer: string;
  technicalDeepDive: string;
  operationalImpact: string;
  stage: 'WET_END' | 'DRY_END' | 'POPE_REEL' | 'CALCULATION';
  whoMustMaster: string;
  calculationFormula?: string;
}

export interface MachineTrainingData {
  machineId: MachineId | 'REWINDER' | 'STOCK_PREP' | 'TISSUE_PM';
  name: string;
  tagline: string;
  technicalSpecs: { label: string; value: string }[];
  operatingLimits: { label: string; limit: string; dangerZone: string }[];
  paperGrades: { code: string; name: string; gsmRange: string; description: string }[];
  dailyCheckpoints: { area: string; items: string[] }[];
  standardParameters: { parameter: string; range: string; unit: string }[];
  dcsIndicatorsGuide: { code: string; meaning: string; normalState: string; actionIfAbnormal: string }[];
  specialCharacteristics?: string;
  differencesFromOthers?: string;
  commonFaultsAndSolutions: { fault: string; indication: string; cause?: string; immediateAction: string; permanentFix?: string; permanentSolution?: string }[];
  k3SafetyProcedures: string[];
  componentsList?: RewinderComponentDetail[];
  workflowSteps?: RewinderWorkflowStep[];
  competencyQAs?: RewinderCompetencyQA[];
  roleGuides?: RoleResponsibilityGuide[];
  mediaConfig?: MachineMediaConfig;
  stockPrepEquipments?: StockPrepEquipmentDetail[];
  stockPrepQuizzes?: StockPrepQuizItem[];
  tissueEquipments?: TissueMachineEquipmentDetail[];
  tissueQuizzes?: TissueMachineQuizItem[];
}

// =========================================================================
// STRUKTUR ORGANISASI & JOB DESCRIPTION PT. PUP
// =========================================================================

export type PupUnit = 'PM1' | 'PM2' | 'PM5' | 'STOCK_PREP' | 'REWINDER' | 'PULPER' | 'BOILER' | 'MANAGEMENT' | 'ADM';
export type PupGroup = 'Group 1' | 'Group 2' | 'Group 3' | 'Non-Shift' | 'All';

export interface PupPersonnel {
  id: string;
  name: string;
  role: string;
  unit: PupUnit;
  group: PupGroup;
  status: 'Organik' | 'Outsourcing (Os)' | 'Helper' | 'Pimpinan';
  badgeTitle?: string;
  directSupervisor?: string;
  isHelper?: boolean;
  notes?: string;
  shiftPreference?: string;
}

export interface JobDescriptionDetail {
  id: string;
  roleKey: string;
  title: string;
  level: 'Pimpinan Divisi' | 'Kepala Unit / Wakil' | 'Operator Utama' | 'Pembantu Operator (Helper)' | 'Administrasi';
  department: string;
  reportsTo: string;
  supervises: string;
  personnelNames: string[];
  summary: string;
  coreResponsibilities: string[];
  dailyTasks: {
    phase: 'Fase 1: Pra-Shift & Inspeksi Kesiapan (30 Menit Awal)' | 'Fase 2: Operasional Berjalan & Pengendalian Kualitas (Inti Shift)' | 'Fase 3: Handover, Administrasi & 5S (30 Menit Akhir)';
    tasks: string[];
  }[];
  authorityLimits: {
    canDo: string[];
    mustEscalate: string[];
  };
  kpis: {
    indicator: string;
    target: string;
    impact: string;
  }[];
  k3SafetyRequirements: string[];
  coordinationWorkflow: string;
  applicableMachines: string[];
}


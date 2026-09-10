export type MachineId = 'PM1' | 'PM2' | 'PM5';
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

export interface ShiftReport {
  id: string;
  // A. Data Umum
  date: string; // YYYY-MM-DD
  shift: ShiftType;
  operatorName: string;
  machine: MachineId;

  // B. Hasil Produksi
  targetProductionTon: number;
  actualProductionTon: number;
  achievementPercentage: number; // calculated: (actual / target) * 100
  netWeightKg: number;
  reelCount: number;
  paperGradeCode: string; // e.g. "CM125", "KL150", "TL140"

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

export interface MachineTrainingData {
  machineId: MachineId;
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
  commonFaultsAndSolutions: { fault: string; indication: string; cause?: string; immediateAction: string; permanentFix: string }[];
  k3SafetyProcedures: string[];
}

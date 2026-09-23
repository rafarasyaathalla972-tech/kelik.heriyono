import React, { useState, useMemo, useEffect } from 'react';
import { 
  X, 
  Users, 
  Briefcase, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronRight, 
  Search, 
  Printer, 
  FileText, 
  Layers, 
  Flame, 
  Cpu, 
  AlertTriangle, 
  Sliders, 
  Building2, 
  ArrowRight,
  UserCheck,
  Award,
  Clock,
  Sparkles,
  HelpCircle,
  HardHat,
  Filter,
  Check,
  ChevronDown,
  ChevronUp,
  Info,
  Grid,
  List
} from 'lucide-react';
import { 
  PUP_PERSONNEL_ROSTER, 
  PUP_JOB_DESCRIPTIONS, 
  PT_PUP_METADATA 
} from '../data/orgStructureData';
import { 
  RESPONSIBILITY_MATRIX_DATA, 
  MATRIX_ROLES, 
  ResponsibilityItem, 
  MatrixRole 
} from '../data/responsibilityMatrixData';
import { PupUnit, PupGroup, JobDescriptionDetail, PupPersonnel } from '../types';

interface OrgStructureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOperatorForReport?: (personnel: PupPersonnel) => void;
  initialTab?: 'chart' | 'jobdesc' | 'roster' | 'helpers' | 'matrix';
}

export const OrgStructureModal: React.FC<OrgStructureModalProps> = ({
  isOpen,
  onClose,
  onSelectOperatorForReport,
  initialTab = 'chart'
}) => {
  const [activeTab, setActiveTab] = useState<'chart' | 'jobdesc' | 'roster' | 'helpers' | 'matrix'>(initialTab);
  const [selectedUnit, setSelectedUnit] = useState<string>('ALL');
  const [selectedGroup, setSelectedGroup] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedJobDescId, setSelectedJobDescId] = useState<string>('jd-helper-pm');

  // Matrix Filter States
  const [matrixAreaFilter, setMatrixAreaFilter] = useState<string>('ALL');
  const [matrixRoleHighlight, setMatrixRoleHighlight] = useState<string>('ALL');
  const [matrixViewMode, setMatrixViewMode] = useState<'table' | 'cards'>('table');
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

  // Sync active tab with initialTab when opened
  useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // Filtered roster based on search and filters
  const filteredRoster = useMemo(() => {
    return PUP_PERSONNEL_ROSTER.filter(p => {
      const matchUnit = selectedUnit === 'ALL' || p.unit === selectedUnit;
      const matchGroup = selectedGroup === 'ALL' || p.group === selectedGroup || p.group === 'All';
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q || 
        p.name.toLowerCase().includes(q) ||
        p.role.toLowerCase().includes(q) ||
        p.unit.toLowerCase().includes(q) ||
        (p.notes && p.notes.toLowerCase().includes(q));

      return matchUnit && matchGroup && matchQuery;
    });
  }, [selectedUnit, selectedGroup, searchQuery]);

  // List of all helpers
  const allHelpers = useMemo(() => {
    return PUP_PERSONNEL_ROSTER.filter(p => p.isHelper || p.role.toLowerCase().includes('helper') || p.role.toLowerCase().includes('pembantu'));
  }, []);

  // Selected Job Description
  const currentJobDesc = useMemo(() => {
    return PUP_JOB_DESCRIPTIONS.find(j => j.id === selectedJobDescId) || PUP_JOB_DESCRIPTIONS[0];
  }, [selectedJobDescId]);

  // Filtered RACI Matrix Data
  const filteredMatrix = useMemo(() => {
    return RESPONSIBILITY_MATRIX_DATA.filter(item => {
      const matchArea = matrixAreaFilter === 'ALL' || item.area === matrixAreaFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q || 
        item.taskTitle.toLowerCase().includes(q) ||
        item.areaName.toLowerCase().includes(q) ||
        item.sopReference.toLowerCase().includes(q) ||
        item.criticalStandard.toLowerCase().includes(q) ||
        item.operationalNotes.helperDuties.toLowerCase().includes(q) ||
        item.operationalNotes.operatorDuties.toLowerCase().includes(q) ||
        item.operationalNotes.karuAccountability.toLowerCase().includes(q);

      let matchRole = true;
      if (matrixRoleHighlight !== 'ALL') {
        const roleKey = matrixRoleHighlight as keyof ResponsibilityItem['raci'];
        const roleVal = item.raci[roleKey];
        matchRole = roleVal === 'R' || roleVal === 'A';
      }

      return matchArea && matchQuery && matchRole;
    });
  }, [matrixAreaFilter, matrixRoleHighlight, searchQuery]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-7xl max-h-[94vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        
        {/* ========================================================================= */}
        {/* MODAL HEADER */}
        {/* ========================================================================= */}
        <div className="px-5 py-4 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600/30 border border-indigo-500/50 rounded-xl text-indigo-400">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white tracking-wide uppercase">
                  STRUKTUR KERJA & JOB DESCRIPTION BAGIAN PRODUKSI
                </h2>
                <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-[10px] px-2 py-0.5 rounded font-mono font-bold">
                  PT. PUP
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Dokumen Resmi Rincian Tugas, Tanggung Jawab, Wewenang, KPI & Standar Pembantu Operator (Helper) Seluruh Mesin
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold transition-colors"
              title="Cetak Dokumen Struktur & Job Description"
            >
              <Printer className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Cetak PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              title="Tutup Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* NAVIGATION TABS */}
        {/* ========================================================================= */}
        <div className="bg-slate-950/80 border-b border-slate-800 px-5 py-2 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <button
              onClick={() => setActiveTab('chart')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'chart'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Diagram Struktur Kerja (Bagan)</span>
            </button>

            <button
              onClick={() => setActiveTab('jobdesc')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'jobdesc'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Job Description Lengkap (15 Jabatan)</span>
            </button>

            <button
              onClick={() => setActiveTab('helpers')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'helpers'
                  ? 'bg-gradient-to-r from-amber-600 to-rose-600 text-white shadow-sm'
                  : 'text-amber-300 hover:text-white hover:bg-amber-950/50'
              }`}
            >
              <HardHat className="w-3.5 h-3.5 text-amber-300" />
              <span>Pembantu Operator (Helper) Semua Mesin</span>
              <span className="bg-amber-400 text-slate-950 text-[10px] px-1.5 py-0.2 rounded-full font-black">
                {allHelpers.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('matrix')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'matrix'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm'
                  : 'text-emerald-300 hover:text-white hover:bg-emerald-950/50'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-emerald-300" />
              <span>Matriks Tanggung Jawab (RACI Matrix)</span>
            </button>

            <button
              onClick={() => setActiveTab('roster')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'roster'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Daftar Personel & Anggota Regu ({PUP_PERSONNEL_ROSTER.length})</span>
            </button>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Cari nama atau jabatan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-2 text-slate-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: DIAGRAM STRUKTUR KERJA (HIERARKI BAGAN RESMI) */}
        {/* ========================================================================= */}
        {activeTab === 'chart' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-950/40">
            
            {/* Header Title Box */}
            <div className="text-center max-w-2xl mx-auto border-b border-slate-800 pb-4">
              <div className="inline-block px-4 py-1.5 bg-cyan-950/80 border border-cyan-500/50 rounded-xl text-cyan-300 font-black text-sm uppercase tracking-wider mb-2">
                STRUKTUR KERJA BAGIAN PRODUKSI PT. PUP
              </div>
              <p className="text-xs text-slate-400">
                Bagan Hierarki Alur Tanggung Jawab Operasional Divisi Jumbo Roll & Lini Produksi Kertas
              </p>
            </div>

            {/* LEVEL 1: KEPALA PABRIK */}
            <div className="flex flex-col items-center">
              <div className="w-72 bg-gradient-to-b from-emerald-900/90 to-emerald-950 border-2 border-emerald-400/80 rounded-xl p-3 text-center shadow-lg relative">
                <div className="text-[11px] font-bold text-emerald-300 uppercase tracking-wide">
                  Kepala Pabrik
                </div>
                <div className="text-base font-black text-white mt-0.5">
                  Kelik Heriyono
                </div>
              </div>
              <div className="w-0.5 h-6 bg-slate-700"></div>
            </div>

            {/* LEVEL 2: ADM JR & UNIT HEADS */}
            <div className="relative">
              {/* Connector line */}
              <div className="hidden lg:block absolute top-0 left-12 right-12 h-0.5 bg-slate-700"></div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-4">
                
                {/* ADM JR */}
                <div className="bg-amber-950/50 border border-amber-500/60 rounded-xl p-3 text-center shadow-md">
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded font-bold uppercase">
                    Administrasi
                  </span>
                  <div className="text-xs font-bold text-amber-300 mt-1 uppercase">
                    Adm. JR
                  </div>
                  <div className="text-sm font-black text-white mt-0.5">
                    Fiqih Saputra
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Rekap tonase, inventori jumbo roll & administrasi laporan
                  </p>
                </div>

                {/* KEPALA PM 1 */}
                <div className="bg-slate-900/90 border border-blue-500/60 rounded-xl p-3 text-center shadow-md">
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded font-bold uppercase">
                    Unit PM 1
                  </span>
                  <div className="text-xs font-bold text-blue-300 mt-1 uppercase">
                    KEPALA PM 1
                  </div>
                  <div className="text-sm font-black text-white mt-0.5">
                    Untung S
                  </div>
                  <div className="text-[11px] text-slate-300 mt-1 font-medium bg-slate-950/60 py-1 rounded border border-slate-800">
                    <div>Sarino <span className="text-slate-500">- Wakil 1</span></div>
                    <div>Piih Samboja <span className="text-slate-500">- Wakil 2</span></div>
                  </div>
                </div>

                {/* KEPALA PM 2 */}
                <div className="bg-slate-900/90 border border-teal-500/60 rounded-xl p-3 text-center shadow-md">
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-teal-500/20 text-teal-300 rounded font-bold uppercase">
                    Unit PM 2
                  </span>
                  <div className="text-xs font-bold text-teal-300 mt-1 uppercase">
                    KEPALA PM 2
                  </div>
                  <div className="text-sm font-black text-white mt-0.5">
                    Rumawan
                  </div>
                  <div className="text-[11px] text-slate-300 mt-1 font-medium bg-slate-950/60 py-1 rounded border border-slate-800">
                    <div>CANDRA S <span className="text-slate-500">- Wakil 1</span></div>
                    <div>Lukman A <span className="text-slate-500">- Wakil 2</span></div>
                  </div>
                </div>

                {/* KEPALA PM 5 */}
                <div className="bg-slate-900/90 border border-indigo-500/60 rounded-xl p-3 text-center shadow-md">
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded font-bold uppercase">
                    Unit PM 5
                  </span>
                  <div className="text-xs font-bold text-indigo-300 mt-1 uppercase">
                    KEPALA PM 5
                  </div>
                  <div className="text-sm font-black text-white mt-0.5">
                    Suwardi
                  </div>
                  <div className="text-[11px] text-slate-300 mt-1 font-medium bg-slate-950/60 py-1 rounded border border-slate-800">
                    <div>Bambang JH <span className="text-slate-500">- Wakil 1</span></div>
                    <div>Warsito <span className="text-slate-500">- Wakil 2</span></div>
                  </div>
                </div>

                {/* KEPALA BOILER */}
                <div className="bg-rose-950/40 border border-rose-500/60 rounded-xl p-3 text-center shadow-md">
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-rose-500/20 text-rose-300 rounded font-bold uppercase">
                    Pembangkit Uap
                  </span>
                  <div className="text-xs font-bold text-rose-300 mt-1 uppercase">
                    Kepala Boiler
                  </div>
                  <div className="text-sm font-black text-white mt-0.5 uppercase">
                    YANA ANDRIYANA
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Pasokan uap steam 6-8 Bar stabil untuk pengering PM
                  </p>
                </div>

              </div>
            </div>

            {/* LEVEL 3: OPERATOR REGU BERDASARKAN DOKUMEN ASLI */}
            <div className="pt-6 border-t border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black text-slate-200 uppercase tracking-wide flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-400" />
                  <span>Daftar Regu Operator Pelaksana Lapangan (Group 1, 2, 3)</span>
                </h3>
                <span className="text-[11px] text-slate-400">
                  Lengkap dengan penetapan posisi Pembantu Operator (Helper)
                </span>
              </div>

              {/* Grid 4 Kolom: Stock Prep, Mesin PM, Rewinder, Pulper & Boiler */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                
                {/* 1. OPERATOR STOCK PREPARATION */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-cyan-300 uppercase flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5" />
                      <span>OPERATOR STOCK PREP (SP)</span>
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-1.5 py-0.2 rounded border border-cyan-800">
                      3 Group
                    </span>
                  </div>

                  {/* Group 1 */}
                  <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80 text-xs">
                    <div className="font-bold text-slate-200 mb-1 flex items-center justify-between text-[11px]">
                      <span className="text-cyan-400 font-mono">OPERATOR SP Group 1</span>
                    </div>
                    <ol className="list-decimal list-inside space-y-0.5 text-slate-300 text-[11px]">
                      <li>Dahlan <span className="text-emerald-400 font-bold">(Karu/Utama)</span></li>
                      <li>Dwi Indrayanto</li>
                      <li>Didik Ditia P</li>
                      <li>Sumedi</li>
                      <li className="text-amber-300 font-semibold">Sunarman <span className="text-[10px] bg-amber-950 px-1 py-0.2 rounded border border-amber-700/50">(Helper SP)</span></li>
                    </ol>
                  </div>

                  {/* Group 2 */}
                  <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80 text-xs">
                    <div className="font-bold text-slate-200 mb-1 flex items-center justify-between text-[11px]">
                      <span className="text-cyan-400 font-mono">OPERATOR SP Group 2</span>
                    </div>
                    <ol className="list-decimal list-inside space-y-0.5 text-slate-300 text-[11px]">
                      <li>BP Tampubolon <span className="text-emerald-400 font-bold">(Karu/Utama)</span></li>
                      <li>Haerul Anwar</li>
                      <li>Sidik Pramono</li>
                      <li>Abd Hamid</li>
                      <li className="text-amber-300 font-semibold">M. Nuranggi (Os) <span className="text-[10px] bg-amber-950 px-1 py-0.2 rounded border border-amber-700/50">(Helper SP)</span></li>
                    </ol>
                  </div>

                  {/* Group 3 */}
                  <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80 text-xs">
                    <div className="font-bold text-slate-200 mb-1 flex items-center justify-between text-[11px]">
                      <span className="text-cyan-400 font-mono">OPERATOR SP Group 3</span>
                    </div>
                    <ol className="list-decimal list-inside space-y-0.5 text-slate-300 text-[11px]">
                      <li>Deni Trirosadi <span className="text-emerald-400 font-bold">(Karu/Utama)</span></li>
                      <li>Siswanto</li>
                      <li>Halimi</li>
                      <li>Hisbulloh</li>
                      <li className="text-amber-300 font-semibold">Nurzaman <span className="text-[10px] bg-amber-950 px-1 py-0.2 rounded border border-amber-700/50">(Helper SP)</span></li>
                    </ol>
                  </div>
                </div>

                {/* 2. OPERATOR PAPER MACHINE (PM) */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-blue-300 uppercase flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>OPERATOR MESIN PM</span>
                    </span>
                    <span className="text-[10px] font-mono text-blue-400 bg-blue-950/80 px-1.5 py-0.2 rounded border border-blue-800">
                      PM1, 2, 5
                    </span>
                  </div>

                  {/* Group 1 */}
                  <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80 text-xs">
                    <div className="font-bold text-slate-200 mb-1 flex items-center justify-between text-[11px]">
                      <span className="text-blue-400 font-mono">OPERATOR PM Group 1</span>
                    </div>
                    <ol className="list-decimal list-inside space-y-0.5 text-slate-300 text-[11px]">
                      <li>Rozi Dwi S <span className="text-emerald-400 font-bold">(Operator Utama)</span></li>
                      <li>Agus Saputra</li>
                      <li>Bambang JH <span className="text-slate-400">(Karu PM5)</span></li>
                      <li>Warsito <span className="text-slate-400">(Wakil PM5)</span></li>
                      <li className="text-amber-300 font-semibold">Topik <span className="text-[10px] bg-amber-950 px-1 py-0.2 rounded border border-amber-700/50">(Helper PM)</span></li>
                      <li className="text-amber-300 font-semibold">Sapei <span className="text-[10px] bg-amber-950 px-1 py-0.2 rounded border border-amber-700/50">(Helper PM)</span></li>
                    </ol>
                  </div>

                  {/* Group 2 */}
                  <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80 text-xs">
                    <div className="font-bold text-slate-200 mb-1 flex items-center justify-between text-[11px]">
                      <span className="text-blue-400 font-mono">OPERATOR PM Group 2</span>
                    </div>
                    <ol className="list-decimal list-inside space-y-0.5 text-slate-300 text-[11px]">
                      <li>Yulianto <span className="text-emerald-400 font-bold">(Operator Utama)</span></li>
                      <li>Lukmanajudin</li>
                      <li>Dedi Apandi</li>
                      <li>Sadelih</li>
                      <li className="text-amber-300 font-semibold">Faqiih F (Os) <span className="text-[10px] bg-amber-950 px-1 py-0.2 rounded border border-amber-700/50">(Helper PM)</span></li>
                      <li className="text-amber-300 font-semibold">M Zulkifli (Os) <span className="text-[10px] bg-amber-950 px-1 py-0.2 rounded border border-amber-700/50">(Helper PM)</span></li>
                    </ol>
                  </div>

                  {/* Group 3 */}
                  <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80 text-xs">
                    <div className="font-bold text-slate-200 mb-1 flex items-center justify-between text-[11px]">
                      <span className="text-blue-400 font-mono">OPERATOR PM Group 3</span>
                    </div>
                    <ol className="list-decimal list-inside space-y-0.5 text-slate-300 text-[11px]">
                      <li>Agusmanto (Os) <span className="text-emerald-400 font-bold">(Operator Utama)</span></li>
                      <li>Tulus Setyono</li>
                      <li>Piih Samboja <span className="text-slate-400">(Wakil PM1)</span></li>
                      <li>Dodi R Irawan</li>
                      <li>Arif Nurhidayat</li>
                      <li className="text-amber-300 font-semibold">Reza Pahlevi (Os) <span className="text-[10px] bg-amber-950 px-1 py-0.2 rounded border border-amber-700/50">(Helper PM)</span></li>
                    </ol>
                  </div>
                </div>

                {/* 3. OPERATOR REWINDER */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-amber-300 uppercase flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5" />
                      <span>OPERATOR REWINDER</span>
                    </span>
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-950/80 px-1.5 py-0.2 rounded border border-amber-800">
                      Finishing Roll
                    </span>
                  </div>

                  {/* Group 1 */}
                  <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800/80 text-xs">
                    <div className="font-bold text-slate-200 mb-1 text-[11px] text-amber-400 font-mono">
                      OPERATOR Rewin Group 1
                    </div>
                    <ol className="list-decimal list-inside space-y-0.5 text-slate-300 text-[11px]">
                      <li>Slamet P <span className="text-emerald-400 font-bold">(Utama)</span></li>
                      <li>Salim . B</li>
                      <li>Rohman/maman</li>
                      <li>Maryanto</li>
                      <li className="text-amber-300 font-semibold">Aditya P (Os) <span className="text-[10px] bg-amber-950 px-1 py-0.2 rounded border border-amber-700/50">(Helper)</span></li>
                      <li className="text-amber-300 font-semibold">Andi Yuli (Os) <span className="text-[10px] bg-amber-950 px-1 py-0.2 rounded border border-amber-700/50">(Helper)</span></li>
                      <li className="text-amber-300 font-semibold">Heri Saputra (Os) <span className="text-[10px] bg-amber-950 px-1 py-0.2 rounded border border-amber-700/50">(Helper)</span></li>
                    </ol>
                  </div>

                  {/* Group 2 */}
                  <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800/80 text-xs">
                    <div className="font-bold text-slate-200 mb-1 text-[11px] text-amber-400 font-mono">
                      OPERATOR Rewin Group 2
                    </div>
                    <ol className="list-decimal list-inside space-y-0.5 text-slate-300 text-[11px]">
                      <li>Hendrik Jk <span className="text-emerald-400 font-bold">(Utama)</span></li>
                      <li>Dodi</li>
                      <li>Sudarman</li>
                      <li className="text-amber-300 font-semibold">Dedi Aris F (Os) <span className="text-[10px] bg-amber-950 px-1 py-0.2 rounded border border-amber-700/50">(Helper)</span></li>
                      <li>Bustomi</li>
                      <li>Hamim</li>
                      <li className="text-amber-300 font-semibold">Ramdani Rizki (Os) <span className="text-[10px] bg-amber-950 px-1 py-0.2 rounded border border-amber-700/50">(Helper)</span></li>
                    </ol>
                  </div>

                  {/* Group 3 */}
                  <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800/80 text-xs">
                    <div className="font-bold text-slate-200 mb-1 text-[11px] text-amber-400 font-mono">
                      OPERATOR Rewin Group 3
                    </div>
                    <ol className="list-decimal list-inside space-y-0.5 text-slate-300 text-[11px]">
                      <li>M. Ikbal . R <span className="text-emerald-400 font-bold">(Utama)</span></li>
                      <li>Sutisna</li>
                      <li>Indra</li>
                      <li>Andri Apandi</li>
                      <li>Didin . S</li>
                      <li className="text-amber-300 font-semibold">Eman <span className="text-[10px] bg-amber-950 px-1 py-0.2 rounded border border-amber-700/50">(Helper)</span></li>
                    </ol>
                  </div>
                </div>

                {/* 4. OPERATOR PULPER & BOILER */}
                <div className="space-y-4">
                  
                  {/* PULPER */}
                  <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                      <span className="text-xs font-bold text-emerald-300 uppercase flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5" />
                        <span>OPERATOR PULPER</span>
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-1.5 py-0.2 rounded border border-emerald-800">
                        Bahan Baku
                      </span>
                    </div>

                    <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800/80 text-xs">
                      <ol className="list-decimal list-inside space-y-0.5 text-slate-300 text-[11px]">
                        <li>Asman <span className="text-emerald-400 font-bold">(Utama)</span></li>
                        <li className="text-amber-300 font-semibold">Sutejo (Os) <span className="text-[10px] bg-amber-950 px-1 py-0.2 rounded border border-amber-700/50">(Helper)</span></li>
                        <li>Adnan</li>
                        <li>Ruli Rosidi</li>
                        <li className="text-amber-300 font-semibold">Surya Handi (Os) <span className="text-[10px] bg-amber-950 px-1 py-0.2 rounded border border-amber-700/50">(Helper)</span></li>
                        <li>Mulyadi</li>
                        <li className="text-amber-300 font-semibold">Waris Sunandar (Os) <span className="text-[10px] bg-amber-950 px-1 py-0.2 rounded border border-amber-700/50">(Helper)</span></li>
                        <li className="text-amber-300 font-semibold">Agus Angggara (Os) <span className="text-[10px] bg-amber-950 px-1 py-0.2 rounded border border-amber-700/50">(Helper)</span></li>
                      </ol>
                    </div>
                  </div>

                  {/* BOILER */}
                  <div className="bg-slate-900/80 border border-rose-900/50 rounded-xl p-3 space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                      <span className="text-xs font-bold text-rose-300 uppercase flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5" />
                        <span>OPERATOR BOILER</span>
                      </span>
                      <span className="text-[10px] font-mono text-rose-400 bg-rose-950/80 px-1.5 py-0.2 rounded border border-rose-800">
                        Steam 6-8 Bar
                      </span>
                    </div>

                    <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800/80 text-xs">
                      <ol className="list-decimal list-inside space-y-1 text-slate-300 text-[11px]">
                        <li>M Fadli A <span className="text-emerald-400 font-bold">(Operator Utama)</span></li>
                        <li>Agus Fitriyana <span className="text-slate-300">(Operator)</span></li>
                        <li className="text-amber-300 font-bold bg-amber-950/50 p-1 rounded border border-amber-700/60">
                          Peri Riyadi <span className="text-white font-mono">(Helper Resmi Boiler)</span>
                        </li>
                      </ol>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* Quick Helper Explanatory Banner */}
            <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-indigo-950/60 border border-amber-500/40 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/20 border border-amber-500/40 rounded-lg text-amber-400 shrink-0">
                  <HardHat className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs sm:text-sm flex items-center gap-2">
                    <span>Posisi Pembantu Operator (Helper) Ditetapkan di Seluruh Mesin</span>
                    <span className="bg-amber-500/30 text-amber-300 text-[10px] px-2 py-0.2 rounded font-mono font-bold">Resmi Operasional</span>
                  </h4>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Setiap lini mesin (PM1, PM2, PM5, Stock Prep, Rewinder, Pulper, & Boiler) memiliki pembantu operator khusus dengan rincian tugas 5S, penanganan broke, pemotongan kawat, dan bantuan keselamatan kerja.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('helpers')}
                className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-bold transition-all shadow flex items-center gap-1.5 whitespace-nowrap self-stretch sm:self-auto justify-center shrink-0"
              >
                <span>Lihat Detail Tugas Helper</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: JOB DESCRIPTION DETAIL (15 JABATAN TERSTRUKTUR & SISTEMATIS) */}
        {/* ========================================================================= */}
        {activeTab === 'jobdesc' && (
          <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
            
            {/* Left Sidebar: List of Job Descriptions */}
            <div className="w-full md:w-80 bg-slate-950/90 border-r border-slate-800 flex flex-col overflow-hidden shrink-0">
              <div className="p-3 border-b border-slate-800 bg-slate-900/60">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Daftar Jabatan Produksi ({PUP_JOB_DESCRIPTIONS.length})</span>
                </span>
              </div>

              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {PUP_JOB_DESCRIPTIONS.map((jd) => {
                  const isSelected = jd.id === currentJobDesc.id;
                  const isHelperRole = jd.level === 'Pembantu Operator (Helper)';
                  return (
                    <button
                      key={jd.id}
                      onClick={() => setSelectedJobDescId(jd.id)}
                      className={`w-full text-left p-2.5 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-indigo-950/80 border-indigo-500 text-white shadow-md ring-1 ring-indigo-500'
                          : isHelperRole
                          ? 'bg-amber-950/30 border-amber-800/40 text-slate-300 hover:bg-amber-950/60 hover:text-white'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                          isHelperRole 
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {jd.level}
                        </span>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                        )}
                      </div>
                      <div className="text-xs font-bold mt-1 leading-snug">
                        {jd.title}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5 truncate">
                        Pemangku: {jd.personnelNames.join(', ')}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Content: Detailed Job Description Sheet */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-950/30">
              
              {/* Top Banner of Selected Role */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded font-mono ${
                        currentJobDesc.level === 'Pembantu Operator (Helper)'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                          : 'bg-indigo-500/20 text-indigo-300 border border-indigo-400/40'
                      }`}>
                        {currentJobDesc.level}
                      </span>
                      <span className="text-xs text-slate-400">&bull; {currentJobDesc.department}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-white mt-1">
                      {currentJobDesc.title}
                    </h3>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Atasan Langsung</span>
                    <span className="text-xs font-semibold text-slate-200">{currentJobDesc.reportsTo}</span>
                  </div>
                </div>

                {/* Personnel on this position */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[11px] text-slate-400 font-semibold mr-1">Personel Terkait:</span>
                  {currentJobDesc.personnelNames.map((name, idx) => {
                    const matchedPerson = PUP_PERSONNEL_ROSTER.find(p => name.includes(p.name));
                    return (
                      <div 
                        key={idx}
                        className="flex items-center gap-1 bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-lg text-xs"
                      >
                        <span className="font-semibold text-slate-200">{name}</span>
                        {onSelectOperatorForReport && matchedPerson && (
                          <button
                            type="button"
                            onClick={() => onSelectOperatorForReport(matchedPerson)}
                            className="ml-1 px-1.5 py-0.2 bg-blue-600/60 hover:bg-blue-600 text-white rounded text-[10px] font-bold transition-colors"
                            title="Pilih nama ini untuk form laporan shift"
                          >
                            Isi di Laporan
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Job Summary */}
                <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <strong className="text-white block mb-1 text-[11px] uppercase tracking-wide">Ringkasan Peran & Tujuan Jabatan:</strong>
                  {currentJobDesc.summary}
                </div>
              </div>

              {/* SECTION A: TANGGUNG JAWAB UTAMA */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Tanggung Jawab Pokok & Sasaran Operasional</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {currentJobDesc.coreResponsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* SECTION B: RINCIAN TUGAS HARIAN 3 FASE KERJA */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  <span>Rincian Tugas Harian Terstruktur (Checklist 3 Fase Kerja Shift)</span>
                </h4>

                <div className="grid grid-cols-1 gap-3">
                  {currentJobDesc.dailyTasks.map((phase, pIdx) => (
                    <div key={pIdx} className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                      <span className="text-xs font-bold text-indigo-300 block mb-1.5">
                        {phase.phase}
                      </span>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {phase.tasks.map((task, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-2">
                            <span className="text-indigo-400 font-bold">&bull;</span>
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION C: BATASAN WEWENANG & ESKALASI */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Wewenang Mandiri */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wide flex items-center gap-1.5 border-b border-slate-800 pb-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Wewenang Eksekusi Mandiri</span>
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {currentJobDesc.authorityLimits.canDo.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-400">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Wajib Eskalasi */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
                  <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wide flex items-center gap-1.5 border-b border-slate-800 pb-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Batasan & Wajib Eskalasi ke Atasan</span>
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {currentJobDesc.authorityLimits.mustEscalate.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-rose-400">⚠</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* SECTION D: INDIKATOR KINERJA KUNCI (KPI) */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Matriks Indikator Kinerja Kunci (Key Performance Indicators / KPI)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentJobDesc.kpis.map((kpi, kIdx) => (
                    <div key={kIdx} className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-bold text-slate-200 block">{kpi.indicator}</span>
                        <span className="text-[11px] text-slate-400 mt-0.5 block">{kpi.impact}</span>
                      </div>
                      <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                        <span className="text-slate-500 text-[10px] uppercase font-bold">Target Standar:</span>
                        <span className="font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                          {kpi.target}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION E: STANDAR K3 KESELAMATAN KERJA */}
              <div className="bg-slate-900/90 border border-rose-900/50 rounded-xl p-4 space-y-2">
                <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-1.5">
                  <ShieldCheck className="w-4 h-4 text-rose-400" />
                  <span>Standar Keselamatan Kerja (K3) & Alat Pelindung Diri (APD) Wajib</span>
                </h4>
                <ul className="space-y-1 text-xs text-slate-300">
                  {currentJobDesc.k3SafetyRequirements.map((req, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">&bull;</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: PEMBANTU OPERATOR (HELPER) SEMUA MESIN (DETAIL KHUSUS) */}
        {/* ========================================================================= */}
        {activeTab === 'helpers' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-950/40">
            
            {/* Banner Khusus Pembantu Operator */}
            <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-rose-950 border border-amber-500/50 rounded-2xl p-5 shadow-xl">
              <div className="flex items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-500/20 border border-amber-500/50 rounded-xl text-amber-400">
                    <HardHat className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-wide flex items-center gap-2">
                      <span>PANDUAN LENGKAP PEMBANTU OPERATOR (HELPER) SELURUH MESIN</span>
                      <span className="bg-amber-400 text-slate-950 text-[10px] px-2 py-0.5 rounded font-black">
                        STANDAR RESMI PT. PUP
                      </span>
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      Peran kunci penunjang kelancaran produksi, penanganan sisa kertas (broke), penyiapan core reel, pemotongan kawat bale, abu boiler, dan penegakan 5S di setiap lini unit.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid 5 Unit Mesin: Helper PM, Helper Stock Prep, Helper Rewinder, Helper Pulper, Helper Boiler */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              
              {/* 1. HELPER PAPER MACHINE (PM1, PM2, PM5) */}
              <div className="bg-slate-900 border border-blue-500/40 rounded-xl p-4 flex flex-col justify-between space-y-3 shadow-md">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-blue-300 uppercase flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-blue-400" />
                      <span>Helper Paper Machine (PM)</span>
                    </span>
                    <span className="text-[10px] bg-blue-950 text-blue-300 px-1.5 py-0.2 rounded border border-blue-800">
                      PM1, 2, 5
                    </span>
                  </div>

                  <div className="mt-2 text-xs text-slate-300 space-y-1.5">
                    <p className="text-[11px] text-slate-400">
                      <strong>Fokus Pokok:</strong> Pembersihan broke di kolong mesin, pasang core spool reel, bantu threading kertas putus, dan 5S wet/dry end.
                    </p>
                    <div className="bg-slate-950 p-2 rounded border border-slate-800">
                      <strong className="text-[10px] text-amber-300 block mb-1">Tugas Utama Shift:</strong>
                      <ul className="text-[11px] space-y-1 text-slate-300">
                        <li>&bull; Siapkan 3 batang spool reel lengkap core karton & perekat.</li>
                        <li>&bull; Singkirkan broke kertas dari pit dryer ke broke pulper.</li>
                        <li>&bull; Semprot udara (air blow) bantu threading kertas di nip.</li>
                        <li>&bull; Periksa nosel shower pencuci kain kempa (felt).</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Personel: Topik, Sapei, Faqiih, Zulkifli, Reza</span>
                  <button
                    onClick={() => {
                      setSelectedJobDescId('jd-helper-pm');
                      setActiveTab('jobdesc');
                    }}
                    className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1"
                  >
                    <span>Detail SOP</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 2. HELPER STOCK PREPARATION (SP) */}
              <div className="bg-slate-900 border border-cyan-500/40 rounded-xl p-4 flex flex-col justify-between space-y-3 shadow-md">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-cyan-300 uppercase flex items-center gap-1.5">
                      <Cpu className="w-4 h-4 text-cyan-400" />
                      <span>Helper Stock Preparation (SP)</span>
                    </span>
                    <span className="text-[10px] bg-cyan-950 text-cyan-300 px-1.5 py-0.2 rounded border border-cyan-800">
                      Cleaning & PEO
                    </span>
                  </div>

                  <div className="mt-2 text-xs text-slate-300 space-y-1.5">
                    <p className="text-[11px] text-slate-400">
                      <strong>Fokus Pokok:</strong> Eksekusi Junk Trap HDC, pembersihan tali ragger, pelarutan PEO (17-19 Cps), dan ambil sampel freeness (°SR).
                    </p>
                    <div className="bg-slate-950 p-2 rounded border border-slate-800">
                      <strong className="text-[10px] text-amber-300 block mb-1">Tugas Utama Shift:</strong>
                      <ul className="text-[11px] space-y-1 text-slate-300">
                        <li>&bull; Buang kotoran Junk Trap HDC berkala tiap 1-2 jam.</li>
                        <li>&bull; Timbang dan aduk bubuk PEO anti-fish eye.</li>
                        <li>&bull; Ambil sampel 1L bubur refiner untuk uji lab °SR.</li>
                        <li>&bull; Bersihkan keranjang saringan getar reject screen.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Personel: Sunarman, M. Nuranggi, Nurzaman</span>
                  <button
                    onClick={() => {
                      setSelectedJobDescId('jd-helper-sp');
                      setActiveTab('jobdesc');
                    }}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
                  >
                    <span>Detail SOP</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 3. HELPER REWINDER (FINISHING) */}
              <div className="bg-slate-900 border border-amber-500/40 rounded-xl p-4 flex flex-col justify-between space-y-3 shadow-md">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-amber-300 uppercase flex items-center gap-1.5">
                      <Sliders className="w-4 h-4 text-amber-400" />
                      <span>Helper Rewinder Finishing</span>
                    </span>
                    <span className="text-[10px] bg-amber-950 text-amber-300 px-1.5 py-0.2 rounded border border-amber-800">
                      Roll Handling
                    </span>
                  </div>

                  <div className="mt-2 text-xs text-slate-300 space-y-1.5">
                    <p className="text-[11px] text-slate-400">
                      <strong>Fokus Pokok:</strong> Pandu crane hoist muat roll jumbo, pasang core karton, buang trim tepi, timbang, stiker label, dan wrapping.
                    </p>
                    <div className="bg-slate-950 p-2 rounded border border-slate-800">
                      <strong className="text-[10px] text-amber-300 block mb-1">Tugas Utama Shift:</strong>
                      <ul className="text-[11px] space-y-1 text-slate-300">
                        <li>&bull; Pasang core ke air shaft & pompa angin pengunci.</li>
                        <li>&bull; Tempel lem / double-tape penarik kertas awal.</li>
                        <li>&bull; Timbang berat netto roll jadi dan tempel label resmi.</li>
                        <li>&bull; Bungkus plastik stretch film pelindung roll jadi.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Personel: Aditya, Andi, Heri, Dedi Aris, Ramdani, Eman</span>
                  <button
                    onClick={() => {
                      setSelectedJobDescId('jd-helper-rewinder');
                      setActiveTab('jobdesc');
                    }}
                    className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
                  >
                    <span>Detail SOP</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 4. HELPER PULPER (BAHAN BAKU) */}
              <div className="bg-slate-900 border border-emerald-500/40 rounded-xl p-4 flex flex-col justify-between space-y-3 shadow-md">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-emerald-300 uppercase flex items-center gap-1.5">
                      <Cpu className="w-4 h-4 text-emerald-400" />
                      <span>Helper Hydrapulper</span>
                    </span>
                    <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-800">
                      Bale Feeding
                    </span>
                  </div>

                  <div className="mt-2 text-xs text-slate-300 space-y-1.5">
                    <p className="text-[11px] text-slate-400">
                      <strong>Fokus Pokok:</strong> Potong kawat bale kertas bekas, buang sampah kayu/besi/plastik tebal, dorong ke apron konveyor, dan gulung kawat.
                    </p>
                    <div className="bg-slate-950 p-2 rounded border border-slate-800">
                      <strong className="text-[10px] text-amber-300 block mb-1">Tugas Utama Shift:</strong>
                      <ul className="text-[11px] space-y-1 text-slate-300">
                        <li>&bull; Potong bersih kawat pengikat bale dengan tang baja.</li>
                        <li>&bull; Gulung kawat bekas ke tong besi terpisah.</li>
                        <li>&bull; Singkirkan kontaminan padat sebelum masuk pulper.</li>
                        <li>&bull; Tarik dan potong tali ragger kotoran lilitan.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Personel: Sutejo, Surya Handi, Waris, Agus Angggara</span>
                  <button
                    onClick={() => {
                      setSelectedJobDescId('jd-helper-pulper');
                      setActiveTab('jobdesc');
                    }}
                    className="text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
                  >
                    <span>Detail SOP</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 5. HELPER BOILER (UTILITAS UAP) */}
              <div className="bg-slate-900 border border-rose-500/40 rounded-xl p-4 flex flex-col justify-between space-y-3 shadow-md">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-rose-300 uppercase flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-rose-400" />
                      <span>Helper Boiler (Uap Tekan)</span>
                    </span>
                    <span className="text-[10px] bg-rose-950 text-rose-300 px-1.5 py-0.2 rounded border border-rose-800">
                      Fuel & Ash
                    </span>
                  </div>

                  <div className="mt-2 text-xs text-slate-300 space-y-1.5">
                    <p className="text-[11px] text-slate-400">
                      <strong>Fokus Pokok:</strong> Pengumpanan bahan bakar anti-tersumbat, pembuangan abu basah, isi garam regenerasi softener, dan blowdown.
                    </p>
                    <div className="bg-slate-950 p-2 rounded border border-slate-800">
                      <strong className="text-[10px] text-amber-300 block mb-1">Tugas Utama Shift:</strong>
                      <ul className="text-[11px] space-y-1 text-slate-300">
                        <li>&bull; Awasi corong feeding bahan bakar tiap 30 menit.</li>
                        <li>&bull; Keluarkan abu dari tungku, siram air, dan angkut.</li>
                        <li>&bull; Tuang karung garam NaCl ke tangki softener.</li>
                        <li>&bull; Bantu buka valve drain lumpur drum boiler.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Personel: Peri Riyadi (Helper Resmi)</span>
                  <button
                    onClick={() => {
                      setSelectedJobDescId('jd-helper-boiler');
                      setActiveTab('jobdesc');
                    }}
                    className="text-xs text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1"
                  >
                    <span>Detail SOP</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* Matriks Perbandingan Tanggung Jawab: Operator Utama vs Pembantu Operator */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Matriks Batasan Kerja: Operator Utama vs Pembantu Operator (Helper)</span>
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-950 text-slate-300 border-b border-slate-800">
                      <th className="p-2.5 font-bold">Aspek Pekerjaan</th>
                      <th className="p-2.5 font-bold text-emerald-400">Operator Utama Mesin</th>
                      <th className="p-2.5 font-bold text-amber-300">Pembantu Operator (Helper)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr>
                      <td className="p-2.5 font-semibold text-white">Panel Kontrol & Kecepatan Mesin</td>
                      <td className="p-2.5">Otoritas penuh menyetel speed (100-150 MPM), DCS, dan draw roll.</td>
                      <td className="p-2.5 text-rose-400">Dilarang menyetel panel kontrol tanpa izin operator utama.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-white">Penanganan Broke Kertas</td>
                      <td className="p-2.5">Memberikan aba-aba & koordinasi saat kertas putus.</td>
                      <td className="p-2.5 text-emerald-400">Eksekutor fisik pembersihan kolong mesin & masukan ke broke pulper.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-white">Spool Reel & Core Karton</td>
                      <td className="p-2.5">Otorisasi pergantian rol & eksekusi transfer gulungan kertas.</td>
                      <td className="p-2.5 text-emerald-400">Menyiapkan core karton baru, rekatkan tape, & siapkan poros cadangan.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-white">Input Laporan Shift Digital</td>
                      <td className="p-2.5">Penanggung jawab input data tonase, grade, defect & validasi.</td>
                      <td className="p-2.5 text-slate-400">Membantu mencatat nomor roll, berat timbangan, & jam jalan.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-white">Kondisi Darurat (Emergency)</td>
                      <td className="p-2.5">Tekan E-stop & lakukan prosedur shutdown darurat.</td>
                      <td className="p-2.5 text-amber-300">Wajib tekan E-stop terdekat jika melihat personil terjepit/bahaya fatal.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: DAFTAR LENGKAP PERSONEL & REGU SHIFT */}
        {/* ========================================================================= */}
        {activeTab === 'roster' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-950/40">
            
            {/* Filter Bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-slate-400 font-semibold flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" /> Unit:
                </span>
                {(['ALL', 'PM1', 'PM2', 'PM5', 'STOCK_PREP', 'REWINDER', 'PULPER', 'BOILER'] as string[]).map((u) => (
                  <button
                    key={u}
                    onClick={() => setSelectedUnit(u)}
                    className={`px-2.5 py-1 rounded-lg font-bold border transition-all ${
                      selectedUnit === u
                        ? 'bg-indigo-600 border-indigo-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {u === 'ALL' ? 'Semua Unit' : u}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 font-semibold">Group:</span>
                {(['ALL', 'Group 1', 'Group 2', 'Group 3'] as string[]).map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGroup(g)}
                    className={`px-2 py-1 rounded-lg text-[11px] font-bold border transition-all ${
                      selectedGroup === g
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {g === 'ALL' ? 'Semua' : g}
                  </button>
                ))}
              </div>
            </div>

            {/* Personnel Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {filteredRoster.map((person) => {
                const isHelper = person.isHelper || person.role.toLowerCase().includes('helper');
                return (
                  <div
                    key={person.id}
                    className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                      isHelper
                        ? 'bg-amber-950/20 border-amber-800/50 hover:border-amber-500'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1">
                        <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold uppercase ${
                          person.status === 'Pimpinan'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : isHelper
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        }`}>
                          {person.status}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-1.5 py-0.2 rounded border border-slate-800">
                          {person.group}
                        </span>
                      </div>

                      <div className="text-sm font-black text-white mt-1.5">
                        {person.name}
                      </div>
                      <div className="text-xs text-indigo-300 font-semibold mt-0.5">
                        {person.role}
                      </div>

                      <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                        <span>Unit: <strong>{person.unit}</strong></span>
                      </div>
                    </div>

                    {/* Action Button: Use name in shift report */}
                    {onSelectOperatorForReport && (
                      <div className="mt-3 pt-2 border-t border-slate-800/80 flex justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            onSelectOperatorForReport(person);
                            onClose();
                          }}
                          className="flex items-center gap-1 px-2.5 py-1 bg-blue-600/80 hover:bg-blue-600 text-white rounded-lg text-xs font-semibold transition-colors shadow-sm"
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>Pilih di Laporan</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {filteredRoster.length === 0 && (
              <div className="text-center py-12 text-slate-400 text-xs">
                Tidak ada personel yang cocok dengan filter pencarian.
              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: MATRIKS TANGGUNG JAWAB (RACI MATRIX) */}
        {/* ========================================================================= */}
        {activeTab === 'matrix' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-950/40">
            
            {/* Header & RACI Definition Banner */}
            <div className="bg-gradient-to-r from-emerald-950/90 via-slate-900 to-teal-950/90 border border-emerald-500/40 rounded-2xl p-4 sm:p-5 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-mono font-bold uppercase">
                      STANDAR RACI RESMI PT. PUP
                    </span>
                    <span className="text-xs text-slate-400">&bull; Standar Operasional Rev 03</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white mt-1 uppercase tracking-wide">
                    MATRIKS TANGGUNG JAWAB & PEMBAGIAN TUGAS OPERASIONAL (RACI MATRIX)
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-3xl">
                    Memetakan secara tegas peran <strong className="text-amber-300">Pembantu Operator (Helper)</strong>, <strong className="text-blue-300">Operator Utama</strong>, <strong className="text-cyan-300">Kepala Regu (Karu)</strong>, dan Manajemen pada setiap titik kritis pengoperasian mesin dan penanganan kendala shift.
                  </p>
                </div>

                {/* RACI Legend Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 shrink-0">
                  <div className="bg-slate-900/90 border border-blue-500/50 p-2 rounded-xl text-center">
                    <span className="inline-block w-6 h-6 rounded bg-blue-600 text-white font-black text-xs leading-6 shadow">
                      R
                    </span>
                    <div className="text-[11px] font-bold text-blue-300 mt-1">Responsible</div>
                    <div className="text-[10px] text-slate-400">Pelaksana Fisik</div>
                  </div>

                  <div className="bg-slate-900/90 border border-emerald-500/50 p-2 rounded-xl text-center">
                    <span className="inline-block w-6 h-6 rounded bg-emerald-600 text-white font-black text-xs leading-6 shadow">
                      A
                    </span>
                    <div className="text-[11px] font-bold text-emerald-300 mt-1">Accountable</div>
                    <div className="text-[10px] text-slate-400">Penanggung Jawab</div>
                  </div>

                  <div className="bg-slate-900/90 border border-amber-500/50 p-2 rounded-xl text-center">
                    <span className="inline-block w-6 h-6 rounded bg-amber-600 text-slate-950 font-black text-xs leading-6 shadow">
                      C
                    </span>
                    <div className="text-[11px] font-bold text-amber-300 mt-1">Consulted</div>
                    <div className="text-[10px] text-slate-400">Konsultasi / Ahli</div>
                  </div>

                  <div className="bg-slate-900/90 border border-slate-600/50 p-2 rounded-xl text-center">
                    <span className="inline-block w-6 h-6 rounded bg-slate-600 text-slate-200 font-black text-xs leading-6 shadow">
                      I
                    </span>
                    <div className="text-[11px] font-bold text-slate-300 mt-1">Informed</div>
                    <div className="text-[10px] text-slate-400">Diberitahu Status</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter & View Mode Controls */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-3">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                {/* Area Filter Buttons */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 lg:pb-0">
                  <span className="text-xs text-slate-400 font-semibold shrink-0 mr-1 flex items-center gap-1">
                    <Filter className="w-3.5 h-3.5 text-emerald-400" /> Area:
                  </span>
                  {[
                    { id: 'ALL', label: 'Semua Area' },
                    { id: 'STOCK_PREP', label: 'Stock Prep' },
                    { id: 'WET_END', label: 'Wet End' },
                    { id: 'DRY_END', label: 'Dry End' },
                    { id: 'POPE_REEL', label: 'Pope Reel' },
                    { id: 'REWINDER', label: 'Rewinder' },
                    { id: 'BOILER', label: 'Boiler' },
                    { id: 'K3_SAFETY', label: 'K3 & LOTO' },
                    { id: 'REPORTING', label: 'Laporan Shift' }
                  ].map((area) => (
                    <button
                      key={area.id}
                      onClick={() => setMatrixAreaFilter(area.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                        matrixAreaFilter === area.id
                          ? 'bg-emerald-600 text-white shadow'
                          : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      {area.label}
                    </button>
                  ))}
                </div>

                {/* View Mode & Role Highlight */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* Highlight Role */}
                  <select
                    value={matrixRoleHighlight}
                    onChange={(e) => setMatrixRoleHighlight(e.target.value)}
                    className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="ALL">Semua Peran RACI</option>
                    <option value="helperOperator">Fokus: Helper PM</option>
                    <option value="operatorUtama">Fokus: Operator Utama PM</option>
                    <option value="karuShift">Fokus: Karu Shift</option>
                    <option value="helperRewinder">Fokus: Helper Rewinder</option>
                    <option value="operatorRewinder">Fokus: Operator Rewinder</option>
                    <option value="helperBoiler">Fokus: Helper Boiler</option>
                    <option value="operatorBoiler">Fokus: Operator Boiler</option>
                  </select>

                  {/* Toggle Table vs Cards */}
                  <div className="flex items-center bg-slate-950 border border-slate-700 rounded-lg p-0.5">
                    <button
                      onClick={() => setMatrixViewMode('table')}
                      className={`p-1.5 rounded text-xs transition-colors ${
                        matrixViewMode === 'table' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                      title="Tampilan Tabel Grid RACI"
                    >
                      <Grid className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setMatrixViewMode('cards')}
                      className={`p-1.5 rounded text-xs transition-colors ${
                        matrixViewMode === 'cards' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                      title="Tampilan Kartu Rincian SOP"
                    >
                      <List className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Total items badge */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
                <span>
                  Menampilkan <strong>{filteredMatrix.length}</strong> aktivitas operasional kritis
                  {matrixRoleHighlight !== 'ALL' && ' (disaring berdasarkan peran terpilih)'}
                </span>
                <span className="text-emerald-400 font-mono">Klik baris untuk melihat rincian tugas spesifik</span>
              </div>
            </div>

            {/* VIEW MODE 1: RACI TABLE GRID */}
            {matrixViewMode === 'table' && (
              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-950 border-b border-slate-800 text-slate-300 font-bold uppercase tracking-wider">
                        <th className="py-3 px-3.5 min-w-[240px] sticky left-0 bg-slate-950 z-10">
                          Aktivitas / Titik Kritis SOP
                        </th>
                        <th className="py-3 px-3 min-w-[190px]">Standar Kritis / Nilai</th>
                        {MATRIX_ROLES.map((role) => (
                          <th
                            key={role.id}
                            className={`py-3 px-2 text-center min-w-[65px] ${
                              matrixRoleHighlight === role.id ? 'bg-emerald-950/80 text-emerald-200' : ''
                            }`}
                            title={`${role.name}: ${role.description}`}
                          >
                            <div className="font-mono text-[11px] font-black">{role.shortCode}</div>
                            <div className="text-[9px] font-normal text-slate-400 truncate max-w-[60px] mx-auto">
                              {role.name.split(' ')[0]}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 font-sans">
                      {filteredMatrix.map((item) => {
                        const isExpanded = expandedTaskId === item.id;
                        return (
                          <React.Fragment key={item.id}>
                            <tr
                              onClick={() => setExpandedTaskId(isExpanded ? null : item.id)}
                              className={`cursor-pointer transition-colors ${
                                isExpanded
                                  ? 'bg-slate-800/90'
                                  : 'hover:bg-slate-800/50 bg-slate-900/40'
                              }`}
                            >
                              {/* Task Title & Area */}
                              <td className="py-3 px-3.5 sticky left-0 bg-slate-900 z-10">
                                <div className="flex items-center gap-2">
                                  <span className="p-1 rounded bg-slate-800 text-slate-300">
                                    {isExpanded ? (
                                      <ChevronUp className="w-3.5 h-3.5 text-emerald-400" />
                                    ) : (
                                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                                    )}
                                  </span>
                                  <div>
                                    <div className="font-bold text-white text-xs">{item.taskTitle}</div>
                                    <div className="flex items-center gap-1.5 mt-0.5 text-[10px]">
                                      <span className="text-emerald-400 font-mono font-semibold">
                                        {item.sopReference}
                                      </span>
                                      <span className="text-slate-600">&bull;</span>
                                      <span className="text-slate-400">{item.areaName}</span>
                                    </div>
                                  </div>
                                </div>
                              </td>

                              {/* Critical Standard */}
                              <td className="py-3 px-3 text-[11px] text-slate-300 font-mono leading-relaxed">
                                {item.criticalStandard}
                              </td>

                              {/* RACI Matrix Cells */}
                              {MATRIX_ROLES.map((role) => {
                                const val = item.raci[role.id as keyof ResponsibilityItem['raci']];
                                const isHighlightedRole = matrixRoleHighlight === role.id;
                                let badgeStyle = 'bg-slate-800 text-slate-500';
                                if (val === 'R') badgeStyle = 'bg-blue-600 text-white font-black shadow ring-1 ring-blue-400/50';
                                else if (val === 'A') badgeStyle = 'bg-emerald-600 text-white font-black shadow ring-1 ring-emerald-400/50';
                                else if (val === 'C') badgeStyle = 'bg-amber-600/90 text-slate-950 font-black shadow';
                                else if (val === 'I') badgeStyle = 'bg-slate-700/80 text-slate-300 font-semibold';

                                return (
                                  <td
                                    key={role.id}
                                    className={`py-3 px-2 text-center ${
                                      isHighlightedRole ? 'bg-emerald-950/40' : ''
                                    }`}
                                  >
                                    <span
                                      className={`inline-block w-6 h-6 rounded text-xs leading-6 ${badgeStyle}`}
                                      title={`${role.name}: ${
                                        val === 'R' ? 'Responsible (Pelaksana Langsung)' :
                                        val === 'A' ? 'Accountable (Penanggung Jawab Mutlak)' :
                                        val === 'C' ? 'Consulted (Pihak Rujukan/Tim Ahli)' :
                                        'Informed (Penerima Informasi)'
                                      }`}
                                    >
                                      {val}
                                    </span>
                                  </td>
                                );
                              })}
                            </tr>

                            {/* EXPANDED ACCORDION: DETAIL TUGAS HELPER, OPERATOR, KARU & K3 */}
                            {isExpanded && (
                              <tr className="bg-slate-950/90 border-b border-emerald-500/40">
                                <td colSpan={2 + MATRIX_ROLES.length} className="p-4">
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                    {/* 1. Tugas Pembantu Operator (Helper) */}
                                    <div className="bg-amber-950/30 border border-amber-500/40 rounded-xl p-3.5 space-y-1.5">
                                      <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                                        <HardHat className="w-4 h-4 text-amber-400" />
                                        <span>Tugas Helper (Pembantu Operator)</span>
                                      </div>
                                      <p className="text-[11px] text-amber-100/90 leading-relaxed">
                                        {item.operationalNotes.helperDuties}
                                      </p>
                                    </div>

                                    {/* 2. Tugas Operator Utama */}
                                    <div className="bg-blue-950/30 border border-blue-500/40 rounded-xl p-3.5 space-y-1.5">
                                      <div className="flex items-center gap-2 text-blue-300 font-bold text-xs">
                                        <Sliders className="w-4 h-4 text-blue-400" />
                                        <span>Tugas Operator Utama Mesin</span>
                                      </div>
                                      <p className="text-[11px] text-blue-100/90 leading-relaxed">
                                        {item.operationalNotes.operatorDuties}
                                      </p>
                                    </div>

                                    {/* 3. Akuntabilitas Kepala Regu (Karu Shift) */}
                                    <div className="bg-cyan-950/30 border border-cyan-500/40 rounded-xl p-3.5 space-y-1.5">
                                      <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs">
                                        <ShieldCheck className="w-4 h-4 text-cyan-400" />
                                        <span>Akuntabilitas Karu Shift</span>
                                      </div>
                                      <p className="text-[11px] text-cyan-100/90 leading-relaxed">
                                        {item.operationalNotes.karuAccountability}
                                      </p>
                                    </div>

                                    {/* 4. Standar Mutlak K3 & LOTO */}
                                    <div className="bg-rose-950/30 border border-rose-500/40 rounded-xl p-3.5 space-y-1.5">
                                      <div className="flex items-center gap-2 text-rose-300 font-bold text-xs">
                                        <AlertTriangle className="w-4 h-4 text-rose-400" />
                                        <span>Mandat K3 & Titik Bahaya</span>
                                      </div>
                                      <p className="text-[11px] text-rose-100/90 leading-relaxed">
                                        {item.operationalNotes.k3Rule}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* VIEW MODE 2: DETAILED CARD LIST */}
            {matrixViewMode === 'cards' && (
              <div className="space-y-4">
                {filteredMatrix.map((item) => (
                  <div
                    key={item.id}
                    className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 sm:p-5 shadow-md space-y-4 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded font-mono text-xs font-bold">
                            {item.sopReference}
                          </span>
                          <span className="text-xs text-slate-400 font-semibold">{item.areaName}</span>
                        </div>
                        <h4 className="text-base font-bold text-white mt-1">{item.taskTitle}</h4>
                      </div>
                      <div className="text-xs font-mono bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-emerald-400">
                        {item.criticalStandard}
                      </div>
                    </div>

                    {/* RACI Role Pills */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {MATRIX_ROLES.map((role) => {
                        const val = item.raci[role.id as keyof ResponsibilityItem['raci']];
                        return (
                          <div
                            key={role.id}
                            className="flex items-center gap-1.5 px-2 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs"
                          >
                            <span className="text-slate-400 text-[11px] font-mono">{role.shortCode}:</span>
                            <span
                              className={`w-5 h-5 rounded flex items-center justify-center font-black text-[10px] ${
                                val === 'R' ? 'bg-blue-600 text-white' :
                                val === 'A' ? 'bg-emerald-600 text-white' :
                                val === 'C' ? 'bg-amber-600 text-slate-950' :
                                'bg-slate-700 text-slate-300'
                              }`}
                            >
                              {val}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Operational Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                      <div className="p-3 bg-amber-950/20 border border-amber-600/30 rounded-xl space-y-1">
                        <div className="text-amber-300 font-bold text-xs flex items-center gap-1.5">
                          <HardHat className="w-3.5 h-3.5" /> Tugas Helper:
                        </div>
                        <p className="text-[11px] text-amber-100/90 leading-relaxed">
                          {item.operationalNotes.helperDuties}
                        </p>
                      </div>

                      <div className="p-3 bg-blue-950/20 border border-blue-600/30 rounded-xl space-y-1">
                        <div className="text-blue-300 font-bold text-xs flex items-center gap-1.5">
                          <Sliders className="w-3.5 h-3.5" /> Operator Utama:
                        </div>
                        <p className="text-[11px] text-blue-100/90 leading-relaxed">
                          {item.operationalNotes.operatorDuties}
                        </p>
                      </div>

                      <div className="p-3 bg-cyan-950/20 border border-cyan-600/30 rounded-xl space-y-1">
                        <div className="text-cyan-300 font-bold text-xs flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5" /> Akuntabilitas Karu:
                        </div>
                        <p className="text-[11px] text-cyan-100/90 leading-relaxed">
                          {item.operationalNotes.karuAccountability}
                        </p>
                      </div>

                      <div className="p-3 bg-rose-950/20 border border-rose-600/30 rounded-xl space-y-1">
                        <div className="text-rose-300 font-bold text-xs flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" /> Titik Kritis K3:
                        </div>
                        <p className="text-[11px] text-rose-100/90 leading-relaxed">
                          {item.operationalNotes.k3Rule}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredMatrix.length === 0 && (
              <div className="text-center py-12 text-slate-400 text-xs bg-slate-900 border border-slate-800 rounded-xl">
                Tidak ada data matriks yang sesuai dengan kriteria filter.
              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL FOOTER */}
        {/* ========================================================================= */}
        <div className="px-5 py-3 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              Dokumen: {PT_PUP_METADATA.documentCode}
            </span>
            <span>&bull;</span>
            <span>Berlaku Efektif: {PT_PUP_METADATA.effectiveDate}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-semibold transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

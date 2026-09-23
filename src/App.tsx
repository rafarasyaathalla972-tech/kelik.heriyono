import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { ReportForm } from './components/ReportForm';
import { DashboardCharts } from './components/DashboardCharts';
import { ReportList } from './components/ReportList';
import { SopModal } from './components/SopModal';
import { TrainingModal } from './components/TrainingModal';
import { ShareModal } from './components/ShareModal';
import { OrgStructureModal } from './components/OrgStructureModal';
import { PmProductsModal } from './components/PmProductsModal';
import { ShiftReport, MachineId, EditAuditLog, TrainingModuleId, PupPersonnel } from './types';
import { INITIAL_SHIFT_REPORTS } from './data/initialReports';
import { 
  getSharedReports, 
  saveSharedReport, 
  updateSharedReport, 
  deleteSharedReport,
  checkServerHealth 
} from './services/reportService';
import { CheckCircle2, Factory, BookOpen, GraduationCap, Share2, Building2, Sliders } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'form' | 'dashboard' | 'history'>('dashboard');
  
  // Reports state initialized from localStorage or initial sample data
  const [reports, setReports] = useState<ShiftReport[]>(() => {
    try {
      const saved = localStorage.getItem('panca_paper_shift_reports');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const existingIds = new Set(parsed.map((r: ShiftReport) => r.id));
          const merged = [
            ...parsed,
            ...INITIAL_SHIFT_REPORTS.filter(initR => !existingIds.has(initR.id))
          ];
          return merged.map((item: ShiftReport) => {
            let normalizedShift = item.shift;
            if ((normalizedShift as string) === 'Pagi') normalizedShift = 'Shift 1';
            else if ((normalizedShift as string) === 'Siang') normalizedShift = 'Shift 2';
            else if ((normalizedShift as string) === 'Malam') normalizedShift = 'Shift 3';
            return {
              ...item,
              shift: normalizedShift
            };
          });
        }
      }
    } catch (e) {
      console.error('Error loading reports from localStorage', e);
    }
    return INITIAL_SHIFT_REPORTS;
  });

  // Server synchronization state
  const [isServerConnected, setIsServerConnected] = useState<boolean>(true);
  const isEditingRef = useRef<boolean>(false);

  // Edit mode state
  const [editingReport, setEditingReport] = useState<ShiftReport | null>(null);

  // Modals state
  const [isSopOpen, setIsSopOpen] = useState<boolean>(false);
  const [isTrainingOpen, setIsTrainingOpen] = useState<boolean>(false);
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);
  const [isOrgStructureOpen, setIsOrgStructureOpen] = useState<boolean>(false);
  const [isPmProductsOpen, setIsPmProductsOpen] = useState<boolean>(false);
  const [orgStructureInitialTab, setOrgStructureInitialTab] = useState<'chart' | 'jobdesc' | 'roster' | 'helpers' | 'matrix'>('chart');
  const [trainingDefaultMachine, setTrainingDefaultMachine] = useState<TrainingModuleId>('REWINDER');

  const handleOpenOrgStructure = (initialTab: 'chart' | 'jobdesc' | 'roster' | 'helpers' | 'matrix' = 'chart') => {
    setOrgStructureInitialTab(initialTab);
    setIsOrgStructureOpen(true);
  };

  // Success Notification banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Sync with shared server
  const fetchLatestReports = useCallback(async () => {
    // Avoid overwriting local state if the user is currently editing an item
    if (isEditingRef.current) return;

    try {
      const { reports: sharedList, isFromServer } = await getSharedReports();
      setIsServerConnected(isFromServer);
      if (sharedList && sharedList.length > 0) {
        setReports(prev => {
          // Compare JSON string to avoid unnecessary re-renders
          if (JSON.stringify(prev) !== JSON.stringify(sharedList)) {
            return sharedList;
          }
          return prev;
        });
      }
    } catch (e) {
      console.warn('Sync error:', e);
      setIsServerConnected(false);
    }
  }, []);

  // Initial load + periodic real-time team polling (every 4 seconds)
  useEffect(() => {
    fetchLatestReports();

    const interval = setInterval(() => {
      fetchLatestReports();
    }, 4000);

    const handleFocus = () => {
      fetchLatestReports();
    };
    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, [fetchLatestReports]);

  // Keep ref updated
  useEffect(() => {
    isEditingRef.current = !!editingReport;
  }, [editingReport]);

  // Save handler (both create and edit)
  const handleSaveReport = async (report: ShiftReport, editReason?: string, editorName?: string) => {
    if (editingReport) {
      // Update existing report with audit log
      const auditEntry: EditAuditLog = {
        id: `audit-${Date.now()}`,
        editedAt: new Date().toISOString(),
        editedBy: editorName || 'Petugas Shift',
        reason: editReason || 'Revisi data perbaikan',
        summary: `Revisi tonase ${report.actualProductionTon}T (${report.achievementPercentage}%)`
      };

      const updatedReportObj: ShiftReport = {
        ...report,
        editHistory: [auditEntry, ...(report.editHistory || [])],
        updatedAt: new Date().toISOString()
      };

      // Optimistic local update
      const updatedList = reports.map(r => r.id === report.id ? updatedReportObj : r);
      setReports(updatedList);
      setEditingReport(null);

      // Save to shared database
      await updateSharedReport(updatedReportObj);

      showToast(`Laporan ${report.machine} - ${report.shift} (${report.date}) berhasil diperbaiki & disinkronkan ke seluruh tim!`);
      setActiveTab('history');
    } else {
      // Add new report
      const newReportObj: ShiftReport = {
        ...report,
        id: report.id || `rep-${report.machine.toLowerCase()}-${Date.now()}`,
        createdAt: report.createdAt || new Date().toISOString(),
        editHistory: []
      };

      // Optimistic local update
      setReports([newReportObj, ...reports]);

      // Save to shared database
      await saveSharedReport(newReportObj);

      showToast(`Laporan Shift ${report.machine} berhasil disimpan & disinkronkan ke seluruh tim!`);
      setActiveTab('dashboard');
    }
  };

  const handleStartEdit = (report: ShiftReport) => {
    setEditingReport(report);
    setActiveTab('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingReport(null);
  };

  const handleDeleteReport = async (id: string) => {
    setReports(prev => prev.filter(r => r.id !== id));
    await deleteSharedReport(id);
    showToast('Laporan berhasil dihapus dari database tim.');
  };

  const handleImportReports = async (importedList: ShiftReport[]) => {
    setReports(importedList);
    try {
      await fetch('/api/reports/bulk-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reports: importedList, mergeMode: 'merged' })
      });
    } catch (e) {
      console.warn('Could not bulk sync to server', e);
    }
    showToast(`Data berhasil dipulihkan: ${importedList.length} laporan shift aktif.`);
  };

  const handleOpenTraining = (machine?: TrainingModuleId) => {
    if (machine) {
      setTrainingDefaultMachine(machine);
    }
    setIsTrainingOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Global Navbar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => {
          if (editingReport && tab !== 'form') {
            if (confirm('Anda sedang dalam mode perbaikan laporan. Batalkan pengeditan?')) {
              setEditingReport(null);
              setActiveTab(tab);
            }
          } else {
            setActiveTab(tab);
          }
        }}
        onOpenSop={() => setIsSopOpen(true)}
        onOpenTraining={() => handleOpenTraining()}
        onOpenOrgStructure={() => setIsOrgStructureOpen(true)}
        onOpenPmProducts={() => setIsPmProductsOpen(true)}
        onOpenShare={() => setIsShareOpen(true)}
        reportCount={reports.length}
        isServerConnected={isServerConnected}
      />

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 animate-bounce">
          <div className="bg-emerald-900/95 border border-emerald-500 text-emerald-100 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold backdrop-blur-md">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'form' && (
          <ReportForm
            onSaveReport={handleSaveReport}
            onOpenSop={() => setIsSopOpen(true)}
            onOpenTraining={handleOpenTraining}
            onOpenOrgStructure={handleOpenOrgStructure}
            editingReport={editingReport}
            onCancelEdit={handleCancelEdit}
            existingReports={reports}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardCharts
            reports={reports}
            onNavigateToForm={() => setActiveTab('form')}
          />
        )}

        {activeTab === 'history' && (
          <ReportList
            reports={reports}
            onEditReport={handleStartEdit}
            onDeleteReport={handleDeleteReport}
          />
        )}
      </main>

      {/* Quick Guide Footer Banner */}
      <footer className="border-t border-slate-800/80 bg-slate-900/90 text-slate-400 py-6 px-4 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-900/50 border border-blue-700/50 flex items-center justify-center text-blue-400">
              <Factory className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-slate-200">PT. PANCA USAHATAMA PARAMITA</p>
              <p className="text-[11px] text-slate-400">Divisi Produksi Kertas &bull; Unit PM1, PM2, PM5</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <button
              onClick={() => setIsSopOpen(true)}
              className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>SOP 4 Tahap Proses</span>
            </button>
            <span className="text-slate-600">&bull;</span>
            <button
              onClick={() => handleOpenTraining('STOCK_PREP')}
              className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
              title="Buka Modul Pelatihan Stock Preparation"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Modul Stock Prep</span>
            </button>
            <span className="text-slate-600">&bull;</span>
            <button
              onClick={() => handleOpenTraining('REWINDER')}
              className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
              title="Buka Modul Pelatihan Rewinder & Mesin"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Training Mesin & Rewinder</span>
            </button>
            <span className="text-slate-600">&bull;</span>
            <button
              onClick={() => setIsPmProductsOpen(true)}
              className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
              title="Buka Master Data & Spesifikasi Produk Jumbo Roll PM1, PM2, PM5"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Katalog Produk PM</span>
            </button>
            <span className="text-slate-600">&bull;</span>
            <button
              onClick={() => handleOpenOrgStructure('chart')}
              className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
              title="Buka Struktur Organisasi & Job Description Personel PT. PUP"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Struktur & Job Desc</span>
            </button>
            <span className="text-slate-600">&bull;</span>
            <button
              onClick={() => handleOpenOrgStructure('matrix')}
              className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
              title="Buka Matriks Tanggung Jawab Operasional & RACI Matrix Shift PT. PUP"
            >
              <Sliders className="w-3.5 h-3.5 text-emerald-400" />
              <span>Matriks RACI Shift</span>
            </button>
            <span className="text-slate-600">&bull;</span>
            <button
              onClick={() => setIsShareOpen(true)}
              className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
              title="Buka menu bagikan akses tim"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Bagikan Akses Tim</span>
            </button>
            <span className="text-slate-600">&bull;</span>
            <span className="text-slate-500">Sistem Laporan Shift Pabrik Kertas v2.5</span>
          </div>
        </div>
      </footer>

      {/* Slide-over / Modals */}
      <SopModal
        isOpen={isSopOpen}
        onClose={() => setIsSopOpen(false)}
        onOpenTraining={handleOpenTraining}
      />

      <TrainingModal
        isOpen={isTrainingOpen}
        onClose={() => setIsTrainingOpen(false)}
        defaultMachine={trainingDefaultMachine}
      />

      <PmProductsModal
        isOpen={isPmProductsOpen}
        onClose={() => setIsPmProductsOpen(false)}
      />

      <OrgStructureModal
        isOpen={isOrgStructureOpen}
        onClose={() => setIsOrgStructureOpen(false)}
        initialTab={orgStructureInitialTab}
        onSelectOperatorForReport={(person) => {
          setIsOrgStructureOpen(false);
          setActiveTab('form');
          showToast(`Personel terpilih: ${person.name} (${person.role}) - Unit ${person.unit}`);
        }}
      />

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        sharedCloudUrl="https://ais-pre-edi5lhzgtwjelot4ig647n-845444139980.asia-east1.run.app"
        isServerConnected={isServerConnected}
        reports={reports}
        onImportReports={handleImportReports}
      />

    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ReportForm } from './components/ReportForm';
import { DashboardCharts } from './components/DashboardCharts';
import { ReportList } from './components/ReportList';
import { SopModal } from './components/SopModal';
import { TrainingModal } from './components/TrainingModal';
import { ShareModal } from './components/ShareModal';
import { ShiftReport, MachineId, EditAuditLog } from './types';
import { INITIAL_SHIFT_REPORTS } from './data/initialReports';
import { CheckCircle2, Factory, HelpCircle, BookOpen, GraduationCap, ArrowRight, Share2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'form' | 'dashboard' | 'history'>('dashboard');
  
  // Reports state initialized from localStorage or initial sample data
  const [reports, setReports] = useState<ShiftReport[]>(() => {
    try {
      const saved = localStorage.getItem('panca_paper_shift_reports');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Normalize legacy shift values if present
          return parsed.map((item: ShiftReport) => {
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

  // Edit mode state
  const [editingReport, setEditingReport] = useState<ShiftReport | null>(null);

  // Modals state
  const [isSopOpen, setIsSopOpen] = useState<boolean>(false);
  const [isTrainingOpen, setIsTrainingOpen] = useState<boolean>(false);
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);
  const [trainingDefaultMachine, setTrainingDefaultMachine] = useState<MachineId>('PM1');

  // Success Notification banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-persist reports to localStorage whenever changed
  useEffect(() => {
    try {
      localStorage.setItem('panca_paper_shift_reports', JSON.stringify(reports));
    } catch (e) {
      console.error('Failed to persist reports to localStorage', e);
    }
  }, [reports]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Save handler (both create and edit)
  const handleSaveReport = (report: ShiftReport, editReason?: string, editorName?: string) => {
    if (editingReport) {
      // Update existing report with audit log
      const auditEntry: EditAuditLog = {
        id: `audit-${Date.now()}`,
        editedAt: new Date().toISOString(),
        editedBy: editorName || 'Petugas Shift',
        reason: editReason || 'Revisi data perbaikan',
        summary: `Revisi tonase ${report.actualProductionTon}T (${report.achievementPercentage}%)`
      };

      const updatedList = reports.map(r => {
        if (r.id === report.id) {
          return {
            ...report,
            editHistory: [auditEntry, ...(r.editHistory || [])],
            updatedAt: new Date().toISOString()
          };
        }
        return r;
      });

      setReports(updatedList);
      setEditingReport(null);
      showToast(`Laporan ${report.machine} - ${report.shift} (${report.date}) berhasil diperbaiki & dicatat dalam riwayat audit!`);
      setActiveTab('history');
    } else {
      // Add new report at the beginning
      setReports([report, ...reports]);
      showToast(`Laporan Shift ${report.machine} berhasil disimpan dan grafik kinerja diperbarui!`);
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

  const handleDeleteReport = (id: string) => {
    setReports(reports.filter(r => r.id !== id));
    showToast('Laporan berhasil dihapus dari sistem.');
  };

  const handleOpenTraining = (machine?: MachineId) => {
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
        onOpenShare={() => setIsShareOpen(true)}
        reportCount={reports.length}
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
            editingReport={editingReport}
            onCancelEdit={handleCancelEdit}
            existingReports={reports}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardCharts
            reports={reports}
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
              onClick={() => handleOpenTraining('PM1')}
              className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Materi Training Operator</span>
            </button>
            <span className="text-slate-600">&bull;</span>
            <button
              onClick={() => setIsShareOpen(true)}
              className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 font-mono"
              title="Buka menu bagikan link bit.ly/laporan-shift-pm-pup"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>bit.ly/laporan-shift-pm-pup</span>
            </button>
            <span className="text-slate-600">&bull;</span>
            <span className="text-slate-500">Sistem Laporan Shift Pabrik Kertas v2.4</span>
          </div>
        </div>
      </footer>

      {/* Slide-over / Modals */}
      <SopModal
        isOpen={isSopOpen}
        onClose={() => setIsSopOpen(false)}
      />

      <TrainingModal
        isOpen={isTrainingOpen}
        onClose={() => setIsTrainingOpen(false)}
        defaultMachine={trainingDefaultMachine}
      />

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        sharedCloudUrl="https://ais-pre-edi5lhzgtwjelot4ig647n-845444139980.asia-east1.run.app"
      />

    </div>
  );
}

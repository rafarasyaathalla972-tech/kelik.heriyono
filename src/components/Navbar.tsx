import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  BarChart3, 
  History, 
  BookOpen, 
  GraduationCap, 
  Clock, 
  Printer, 
  Factory,
  ChevronRight
} from 'lucide-react';
import { ShiftType } from '../types';

interface NavbarProps {
  activeTab: 'form' | 'dashboard' | 'history';
  onTabChange: (tab: 'form' | 'dashboard' | 'history') => void;
  onOpenSop: () => void;
  onOpenTraining: () => void;
  onPrintAll?: () => void;
  reportCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  onOpenSop,
  onOpenTraining,
  reportCount
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentShift, setCurrentShift] = useState<{ shift: ShiftType; timeRange: string }>({
    shift: 'Pagi',
    timeRange: '07:00 - 15:00'
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );

      const hour = now.getHours();
      if (hour >= 7 && hour < 15) {
        setCurrentShift({ shift: 'Pagi', timeRange: '07:00 - 15:00 WIB' });
      } else if (hour >= 15 && hour < 23) {
        setCurrentShift({ shift: 'Siang', timeRange: '15:00 - 23:00 WIB' });
      } else {
        setCurrentShift({ shift: 'Malam', timeRange: '23:00 - 07:00 WIB' });
      }
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-slate-900 border-b border-slate-800 text-white shadow-md">
      {/* Top Banner: Company Info & Live Shift Status */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2.5 border-b border-slate-800/80 gap-2">
          {/* Logo & Company Identity */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-inner shrink-0">
              <Factory className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base sm:text-lg tracking-wide text-white">
                  PT. PANCA USAHATAMA PARAMITA
                </span>
                <span className="hidden md:inline-block text-[11px] bg-blue-900/60 border border-blue-600/40 text-blue-300 font-semibold px-2 py-0.5 rounded">
                  PABRIK KERTAS
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Sistem Laporan Kinerja Shift Harian &bull; Unit Mesin: <span className="text-emerald-400 font-semibold">PM1</span>, <span className="text-cyan-400 font-semibold">PM2</span>, <span className="text-blue-400 font-semibold">PM5</span>
              </p>
            </div>
          </div>

          {/* Live Clock & Shift Badge */}
          <div className="flex items-center justify-between sm:justify-end gap-3 text-xs">
            <div className="flex items-center gap-1.5 bg-slate-800/90 px-2.5 py-1.5 rounded-md border border-slate-700/60 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-mono font-medium">{currentTime}</span>
            </div>

            <div className="flex items-center gap-1.5 bg-emerald-950/70 border border-emerald-700/50 px-2.5 py-1.5 rounded-md text-emerald-300">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold">Shift Berjalan: {currentShift.shift}</span>
              <span className="text-[11px] text-emerald-400/80 hidden lg:inline">({currentShift.timeRange})</span>
            </div>
          </div>
        </div>

        {/* Main Navigation Tabs & Action Shortcuts */}
        <div className="flex flex-wrap items-center justify-between py-2 gap-2">
          {/* Main Module Tabs */}
          <nav className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
            <button
              id="nav-tab-form"
              onClick={() => onTabChange('form')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === 'form'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Input Laporan Shift</span>
            </button>

            <button
              id="nav-tab-dashboard"
              onClick={() => onTabChange('dashboard')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === 'dashboard'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Grafik & Kinerja</span>
            </button>

            <button
              id="nav-tab-history"
              onClick={() => onTabChange('history')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === 'history'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <History className="w-4 h-4" />
              <span>Riwayat Laporan</span>
              <span className="ml-1 px-1.5 py-0.2 text-[11px] bg-slate-700 text-slate-200 rounded-full font-bold">
                {reportCount}
              </span>
            </button>
          </nav>

          {/* Quick Guidance Buttons: Always Accessible */}
          <div className="flex items-center gap-2">
            <button
              id="btn-open-sop-global"
              onClick={onOpenSop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-emerald-700/80 hover:bg-emerald-600 text-emerald-100 border border-emerald-600 transition-colors shadow-sm"
              title="Buka SOP Lengkap 4 Tahap Proses Pabrik Kertas"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-200" />
              <span>SOP Proses (4 Tahap)</span>
            </button>

            <button
              id="btn-open-training-global"
              onClick={onOpenTraining}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-amber-700/80 hover:bg-amber-600 text-amber-100 border border-amber-600 transition-colors shadow-sm"
              title="Materi Pelatihan Kerja PM1, PM2, PM5"
            >
              <GraduationCap className="w-3.5 h-3.5 text-amber-200" />
              <span>Materi Training Mesin</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

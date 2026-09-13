import React, { useState } from 'react';
import { 
  X, 
  Share2, 
  Copy, 
  Check, 
  QrCode, 
  ExternalLink, 
  Send, 
  Smartphone,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Users,
  Database,
  Download,
  Upload
} from 'lucide-react';
import { ShiftReport } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  sharedCloudUrl: string;
  isServerConnected?: boolean;
  reports?: ShiftReport[];
  onImportReports?: (reports: ShiftReport[]) => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  sharedCloudUrl,
  isServerConnected = true,
  reports = [],
  onImportReports
}) => {
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedWaMessage, setCopiedWaMessage] = useState<boolean>(false);
  const [copiedDevWarning, setCopiedDevWarning] = useState<boolean>(false);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  // The official public shareable URL for the team (Cloud Run / AI Studio shared preview)
  const officialTeamUrl = sharedCloudUrl || "https://ais-pre-edi5lhzgtwjelot4ig647n-845444139980.asia-east1.run.app";
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=10&data=${encodeURIComponent(officialTeamUrl)}`;

  const waMessage = `*LAPORAN SHIFT PM - PT. PANCA USAHATAMA PARAMITA*
Sistem Pengisian & Monitoring Kinerja Shift (PM1, PM2, PM5)

Yth. Rekan Tim Kepala Shift & Operator PM,
Silakan buka tautan resmi aplikasi di bawah ini melalui Google Chrome di HP Android atau Laptop:

👉 *${officialTeamUrl}*

Fitur yang tersedia:
✅ Pengisian Form Laporan Shift Real-time
✅ Monitoring Grafik Kinerja & Kualitas Paper (A/B/C/Defect)
✅ Riwayat & Edit Laporan dengan Jejak Audit Otomatis
✅ SOP & Materi Training Operator Pabrik

Terima kasih.`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(officialTeamUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyWa = () => {
    navigator.clipboard.writeText(waMessage);
    setCopiedWaMessage(true);
    setTimeout(() => setCopiedWaMessage(false), 2500);
  };

  const handleOpenWhatsApp = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(waMessage)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleExportJson = () => {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reports, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `laporan-shift-pup-backup-${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (e) {
      console.error('Export failed', e);
    }
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed) && parsed.length > 0) {
          if (onImportReports) {
            onImportReports(parsed);
          }
          setImportSuccess(`Berhasil mengimpor ${parsed.length} laporan shift!`);
          setTimeout(() => setImportSuccess(null), 4000);
        } else {
          alert('File JSON tidak berisi data laporan yang valid.');
        }
      } catch (err) {
        alert('Gagal membaca file JSON. Pastikan format file valid.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="share-modal-container"
        className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col text-white"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-slate-100 flex items-center gap-2">
                <span>Bagikan Akses Tim (PM1, PM2, PM5)</span>
                <span className="text-[10px] bg-emerald-950 border border-emerald-500/50 text-emerald-300 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Database className="w-3 h-3 text-emerald-400" />
                  Database Tim Aktif
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                PT. Panca Usahatama Paramita &bull; Akses Mengisi & Mengedit Bersama
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-5 text-sm">
          
          {/* CRITICAL EXPLANATION: Solusi Notifikasi 'You do not have access to this page' */}
          <div className="bg-amber-950/40 border border-amber-600/60 rounded-2xl p-4 sm:p-5 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-2 flex-1">
                <h4 className="font-bold text-amber-200 text-sm sm:text-base">
                  Penyebab & Solusi Notifikasi: <em>"We're sorry, but you do not have access..."</em>
                </h4>
                <p className="text-xs text-amber-100/90 leading-relaxed">
                  Pesan tersebut muncul karena tautan yang dibagikan sebelumnya adalah <strong>Link Internal Development (ais-dev-...)</strong> yang otomatis dikunci Google khusus untuk email Anda sendiri.
                </p>
                <div className="bg-slate-950/80 rounded-xl p-3 border border-amber-800/40 space-y-2 text-xs">
                  <p className="font-bold text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Langkah 1 Kali Agar Tim Bisa Membuka & Mengedit:
                  </p>
                  <ol className="list-decimal list-inside space-y-1.5 text-slate-200 ml-1">
                    <li>
                      Lihat ke <strong>pojok kanan atas layar Google AI Studio</strong> Anda, lalu klik tombol <strong className="text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">"Share"</strong> (atau Deploy).
                    </li>
                    <li>
                      Pada jendela yang muncul, pastikan pilihan akses diatur ke <strong className="text-emerald-300">"Anyone with the link" (Siapa saja yang memiliki tautan)</strong>.
                    </li>
                    <li>
                      Gunakan <strong>Tautan Resmi Tim</strong> di bawah ini untuk dibagikan ke WhatsApp tim.
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Official Shared Link Box */}
          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/40 border border-emerald-500/50 rounded-2xl p-4 sm:p-5 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Tautan Resmi Tim (Bisa Dibuka di HP & Laptop Tanpa Login Google)
              </span>
              <span className="text-[11px] bg-emerald-900/70 border border-emerald-500/50 text-emerald-200 font-semibold px-2.5 py-0.5 rounded-full">
                Link Publik Resmi
              </span>
            </div>

            {/* URL Box */}
            <div className="bg-slate-950 border border-slate-700 rounded-xl p-3 mb-3 flex items-center gap-2">
              <span className="font-mono text-xs sm:text-sm text-emerald-300 select-all flex-1 truncate font-bold">
                {officialTeamUrl}
              </span>
              <button
                onClick={handleCopyLink}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 ${
                  copiedLink
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                }`}
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Link Tersalin!' : 'Salin Tautan'}</span>
              </button>
            </div>

            {/* Direct WhatsApp Share Button */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                onClick={handleOpenWhatsApp}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Format ke WhatsApp Tim</span>
              </button>
              <a
                href={officialTeamUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl flex items-center justify-center gap-2 border border-slate-700 transition-all text-center"
              >
                <ExternalLink className="w-4 h-4 text-cyan-400" />
                <span>Uji Coba Tautan di Tab Baru</span>
              </a>
            </div>
          </div>

          {/* QR Code & Scan Section */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4">
            <div className="bg-white p-2 rounded-xl shrink-0 shadow-md">
              <img 
                src={qrApiUrl} 
                alt="QR Code Laporan Shift" 
                className="w-32 h-32 object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-1.5 text-center sm:text-left flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-bold text-slate-200">
                <QrCode className="w-4 h-4 text-emerald-400" />
                <span>Scan Langsung dari Kamera HP Operator</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Operator PM1, PM2, atau PM5 cukup mengarahkan kamera HP ke kode QR di samping untuk langsung membuka form input laporan tanpa perlu mengetik alamat link.
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-2 pt-1 text-[11px] text-cyan-300">
                <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                <span>Bisa disimpan ke Layar Utama HP (Add to Home screen)</span>
              </div>
            </div>
          </div>

          {/* Format Pesan WhatsApp Preview */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5 text-emerald-400" />
                Format Pesan WhatsApp (Siap Dibagikan ke Grup):
              </span>
              <button
                onClick={handleCopyWa}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
              >
                {copiedWaMessage ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedWaMessage ? 'Teks Tersalin!' : 'Salin Format Teks'}</span>
              </button>
            </div>
            <pre className="text-[11px] font-sans text-slate-300 bg-slate-900 border border-slate-800 rounded-lg p-3 whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto">
              {waMessage}
            </pre>
          </div>

          {/* Backup & Restore Data (JSON) for Team Safety */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-slate-200">
                  Sinkronisasi & Cadangan File (JSON)
                </span>
              </div>
              <span className="text-[11px] text-slate-400">
                {reports.length} Laporan Tersedia
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Jika diperlukan transfer data manual antar perangkat atau arsip bulanan, Anda dapat mengunduh seluruh data laporan atau memulihkannya kembali dari file cadangan.
            </p>
            {importSuccess && (
              <div className="mb-3 p-2 bg-emerald-950 border border-emerald-500/50 rounded-lg text-xs text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>{importSuccess}</span>
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleExportJson}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 border border-slate-700"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>Unduh File Cadangan (.json)</span>
              </button>

              <label className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 border border-slate-700 cursor-pointer">
                <Upload className="w-3.5 h-3.5 text-emerald-400" />
                <span>Pulihkan dari File (.json)</span>
                <input 
                  type="file" 
                  accept=".json" 
                  onChange={handleFileImport} 
                  className="hidden" 
                />
              </label>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Sistem Terpusat Mesin PM1, PM2, PM5 &bull; PT. PUP
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

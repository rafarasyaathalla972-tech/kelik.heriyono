import React, { useState } from 'react';
import { 
  X, 
  Share2, 
  Copy, 
  Check, 
  QrCode, 
  ExternalLink, 
  Send, 
  HelpCircle,
  Smartphone,
  Globe
} from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  sharedCloudUrl: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  sharedCloudUrl
}) => {
  const bitlyUrl = 'https://bit.ly/laporan-shift-pm-pup';
  const [copiedBitly, setCopiedBitly] = useState<boolean>(false);
  const [copiedCloud, setCopiedCloud] = useState<boolean>(false);
  const [copiedWaMessage, setCopiedWaMessage] = useState<boolean>(false);
  const [activeQrTarget, setActiveQrTarget] = useState<'bitly' | 'cloud'>('bitly');

  if (!isOpen) return null;

  const currentQrUrl = activeQrTarget === 'bitly' ? bitlyUrl : sharedCloudUrl;
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=10&data=${encodeURIComponent(currentQrUrl)}`;

  const waMessage = `Yth. Bapak/Ibu Kepala Shift & Tim Operasional PT. PUP,

Berikut link resmi aplikasi *LAPORAN SHIFT PM, PT. PUP* (Unit PM1, PM2, PM5):
👉 ${bitlyUrl}

Link alternatif Cloud:
👉 ${sharedCloudUrl}

Mohon dapat diakses melalui HP Android atau laptop untuk pengisian laporan pada setiap akhir shift kerja. Terima kasih.`;

  const handleCopyBitly = () => {
    navigator.clipboard.writeText(bitlyUrl);
    setCopiedBitly(true);
    setTimeout(() => setCopiedBitly(false), 2000);
  };

  const handleCopyCloud = () => {
    navigator.clipboard.writeText(sharedCloudUrl);
    setCopiedCloud(true);
    setTimeout(() => setCopiedCloud(false), 2000);
  };

  const handleCopyWa = () => {
    navigator.clipboard.writeText(waMessage);
    setCopiedWaMessage(true);
    setTimeout(() => setCopiedWaMessage(false), 2000);
  };

  const handleOpenWhatsApp = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(waMessage)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="share-modal-container"
        className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col text-white"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-slate-100">
                Bagikan Link Laporan Shift
              </h3>
              <p className="text-xs text-slate-400">
                LAPORAN SHIFT PM, PT. PUP &bull; Mesin PM1, PM2, PM5
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
          {/* Card 1: Custom Bitly Link */}
          <div className="bg-slate-950 border border-blue-500/40 rounded-xl p-4 relative overflow-hidden shadow-inner">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                Tautan Singkat Khusus (Bitly)
              </span>
              <span className="text-[11px] bg-blue-900/60 text-blue-300 font-semibold px-2 py-0.5 rounded border border-blue-700/50">
                Mudah Diketik di HP
              </span>
            </div>

            <div className="flex items-center gap-2 bg-slate-900 border border-slate-700/80 rounded-lg p-2.5">
              <span className="font-mono text-sm sm:text-base font-bold text-amber-400 select-all flex-1 truncate">
                {bitlyUrl}
              </span>
              <button
                onClick={handleCopyBitly}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  copiedBitly
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm'
                }`}
              >
                {copiedBitly ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedBitly ? 'Tersalin!' : 'Salin'}</span>
              </button>
            </div>

            {/* Bitly Setup Note */}
            <div className="mt-3 p-2.5 bg-blue-950/40 border border-blue-800/40 rounded-lg text-xs text-slate-300 flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div className="space-y-1 leading-relaxed">
                <p>
                  <strong>Catatan Penggunaan Bitly:</strong> Agar tautan <code className="text-amber-300 bg-slate-900 px-1 py-0.5 rounded">bit.ly/laporan-shift-pm-pup</code> mengarah ke aplikasi ini, pastikan tautan ini telah dihubungkan ke link Cloud Run asli di akun <a href="https://bitly.com" target="_blank" rel="noreferrer" className="text-blue-300 underline font-semibold">bitly.com</a>.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Link Asli Cloud Run (Selalu Aktif Langsung) */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                Tautan Asli Cloud Run (Langsung Buka Tanpa Redirect)
              </span>
              <span className="text-[10px] bg-emerald-950 border border-emerald-700/60 text-emerald-400 font-semibold px-2 py-0.5 rounded">
                Aktif & Berjalan
              </span>
            </div>

            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg p-2.5">
              <span className="font-mono text-xs text-slate-300 select-all flex-1 truncate">
                {sharedCloudUrl}
              </span>
              <button
                onClick={handleCopyCloud}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  copiedCloud
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                {copiedCloud ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCloud ? 'Tersalin!' : 'Salin'}</span>
              </button>
            </div>
          </div>

          {/* Card 3: WhatsApp Quick Share Button */}
          <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-xl p-4">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Send className="w-3.5 h-3.5" />
              Kirim Pesan Langsung ke Grup WhatsApp Kepala Shift
            </h4>
            <p className="text-xs text-slate-300 mb-3">
              Kirimkan format pengumuman lengkap ke WhatsApp dengan satu kali klik:
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleOpenWhatsApp}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg flex items-center gap-2 transition-all shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>Buka & Kirim via WhatsApp</span>
              </button>
              <button
                onClick={handleCopyWa}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                  copiedWaMessage
                    ? 'bg-emerald-700 text-white border-emerald-600'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                }`}
              >
                {copiedWaMessage ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedWaMessage ? 'Pesan Tersalin!' : 'Salin Teks Pesan'}</span>
              </button>
            </div>
          </div>

          {/* Card 4: QR Code untuk Dicetak di Ruang Operator / Mesin */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4">
            <div className="bg-white p-2.5 rounded-xl border border-slate-200 shrink-0 shadow-md">
              <img 
                src={qrApiUrl} 
                alt="QR Code Laporan Shift" 
                className="w-32 h-32 object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-2 text-center sm:text-left flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-bold text-slate-200">
                <QrCode className="w-4 h-4 text-blue-400" />
                <span>Scan QR Code dari HP Android / iPhone</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Operator dapat langsung mengarahkan kamera HP ke kode QR ini untuk membuka formulir pengisian laporan tanpa perlu mengetik link.
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-[11px]">
                <button
                  type="button"
                  onClick={() => setActiveQrTarget('bitly')}
                  className={`px-2.5 py-1 rounded-md border font-medium ${
                    activeQrTarget === 'bitly'
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  QR Bitly ({bitlyUrl.replace('https://', '')})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveQrTarget('cloud')}
                  className={`px-2.5 py-1 rounded-md border font-medium ${
                    activeQrTarget === 'cloud'
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  QR Link Langsung
                </button>
              </div>
            </div>
          </div>

          {/* Tips Akses Mudah untuk Operator */}
          <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center gap-3 text-xs text-slate-300">
            <Smartphone className="w-5 h-5 text-cyan-400 shrink-0" />
            <span>
              <strong>Tips Operator HP:</strong> Setelah link terbuka di Google Chrome HP, klik menu titik 3 di pojok kanan atas lalu pilih <em>"Tambahkan ke Layar Utama" (Add to Home screen)</em> agar menjadi aplikasi langsung di menu HP.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition-colors"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};

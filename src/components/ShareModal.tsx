import React, { useState, useEffect } from 'react';
import { 
  X, 
  Share2, 
  Copy, 
  Check, 
  QrCode, 
  ExternalLink, 
  Send, 
  Smartphone,
  Info,
  CheckCircle2,
  Sparkles
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
  const [activeUrl, setActiveUrl] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedWaMessage, setCopiedWaMessage] = useState<boolean>(false);
  const [canNativeShare, setCanNativeShare] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Get the exact running URL of the current instance
      const currentUrl = window.location.href;
      setActiveUrl(currentUrl);
      if (typeof navigator !== 'undefined' && 'share' in navigator) {
        setCanNativeShare(true);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const finalUrl = activeUrl || sharedCloudUrl;
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=10&data=${encodeURIComponent(finalUrl)}`;

  const waMessage = `Yth. Bapak/Ibu Kepala Shift & Operator PM PT. PUP,

Berikut link resmi aplikasi *LAPORAN SHIFT PM, PT. PUP* (Unit PM1, PM2, PM5):
👉 ${finalUrl}

Silakan buka link di atas melalui Google Chrome pada HP Android atau laptop untuk pengisian laporan shift kerja. Terima kasih.`;

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'LAPORAN SHIFT PM, PT. PUP',
          text: 'Sistem Laporan Kinerja Shift Pabrik Kertas PT. Panca Usahatama Paramita:\n' + finalUrl,
          url: finalUrl,
        });
      } catch (e) {
        // User cancelled or share failed, fallback to copy
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(finalUrl);
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="share-modal-container"
        className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col text-white"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-slate-100 flex items-center gap-2">
                <span>Bagikan Link Aplikasi</span>
                <span className="text-[10px] bg-emerald-950 border border-emerald-500/50 text-emerald-300 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  Otomatis Aktif
                </span>
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
          {/* Main Action: 1-Click Share Button for Mobile & Desktop */}
          <div className="bg-gradient-to-br from-blue-950/80 via-slate-900 to-emerald-950/50 border border-blue-500/50 rounded-2xl p-4 sm:p-5 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Tautan Resmi Aktif (Langsung Dibuka)
              </span>
              <span className="text-[11px] bg-blue-900/60 text-blue-200 font-semibold px-2 py-0.5 rounded">
                100% Siap Digunakan
              </span>
            </div>

            {/* URL Display */}
            <div className="bg-slate-950 border border-slate-700/90 rounded-xl p-3 mb-3 flex items-center gap-2">
              <span className="font-mono text-xs sm:text-sm text-emerald-300 select-all flex-1 truncate font-semibold">
                {finalUrl}
              </span>
              <button
                onClick={handleCopyLink}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 ${
                  copiedLink
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md'
                }`}
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Link Tersalin!' : 'Salin Link'}</span>
              </button>
            </div>

            {/* Action Buttons: Native Share + WhatsApp */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {canNativeShare && (
                <button
                  onClick={handleNativeShare}
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Kirim ke Kontak / Aplikasi HP</span>
                </button>
              )}
              <button
                onClick={handleOpenWhatsApp}
                className={`w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-all ${
                  !canNativeShare ? 'sm:col-span-2' : ''
                }`}
              >
                <Send className="w-4 h-4" />
                <span>Kirim Format ke WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Quick WhatsApp Format Copy */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5 text-emerald-400" />
                Format Pesan WhatsApp (Siap Kirim ke Grup Kepala Shift):
              </span>
              <button
                onClick={handleCopyWa}
                className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
              >
                {copiedWaMessage ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedWaMessage ? 'Teks Tersalin!' : 'Salin Teks'}</span>
              </button>
            </div>
            <pre className="text-[11px] font-sans text-slate-300 bg-slate-900 border border-slate-800/80 rounded-lg p-3 whitespace-pre-wrap leading-relaxed">
              {waMessage}
            </pre>
          </div>

          {/* QR Code Section */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4">
            <div className="bg-white p-2 rounded-xl shrink-0 shadow-md">
              <img 
                src={qrApiUrl} 
                alt="QR Code Laporan Shift" 
                className="w-28 h-28 object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-1.5 text-center sm:text-left flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-bold text-slate-200">
                <QrCode className="w-4 h-4 text-emerald-400" />
                <span>Scan Langsung dari HP Operator</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Arahkan kamera HP ke kode QR di atas untuk langsung membuka formulir pengisian laporan tanpa perlu mengetik link.
              </p>
              <div className="pt-1">
                <a
                  href={finalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:underline font-semibold"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Uji Coba Buka di Tab Baru Sekarang</span>
                </a>
              </div>
            </div>
          </div>

          {/* Important AI Studio Sharing Note to prevent 404 */}
          <div className="p-3.5 bg-amber-950/30 border border-amber-800/40 rounded-xl text-xs text-amber-200/90 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1 leading-relaxed">
              <p className="font-bold text-amber-300">
                Catatan Penting Agar Link Dapat Dibuka Semua Orang (Tanpa Error 404):
              </p>
              <p>
                Agar siapapun rekan kerja Anda di luar dapat membuka link ini dari HP mereka masing-masing, pastikan Anda telah menekan tombol <strong>"Share" (Bagikan)</strong> yang ada di <strong>bilah menu kanan atas Google AI Studio</strong>. Fitur tersebut akan membuat aplikasi aktif untuk publik secara permanen.
              </p>
            </div>
          </div>

          {/* Tips Android Shortcut */}
          <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center gap-3 text-xs text-slate-300">
            <Smartphone className="w-5 h-5 text-cyan-400 shrink-0" />
            <span>
              <strong>Tips Tambah ke Menu HP:</strong> Setelah link terbuka di Google Chrome HP operator, klik menu titik 3 di pojok kanan atas &rarr; pilih <em>"Tambahkan ke Layar Utama" (Add to Home screen)</em> agar menjadi seperti aplikasi Android langsung.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            PT. Panca Usahatama Paramita
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

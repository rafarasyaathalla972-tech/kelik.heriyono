import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  X, 
  Presentation, 
  Download, 
  Copy, 
  Check, 
  Edit3, 
  Maximize2, 
  Minimize2, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Save, 
  Search, 
  BookOpen, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  Plus, 
  Trash2,
  FileSpreadsheet,
  ZoomIn,
  Eye,
  Info
} from 'lucide-react';
import { 
  PresentationSlide, 
  INITIAL_PRESENTATION_SLIDES, 
  PRESENTATION_METADATA
} from '../data/presentationDeckData';
import { exportPresentationToPptx } from '../utils/pptxExport';

interface PresentationDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSlideIndex?: number;
}

export const PresentationDeckModal: React.FC<PresentationDeckModalProps> = ({
  isOpen,
  onClose,
  initialSlideIndex = 0
}) => {
  // Slides state with localStorage persistence for user edits
  const [slides, setSlides] = useState<PresentationSlide[]>(() => {
    try {
      const saved = localStorage.getItem('pup_presentation_custom_slides_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === INITIAL_PRESENTATION_SLIDES.length) {
          // Merge images to ensure product and machine photos are always up-to-date
          return parsed.map((s, idx) => ({
            ...s,
            imageSrc: INITIAL_PRESENTATION_SLIDES[idx]?.imageSrc,
            imageCaption: INITIAL_PRESENTATION_SLIDES[idx]?.imageCaption
          }));
        }
      }
    } catch (e) {
      console.warn('Error loading custom slides', e);
    }
    return INITIAL_PRESENTATION_SLIDES;
  });

  const [currentSlideIdx, setCurrentSlideIdx] = useState<number>(initialSlideIndex);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // UI States
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showThumbnails, setShowThumbnails] = useState<boolean>(true);
  const [showNotes, setShowNotes] = useState<boolean>(true);
  const [showSalesTips, setShowSalesTips] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isExportingPptx, setIsExportingPptx] = useState<boolean>(false);
  const [exportProgress, setExportProgress] = useState<{ percent: number; label: string }>({
    percent: 0,
    label: ''
  });

  // Image Lightbox Preview
  const [previewImage, setPreviewImage] = useState<{ src: string; title: string; caption?: string } | null>(null);

  // Editing state
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>('');
  const [editSubtitle, setEditSubtitle] = useState<string>('');
  const [editKeyPoints, setEditKeyPoints] = useState<string[]>([]);
  const [editNotes, setEditNotes] = useState<string>('');
  const [editSalesTips, setEditSalesTips] = useState<string>('');
  const [confirmResetOpen, setConfirmResetOpen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const currentSlide = slides[currentSlideIdx] || slides[0];

  // Helper to show temporary notification toast
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Sync edit buffer whenever current slide changes
  useEffect(() => {
    if (currentSlide) {
      setEditTitle(currentSlide.title || '');
      setEditSubtitle(currentSlide.subtitle || '');
      setEditKeyPoints([...currentSlide.keyPoints]);
      setEditNotes(currentSlide.speakerNotes || '');
      setEditSalesTips(currentSlide.salesSpgTips || '');
    }
  }, [currentSlideIdx, currentSlide]);

  // Keyboard navigation for presentation mode
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is actively typing in an input/textarea
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        setCurrentSlideIdx((prev) => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        setCurrentSlideIdx((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Home') {
        e.preventDefault();
        setCurrentSlideIdx(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setCurrentSlideIdx(slides.length - 1);
      } else if (e.key === 'Escape') {
        if (previewImage) {
          setPreviewImage(null);
        } else if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, slides.length, isFullscreen, previewImage, onClose]);

  // Copy current slide text
  const handleCopyCurrentSlide = () => {
    const s = currentSlide;
    let text = `=================================================\n`;
    text += `SLIDE ${s.slideNumber}: ${s.title}\n`;
    text += `${s.subtitle}\n`;
    text += `Kategori: ${s.categoryLabel}\n`;
    text += `=================================================\n\n`;
    text += `POIN UTAMA:\n`;
    s.keyPoints.forEach((kp, idx) => {
      text += `${idx + 1}. ${kp}\n`;
    });
    text += `\nPENJELASAN:\n${s.explanation}\n`;
    if (s.salesSpgTips) {
      text += `\nPANDUAN KHUSUS SALES & SPG:\n${s.salesSpgTips}\n`;
    }
    if (s.speakerNotes) {
      text += `\nCATATAN PEMBICARA:\n${s.speakerNotes}\n`;
    }
    if (s.tableData) {
      text += `\nTABEL DATA:\n${s.tableData.headers.join(' | ')}\n`;
      s.tableData.rows.forEach(r => {
        text += `${r.join(' | ')}\n`;
      });
    }

    navigator.clipboard.writeText(text);
    setIsCopied(true);
    triggerToast(`Slide ${s.slideNumber} berhasil disalin ke clipboard!`);
    setTimeout(() => setIsCopied(false), 2500);
  };

  // Copy entire presentation
  const handleCopyAllSlides = () => {
    let full = `=================================================================\n`;
    full += `${PRESENTATION_METADATA.title}\n`;
    full += `${PRESENTATION_METADATA.companyName} • Disusun oleh: ${PRESENTATION_METADATA.authorRole}\n`;
    full += `Versi: ${PRESENTATION_METADATA.revision} • Total Slide: ${slides.length}\n`;
    full += `=================================================================\n\n`;

    slides.forEach((s) => {
      full += `-----------------------------------------------------------------\n`;
      full += `SLIDE ${s.slideNumber} / ${slides.length} [${s.categoryLabel}]\n`;
      full += `JUDUL: ${s.title}\n`;
      full += `SUBJUDUL: ${s.subtitle}\n`;
      full += `-----------------------------------------------------------------\n`;
      s.keyPoints.forEach((kp) => {
        full += `• ${kp}\n`;
      });
      if (s.salesSpgTips) {
        full += `\n[TIPS SALES & SPG]: ${s.salesSpgTips}\n`;
      }
      if (s.tableData) {
        full += `\n[TABEL DATA]:\n${s.tableData.headers.join(' | ')}\n`;
        s.tableData.rows.forEach(r => {
          full += `${r.join(' | ')}\n`;
        });
      }
      full += `\n\n`;
    });

    navigator.clipboard.writeText(full);
    triggerToast(`Seluruh naskah presentasi (${slides.length} slide lengkap) berhasil disalin ke clipboard!`);
  };

  // Save edits to local state & localStorage
  const handleSaveEdits = () => {
    const updated = slides.map((s, idx) => {
      if (idx === currentSlideIdx) {
        return {
          ...s,
          title: editTitle,
          subtitle: editSubtitle,
          keyPoints: editKeyPoints.filter(p => p.trim() !== ''),
          speakerNotes: editNotes,
          salesSpgTips: editSalesTips
        };
      }
      return s;
    });

    setSlides(updated);
    try {
      localStorage.setItem('pup_presentation_custom_slides_v3', JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
    setIsEditing(false);
    triggerToast(`Perubahan pada Slide ${currentSlide.slideNumber} berhasil disimpan!`);
  };

  // Reset to original factory defaults
  const handleResetToDefault = () => {
    setSlides(INITIAL_PRESENTATION_SLIDES);
    try {
      localStorage.removeItem('pup_presentation_custom_slides');
      localStorage.removeItem('pup_presentation_custom_slides_v2');
      localStorage.removeItem('pup_presentation_custom_slides_v3');
    } catch (e) {
      console.warn(e);
    }
    setIsEditing(false);
    setConfirmResetOpen(false);
    triggerToast('Materi presentasi berhasil dikembalikan ke standar resmi pabrik!');
  };

  // Export to genuine Microsoft PowerPoint (.pptx)
  const handleExportPptx = async () => {
    setIsExportingPptx(true);
    try {
      await exportPresentationToPptx(slides, (percent, label) => {
        setExportProgress({ percent, label });
      });
      triggerToast('File PowerPoint (.pptx) berhasil diunduh ke perangkat Anda!');
    } catch (err) {
      console.error('Gagal mengekspor file PowerPoint', err);
      triggerToast('Terjadi kendala saat menyusun PowerPoint. Silakan coba kembali.');
    } finally {
      setIsExportingPptx(false);
    }
  };

  // Filtered slides for thumbnail list
  const filteredSlideIndexes = useMemo(() => {
    return slides
      .map((s, idx) => ({ s, idx }))
      .filter(({ s }) => {
        if (selectedCategory !== 'ALL' && s.category !== selectedCategory) {
          return false;
        }
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          s.title.toLowerCase().includes(q) ||
          s.subtitle.toLowerCase().includes(q) ||
          s.categoryLabel.toLowerCase().includes(q) ||
          s.keyPoints.some(k => k.toLowerCase().includes(q)) ||
          (s.salesSpgTips && s.salesSpgTips.toLowerCase().includes(q))
        );
      })
      .map(({ idx }) => idx);
  }, [slides, selectedCategory, searchQuery]);

  if (!isOpen) return null;

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 z-50 overflow-hidden bg-slate-950/95 backdrop-blur-md flex flex-col text-slate-100 ${
        isFullscreen ? 'p-0' : 'p-2 sm:p-4'
      }`}
    >
      <div className={`w-full h-full flex flex-col bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden relative ${
        isFullscreen ? 'rounded-none' : 'rounded-2xl'
      }`}>
        
        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-xl shadow-2xl flex items-center gap-2 border border-emerald-400/40 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top Control Bar */}
        <header className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-rose-600 flex items-center justify-center text-white shadow-md">
              <Presentation className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-sm sm:text-base text-white tracking-wide">
                  MATERI PRESENTASI COMPANY PROFILE & TRAINING PT. PUP
                </h1>
                <span className="hidden md:inline-flex text-[10px] bg-amber-950 border border-amber-600/60 text-amber-300 font-bold px-2 py-0.5 rounded-full">
                  Disusun oleh: Kelik Heriyono (Kepala Pabrik)
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Format Widescreen 16:9 • Lengkap dengan Foto Contoh Produk & Mesin Pabrik • Ekspor .PPTX Siap Diedit
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center flex-wrap gap-2">
            {/* Download PPTX Button */}
            <button
              onClick={handleExportPptx}
              disabled={isExportingPptx}
              className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 shadow-md hover:shadow-orange-500/20 disabled:opacity-50"
              title="Unduh File Resmi Microsoft PowerPoint (.pptx) dengan seluruh foto tersemat"
            >
              <Download className={`w-3.5 h-3.5 ${isExportingPptx ? 'animate-bounce' : ''}`} />
              <span>{isExportingPptx ? `Menyusun PPTX (${exportProgress.percent}%)` : 'Unduh PowerPoint (.pptx)'}</span>
            </button>

            {/* Copy Current Slide Button */}
            <button
              onClick={handleCopyCurrentSlide}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 border border-slate-700"
              title="Salin Teks Slide Ini ke Clipboard"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden sm:inline">Salin Slide</span>
                </>
              )}
            </button>

            {/* Copy All Slides Script */}
            <button
              onClick={handleCopyAllSlides}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 border border-slate-700"
              title="Salin Seluruh Naskah 31 Slide Lengkap"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">Salin Semua (Full)</span>
            </button>

            {/* Quick Edit Toggle */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 border ${
                isEditing 
                  ? 'bg-blue-600 text-white border-blue-500' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
              title="Edit Teks Slide Ini Langsung"
            >
              <Edit3 className="w-3.5 h-3.5 text-blue-400" />
              <span>{isEditing ? 'Tutup Editor' : 'Edit Slide'}</span>
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors border border-slate-700"
              title={isFullscreen ? 'Keluar Layar Penuh' : 'Mode Layar Penuh'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Tutup Presentasi"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Category Navigation Pills */}
        <div className="px-4 py-2 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between gap-3 overflow-x-auto shrink-0 text-xs">
          <div className="flex items-center gap-1.5">
            {[
              { id: 'ALL', label: `Semua Slide (${slides.length})` },
              { id: 'PROFILE', label: '1. Profil & Visi Pabrik' },
              { id: 'K3_5R', label: '2. K3 & Budaya 5R' },
              { id: 'MANUFACTURING', label: '3. Alur Produksi' },
              { id: 'MACHINES', label: '4. Mesin & Foto Nyata' },
              { id: 'PRODUCTS_SALES', label: '5. Contoh Produk Kami (Trendy, Softo, Toilet, MG)' },
              { id: 'SPECS_DATA', label: '6. Master Data Spek 43 Item (PM1, PM2, PM5)' },
              { id: 'QUALITY_MANAGEMENT', label: '7. Keunggulan & Mutu ISO' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  const firstOfCat = slides.findIndex(s => cat.id === 'ALL' || s.category === cat.id);
                  if (firstOfCat !== -1) setCurrentSlideIdx(firstOfCat);
                }}
                className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white font-bold shadow'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari produk / slide..."
                className="pl-8 pr-2.5 py-1 bg-slate-900 border border-slate-700 rounded-md text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 w-36 sm:w-44"
              />
            </div>

            <button
              onClick={() => setShowThumbnails(!showThumbnails)}
              className={`p-1 text-xs rounded border transition-colors ${
                showThumbnails ? 'bg-slate-700 text-blue-300 border-blue-500' : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
              title="Tampilkan / Sembunyikan Panel Thumbnail"
            >
              <Layers className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Main Presentation Stage & Editor Container */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Left / Center Slide Presentation Stage */}
          <div className="flex-1 flex flex-col overflow-y-auto bg-slate-950/60 p-3 sm:p-6 items-center justify-between">
            
            {/* The 16:9 Widescreen Presentation Slide Card */}
            <div className="w-full max-w-5xl bg-white text-slate-900 rounded-xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col aspect-[16/9.5] min-h-[480px] relative transition-all">
              
              {/* Slide Header Ribbon (Dark Navy Corporate) */}
              <div className="bg-slate-900 text-white px-5 py-3 border-b-2 border-sky-500 flex items-center justify-between shrink-0">
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-sky-400 bg-sky-950 px-2 py-0.5 rounded border border-sky-600/40">
                      PT. PANCA USAHATAMA PARAMITA
                    </span>
                    <span className="text-[10px] font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-600/40">
                      {currentSlide.badge || currentSlide.categoryLabel}
                    </span>
                  </div>
                  <h2 className="text-base sm:text-xl font-black text-white mt-1 tracking-tight leading-snug">
                    {currentSlide.title}
                  </h2>
                  <p className="text-[11px] sm:text-xs text-slate-300 italic mt-0.5">
                    {currentSlide.subtitle}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs sm:text-sm font-black text-amber-400 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                    SLIDE {currentSlide.slideNumber} / {slides.length}
                  </span>
                </div>
              </div>

              {/* Slide Body Content */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto flex flex-col justify-between bg-gradient-to-b from-slate-50 to-white text-slate-800">
                
                {/* Mode: Slide Has Real Industrial / Product Image */}
                {currentSlide.imageSrc ? (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch h-full">
                    {/* Left: Bullets & Explanations */}
                    <div className="md:col-span-6 flex flex-col justify-between space-y-3">
                      <div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                          <span>Poin Utama & Spesifikasi Teknis</span>
                        </h4>
                        <ul className="space-y-2">
                          {currentSlide.keyPoints.map((point, pIdx) => (
                            <li key={pIdx} className="text-xs sm:text-[13px] text-slate-700 flex items-start gap-2 leading-relaxed">
                              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Inline specs table if available */}
                        {currentSlide.tableData && (
                          <div className="mt-3 overflow-hidden rounded-md border border-slate-200">
                            <table className="w-full text-[11px] text-left">
                              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                                <tr>
                                  {currentSlide.tableData.headers.map((h, hIdx) => (
                                    <th key={hIdx} className="p-1.5">{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {currentSlide.tableData.rows.slice(0, 3).map((r, rIdx) => (
                                  <tr key={rIdx} className="hover:bg-slate-50">
                                    {r.map((c, cIdx) => (
                                      <td key={cIdx} className="p-1.5 text-slate-700">{c}</td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>

                      {currentSlide.salesSpgTips && (
                        <div className="bg-amber-50 border-l-4 border-amber-500 p-2.5 rounded-r-lg text-xs text-amber-950 mt-auto">
                          <p className="font-bold text-[11px] text-amber-800 uppercase tracking-wide flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                            <span>PANDUAN KHUSUS SALES & SPG:</span>
                          </p>
                          <p className="mt-0.5 text-amber-900 leading-snug">{currentSlide.salesSpgTips}</p>
                        </div>
                      )}
                    </div>

                    {/* Right: Embedded Real Photo with Lightbox Zoom */}
                    <div className="md:col-span-6 flex flex-col items-center justify-center bg-slate-900 rounded-xl p-2.5 border border-slate-700 shadow-inner">
                      <div 
                        onClick={() => setPreviewImage({
                          src: currentSlide.imageSrc!,
                          title: currentSlide.title,
                          caption: currentSlide.imageCaption
                        })}
                        className="w-full h-56 sm:h-64 rounded-lg overflow-hidden relative group bg-black cursor-pointer"
                        title="Klik untuk memperbesar gambar"
                      >
                        <img 
                          src={currentSlide.imageSrc} 
                          alt={currentSlide.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded border border-white/20">
                          {currentSlide.category === 'PRODUCTS_SALES' 
                            ? 'CONTOH PRODUK KAMI (PT. PUP)' 
                            : currentSlide.category === 'MACHINES' 
                              ? 'FOTO NYATA MESIN PABRIK PT. PUP' 
                              : 'FASILITAS PABRIK PT. PUP'}
                        </div>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 text-white text-xs font-bold">
                          <ZoomIn className="w-4 h-4" />
                          <span>Klik untuk Memperbesar</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-300 italic text-center mt-2 px-2 leading-snug">
                        {currentSlide.imageCaption || 'Dokumentasi Resmi Mesin & Contoh Produk PT. PUP'}
                      </p>
                    </div>
                  </div>
                ) : currentSlide.tableData ? (
                  /* Mode: Slide Has Structured Specifications Table */
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                        <span>Ringkasan Parameter & Standar Kualitas</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                        {currentSlide.keyPoints.slice(0, 4).map((pt, pIdx) => (
                          <div key={pIdx} className="bg-slate-100 p-2 rounded text-xs text-slate-700 flex items-start gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Rich Table */}
                    <div className="overflow-x-auto rounded-lg border border-slate-300 shadow-sm">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-900 text-white">
                            {currentSlide.tableData.headers.map((h, hIdx) => (
                              <th key={hIdx} className="p-2 sm:p-2.5 font-bold border-b border-slate-700">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {currentSlide.tableData.rows.map((row, rIdx) => (
                            <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="p-2 border-b border-slate-200 text-slate-800 font-medium">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {currentSlide.salesSpgTips && (
                      <div className="bg-blue-50 border border-blue-200 p-2.5 rounded-lg text-xs text-blue-950 flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-blue-900 font-bold">Catatan Penjualan untuk SPG:</strong> {currentSlide.salesSpgTips}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Mode: Text Presentation Layout with Feature Callout */
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full items-stretch">
                    {/* Left: Key Bullet Points */}
                    <div className="md:col-span-7 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                          <span>Poin Panduan Utama Insan PT. PUP</span>
                        </h4>
                        <ul className="space-y-2.5">
                          {currentSlide.keyPoints.map((point, pIdx) => (
                            <li key={pIdx} className="text-xs sm:text-sm text-slate-800 flex items-start gap-2.5 leading-relaxed">
                              <span className="h-2 w-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {currentSlide.salesSpgTips && (
                        <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-lg text-xs text-amber-950 mt-4">
                          <p className="font-bold text-xs text-amber-800 uppercase tracking-wide flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-amber-600" />
                            <span>PANDUAN KHUSUS SALES & SPG:</span>
                          </p>
                          <p className="mt-1 text-amber-900 leading-relaxed">{currentSlide.salesSpgTips}</p>
                        </div>
                      )}
                    </div>

                    {/* Right: Explanatory Card / Highlight Callout */}
                    <div className="md:col-span-5 flex flex-col justify-between space-y-4">
                      {currentSlide.highlightBox ? (
                        <div className={`p-4 rounded-xl border flex flex-col justify-between shadow-sm ${
                          currentSlide.highlightBox.theme === 'amber'
                            ? 'bg-amber-50 border-amber-300 text-amber-950'
                            : currentSlide.highlightBox.theme === 'emerald'
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                              : currentSlide.highlightBox.theme === 'rose'
                                ? 'bg-rose-50 border-rose-300 text-rose-950'
                                : 'bg-blue-50 border-blue-300 text-blue-950'
                        }`}>
                          <div>
                            <h5 className="font-extrabold text-sm mb-2 flex items-center gap-1.5">
                              <Info className="w-4 h-4" />
                              <span>{currentSlide.highlightBox.title}</span>
                            </h5>
                            <p className="text-xs leading-relaxed whitespace-pre-line">
                              {currentSlide.highlightBox.text}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 rounded-xl bg-slate-100 border border-slate-300 text-slate-800">
                          <h5 className="font-bold text-xs text-slate-600 uppercase mb-2">Penjelasan Mendalam</h5>
                          <p className="text-xs leading-relaxed">{currentSlide.explanation}</p>
                        </div>
                      )}

                      <div className="p-3 bg-slate-900 text-slate-200 rounded-xl text-xs border border-slate-700">
                        <strong className="text-sky-400 block mb-1">Standar Otorisasi:</strong>
                        <span>Disahkan oleh Kelik Heriyono (Kepala Pabrik) sebagai materi kurikulum orientasi resmi.</span>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Slide Bottom Bar */}
              <div className="px-5 py-2.5 bg-slate-100 border-t border-slate-200 text-slate-600 flex items-center justify-between text-xs shrink-0">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-slate-700">
                    PT. PANCA USAHATAMA PARAMITA (PT. PUP)
                  </span>
                  <span className="hidden sm:inline text-slate-400">•</span>
                  <span className="hidden sm:inline text-slate-500">
                    Disusun oleh: Kelik Heriyono (Kepala Pabrik)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-500 font-mono">
                    {PRESENTATION_METADATA.revision}
                  </span>
                </div>
              </div>

            </div>

            {/* Slide Navigation Controls */}
            <div className="w-full max-w-5xl flex items-center justify-between mt-3 px-2 text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentSlideIdx(prev => Math.max(prev - 1, 0))}
                  disabled={currentSlideIdx === 0}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors flex items-center gap-1 disabled:opacity-30 disabled:pointer-events-none"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Sebelumnya</span>
                </button>

                <button
                  onClick={() => setCurrentSlideIdx(prev => Math.min(prev + 1, slides.length - 1))}
                  disabled={currentSlideIdx === slides.length - 1}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors flex items-center gap-1 disabled:opacity-30 disabled:pointer-events-none shadow"
                >
                  <span>Berikutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <span className="text-slate-400 text-xs ml-2">
                  Navigasi Keyboard: Gunakan <strong>Panah Kiri / Kanan</strong> atau <strong>Spasi</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowNotes(!showNotes)}
                  className={`px-2.5 py-1 rounded text-xs transition-colors flex items-center gap-1 ${
                    showNotes ? 'bg-amber-950 text-amber-300 border border-amber-700' : 'bg-slate-800 text-slate-400'
                  }`}
                  title="Lihat Catatan Presenter"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Speaker Notes</span>
                </button>

                <button
                  onClick={() => setShowSalesTips(!showSalesTips)}
                  className={`px-2.5 py-1 rounded text-xs transition-colors flex items-center gap-1 ${
                    showSalesTips ? 'bg-sky-950 text-sky-300 border border-sky-700' : 'bg-slate-800 text-slate-400'
                  }`}
                  title="Lihat Tips Sales/SPG"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Tips Sales/SPG</span>
                </button>
              </div>
            </div>

            {/* Expandable Speaker Notes Accordion */}
            {showNotes && (
              <div className="w-full max-w-5xl mt-3 bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-300">
                <div className="flex items-center justify-between font-bold mb-1">
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Catatan Presenter / Penjelasan Lengkap (Speaker Notes):</span>
                  </span>
                  <span className="text-[10px] text-slate-500">Tersedia di PowerPoint Presenter View</span>
                </div>
                <p className="text-slate-300 leading-relaxed">{currentSlide.speakerNotes}</p>
                {currentSlide.explanation && (
                  <p className="text-slate-400 text-[11px] mt-1 italic border-t border-slate-800/80 pt-1">
                    Uraian detail: {currentSlide.explanation}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Right Slide Drawer: Quick Editor OR Slide Thumbnails */}
          {isEditing ? (
            <div className="w-80 sm:w-96 bg-slate-900 border-l border-slate-800 flex flex-col shrink-0 overflow-y-auto p-4 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-blue-400" />
                  <span>Edit Slide {currentSlide.slideNumber}</span>
                </h3>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Title Input */}
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">Judul Slide</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Subtitle Input */}
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">Subjudul</label>
                <input
                  type="text"
                  value={editSubtitle}
                  onChange={(e) => setEditSubtitle(e.target.value)}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Key Points */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-400">Poin Pelatihan (Bullets)</label>
                  <button
                    onClick={() => setEditKeyPoints([...editKeyPoints, ''])}
                    className="text-[10px] text-blue-400 hover:text-blue-300 font-bold flex items-center gap-0.5"
                  >
                    <Plus className="w-3 h-3" /> Tambah Poin
                  </button>
                </div>
                <div className="space-y-2">
                  {editKeyPoints.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-1.5">
                      <textarea
                        rows={2}
                        value={pt}
                        onChange={(e) => {
                          const updated = [...editKeyPoints];
                          updated[pIdx] = e.target.value;
                          setEditKeyPoints(updated);
                        }}
                        className="flex-1 p-1.5 bg-slate-950 border border-slate-700 rounded text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                      />
                      <button
                        onClick={() => {
                          setEditKeyPoints(editKeyPoints.filter((_, idx) => idx !== pIdx));
                        }}
                        className="p-1 text-rose-400 hover:text-rose-300"
                        title="Hapus baris"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sales Tips */}
              <div>
                <label className="text-xs font-bold text-amber-400 block mb-1">Panduan Khusus Sales & SPG</label>
                <textarea
                  rows={3}
                  value={editSalesTips}
                  onChange={(e) => setEditSalesTips(e.target.value)}
                  placeholder="Instruksi cara bicara SPG kepada konsumen..."
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-xs text-amber-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Speaker Notes */}
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">Catatan Pembicara</label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Save & Reset Actions */}
              <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
                <button
                  onClick={handleSaveEdits}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan Perubahan Slide</span>
                </button>

                {confirmResetOpen ? (
                  <div className="p-2 bg-rose-950/80 border border-rose-600 rounded-lg text-xs space-y-1.5">
                    <p className="text-rose-200 font-bold">Kembalikan materi ke standar resmi pabrik?</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleResetToDefault}
                        className="px-2 py-1 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded text-[11px]"
                      >
                        Ya, Reset Sekarang
                      </button>
                      <button
                        onClick={() => setConfirmResetOpen(false)}
                        className="px-2 py-1 bg-slate-800 text-slate-300 rounded text-[11px]"
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmResetOpen(true)}
                    className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-400 text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 border border-slate-700"
                    title="Kembalikan ke Teks Standar Original"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Kembalikan ke Standar Resmi (Reset)</span>
                  </button>
                )}
              </div>
            </div>
          ) : showThumbnails ? (
            /* Thumbnails Drawer with Mini Photo Previews */
            <aside className="w-64 sm:w-80 bg-slate-900 border-l border-slate-800 flex flex-col shrink-0 overflow-y-auto">
              <div className="p-3 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-blue-400" />
                  <span>Daftar Slide ({filteredSlideIndexes.length})</span>
                </span>
                <span className="text-[10px] text-slate-500">Klik untuk lompat</span>
              </div>

              <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {filteredSlideIndexes.map((idx) => {
                  const s = slides[idx];
                  const isCurrent = idx === currentSlideIdx;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setCurrentSlideIdx(idx)}
                      className={`w-full text-left p-2 rounded-lg border transition-all flex items-start gap-2.5 ${
                        isCurrent
                          ? 'bg-blue-950/80 border-blue-500 text-white ring-1 ring-blue-400 shadow-md'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {/* Mini thumbnail if image available, or number badge */}
                      {s.imageSrc ? (
                        <div className="w-12 h-9 rounded overflow-hidden shrink-0 bg-black border border-slate-700 relative">
                          <img src={s.imageSrc} alt="" className="w-full h-full object-cover" />
                          <span className="absolute bottom-0 right-0 bg-black/80 text-[8px] font-bold px-1 text-amber-300">
                            #{s.slideNumber}
                          </span>
                        </div>
                      ) : (
                        <span className={`h-7 w-7 rounded flex items-center justify-center font-bold text-xs shrink-0 ${
                          isCurrent ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {s.slideNumber}
                        </span>
                      )}

                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold truncate text-slate-200">
                          {s.title}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate mt-0.5">
                          {s.subtitle}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="text-[9px] bg-slate-800 px-1.5 py-0.2 rounded text-slate-400">
                            {s.categoryLabel}
                          </span>
                          {s.imageSrc && (
                            <span className="text-[9px] bg-emerald-950 text-emerald-400 px-1 rounded font-bold border border-emerald-700/50">
                              {s.category === 'PRODUCTS_SALES' ? 'Produk' : 'Foto'}
                            </span>
                          )}
                          {s.tableData && (
                            <span className="text-[9px] bg-cyan-950 text-cyan-400 px-1 rounded font-bold">
                              Tabel
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </aside>
          ) : null}
        </div>

        {/* High-Resolution Image Lightbox Modal */}
        {previewImage && (
          <div 
            onClick={() => setPreviewImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 cursor-pointer"
          >
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="max-w-4xl w-full bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-sm">{previewImage.title}</span>
                </div>
                <button 
                  onClick={() => setPreviewImage(null)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="w-full max-h-[70vh] bg-black flex items-center justify-center p-2">
                <img 
                  src={previewImage.src} 
                  alt={previewImage.title} 
                  className="max-w-full max-h-[68vh] object-contain rounded"
                />
              </div>

              {previewImage.caption && (
                <div className="p-3 bg-slate-950 border-t border-slate-800 text-xs text-slate-300 italic text-center">
                  {previewImage.caption}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

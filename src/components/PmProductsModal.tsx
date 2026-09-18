import React, { useState, useMemo } from 'react';
import { 
  X, 
  Search, 
  Layers, 
  Printer, 
  Check, 
  Cpu, 
  FileText,
  Info,
  Sliders,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { MachineId, PmJumboRollProduct } from '../types';
import { PM_JUMBO_ROLL_PRODUCTS } from '../data/pmProductData';

interface PmProductsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct?: (product: PmJumboRollProduct) => void;
  initialMachine?: MachineId;
}

export const PmProductsModal: React.FC<PmProductsModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  initialMachine
}) => {
  const [selectedMachineTab, setSelectedMachineTab] = useState<'ALL' | MachineId>(initialMachine || 'ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [bahanBakuFilter, setBahanBakuFilter] = useState<'ALL' | 'HVS' | 'PULP'>('ALL');

  // Filter products
  const filteredProducts = useMemo(() => {
    return PM_JUMBO_ROLL_PRODUCTS.filter(prod => {
      const matchMachine = selectedMachineTab === 'ALL' || prod.machine === selectedMachineTab;
      const matchBahan = bahanBakuFilter === 'ALL' || prod.bahanBaku === bahanBakuFilter;
      
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q || 
        prod.itemBarang.toLowerCase().includes(q) ||
        prod.kodeBarang.toLowerCase().includes(q) ||
        prod.gsm.toString().includes(q) ||
        prod.tensileMd.toLowerCase().includes(q) ||
        prod.tensileCd.toLowerCase().includes(q) ||
        prod.bahanBaku.toLowerCase().includes(q) ||
        prod.machine.toLowerCase().includes(q);

      return matchMachine && matchBahan && matchQuery;
    });
  }, [selectedMachineTab, bahanBakuFilter, searchQuery]);

  // Group by machine counts
  const pm1Count = PM_JUMBO_ROLL_PRODUCTS.filter(p => p.machine === 'PM1').length;
  const pm2Count = PM_JUMBO_ROLL_PRODUCTS.filter(p => p.machine === 'PM2').length;
  const pm5Count = PM_JUMBO_ROLL_PRODUCTS.filter(p => p.machine === 'PM5').length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-slate-950 font-black shadow-md">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white tracking-wide">
                  DATA PRODUKSI JUMBO ROLL
                </h3>
                <span className="text-[11px] font-bold px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded">
                  PT. PANCA USAHATAMA PARAMITA
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Master Spesifikasi Standar Kertas Jumbo Roll Mesin PM 1, PM 2, dan PM 5
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
              title="Cetak Data Spesifikasi Produk"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Tabel</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
              title="Tutup Katalog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/90 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Machine Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setSelectedMachineTab('ALL')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedMachineTab === 'ALL'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Semua Mesin ({PM_JUMBO_ROLL_PRODUCTS.length})
            </button>
            <button
              onClick={() => setSelectedMachineTab('PM1')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedMachineTab === 'PM1'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Mesin PM 1 ({pm1Count})
            </button>
            <button
              onClick={() => setSelectedMachineTab('PM2')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedMachineTab === 'PM2'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Mesin PM 2 ({pm2Count})
            </button>
            <button
              onClick={() => setSelectedMachineTab('PM5')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedMachineTab === 'PM5'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Mesin PM 5 ({pm5Count})
            </button>
          </div>

          {/* Search & Bahan Filter */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Cari item, kode, GSM, ukuran..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <select
              value={bahanBakuFilter}
              onChange={(e) => setBahanBakuFilter(e.target.value as any)}
              className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer font-medium"
            >
              <option value="ALL">Semua Bahan Baku</option>
              <option value="HVS">Bahan Baku: HVS</option>
              <option value="PULP">Bahan Baku: PULP</option>
            </select>
          </div>
        </div>

        {/* Product Table */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <Info className="w-8 h-8 text-slate-500 mx-auto" />
              <p className="text-sm font-semibold">Tidak ada data produk yang cocok dengan pencarian.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedMachineTab('ALL');
                  setBahanBakuFilter('ALL');
                }}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs rounded-lg font-medium"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            (['PM1', 'PM2', 'PM5'] as MachineId[]).map((mach) => {
              const machineProducts = filteredProducts.filter(p => p.machine === mach);
              if (machineProducts.length === 0) return null;

              return (
                <div key={mach} className="bg-slate-950 border border-slate-800/90 rounded-xl overflow-hidden shadow-lg">
                  {/* Machine Header */}
                  <div className={`px-4 py-2.5 flex items-center justify-between text-xs font-bold ${
                    mach === 'PM1' 
                      ? 'bg-emerald-950/80 text-emerald-300 border-b border-emerald-800/60' 
                      : mach === 'PM2'
                      ? 'bg-cyan-950/80 text-cyan-300 border-b border-cyan-800/60'
                      : 'bg-blue-950/80 text-blue-300 border-b border-blue-800/60'
                  }`}>
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4" />
                      <span className="text-sm font-black uppercase tracking-wider">MESIN {mach}</span>
                      <span className="text-[11px] font-normal opacity-80">({machineProducts.length} Jenis Produk Terdaftar)</span>
                    </div>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-black/40 border border-white/10">
                      Standard Quality Reference
                    </span>
                  </div>

                  {/* Table Responsive Container */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-900/90 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800 font-bold">
                          <th className="py-2.5 px-3 w-10 text-center">NO</th>
                          <th className="py-2.5 px-3 min-w-[220px]">ITEM BARANG</th>
                          <th className="py-2.5 px-3 min-w-[170px]">KODE BARANG</th>
                          <th className="py-2.5 px-2 text-center" colSpan={5}>
                            <span className="block border-b border-slate-700/60 pb-1 text-amber-400">SPESIFIKASI STANDAR PABRIK</span>
                            <div className="grid grid-cols-5 text-[9px] pt-1 text-slate-300">
                              <span>GSM (± 1)</span>
                              <span>MD</span>
                              <span>CD</span>
                              <span>THICKNESS</span>
                              <span>CREEPING</span>
                            </div>
                          </th>
                          <th className="py-2.5 px-3 text-center min-w-[90px]">BAHAN BAKU</th>
                          {onSelectProduct && (
                            <th className="py-2.5 px-3 text-center w-24">AKSI</th>
                          )}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {machineProducts.map((prod) => (
                          <tr 
                            key={prod.id} 
                            className="hover:bg-slate-900/60 transition-colors group"
                          >
                            <td className="py-2.5 px-3 text-center font-mono text-slate-400 font-bold">
                              {prod.no}
                            </td>
                            <td className="py-2.5 px-3 font-bold text-white group-hover:text-amber-300">
                              {prod.itemBarang}
                            </td>
                            <td className="py-2.5 px-3 font-mono text-[11px] text-amber-300 font-semibold">
                              {prod.kodeBarang}
                            </td>
                            
                            {/* SPESIFIKASI GRID */}
                            <td className="py-2.5 px-2 text-center font-mono font-bold text-slate-200 bg-slate-900/30">
                              {prod.gsm.toFixed(1).replace('.', ',')}
                            </td>
                            <td className="py-2.5 px-2 text-center font-mono text-[11px] text-slate-300 bg-slate-900/30">
                              {prod.tensileMd}
                            </td>
                            <td className="py-2.5 px-2 text-center font-mono text-[11px] text-slate-300 bg-slate-900/30">
                              {prod.tensileCd}
                            </td>
                            <td className="py-2.5 px-2 text-center font-mono text-[11px] text-slate-300 bg-slate-900/30">
                              {prod.thicknessMm.toFixed(2).replace('.', ',')} mm ({prod.thicknessMicron} µm)
                            </td>
                            <td className="py-2.5 px-2 text-center font-mono text-[11px] text-slate-300 bg-slate-900/30">
                              {prod.creeping}
                            </td>

                            {/* BAHAN BAKU */}
                            <td className="py-2.5 px-3 text-center">
                              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wider ${
                                prod.bahanBaku === 'HVS' 
                                  ? 'bg-amber-950 text-amber-300 border border-amber-800/80' 
                                  : 'bg-emerald-950 text-emerald-300 border border-emerald-800/80'
                              }`}>
                                {prod.bahanBaku}
                              </span>
                            </td>

                            {onSelectProduct && (
                              <td className="py-2.5 px-3 text-center">
                                <button
                                  onClick={() => {
                                    onSelectProduct(prod);
                                    onClose();
                                  }}
                                  className="px-2.5 py-1 bg-amber-600 hover:bg-amber-500 text-white text-[11px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1 mx-auto"
                                  title="Gunakan Produk Ini di Laporan"
                                >
                                  <Check className="w-3 h-3" />
                                  <span>Pilih</span>
                                </button>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Semua standar terintegrasi dengan formulir input, rincian laporan, cetak PDF, dan chart analisis.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl transition-colors"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};

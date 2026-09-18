import { MachineId, PmJumboRollProduct } from '../types';

/**
 * MASTER DATA PRODUKSI JUMBO ROLL PT. PANCA USAHATAMA PARAMITA (PT. PUP)
 * Unit Mesin: PM 1, PM 2, dan PM 5
 * Sumber Data: Dokumen Resmi Spesifikasi Produk Jumbo Roll Pabrik
 */

export const PM_JUMBO_ROLL_PRODUCTS: PmJumboRollProduct[] = [
  // ==========================================
  // MESIN PM 1 (9 Item Produk)
  // ==========================================
  {
    id: 'pm1-prod-1',
    no: 1,
    machine: 'PM1',
    itemBarang: 'MG HVS 1 PLY PUTIH UK.0275 MM',
    kodeBarang: '60.A/B.61.2.18.0275',
    gsm: 18.0,
    gsmTolerance: '± 1',
    tensileMd: '1200 - 1500',
    tensileCd: '500-600',
    thicknessMm: 0.05,
    thicknessMicron: 50,
    creeping: '-',
    bahanBaku: 'HVS'
  },
  {
    id: 'pm1-prod-2',
    no: 2,
    machine: 'PM1',
    itemBarang: 'MG HVS 1 PLY PUTIH UK.0300 MM',
    kodeBarang: '60.A/B.61.2.18.0300',
    gsm: 18.0,
    gsmTolerance: '± 1',
    tensileMd: '1200 - 1500',
    tensileCd: '500-600',
    thicknessMm: 0.05,
    thicknessMicron: 50,
    creeping: '-',
    bahanBaku: 'HVS'
  },
  {
    id: 'pm1-prod-3',
    no: 3,
    machine: 'PM1',
    itemBarang: 'FACIAL PULP 2 PLY PUTIH UK. 0800MM',
    kodeBarang: '60.B.12.2.13.0800',
    gsm: 13.0,
    gsmTolerance: '± 1',
    tensileMd: '500',
    tensileCd: '200',
    thicknessMm: 0.13,
    thicknessMicron: 130,
    creeping: '14%',
    bahanBaku: 'PULP'
  },
  {
    id: 'pm1-prod-4',
    no: 4,
    machine: 'PM1',
    itemBarang: 'FACIAL PULP 2 PLY PUTIH UK. 0720MM',
    kodeBarang: '60.B.12.2.13.0720',
    gsm: 13.0,
    gsmTolerance: '± 1',
    tensileMd: '500',
    tensileCd: '200',
    thicknessMm: 0.13,
    thicknessMicron: 130,
    creeping: '14%',
    bahanBaku: 'PULP'
  },
  {
    id: 'pm1-prod-5',
    no: 5,
    machine: 'PM1',
    itemBarang: 'FACIAL PULP 2 PLY PUTIH UK. 0200MM',
    kodeBarang: '60.B.12.2.13.0200',
    gsm: 13.0,
    gsmTolerance: '± 1',
    tensileMd: '500',
    tensileCd: '200',
    thicknessMm: 0.13,
    thicknessMicron: 130,
    creeping: '14%',
    bahanBaku: 'PULP'
  },
  {
    id: 'pm1-prod-6',
    no: 6,
    machine: 'PM1',
    itemBarang: 'TOILET PULP 2 PLY PUTIH UK. 2200 MM',
    kodeBarang: '60.B.22.2.19.2200',
    gsm: 19.0,
    gsmTolerance: '± 1',
    tensileMd: '300',
    tensileCd: '200',
    thicknessMm: 0.13,
    thicknessMicron: 130,
    creeping: '25%',
    bahanBaku: 'PULP'
  },
  {
    id: 'pm1-prod-7',
    no: 7,
    machine: 'PM1',
    itemBarang: 'TOILET PULP 2 PLY PUTIH UK. 1100MM',
    kodeBarang: '60.B.22.2.16.1100',
    gsm: 16.0,
    gsmTolerance: '± 1',
    tensileMd: '300',
    tensileCd: '200',
    thicknessMm: 0.13,
    thicknessMicron: 130,
    creeping: '25%',
    bahanBaku: 'PULP'
  },
  {
    id: 'pm1-prod-8',
    no: 8,
    machine: 'PM1',
    itemBarang: 'NAPKIN PULP 1 PLY PUTIH UK. 0300 MM',
    kodeBarang: '60.B.41.2.20.0300',
    gsm: 20.0,
    gsmTolerance: '± 1',
    tensileMd: '500',
    tensileCd: '200',
    thicknessMm: 0.13,
    thicknessMicron: 130,
    creeping: '15%',
    bahanBaku: 'PULP'
  },
  {
    id: 'pm1-prod-9',
    no: 9,
    machine: 'PM1',
    itemBarang: 'NAPKIN PULP 1 PLY PUTIH UK. 0225 MM',
    kodeBarang: '60.B.42.2.16.0400',
    gsm: 20.0,
    gsmTolerance: '± 1',
    tensileMd: '500',
    tensileCd: '200',
    thicknessMm: 0.13,
    thicknessMicron: 130,
    creeping: '15%',
    bahanBaku: 'PULP'
  },

  // ==========================================
  // MESIN PM 2 (6 Item Produk)
  // ==========================================
  {
    id: 'pm2-prod-1',
    no: 1,
    machine: 'PM2',
    itemBarang: 'MG HVS 1 PLY KUNING UK.0275 MM',
    kodeBarang: '60.A/B.61.3.18.0275',
    gsm: 18.0,
    gsmTolerance: '± 1',
    tensileMd: '1200 - 1500',
    tensileCd: '500-600',
    thicknessMm: 0.05,
    thicknessMicron: 50,
    creeping: '-',
    bahanBaku: 'HVS'
  },
  {
    id: 'pm2-prod-2',
    no: 2,
    machine: 'PM2',
    itemBarang: 'MG HVS 1 PLY KUNING UK.0300 MM',
    kodeBarang: '60.A/B.61.3.18.0300',
    gsm: 18.0,
    gsmTolerance: '± 1',
    tensileMd: '1200 - 1500',
    tensileCd: '500-600',
    thicknessMm: 0.05,
    thicknessMicron: 50,
    creeping: '-',
    bahanBaku: 'HVS'
  },
  {
    id: 'pm2-prod-3',
    no: 3,
    machine: 'PM2',
    itemBarang: 'MG HVS 1 PLY PINK UK.0275 MM',
    kodeBarang: '60.A/B.61.1.18.0275',
    gsm: 18.0,
    gsmTolerance: '± 1',
    tensileMd: '1200 - 1500',
    tensileCd: '500-600',
    thicknessMm: 0.05,
    thicknessMicron: 50,
    creeping: '-',
    bahanBaku: 'HVS'
  },
  {
    id: 'pm2-prod-4',
    no: 4,
    machine: 'PM2',
    itemBarang: 'MG HVS 1 PLY PINK UK.0300 MM',
    kodeBarang: '60.A/B.61.1.18.0300',
    gsm: 18.0,
    gsmTolerance: '± 1',
    tensileMd: '1200 - 1500',
    tensileCd: '500-600',
    thicknessMm: 0.05,
    thicknessMicron: 50,
    creeping: '-',
    bahanBaku: 'HVS'
  },
  {
    id: 'pm2-prod-5',
    no: 5,
    machine: 'PM2',
    itemBarang: 'MG HVS 1 PLY PUTIH UK.0275 MM',
    kodeBarang: '60.A/B.61.2.18.0275',
    gsm: 18.0,
    gsmTolerance: '± 1',
    tensileMd: '1200 - 1500',
    tensileCd: '500-600',
    thicknessMm: 0.05,
    thicknessMicron: 50,
    creeping: '-',
    bahanBaku: 'HVS'
  },
  {
    id: 'pm2-prod-6',
    no: 6,
    machine: 'PM2',
    itemBarang: 'MG HVS 1 PLY PUTIH UK.0300 MM',
    kodeBarang: '60.A/B.61.2.18.0300',
    gsm: 18.0,
    gsmTolerance: '± 1',
    tensileMd: '1200 - 1500',
    tensileCd: '500-600',
    thicknessMm: 0.05,
    thicknessMicron: 50,
    creeping: '-',
    bahanBaku: 'HVS'
  },

  // ==========================================
  // MESIN PM 5 (8 Item Produk)
  // ==========================================
  {
    id: 'pm5-prod-1',
    no: 1,
    machine: 'PM5',
    itemBarang: 'TOILET HVS 2 PLY PUTIH UK.0200 MM',
    kodeBarang: '60.A.82.2.17.0200',
    gsm: 17.0,
    gsmTolerance: '± 1',
    tensileMd: '300-350',
    tensileCd: '150-180',
    thicknessMm: 0.13,
    thicknessMicron: 130,
    creeping: '20%',
    bahanBaku: 'HVS'
  },
  {
    id: 'pm5-prod-2',
    no: 2,
    machine: 'PM5',
    itemBarang: 'TOILET HVS 2 PLY PUTIH UK.0380 MM',
    kodeBarang: '60.A.82.2.17.0380',
    gsm: 17.0,
    gsmTolerance: '± 1',
    tensileMd: '300-350',
    tensileCd: '150-180',
    thicknessMm: 0.13,
    thicknessMicron: 130,
    creeping: '20%',
    bahanBaku: 'HVS'
  },
  {
    id: 'pm5-prod-3',
    no: 3,
    machine: 'PM5',
    itemBarang: 'TOILET HVS 2 PLY PUTIH UK.0400 MM',
    kodeBarang: '60.A.82.2.17.0400',
    gsm: 17.0,
    gsmTolerance: '± 1',
    tensileMd: '300-350',
    tensileCd: '150-180',
    thicknessMm: 0.13,
    thicknessMicron: 130,
    creeping: '20%',
    bahanBaku: 'HVS'
  },
  {
    id: 'pm5-prod-4',
    no: 4,
    machine: 'PM5',
    itemBarang: 'TOILET HVS 2 PLY PUTIH UK.0530 MM',
    kodeBarang: '60.A.82.2.17.0530',
    gsm: 17.0,
    gsmTolerance: '± 1',
    tensileMd: '300-350',
    tensileCd: '150-180',
    thicknessMm: 0.13,
    thicknessMicron: 130,
    creeping: '20%',
    bahanBaku: 'HVS'
  },
  {
    id: 'pm5-prod-5',
    no: 5,
    machine: 'PM5',
    itemBarang: 'TOILET HVS 2 PLY PUTIH UK.0800 MM',
    kodeBarang: '60.A.82.2.17.0800',
    gsm: 17.0,
    gsmTolerance: '± 1',
    tensileMd: '300-350',
    tensileCd: '150-180',
    thicknessMm: 0.13,
    thicknessMicron: 130,
    creeping: '20%',
    bahanBaku: 'HVS'
  },
  {
    id: 'pm5-prod-6',
    no: 6,
    machine: 'PM5',
    itemBarang: 'TOILET HVS 2 PLY PUTIH UK.1140 MM',
    kodeBarang: '60.A.82.2.17.1140',
    gsm: 17.0,
    gsmTolerance: '± 1',
    tensileMd: '300-350',
    tensileCd: '150-180',
    thicknessMm: 0.13,
    thicknessMicron: 130,
    creeping: '20%',
    bahanBaku: 'HVS'
  },
  {
    id: 'pm5-prod-7',
    no: 7,
    machine: 'PM5',
    itemBarang: 'TOILET HVS 2 PLY PUTIH UK.2200 MM',
    kodeBarang: '60.B.82.2.17.2200',
    gsm: 17.0,
    gsmTolerance: '± 1',
    tensileMd: '300-350',
    tensileCd: '150-180',
    thicknessMm: 0.13,
    thicknessMicron: 130,
    creeping: '20%',
    bahanBaku: 'HVS'
  },
  {
    id: 'pm5-prod-8',
    no: 8,
    machine: 'PM5',
    itemBarang: 'TOILET HVS 2 PLY PUTIH UK.1300 MM',
    kodeBarang: '60.A.82.2.17.1300',
    gsm: 17.0,
    gsmTolerance: '± 1',
    tensileMd: '300-350',
    tensileCd: '150-180',
    thicknessMm: 0.13,
    thicknessMicron: 130,
    creeping: '20%',
    bahanBaku: 'HVS'
  }
];

/**
 * Filter list produk berdasarkan mesin PM
 */
export const getProductsByMachine = (machine: MachineId): PmJumboRollProduct[] => {
  return PM_JUMBO_ROLL_PRODUCTS.filter(p => p.machine === machine);
};

/**
 * Cari produk berdasarkan kode barang atau nama item
 */
export const findProductByCodeOrName = (identifier: string): PmJumboRollProduct | undefined => {
  if (!identifier) return undefined;
  const cleanId = identifier.trim().toLowerCase();
  return PM_JUMBO_ROLL_PRODUCTS.find(p => 
    p.kodeBarang.toLowerCase() === cleanId ||
    p.itemBarang.toLowerCase() === cleanId ||
    cleanId.includes(p.kodeBarang.toLowerCase()) ||
    cleanId.includes(p.itemBarang.toLowerCase())
  );
};

/**
 * Format string label produk untuk opsi dropdown select
 */
export const formatProductOptionLabel = (product: PmJumboRollProduct): string => {
  return `${product.itemBarang} | ${product.kodeBarang} (${product.gsm} gsm ${product.gsmTolerance}, ${product.bahanBaku})`;
};

/**
 * Format nilai paperGradeCode standar
 */
export const formatPaperGradeCode = (product: PmJumboRollProduct): string => {
  return `${product.itemBarang} [${product.kodeBarang}]`;
};

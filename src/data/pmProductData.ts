import { MachineId, PmJumboRollProduct } from '../types';

/**
 * MASTER DATA PRODUKSI JUMBO ROLL PT. PANCA USAHATAMA PARAMITA (PT. PUP)
 * Unit Mesin: PM 1 (13 Item), PM 2 (8 Item), dan PM 5 (22 Item) - Total: 43 Item Produk
 * Sumber Data: Dokumen Resmi Pengganti Master Kode Produk Pabrik PT. PUP
 */

export const PM_JUMBO_ROLL_PRODUCTS: PmJumboRollProduct[] = [
  // ==========================================
  // MESIN PM 1 (13 Item Produk)
  // ==========================================
  {
    id: 'pm1-prod-1',
    no: 1,
    machine: 'PM1',
    itemBarang: 'Mg HVS 1 Ply Pink 18 gsm Uk. 0275 mm A',
    kodeBarang: '60.A.61.1.18.0275',
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
    itemBarang: 'Mg HVS 1 Ply Putih 18 gsm Uk. 0264 mm A',
    kodeBarang: '60.A.61.2.18.0264',
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
    itemBarang: 'Mg HVS 1 Ply Putih 18 gsm Uk. 0275 mm A',
    kodeBarang: '60.A.61.2.18.0275',
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
    id: 'pm1-prod-4',
    no: 4,
    machine: 'PM1',
    itemBarang: 'Mg Dorslag 1 Ply Putih 24 gsm Uk. 0610 mm A',
    kodeBarang: '60.A.61.2.24.0610',
    gsm: 24.0,
    gsmTolerance: '± 1',
    tensileMd: '1400 - 1600',
    tensileCd: '550 - 650',
    thicknessMm: 0.06,
    thicknessMicron: 60,
    creeping: '-',
    bahanBaku: 'HVS'
  },
  {
    id: 'pm1-prod-5',
    no: 5,
    machine: 'PM1',
    itemBarang: 'Mg Dorslag 1 Ply Putih 24 gsm Uk. 0680 mm A',
    kodeBarang: '60.A.61.2.24.0680',
    gsm: 24.0,
    gsmTolerance: '± 1',
    tensileMd: '1400 - 1600',
    tensileCd: '550 - 650',
    thicknessMm: 0.06,
    thicknessMicron: 60,
    creeping: '-',
    bahanBaku: 'HVS'
  },
  {
    id: 'pm1-prod-6',
    no: 6,
    machine: 'PM1',
    itemBarang: 'Mg Dorslag 1 Ply Putih 24 gsm Uk. 0910 mm A',
    kodeBarang: '60.A.61.2.24.0910',
    gsm: 24.0,
    gsmTolerance: '± 1',
    tensileMd: '1400 - 1600',
    tensileCd: '550 - 650',
    thicknessMm: 0.06,
    thicknessMicron: 60,
    creeping: '-',
    bahanBaku: 'HVS'
  },
  {
    id: 'pm1-prod-7',
    no: 7,
    machine: 'PM1',
    itemBarang: 'Mg HVS 1 Ply Kuning 18 gsm Uk. 0275 mm A',
    kodeBarang: '60.A.61.3.18.0275',
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
    id: 'pm1-prod-8',
    no: 8,
    machine: 'PM1',
    itemBarang: 'Toilet Pulp 2 Ply Putih 16 gsm Uk. 2200 mm B',
    kodeBarang: '60.B.22.2.16.2200',
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
    id: 'pm1-prod-9',
    no: 9,
    machine: 'PM1',
    itemBarang: 'Toilet Pulp 2 Ply Putih 19 gsm Uk. 2200 mm B',
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
    id: 'pm1-prod-10',
    no: 10,
    machine: 'PM1',
    itemBarang: 'Napkin Pulp 1 Ply Putih 19,5 gsm Uk. 0215 mm B',
    kodeBarang: '60.B.41.2.19.0215',
    gsm: 19.5,
    gsmTolerance: '± 1',
    tensileMd: '500',
    tensileCd: '200',
    thicknessMm: 0.13,
    thicknessMicron: 130,
    creeping: '15%',
    bahanBaku: 'PULP'
  },
  {
    id: 'pm1-prod-11',
    no: 11,
    machine: 'PM1',
    itemBarang: 'Mg HVS 1 Ply Pink 21 gsm Uk. 0275 mm B',
    kodeBarang: '60.B.61.1.21.0275',
    gsm: 21.0,
    gsmTolerance: '± 1',
    tensileMd: '1300 - 1600',
    tensileCd: '550 - 650',
    thicknessMm: 0.055,
    thicknessMicron: 55,
    creeping: '-',
    bahanBaku: 'HVS'
  },
  {
    id: 'pm1-prod-12',
    no: 12,
    machine: 'PM1',
    itemBarang: 'Mg HVS 1 Ply Putih 21 gsm Uk. 0275 mm B',
    kodeBarang: '60.B.61.2.21.0275',
    gsm: 21.0,
    gsmTolerance: '± 1',
    tensileMd: '1300 - 1600',
    tensileCd: '550 - 650',
    thicknessMm: 0.055,
    thicknessMicron: 55,
    creeping: '-',
    bahanBaku: 'HVS'
  },
  {
    id: 'pm1-prod-13',
    no: 13,
    machine: 'PM1',
    itemBarang: 'Mg HVS 1 Ply Kuning 21 gsm Uk. 0275 mm B',
    kodeBarang: '60.B.61.3.21.0275',
    gsm: 21.0,
    gsmTolerance: '± 1',
    tensileMd: '1300 - 1600',
    tensileCd: '550 - 650',
    thicknessMm: 0.055,
    thicknessMicron: 55,
    creeping: '-',
    bahanBaku: 'HVS'
  },

  // ==========================================
  // MESIN PM 2 (8 Item Produk)
  // ==========================================
  {
    id: 'pm2-prod-1',
    no: 1,
    machine: 'PM2',
    itemBarang: 'Mg HVS 1 Ply Pink 18 gsm Uk. 0275 mm A',
    kodeBarang: '60.A.61.1.18.0275',
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
    itemBarang: 'Mg HVS 1 Ply Putih 18 gsm Uk. 0275 mm A',
    kodeBarang: '60.A.61.2.18.0275',
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
    itemBarang: 'Mg Dorslag 1 Ply Putih 24 gsm Uk. 0610 mm A',
    kodeBarang: '60.A.61.2.24.0610',
    gsm: 24.0,
    gsmTolerance: '± 1',
    tensileMd: '1400 - 1600',
    tensileCd: '550 - 650',
    thicknessMm: 0.06,
    thicknessMicron: 60,
    creeping: '-',
    bahanBaku: 'HVS'
  },
  {
    id: 'pm2-prod-4',
    no: 4,
    machine: 'PM2',
    itemBarang: 'Mg Dorslag 1 Ply Putih 24 gsm Uk. 0680 mm A',
    kodeBarang: '60.A.61.2.24.0680',
    gsm: 24.0,
    gsmTolerance: '± 1',
    tensileMd: '1400 - 1600',
    tensileCd: '550 - 650',
    thicknessMm: 0.06,
    thicknessMicron: 60,
    creeping: '-',
    bahanBaku: 'HVS'
  },
  {
    id: 'pm2-prod-5',
    no: 5,
    machine: 'PM2',
    itemBarang: 'Mg Dorslag 1 Ply Putih 24 gsm Uk. 0910 mm A',
    kodeBarang: '60.A.61.2.24.0910',
    gsm: 24.0,
    gsmTolerance: '± 1',
    tensileMd: '1400 - 1600',
    tensileCd: '550 - 650',
    thicknessMm: 0.06,
    thicknessMicron: 60,
    creeping: '-',
    bahanBaku: 'HVS'
  },
  {
    id: 'pm2-prod-6',
    no: 6,
    machine: 'PM2',
    itemBarang: 'Mg HVS 1 Ply Kuning 18 gsm Uk. 0275 mm A',
    kodeBarang: '60.A.61.3.18.0275',
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
    id: 'pm2-prod-7',
    no: 7,
    machine: 'PM2',
    itemBarang: 'Mg HVS 1 Ply Pink 21 gsm Uk. 0275 mm B',
    kodeBarang: '60.B.61.1.21.0275',
    gsm: 21.0,
    gsmTolerance: '± 1',
    tensileMd: '1300 - 1600',
    tensileCd: '550 - 650',
    thicknessMm: 0.055,
    thicknessMicron: 55,
    creeping: '-',
    bahanBaku: 'HVS'
  },
  {
    id: 'pm2-prod-8',
    no: 8,
    machine: 'PM2',
    itemBarang: 'Mg HVS 1 Ply Kuning 21 gsm Uk. 0275 mm B',
    kodeBarang: '60.B.61.3.21.0275',
    gsm: 21.0,
    gsmTolerance: '± 1',
    tensileMd: '1300 - 1600',
    tensileCd: '550 - 650',
    thicknessMm: 0.055,
    thicknessMicron: 55,
    creeping: '-',
    bahanBaku: 'HVS'
  },

  // ==========================================
  // MESIN PM 5 (22 Item Produk)
  // ==========================================
  {
    id: 'pm5-prod-1',
    no: 1,
    machine: 'PM5',
    itemBarang: 'Toilet HVS 1 Ply Putih 21 gsm Uk. 0365 mm A',
    kodeBarang: '60.A.81.2.21.0365',
    gsm: 21.0,
    gsmTolerance: '± 1',
    tensileMd: '350-400',
    tensileCd: '160-200',
    thicknessMm: 0.10,
    thicknessMicron: 100,
    creeping: '18%',
    bahanBaku: 'HVS'
  },
  {
    id: 'pm5-prod-2',
    no: 2,
    machine: 'PM5',
    itemBarang: 'Toilet HVS 1 Ply Putih 21 gsm Uk. 1400 mm A',
    kodeBarang: '60.A.81.2.21.1400',
    gsm: 21.0,
    gsmTolerance: '± 1',
    tensileMd: '350-400',
    tensileCd: '160-200',
    thicknessMm: 0.10,
    thicknessMicron: 100,
    creeping: '18%',
    bahanBaku: 'HVS'
  },
  {
    id: 'pm5-prod-3',
    no: 3,
    machine: 'PM5',
    itemBarang: 'Toilet HVS 2 Ply Putih 17 gsm Uk. 0200 mm A',
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
    id: 'pm5-prod-4',
    no: 4,
    machine: 'PM5',
    itemBarang: 'Toilet HVS 2 Ply Putih 17 gsm Uk. 0355 mm A',
    kodeBarang: '60.A.82.2.17.0355',
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
    itemBarang: 'Toilet HVS 2 Ply Putih 17 gsm Uk. 0366 mm A',
    kodeBarang: '60.A.82.2.17.0366',
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
    itemBarang: 'Toilet HVS 2 Ply Putih 17 gsm Uk. 1067 mm A',
    kodeBarang: '60.A.82.2.17.1067',
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
    itemBarang: 'Toilet HVS 2 Ply Putih 17 gsm Uk. 1070 mm A',
    kodeBarang: '60.A.82.2.17.1070',
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
    itemBarang: 'Toilet HVS 2 Ply Putih 17 gsm Uk. 2135 mm A',
    kodeBarang: '60.A.82.2.17.2135',
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
    id: 'pm5-prod-9',
    no: 9,
    machine: 'PM5',
    itemBarang: 'Toilet HVS 2 Ply Putih 19 gsm Uk. 1440 mm A',
    kodeBarang: '60.A.82.2.19.1440',
    gsm: 19.0,
    gsmTolerance: '± 1',
    tensileMd: '300-350',
    tensileCd: '150-180',
    thicknessMm: 0.13,
    thicknessMicron: 130,
    creeping: '20%',
    bahanBaku: 'HVS'
  },
  {
    id: 'pm5-prod-10',
    no: 10,
    machine: 'PM5',
    itemBarang: 'Toilet HVS 2 Ply Putih 19 gsm Uk. 1600 mm A',
    kodeBarang: '60.A.82.2.19.1600',
    gsm: 19.0,
    gsmTolerance: '± 1',
    tensileMd: '300-350',
    tensileCd: '150-180',
    thicknessMm: 0.13,
    thicknessMicron: 130,
    creeping: '20%',
    bahanBaku: 'HVS'
  },
  {
    id: 'pm5-prod-11',
    no: 11,
    machine: 'PM5',
    itemBarang: 'Toilet HVS 2 Ply Putih 20 gsm Uk. 0360 mm A',
    kodeBarang: '60.A.82.2.20.0360',
    gsm: 20.0,
    gsmTolerance: '± 1',
    tensileMd: '320-370',
    tensileCd: '160-190',
    thicknessMm: 0.135,
    thicknessMicron: 135,
    creeping: '20%',
    bahanBaku: 'HVS'
  },
  {
    id: 'pm5-prod-12',
    no: 12,
    machine: 'PM5',
    itemBarang: 'Toilet HVS 2 Ply Putih 20 gsm Uk. 1067 mm A',
    kodeBarang: '60.A.82.2.20.1067',
    gsm: 20.0,
    gsmTolerance: '± 1',
    tensileMd: '320-370',
    tensileCd: '160-190',
    thicknessMm: 0.135,
    thicknessMicron: 135,
    creeping: '20%',
    bahanBaku: 'HVS'
  },
  {
    id: 'pm5-prod-13',
    no: 13,
    machine: 'PM5',
    itemBarang: 'Toilet HVS 2 Ply Putih 20 gsm Uk. 2840 mm A',
    kodeBarang: '60.A.82.2.20.2840',
    gsm: 20.0,
    gsmTolerance: '± 1',
    tensileMd: '320-370',
    tensileCd: '160-190',
    thicknessMm: 0.135,
    thicknessMicron: 135,
    creeping: '20%',
    bahanBaku: 'HVS'
  },
  {
    id: 'pm5-prod-14',
    no: 14,
    machine: 'PM5',
    itemBarang: 'Facial Pulp 2 Ply Putih 13 gsm Uk. 0720 mm B',
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
    id: 'pm5-prod-15',
    no: 15,
    machine: 'PM5',
    itemBarang: 'Toilet Pulp 2 Ply Putih 16 gsm Uk. 1100 mm B',
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
    id: 'pm5-prod-16',
    no: 16,
    machine: 'PM5',
    itemBarang: 'Toilet Pulp 2 Ply Putih 16 gsm Uk. 2200 mm B',
    kodeBarang: '60.B.22.2.16.2200',
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
    id: 'pm5-prod-17',
    no: 17,
    machine: 'PM5',
    itemBarang: 'Toilet HVS 2 Ply Putih 17 gsm Uk. 0800 mm B',
    kodeBarang: '60.B.82.2.17.0800',
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
    id: 'pm5-prod-18',
    no: 18,
    machine: 'PM5',
    itemBarang: 'Toilet HVS 2 Ply Putih 17 gsm Uk. 1100 mm B',
    kodeBarang: '60.B.82.2.17.1100',
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
    id: 'pm5-prod-19',
    no: 19,
    machine: 'PM5',
    itemBarang: 'Toilet HVS 2 Ply Putih 17 gsm Uk. 2200 mm B',
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
    id: 'pm5-prod-20',
    no: 20,
    machine: 'PM5',
    itemBarang: 'Toilet HVS 2 Ply Putih 22 gsm Uk. 1100 mm B',
    kodeBarang: '60.B.82.2.22.1100',
    gsm: 22.0,
    gsmTolerance: '± 1',
    tensileMd: '350-400',
    tensileCd: '170-200',
    thicknessMm: 0.14,
    thicknessMicron: 140,
    creeping: '20%',
    bahanBaku: 'HVS'
  },
  {
    id: 'pm5-prod-21',
    no: 21,
    machine: 'PM5',
    itemBarang: 'Toilet HVS 2 Ply Putih 22 gsm Uk. 1600 mm B',
    kodeBarang: '60.B.82.2.22.1600',
    gsm: 22.0,
    gsmTolerance: '± 1',
    tensileMd: '350-400',
    tensileCd: '170-200',
    thicknessMm: 0.14,
    thicknessMicron: 140,
    creeping: '20%',
    bahanBaku: 'HVS'
  },
  {
    id: 'pm5-prod-22',
    no: 22,
    machine: 'PM5',
    itemBarang: 'Toilet HVS 2 Ply Putih 22 gsm Uk. 2200 mm B',
    kodeBarang: '60.B.82.2.22.2200',
    gsm: 22.0,
    gsmTolerance: '± 1',
    tensileMd: '350-400',
    tensileCd: '170-200',
    thicknessMm: 0.14,
    thicknessMicron: 140,
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

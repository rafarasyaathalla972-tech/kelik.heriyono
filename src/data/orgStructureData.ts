import { PupPersonnel, JobDescriptionDetail } from '../types';

export const PT_PUP_METADATA = {
  companyName: 'PT. PANCA USAHATAMA PARAMITA (PT. PUP)',
  divisionName: 'Bagian Produksi & Divisi Jumbo Roll',
  factoryHead: 'Kelik Heriyono',
  jumboRollDivHead: 'Kelik Heriyono',
  adminJr: 'Fiqih Saputra',
  boilerHead: 'YANA ANDRIYANA',
  documentCode: 'SOP-HRD-OPS-PUP-2026-REV03',
  effectiveDate: '2026-09-01'
};

// =========================================================================
// 1. MASTER DATA PERSONEL STRUKTUR KERJA PRODUKSI PT. PUP
// =========================================================================

export const PUP_PERSONNEL_ROSTER: PupPersonnel[] = [
  // --- PIMPINAN & ADMINISTRASI ---
  {
    id: 'pers-pabrik-1',
    name: 'Kelik Heriyono',
    role: 'Kepala Pabrik & Jumbo Roll Div. Head',
    unit: 'MANAGEMENT',
    group: 'Non-Shift',
    status: 'Pimpinan',
    badgeTitle: 'Kepala Pabrik / Div. Head',
    directSupervisor: 'Direksi PT. PUP',
    notes: 'Penanggung jawab utama seluruh operasional pabrik, keselamatan, efisiensi, dan hasil produksi jumbo roll.'
  },
  {
    id: 'pers-adm-1',
    name: 'Fiqih Saputra',
    role: 'Adm. JR (Administrasi Jumbo Roll)',
    unit: 'ADM',
    group: 'Non-Shift',
    status: 'Organik',
    badgeTitle: 'Adm. Jumbo Roll',
    directSupervisor: 'Kelik Heriyono',
    notes: 'Rekapitulasi tonase harian, inventory jumbo roll, surat jalan, dan administrasi laporan shift.'
  },

  // --- KEPALA PM 1 & WAKIL ---
  {
    id: 'pers-pm1-head',
    name: 'Untung S',
    role: 'Kepala PM 1',
    unit: 'PM1',
    group: 'All',
    status: 'Pimpinan',
    badgeTitle: 'Kepala Unit PM 1',
    directSupervisor: 'Kelik Heriyono',
    notes: 'Penanggung jawab teknis dan manajerial lini Paper Machine 1 (Single Wire Medium Paper).'
  },
  {
    id: 'pers-pm1-wakil1',
    name: 'Sarino',
    role: 'Wakil 1 - PM 1',
    unit: 'PM1',
    group: 'All',
    status: 'Organik',
    badgeTitle: 'Wakil 1 PM 1',
    directSupervisor: 'Untung S',
    notes: 'Koordinator shift operasional dan stabilitas formasi serta pengeringan PM 1.'
  },
  {
    id: 'pers-pm1-wakil2',
    name: 'Piih Samboja',
    role: 'Wakil 2 - PM 1',
    unit: 'PM1',
    group: 'All',
    status: 'Organik',
    badgeTitle: 'Wakil 2 PM 1',
    directSupervisor: 'Untung S',
    notes: 'Koordinator pemeliharaan harian, penanganan kendala mesin, dan serah terima shift PM 1.'
  },

  // --- KEPALA PM 2 & WAKIL ---
  {
    id: 'pers-pm2-head',
    name: 'Rumawan',
    role: 'Kepala PM 2',
    unit: 'PM2',
    group: 'All',
    status: 'Pimpinan',
    badgeTitle: 'Kepala Unit PM 2',
    directSupervisor: 'Kelik Heriyono',
    notes: 'Penanggung jawab teknis dan manajerial lini Paper Machine 2 (Twin Wire Kraft & MG Paper).'
  },
  {
    id: 'pers-pm2-wakil1',
    name: 'CANDRA S',
    role: 'Wakil 1 - PM 2',
    unit: 'PM2',
    group: 'All',
    status: 'Organik',
    badgeTitle: 'Wakil 1 PM 2',
    directSupervisor: 'Rumawan',
    notes: 'Koordinator kontrol gramatur, moisture, dan efisiensi produksi PM 2.'
  },
  {
    id: 'pers-pm2-wakil2',
    name: 'Lukman A',
    role: 'Wakil 2 - PM 2',
    unit: 'PM2',
    group: 'All',
    status: 'Organik',
    badgeTitle: 'Wakil 2 PM 2',
    directSupervisor: 'Rumawan',
    notes: 'Koordinator operasional lapangan, kesiapan regu, dan kualitas kertas PM 2.'
  },

  // --- KEPALA PM 5 & WAKIL ---
  {
    id: 'pers-pm5-head',
    name: 'Suwardi',
    role: 'Kepala PM 5',
    unit: 'PM5',
    group: 'All',
    status: 'Pimpinan',
    badgeTitle: 'Kepala Unit PM 5',
    directSupervisor: 'Kelik Heriyono',
    notes: 'Penanggung jawab operasional lini Paper Machine 5 (Multi-Ply Tissue & White Top Kraft).'
  },
  {
    id: 'pers-pm5-wakil1',
    name: 'Bambang JH',
    role: 'Wakil 1 - PM 5',
    unit: 'PM5',
    group: 'All',
    status: 'Organik',
    badgeTitle: 'Wakil 1 PM 5',
    directSupervisor: 'Suwardi',
    notes: 'Koordinator sistem kontrol DCS, stabilitas speed, dan keandalan silinder Yankee PM 5.'
  },
  {
    id: 'pers-pm5-wakil2',
    name: 'Warsito',
    role: 'Wakil 2 - PM 5',
    unit: 'PM5',
    group: 'All',
    status: 'Organik',
    badgeTitle: 'Wakil 2 PM 5',
    directSupervisor: 'Suwardi',
    notes: 'Koordinator kualitas lembaran kertas, penanganan broke, dan keselamatan kerja PM 5.'
  },

  // --- KEPALA BOILER ---
  {
    id: 'pers-boiler-head',
    name: 'YANA ANDRIYANA',
    role: 'Kepala Boiler',
    unit: 'BOILER',
    group: 'Non-Shift',
    status: 'Pimpinan',
    badgeTitle: 'Kepala Unit Boiler',
    directSupervisor: 'Kelik Heriyono',
    notes: 'Penanggung jawab pasokan uap steam kering bertekanan stabil untuk silinder pengering PM1, PM2, dan PM5.'
  },

  // --- OPERATOR STOCK PREPARATION (SP) GROUP 1 ---
  { id: 'sp-g1-1', name: 'Dahlan', role: 'Operator Utama Stock Prep', unit: 'STOCK_PREP', group: 'Group 1', status: 'Organik', isHelper: false },
  { id: 'sp-g1-2', name: 'Dwi Indrayanto', role: 'Operator Stock Prep', unit: 'STOCK_PREP', group: 'Group 1', status: 'Organik', isHelper: false },
  { id: 'sp-g1-3', name: 'Didik Ditia P', role: 'Operator Stock Prep', unit: 'STOCK_PREP', group: 'Group 1', status: 'Organik', isHelper: false },
  { id: 'sp-g1-4', name: 'Sumedi', role: 'Operator Stock Prep', unit: 'STOCK_PREP', group: 'Group 1', status: 'Organik', isHelper: false },
  { id: 'sp-g1-5', name: 'Sunarman', role: 'Pembantu Operator (Helper) Stock Prep', unit: 'STOCK_PREP', group: 'Group 1', status: 'Organik', isHelper: true },

  // --- OPERATOR STOCK PREPARATION (SP) GROUP 2 ---
  { id: 'sp-g2-1', name: 'BP Tampubolon', role: 'Operator Utama Stock Prep', unit: 'STOCK_PREP', group: 'Group 2', status: 'Organik', isHelper: false },
  { id: 'sp-g2-2', name: 'Haerul Anwar', role: 'Operator Stock Prep', unit: 'STOCK_PREP', group: 'Group 2', status: 'Organik', isHelper: false },
  { id: 'sp-g2-3', name: 'Sidik Pramono', role: 'Operator Stock Prep', unit: 'STOCK_PREP', group: 'Group 2', status: 'Organik', isHelper: false },
  { id: 'sp-g2-4', name: 'Abd Hamid', role: 'Operator Stock Prep', unit: 'STOCK_PREP', group: 'Group 2', status: 'Organik', isHelper: false },
  { id: 'sp-g2-5', name: 'M. Nuranggi (Os)', role: 'Pembantu Operator (Helper) Stock Prep', unit: 'STOCK_PREP', group: 'Group 2', status: 'Outsourcing (Os)', isHelper: true },

  // --- OPERATOR STOCK PREPARATION (SP) GROUP 3 ---
  { id: 'sp-g3-1', name: 'Deni Trirosadi', role: 'Operator Utama Stock Prep', unit: 'STOCK_PREP', group: 'Group 3', status: 'Organik', isHelper: false },
  { id: 'sp-g3-2', name: 'Siswanto', role: 'Operator Stock Prep', unit: 'STOCK_PREP', group: 'Group 3', status: 'Organik', isHelper: false },
  { id: 'sp-g3-3', name: 'Halimi', role: 'Operator Stock Prep', unit: 'STOCK_PREP', group: 'Group 3', status: 'Organik', isHelper: false },
  { id: 'sp-g3-4', name: 'Hisbulloh', role: 'Operator Stock Prep', unit: 'STOCK_PREP', group: 'Group 3', status: 'Organik', isHelper: false },
  { id: 'sp-g3-5', name: 'Nurzaman', role: 'Pembantu Operator (Helper) Stock Prep', unit: 'STOCK_PREP', group: 'Group 3', status: 'Organik', isHelper: true },

  // --- OPERATOR PAPER MACHINE (PM) GROUP 1 ---
  { id: 'pm-g1-1', name: 'Rozi Dwi S', role: 'Operator Utama Mesin PM', unit: 'PM1', group: 'Group 1', status: 'Organik', isHelper: false },
  { id: 'pm-g1-2', name: 'Agus Saputra', role: 'Operator Mesin PM', unit: 'PM1', group: 'Group 1', status: 'Organik', isHelper: false },
  { id: 'pm-g1-3', name: 'Bambang JH', role: 'Operator Mesin PM / Wakil', unit: 'PM5', group: 'Group 1', status: 'Organik', isHelper: false },
  { id: 'pm-g1-4', name: 'Warsito', role: 'Operator Mesin PM / Wakil', unit: 'PM5', group: 'Group 1', status: 'Organik', isHelper: false },
  { id: 'pm-g1-5', name: 'Topik', role: 'Pembantu Operator (Helper) Mesin PM', unit: 'PM1', group: 'Group 1', status: 'Organik', isHelper: true },
  { id: 'pm-g1-6', name: 'Sapei', role: 'Pembantu Operator (Helper) Mesin PM', unit: 'PM1', group: 'Group 1', status: 'Organik', isHelper: true },

  // --- OPERATOR PAPER MACHINE (PM) GROUP 2 ---
  { id: 'pm-g2-1', name: 'Yulianto', role: 'Operator Utama Mesin PM', unit: 'PM2', group: 'Group 2', status: 'Organik', isHelper: false },
  { id: 'pm-g2-2', name: 'Lukmanajudin', role: 'Operator Mesin PM', unit: 'PM2', group: 'Group 2', status: 'Organik', isHelper: false },
  { id: 'pm-g2-3', name: 'Dedi Apandi', role: 'Operator Mesin PM', unit: 'PM2', group: 'Group 2', status: 'Organik', isHelper: false },
  { id: 'pm-g2-4', name: 'Sadelih', role: 'Operator Mesin PM', unit: 'PM2', group: 'Group 2', status: 'Organik', isHelper: false },
  { id: 'pm-g2-5', name: 'Faqiih F (Os)', role: 'Pembantu Operator (Helper) Mesin PM', unit: 'PM2', group: 'Group 2', status: 'Outsourcing (Os)', isHelper: true },
  { id: 'pm-g2-6', name: 'M Zulkifli (Os)', role: 'Pembantu Operator (Helper) Mesin PM', unit: 'PM2', group: 'Group 2', status: 'Outsourcing (Os)', isHelper: true },

  // --- OPERATOR PAPER MACHINE (PM) GROUP 3 ---
  { id: 'pm-g3-1', name: 'Agusmanto (Os)', role: 'Operator Utama Mesin PM', unit: 'PM5', group: 'Group 3', status: 'Outsourcing (Os)', isHelper: false },
  { id: 'pm-g3-2', name: 'Tulus Setyono', role: 'Operator Mesin PM', unit: 'PM5', group: 'Group 3', status: 'Organik', isHelper: false },
  { id: 'pm-g3-3', name: 'Piih Samboja', role: 'Operator Mesin PM / Wakil', unit: 'PM1', group: 'Group 3', status: 'Organik', isHelper: false },
  { id: 'pm-g3-4', name: 'Dodi R Irawan', role: 'Operator Mesin PM', unit: 'PM5', group: 'Group 3', status: 'Organik', isHelper: false },
  { id: 'pm-g3-5', name: 'Arif Nurhidayat', role: 'Operator Mesin PM', unit: 'PM5', group: 'Group 3', status: 'Organik', isHelper: false },
  { id: 'pm-g3-6', name: 'Reza Pahlevi (Os)', role: 'Pembantu Operator (Helper) Mesin PM', unit: 'PM5', group: 'Group 3', status: 'Outsourcing (Os)', isHelper: true },

  // --- OPERATOR REWINDER GROUP 1 ---
  { id: 'rew-g1-1', name: 'Slamet P', role: 'Operator Utama Rewinder', unit: 'REWINDER', group: 'Group 1', status: 'Organik', isHelper: false },
  { id: 'rew-g1-2', name: 'Salim . B', role: 'Operator Rewinder', unit: 'REWINDER', group: 'Group 1', status: 'Organik', isHelper: false },
  { id: 'rew-g1-3', name: 'Rohman/maman', role: 'Operator Rewinder', unit: 'REWINDER', group: 'Group 1', status: 'Organik', isHelper: false },
  { id: 'rew-g1-4', name: 'Maryanto', role: 'Operator Rewinder', unit: 'REWINDER', group: 'Group 1', status: 'Organik', isHelper: false },
  { id: 'rew-g1-5', name: 'Aditya P (Os)', role: 'Pembantu Operator (Helper) Rewinder', unit: 'REWINDER', group: 'Group 1', status: 'Outsourcing (Os)', isHelper: true },
  { id: 'rew-g1-6', name: 'Andi Yuli (Os)', role: 'Pembantu Operator (Helper) Rewinder', unit: 'REWINDER', group: 'Group 1', status: 'Outsourcing (Os)', isHelper: true },
  { id: 'rew-g1-7', name: 'Heri Saputra (Os)', role: 'Pembantu Operator (Helper) Rewinder', unit: 'REWINDER', group: 'Group 1', status: 'Outsourcing (Os)', isHelper: true },

  // --- OPERATOR REWINDER GROUP 2 ---
  { id: 'rew-g2-1', name: 'Hendrik Jk', role: 'Operator Utama Rewinder', unit: 'REWINDER', group: 'Group 2', status: 'Organik', isHelper: false },
  { id: 'rew-g2-2', name: 'Dodi', role: 'Operator Rewinder', unit: 'REWINDER', group: 'Group 2', status: 'Organik', isHelper: false },
  { id: 'rew-g2-3', name: 'Sudarman', role: 'Operator Rewinder', unit: 'REWINDER', group: 'Group 2', status: 'Organik', isHelper: false },
  { id: 'rew-g2-4', name: 'Dedi Aris F (Os)', role: 'Pembantu Operator (Helper) Rewinder', unit: 'REWINDER', group: 'Group 2', status: 'Outsourcing (Os)', isHelper: true },
  { id: 'rew-g2-5', name: 'Bustomi', role: 'Operator Rewinder', unit: 'REWINDER', group: 'Group 2', status: 'Organik', isHelper: false },
  { id: 'rew-g2-6', name: 'Hamim', role: 'Operator Rewinder', unit: 'REWINDER', group: 'Group 2', status: 'Organik', isHelper: false },
  { id: 'rew-g2-7', name: 'Ramdani Rizki (Os)', role: 'Pembantu Operator (Helper) Rewinder', unit: 'REWINDER', group: 'Group 2', status: 'Outsourcing (Os)', isHelper: true },

  // --- OPERATOR REWINDER GROUP 3 ---
  { id: 'rew-g3-1', name: 'M. Ikbal . R', role: 'Operator Utama Rewinder', unit: 'REWINDER', group: 'Group 3', status: 'Organik', isHelper: false },
  { id: 'rew-g3-2', name: 'Sutisna', role: 'Operator Rewinder', unit: 'REWINDER', group: 'Group 3', status: 'Organik', isHelper: false },
  { id: 'rew-g3-3', name: 'Indra', role: 'Operator Rewinder', unit: 'REWINDER', group: 'Group 3', status: 'Organik', isHelper: false },
  { id: 'rew-g3-4', name: 'Andri Apandi', role: 'Operator Rewinder', unit: 'REWINDER', group: 'Group 3', status: 'Organik', isHelper: false },
  { id: 'rew-g3-5', name: 'Didin . S', role: 'Operator Rewinder', unit: 'REWINDER', group: 'Group 3', status: 'Organik', isHelper: false },
  { id: 'rew-g3-6', name: 'Eman', role: 'Pembantu Operator (Helper) Rewinder', unit: 'REWINDER', group: 'Group 3', status: 'Organik', isHelper: true },

  // --- OPERATOR PULPER ---
  { id: 'pulp-1', name: 'Asman', role: 'Operator Utama Pulper', unit: 'PULPER', group: 'Group 1', status: 'Organik', isHelper: false },
  { id: 'pulp-2', name: 'Sutejo (Os)', role: 'Pembantu Operator (Helper) Pulper', unit: 'PULPER', group: 'Group 1', status: 'Outsourcing (Os)', isHelper: true },
  { id: 'pulp-3', name: 'Adnan', role: 'Operator Pulper', unit: 'PULPER', group: 'Group 2', status: 'Organik', isHelper: false },
  { id: 'pulp-4', name: 'Ruli Rosidi', role: 'Operator Pulper', unit: 'PULPER', group: 'Group 2', status: 'Organik', isHelper: false },
  { id: 'pulp-5', name: 'Surya Handi (Os)', role: 'Pembantu Operator (Helper) Pulper', unit: 'PULPER', group: 'Group 2', status: 'Outsourcing (Os)', isHelper: true },
  { id: 'pulp-6', name: 'Mulyadi', role: 'Operator Pulper', unit: 'PULPER', group: 'Group 3', status: 'Organik', isHelper: false },
  { id: 'pulp-7', name: 'Waris Sunandar (Os)', role: 'Pembantu Operator (Helper) Pulper', unit: 'PULPER', group: 'Group 3', status: 'Outsourcing (Os)', isHelper: true },
  { id: 'pulp-8', name: 'Agus Angggara (Os)', role: 'Pembantu Operator (Helper) Pulper', unit: 'PULPER', group: 'Group 3', status: 'Outsourcing (Os)', isHelper: true },

  // --- OPERATOR BOILER ---
  { id: 'boil-1', name: 'M Fadli A', role: 'Operator Utama Boiler', unit: 'BOILER', group: 'Group 1', status: 'Organik', isHelper: false },
  { id: 'boil-2', name: 'Agus Fitriyana', role: 'Operator Boiler', unit: 'BOILER', group: 'Group 2', status: 'Organik', isHelper: false },
  { id: 'boil-3', name: 'Peri Riyadi (Helper)', role: 'Pembantu Operator (Helper) Boiler', unit: 'BOILER', group: 'Group 3', status: 'Helper', isHelper: true, notes: 'Helper operasional boiler, handling bahan bakar, softening water, & pembuangan abu.' }
];

// =========================================================================
// 2. DESKRIPSI PEKERJAAN (JOB DESCRIPTION) DETAIL DAN LENGKAP
// =========================================================================

export const PUP_JOB_DESCRIPTIONS: JobDescriptionDetail[] = [
  // 1. KEPALA PABRIK & JUMBO ROLL DIV. HEAD
  {
    id: 'jd-kepala-pabrik',
    roleKey: 'KEPALA_PABRIK',
    title: 'Kepala Pabrik / Jumbo Roll Div. Head',
    level: 'Pimpinan Divisi',
    department: 'Divisi Produksi Pabrik & Jumbo Roll',
    reportsTo: 'Direksi / Managing Director PT. PUP',
    supervises: 'Kepala PM 1, Kepala PM 2, Kepala PM 5, Kepala Boiler, Adm. JR',
    personnelNames: ['Kelik Heriyono'],
    summary: 'Memimpin, merencanakan, mengarahkan, dan mengevaluasi seluruh kegiatan pabrik kertas PT. PUP agar mencapai target kapasitas tonase Jumbo Roll dengan biaya produksi optimal, kualitas terstandar ISO, efisiensi energi, dan zero accident K3.',
    coreResponsibilities: [
      'Menetapkan strategi produksi bulanan dan tahunan untuk seluruh lini mesin (PM1, PM2, PM5, Rewinder, Boiler, dan Stock Prep).',
      'Memastikan tercapainya target kapasitas output total pabrik dengan kualitas Grade A ≥ 92%.',
      'Mengawasi efisiensi biaya operasional (OPEX), konsumsi uap boiler, pemakaian listrik spesifik (kWh/Ton), dan pemakaian kimia (PEO, Starch, Sizing).',
      'Menyetujui jadwal perawatan tahunan (Annual Major Overhaul), shut down mesin periodik, dan rencana investasi teknologi.',
      'Menegakkan budaya keselamatan kerja (K3), kesehatan kerja, dan kepatuhan lingkungan hidup (IPAL/WWT).'
    ],
    dailyTasks: [
      {
        phase: 'Fase 1: Pra-Shift & Inspeksi Kesiapan (30 Menit Awal)',
        tasks: [
          'Memimpin Morning Production Briefing bersama Kepala PM1, PM2, PM5, Kepala Boiler, dan Adm. JR.',
          'Mengkaji ringkasan laporan hasil produksi 24 jam terakhir dari Adm. JR (tonase, broke %, OEE, downtime).'
        ]
      },
      {
        phase: 'Fase 2: Operasional Berjalan & Pengendalian Kualitas (Inti Shift)',
        tasks: [
          'Melakukan plant walk-through (Gemba Walk) ke area Stock Prep, Forming Wire, Press, Dryer, Rewinder, dan Boiler.',
          'Mengambil keputusan strategis jika terjadi downtime kritis > 60 menit atau kegagalan utilitas boiler/listrik.',
          'Memastikan sinkronisasi pesanan marketing dengan jadwal giliran produksi (paper grade run).'
        ]
      },
      {
        phase: 'Fase 3: Handover, Administrasi & 5S (30 Menit Akhir)',
        tasks: [
          'Meninjau rekapitulasi pencapaian harian dan menandatangani otorisasi laporan produksi resmi.',
          'Memberikan arahan perbaikan preventif untuk shift malam dan penugasan khusus regu standby.'
        ]
      }
    ],
    authorityLimits: {
      canDo: [
        'Menghentikan jalannya mesin secara darurat jika terjadi kondisi bahaya fatal K3 atau kerusakan mesin berat.',
        'Mengubah urutan jadwal produksi kertas (grade run schedule) demi efisiensi delivery order.',
        'Memberikan sanksi atau penghargaan kedisiplinan dan kinerja kepada seluruh personel produksi.'
      ],
      mustEscalate: [
        'Pengeluaran modal (CAPEX) di luar anggaran tahunan yang telah disetujui Direksi.',
        'Perubahan harga jual produk jumbo roll atau komitmen kontrak bahan baku jangka panjang.'
      ]
    },
    kpis: [
      { indicator: 'Pencapaian Target Tonase Pabrik', target: '≥ 98% dari Rencana Kerja', impact: 'Kelancaran pengiriman Jumbo Roll ke pelanggan' },
      { indicator: 'Persentase Kualitas Grade A', target: '≥ 92% Total Produksi', impact: 'Profit margin dan kepuasan pasar industri' },
      { indicator: 'Tingkat Kecelakaan Kerja (Lost Time Injury)', target: '0 Kasus (Zero Accident)', impact: 'Perlindungan jiwa dan reputasi pabrik' },
      { indicator: 'Konsumsi Steam Spesifik Boiler', target: '≤ 1.8 Ton Steam / Ton Kertas', impact: 'Efisiensi biaya bahan bakar batu bara/biomassa' }
    ],
    k3SafetyRequirements: [
      'Wajib mengenakan APD lengkap (Safety Helmet, Safety Shoes, Rompi Reflektor, Kacamata Pelindung) saat inspeksi lapangan.',
      'Memastikan seluruh mesin memiliki pelindung putaran (safety guard) dan tombol Emergency Stop berfungsi 100%.'
    ],
    coordinationWorkflow: 'Berkoordinasi harian dengan Direksi, Kepala PM 1/2/5, Kepala Boiler, Bagian Gudang/Logistik, dan Quality Control.',
    applicableMachines: ['PM1', 'PM2', 'PM5', 'REWINDER', 'STOCK_PREP', 'BOILER']
  },

  // 2. ADM. JUMBO ROLL (ADM. JR)
  {
    id: 'jd-adm-jr',
    roleKey: 'ADM_JR',
    title: 'Adm. JR (Administrasi Jumbo Roll)',
    level: 'Administrasi',
    department: 'Administrasi & Data Produksi Jumbo Roll',
    reportsTo: 'Kelik Heriyono (Jumbo Roll Div. Head)',
    supervises: 'Data entry shift operator',
    personnelNames: ['Fiqih Saputra'],
    summary: 'Bertanggung jawab penuh atas keakuratan pencatatan data produksi, verifikasi laporan shift PM1, PM2, PM5, dan Rewinder, inventarisasi jumbo roll, surat jalan pengiriman, serta integrasi pelaporan shift digital.',
    coreResponsibilities: [
      'Memverifikasi dan mengonsolidasi seluruh laporan shift (Shift 1, 2, 3) dari seluruh lini PM dan Rewinder.',
      'Mencatat bobot netto (Kg), jumlah reel, diameter, gramatur (gsm), dan grade mutu (A, B, C, Defect) ke dalam master database.',
      'Menerbitkan nomor seri label Jumbo Roll dan memantau stok fisik roll di gudang penampungan sementara.',
      'Menyusun laporan harian (Daily Production Report) sebelum jam 08.30 pagi untuk pimpinan.',
      'Memantau kepatuhan pengisian form laporan shift online dan arsip bukti serah terima shift.'
    ],
    dailyTasks: [
      {
        phase: 'Fase 1: Pra-Shift & Inspeksi Kesiapan (30 Menit Awal)',
        tasks: [
          'Mengunduh dan memeriksa kelengkapan data shift malam (Shift 3) dari form pelaporan digital.',
          'Mencocokkan jumlah rol yang dilaporkan operator dengan data timbangan jembatan/crane scale.'
        ]
      },
      {
        phase: 'Fase 2: Operasional Berjalan & Pengendalian Kualitas (Inti Shift)',
        tasks: [
          'Menginput data hasil slitting rewinder dan mutasi rol dari lantai produksi ke area packing/gudang.',
          'Menyajikan data pencapaian target per jam untuk bahan evaluasi Kepala Pabrik.',
          'Menerbitkan dokumen jalan (Delivery Note) dan surat serah terima jumbo roll siap kirim.'
        ]
      },
      {
        phase: 'Fase 3: Handover, Administrasi & 5S (30 Menit Akhir)',
        tasks: [
          'Membuat rekapitulasi harian tonase aktual vs target, rata-rata moisture, caliper, dan waktu downtime.',
          'Mengirimkan ringkasan laporan produksi via portal sistem dan arsip dokumen resmi.'
        ]
      }
    ],
    authorityLimits: {
      canDo: [
        'Menolak laporan shift yang datanya tidak konsisten atau belum diverifikasi oleh Operator Utama/Karu.',
        'Menginstruksikan penimbangan ulang jika terdapat selisih bobot roll > 1.5% terhadap data teoritis.'
      ],
      mustEscalate: [
        'Koreksi data produksi yang telah ditutup (closing report) tanpa persetujuan Kepala Pabrik.',
        'Penolakan klaim kualitas dari bagian finishing/pelanggan.'
      ]
    },
    kpis: [
      { indicator: 'Ketepatan Waktu Penerbitan Laporan Harian', target: '100% sebelum Pukul 08:30 WIB', impact: 'Kecepatan pengambilan keputusan pimpinan' },
      { indicator: 'Akurasi Rekonsiliasi Data Tonase', target: '99.8% Selisih Nol', impact: 'Integritas data stok dan audit akuntansi' }
    ],
    k3SafetyRequirements: [
      'Memakai sepatu safety dan rompi saat memverifikasi nomor seri roll di lantai produksi atau gudang transit.',
      'Mematuhi batas jalur pejalan kaki hijau (green walk line) terhindar dari lalu lintas forklift.'
    ],
    coordinationWorkflow: 'Berkoordinasi langsung dengan Operator Utama PM, Operator Rewinder, Foreman, QC Lab, dan Bagian Pengiriman.',
    applicableMachines: ['PM1', 'PM2', 'PM5', 'REWINDER']
  },

  // 3. KEPALA PM 1, PM 2, PM 5 (UNIT HEAD)
  {
    id: 'jd-kepala-pm',
    roleKey: 'KEPALA_PM',
    title: 'Kepala Unit Paper Machine (PM 1 / PM 2 / PM 5)',
    level: 'Kepala Unit / Wakil',
    department: 'Seksi Produksi Mesin Kertas (PM)',
    reportsTo: 'Kelik Heriyono (Kepala Pabrik)',
    supervises: 'Wakil 1, Wakil 2, Operator Utama PM, Pembantu Operator PM',
    personnelNames: ['Untung S (PM1)', 'Rumawan (PM2)', 'Suwardi (PM5)'],
    summary: 'Memimpin operasional unit mesin kertas yang dipimpinnya secara teknis dan operasional untuk menghasilkan lembaran kertas sesuai spesifikasi gramatur, kelancaran formasi web, efisiensi energi uap, serta meminimalkan break sheet.',
    coreResponsibilities: [
      'Menjamin tercapainya target produksi harian per unit mesin (PM1: 40 Ton, PM2: 62 Ton, PM5: 110 Ton / hari).',
      'Mengawasi kepatuhan parameter kritis: Speed 100-150 MPM, Tekanan Yankee 1-3 BAR, konsistensi headbox 0.25-0.40%, dan kelembapan 6-8%.',
      'Mengatur rotasi kerja, disiplin regu, dan kompetensi operator utama serta pembantu operator.',
      'Melakukan troubleshooting teknis pada formasi wire, dewatering press, silinder pengering, dan kalender.',
      'Menyetujui penggantian kawat (wire), kain kempa (felt), serta bilah doctor blade.'
    ],
    dailyTasks: [
      {
        phase: 'Fase 1: Pra-Shift & Inspeksi Kesiapan (30 Menit Awal)',
        tasks: [
          'Memeriksa status operasional mesin, kondisi kain felt (kondisi pori & kebersihan), dan ketajaman doctor blade.',
          'Memberikan arahan teknis kepada Wakil 1, Wakil 2, dan Operator Utama terkait target grade kertas hari ini.'
        ]
      },
      {
        phase: 'Fase 2: Operasional Berjalan & Pengendalian Kualitas (Inti Shift)',
        tasks: [
          'Memantau kestabilan kurva basis weight (gsm) dan moisture profile melintang (CD profile).',
          'Menginvestigasi akar masalah jika terjadi kertas putus (sheet break) berulang lebih dari 2 kali per shift.',
          'Memastikan koordinasi pasokan bubur dari Stock Prep memiliki derajat freeness (°SR) sesuai resep standar.'
        ]
      },
      {
        phase: 'Fase 3: Handover, Administrasi & 5S (30 Menit Akhir)',
        tasks: [
          'Memeriksa dan menandatangani lembar serah terima shift beserta catatan handover operator.',
          'Memastikan seluruh sisa broke kertas di pit bawah telah dialirkan ke pulper kembali dan area bersih.'
        ]
      }
    ],
    authorityLimits: {
      canDo: [
        'Mengatur setpoint kecepatan mesin (MPM) dan rasio draw antar seksi mesin sesuai kondisi lembaran.',
        'Menginstruksikan pencucian felt atau penggantian doctor blade saat terjadi penurunan kualitas kertas.',
        'Menugaskan pembantu operator (helper) untuk memperkuat titik kritis saat restart mesin.'
      ],
      mustEscalate: [
        'Modifikasi konstruksi mekanikal atau elektrikal mesin di luar spesifikasi pabrik pembuat.',
        'Pemberhentian produksi total terjadwal (emergency shut down) yang berdampak ke seluruh pabrik.'
      ]
    },
    kpis: [
      { indicator: 'OEE (Overall Equipment Effectiveness) PM', target: '≥ 85%', impact: 'Pemanfaatan aset mesin maksimal' },
      { indicator: 'Frekuensi Kertas Putus (Sheet Break)', target: '≤ 2 Kejadian / Shift', impact: 'Meminimalkan broke dan kehilangan tonase' },
      { indicator: 'Kesesuaian Gramatur & Moisture', target: 'CPK ≥ 1.33', impact: 'Keseragaman kualitas produk jadi' }
    ],
    k3SafetyRequirements: [
      'Wajib memastikan tombol Emergency Wire/Press/Reel berfungsi sempurna dan mudah dijangkau.',
      'Melarang personil mendekati nip roll yang berputar tanpa mematikan mesin atau mengaktifkan pengaman.'
    ],
    coordinationWorkflow: 'Berkoordinasi erat dengan Kepala Stock Prep, Kepala Boiler, Foreman Rewinder, QC, dan Tim Mekanik/Listrik.',
    applicableMachines: ['PM1', 'PM2', 'PM5']
  },

  // 4. WAKIL 1 & WAKIL 2 KEPALA PM (FOREMAN / KARU)
  {
    id: 'jd-wakil-kepala-pm',
    roleKey: 'WAKIL_KEPALA_PM',
    title: 'Wakil Kepala PM / Kepala Regu (Karu PM)',
    level: 'Kepala Unit / Wakil',
    department: 'Seksi Produksi Mesin Kertas (PM)',
    reportsTo: 'Kepala PM masing-masing unit',
    supervises: 'Operator Utama PM, Operator Pembantu (Helper) PM pada regunya',
    personnelNames: [
      'Sarino (Wakil 1 PM1)', 'Piih Samboja (Wakil 2 PM1)',
      'CANDRA S (Wakil 1 PM2)', 'Lukman A (Wakil 2 PM2)',
      'Bambang JH (Wakil 1 PM5)', 'Warsito (Wakil 2 PM5)'
    ],
    summary: 'Bertindak sebagai penanggung jawab lapangan langsung per regu kerja untuk memastikan pelaksanaan SOP produksi, pembagian tugas operator dan helper, kecepatan respon penanganan kertas putus, dan kedisiplinan 5S.',
    coreResponsibilities: [
      'Memimpin operasional lapangan regu shift (Group 1 / 2 / 3) pada lini PM1, PM2, atau PM5.',
      'Membagi tugas spesifik kepada Operator Utama dan Pembantu Operator (Helper) di area Wire, Press, Dryer, dan Reel.',
      'Memeriksa hasil uji laboratorium per reel (GSM, Caliper, Tensile, Moisture) dan melakukan penyesuaian setpoint.',
      'Mengawasi proses penarikan kertas saat putus (threading kertas) agar berlangsung cepat (< 10 menit).',
      'Mengisi dan memvalidasi Laporan Shift sebelum diserahkan ke Kepala PM dan Adm. JR.'
    ],
    dailyTasks: [
      {
        phase: 'Fase 1: Pra-Shift & Inspeksi Kesiapan (30 Menit Awal)',
        tasks: [
          'Melakukan serah terima langsung (handover tatap muka) dengan Karu shift sebelumnya di ruang kontrol.',
          'Memeriksa log book kerusakan, kondisi kanvas pengering, semprotan shower air pencuci felt, dan stok core reel.',
          'Melaksanakan Tool Box Meeting 5 menit dengan seluruh kru shift termasuk Helper.'
        ]
      },
      {
        phase: 'Fase 2: Operasional Berjalan & Pengendalian Kualitas (Inti Shift)',
        tasks: [
          'Memantau langsung pembentukan formasi lembaran pada wire dan keseragaman penyemprotan bubur.',
          'Mengontrol tekanan uap pada silinder Yankee (1 - 3 BAR) dan suhu silinder dryer.',
          'Mengarahkan Helper saat pembersihan broke di pit atau saat pergantian reel kertas penuh.'
        ]
      },
      {
        phase: 'Fase 3: Handover, Administrasi & 5S (30 Menit Akhir)',
        tasks: [
          'Memastikan seluruh rol yang dihasilkan telah ditimbang, ditempel label identitas, dan dicatat di form digital.',
          'Menginspeksi kebersihan area kerja (5S) bersama seluruh anggota regu sebelum serah terima.'
        ]
      }
    ],
    authorityLimits: {
      canDo: [
        'Menyesuaikan aliran valve bubur dan rasio chemical aid (PEO/defoamer) demi kestabilan lembaran.',
        'Mengatur istirahat bergilir anggota regu tanpa menghentikan jalannya mesin.',
        'Memberikan peringatan langsung kepada anggota yang mengabaikan prosedur K3.'
      ],
      mustEscalate: [
        'Kondisi kertas putus > 30 menit tanpa diketahui penyebab pastinya.',
        'Kecelakaan kerja atau kerusakan komponen kritis seperti bearing utama Yankee atau robeknya felt.'
      ]
    },
    kpis: [
      { indicator: 'Downtime Penanganan Kertas Putus', target: 'Rata-rata ≤ 12 Menit / Kejadian', impact: 'Produktivitas shift terjaga' },
      { indicator: 'Kelengkapan dan Akurasi Laporan Shift', target: '100% Terisi Benar & Lengkap', impact: 'Integritas pelaporan pabrik' }
    ],
    k3SafetyRequirements: [
      'Memastikan APD earplug, kacamata, dan sepatu safety digunakan seluruh regu kerja.',
      'Memimpin prosedur Lock-Out Tag-Out (LOTO) sebelum anggota masuk ke bawah pit mesin.'
    ],
    coordinationWorkflow: 'Koordinasi langsung dengan Karu Stock Prep, Karu Rewinder, Operator Boiler, QC Inspector, dan Maintenance on-duty.',
    applicableMachines: ['PM1', 'PM2', 'PM5']
  },

  // 5. KEPALA BOILER (UTILITY HEAD)
  {
    id: 'jd-kepala-boiler',
    roleKey: 'KEPALA_BOILER',
    title: 'Kepala Boiler',
    level: 'Kepala Unit / Wakil',
    department: 'Unit Utilitas & Pembangkit Uap (Boiler)',
    reportsTo: 'Kelik Heriyono (Kepala Pabrik)',
    supervises: 'Operator Utama Boiler, Operator Boiler, Pembantu Operator (Helper) Boiler',
    personnelNames: ['YANA ANDRIYANA'],
    summary: 'Bertanggung jawab atas pasokan uap kering (saturated dry steam) yang stabil, aman, dan efisien untuk kebutuhan silinder pengering PM1, PM2, dan PM5 dengan menjaga keandalan bejana tekan berstandar K3 Kemenaker.',
    coreResponsibilities: [
      'Memastikan ketersediaan uap steam dengan tekanan output header 6 - 8 BAR secara kontinu 24 jam nonstop.',
      'Mengawasi kualitas air umpan boiler (Feedwater) dengan parameter pH 8.5-10.5, TDS < 2500 ppm, dan Hardness 0 ppm.',
      'Mengatur ketersediaan dan efisiensi pembakaran bahan bakar (batu bara/cangkang/biomassa).',
      'Menjadwalkan pembersihan jelaga pipa api (soot blowing), pengurasan lumpur berkala (blowdown), dan kalibrasi safety valve.',
      'Memastikan kepatuhan terhadap regulasi keselamatan bejana uap dan emisi cerobong lingkungan.'
    ],
    dailyTasks: [
      {
        phase: 'Fase 1: Pra-Shift & Inspeksi Kesiapan (30 Menit Awal)',
        tasks: [
          'Memeriksa ketersediaan stok bahan bakar di bunker dan tangki air umpan (feedwater tank).',
          'Memeriksa hasil uji kualitas air laboratorium (Hardness, Silica, Dissolved Oxygen, pH).'
        ]
      },
      {
        phase: 'Fase 2: Operasional Berjalan & Pengendalian Kualitas (Inti Shift)',
        tasks: [
          'Memantau tekanan uap pada jalur distribusi ke PM1, PM2, dan PM5 agar tidak mengalami drop tekanan saat beban puncak.',
          'Mengawasi rasio udara-bahan bakar (air-fuel ratio) untuk pembakaran sempurna tanpa asap hitam.',
          'Menginstruksikan Helper Boiler dalam pembersihan abu sisa pembakaran dan regenerasi softener.'
        ]
      },
      {
        phase: 'Fase 3: Handover, Administrasi & 5S (30 Menit Akhir)',
        tasks: [
          'Mencatat konsumsi tonase bahan bakar dan total uap yang dihasilkan untuk menghitung efisiensi evaporasi.',
          'Menyerahkan instruksi operasional untuk shift malam dan penanganan abu.'
        ]
      }
    ],
    authorityLimits: {
      canDo: [
        'Menghentikan supply uap darurat jika terjadi kebocoran pipa bertekanan tinggi yang membahayakan personil.',
        'Mengatur laju blowdown untuk menjaga kadar TDS air boiler dalam batas aman.'
      ],
      mustEscalate: [
        'Kebutuhan shut down total untuk inspeksi tahunan Disnaker.',
        'Penurunan kualitas air tanah yang membutuhkan penggantian media resin demineralisasi total.'
      ]
    },
    kpis: [
      { indicator: 'Kestabilan Tekanan Header Uap', target: '≥ 98% waktu berada di 6.5 - 7.5 BAR', impact: 'Kecepatan pengeringan kertas stabil' },
      { indicator: 'Kejadian Low Water Emergency', target: '0 Kasus', impact: 'Pencegahan ledakan boiler' }
    ],
    k3SafetyRequirements: [
      'Wajib helm pengaman, kacamata google tahan panas, sarung tangan kulit tahan panas, dan masker respirator partikulat debu.',
      'Memastikan sertifikasi SIO (Surat Izin Operasi) juru las dan operator boiler selalu aktif.'
    ],
    coordinationWorkflow: 'Koordinasi langsung dengan Kepala Pabrik, Kepala PM 1/2/5, Maintenance Listrik/Instrumen, dan Vendor Bahan Bakar.',
    applicableMachines: ['BOILER']
  },

  // 6. OPERATOR UTAMA PAPER MACHINE (PM 1, PM 2, PM 5)
  {
    id: 'jd-operator-utama-pm',
    roleKey: 'OPERATOR_UTAMA_PM',
    title: 'Operator Utama Mesin Kertas (PM 1 / PM 2 / PM 5)',
    level: 'Operator Utama',
    department: 'Seksi Produksi Mesin Kertas (PM)',
    reportsTo: 'Wakil Kepala PM / Karu',
    supervises: 'Pembantu Operator (Helper) Mesin PM',
    personnelNames: [
      'Rozi Dwi S (PM1 G1)', 'Agus Saputra (PM1 G1)',
      'Yulianto (PM2 G2)', 'Lukmanajudin (PM2 G2)', 'Dedi Apandi (PM2 G2)', 'Sadelih (PM2 G2)',
      'Agusmanto (Os) (PM5 G3)', 'Tulus Setyono (PM5 G3)', 'Dodi R Irawan (PM5 G3)', 'Arif Nurhidayat (PM5 G3)'
    ],
    summary: 'Mengoperasikan panel kontrol dan mekanikal mesin kertas (Wire, Press, Dryer, Reel) untuk mengubah suspensi bubur kertas menjadi gulungan lembaran kertas jumbo roll sesuai gramatur, ketebalan, dan kualitas standar.',
    coreResponsibilities: [
      'Mengoperasikan mesin kertas pada rentang kecepatan standar 100 - 150 MPM dan tekanan Yankee 1 - 3 BAR.',
      'Mengontrol debit slice lip headbox untuk pemerataan gramatur melintang (CD profile) dan membujur (MD profile).',
      'Memantau dewatering di forming section dan vacum suction box agar lembaran memasuki press dalam kondisi padat.',
      'Melakukan web threading menggunakan tali penarik atau udara bertekanan saat penyambungan lembaran kertas putus.',
      'Mengendalikan pope reel drum saat penggulungan kertas menjadi jumbo roll tanpa cacat kerut atau selip.',
      'Menginput data hasil shift (tonase aktual, grade, defect, downtime) ke dalam form pelaporan digital.'
    ],
    dailyTasks: [
      {
        phase: 'Fase 1: Pra-Shift & Inspeksi Kesiapan (30 Menit Awal)',
        tasks: [
          'Memeriksa kebersihan wire, kondisi permukaan silinder dryer, tekanan pneumatik press roll, dan level oli pelumas.',
          'Memeriksa konsistensi bubur masukan dari machine chest (standar 2.8 - 3.2%).',
          'Mengatur target gramatur dan kecepatan mesin sesuai jadwal produksi shift.'
        ]
      },
      {
        phase: 'Fase 2: Operasional Berjalan & Pengendalian Kualitas (Inti Shift)',
        tasks: [
          'Memantau jalannya lembaran kertas kontinu dari wire menuju felt press dan silinder pengering.',
          'Mengambil contoh sampel kertas per reel untuk uji gramatur basah/kering dan ketebalan mikron.',
          'Mengarahkan Pembantu Operator (Helper) PM untuk pembersihan broke di kolong mesin dan pemasangan core reel baru.'
        ]
      },
      {
        phase: 'Fase 3: Handover, Administrasi & 5S (30 Menit Akhir)',
        tasks: [
          'Mengisi laporan shift di aplikasi dengan lengkap (tonase reel, waktu henti, catatan handover).',
          'Melakukan serah terima langsung dengan operator utama shift pengganti mengenai kondisi felt dan dryer.'
        ]
      }
    ],
    authorityLimits: {
      canDo: [
        'Menyesuaikan kecepatan mesin (± 5 MPM) untuk menjaga kekeringan kertas.',
        'Menghentikan putaran reel drum jika gulungan mengalami kerut parah (heavy wrinkle).'
      ],
      mustEscalate: [
        'Kertas putus berulang lebih dari 2 kali berturut-turut tanpa diketahui penyebabnya.',
        'Suhu bearing dryer melebihi 90°C atau kebocoran steam rotari joint.'
      ]
    },
    kpis: [
      { indicator: 'Pencapaian Target Tonase Shift', target: '≥ 95% dari Target Rencana', impact: 'Kelancaran kuota produksi' },
      { indicator: 'Rasio Broke Kertas', target: '≤ 4.5% dari Total Output', impact: 'Penghematan bahan baku dan energi' }
    ],
    k3SafetyRequirements: [
      'Wajib menggunakan sarung tangan tahan panas saat menyambung kertas di silinder dryer.',
      'Dilarang membersihkan roll berputar dengan kain lap manual saat mesin sedang berjalan kencang.'
    ],
    coordinationWorkflow: 'Berkoordinasi terus-menerus dengan Operator Stock Prep, Operator Rewinder, Helper PM, dan Karu Shift.',
    applicableMachines: ['PM1', 'PM2', 'PM5']
  },

  // 7. PEMBANTU OPERATOR (HELPER) PAPER MACHINE (PM 1, PM 2, PM 5) -- POSISI BARU LENGKAP
  {
    id: 'jd-helper-pm',
    roleKey: 'PEMBANTU_OPERATOR_PM',
    title: 'Pembantu Operator (Helper) Mesin Kertas (PM 1 / PM 2 / PM 5)',
    level: 'Pembantu Operator (Helper)',
    department: 'Seksi Produksi Mesin Kertas (PM)',
    reportsTo: 'Operator Utama Mesin PM & Wakil Kepala PM / Karu',
    supervises: 'Tidak ada',
    personnelNames: [
      'Topik (PM1 G1)', 'Sapei (PM1 G1)',
      'Faqiih F (Os) (PM2 G2)', 'M Zulkifli (Os) (PM2 G2)',
      'Reza Pahlevi (Os) (PM5 G3)', 'Personel Pembantu Lini PM'
    ],
    summary: 'Membantu Operator Utama PM dalam kelancaran fisik proses produksi lembaran kertas, penanganan broke kertas tumpah di kolong mesin, penyiapan spool/core reel, bantuan threading saat kertas putus, pemantauan visual mekanikal, dan penegakan kebersihan 5S area mesin.',
    coreResponsibilities: [
      'Membersihkan dan mengumpulkan broke kertas dari pit bawah wire section, press section, dan dryer section secara berkala.',
      'Memasukkan broke kertas ke dalam broke pulper atau konveyor agar tidak menumpuk dan memicu bahaya kebakaran/kemacetan.',
      'Menyiapkan spool reel (poros penggulung) drum kosong, memasang core karton baru, dan menempelkan double-tape perekat.',
      'Membantu Operator Utama dalam proses web threading (melewatkan ujung kertas) saat mesin start atau setelah kertas putus.',
      'Memantau kebersihan shower spray pencuci kain kempa (felt) dan kawat (wire) agar nosel tidak tersumbat serat kertas.',
      'Melakukan inspeksi visual rutin terhadap kebocoran oli, suhu bearing (secara visual/sentuh aman), dan getaran tidak wajar.',
      'Menjaga kebersihan lantai kerja (5S) bebas dari tumpahan bubur basah, air kondensat, dan ceceran pelumas.'
    ],
    dailyTasks: [
      {
        phase: 'Fase 1: Pra-Shift & Inspeksi Kesiapan (30 Menit Awal)',
        tasks: [
          'Memeriksa dan membersihkan pit bawah dryer dan press dari sisa potongan kertas shift sebelumnya.',
          'Menyiapkan minimal 3 batang poros spool reel kosong dengan core karton yang sudah terpasang rapi dan rekat.',
          'Memastikan selang udara bertekanan (air blow hose) dan tali penarik kertas siap digunakan di posisinya.'
        ]
      },
      {
        phase: 'Fase 2: Operasional Berjalan & Pengendalian Kualitas (Inti Shift)',
        tasks: [
          'Sigap berdiri di dekat area reel dan dryer saat terjadi aba-aba kertas putus untuk membantu membuang broke.',
          'Membantu mengarahkan ujung kertas masuk ke nip calender atau drum reel dengan pengarah udara aman.',
          'Membantu proses pergantian gulungan kertas penuh (turnover reel) dan menempelkan tanda nomor urut reel.',
          'Membersihkan kerak debu kertas di sekitar doctor blade dryer dengan sikat bergagang panjang berpelindung.'
        ]
      },
      {
        phase: 'Fase 3: Handover, Administrasi & 5S (30 Menit Akhir)',
        tasks: [
          'Menyapu dan mengepel area lantai wet end dan dry end mesin kertas dari tumpahan cairan dan serpihan kertas.',
          'Menyerahkan alat kerja (cutter safety, pengukur meteran, sarung tangan) ke rak peralatan regu pengganti.'
        ]
      }
    ],
    authorityLimits: {
      canDo: [
        'Mengalirkan sisa kertas broke di kolong mesin ke broke chest menggunakan pompa/konveyor pengaduk.',
        'Mengambil tindakan darurat menekan tombol Emergency Stop jika melihat ada personil terjepit atau benda asing masuk ke roll.'
      ],
      mustEscalate: [
        'Dilarang mengubah setelan kecepatan mesin, tekanan hidrolik/pneumatik, atau membuka valve steam tanpa izin Operator Utama.',
        'Wajib segera melaporkan jika menemukan kebocoran uap steam, percikan api, atau bau hangus pada komponen mesin.'
      ]
    },
    kpis: [
      { indicator: 'Kecepatan Penyiapan Core Spool Reel', target: '100% Selalu Siap Sebelum Roll Penuh', impact: 'Mencegah delay turnover reel' },
      { indicator: 'Waktu Bersih Broke Kertas di Pit', target: '< 10 Menit Setelah Kertas Putus Normal', impact: 'Mencegah penumpukan dan kebakaran' },
      { indicator: 'Skor Audit 5S Area Mesin PM', target: '≥ 90 Poin (Bersih & Rapi)', impact: 'Kenyamanan dan keselamatan kerja' }
    ],
    k3SafetyRequirements: [
      'Wajib menggunakan APD lengkap: Safety Helmet, Safety Shoes anti-slip, Kacamata, Earplug, dan Sarung Tangan kerja.',
      'Dilarang keras melangkah atau melompat di atas broke pit yang sedang berputar tanpa jembatan penyeberangan berpagar.',
      'Gunakan pisau potong bersarung pelindung (Safety Utility Knife) saat memotong lembaran kertas broke.'
    ],
    coordinationWorkflow: 'Bekerja bahu-membahu dengan Operator Utama PM, Operator Pulper Broke, Helper Rewinder, dan di bawah komando Karu.',
    applicableMachines: ['PM1', 'PM2', 'PM5']
  },

  // 8. OPERATOR UTAMA STOCK PREPARATION (SP)
  {
    id: 'jd-operator-utama-sp',
    roleKey: 'OPERATOR_UTAMA_SP',
    title: 'Operator Utama Stock Preparation (SP)',
    level: 'Operator Utama',
    department: 'Seksi Penyiapan Bubur Kertas (Stock Prep)',
    reportsTo: 'Wakil Kepala PM / Karu & Kepala Unit PM',
    supervises: 'Operator Stock Prep, Pembantu Operator (Helper) Stock Prep',
    personnelNames: [
      'Dahlan (SP G1)', 'Dwi Indrayanto (SP G1)', 'Didik Ditia P (SP G1)', 'Sumedi (SP G1)',
      'BP Tampubolon (SP G2)', 'Haerul Anwar (SP G2)', 'Sidik Pramono (SP G2)', 'Abd Hamid (SP G2)',
      'Deni Trirosadi (SP G3)', 'Siswanto (SP G3)', 'Halimi (SP G3)', 'Hisbulloh (SP G3)'
    ],
    summary: 'Bertanggung jawab penuh atas pemrosesan bubur serat daur ulang (OCC/Broke/Virgin Pulp) melalui pembersihan High Density Cleaner (HDC), penyaringan kasar/halus (Screening), pemekatan (Thickening), penggilingan serat (Double Disc Refiner), serta stabilitas dosing kimia PEO (17-19 Cps) menuju mesin kertas.',
    coreResponsibilities: [
      'Mengatur kontinuitas pasokan bubur dari chest penampungan menuju Machine Chest dan Headbox mesin kertas.',
      'Mengendalikan derajat giling serat (°SR / Schopper-Riegler freeness) pada refiner DDR sesuai grade kertas (CM: 35-40 °SR, Tissue: 30-34 °SR).',
      'Memantau konsistensi bubur pada setiap tahapan (HDC: 3.5-4.5%, Refiner: 3.8-4.2%, Machine Chest: 2.8-3.2%).',
      'Mengawasi injeksi larutan kimia PEO dengan viskositas standar 17 - 19 Cps untuk retensi serat dan formasi lembaran prima.',
      'Memastikan pembuangan kontaminan pada High Density Cleaner (HDC) Junk Trap berjalan periodik setiap 1 - 2 jam.'
    ],
    dailyTasks: [
      {
        phase: 'Fase 1: Pra-Shift & Inspeksi Kesiapan (30 Menit Awal)',
        tasks: [
          'Memeriksa ketersediaan level isi bubur di High Density Tower, Mixing Chest, dan Machine Chest.',
          'Mengecek viskositas larutan PEO di tangki dosing (harus 17 - 19 Cps, bening tanpa gumpalan fish eye).',
          'Memeriksa arus ampere motor refiner dan tekanan diferensial (Delta P) pada basket screen.'
        ]
      },
      {
        phase: 'Fase 2: Operasional Berjalan & Pengendalian Kualitas (Inti Shift)',
        tasks: [
          'Melakukan pengujian derajat freeness (°SR) bubur dari refiner setiap 2 jam menggunakan freeness tester.',
          'Mengawasi dan mengarahkan Pembantu Operator (Helper) SP dalam siklus 5 langkah pembersihan Junk Trap HDC.',
          'Menjaga rasio pencampuran bahan baku (karton bekas, virgin pulp, dan broke kembali) sesuai resep pabrik.'
        ]
      },
      {
        phase: 'Fase 3: Handover, Administrasi & 5S (30 Menit Akhir)',
        tasks: [
          'Mencatat total pemakaian bahan kimia (PEO kg, Starch kg, Sizing agent liter) dan jam jalan refiner di log sheet.',
          'Melakukan serah terima kondisi chest dan sisa bahan kimia ke operator utama shift berikutnya.'
        ]
      }
    ],
    authorityLimits: {
      canDo: [
        'Mengatur celah disc refiner (mikrometer) untuk menaikkan atau menurunkan derajat kehalusan serat (°SR).',
        'Menyesuaikan dosis pompa kimia PEO atau defoamer saat busa (foam) di chest meningkat.'
      ],
      mustEscalate: [
        'Penyumbatan total pada basket screen atau kenaikan tekanan mendadak > 1.5 Bar pada screen feed.',
        'Kehabisan stok bahan kimia PEO atau bahan baku pulp di gudang transit.'
      ]
    },
    kpis: [
      { indicator: 'Kesesuaian Derajat Freeness (°SR)', target: '≥ 95% dalam batas toleransi ±2 °SR', impact: 'Kekuatan tarik dan daya drainase kertas' },
      { indicator: 'Kestabilan Viskositas PEO', target: '100% pada 17 - 19 Cps', impact: 'Formasi lembaran merata tanpa flock' }
    ],
    k3SafetyRequirements: [
      'Wajib menggunakan pelindung mata dan sarung tangan karet saat menangani bahan kimia pekat.',
      'Memastikan lantai platform Stock Prep tidak licin akibat ceceran bubur atau larutan polimer.'
    ],
    coordinationWorkflow: 'Koordinasi langsung dengan Operator Pulper, Operator Utama PM, Laboratorium QC, dan Karu Shift.',
    applicableMachines: ['STOCK_PREP']
  },

  // 9. PEMBANTU OPERATOR (HELPER) STOCK PREPARATION (SP) -- POSISI BARU LENGKAP
  {
    id: 'jd-helper-sp',
    roleKey: 'PEMBANTU_OPERATOR_SP',
    title: 'Pembantu Operator (Helper) Stock Preparation (SP)',
    level: 'Pembantu Operator (Helper)',
    department: 'Seksi Penyiapan Bubur Kertas (Stock Prep)',
    reportsTo: 'Operator Utama Stock Prep & Karu Shift',
    supervises: 'Tidak ada',
    personnelNames: [
      'Sunarman (SP G1)',
      'M. Nuranggi (Os) (SP G2)',
      'Nurzaman (SP G3)',
      'Personel Helper Lini Stock Prep'
    ],
    summary: 'Membantu Operator Utama Stock Prep dalam eksekusi fisik pembuangan kotoran berat pada High Density Cleaner (Junk Trap), pembersihan saringan getar (Reject Sorter), pelarutan bahan kimia PEO standar 17-19 Cps, pengambilan sampel uji freeness, dan kebersihan 5S area instalasi bubur.',
    coreResponsibilities: [
      'Mengeksekusi siklus 5 langkah pembersihan Junk Trap High Density Cleaner (HDC) secara teratur setiap 1-2 jam.',
      'Membersihkan tali kawat dan plastik yang terkumpul pada ragger line / reject separator.',
      'Membantu penimbangan bubuk polimer PEO dan pengadukan dengan air hangat sesuai prosedur anti-fish eye.',
      'Mengambil sampel bubur dari pipa discharge refiner dan chest untuk dibawa ke pos pengujian laboratorium.',
      'Membersihkan basket reject screen dan wadah sludge sisa buangan kontaminan dari serpihan besi, plastik, dan pasir.',
      'Membilas lantai kerja dan parit pembuangan dari endapan bubur kertas agar tidak membusuk dan berbau.',
      'Memeriksa visual seal air pendingin pompa bubur dan level oli gearbox agitator tangki chest.'
    ],
    dailyTasks: [
      {
        phase: 'Fase 1: Pra-Shift & Inspeksi Kesiapan (30 Menit Awal)',
        tasks: [
          'Memeriksa kesiapan bak penampung kotoran Junk Trap dan memastikan keran pembilas air bertekanan normal.',
          'Mengecek ketersediaan bahan kimia PEO bubuk di ruang penyimpanan harian.',
          'Membersihkan saringan kawat getar (vibration screen) dari kerak kotoran sisa shift sebelumnya.'
        ]
      },
      {
        phase: 'Fase 2: Operasional Berjalan & Pengendalian Kualitas (Inti Shift)',
        tasks: [
          'Menjalankan urutan pembuangan Junk Trap: Tutup Valve Atas -> Buka Valve Bilas -> Buka Valve Pembuangan -> Bilas Bersih -> Isi Air Penuh -> Normalisasi.',
          'Membantu menimbang bubuk PEO dengan timbangan presisi dan memasukkan ke dalam eductor hopper pelarut.',
          'Mengambil sampel bubur 1 liter setiap 2 jam untuk pengukuran freeness (°SR) oleh operator utama.',
          'Membuang kotoran pasir, paku, klip, dan plastik ke dalam bak sampah B3/non-B3 yang telah disediakan.'
        ]
      },
      {
        phase: 'Fase 3: Handover, Administrasi & 5S (30 Menit Akhir)',
        tasks: [
          'Mencuci lantai platform Stock Prep dengan semprotan air bersih bertekanan sedang.',
          'Menginformasikan kepada Helper shift pengganti jumlah siklus Junk Trap yang telah dijalankan dan sisa larutan kimia.'
        ]
      }
    ],
    authorityLimits: {
      canDo: [
        'Membuka dan menutup valve manual pembuangan kotoran Junk Trap sesuai siklus SOP terstandar.',
        'Menambah air pembilas pada parit limbah untuk mencegah pembekuan serat di saluran drainase.'
      ],
      mustEscalate: [
        'Dilarang mengubah celah pisau refiner atau mengubah setpoint flow meter kimia tanpa instruksi Operator Utama.',
        'Wajib melapor jika menemukan bau menyengat atau pompa berbunyi kavitasi/bising berlebihan.'
      ]
    },
    kpis: [
      { indicator: 'Kepatuhan Siklus Pembersihan Junk Trap', target: '100% Tepat Waktu Setiap 1-2 Jam', impact: 'Mencegah lolosnya pasir perusak kawat mesin kertas' },
      { indicator: 'Ketepatan Pelarutan PEO', target: 'Viskositas 17 - 19 Cps Tanpa Gumpalan', impact: 'Retensi serat dan efisiensi konsumsi kimia' }
    ],
    k3SafetyRequirements: [
      'Wajib kacamata pelindung (safety goggles), sarung tangan karet kimia tebal, dan masker saat mencampur bubuk PEO.',
      'Waspada lantai basah licin; gunakan sepatu boot safety sol karet anti-slip di seluruh area Stock Prep.'
    ],
    coordinationWorkflow: 'Berkoordinasi langsung dengan Operator Utama Stock Prep, Helper Pulper, dan Helper Mesin PM.',
    applicableMachines: ['STOCK_PREP']
  },

  // 10. OPERATOR UTAMA REWINDER (FINISHING)
  {
    id: 'jd-operator-utama-rewinder',
    roleKey: 'OPERATOR_UTAMA_REWINDER',
    title: 'Operator Utama Rewinder (Finishing Jumbo Roll)',
    level: 'Operator Utama',
    department: 'Seksi Pemotongan & Finishing Kertas (Rewinder)',
    reportsTo: 'Wakil Kepala PM / Karu & Jumbo Roll Div. Head',
    supervises: 'Operator Rewinder, Pembantu Operator (Helper) Rewinder',
    personnelNames: [
      'Slamet P (Rewin G1)', 'Salim . B (Rewin G1)', 'Rohman/maman (Rewin G1)', 'Maryanto (Rewin G1)',
      'Hendrik Jk (Rewin G2)', 'Dodi (Rewin G2)', 'Sudarman (Rewin G2)', 'Bustomi (Rewin G2)', 'Hamim (Rewin G2)',
      'M. Ikbal . R (Rewin G3)', 'Sutisna (Rewin G3)', 'Indra (Rewin G3)', 'Andri Apandi (Rewin G3)', 'Didin . S (Rewin G3)'
    ],
    summary: 'Bertanggung jawab memotong, membelah (slitting), dan menggulung kembali lembaran kertas dari Jumbo Roll menjadi roll-roll jadi sesuai pesanan pelanggan (lebar, diameter, kekencangan gulungan) dengan potongan tepi bersih tanpa cacat telescoping.',
    coreResponsibilities: [
      'Mengoperasikan mesin slitter rewinder berkecepatan tinggi sesuai ukuran potong pesanan (sheet cutting schedule).',
      'Mengatur jarak pisau pemotong (slitter knives) atas dan bawah dengan presisi milimeter.',
      'Mengendalikan kurva tensi lembaran kertas (tension control) dan kurva tekanan rider roll untuk mencegah cacat telescoping atau pecah.',
      'Memeriksa kualitas permukaan kertas: mendeteksi kerut, bintik noda, variasi ketebalan, dan cacat tepi.',
      'Memastikan pembuangan sisa trim tepi kertas (edge trim) ditarik sempurna oleh blower penghisap.',
      'Mencatat nomor seri roll, gramatur, panjang meter, berat netto, dan status grade mutu di buku log dan sistem.'
    ],
    dailyTasks: [
      {
        phase: 'Fase 1: Pra-Shift & Inspeksi Kesiapan (30 Menit Awal)',
        tasks: [
          'Memeriksa ketajaman pisau pemotong bulat (top & bottom slitter) dan mengganti pisau yang tumpul atau rompal.',
          'Mengecek fungsi sensor keamanan tirai inframerah (optical safety guard) dan tombol rem darurat.',
          'Melihat jadwal pemotongan (cutting plan) ukuran lebar rol yang diinstruksikan oleh Adm. JR.'
        ]
      },
      {
        phase: 'Fase 2: Operasional Berjalan & Pengendalian Kualitas (Inti Shift)',
        tasks: [
          'Mengarahkan Helper saat menaikkan jumbo roll dari lantai ke stand unwind menggunakan overhead crane hoist.',
          'Menyelaraskan web kertas melalui spreader roll untuk meratakan lembaran sebelum bilah pisau.',
          'Memantau proses pemotongan dan gulungan pada kecepatan nominal hingga diameter target tercapai.'
        ]
      },
      {
        phase: 'Fase 3: Handover, Administrasi & 5S (30 Menit Akhir)',
        tasks: [
          'Memverifikasi seluruh roll jadi telah ditempel barcode / label identitas produksi lengkap.',
          'Menginput data tonase rewinder ke sistem dan menyerahkan catatan sisa roll ke operator shift berikutnya.'
        ]
      }
    ],
    authorityLimits: {
      canDo: [
        'Menghentikan proses rewind jika menemukan sobekan kertas atau cacat permukaan berat dari mesin PM.',
        'Mengganti bilah pisau slitter jika hasil potongan tepi kasar atau berbulu (rough edge).'
      ],
      mustEscalate: [
        'Roll kertas mengalami telescoping massal akibat ketidakrataan caliper bawaan dari mesin PM.',
        'Kerusakan sistem rem pneumatik atau pengendali tensi otomatis load cell.'
      ]
    },
    kpis: [
      { indicator: 'Pencapaian Tonase Slitting Rewinder', target: '≥ 95% dari Rencana Produksi', impact: 'Kesiapan pengiriman ke pelanggan' },
      { indicator: 'Persentase Reject Cacat Rewind', target: '≤ 1.2% (Telescoping/Kerut)', impact: 'Efisiensi yield bahan jadi' }
    ],
    k3SafetyRequirements: [
      'Dilarang menyentuh lembaran kertas atau pisau saat poros rewind berputar kencang (> 300 MPM).',
      'Wajib mengunci pengaman poros rewind sebelum mengoperasikan penurun rol hidrolik.'
    ],
    coordinationWorkflow: 'Koordinasi langsung dengan Operator Utama PM, Adm. JR, Helper Rewinder, QC Inspector, dan Petugas Forklift.',
    applicableMachines: ['REWINDER']
  },

  // 11. PEMBANTU OPERATOR (HELPER) REWINDER -- POSISI BARU LENGKAP
  {
    id: 'jd-helper-rewinder',
    roleKey: 'PEMBANTU_OPERATOR_REWINDER',
    title: 'Pembantu Operator (Helper) Rewinder',
    level: 'Pembantu Operator (Helper)',
    department: 'Seksi Pemotongan & Finishing Kertas (Rewinder)',
    reportsTo: 'Operator Utama Rewinder & Karu Shift',
    supervises: 'Tidak ada',
    personnelNames: [
      'Aditya P (Os) (Rewin G1)', 'Andi Yuli (Os) (Rewin G1)', 'Heri Saputra (Os) (Rewin G1)',
      'Dedi Aris F (Os) (Rewin G2)', 'Ramdani Rizki (Os) (Rewin G2)',
      'Eman (Rewin G3)', 'Personel Helper Lini Rewinder'
    ],
    summary: 'Membantu Operator Utama Rewinder dalam bongkar-muat jumbo roll dengan crane hoist, penyiapan dan pemasangan core karton baru, penyambungan ujung kertas (splicing), penanganan trim tepi sisa potong, penimbangan, pelabelan, wrapping plastik, dan 5S area finishing.',
    coreResponsibilities: [
      'Membantu pemasangan tali sling / hook crane pada poros jumbo roll untuk dipindahkan ke dudukan unwind stand.',
      'Memotong pipa core karton sesuai ukuran lebar potongan pesanan dan memasangnya ke rewind air shaft.',
      'Mengisi tekanan angin pada air shaft pengunci core dengan pistol udara bertekanan.',
      'Menempelkan double-tape atau lem perekat pada core untuk penarikan awal kertas dari unwind.',
      'Menangani sisa potongan tepi (edge trim) dan memastikan blower hisap trim bekerja tanpa tersumbat.',
      'Membantu menurunkan roll yang telah selesai digulung ke meja ejector hidrolik lantai.',
      'Menimbang roll kertas jadi di atas timbangan digital lantai dan mencatat bobot nettonya.',
      'Menempelkan stiker label identitas resmi pabrik PT. PUP (Nomor Roll, Gramatur, Lebar, Berat, Shift, Tanggal).',
      'Melakukan pembungkusan pelindung (wrapping plastik/kertas kraft pembungkus) roll sebelum dipindahkan forklift.'
    ],
    dailyTasks: [
      {
        phase: 'Fase 1: Pra-Shift & Inspeksi Kesiapan (30 Menit Awal)',
        tasks: [
          'Menyiapkan persediaan pipa core karton potong dengan panjang sesuai schedule pemotongan hari ini.',
          'Memeriksa fungsi timbangan lantai digital dan printer stiker label identitas jumbo roll.',
          'Membersihkan saluran pipa hisap edge trim dari sumbatan sisa kertas lilitan.'
        ]
      },
      {
        phase: 'Fase 2: Operasional Berjalan & Pengendalian Kualitas (Inti Shift)',
        tasks: [
          'Memandu pergerakan crane hoist saat menaikkan rol jumbo besar dengan aba-aba tangan standar keselamatan.',
          'Memasang core karton ke shaft pengembang, memompa pentil udara air shaft hingga terkunci kokoh.',
          'Membantu menarik ujung lembaran kertas melintasi pisau pemotong menuju poros core dengan rapi.',
          'Segera memindahkan roll jadi yang keluar dari meja hidrolik, menimbang, dan menempelkan label identitas.',
          'Melapisi bagian luar roll dengan plastik stretch film atau kertas pelindung benturan.'
        ]
      },
      {
        phase: 'Fase 3: Handover, Administrasi & 5S (30 Menit Akhir)',
        tasks: [
          'Mengumpulkan sisa trim potongan kertas dan memasukkannya ke gerobak broke untuk dibawa ke pulper.',
          'Menyapu lantai sekitar mesin rewinder dari debu serat kertas dan sisa isolasi perekat.'
        ]
      }
    ],
    authorityLimits: {
      canDo: [
        'Mengoperasikan crane hoist pengangkat rol setelah memastikan area lintasan bersih dari orang.',
        'Menempelkan label roll dan menandai roll cacat dengan pita merah atas instruksi Operator Utama.'
      ],
      mustEscalate: [
        'Dilarang mengubah posisi pisau slitter atau kecepatan mesin rewinder tanpa izin Operator Utama.',
        'Wajib segera menghentikan crane jika sling rantai/sabuk webbing menunjukkan tanda aus atau serat sobek.'
      ]
    },
    kpis: [
      { indicator: 'Kecepatan Penyiapan Core & Splicing', target: '< 6 Menit per Siklus Pergantian Roll', impact: 'Efisiensi waktu siklus rewinder' },
      { indicator: 'Kerapian dan Akurasi Pelabelan Roll', target: '100% Label Sesuai Berat Timbangan', impact: 'Mencegah salah kirim produk ke pelanggan' }
    ],
    k3SafetyRequirements: [
      'Wajib menggunakan sepatu safety berpelindung baja (steel toe) dan helm pelindung kepala saat di bawah lintasan crane.',
      'Dilarang berdiri di bawah beban gulungan kertas yang sedang tergantung pada tali crane hoist.',
      'Gunakan sarung tangan bintik katun saat menangani ujung kertas tajam untuk menghindari luka gores (paper cut).'
    ],
    coordinationWorkflow: 'Bekerja bersama Operator Utama Rewinder, Operator Forklift, Helper Mesin PM, dan Adm. JR.',
    applicableMachines: ['REWINDER']
  },

  // 12. OPERATOR UTAMA PULPER
  {
    id: 'jd-operator-utama-pulper',
    roleKey: 'OPERATOR_UTAMA_PULPER',
    title: 'Operator Utama Hydrapulper',
    level: 'Operator Utama',
    department: 'Seksi Penyiapan Bahan Baku & Pulper',
    reportsTo: 'Wakil Kepala PM / Karu & Kepala Unit PM',
    supervises: 'Operator Pulper, Pembantu Operator (Helper) Pulper',
    personnelNames: [
      'Asman (Pulper G1)', 'Adnan (Pulper G2)', 'Ruli Rosidi (Pulper G2)', 'Mulyadi (Pulper G3)'
    ],
    summary: 'Bertanggung jawab atas pengoperasian Hydrapulper (kontinu / batch) untuk menghancurkan bahan baku kertas bekas (OCC, Duplex, Waste Paper) dan pulp lembaran menjadi suspensi bubur serat siap olah dengan konsistensi 4.0 - 5.5%.',
    coreResponsibilities: [
      'Mengatur formula pencampuran bale bahan baku dan air proses (white water) sesuai resep tiap batch.',
      'Mengoperasikan konveyor pengumpan (apron conveyor) dan putaran rotor hydrapulper.',
      'Mengontrol waktu pengadukan (slushing time) agar serat terurai sempurna tanpa pemborosan energi listrik.',
      'Mengendalikan ragger rope (tali pengait kawat/plastik) untuk menarik kotoran puntiran keluar bejana pulper.',
      'Memantau konsistensi bubur keluaran pulper (target 4.0 - 5.5%) sebelum dipompa ke High Density Cleaner.',
      'Mencatat jumlah batch pulper, tonase bahan baku terpakai, dan jam operasi pengaduk di form laporan.'
    ],
    dailyTasks: [
      {
        phase: 'Fase 1: Pra-Shift & Inspeksi Kesiapan (30 Menit Awal)',
        tasks: [
          'Memeriksa kondisi rotor blade pulper, saringan bawah (extraction plate), dan level air tangki white water.',
          'Melihat ketersediaan tumpukan bale kertas bekas di area staging penyuapan konveyor.'
        ]
      },
      {
        phase: 'Fase 2: Operasional Berjalan & Pengendalian Kualitas (Inti Shift)',
        tasks: [
          'Mengatur takaran air dan mengarahkan Helper dalam memasukkan bale kertas ke atas konveyor berjalan.',
          'Memantau beban arus ampere motor penggerak rotor agar tidak overload saat bale dimasukkan.',
          'Mengoperasikan pompa transfer bubur dari bak pulper menuju dump chest setelah proses defibering selesai.'
        ]
      },
      {
        phase: 'Fase 3: Handover, Administrasi & 5S (30 Menit Akhir)',
        tasks: [
          'Memeriksa dan membersihkan tali ragger rope dari bejana pulper.',
          'Mencatat total bale yang dimasukkan dan jam operasi di form pelaporan shift.'
        ]
      }
    ],
    authorityLimits: {
      canDo: [
        'Menghentikan konveyor pengumpan jika melihat kontaminan logam besar atau kayu masuk ke bibir bejana pulper.',
        'Menambah waktu pengadukan jika bubur masih banyak mengandung serpihan kertas yang belum hancur (flakes).'
      ],
      mustEscalate: [
        'Tersumbatnya pelat saringan ekstraksi pulper oleh kawat lilitan yang membutuhkan pengurasan bejana.',
        'Kenaikan arus listrik motor pulper melebihi batas aman trip (overload alarm).'
      ]
    },
    kpis: [
      { indicator: 'Kapasitas Batch Pulper per Jam', target: '≥ 4 Batch / Jam (Sesuai Kebutuhan PM)', impact: 'Kelancaran pasokan bubur pabrik' },
      { indicator: 'Keseragaman Konsistensi Pulper', target: '4.5% ± 0.5%', impact: 'Kinerja pembersihan High Density Cleaner' }
    ],
    k3SafetyRequirements: [
      'Wajib menggunakan pelindung telinga (earmuff/earplug) di dekat suara gemuruh motor rotor pulper.',
      'Dilarang menaiki bibir bejana pulper saat rotor sedang berputar kencang.'
    ],
    coordinationWorkflow: 'Koordinasi erat dengan Operator Stock Prep, Petugas Forklift Bahan Baku, Helper Pulper, dan Karu Shift.',
    applicableMachines: ['PULPER', 'STOCK_PREP']
  },

  // 13. PEMBANTU OPERATOR (HELPER) PULPER -- POSISI BARU LENGKAP
  {
    id: 'jd-helper-pulper',
    roleKey: 'PEMBANTU_OPERATOR_PULPER',
    title: 'Pembantu Operator (Helper) Hydrapulper',
    level: 'Pembantu Operator (Helper)',
    department: 'Seksi Penyiapan Bahan Baku & Pulper',
    reportsTo: 'Operator Utama Hydrapulper & Karu Shift',
    supervises: 'Tidak ada',
    personnelNames: [
      'Sutejo (Os)',
      'Surya Handi (Os)',
      'Waris Sunandar (Os)',
      'Agus Angggara (Os)',
      'Personel Helper Area Pulper'
    ],
    summary: 'Membantu Operator Utama Pulper dalam penyiapan bale bahan baku kertas bekas, pemotongan kawat pengikat bale, penyortiran kontaminan berbahaya, pemuatan ke konveyor, penarikan kawat ragger, dan pembersihan 5S area apron pulper.',
    coreResponsibilities: [
      'Memotong kawat pengikat bale kertas bekas menggunakan tang kawat potong baja khusus (safety bale wire cutter).',
      'Mengumpulkan dan menggulung kawat baja sisa potongan ke dalam wadah besi terpisah agar tidak membahayakan personil.',
      'Melakukan penyortiran awal untuk membuang kontaminan kasar (kayu gelondong, besi pelat, batu, plastik kemasan tebal).',
      'Menata dan mendorong bale kertas yang sudah bebas kawat ke atas konveyor pengumpan (apron conveyor).',
      'Membantu menarik tali kawat ragger rope saat pemotongan tali kotoran pulper menggunakan rope cutter.',
      'Mengoperasikan hand pallet atau mengarahkan forklift penyuap bahan baku dengan rambu pandu aman.',
      'Membersihkan ceceran kertas, plastik robekan, dan air di sekeliling lantai konveyor dan lantai bejana pulper.'
    ],
    dailyTasks: [
      {
        phase: 'Fase 1: Pra-Shift & Inspeksi Kesiapan (30 Menit Awal)',
        tasks: [
          'Memeriksa ketajaman alat pemotong kawat bale (wire cutter) dan ketersediaan sarung tangan kulit tebal anti-tusuk.',
          'Menyiapkan bak tempat penampungan gulungan kawat bekas potong di dekat apron conveyor.',
          'Membersihkan jalur konveyor berjalan dari benda penghambat atau serpihan plastik tersangkut.'
        ]
      },
      {
        phase: 'Fase 2: Operasional Berjalan & Pengendalian Kualitas (Inti Shift)',
        tasks: [
          'Memotong seluruh kawat pengikat bale satu per satu secara teliti tanpa menyisakan ujung kawat terselip.',
          'Membuang kotoran non-kertas berukuran besar yang terlihat di permukaan bale sebelum masuk bibir pulper.',
          'Mengawasi pergerakan bale di atas konveyor agar tidak terjadi penumpukan ganda yang dapat menyumbat pulper.',
          'Membantu menarik tali ragger kotoran dan memotongnya setiap panjang mencapai 1 meter.'
        ]
      },
      {
        phase: 'Fase 3: Handover, Administrasi & 5S (30 Menit Akhir)',
        tasks: [
          'Mengikat dan memindahkan karung limbah kawat baja ke tempat penampungan besi tua.',
          'Menyapu area lantai feeding dan menyemprot sisa remah bubur kering dengan selang air pembilas.'
        ]
      }
    ],
    authorityLimits: {
      canDo: [
        'Menghentikan konveyor pengumpan melalui tali emergency pull-cord jika melihat kawat pengikat belum terpotong sempurna.',
        'Menolak bale kertas bekas yang tercampur lumpur berat, abu, atau batu besar sebelum konfirmasi Operator Utama.'
      ],
      mustEscalate: [
        'Dilarang menghidupkan motor penggerak pulper tanpa perintah atau pengawasan Operator Utama.',
        'Wajib segera melapor jika tangan/kaki terkena goresan kawat berkarat untuk penanganan medis P3K tetanus.'
      ]
    },
    kpis: [
      { indicator: 'Kerapian Pemotongan Kawat Bale', target: '100% Kawat Terlepas dari Bahan Kertas', impact: 'Mencegah kerusakan rotor pulper dan impeller pompa' },
      { indicator: 'Kecepatan Pemuatan Bahan Baku ke Konveyor', target: 'Selalu Sesuai Ritme Siklus Batch', impact: 'Mencegah kekosongan pasokan bubur' }
    ],
    k3SafetyRequirements: [
      'Wajib mengenakan Sarung Tangan Kulit Tebal tahan tusukan kawat baja dan Kacamata Pelindung (Safety Goggles).',
      'Wajib mengenakan Helm Proyek dan Sepatu Safety bertutup baja (Steel Toe Shoes).',
      'Dilarang melintasi atau menginjak konveyor berjalan dalam kondisi apapun.'
    ],
    coordinationWorkflow: 'Berkoordinasi langsung dengan Operator Utama Pulper, Operator Forklift Bahan Baku, dan Helper Stock Prep.',
    applicableMachines: ['PULPER']
  },

  // 14. OPERATOR UTAMA BOILER
  {
    id: 'jd-operator-utama-boiler',
    roleKey: 'OPERATOR_UTAMA_BOILER',
    title: 'Operator Utama Boiler (Uap Tekan Industri)',
    level: 'Operator Utama',
    department: 'Unit Utilitas & Pembangkit Uap (Boiler)',
    reportsTo: 'Kepala Boiler (Yana Andriyana) & Karu Shift',
    supervises: 'Pembantu Operator (Helper) Boiler',
    personnelNames: [
      'M Fadli A (Boiler G1)', 'Agus Fitriyana (Boiler G2)'
    ],
    summary: 'Mengoperasikan panel kontrol, burner/furnace, dan sistem air umpan boiler untuk membangkitkan uap kering dengan tekanan konstan 6 - 8 BAR secara efisien, aman, dan tanpa kendala pasokan ke seluruh mesin kertas.',
    coreResponsibilities: [
      'Menjaga kestabilan tekanan uap pada steam distribution header di angka 6.5 - 7.5 BAR.',
      'Mengawasi level air dalam drum boiler agar selalu berada di posisi normal (sight glass level 40 - 60%).',
      'Mengatur sistem pembakaran (feeder bahan bakar, primary/secondary fan, induced draft fan) untuk efisiensi termal.',
      'Melakukan blowdown air boiler secara periodik sesuai rekomendasi nilai TDS dari laboratorium kimia.',
      'Mengoperasikan sistem water softener dan deaerator untuk membuang gas oksigen korosif dari air umpan.',
      'Mencatat data operasional per jam: tekanan steam, temperatur flue gas, konsumsi air m3, dan bahan bakar ton.'
    ],
    dailyTasks: [
      {
        phase: 'Fase 1: Pra-Shift & Inspeksi Kesiapan (30 Menit Awal)',
        tasks: [
          'Memeriksa gelas duga (water level sight glass), tekanan uap saat ini, dan status pompa air umpan (duty & standby).',
          'Menguji fungsi alarm tingkat air rendah (Low Water Cut-Off Alarm) bersama Karu/Kepala Boiler.',
          'Melihat ketersediaan pasokan bahan bakar di hopper dan ruang pembakaran.'
        ]
      },
      {
        phase: 'Fase 2: Operasional Berjalan & Pengendalian Kualitas (Inti Shift)',
        tasks: [
          'Menyesuaikan feeding laju bahan bakar saat mesin PM menaikkan kecepatan atau membutuhkan steam tambahan.',
          'Mengawasi jalannya blowdown permukaan (surface TDS blowdown) dan blowdown bawah (bottom mud blowdown).',
          'Mengarahkan Helper Boiler dalam pembuangan abu (bottom ash) dan pengisian garam regenerasi softener.'
        ]
      },
      {
        phase: 'Fase 3: Handover, Administrasi & 5S (30 Menit Akhir)',
        tasks: [
          'Mencatat total uap yang diekspor ke PM1, PM2, dan PM5 di log sheet resmi.',
          'Melakukan serah terima langsung mengenai kondisi burner dan kualitas feedwater ke operator shift pengganti.'
        ]
      }
    ],
    authorityLimits: {
      canDo: [
        'Melakukan blowdown darurat jika kadar TDS air boiler melonjak di atas batas kritis.',
        'Mengalihkan operasi ke pompa feedwater cadangan jika pompa utama mengalami getaran berlebih.'
      ],
      mustEscalate: [
        'Air dalam gelas duga hilang total (kondisi dry boiler) yang mewajibkan pemadaman api darurat.',
        'Kebocoran uap bertekanan tinggi pada sambungan pipa uap header.'
      ]
    },
    kpis: [
      { indicator: 'Kestabilan Tekanan Uap Header', target: '≥ 98% waktu di 6.5 - 7.5 BAR', impact: 'Pengeringan lembaran kertas stabil tanpa cacat basah' },
      { indicator: 'Kepatuhan Uji Safety Water Level', target: '100% Teruji per Shift', impact: 'Pencegahan risiko kecelakaan bejana uap' }
    ],
    k3SafetyRequirements: [
      'Wajib memiliki Sertifikat K3 Operator Boiler Kelas I / Kelas II dari Kemenaker.',
      'Menggunakan APD tahan panas lengkap saat memeriksa api intip (inspection sight hole).'
    ],
    coordinationWorkflow: 'Koordinasi terus-menerus dengan Kepala Boiler, Operator Utama PM1/2/5, Helper Boiler, dan QC Water Treatment.',
    applicableMachines: ['BOILER']
  },

  // 15. PEMBANTU OPERATOR (HELPER) BOILER -- POSISI EKSPLISIT DARI DOKUMEN & LENGKAP
  {
    id: 'jd-helper-boiler',
    roleKey: 'PEMBANTU_OPERATOR_BOILER',
    title: 'Pembantu Operator (Helper) Boiler',
    level: 'Pembantu Operator (Helper)',
    department: 'Unit Utilitas & Pembangkit Uap (Boiler)',
    reportsTo: 'Operator Utama Boiler & Kepala Boiler (Yana Andriyana)',
    supervises: 'Tidak ada',
    personnelNames: [
      'Peri Riyadi (Helper)',
      'Personel Helper Unit Boiler'
    ],
    summary: 'Membantu Operator Utama Boiler dalam kelancaran pengumpanan bahan bakar, pembuangan abu sisa pembakaran (bottom ash & fly ash), penyiapan garam NaCl untuk regenerasi water softener, pembersihan saringan pompa, dan kebersihan 5S ruang boiler.',
    coreResponsibilities: [
      'Memastikan aliran bahan bakar padat (batu bara / biomassa / cangkang) pada hopper feeder berjalan lancar tanpa penyumbatan.',
      'Membantu membersihkan kerak dan gumpalan bahan bakar yang tersangkut di corong pengumpan (feeding chute).',
      'Mengeluarkan dan mengangkut abu sisa pembakaran dari bak bawah furnace (bottom ash pit) ke bak penampungan abu basah.',
      'Menyiram abu panas dengan semprotan air pembasah agar debu tidak berterbangan ke udara dan tidak memicu kebakaran.',
      'Mengangkat dan memasukkan karung garam kristal (NaCl murni) ke dalam tangki regenerasi softener air umpan boiler.',
      'Membantu proses pengambilan sampel air boiler dan air umpan untuk keperluan analisis laboratorium kimia.',
      'Membantu membuka dan menutup valve pembilasan blowdown lumpur bawah drum atas instruksi Operator Utama.',
      'Menjaga kebersihan dan ketertiban area ruang boiler (lantai bebas debu tebal, parit bersih, jalan bebas hambatan).'
    ],
    dailyTasks: [
      {
        phase: 'Fase 1: Pra-Shift & Inspeksi Kesiapan (30 Menit Awal)',
        tasks: [
          'Memeriksa kecukupan stok bahan bakar di bunker harian dekat corong boiler.',
          'Mengecek level air garam di tangki brine regenerasi softener dan mengisi garam jika level rendah.',
          'Menyiapkan gerobak abu dan sekop pembuangan abu di area bawah tungku.'
        ]
      },
      {
        phase: 'Fase 2: Operasional Berjalan & Pengendalian Kualitas (Inti Shift)',
        tasks: [
          'Memantau corong feeding bahan bakar setiap 30 menit untuk mencegah terjadinya bridging / macet.',
          'Mengeluarkan abu panas dari tungku bawah ke dalam bak dorong, membasahi dengan air, dan memindahkan ke tempat pembuangan.',
          'Membantu memutar valve saat siklus backwash dan regenerasi filter pasir (sand filter) serta softener.',
          'Mengambil botol sampel air boiler dan mengantarkannya ke laboratorium kendali mutu.'
        ]
      },
      {
        phase: 'Fase 3: Handover, Administrasi & 5S (30 Menit Akhir)',
        tasks: [
          'Membersihkan sisa tumpahan bahan bakar dan debu di sekeliling lantai feeder dan tangga akses boiler.',
          'Melaporkan jumlah gerobak abu yang telah dibuang kepada Operator Utama untuk pencatatan efisiensi pembakaran.'
        ]
      }
    ],
    authorityLimits: {
      canDo: [
        'Mengurai sumbatan bahan bakar di corong menggunakan tongkat pengait non-percikan api (brass bar).',
        'Mengaktifkan keran air pendingin/pembasah abu panas di bak penampungan abu.'
      ],
      mustEscalate: [
        'Dilarang memutar valve steam utama, valve uap bypass, atau safety valve tanpa izin Operator Utama.',
        'Wajib segera memberitahukan Operator Utama jika melihat nyala api membara keluar dari pintu inspeksi atau ada kebocoran air boiler.'
      ]
    },
    kpis: [
      { indicator: 'Kelancaran Feeding Bahan Bakar', target: '0 Insiden Corong Tersumbat', impact: 'Mencegah penurunan mendadak tekanan uap' },
      { indicator: 'Ketepatan Penanganan Abu & Kerapian 5S', target: 'Bak Abu Terkuras Tuntas Setiap Shift', impact: 'Pencegahan penumpukan kerak dan debu partikulat' }
    ],
    k3SafetyRequirements: [
      'Wajib mengenakan Sarung Tangan Kulit Tahan Panas, Masker Pernapasan Partikulat (Respirator N95/FFP2), Helm, dan Kacamata Pelindung.',
      'Wajib mengenakan Sepatu Safety tahan panas sol tebal.',
      'Dilarang menyiram air dingin dalam volume besar ke dalam ruang bakar tungku yang masih membara merah karena dapat memicu semburan uap balik.'
    ],
    coordinationWorkflow: 'Bekerja bahu-membahu dengan Operator Utama Boiler, Tim Transportasi Bahan Bakar, dan Petugas Penanganan Limbah Abu.',
    applicableMachines: ['BOILER']
  }
];

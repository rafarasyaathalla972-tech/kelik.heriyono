export interface MatrixRole {
  id: string;
  shortCode: string;
  name: string;
  category: 'PIMPINAN' | 'KARU' | 'OPERATOR' | 'HELPER' | 'SUPPORT';
  badgeColor: string;
  description: string;
}

export interface ResponsibilityItem {
  id: string;
  area: 'STOCK_PREP' | 'WET_END' | 'DRY_END' | 'POPE_REEL' | 'REWINDER' | 'BOILER' | 'K3_SAFETY' | 'REPORTING';
  areaName: string;
  taskTitle: string;
  sopReference: string;
  criticalStandard: string;
  raci: {
    kepalaPabrik: 'R' | 'A' | 'C' | 'I';
    admJr: 'R' | 'A' | 'C' | 'I';
    kepalaPm: 'R' | 'A' | 'C' | 'I';
    karuShift: 'R' | 'A' | 'C' | 'I';
    operatorUtama: 'R' | 'A' | 'C' | 'I';
    helperOperator: 'R' | 'A' | 'C' | 'I';
    operatorRewinder: 'R' | 'A' | 'C' | 'I';
    helperRewinder: 'R' | 'A' | 'C' | 'I';
    operatorBoiler: 'R' | 'A' | 'C' | 'I';
    helperBoiler: 'R' | 'A' | 'C' | 'I';
  };
  operationalNotes: {
    helperDuties: string;
    operatorDuties: string;
    karuAccountability: string;
    k3Rule: string;
  };
}

export const MATRIX_ROLES: MatrixRole[] = [
  {
    id: 'kepalaPabrik',
    shortCode: 'KP',
    name: 'Kepala Pabrik',
    category: 'PIMPINAN',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    description: 'Kelik Heriyono - Penanggung jawab strategis operasional seluruh lini pabrik PT. PUP.'
  },
  {
    id: 'admJr',
    shortCode: 'ADM',
    name: 'Administrasi Jumbo Roll (Adm. JR)',
    category: 'SUPPORT',
    badgeColor: 'bg-slate-500/20 text-slate-300 border-slate-500/40',
    description: 'Fiqih Saputra - Rekapitulasi tonase harian, nomor roll, inventory, dan surat jalan.'
  },
  {
    id: 'kepalaPm',
    shortCode: 'KPM',
    name: 'Kepala PM 1, 2, 5 & Wakil',
    category: 'PIMPINAN',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    description: 'Untung S (PM1), Rumawan (PM2), Suwardi (PM5) - Pembina teknis lini mesin kertas.'
  },
  {
    id: 'karuShift',
    shortCode: 'KARU',
    name: 'Kepala Regu (Karu Shift)',
    category: 'KARU',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    description: 'Pemimpin operasional lapangan shift (Group 1, 2, 3), koordinasi tim dan verifikasi mutu.'
  },
  {
    id: 'operatorUtama',
    shortCode: 'OP_PM',
    name: 'Operator Utama Paper Machine',
    category: 'OPERATOR',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    description: 'Penanggung jawab eksekusi pembentukan kertas Wet End, Dryer Yankee, dan Pope Reel.'
  },
  {
    id: 'helperOperator',
    shortCode: 'HLP_PM',
    name: 'Pembantu Operator (Helper) PM',
    category: 'HELPER',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    description: 'Membantu persiapan spool, pembersihan U-box, pengawasan shower, dan 5S area mesin.'
  },
  {
    id: 'operatorRewinder',
    shortCode: 'OP_REW',
    name: 'Operator Utama Rewinder',
    category: 'OPERATOR',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    description: 'Penyetelan pisau slitter, banana roll, tensi gulungan, dan pengoperasian doffer.'
  },
  {
    id: 'helperRewinder',
    shortCode: 'HLP_REW',
    name: 'Pembantu Operator (Helper) Rewinder',
    category: 'HELPER',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    description: 'Pemasangan core pipa karton, penimbangan roll, labeling barcode, dan pembersihan serbuk trim.'
  },
  {
    id: 'operatorBoiler',
    shortCode: 'OP_BLR',
    name: 'Operator Utama Boiler',
    category: 'OPERATOR',
    badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    description: 'Pengendali tekanan steam uap 6.5-7.5 bar, level air gelas duga, dan kimia softener.'
  },
  {
    id: 'helperBoiler',
    shortCode: 'HLP_BLR',
    name: 'Pembantu Operator (Helper) Boiler',
    category: 'HELPER',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    description: 'Feeding bahan bakar, pengangkutan bottom ash, penyiraman debu abu basah, dan angkat garam NaCl.'
  }
];

export const RESPONSIBILITY_MATRIX_DATA: ResponsibilityItem[] = [
  // 1. STOCK PREPARATION
  {
    id: 'resp-sp-1',
    area: 'STOCK_PREP',
    areaName: 'Penyiapan Bubur (Stock Prep)',
    taskTitle: 'Siklus Pembuangan Kotoran Junk Trap High Density Cleaner (HDC)',
    sopReference: 'SOP-SP-HDC-01',
    criticalStandard: 'Dilakukan rutin setiap 1-2 jam, Delta P 1.0 bar (Inlet 1.5 bar / Accept 0.5 bar)',
    raci: {
      kepalaPabrik: 'I',
      admJr: 'I',
      kepalaPm: 'C',
      karuShift: 'A',
      operatorUtama: 'A',
      helperOperator: 'R',
      operatorRewinder: 'I',
      helperRewinder: 'I',
      operatorBoiler: 'I',
      helperBoiler: 'I'
    },
    operationalNotes: {
      helperDuties: 'Membuka valve bilas dan valve buang kotoran Junk Trap, menampung kerikil dan kawat ke wadah reject, lalu membilas bersih sebelum menutup valve.',
      operatorDuties: 'Mengawasi tekanan manometer inlet & accept HDC pada layar DCS serta mencatat interval siklus pembuangan.',
      karuAccountability: 'Memastikan tidak ada pasir berat yang lolos menuju refiner atau cylinder vat kawat mesin kertas.',
      k3Rule: 'Wajib mengenakan kacamata safety (goggles) dan sarung tangan karet saat membuka valve pembuangan bertekanan.'
    }
  },
  {
    id: 'resp-sp-2',
    area: 'STOCK_PREP',
    areaName: 'Penyiapan Bubur (Stock Prep)',
    taskTitle: 'Penimbangan & Pelarutan Kimia Polimer PEO (Axfloc)',
    sopReference: 'SOP-SP-PEO-02',
    criticalStandard: 'Viskositas larutan 17 - 19 Cps, bening transparan tanpa gumpalan butiran fish eye',
    raci: {
      kepalaPabrik: 'I',
      admJr: 'I',
      kepalaPm: 'C',
      karuShift: 'A',
      operatorUtama: 'A',
      helperOperator: 'R',
      operatorRewinder: 'I',
      helperRewinder: 'I',
      operatorBoiler: 'I',
      helperBoiler: 'I'
    },
    operationalNotes: {
      helperDuties: 'Menimbang bubuk PEO dengan timbangan digital, menuangkan perlahan ke hopper eductor air pengaduk, dan memeriksa fisik cairan tangki dosing.',
      operatorDuties: 'Menguji viskositas menggunakan cangkir ukur viskositas (Ford Cup/Brookfield) dan mengatur debit flow dosing pump ke headbox.',
      karuAccountability: 'Memverifikasi kartu kontrol pemakaian kimia per shift dan memastikan formasi serat tissue stabil rata.',
      k3Rule: 'Wajib masker respirator dan sarung tangan saat menangani serbuk bubuk polimer PEO agar tidak terhirup.'
    }
  },

  // 2. WET END (FORMING)
  {
    id: 'resp-we-1',
    area: 'WET_END',
    areaName: 'Wet End (Pembentukan Lembaran)',
    taskTitle: 'Pengawasan Konsistensi Buburan CRC & Flow Control Valve DCS',
    sopReference: 'SOP-PM-CRC-01',
    criticalStandard: 'Konsistensi Headbox ketat di 0,18% - 0,20%, bukaan valve control 30 - 60%',
    raci: {
      kepalaPabrik: 'I',
      admJr: 'I',
      kepalaPm: 'C',
      karuShift: 'A',
      operatorUtama: 'R',
      helperOperator: 'I',
      operatorRewinder: 'I',
      helperRewinder: 'I',
      operatorBoiler: 'I',
      helperBoiler: 'I'
    },
    operationalNotes: {
      helperDuties: 'Membantu pengambilan sampel bubur basah di stuffing box dan memeriksa saluran pipa bypass kran sampling.',
      operatorDuties: 'Mengamati layar DCS: mencocokkan nilai actual vs set point CRC dan merespons deviasi bukaan katup delusen.',
      karuAccountability: 'Mengaudit kestabilan berat gramatur kertas (GSM) dan memutuskan penyesuaian resep delusen jika terjadi hunting.',
      k3Rule: 'Patuhi kehati-hatian di sekitar pipa bubur bertekanan dan jauhi komponen elektrik sensor transmiter saat basah.'
    }
  },
  {
    id: 'resp-we-2',
    area: 'WET_END',
    areaName: 'Wet End (Pembentukan Lembaran)',
    taskTitle: 'Perawatan & Monitoring Shower Needle Felt Tekanan 10 - 12 Bar',
    sopReference: 'SOP-PM-FELT-03',
    criticalStandard: 'Tekanan 10 - 12 bar, motor osilator WAJIB selalu berosilasi bolak-balik kontinu',
    raci: {
      kepalaPabrik: 'I',
      admJr: 'I',
      kepalaPm: 'A',
      karuShift: 'A',
      operatorUtama: 'R',
      helperOperator: 'R',
      operatorRewinder: 'I',
      helperRewinder: 'I',
      operatorBoiler: 'I',
      helperBoiler: 'I'
    },
    operationalNotes: {
      helperDuties: 'Menginspeksi visual pergerakan stroke batang osilator shower needle setiap jam kerja dan mengecek kelancaran air nosel needle.',
      operatorDuties: 'Mengatur tekanan pompa needle shower pada 10-12 bar dan segera mematikan shower jika motor osilator macet.',
      karuAccountability: 'Mencegah terjadinya kerusakan kain felt tergores garis permanen akibat semprotan diam.',
      k3Rule: 'Pancaran air needle shower berdaya potong tinggi: dilarang menyentuhkan tangan langsung ke garis semprotan air bertekanan.'
    }
  },

  // 3. DRY END (YANKEE & CREPING)
  {
    id: 'resp-de-1',
    area: 'DRY_END',
    areaName: 'Dry End (Pengeringan & Creping)',
    taskTitle: 'Pengendalian Suhu Silinder Yankee 85 - 90 °C & Spray Boom Coating',
    sopReference: 'SOP-PM-YANKEE-04',
    criticalStandard: 'Suhu permukaan 85 - 90 °C stabil, tekanan spray boom coating minimal 2.5 bar bebas buntu',
    raci: {
      kepalaPabrik: 'I',
      admJr: 'I',
      kepalaPm: 'A',
      karuShift: 'A',
      operatorUtama: 'R',
      helperOperator: 'R',
      operatorRewinder: 'I',
      helperRewinder: 'I',
      operatorBoiler: 'C',
      helperBoiler: 'I'
    },
    operationalNotes: {
      helperDuties: 'Membantu pengecekan level tangki kimia coating & release agent, serta membersihkan baki tetesan bawah nosel.',
      operatorDuties: 'Mengatur pasokan uap steam silinder Yankee, memantau termometer inframerah 85-90°C, dan memastikan nosel spray tidak buntu.',
      karuAccountability: 'Menjamin umur aset silinder Yankee terlindungi dari keausan gesekan dan film polimer terbentuk homogen.',
      k3Rule: 'Area panas bersuhu tinggi (radiasi uap panas): dilarang bersandar atau menyentuh bodi silinder tanpa pelindung termal.'
    }
  },
  {
    id: 'resp-de-2',
    area: 'DRY_END',
    areaName: 'Dry End (Pengeringan & Creping)',
    taskTitle: 'Penggantian & Penyetelan Mata Pisau Doctor Creping Blade (Pengerutan 15%)',
    sopReference: 'SOP-PM-CREPE-05',
    criticalStandard: 'Kondisi bilah rata tajam tanpa gompal, bevel angle presisi, creping rasio target 15%',
    raci: {
      kepalaPabrik: 'I',
      admJr: 'I',
      kepalaPm: 'C',
      karuShift: 'A',
      operatorUtama: 'R',
      helperOperator: 'R',
      operatorRewinder: 'I',
      helperRewinder: 'I',
      operatorBoiler: 'I',
      helperBoiler: 'I'
    },
    operationalNotes: {
      helperDuties: 'Menyiapkan bilah blade baru yang terpotong rapi, memegang ujung blade pemandu dengan sarung tangan Kevlar, dan membuang pisau bekas ke box limbah tajam.',
      operatorDuties: 'Memasukkan bilah blade ke holder pneumatik, menyetel sudut kontak penekanan 2.0 bar, dan mengamati hasil pengerutan tissue.',
      karuAccountability: 'Memutuskan waktu pergantian pisau creping dan memverifikasi uji kelembutan (handfeel) lembaran tissue.',
      k3Rule: 'BAHAYA PISAU SANGAT TAJAM: Wajib menggunakan sarung tangan anti-potong Kevlar Level 5 (Cut Resistant Level 5).'
    }
  },

  // 4. POPE REEL (WINDING & QC)
  {
    id: 'resp-pr-1',
    area: 'POPE_REEL',
    areaName: 'Pope Reel (Penggulungan Jumbo Roll)',
    taskTitle: 'Sinkronisasi Kecepatan Pope Reel & Penanganan Turn-Up Spool',
    sopReference: 'SOP-PM-POPE-06',
    criticalStandard: 'Speed Pope Reel = Speed Yankee x (1 - Creping 15%) [contoh: 150 mpm -> 127.5 mpm]',
    raci: {
      kepalaPabrik: 'I',
      admJr: 'I',
      kepalaPm: 'C',
      karuShift: 'A',
      operatorUtama: 'R',
      helperOperator: 'R',
      operatorRewinder: 'I',
      helperRewinder: 'I',
      operatorBoiler: 'I',
      helperBoiler: 'I'
    },
    operationalNotes: {
      helperDuties: 'Mempersiapkan spool besi bersih yang sudah ditempel double tape perekat, membantu mengarahkan crane gantri, dan membersihkan lantai reel.',
      operatorDuties: 'Mengoperasikan panel kontrol sinkronisasi kecepatan, melakukan manuver turn-up spool baru, dan mengatur tekanan kontak lengan reel.',
      karuAccountability: 'Menghindari roll kempes (sponge roll), memastikan gulungan padat seragam dari inti spool hingga diameter luar.',
      k3Rule: 'BAHAYA TITIK JEPIT NIP ROLL: Dilarang berdiri di bawah lintasan spool bergerak atau menyentuh drum berputar kencang.'
    }
  },
  {
    id: 'resp-pr-2',
    area: 'POPE_REEL',
    areaName: 'Pope Reel (Penggulungan Jumbo Roll)',
    taskTitle: 'Pemasangan Penanda Sambungan (Flagging Joint) & Proteksi Debu Trim',
    sopReference: 'SOP-PM-QC-07',
    criticalStandard: '100% Bebas debu trim, lembaran tidak melipat, WAJIB tempel flag penanda di setiap joint sambungan',
    raci: {
      kepalaPabrik: 'I',
      admJr: 'R',
      kepalaPm: 'I',
      karuShift: 'A',
      operatorUtama: 'R',
      helperOperator: 'R',
      operatorRewinder: 'I',
      helperRewinder: 'I',
      operatorBoiler: 'I',
      helperBoiler: 'I'
    },
    operationalNotes: {
      helperDuties: 'Menempelkan bendera penanda (flagging tape merah/kuning) pada tepi kertas saat terjadi sambungan broke, menempelkan barcode Jumbo Roll, dan menimbang berat aktual.',
      operatorDuties: 'Mencatat lokasi meter sambungan joint pada kartu roll dan menginstruksikan helper untuk vacuum debu trim pinggir.',
      karuAccountability: 'Memastikan tidak ada Jumbo Roll bercacat lolos ke divisi Rewinder tanpa identitas bendera yang jelas.',
      k3Rule: 'Gunakan kacamata pelindung dan masker debu saat beraktivitas dekat blower hisap trim pope reel.'
    }
  },

  // 5. SLITTER REWINDER
  {
    id: 'resp-rew-1',
    area: 'REWINDER',
    areaName: 'Slitter Rewinder (Finishing)',
    taskTitle: 'Penyetelan Pisau Slitter: Overlap 1.0-1.5 mm & Canting Angle 0.5°-1.0°',
    sopReference: 'SOP-REW-KNIFE-01',
    criticalStandard: 'Overlap kedalaman 1.0 - 1.5 mm, sudut miring canting 0.5° - 1.0°, tekanan samping 1.5 - 2.0 bar',
    raci: {
      kepalaPabrik: 'I',
      admJr: 'I',
      kepalaPm: 'C',
      karuShift: 'A',
      operatorUtama: 'I',
      helperOperator: 'I',
      operatorRewinder: 'R',
      helperRewinder: 'R',
      operatorBoiler: 'I',
      helperBoiler: 'I'
    },
    operationalNotes: {
      helperDuties: 'Membantu membersihkan serpihan debu trim dengan kuas bertangkai, memasang selongsong core karton baru pada expanding shaft, dan mengecek kelurusan pisau.',
      operatorDuties: 'Mengatur jarak pisau pemotong sesuai jadwal cutting order pelanggan, memutar micrometer overlap 1.0-1.5 mm, dan menyetel canting angle.',
      karuAccountability: 'Memastikan tepi hasil potongan gulungan 100% tegak lurus 90° tanpa gerigi (burr) dan bebas debu serat lepas.',
      k3Rule: 'WAJIB pasang gembok LOTO pada saklar mesin dan gunakan sarung tangan Kevlar Level 5 saat mendekati unit pisau slitter.'
    }
  },
  {
    id: 'resp-rew-2',
    area: 'REWINDER',
    areaName: 'Slitter Rewinder (Finishing)',
    taskTitle: 'Pengaturan Sudut Kelengkungan Banana Roll (15° - 30°) & Celah Pita 2 - 4 mm',
    sopReference: 'SOP-REW-BANANA-02',
    criticalStandard: 'Puncak lengkungan (apex) miring 15° - 30° searah tarikan kertas, celah pita potongan terpisah 2 - 4 mm',
    raci: {
      kepalaPabrik: 'I',
      admJr: 'I',
      kepalaPm: 'C',
      karuShift: 'A',
      operatorUtama: 'I',
      helperOperator: 'I',
      operatorRewinder: 'R',
      helperRewinder: 'I',
      operatorBoiler: 'I',
      helperBoiler: 'I'
    },
    operationalNotes: {
      helperDuties: 'Mengamati visual bentangan lembaran saat mesin mulai merayap (crawl speed) untuk mendeteksi kerutan awal.',
      operatorDuties: 'Memutar roda penyetel sudut busur roll melengkung (banana roll) ke orientasi 15°-30° hingga celah antar pita terpisah 2-4 mm.',
      karuAccountability: 'Mengeliminasi cacat interweaving (dua gulungan bersebelahan saling mengunci/terkait) yang merusak roll ekspor.',
      k3Rule: 'Penyetelan sudut banana roll hanya boleh dilakukan pada kecepatan rendah atau mesin dalam keadaan berhenti.'
    }
  },
  {
    id: 'resp-rew-3',
    area: 'REWINDER',
    areaName: 'Slitter Rewinder (Finishing)',
    taskTitle: 'Pengendalian Tensi Lembaran, Rider Roll Nip Relief & Doffing Hidrolik',
    sopReference: 'SOP-REW-DOFF-03',
    criticalStandard: 'Nip relief 3.0-4.5 kN/m bertahap turun, uji kekerasan roll Schmidt Hammer 28-36 unit',
    raci: {
      kepalaPabrik: 'I',
      admJr: 'R',
      kepalaPm: 'C',
      karuShift: 'A',
      operatorUtama: 'I',
      helperOperator: 'I',
      operatorRewinder: 'R',
      helperRewinder: 'R',
      operatorBoiler: 'I',
      helperBoiler: 'I'
    },
    operationalNotes: {
      helperDuties: 'Mengoperasikan tuas conveyor penerima roll hasil doffing, menempelkan label identitas barcode, dan menguji kekerasan gulungan dengan Schmidt Hammer.',
      operatorDuties: 'Mengendalikan kurva program tensi web, mengaktifkan hidrolik penurun gulungan (doffer) secara mulus, dan memverifikasi diameter gulungan.',
      karuAccountability: 'Memastikan tidak terjadi roll meletus/bintang (starring roll) atau gulungan kempes (telescoping roll).',
      k3Rule: 'PASTIKAN AREA CRADLE BEBAS ORANG saat hidrolik doffer menurunkan gulungan berbobot ratusan kilogram ke meja conveyor.'
    }
  },

  // 6. BOILER & UTILITY
  {
    id: 'resp-blr-1',
    area: 'BOILER',
    areaName: 'Utilitas & Pembangkit Uap (Boiler)',
    taskTitle: 'Pengendalian Tekanan Uap Header 6.5 - 7.5 Bar & Kualitas Air Feedwater',
    sopReference: 'SOP-BLR-STEAM-01',
    criticalStandard: 'Tekanan steam header stabil 6.5 - 7.5 bar, uji safety water level gelas duga setiap shift',
    raci: {
      kepalaPabrik: 'I',
      admJr: 'I',
      kepalaPm: 'C',
      karuShift: 'C',
      operatorUtama: 'I',
      helperOperator: 'I',
      operatorRewinder: 'I',
      helperRewinder: 'I',
      operatorBoiler: 'R',
      helperBoiler: 'R'
    },
    operationalNotes: {
      helperDuties: 'Mengangkat karung garam kristal NaCl ke tangki brine softener, membantu backwash filter pasir, dan memantau stok bahan bakar bunker.',
      operatorDuties: 'Mengatur debit pembakaran, memantau tekanan uap pada 6.5-7.5 bar, melakukan blowdown lumpur berkala, dan memeriksa gelas duga level air.',
      karuAccountability: 'Menjamin pasokan uap kontinu tanpa henti ke silinder Yankee PM1, PM2, dan PM5.',
      k3Rule: 'Wajib mengantongi Sertifikat K3 Operator Bejana Uap dan APD tahan panas saat memeriksa api tungku.'
    }
  },
  {
    id: 'resp-blr-2',
    area: 'BOILER',
    areaName: 'Utilitas & Pembangkit Uap (Boiler)',
    taskTitle: 'Pengangkutan & Pembasahan Abu Panas (Bottom Ash) & Pembersihan Corong Feeder',
    sopReference: 'SOP-BLR-ASH-02',
    criticalStandard: 'Bak abu terkuras tuntas setiap shift, disiram air pembasah basah tanpa timbul debu liar',
    raci: {
      kepalaPabrik: 'I',
      admJr: 'I',
      kepalaPm: 'I',
      karuShift: 'I',
      operatorUtama: 'I',
      helperOperator: 'I',
      operatorRewinder: 'I',
      helperRewinder: 'I',
      operatorBoiler: 'A',
      helperBoiler: 'R'
    },
    operationalNotes: {
      helperDuties: 'Mengeluarkan abu panas dari tungku bawah dengan sekop besi, menyiramkan air pembasah, dan mengangkut gerobak abu ke bak penampungan.',
      operatorDuties: 'Mengevaluasi efisiensi pembakaran dari warna abu sisa dan memverifikasi kelancaran rantai konveyor grate.',
      karuAccountability: 'Mencegah tumpukan debu partikulat dan risiko kebakaran di sekitar bunker bahan bakar.',
      k3Rule: 'Wajib Sarung Tangan Kulit Tahan Panas, Masker Respirator N95, dan Kacamata Pelindung. DILARANG menyiram air mendadak dalam volume besar ke dalam tungku menyala.'
    }
  },

  // 7. K3 SAFETY & LOTO
  {
    id: 'resp-k3-1',
    area: 'K3_SAFETY',
    areaName: 'Keselamatan Kerja (K3) & LOTO',
    taskTitle: 'Penerapan Prosedur Lock Out Tag Out (LOTO) 6 Langkah & Uji Tarik Emergency Pull-Wire',
    sopReference: 'SOP-K3-LOTO-01',
    criticalStandard: 'Zero Tolerance titik jepit roll, verifikasi Zero Energy 0 bar & saklar tergembok, rem berhenti < 2.5 detik',
    raci: {
      kepalaPabrik: 'A',
      admJr: 'I',
      kepalaPm: 'A',
      karuShift: 'A',
      operatorUtama: 'R',
      helperOperator: 'R',
      operatorRewinder: 'R',
      helperRewinder: 'R',
      operatorBoiler: 'R',
      helperBoiler: 'R'
    },
    operationalNotes: {
      helperDuties: 'Memasang gembok LOTO pribadi pada hasp pengunci saklar utama saat pembersihan/pergantian pisau, dan menguji tarikan kabel darurat pull-wire saat inspeksi shift.',
      operatorDuties: 'Memverifikasi sisa tekanan pneumatik dibuang ke 0 bar dan menekan tombol test run untuk konfirmasi Zero Energy State.',
      karuAccountability: 'Menolak menjalankan mesin jika sistem proteksi pengaman tirai optik atau saklar darurat dalam keadaan di-bypass.',
      k3Rule: 'DILARANG KERAS MENYENTUH ROLL BERPUTAR DENGAN KAIN LAP. Pembersihan hanya boleh dilakukan saat mesin berhenti total!'
    }
  },

  // 8. SHIFT REPORTING & HANDOVER
  {
    id: 'resp-rep-1',
    area: 'REPORTING',
    areaName: 'Pelaporan Kinerja & Serah Terima Shift',
    taskTitle: 'Pengisian Log Sheet Digital, Rekapitulasi Tonase & Serah Terima Shift (Handover)',
    sopReference: 'SOP-ADM-OPS-03',
    criticalStandard: 'Laporan shift terisi lengkap sebelum waktu ganti regu, serah terima tatap muka 15 menit',
    raci: {
      kepalaPabrik: 'I',
      admJr: 'A',
      kepalaPm: 'C',
      karuShift: 'A',
      operatorUtama: 'R',
      helperOperator: 'R',
      operatorRewinder: 'R',
      helperRewinder: 'R',
      operatorBoiler: 'R',
      helperBoiler: 'R'
    },
    operationalNotes: {
      helperDuties: 'Membantu pengecekan fisik 5S lantai kerja, inventarisasi gulungan jumbo roll jadi, dan menyampaikan kendala peralatan ke helper shift penerima.',
      operatorDuties: 'Mengisi data capaian tonase aktual, persentase cacat, parameter gramatur/moisture, dan insiden downtime pada aplikasi Laporan Shift PT. PUP.',
      karuAccountability: 'Memvalidasi kebenaran data produksi, menandatangani persetujuan shift, dan memimpin briefing serah terima dengan Karu shift berikutnya.',
      k3Rule: 'Pastikan seluruh area kerja bersih rapi bebas ceceran oli/bubur sebelum meninggalkan lokasi pabrik.'
    }
  }
];

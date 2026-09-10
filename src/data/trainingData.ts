import { MachineTrainingData } from '../types';

export const TRAINING_MODULES: Record<string, MachineTrainingData> = {
  PM1: {
    machineId: 'PM1',
    name: 'Mesin Kertas PM1 (Medium Paper Specialist)',
    tagline: 'Lini Produksi Kertas Medium & Fluting Ringan (Single Fourdrinier Classic Line)',
    technicalSpecs: [
      { label: 'Lebar Kawat (Wire Width)', value: '2.800 mm (Lebar Trim Produk: 2.550 mm)' },
      { label: 'Kecepatan Desain / Operasi', value: 'Maks 450 m/menit (Operasi Standar: 340 - 410 m/menit)' },
      { label: 'Kapasitas Nominal Harian', value: '110 - 130 Ton / Hari (Rata-rata 38 - 43 Ton / Shift)' },
      { label: 'Tipe Forming Section', value: 'Single Fourdrinier Table dengan Ceramic Dewatering Blades' },
      { label: 'Tipe Press Section', value: 'Straight-through 2-Nip Felted Press (Top Roll Granite, Bottom Roll Blind Drilled)' },
      { label: 'Dryer Cylinders', value: '28 Silinder Pengering Ø 1.500 mm (Tekanan Uap Maks 5.0 bar)' },
      { label: 'Finishing / Calender', value: 'Single-nip Hard Nip Calender (Chilled Cast Iron Roll)' }
    ],
    operatingLimits: [
      { label: 'Kecepatan Operasi Maksimal', limit: '450 m/min', dangerZone: '> 460 m/min risiko getaran roll & sheet flutter' },
      { label: 'Tekanan Uap Steam Header', limit: '4.8 bar', dangerZone: '> 5.2 bar safety valve release' },
      { label: 'Arus Motor Fan Pump', limit: '135 Ampere', dangerZone: '> 145 Ampere indikator overload bubur kental' },
      { label: 'Suhu Bearing Dryer', limit: '75°C', dangerZone: '> 85°C risiko kerusakan bearing & pelumas gosong' }
    ],
    paperGrades: [
      { code: 'CM110', name: 'Corrugating Medium 110 gsm', gsmRange: '105 - 115 gsm', description: 'Fluting medium ekonomis untuk kardus box 3 lapis' },
      { code: 'CM125', name: 'Corrugating Medium 125 gsm', gsmRange: '120 - 130 gsm', description: 'Grade paling populer, ketahanan flat crush (CMT) standar' },
      { code: 'CM150', name: 'Corrugating Medium 150 gsm', gsmRange: '145 - 155 gsm', description: 'Heavy fluting untuk kotak karton industri ekspor' }
    ],
    dailyCheckpoints: [
      {
        area: 'Forming Table (Wire)',
        items: [
          'Kondisi semprotan needle shower: pastikan osilasi hidrolik bergerak kiri-kanan lancar.',
          'Pemeriksaan kawat wire: cek ada sobekan tepi atau kawat bergelombang.',
          'Vakum flat box: pastikan vacuum gauge menunjukkan 20 - 35 kPa stabil.'
        ]
      },
      {
        area: 'Press Section',
        items: [
          'Tekanan nip hidrolik kiri & kanan: seimbang toleransi maks 3%.',
          'Kondisi felt: periksa tidak ada gumpalan lembaran tertinggal (felt wad).',
          'Suhu oli pelumas central lube pada bearing press.'
        ]
      },
      {
        area: 'Dryer Section',
        items: [
          'Kondisi canvas dryer: tegangan merata, tidak meliuk-liuk.',
          'Sistem pembuangan kondensat: cek sight glass sirkulasi air uap pada setiap silinder.',
          'Doctor blade dryer: pastikan bilah menempel sempurna membersihkan sisa serat.'
        ]
      }
    ],
    standardParameters: [
      { parameter: 'Konsistensi Headbox', range: '0.60% - 0.85%', unit: '%' },
      { parameter: 'Slice Opening (Bukaan Slice)', range: '14.5 - 18.0', unit: 'mm' },
      { parameter: 'Derajat Freeness Bubur (°SR)', range: '36 - 42', unit: '°SR' },
      { parameter: 'Kelembapan Kertas Akhir', range: '7.5% - 8.5%', unit: '%' },
      { parameter: 'Caliper CM125', range: '165 - 180', unit: 'µm' }
    ],
    dcsIndicatorsGuide: [
      { code: 'TI-101 (Dryer Temp)', meaning: 'Suhu silinder pre-dryer', normalState: '115°C - 135°C', actionIfAbnormal: 'Periksa aliran condensate siphon & supply valve steam' },
      { code: 'PI-202 (Headbox Press)', meaning: 'Tekanan bubur dalam headbox', normalState: '0.85 - 1.25 bar', actionIfAbnormal: 'Sesuaikan bypass fan pump atau bukaan slice lip' },
      { code: 'SI-305 (Wire Speed Draw)', meaning: 'Persentase selisih kecepatan Wire vs 1st Press', normalState: '+0.15% s/d +0.25%', actionIfAbnormal: 'Tuning draw ratio untuk mencegah putus lembaran basah' }
    ],
    commonFaultsAndSolutions: [
      {
        fault: 'Kertas Berbulu / Permukaan Kasar (Fuzzy Surface)',
        indication: 'Serat halus terangkat di doctor blade dryer dan roll calender berdebu.',
        immediateAction: 'Periksa kebersihan doctor blade dryer, bersihkan calender roll dengan air panas bertekanan rendah.',
        permanentFix: 'Tingkatkan derajat freeness bubur di refiner (kW dinaikkan 5%) dan optimalkan dosis cationic starch di stock prep.'
      },
      {
        fault: 'Ketebalan Pinggir vs Tengah Tidak Rata (Caliper Wedge)',
        indication: 'Roll gulungan jadi lebih padat di salah satu sisi.',
        immediateAction: 'Sesuaikan mikrometer baut slice headbox di bagian yang terlalu tebal.',
        permanentFix: 'Lakukan alignment ulang headbox slice lip dan ukur ulang profil crown karet press roll.'
      }
    ],
    k3SafetyProcedures: [
      'Wajib mengenakan Earplug / Earmuff saat berada di dekat area dryer hood dan blower vacuum (kebisingan > 85 dB).',
      'Dilarang membersihkan calender roll atau press nip yang berputar dengan tangan; selalu gunakan scraping tool bergagang panjang.',
      'Pastikan tombol Emergency Stop tali kawat (Pull-wire E-Stop) di sepanjang jalan mesin berfungsi normal sebelum start shift.',
      'Suhu permukaan silinder dryer mencapai 130°C: gunakan sarung tangan tahan panas bersertifikat saat proses feeding/threading.'
    ]
  },
  PM2: {
    machineId: 'PM2',
    name: 'Mesin Kertas PM2 (High-Performance Corrugating & Kraft)',
    tagline: 'Lini Produksi Kertas Medium High ECT & Testliner (Twin-Wire Former Line)',
    technicalSpecs: [
      { label: 'Lebar Kawat (Wire Width)', value: '3.200 mm (Lebar Trim Produk: 2.950 mm)' },
      { label: 'Kecepatan Desain / Operasi', value: 'Maks 600 m/menit (Operasi Standar: 460 - 540 m/menit)' },
      { label: 'Kapasitas Nominal Harian', value: '170 - 200 Ton / Hari (Rata-rata 58 - 66 Ton / Shift)' },
      { label: 'Tipe Forming Section', value: 'Top Wire Former + Bottom Fourdrinier (Mampu produksi 2 lapis lembaran)' },
      { label: 'Tipe Press Section', value: 'Double-felted Tandem Press dengan Tekanan Tinggi (Nip 1: 80 kN/m, Nip 2: 120 kN/m)' },
      { label: 'Dryer Cylinders', value: '36 Silinder Pengering dengan Closed Aeration Hood System' },
      { label: 'Size Press', value: 'Puddle Type Size Press untuk Surface Starch Treatment' }
    ],
    operatingLimits: [
      { label: 'Kecepatan Operasi Maksimal', limit: '580 m/min', dangerZone: '> 600 m/min getaran kantilever felt' },
      { label: 'Tekanan Uap Silinder Dryer', limit: '5.2 bar', dangerZone: '> 5.5 bar alarm DCS berbunyi' },
      { label: 'Beban Nip Press 2', limit: '130 kN/m', dangerZone: '> 140 kN/m risiko felt blind dan roll rubber blister' },
      { label: 'Konsistensi Top Wire Headbox', limit: '0.95%', dangerZone: '> 1.10% formasi berawan (cloudy formation)' }
    ],
    paperGrades: [
      { code: 'CM150-HECT', name: 'Corrugating Medium High ECT 150 gsm', gsmRange: '145 - 155 gsm', description: 'Nilai CMT tinggi untuk heavy packaging produk elektronik & botol' },
      { code: 'TL140', name: 'Testliner 140 gsm (Brown)', gsmRange: '135 - 145 gsm', description: 'Lapisan luar karton boks dengan surface sizing kanji anti-air' },
      { code: 'TL175', name: 'Testliner 175 gsm (High Burst)', gsmRange: '170 - 180 gsm', description: 'Kekuatan jebol (Bursting Strength) > 350 kPa' }
    ],
    differencesFromOthers: 'Memiliki dua headbox (Bottom & Top Wire Former) sehingga dapat menyusun dua lapisan kertas berbeda secara bersamaan. Dilengkapi unit Size Press untuk pelapisan kanji eksternal (menaikkan Ring Crush Test hingga 25% dibanding PM1).',
    dailyCheckpoints: [
      {
        area: 'Twin Wire Section',
        items: [
          'Penyelarasan kecepatan antara Bottom Wire dan Top Wire (Speed Ratio 1:1 ± 0.05%).',
          'Pembersihan auto-edge squirt nozzle agar lebar lembaran konstan.',
          'Pemeriksaan suction couch roll vacuum chamber (harus 50 - 65 kPa).'
        ]
      },
      {
        area: 'Size Press Section',
        items: [
          'Viskositas dan suhu larutan kanji (Surface Starch: Suhu 60°C - 65°C, Viskositas 40 - 55 mPa.s).',
          'Tekanan nip size press roll: periksa kerataan film cairan di kedua sisi roll.',
          'Kondisi roll rubber cover size press: pastikan bebas goresan atau lubang kecil.'
        ]
      }
    ],
    standardParameters: [
      { parameter: 'Konsistensi Bottom Headbox', range: '0.70% - 0.90%', unit: '%' },
      { parameter: 'Konsistensi Top Headbox', range: '0.50% - 0.70%', unit: '%' },
      { parameter: 'Pick-up Nip Pressure', range: '75 - 85', unit: 'kN/m' },
      { parameter: 'Kadar Kanji di Size Press', range: '7.5% - 9.0%', unit: 'Brix' },
      { parameter: 'Kelembapan Sebelum Size Press', range: '4.5% - 6.0%', unit: '%' },
      { parameter: 'Kelembapan Akhir di Reel', range: '7.0% - 8.0%', unit: '%' }
    ],
    dcsIndicatorsGuide: [
      { code: 'QCS-BW (Basis Weight Scanner)', meaning: 'Sensor gramatur inframerah scanner bolak-balik', normalState: 'Deviasi 2-sigma < 1.5 gsm', actionIfAbnormal: 'Aktifkan profil kontrol otomatis atau perbaiki bukaan slice lip' },
      { code: 'PT-SIZE (Size Press Level)', meaning: 'Level tangki sirkulasi kanji surface', normalState: '65% - 80%', actionIfAbnormal: 'Periksa pompa transfer kanji dari kitchen kitchen prep' },
      { code: 'VAC-COUCH (Couch Vacuum)', meaning: 'Tekanan hisap dewatering roll couch', normalState: '-55 s/d -65 kPa', actionIfAbnormal: 'Cek water ring vacuum pump dan level seal pit' }
    ],
    commonFaultsAndSolutions: [
      {
        fault: 'Lembaran Kertas Terlepas Antar Lapis (Delamination / Ply Separation)',
        indication: 'Lapisan luar dan lapisan dalam mudah terkelupas saat uji Scott Bond.',
        cause: 'Konsistensi penyatuan lembaran di couching zone terlalu kering atau freeness bubur lapis atas dan bawah berselisih terlalu jauh (> 8 °SR).',
        immediateAction: 'Turunkan vakum flat box sebelum titik pertemuan dan semprotkan mist shower kanji antar lapis.',
        permanentFix: 'Sinkronkan derajat freeness refiner top vs bottom line dan kontrol rasio pembagian beban kawat.'
      },
      {
        fault: 'Kerut Diagonal Setelah Size Press (Size Press Wrinkling)',
        indication: 'Timbul kerut miring pada lembaran saat keluar dari nip size press.',
        cause: 'Penyerapan air kanji tidak rata atau bow roll expander setelah size press kurang membentang.',
        immediateAction: 'Naikkan suhu larutan kanji dan atur sudut bow roll pengembang lembaran.',
        permanentFix: 'Kencangkan tegangan canvas dryer seksi after-dryer dan ratakan film aplikasi kanji.'
      }
    ],
    k3SafetyProcedures: [
      'Hati-hati cipratan larutan kanji panas (> 65°C) di sekitar bak sirkulasi size press; wajib gunakan pelindung wajah (face shield) dan apron karet saat mencuci saringan kanji.',
      'Dilarang keras menyentuh nips roll press saat running; gunakan air jet atau paper tail cutter otomatis untuk penarikan kertas putus.',
      'Semua lantai kerja catwalk di sekitar forming table basah; wajib gunakan sepatu safety dengan sol anti-slip (SRC standard).'
    ]
  },
  PM5: {
    machineId: 'PM5',
    name: 'Mesin Kertas PM5 (Flagship Modern High-Speed Multi-Ply)',
    tagline: 'Lini Produksi Modern White Top Kraft Liner & Premium Testliner (Shoe Press & DCS Honeywell Integrated)',
    technicalSpecs: [
      { label: 'Lebar Kawat (Wire Width)', value: '3.800 mm (Lebar Trim Produk: 3.500 mm)' },
      { label: 'Kecepatan Desain / Operasi', value: 'Maks 800 m/menit (Operasi Standar: 620 - 740 m/menit)' },
      { label: 'Kapasitas Nominal Harian', value: '300 - 350 Ton / Hari (Rata-rata 100 - 118 Ton / Shift)' },
      { label: 'Tipe Forming Section', value: 'Multi-Ply Hydraulic Headbox dengan Lamella & Dilution Water Profile Control' },
      { label: 'Tipe Press Section', value: 'Extended Nip Shoe Press (Tekanan Hidrolik 600 - 800 kN/m, Dry Content > 48%)' },
      { label: 'Dryer Section', value: '48 Silinder Silent-drive dengan High-efficiency Heat Recovery Steam System' },
      { label: 'Finishing System', value: 'Soft Nip Calender dengan Roll Pemanas Induksi Termal & Automatic Reel Spool Cart' }
    ],
    operatingLimits: [
      { label: 'Kecepatan Operasi Maksimal', limit: '780 m/min', dangerZone: '> 800 m/min alarm aerodinamik lembaran' },
      { label: 'Tekanan Hidrolik Shoe Press', limit: '800 kN/m', dangerZone: '> 850 kN/m risiko robek belt polyurethane shoe press' },
      { label: 'Suhu Calender Roll Induksi', limit: '145°C', dangerZone: '> 160°C degradasi roll cover elastomer' },
      { label: 'Kadar Kelembapan Scanner QCS', limit: '9.0%', dangerZone: '> 9.5% risiko jamur saat penyimpanan warehouse' }
    ],
    paperGrades: [
      { code: 'WTK140', name: 'White Top Kraft 140 gsm (Bleached Virgin Surface)', gsmRange: '135 - 145 gsm', description: 'Lapisan atas serat putih cerah (ISO Brightness 78-82%) untuk cetak offset grafis boks mewah' },
      { code: 'WTK175', name: 'White Top Kraft 175 gsm Premium', gsmRange: '170 - 180 gsm', description: 'Kemasan buah ekspor, tahan ruang pendingin (Cold Storage Humidity Resistant)' },
      { code: 'KL200', name: 'Heavy Kraft Liner 200 gsm', gsmRange: '195 - 205 gsm', description: 'Kekuatan stacking compression test tertinggi untuk drum baja dan drum karton' }
    ],
    specialCharacteristics: 'Mesin paling modern dan cepat di pabrik PT. Panca Usahatama Paramita. Dilengkapi unit Extended Nip Shoe Press yang mampu memeras air hingga konsistensi 48% sebelum masuk dryer (hemat konsumsi steam hingga 28%), sistem profiling air dilusi otomatis (Dilution Profiler), dan Soft Nip Calender pemanas induksi.',
    dailyCheckpoints: [
      {
        area: 'Shoe Press Section',
        items: [
          'Tekanan dan temperatur sirkulasi oli hidrolik pelumas dalam sepatu shoe press (Oli ISO VG 150, Temp 50 - 58°C).',
          'Inspeksi visual permukaan luar Polyurethane Shoe Belt: pastikan tidak ada guratan batu kecil atau sobekan.',
          'Pembersihan shower vacuum transfer box sebelum shoe nip.'
        ]
      },
      {
        area: 'DCS & QCS Scanner Bridge',
        items: [
          'Verifikasi kalibrasi sensor scanner: sensor berat (Krypton/Beta source), sensor kelembapan (Infra-red), dan sensor ketebalan (Laser / Magnetic Caliper).',
          'Pembersihan filter udara pembersih optik scanner dari debu kertas.',
          'Respon aktuator katup dilusi headbox (CD Basis Weight Actuators).'
        ]
      }
    ],
    standardParameters: [
      { parameter: 'Konsistensi Dilution Headbox', range: '0.45% - 0.65%', unit: '%' },
      { parameter: 'Tekanan Hidrolik Shoe Press', range: '650 - 750', unit: 'kN/m' },
      { parameter: 'Konsistensi Lembaran Keluar Press', range: '47.5% - 49.5%', unit: '%' },
      { parameter: 'ISO Brightness (White Top)', range: '80.0% - 82.5%', unit: '%' },
      { parameter: 'Smoothness Bendtsen (Top Side)', range: '220 - 320', unit: 'ml/min' },
      { parameter: 'Toleransi Gramatur CD 2-Sigma', range: '< 1.0', unit: 'gsm' }
    ],
    dcsIndicatorsGuide: [
      { code: 'SHOE-OIL-P (Shoe Oil Pressure)', meaning: 'Tekanan lapisan oli bantalan sepatu press', normalState: '22 - 28 bar', actionIfAbnormal: 'BAHAYA: Jangan jalankan nip jika tekanan pelumas oli shoe drop; matikan segera untuk cegah belt melepuh' },
      { code: 'DIL-VALVE-% (Dilution Actuators)', meaning: 'Bukaan katup dilusi profil gramatur melintang', normalState: '40% - 60% bukaan merata', actionIfAbnormal: 'Jika satu valve 100% atau 0%, periksa penyumbatan nozzle bubur lokal' },
      { code: 'QCS-MOIST (Final Reel Moisture)', meaning: 'Kelembapan akhir lembaran gulungan', normalState: '7.2% - 8.2%', actionIfAbnormal: 'Kontrol otomatis cascading steam valve seksi dryer 4' }
    ],
    commonFaultsAndSolutions: [
      {
        fault: 'Bercak Warna Kuning / Gradasi Abu-abu Pada Lapisan White Top (Mottling Effect)',
        indication: 'Warna putih tidak merata, serat cokelat base ply membayang ke permukaan.',
        cause: 'Formasi lapisan dasar cokelat (base ply) tembus ke lapisan atas putih akibat gramatur lapisan putih terlalu tipis (< 35 gsm) atau turbulensi headbox putih buruk.',
        immediateAction: 'Naikkan rasio flow bubur putih 5-8% dan sesuaikan posisi vane/lamella headbox atas.',
        permanentFix: 'Pembersihan distributor feed pipe headbox dan evaluasi konsistensi bubur serat bleached.'
      },
      {
        fault: 'Garis Kasar Memanjang Sepanjang Mesin (CD Streak / Scuff Marks)',
        indication: 'Terdapat goresan halus berulang pada permukaan lembaran kertas.',
        cause: 'Kotoran partikel menempel pada shoe belt atau doctor blade calender cacat.',
        immediateAction: 'Lakukan osilasi shower pembersih belt shoe press secara manual.',
        permanentFix: 'Ganti bilah doctor blade sintetis calender roll dan periksa kehalusan permukaan shoe belt.'
      }
    ],
    k3SafetyProcedures: [
      'Waspada radiasi pada unit QCS Scanner: dilarang mendekatkan tangan atau berada di celah scanner saat shutter radioaktif terbuka (lampu indikator merah menyala).',
      'Kecepatan operasi sangat tinggi (hingga 750 m/min): dilarang keras melintasi jalur gulungan kertas tanpa pelindung atau saat threading otomatis berlangsung.',
      'Sistem pencegah kebakaran kabut air (Water Mist Deluge Fire Protection) di area dryer hood aktif otomatis: pahami jalur evakuasi darurat saat sirine alarm berbunyi.'
    ]
  }
};

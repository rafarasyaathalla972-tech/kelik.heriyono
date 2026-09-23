import { MachineTrainingData, TrainingModuleId } from '../types';
import { REWINDER_TRAINING_DATA } from './rewinderTrainingData';
import { STOCK_PREP_TRAINING_DATA } from './stockPrepTrainingData';
import { TISSUE_PM_MASTER_TRAINING } from './tissueMachineTrainingData';

export const TRAINING_MODULES: Record<TrainingModuleId, MachineTrainingData> = {
  TISSUE_PM: TISSUE_PM_MASTER_TRAINING,
  STOCK_PREP: STOCK_PREP_TRAINING_DATA,
  PM1: {
    machineId: 'PM1',
    name: 'Mesin Kertas PM1 (Cylinder Mould Specialist)',
    tagline: 'Lini Produksi Kertas Tissue, MG Paper, & Doorslag (Cylinder Mould Line - Speed 150 mpm)',
    technicalSpecs: [
      { label: 'Tipe Mesin', value: 'Cylinder Mould (Vat / Silinder Cetakan Pembentuk Kertas Tipis)' },
      { label: 'Produksi Utama', value: 'Tissue, MG Paper (Machine Glazed), Doorslag Paper' },
      { label: 'Rentang Basis Weight (BW)', value: '12-16 gsm, 18-22 gsm, 24-26 gsm, 36-42 gsm' },
      { label: 'Kecepatan Mesin (Speed)', value: '150 mpm (meter per menit)' },
      { label: 'Lebar Kertas Jadi (Trim)', value: '2,20 M (2.200 mm)' },
      { label: 'Lebar Kain Felt', value: '2,4 M (2.400 mm)' },
      { label: 'Panjang Felt (Top & Bottom)', value: 'Top Felt: 18,8 M | Bottom Felt: 25,0 M' },
      { label: 'Life Time Felt (Masa Pakai)', value: '6 - 8 Bulan (atau pemakaian mencapai 1.000 ton paper up)' },
      { label: 'Standar Tekanan Yankee (Steam)', value: '1.0 - 3.0 bar (Standar Baku Semua Mesin PM-1, PM-2 & PM-5)' },
      { label: 'Sistem Pengering (Dryer)', value: 'Yankee MG Dryer Silinder Ø 3.000 mm dengan High-Efficiency Hot Air Hood' },
      { label: 'Seksi Pembentukan', value: 'Cylinder Vat anti-overflow dengan shower pembersih osilasi bertekanan' }
    ],
    operatingLimits: [
      { label: 'Kecepatan Operasi Maksimal', limit: '150 mpm', dangerZone: '> 155 mpm risiko getaran vat silinder & sheet break lembaran tipis' },
      { label: 'Beban Umur Felt (Life Time)', limit: '6 - 8 Bulan / 1.000 Ton Up', dangerZone: '> 8 bulan pori felt mampet getah/pitch, dewatering turun drastis' },
      { label: 'Tekanan Uap Silinder Yankee MG', limit: '1.0 - 3.0 bar (Standar Semua Yankee)', dangerZone: '> 3.2 bar pelepasan safety valve & permukaan kertas terbakar' },
      { label: 'Tegangan Kain Felt (Tension)', limit: '2.5 - 3.5 kN/m', dangerZone: '> 4.0 kN/m risiko robek sambungan felt atau aus dini' }
    ],
    paperGrades: [
      { code: 'TIS-12/16', name: 'Tissue Paper 12 - 16 gsm', gsmRange: '12 - 16 gsm', description: 'Tissue facial lembut ultra-ringan dengan daya regang dan kelembutan serat halus optimal' },
      { code: 'TIS-18/22', name: 'Tissue Paper 18 - 22 gsm', gsmRange: '18 - 22 gsm', description: 'Tissue toilet & serbet serbaguna dengan formasi rapat dan daya serap air tinggi' },
      { code: 'MG-24/26', name: 'MG Paper (Machine Glazed) 24 - 26 gsm', gsmRange: '24 - 26 gsm', description: 'Kertas mengkilap halus satu sisi untuk pembungkus makanan, pakaian, dan kemasan ringan' },
      { code: 'DRS-36/42', name: 'Doorslag Paper 36 - 42 gsm', gsmRange: '36 - 42 gsm', description: 'Kertas doorslag semi-transparan untuk pola garmen, pemisah lembaran, dan kemasan khusus' }
    ],
    specialCharacteristics: 'PM1 beroperasi dengan tipe Cylinder Mould khusus kertas tipis (Tissue, MG Paper, dan Doorslag) dengan rentang gramatur 12-16, 18-22, 24-26, dan 36-42 gsm pada kecepatan 150 mpm. Menggunakan kain felt lebar 2,4 M dengan konfigurasi Top Felt 18,8 M dan Bottom Felt 25,0 M. Standar umur pakai kain felt adalah 6 - 8 bulan (atau mencapai produksi 1.000 ton paper ke atas), menghasilkan lebar kertas jadi 2,20 M.',
    dailyCheckpoints: [
      {
        area: 'Cylinder Mould Vat Section',
        items: [
          'Pemeriksaan kerataan level bubur encer di dalam vat cylinder: pastikan tidak ada turbulensi atau overflow sepihak.',
          'Kondisi kawat saringan cylinder mould: cek bebas lubang dan pastikan nosel needle shower berosilasi membersihkan kawat secara kontinu (tekanan 3.0 - 4.0 bar).',
          'Pembersihan pinggiran lembaran (edge cutter water jet) untuk memastikan lebar kertas 2,20 M stabil.'
        ]
      },
      {
        area: 'Felt Section (Lebar 2,4 M: Top 18,8 M & Bottom 25,0 M)',
        items: [
          'Pemeriksaan tegangan kain felt: pastikan regangan merata kiri-kanan pada Top Felt (18,8 M) dan Bottom Felt (25,0 M).',
          'Pencatatan akumulasi tonase & umur felt (target 6 - 8 bulan atau 1.000 ton paper up).',
          'Vakum Uhle Box pemeras felt: pastikan vakum berada pada 20 - 30 kPa untuk menjaga permeabilitas felt dari sumbatan getah/filler.',
          'Pemeriksaan roll pemandu felt otomatis (Auto Guide Felt) dan stretch roll.'
        ]
      },
      {
        area: 'Yankee MG Dryer & Touch Roll',
        items: [
          'Tekanan nip touch roll hidrolik/pneumatik terhadap silinder Yankee: pastikan transfer lembaran basah menempel sempurna tanpa gelembung.',
          'Kondisi bilah doctor blade Yankee: cek kerataan kontak dan ganti bila aus lebih dari 2 mm.',
          'Suhu permukaan silinder Yankee dan tekanan uap kondensat siphon.'
        ]
      }
    ],
    standardParameters: [
      { parameter: 'Kecepatan Mesin (SOP Speed)', range: '100 - 150 (Maks 150)', unit: 'mpm' },
      { parameter: 'Lebar Kertas Jadi (Trim Width)', range: '2,20', unit: 'Meter' },
      { parameter: 'Lebar Kain Felt', range: '2,40', unit: 'Meter' },
      { parameter: 'Panjang Top Felt', range: '18,80', unit: 'Meter' },
      { parameter: 'Panjang Bottom Felt', range: '25,00', unit: 'Meter' },
      { parameter: 'Life Time Felt Standar', range: '6 - 8 (1.000+ ton up)', unit: 'Bulan' },
      { parameter: 'Pilihan Gramatur (BW)', range: '12-16, 18-22, 24-26, 36-42', unit: 'gsm' },
      { parameter: 'Tekanan Uap Silinder Yankee (SOP)', range: '1.0 - 3.0', unit: 'bar' },
      { parameter: 'Kelembapan Kertas Akhir', range: '5.5% - 7.5%', unit: '%' }
    ],
    dcsIndicatorsGuide: [
      { code: 'SPD-PM1 (Machine Speed)', meaning: 'Kecepatan putar utama silinder cylinder mould & Yankee dryer', normalState: '100 - 150 mpm (Target SOP)', actionIfAbnormal: 'Sinkronisasi rasio kecepatan draw felt terhadap silinder pembentuk' },
      { code: 'PI-YANKEE (Steam Pressure)', meaning: 'Tekanan uap panas dalam bejana silinder pengering Yankee', normalState: '1.0 - 3.0 bar (Standar Semua Yankee)', actionIfAbnormal: 'Periksa aliran siphon pembuangan kondensat dan modulasi katup suplai uap agar stabil 1 - 3 bar' },
      { code: 'VAC-UHLE (Felt Vacuum)', meaning: 'Tekanan hisap dewatering kain felt pada Uhle box', normalState: '-20 s/d -30 kPa', actionIfAbnormal: 'Lakukan pencucian kimia felt jika vakum drop akibat pori buntu' }
    ],
    commonFaultsAndSolutions: [
      {
        fault: 'Kertas Tipis Putus Saat Transfer dari Felt ke Silinder Yankee (Sheet Drop / Peeling)',
        indication: 'Lembaran BW 12-22 gsm tidak menempel sempurna pada silinder Yankee dan jatuh di bawah touch roll.',
        cause: 'Permukaan kain felt kotor/tersumbat serat getah, kelembapan lembaran terlalu rendah, atau tekanan touch roll kurang seimbang.',
        immediateAction: 'Semprotkan air hangat pada felt, bersihkan alur felt dengan shower tekanan tinggi, dan naikkan tekanan pneumatic touch roll 5%.',
        permanentFix: 'Jadwalkan chemical felt washing (asam/basa lembut) dan periksa catatan umur felt; bila sudah melewati 6-8 bulan / 1.000 ton paper, lakukan penggantian felt baru.'
      },
      {
        fault: 'Kerut / Keriput Memanjang pada Kertas MG & Doorslag (Caliper Wrinkle)',
        indication: 'Permukaan kertas 24-42 gsm bergelombang atau berkerut diagonal di gulungan akhir.',
        cause: 'Tension pada Top Felt (18,8 M) atau Bottom Felt (25,0 M) tidak rata antara sisi driving dan tendere.',
        immediateAction: 'Sesuaikan posisi stretch roll felt manual pada sisi yang kendur.',
        permanentFix: 'Kalibrasi sensor auto-guide felt lebar 2,4 M dan periksa keselarasan bantalan bearing roll felt.'
      }
    ],
    k3SafetyProcedures: [
      'Waspada titik jepit (pinch point) antara Cylinder Mould, Touch Roll penekan, dan Silinder Yankee: dilarang mendekatkan tangan saat mesin running 150 mpm.',
      'Suhu silinder Yankee mencapai > 110°C: wajib memakai sarung tangan tahan panas saat menyuap ujung kertas (threading paper tail).',
      'Penggantian kain felt (Top 18,8 M / Bottom 25,0 M): wajib menerapkan prosedur LOTO (Lock Out Tag Out) total dengan pengawasan Kepala Regu.',
      'Lantai di sekitar bak vat cylinder selalu basah oleh air bubur kertas: wajib bersepatu safety anti-slip (SRC approved).'
    ],
    roleGuides: TISSUE_PM_MASTER_TRAINING.roleGuides,
    tissueEquipments: TISSUE_PM_MASTER_TRAINING.tissueEquipments,
    tissueQuizzes: TISSUE_PM_MASTER_TRAINING.tissueQuizzes
  },

  PM2: {
    machineId: 'PM2',
    name: 'Mesin Kertas PM2 (Cylinder Mould High-Speed Line)',
    tagline: 'Lini Produksi Kertas Tissue, MG Paper, & Doorslag Berkecepatan Tinggi (Speed 180 mpm - Lebar 2,25 M)',
    technicalSpecs: [
      { label: 'Tipe Mesin', value: 'Cylinder Mould (Silinder Cetakan Presisi Kecepatan Tinggi)' },
      { label: 'Produksi Utama', value: 'Tissue, MG Paper (Machine Glazed), Doorslag Paper' },
      { label: 'Rentang Basis Weight (BW)', value: '12-16 gsm, 18-22 gsm, 24-26 gsm, 36-42 gsm' },
      { label: 'Kecepatan Mesin (Speed)', value: '180 mpm (meter per menit) - Kecepatan Tertinggi di Unit 2,4 M' },
      { label: 'Lebar Kertas Jadi (Trim)', value: '2,25 M (2.250 mm)' },
      { label: 'Lebar Kain Felt', value: '2,4 M (2.400 mm)' },
      { label: 'Panjang Felt (Top & Bottom)', value: 'Top Felt: 18,8 M | Bottom Felt: 25,0 M' },
      { label: 'Life Time Felt (Masa Pakai)', value: '6 - 8 Bulan (atau pemakaian mencapai 1.000 ton paper up)' },
      { label: 'Standar Tekanan Yankee (Steam)', value: '1.0 - 3.0 bar (Standar Baku Semua Mesin PM-1, PM-2 & PM-5)' },
      { label: 'Sistem Pengering (Dryer)', value: 'High-Precision Yankee MG Dryer Ø 3.200 mm dengan Air Cap Hood Bertekanan' },
      { label: 'Seksi Pembentukan', value: 'Dual-Vat Cylinder Mould dengan pengatur aliran counter/uniflow' }
    ],
    operatingLimits: [
      { label: 'Kecepatan Operasi Maksimal', limit: '180 mpm', dangerZone: '> 185 mpm risiko web flutter lembaran tipis & keausan felt' },
      { label: 'Beban Umur Felt (Life Time)', limit: '6 - 8 Bulan / 1.000 Ton Up', dangerZone: '> 8 bulan ketebalan felt menipis dan kehilangan daya kompresibilitas' },
      { label: 'Tekanan Uap Silinder Yankee MG', limit: '1.0 - 3.0 bar (Standar Semua Yankee)', dangerZone: '> 3.2 bar alarm sistem bejana uap aktif & risiko scorching' },
      { label: 'Tegangan Felt Top & Bottom', limit: '2.8 - 3.8 kN/m', dangerZone: '> 4.2 kN/m keausan bearing roll guide berlebih' }
    ],
    paperGrades: [
      { code: 'TIS-12/16', name: 'Tissue Paper 12 - 16 gsm', gsmRange: '12 - 16 gsm', description: 'Tissue facial ultra-soft produksi kecepatan tinggi 180 mpm dengan serat lembut merata' },
      { code: 'TIS-18/22', name: 'Tissue Paper 18 - 22 gsm', gsmRange: '18 - 22 gsm', description: 'Tissue toilet & napkin higienis berkekuatan basah (wet strength) stabil' },
      { code: 'MG-24/26', name: 'MG Paper (Machine Glazed) 24 - 26 gsm', gsmRange: '24 - 26 gsm', description: 'Kertas MG licin mengkilap untuk kemasan makanan, kantong roti, & wrapping' },
      { code: 'DRS-36/42', name: 'Doorslag Paper 36 - 42 gsm', gsmRange: '36 - 42 gsm', description: 'Kertas doorslag semi-transparan kuat untuk pola garmen, tracing, & ekspor' }
    ],
    specialCharacteristics: 'PM2 dirancang untuk memproduksi kertas Tissue, MG Paper, dan Doorslag pada kecepatan operasi 180 mpm dengan lebar kertas jadi 2,25 M. Menggunakan kain felt lebar 2,4 M dengan pasangan Top Felt 18,8 M dan Bottom Felt 25,0 M berdaya tahan 6-8 bulan (> 1.000 ton paper up). Formasi serat sangat halus didukung silinder Yankee berkecepatan tinggi.',
    dailyCheckpoints: [
      {
        area: 'Cylinder Vat & Former High-Speed',
        items: [
          'Penyelarasan putaran cylinder mould terhadap kecepatan 180 mpm: pastikan bebas getaran poros.',
          'Pembersihan nosel needle shower bertekanan tinggi agar pori kawat silinder tidak tersumbat serat halus.',
          'Kontrol kestabilan konsistensi bubur encer (0.25% - 0.40%) pada bak vat untuk gramatur 12-42 gsm.'
        ]
      },
      {
        area: 'Felt Section (Lebar 2,4 M: Top 18,8 M & Bottom 25,0 M)',
        items: [
          'Pantau indikator pemakaian felt: jika telah berjalan 6 - 8 bulan atau mendekati 1.000 ton paper, ukur ketebalan dan permeabilitas air felt.',
          'Pemeriksaan auto-guide felt agar lintasan felt 2,4 M stabil di tengah roll.',
          'Pembersihan pelat hisap Uhle Box dari endapan serbuk kanji atau getah kayu.'
        ]
      },
      {
        area: 'Yankee MG Dryer & Creping Doctor',
        items: [
          'Pemeriksaan sudut dan keausan bilah doctor creping / cleaning: ganti tepat waktu bila aus > 2 mm.',
          'Pastikan permukaan silinder Yankee bebas baret atau penumpukan serat hangus.',
          'Cek sirkulasi uap air cap hood peniup udara panas.'
        ]
      }
    ],
    standardParameters: [
      { parameter: 'Kecepatan Mesin (SOP Speed)', range: '100 - 150 (Maks 180)', unit: 'mpm' },
      { parameter: 'Lebar Kertas Jadi (Trim Width)', range: '2,25', unit: 'Meter' },
      { parameter: 'Lebar Kain Felt', range: '2,40', unit: 'Meter' },
      { parameter: 'Panjang Top Felt', range: '18,80', unit: 'Meter' },
      { parameter: 'Panjang Bottom Felt', range: '25,00', unit: 'Meter' },
      { parameter: 'Life Time Felt Standar', range: '6 - 8 (1.000+ ton up)', unit: 'Bulan' },
      { parameter: 'Pilihan Gramatur (BW)', range: '12-16, 18-22, 24-26, 36-42', unit: 'gsm' },
      { parameter: 'Tekanan Uap Silinder Yankee (SOP)', range: '1.0 - 3.0', unit: 'bar' },
      { parameter: 'Kelembapan Kertas Akhir', range: '5.5% - 7.0%', unit: '%' }
    ],
    dcsIndicatorsGuide: [
      { code: 'SPD-PM2 (Speed Indicator)', meaning: 'Kecepatan putar utama lini PM2', normalState: '100 - 150 mpm (Target SOP, maks 180)', actionIfAbnormal: 'Periksa inverter motor drive dan beban arus listrik' },
      { code: 'PI-YANKEE2 (Yankee Pressure)', meaning: 'Tekanan uap panas silinder pengering', normalState: '1.0 - 3.0 bar (Standar Semua Yankee)', actionIfAbnormal: 'Atur katup modulasi uap otomatis agar selalu stabil pada rentang 1 - 3 bar' },
      { code: 'VAC-UHLE2 (Uhle Vacuum)', meaning: 'Vakum dewatering felt Top & Bottom', normalState: '-22 s/d -32 kPa', actionIfAbnormal: 'Cek water ring vacuum pump dan saringan pipa hisap' }
    ],
    commonFaultsAndSolutions: [
      {
        fault: 'Bintik Lubang Jarum (Pinholes) pada Kertas Tissue 12-16 gsm',
        indication: 'Terdapat lubang-lubang kecil transparan pada lembaran saat disinari lampu inspeksi.',
        cause: 'Ada serat kasar/gumpalan yang lolos dari saringan vat atau permukaan felt kotor berlubang.',
        immediateAction: 'Turunkan konsistensi bubur vat dan bersihkan kawat saringan cylinder dengan shower bertekanan.',
        permanentFix: 'Periksa kondisi kawat saringan cylinder mould dan cek masa pakai felt (ganti bila sudah > 6-8 bulan / 1.000 ton paper).'
      },
      {
        fault: 'Permukaan Kertas MG Tidak Mengkilap Merata (Uneven Gloss / Cloudiness)',
        indication: 'Sisi licin MG paper 24-26 gsm berawan atau tampak kusam di beberapa titik.',
        cause: 'Kontak penempelan lembaran pada silinder Yankee kurang padat akibat tekanan touch roll tidak rata.',
        immediateAction: 'Ratakan tekanan hidrolik touch roll dan bersihkan permukaan Yankee dengan doctor blade berpelumas ringan.',
        permanentFix: 'Rekondisi lapisan karet touch roll dan pastikan kadar air lembaran sebelum touch roll berada pada 65-68%.'
      }
    ],
    k3SafetyProcedures: [
      'Pada kecepatan 180 mpm, inersia putaran roll sangat besar: dilarang melakukan pembersihan roll manual saat mesin hidup.',
      'Suhu permukaan Yankee mencapai 120°C: gunakan APD lengan panjang tahan panas saat pemeriksaan area dryer.',
      'Gunakan masker pelindung debu serat halus saat berada di dekat gulungan reel tissue.',
      'Patuhi prosedur keselamatan pergantian felt Top 18,8 M dan Bottom 25,0 M dengan memasang gembok keselamatan LOTO.'
    ],
    roleGuides: TISSUE_PM_MASTER_TRAINING.roleGuides,
    tissueEquipments: TISSUE_PM_MASTER_TRAINING.tissueEquipments,
    tissueQuizzes: TISSUE_PM_MASTER_TRAINING.tissueQuizzes
  },

  PM5: {
    machineId: 'PM5',
    name: 'Mesin Kertas PM5 (Cylinder Mould Wide Format)',
    tagline: 'Lini Produksi Kertas Tissue, MG Paper, & Doorslag Format Lebar (Lebar Kertas 3,30 M - Single Felt 30,0 M)',
    technicalSpecs: [
      { label: 'Tipe Mesin', value: 'Cylinder Mould (Format Lebar / Wide Width Cylinder Line)' },
      { label: 'Produksi Utama', value: 'Tissue, MG Paper (Machine Glazed), Doorslag Paper' },
      { label: 'Rentang Basis Weight (BW)', value: '12-16 gsm, 18-22 gsm, 24-26 gsm, 36-42 gsm' },
      { label: 'Kecepatan Mesin (Speed)', value: '160 mpm (meter per menit)' },
      { label: 'Lebar Kertas Jadi (Trim)', value: '3,30 M (3.300 mm) - Terlebar di Pabrik' },
      { label: 'Lebar Kain Felt', value: '3,5 M (3.500 mm)' },
      { label: 'Panjang Felt', value: '30,0 M (Single Felt System - Tanpa Sambungan Top/Bottom Terpisah)' },
      { label: 'Life Time Felt (Masa Pakai)', value: '6 - 8 Bulan (atau pemakaian mencapai 1.000 ton paper up)' },
      { label: 'Standar Tekanan Yankee (Steam)', value: '1.0 - 3.0 bar (Standar Baku Semua Mesin PM-1, PM-2 & PM-5)' },
      { label: 'Sistem Pengering (Dryer)', value: 'Large Yankee MG Cylinder Ø 3.600 mm dengan High-Velocity Air Hood' },
      { label: 'Seksi Pembentukan', value: 'Wide Cylinder Vat 3,5 M dengan profil hidrolik perata serat otomatis' }
    ],
    operatingLimits: [
      { label: 'Kecepatan Operasi Maksimal', limit: '160 mpm', dangerZone: '> 165 mpm risiko getaran bentang roll 3,5 M & lembaran tipis robek' },
      { label: 'Beban Umur Single Felt 30 M', limit: '6 - 8 Bulan / 1.000 Ton Up', dangerZone: '> 8 bulan felt kehilangan elastisitas & transfer dewatering drop' },
      { label: 'Tekanan Uap Silinder Yankee MG', limit: '1.0 - 3.0 bar (Standar Semua Yankee)', dangerZone: '> 3.2 bar batas interlock tekanan bejana uap & overheat' },
      { label: 'Tegangan Single Felt 30 M', limit: '3.0 - 4.0 kN/m', dangerZone: '> 4.5 kN/m risiko keausan poros roll penegang' }
    ],
    paperGrades: [
      { code: 'TIS-12/16', name: 'Tissue Paper 12 - 16 gsm (Format Lebar)', gsmRange: '12 - 16 gsm', description: 'Tissue facial lebar 3,30 M berkualitas ekspor dengan kelembutan tinggi untuk mesin konversi otomatis' },
      { code: 'TIS-18/22', name: 'Tissue Paper 18 - 22 gsm (Format Lebar)', gsmRange: '18 - 22 gsm', description: 'Tissue toilet & napkin gulungan jumbo 3,30 M dengan formasi padat & daya serap optimal' },
      { code: 'MG-24/26', name: 'MG Paper (Machine Glazed) 24 - 26 gsm', gsmRange: '24 - 26 gsm', description: 'Kertas MG format lebar mengkilap sempurna untuk packaging higienis industri kemasan' },
      { code: 'DRS-36/42', name: 'Doorslag Paper 36 - 42 gsm (Format Lebar)', gsmRange: '36 - 42 gsm', description: 'Kertas doorslag format lebar 3,30 M untuk pola garmen, pembungkus sepatu/pakaian, & ekspor' }
    ],
    specialCharacteristics: 'PM5 adalah unit Cylinder Mould berformat terlebar di PT. PUP dengan lebar kertas jadi 3,30 M dan lebar kain felt 3,5 M. Menggunakan konfigurasi Single Felt sepanjang 30,0 M berkecepatan 160 mpm. Menghasilkan Tissue, MG Paper, dan Doorslag (BW 12-42 gsm) dengan efisiensi tinggi dan umur pakai felt 6-8 bulan (atau setelah mencapai 1.000 ton paper ke atas).',
    dailyCheckpoints: [
      {
        area: 'Wide Cylinder Vat & Mould Section (Lebar 3,5 M)',
        items: [
          'Pemeriksaan keseragaman pembentukan lembaran melintang di sepanjang lebar 3,5 meter bak vat.',
          'Pemeriksaan kawat saringan cylinder mould lebar: pastikan shower pembersih osilasi bekerja merata tanpa area blank.',
          'Cek deckle edge seals samping agar tidak ada kebocoran bubur di ujung silinder pembentuk.'
        ]
      },
      {
        area: 'Single Felt System 30,0 M (Lebar 3,5 M)',
        items: [
          'Inspeksi kondisi fisik kain felt tunggal 30,0 M: cek ketiadaan robekan tepi atau alur aus.',
          'Pencatatan tonase kerja kumulatif (standar masa pakai 6 - 8 bulan atau 1.000 ton paper up).',
          'Pemeriksaan vakum Uhle Box sepanjang 3,5 M untuk menjaga porositas pembuangan air felt.',
          'Periksa sistem pemandu otomatis (Auto Felt Guiding System) bentang lebar 3,5 M.'
        ]
      },
      {
        area: 'Large Yankee Dryer Ø 3.600 mm & Pop Reel 3,30 M',
        items: [
          'Tekanan nip penempelan touch roll sepanjang 3,30 M: pastikan tekanan seimbang antara sisi kiri dan kanan.',
          'Kondisi bilah doctor blade Yankee: cek kerataan kontak dan ganti bila aus lebih dari 2 mm.',
          'Pemeriksaan gulungan kertas jadi di Pop Reel: pastikan pinggiran gulungan rapi bebas kerut.'
        ]
      }
    ],
    standardParameters: [
      { parameter: 'Kecepatan Mesin (SOP Speed)', range: '100 - 150 (Maks 160)', unit: 'mpm' },
      { parameter: 'Lebar Kertas Jadi (Trim Width)', range: '3,30', unit: 'Meter' },
      { parameter: 'Lebar Kain Felt', range: '3,50', unit: 'Meter' },
      { parameter: 'Panjang Single Felt', range: '30,00', unit: 'Meter' },
      { parameter: 'Konfigurasi Felt', range: 'Single Felt System', unit: 'Tipe' },
      { parameter: 'Life Time Felt Standar', range: '6 - 8 (1.000+ ton up)', unit: 'Bulan' },
      { parameter: 'Pilihan Gramatur (BW)', range: '12-16, 18-22, 24-26, 36-42', unit: 'gsm' },
      { parameter: 'Tekanan Uap Silinder Yankee (SOP)', range: '1.0 - 3.0', unit: 'bar' },
      { parameter: 'Kelembapan Kertas Akhir', range: '5.5% - 7.2%', unit: '%' }
    ],
    dcsIndicatorsGuide: [
      { code: 'SPD-PM5 (Machine Speed)', meaning: 'Kecepatan putar utama lini PM5', normalState: '100 - 150 mpm (Target SOP, maks 160)', actionIfAbnormal: 'Sinkronisasi rasio draw felt terhadap silinder vat & Yankee' },
      { code: 'PI-YANKEE5 (Yankee Steam Pressure)', meaning: 'Tekanan uap panas silinder Yankee 3.600 mm', normalState: '1.0 - 3.0 bar (Standar Semua Yankee)', actionIfAbnormal: 'Kontrol otomatis cascading steam valve agar tekanan stabil pada 1 - 3 bar' },
      { code: 'VAC-UHLE5 (Single Felt Vacuum)', meaning: 'Vakum dewatering kain felt tunggal 30 M', normalState: '-22 s/d -32 kPa', actionIfAbnormal: 'Lakukan continuous felt cleaning jika vakum drop' }
    ],
    commonFaultsAndSolutions: [
      {
        fault: 'Lembaran Kertas Tipis Kendur di Bagian Tengah Bentang 3,30 M (Center Baggy Web)',
        indication: 'Lembaran kertas tissue/MG kendur melengkung di tengah saat melintasi Yankee ke reel drum.',
        cause: 'Kain felt bentang 3,5 M mengalami deformasi kendur tengah (felt stretching) atau tekanan touch roll tengah lebih rendah dibanding tepi.',
        immediateAction: 'Tingkatkan tegangan stretch roll felt dan atur defleksi hidrolik bantalan touch roll.',
        permanentFix: 'Cek kumulatif tonase Single Felt 30,0 M; bila telah melewati masa pakai 6-8 bulan atau 1.000 ton up, segera ganti dengan felt baru.'
      },
      {
        fault: 'Tepi Kertas Doorslag / MG Robek Saat Doffing Gulungan (Edge Crack)',
        indication: 'Tepi kertas sobek kecil-kecil sepanjang pinggiran gulungan 3,30 M.',
        cause: 'Nosel pemotong tepi basah (edge squirt nozzle) tidak tajam atau tumpukan debu serat di ujung Yankee.',
        immediateAction: 'Bersihkan nosel pemotong tepi air dan atur tekanan air pemotong menjadi 4 bar.',
        permanentFix: 'Ganti orifice nosel edge squirt keramik dan bersihkan bilah doctor blade sisi ujung.'
      }
    ],
    k3SafetyProcedures: [
      'Bentang mesin sangat lebar (3,5 M): dilarang keras meraih lembaran kertas yang putus ke dalam nip saat mesin berputar.',
      'Suhu udara panas dalam Air Cap Hood mencapai > 130°C: gunakan APD tahan panas dan kacamata safety saat inspeksi.',
      'Prosedur pemasangan Single Felt 30,0 M berbobot berat: wajib menggunakan crane hoist tersertifikasi dan dipimpin oleh Kepala Regu serta Supervisor K3.',
      'Sistem pencegah kebakaran kabut air di area dryer hood aktif otomatis: patuhi jalur evakuasi saat sirine peringatan berbunyi.'
    ],
    roleGuides: TISSUE_PM_MASTER_TRAINING.roleGuides,
    tissueEquipments: TISSUE_PM_MASTER_TRAINING.tissueEquipments,
    tissueQuizzes: TISSUE_PM_MASTER_TRAINING.tissueQuizzes
  },
  REWINDER: REWINDER_TRAINING_DATA,
  PUPMS: {
    machineId: 'PM1',
    name: 'PUPMS (Panca Usahatama Paramita Management System)',
    tagline: 'Sistem Manajemen Terpadu PT. PUP (4 Pilar, Budaya 5C, ISO 9001:2015, TPM, & Kaizen)',
    technicalSpecs: [
      { label: 'Sistem Manajemen', value: 'PUPMS (Panca Usahatama Paramita Management System)' },
      { label: 'Pondasi Pilar', value: '4 Pilar (Mentalitas Dasar, Manajemen Strategi, Manajemen Operasi, Pemberdaya)' },
      { label: 'Budaya Kerja', value: '5C (Caring, Credible, Competent, Competitive, Customer Delight)' },
      { label: 'Standar Mutu', value: 'ISO 9001:2015 & IFRA 12647-3' },
      { label: 'Metodologi Pemeliharaan', value: 'TPM (Zero Accident, Zero Defect, Zero Breakdown)' },
      { label: 'Alat Kualitas', value: 'Horenso, 5R, PIP, Kaizen 8 Langkah, A3 Report, 7 Tools, Sampling MIL-STD-105E' }
    ],
    operatingLimits: [],
    paperGrades: [],
    specialCharacteristics: 'Sistem manajemen terintegrasi untuk menyelaraskan strategi PT. PUP dari pimpinan puncak hingga aktivitas harian shift operator.',
    dailyCheckpoints: [],
    standardParameters: [],
    dcsIndicatorsGuide: [],
    commonFaultsAndSolutions: [],
    k3SafetyProcedures: []
  }
};

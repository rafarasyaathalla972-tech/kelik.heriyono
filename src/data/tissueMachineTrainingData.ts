import { 
  TissueMachineEquipmentDetail, 
  TissueMachineQuizItem, 
  RoleResponsibilityGuide,
  MachineMediaConfig,
  MachineTrainingData
} from '../types';

// Import image assets
import tissueWetEndImg from '../assets/images/tissue_wet_end_1789486344949.jpg';
import tissueHeadboxWireImg from '../assets/images/tissue_headbox_wire_1789486361955.jpg';
import tissueDryerYankeeImg from '../assets/images/tissue_dryer_yankee_1789486377249.jpg';
import tissuePopeReelImg from '../assets/images/tissue_pope_reel_1789486397213.jpg';
import pm1Img from '../assets/images/pm1_machine_1789447494837.jpg';
import pm2Img from '../assets/images/pm2_machine_1789447511803.jpg';
import pm5Img from '../assets/images/pm5_machine_1789447532514.jpg';

// =========================================================================
// 1. DAFTAR PERALATAN DETAIL TISSUE MESIN (SLIDE 1 - 16)
// =========================================================================
export const TISSUE_MACHINE_EQUIPMENTS: TissueMachineEquipmentDetail[] = [
  // --- TAHAP 1: WET END & FORMING ---
  {
    id: 'tm-eq-1',
    number: 1,
    slideRef: 'Slide 1 & 2',
    name: 'Pompa Chest 4 & Jalur Distribusi Pulp',
    stage: 'WET_END',
    stageName: 'Wet End (Pembentukan Lembaran Basah)',
    categoryTag: 'Feed & Stock Supply',
    function: 'Memompa buburan pulp matang dari Chest 4 menuju stuffbox melalui pipa bertekanan terkontrol.',
    workingPrinciple: 'Pompa sentrifugal heavy-duty mentransfer buburan pulp berkepekatan tinggi (~3.0 - 3.5%) dari tangki penampungan akhir (Chest 4) secara kontinu menuju stuffbox dan sensor CRC.',
    criticalParameters: [
      { label: 'Konsistensi Chest 4', value: '3.0% - 3.5%', importance: 'Bahan baku primer sebelum pengenceran terkontrol' },
      { label: 'Tekanan Pompa', value: '2.0 - 2.8 bar', importance: 'Mencegah kavitasi dan fluktuasi pasokan ke stuffbox' },
      { label: 'Level Min. Chest 4', value: '> 30%', importance: 'Mencegah udara tersedot masuk ke aliran buburan' }
    ],
    operatorKeyPoints: [
      'Memantau kelancaran pasokan buburan dari Chest 4 dan memeriksa amper motor pompa.',
      'Memastikan tidak terjadi penumpukan kerak buburan pada leher hisap dan impeller pompa.',
      'Segera koordinasi dengan Stock Prep jika level buburan Chest 4 di bawah 30%.'
    ],
    helperDuties: [
      'Pembersihan tumpahan buburan di sekitar pangkalan pompa Chest 4.',
      'Memeriksa tidak ada baut pondasi kendur atau getaran abnormal pada rumah pompa.',
      'Melaporkan jika ada tetesan packing seal gland yang melebihi standar aman (10-15 tetes/menit).'
    ],
    karuInspectionPoints: [
      'Memverifikasi kontinuitas pasokan buburan antar pergantian shift.',
      'Memeriksa kestabilan freeness (°SR) buburan yang masuk dari Stock Prep.',
      'Menetapkan prioritas pembersihan filter suction saat jadwal maintenance.'
    ],
    kepalaPmGovernance: [
      'Evaluasi efisiensi konsumsi daya pompa dan keandalan mechanical seal.',
      'Audit keselarasan flow rate antara kapasitas Stock Prep dan kapasitas tarik PM.'
    ],
    troubleshooting: {
      fault: 'Fluktuasi Pasokan Buburan ke Stuffbox',
      indication: 'Level stuffbox bergelombang dan pembacaan flow control tidak stabil.',
      immediateAction: 'Periksa level Chest 4, bersihkan saringan strainer jika tersumbat gumpalan, pastikan valve suction terbuka penuh.',
      permanentSolution: 'Kalibrasi inverter pompa Chest 4 dan jadwalkan flushing pipa transfer secara berkala.'
    },
    k3SafetyWarning: 'Waspada lantai basah licin dan bagian poros pompa yang berputar. Jangan menyentuh kopling tanpa penutup pelindung safety guard.',
    associatedPhotoTitle: 'Pompa Chest 4 & Instalasi Pipa Distribusi Utama',
    videoTimecode: '01:15'
  },
  {
    id: 'tm-eq-2',
    number: 2,
    slideRef: 'Slide 2 & 3',
    name: 'CRC (Consistency Regulator Controller) & Control Valve Dilution',
    stage: 'WET_END',
    stageName: 'Wet End (Pembentukan Lembaran Basah)',
    categoryTag: 'Consistency Control',
    function: 'Mendeteksi kekentalan (consistency) buburan pulp secara real-time dan mengatur bukaan valve air pengencer (dilution).',
    workingPrinciple: 'Pulp dari Chest 4 dibypass melintasi blade/sensor geser CRC. Layar bagian atas menampilkan nilai actual consistency, sedangkan layar bagian bawah adalah batasan maksimal set point. Jika konsistensi aktual melebihi set point, CRC mengirim sinyal elektronik untuk membuka control valve air delusen lebih lebar.',
    criticalParameters: [
      { label: 'Consistency Target CRC', value: '2.60% - 2.80%', importance: 'Toleransi ketat sebelum masuk ke stuffbox' },
      { label: 'Tekanan Air Delusen', value: '3.0 - 4.0 bar', importance: 'Tekanan air pengencer harus lebih tinggi dari tekanan pipa pulp' },
      { label: 'Akurasi Sensor', value: '± 0.05%', importance: 'Kunci kestabilan gramatur (GSM) tissue akhir' }
    ],
    operatorKeyPoints: [
      'Membaca layar CRC secara berkala: bandingkan nilai actual (atas) dengan set point batas (bawah).',
      'Mengamati respons bukaan control valve dilution saat ada perubahan kekentalan pulp mendadak.',
      'Melakukan verifikasi manual (tes konsistensi laboratorium) minimal 1x per shift untuk kalibrasi.'
    ],
    helperDuties: [
      'Membantu mengambil sampel buburan di titik sampling kran bypass CRC untuk uji lab.',
      'Menjaga kebersihan fisik housing pemancar (transmitter) CRC dari percikan air dan kotoran kimia.'
    ],
    karuInspectionPoints: [
      'Memverifikasi batas alarm deviasi konsistensi pada modul kontrol digital.',
      'Memastikan kran bypass CRC tidak tersumbat oleh serpihan plastik atau kawat yang lolos dari screening.'
    ],
    kepalaPmGovernance: [
      'Menetapkan kurva kalibrasi konsistensi tahunan bersama tim QC dan Instrumentasi.',
      'Audit deviasi gramatur jumbo roll terhadap stabilitas pembacaan sensor CRC.'
    ],
    troubleshooting: {
      fault: 'Sensor CRC Hunting / Nilai Konsistensi Melonjak-lonjak',
      indication: 'Grafik pembacaan berosilasi tajam, bukaan valve dilution bergerak membuka-menutup liar.',
      immediateAction: 'Beralih ke mode semi-auto/manual sementara, lakukan pembersihan blade sensor dari gumpalan lilitan serat atau plastik, periksa kestabilan tekanan air dilution.',
      permanentSolution: 'Pembersihan menyeluruh sel transmiter dan kalibrasi zero-span transmitter instrumentasi.'
    },
    k3SafetyWarning: 'Peralatan kontrol digital sensitif bertegangan listrik DC/AC. Jangan menyemprotkan air bertekanan langsung ke unit transmitter sensor.',
    associatedPhotoTitle: 'Sensor CRC & Tampilan Layar Set Point Kontrol',
    videoTimecode: '02:40'
  },
  {
    id: 'tm-eq-3',
    number: 3,
    slideRef: 'Slide 2 & 3',
    name: 'Stuffbox (Stufbox), Valve Control & Flow Control Panel',
    stage: 'WET_END',
    stageName: 'Wet End (Pembentukan Lembaran Basah)',
    categoryTag: 'Flow Metering',
    function: 'Menstabilkan head tekanan hidrostatik buburan dan mengatur laju alir (flow) presisi menuju pompa slurry 1.',
    workingPrinciple: 'Stuffbox bekerja sebagai bak penenang konstan (headbox perantara). Dari stuffbox, pulp turun melewati Valve Control dan Flow Control (magnetic flowmeter). Dua alat ini saling berkaitan: flowmeter membaca debit aktual dan mengirimkan data ke layar sentuh panel DCS. Jika aliran aktual lebih kecil dari setting, operator menambah persen bukaan valve; jika berlebih, bukaan dikurangi via panel sentuh.',
    criticalParameters: [
      { label: 'Flow Setting Target', value: '35 - 45 m³/h', importance: 'Disesuaikan dengan gramatur dan speed target' },
      { label: 'Bukaan Valve Control', value: '30% - 60%', importance: 'Rentang kerja linear terbaik untuk katup kontrol presisi' },
      { label: 'Stabilitas Level Stuffbox', value: 'Overflow konstan', importance: 'Menjamin tekanan gravitasi stabil menuju pipa hisap slurry' }
    ],
    operatorKeyPoints: [
      'Memeriksa tampilan layar sentuh DCS: perhatikan Flow Setting vs Actual Flow Value dan % Bukaan Valve.',
      'Melakukan adjustment bukaan valve secara bertahap (1-2%) saat mengubah set point debit, hindari hentakan.',
      'Memastikan talang overflow stuffbox selalu mengalirkan sedikit buburan balik ke Chest 4 (tanda head konstan).'
    ],
    helperDuties: [
      'Memeriksa kebersihan sekat overflow stuffbox dari buih kotoran atau kerak serat kering.',
      'Pembersihan area bawah stuffbox dari tetesan pulp saat pembersihan shift.'
    ],
    karuInspectionPoints: [
      'Mengevaluasi kesesuaian bukaan katup terhadap kecepatan mesin (speed draw ratio).',
      'Memeriksa kalibrasi magnetic flowmeter jika ada selisih neraca massa berat kering kertas.'
    ],
    kepalaPmGovernance: [
      'Menetapkan formula standar bukaan flow control untuk setiap grade tissue (Facial, Toilet, Towel).',
      'Standardisasi SOP penyesuaian gramatur tanpa menimbulkan sheet break di wet end.'
    ],
    troubleshooting: {
      fault: 'Aliran Flow Terbaca Drop Padahal Valve Terbuka',
      indication: 'Actual flow value anjlok sementara valve opening naik ke 80-100%.',
      immediateAction: 'Periksa apakah ada sumbatan serat di celah katup kerucut valve control, cek level stuffbox apakah tekor/kosong.',
      permanentSolution: 'Lakukan flushing jalur pipa stuffbox ke slurry pump dan periksa lining elektroda flowmeter.'
    },
    k3SafetyWarning: 'Akses stuffbox berada di ketinggian platform mezzanin. Wajib menggunakan tangga yang kokoh dan selalu berpegangan pada handrail safety.',
    associatedPhotoTitle: 'Panel Layar Sentuh Flow Control & Unit Katup Otomatis',
    videoTimecode: '04:10'
  },
  {
    id: 'tm-eq-4',
    number: 4,
    slideRef: 'Slide 4',
    name: 'Sistem Dosis Chemical Dry Strength & Wet Strength',
    stage: 'WET_END',
    stageName: 'Wet End (Pembentukan Lembaran Basah)',
    categoryTag: 'Chemical Additives',
    function: 'Menyuntikkan bahan kimia penguat serat basah (Wet Strength) dan penguat kering (Dry Strength) pada titik aliran optimal.',
    workingPrinciple: 'Chemical Dry Strength (penguat kering berbasis kationik polimer/starch) diinjeksikan langsung ke manhole Chest 4 agar memiliki waktu kontak (retention time) cukup lama untuk diserap serat pulp. Chemical Wet Strength (poliamid epiklorohidrin/PAE) diinjeksikan pada corong outlet stuffbox searah aliran pulp yang menuju ke pompa slurry 1 agar tidak terdegradasi berlebihan oleh turbulensi.',
    criticalParameters: [
      { label: 'Titik Injeksi Dry Strength', value: 'Manhole Chest 4', importance: 'Memberikan retention time absorpsi serat' },
      { label: 'Titik Injeksi Wet Strength', value: 'Outlet Stuffbox', importance: 'Menjaga reaktivitas polimer PAE menuju slurry pump' },
      { label: 'Dosis Wet Strength', value: '8 - 15 kg/ton kertas', importance: 'Memenuhi standar tensile basah tissue towel/napkin' },
      { label: 'Dosis Dry Strength', value: '3 - 6 kg/ton kertas', importance: 'Meningkatkan tensile kering dan mengurangi debu serat' }
    ],
    operatorKeyPoints: [
      'Memastikan dosing pump bahan kimia berfungsi kontinu dan flowmeter kimia tidak macet.',
      'Memeriksa pipa nosel injeksi pada manhole Chest 4 dan outlet stuffbox tidak tersumbat kerak kimia kering.',
      'Mencatat konsumsi volume bahan kimia per jam pada logsheet shift.'
    ],
    helperDuties: [
      'Memeriksa stok level drum/IBC tank Wet Strength dan Dry Strength di chemical preparation room.',
      'Membantu penggantian drum kimia dengan APD lengkap (sarung tangan karet kimia, kacamata goggle, apron).'
    ],
    karuInspectionPoints: [
      'Memverifikasi rasio dosis kimia terhadap tonase kertas riil yang diproduksi.',
      'Memeriksa hasil uji tarik basah (wet tensile) dan tarik kering (dry tensile) di ruang QC.'
    ],
    kepalaPmGovernance: [
      'Optimasi biaya formulasi kimia per ton kertas jadi (Cost per Ton Optimization).',
      'Audit sertifikasi food-grade atau eco-label chemical untuk pasar tissue ekspor.'
    ],
    troubleshooting: {
      fault: 'Tensile Basah (Wet Tensile) Turun Mendadak di Bawah Standar QC',
      indication: 'Kertas tissue mudah sobek saat dibasahi air saat pengujian laboratorium.',
      immediateAction: 'Periksa nosel injeksi di outlet stuffbox apakah tersumbat, cek tangki PAE apakah kosong, periksa amper dosing pump.',
      permanentSolution: 'Flushing jalur nosel dengan air panas, periksa tanggal kedaluwarsa polimer kimia dan pH buburan.'
    },
    k3SafetyWarning: 'BAHAYA BAHAN KIMIA: Bahan kimia Wet Strength dapat mengiritasi mata dan kulit. Selalu kenakan kacamata pelindung goggle, sarung tangan nitril, dan masker saat menangani pompa kimia.',
    associatedPhotoTitle: 'Titik Injeksi Manhole Chest 4 & Outlet Stuffbox',
    videoTimecode: '05:50'
  },
  {
    id: 'tm-eq-5',
    number: 5,
    slideRef: 'Slide 5',
    name: 'Pompa Slurry 1 & 2 serta Baterai LCC (Low Consistency Cleaner)',
    stage: 'WET_END',
    stageName: 'Wet End (Pembentukan Lembaran Basah)',
    categoryTag: 'Cleaning & Dilution',
    function: 'Mencampur buburan dengan air silo (white water) dan membersihkan kotoran berat (pasir, serpihan logam, dirt) via gaya sentrifugal.',
    workingPrinciple: 'Pulp dari stuffbox masuk ke suction Pompa Slurry 1 bersamaan dengan penambahan air pengencer dari bak silo (silo water/white water). Pompa slurry bertekanan tinggi mendorong buburan masuk ke baterai kerucut LCC bertingkat. Gaya sentrifugal vortex memisahkan pasir dan partikel berat ke bawah (reject), sementara serat bersih (accept) naik ke atas keluar menuju Headbox Tank.',
    criticalParameters: [
      { label: 'Konsistensi Masuk LCC', value: '0.6% - 0.9%', importance: 'Efisiensi pemisahan sentrifugal optimal' },
      { label: 'Pressure Drop (ΔP) LCC', value: '1.4 - 1.8 bar', importance: 'Menjamin putaran pusaran vortex di dalam kerucut LCC' },
      { label: 'Tekanan Inlet Slurry 1', value: '2.5 - 3.2 bar', importance: 'Menjaga pasokan stabil ke seluruh kerucut pembersih' }
    ],
    operatorKeyPoints: [
      'Mengamati tekanan inlet dan outlet LCC cleaner pada pressure gauge analog/digital.',
      'Memeriksa corong pengeluaran reject LCC: harus menyembur kontinu berbentuk payung/heliks tanpa mampet.',
      'Mengatur katup balancing agar debit accept antar kerucut terbagi secara simetris.'
    ],
    helperDuties: [
      'Inspeksi visual berkala pada ujung bawah (tip) kerucut LCC: bersihkan kerikil atau pasir yang menyumbat.',
      'Menampung dan membuang pasir buangan reject LCC ke bak penampungan limbah padat.'
    ],
    karuInspectionPoints: [
      'Memeriksa keausan keramik cone tip LCC setiap kali stop mesin (aus menyebabkan reject bocor berlebih).',
      'Memastikan tekanan hisap pompa slurry 1 stabil bebas kavitasi gelembung udara.'
    ],
    kepalaPmGovernance: [
      'Evaluasi angka dirt count (flek pasir) pada lembaran tissue jadi.',
      'Perencanaan peremajaan cone cleaner keramik untuk mencegah lolosnya pasir perusak doctor blade.'
    ],
    troubleshooting: {
      fault: 'Baterai LCC Mampet / Reject Tidak Keluar',
      indication: 'Tekanan inlet LCC melonjak naik, kotoran pasir lolos ke headbox dan merusak permukaan wire/roll.',
      immediateAction: 'Tutup isolasi valve kerucut yang mampet, lakukan backwash / tusuk nosel reject tip dengan kawat pembersih plastik lunak.',
      permanentSolution: 'Lakukan pembersihan strainer pipa silo water dan perbaiki sistem coarse screening di Stock Prep.'
    },
    k3SafetyWarning: 'Pipa LCC bertekanan hidrolik hingga 3.5 bar. Jangan membuka klem pengikat kerucut saat sistem pompa sedang running aktif.',
    associatedPhotoTitle: 'Unit Pompa Slurry & Baterai Pembersih Sentrifugal LCC',
    videoTimecode: '07:25'
  },
  {
    id: 'tm-eq-6',
    number: 6,
    slideRef: 'Slide 5',
    name: 'Headbox Tank & Sistem Dosis Chemical Antifoam (Defoamer)',
    stage: 'WET_END',
    stageName: 'Wet End (Pembentukan Lembaran Basah)',
    categoryTag: 'Deaeration & Buffering',
    function: 'Menampung buburan bersih accept LCC dan mengeliminasi gelembung busa (foam) agar tidak merusak formasi lembaran tissue.',
    workingPrinciple: 'Buburan accept LCC masuk ke Headbox Tank untuk stabilisasi level sebelum dipompa ke headbox manifold. Karena turbulensi tinggi dan kandungan zat organik pulp mudah menimbulkan buih busa udara, chemical Antifoam diinjeksikan secara kontinu. Antifoam memecah tegangan permukaan cairan sehingga gelembung mikro pecah sebelum masuk ke bibir slice headbox.',
    criticalParameters: [
      { label: 'Dosis Antifoam', value: '150 - 350 ml/menit', importance: 'Menghilangkan busa tanpa menyebabkan titik minyak di kertas' },
      { label: 'Level Headbox Tank', value: '65% - 80%', importance: 'Menjaga pasokan hidrostatik konstan ke headbox' },
      { label: 'Pengendalian Busa Permukaan', value: 'Bebas gumpalan foam', importance: 'Mencegah terbentuknya lubang jarum (pinholes) pada tissue' }
    ],
    operatorKeyPoints: [
      'Mengontrol valve distribusi flow buburan dari headbox tank sesuai kebutuhan pembentukan di wire.',
      'Memeriksa permukaan tangki: tidak boleh ada busa tebal menggumpal di permukaan pulp.',
      'Menyesuaikan dosing rate antifoam jika terlihat gelembung busa halus mengapung di kolam headbox.'
    ],
    helperDuties: [
      'Memeriksa level tangki larutan kimia Antifoam di dekat area mesin PM.',
      'Membersihkan kerak buih kering di dinding bibir tangki headbox saat mesin cuci kawat/stop.'
    ],
    karuInspectionPoints: [
      'Memverifikasi efektivitas defoamer: memeriksa lembaran kertas di pope reel apakah ada pinholes.',
      'Memastikan pipa sirkulasi balik tangki headbox tidak menimbulkan pusaran vortex udara liar.'
    ],
    kepalaPmGovernance: [
      'Standarisasi jenis defoamer silikon vs non-silikon untuk memastikan ramah lingkungan dan aman bagi kesehatan konsumen.',
      'Audit efisiensi pemakaian aditif kimia terhadap laju produksi per bulan.'
    ],
    troubleshooting: {
      fault: 'Busa Meluap di Headbox Tank & Banyak Pinholes pada Tissue',
      indication: 'Busa putih tebal menumpuk di permukaan tangki, kertas jadi memiliki bintik bolong-bolong halus.',
      immediateAction: 'Tingkatkan dosis pompa antifoam 10-20%, pastikan pipa hisap pompa tidak menyedot udara, cek kualitas air silo.',
      permanentSolution: 'Flushing tangki larutan defoamer, ganti jenis formulasi chemical jika terjadi resistensi mikroba/suhu tinggi.'
    },
    k3SafetyWarning: 'Tumpahan chemical antifoam membuat lantai luar biasa licin seperti oli. Segera bersihkan tumpahan dengan serbuk gergaji/air sabun.',
    associatedPhotoTitle: 'Headbox Tank & Titik Injeksi Kimia Antifoam',
    videoTimecode: '09:00'
  },
  {
    id: 'tm-eq-7',
    number: 7,
    slideRef: 'Slide 6 & 7',
    name: 'Headbox Manifold & Sistem Injeksi PEO (Polyethylene Oxide)',
    stage: 'WET_END',
    stageName: 'Wet End (Pembentukan Lembaran Basah)',
    categoryTag: 'Formation & Dispersion',
    function: 'Mendistribusikan aliran buburan secara merata selebar mesin dan menginjeksi PEO untuk formasi serat sempurna.',
    workingPrinciple: 'Pulp dari headbox tank dialirkan melalui pipa manifold bercabang banyak (manifold pipe) untuk meratakan profil kecepatan ke seluruh lebar kawat. PEO diinjeksikan secara presisi pada pipa inlet manifold. PEO bertindak sebagai retention & formation aid rantai panjang yang membungkus serat, mencegah flokulasi (penggumpalan serat), serta mempercepat drainase pelepasan air bebas saat menempel di wire.',
    criticalParameters: [
      { label: 'Dosis PEO Injeksi', value: '0.8 - 1.8 kg/ton serat', importance: 'Menghasilkan formasi serat merata (awan-awan halus)' },
      { label: 'Konsistensi Headbox', value: '0.18% - 0.20%', importance: 'PARAMETER SANGAT KRITIS (Slide 7): Menjamin kestabilan GSM akhir' },
      { label: 'Stabilitas Aliran Manifold', value: 'Variasi < 1.5%', importance: 'Mencegah profil gramatur tebal-tipis melintang (CD profile)' }
    ],
    operatorKeyPoints: [
      'MEMASTIKAN KONSISTENSI HEADBOX BERADA KETAT DI ANGKA 0,18% - 0,20% SECARA KONTINU.',
      'Menjaga flow rate chemical PEO stabil; fluktuasi PEO akan membuat formasi kertas berawan kasar atau basah.',
      'Mengamati keseragaman pancaran aliran dari manifold masuk ke kolam headbox.'
    ],
    helperDuties: [
      'Memeriksa tangki pelarutan PEO: pastikan PEO terlarut sempurna tanpa ada "mata ikan" (gumpalan lendir tak larut).',
      'Membantu pembersihan nosel injeksi PEO saat jadwal maintenance preventif mingguan.'
    ],
    karuInspectionPoints: [
      'Melakukan sampling konsistensi headbox 2 jam sekali dan cross-check dengan uji gramatur oven.',
      'Memeriksa keseimbangan tekanan manifold Operating Side (OS) dan Drive Side (DS).'
    ],
    kepalaPmGovernance: [
      'Validasi kualitas formasi lembaran tissue (look-through optical scanner) terhadap kepuasan pelanggan.',
      'Audit konsumsi polimer PEO per shift kerja untuk pengendalian biaya bahan baku.'
    ],
    troubleshooting: {
      fault: 'Formasi Lembaran Berawan Tebal-Tipis & Flokulasi Serat Parah',
      indication: 'Kertas tissue terlihat belang gumpal tidak seragam saat diterawang ke cahaya lampu.',
      immediateAction: 'Periksa flow pompa PEO apakah macet/berkurang, sesuaikan konsistensi headbox agar tidak melebihi 0.20%, periksa viskositas larutan PEO.',
      permanentSolution: 'Bersihkan saringan larutan PEO dan kalibrasi sistem pengaduk (agitator) tangki preparasi PEO.'
    },
    k3SafetyWarning: 'Serbuk PEO kering bereaksi menjadi sangat licin jika terkena tetesan air. Gunakan masker debu saat menuang serbuk PEO.',
    associatedPhotoTitle: 'Pipa Manifold Headbox & Nosel Injeksi PEO',
    videoTimecode: '10:45'
  },
  {
    id: 'tm-eq-8',
    number: 8,
    slideRef: 'Slide 6, 7 & 8',
    name: 'Cylinder Mould, Wire Section & Couch Roll Transfer',
    stage: 'WET_END',
    stageName: 'Wet End (Pembentukan Lembaran Basah)',
    categoryTag: 'Forming & Dewatering',
    function: 'Membentuk jaring lembaran tissue basah di atas kawat silinder berputar dan mentransfernya ke kain felt.',
    workingPrinciple: 'Buburan encer (0,18-0,20%) melintasi wire cylinder mould berputar. Serat pulp tertahan di permukaan wire membentuk jaring kertas tipis, sementara air lolos menembus wire dan turun gravitasi ke bak silo. Jaring serat basah kemudian dikontakkan dengan kain felt (kain wol pemindah) melalui penekanan Couch Roll (chouch roll). Tahap ini disebut forming suction di mana air awal diperas keluar.',
    criticalParameters: [
      { label: 'Kerapatan Side Seal (End Cover)', value: 'Rapat 100% tanpa celah', importance: 'Slide 8: Memaksimalkan daya hisap vacuum blower silinder mould' },
      { label: 'Kerapatan Dekel (Deckle OS/DS)', value: 'Presisi terhadap wire', importance: 'Slide 8: Menjaga stabilitas flow sisi OS dan DS agar lebar kertas rata' },
      { label: 'Tekanan Couch Roll', value: '1.2 - 2.0 bar', importance: 'Transfer lembaran basah ke felt sempurna tanpa crushing/penyok' },
      { label: 'Kondisi Celah Slice Headbox', value: 'Rata & bebas cacat', importance: 'Menjamin tebal semburan buburan merata ke silinder mould' }
    ],
    operatorKeyPoints: [
      'Memastikan penutup kanan-kiri silinder mould (side seal) terpasang rapat sempurna.',
      'Memeriksa dekel (deckle OS dan DS) rapat terhadap mould agar tidak terjadi kebocoran buburan ke sisi samping.',
      'Memantau vacuum blower cylinder mould beroperasi normal untuk daya hisap dewatering yang konstan.',
      'Memastikan celah slice headbox dalam kondisi bagus, lurus, dan rata.'
    ],
    helperDuties: [
      'Membersihkan serpihan serat basah yang menempel pada bibir dekel dan frame samping silinder mould.',
      'Memeriksa kelancaran aliran air pembuangan bak silo di bawah silinder mould.',
      'Membantu operator saat proses memasang/menyetel posisi dekel saat start-up.'
    ],
    karuInspectionPoints: [
      'Memeriksa kondisi fisik wire kawat silinder: pastikan tidak ada sobek, benjolan, atau jahitan kawat kendur.',
      'Memverifikasi tekanan pneumatik couch roll seimbang kiri dan kanan (OS/DS).'
    ],
    kepalaPmGovernance: [
      'Evaluasi umur pakai wire cylinder mould (target jam terbang dan tonase produksi).',
      'Investigasi akar masalah jika terjadi cacat lembaran berulang akibat keausan silinder mould.'
    ],
    troubleshooting: {
      fault: 'Lembaran Kertas Lepas dari Wire / Sheet Drop di Area Couch Roll',
      indication: 'Buburan tidak menempel ke felt, menumpuk dan putus di area jepit couch roll.',
      immediateAction: 'Tingkatkan tekanan hisap vacuum mould, naikkan tekanan kontak couch roll secara perlahan, periksa kebersihan wire dan felt.',
      permanentSolution: 'Ganti seal samping silinder mould yang aus dan lakukan alignment keselarasan sudut kontak couch roll.'
    },
    k3SafetyWarning: 'TITIK JEPIT BERBAHAYA (NIP HAZARD): Area putaran silinder mould dan couch roll adalah zona jepit mematikan. Dilarang keras membersihkan dengan tangan saat berputar!',
    associatedPhotoTitle: 'Cylinder Mould, Wire Forming & Couch Roll Press',
    videoTimecode: '12:30'
  },
  {
    id: 'tm-eq-9',
    number: 9,
    slideRef: 'Slide 8 & 9',
    name: 'Sistem Cleaning Wire: Shower HPP (High Pressure Pump)',
    stage: 'WET_END',
    stageName: 'Wet End (Pembentukan Lembaran Basah)',
    categoryTag: 'Wire Cleaning',
    function: 'Membersihkan pori-pori jaring kawat (wire) silinder mould dari sumbatan fines, getah pitch, dan sisa bahan kimia.',
    workingPrinciple: 'Pompa tekanan tinggi (High Pressure Pump) menyemprotkan air bersih bertekanan tinggi melalui deretan nosel presisi langsung ke permukaan jaring kawat. Semprotan ini merontokkan serat halus (fines) yang terjebak di anyaman kawat sebelum kawat kembali berputar memasuki zona pembentukan buburan baru.',
    criticalParameters: [
      { label: 'Tekanan Shower HPP Wire', value: '15 - 25 bar', importance: 'Membersihkan kotoran tanpa merusak serat kawat stainless' },
      { label: 'Kondisi Nozel Spray', value: '100% lancar tanpa sumbatan', importance: 'Mencegah terbentuknya garis belang basah pada kawat' },
      { label: 'Kualitas Air HPP', value: 'Air filtrasi jernih bebas pasir', importance: 'Mencegah nosel tergores atau tersumbat kotoran air' }
    ],
    operatorKeyPoints: [
      'Selalu mengontrol shower HPP wire tetap bertekanan bagus dan pola semprotan kipas/jarum sempurna.',
      'Memeriksa tidak ada nosel HPP yang buntu atau menyemprot bengkok keluar jalur kawat.',
      'Memastikan kawat silinder mould bersih merata tanpa bercak noda gelap saat diterangi lampu inspeksi.'
    ],
    helperDuties: [
      'Memeriksa saringan strainer air pompa HPP wire setiap awal shift.',
      'Melakukan pembersihan berkala pada bak penampung cipratan air shower HPP.'
    ],
    karuInspectionPoints: [
      'Memverifikasi tekanan kerja pompa HPP pada manometer pipa distribusi air.',
      'Memeriksa kebersihan wire saat stop produksi untuk memastikan tidak terjadi akumulasi pitch getah.'
    ],
    kepalaPmGovernance: [
      'Standarisasi pemeliharaan pompa HPP dan jadwal penggantian tip nosel spray keramik.',
      'Pengendalian konsumsi air bersih industri di area wet end.'
    ],
    troubleshooting: {
      fault: 'Sebagian Nosel HPP Buntu Menyebabkan Kawat Bergaris Hitam',
      indication: 'Muncul garis gelap memanjang pada wire dan kertas memiliki cacat bayangan garis.',
      immediateAction: 'Aktifkan mekanisme sikat internal shower pipa (internal brush handle) atau bersihkan nosel buntu saat stop lembaran.',
      permanentSolution: 'Tingkatkan kerapatan mesh saringan air masuk HPP dan pasang filter ganda paralel.'
    },
    k3SafetyWarning: 'Pancaran air jet bertekanan 25 bar dapat menembus kulit manusia. Jangan mengarahkan semprotan shower ke anggota tubuh!',
    associatedPhotoTitle: 'Deretan Nosel Shower Pembersih Kawat Silinder Bertekanan',
    videoTimecode: '14:15'
  },
  {
    id: 'tm-eq-10',
    number: 10,
    slideRef: 'Slide 9 & 10',
    name: 'Sistem Cleaning Felt: Needle Shower Berosilasi & Isolating (Oscillator)',
    stage: 'WET_END',
    stageName: 'Wet End (Pembentukan Lembaran Basah)',
    categoryTag: 'Felt Conditioning',
    function: 'Membersihkan pori-pori kain felt secara kontinu menggunakan jarum air bertekanan tinggi yang berosilasi gerak ke kiri dan kanan.',
    workingPrinciple: 'Pembersihan dimulai dari shower pendingin/dilution agar kotoran melunak. Lalu felt disemprot needle shower dengan lubang nosel 0,8 mm - 1,0 mm pada tekanan 10 - 12 bar secara kontinu. Boom pipa shower harus selalu bergerak (osilasi) bolak-balik menggunakan motor isolating (oscillator) mekanik. Gerakan osilasi ini MUTLAK DIPERLUKAN agar kain felt tidak cacat/tergores dan seluruh permukaan felt tersiram bersih secara merata.',
    criticalParameters: [
      { label: 'Ukuran Lubang Nosel', value: '0.8 mm - 1.0 mm', importance: 'Slide 9: Ukuran jarum air presisi untuk penetrasi ke serat wol felt' },
      { label: 'Tekanan Shower Needle', value: '10 - 12 bar', importance: 'Slide 9: Tekanan standar kontinu pelepasan kotoran felt' },
      { label: 'Gerakan Osilasi (Isolating)', value: 'Wajib bergerak kontinu', importance: 'Slide 9: Mencegah felt cacat/tergores garis dan menjamin kebersihan merata' },
      { label: 'Stroke Osilator', value: '150 - 200 mm', importance: 'Meliputi seluruh celah antar nosel semprotan' }
    ],
    operatorKeyPoints: [
      'MEMASTIKAN MOTOR OSILATOR/ISOLATING SELALU BERGERAK AKTIF; JIKA OSILATOR MACET, SHOWER HARUS SEGERA DIMATIKAN!',
      'Menjaga tekanan pompa needle shower stabil di rentang 10 - 12 bar.',
      'Memeriksa tidak ada nosel needle yang tersumbat agar pori felt tidak mampet belang-belang.'
    ],
    helperDuties: [
      'Inspeksi visual pergerakan mekanik lengan osilator (stroke maju-mundur) setiap 1 jam.',
      'Melumasi engsel mekanik dan baut pemegang boom shower dari karat cipratan air.'
    ],
    karuInspectionPoints: [
      'Memastikan interlock keamanan osilator aktif: jika osilator mati, alarm berbunyi atau tekanan needle turun otomatis.',
      'Memeriksa kerataan kebersihan felt saat mesin berputar lambat.'
    ],
    kepalaPmGovernance: [
      'Memperpanjang usia pakai kain felt (target masa pakai 60 - 90 hari) dengan mencegah kerusakan akibat kelalaian osilasi shower.',
      'Audit konsumsi energi dan efisiensi sistem rekondisi felt.'
    ],
    troubleshooting: {
      fault: 'Osilator Shower Macet / Berhenti di Satu Titik',
      indication: 'Boom shower diam tidak bergerak ke kiri-kanan saat needle shower bertekanan 12 bar menyemprot.',
      immediateAction: 'SEGERA TURUNKAN TEKANAN SHOWER NEEDLE HINGGA < 3 BAR ATAU MATIKAN SEMENTARA untuk mencegah felt terpotong/tergores garis!',
      permanentSolution: 'Perbaiki motor gearbox penggerak osilator dan lumasi rel pemandu luncur stainless.'
    },
    k3SafetyWarning: 'Mekanisme osilator bergerak terus-menerus. Jauhkan tangan dari lengan engsel tuas pemandu mekanik saat sedang berosilasi.',
    associatedPhotoTitle: 'Boom Pipa Shower Needle & Unit Motor Osilator Mekanik',
    videoTimecode: '16:00'
  },
  {
    id: 'tm-eq-11',
    number: 11,
    slideRef: 'Slide 10',
    name: 'Chemical Felt Cleaner (FC) & Pipa Dosis Terkendali',
    stage: 'WET_END',
    stageName: 'Wet End (Pembentukan Lembaran Basah)',
    categoryTag: 'Felt Conditioning',
    function: 'Melarutkan getah pitch, minyak, dan kotoran kimia yang menyumbat pori-pori felt agar daya dewatering tetap maksimal.',
    workingPrinciple: 'Ketika felt mulai padat (compact) atau mampet, chemical Felt Cleaner (FC) diinjeksikan ke dalam pipa shower air secara kontinu. Dosis diatur secara presisi hingga larutan mencapai pH 8,5. Suasana basa ringan terukur ini melarutkan deposit organik tanpa merusak serat sintetis kain felt, sehingga transfer buburan dari forming ke Yankee berjalan sempurna tanpa resiko sheet drop.',
    criticalParameters: [
      { label: 'Target pH Larutan FC', value: 'pH 8.5', importance: 'Slide 10: Dosis optimal kontinu pelarutan kotoran tanpa merusak serat felt' },
      { label: 'Metode Injeksi', value: 'Kontinu pada pipa shower', importance: 'Pembersihan konstan mencegah felt mengeras (compacting)' },
      { label: 'Kondisi Nozel Semprot', value: 'Bebas sumbatan kerak', importance: 'Memastikan cairan kimia tersebar merata selebar kain felt' }
    ],
    operatorKeyPoints: [
      'Mengukur pH air cucian felt secara berkala dengan kertas indikator / pH-meter (target pH 8.5).',
      'Mengamati daya serap air felt (drainase felt) apakah kembali optimal setelah penambahan FC.',
      'Memastikan tidak ada overdosis kimia yang menyebabkan busa berlebih pada bak penampung bawah felt.'
    ],
    helperDuties: [
      'Membantu penyiapan dan pengecekan level tangki cairan kimia Felt Cleaner.',
      'Mencatat nomor lot chemical dan memastikan jalur pipa dosing tidak bocor ke lantai kerja.'
    ],
    karuInspectionPoints: [
      'Memverifikasi permeabilitas felt (uji daya tembus udara/air) di berbagai zona lebar felt.',
      'Mengatur ulang laju pompa dosing FC jika ada perubahan jenis pulp recycle (OCC/Virgin).'
    ],
    kepalaPmGovernance: [
      'Audit biaya pemakaian chemical felt cleaner terhadap penghematan energi steam pengeringan di silinder Yankee.',
      'Standardisasi chemical cleaning ramah lingkungan tanpa merusak sistem IPAL (WWT).'
    ],
    troubleshooting: {
      fault: 'Felt Cepat Mengeras (Hard & Compact) Serta Buburan Tidak Menempel Sempurna',
      indication: 'Kadar air kertas basah naik drastis, felt mengkilap licin dan sering terjadi sheet drop di couch roll.',
      immediateAction: 'Cek konsentrasi dosing Felt Cleaner, naikkan dosis ke batas aman hingga pH 8.5, periksa kebersihan nosel shower needle.',
      permanentSolution: 'Lakukan periodic chemical shock cleaning saat stop mesin mingguan dengan sirkulasi chemical khusus.'
    },
    k3SafetyWarning: 'Cairan Felt Cleaner pekat bersifat korosif/basa. Wajib menggunakan kacamata goggle kimia, apron karet, dan sarung tangan PVC panjang.',
    associatedPhotoTitle: 'Instalasi Dosing Chemical Felt Cleaner (FC)',
    videoTimecode: '17:45'
  },
  {
    id: 'tm-eq-12',
    number: 12,
    slideRef: 'Slide 8, 10 & 11',
    name: 'Sistem U-Box Vacuum Dewatering (3 Titik Vakum Felt)',
    stage: 'WET_END',
    stageName: 'Wet End (Pembentukan Lembaran Basah)',
    categoryTag: 'Vacuum Dewatering',
    function: 'Menyerap kotoran yang telah terlepas serta mengeringkan kadar air (moisture) kain felt secara intensif.',
    workingPrinciple: 'Setelah disemprot shower needle dan FC, kain felt melintasi bibir celah U-box vacuum yang terhubung dengan blower vakum sentrifugal. Daya hisap vakum menarik air kotor dan busa keluar dari pori felt. Terdapat 3 unit U-box vacuum: U-box 1 & 2 untuk cleaning felt dan dewatering awal, serta U-box 3 untuk penyesuaian moisture sebelum lembaran tissue dibawa menempel ke permukaan silinder Yankee.',
    criticalParameters: [
      { label: 'Kerapatan U-Box Terhadap Felt', value: 'Rapat 100% tanpa bocor', importance: 'Slide 8 & 9: U-box vacuum TIDAK BOLEH BOCOR agar daya hisap maksimal' },
      { label: 'Tingkat Vakum U-Box 1 & 2', value: '-20 s/d -35 kPa', importance: 'Menghisap air cucian kotoran keluar dari anyaman felt' },
      { label: 'Tingkat Vakum U-Box 3', value: '-30 s/d -45 kPa', importance: 'Penyesuaian kelembaban felt sebelum transfer ke Yankee' },
      { label: 'Kondisi Cover Strip U-Box', value: 'Keramik / UHMWPE mulus', importance: 'Mencegah gesekan berlebih yang dapat merobek permukaan felt' }
    ],
    operatorKeyPoints: [
      'MEMASTIKAN U-BOX VACUUM TIDAK BOCOR TERHADAP KAIN FELT (Slide 8 & Pertanyaan Evaluasi #9).',
      'Memantau indikator manometer vakum di setiap U-box; penurunan hisapan menandakan kebocoran atau seal aus.',
      'Memeriksa kelancaran pengeluaran air lewat separator tank dan pompa penguras air vakum.'
    ],
    helperDuties: [
      'Memeriksa pipa pengeluaran vacuum seal water: tidak ada genangan tumpah di kolam mesin.',
      'Membersihkan end-deckle pemanjang strip U-box saat penggantian ukuran lebar kertas.'
    ],
    karuInspectionPoints: [
      'Memeriksa keausan cover strip keramik U-box pada saat penggantian kain felt baru.',
      'Memastikan daya hisap blower vakum seimbang dan tidak terjadi kavitasi pada pompa vakum.'
    ],
    kepalaPmGovernance: [
      'Optimasi konsumsi daya blower vakum (kWh per ton kertas).',
      'Evaluasi korelasi kekeringan felt keluar dari U-box terhadap konsumsi steam silinder Yankee.'
    ],
    troubleshooting: {
      fault: 'Daya Hisap Vakum Drop Tajam / U-Box Bocor',
      indication: 'Jarum manometer vakum turun mendekati nol, felt keluar dalam kondisi sangat basah dan berat.',
      immediateAction: 'Periksa seal tepi felt di U-box, cek apakah kain felt terlipat atau lari keluar dari bibir celah U-box, periksa kebocoran paking pipa vakum.',
      permanentSolution: 'Ganti cover strip U-box yang aus atau melengkung dan perbaiki alignment tracking kain felt.'
    },
    k3SafetyWarning: 'Daya hisap celah U-box sangat kuat. Dilarang keras menempelkan benda lentur atau pakaian kerja dekat bibir vakum saat blower beroperasi!',
    associatedPhotoTitle: 'Unit Pipa Hisap U-Box Vacuum & Saluran Dewatering Felt',
    videoTimecode: '19:20'
  },

  // --- TAHAP 2: DRY END (PENGERINGAN YANKEE & HEAT EXCHANGER) ---
  {
    id: 'tm-eq-13',
    number: 13,
    slideRef: 'Slide 11 & 13',
    name: 'Silinder Pengering Yankee (MG Cylinder) & Touch Roll',
    stage: 'DRY_END',
    stageName: 'Dry End (Pengeringan & Creping)',
    categoryTag: 'Drying Cylinder',
    function: 'Mengeringkan lembaran tissue basah melalui perpindahan panas konduksi steam dan memberikan permukaan halus kilap (glazing).',
    workingPrinciple: 'Lembaran tissue basah dibawa kain felt menuju permukaan silinder Yankee berdiameter besar yang dipanaskan uap steam dari dalam. Roll penekan (touch roll/pressure roll) menekan lembaran tissue menempel rapat pada permukaan luar silinder Yankee. Panas uap menyebabkan air dalam lembaran menguap secara kilat (flash evaporation) sehingga tissue menjadi kering, lentur, dan kuat.',
    criticalParameters: [
      { label: 'Suhu Permukaan Yankee', value: '85 - 90 °C', importance: 'Slide 13: SUHU STABIL AGAR COATING & RELEASE BERFUNGSI MAKSIMAL' },
      { label: 'Tekanan Uap Steam Masuk', value: '2.5 - 4.5 bar', importance: 'Disesuaikan dengan gramatur kertas dan speed mesin' },
      { label: 'Tekanan Tekan Touch Roll', value: '3.5 - 5.5 bar', importance: 'Menjamin adhesi lembaran tissue merata ke silinder Yankee' },
      { label: 'Kondisi Permukaan Silinder', value: 'Cermin mulus tanpa gores', importance: 'Menghindari cacat belang atau sobek lembaran di creping blade' }
    ],
    operatorKeyPoints: [
      'MENJAGA TEMPERATUR YANKEE STABIL DI KISARAN 85 - 90 °C SECARA KONTINU (Slide 13 & Evaluasi #7).',
      'Mengawasi penempelan lembaran pada silinder Yankee: harus menempel rata tanpa ada gelembung udara (blister).',
      'Memeriksa pembuangan kondensat internal Yankee melalui sistem rotary joint dan thermo-compressor.'
    ],
    helperDuties: [
      'Memeriksa kebersihan area sekitar penampung broke di bawah silinder Yankee.',
      'Membantu pengawasan tekanan hidrolik/pneumatik silinder touch roll.'
    ],
    karuInspectionPoints: [
      'Memverifikasi profil suhu permukaan Yankee menggunakan termometer inframerah (infrared pyrometer) di 5 titik lebar.',
      'Memastikan touch roll cover tidak mengalami overheating atau deformasi bentuk.'
    ],
    kepalaPmGovernance: [
      'Audit konsumsi spesifik steam (kg steam / kg tissue kering).',
      'Perencanaan jadwal regrinding permukaan silinder Yankee dan touch roll untuk mempertahankan efisiensi transfer panas.'
    ],
    troubleshooting: {
      fault: 'Suhu Yankee Dingin / Berfluktuasi Liar',
      indication: 'Kertas keluar dalam kondisi lembek basah, suhu terbaca turun di bawah 80 °C, resiko putus lembaran tinggi.',
      immediateAction: 'Periksa aliran uap steam dari boiler, cek apakah ada penumpukan air kondensat di dalam silinder Yankee (siphon macet), buka bypass kondensat.',
      permanentSolution: 'Servis unit siphon arm internal silinder Yankee dan kalibrasi control valve steam otomatis.'
    },
    k3SafetyWarning: 'BAHAYA PERMUKAAN PANAS & TEKANAN TINGGI: Silinder Yankee bersuhu tinggi hingga 100°C+ dan berputar kencang. Pasang pagar pengaman barikade interlock.',
    associatedPhotoTitle: 'Silinder Yankee Raksasa & Unit Penekan Touch Roll',
    videoTimecode: '21:10'
  },
  {
    id: 'tm-eq-14',
    number: 14,
    slideRef: 'Slide 12',
    name: 'Heat Exchanger (HE) Finned Steam Pipes & Blower HE Air Cap Hood',
    stage: 'DRY_END',
    stageName: 'Dry End (Pengeringan & Creping)',
    categoryTag: 'Convective Drying',
    function: 'Menghasilkan tiupan udara panas kering berkecepatan tinggi untuk meniup dan mengeringkan lembaran tissue di atas silinder Yankee.',
    workingPrinciple: 'Steam panas dimasukkan ke dalam pipa-pipa Heat Exchanger yang memiliki sirip-sirip (fins) logam berulir. Panas uap merambat efisien ke seluruh permukaan sirip. Blower HE kemudian menghisap udara dan meniupkannya melintasi sirip panas tersebut, lalu menyemburkan udara panas ke arah permukaan lembaran tissue yang sedang berputar di silinder Yankee (sistem hood tudung pengering).',
    criticalParameters: [
      { label: 'Kebersihan Sirip HE', value: 'Wajib bersih bebas debu', importance: 'Slide 12: Sirip HARUS DIBERSIHKAN agar transfer panas maksimal' },
      { label: 'Temperatur Udara Tiup HE', value: '110 - 140 °C', importance: 'Meningkatkan laju evaporasi pengeringan lapisan luar kertas' },
      { label: 'Kecepatan Tiup Udara Hood', value: '45 - 65 m/detik', importance: 'Merobek lapisan batas uap jenuh di permukaan tissue' },
      { label: 'Tekanan Steam Pipa HE', value: '4.0 - 6.0 bar', importance: 'Sumber energi panas penukar kalor' }
    ],
    operatorKeyPoints: [
      'MEMASTIKAN SIRIP-SIRIP HE BERSIH DARI DEBU SERAT KERTAS AGAR TIUPAN PANAS BISA MAKSIMAL (Slide 12 & Evaluasi #4).',
      'Memantau temperatur udara hood dan memeriksa amper motor blower HE.',
      'Memastikan sirkulasi udara hood seimbang agar lembaran tidak berkibar tertiup angin kencang.'
    ],
    helperDuties: [
      'Melakukan pembersihan berkala pada filter udara masuk blower HE setiap pergantian shift.',
      'Menggunakan vacuum cleaner industri atau blower angin kompresor untuk meniup debu yang menempel di sela-sela sirip pipa HE saat jadwal pembersihan.'
    ],
    karuInspectionPoints: [
      'Inspeksi visual sirip HE saat stop produksi mingguan: tidak boleh ada sumbatan serat terbakar atau jelaga.',
      'Memeriksa tidak ada kebocoran sambungan pipa steam di dalam box heat exchanger.'
    ],
    kepalaPmGovernance: [
      'Audit neraca efisiensi termal sistem HE terhadap kenaikan kapasitas produksi kecepatan mesin.',
      'Penetapan standar SOP preventive maintenance pembersihan berkala sirip HE.'
    ],
    troubleshooting: {
      fault: 'Efisiensi Pengeringan HE Turun Drastis / Udara Keluar Kurang Panas',
      indication: 'Suhu udara tiup hood tidak tercapai meski valve steam dibuka 100%, kertas tetap lembab.',
      immediateAction: 'Periksa sela-sela sirip HE apakah tersumbat debu kertas tebal, bersihkan filter udara masuk blower HE, cek perangkap kondensat steam (steam trap).',
      permanentSolution: 'Lakukan hydro-cleaning sirip finned tube dengan bahan pelarut ramah lingkungan dan bersihkan kerak internal pipa.'
    },
    k3SafetyWarning: 'BAHAYA DEBU TERBAKAR: Debu kertas kering yang menempel pada sirip HE panas berpotensi menimbulkan percikan api pijar. Selalu sediakan APAR CO2 di dekat unit HE.',
    associatedPhotoTitle: 'Pipa Bersirip Heat Exchanger (HE) & Unit Blower Hood',
    videoTimecode: '23:30'
  },
  {
    id: 'tm-eq-15',
    number: 15,
    slideRef: 'Slide 13',
    name: 'Sistem Spray Chemical Coating & Release Agent Silinder Yankee',
    stage: 'DRY_END',
    stageName: 'Dry End (Pengeringan & Creping)',
    categoryTag: 'Yankee Protection & Creping',
    function: 'Menyemprotkan lapisan film kimia pelindung permukaan silinder Yankee dan memfasilitasi pelepasan lembaran saat dikerutkan blade.',
    workingPrinciple: 'Chemical Coating dan Release Agent disemprotkan secara kontinu ke permukaan silinder Yankee menggunakan pipa boom spray dengan nosel atomisasi bertekanan minimal 2,5 bar. Coating membentuk lapisan film polimer tipis yang: (1) Membantu meratakan permukaan mikro silinder Yankee, (2) Melindungi logam silinder dari gesekan keausan doctor blade, dan (3) Memberikan daya lekat yang tepat. Release agent mengontrol kemudahan terkelupasnya kertas saat membentur ujung mata pisau creping.',
    criticalParameters: [
      { label: 'Tekanan Semprot Spray Boom', value: 'Min. 2.5 bar', importance: 'Slide 13: Menghasilkan atomisasi kabut kimia yang sangat rata' },
      { label: 'Kondisi Nozel Spray Boom', value: '100% lancar bebas buntu', importance: 'Slide 13: Menjaga lapisan film coating di Yankee rata dan stabil' },
      { label: 'Rasio Coating : Release', value: '60 : 40 s/d 70 : 30', importance: 'Disesuaikan dengan gramatur tissue dan kelembutan target' },
      { label: 'Suhu Kerja Optimal Film', value: '85 - 90 °C', importance: 'Slide 13: Menjamin polimerisasi film coating elastis terbentuk sempurna' }
    ],
    operatorKeyPoints: [
      'MEMASTIKAN PRESSURE SPRAY MINIMAL 2.5 BAR DAN TIDAK ADA NOZEL YANG BUNTU (Slide 13).',
      'Mengawasi ketebalan film coating di silinder: permukaan harus tampak mengkilap transparan keemasan rata tanpa belang.',
      'Menjaga suhu Yankee stabil 85 - 90 °C agar bahan kimia coating dan release berfungsi maksimal.'
    ],
    helperDuties: [
      'Pemeriksaan level tangki harian kimia Coating dan Release agent.',
      'Membantu membersihkan kerak kimia kering yang menetes di baki penampung bawah spray boom.'
    ],
    karuInspectionPoints: [
      'Memverifikasi laju konsumsi kimia per jam dan memeriksa kestabilan tekanan pompa spray.',
      'Memeriksa getaran doctor blade; jika blade bergetar (chattering), sesuaikan rasio coating-release segera.'
    ],
    kepalaPmGovernance: [
      'Perlindungan aset silinder Yankee: mencegah terjadinya goresan parah akibat kegagalan film pelindung coating.',
      'Uji kelembutan (handfeel softness) dan elastisitas tissue hasil creping.'
    ],
    troubleshooting: {
      fault: 'Lapisan Coating Mengelupas Belang-Belang / Terdengar Suara Kerikan Tajam Blade',
      indication: 'Permukaan silinder tampak botak belang di satu sisi, blade bergetar keras dan timbul serbuk putih.',
      immediateAction: 'Periksa nosel spray boom di area yang botak apakah tersumbat, naikkan sedikit dosis coating, periksa tekanan semprot minimal 2.5 bar.',
      permanentSolution: 'Ganti nosel spray yang aus, kalibrasi jarak semprot boom ke permukaan Yankee, bersihkan filter cairan kimia.'
    },
    k3SafetyWarning: 'Kabut spray kimia halus mudah terhirup. Gunakan masker pernapasan standar industri saat melakukan inspeksi dekat spray boom Yankee.',
    associatedPhotoTitle: 'Boom Nosel Semprot Chemical Coating & Release Agent',
    videoTimecode: '25:15'
  },
  {
    id: 'tm-eq-16',
    number: 16,
    slideRef: 'Slide 15 & 16',
    name: 'Doctor Creping Blade & Sistem Pengerutan Lembaran (Creping 15%)',
    stage: 'DRY_END',
    stageName: 'Dry End (Pengeringan & Creping)',
    categoryTag: 'Creping & Softness',
    function: 'Mengelupas lembaran tissue kering dari silinder Yankee sekaligus menciptakan pengerutan mikro (creping ~15%) untuk kelembutan ekstra.',
    workingPrinciple: 'Lembaran tissue kering yang menempel pada lapisan coating silinder Yankee meluncur dengan kecepatan tinggi membentur ujung mata pisau Doctor Creping Blade. Benturan ini mengelupas kertas dan menimbulkan gelombang kerutan mikro halus (**creping**) sebesar **15%**. Pengerutan mikro ini memberikan sifat lembut (softness), daya serap air tinggi (absorbency), dan elastisitas regang pada tissue.',
    criticalParameters: [
      { label: 'Rasio Creping Standar', value: '15%', importance: 'Slide 15: Rasio pengerutan baku untuk tissue lembut berdaya serap tinggi' },
      { label: 'Kondisi Mata Pisau Blade', value: 'Rata, tajam, tidak gompal', importance: 'Slide 16: Mencegah timbulnya sobekan tepi atau garis belang' },
      { label: 'Sudut Kontak Blade (Bevel Angle)', value: '75° - 82°', importance: 'Menentukan frekuensi kerutan per sentimeter kertas' },
      { label: 'Tekanan Tekan Blade Holder', value: '1.8 - 2.5 bar', importance: 'Menjaga penekanan seragam di seluruh lebar kerja mesin' }
    ],
    operatorKeyPoints: [
      'MEMASTIKAN DOCTOR BLADE DALAM KONDISI BAIK DAN RATA (TIDAK ADA YANG GOMPAL / TUMPUL) (Slide 16).',
      'Mengawasi indikator rasio speed Yankee vs Pope Reel agar nilai creping 15% tercapai stabil.',
      'Melakukan penggantian blade secara disiplin sesuai jam operasi (setiap 6 - 8 jam tergantung keausan).'
    ],
    helperDuties: [
      'Menyiapkan bilah pisau creping cadangan baru yang sudah dipotong rapi sesuai ukuran lebar mesin.',
      'Membantu proses penggantian blade dengan menggunakan sarung tangan pelindung anti-sayat (Kevlar cut-resistant gloves).',
      'Menyingkirkan pisau bekas ke kotak pembuangan limbah tajam bertutup.'
    ],
    karuInspectionPoints: [
      'Inspeksi kerataan penekanan blade holder di sisi Operating Side (OS) dan Drive Side (DS).',
      'Memeriksa mikrometer keausan mata blade setelah dicopot untuk mengevaluasi keausan abnormal.'
    ],
    kepalaPmGovernance: [
      'Evaluasi biaya konsumsi bilah doctor blade (tipe carbon steel vs ceramic coated blade).',
      'Standarisasi uji laboratorium elastisitas peregangan creping (stretch percentage).'
    ],
    troubleshooting: {
      fault: 'Mata Blade Creping Gompal Menyebabkan Sobekan Lembaran (Sheet Break)',
      indication: 'Muncul garis robek memanjang di lembaran kertas dan terdengar suara desis gesekan kasar.',
      immediateAction: 'SEGERA LAKUKAN PENGGANTIAN MATA PISAU BLADE BARU, periksa apakah ada kotoran pasir LCC yang lolos menggores mata blade.',
      permanentSolution: 'Audit efisiensi LCC cleaner di wet end dan perketat jadwal penggantian blade berkala.'
    },
    k3SafetyWarning: 'BAHAYA PISAU SANGAT TAJAM: Bilah doctor blade setajam pisau bedah operasi. WAJIB menggunakan sarung tangan Kevlar Level 5 saat memegang atau mengganti blade!',
    associatedPhotoTitle: 'Unit Pemegang Doctor Blade Creping & Penyetel Sudut Kontak',
    videoTimecode: '27:00'
  },

  // --- TAHAP 3: POPE REEL (PENGGULUNGAN JUMBO ROLL) ---
  {
    id: 'tm-eq-17',
    number: 17,
    slideRef: 'Slide 14 & 15',
    name: 'Pope Reel Drum & Sistem Penggulungan Spool Core Kontinu',
    stage: 'POPE_REEL',
    stageName: 'Pope Reel (Penggulungan Jumbo Roll)',
    categoryTag: 'Continuous Winding',
    function: 'Menggulung lembaran tissue kering berkerut menjadi gulungan induk raksasa (Jumbo Roll) secara kontinu dan padat seragam.',
    workingPrinciple: 'Lembaran tissue yang telah mengalami proses creping keluar dari Yankee dan diarahkan melewati roll pemandu menuju drum Pope Reel yang berputar. Besi as gulungan (spool shaft) ditumpangkan di atas drum pope reel dengan penekanan hidrolik/pneumatik. Putaran drum memutar spool secara friksi permukaan (surface winding) untuk menggulung kertas menjadi Jumbo Roll padat seragam siap diproses lanjut ke mesin Rewinder.',
    criticalParameters: [
      { label: 'Rasio Kecepatan Pope vs Yankee', value: 'Speed Yankee × (1 - Creping)', importance: 'Slide 15 & Evaluasi #3: Contoh speed Yankee 150 mpm -> Pope Reel = 127.5 mpm' },
      { label: 'Kepadatan Gulungan (Roll Density)', value: 'Seragam dari inti ke luar', importance: 'Menghindari roll kempes (sponge roll) atau pecah bintang' },
      { label: 'Tekanan Kontak Lengan Sekunder', value: '2.0 - 3.5 bar', importance: 'Menjaga kestabilan penekanan spool saat diameter gulungan membesar' }
    ],
    operatorKeyPoints: [
      'MEMANTAU KESESUAIAN SPEED POPE REEL TERHADAP SPEED YANKEE DENGAN RUMUS CREPING 15% (150 mpm -> 127.5 mpm).',
      'Melakukan proses pergantian spool baru (turn-up) secara cepat dan presisi tanpa membuang banyak kertas sisa.',
      'Memastikan penekanan lengan primer dan sekunder pope reel seimbang sisi OS dan DS.'
    ],
    helperDuties: [
      'Mempersiapkan spool besi bersih yang sudah dilapisi double tape / perekat ujung kertas.',
      'Memasang tali pemandu (air nozzle / tail cutter) saat proses start lembaran baru.',
      'Membantu menaikkan dan menurunkan jembatan rel penampung spool dengan crane hoist.'
    ],
    karuInspectionPoints: [
      'Memeriksa kekerasan gulungan jumbo roll menggunakan roll hardness tester (Schmidt Hammer).',
      'Mengawasi proses pergantian roll untuk mencegah kecelakaan terjepit saat pergantian spool.'
    ],
    kepalaPmGovernance: [
      'Evaluasi tonase produksi jumbo roll per shift dan persentase reject kempes/pecah.',
      'Kesesuaian spesifikasi fisik gulungan jumbo roll dengan kebutuhan mesin rewinder hilir.'
    ],
    troubleshooting: {
      fault: 'Gulungan Jumbo Roll Bergelombang / Kendor di Salah Satu Sisi (Slack Edge)',
      indication: 'Kertas tampak kendor di sisi DS atau OS, gulungan menjadi miring kerucut.',
      immediateAction: 'Sesuaikan tekanan pneumatik lengan penekan pope reel di sisi yang kendor, periksa profil ketebalan (caliper) kertas melintang.',
      permanentSolution: 'Lakukan kalibrasi slice headbox di wet end untuk meratakan distribusi gramatur buburan.'
    },
    k3SafetyWarning: 'BAHAYA TERGULUNG JUMBO ROLL: Jangan sekali-kali menyentuh permukaan roll yang sedang berputar kencang dengan tangan telanjang!',
    associatedPhotoTitle: 'Unit Pope Reel & Gulungan Jumbo Roll Tissue Berputar',
    videoTimecode: '29:10'
  },
  {
    id: 'tm-eq-18',
    number: 18,
    slideRef: 'Slide 16',
    name: 'Sistem Kontrol Kualitas Pope Reel (Debu Trim, Joint Marker & Edge Cutter)',
    stage: 'POPE_REEL',
    stageName: 'Pope Reel (Penggulungan Jumbo Roll)',
    categoryTag: 'Quality & Finishing Protection',
    function: 'Menjamin gulungan tissue bebas cacat tepi, bebas debu trim, tidak melipat, serta memberikan tanda (flagging) jika ada sambungan.',
    workingPrinciple: 'Pada area sebelum pope reel, terdapat pisau potong tepi (trim slitter/water jet) yang merapikan sisi pinggir lembaran. Blower penghisap trim (trim blower) menyedot potongan tepi dan debu agar tidak masuk ke gulungan. Jika terjadi putus kertas yang disambung (joint), operator wajib memasang label penanda (flagging tape) di tepi roll agar operator Rewinder mengetahuinya saat pemotongan gulungan kecil.',
    criticalParameters: [
      { label: 'Pencegahan Debu Trim', value: 'Bebas debu 100%', importance: 'Slide 16: Debu trim tidak boleh masuk ke dalam gulungan tissue' },
      { label: 'Kondisi Tepi Lembaran', value: 'Rata tanpa koyak (edge tear)', importance: 'Slide 16: Mencegah putus lembaran di mesin rewinder hilir' },
      { label: 'Penanda Sambungan (Flagging)', value: 'Wajib dipasang di setiap joint', importance: 'Slide 16: Selalu memberi tanda marker jika ada sambungan' },
      { label: 'Bebas Lipatan (No Wrinkles)', value: 'Lembaran datar sempurna', importance: 'Slide 16: Menghindari cacat lipat permanen di dalam gulungan' }
    ],
    operatorKeyPoints: [
      'MEMASTIKAN TIDAK ADA DEBU TRIM MASUK KE GULUNGAN TISSUE (Slide 16).',
      'MEMASTIKAN TIDAK ADA KOYAK SAMPING (EDGE TEAR) ATAU LEMBARAN MELIPAT (WRINKLE) (Slide 16).',
      'SELALU MEMBERIKAN TANDA BENDERA / MARKER FLAGGING DI SETIAP TITIK JOINT SAMBUNGAN (Slide 16).',
      'Menjaga lebar tissue tetap rata sesuai target pemesanan (spesifikasi ukuran trim bersih).'
    ],
    helperDuties: [
      'Pembersihan debu kertas (trim dust) di sekitar lantai pope reel dengan vacuum / sapu industri.',
      'Menempelkan label identitas barcode Jumbo Roll (nomor roll, tanggal, shift, berat, grade, joint marker).',
      'Membantu pengikatan dan pemindahan Jumbo Roll ke timbangan akhir menggunakan transfer car.'
    ],
    karuInspectionPoints: [
      'Melakukan inspeksi visual menyeluruh pada permukaan luar dan sisi samping Jumbo Roll sebelum diserahterimakan ke Rewinder.',
      'Memeriksa pencatatan jumlah joint pada kartu identitas jumbo roll.'
    ],
    kepalaPmGovernance: [
      'Audit angka komplain dari divisi Rewinder/Converting terkait cacat debu trim atau sambungan tanpa tanda.',
      'Standardisasi prosedur K3 doffing jumbo roll dan safety transfer crane.'
    ],
    troubleshooting: {
      fault: 'Debu Trim Terselip Masuk ke Gulungan & Menyebabkan Ganjelan Berlubang',
      indication: 'Timbul bintik ganjelan debu pada lapisan dalam jumbo roll, lembaran putus saat diproses di mesin Rewinder.',
      immediateAction: 'Periksa blower hisap trim apakah daya hisapnya melemah, bersihkan corong pipa hisap dari sumbatan gumpalan serat.',
      permanentSolution: 'Tingkatkan kapasitas daya motor blower trim exhaust dan pasang sistem misting peredam debu tepi.'
    },
    k3SafetyWarning: 'Gunakan kacamata pelindung dan masker debu saat berada di area penggulungan akhir pope reel untuk melindungi mata dari partikel debu trim berterbangan.',
    associatedPhotoTitle: 'Operator Mengawasi Gulungan Akhir & Penanda Sambungan Joint',
    videoTimecode: '31:20'
  }
];

// =========================================================================
// 2. 10 EVALUASI PERTANYAAN & KUNCI JAWABAN RESMI (SLIDE 17 & 18)
// =========================================================================
export const TISSUE_MACHINE_QUIZZES: TissueMachineQuizItem[] = [
  {
    number: 1,
    question: 'Kenapa shower felt harus selalu bergerak (berosilasi)?',
    options: [
      'Supaya felt tidak cacat (tergores) dan felt bersih merata',
      'Supaya air cucian lebih hemat 50%',
      'Supaya motor pompa tidak mengalami panas berlebih',
      'Supaya felt berputar lebih cepat di silinder Yankee'
    ],
    correctAnswer: 'Supaya felt tidak cacat (tergores) dan felt bersih merata',
    officialSlideAnswer: 'Supaya felt tidak cacat (tergores) dan felt bersih merata (Slide 18, Kunci No. 1).',
    technicalDeepDive: 'Pancaran air jarum needle shower bertekanan 10-12 bar memiliki daya potong hidrokinetik tinggi. Jika boom shower diam di satu titik, pancaran jarum semprotan akan menggerus dan memotong anyaman serat kain felt (felt grooving / felt damage). Gerakan osilasi bolak-balik kontinu (isolating) mendistribusikan tumbukan air ke seluruh permukaan sehingga kotoran lepas merata tanpa merusak struktur felt.',
    operationalImpact: 'Jika osilator macet dan dibiarkan menyemprot, kain felt seharga puluhan juta rupiah akan tergores garis permanen dalam waktu kurang dari 15 menit, memicu putus lembaran dan downtime pergantian felt berjam-jam.',
    stage: 'WET_END',
    whoMustMaster: 'Semua Operator Wet End, Helper, dan Kepala Regu'
  },
  {
    number: 2,
    question: 'Secara umum fungsi utama alat CRC adalah untuk mengetahui nilai apa?',
    options: [
      'Consistency (Konsistensi / kekentalan buburan pulp)',
      'Flow laju alir uap steam di silinder Yankee',
      'Ketebalan lembaran tissue di area pope reel',
      'Tingkat kekerasan gulungan jumbo roll'
    ],
    correctAnswer: 'Consistency (Konsistensi / kekentalan buburan pulp)',
    officialSlideAnswer: 'Consistency (Konsistensi buburan) (Slide 18, Kunci No. 2).',
    technicalDeepDive: 'CRC (Consistency Regulator Controller) mengukur gaya geser (shear force) buburan saat melintasi sensor. Data kekentalan ini dibandingkan dengan set point untuk memerintahkan katup air delusen (dilution control valve) membuka lebih lebar atau menyempit, sehingga konsistensi buburan sebelum masuk ke stuffbox selalu konstan.',
    operationalImpact: 'Fluktuasi konsistensi di CRC langsung berdampak pada berat gramatur kertas (GSM) yang naik-turun tak beraturan, menyebabkan kertas tissue reject di luar toleransi pesanan.',
    stage: 'WET_END',
    whoMustMaster: 'Operator DCS, Operator Wet End, Kepala Regu'
  },
  {
    number: 3,
    question: 'Berapa speed di Pope Reel jika speed Yankee 150 mpm dengan pengerutan (creping) 15%?',
    options: [
      '127,5 mpm',
      '135,0 mpm',
      '120,0 mpm',
      '142,5 mpm'
    ],
    correctAnswer: '127,5 mpm',
    officialSlideAnswer: '127,5 mpm (Slide 18, Kunci No. 3).',
    calculationFormula: 'Speed Pope Reel = Speed Yankee × (1 - Creping%) = 150 × (1 - 0.15) = 150 × 0.85 = 127.5 mpm',
    technicalDeepDive: 'Ketika lembaran tissue mengering menempel di Yankee, doctor creping blade mengerutkan lembaran sebesar 15%. Pengerutan ini memperpendek panjang linear lembaran kertas. Oleh karena itu, penggulung Pope Reel harus berputar lebih lambat sebesar faktor (1 - 0.15) = 0.85 agar tidak merentangkan kembali kerutan mikro yang sudah terbentuk.',
    operationalImpact: 'Jika speed Pope Reel disetel terlalu cepat (>127.5 mpm), creping akan tertarik hilang dan kertas tissue menjadi kaku/kasar. Jika disetel terlalu lambat (<127.5 mpm), lembaran akan menggelembung kendor dan terlipat di drum pope reel.',
    stage: 'CALCULATION',
    whoMustMaster: 'Semua Operator Mesin, Karu, dan Kepala PM'
  },
  {
    number: 4,
    question: 'Kenapa sirip-sirip pada Heat Exchanger (HE) harus dibersihkan secara berkala?',
    options: [
      'Supaya tiupan panas HE bisa maksimal (perpindahan panas optimal)',
      'Supaya warna sirip tetap mengkilap seperti baru',
      'Supaya tekanan uap steam boiler tidak naik',
      'Supaya suara blower menjadi lebih senyap'
    ],
    correctAnswer: 'Supaya tiupan panas HE bisa maksimal (perpindahan panas optimal)',
    officialSlideAnswer: 'Supaya tiupan panas HE bisa maksimal (Slide 18, Kunci No. 4).',
    technicalDeepDive: 'Sirip pipa HE (finned tubes) memperluas bidang kontak perpindahan panas konveksi dari uap steam ke aliran udara tiup. Debu serat kertas yang beterbangan mudah menempel di sela sirip. Debu tebal bertindak sebagai isolator termal yang menghalangi perambatan panas serta mencekik debit udara tiup dari blower.',
    operationalImpact: 'Sirip HE yang kotor menyebabkan konsumsi steam boiler membengkak boros, suhu udara hood turun, dan kecepatan produksi mesin terpaksa diturunkan karena kertas tidak kunjung kering.',
    stage: 'DRY_END',
    whoMustMaster: 'Operator Dry End, Helper Shift, Tim Maintenance'
  },
  {
    number: 5,
    question: 'Kenapa pada permukaan silinder Yankee harus ditambahkan chemical coating dan release agent?',
    options: [
      'Untuk membantu kerataan permukaan Yankee serta melindungi silinder dari gesekan doctor blade',
      'Untuk membuat kertas tissue menjadi tahan air seperti plastik',
      'Untuk menghemat pemakaian listrik motor penggerak utama',
      'Untuk menghilangkan kebutuhan pembersihan kain felt'
    ],
    correctAnswer: 'Untuk membantu kerataan permukaan Yankee serta melindungi silinder dari gesekan doctor blade',
    officialSlideAnswer: 'Untuk membantu kerataan Yankee serta melindungi permukaan silinder Yankee dari gesekan doctor blade (Slide 18, Kunci No. 5).',
    technicalDeepDive: 'Silinder Yankee terbuat dari besi cor khusus (cast iron) dengan biaya miliaran rupiah. Ujung pisau doctor blade baja yang menempel terus-menerus dapat mengikis logam silinder. Lapisan polimer coating melindungi permukaan logam dari kontak langsung logam-ke-logam, meratakan pori mikro, serta mengontrol adhesi lembaran agar saat terkelupas oleh blade menghasilkan efek creping sempurna.',
    operationalImpact: 'Tanpa coating yang memadai, silinder Yankee akan tergores parah (grooving/scoring) yang membutuhkan pembubutan ulang (grinding) mahal dan shutdown mesin berhari-hari.',
    stage: 'DRY_END',
    whoMustMaster: 'Operator Dry End, Kepala Regu, Kepala PM'
  },
  {
    number: 6,
    question: 'Kenapa harus ditambahkan chemical Wet Strength dan Dry Strength pada buburan pulp?',
    options: [
      'Untuk menambah kekuatan lembaran tissue (baik kekuatan basah maupun kekuatan tarik kering)',
      'Supaya warna kertas tissue menjadi lebih putih tanpa pemutih',
      'Supaya buburan mengalir lebih kencang di dalam pipa LCC',
      'Untuk membunuh bakteri mikroba di dalam bak silo water'
    ],
    correctAnswer: 'Untuk menambah kekuatan lembaran tissue (baik kekuatan basah maupun kekuatan tarik kering)',
    officialSlideAnswer: 'Untuk menambah kekuatan lembaran tissue (Slide 18, Kunci No. 6).',
    technicalDeepDive: 'Serat selulosa alami saling mengikat dengan ikatan hidrogen yang mudah hancur saat terkena air. Chemical Wet Strength (PAE resin) membentuk ikatan silang kovalen tahan air sehingga tissue towel/handuk tidak hancur saat mengelap basah. Chemical Dry Strength (polimer kationik) memperbanyak jembatan ikatan antar serat kering untuk meningkatkan kekuatan tarik (tensile) tanpa mengurangi kelembutan.',
    operationalImpact: 'Tissue tanpa wet strength yang tepat akan hancur lebur saat terkena air di tangan konsumen, mengakibatkan komplain produk dan penolakan kontainer ekspor.',
    stage: 'WET_END',
    whoMustMaster: 'Operator Kimia, Operator Wet End, Kepala Regu'
  },
  {
    number: 7,
    question: 'Kenapa temperatur silinder Yankee harus dijaga supaya tetap stabil pada rentang 85 - 90 °C?',
    options: [
      'Supaya chemical coating dan release dapat berfungsi dengan baik membentuk film pelindung lentur',
      'Supaya air kondensat di dalam silinder tidak berubah menjadi es',
      'Supaya oli pelumas bantalan bearing tidak terbakar',
      'Supaya touch roll tidak menempel permanen pada silinder'
    ],
    correctAnswer: 'Supaya chemical coating dan release dapat berfungsi dengan baik membentuk film pelindung lentur',
    officialSlideAnswer: 'Supaya chemical coating dan release dapat berfungsi dengan baik (Slide 18, Kunci No. 7).',
    technicalDeepDive: 'Bahan kimia coating modern berbasis poliamida memiliki jendela suhu polimerisasi termal yang sangat sempit di 85 - 90 °C. Pada suhu ini, film kimia bersifat ulet (visco-elastic) dan licin seimbang. Jika suhu di bawah 80 °C, film terlalu lengket dan kertas putus; jika di atas 95 °C, film menjadi getas/keras (brittle) dan mudah terkelupas menjadi debu putih.',
    operationalImpact: 'Suhu Yankee yang tidak stabil menyebabkan chattering (getaran blade), permukaan coating botak, kertas robek berulang kali, dan keausan dini mata pisau creping.',
    stage: 'DRY_END',
    whoMustMaster: 'Operator Dry End, Operator DCS, Kepala Regu'
  },
  {
    number: 8,
    question: 'Sebutkan hal-hal penting yang wajib diperhatikan dalam proses di Headbox (Pilih yang paling tepat)!',
    options: [
      'Kestabilan air, menjaga consistency stabil (0,18-0,20%), kontrol PEO, penutup mould rapat, shower HPP wire bagus, U-box tidak bocor',
      'Menjaga suhu steam Yankee di atas 150 °C dan membersihkan debu trim di pope reel',
      'Mengganti oli gearbox setiap jam dan menyetel tekanan pisau creping blade',
      'Membuka katup reject LCC selebar-lebarnya sepanjang shift berjalan'
    ],
    correctAnswer: 'Kestabilan air, menjaga consistency stabil (0,18-0,20%), kontrol PEO, penutup mould rapat, shower HPP wire bagus, U-box tidak bocor',
    officialSlideAnswer: 'Kestabilan air, menjaga consistency tetap stabil (0,18 - 0,20%), mengontrol PEO, penutup kanan-kiri silinder mould harus rapat, menjaga kebersihan wire (HPP shower), U-box vacuum tidak boleh bocor (Slide 18, Kunci No. 8).',
    technicalDeepDive: 'Headbox adalah jantung pembentukan jaring kertas (formation). Konsistensi ultra-encer 0,18-0,20% menjamin serat tidak menggumpal, PEO mendispersikan serat merata, kerapatan penutup samping silinder mould dan dekel mencegah kebocoran tepi hisap, shower HPP menjaga pori kawat bebas kotoran, dan U-box kedap menjamin dewatering optimal.',
    operationalImpact: 'Kelalaian pada salah satu poin di atas langsung mengakibatkan lembaran tissue berlubang, berat gramatur belang-belang, atau kertas jatuh (sheet drop) di couch roll.',
    stage: 'WET_END',
    whoMustMaster: 'Operator Headbox, Operator Wet End, Kepala Regu, Kepala PM'
  },
  {
    number: 9,
    question: 'Kenapa U-box vacuum pembersih dan dewatering felt tidak boleh bocor?',
    options: [
      'Supaya hisapan vacuum bisa maksimal pada kain felt tanpa kehilangan daya hisap',
      'Supaya air limbah tidak mencemari selokan pabrik',
      'Supaya suara bising hisapan angin tidak terdengar di luar pabrik',
      'Supaya kain felt tidak berputar terlalu kencang'
    ],
    correctAnswer: 'Supaya hisapan vacuum bisa maksimal pada kain felt tanpa kehilangan daya hisap',
    officialSlideAnswer: 'Supaya hisapan vacuum bisa maksimal pada felt (Slide 18, Kunci No. 9).',
    technicalDeepDive: 'Sistem vakum bekerja berdasarkan perbedaan tekanan atmosfer. Jika terjadi kebocoran di sisi bibir U-box, udara bebas akan tersedot masuk (bypass) sehingga tekanan negatif (vakum) anjlok. Akibatnya, air cucian dan partikel kotoran yang menumpuk di kedalaman pori felt tidak terhisap keluar, dan kadar air felt tetap tinggi.',
    operationalImpact: 'U-box bocor membuat kain felt menjadi sangat basah saat membawa lembaran ke Yankee. Lembaran tissue tidak dapat menempel sempurna, terjadi blister (gelembung air mendidih di permukaan Yankee), dan beban pengeringan steam melonjak drastis.',
    stage: 'WET_END',
    whoMustMaster: 'Semua Operator PM, Helper, Kepala Regu'
  },
  {
    number: 10,
    question: 'Apa saja poin-poin krusial yang perlu diperhatikan pada gulungan di Pope Reel (Pilih yang paling lengkap)?',
    options: [
      'Tidak ada koyak samping, tidak ada debu trim masuk gulungan, memberi penanda joint, tissue tidak melipat, lebar rata',
      'Mengurangi kecepatan mesin saat pergantian spool dan membiarkan debu trim menempel',
      'Menyetel suhu air delusen dan membersihkan pipa hisap LCC cleaner',
      'Menambahkan air pengencer ke dalam drum pope reel agar gulungan lebih padat'
    ],
    correctAnswer: 'Tidak ada koyak samping, tidak ada debu trim masuk gulungan, memberi penanda joint, tissue tidak melipat, lebar rata',
    officialSlideAnswer: 'Tidak boleh ada koyak samping, tidak boleh ada debu trim masuk ke gulungan, memberikan tanda jika ada joint, tissue tidak boleh melipat, menjaga lebar tissue tetap rata (Slide 18, Kunci No. 10).',
    technicalDeepDive: 'Jumbo roll adalah produk akhir dari PM yang menjadi bahan baku primer untuk mesin Rewinder. Jika ada debu trim masuk, debu akan mengganjal dan melubangi kertas; jika ada koyak tepi atau lipatan, kertas akan putus berkali-kali saat ditarik di Rewinder; dan jika sambungan tidak diberi flag penanda, pisau slitter Rewinder bisa rusak atau sambungan lolos ke konsumen akhir.',
    operationalImpact: 'Cacat pada pope reel menyebabkan kerugian ganda: penurunan output converting, peningkatan persentase broke (kertas sobek), serta komplain langsung dari customer pembeli Jumbo Roll.',
    stage: 'POPE_REEL',
    whoMustMaster: 'Operator Pope Reel, Helper Shift, Kepala Regu, Kepala PM'
  }
];

// =========================================================================
// 3. PANDUAN TUGAS & TANGGUNG JAWAB KHUSUS PROSES TISSUE MESIN
// =========================================================================
export const TISSUE_MACHINE_ROLE_GUIDES: RoleResponsibilityGuide[] = [
  {
    role: 'Operator Pelaksana',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    summary: 'Penanggung jawab teknis langsung operasional mesin tissue dari Wet End (CRC, Stuffbox, Headbox) hingga Pope Reel.',
    dailyFocus: [
      'Memantau konsistensi headbox berada ketat di angka 0,18% - 0,20% secara kontinu (Slide 7).',
      'Memeriksa kesesuaian Flow Setting vs Actual Flow Value dan % bukaan valve control pada layar DCS (Slide 3).',
      'Memastikan motor osilator/isolating shower needle felt selalu bergerak aktif pada tekanan 10 - 12 bar (Slide 9).',
      'Mengontrol stabilitas suhu permukaan silinder Yankee di rentang 85 - 90 °C dan tekanan spray coating min 2.5 bar (Slide 13).',
      'Mengawasi rasio speed Pope Reel terhadap speed Yankee dengan creping 15% (contoh: 150 mpm -> 127.5 mpm) (Slide 15).',
      'Memastikan penanda bendera (joint marker) selalu dipasang di setiap titik sambungan kertas pada Pope Reel (Slide 16).'
    ],
    decisionAuthority: [
      'Berhak melakukan adjustment bukaan valve control (±1-3%) untuk koreksi debit buburan.',
      'Wajib segera mematikan shower needle jika motor osilator macet untuk mencegah felt cacat/tergores.',
      'Berhak menghentikan gulungan pope reel sementara jika ditemukan koyak samping (edge tear) berbahaya.'
    ]
  },
  {
    role: 'Kepala Regu (Karu)',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    summary: 'Pemimpin shift yang mengoordinasikan seluruh personel, mengontrol kualitas gramatur/creping, dan menangani deviasi proses.',
    dailyFocus: [
      'Memvalidasi batas set point CRC dan kestabilan air delusen setiap awal shift kerja.',
      'Memverifikasi penambahan dosis chemical Wet Strength (outlet stuffbox) dan Dry Strength (manhole Chest 4) (Slide 4).',
      'Memeriksa kerapatan side seal silinder mould, dekel OS/DS, serta memastikan U-box vacuum tidak bocor (Slide 8).',
      'Memastikan kebersihan sirip Heat Exchanger (HE) dan memeriksa keausan bilah Doctor Creping Blade (Slide 12 & 16).',
      'Memimpin investigasi cepat jika terjadi sheet break berulang di area couch roll atau silinder Yankee.',
      'Memverifikasi mutu akhir Jumbo Roll di Pope Reel (bebas debu trim, tidak melipat, lebar rata) sebelum kirim ke Rewinder.'
    ],
    decisionAuthority: [
      'Memutuskan penggantian bilah doctor blade baru saat ditemukan gompal atau getaran chattering.',
      'Menetapkan penyesuaian dosis PEO dan Felt Cleaner (FC) target pH 8.5 berdasarkan kondisi aktual serat.',
      'Menandatangani lembar serah terima shift dan pelaporan insiden downtime mesin.'
    ]
  },
  {
    role: 'Kepala PM & Superintendent',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    summary: 'Penanggung jawab operasional keseluruhan unit Paper Machine, efisiensi energi steam, usia pakai felt/wire, dan pencapaian target produksi.',
    dailyFocus: [
      'Evaluasi neraca massa serat dan konsumsi spesifik kimia (PEO, Wet/Dry Strength, Antifoam, Coating/Release).',
      'Memantau efisiensi termal silinder Yankee dan Heat Exchanger untuk optimalisasi biaya energi steam boiler.',
      'Menganalisis umur pakai kawat silinder mould dan kain felt (target masa pakai optimal tanpa kerusakan dini).',
      'Mengaudit kepatuhan SOP K3: pencegahan kecelakaan titik jepit (nip hazards) dan keselamatan silinder panas Yankee.',
      'Meningkatkan kompetensi tim operator dan kepala regu melalui evaluasi 10 pertanyaan teknis tissue mesin (Slide 17 & 18).'
    ],
    decisionAuthority: [
      'Menyetujui jadwal stop mesin mingguan untuk pembersihan total kawat, felt, dan perbaikan mekanik mayor.',
      'Menetapkan perubahan formulasi kimia atau gramatur baru sesuai order pesanan penjualan perusahaan.',
      'Mengotorisasi perbaikan besar atau pergantian spare part bernilai investasi tinggi (silinder, bearing utama, pompa vakum).'
    ]
  }
];

// =========================================================================
// 4. KONFIGURASI MEDIA GALERI FOTO NYATA & VIDEO TUTORIAL INTERAKTIF
// =========================================================================
export const TISSUE_MACHINE_MEDIA_CONFIG: MachineMediaConfig = {
  heroImage: tissueWetEndImg,
  heroCaption: 'Unit Operasional Lini Tissue Mesin PT. Panca Usahatama Paramita: Alur Terintegrasi Wet End, Dry End & Pope Reel Winding.',
  galleryPhotos: [
    {
      id: 'tm-photo-1',
      title: 'Wet End: Pompa Chest 4, CRC & Instalasi Valve Dilution',
      subtitle: 'Slide 2 - 4: Kontrol Konsistensi & Aliran Buburan',
      imageSrc: tissueWetEndImg,
      aspectRatio: '16:9',
      tags: ['Wet End', 'Chest 4', 'CRC', 'Valve Control', 'Stuffbox'],
      description: 'Dokumentasi instalasi pemipaan wet end dari tangki Chest 4 menuju stuffbox. Tampak sensor transmiter CRC untuk pembacaan kekentalan (consistency), katup otomatis air delusen (dilution valve), pipa bypass kran sampling, serta valve control dan magnetic flowmeter pengatur debit buburan.',
      keyCallouts: [
        { label: 'Pompa Chest 4', detail: 'Memompa pulp matang ke stuffbox melewati sensor kekentalan CRC' },
        { label: 'Sensor CRC & Valve Delusen', detail: 'Membaca actual konsistensi dan mengatur suplai air pengencer otomatis' },
        { label: 'Flow Control Panel DCS', detail: 'Menampilkan Flow Setting, Actual Flow Value, dan persentase bukaan valve' }
      ]
    },
    {
      id: 'tm-photo-2',
      title: 'Forming Section: Headbox Manifold, Injeksi PEO & Cylinder Mould',
      subtitle: 'Slide 5 - 8: Pembentukan Jaring Lembaran & Cleaning Wire',
      imageSrc: tissueHeadboxWireImg,
      aspectRatio: '16:9',
      tags: ['Headbox', 'PEO Injection', 'Cylinder Mould', 'Shower HPP', 'Felt'],
      description: 'Detail konstruksi area pembentukan lembaran tissue basah (forming section). Memperlihatkan pipa manifold inlet headbox dengan nosel injeksi chemical PEO, drum silinder mould kawat halus dengan penutup samping (side seal) rapat, couch roll penekan felt, serta deretan shower pembersih wire bertekanan tinggi (HPP).',
      keyCallouts: [
        { label: 'Konsistensi 0,18% - 0,20%', detail: 'Parameter sangat kritis penentu stabilitas gramatur (GSM) tissue' },
        { label: 'Injeksi Chemical PEO', detail: 'Membantu pembentukan formasi rata bebas flokulasi dan mempercepat dewatering' },
        { label: 'Dekel & Side Seal Mould', detail: 'Wajib terpasang rapat untuk memaksimalkan hisapan vacuum silinder mould' }
      ]
    },
    {
      id: 'tm-photo-3',
      title: 'Dry End: Silinder Yankee, Blower Heat Exchanger & Spray Coating',
      subtitle: 'Slide 11 - 13: Pengeringan Uap & Creping 15%',
      imageSrc: tissueDryerYankeeImg,
      aspectRatio: '16:9',
      tags: ['Yankee MG', 'Heat Exchanger', 'Coating Spray', '85-90°C', 'Doctor Blade'],
      description: 'Konstruksi pengering silinder Yankee berdiameter raksasa yang dilengkapi dengan tudung tiup Heat Exchanger (HE) steam finned tubes, boom spray chemical coating & release agent bertekanan minimal 2.5 bar, serta pemegang Doctor Creping Blade untuk pengerutan lembaran 15%.',
      keyCallouts: [
        { label: 'Suhu Yankee 85 - 90 °C', detail: 'Suhu stabil agar film coating dan release agent berfungsi maksimal' },
        { label: 'Sirip Pipa HE Bersih', detail: 'Sirip wajib bersih dari debu agar tiupan udara panas pengering optimal' },
        { label: 'Creping Blade 15%', detail: 'Mengelupas lembaran tissue dan menghasilkan efek kerutan lembut 15%' }
      ]
    },
    {
      id: 'tm-photo-4',
      title: 'Pope Reel: Penggulungan Kontinu Jumbo Roll & Penanda Joint',
      subtitle: 'Slide 14 - 16: Penggulungan Induk & Quality Control',
      imageSrc: tissuePopeReelImg,
      aspectRatio: '16:9',
      tags: ['Pope Reel', 'Jumbo Roll', 'Speed Ratio', 'Debu Trim', 'Flagging Joint'],
      description: 'Dokumentasi area penggulungan akhir (pope reel). Tampak lembaran tissue putih mulus meluncur di atas drum pope reel digulung kontinu pada spool core. Operator mengawasi agar tidak ada debu trim yang masuk, tidak ada koyak samping, dan selalu menempelkan bendera penanda (flagging marker) jika terdapat sambungan.',
      keyCallouts: [
        { label: 'Rasio Kecepatan Pope Reel', detail: 'Speed Yankee 150 mpm -> Pope Reel 127.5 mpm (rumus creping 15%)' },
        { label: 'Bebas Debu Trim & Koyak', detail: 'Memastikan kualitas gulungan padat seragam untuk mesin Rewinder' },
        { label: 'Marker Bendera Joint', detail: 'Wajib dipasang di setiap sambungan agar tidak putus di mesin converting' }
      ]
    }
  ],
  videoTutorials: [
    {
      id: 'tm-vid-1',
      title: 'Panduan Lengkap Operasional Tissue Mesin: Wet End, Dry End & Pope Reel',
      duration: '18:45',
      youtubeId: 'pQ7i6H6e-iQ',
      thumbnailUrl: tissueWetEndImg,
      category: 'SOP Operasional Utama Mesin Paper Machine',
      instructorRole: 'Kepala Regu Senior PM & Instruktur Training PT. PUP',
      description: 'Video tutorial komprehensif mengupas tuntas 18 slide modul materi training Tissue Mesin. Meliputi kontrol CRC, pengaturan flow control DCS, injeksi PEO/Wet Strength, cleaning felt needle shower 10-12 bar, stabilitas suhu Yankee 85-90°C, hingga perhitungan speed Pope Reel creping 15%.',
      chapters: [
        {
          time: '00:00',
          topic: 'Pendahuluan & 3 Tahapan Utama Mesin Tissue',
          note: 'Ikhtisar alur proses dari pulp menjadi Jumbo Roll (Slide 1)',
          detailedExplanation: 'Proses produksi kertas tissue modern di PT. PUP berlangsung melalui 3 tahapan kontinu: 1. Wet End (penyiapan konsistensi, pembersihan LCC, forming headbox cylinder mould, dan couch roll); 2. Dry End (pengepresan felt, U-box vacuum, silinder Yankee Dryer 85-90°C, Heat Exchanger udara panas, serta doctor creping blade); 3. Pope Reel (penggulungan kontinyu menjadi Jumbo Roll). Kunci efisiensi terletak pada keselarasan parameter di setiap zona.',
          technicalSpecs: [
            { label: 'Tahapan Proses', val: 'Wet End, Dry End, Pope Reel' },
            { label: 'Tipe Mesin', val: 'Cylinder Mould Tissue Machine' },
            { label: 'Produk Akhir', val: 'Jumbo Roll Siap Potong Rewinder' }
          ],
          spokenNarration: 'Selamat datang dalam modul pelatihan operasional Tissue Mesin PT Panca Usahatama Paramita. Proses pembuatan kertas tissue terbagi menjadi tiga tahapan terintegrasi, yaitu Wet End untuk pembentukan lembaran basah, Dry End untuk pengeringan uap dan kreping pada silinder Yankee, serta Pope Reel untuk penggulungan menjadi Jumbo Roll. Setiap tahapan menuntut ketelitian tinggi dalam pengawasan parameter teknis demi menjamin kelembutan, kekuatan tarik, dan efisiensi produksi bebas downtime.'
        },
        {
          time: '02:30',
          topic: 'Kontrol Konsistensi CRC & Panel Flow Control',
          note: 'Cara membaca layar actual vs set point dan pengaturan valve (Slide 2-3)',
          detailedExplanation: 'Kekentalan buburan pulp dari Chest 4 diukur oleh Consistency Regulator Controller (CRC). Layar atas menampilkan konsistensi aktual, sedangkan layar bawah menunjukkan batas set point (2.60% - 2.80%). Jika actual lebih besar dari set point, CRC memerintahkan control valve dilution membuka air pengencer lebih besar. Buburan kemudian dialirkan ke Stuffbox konstan dan melewati magnetic flowmeter dengan target debit alir 35 - 45 m³/h yang dikontrol melalui layar sentuh DCS.',
          technicalSpecs: [
            { label: 'Target Konsistensi CRC', val: '2.60% - 2.80%' },
            { label: 'Tekanan Air Delusen', val: '3.0 - 4.0 bar' },
            { label: 'Target Flow Rate Stuffbox', val: '35 - 45 m³/h (DCS Controlled)' }
          ],
          spokenNarration: 'Kestabilan berat dasar atau gramatur lembaran tissue diawali dari pengendalian konsistensi buburan pulp di Stuffbox. Sensor konsistensi digital C R C memantau viskositas buburan secara kontinu. Jika pembacaan konsistensi aktual di layar atas melampaui set point batas di layar bawah, katup delusen otomatis membuka aliran air pengencer. Bersamaan dengan itu, operator memantau debit laju alir pada panel D C S Flow Control pada rentang tiga puluh lima hingga empat puluh lima meter kubik per jam.'
        },
        {
          time: '05:15',
          topic: 'Dosis Kimia Dry/Wet Strength & Antifoam',
          note: 'Titik injeksi manhole Chest 4, outlet stuffbox, dan headbox tank (Slide 4-5)',
          detailedExplanation: 'Aditif kimia basah berperan penting dalam spesifikasi lembaran tissue. Wet Strength (PAE resin) diinjeksikan pada manhole Chest 4 atau pipa outlet stuffbox untuk grade tissue dapur/towel. Dry Strength (kationik starch/akrilamid) ditambahkan untuk memperkuat ikatan serat facial tissue tanpa mengorbankan kelembutan. Antifoam diinjeksikan di tangki headbox untuk melenyapkan busa yang dapat memicu lubang jarum (pinholes).',
          technicalSpecs: [
            { label: 'Titik Dosing Wet/Dry Strength', val: 'Manhole Chest 4 & Outlet Stuffbox' },
            { label: 'Titik Injeksi Antifoam', val: 'Tangki Headbox & Saluran White Water' },
            { label: 'Tujuan Antifoam', val: 'Mencegah Pembentukan Pinhole Cacat Lembaran' }
          ],
          spokenNarration: 'Penambahan bahan kimia fungsional dilakukan pada titik-titik injeksi khusus. Bahan penguat kering atau Dry Strength dan penguat basah Wet Strength diinjeksikan secara presisi pada manhole Chest 4 atau pipa transfer buburan. Sementara bahan pencegah busa atau Antifoam diinjeksikan pada tangki headbox. Operator wajib memeriksa kerja pompa dosing, kebersihan tangki kimia harian, dan memastikan tidak ada endapan yang menyumbat jalur aliran.'
        },
        {
          time: '08:40',
          topic: 'Headbox Forming, PEO & Cleaning Wire Shower HPP',
          note: 'Menjaga konsistensi 0,18-0,20% dan kerapatan side seal (Slide 6-8)',
          detailedExplanation: 'Konsistensi buburan pada headbox Cylinder Mould wajib dijaga sangat encer pada rentang 0.18% - 0.20%. Polimer PEO Axfloc (17 - 19 Cps) diinjeksikan via screw pump untuk mencegah serat menggumpal (flokulasi) sehingga formasi lembaran tissue sangat rata. Kain kawat wire forming dibersihkan terus menerus oleh High Pressure Pump (HPP) shower 5 - 7 bar untuk membuang getah (pitch) dan debu pulp.',
          technicalSpecs: [
            { label: 'Konsistensi Kritis Headbox', val: '0.18% - 0.20% (Strict Tolerance)' },
            { label: 'Viskositas PEO Terinjeksi', val: '17 - 19 Cps (Screw Pump Distributed)' },
            { label: 'Tekanan Shower HPP Wire', val: '5.0 - 7.0 bar' }
          ],
          spokenNarration: 'Pada bagian forming headbox, konsistensi suspensi buburan wajib dijaga sangat encer, yaitu pada rentang nol koma delapan belas hingga nol koma dua puluh persen. Zat pendispersi P E O Axfloc diinjeksikan untuk mencegah flokulasi serat. Buburan kemudian disemprotkan ke permukaan kawat forming silinder. Untuk menjaga kebersihan wire dari kerak getah, shower tekanan tinggi H P P menyemprotkan air bersih dengan tekanan lima sampai tujuh bar ke celah kawat.'
        },
        {
          time: '11:20',
          topic: 'Cleaning Felt: Needle Shower 10-12 Bar & U-Box Vacuum',
          note: 'Pentingnya motor osilator bergerak aktif dan FC pH 8.5 (Slide 9-10)',
          detailedExplanation: 'Kain felt membawa lembaran basah melewati rol tekan menuju silinder pengering. Kebersihan pori-pori felt dijaga oleh semprotan Needle Shower bertekanan 10 - 12 bar yang dipadukan cairan pembersih Felt Cleaner (target pH 8.5). Motor osilator shower wajib bergerak ke kiri dan ke kanan secara kontinyu; jika osilator macet, felt akan tergores dan berlubang. Tiga unit kotak vakum U-Box menyedot air hingga felt kering sempurna.',
          technicalSpecs: [
            { label: 'Tekanan Needle Shower Felt', val: '10 - 12 bar (Wajib Berosilasi)' },
            { label: 'Diameter Lubang Nozel', val: '0.8 - 1.0 mm Needle Jet' },
            { label: 'Target pH Felt Cleaner', val: 'pH 8.5 (Basa Lembut)' },
            { label: 'Dewatering Felt', val: '3 Unit U-Box Vacuum Kedap Udara' }
          ],
          spokenNarration: 'Kain felt berfungsi mentransfer dan menyerap air dari lembaran basah. Untuk mencegah serat felt tersumbat, shower needle bertekanan sepuluh hingga dua belas bar menyemprotkan air bercampur bahan pembersih Felt Cleaner berderajat keasaman p H delapan koma lima. Pipa shower needle wajib bergerak berosilasi ke kiri dan kanan tanpa henti. Jika osilator macet, matikan shower needle seketika untuk mencegah kain felt robek tergores. Tiga unit kotak vakum U-Box kemudian menyedot air hingga felt kembali kering.'
        },
        {
          time: '14:00',
          topic: 'Silinder Yankee, Heat Exchanger & Creping 15%',
          note: 'Suhu 85-90°C, spray coating min 2.5 bar, dan rumus speed (Slide 11-15)',
          detailedExplanation: 'Silinder pengering besi cor Yankee Dryer dipanaskan oleh uap steam jenuh bertekanan, mempertahankan suhu permukaan 85 - 90 °C. Sirip Heat Exchanger meniupkan udara panas tambahan di bawah kap pengering. Larutan spray coating kimia disemprotkan dengan tekanan minimal 2.5 bar agar lembaran menempel rata. Pisau creping doctor blade kemudian mengerutkan lembaran sebesar 15% untuk menghasilkan kelembutan dan bulk optimal.',
          technicalSpecs: [
            { label: 'Suhu Permukaan Yankee', val: '85 - 90 °C (Stabil)' },
            { label: 'Tekanan Semprot Spray Coating', val: 'Minimal 2.5 bar' },
            { label: 'Rasio Creping Doctor', val: '15% (Creping Ratio)' },
            { label: 'Rasio Speed Yankee:Reel', val: 'Speed Reel = Speed Yankee x (1 - 0.15)' }
          ],
          spokenNarration: 'Pengeringan lembaran tissue berlangsung pada silinder uap Yankee Dryer yang dipanaskan uap bertekanan dengan suhu permukaan stabil delapan puluh lima sampai sembilan puluh derajat Celcius. Tiupan udara panas dari Heat Exchanger mempercepat laju penguapan. Permukaan silinder disemprot cairan pelapis coating minimal dua koma lima bar sebelum lembaran dilepaskan oleh pisau doctor creping dengan persentase pengerutan lima belas persen, menghasilkan kelembutan tekstur tissue berstandar tinggi.'
        },
        {
          time: '16:30',
          topic: 'Operasional Pope Reel & 10 Soal Evaluasi Kompetensi',
          note: 'Pencegahan debu trim, flagging joint, dan pembahasan soal (Slide 16-18)',
          detailedExplanation: 'Tahap akhir adalah penataan gulungan pada Pope Reel. Kecepatan gulung Pope Reel dikontrol otomatis: contoh jika Yankee 150 mpm, maka Pope Reel berputar 127.5 mpm (15% creping). Lembaran harus bebas dari debu trim, potongan tepi harus bersih, dan setiap sambungan atau joint lembaran wajib dipasangi bendera marker (flagging) agar terdeteksi saat proses konversi di mesin rewinder.',
          technicalSpecs: [
            { label: 'Contoh Kecepatan Reel', val: '127.5 mpm (Pada Yankee 150 mpm)' },
            { label: 'Standar Kualitas Jumbo Roll', val: 'Bebas Debu Trim, Rata, & Padat Seragam' },
            { label: 'Kepatuhan Joint Kertas', val: 'Wajib Marker Flagging di Sisi Tepi' }
          ],
          spokenNarration: 'Tahap akhir adalah penggulungan lembaran pada Pope Reel menjadi Jumbo Roll seberat tiga hingga empat ton. Rasio kecepatan putar drum Pope Reel disinkronkan tepat dengan kecepatan silinder Yankee dikalikan faktor kreping. Operator dan pembantu wajib memastikan tepi gulungan bebas dari debu trim, tidak melipat, serta memasang bendera penanda pada setiap sambungan lembaran sebelum ditransfer ke area slitter rewinder.'
        }
      ],
      keyTakeaways: [
        'Konsistensi headbox WAJIB dijaga ketat di kisaran 0,18% - 0,20% untuk stabilitas gramatur.',
        'Shower needle felt 10 - 12 bar WAJIB selalu berosilasi gerak ke kiri-kanan agar felt tidak tergores.',
        'Suhu permukaan silinder Yankee harus stabil 85 - 90 °C agar coating & release agent bekerja maksimal.',
        'Speed Pope Reel dihitung dengan rumus: Speed Yankee × (1 - Creping%) = 150 × 0.85 = 127.5 mpm.',
        'Pada gulungan Pope Reel tidak boleh ada debu trim, tidak boleh koyak/melipat, dan wajib pasang flag penanda joint.'
      ]
    },
    {
      id: 'tm-vid-2',
      title: 'Simulasi Dinamis: Troubleshooting & Kuis Uji Kompetensi Tissue Mesin',
      duration: '12:10',
      youtubeId: 'f0P5KzZ7z5Q',
      thumbnailUrl: tissueDryerYankeeImg,
      category: 'Simulasi Interaktif & Penanganan Kendala Lapangan',
      instructorRole: 'Superintendent Paper Machine PT. PUP',
      description: 'Pembahasan studi kasus nyata di lantai pabrik: mengatasi CRC hunting, penanganan osilator felt macet mendadak, pembersihan sirip HE tersumbat debu, serta simulasi interaktif menjawab 10 pertanyaan evaluasi kompetensi.',
      chapters: [
        {
          time: '00:00',
          topic: 'Bedah Kasus 1: Mengatasi Fluktuasi Konsistensi CRC',
          note: 'Langkah taktis operator saat grafik CRC berosilasi',
          detailedExplanation: 'Saat sensor CRC mengalami fenomena hunting atau pembacaan liar, tindakan awal adalah mengalihkan modul control valve dilution ke mode manual. Periksa kran bypass dan bersihkan sensor sensing blade dari gumpalan serat atau kawat bal. Pastikan tekanan air delusen stabil di 3.0 - 4.0 bar. Lakukan pengambilan sampel manual untuk verifikasi gravimetrik lab sebelum mengembalikan sistem ke auto.',
          technicalSpecs: [
            { label: 'Tindakan Pertama', val: 'Pindah Kontrol ke Manual Segera' },
            { label: 'Inspeksi Fisik', val: 'Cek Blade Sensor CRC dari Lilitan Serat' },
            { label: 'Verifikasi Lab', val: 'Uji Gravimetrik Sampel Manual 1x Shift' }
          ],
          spokenNarration: 'Ketika grafik monitor C R C menunjukkan gejala hunting atau lonjakan nilai yang liar, operator harus bertindak cepat. Alihkan kontrol valve delusen ke mode semi-otomatis atau manual. Periksa pisau sensor pengindera C R C dari kemungkinan tersangkut lilitan serat atau kawat, serta verifikasi kestabilan tekanan pompa air pengencer. Lakukan pengambilan sampel manual untuk uji laboratorium sebagai validasi kalibrasi sebelum mengembalikan kontrol ke mode otomatis.'
        },
        {
          time: '03:10',
          topic: 'Bedah Kasus 2: Penyelamatan Felt Saat Osilator Shower Macet',
          note: 'Tindakan cepat darurat menurunkan tekanan shower needle',
          detailedExplanation: 'Jika motor penggerak osilator shower needle felt mengalami kemacetan, operator wajib segera mematikan atau mendrop tekanan air shower needle 10-12 bar dalam tempo kurang dari 15 detik! Semprotan jarum tajam bertekanan tinggi yang terfokus pada satu garis diam akan memotong dan merusak rajutan felt hingga sobek dalam hitungan menit. Periksa mekanisme gear osilator dan kelistrikan sebelum menyalakan kembali.',
          technicalSpecs: [
            { label: 'Waktu Respon Darurat', val: '< 15 Detik Stop Shower Tekanan Tinggi' },
            { label: 'Resiko Fatal', val: 'Felt Terpotong / Sobek Melingkar Permanen' },
            { label: 'Tindakan Perbaikan', val: 'Inspeksi Limit Switch & Gearbox Osilator' }
          ],
          spokenNarration: 'Apabila motor osilator shower needle felt tiba-tiba macet saat mesin berjalan, operator atau helper yang bertugas harus mematikan pompa shower needle dalam hitungan detik. Tekanan semprotan sepuluh hingga dua belas bar yang diam di satu titik akan menyayat serat kain felt hingga berlubang dalam waktu kurang dari satu menit. Setelah mesin dihentikan aman, periksa poros transmisi mekanik osilator dan pastikan saklar batas bekerja normal sebelum dioperasikan kembali.'
        },
        {
          time: '06:00',
          topic: 'Bedah Kasus 3: Menjaga Suhu Yankee 85-90°C & Sirip HE',
          note: 'Teknik pembersihan sirip HE dan kestabilan spray coating',
          detailedExplanation: 'Penurunan suhu Yankee di bawah 85°C dapat menimbulkan masalah kertas basah, lembaran rapuh, dan coating terkelupas. Periksa saluran kondensat steam dan pastikan perangkap uap (steam trap) tidak tersumbat. Pada unit Heat Exchanger (HE), sirip-sirip pemanas wajib dibersihkan berkala dari penumpukan serbuk debu tissue yang menghambat perpindahan panas konveksi udara panas.',
          technicalSpecs: [
            { label: 'Rentang Suhu Yankee Aman', val: '85 - 90 °C' },
            { label: 'Metode Pembersihan HE', val: 'Hembusan Udara Kering Bertekanan' },
            { label: 'Dampak HE Kotor', val: 'Efisiensi Termal Turun, Konsumsi Gas/Steam Naik' }
          ],
          spokenNarration: 'Penurunan suhu silinder Yankee di bawah delapan puluh derajat Celcius akan menyebabkan lembaran kertas menempel terlalu kuat pada drum dan putus. Periksa tekanan steam masuk dan pastikan perangkap kondensat bekerja lancar tanpa tersumbat air. Bersihkan juga sirip-sirip pipa Heat Exchanger dari timbunan debu serat menggunakan semprotan udara kering bertekanan, agar transfer panas hembusan tudung pengering kembali maksimal.'
        },
        {
          time: '09:15',
          topic: 'Simulasi Kuis 10 Pertanyaan Evaluasi Teknis',
          note: 'Kunci jawaban resmi dan penjelasan mendalam untuk operator & karu',
          detailedExplanation: 'Sesi kuis evaluasi 10 soal merangkum seluruh poin krusial dalam 18 slide modul: nomor 1 konsistensi headbox 0.18-0.20%, nomor 2 bahaya osilator shower macet, nomor 3 suhu Yankee 85-90°C, nomor 4 rumus speed reel, hingga tata cara penanganan cacat tissue dan keselamatan kerja LOTO.',
          technicalSpecs: [
            { label: 'Jumlah Soal Uji', val: '10 Pertanyaan Standar Evaluasi Pabrik' },
            { label: 'Passing Grade', val: 'Nilai Minimal 80% Lulus Kompetensi' },
            { label: 'Target Peserta', val: 'Operator PM, Helper, dan Calon Karu' }
          ],
          spokenNarration: 'Evaluasi kompetensi menguji pemahaman menyeluruh terhadap parameter kritis operasional. Mulai dari kepatuhan konsistensi headbox nol koma delapan belas persen, batasan tekanan shower felt, perhitungan selisih kecepatan kreping Yankee terhadap Pope Reel, hingga prosedur keselamatan kerja L O T O. Pemahaman mendalam atas prinsip-prinsip ini adalah fondasi profesionalisme seluruh regu kerja di PT Panca Usahatama Paramita.'
        }
      ],
      keyTakeaways: [
        'Tindakan cepat saat osilator macet: segera matikan shower needle dalam hitungan detik untuk selamatkan felt.',
        'Pembersihan berkala sirip HE mutlak dilakukan untuk mempertahankan efisiensi tiupan panas uap.',
        'Selalu pastikan U-box vacuum rapat tidak bocor agar dewatering kain felt berlangsung maksimal.',
        'Setiap lembaran tissue yang memiliki joint sambungan wajib ditempel tanda bendera penanda.'
      ]
    }
  ]
};

// =========================================================================
// 5. MASTER OBJECT TRAINING DATA TISSUE MESIN PM (UNTUK TRAINING_MODULES)
// =========================================================================
export const TISSUE_PM_MASTER_TRAINING: MachineTrainingData = {
  machineId: 'TISSUE_PM',
  name: 'Materi Training Tissue Mesin (Paper Machine / PM)',
  tagline: 'Panduan Komprehensif 3 Tahap Proses: Wet End, Dry End & Pope Reel Lengkap dengan Evaluasi Kompetensi 18 Slide Resmi',
  technicalSpecs: [
    { label: 'Tahapan Proses Utama', value: '3 Tahap: Wet End, Dry End, Pope Reel' },
    { label: 'Tipe Pembentukan (Forming)', value: 'Cylinder Mould Wire Section dengan Couch Roll Transfer' },
    { label: 'Konsistensi Kritis Headbox', value: '0,18% - 0,20% (Target Sangat Ketat)' },
    { label: 'Pembersih Sentrifugal Buburan', value: 'Baterai Kerucut LCC (Low Consistency Cleaner)' },
    { label: 'Tekanan Shower Needle Felt', value: '10 - 12 bar (Wajib Berosilasi Kontinu)' },
    { label: 'Nozel Shower Needle', value: 'Diameter 0,8 mm - 1,0 mm' },
    { label: 'Dosis Chemical Felt Cleaner (FC)', value: 'Kontinu pada pipa shower target pH 8,5' },
    { label: 'Dewatering Felt Awal', value: '3 Unit U-Box Vacuum Kedap Udara' },
    { label: 'Silinder Pengering Utama', value: 'Yankee Dryer (MG Cylinder) Cast Iron' },
    { label: 'Target Suhu Permukaan Yankee', value: '85 - 90 °C (Stabil)' },
    { label: 'Sistem Udara Panas Tambahan', value: 'Heat Exchanger (HE) Steam Finned Tubes & Blower Hood' },
    { label: 'Tekanan Spray Coating/Release', value: 'Minimal 2,5 bar' },
    { label: 'Persentase Creping Lembaran', value: '15% (Doctor Creping Blade)' },
    { label: 'Rasio Kecepatan Contoh', value: 'Yankee 150 mpm -> Pope Reel 127,5 mpm' },
    { label: 'Produk Gulungan Akhir', value: 'Jumbo Roll Kontinu Siap Potong di Rewinder' }
  ],
  operatingLimits: [
    { label: 'Konsistensi Headbox', limit: '0,18% - 0,20%', dangerZone: '< 0,15% (basah tekor) atau > 0,22% (flokulasi parah/berawan)' },
    { label: 'Tekanan Shower Needle Felt', limit: '10 - 12 bar', dangerZone: '< 8 bar (felt mampet) atau > 14 bar (serat felt aus cepat)' },
    { label: 'Osilasi Boom Shower Felt', limit: 'Wajib bergerak kontinu', dangerZone: 'DIAM / MACET (merusak/menggores felt permanen)' },
    { label: 'Suhu Silinder Yankee', limit: '85 - 90 °C', dangerZone: '< 80 °C (film coating lengket/robek) atau > 95 °C (coating getas mengelupas)' },
    { label: 'Tekanan Spray Coating/Release', limit: 'Min. 2,5 bar', dangerZone: '< 2,0 bar (atomisasi droplet kasar, Yankee botak bergaris)' },
    { label: 'Kebocoran U-Box Vacuum', limit: 'Rapat 100% tanpa bocor', dangerZone: 'BOCOR (kehilangan daya hisap, dewatering felt anjlok)' },
    { label: 'Debu Trim di Pope Reel', limit: 'Bebas debu trim 100%', dangerZone: 'Debu masuk gulungan (ganjelan cacat lubang di Rewinder)' }
  ],
  paperGrades: [
    { code: 'FACIAL', name: 'Tissue Wajah Premium (Facial Tissue)', gsmRange: '12.5 - 14.5 GSM', description: 'Kelembutan super lembut, formasi awan halus dengan PEO stabil, creping 15%, dan tensile seimbang.' },
    { code: 'TOILET', name: 'Tissue Toilet Roll (Bathroom Tissue)', gsmRange: '14.0 - 17.5 GSM', description: 'Daya larut air terkontrol, kekuatan basah sedang, kelembutan optimal untuk kebutuhan higienis harian.' },
    { code: 'TOWEL', name: 'Tissue Handuk / Dapur (Kitchen Towel)', gsmRange: '18.0 - 24.0 GSM', description: 'Kekuatan basah tinggi (Wet Strength PAE ekstra), daya serap cairan maksimal tanpa hancur saat basah.' },
    { code: 'NAPKIN', name: 'Tissue Makan / Serbet (Table Napkin)', gsmRange: '16.0 - 20.0 GSM', description: 'Kekuatan tarik kering (Dry Strength) tinggi, kerataan permukaan halus untuk kemudahan embossing/lipatan.' }
  ],
  dailyCheckpoints: [
    {
      area: 'Area Wet End (Chest 4 s/d Stuffbox & CRC)',
      items: [
        'Periksa kestabilan konsistensi pulp pada layar atas CRC dan kecocokan nilai set point di layar bawah.',
        'Amati pergerakan otomatis valve delusen: pastikan membuka-menutup responsif terhadap perubahan kekentalan.',
        'Pantau layar panel DCS: pastikan Flow Setting vs Actual Flow Value stabil dengan bukaan valve 30-60%.',
        'Periksa kelancaran aliran pompa dosing Wet Strength di outlet stuffbox dan Dry Strength di manhole Chest 4.'
      ]
    },
    {
      area: 'Area Forming & Pembersihan Kawat/Felt',
      items: [
        'Ukur konsistensi buburan headbox di kisaran 0,18% - 0,20% dan pastikan aliran manifold seimbang OS/DS.',
        'Inspeksi visual side seal silinder mould dan dekel: pastikan rapat tanpa celah bocor.',
        'Pastikan motor osilator shower needle felt bergerak aktif bolak-balik pada tekanan stabil 10 - 12 bar.',
        'Periksa 3 titik U-box vacuum: pastikan menempel rapat pada felt tanpa suara desis kebocoran vakum.',
        'Cek pH air cucian felt (target pH 8,5) dari penambahan chemical Felt Cleaner (FC).'
      ]
    },
    {
      area: 'Area Dry End (Yankee & Heat Exchanger)',
      items: [
        'Ukur suhu permukaan silinder Yankee di 5 titik lebar: pastikan stabil di kisaran 85 - 90 °C.',
        'Periksa semprotan spray boom coating & release agent: tekanan min 2,5 bar dan tidak ada nosel buntu.',
        'Inspeksi sirip-sirip pipa Heat Exchanger (HE): pastikan bersih dari timbunan debu serat kertas.',
        'Periksa kondisi mata pisau Doctor Creping Blade: pastikan rata, tidak gompal, dan tidak menimbulkan chattering.'
      ]
    },
    {
      area: 'Area Pope Reel (Penggulungan & QC)',
      items: [
        'Verifikasi rasio speed Pope Reel terhadap Yankee (rumus: Speed Yankee × 0,85 untuk creping 15%).',
        'Pastikan tidak ada debu trim yang lolos masuk ke dalam gulungan Jumbo Roll.',
        'Periksa tepi lembaran: pastikan tidak ada sobekan samping (edge tear) dan lembaran tidak melipat.',
        'Wajib menempelkan bendera penanda (flagging marker) di setiap titik sambungan (joint) kertas.'
      ]
    }
  ],
  standardParameters: [
    { parameter: 'Konsistensi Headbox', range: '0,18 - 0,20', unit: '%' },
    { parameter: 'Konsistensi Chest 4', range: '3,0 - 3,5', unit: '%' },
    { parameter: 'Tekanan Shower Needle Felt', range: '10,0 - 12,0', unit: 'bar' },
    { parameter: 'Tekanan Shower HPP Wire', range: '15,0 - 25,0', unit: 'bar' },
    { parameter: 'Tekanan Spray Coating/Release', range: 'Min. 2,5', unit: 'bar' },
    { parameter: 'Temperatur Silinder Yankee', range: '85,0 - 90,0', unit: '°C' },
    { parameter: 'Rasio Creping Doctor Blade', range: '15,0', unit: '%' },
    { parameter: 'Speed Pope Reel (Basis 150 mpm Yankee)', range: '127,5', unit: 'mpm' },
    { parameter: 'Target pH Pencucian Felt (FC)', range: '8,5', unit: 'pH' },
    { parameter: 'Vakum U-Box Dewatering', range: '-20 s/d -45', unit: 'kPa' }
  ],
  dcsIndicatorsGuide: [
    { code: 'CRC_PV_ACT', meaning: 'Konsistensi Aktual Buburan dari Sensor CRC', normalState: '2.60 - 2.80 %', actionIfAbnormal: 'Periksa valve delusen; jika hunting lakukan pembersihan blade sensor' },
    { code: 'CRC_SP_MAX', meaning: 'Set Point Batas Maksimal Konsistensi CRC', normalState: '2.80 %', actionIfAbnormal: 'Sesuaikan set point dengan standar resep gramatur order' },
    { code: 'FC_ACT_VAL', meaning: 'Nilai Laju Alir Aktual Flow Control ke Pompa Slurry', normalState: '35.0 - 45.0 m³/h', actionIfAbnormal: 'Sesuaikan % bukaan valve control manual/otomatis' },
    { code: 'VLV_OPEN_%', meaning: 'Persentase Bukaan Katup Valve Control', normalState: '30.0 - 60.0 %', actionIfAbnormal: 'Jika mendekati 100% dan debit drop, periksa sumbatan stuffbox' },
    { code: 'YANKEE_TEMP', meaning: 'Temperatur Permukaan Silinder Pengering Yankee', normalState: '85 - 90 °C', actionIfAbnormal: 'Atur pasokan steam valve dan periksa pembuangan kondensat siphon' },
    { code: 'CREPE_RATIO', meaning: 'Rasio Creping Kecepatan (Speed Yankee vs Pope Reel)', normalState: '15.0 % (0.85 ratio)', actionIfAbnormal: 'Kalibrasi inverter speed pope reel: Speed = Yankee × (1 - 0.15)' }
  ],
  commonFaultsAndSolutions: [
    {
      fault: 'Kain Felt Tergores Garis / Rusak Permanen (Felt Grooving)',
      indication: 'Muncul alur garis goresan melingkar pada felt dan lembaran kertas bergaris tipis basah.',
      cause: 'Motor osilator (isolating) shower needle macet sementara air bertekanan 12 bar menyemprot terus di satu titik.',
      immediateAction: 'Segera matikan semprotan shower needle atau turunkan tekanan ke < 3 bar, periksa motor penggerak osilator.',
      permanentSolution: 'Pasang interlock sensor otomatis: jika osilator berhenti bergerak lebih dari 5 detik, selenoid shower needle otomatis menutup.'
    },
    {
      fault: 'Gramatur Kertas (GSM) Naik-Turun Tidak Beraturan',
      indication: 'Hasil timbang lembaran di pope reel bervariasi lebar dari batas toleransi pesanan.',
      cause: 'Sensor CRC hunting akibat tersumbat kotoran plastik, atau tekanan air delusen berfluktuasi.',
      immediateAction: 'Lakukan flushing blade sensor CRC, periksa tekanan air delusen, beralih ke mode manual sementara jika kontrol liar.',
      permanentSolution: 'Pembersihan berkala pipa bypass CRC dan kalibrasi transmiter berkala oleh tim instrumen.'
    },
    {
      fault: 'Lembaran Kertas Robek di Mata Pisau Doctor Creping Blade (Sheet Break)',
      indication: 'Kertas putus menumpuk di bawah silinder Yankee dan tidak sampai ke pope reel.',
      cause: 'Mata pisau doctor blade gompal akibat tertumbuk pasir kotoran LCC, atau lapisan coating silinder botak.',
      immediateAction: 'Ganti bilah doctor blade baru, semprotkan chemical coating darurat, periksa suhu Yankee berada di 85-90 °C.',
      permanentSolution: 'Perbaiki efisiensi baterai LCC cleaner dan perketat jadwal penggantian blade setiap 6-8 jam operasi.'
    },
    {
      fault: 'Jumbo Roll Ditolak di Rewinder Akibat Ganjelan Debu & Tepi Sobek',
      indication: 'Kertas putus berkali-kali di rewinder dan ditemukan debu trim menumpuk di sela lapisan roll.',
      cause: 'Blower hisap trim di pope reel buntu atau operator tidak memasang tanda bendera (joint flag) pada sambungan.',
      immediateAction: 'Bersihkan corong hisap trim blower, rapikan potongan pisau tepi slitter, pasang bendera penanda joint dengan jelas.',
      permanentSolution: 'Tingkatkan kapasitas daya sedot trim blower dan wajibkan checklist inspeksi visual sebelum transfer jumbo roll.'
    }
  ],
  k3SafetyProcedures: [
    'TITIK JEPIT NIP HAZARDS: Area pertemuan Silinder Mould - Couch Roll, Yankee - Touch Roll, dan Drum Pope Reel - Spool adalah zona jepit mematikan. Dilarang keras membersihkan dengan tangan telanjang saat berputar.',
    'PERMUKAAN PANAS & STEAM TEKANAN TINGGI: Silinder Yankee bersuhu hingga 100°C+ dan pipa steam bertekanan tinggi. Gunakan sarung tangan tahan panas dan jangan menyentuh pipa tanpa insulasi isolator.',
    'BAHAYA PISAU SANGAT TAJAM: Bilah Doctor Creping Blade setajam pisau bedah. Wajib menggunakan sarung tangan anti-sayat Kevlar Level 5 saat memasang, menyetel, atau mengganti blade.',
    'BAHAYA AIR JET BERTEKANAN TINGGI: Pancaran air shower needle 12 bar dan shower HPP 25 bar dapat menembus jaringan kulit. Matikan pompa shower sebelum memeriksa nosel semprot.',
    'BAHAYA BAHAN KIMIA KOROSIF & LICIN: Bahan kimia Wet Strength, PEO, dan Felt Cleaner dapat menyebabkan lantai licin ekstrem dan iritasi mata/kulit. Gunakan kacamata goggle kimia, masker, dan sepatu sol antislip.'
  ],
  roleGuides: TISSUE_MACHINE_ROLE_GUIDES,
  mediaConfig: TISSUE_MACHINE_MEDIA_CONFIG,
  tissueEquipments: TISSUE_MACHINE_EQUIPMENTS,
  tissueQuizzes: TISSUE_MACHINE_QUIZZES
};

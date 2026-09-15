import { MachineTrainingData, RewinderComponentDetail, RewinderWorkflowStep, RewinderCompetencyQA, RoleResponsibilityGuide } from '../types';

export const REWINDER_COMPONENTS: RewinderComponentDetail[] = [
  {
    id: 'comp-unwind',
    name: '1. Unwinder (Unwind Stand & Brake System)',
    category: 'Unwind',
    function: 'Dudukan utama untuk meletakkan dan memutar Jumbo Roll (JR) yang akan digulung ulang dengan sistem rem pengendali ketegangan lembaran.',
    constructionDetails: 'Terdiri dari rangka baja kokoh, arm lifter hidrolik untuk mengangkat spool, core chuck pneumatik/mekanik, serta disc brake pneumatik yang terintegrasi sensor load cell otomatis.',
    operationTips: 'Pastikan core chuck terkunci rapat dengan tekanan udara standar (4.5 - 5.5 bar). Jangan jalankan mesin jika ada getaran eksentrik akibat spool bengkok.',
    roleAttention: 'Operator wajib memeriksa kebersihan chuck dan centering gulungan; Karu memverifikasi kalibrasi load cell tension.'
  },
  {
    id: 'comp-transfer',
    name: '2. Transfer Roll & Guide Roll',
    category: 'Web Guidance',
    function: 'Berfungsi sebagai penahan lembaran kertas/tissue, menjaga kestabilan lintasan (web run), dan mengarahkan lembaran melalui mesin dari unwinder ke unit slitter.',
    constructionDetails: 'Roll silinder baja berpermukaan poles krom halus (ground & polished chrome surface) dengan dynamic balance presisi tinggi untuk mencegah web flutter pada kecepatan tinggi.',
    operationTips: 'Bersihkan permukaan roll dari gumpalan debu kertas sebelum memulai proses threading lembaran agar tidak meninggalkan bekas goresan pada lembaran tissue halus.',
    roleAttention: 'Operator membersihkan permukaan roll setiap ganti gulungan; Teknisi memeriksa keausan bearing putar secara berkala.'
  },
  {
    id: 'comp-banana',
    name: '3. Banana Roll (Bowed / Spreader Roll)',
    category: 'Spreading',
    function: 'Roll melengkung berbentuk khusus yang berfungsi memecah dan merentangkan lembaran tissue/kertas ke arah samping setelah proses pemotongan (slitting) agar potongan-potongan terpisah sempurna dan tidak saling tumpang tindih (interweaving).',
    constructionDetails: 'Poros baja lengkung dengan serangkaian segmen selubung karet sintetis (rubber segmented sleeves) yang berputar bebas di atas bantalan bearing presisi. Sudut kelengkungan (bow direction) dapat diatur.',
    operationTips: 'Posisikan arah lengkungan (apex) menghadap ke arah tarikan lembaran. Jika gulungan jadi saling menempel di tepi, periksa posisi sudut kelengkungan banana roll.',
    roleAttention: 'Sangat penting dipahami Kepala Regu & Operator: posisi sudut kelengkungan salah menyebabkan lembaran berkerut atau antar gulungan bertabrakan.'
  },
  {
    id: 'comp-slitter',
    name: '4. Slitter Section (Top Slitter & Bottom Slitter)',
    category: 'Slitting',
    function: 'Unit pisau pemotong ganda presisi tinggi yang memotong lembaran kertas/tissue utuh menjadi beberapa gulungan dengan lebar yang tepat sesuai pesanan converting.',
    constructionDetails: 'Menggunakan sistem shear cut: Top Slitter berupa pisau piringan putar bersudut runcing (digerakkan pneumatik), dan Bottom Slitter berupa pisau cincin bermotor dengan alur tajam (hardened tool steel / carbide).',
    operationTips: 'Pertahankan sudut geser (cant angle) 0.5° - 1.0° dan overlap pisau 1.0 - 1.5 mm. Pisau tumpul harus segera diganti untuk mencegah hasil potongan berdebu dan berserabut.',
    roleAttention: 'Operator dilarang menyentuh pisau saat berputar; Karu wajib memeriksa ketajaman dan akurasi ukuran lebar potong dengan mistar baja presisi.'
  },
  {
    id: 'comp-drum',
    name: '5. Drum Roll (Carrier / Winding Drum)',
    category: 'Winding',
    function: 'Roll penggulung utama berdiameter besar yang memutar dan menopang gulungan lembaran tissue baru pada core shaft dengan profil kekencangan yang terkontrol.',
    constructionDetails: 'Silinder baja berdinding tebal dengan lapisan grooved (beralur spiral) atau tungsten carbide coating untuk meningkatkan daya cengkeram tanpa merusak tekstur tissue, dilengkapi rider roll hidrolik penekan.',
    operationTips: 'Kontrol tekanan rider roll agar menurun secara bertahap saat diameter gulungan membesar (tapered tension) agar gulungan tidak meledak (bursting) atau kendor di bagian dalam.',
    roleAttention: 'Operator memantau kerapatan putaran dan getaran; Karu mengecek kekerasan gulungan (roll hardness) menggunakan Schmidt hammer tester.'
  },
  {
    id: 'comp-calender',
    name: '6. Calender Unit (Calender Steel & Calender Rubber)',
    category: 'Calendering',
    function: 'Meratakan lembaran kertas/tissue, memadatkan serat mikro, mengontrol ketebalan (caliper), dan meningkatkan kehalusan permukaan (smoothness & hand-feel).',
    constructionDetails: 'Pasangan dua roll yang bekerja dengan tekanan nip hidrolik/pneumatik: Roll atas Calender Rubber (lapisan karet elastomer sintetis) dan Roll bawah Calender Steel (baja paduan khusus yang sangat halus).',
    operationTips: 'Periksa kebersihan roll calender sebelum running. Adanya gumpalan serat atau benda asing di permukaan rubber roll akan menimbulkan cacat berulang (pin-holes) pada lembaran tissue.',
    roleAttention: 'Operator menjaga kebersihan nip; Karu mengatur tekanan nip line pressure sesuai spesifikasi gramatur dan grade tissue yang diproduksi.'
  },
  {
    id: 'comp-blower',
    name: '7. Blower Trim (Edge Trim Vacuum Suction)',
    category: 'Auxiliary',
    function: 'Menghisap sisa pita potongan tepi lembaran (edge trim) di sisi kiri dan kanan secara kontinu untuk dialirkan ke broke pulper atau tempat penampungan daur ulang.',
    constructionDetails: 'Corong hisap aerodinamis (trim chutes) berbahan stainless steel yang tersambung dengan fan blower hisap bertekanan tinggi (centrifugal exhaust fan) dan pipa saluran buang anti-statik.',
    operationTips: 'Pastikan sudut nozzle hisap tepat sejajar dengan garis potong slitter tepi. Jika trim blower tersumbat, sobekan kertas tepi akan tertarik masuk ke dalam gulungan produk jadi.',
    roleAttention: 'Operator wajib memantau saluran trim setiap saat; Karu memastikan damper udara blower terbuka optimal dan tidak ada sumbatan serat.'
  }
];

export const REWINDER_WORKFLOW_STEPS: RewinderWorkflowStep[] = [
  {
    stepNumber: 1,
    title: 'Persiapan Bahan & Pemeriksaan Awal (Pre-Run Check)',
    phase: 'Persiapan (Loading)',
    description: 'Pemeriksaan kondisi fisik Jumbo Roll (JR) dari mesin PM dan persiapan selongsong karton (core) sesuai work order pesanan converting.',
    operatorAction: 'Muat Jumbo Roll ke unwinder dengan crane/lifter. Periksa visual: pastikan JR tidak koyak, tidak berkerut parah, tidak lembab, dan tandai jika ada joint/sambungan dari seksi PM. Bersihkan seluruh roll dari debu serat.',
    karuCheck: 'Memvalidasi Work Order (lebar potong, diameter target, jumlah roll potong, dan core size) serta memastikan kesiapan tim.',
    safetyCaution: 'Gunakan helm safety, sarung tangan pelindung, dan pastikan area radius pengangkatan crane steril dari lalu lintas orang.'
  },
  {
    stepNumber: 2,
    title: 'Penyambungan & Threading Lembaran (Web Feeding & Jointing)',
    phase: 'Penarikan Lembaran (Threading)',
    description: 'Penarikan lembaran dari unwinder melewati transfer roll, nip calender, celah pisau slitter, hingga dilekatkan pada core di drum roll.',
    operatorAction: 'Tarik lembaran tissue secara merata dan lurus (square alignment). Lewatkan ke calender nip (dalam posisi terbuka), arahkan melalui slitter, lewati banana roll, dan tempelkan rapi menggunakan adhesive tape pada core selongsong baru.',
    karuCheck: 'Pastikan penarikan lembaran tidak miring, tidak melipat di tepi, dan sambungan joint tape rata tanpa gundukan tebal.',
    safetyCaution: 'Operasikan mesin hanya pada kecepatan crawling/threading (< 15 m/min). Dilarang menyentuh nip roll dengan tangan terbuka!'
  },
  {
    stepNumber: 3,
    title: 'Pengaturan Ketegangan & Kalibrasi Load Cell (Tension Control)',
    phase: 'Stabilisasi Tegangan (Tensioning)',
    description: 'Menstabilkan tegangan lembaran tissue agar tidak kendur, tidak bergelombang, dan tidak putus saat percepatan (acceleration).',
    operatorAction: 'Aktifkan sistem auto-tension control. Atur nilai setpoint tension pada kontroler unwinder brake sesuai ketebalan/gramatur lembaran tissue agar tidak terjadi wrinkle.',
    karuCheck: 'Memverifikasi bahwa dancer roll atau load-cell signal stabil, tidak berosilasi ekstrem, dan rem unwinder merespons dengan presisi.',
    safetyCaution: 'Waspadai bahaya putus lembaran (web snap). Hindari berdiri tepat di bawah lintasan lembaran tegang berkecepatan tinggi.'
  },
  {
    stepNumber: 4,
    title: 'Pengaturan & Pemotongan Slitter (Slitter Engagement)',
    phase: 'Pemotongan (Slitting)',
    description: 'Mengaktifkan pisau slitter atas dan bawah untuk memotong lembaran menjadi roll-roll sesuai ukuran pesanan.',
    operatorAction: 'Turunkan top slitter ke posisi engaged. Pastikan overlap pisau tepat dan blower trim di kedua tepi aktif menghisap potongan trim dengan lancar.',
    karuCheck: 'Mengukur hasil potongan roll pertama dengan mistar ukur presisi (toleransi lebar potong ±0.5 mm) dan meraba kehalusan tepi potongan.',
    safetyCaution: 'BAHAYA PISAU TAJAM: Dilarang keras menyetel posisi pisau saat poros sedang berputar. Gunakan tool khusus bersertifikat.'
  },
  {
    stepNumber: 5,
    title: 'Proses Penggulungan Utama (High-Speed Rewinding)',
    phase: 'Penggulungan (Winding)',
    description: 'Menaikkan kecepatan putar mesin secara bertahap hingga target kecepatan produksi dengan pengawasan parameter continuous.',
    operatorAction: 'Akselerasi kecepatan mesin. Pantau kestabilan lembaran di banana roll, pastikan celah antar rol potongan tetap terpisah rapi, dan amati formasi gulungan di drum roll.',
    karuCheck: 'Memeriksa kestabilan getaran bearing drum roll, tekanan rider roll, dan ketiadaan debu serat menumpuk di area calender.',
    safetyCaution: 'Pertahankan jarak aman di luar garis kuning pembatas. Siagakan tangan dekat tombol Emergency Stop jika terjadi lembaran robek/jammed.'
  },
  {
    stepNumber: 6,
    title: 'Penghentian, Pemotongan Ekor & Pengeluaran Produk (Doffing)',
    phase: 'Finishing & Pelepasan (Doffing)',
    description: 'Deselerasi mesin saat mencapai panjang meter/diameter target, pemotongan lembaran akhir, dan ejeksi gulungan jadi.',
    operatorAction: 'Mesin berhenti otomatis. Lakukan tail cut, rekatkan ujung lembaran dengan rapi, aktifkan lengan pendorong hidrolik untuk menurunkan gulungan ke lantai penampungan, lalu timbang dan beri label identitas roll.',
    karuCheck: 'Periksa fisik roll: kelurusan tepi gulungan (edge weave), kerapatan gulungan (hardness), tidak ada sisir trim terselip, dan verifikasi berat timbangan.',
    safetyCaution: 'Pastikan jalur ejector roll bersih dari orang. Roll tissue/kertas berat puluhan hingga ratusan kg memiliki inersia besar saat bergulir.'
  }
];

export const REWINDER_COMPETENCY_QAS: RewinderCompetencyQA[] = [
  {
    number: 1,
    question: 'Bagaimana ciri-ciri potongan slitter yang telah tumpul?',
    quickAnswer: 'Hasil potongan berserabut (fuzzy edge), timbul banyak debu serat kertas, dan lembaran tissue tidak terpotong sempurna.',
    deepDiveExplanation: 'Ketika pisau potong (top atau bottom slitter) kehilangan ketajamannya atau sudut kontak geser (shear angle) bergeser, gaya yang terjadi bukan lagi pemotongan murni (clean shear cut) melainkan perobekan paksa (tearing). Akibatnya, serat-serat selulosa tertarik keluar menghasilkan tepi yang compang-camping, menghasilkan partikel serbuk debu dalam jumlah besar yang mengotori mesin, dan tepi gulungan menjadi kasar serta bergelombang.',
    operationalImpact: 'Menyebabkan komplain dari divisi converting/pelanggan karena gulungan macet di mesin konversi otomatis dan rentan putus saat dibuka.',
    whoMustMaster: 'Semua Operator, Kepala Regu, dan Teknisi Pisau (Grinding Staff)'
  },
  {
    number: 2,
    question: 'Apa saja yang perlu dilakukan sebelum melakukan joint tissue dari unwinder sampai ke depan?',
    quickAnswer: 'Melakukan cleaning seluruh roll dari debu, memastikan alignment core lurus, dan mengecek kondisi tepi lembaran.',
    deepDiveExplanation: 'Debu serat tissue dan partikel kertas yang menumpuk di atas transfer roll, calender roll, atau drum roll dapat menempel pada lembaran baru, menimbulkan cacat visual, mengurangi cengkeraman traksi antar roll, atau bahkan menyebabkan slippage (tergelincir). Selain itu, roll yang kotor oleh sisa lem sambungan sebelumnya akan merusak lembaran yang melintas di atasnya. Oleh karena itu, prosedur pembersihan permukaan roll dengan lap khusus/vacuum sebelum threading joint adalah kewajiban mutlak.',
    operationalImpact: 'Mencegah lembaran tissue robek saat akselerasi, menghindari cacat bintik debu/kotoran, serta menjamin keselamatan kerja.',
    whoMustMaster: 'Operator Pelaksana & Pembantu Operator'
  },
  {
    number: 3,
    question: 'Kenapa tissue harus melalui proses calender?',
    quickAnswer: 'Supaya lembaran tissue lebih halus, lembut, ketebalannya rata, dan serat mikro terikat padat merata.',
    deepDiveExplanation: 'Lembaran kertas tissue yang keluar dari silinder pengering (Yankee/Dryer PM) umumnya memiliki permukaan yang belum sepenuhnya rata dengan ketebalan lokal yang bervariasi. Proses calendering melalui nip antara Calender Rubber dan Calender Steel memberikan kompresi mekanik terkontrol yang meluruskan serta meratakan serat mikro permukaan. Ini meningkatkan kehalusan sentuhan (smoothness/softness), menyeragamkan bulk/caliper, serta mempermudah proses pemotongan slitter dan pencetakan (jika ada corak emboss).',
    operationalImpact: 'Menjamin standar mutu kelembutan (grade A softness) dan konsistensi gulungan yang padat tanpa lembek di salah satu sisi.',
    whoMustMaster: 'Kepala Regu, Operator, & Quality Control (QC)'
  },
  {
    number: 4,
    question: 'Apakah fungsi transfer roll atau roll penghubung?',
    quickAnswer: 'Berfungsi menopang lembaran tissue, menjaga kestabilan ketegangan, dan mengarahkan lintasan lembaran secara konsisten saat proses penggulungan.',
    deepDiveExplanation: 'Dalam lintasan mesin dari unwinder menuju calender dan slitter terdapat bentang jarak fisik. Transfer roll berfungsi sebagai jembatan penumpu yang berputar dengan resistansi gesek sangat rendah (low rotational inertia). Roll ini mencegah lembaran kertas berayun (fluttering), meredam getaran akibat putaran jumbo roll yang tidak bulat sempurna, serta memastikan sudut masuk lembaran (entry angle) ke unit calender dan slitter selalu konstan pada setiap tingkat kecepatan.',
    operationalImpact: 'Mencegah timbulnya kerutan memanjang (wrinkle), mencegah robekan akibat hentakan tegangan mendadak, dan menjaga kestabilan posisi web.',
    whoMustMaster: 'Operator Rewinder & Kepala Regu'
  },
  {
    number: 5,
    question: 'Apakah fungsi roll banana (bowed spreader roll)?',
    quickAnswer: 'Untuk memecah dan memisahkan lembaran tissue yang telah dipotong slitter ke arah samping agar gulungan tidak saling tumpang tindih (mencegah interweaving).',
    deepDiveExplanation: 'Setelah lembaran lebar dipotong oleh jajaran pisau slitter menjadi 2 atau lebih jalur pita lembaran berdampingan, jarak celah potong di antara pita tersebut awalnya adalah nol (0 mm). Jika langsung digulung bersamaan pada drum roll, getaran mikro atau variasi tegangan akan menyebabkan tepi gulungan yang berdampingan saling bergesekan, bertumpukan, dan tersangkut menjadi satu rol yang tidak bisa dipisahkan (fenomena interweaving). Roll banana dengan kelengkungan cembungnya memberikan gaya tarikan vektor ke arah luar (lateral expansion), sehingga jarak celah antar pita lembaran melebar beberapa milimeter sebelum mencapai drum roll.',
    operationalImpact: 'Meniadakan risiko cacat fatal interweaving roll (roll gandeng yang harus di-reject/afkir), menjamin gulungan terlepas mandiri saat didoffing.',
    whoMustMaster: 'Wajib Dikuasai Mutlak oleh Semua Operator, Kepala Regu, dan Kepala PM'
  }
];

export const REWINDER_ROLE_GUIDES: RoleResponsibilityGuide[] = [
  {
    role: 'Operator Pelaksana',
    badgeColor: 'emerald',
    summary: 'Penanggung jawab teknis langsung di lantai mesin yang mengendalikan operasional harian rewinder dari muat Jumbo Roll hingga gulungan jadi.',
    dailyFocus: [
      'Menjaga ketegangan tissue saat digulung agar bebas dari wrinkle atau lipatan.',
      'Mengawasi fisik Jumbo Roll sebelum masuk ke calender: pastikan tidak koyak, tidak bolong, dan waspadai tanda sambungan joint dari PM.',
      'Memastikan pisau slitter dalam kondisi tajam, tidak sompal, dan overlap setelan pas.',
      'Memastikan potongan sisir trim dihisap bersih oleh blower dan tidak terselip masuk ke gulungan.',
      'Selalu membersihkan seluruh permukaan roll dari debu serat sebelum start operasi.',
      'Menerapkan protokol K3: tidak menyentuh nip roll berputar dan selalu memakai APD lengkap.'
    ],
    decisionAuthority: [
      'Segera menekan tombol STOP darurat jika terjadi lembaran robek atau bahaya mekanik.',
      'Menghentikan proses feeding jika menemukan benda asing pada permukaan rubber roll.',
      'Melaporkan langsung ke Kepala Regu jika mendeteksi keausan pisau atau getaran abnormal.'
    ]
  },
  {
    role: 'Kepala Regu (Karu)',
    badgeColor: 'amber',
    summary: 'Pemimpin shift operasional yang memvalidasi kesesuaian target produksi, mutu potongan, pengaturan mekanik, dan kedisiplinan SOP tim.',
    dailyFocus: [
      'Memvalidasi Work Order pesanan: lebar slitting, diameter gulungan, dan jenis core yang diminta.',
      'Memeriksa akurasi posisi pisau slitter dengan mistar ukur sebelum running kecepatan penuh.',
      'Mengevaluasi sudut kelengkungan banana roll untuk memastikan tidak ada kecenderungan interweaving.',
      'Memonitor rasio tekanan nip calender dan profil kekerasan gulungan (wound roll hardness).',
      'Mengatur rotasi kerja operator dan memastikan pembersihan debu dilakukan konsisten setiap shift.',
      'Mencatat dan menganalisis downtime rewinder ke dalam Laporan Shift Pabrik.'
    ],
    decisionAuthority: [
      'Memutuskan penggantian set pisau slitter jika hasil potongan dinilai berbulu/kasar.',
      'Menyetujui atau menolak penyambungan Jumbo Roll yang memiliki cacat fisik parah.',
      'Menyetel parameter tegangan (tension controller) dan penyesuaian sudut banana roll.'
    ]
  },
  {
    role: 'Kepala PM & Superintendent',
    badgeColor: 'blue',
    summary: 'Pimpinan lini produksi kertas yang bertanggung jawab atas ketercapaian target output tonase, efisiensi konversi (yield), keandalan mesin, dan zero accident.',
    dailyFocus: [
      'Mengevaluasi rasio kehilangan bahan (trim loss percentage) agar selalu dalam batas wajar (< 3.5%).',
      'Memastikan kontinuitas aliran produk dari seksi Paper Machine (PM1/PM2/PM5) ke seksi Rewinder tanpa bottleneck.',
      'Menjadwalkan program re-grinding pisau slitter dan rekondisi roll calender secara berkala.',
      'Melakukan audit berkala terhadap kepatuhan SOP dan keselamatan kerja di area finishing.',
      'Menganalisis tren keluhan mutu dari divisi converting atau konsumen akhir untuk perbaikan berkelanjutan.'
    ],
    decisionAuthority: [
      'Otorisasi jadwal shut down berkala untuk pemeliharaan mayor unit calender dan drum roll.',
      'Persetujuan spesifikasi teknis pembelian suku cadang baru (pisau carbide, rubber sleeve, bearing).',
      'Penetapan standar parameter operasi dan matriks kompetensi bagi seluruh kru finishing.'
    ]
  }
];

export const REWINDER_TRAINING_DATA: MachineTrainingData = {
  machineId: 'REWINDER',
  name: 'Mesin Rewinder & Slitter (Finishing & Converting Preparation)',
  tagline: 'Lini Finishing Pemotong, Penghalus Kertas/Tissue (Calender), dan Penggulung Ulang Presisi Tinggi',
  technicalSpecs: [
    { label: 'Tipe Mesin', value: 'Two-Drum Surface Winder dengan Slitter & Soft Calender Integrated' },
    { label: 'Lebar Masukan Maksimum (Max Web)', value: '3.200 - 3.800 mm (Jumbo Roll Paper Machine)' },
    { label: 'Kecepatan Operasi Standar', value: '450 - 950 m/menit (Kecepatan Desain Maks: 1.200 m/min)' },
    { label: 'Diameter Maksimal Jumbo Roll', value: 'Ø 2.200 mm (Berat maksimum hingga 4.5 Ton)' },
    { label: 'Diameter Maksimal Roll Jadi', value: 'Ø 1.250 - 1.500 mm (Sesuai spesifikasi order converting)' },
    { label: 'Unit Slitter Cutting', value: 'Circular Shear-cut (Pneumatic Top Slitter & Motorized Bottom Slitter)' },
    { label: 'Unit Calender', value: '2-Roll Calender: Calender Rubber (Top) + Calender Steel (Bottom)' },
    { label: 'Unit Spreader', value: 'Adjustable Bowed Banana Roll dengan Rubber Segmented Sleeves' },
    { label: 'Sistem Pengendalian Trim', value: 'High-Pressure Centrifugal Trim Blower & Suction Chutes ke Broke Pulper' },
    { label: 'Sistem Pengereman Unwind', value: 'Pneumatic Multi-disc Brake dengan Feedback Closed-loop Load Cell' }
  ],
  operatingLimits: [
    { label: 'Kecepatan Operasi Maksimal', limit: '1.000 m/min', dangerZone: '> 1.100 m/min risiko lembaran melayang (flutter) dan putus di celah slitter' },
    { label: 'Tekanan Nip Calender Roll', limit: '30 N/mm', dangerZone: '> 38 N/mm risiko merusak kelembutan (bulk) tissue dan merusak karet calender' },
    { label: 'Tekanan Penjepit Pisau Slitter', limit: '2.2 bar', dangerZone: '> 2.8 bar pisau cepat panas/aus sompal; < 1.0 bar potongan berserabut' },
    { label: 'Suhu Piringan Rem Unwind Brake', limit: '70°C', dangerZone: '> 85°C koefisien gesek pad rem menurun drastis (rem blong)' },
    { label: 'Tekanan Udara Blower Trim', limit: '0.45 bar', dangerZone: '< 0.25 bar daya hisap lemah, sisa potongan masuk ke gulungan' }
  ],
  paperGrades: [
    { code: 'TT-VIRGIN', name: 'Toilet Tissue Virgin 14 - 18 gsm', gsmRange: '13.5 - 18.5 gsm', description: 'Tissue toilet 2-ply super lembut, membutuhkan calendering halus dan pemotongan sangat tajam' },
    { code: 'FT-FACIAL', name: 'Facial Tissue Premium 12.5 - 14.5 gsm', gsmRange: '12.0 - 15.0 gsm', description: 'Tissue wajah ultra lembut, kontrol tegangan sangat sensitif agar tidak putus atau melipat' },
    { code: 'HT-TOWEL', name: 'Hand Towel & Napkin 20 - 28 gsm', gsmRange: '19.5 - 29.0 gsm', description: 'Tissue tebal penyerap air tinggi, memerlukan tekanan calendering dan winding hardness lebih padat' },
    { code: 'KRAFT-SLIT', name: 'Medium Fluting & Linerboard 110 - 200 gsm', gsmRange: '105 - 205 gsm', description: 'Kertas karton cokelat boks, membutuhkan daya geser pisau tinggi dan traksi drum roll kuat' }
  ],
  specialCharacteristics: 'Mesin Rewinder merupakan jembatan kritis antara gulungan raksasa hasil produksi Paper Machine (PM) dengan proses konversi menjadi produk jadi konsumen. Keunikan proses ini terletak pada kontrol simultan: memotong dengan pisau berputar kecepatan tinggi, menghaluskan serat melalui nip Calender Steel & Calender Rubber, merentangkan lembaran menggunakan Banana Roll agar tidak tabrakan (interweaving), serta menggulung ulang dengan kurva ketegangan yang menurun (tapered tension) agar gulungan padat dan tidak meledak di gudang.',
  differencesFromOthers: 'Berbeda dengan PM1, PM2, dan PM5 yang menitikberatkan pada proses kimiawi suspensi bubur air dan pengeringan uap panas, Mesin Rewinder menitikberatkan pada aspek mekanik presisi finishing: ketajaman pisau potong, pencegahan debu serat (dust management), stabilitas tegangan dinamis, dan geometri gulungan.',
  dailyCheckpoints: [
    {
      area: 'Seksi Unwinder & Rem (Unwind Stand)',
      items: [
        'Cek tekanan penguncian core chuck pneumatik: pastikan tidak ada kebocoran udara.',
        'Inspeksi kampas rem (brake pads): periksa ketebalan kampas dan kebersihan piringan dari oli.',
        'Periksa kelancaran putaran spool bearing dan kebersihan sensor load-cell penimbang tegangan.'
      ]
    },
    {
      area: 'Seksi Calender (Steel & Rubber Roll)',
      items: [
        'Periksa kebersihan permukaan Calender Steel dan Calender Rubber dari kerak lem atau debu serat.',
        'Cek keselarasan tekanan nip kiri dan kanan agar tidak ada selisih ketebalan (wedge profile).',
        'Pastikan bilah doctor blade calender menempel rata membersihkan sisa serat mikro.'
      ]
    },
    {
      area: 'Seksi Pemotong (Slitter Knives & Banana Roll)',
      items: [
        'Uji ketajaman top slitter dan bottom slitter; ganti pisau jika tepi sudah sompal atau aus.',
        'Cek sudut kelengkungan banana roll: pastikan segmen karet berputar bebas tanpa hambatan bearing.',
        'Uji daya hisap nozzle blower trim: pastikan tidak ada serpihan kertas yang menyumbat pipa corong.'
      ]
    },
    {
      area: 'Seksi Penggulungan (Drum Roll & Rider Roll)',
      items: [
        'Periksa kebersihan alur (groove) permukaan drum roll dari debu yang memadat.',
        'Cek pergerakan vertikal lengan rider roll hidrolik: pastikan silinder naik-turun seimbang.',
        'Verifikasi fungsi sistem pengunci core baru dan mekanisme ejektor roll hidrolik.'
      ]
    }
  ],
  standardParameters: [
    { parameter: 'Toleransi Lebar Potong (Slit Width)', range: '± 0.5', unit: 'mm' },
    { parameter: 'Tegangan Lembaran (Web Tension Range)', range: '80 - 240', unit: 'N/m' },
    { parameter: 'Tekanan Nip Calender', range: '15 - 30', unit: 'N/mm' },
    { parameter: 'Overlap Pisau Slitter (Top-to-Bottom)', range: '1.0 - 1.5', unit: 'mm' },
    { parameter: 'Sudut Pisau Slitter (Cant Angle)', range: '0.5° - 1.0°', unit: 'derajat' },
    { parameter: 'Tekanan Udara Blower Trim', range: '0.35 - 0.50', unit: 'bar' }
  ],
  dcsIndicatorsGuide: [
    { code: 'TEN-ACT (Actual Web Tension)', meaning: 'Tegangan lembaran aktual terukur oleh load-cell', normalState: 'Stabil sesuai setpoint (±3%)', actionIfAbnormal: 'Sesuaikan setelan rem unwinder; cek apakah ada fluktuasi diameter atau lembaran berkerut' },
    { code: 'SLIT-RPM (Slitter Motor Speed)', meaning: 'Kecepatan putar pisau bottom slitter', normalState: '+3% s/d +6% overspeed terhadap web', actionIfAbnormal: 'Jika RPM pisau tertinggal dari lembaran, hasil potong akan tersangkut dan sobek' },
    { code: 'RIDER-P (Rider Roll Pressure)', meaning: 'Tekanan penekan hidrolik drum penggulung', normalState: 'Tapered (menurun dari 2.0 bar ke 0.8 bar)', actionIfAbnormal: 'Periksa regulator kurva pneumatik drum jika tekanan tidak mau turun otomatis' },
    { code: 'TRIM-FLOW (Trim Air Velocity)', meaning: 'Kecepatan aliran udara hisap pada pipa buang', normalState: '> 25 m/detik', actionIfAbnormal: 'Segera matikan mesin jika blower mampet sebelum sisa trim tertarik ke gulungan' }
  ],
  commonFaultsAndSolutions: [
    {
      fault: 'Potongan Tepi Berserabut & Berdebu (Fuzzy Edge & High Dusting)',
      indication: 'Tepi gulungan tidak rata, banyak serpihan debu serat halus jatuh di bawah pisau slitter.',
      cause: 'Pisau top atau bottom slitter telah tumpul, sudut canting tidak pas, atau overlap pisau terlalu dalam.',
      immediateAction: 'Periksa visual kondisi mata pisau, bersihkan serpihan debu dengan kuas anti-statik, dan sesuaikan posisi overlap.',
      permanentFix: 'Ganti set pisau dengan pisau yang telah di-regrinding tajam dan kalibrasi sudut kontak pisau 0.5° - 1.0°.'
    },
    {
      fault: 'Antar Gulungan Saling Tumpang Tindih / Tabrakan (Interweaving Roll)',
      indication: 'Dua gulungan yang berdampingan di drum roll tidak bisa dipisahkan saat proses pelepasan/doffing.',
      cause: 'Pengaturan sudut kelengkungan banana roll tidak tepat, atau tegangan lembaran tidak merata di bagian melintang (CD tension profile miring).',
      immediateAction: 'Kurangi kecepatan rewinder, atur ulang posisi puncak (apex) banana roll agar gaya penyebaran ke samping meningkat.',
      permanentFix: 'Lakukan alignment kesejajaran transfer roll dan periksa kebebasan putar seluruh segmen bearing banana roll.'
    },
    {
      fault: 'Lembaran Kertas Berkerut / Melipat (Wrinkle / Creases)',
      indication: 'Terdapat lipatan diagonal atau lipatan memanjang pada lembaran sebelum masuk ke drum roll.',
      cause: 'Tegangan lembaran terlalu kendor, transfer roll kotor berdebu sehingga koefisien gesek tidak seragam, atau calender roll tidak rata tekanannya.',
      immediateAction: 'Naikkan sedikit brake tension unwinder, bersihkan roll dari debu, dan cek keseimbangan tekanan kiri-kanan calender.',
      permanentFix: 'Lakukan pembersihan menyeluruh permukaan rubber calender dan kalibrasi ulang load cell sensor unwinder.'
    },
    {
      fault: 'Pipa Blower Trim Mampet / Tersumbat (Trim Chute Jammed)',
      indication: 'Pita sobekan pinggir menumpuk di area pisau dan terseret masuk ke gulungan jadi.',
      cause: 'Hisapan blower lemah, ada lekukan tajam di pipa, atau operator tidak mengecek kebersihan corong hisap sebelum jalan.',
      immediateAction: 'Segera tekan tombol STOP, matikan pisau slitter, bersihkan sumbatan di corong hisap dengan tongkat pembersih aman.',
      permanentFix: 'Periksa putaran motor blower exhaust dan bersihkan filter penampungan broke pulper secara terjadwal.'
    }
  ],
  k3SafetyProcedures: [
    'BAHAYA PISAU SLITTER SANGAT TAJAM: Dilarang keras memegang, menyetel, atau membersihkan pisau saat mesin beroperasi. Wajib menerapkan prosedur LOTO (Lock Out Tag Out) dan menggunakan sarung tangan tahan potong saat mengganti pisau.',
    'BAHAYA TITIK JEPIT (PINCH POINT): Area perputaran Drum Roll, Rider Roll, dan Calender Nip dapat menarik anggota tubuh dalam hitungan milidetik. Dilarang membersihkan roll yang berputar menggunakan tangan atau kain lap pendek!',
    'AREA RAWAN DEBU & KEBISINGAN TINGGI: Wajib mengenakan kacamata pelindung (safety glasses) dan earplug/earmuff (kebisingan blower hisap > 85 dB). Debu serat kertas mudah memicu iritasi dan bahaya kebakaran.',
    'PROSEDUR HANDLING ROLL BERAT: Gulungan Jumbo Roll dan produk jadi memiliki berat ratusan kg hingga berton-ton. Dilarang berdiri di jalur gelinding roll saat proses ejeksi (doffing) berlangsung.',
    'UJI EMERGENCY STOP: Pastikan tali kawat darurat (Pull-wire E-Stop) di sepanjang bodi rewinder berfungsi baik setiap sebelum memulai shift.'
  ],
  componentsList: REWINDER_COMPONENTS,
  workflowSteps: REWINDER_WORKFLOW_STEPS,
  competencyQAs: REWINDER_COMPETENCY_QAS,
  roleGuides: REWINDER_ROLE_GUIDES
};

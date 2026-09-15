import { MachineTrainingData, StockPrepEquipmentDetail, StockPrepQuizItem, RoleResponsibilityGuide } from '../types';

export const STOCK_PREP_EQUIPMENTS: StockPrepEquipmentDetail[] = [
  {
    id: 'sp-eq-1',
    stepNumber: 1,
    name: '1. Hydrapulper (High Consistency & Low Consistency Pulper)',
    category: 'Pulping & Slushing',
    targetConsistency: 'High Cons: 8% - 12% | Low Cons: 3% - 4%',
    function: 'Melebur dan mengurai bahan baku lembaran kering (bal Virgin Pulp LBKP/NBKP, Broke/BS, Pulp Curah, dan OCC) menjadi buburan serat homogen tersuspensi dalam air.',
    workingPrinciple: 'Ketika rotor di dasar bejana berputar cepat, terjadi efek pumping hidrolis ke arah luar putaran rotor, cairan terdorong ke atas dinding bejana lalu melengkung kembali ke tengah membentuk gaya vorteks (pusaran). Perpaduan gaya sentrifugal pumping dan vorteks hisap menghasilkan turbulensi acak yang sangat kuat. Baffle (buffer plate) pada dinding bejana memecah aliran melingkar murni dan meningkatkan gaya turbulensi geser, sehingga ikatan lembaran pulp basah terurai tanpa memotong serat.',
    keyParameters: [
      { label: 'Konsistensi High Consistency Pulper', value: '8.0% - 12.0%', unit: '%', note: 'Efisien untuk deinking & gesekan antar-serat tinggi menghemat energi kimia' },
      { label: 'Konsistensi Low Consistency Pulper', value: '3.0% - 4.0%', unit: '%', note: 'Ideal untuk kontinyu feeding dan transfer pompa sentrifugal standar' },
      { label: 'Formula Resep Cassie Standar', value: '70% Curah : 20% LBKP : 10% BS', unit: 'Rasio', note: 'Per 400 kg LBKP membutuhkan 1.400 kg Curah & 200 kg BS (Total 2.000 kg kering)' },
      { label: 'Waktu Pengadukan (Slushing Time)', value: '15 - 25', unit: 'Menit', note: 'Dilarang over-pulped agar serat tidak terhidrasi prematur sebelum refiner' }
    ],
    operatorDuties: [
      'Mengetahui dan menimbang komposisi resep secara akurat sesuai SPK (Surat Perintah Kerja).',
      'Wajib menjaga kebersihan bahan baku: buang kawat pengikat bal, tali rafia, karung goni, plastik pembungkus, dan batu/kerikil sebelum masuk pulper.',
      'Menghitung rasio kebutuhan air proses (white water) terhadap berat kering bahan baku agar konsistensi stabil.',
      'Memeriksa kondisi pelumasan bantalan bearing rotor pulper dan getaran motor penggerak.'
    ],
    karuInspection: [
      'Verifikasi kepatuhan operator terhadap resep gramatur dan konsistensi batch (uji sampling konsistensi lab berkala).',
      'Pemeriksaan visual kebersihan dump chest dari kontaminan kasar yang lolos.',
      'Memastikan motor tidak mengalami overload arus (Ampere) saat pemuatan bahan padat.'
    ],
    kepalaPmFocus: [
      'Efisiensi pemakaian energi listrik pulper per ton bubur (kWh/ton).',
      'Minimasi broke internal dan konsistensi supply stock harian menuju jalur PM1, PM2, dan PM5.'
    ],
    troubleshootingGuide: [
      {
        fault: 'Bale pulp lama terurai / Flakes berlebih',
        indication: 'Waktu pulping melebihi 30 menit, terdapat gumpalan lembaran besar di dump chest.',
        immediateAction: 'Periksa volume air (bila terlalu encer konsistensi turun di bawah 3%, gaya geser antar-serat melemah). Tambahkan bahan baku atau atur level air.',
        permanentFix: 'Cek keausan blade rotor pulper dan baffle dinding. Ganti blade jika jarak celah rotor ke bedplate melebihi batas toleransi pabrik.'
      },
      {
        fault: 'Rotor pulper macet (Jamming)',
        indication: 'Arus motor melonjak (Overload trip), putaran rotor berhenti mendadak.',
        immediateAction: 'Matikan breaker motor segera (Lock Out Tag Out - LOTO), kuras air pulper, evakuasi benda asing (kawat baja bal atau kayu).',
        permanentFix: 'Perketat inspeksi bahan baku di lantai timbang sebelum bal dimasukkan ke konveyor feeding.'
      }
    ]
  },
  {
    id: 'sp-eq-2',
    stepNumber: 2,
    name: '2. High Density Cleaner (HDC - Centrifugal Heavy Cleaner)',
    category: 'Centrifugal Cleaning',
    targetConsistency: '3.0% - 4.0%',
    function: 'Memisahkan dan membuang kontaminan berat berdensitas tinggi (heavy trash) seperti staples, kerikil, batu, pasir kasar, pecahan kaca, dan potongan besi dengan prinsip gaya sentrifugal cairan berputar.',
    workingPrinciple: 'Bubur dipompa masuk secara tangensial ke bagian atas kerucut (cone) HDC dengan kecepatan tinggi. Pusaran cairan berkecepatan tinggi menciptakan medan percepatan sentrifugal ratusan kali gravitasi bumi. Partikel berat terlempar ke dinding luar cone dan meluncur turun menuju Junk Trap, sementara serat pulp yang lebih ringan berkumpul di pusat pusaran dan naik ke atas keluar melalui pipa accept.',
    keyParameters: [
      { label: 'Tekanan Masuk (Inlet Pressure - PI-G)', value: 'Minimal 1.5 bar (Ideal 1.8 - 2.5 bar)', unit: 'bar', note: 'Tekanan memadai mutlak diperlukan untuk membentuk vortex sentrifugal' },
      { label: 'Tekanan Keluar (Accept Pressure - PI-H)', value: '0.5 bar', unit: 'bar', note: 'Menciptakan pressure drop (Delta P) optimal sebesar 1.0 - 1.5 bar' },
      { label: 'Tekanan Air Elutriasi (Valve E)', value: 'Minimal 1.5 bar', unit: 'bar', note: 'Air berlawanan arah putaran untuk menahan serat agar tidak ikut terbuang ke junk trap' },
      { label: 'Konsistensi Kerja Bubur', value: '3.0% - 4.0%', unit: '%', note: 'Di atas 4.5% viskositas menahan partikel berat turun; di bawah 2.5% boros kapasitas' }
    ],
    operatorDuties: [
      'Memantau pressure gauge Inlet (G) dan Accept (H) setiap jam; pastikan Delta P selalu terjaga minimal 1.0 bar.',
      'SOP KONDISI NORMAL OPERASI: Valve A (filling), C (drain), dan D (vacuum breaker) TERTUTUP; Valve B (reject valve) dan E (centrifugal reducer water) TERBUKA.',
      'SOP KONDISI PEMBUANGAN REJECT (FLUSHING JUNK TRAP): Tutup Valve B dan A -> Buka Valve C (pembuangan), D (vacuum breaker agar udara masuk kotoran jatuh bebas), dan biarkan Valve E tetap terbuka.',
      'Setelah pembuangan kotoran selesai: Tutup Valve C dan D -> Buka Valve A untuk mengisi air kembali ke chamber -> Tutup Valve A -> Buka Valve B untuk kembali ke operasi normal.'
    ],
    karuInspection: [
      'Memastikan siklus flushing Junk Trap dilakukan rutin (tiap 1 - 2 jam tergantung tingkat kekotoran bahan baku recycle).',
      'Mengecek fisik kotoran yang keluar: jika ditemukan banyak serat terbawa (fiber loss), atur bukaan Valve E lebih besar.',
      'Memeriksa keausan liner keramik (ceramic cone) bagian bawah HDC dari pengikisan pasir tajam.'
    ],
    kepalaPmFocus: [
      'Perlindungan maksimal terhadap peralatan hilir (Screen basket, impeler pompa, dan blade refiner) dari kerusakan mekanis akibat logam/batu.',
      'Evaluasi tingkat kebersihan bahan baku dari vendor berdasarkan volume reject HDC per hari.'
    ],
    troubleshootingGuide: [
      {
        fault: 'Banyak serat bagus ikut terbuang ke Junk Trap',
        indication: 'Hasil pembuangan reject berwarna pekat pulp, bukan murni pasir/kerikil.',
        immediateAction: 'Periksa tekanan dan bukaan Valve E (air elutriasi). Naikkan tekanan air di atas 1.5 bar untuk menolak serat kembali ke pusaran utama.',
        permanentFix: 'Kalibrasi pressure reducing valve air elutriasi dan periksa apakah nozzle Valve E tersumbat kerak.'
      },
      {
        fault: 'Cone HDC tersumbat (Plugged Cone)',
        indication: 'Delta P drop mendekati 0 bar, Junk trap dingin dan tidak ada kotoran yang turun.',
        immediateAction: 'Switch ke stand-by line (jika ada), tutup valve inlet/outlet, buka handhole bawah cone untuk mengeluarkan sumbatan plastik/tali.',
        permanentFix: 'Pasang strainer pelindung di discharge pulper sebelum masuk pompa feed HDC.'
      }
    ]
  },
  {
    id: 'sp-eq-3',
    stepNumber: 3,
    name: '3. Vibrating Screen (Saringan Getar Model Slot 0.5 - 1.0 mm)',
    category: 'Coarse Screening',
    targetConsistency: '1.5% - 2.5%',
    function: 'Menyaring dan memisahkan kontaminan berukuran besar seperti serpihan plastik, selotip, potongan kertas tak terurai, dan kotoran lembaran dari bubur pulp sebelum masuk ke tahapan pembersihan halus.',
    workingPrinciple: 'Motor penggetar memutar poros eksentrik menghasilkan osilasi harmonis gerak linier/melingkar pada saringan. Bubur dialirkan di atas pelat saringan bergetar; serat pulp yang lolos jatuh ke bawah menjadi accept, sedangkan partikel kasar tertahan di permukaan saringan dan terdorong maju ke ujung buangan reject berkat getaran berkelanjutan.',
    keyParameters: [
      { label: 'Tipe Pelat Saringan (Screen Plate)', value: 'Model Slot (Celah Memanjang)', unit: 'Tipe', note: 'Jauh lebih superior dibanding model Hole untuk lini tissue karena efisien memblokir film plastik pipih' },
      { label: 'Lebar Celah Slot', value: '0.5 - 1.0 mm', unit: 'mm', note: 'Ukuran celah ideal untuk menahan kontaminan tanpa membuang serat panjang berkualitas' },
      { label: 'Konsistensi Masuk (Feed Consistency)', value: '1.5% - 2.5%', unit: '%', note: 'Bila terlalu kental, pori saringan cepat tertutup tikar serat (matting)' }
    ],
    operatorDuties: [
      'Memastikan nosel shower air pembilas bertekanan mencuci permukaan screen secara kontinu.',
      'Membersihkan tumpukan reject plastik di ujung saringan agar tidak menumpuk dan meluap ke bak accept.',
      'Memeriksa kekencangan pegas suspensi penggetar (vibration spring dampers) dan baut pengikat saringan.'
    ],
    karuInspection: [
      'Mengecek keutuhan pelat screen: pastikan tidak ada slot yang retak, jebol, atau terkikis yang menyebabkan plastik lolos.',
      'Memastikan amplitudo getaran stabil dan motor penggetar tidak mengalami panas abnormal (suhu bearing < 70°C).'
    ],
    kepalaPmFocus: [
      'Efektivitas pemisahan plastik dan bahan sintetik sebelum proses refining (mencegah plastik meleleh di silinder Yankee PM).'
    ],
    troubleshootingGuide: [
      {
        fault: 'Bubur meluap keluar bersama reject (Overflow Accept to Reject)',
        indication: 'Pulp basah banyak tumpah ke tempat sampah reject, bak accept kekurangan stock.',
        immediateAction: 'Encerkan konsistensi feed dengan menambahkan white water, periksa nosel shower pembilas apakah mampet.',
        permanentFix: 'Lakukan pembersihan kimiawi (acid/alkali wash) jika slot screen tertutup getah (stickies) atau kerak kapur.'
      }
    ]
  },
  {
    id: 'sp-eq-4',
    stepNumber: 4,
    name: '4. Turboseparator (Pemisah Serat Sekunder & Pengurai Flakes)',
    category: 'Coarse Screening',
    targetConsistency: '2.0% - 3.0%',
    function: 'Memisahkan bahan yang sudah halus dari bahan yang masih kasar dengan memasukkan pulp secara tangensial ke wadah silinder berputar yang dilengkapi rotor dan saringan basket.',
    workingPrinciple: 'Pulp dimasukkan berkecepatan tinggi ke wadah tangensial. Rotor bilah putar di dekat screen plate menciptakan turbulensi hidrolis tinggi yang menguraikan sisa bundle serat (defibering). Gaya sentrifugal mendorong kontaminan besar ke saluran tengah untuk dibuang menuju Vibrating Screen (di mana serat yang masih tertinggal di-cover kembali ke dump chest sedangkan reject plastik dibuang keluar). Serat halus yang lolos melewati screen basket (lubang 3 mm) dialirkan keluar melalui pipa accept.',
    keyParameters: [
      { label: 'Diameter Lubang Screen Basket', value: '3.0 mm (Hole Type)', unit: 'mm', note: 'Menahan flakes kasar sambil meloloskan serat terurai bebas hambatan' },
      { label: 'Jalur Reject Tengah (Center Reject Pipe)', value: 'Kontinyu ke Vibrating Screen', unit: 'Alur', note: 'Menjamin tidak ada serat yang terbuang sia-sia (fiber recovery)' },
      { label: 'Konsistensi Operasi', value: '2.0% - 3.0%', unit: '%', note: 'Menjaga fluiditas dan efisiensi penguraian gaya tangensial rotor' }
    ],
    operatorDuties: [
      'Memantau aliran pipa tengah buangan reject ke arah vibrating screen: pastikan tidak tersumbat tali atau kotoran kain.',
      'Mendengarkan suara mekanis rotor: jika ada suara gesekan logam atau benturan kerikil, segera koordinasikan untuk bypass dan shutdown.',
      'Mencatat tekanan inlet dan outlet turboseparator.'
    ],
    karuInspection: [
      'Pemeriksaan visual rutin celah antara rotor bilah dan screen basket (toleransi celah 1.5 - 2.5 mm).',
      'Memverifikasi sistem recovery serat pada vibrating screen berjalan seimbang dan reject tidak mengandung bubur baik.'
    ],
    kepalaPmFocus: [
      'Peningkatan yield total pabrik melalui recovery maksimal serat daur ulang dari buangan pulper.'
    ],
    troubleshootingGuide: [
      {
        fault: 'Tekanan accept turboseparator turun drastis',
        indication: 'Debit aliran ke proses MCC/Screen drop, motor turboseparator berdengung berat.',
        immediateAction: 'Buka katup flushing reject tengah penuh selama 30 detik untuk menggelontor tumpukan kotoran.',
        permanentFix: 'Bongkar dan bersihkan screen basket 3 mm dari serat terpilin (spinning fiber).'
      }
    ]
  },
  {
    id: 'sp-eq-5',
    stepNumber: 5,
    name: '5. Medium Consistency Cleaner (MCC - Hydrocyclone 1.5% - 2.5%)',
    category: 'Centrifugal Cleaning',
    targetConsistency: '1.5% - 2.5%',
    function: 'Memisahkan kontaminan pasir halus, serpihan kaca kecil, dan partikel berat berukuran menengah yang lolos dari tahap penyaringan kasar pada konsistensi medium.',
    workingPrinciple: 'Hampir sama dengan prinsip HDC, namun MCC dirancang dengan geometri kerucut lebih ramping untuk menangkap partikel yang lebih halus pada konsistensi 1.5% - 2.5%. Bubur kertas dipercepat ke bawah dalam aksi sentrifugal spiral. Kotoran yang lebih berat didorong ke dinding luar dan keluar melalui corong bawah, sementara serat pulp yang bersih naik melalui pusat pusaran (inner vortex core) dan keluar lewat vortex finder atas.',
    keyParameters: [
      { label: 'Konsistensi Operasi', value: '1.5% - 2.5%', unit: '%', note: 'Keseimbangan antara konsumsi air dan efisiensi pemisahan pasir' },
      { label: 'Posisi dalam Alur Proses', value: 'Setelah Coarse Screening, Sebelum Pressure Screen', unit: 'Posisi', note: 'Melindungi celah halus basket pressure screen (0.35 mm) dari keausan tergores pasir' },
      { label: 'Pressure Drop (Delta P)', value: '1.2 - 1.6 bar', unit: 'bar', note: 'Tekanan inlet ~2.2 bar, tekanan accept ~0.8 bar' }
    ],
    operatorDuties: [
      'Memeriksa pembuangan pasir di bagian nozzle bawah MCC setiap pergantian shift.',
      'Memastikan tekanan inlet stabil dan pompa feed MCC tidak mengalami kavitasi akibat gelembung udara.'
    ],
    karuInspection: [
      'Uji sedimentasi botol sampel accept MCC: pastikan tidak ada endapan butiran pasir silika di dasar botol.',
      'Memeriksa kondisi ceramic cone dari retak atau aus.'
    ],
    kepalaPmFocus: [
      'Memperpanjang umur pakai basket screen 0.35 mm dan roll press PM dengan meminimalkan lolosan pasir.'
    ],
    troubleshootingGuide: [
      {
        fault: 'Pasir halus masih lolos ke bak proses berikutnya',
        indication: 'Ditemukan pasir pada pengujian laboratorium pulp atau kotoran berbintik di lembaran tissue.',
        immediateAction: 'Periksa konsistensi feed: bila > 2.5%, encerkan dengan white water agar viskositas turun dan pasir bebas mengendap.',
        permanentFix: 'Ganti lower cone nozzle tip yang sudah membesar akibat keausan abrasi pasir.'
      }
    ]
  },
  {
    id: 'sp-eq-6',
    stepNumber: 6,
    name: '6. Pressure Screen (Saringan Bertekanan Slot 0.35 mm & Hydrofoil Rotor)',
    category: 'Fine Screening & Fractionation',
    targetConsistency: '1.0% - 1.8%',
    function: 'Membersihkan stock pulp dari kotoran mikro, memisahkan serat pendek dan panjang, serta menyeragamkan buburan bebas flock sebelum masuk proses pengentalan dan refining.',
    workingPrinciple: 'Bubur dipompa masuk bertekanan ke dalam silinder saringan (Screen Basket). Di dalam basket terdapat rotor yang dilengkapi bilah foil berbentuk sayap aerodinamis (hydrofoil wings). Ketika foil berputar mendekati dinding basket dengan kecepatan tinggi, bagian depan sayap foil menghasilkan tekanan positif (mendorong serat melintasi celah saringan), sedangkan bagian belakang sayap foil menimbulkan tekanan hisap negatif (negative pulse) seketika yang menarik serat kembali dari celah. Efek pulsasi bolak-balik berfrekuensi tinggi ini menjaga celah screen basket tetap bersih dari sumbatan (anti-blinding) tanpa merusak atau memotong serat.',
    keyParameters: [
      { label: 'Ukuran Celah Basket Model Slot', value: '0.35 mm (Standar Pabrik Tissue)', unit: 'mm', note: '1/10 dari ukuran lubang 3 mm; menghasilkan bubur ultra-bersih bebas shives' },
      { label: 'Ukuran Basket Model Hole', value: '3.0 mm', unit: 'mm', note: 'Hanya untuk pemilahan kasar, rentan menimbulkan spinning fiber' },
      { label: 'Jarak Celah Foil ke Basket (Foil Gap)', value: '3.0 mm (Wajib Presisi)', unit: 'mm', note: 'Jika terlalu jauh (> 4 mm) denyut hisap hilang dan screen tersumbat; jika terlalu dekat risiko benturan mekanik' },
      { label: 'Arah Putaran Rotor', value: 'Searah Desain Hydrofoil (Tidak Boleh Terbalik)', unit: 'Arah', note: 'Putaran terbalik menghilangkan gaya suction dan menyebabkan screen seketika macet (plugged)' },
      { label: 'Tekanan Kerja Minimum', value: 'Inlet min 1.5 bar | Outlet 0.5 bar', unit: 'bar', note: 'Pressure drop Delta P stabil ~1.0 bar menjamin debit accept konstan' }
    ],
    operatorDuties: [
      'Wajib memastikan 4 Syarat Operasi Maksimal terpenuhi: (1) Basket kondisi baik tidak aus, (2) Putaran rotor tidak terbalik, (3) Jarak gap foil tepat 3.0 mm, (4) Tekanan inlet min 1.5 bar dan outlet 0.5 bar.',
      'Memantau rasio reject flow: pertahankan bukaan valve reject 10% - 15% dari total feed agar kontaminan tidak terakumulasi di dalam drum screen.',
      'Memeriksa kebocoran mechanical seal rotor dan aliran air pendingin flushing seal.'
    ],
    karuInspection: [
      'Pengecekan berkala menggunakan feeler gauge: kalibrasi kerataan jarak foil ke basket keliling 360 derajat di angka 3.0 mm.',
      'Memeriksa arah putaran motor setelah pekerjaan maintenance listrik (hindari phase terbalik pasca perbaikan).',
      'Inspeksi visual basket screen: tidak boleh ada slot yang aus membesar melebihi 0.40 mm.'
    ],
    kepalaPmFocus: [
      'Pencegahan cacat whitespot, lubang jarum (pinholes), dan putus lembaran (sheet break) di seksi kawat pembentuk PM1, PM2, dan PM5.',
      'Mengapa memilih model slot 0.35 mm? (1) Luas area terbuka (open area) lebih besar sehingga volume accept lebih banyak, (2) Kualitas serat jauh lebih bersih, (3) Bebas dari cacat spinning fiber.'
    ],
    troubleshootingGuide: [
      {
        fault: 'Screen Basket tersumbat total (Screen Jamming / Blinding)',
        indication: 'Tekanan inlet melonjak > 3.0 bar, aliran accept berhenti, arus motor naik tajam.',
        immediateAction: 'Buka katup bypass, stop feed pump segera, lakukan flushing air bertekanan mundur (backwash).',
        permanentFix: 'Cek gap foil (kemungkinan > 3.5 mm sehingga daya hisap hilang) atau arah putaran motor terbalik setelah perbaikan.'
      },
      {
        fault: 'Terbentuk benang-benang serat terpilin (Spinning Fiber) pada lembaran',
        indication: 'Kertas tissue menghasilkan cacat garis tebal seperti benang kusut.',
        immediateAction: 'Turunkan konsistensi feed ke 1.2%, periksa laju buangan reject.',
        permanentFix: 'Ganti screen plate model hole lama menjadi model slot 0.35 mm yang secara geometris mencegah serat terpilin.'
      }
    ]
  },
  {
    id: 'sp-eq-7',
    stepNumber: 7,
    name: '7. Low Consistency Cleaner (LCC - Baterai Hydrocyclone Pemisah Pasir Silika)',
    category: 'Centrifugal Cleaning',
    targetConsistency: '0.8% - 1.2% (Maksimal 1.5%)',
    function: 'Memisahkan partikel pasir silika sangat halus, serbuk batu gerinda, dan kontaminan berat spesifik tinggi dari bubur pulp encer dengan tingkat efisiensi pemisahan tertinggi.',
    workingPrinciple: 'LCC bekerja pada konsistensi sangat rendah (maksimal 1.5%, ideal 0.8% - 1.2%). Pada konsistensi encer ini, jarak antar serat longgar dan gaya hambat viskositas cairan minimal. Ketika dipompa masuk ke kerucut keramik berdiameter kecil dengan tekanan tinggi, terjadi pusaran sentrifugal ekstrem. Pasir yang memiliki berat jenis (specific gravity ~2.6) jauh lebih besar daripada serat selulosa (~1.5 basah) langsung terlempar ke dinding kerucut dan turun keluar melalui lubang reject bawah. Serat pulp yang bersih naik melalui vortex finder menuju accept header.',
    keyParameters: [
      { label: 'Konsistensi Maksimal', value: 'Maksimal 1.5% (Ideal 0.8% - 1.2%)', unit: '%', note: 'Semakin rendah konsistensi, pemisahan pasir semakin sempurna karena serat tidak saling mengikat pasir' },
      { label: 'Tekanan Masuk (Inlet Pressure)', value: 'Minimal 1.5 bar (Ideal 1.8 - 2.2 bar)', unit: 'bar', note: 'Tekanan mutlak untuk membentuk pusaran kecepatan tinggi' },
      { label: 'Tekanan Keluar (Outlet Pressure)', value: '0.5 bar', unit: 'bar', note: 'Delta P standar 1.0 - 1.5 bar' },
      { label: 'Kondisi Nozzle Ujung Reject', value: 'Bebas Hambatan / Tidak Boleh Tersumbat', unit: 'Status', note: 'Jika salah satu cone tersumbat, pasir akan berbalik masuk ke pipa accept' }
    ],
    operatorDuties: [
      'Pemeriksaan visual fisik corong reject LCC setiap jam: pastikan semua cone memancarkan buangan payung spiral bebas sumbatan.',
      'Jika terlihat salah satu cone reject menetes atau macet, segera bersihkan nozzle bawah menggunakan tusukan kawat halus.',
      'Memeriksa manometer tekanan inlet (min 1.5 bar) dan outlet (0.5 bar).'
    ],
    karuInspection: [
      'Memverifikasi sampling laboratorium: konsistensi feed LCC tidak boleh melebihi batas 1.5%.',
      'Pemeriksaan keausan nozzle cone reject keramik setiap kali shutdown mesin.'
    ],
    kepalaPmFocus: [
      'Eliminasi total pasir silika pencegah goresan pada silinder Yankee dryer MG dan pisau doctor blade di PM.'
    ],
    troubleshootingGuide: [
      {
        fault: 'Corong reject LCC buntu (Cone Clogging)',
        indication: 'Pancaran reject berbentuk payung hilang, cairan mandek di kerucut.',
        immediateAction: 'Tusuk ujung lubang nozzle reject dengan alat pembersih khusus hingga aliran lancar kembali.',
        permanentFix: 'Pastikan seksi screening sebelum LCC tidak bocor sehingga partikel kotoran panjang tidak masuk ke kerucut LCC.'
      }
    ]
  },
  {
    id: 'sp-eq-8',
    stepNumber: 8,
    name: '8. Cylinder Thickener (Pengental Bubur Wire Drum & Couch Roll)',
    category: 'Washing & Thickening',
    targetConsistency: 'Masuk: 1.0% -> Keluar: Minimal 3.5% (3.5% - 4.5%)',
    function: 'Mengentalkan bubur pulp encer pasca pembersihan LCC hingga mencapai konsistensi minimal 3.5% sebagai syarat mutlak sebelum masuk proses Deflaker dan DDR, sekaligus memfilter fines dan membuang kandungan kapur (CaCO3) melalui air filtrat overflow.',
    workingPrinciple: 'Bubur encer dialirkan masuk melalui pipa inlet bagian belakang ke dalam bak vat. Di dalam vat terdapat silinder drum berputar yang dilapisi kawat saringan halus (wire mesh). Air mengalir menembus saringan kawat ke bagian dalam silinder lalu terbuang melalui pipa overflow, sementara serat tertahan membentuk lapisan (sheet/mat) pada permukaan wire. Silinder drum berputar membawa lapisan pulp melewati Couch Roll karet bertekanan untuk memeras air tambahan. Lapisan bubur kental yang menempel pada couch roll kemudian dikeruk oleh Scraper (doctor blade) lalu jatuh ke bak penampung accept kental.',
    keyParameters: [
      { label: 'Konsistensi Output Minimal', value: 'Minimal 3.5% (Ideal 3.5% - 4.5%)', unit: '%', note: 'Syarat wajib: jika konsistensi < 3.5%, refiner DDR tidak dapat memfibrilasi serat secara optimal' },
      { label: 'Pembersihan Bahan Kimia/Mineral', value: 'Membuang kandungan kapur (CaCO3) & Filer rusak', unit: 'Fungsi', note: 'Partikel kapur halus dan debu selulosa terbuang bersama air filtrat overflow' },
      { label: 'Tekanan Kontak Couch Roll', value: '1.5 - 2.5 bar pneumatik', unit: 'bar', note: 'Menjamin pemerasan air merata tanpa merusak wire saringan' }
    ],
    operatorDuties: [
      'Mengambil sampel berkala konsistensi accept thickener: pastikan nilai konsistensi minimal 3.5% tercapai.',
      'Memastikan scraper menempel rapat dan rata pada permukaan couch roll agar bubur tidak menumpuk dan jatuh kembali ke bak vat.',
      'Memeriksa nosel shower pencuci kawat silinder drum agar anyaman kawat tidak buntu oleh pitch/getah.'
    ],
    karuInspection: [
      'Pemeriksaan kejernihan air overflow: jika air overflow keruh pekat bubur, periksa kemungkinan kawat wire silinder robek/bocor.',
      'Memeriksa keausan bilah scraper (ganti bila sudah tumpul atau bergelombang).'
    ],
    kepalaPmFocus: [
      'Kestabilan konsistensi stock masuk ke refiner chest sebagai penentu kestabilan freeness dan gramatur kertas jadi di PM.'
    ],
    troubleshootingGuide: [
      {
        fault: 'Konsistensi output thickener rendah (< 3.0%)',
        indication: 'Bubur keluar encer, tangki feed refiner kelebihan air, penyerapan ampere refiner rendah.',
        immediateAction: 'Tingkatkan tekanan press couch roll, kurangi debit aliran feed masuk jika melebihi kapasitas drum.',
        permanentFix: 'Bersihkan wire drum silinder dengan larutan pembersih asam ringan untuk melarutkan kerak kapur CaCO3 yang menutup pori kawat.'
      }
    ]
  },
  {
    id: 'sp-eq-9',
    stepNumber: 9,
    name: '9. High Speed Washer (Pencuci Serat Kecepatan Tinggi & Pengental)',
    category: 'Washing & Thickening',
    targetConsistency: 'Masuk: 1.0% -> Keluar: Minimal 3.5%',
    function: 'Peralatan pengental sekaligus pencuci serat kinerja tinggi untuk memeras pulp secara maksimal sehingga kandungan filler, abu, partikel tinta (deinking), dan kapur terbuang optimal menghasilkan pulp bersih berkualitas tinggi.',
    workingPrinciple: 'Pulp dikirim melalui pipa inlet dan didistribusikan secara merata ke rubber roll melalui header distributor. Dengan putaran rotor digerakkan inverter ke arah kiri, pulp terjepit dan mendapat tekanan pengepresan dari wire nilon berkecepatan tinggi saat melintasi rubber roll kuning menuju rubber roll warna hitam. Air filtrat bersama debu dan filler terperas keluar menembus wire, sementara pulp bersih yang telah mengental melewati bilah scraper, terkeruk bersih dari rubber roll hitam, jatuh ke dalam screw conveyor, dan didorong keluar untuk didistribusikan ke proses berikutnya.',
    keyParameters: [
      { label: 'Frekuensi Inverter Rotor', value: '20 - 25 Hz (Tampilan Inverter)', unit: 'Hz', note: 'Kecepatan putar optimal untuk pembentukan mat dan pemerasan cairan maksimal' },
      { label: 'Konsistensi Output Target', value: 'Minimal 3.5%', unit: '%', note: 'Standar baku mutu bubur sebelum proses deflaker/refining' },
      { label: 'Penyetelan Bukaan Valve Inlet', value: 'Disesuaikan Aliran Rubber Roll', unit: 'Bukaan', note: 'Wajib seimbang agar bubur tidak meluap tumpah ke samping kanan-kiri wire' },
      { label: 'Tekanan Shower Wire', value: '2.5 - 3.5 bar', unit: 'bar', note: 'Menjaga wire nilon selalu bersih dan bebas dari penyumbatan pori' }
    ],
    operatorDuties: [
      'Sesuaikan bukaan valve inlet dengan flow pulp yang keluar ke rubber roll supaya tidak banyak yang terbuang ke kanan dan kiri wire.',
      'Atur kecepatan putar rotor pada 20 - 25 Hz pada tampilan panel inverter.',
      'Pastikan shower wire dapat bekerja dengan baik (tekanan cukup) supaya wire nilon tetap bersih.',
      'Pastikan bilah scraper masih rata dan rapat terhadap rubber roll hitam supaya pulp dapat bersih terkeruk turun ke screw conveyor.',
      'Pastikan washer dicuci bersih (cleaning flushing) setiap kali selesai pemakaian atau pergantian grade.'
    ],
    karuInspection: [
      'Memeriksa ketegangan kawat nilon (wire tension) dan kelurusan tracking wire agar tidak lari ke samping.',
      'Mengecek kondisi fisik rubber roll kuning dan hitam dari goresan atau penumpukan getah.',
      'Verifikasi kinerja motor screw conveyor pengeluaran bubur.'
    ],
    kepalaPmFocus: [
      'Peningkatan derajat keputihan (brightness) dan kekuatan tarik lembaran tissue dengan memaksimalkan pembuangan filler abu pengotor.'
    ],
    troubleshootingGuide: [
      {
        fault: 'Bubur meluber ke samping kanan-kiri wire (Side Spill)',
        indication: 'Banyak bubur terbuang jatuh ke selokan air pencuci, efisiensi fiber drop.',
        immediateAction: 'Kecilkan bukaan valve inlet header distributor, naikkan sedikit frekuensi inverter motor (ke 23 - 25 Hz).',
        permanentFix: 'Ratakan baffle distributor header agar sebaran bubur di atas wire merata selebar roll.'
      }
    ]
  },
  {
    id: 'sp-eq-10',
    stepNumber: 10,
    name: '10. Deflaker (Pengurai Gumpalan Serat / Disperser Rotor-Stator)',
    category: 'Fiber Dispersion & Refining',
    targetConsistency: '3.5% - 4.5%',
    function: 'Menguraikan ikatan serat pada pulp yang masih menggumpal (flakes, bundles, whitespots) tanpa merusak atau memotong panjang serat sehingga stok bubur menjadi homogen dan seragam.',
    workingPrinciple: 'Deflaker terdiri dari pasangan cincin bergigi konsentris: Rotor berputar dengan kecepatan tinggi (1.450 RPM) dan Stator diam berjarak sangat rapat. Saat material pulp melewati celah zig-zag antara rotor dan stator, pulp mengalami gaya geser dan turbulensi hidrodinamis yang sangat intensif. Gaya turbulensi ini memecah ikatan hidrogen antar serat yang menggumpal menjadi serat-serat tunggal tanpa pemotongan serat (no shortening effect).',
    keyParameters: [
      { label: 'Konsistensi Operasi Ideal', value: '3.5% - 4.5%', unit: '%', note: 'Konsistensi di bawah 3% menurunkan gesekan hidrolik; di atas 5% risiko motor overload' },
      { label: 'Target Freeness Keluaran', value: '360 - 380 CSF (Canadian Standard Freeness)', unit: 'CSF', note: 'Standar freeness pulp terurai sempurna sebelum proses refining di DDR' },
      { label: 'Pengaturan Jarak Celah (Stator Adjuster)', value: 'Mekanik Adjuster Handwheel', unit: 'Mekanik', note: 'Jika penguraian kurang maksimal, putar adjuster untuk menekan stator lebih rapat ke rotor' }
    ],
    operatorDuties: [
      'Mempertahankan konsistensi masuk pada rentang 3.5% - 4.5% untuk mendapatkan efisiensi penguraian tertinggi.',
      'Mengatur bukaan katup valve inlet dan outlet serta adjuster stator untuk mencapai target freeness 360 - 380 CSF.',
      'Memantau suhu bantalan bearing dan getaran bodi mesin deflaker.'
    ],
    karuInspection: [
      'Pemeriksaan hasil uji freeness laboratorium sampel keluar deflaker setiap 2 jam (target 360 - 380 CSF).',
      'Uji visual lembaran tangan (hand-sheet test) untuk memastikan tidak ada whitespot/flakes yang tersisa.',
      'Inspeksi keausan gigi-gigi ring rotor dan stator saat jadwal preventive maintenance.'
    ],
    kepalaPmFocus: [
      'Eliminasi cacat whitespot (bintik putih serat menggumpal) pada produk jadi tissue facial dan MG paper di PM.'
    ],
    troubleshootingGuide: [
      {
        fault: 'Masih banyak whitespot / Nilai freeness terlalu tinggi (> 400 CSF)',
        indication: 'Terdapat gumpalan serat pada lembaran uji pembentukan hand-sheet.',
        immediateAction: 'Rapatkan posisi celah stator terhadap rotor menggunakan adjuster handwheel dan cek konsistensi agar berada di 3.5% - 4.5%.',
        permanentFix: 'Ganti elemen disc gigi rotor dan stator jika puncak gigi sudah membulat atau aus tergores.'
      }
    ]
  },
  {
    id: 'sp-eq-11',
    stepNumber: 11,
    name: '11. Double Disc Refiner (DDR - Penggiling & Pemfibrilasi Serat Ganda)',
    category: 'Fiber Dispersion & Refining',
    targetConsistency: '3.5% - 4.5%',
    function: 'Menggiling dan memfibrilasi serat pulp yang cenderung keras (yang tidak cukup hanya diurai oleh deflaker) agar serat mengalami penyerapan air internal, dinding sel membuka (fibrilasi), luas kontak ikatan antar serat meningkat, dan kertas/tissue yang dihasilkan menjadi halus, kuat, dan lembut.',
    workingPrinciple: 'Pulp dipompa masuk melalui kedua sisi pipa inlet DDR kemudian masuk ke celah groove pattern blade. Rotor berkeping ganda (double-sided disc) berputar dengan kecepatan tinggi di antara dua keping stator diam. Putaran rotor menimbulkan gaya gesekan dan kompresi siklik antar bar pisau. Pulp yang masuk melalui alur (groove) terlempar ke arah luar oleh gaya sentrifugal sambil mengalami gesekan intensif bar-to-bar antara keping rotor dan stator. Hal ini menyebabkan dinding serat terkelupas halus (eksternal fibrilasi) dan serat menjadi lentur tanpa terpotong hancur, lalu keluar melalui pipa outlet DDR.',
    keyParameters: [
      { label: 'Target Nilai Freeness', value: '320 - 350 CSF', unit: 'CSF', note: 'Standar freeness ideal untuk kekuatan tarik (tensile) dan kelembutan prima lembaran tissue' },
      { label: 'Konsistensi Operasi Baku', value: '3.5% - 4.5%', unit: '%', note: 'Wajib dipertahankan: konsistensi stabil menghasilkan penyerapan beban listrik refiner yang stabil' },
      { label: 'Metode Pengendalian Beban (Load Control)', value: 'Monitor Ampere Meter di Panel Kontrol', unit: 'Ampere', note: 'Penekanan blade melalui adjuster hidrolik/mekanik langsung terrefleksi pada kenaikan arus Ampere motor' },
      { label: 'Kontrol Valve Outlet (Throttling)', value: 'Throttling Valve Outlet Mengendalikan Fibrilasi', unit: 'Valve', note: 'Semakin kecil bukaan valve outlet, aliran melambat, residence time pulp lebih lama, dan freeness turun' },
      { label: 'Diagnostik Kondisi Blade', value: 'Inlet Pressure Gauge > Outlet Pressure Gauge', unit: 'Diagnostik', note: 'Jika blade masih baik, tekanan inlet selalu lebih tinggi dari outlet. Jika terbalik/sama, blade aus' }
    ],
    operatorDuties: [
      'Memantau nilai arus Ampere meter pada panel DDR: sesuaikan penekanan adjuster blade untuk menjaga kestabilan beban.',
      'Melakukan pengaturan kombinasi valve inlet dan valve outlet untuk mengontrol laju alir dan freeness target (320 - 350 CSF).',
      'Memantau tekanan kerja pada pressure gauge inlet dan outlet (pastikan inlet pressure selalu lebih tinggi dari outlet).',
      'Wajib memastikan aliran bubur pulp sudah mengalir penuh sebelum motor DDR dinyalakan dan blade ditekan (hindari benturan keping pisau kering / metal-to-metal contact).'
    ],
    karuInspection: [
      'Pemeriksaan rutin freeness CSF setiap batch pengolahan atau per 2 jam operasi kontinyu.',
      'Memeriksa keausan tinggi bar dan kedalaman alur (groove) keping refiner blade menggunakan jangka sorong / vernier caliper.',
      'Pemeriksaan kestabilan suhu motor dan getaran bearing refiner.'
    ],
    kepalaPmFocus: [
      'Keseimbangan antara Tensile Strength (Kekuatan Tarik) dan Softness (Kelembutan Hand-feel) kertas tissue.',
      'Efisiensi konsumsi energi spesifik refining (SEC - Specific Energy Consumption dalam kWh per Ton bubur).'
    ],
    troubleshootingGuide: [
      {
        fault: 'Freeness tidak turun meski adjuster blade sudah ditekan maksimal',
        indication: 'Arus Ampere motor naik tetapi nilai freeness tetap tinggi di atas 370 CSF.',
        immediateAction: 'Periksa kedalaman alur groove blade; jika groove sudah aus/dangkal, serat meluncur lewat tanpa fibrilasi.',
        permanentFix: 'Ganti keping disc blade DDR baru dengan pola bar & groove yang sesuai spesifikasi grade pulp.'
      },
      {
        fault: 'Tekanan outlet DDR sama besar atau lebih tinggi dari inlet',
        indication: 'Penurunan kapasitas pompa feed, indikator gauge inlet dan outlet tidak seimbang.',
        immediateAction: 'Periksa arah bukaan valve outlet dan buang udara terjebak dalam ruang refiner chamber.',
        permanentFix: 'Periksa keausan internal rotor blade dan periksa apakah ada penyumbatan benda asing pada alur keping refiner.'
      }
    ]
  },
  {
    id: 'sp-eq-12',
    stepNumber: 12,
    name: '12. Proses PEO (Polyethylene Oxide / Dispersing Agent System)',
    category: 'Chemical Additive System',
    targetConsistency: 'Viskositas Larutan Kimia: 17 - 19 Cps',
    function: 'Mempersiapkan, melarutkan, dan mendistribusikan bahan kimia aditif dispersant agent (PEO - Polyethylene Oxide) ke jalur Tissue Machine untuk membantu pembentukan formasi lembaran tissue, mencegah penggumpalan serat, dan menambah ikatan antar serat sehingga lembaran tissue kuat, rata, dan lembut.',
    workingPrinciple: 'PEO adalah polimer berberat molekul sangat tinggi dengan rantai molekul panjang larut air. Serbuk PEO dilarutkan ke dalam air dengan pengadukan berkecepatan rendah terkontrol agar molekul tidak mengalami degradasi mekanis (shear degradation). Larutan PEO yang matang bekerja menyelimuti serat selulosa dengan lapisan hidrodinamis bermuatan negatif yang saling tolak-menolak, mencegah serat terikat satu sama lain sebelum mencapai seksi pembentukan (kawat silinder mould PM), sehingga lembaran tissue terbentuk sangat rata tanpa gumpalan.',
    keyParameters: [
      { label: 'Merek & Tipe Bahan Kimia PEO', value: 'Axfloc F 1220 FA / 1729 / 1730 / 7090', unit: 'Tipe', note: 'Bahan kimia serbuk putih kemasan zak netto 25 kg (PT. Axchemindo Paper Solution)' },
      { label: 'Bentuk Fisik & Karakteristik', value: 'Serbuk Putih Higroskopis (Harus Melalui Pelarutan)', unit: 'Fisik', note: 'Wajib dituang perlahan agar tidak menggumpal seperti mata ikan (fish-eye)' },
      { label: 'Satuan Nilai Viskositas Larutan', value: 'Cps (Centipoise)', unit: 'Cps', note: 'Diukur menggunakan viscometer standar lab setiap batch larutan baru' },
      { label: 'Standar Viskositas Digunakan di TM', value: '17 - 19 Cps', unit: 'Cps', note: 'Nilai ideal untuk formasi prima; flow dosing disesuaikan kebutuhan gramatur mesin' },
      { label: 'Konfigurasi Tangki PEO', value: 'Tangki 1, 2, & 4 (Pelarutan) -> Tangki 3 (Distribusi)', unit: 'Sistem', note: 'Tangki 3 dilengkapi saringan untuk mencegah gumpalan polimer lolos ke TM' },
      { label: 'Tipe Pompa Distribusi ke TM', value: 'Screw Pump (Progressive Cavity Pump)', unit: 'Pompa', note: 'Pompa ulir berkecepatan rendah meminimalkan shear stress yang merusak rantai polimer PEO' }
    ],
    operatorDuties: [
      'Menimbang serbuk PEO sesuai takaran standar per batch air tangki.',
      'Menuangkan serbuk PEO secara perlahan-lahan dan merata ke dalam pusaran air tangki pelarut agar serbuk tidak menggumpal.',
      'Mengoperasikan agitator pengaduk dengan putaran perlahan hingga PEO larut merata dan matang sempurna.',
      'Mengukur nilai viskositas larutan PEO (wajib berada di antara 17 - 19 Cps sebelum ditransfer ke tangki 3).',
      'Memastikan saringan pipa transfer dari Tangki 1, 2, dan 4 ke Tangki 3 dalam kondisi bersih dari gumpalan.',
      'Mengontrol debit aliran dosing Screw Pump dari Tangki 3 menuju proses Tissue Machine sesuai petunjuk Kepala Regu.'
    ],
    karuInspection: [
      'Verifikasi logbook pengujian viskositas Cps setiap tangki PEO yang siap pakai (17 - 19 Cps).',
      'Pemeriksaan visual formasi lembaran tissue di seksi pembentukan PM: jika ada bintik gumpalan formasi tidak rata, cek dosing PEO.',
      'Memeriksa kondisi mekanikal screw pump dan tekanan line dosing.'
    ],
    kepalaPmFocus: [
      'Kualitas formasi dan kelembutan (tactile softness) lembaran tissue pada gramatur rendah 12 - 16 gsm dan 18 - 22 gsm.',
      'Efisiensi biaya pemakaian bahan kimia Axfloc per ton produksi tissue.'
    ],
    troubleshootingGuide: [
      {
        fault: 'Larutan PEO menggumpal (Fish-Eye Lumps)',
        indication: 'Terdapat gumpalan lendir bening terapung di dalam tangki, saringan tangki 3 cepat buntu.',
        immediateAction: 'Saring gumpalan agar tidak terpompa ke TM; buang endapan lendir dari dasar tangki.',
        permanentFix: 'Edukasi operator: serbuk PEO WAJIB dituang sedikit demi sedikit menggunakan corong penyebar serbuk saat agitator berputar, jangan dituang sekaligus sekantong.'
      },
      {
        fault: 'Viskositas larutan PEO drop di bawah 15 Cps',
        indication: 'Formasi lembaran kertas di PM berawan (flocky), daya dispersi menurun.',
        immediateAction: 'Tingkatkan dosis pompa screw pump ke TM sementara, siapkan batch baru dengan takaran serbuk yang presisi.',
        permanentFix: 'Hindari pengadukan agitator dengan kecepatan terlalu tinggi atau waktu aduk terlalu lama yang memutuskan ikatan rantai polimer.'
      }
    ]
  }
];

export const STOCK_PREP_QUIZZES: StockPrepQuizItem[] = [
  {
    id: 1,
    category: 'Kontrol Kontaminan & Bahan Baku',
    question: 'Di bawah ini merupakan benda atau bahan yang TIDAK boleh masuk dalam pengolahan hidrapulper, KECUALI:',
    options: [
      'Potongan besi',
      'Karung goni',
      'BS (Broke System / Kertas Rusak Sendiri)',
      'Batu / kerikil'
    ],
    correctAnswer: 'BS (Broke System / Kertas Rusak Sendiri)',
    explanation: 'BS (Broke System) adalah kertas cacat produksi internal yang memang dirancang untuk didaur ulang kembali ke dalam hidrapulper. Sebaliknya, potongan besi, karung goni, kawat bal, tali plastik, dan batu/kerikil merupakan kontaminan berbahaya yang dapat merusak rotor pulper, menyumbat pipa, dan merusak pisau refiner.'
  },
  {
    id: 2,
    category: 'Perhitungan Komposisi Bahan Baku (Recipe Cassie)',
    question: 'Jika 1 komposisi bahan produksi Cassie adalah: 70% Curah, 20% LBKP, dan 10% BS. Dengan pemakaian LBKP sebanyak 400 kg, berapakah pemakaian Pulp Curah dan BS-nya?',
    options: [
      '1.400 kg Curah & 100 kg BS',
      '1.500 kg Curah & 200 kg BS',
      '1.400 kg Curah & 300 kg BS',
      '1.400 kg Curah & 200 kg BS'
    ],
    correctAnswer: '1.400 kg Curah & 200 kg BS',
    calculationFormula: 'Perhitungan Matematis:\n• Total Batch (100%) = 400 kg / 20% = 2.000 kg kering\n• Pemakaian Pulp Curah (70%) = 70% × 2.000 kg = 1.400 kg\n• Pemakaian BS (10%) = 10% × 2.000 kg = 200 kg\n• Total: 1.400 kg (Curah) + 400 kg (LBKP) + 200 kg (BS) = 2.000 kg (100% Cocok)',
    explanation: 'Berdasarkan persentase resep Cassie, porsi LBKP adalah 20% = 400 kg. Maka total seluruh bahan adalah 400 / 0.20 = 2.000 kg. Dari total tersebut, porsi Curah 70% adalah 1.400 kg dan porsi BS 10% adalah 200 kg.'
  },
  {
    id: 3,
    category: 'Peralatan High Density Cleaner (HDC)',
    question: 'Secara umum fungsi High Density Cleaner (HDC) adalah untuk membuang benda-benda di bawah ini, KECUALI:',
    options: [
      'Staples',
      'Kerikil',
      'Buburan yang kasar (Flakes / Bundle Serat)',
      'Batu'
    ],
    correctAnswer: 'Buburan yang kasar (Flakes / Bundle Serat)',
    explanation: 'Fungsi utama HDC adalah memisahkan benda-benda kontaminan berat (heavy trash berdensitas tinggi) seperti staples logam, pasir kasar, kerikil, dan batu berdasarkan gaya sentrifugal dan gravitasi ke dalam Junk Trap. Sedangkan buburan yang kasar (bundle serat/flakes) bukan pengotor padat berat, melainkan serat yang perlu diurai lebih lanjut melalui Turboseparator, Deflaker, dan DDR.'
  },
  {
    id: 4,
    category: 'Mekanika Pressure Screen & Hydrofoil',
    question: 'Fungsi bilah foil (Hydrofoil Wings) pada rotor Pressure Screen adalah:',
    options: [
      'Untuk mendorong buburan supaya keluar',
      'Untuk memotong fiber yang panjang',
      'Untuk membersihkan basket screen (mencegah penyumbatan celah)',
      'Untuk menghancurkan bubur (pulp)'
    ],
    correctAnswer: 'Untuk membersihkan basket screen (mencegah penyumbatan celah)',
    explanation: 'Bilah foil (sayap hydrofoil) yang berputar dengan jarak celah 3 mm dari basket screen menghasilkan denyut tekanan dan hisap bolak-balik (pulsation suction pulse). Denyut hisap di belakang sayap foil berfungsi menarik serat yang menumpuk di celah basket kembali ke dalam ruang saringan sehingga basket screen selalu bersih dan terbebas dari penyumbatan (anti-blinding).'
  },
  {
    id: 5,
    category: 'Spesifikasi Saringan Basket Screen',
    question: 'Berapakah ukuran celah slot basket screen standar untuk mesin pembuat tissue?',
    options: [
      '35 mm',
      '3 mm',
      '0,35 mm',
      '0,3 mm'
    ],
    correctAnswer: '0,35 mm',
    explanation: 'Standar baku celah slot basket screen untuk lini tissue adalah 0,35 mm (sedangkan model lubang bulat/hole berukuran 3 mm). Ukuran celah 0,35 mm ini 10 kali lebih rapat dari lubang hole 3 mm, sehingga mampu menahan kontaminan mikro dan mencegah cacat pada lembaran tipis tissue.'
  },
  {
    id: 6,
    category: 'Parameter Operasi Low Consistency Cleaner (LCC)',
    question: 'Berapakah konsistensi bubur pulp yang sesuai dan maksimal untuk proses LCC?',
    options: [
      '0,15 %',
      '1,5 %',
      '15 %',
      '150 %'
    ],
    correctAnswer: '1,5 %',
    explanation: 'Konsistensi maksimal untuk LCC adalah 1,5% (rentang optimal 0,8% - 1,2%). Pada konsistensi rendah ini, hambatan viskositas antar-serat sangat kecil sehingga butiran pasir silika halus dan kontaminan berberat jenis tinggi dapat terlempar bebas ke dinding kerucut dan turun menjadi reject.'
  },
  {
    id: 7,
    category: 'Fungsi Kimiawi Aditif PEO',
    question: 'Di bawah ini adalah fungsi dari bahan kimia PEO (Polyethylene Oxide), KECUALI:',
    options: [
      'Membantu pembentukan formasi tissue yang rata',
      'Membuang kotoran pada tissue',
      'Membantu drainase air di kawat pembentuk',
      'Menambah ikatan antar serat sehingga tissue kuat'
    ],
    correctAnswer: 'Membuang kotoran pada tissue',
    explanation: 'PEO (Polyethylene Oxide) adalah bahan kimia aditif dispersant (formation aid), bukan alat pembersih mekanik kotoran. Fungsi PEO adalah membungkus serat untuk mencegah flokulasi (penggumpalan serat), meratakan formasi lembaran tissue, membantu drainase pelepasan air, dan meningkatkan ikatan jalinan serat sehingga tissue menjadi kuat dan lembut.'
  },
  {
    id: 8,
    category: 'Komparasi Thickener & High Speed Washer',
    question: 'Di bawah ini merupakan persamaan fungsi antara Thickener dan High Speed Washer, KECUALI:',
    options: [
      'Untuk menghancurkan pulp (buburan)',
      'Untuk pengental pulp (menaikkan konsistensi hingga min 3.5%)',
      'Untuk membuang filer / debu serat rusak',
      'Untuk membuang kandungan kapur (CaCO3) melalui air buangan filtrat'
    ],
    correctAnswer: 'Untuk menghancurkan pulp (buburan)',
    explanation: 'Menghancurkan lembaran pulp menjadi buburan adalah fungsi Hydrapulper. Persamaan antara Thickener dan High Speed Washer adalah keduanya bertindak sebagai alat dewatering (pengental bubur hingga minimal 3,5%) dan mencuci bubur dari kandungan filler rusak serta kapur (CaCO3) melalui air filtrat yang dibuang.'
  },
  {
    id: 9,
    category: 'Keunggulan Basket Screen Model Slot',
    question: 'Di bawah ini merupakan kelebihan Pressure Screen jika menggunakan model Slot (0.35 mm), KECUALI:',
    options: [
      'Tidak terjadi spinning fiber (fiber terjalin seperti benang)',
      'Hasil accept lebih banyak (luas open area lebih besar)',
      'Hasil pulp lebih merata dan bersih',
      'Bisa membuang pasir'
    ],
    correctAnswer: 'Bisa membuang pasir',
    explanation: 'Membuang pasir adalah fungsi utama hydrocyclone cleaners (HDC, MCC, LCC) yang bekerja berdasarkan gravitasi dan gaya sentrifugal. Keunggulan model Slot pada Pressure Screen adalah: open area lebih luas sehingga volume accept bertambah, hasil pulp jauh lebih bersih (ukuran celah 1/10 model hole), dan mencegah terbentuknya spinning fiber (pilinan serat seperti tali).'
  },
  {
    id: 10,
    category: 'Standar Baku Konsistensi Pengentalan',
    question: 'Di bawah ini merupakan batas minimal konsistensi yang harus dicapai pada proses Thickener dan High Speed Washer sebelum masuk Deflaker / DDR:',
    options: [
      '0,35 %',
      '35 %',
      '3,5 %',
      '350 %'
    ],
    correctAnswer: '3,5 %',
    explanation: 'Konsistensi minimal keluaran dari Thickener dan High Speed Washer adalah 3,5% (rentang ideal 3,5% - 4,5%). Konsistensi minimal 3,5% ini mutlak diperlukan agar proses deflaking dan refining di refiner DDR dapat bekerja dengan efisiensi gesekan antar serat yang maksimal.'
  }
];

export const STOCK_PREP_TRAINING_DATA: MachineTrainingData = {
  machineId: 'STOCK_PREP',
  name: 'Modul Pelatihan Stock Preparation (Persiapan Bubur Kertas & Tissue)',
  tagline: 'Panduan Operasional Lengkap 12 Peralatan, Kontrol Junk Trap, Freeness DDR, Sistem PEO, & Evaluasi Kompetensi 3 Peran',
  technicalSpecs: [
    { label: 'Sistem Pengolahan', value: 'Sistem Persiapan Bubur Virgin & Recycle Fiber Lini Tissue & MG Paper' },
    { label: 'Kapasitas Alur Proses', value: '12 Tahapan Lengkap: Pulper s/d Chemical Additive PEO Dosing' },
    { label: 'Jenis Bahan Baku', value: 'Virgin Pulp (LBKP/NBKP), Pulp Curah (Broke Internal), & OCC (Brown Tissue)' },
    { label: 'Konsistensi Pulper', value: 'High Consistency: 8 - 12% | Low Consistency: 3 - 4%' },
    { label: 'Konsistensi Screening', value: 'Pressure Screen: 1.0 - 1.8% | LCC: Max 1.5%' },
    { label: 'Konsistensi Output Thickener/Washer', value: 'Minimal 3.5% (Standar Baku 3.5% - 4.5%)' },
    { label: 'Standar Freeness Deflaker', value: '360 - 380 CSF' },
    { label: 'Standar Freeness DDR', value: '320 - 350 CSF (Pengendalian via Ampere Meter & Valve Throttling)' },
    { label: 'Standar Viskositas PEO', value: '17 - 19 Cps (Tangki 1, 2, 4 -> Tangki 3 -> Screw Pump ke TM)' }
  ],
  operatingLimits: [
    { label: 'Tekanan Masuk HDC & LCC', limit: 'Minimal 1.5 bar', dangerZone: '< 1.3 bar pusaran sentrifugal melemah, pasir dan kotoran berat lolos ke mesin' },
    { label: 'Konsistensi Maksimal LCC', limit: 'Maksimal 1.5%', dangerZone: '> 1.6% viskositas menahan partikel pasir mengendap, cone reject rawan buntu' },
    { label: 'Jarak Gap Foil Pressure Screen', limit: 'Tepat 3.0 mm', dangerZone: '> 3.5 mm daya hisap hilang (screen buntu); < 2.0 mm risiko tabrakan bilah' },
    { label: 'Konsistensi Minimum Masuk DDR', limit: 'Minimal 3.5%', dangerZone: '< 3.2% fibrilasi tidak efektif, pemborosan energi listrik refiner' },
    { label: 'Viskositas Larutan PEO TM', limit: '17 - 19 Cps', dangerZone: '< 15 Cps formasi lembaran tissue berawan; > 22 Cps rawan buntu kawat' }
  ],
  paperGrades: [
    { code: 'RECIPE-CASSIE', name: 'Resep Cassie Standar', gsmRange: 'Tissue & MG', description: '70% Pulp Curah, 20% LBKP (400 kg), 10% BS (200 kg) untuk batch total 2.000 kg kering' },
    { code: 'RECIPE-VIRGIN', name: 'Resep Facial Premium', gsmRange: '12 - 16 gsm', description: '100% Virgin Pulp (Campuran NBKP Serat Panjang & LBKP Serat Halus) + PEO 18 Cps' },
    { code: 'RECIPE-BROWN', name: 'Resep Tissue Brown / Serbet', gsmRange: '18 - 26 gsm', description: 'Campuran Recycle Pulp & OCC terdeinking dengan pembersihan pasir bertingkat LCC' }
  ],
  dailyCheckpoints: [
    {
      area: 'Hydrapulper & Feeding Area',
      items: [
        'Inspeksi visual bahan baku: bebas kawat pengikat bal, karung goni, tali plastik, dan batu.',
        'Pengecekan rasio timbangan resep bahan baku dan volume air proses pengisian pulper.',
        'Pemeriksaan getaran dan kebocoran seal poros rotor pulper.'
      ]
    },
    {
      area: 'Cleaning & Screening Battery (HDC, MCC, Screen, LCC)',
      items: [
        'Monitoring rutin pressure gauge HDC (Inlet min 1.5 bar, Outlet 0.5 bar, Delta P ~1.0 bar).',
        'Pelaksanaan SOP Junk Trap HDC: verifikasi Valve A, C, D tertutup dan B, E terbuka saat normal.',
        'Inspeksi pancaran kerucut reject LCC (pastikan bentuk payung spiral lancar, tidak tersumbat).',
        'Cek tekanan inlet/outlet Pressure Screen dan verifikasi arah putaran motor foil tidak terbalik.'
      ]
    },
    {
      area: 'Thickening, Refining, & PEO Chemical Plant',
      items: [
        'Uji sampling konsistensi keluar Thickener & Washer: wajib minimal 3.5%.',
        'Monitoring beban Ampere meter DDR dan pencatatan freeness berkala (320 - 350 CSF).',
        'Pengecekan viskositas Cps tangki PEO yang sedang didistribusikan (standar 17 - 19 Cps).',
        'Pemeriksaan kebersihan saringan tangki 3 dan kinerja Screw Pump PEO ke Paper Machine.'
      ]
    }
  ],
  standardParameters: [
    { parameter: 'Tekanan Masuk HDC (Inlet)', range: '1.5 - 2.5', unit: 'bar' },
    { parameter: 'Tekanan Keluar HDC (Outlet)', range: '0.5', unit: 'bar' },
    { parameter: 'Tekanan Air Reducer HDC (Valve E)', range: '1.5 - 2.0', unit: 'bar' },
    { parameter: 'Celah Slot Basket Pressure Screen', range: '0.35', unit: 'mm' },
    { parameter: 'Jarak Celah Hydrofoil ke Basket', range: '3.0', unit: 'mm' },
    { parameter: 'Konsistensi Masuk LCC', range: '0.8 - 1.2 (Maks 1.5)', unit: '%' },
    { parameter: 'Konsistensi Output Thickener/Washer', range: '3.5 - 4.5', unit: '%' },
    { parameter: 'Frekuensi Inverter High Speed Washer', range: '20 - 25', unit: 'Hz' },
    { parameter: 'Target Freeness Deflaker', range: '360 - 380', unit: 'CSF' },
    { parameter: 'Target Freeness Refiner DDR', range: '320 - 350', unit: 'CSF' },
    { parameter: 'Viskositas Larutan PEO TM', range: '17 - 19', unit: 'Cps' }
  ],
  dcsIndicatorsGuide: [
    { code: 'PI-HDC-INLET', meaning: 'Tekanan masuk bubur ke High Density Cleaner', normalState: '1.5 - 2.2 bar stabil', actionIfAbnormal: 'Atur RPM feed pump atau bersihkan saringan pipa hisap pulper dump' },
    { code: 'PI-HDC-OUTLET', meaning: 'Tekanan keluar accept High Density Cleaner', normalState: '0.5 bar stabil', actionIfAbnormal: 'Setel katup throttle accept valve Y agar Delta P terjaga minimal 1.0 bar' },
    { code: 'PI-PS-INLET', meaning: 'Tekanan masuk ke Pressure Screen 0.35 mm', normalState: '1.5 - 2.0 bar', actionIfAbnormal: 'Jika melonjak > 2.5 bar lakukan flushing backwash segera' },
    { code: 'AM-DDR-LOAD', meaning: 'Beban arus listrik motor Double Disc Refiner', normalState: 'Sesuai kurva Ampere grade', actionIfAbnormal: 'Putar handwheel adjuster blade untuk menaikkan/menurunkan penekanan' },
    { code: 'VISC-PEO', meaning: 'Nilai viskositas tangki larutan kimia dispersant PEO', normalState: '17 - 19 Cps', actionIfAbnormal: 'Sesuaikan takaran serbuk Axfloc per volume air atau atur waktu aduk agitator' }
  ],
  specialCharacteristics: 'Seksi Stock Preparation PT. PUP mengintegrasikan 12 peralatan proses kontinyu dari peleburan bal hingga preparasi kimiawi PEO. Keunggulan sistem terletak pada kombinasi pembersihan kotoran berat via HDC Junk Trap 2-fasa, penyaringan mikro menggunakan Basket Slot 0.35 mm berteknologi Hydrofoil Pulse (gap 3.0 mm), pembuangan pasir halus melalui LCC encer < 1.5%, pengentalan ganda Thickener & Washer hingga konsistensi >= 3.5%, penyetelan freeness presisi DDR (320 - 350 CSF), dan stabilisasi formasi tissue menggunakan PEO 17 - 19 Cps melalui pompa ulir Screw Pump.',
  commonFaultsAndSolutions: [
    {
      fault: 'Banyak staples/kotoran logam lolos ke seksi refiner dan PM',
      indication: 'Keping pisau refiner sompel atau wire drum silinder berlubang tertusuk staples.',
      cause: 'SOP pengoperasian Junk Trap HDC tidak disiplin atau tekanan air elutriasi Valve E drop di bawah 1.5 bar.',
      immediateAction: 'Lakukan flushing pembuangan Junk Trap segera; setel tekanan Valve E minimal 1.5 bar.',
      permanentFix: 'Terapkan alarm timer otomatis untuk pembilasan Junk Trap setiap 60 - 90 menit.'
    },
    {
      fault: 'Basket Pressure Screen buntu mendadak (Screen Jamming)',
      indication: 'Tekanan masuk melonjak di atas 2.5 bar, debit bubur accept terhenti.',
      cause: 'Jarak gap foil terlalu longgar (> 3.5 mm), putaran rotor terbalik pasca perbaikan, atau konsistensi feed terlalu kental (> 2.0%).',
      immediateAction: 'Buka katup bypass, hentikan feed pump, lakukan backwashing air bertekanan.',
      permanentFix: 'Kalibrasi ulang jarak foil ke basket tepat 3.0 mm dan verifikasi arah putaran motor foil.'
    },
    {
      fault: 'Lembaran tissue di PM berbintik putih keras (Whitespot Cacat)',
      indication: 'Ditemukan gumpalan serat tak terurai pada produk jadi tissue.',
      cause: 'Proses deflaking tidak tuntas, celah stator deflaker renggang, atau freeness di atas 380 CSF.',
      immediateAction: 'Rapatkan adjuster stator deflaker dan pastikan konsistensi feed terjaga pada rentang 3.5% - 4.5%.',
      permanentFix: 'Ganti elemen disc toothed stator dan rotor deflaker yang sudah tumpul atau terabrasi pasir.'
    }
  ],
  k3SafetyProcedures: [
    'Dilarang keras menjangkaukan tangan atau alat ke dalam bak Hydrapulper saat motor atau konveyor beroperasi.',
    'Sebelum membersihkan bagian dalam pulper, wajib terapkan prosedur LOTO (Lock Out Tag Out) pada panel saklar utama.',
    'Wajib memakai APD lengkap: Helm pengaman, kacamata pelindung (goggles), masker uap/debu, sarung tangan karet kimia, dan sepatu safety anti-slip saat melarutkan serbuk kimia PEO Axfloc.',
    'Lantai area seksi Stock Prep harus selalu dijaga kering dan bersih dari tumpahan bubur pulp atau larutan kimia PEO yang sangat licin.',
    'Pastikan katup buang uap dan ventilasi tangki terbuka sebelum melakukan inspeksi internal tangki pulp panas.'
  ],
  roleGuides: [
    {
      role: 'Operator Pelaksana',
      badgeColor: 'bg-emerald-900/80 text-emerald-300 border-emerald-600/60',
      summary: 'Bertanggung jawab langsung atas penimbangan resep bahan baku, kebersihan fisik, pengoperasian valve Junk Trap HDC, pemantauan konsistensi Thickener/Washer min 3.5%, dan pelarutan serbuk PEO.',
      dailyFocus: [
        'Memastikan resep bahan baku Cassie (70% Curah, 20% LBKP, 10% BS) ditimbang presisi dan bebas kotoran kawat/goni.',
        'Menjalankan siklus pembuangan Junk Trap HDC secara tertib (Valve A, C, D tutup & B, E buka saat normal; Valve B, A tutup & C, D, E buka saat buang).',
        'Memastikan nozzle corong reject LCC tidak tersumbat dan memancarkan payung spiral lancar.',
        'Mengambil sampel berkala konsistensi accept Thickener dan High Speed Washer (target minimal 3.5%).',
        'Melarutkan serbuk PEO Axfloc perlahan ke pusaran air agar tidak timbul gumpalan (fish-eye), mengukur viskositas Cps (17 - 19 Cps), dan memastikan saringan tangki 3 bersih.'
      ],
      decisionAuthority: [
        'Berwenang menghentikan sementara feeding bal pulper jika ditemukan kawat pengikat bal atau sampah goni tebal.',
        'Berwenang mengatur bukaan valve air elutriasi E pada HDC dan bukaan valve inlet High Speed Washer agar bubur tidak meluap ke samping.',
        'Berwenang menolak batch larutan PEO jika viskositas di luar 17 - 19 Cps atau menggumpal pekat.'
      ]
    },
    {
      role: 'Kepala Regu (Karu)',
      badgeColor: 'bg-amber-900/80 text-amber-300 border-amber-600/60',
      summary: 'Mengendalikan parameter teknis proses (freeness CSF, konsistensi, pressure drop Delta P), memverifikasi kalibrasi foil Pressure Screen 3.0 mm, dan menjamin pasokan bubur stabil ke PM1, PM2, dan PM5.',
      dailyFocus: [
        'Memverifikasi tekanan kerja HDC dan LCC (Inlet min 1.5 bar, Outlet 0.5 bar, Delta P ~1.0 bar).',
        'Memeriksa kalibrasi jarak celah hydrofoil Pressure Screen (tepat 3.0 mm) dan memastikan putaran motor foil searah desain.',
        'Mengawasi beban Ampere meter DDR dan memverifikasi uji freeness laboratorium (Deflaker: 360-380 CSF, DDR: 320-350 CSF).',
        'Mengkoordinasikan kebutuhan flow bubur dan dosis larutan PEO (17-19 Cps) dengan Kepala Regu di seksi Paper Machine (PM1, PM2, PM5).'
      ],
      decisionAuthority: [
        'Berwenang memerintahkan penyetelan adjuster stator deflaker dan keping pisau DDR untuk menjaga target freeness.',
        'Berwenang memutuskan pelaksanaan backwash atau pembersihan kimiawi pada screen basket 0.35 mm saat terjadi kenaikan tekanan diferensial.',
        'Berwenang menyetujui transfer batch larutan PEO dari Tangki 1, 2, atau 4 ke Tangki 3 distribusi.'
      ]
    },
    {
      role: 'Kepala PM & Superintendent',
      badgeColor: 'bg-blue-900/80 text-blue-300 border-blue-600/60',
      summary: 'Penanggung jawab strategis atas ketersediaan bubur berkualitas prima, efisiensi bahan baku (yield), pencegahan cacat lembaran di PM, dan keselamatan kerja (K3) menyeluruh di plant Stock Preparation.',
      dailyFocus: [
        'Evaluasi neraca massa dan yield pemakaian serat (rasio serat virgin vs recycle vs broke recovery).',
        'Analisis korelasi antara freeness stock preparation dengan kecepatan jalan mesin (speed 100 - 150 mpm) dan tensile strength lembaran tissue di PM.',
        'Memastikan keausan keping pisau refiner DDR, stator deflaker, dan basket screen 0.35 mm terpantau dalam jadwal preventive maintenance.',
        'Optimalisasi konsumsi energi listrik pulper/refiner (kWh/ton) dan efisiensi pemakaian kimiawi Axfloc PEO.'
      ],
      decisionAuthority: [
        'Menetapkan modifikasi formula resep bahan baku per grade kertas/tissue sesuai ketersediaan stok gudang.',
        'Memberikan persetujuan penggantian keping disc blade DDR atau basket screen 0.35 mm yang telah mencapai batas keausan teknis.',
        'Memimpin investigasi insiden downtime atau kontaminasi berat yang berdampak pada putus lembaran di Paper Machine.'
      ]
    }
  ],
  stockPrepEquipments: STOCK_PREP_EQUIPMENTS,
  stockPrepQuizzes: STOCK_PREP_QUIZZES
};

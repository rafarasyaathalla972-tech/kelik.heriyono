import pm1HeroImg from '../assets/images/pm1_machine_1789447494837.jpg';
import pm2HeroImg from '../assets/images/pm2_machine_1789447511803.jpg';
import pm5HeroImg from '../assets/images/pm5_machine_1789447532514.jpg';
import rewinderHeroImg from '../assets/images/rewinder_machine_1789447453640.jpg';
import rewinderPartsImg from '../assets/images/rewinder_parts_1789447473542.jpg';
import stockprepOverviewImg from '../assets/images/stockprep_overview_1789468824360.jpg';
import stockprepCleanersImg from '../assets/images/stockprep_cleaners_1789468841675.jpg';
import stockprepRefinersImg from '../assets/images/stockprep_refiners_1789468856455.jpg';
import tissueWetEndImg from '../assets/images/tissue_wet_end_1789486344949.jpg';
import tissueHeadboxWireImg from '../assets/images/tissue_headbox_wire_1789486361955.jpg';
import tissueDryerYankeeImg from '../assets/images/tissue_dryer_yankee_1789486377249.jpg';
import tissuePopeReelImg from '../assets/images/tissue_pope_reel_1789486397213.jpg';

// Foto Nyata Contoh Produk Resmi PT. PUP
import trendyFacialImg from '../assets/images/trendy_facial_tissue_1790587809025.jpg';
import softoNapkinImg from '../assets/images/softo_napkin_tissue_1790587821638.jpg';
import pupToiletImg from '../assets/images/pup_toilet_tissue_1790587832375.jpg';
import mgPaperColorsImg from '../assets/images/mg_paper_rolls_colors_1790587844436.jpg';
import pupJumboRollsImg from '../assets/images/pup_jumbo_rolls_plant_1790587856065.jpg';

export type SlideCategory = 
  | 'PROFILE' 
  | 'K3_5R' 
  | 'MANUFACTURING' 
  | 'MACHINES' 
  | 'PRODUCTS_SALES' 
  | 'SPECS_DATA' 
  | 'QUALITY_MANAGEMENT';

export interface PresentationSlide {
  id: string;
  slideNumber: number;
  category: SlideCategory;
  categoryLabel: string;
  title: string;
  subtitle: string;
  badge?: string;
  keyPoints: string[];
  explanation: string;
  speakerNotes: string;
  salesSpgTips?: string; // Panduan khusus untuk bagian Sales & SPG
  imageSrc?: string;
  imageCaption?: string;
  tableData?: {
    headers: string[];
    rows: string[][];
  };
  highlightBox?: {
    title: string;
    text: string;
    theme: 'blue' | 'amber' | 'emerald' | 'rose' | 'indigo';
  };
}

export const PRESENTATION_METADATA = {
  title: 'COMPANY PROFILE & TRAINING TERPADU OPERASIONAL PABRIK',
  subtitle: 'Materi Pelatihan Multi-Divisi: Produksi, Converting, Maintenance, QC, PPIC, dan Sales/SPG',
  authorRole: 'Kepala Pabrik (Kelik Heriyono)',
  companyName: 'PT. PANCA USAHATAMA PARAMITA (PT. PUP)',
  revision: 'Rev. 02 (28.09.2026)',
  totalSlides: 31,
  purpose: 'Materi terstruktur, sistematis, elegan, dan profesional untuk pemahaman komprehensif seluruh bagian.'
};

export const INITIAL_PRESENTATION_SLIDES: PresentationSlide[] = [
  // -------------------------------------------------------------
  // BAGIAN 1: COMPANY PROFILE, VISI-MISI & BUDAYA 5C
  // -------------------------------------------------------------
  {
    id: 'slide-01',
    slideNumber: 1,
    category: 'PROFILE',
    categoryLabel: 'Profil Perusahaan',
    title: 'COMPANY PROFILE & MATERI ORIENTASI TERPADU',
    subtitle: 'PT. Panca Usahatama Paramita (PT. PUP) — Tissue Paper Mill & Converting Plant',
    badge: 'Dokumen Resmi Pabrik Rev. 02',
    imageSrc: pupJumboRollsImg,
    imageCaption: 'Fasilitas Pabrik & Pergudangan Terpadu PT. PUP: Produksi Jumbo Roll dan Ragam Tisu Berkualitas.',
    keyPoints: [
      'Disusun resmi oleh Kepala Pabrik (Kelik Heriyono) sebagai pedoman baku pelatihan seluruh karyawan.',
      'Dirancang terstruktur, sistematis, elegan, dan mudah dipahami oleh seluruh lini: Manajemen, Shift Lapangan, hingga Tim Sales/SPG.',
      'Memadukan profil perusahaan, budaya mutu 5C, standar K3, alur proses permesinan, hingga katalog contoh produk nyata (Trendy, Softo, Toilet & MG Paper).'
    ],
    explanation: 'Selamat datang di materi presentasi resmi PT. Panca Usahatama Paramita (PT. PUP). Dokumen ini memuat rangkuman menyeluruh mengenai profil perusahaan, alur operasional pabrik, sistem mutu ISO 9001:2015 (PUPMS), serta katalog produk unggulan jumbo roll dan tissue jadi untuk mempermudah koordinasi antar departemen dan pemasaran produk.',
    speakerNotes: 'Buka presentasi dengan menyapa seluruh audiens dari berbagai divisi. Tekankan bahwa materi ini adalah bahasa persatuan kerja di PT. PUP agar orang lapangan dan tim penjualan memiliki pemahaman produk yang sama.',
    salesSpgTips: 'Sales dan SPG harus bangga memperkenalkan PT. PUP sebagai pabrik manufaktur terintegrasi yang memiliki fasilitas mesin modern dan kapasitas produksi andal.',
    highlightBox: {
      title: 'Pesan Kepala Pabrik (Kelik Heriyono)',
      text: '"Pabrik yang hebat tidak hanya menghasilkan tonase tinggi, tetapi menjamin keselamatan kerja karyawan, kepatuhan mutu produk, dan kepuasan pelanggan secara konsisten."',
      theme: 'blue'
    }
  },
  {
    id: 'slide-02',
    slideNumber: 2,
    category: 'PROFILE',
    categoryLabel: 'Profil Perusahaan',
    title: 'VISI, MISI & KOMITMEN KEBERLANJUTAN',
    subtitle: 'Membangun Daya Saing Industri Kertas Tisu Nasional yang Unggul & Ramah Lingkungan',
    badge: 'Arah Strategis PT. PUP',
    keyPoints: [
      'VISI: Menjadi produsen kertas tisu dan jumbo roll terkemuka di Indonesia dengan standar mutu internasional dan keunggulan biaya yang kompetitif.',
      'MISI 1: Memproduksi kertas tisu (Facial, Toilet, Napkin) dan kertas MG berkualitas prima menggunakan bahan baku pulp murni pilihan dan HVS tersortir.',
      'MISI 2: Menerapkan teknologi hemat energi dan pengolahan limbah ramah lingkungan (WWT) berstandar baku mutu lingkungan hidup.',
      'MISI 3: Memberikan pelayanan terbaik dan ketepatan waktu pengiriman (OTIF) untuk mendukung pertumbuhan bisnis mitra dan pelanggan.'
    ],
    explanation: 'PT. PUP berkomitmen menjadi pemain utama industri kertas tisu yang andal. Dengan mengintegrasikan sistem produksi hulu (Stock Prep & Paper Machine) hingga hilir (Slitter Rewinder & Converting), perusahaan memastikan setiap lembar kertas memiliki konsistensi kelembutan, daya serap, dan higienitas tinggi.',
    speakerNotes: 'Jelaskan bahwa komitmen mutu PT. PUP bukan hanya slogan, melainkan tercermin dalam pengujian laboratorium basah dan kering di setiap shift produksi.',
    salesSpgTips: 'Gunakan poin ramah lingkungan dan penggunaan pulp murni higienis sebagai keunggulan utama saat meyakinkan calon mitra distributor atau modern outlet.',
    highlightBox: {
      title: 'Tiga Pilar Nilai Bagi Pelanggan',
      text: '1. Kualitas Terjamin (Quality Assurance) • 2. Pasokan Berkelanjutan (Reliable Supply) • 3. Harga Kompetitif (Competitive Pricing)',
      theme: 'emerald'
    }
  },
  {
    id: 'slide-03',
    slideNumber: 3,
    category: 'PROFILE',
    categoryLabel: 'Profil Perusahaan',
    title: 'STRUKTUR PIMPINAN & INTEGRASI LINTAS DIVISI',
    subtitle: 'Alur Komando dan Kolaborasi Profesional di Pabrik PT. PUP',
    badge: 'Struktur Organisasi',
    keyPoints: [
      'Kepala Pabrik: Kelik Heriyono — Penanggung jawab operasional total (Produksi, Mutu, Biaya, Pengiriman, K3).',
      'Divisi Paper Mill (Mesin PM1, PM2, PM5): Hasyim / Untung S / Sarino — Pengendali proses pembuatan lembaran kertas.',
      'Divisi Finishing & Converting: Sudarji — Pengendali pemotongan, converting rol kecil, dan pengepakan.',
      'Divisi Maintenance: Suparno / Yana Andriyana — Penjaga keandalan mekanik, elektrik, instrumen, dan boiler uap.',
      'Divisi QC & Laboratorium: Penjamin kesesuaian gramatur, tensile, ketebalan, dan investigasi mutu.',
      'Divisi PPIC & Gudang: Riswan — Pengatur jadwal produksi, stok bahan baku bal, dan logistik pengiriman.'
    ],
    explanation: 'Pabrik beroperasi dengan sinergi erat lintas divisi. Setiap unit memiliki batas wewenang yang tegas namun saling mendukung. Informasi kebutuhan pasar dari tim Sales langsung diterjemahkan PPIC ke dalam jadwal produksi mesin PM dan stok jumbo roll di gudang.',
    speakerNotes: 'Tunjukkan bahwa setiap regu kerja dipimpin oleh personel berpengalaman yang menjamin kelancaran shift 24 jam.',
    salesSpgTips: 'Informasikan kepada klien bahwa pesanan mereka dipantau langsung oleh manajemen pabrik dan sistem pelaporan shift real-time.',
    tableData: {
      headers: ['Divisi Pabrik', 'Pimpinan / PIC', 'Fokus Utama'],
      rows: [
        ['Pimpinan Pabrik', 'Kelik Heriyono (Kepala Pabrik)', 'Strategi operasional, PCQDS, kebijakan keselamatan'],
        ['Paper Mill (PM)', 'Kepala PM & Kepala Regu Shift', 'Produksi jumbo roll, tonase, OEE, penekanan broke'],
        ['Converting & Rewinder', 'Kepala Converting & Operator', 'Pemotongan slitter, kerapatan gulungan, packing koli'],
        ['Maintenance & Utilitas', 'Kepala Maintenance & Tim Teknisi', 'Preventif mesin, uap boiler, pasokan listrik & air'],
        ['Quality Control (QC)', 'Kepala Bagian QC & Analis Lab', 'Uji gramatur, tensile strength, kelembutan, CPAR'],
        ['PPIC & Gudang', 'Kepala PPIC & Logistik', 'Perencanaan order, persediaan bahan baku bal, DO/OTIF']
      ]
    }
  },
  {
    id: 'slide-04',
    slideNumber: 4,
    category: 'PROFILE',
    categoryLabel: 'Profil Perusahaan',
    title: 'BUDAYA KERJA: NILAI DASAR 5C PT. PUP',
    subtitle: 'Fondasi Karakter Insan PT. PUP dalam Bekerja dan Melayani Pelanggan',
    badge: 'Mentalitas Dasar PUPMS',
    keyPoints: [
      '1. CARING (Peduli): Peduli keselamatan rekan kerja, merawat mesin pabrik, dan menjaga kebersihan lingkungan.',
      '2. CREDIBLE (Terpercaya): Jujur mencatat data logsheet apa adanya, menepati komitmen janji, dan berintegritas tinggi.',
      '3. COMPETENT (Cakap & Terampil): Menguasai parameter teknis, tangkas menyelesaikan masalah, dan terus belajar.',
      '4. COMPETITIVE (Daya Saing Unggul): Semangat pantang menyerah, bergerak cepat meminimalkan downtime, dan berinovasi.',
      '5. CUSTOMER DELIGHT (Kepuasan Pelanggan): Memberikan mutu terbaik melebihi ekspektasi pembeli dan konsumen akhir.'
    ],
    explanation: 'Nilai 5C adalah kompas moral dan etos kerja seluruh karyawan PT. PUP. Bukan sekadar hafalan, 5C diwujudkan dalam briefing 30 menit sebelum shift (Horenso), serah terima tugas yang tertib, dan kebanggaan menghasilkan produk berkualitas prima.',
    speakerNotes: 'Tekankan bahwa Customer Delight berlaku untuk pelanggan eksternal (pembeli tisu) maupun pelanggan internal (misal: bagian converting yang menerima jumbo roll dari paper mill).',
    salesSpgTips: 'Pegang teguh nilai Credible dan Customer Delight saat berhadapan dengan calon pelanggan: selalu sampaikan data spesifikasi produk dengan jujur dan layani sepenuh hati.',
    highlightBox: {
      title: 'Penerapan 5C di Lini Penjualan & Lapangan',
      text: 'Bekerja dengan empati (Caring), perkataan dapat dipegang (Credible), paham spesifikasi produk (Competent), tanggap peluang pasar (Competitive), dan buat pelanggan tersenyum puas (Customer Delight).',
      theme: 'amber'
    }
  },

  // -------------------------------------------------------------
  // BAGIAN 2: K3, KESELAMATAN & STANDAR 5R PABRIK
  // -------------------------------------------------------------
  {
    id: 'slide-05',
    slideNumber: 5,
    category: 'K3_5R',
    categoryLabel: 'K3 & Standar 5R',
    title: 'KESELAMATAN KERJA (K3) & ALAT PELINDUNG DIRI (APD)',
    subtitle: 'Zero Accident: Prioritas Mutlak di Seluruh Area Produksi PT. PUP',
    badge: 'Keselamatan Kerja (HSE)',
    keyPoints: [
      'Setiap karyawan dan pengunjung wajib mengenakan APD standar sebelum memasuki area mesin.',
      'Sepatu Keselamatan (Safety Shoes): Melindungi kaki dari benturan bal pulp, spool besi, dan pallet.',
      'Rompi Reflektif (Hi-Vis Vest): Meningkatkan visibilitas operator di dekat lalu lintas forklift dan overhead crane.',
      'Pelindung Telinga (Earplug / Earmuff): Wajib di area berisiko bising tinggi (>85 dB) seperti Refiner dan Blower.',
      'Kacamata Pengaman (Safety Glasses): Melindungi mata dari percikan bubur pulp panas dan bahan kimia.',
      'Sarung Tangan Anti-Potong (Level 5): Wajib saat menangani pisau slitter tajam dan penarikan kertas putus.'
    ],
    explanation: 'Keselamatan adalah hak dan tanggung jawab setiap insan di pabrik. Tidak ada target tonase atau efisiensi yang boleh mengorbankan keselamatan nyawa. Setiap pekerja berhak menolak bekerja bila menemukan kondisi bahaya yang belum diamankan.',
    speakerNotes: 'Ingatkan audiens bahwa kedisiplinan APD adalah bukti kepedulian terhadap keluarga yang menanti di rumah.',
    salesSpgTips: 'Saat mengajak kunjungan industri atau visit factory bersama calon pembeli, pastikan tamu mengenakan APD lengkap sebagai wujud profesionalisme pabrik kita.',
    highlightBox: {
      title: 'Prinsip Zero Tolerance K3',
      text: 'Dilarang keras menyentuh roll atau pisau yang sedang berputar. Gunakan gembok pengunci LOTO (Lockout-Tagout) sebelum melakukan perbaikan teknis!',
      theme: 'rose'
    }
  },
  {
    id: 'slide-06',
    slideNumber: 6,
    category: 'K3_5R',
    categoryLabel: 'K3 & Standar 5R',
    title: 'TITIK BAHAYA KRITIS & PROSEDUR KUNCI LOTO',
    subtitle: 'Pengendalian Risiko Energi Berbahaya pada Mesin Kertas & Slitter',
    badge: 'Prosedur LOTO & Nip Point',
    keyPoints: [
      'Titik Jepit Nip Roll (Pinch Point): Celah antara Press Roll, Calender Roll, dan Drum Winder memiliki gaya jepit ribuan Newton.',
      'Bahaya Suhu Tinggi Silinder Yankee: Permukaan silinder dan pipa uap bertekanan mencapai suhu >120°C.',
      'Prosedur 6 Langkah LOTO:',
      '  1. Identifikasi sumber energi (listrik, pneumatik, uap steam).',
      '  2. Beritahukan personel terdampak di area mesin.',
      '  3. Matikan mesin secara normal dari control desk.',
      '  4. Putus saklar isolasi utama dan buang sisa tekanan udara/steam.',
      '  5. Pasang gembok LOTO pribadi dan tanda peringatan bahaya (Tagout).',
      '  6. Uji verifikasi Zero Energy State sebelum memulai pekerjaan perbaikan.'
    ],
    explanation: 'Kecelakaan fatal pada industri kertas sering terjadi akibat abai terhadap titik jepit roll dan sisa energi mekanik. Dengan menerapkan SOP LOTO 6 langkah, risiko tersengat listrik, terjepit, atau terkena semburan steam panas dapat dieliminasi secara total.',
    speakerNotes: 'Tekankan bahwa gembok LOTO bersifat pribadi dan anak kuncinya dipegang sendiri oleh mekanik/operator bersangkutan.',
    highlightBox: {
      title: 'Peringatan Operasional Lapangan',
      text: 'Dilarang membersihkan roll yang berputar menggunakan kain lap tangan. Kain lap dapat terlilit roll dalam sekejap mata dan menarik tangan operator!',
      theme: 'amber'
    }
  },
  {
    id: 'slide-07',
    slideNumber: 7,
    category: 'K3_5R',
    categoryLabel: 'K3 & Standar 5R',
    title: 'PROSEDUR TANGGAP DARURAT & JALUR EVAKUASI',
    subtitle: 'Kesiapsiagaan Menghadapi Kebakaran, Gempa Bumi & Situasi Krisis',
    badge: 'Tanggap Darurat',
    keyPoints: [
      'Tali Tarik Darurat (Emergency Pull-Wire): Membentang di sepanjang mesin PM dan Rewinder untuk penghentian seketika (<2.5 detik).',
      'Titik Alat Pemadam Api Ringan (APAR): Tersebar di setiap stasiun kerja dengan inspeksi bulanan tanda jarum di zona hijau.',
      'Prosedur Evakuasi Kebakaran / Gempa:',
      '  1. Jangan panik, hentikan mesin jika tombol E-Stop mudah dijangkau.',
      '  2. Ikuti garis hijau jalur evakuasi (Evacuation Route) di lantai.',
      '  3. Jangan gunakan lift/crane, berjalan cepat tanpa berlari.',
      '  4. Berkumpul di Titik Kumpul Aman (Assembly Point) di halaman depan pabrik.',
      '  5. Kepala Regu / Karu melakukan presensi penghitungan jumlah anggota tim.'
    ],
    explanation: 'Kesiapan tanggap darurat dilatihkan secara berkala kepada seluruh personil. Setiap orang di pabrik wajib hafal posisi tombol emergency stop, lokasi APAR terdekat, dan arah menuju pintu darurat terdekat dari stasiun kerjanya.',
    speakerNotes: 'Pastikan audiens memahami bahwa keselamatan jiwa lebih utama dibandingkan menyelamatkan material roll saat terjadi kebakaran.',
    highlightBox: {
      title: 'Layanan Darurat Pabrik',
      text: 'Segera tekan bel alarm darurat dan hubungi Pos Komando HSE Pabrik jika melihat asap, percikan api, atau kebocoran steam berbahaya!',
      theme: 'rose'
    }
  },
  {
    id: 'slide-08',
    slideNumber: 8,
    category: 'K3_5R',
    categoryLabel: 'K3 & Standar 5R',
    title: 'STANDAR 5R: BUDAYA KEBERSIHAN & KETERTIBAN PABRIK',
    subtitle: 'Ringkas, Rapi, Resik, Rawat, Rajin di Area Produksi PT. PUP',
    badge: 'Disiplin 5R / 5S',
    keyPoints: [
      '1. RINGKAS (Seiri): Memilah dan menyingkirkan benda tidak terpakai (kawat bal bekas, pipa rusak, sampah kemasan).',
      '2. RAPI (Seiton): Menempatkan peralatan pada posisinya dengan tanda garis dan label nama (Tools Shadow Board).',
      '3. RESIK (Seiso): Membersihkan debu serat kertas di sekitar pisau dan bearing secara rutin sambil memeriksa kebocoran oli.',
      '4. RAWAT (Seiketsu): Membakukan standar kebersihan dengan jadwal piket per shift dan lembar audit 50 poin.',
      '5. RAJIN (Shitsuke): Membangun disiplin diri untuk selalu menjaga tempat kerja bersih tanpa harus disuruh pimpinan.'
    ],
    explanation: 'Kebersihan pabrik kertas adalah cerminan mutu produk. Serbuk kertas yang menumpuk bukan hanya merusak estetika, namun berpotensi memicu kebakaran dan mengotori permukaan lembaran tisu. Melalui 5R, efisiensi kerja meningkat dan waktu mencari peralatan terpangkas drastis.',
    speakerNotes: 'Berikan contoh shadow board di ruang workshop di mana setiap kunci pas memiliki gambar cetakan tempatnya.',
    salesSpgTips: 'Pabrik yang bersih dan rapi (5R) menjadi daya tarik luar biasa saat buyer atau klien besar melakukan kunjungan audit pabrik.',
    highlightBox: {
      title: 'Dampak Nyata 5R bagi PT. PUP',
      text: '• Mencegah kontaminasi kotoran pada tisu • Menghilangkan bahaya terpeleset ceceran oli • Mempercepat waktu ganti order (make ready)',
      theme: 'emerald'
    }
  },

  // -------------------------------------------------------------
  // BAGIAN 3: ALUR PROSES MANUFAKTUR & MESIN PABRIK (FOTO NYATA)
  // -------------------------------------------------------------
  {
    id: 'slide-09',
    slideNumber: 9,
    category: 'MANUFACTURING',
    categoryLabel: 'Proses Manufaktur',
    title: 'ALUR TERPADU PROSES PRODUKSI KERTAS TISU',
    subtitle: 'Transformasi Serat Pulp Murni Menjadi Gulungan Tisu Bernilai Tinggi',
    badge: 'Alur Proses 5 Tahap',
    keyPoints: [
      'Tahap 1 - Stock Preparation: Peleburan bal serat pulp virgin & HVS curah dalam Hydrapulper dan pembersihan kontaminan.',
      'Tahap 2 - Fibrilasi & Penggilingan: Penyetelan derajat kehalusan serat (Freeness 320-350 CSF) pada Double Disc Refiner.',
      'Tahap 3 - Pembentukan Lembaran (Sheet Forming): Bubur encer (konsistensi 0.2-0.5%) disemprotkan merata di kawat Wire/Cylinder.',
      'Tahap 4 - Pemerasan Air & Pengeringan: Air diperas felt (press section) dan dikeringkan seketika pada Silinder Yankee MG uap panas.',
      'Tahap 5 - Penggulungan & Finishing: Digulung pada Pope Reel menjadi Jumbo Roll, lalu dipotong pada Mesin Slitter Rewinder.'
    ],
    explanation: 'Proses pembuatan kertas tisu memerlukan keseimbangan presisi antara fisika fluida, perpindahan panas termal, dan kimia aditif. Mulai dari peleburan serat hingga pemotongan gulungan akhir, setiap detik diawasi parameter otomatis DCS dan inspeksi shift.',
    speakerNotes: 'Gunakan diagram ini sebagai peta panduan sebelum masuk ke detail foto nyata masing-masing mesin.',
    salesSpgTips: 'Ceritakan kepada calon pembeli bahwa tisu PT. PUP melewati proses pemanasan suhu tinggi di atas 100°C pada Silinder Yankee sehingga produk terbebas dari bakteri dan kuman patogen (Higienis).',
    highlightBox: {
      title: 'Keunggulan Bahan Baku Virgin Pulp PT. PUP',
      text: 'Menggunakan serat kayu murni bersertifikat yang memberikan tekstur ekstra lembut, putih alami tanpa pemutih berbahaya, dan daya serap air luar biasa.',
      theme: 'blue'
    }
  },
  {
    id: 'slide-10',
    slideNumber: 10,
    category: 'MACHINES',
    categoryLabel: 'Mesin & Peralatan',
    title: 'STOCK PREPARATION: HYDRAPULPER & JALUR BUBUR',
    subtitle: 'Seksi Peleburan Bal Pulp & Pengadukan Homogen Bebas Gumpalan',
    badge: 'Foto Nyata Pabrik PT. PUP',
    keyPoints: [
      'Bejana Hydrapulper berbahan stainless steel dengan rotor turbulensi berdaya putar tinggi.',
      'Bekerja melebur bal virgin pulp kering, broke sisa produksi, dan OCC dengan air sirkulasi white water.',
      'Dilengkapi baffle pemecah pusaran untuk memastikan serat terurai sempurna tanpa merusak panjang serat.',
      'Tangki penampung (Dump Chest) dilengkapi agitator kontinu menjaga keseragaman suspensi konsistensi 3.5 - 4.5%.'
    ],
    explanation: 'Inilah gerbang awal produksi kertas tisu PT. PUP. Foto nyata ini menampilkan area instalasi Stock Preparation. Di sinilah bal serat pulp murni dicampur dan diaduk bersama air bersuhu stabil hingga menjadi suspensi bubur cair yang siap dibersihkan dari benda asing.',
    speakerNotes: 'Tekankan pentingnya konsistensi bubur masuk yang seragam agar ketebalan kertas di mesin PM tidak bergelombang.',
    salesSpgTips: 'Jelaskan bahwa bahan baku pulp dilebur secara steril dengan air bersih tersaring dan sistem pemantauan terkontrol.',
    imageSrc: stockprepOverviewImg,
    imageCaption: 'Foto Nyata Pabrik PT. PUP: Bejana Hydrapulper stainless steel, pipa distribusi suspensi bubur, dan tangki penampung (chest) di Seksi Stock Preparation.'
  },
  {
    id: 'slide-11',
    slideNumber: 11,
    category: 'MACHINES',
    categoryLabel: 'Mesin & Peralatan',
    title: 'PEMBERSIHAN KONTAMINAN: HDC & LCC CLEANERS',
    subtitle: 'Pemisah Benda Asing Sentrifugal: Pasir, Staples, Logam & Kawat Bal',
    badge: 'Foto Nyata Pabrik PT. PUP',
    keyPoints: [
      'High Density Cleaner (HDC): Menggunakan gaya sentrifugal vortex dengan tekanan inlet minimal 1.5 bar.',
      'Pemisahan Kerapatan Tinggi: Staples logam, pasir berat, dan kawat bal terlempar ke dinding luar dan turun ke Junk Trap.',
      'Katup Air Elutriasi (Valve E): Memberikan dorongan air ke atas agar serat pulp berharga tidak ikut terbuang ke bak reject.',
      'Baterai Kerucut Low Consistency Cleaner (LCC): Menyaring pasir silika halus pada konsistensi encer (<1.5%).'
    ],
    explanation: 'Foto nyata ini memperlihatkan baterai kerucut pembersih HDC dan LCC di pabrik PT. PUP. Melalui pemisahan bertekanan multi-tahap ini, seluruh kotoran logam dan pasir silika dieliminasi total sebelum bubur dialirkan ke mesin kertas.',
    speakerNotes: 'Jelaskan prosedur flushing Junk Trap 2 katup yang dilakukan berkala oleh operator Stock Prep.',
    salesSpgTips: 'Sampaikan kepada buyer bahwa tisu PT. PUP dijamin aman dari serpihan logam tajam dan pasir karena melewati sistem pembersih sentrifugal multi-siklus.',
    imageSrc: stockprepCleanersImg,
    imageCaption: 'Foto Nyata Pabrik PT. PUP: Rangkaian bejana High Density Cleaner (HDC) dengan sistem Junk Trap dan baterai kerucut LCC pembersih pasir silika halus.'
  },
  {
    id: 'slide-12',
    slideNumber: 12,
    category: 'MACHINES',
    categoryLabel: 'Mesin & Peralatan',
    title: 'PENGGILINGAN SERAT: DOUBLE DISC REFINER (DDR)',
    subtitle: 'Pengendali Kehalusan (Freeness 320-350 CSF) & Penentu Kekuatan Lembaran',
    badge: 'Foto Nyata Pabrik PT. PUP',
    keyPoints: [
      'Double Disc Refiner (DDR): Memiliki keping pisau ganda (bar & groove) berputar presisi mikrometer.',
      'Fibrilasi Eksternal: Mengurai dinding serat kayu agar mengembang dan membentuk ikatan hidrogen yang kuat antar serat.',
      'Target Standar Freeness Tisu: 320 - 350 Canadian Standard Freeness (CSF).',
      'Deflaker Unit: Mengurai gumpalan flakes dan serpihan serat keras (360-380 CSF) untuk mencegah cacat bintik putih (white spot).',
      'Pengendalian Beban: Dipantau melalui pembacaan jarum Ampere meter beban motor dan bukaan katup throttling.'
    ],
    explanation: 'Foto nyata ini menampilkan unit mekanis presisi tinggi DDR di seksi Stock Preparation. Keping pisau khusus pada mesin ini menyikat permukaan serat agar memiliki daya ikat tinggi saat dibentuk menjadi lembaran tisu yang lembut namun tidak mudah robek.',
    speakerNotes: 'Ingatkan bahwa konsistensi bubur masuk ke DDR wajib dijaga minimal 3.5% untuk mencegah kontak langsung antar keping pisau.',
    salesSpgTips: 'Inilah rahasia mengapa tisu PT. PUP memiliki kekuatan tarik (tensile strength) yang kokoh meski teksturnya sangat lembut di kulit.',
    imageSrc: stockprepRefinersImg,
    imageCaption: 'Foto Nyata Pabrik PT. PUP: Unit Double Disc Refiner (DDR) dan Deflaker pemfibrilasi serat pulp dengan panel pemantau arus Ampere beban gilingan.'
  },
  {
    id: 'slide-13',
    slideNumber: 13,
    category: 'MACHINES',
    categoryLabel: 'Mesin & Peralatan',
    title: 'TISSUE MACHINE: WET END & FORMING SECTION',
    subtitle: 'Pembentukan Lembaran Basah Berseragam Tinggi & Pembuangan Air Awal',
    badge: 'Foto Nyata Pabrik PT. PUP',
    keyPoints: [
      'Seksi Wet End: Tempat bubur encer bertemu dengan kawat jaring pembentuk (forming wire).',
      'Pengurangan Kadar Air: Dari konsistensi 0.3% ditingkatkan menjadi 18-20% melalui kotak vakum hisap (suction box).',
      'Formasi Serat Rata: Aliran disuplai dengan turbulensi teratur untuk mencegah serat menggumpal berawan.',
      'Pemberian Aditif PEO (Axfloc): Membantu pendispersian serat tissue agar formasi lembaran sangat halus dan seragam.'
    ],
    explanation: 'Foto nyata ini menunjukkan seksi Wet End mesin pembuat kertas tisu PT. PUP. Air dalam jumlah besar dikeluarkan secara efisien menggunakan gaya gravitasi dan denyut vakum, menyisakan jalinan lembaran kertas basah yang teratur sempurna.',
    speakerNotes: 'Jelaskan peran penambahan kimia PEO dengan viskositas 17-19 Cps untuk menghasilkan formasi awan kertas yang halus.',
    salesSpgTips: 'Formasi lembaran yang seragam memastikan ketebalan tisu merata di setiap sentimeter, sehingga tidak ada bagian yang tipis atau mudah bolong.',
    imageSrc: tissueWetEndImg,
    imageCaption: 'Foto Nyata Pabrik PT. PUP: Seksi Wet End mesin tisu menampilkan meja jaring pembentuk (forming table) dan sistem drainase vakum pembuangan air.'
  },
  {
    id: 'slide-14',
    slideNumber: 14,
    category: 'MACHINES',
    categoryLabel: 'Mesin & Peralatan',
    title: 'HEADBOX & WIRE PART: JANTUNG FORMASI KERTAS',
    subtitle: 'Distribusi Aliran Bubur Berkecepatan Tinggi ke Anyaman Jaring Kawat',
    badge: 'Foto Nyata Pabrik PT. PUP',
    keyPoints: [
      'Headbox Bertekanan: Menyemprotkan suspensi serat melalui celah bibir nozel (slice lip) secara presisi selebar mesin.',
      'Keseimbangan Rasio Jet-to-Wire: Menentukan rasio kekuatan tarik arah serat (MD/CD Tensile Ratio).',
      'Kain Wire Berkualitas: Anyaman kawat sintetis poliester anti-karat dengan drainase pori terkalibrasi.',
      'Water Jet Trim Cutter: Pisau semprotan air bertekanan tinggi memotong tepi basah lembaran agar lebar kertas akurat.'
    ],
    explanation: 'Foto nyata ini menampilkan unit Headbox dan lintasan kawat Wire Part. Headbox adalah komponen paling sensitif pada mesin kertas yang bertugas menyebarkan jutaan serat kayu per detik secara rata tanpa riak gelombang.',
    speakerNotes: 'Jelaskan bagaimana operator mengontrol keseragaman profil berat dasar (Basis Weight profile) melalui penyetelan baut mikro slice lip.',
    salesSpgTips: 'Kontrol Headbox presisi ini yang membuat gramatur tisu PT. PUP sangat konsisten (toleransi ketat ±1 gsm).',
    imageSrc: tissueHeadboxWireImg,
    imageCaption: 'Foto Nyata Pabrik PT. PUP: Unit Headbox bertekanan dan bentangan kawat anyaman Wire Part pembentuk lembaran tisu prima.'
  },
  {
    id: 'slide-15',
    slideNumber: 15,
    category: 'MACHINES',
    categoryLabel: 'Mesin & Peralatan',
    title: 'YANKEE DRYER: PENGERING CEPAT & PROSES CREPING',
    subtitle: 'Silinder Baja Raksasa Pemanas Uap Steam & Pembentuk Kerutan Lembut',
    badge: 'Foto Nyata Pabrik PT. PUP',
    keyPoints: [
      'Silinder Yankee MG: Silinder pemanas bertekanan steam uap 1.0 - 3.0 bar dengan permukaan krom cermin halus.',
      'Pengeringan Seketika: Lembaran basah ditempelkan pada silinder berputar panas dan mengering hingga kadar air 5-7% dalam hitungan detik.',
      'Pisau Doctor Blade Creping: Mengikis lembut lembaran kering dari permukaan Yankee untuk menghasilkan kerutan mikro (crepe).',
      'Fungsi Creping: Memberikan elastisitas, ketebalan empuk (bulk), kelembutan luar biasa, dan daya serap cairan tinggi.'
    ],
    explanation: 'Foto nyata ini memperlihatkan Silinder Pengering Yankee raksasa di pabrik PT. PUP. Inilah yang membedakan mesin kertas biasa dengan mesin tisu. Berkat proses creping oleh pisau doctor blade, lembaran kertas yang kaku berubah menjadi tisu bertekstur empuk dan nyaman di kulit.',
    speakerNotes: 'Jelaskan pentingnya sudut pemasangan pisau creping dan penyemprotan bahan kimia pelapis silinder (coating chemical) agar permukaan Yankee tidak baret.',
    salesSpgTips: 'Kelebihan tisu PT. PUP terletak pada kerutan mikro (creping 14-25%) yang empuk dan cepat menyerap air tanpa hancur saat diusap ke wajah.',
    imageSrc: tissueDryerYankeeImg,
    imageCaption: 'Foto Nyata Pabrik PT. PUP: Silinder Pengering Yankee berdiameter besar bertenaga steam uap panas dilengkapi tudung pemanas uap (hood) dan dudukan pisau doctor.'
  },
  {
    id: 'slide-16',
    slideNumber: 16,
    category: 'MACHINES',
    categoryLabel: 'Mesin & Peralatan',
    title: 'POPE REEL: PENGGULUNGAN JUMBO ROLL UTAMA',
    subtitle: 'Penyelesaian Tahap Akhir Mesin Kertas Menjadi Rol Induk Jumbo (JR)',
    badge: 'Foto Nyata Pabrik PT. PUP',
    keyPoints: [
      'Drum Reel Berkecepatan Sinkron: Menggulung lembaran kertas kering ke poros spool besi berputar tanpa kerutan tepi.',
      'Sistem Pergantian Otomatis (Reel Turn-up): Memotong dan mengalihkan lembaran ke spool baru saat diameter rol tercapai tanpa mematikan mesin.',
      'Diameter Gulungan Jumbo Roll: Mencapai diameter Ø 1.800 - 2.200 mm dengan bobot hingga 1.5 - 2.5 ton per rol.',
      'Pengujian Sampel Ujung Rol: Analis Lab QC mengambil contoh sobekan kertas untuk uji lab gramatur, moisture, dan tensile.'
    ],
    explanation: 'Foto nyata ini menampilkan unit Pope Reel di ujung mesin pembuat kertas tisu PT. PUP. Lembaran kertas yang telah kering sempurna digulung rapi menjadi rol raksasa atau Jumbo Roll (JR), siap diberi label barcode identitas sebelum ditransfer ke seksi Rewinder.',
    speakerNotes: 'Jelaskan bahwa operator mencatat nomor gulungan, berat bruto, dan waktu penggulungan pada logsheet shift resmi.',
    salesSpgTips: 'Jumbo Roll ini adalah produk utama yang kami pasok ke pabrik-pabrik konversi tisu dan juga kami olah sendiri menjadi produk siap pakai.',
    imageSrc: tissuePopeReelImg,
    imageCaption: 'Foto Nyata Pabrik PT. PUP: Seksi Pope Reel tempat penggulungan kontinu lembaran tisu menjadi Jumbo Roll siap doffing.'
  },
  {
    id: 'slide-17',
    slideNumber: 17,
    category: 'MACHINES',
    categoryLabel: 'Lini Mesin Pabrik',
    title: 'MESIN PM 1: CYLINDER MOULD SERBAGUNA',
    subtitle: 'Spesialis Produksi Tissue, Kertas MG HVS Putih & Kertas Doorslag',
    badge: 'Foto Nyata PM1 PT. PUP',
    keyPoints: [
      'Tipe Mesin: Cylinder Mould Vat dengan kecepatan operasi 100 - 150 mpm.',
      'Kapasitas & Lebar Kertas: Lebar kertas bersih 2,20 Meter, didukung lebar Felt 2,40 Meter (Top Felt 18,8 M & Bottom Felt 25,0 M).',
      'Portofolio Produk PM 1 (13 Item): MG HVS 18 & 21 gsm (Pink, Putih, Kuning), MG Dorslag 24 gsm (Uk. 610, 680, 910 mm), Toilet Pulp 16 & 19 gsm, Napkin Pulp 19,5 gsm.',
      'Target Produksi Standar: 2.0 - 2.5 Ton per shift kerja (6.0 - 7.5 Ton/hari).',
      'Ketahanan Kain Felt: 6 - 8 bulan dengan total tonase tembus >1.000 ton paper up.'
    ],
    explanation: 'Foto nyata ini memperlihatkan lini mesin PM 1 di pabrik PT. PUP. Mesin ini memiliki fleksibilitas tinggi untuk memproduksi kertas berkadar serat murni (Facial/Toilet pulp) maupun kertas berkekuatan tarik tinggi seperti MG HVS dan kertas doorslag.',
    speakerNotes: 'Tunjukkan letak bak silinder mould vat dan felt pembawa lembaran kertas tipis pada foto.',
    salesSpgTips: 'PM 1 adalah lini andalan kami untuk menghasilkan kertas MG HVS putih bersih yang banyak dicari industri kemasan higienis dan bakery.',
    imageSrc: pm1HeroImg,
    imageCaption: 'Foto Nyata Pabrik PT. PUP: Lini Mesin PM 1 Cylinder Mould dengan lebar kertas 2,20 M, memproduksi tissue dan MG paper kecepatan 150 mpm.'
  },
  {
    id: 'slide-18',
    slideNumber: 18,
    category: 'MACHINES',
    categoryLabel: 'Lini Mesin Pabrik',
    title: 'MESIN PM 2: CYLINDER MOULD HIGH-SPEED 180 MPM',
    subtitle: 'Spesialis Produksi Kertas MG Berwarna (Kuning & Pink) Serta Tissue Halus',
    badge: 'Foto Nyata PM2 PT. PUP',
    keyPoints: [
      'Tipe Mesin: Cylinder Mould High-Speed dengan kecepatan operasi 150 - 180 mpm.',
      'Kapasitas & Lebar Kertas: Lebar kertas bersih 2,25 Meter, lebar Felt 2,40 Meter (Top Felt 18,8 M & Bottom Felt 25,0 M).',
      'Keahlian Khusus Pewarnaan: Dilengkapi sistem injeksi pewarna ramah lingkungan untuk memproduksi MG HVS Pink dan MG HVS Kuning.',
      'Portofolio Produk PM 2 (8 Item): MG HVS 18 gsm (Pink, Putih, Kuning), MG HVS 21 gsm (Pink, Kuning), MG Dorslag 24 gsm (Uk. 610, 680, 910 mm).',
      'Daya Tahan Operasional: Dirancang untuk produksi kontinu dengan efisiensi pemerasan air tinggi.'
    ],
    explanation: 'Foto nyata ini menampilkan mesin PM 2 di pabrik PT. PUP. Keunggulan mesin ini terletak pada stabilitas kecepatan tinggi 180 mpm dan kemampuan menghasilkan kertas MG HVS berwarna cerah yang stabil dan tidak luntur saat digunakan konsumen.',
    speakerNotes: 'Jelaskan kontrol kestabilan dosis pewarna pada White Water pit agar warna lembaran di awal dan akhir shift identik.',
    salesSpgTips: 'MG Kuning dan Pink dari PM 2 sangat populer untuk kertas pembungkus khusus, nota/faktur rangkap, dan kemasan kosmetik/farmasi.',
    imageSrc: pm2HeroImg,
    imageCaption: 'Foto Nyata Pabrik PT. PUP: Lini Mesin PM 2 berkecepatan tinggi 180 mpm dengan lebar kertas 2,25 M, spesialis MG Paper warna dan tissue.'
  },
  {
    id: 'slide-19',
    slideNumber: 19,
    category: 'MACHINES',
    categoryLabel: 'Lini Mesin Pabrik',
    title: 'MESIN PM 5: LINI TOILET TISSUE KAPASITAS BESAR',
    subtitle: 'Spesialis Produksi Toilet Tissue HVS 2 Ply Ekonomis & Tahan Lama',
    badge: 'Foto Nyata PM5 PT. PUP',
    keyPoints: [
      'Tipe Mesin: Heavy-Duty Cylinder Tissue Machine dengan kestabilan gramatur prima (13, 16, 17, 19, 20, 21, 22 gsm).',
      'Lebar Potong Bervariasi: Memproduksi gulungan lebar 200 mm hingga 2.840 mm sesuai order converting.',
      'Bahan Baku Efisien: Mengolah bubur serat HVS dan virgin pulp pilihan berkualitas tinggi dengan daya serap prima.',
      'Portofolio Produk PM 5 (22 Item): Toilet HVS 1 Ply (21 gsm), Toilet HVS 2 Ply (17, 19, 20, 22 gsm), Facial Pulp (13 gsm), Toilet Pulp (16 gsm).',
      'Creeping Terstandar: 20% elastisitas untuk tekstur lembut dan daya gulung padat.'
    ],
    explanation: 'Foto nyata ini memperlihatkan lini mesin PM 5 di pabrik PT. PUP. Mesin ini menjadi tulang punggung produksi kertas toilet roll berdaya saing tinggi yang sangat diminati pasar institusi, hotel, restoran, dan rumah tangga.',
    speakerNotes: 'Tekankan bahwa meski berbahan HVS olahan, proses pencucian dan pemanasan tinggi memastikan produk bersih higienis.',
    salesSpgTips: 'Varian toilet paper PM 5 adalah senjata utama tim Sales untuk tender volume besar (Horeka & instansi) karena harganya sangat kompetitif dengan kualitas prima.',
    imageSrc: pm5HeroImg,
    imageCaption: 'Foto Nyata Pabrik PT. PUP: Lini Mesin PM 5 kapasitas besar yang memproduksi aneka ukuran Toilet Paper HVS 2 Ply.'
  },
  {
    id: 'slide-20',
    slideNumber: 20,
    category: 'MACHINES',
    categoryLabel: 'Mesin Finishing',
    title: 'SEKSI FINISHING: MESIN SLITTER REWINDER',
    subtitle: 'Pemecah Gulungan Jumbo Roll Menjadi Rol Konversi Presisi Tinggi',
    badge: 'Foto Nyata Pabrik PT. PUP',
    keyPoints: [
      'Unwind Stand: Memuat jumbo roll hingga bobot 4.5 ton dengan pengunci Core Chuck pneumatik 5.5 bar.',
      'Sistem Rem Multi-Disc: Dikontrol otomatis oleh load cell mempertahankan tegangan web konstan 160 - 200 N/m.',
      'Unit Calender Nip: Perpaduan Top Rubber Roll dan Bottom Steel Roll untuk meratakan ketebalan dan menghaluskan serat.',
      'Two-Drum Surface Winder: Drum berdiameter 400 mm beralur spiral dengan roll penekan atas (Programmed Rider Roll Relief).',
      'Doffing Hidrolik: Lengan hidrolik menurunkan gulungan jadi secara mulus ke konveyor timbang tanpa membentur lantai.'
    ],
    explanation: 'Foto nyata ini menampilkan keseluruhan stasiun kerja Mesin Slitter Rewinder di pabrik PT. PUP. Dari unwinder di belakang, lembaran kertas ditarik melewati calender dan pisau slitter berkecepatan 800 mpm, lalu tergulung rapi pada inti pipa karton (core).',
    speakerNotes: 'Jelaskan konsep TNT (Tension, Nip, Torque) yang menjaga gulungan padat di dalam tanpa menghancurkan pipa core karton.',
    salesSpgTips: 'Ketepatan ukuran potong dan kerapatan gulungan di mesin rewinder ini yang menjamin mesin converting pembeli tidak macet saat memotong tisu.',
    imageSrc: rewinderHeroImg,
    imageCaption: 'Foto Nyata Pabrik PT. PUP: Mesin Slitter Rewinder beroperasi memotong dan menggulung ulang Jumbo Roll menjadi rol konversi siap kirim.'
  },
  {
    id: 'slide-21',
    slideNumber: 21,
    category: 'MACHINES',
    categoryLabel: 'Mesin Finishing',
    title: 'DETAIL MEKANIK: PISAU SLITTER & BANANA BOWED ROLL',
    subtitle: 'Ketajaman Potongan Bebas Debu Serat & Roll Lengkung Anti-Gandeng',
    badge: 'Foto Nyata Pabrik PT. PUP',
    keyPoints: [
      'Top Slitter Blade: Pisau piringan pneumatik bersudut kemiringan (canting angle) 0.5° - 1.0° dengan overlap presisi 1.2 mm.',
      'Bottom Slitter Ring: Cincin tungsten karbida berputar motor mandiri lebih cepat 10% (over-speed 1.1x) untuk hasil potong tajam bebas serbuk debu.',
      'Trim Suction Blower: Sisa potongan pinggir kiri-kanan (trim 20-50 mm) dihisap vakum 0.45 bar menuju Broke Pulper.',
      'Banana Bowed Roll (Roll Lengkung): Poros lengkung stasioner dengan puncak lengkung (apex) 15° - 30° searah tarikan lembaran.',
      'Eliminasi Interweaving: Gaya lateral Banana Roll merentangkan pita potongan selebar 2-4 mm sehingga gulungan rol tidak pernah saling mengunci/gandeng!'
    ],
    explanation: 'Foto nyata jarak dekat ini memperlihatkan kecanggihan pisau shear-cut dan roll pisang melengkung (Banana Bowed Roll). Rahasia tepi gulungan tisu yang rata dan mudah dipisahkan saat doffing terletak pada kalibrasi presisi kedua komponen ini.',
    speakerNotes: 'Ingatkan bahaya mata pisau karbida yang sangat tajam; wajib pakai sarung tangan Kevlar level 5 saat menyetel posisi pisau.',
    salesSpgTips: 'Tepi gulungan tisu PT. PUP dipotong tegak lurus 90° tanpa serabut debu kertas, sangat higienis dan tidak membuat kotor ruangan konsumen.',
    imageSrc: rewinderPartsImg,
    imageCaption: 'Foto Nyata Pabrik PT. PUP: Detail susunan Top/Bottom Slitter shear-cut, calender roll penekan, dan Banana Bowed Roll peregang celah lembaran.'
  },

  // -------------------------------------------------------------
  // BAGIAN 4: CONTOH PRODUK KAMI & KATALOG RESMI (FOTO ASLI PRODUK)
  // -------------------------------------------------------------
  {
    id: 'slide-22',
    slideNumber: 22,
    category: 'PRODUCTS_SALES',
    categoryLabel: 'Panduan Sales & SPG',
    title: 'PANDUAN SALES & SPG: ANATOMI & KARAKTERISTIK TISU',
    subtitle: 'Istilah Kunci Spesifikasi yang Wajib Dipahami untuk Meyakinkan Calon Pembeli',
    badge: 'Edukasi Khusus Tim Penjualan',
    keyPoints: [
      '1. GRAMATUR (GSM - Gram per Square Meter): Menunjukkan bobot kertas per meter persegi. Semakin presisi GSM (toleransi ±1 gsm), semakin hemat dan konsisten pemakaiannya.',
      '2. JUMLAH PLY (Lapisan Lembar): 1 Ply = Satu lembar tebal (Napkin / MG); 2 Ply = Dua lembar disatukan agar empuk dan berdaya serap ganda (Facial / Toilet).',
      '3. TENSILE STRENGTH (Kekuatan Tarik MD/CD): Daya tahan lembaran saat ditarik. MD (Machine Direction) = searah mesin; CD (Cross Direction) = melintang mesin.',
      '4. CALIPER (Ketebalan dalam Micron): 130 µm memberikan sensasi empuk dan tebal di tangan konsumen.',
      '5. CREEPING (% Kerutan Elastis): Kerutan mikro hasil pisau Yankee (14-25%) yang memberi kelembutan dan kelenturan tisu.',
      '6. BAHAN BAKU (PULP vs HVS): Virgin Pulp = serat kayu murni alami, ekstra putih, higienis & lembut; HVS = serat olahan ekonomis berdaya serap tinggi.'
    ],
    explanation: 'Tim Sales dan SPG adalah duta utama PT. PUP di garda terdepan. Memahami istilah teknis ini secara sederhana akan meningkatkan rasa percaya diri saat menjelaskan kelebihan produk kepada pemilik toko, pengelola hotel, maupun konsumen rumah tangga.',
    speakerNotes: 'Ajak tim SPG meraba contoh sampel fisik tisu 13 GSM 2 Ply dibandingkan 19 GSM untuk merasakan perbedaan teksturnya.',
    salesSpgTips: 'Jangan gunakan istilah rumit ke pembeli awam; terjemahkan: "Gramatur pas artinya tidak gampang sobek", "2 Ply artinya dua rangkap lebih menyerap", "Pulp murni artinya tidak bikin iritasi kulit bayi".',
    highlightBox: {
      title: 'Kamus Cepat untuk SPG',
      text: '• "Apakah tisunya rontok berdebu?" -> Jawab: Tidak, karena dipotong pisau shear-cut karbida presisi dan melalui blower vakum pembersih serbuk debu.',
      theme: 'indigo'
    }
  },
  {
    id: 'slide-23',
    slideNumber: 23,
    category: 'PRODUCTS_SALES',
    categoryLabel: 'Contoh Produk Kami',
    title: 'CONTOH PRODUK KAMI: TRENDY FACIAL TISSUE 2 PLY',
    subtitle: 'Kelembutan Sutra 100% Virgin Pulp untuk Wajah, Kulit Sensitif & Bayi',
    badge: 'Contoh Produk Jadi PT. PUP',
    imageSrc: trendyFacialImg,
    imageCaption: 'Foto Contoh Produk Kami: Kemasan Trendy Facial Tissue 2-Ply 100% Virgin Pulp (13 GSM, Creeping 14%) kemasan softpack & box higienis.',
    keyPoints: [
      'Merek Resmi: TRENDY Facial Tissue (Kategori Consumer Goods / Retail Jadi).',
      'Bahan Baku: 100% Virgin Pulp (Serat kayu murni alami pilihan tanpa pemutih fluoresen berbahaya / Non-OBA).',
      'Spesifikasi Teknis: Gramatur 13.0 gsm (±1 gsm), 2 Ply (Dua Rangkap), Ketebalan 130 Micron, Creeping 14% Micro-embossed.',
      'Kekuatan Tarik: Tensile MD 500 N/m, Tensile CD 200 N/m (Sangat kuat saat basah menyerap keringat dan tidak mudah robek di wajah).',
      'Pilihan Format Kemasan: Softpack 200s/250s ekonomis praktis, Travel Pack saku, dan Tissue Box dispenser meja ruang tamu/kantor.',
      'Jumbo Roll Asal: Mesin PM 5 Ukuran lebar 720 mm (Kode Barang Resmi Baru: 60.B.12.2.13.0720).'
    ],
    explanation: 'Trendy Facial Tissue PT. PUP diformulasikan untuk segmen pengguna yang mengutamakan kelembutan alami dan keamanan kulit. Formasi seratnya yang halus dan padat memberikan sensasi sentuhan sutra tanpa menimbulkan iritasi, sangat cocok untuk pembersih riasan wajah maupun kulit bayi.',
    speakerNotes: 'Tunjukkan kemasan softpack Trendy Facial Tissue kepada audiens. Kode barang resmi baru: 60.B.12.2.13.0720.',
    salesSpgTips: 'Selling point ke konsumen: "Trendy Facial Tissue terbuat dari serat kayu murni 100% yang sangat lembut untuk kulit wajah dan bayi, tidak menyebabkan alergi, dan tidak meninggalkan serbuk debu saat diseka."',
    tableData: {
      headers: ['Parameter Spesifikasi', 'Standar Nilai', 'Manfaat Nyata Konsumen'],
      rows: [
        ['Gramatur', '13.0 ± 1.0 GSM', 'Ringan namun tidak tipis menerawang'],
        ['Jumlah Lapisan', '2 Ply (Dua Lembar)', 'Daya tampung serap cairan dua kali lipat'],
        ['Bahan Baku', '100% Virgin Pulp Murni', 'Hipoalergenik, aman untuk kulit bayi & sensitif'],
        ['Kekuatan Tarik (Tensile)', 'MD 500 / CD 200', 'Tidak sobek saat mengusap keringat atau make up'],
        ['Kelembutan Permukaan', 'Creeping 14% Micro-emboss', 'Terasa halus seperti sentuhan sutra']
      ]
    }
  },
  {
    id: 'slide-24',
    slideNumber: 24,
    category: 'PRODUCTS_SALES',
    categoryLabel: 'Contoh Produk Kami',
    title: 'CONTOH PRODUK KAMI: SOFTO NAPKIN TISSUE 1 PLY',
    subtitle: 'Tisu Meja Makan Restoran: Tahan Lemak Minyak, Kuat & Food Grade',
    badge: 'Contoh Produk Jadi PT. PUP',
    imageSrc: softoNapkinImg,
    imageCaption: 'Foto Contoh Produk Kami: Kemasan & display Softo Napkin tissue meja makan restoran bertekstur timbul emboss food-grade.',
    keyPoints: [
      'Merek Resmi: SOFTO Napkin Tissue (Kategori Food & Beverage / Horeka Specialist).',
      'Bahan Baku: 100% Virgin Pulp Higienis bersertifikasi Food Contact Safe (Aman bersentuhan langsung dengan makanan).',
      'Spesifikasi Teknis: Gramatur 19.5 gsm (±1 gsm), 1 Ply Lembaran Tebal Mantap, Ketebalan 130 Micron, Creeping 15%.',
      'Kekuatan Serap Maksimal: Tensile MD 500 N/m, CD 200 N/m (Menyerap minyak gorengan dan kuah bumbu kental seketika tanpa hancur).',
      'Tekstur Khusus: Pola emboss tepi eksklusif yang menambah kemewahan meja makan hotel & restoran.',
      'Pilihan Format: Lipat 1/4 (Cocktail/Dinner Napkin) dan Pop-Up Dispenser.',
      'Jumbo Roll Asal: Mesin PM 1 Lebar 215 mm (Kode Barang Resmi Baru: 60.B.41.2.19.0215).'
    ],
    explanation: 'Softo Napkin Tissue hadir sebagai solusi terbaik bagi bisnis kuliner yang mengedepankan kepuasan pelanggan dan efisiensi biaya. Lembarannya yang tebal 19.5 GSM memiliki kapasitas hisap minyak dan saus yang luar biasa, sehingga tamu cukup menggunakan sedikit lembaran.',
    speakerNotes: 'Sebutkan kode barang resmi baru: 60.B.41.2.19.0215 (Napkin Pulp 1 Ply Putih 19,5 gsm Uk. 0215 mm B).',
    salesSpgTips: 'Tawaran hemat ke pengusaha kuliner: "Karena Softo Napkin jauh lebih tebal dan berdaya serap tinggi, tamu restoran cukup memakai 1 lembar saja. Restoran Anda menghemat biaya pemakaian tisu hingga 30%!"',
    highlightBox: {
      title: 'Keunggulan Softo Napkin 19.5 GSM PT. PUP',
      text: 'Menyerap minyak dan kuah seketika tanpa sobek • Permukaan timbul (embossed) eksklusif mempercantik meja makan • Tidak berbau apek • Food Grade Safe.',
      theme: 'amber'
    }
  },
  {
    id: 'slide-25',
    slideNumber: 25,
    category: 'PRODUCTS_SALES',
    categoryLabel: 'Contoh Produk Kami',
    title: 'CONTOH PRODUK KAMI: BATHROOM & TOILET TISSUE 2 PLY',
    subtitle: 'Rol Tisu Toilet Ekstra Lembut, Higienis & Ramah Saluran Air (Septic Safe)',
    badge: 'Contoh Produk Jadi PT. PUP',
    imageSrc: pupToiletImg,
    imageCaption: 'Foto Contoh Produk Kami: Bathroom Toilet Tissue Roll 2 Ply kemasan multi-pack dan roll individu dengan daya larut air cepat (Septic Safe).',
    keyPoints: [
      'Kategori Produk: Bathroom Toilet Tissue Rolls (Tersedia Seri Premium Virgin Pulp PM 1 & Seri Ekonomis HVS PM 5).',
      'Seri Premium Pulp (PM 1 & PM 5): Gramatur 16.0 & 19.0 gsm, Creeping 25%, Tensile MD 300 / CD 200, gulungan bervolume empuk.',
      'Seri Ekonomis HVS (PM 5): Gramatur 17.0, 19.0, 20.0, 21.0 & 22.0 gsm, Creeping 18-20%, Tensile MD 300-400 / CD 150-200, efisiensi biaya luar biasa.',
      'Septic Tank Safe (Flushable): Cepat terurai dan hancur di dalam air kloset sehingga menjamin saluran pipa bebas mampet.',
      'Pilihan Kemasan: Multi-pack isi 4/6/10 roll dalam polybag transparan rapi dan kemasan rol satuan berbalut kertas untuk hotel.',
      'Pilihan JR PM5 Lengkap: Ukuran lebar 200, 355, 360, 365, 366, 800, 1067, 1070, 1100, 1400, 1440, 1600, 2135, 2200, 2840 mm.'
    ],
    explanation: 'Kami menyediakan dua opsi toilet paper untuk menjawab ragam kebutuhan pasar: Seri Virgin Pulp untuk kenyamanan hotel bintang 4-5 dan perumahan modern, serta Seri HVS ekonomis untuk gedung perkantoran, pusat perbelanjaan, dan fasilitas umum dengan volume pemakaian masif.',
    speakerNotes: 'Jelaskan bahwa varian toilet paper PT. PUP memiliki kode resmi baru terlengkap di PM5 dari ukuran 200 mm hingga 2840 mm.',
    salesSpgTips: 'Selling point ke purchasing hotel/apartemen: "Toilet tissue PT. PUP menggabungkan kelembutan 2 Ply yang disukai tamu dan sertifikasi cepat larut air (dispersible) yang mencegah biaya perawatan pipa saluran air membengkak."',
    highlightBox: {
      title: 'Selling Point Utama Toilet Paper PT. PUP',
      text: '• Ramah Sanitasi (Septic Safe): Cepat terurai dalam air, terbukti mencegah pipa toilet mampet • Bebas Pewangi Kimia Menyengat • Daya Gulung Padat',
      theme: 'emerald'
    }
  },
  {
    id: 'slide-26',
    slideNumber: 26,
    category: 'PRODUCTS_SALES',
    categoryLabel: 'Contoh Produk Kami',
    title: 'CONTOH PRODUK KAMI: MG HVS PAPER (PUTIH, KUNING & PINK)',
    subtitle: 'Kertas Kemasan Mengkilap Satu Sisi untuk Food Wrapping, Garmen & Industri',
    badge: 'Contoh Produk Jadi PT. PUP',
    imageSrc: mgPaperColorsImg,
    imageCaption: 'Foto Contoh Produk Kami: Kertas MG HVS (Machine Glazed) 18 & 21 GSM dalam 3 pilihan warna cerah (Putih, Kuning, Pink) dengan kilau satu sisi.',
    keyPoints: [
      'Karakteristik Machine Glazed: Satu sisi mengkilap licin hasil poles silinder Yankee (menahan minyak/uap air), satu sisi doff menyerap lem.',
      'Spesifikasi Teknis: Gramatur 18.0 & 21.0 gsm (±1 gsm), 1 Ply, Ketebalan 50-55 Micron (0.05-0.055 mm), Creeping (-).',
      'Kekuatan Tarik Luar Biasa: Tensile MD 1200 - 1600 N/m, Tensile CD 500 - 650 N/m (Sangat kuat dan tidak mudah putus pada mesin wrapping otomatis).',
      'Tiga Varian Warna Lengkap Sesuai Kode Resmi Baru:',
      '  • MG Putih (PM 1 & PM 2): 18 gsm (Uk. 264 & 275 mm A), 21 gsm (Uk. 275 mm B).',
      '  • MG Kuning (PM 1 & PM 2): 18 gsm (Uk. 275 mm A), 21 gsm (Uk. 275 mm B).',
      '  • MG Pink (PM 1 & PM 2): 18 gsm (Uk. 275 mm A), 21 gsm (Uk. 275 mm B).'
    ],
    explanation: 'Kertas MG HVS kami menjadi standar industri untuk pembungkus makanan (roti, burger), alas obat farmasi, pelapis kerah baju kemeja ekspor, hingga pembungkus buah segar ekspor. Sisi mengkilapnya berfungsi menahan kelembaban dan memberi tampilan mewah.',
    speakerNotes: 'Jelaskan bahwa kekuatan tarik MG HVS mencapai 1500-1600 N/m, hampir 3 kali lipat lebih kuat daripada tisu biasa.',
    salesSpgTips: 'Target pasar empuk: Toko bakery (pembungkus roti tidak lengket), konveksi pakaian ekspor (pelapis kerah & kemasan baju), dan industri percetakan form berkarbon.',
    tableData: {
      headers: ['Varian Warna', 'Kode Barang Baru', 'Aplikasi Populer di Pasar'],
      rows: [
        ['MG Putih Uk. 275 mm A', '60.A.61.2.18.0275', 'Pembungkus roti/kue, kertas doorslag, packaging sepatu/tas'],
        ['MG Putih Uk. 264 mm A', '60.A.61.2.18.0264', 'Bungkus kemeja garmen, pelapis packaging tekstil ekspor'],
        ['MG Putih Uk. 275 mm B (21 gsm)', '60.B.61.2.21.0275', 'Kemasan ekstra kuat, pelapis industri & packaging'],
        ['MG Kuning Uk. 275 mm A', '60.A.61.3.18.0275', 'Pembungkus kado mewah, nota/dokumen khusus, wrapping keramik'],
        ['MG Kuning Uk. 275 mm B (21 gsm)', '60.B.61.3.21.0275', 'Kertas laminasi foil, pembungkus makanan tradisional'],
        ['MG Pink Uk. 275 mm A', '60.A.61.1.18.0275', 'Kemasan kosmetik/farmasi, florist bunga, handicraft'],
        ['MG Pink Uk. 275 mm B (21 gsm)', '60.B.61.1.21.0275', 'Packaging kado premium, wrapping pakaian wanita']
      ]
    }
  },
  {
    id: 'slide-27',
    slideNumber: 27,
    category: 'PRODUCTS_SALES',
    categoryLabel: 'Contoh Produk Kami',
    title: 'CONTOH PRODUK KAMI: JUMBO ROLL (PARENT REEL) PT. PUP',
    subtitle: 'Pasokan Bahan Baku Rol Raksasa untuk Pabrik Konversi Kertas Tisu Nasional',
    badge: 'Contoh Produk Utama PT. PUP',
    imageSrc: pupJumboRollsImg,
    imageCaption: 'Foto Contoh Produk Kami: Gudang Jumbo Roll (Parent Reel) PT. PUP dengan bobot 1.5 - 2.5 ton per rol, siap kirim ke mitra konversi.',
    keyPoints: [
      'Kapasitas Pasokan Tinggi: Didukung 3 lini mesin pembuat kertas (PM 1, PM 2, dan PM 5) beroperasi 24 jam nonstop.',
      'Standar Diameter Rol: Ø 1.800 mm - 2.200 mm dengan bobot 1.500 kg - 2.500 kg per Jumbo Roll.',
      'Variasi Lebar Potong: Dipotong presisi menggunakan Mesin Slitter Rewinder mulai lebar 200 mm hingga 2.200 mm.',
      'Integritas Gulungan (TNT): Kerapatan gulungan padat merata, tanpa celah kendur, dan menggunakan pipa karton (core) tebal 3 inch kokoh.',
      'Ketertelusuran Barcode: Setiap rol memiliki nomor lot produksi, nomor reel, tanggal jam produksi, dan paraf QC lulus uji.'
    ],
    explanation: 'Sebagai pabrik manufaktur hulu terintegrasi, PT. PUP menyuplai ribuan ton Jumbo Roll setiap bulan ke berbagai pabrik konversi tisu di seluruh Indonesia. Keunggulan kami adalah konsistensi profil gramatur dari pangkal hingga ujung gulungan.',
    speakerNotes: 'Tekankan bahwa Jumbo Roll kami diproduksi dengan kontrol ketat sehingga tidak menyulitkan operator mesin converting pembeli.',
    salesSpgTips: 'Keuntungan bagi pabrik converting pembeli: "Jumbo Roll PT. PUP memiliki toleransi gramatur seragam dan bebas putus web, menjamin efisiensi mesin converting Anda berjalan pada kecepatan maksimal."',
    highlightBox: {
      title: 'Spesifikasi Inti Core Jumbo Roll',
      text: '• Core Karton Tebal: 3 Inch / 76 mm • Bebas Remuk Saat Dijepit Clamp Forklift • Stiker Kode Barang Lengkap dengan Berat Netto & Bruto',
      theme: 'blue'
    }
  },
  {
    id: 'slide-28',
    slideNumber: 28,
    category: 'SPECS_DATA',
    categoryLabel: 'Master Data Spesifikasi',
    title: 'TABEL SPESIFIKASI LENGKAP PRODUK JUMBO ROLL PT. PUP',
    subtitle: 'Rangkuman Parameter Teknis 43 Item Produk Mesin PM1 (13 Item), PM2 (8 Item), dan PM5 (22 Item)',
    badge: 'Master Data Produk Resmi Baru',
    keyPoints: [
      'Total 43 Item Produk Resmi Baru: 13 Item di PM 1, 8 Item di PM 2, dan 22 Item di PM 5.',
      'Kode Produk Resmi Terbaru: Menggantikan seluruh data kode lama sesuai ketetapan manajemen pabrik PT. PUP.',
      'Kerapatan Toleransi Ketat: Seluruh varian memiliki batas toleransi gramatur baku ±1.0 GSM.',
      'Ketebalan Terkalibrasi: Produk Tissue 130–140 µm (0.13–0.14 mm) dan Produk MG Paper / Dorslag 50–60 µm (0.05–0.06 mm).',
      'Kemudahan Integrasi Pemesanan: Setiap produk memiliki nomor kode unik terstandarisasi untuk penelusuran surat jalan, logsheet shift, dan sistem ERP.'
    ],
    explanation: 'Tabel master ini merupakan acuan operasional bagi operator mesin, bagian laboratorium QC dalam memverifikasi hasil uji shift, serta pedoman tim Sales dalam menyusun penawaran harga resmi (Quotation) kepada mitra bisnis.',
    speakerNotes: 'Tunjukkan cara membaca kode barang resmi baru, misal angka 18 pada kode 60.A.61.1.18.0275 menunjukkan 18 GSM dan 0275 menunjukkan lebar 275 mm grade A.',
    salesSpgTips: 'Simpan tabel ini di ponsel atau katalog kerja Anda agar dapat menjawab pertanyaan spesifikasi dari klien dalam hitungan detik.',
    tableData: {
      headers: ['Mesin', 'Item Barang', 'Kode Barang Baru', 'GSM', 'Tensile MD/CD', 'Bahan'],
      rows: [
        ['PM1', 'Mg HVS 1 Ply Pink 18 gsm Uk. 0275 mm A', '60.A.61.1.18.0275', '18.0 ±1', '1200-1500 / 500-600', 'HVS'],
        ['PM1', 'Mg Dorslag 1 Ply Putih 24 gsm Uk. 0610 mm A', '60.A.61.2.24.0610', '24.0 ±1', '1400-1600 / 550-650', 'HVS'],
        ['PM1', 'Toilet Pulp 2 Ply Putih 16 gsm Uk. 2200 mm B', '60.B.22.2.16.2200', '16.0 ±1', '300 / 200', 'PULP'],
        ['PM1', 'Napkin Pulp 1 Ply Putih 19,5 gsm Uk. 0215 mm B', '60.B.41.2.19.0215', '19.5 ±1', '500 / 200', 'PULP'],
        ['PM2', 'Mg HVS 1 Ply Kuning 18 gsm Uk. 0275 mm A', '60.A.61.3.18.0275', '18.0 ±1', '1200-1500 / 500-600', 'HVS'],
        ['PM2', 'Mg HVS 1 Ply Pink 21 gsm Uk. 0275 mm B', '60.B.61.1.21.0275', '21.0 ±1', '1300-1600 / 550-650', 'HVS'],
        ['PM5', 'Toilet HVS 1 Ply Putih 21 gsm Uk. 0365 mm A', '60.A.81.2.21.0365', '21.0 ±1', '350-400 / 160-200', 'HVS'],
        ['PM5', 'Toilet HVS 2 Ply Putih 17 gsm Uk. 0200 mm A', '60.A.82.2.17.0200', '17.0 ±1', '300-350 / 150-180', 'HVS'],
        ['PM5', 'Facial Pulp 2 Ply Putih 13 gsm Uk. 0720 mm B', '60.B.12.2.13.0720', '13.0 ±1', '500 / 200', 'PULP'],
        ['PM5', 'Toilet HVS 2 Ply Putih 22 gsm Uk. 2200 mm B', '60.B.82.2.22.2200', '22.0 ±1', '350-400 / 170-200', 'HVS']
      ]
    }
  },
  {
    id: 'slide-29',
    slideNumber: 29,
    category: 'QUALITY_MANAGEMENT',
    categoryLabel: 'Keunggulan Mutu',
    title: 'KEUNGGULAN KOMPETITIF PRODUK PT. PUP (SELLING POINTS)',
    subtitle: 'Mengapa Konsumen & Industri Lebih Memilih Produk Kami Dibanding Kompetitor',
    badge: 'Keunggulan Bersaing',
    keyPoints: [
      '1. KELEMBUTAN ALAMI TANPA OBA: Terbuat dari serat virgin murni tanpa pemutih fluoresen berbahaya, aman jika bersentuhan dengan makanan dan kulit sensitif.',
      '2. DAYA SERAP CEPAT & TINGGI: Struktur pori mikro creping mengunci cairan seketika, menghemat pemakaian lembaran tisu.',
      '3. TIDAK BERDEBU & TIDAK RONTOK: Dipotong dengan teknologi Circular Shear-Cut karbida dan hisapan vakum, menjamin bebas debu serbuk.',
      '4. KONSISTENSI GRAMATUR & UKURAN: Diproduksi di bawah sistem kontrol DCS dan audit ISO 9001:2015 sehingga tidak ada variasi ketebalan antar gulungan.',
      '5. PASOKAN PASTI & KETEPATAN KIRIM (OTIF): Didukung 3 lini Paper Machine (PM1, PM2, PM5) yang siap menjamin kesinambungan pasokan tanpa putus.',
      '6. HARGA PABRIK KOMPETITIF: Efisiensi biaya produksi internal memungkinkan kami memberikan harga langsung dari pabrik yang menguntungkan distributor.'
    ],
    explanation: 'Keenam keunggulan kompetitif ini merupakan kekuatan utama yang harus selalu dikomunikasikan oleh tim Sales dan SPG. Ketika konsumen membandingkan tisu PT. PUP dengan merek lain di pasaran, kualitas serat murni, higienitas, dan kekuatan tarik kami terbukti unggul nyata.',
    speakerNotes: 'Minta perwakilan SPG mempraktikkan simulasi menjawab keluhan calon pembeli yang membandingkan harga dengan produk daur ulang murah.',
    salesSpgTips: 'Kunci closing order: Tunjukkan bahwa biaya tisu bukan dihitung dari harga per rol, melainkan dari efisiensi pemakaian. Karena tisu kita menyerap lebih banyak, pemakai cukup mengambil sedikit!',
    highlightBox: {
      title: 'Slogan Promosi untuk Sales & SPG',
      text: '"Tisu Halus, Kuat, dan Higienis — Pilihan Cerdas untuk Keluarga Sehat dan Usaha Anda!"',
      theme: 'blue'
    }
  },
  {
    id: 'slide-30',
    slideNumber: 30,
    category: 'QUALITY_MANAGEMENT',
    categoryLabel: 'Jaminan Mutu',
    title: 'PENGENDALIAN MUTU & PENANGANAN KELUHAN (QUALITY DAY)',
    subtitle: 'Penerapan Kaizen, Six Sigma, CPAR & Forum Mutu Dua Mingguan',
    badge: 'Standar ISO 9001:2015',
    keyPoints: [
      'Inspeksi Tiga Lapis: 1. Uji Penerimaan Bal Pulp Masuk • 2. Kontrol Parameter Tiap Jam di Mesin PM • 3. Uji Akhir Jumbo Roll & Gulungan Jadi.',
      'Forum Quality Day Berkala: Dilakukan rutin setiap 2 minggu dipimpin Bagian QC untuk mengevaluasi laporan penyimpangan (LP).',
      'Metode 5-Why Analysis: Menggali akar permasalahan hingga ke penyebab terdalam tanpa budaya saling menyalahkan.',
      'Penerbitan CPAR (Corrective Action): Tindakan korektif dan pencegahan terstandarisasi agar keluhan yang sama tidak pernah berulang.',
      'Jaminan Retur / Penggantian Cepat: Bukti komitmen Customer Delight jika ditemukan ketidaksesuaian spesifikasi di pihak pelanggan.'
    ],
    explanation: 'Kualitas di PT. PUP bukan hanya urusan tim QC, melainkan tanggung jawab bersama seluruh karyawan. Jika terjadi cacat produksi (kerut, bintik noda, atau gramatur melenceng), produk langsung ditahan (Hold/Reject) di pabrik dan tidak akan pernah dikirimkan ke pelanggan.',
    speakerNotes: 'Tekankan bahwa setiap keluhan pelanggan adalah peluang emas untuk melakukan perbaikan Kaizen yang lebih baik.',
    salesSpgTips: 'Yakinkan mitra bisnis bahwa PT. PUP memiliki garansi penggantian produk cepat (Fast Response) jika terjadi kendala teknis pada gulungan jumbo roll.',
    highlightBox: {
      title: 'Komitmen Kualitas Tanpa Kompromi',
      text: 'Tidak ada produk cacat yang keluar dari gerbang pabrik PT. PUP. Mutu adalah harga diri dan kelangsungan hidup perusahaan kita bersama.',
      theme: 'emerald'
    }
  },
  {
    id: 'slide-31',
    slideNumber: 31,
    category: 'PROFILE',
    categoryLabel: 'Penutup & Komitmen',
    title: 'PENUTUP & PESAN KEPEMIMPINAN KEPALA PABRIK',
    subtitle: 'Satu Tekad, Satu Standar, Melangkah Maju Bersama PT. PUP',
    badge: 'Pesan Kepala Pabrik',
    keyPoints: [
      'Materi pelatihan dan orientasi ini adalah milik kita bersama: silakan disalin, dipelajari, dipresentasikan, dan dibagikan ke seluruh tim.',
      'Untuk Operator & Teknisi: Jadikan SOP, K3, dan 5R sebagai nafas kerja harian di setiap detik shift Anda.',
      'Untuk Bagian QC & PPIC: Jaga integritas pengujian dan ketepatan alur pesanan agar kepercayaan pasar terus bertumbuh.',
      'Untuk Tim Sales & SPG: Bawalah nama PT. PUP dengan bangga, sampaikan keunggulan produk kita dengan percaya diri kepada pelanggan.',
      'Selamat Bekerja, Mengabdi, dan Berkarya untuk Kemajuan Bersama PT. Panca Usahatama Paramita!'
    ],
    explanation: 'Terima kasih atas perhatian dan dedikasi seluruh rekan-rekan insan PT. PUP. Melalui pemahaman yang utuh mengenai profil perusahaan, alur operasional permesinan, dan keunggulan produk kita, kita optimis PT. PUP akan terus bertumbuh menjadi pemimpin pasar industri kertas tisu di Indonesia.',
    speakerNotes: 'Tutup presentasi dengan memberikan apresiasi kepada seluruh peserta pelatihan dan membuka sesi tanya jawab interaktif.',
    salesSpgTips: 'Download file PowerPoint (.pptx) ini melalui tombol di atas untuk Anda gunakan saat presentasi resmi ke calon mitra agen atau pembeli besar.',
    highlightBox: {
      title: 'Tanda Tangan Otorisasi Resmi',
      text: 'Disahkan oleh: Kelik Heriyono — Kepala Pabrik PT. PANCA USAHATAMA PARAMITA (PT. PUP)\n"Together We Achieve Excellence!"',
      theme: 'amber'
    }
  }
];

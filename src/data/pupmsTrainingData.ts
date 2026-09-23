/**
 * DATA MATERI TRAINING SISTEM MANAJEMEN PT. PANCA USAHATAMA PARAMITA
 * Berdasarkan Dokumen Resmi: PUPMS (Panca Usahatama Paramita Management System)
 * Disusun Secara Sistematis, Terstruktur, Lengkap & Mudah Dipahami Semua Tingkatan Karyawan
 */

export interface PupmsChapter {
  id: string;
  number: number;
  title: string;
  badge: string;
  summary: string;
  iconName: string;
  keyPoints: string[];
  contentSections: {
    heading: string;
    subheading?: string;
    simpleExplanation?: string; // Arti sederhana ramah semua orang
    details: string[];
    tableData?: {
      headers: string[];
      rows: string[][];
    };
    diagramInfo?: {
      type: string;
      description: string;
      steps: string[];
    };
    callout?: {
      title: string;
      text: string;
      type: 'info' | 'warning' | 'success' | 'tip';
    };
  }[];
}

export interface PupmsQuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const PUPMS_METADATA = {
  title: 'PUPMS (Panca Usahatama Paramita Management System)',
  organization: 'PT. Panca Usahatama Paramita (PT. PUP)',
  leader: 'Kelik Heriyono (Kepala Pabrik)',
  version: 'Edisi Standar Operasional & Pelatihan Terpadu',
  totalPilars: 4,
  coreValues: '5C (Caring, Credible, Competent, Competitive, Customer Delight)',
  scope: 'Seluruh Divisi Produksi Tissue Paper Mill (PM1, PM2, PM5), Converting, Maintenance, QC, PPIC, Gudang, & Supporting.'
};

export const PUPMS_CHAPTERS: PupmsChapter[] = [
  // BAB 1: PENGENALAN & RUMAH PUPMS
  {
    id: 'intro',
    number: 1,
    title: 'Pengenalan & 4 Pilar Utama PUPMS',
    badge: 'Pondasi Manajemen',
    summary: 'Memahami apa itu PUPMS, mengapa diterapkan di PT. PUP, dan filosofi 4 Pilar Bangunan Sistem Manajemen.',
    iconName: 'Building2',
    keyPoints: [
      'PUPMS mengikutsertakan seluruh karyawan vertikal (atasan ke bawahan) dan horizontal (antar departemen).',
      'Memiliki 3 tujuan strategis: Pedoman kerja baku, Penyelarasan sasaran hingga ke individu, dan Penyediaan alat bantu kerja (tools).',
      'Pola kerja berlandaskan siklus PDCA (Plan - Do - Check - Action).'
    ],
    contentSections: [
      {
        heading: '1. Apa itu PUPMS?',
        subheading: 'Panca Usahatama Paramita Management System',
        simpleExplanation: 'PUPMS adalah cara kerja bersama di PT. PUP agar semua orang kompak, dari operator mesin sampai pimpinan, memakai aturan dan alat yang sama untuk menghasilkan produk bermutu tinggi yang disukai pelanggan dan membuat perusahaan terus maju.',
        details: [
          'PUPMS adalah sistem manajemen terpadu yang mengikutsertakan seluruh jajaran karyawan secara vertikal (Top Management hingga Operator & Helper) dan horizontal (antar departemen: PM, Converting, Maintenance, QC, PPIC, Gudang, HR, GA).',
          'Tujuan utamanya adalah menerapkan metode-metode baku untuk mengelola dan meningkatkan mutu proses bisnis demi tercapainya Kepuasan Pelanggan (Customer Satisfaction) dan Daya Saing Perusahaan yang unggul.'
        ]
      },
      {
        heading: '2. Mengapa PUPMS Diterapkan? (3 Tujuan Pokok)',
        simpleExplanation: 'Supaya kita punya buku panduan yang jelas, tahu apa tugas harian kita untuk mendukung target perusahaan, dan dibekali alat bantu kerja yang lengkap.',
        details: [
          '1. Memberikan Pedoman Produksi: Menyediakan manual sistem manajemen operasional yang baku dan seragam untuk masing-masing bagian.',
          '2. Penyelarasan Strategi & Sasaran: Menghubungkan strategi besar PT. PUP menjadi Rencana Kinerja Karyawan (RKK) dan tindakan harian nyata setiap individu di shift kerja.',
          '3. Penyediaan Alat Bantu Kerja: Memfasilitasi karyawan dengan berbagai tools teruji, SOP terstruktur, perlengkapan sarana-prasarana, dan panduan teknis pemecahan masalah.'
        ]
      },
      {
        heading: '3. Filosofi Bangunan "4 Pilar Dasar PUPMS"',
        subheading: 'Arsitektur Rumah Keberlanjutan PT. PUP',
        simpleExplanation: 'Ibarat sebuah bangunan pabrik yang kokoh: Atapnya adalah Tujuan Perusahaan, Tiang penyangganya ada 3 (Mentalitas, Strategi, Operasi), dan Pondasi dasarnya adalah Pemberdaya.',
        details: [
          'Pilar 1 - MENTALITAS DASAR: Karakter dan sikap kerja insan PT. PUP yang berlandaskan nilai 5C (Caring, Credible, Competent, Competitive, Customer Delight).',
          'Pilar 2 - MANAJEMEN STRATEGI: Penentuan arah kebijakan, perumusan target (BSC), penyesuaian organisasi, dan pengendalian evaluasi (BPR, BPE, Progress Review).',
          'Pilar 3 - MANAJEMEN OPERASI (TOOL): Transformasi bahan baku menjadi barang berkualitas prima berstandar ISO 9001:2015 dengan perlengkapan Continuous Improvement (Horenso, 5R, TPM, Kaizen, Six Sigma, 7 Tools, Sampling MIL-STD).',
          'Pilar 4 - PEMBERDAYA (ENABLER): Pondasi penopang yang memastikan seluruh pilar hidup melalui Komitmen, Penyelarasan, Bimbingan Monitoring, dan Dukungan Perubahan.'
        ],
        diagramInfo: {
          type: 'Arsitektur Rumah PUPMS',
          description: 'Model Integrasi 4 Pilar',
          steps: [
            'ATAP: Visi, Misi & Kepuasan Pelanggan PT. PUP',
            'TIANG 1 (KIRI): Mentalitas Dasar (5C)',
            'TIANG 2 (TENGAH): Manajemen Strategi (PDCA & BSC)',
            'TIANG 3 (KANAN): Manajemen Operasi (ISO 9001 & Productivity Tools)',
            'PONDASI BAWAH: Pemberdaya (Commitment, Alignment, Support, Monitoring)'
          ]
        }
      }
    ]
  },

  // BAB 2: PILAR 1 - MENTALITAS DASAR (5C)
  {
    id: 'pilar1',
    number: 2,
    title: 'Pilar 1: Mentalitas Dasar (Nilai Budaya 5C)',
    badge: 'Budaya & Karakter',
    summary: 'Menanamkan 5 karakter inti setiap karyawan: Caring, Credible, Competent, Competitive, dan Customer Delight.',
    iconName: 'HeartHandshake',
    keyPoints: [
      '5C adalah kompas perilaku harian seluruh karyawan PT. PUP dalam bertindak dan mengambil keputusan.',
      'Bukan sekadar slogan, melainkan tercermin dalam disiplin kerja, serah terima shift, dan kerjasama antar bagian.',
      'Menjadi landasan pembentukan tim kerja yang solid, aman, dan berintegritas tinggi.'
    ],
    contentSections: [
      {
        heading: '1. CARING (Peduli Terhadap Sesama, Pekerjaan & Lingkungan)',
        simpleExplanation: 'Artinya kita tidak cuek. Kita saling peduli antar teman kerja, menjaga keselamatan bersama, merawat mesin tempat kita mencari nafkah, dan menjaga kebersihan lingkungan pabrik.',
        details: [
          'Definisi: Sikap proaktif, berfikir positif, tanggap, empatik, siap membantu rekan kerja dengan tulus, serta mengapresiasi secara fair.',
          'Wujud Nyata di Lapangan: Membantu rekan saat penarikan kertas/tail threading, saling mengingatkan APD keselamatan (K3), tidak membeda-bedakan suku/agama/gender, dan peduli kebersihan area mesin.'
        ]
      },
      {
        heading: '2. CREDIBLE (Dapat Dipercaya & Diandalkan)',
        simpleExplanation: 'Artinya kata-kata kita bisa dipegang. Apa yang kita tulis di logsheet shift adalah kondisi yang sebenarnya (jujur), tidak menutupi kerusakan, dan selalu menepati janji komitmen.',
        details: [
          'Definisi: Nilai yang muncul dari kesatuan pikiran, kata, dan tindakan. Tampak dari sikap jujur, fair, menepati janji, disiplin waktu, konsisten, dan beretika bisnis baik.',
          'Wujud Nyata di Lapangan: Mengisi logsheet parameter produksi secara akurat tanpa manipulasi, hadir tepat waktu sebelum shift dimulai, mematuhi SOP tanpa harus diawasi, dan loyal menjaga rahasia serta nama baik PT. PUP.'
        ]
      },
      {
        heading: '3. COMPETENT (Cakap & Terampil di Bidangnya)',
        simpleExplanation: 'Artinya kita benar-benar menguasai mesin atau pekerjaan kita, tahu apa yang harus dilakukan jika terjadi kendala, bekerja tuntas tanpa menunda, dan terus belajar hal baru.',
        details: [
          'Definisi: Sikap profesional yang cakap (capable) dan terampil (skillful) melalui cara kerja efisien, efektif, tuntas, tegas, serta bijaksana mengikuti perkembangan teknologi.',
          'Wujud Nyata di Lapangan: Mampu menyetel parameter gramatur/caliper dengan presisi, paham fungsi indikator DCS & pompa stock prep, aktif mengikuti training berkala, serta menjadi penggerak perbaikan di lini kerja.'
        ]
      },
      {
        heading: '4. COMPETITIVE (Terdorong Menjadi yang Terunggul)',
        simpleExplanation: 'Artinya kita punya semangat pantang menyerah untuk menghasilkan tonase dan kualitas terbaik, bergerak cepat, dan selalu mencari cara agar kerja kita lebih efisien dari hari kemarin.',
        details: [
          'Definisi: Keinginan untuk selalu maju, berkembang, tidak cepat berpuas diri, kreatif, inovatif, dan berani bersaing dengan kecepatan lebih (speed) untuk mengungguli standar kompetitor.',
          'Wujud Nyata di Lapangan: Cepat tanggap saat terjadi sheet break (kertas putus), mengusulkan ide Kaizen penghematan energi atau bahan baku, dan bangga saat target shift tercapai dengan zero defect.'
        ]
      },
      {
        heading: '5. CUSTOMER DELIGHT (Memberikan yang Terbaik Melebihi Harapan)',
        simpleExplanation: 'Artinya kita memuaskan pelanggan. Baik pelanggan internal (misal: bagian Converting yang menerima jumbo roll dari PM) maupun pelanggan eksternal yang membeli tisu di toko.',
        details: [
          'Definisi: Memberikan produk dan layanan terbaik hingga di atas ekspektasi pelanggan (beyond customer’s expectations), bersikap antisipatif sebelum diminta, dan merespons keluhan secara tuntas.',
          'Wujud Nyata di Lapangan: Menghasilkan roll tisu tanpa cacat kerut tepi atau noda kotor sehingga operator converting dapat memotong lancar, serta memastikan gramatur dan kelembutan sesuai spesifikasi pemesan.'
        ]
      }
    ]
  },

  // BAB 3: PILAR 2 - MANAJEMEN STRATEGI & PENGENDALIAN
  {
    id: 'pilar2',
    number: 3,
    title: 'Pilar 2: Manajemen Strategi & Pengendalian',
    badge: 'Arah & Kebijakan',
    summary: 'Memahami bagaimana target perusahaan dirumuskan, diturunkan ke shift harian, serta dikendalikan melalui BPR, BPE, dan Progress Review.',
    iconName: 'Compass',
    keyPoints: [
      'Pola sistem manajemen: Plan - Do - Check - Action (PDCA).',
      'Strategi dikelola dengan Balanced Scorecard (BSC) & Strategy Map.',
      'Cascading strategi diturunkan vertikal dan horizontal menjadi Rencana Kinerja Karyawan (RKK).',
      'Pengendalian melalui BPR (Ubah Total) dan BPE (Penyempurnaan Bertahap).'
    ],
    contentSections: [
      {
        heading: '1. Model Sistem Manajemen Berpola PDCA',
        simpleExplanation: 'Semua pekerjaan di PT. PUP dimulai dari Perencanaan matang (Plan), Pelaksanaan tepat (Do), Pemeriksaan hasil (Check), dan Perbaikan berkelanjutan (Action).',
        details: [
          'Manajemen Strategi adalah seperangkat keputusan dan tindakan manajerial yang mengaitkan organisasi dengan lingkungannya untuk menentukan kinerja jangka panjang.',
          'Pengelolaan strategi di PT. PUP memadukan Balanced Scorecard untuk arah bisnis jangka panjang dengan tools operasional spesifik di setiap departemen.'
        ]
      },
      {
        heading: '2. Enam (6) Tahapan Manajemen Strategi PUPMS',
        simpleExplanation: 'Ada 6 langkah mulai dari menyusun cita-cita perusahaan, membaginya ke tim kerja, hingga memperbaiki cara kerja sesuai perkembangan.',
        details: [
          'Tahap 1: Pengembangan Strategi - Memperhatikan visi, misi, destination statement, dan isu lingkungan internal/eksternal.',
          'Tahap 2: Penerjemahan & Formulasi Strategi - Menuangkan strategi ke dalam Strategy Map dan Balanced Scorecard (BSC).',
          'Tahap 3: Penyelarasan Organisasi - Proses cascading (penurunan) vertikal dan horizontal hingga ke level individu dalam RKK (Rencana Kinerja Karyawan).',
          'Tahap 4: Perencanaan Operasional - Mengalokasikan sumber daya (SDM, finansial, mesin, IT) dan mengaitkan manajemen risiko operasional.',
          'Tahap 5: Monitor & Evaluasi Efektivitas Eksekusi - Meninjau kemajuan berkala, mendeteksi hambatan, dan merumuskan tindakan penanggulangan.',
          'Tahap 6: Adaptasi Strategi - Menyesuaikan strategi jika terjadi perubahan dinamis pada pasar, harga bahan baku, atau teknologi.'
        ]
      },
      {
        heading: '3. Strategic Initiative (SI) & Action Plan',
        simpleExplanation: 'Ini adalah program kerja khusus yang dirancang untuk menutup jurang pemisah antara target yang dipatok dengan pencapaian aktual di lapangan.',
        details: [
          'Tujuan SI: Menutup kesenjangan (gap) kinerja aktual dengan target.',
          'Menyelaraskan tindakan taktis seluruh level manajemen agar bergerak ke satu arah sasaran yang sama.',
          'Menyediakan tolok ukur yang membedakan antara keberhasilan finansial (rupiah keuntungan/efisiensi) dan keberhasilan operasional (tonase, uptime, waste).'
        ]
      },
      {
        heading: '4. Mekanisme Kontrol: BPR vs BPE vs Progress Review',
        simpleExplanation: 'BPR adalah mengubah total cara kerja lama dari nol. BPE adalah menyempurnakan sedikit demi sedikit apa yang sudah ada. Progress Review adalah rapat berkala untuk mengecek sudah sampai mana target kita.',
        details: [
          'BPR (Business Process Reengineering): Desain ulang secara radikal dari nol untuk lompatan kinerja drastis (contoh: mengganti sistem pencatatan kertas manual menjadi aplikasi digital real-time).',
          'BPE (Business Process Enhancement/Excellence): Penyempurnaan bertahap dan berkelanjutan pada alur yang sudah berjalan agar lebih cepat, rapi, dan efisien (contoh: memotong alur birokrasi formulir persetujuan kain felt).',
          'Progress Review: Pertemuan berkala evaluasi pencapaian target, pembahasan kendala, analisa penyimpangan, dan perumusan tindakan korektif (PICA).',
          'Calendar of Events (Pocket Card): Jadwal resmi agenda review kinerja dari level direksi, divisi, departemen, hingga seksi kerja.'
        ],
        tableData: {
          headers: ['Aspek Pembeda', 'BPR (Reengineering)', 'BPE (Enhancement)'],
          rows: [
            ['Sifat Perubahan', 'Radikal / Mengubah Total dari Nol', 'Bertahap / Penyempurnaan Berkelanjutan'],
            ['Pendekatan', 'Desain ulang seluruh alur kerja', 'Memperbaiki & menghaluskan yang sudah ada'],
            ['Kecepatan Hasil', 'Perubahan besar dalam jangka lebih panjang', 'Peningkatan kecil tapi terus-menerus'],
            ['Contoh Nyata di PT. PUP', 'Mengganti seluruh sistem pelaporan manual dengan sistem aplikasi digital', 'Menghilangkan dokumen duplikasi agar verifikasi lab lebih cepat']
          ]
        }
      }
    ]
  },

  // BAB 4: ALAT PENYELARASAN STRATEGI & BISNIS
  {
    id: 'strategic-tools',
    number: 4,
    title: 'Alat Penyelarasan Strategi & Analisa Bisnis',
    badge: 'Analisa Bisnis',
    summary: '6 alat bantu strategis untuk menganalisis lingkungan bisnis, persaingan industri, dan portofolio produk kertas tisu.',
    iconName: 'BarChart2',
    keyPoints: [
      'PESTEL: Memetakan faktor eksternal Politik, Ekonomi, Sosial, Teknologi, Lingkungan, Hukum.',
      'Porter 5 Forces: Membedah struktur persaingan industri kertas.',
      'SWOT: Analisa Kekuatan, Kelemahan, Peluang, dan Ancaman.',
      'Ansoff Matrix & BCG Matrix: Panduan strategi penetrasi dan portofolio produk.',
      'Nine Building Blocks: Perumusan kanvas model bisnis bernilai tambah.'
    ],
    contentSections: [
      {
        heading: '1. Analisa PESTEL',
        simpleExplanation: 'Cara melihat kondisi luar pabrik yang bisa mempengaruhi bisnis kita: Politik, Ekonomi, Sosial, Teknologi, Lingkungan, dan Hukum.',
        details: [
          'Politic: Kebijakan stabilitas nasional, pilkada, dan regulasi perdagangan.',
          'Economy: Suku bunga, inflasi, daya beli masyarakat, fluktuasi nilai tukar Rupiah terhadap USD (karena pembelian pulp/sparepart impor).',
          'Social: Tren gaya hidup higienis, peningkatan kesadaran sanitasi masyarakat menggunakan tisu berkualitas.',
          'Technology: Otomasi kontrol DCS mesin kertas, inovasi sensor moisture dan caliper online.',
          'Environment: Regulasi pembuangan air limbah (WWT), ketersediaan pasokan air tanah, curah hujan tinggi yang mempengaruhi logistik.',
          'Legal: Undang-Undang Ketenagakerjaan, standar sertifikasi K3, dan kepatuhan perpajakan.'
        ]
      },
      {
        heading: '2. Porter’s Five Forces Analysis',
        simpleExplanation: 'Cara memetakan 5 tekanan persaingan usaha di pasar kertas dan tisu.',
        details: [
          '1. Persaingan Antar Pemain Sejenis: Jumlah pabrik tisu lain yang memproduksi jumbo roll sejenis.',
          '2. Ancaman Produk Substitusi: Munculnya pengering tangan elektrik atau kain lap microfiber alternatif.',
          '3. Daya Tawar Pembeli (Buyer): Tuntutan spesifikasi ketat dan harga bersaing dari pelanggan converting/end-user.',
          '4. Daya Tawar Pemasok (Supplier): Ketergantungan terhadap pemasok pulp kayu murni dan bahan kimia pendukung.',
          '5. Ancaman Pendatang Baru: Kemungkinan masuknya investor baru dengan mesin canggih berkapasitas besar.'
        ]
      },
      {
        heading: '3. Analisa SWOT PT. PUP',
        simpleExplanation: 'Melihat apa kehebatan kita (Strength), apa kekurangan kita (Weakness), peluang apa yang ada di pasar (Opportunity), dan apa bahaya yang mengancam (Threat).',
        details: [
          'Strengths (Kekuatan): Fleksibilitas mesin PM1, PM2, dan PM5 mampu memproduksi berbagai jenis kertas (MG HVS, Facial, Toilet, Napkin), tim teknisi handal.',
          'Weaknesses (Kelemahan): Umur mesin yang menuntut perawatan preventif ketat, kebutuhan monitoring broke/waste yang intensif.',
          'Opportunities (Peluang): Permintaan tisu higienis nasional terus meningkat pesat, pasar ekspor jumbo roll.',
          'Threats (Ancaman): Kenaikan harga bahan baku serat kayu dunia dan bahan kimia impor.'
        ]
      },
      {
        heading: '4. Matriks Ansoff (Strategi Pertumbuhan)',
        simpleExplanation: 'Pilihan jalan untuk menumbuhkan omzet perusahaan: fokus ke produk lama/baru atau masuk ke pasar lama/baru.',
        details: [
          'Penetrasi Pasar (Produk Lama - Pasar Lama): Menggenjot tonase penjualan jumbo roll yang sudah ada dengan kualitas prima dan ketepatan kirim (OTIF).',
          'Pengembangan Produk (Produk Baru - Pasar Lama): Mengembangkan varian gramatur baru (misal: tissue ultra soft 12 gsm atau MG food grade 24 gsm) untuk pelanggan yang sudah ada.',
          'Pengembangan Pasar (Produk Lama - Pasar Baru): Membuka jalur distribusi baru ke luar pulau atau pasar regional.',
          'Diversifikasi (Produk Baru - Pasar Baru): Memproduksi jenis kertas teknis khusus untuk industri baru.'
        ]
      },
      {
        heading: '5. Matriks BCG (Boston Consulting Group)',
        simpleExplanation: 'Cara mengelompokkan produk menjadi 4 kategori: Bintang (Star), Sapi Perah (Cash Cow), Tanda Tanya (Question Mark), dan Beban (Dog).',
        details: [
          'Question Mark (Kuadran I): Pasar tumbuh cepat namun pangsa pasar masih kecil; perlu dipertimbangkan apakah layak suntikan modal.',
          'Star (Kuadran II): Pemimpin pasar di industri yang bertumbuh pesat; menghasilkan laba besar dan terus dikembangkan posisinya.',
          'Cash Cow (Kuadran III): Industri sudah matang stabil dan menjadi penghasil uang utama pabrik; labanya digunakan membiayai inovasi lain.',
          'Dog (Kuadran IV): Pertumbuhan rendah dan pangsa pasar kecil; harus dievaluasi untuk dialihkan kapasitasnya ke produk lain yang lebih menguntungkan.'
        ]
      },
      {
        heading: '6. Nine Building Blocks (Business Model Canvas)',
        simpleExplanation: 'Kanvas ringkas 9 kotak untuk merancang model bisnis yang menghasilkan keuntungan berkelanjutan.',
        details: [
          'Memetakan 9 komponen inti: Customer Segments, Value Propositions, Channels, Customer Relationships, Revenue Streams, Key Resources, Key Activities, Key Partners, dan Cost Structure.'
        ]
      }
    ]
  },

  // BAB 5: PILAR 3 - MANAJEMEN OPERASI & STANDAR ISO 9001:2015
  {
    id: 'pilar3-iso',
    number: 5,
    title: 'Pilar 3: Manajemen Operasi & Standar ISO 9001:2015',
    badge: 'Mutu Internasional',
    summary: 'Proses manufaktur transformasi input menjadi output, pengorganisasian 3 fungsi bisnis, dan 10 klausul standar mutu ISO 9001:2015.',
    iconName: 'Award',
    keyPoints: [
      'Manajemen Operasi bertugas mengubah input (bahan baku, energi, tenaga kerja) menjadi output berkualitas tinggi.',
      'Perusahaan ditopang 3 fungsi: Marketing (Penjualan), Operasi (Produksi), dan Finance (Keuangan).',
      'Desain produk dikawal oleh Product Development Team lintas departemen.',
      'ISO 9001:2015 berfokus pada pendekatan proses dan pemikiran berbasis risiko (Risk-Based Thinking).'
    ],
    contentSections: [
      {
        heading: '1. Hakikat Manajemen Operasi Manufaktur',
        simpleExplanation: 'Tugas utama departemen operasional adalah mengubah bahan mentah (bubur serat HVS dan pulp murni) menjadi gulungan kertas jumbo roll yang rapi, bersih, dan sesuai ukuran pesanan.',
        details: [
          'Operasi adalah seperangkat aktivitas menciptakan nilai dalam bentuk barang nyata (kertas tisu, MG paper, dll.) atau jasa melalui proses transformasi input menjadi output.',
          'Produktivitas diukur dari rasio: Output (Tonase Jadi) dibagi Input (Bahan Baku, Energi, Jam Tenaga Kerja).',
          'Tujuan operasional: Menghasilkan keunggulan bersaing melalui Diferensiasi Mutu, Biaya Rendah (Low Cost), dan Kecepatan Respon (Fast Response).'
        ]
      },
      {
        heading: '2. Pengorganisasian 3 Fungsi Pokok Perusahaan',
        simpleExplanation: 'Perusahaan berjalan seimbang jika 3 roda ini berputar serasi: Penjualan mencari pesanan, Produksi membuat barangnya, dan Keuangan mengelola dananya.',
        details: [
          '1. Marketing & Sales: Mengetahui kebutuhan pasar dan mendatangkan order permintaan produk.',
          '2. Produksi / Operasi: Memproses dan memproduksi barang sesuai jadwal, standar mutu, dan efisiensi biaya.',
          '3. Finance & Accounting: Mencatat, menelusuri, dan mengelola arus kas serta kesehatan keuangan perusahaan.'
        ]
      },
      {
        heading: '3. Product Development Management (Desain Produk)',
        simpleExplanation: 'Sebelum produk dibuat massal di mesin, tim ahli dari berbagai bagian merancang ukuran, kekuatan tarik, kelembutan, dan ketebalan kertas agar sesuai permintaan pembeli dan mesin mampu menjalankannya.',
        details: [
          'Dipimpin oleh Product Engineer / Product Manager bersama tim lintas fungsi (Sales, QA/QC, Purchasing, Produksi).',
          'Bertanggung jawab menterjemahkan persyaratan pelanggan menjadi parameter spesifikasi teknis (gramatur, toleransi, tensile MD/CD, caliper, creeping) yang tercantum dalam lembar spesifikasi baku.'
        ]
      },
      {
        heading: '4. Standar Mutu Internasional ISO 9001:2015',
        subheading: '10 Klausul Sistem Manajemen Mutu (SMM)',
        simpleExplanation: 'ISO 9001 adalah sertifikat mutu dunia yang membuktikan pabrik kita bekerja secara rapi, terkontrol, dan konsisten dari awal sampai akhir.',
        details: [
          'Klausul 1 - Ruang Lingkup: Menetapkan batasan implementasi sistem manajemen mutu di pabrik.',
          'Klausul 2 - Acuan Normatif: Dokumen referensi standar yang digunakan.',
          'Klausul 3 - Istilah dan Definisi: Terminologi baku mutu yang disepakati.',
          'Klausul 4 - Konteks Organisasi: Memahami isu internal/eksternal dan kebutuhan pihak berkepentingan.',
          'Klausul 5 - Kepemimpinan: Komitmen direksi, perumusan kebijakan mutu, serta pembagian wewenang dan tanggung jawab.',
          'Klausul 6 - Perencanaan: Identifikasi penanganan risiko & peluang serta penetapan sasaran mutu terukur.',
          'Klausul 7 - Dukungan: Penyediaan sumber daya (alat, SDM, kalibrasi), kompetensi, komunikasi, dan informasi terdokumentasi (SOP/WI/Logsheet).',
          'Klausul 8 - Operasional: Perencanaan produksi, pengendalian proses, verifikasi produk eksternal, dan penanganan produk yang tidak sesuai (Reject/Hold).',
          'Klausul 9 - Evaluasi Kinerja: Pemantauan KPI, audit internal berkala, dan tinjauan manajemen.',
          'Klausul 10 - Peningkatan: Penanganan ketidaksesuaian, tindakan korektif (CAPA), dan perbaikan berkelanjutan.'
        ]
      }
    ]
  },

  // BAB 6: ALAT-ALAT PRAKTIS PRODUKTIVITAS & KUALITAS LAPANGAN
  {
    id: 'productivity-tools',
    number: 6,
    title: 'Alat Praktis Produktivitas & Kualitas Lapangan',
    badge: 'Alat Kerja Shift',
    summary: 'Kumpulan 14 alat praktis continuous improvement: Smiley, Horenso, PIP, TPM, 5R, PST, OPL, Kaizen, Quality Day, Six Sigma, 7 Tools, dan Sampling.',
    iconName: 'Wrench',
    keyPoints: [
      'Alat visual & komunikasi harian: Smiley Performance, Horenso (30 menit sebelum shift), dan One Point Lesson (OPL).',
      'TPM menargetkan Zero Accident, Zero Defect, dan Zero Breakdown.',
      '5R (Ringkas, Rapi, Resik, Rawat, Rajin) dievaluasi dengan audit berkala 50 poin.',
      'Kaizen 8 Langkah & Laporan A3 untuk mendorong inisiatif inovasi dari bawah (bottom-up).',
      '7 Alat Kualitas (Checksheet, Fishbone, Pareto, Histogram, Control Chart, Scatter, Flowchart) untuk membedah masalah tuntas.'
    ],
    contentSections: [
      {
        heading: '1. Smiley Performance',
        subheading: 'Manajemen Visual Kontrol Kinerja Mesin',
        simpleExplanation: 'Papan gambar senyuman yang dipajang di dekat mesin: Senyum Hijau artinya mesin beroperasi prima melampaui target, Datar Kuning artinya pas-pasan, Cemberut Merah artinya ada masalah dan harus segera dicari solusinya.',
        details: [
          'Tujuan: Menampilkan indikator visual performa mesin secara transparan dan mudah dimengerti semua orang di area kerja.',
          'Output: Memantik respon cepat problem solving (misal dengan review performa PM atau Converting) untuk meningkatkan produktivitas.'
        ]
      },
      {
        heading: '2. HORENSO (Houkoku - Renraku - Soudan)',
        subheading: 'Budaya Komunikasi Efektif 30 Menit Sebelum Kerja',
        simpleExplanation: 'HORENSO adalah singkatan bahasa Jepang: HOUKOKU (Lapor), RENRAKU (Komunikasi/Hubungi), SOUDAN (Konsultasi/Rundingkan). Dilakukan setiap hari sebelum jam kerja dimulai.',
        details: [
          'Prinsip: Melaporkan pencapaian shift sebelumnya, membahas kendala yang ada, dan menyepakati tindakan bersama yang harus diambil agar operasional shift sukses.',
          'Praktek di PT. PUP: Dilakukan setiap hari selama ±30 menit di lokasi kerja sebelum serah terima shift.',
          'Bukti Komitmen: Seluruh kesepakatan tindakan/inisiatif dituangkan dalam Risalah Buku Aktivitas / Log Book HORENSO dan dibubuhi tanda tangan peserta sebagai simbol komitmen bersama.'
        ]
      },
      {
        heading: '3. PIP (Productivity Improvement Program)',
        subheading: 'Program Peningkatan Produktivitas Kelompok Kecil (SGA)',
        simpleExplanation: 'Kegiatan kelompok kecil (Small Group Activity) antar operator dan kepala regu untuk memecahkan hambatan produksi agar hasil tonase naik dan limbah sampah berkurang.',
        details: [
          '6 Parameter Utama PIP:',
          '  1. Pencapaian Hasil / Net Output (Tonase bersih).',
          '  2. Pencapaian Standar Waste (Menekan persentase broke/buangan).',
          '  3. Pencapaian Kecepatan Mesin / Speed (Kestabilan mpm mesin).',
          '  4. Pencapaian Target Waktu Gangguan Produksi / Down Time.',
          '  5. Pencapaian Make Ready (Kecepatan persiapan penggantian order/felt).',
          '  6. QIP - Quality Improvement Program (Level mutu produk).',
          '3 Tahapan PIP: Tahap I (Pelatihan & Penetapan Target), Tahap II (Inkubasi & Pelaksanaan), Tahap III (Evaluasi Pencapaian & Review Strategi).'
        ]
      },
      {
        heading: '4. TPM (Total Productive Maintenance)',
        subheading: 'Perawatan Total Berorientasi Zero Losses',
        simpleExplanation: 'Filosofi merawat mesin bersama-sama. Operator bukan cuma tukang pakai, tapi ikut menjaga kebersihan, pelumasan, dan mendeteksi bunyi aneh sebelum mesin rusak total.',
        details: [
          'Tujuan TPM: Memaksimalkan efisiensi permesinan (OEE - Overall Equipment Effectiveness).',
          'Prinsip 3 Nol (Three Zeros):',
          '  - Zero Accident: Nol insiden kecelakaan kerja.',
          '  - Zero Defect: Nol cacat mutu produk.',
          '  - Zero Breakdown: Nol kerusakan mesin macet mendadak.',
          '8 Pilar TPM: Autonomous Maintenance (Perawatan Mandiri Operator), Planned Maintenance, Quality Maintenance, Focused Improvement (Kobetsu Kaizen), Early Management, Education & Training, Safety-Health-Environment, dan TPM Office.'
        ]
      },
      {
        heading: '5. Budaya 5R (Ringkas, Rapi, Resik, Rawat, Rajin)',
        subheading: 'Fondasi Ketertiban, Keselamatan & Efisiensi Lokasi Kerja',
        simpleExplanation: '5R adalah kebiasaan menjaga tempat kerja: Buang yang tidak perlu (Ringkas), Tata pada tempatnya (Rapi), Bersihkan setiap hari (Resik), Bikin standar aturannya (Rawat), dan Jadikan disiplin diri tanpa disuruh (Rajin).',
        details: [
          'Ringkas (Seiri): Memilah dan menyingkirkan barang yang tidak diperlukan dari area kerja.',
          'Rapi (Seiton): Menata barang yang dibutuhkan pada posisi yang jelas dengan label/tanda agar cepat diambil dan dikembalikan.',
          'Resik (Seiso): Membersihkan area dan peralatan kerja sambil memeriksa kondisi fisik mesin (deteksi kebocoran oli, baut kendur).',
          'Rawat (Seiketsu): Memelihara kebersihan pribadi dan mempertahankan konsistensi 3R sebelumnya dengan visual control.',
          'Rajin (Shitsuke): Membangun kedisiplinan dan pembiasaan diri mematuhi aturan kerja dengan kesadaran penuh.',
          'Audit 5R: Dilakukan audit berkala menggunakan Lembar Periksa Audit 50 Poin untuk memantau nilai kepatuhan setiap seksi.'
        ]
      },
      {
        heading: '6. PST (Process Survey Tool) Internal & Sub-Kontraktor',
        simpleExplanation: 'Alat ukur berupa daftar periksa untuk menilai apakah proses kerja kita sudah benar-benar sesuai standar atau masih ada langkah yang melenceng.',
        details: [
          'Audit bulanan dengan mengambil sampel proses nyata di lapangan dan membandingkannya terhadap standar tertulis.',
          'Semakin tinggi nilai PST, semakin patuh dan andal proses tersebut memenuhi persyaratan pelanggan.',
          'Juga diterapkan untuk menilai kapabilitas rekanan/sub-kontraktor (PST Sub-Con).'
        ]
      },
      {
        heading: '7. One Point Lesson (OPL)',
        subheading: 'Lembar Pelajaran Singkat 1 Halaman',
        simpleExplanation: 'Lembar petunjuk praktis 1 lembar yang memuat 1 poin penting saja. Dilengkapi gambar mana yang benar dan mana yang salah. Ditempel di dinding agar semua orang langsung paham dalam 1 menit.',
        details: [
          'OPL tidak memerlukan dokumen SOP panjang; digunakan untuk edukasi singkat dan transfer pengetahuan antar rekan kerja.',
          'Contoh OPL di PT. PUP: Cara mengukur batas tekanan uap Yankee, standar kebersihan kaca feeder, cara menyambung kertas, panduan pelumasan bearing roll.',
          'Dibuat langsung oleh operator atau kepala regu berdasarkan pengalaman nyata (best practice).'
        ]
      },
      {
        heading: '8. Kaizen / Improvement Innovation Management (Format A3 & 8 Langkah)',
        simpleExplanation: 'Kaizen artinya perbaikan terus-menerus. Jika ada cara kerja yang ribet, boros, atau bikin capek, karyawan berinisiatif mencari solusinya, mencatat di Laporan A3, dan dilombakan setiap tahun.',
        details: [
          '8 Langkah Kaizen Sistematis:',
          '  1. Menemukan Persoalan / Tema Inovasi.',
          '  2. Menganalisa Sebab-Akibat.',
          '  3. Menemukan Akar Permasalahan (Root Cause).',
          '  4. Merencanakan Tindakan Penanggulangan.',
          '  5. Melaksanakan Implementasi Tindakan.',
          '  6. Memeriksa Hasil & Dampak Perbaikan.',
          '  7. Melakukan Standarisasi (Update SOP/WI).',
          '  8. Menetapkan Rencana Perbaikan Berikutnya.',
          'Laporan dituangkan dalam Format Standard Improvement Innovation Report (A3 Report) dan dikonvensikan setiap tahun pada tingkat pabrik hingga tingkat group (PT. PUP).'
        ]
      },
      {
        heading: '9. Quality Day & Forum CPAR / LP',
        subheading: 'Forum Dua Mingguan Pencegahan Keluhan Pelanggan',
        simpleExplanation: 'Pertemuan rutin setiap 2 minggu yang dipimpin tim QC untuk membedah keluhan pelanggan (KP) atau laporan penyimpangan (LP). Bukan untuk saling menyalahkan, tapi mencari akar masalahnya dengan metode 5-Why agar masalah tidak terulang lagi.',
        details: [
          'Peserta: Bagian penyebab ketidaksesuaian bersama tim QC dan perwakilan pimpinan.',
          'Metode: 5-Why Analysis (bertanya Kenapa sebanyak 5 kali) dan Diagram Tulang Ikan (Fishbone).',
          'Output: Dokumentasi Before-After Improvement dan penerbitan CPAR (Corrective & Preventive Action Report).'
        ]
      },
      {
        heading: '10. Six Sigma Project (Metode DMAIC)',
        simpleExplanation: 'Proyek perbaikan berbasis data dan statistik untuk menekan cacat produk dan menghasilkan penghematan biaya pabrik.',
        details: [
          'Define (D): Mendefinisikan sasaran proyek (misal: penghematan biaya pemakaian kawat, penurunan reject tisu).',
          'Measure (M): Mengukur baseline kinerja saat ini secara akurat dan valid.',
          'Analyze (A): Menganalisis sumber variasi data dan menghilangkan gap kinerja.',
          'Improve (I): Menerapkan solusi perbaikan kreatif dan memvalidasi hasilnya secara statistik.',
          'Control (C): Memastikan perbaikan bertahan lama dengan memasukkannya ke dalam SOP, instruksi kerja, dan audit ISO.'
        ]
      },
      {
        heading: '11. Seven Quality Tools (7 Alat Pengendalian Mutu)',
        simpleExplanation: '7 senjata ampuh para operator dan analis mutu untuk mengumpulkan data dan memecahkan masalah:',
        details: [
          '1. Checksheet: Lembar tally sederhana untuk mencatat jumlah cacat setiap jam.',
          '2. Diagram Sebar (Scatter Diagram): Melihat korelasi hubungan antara dua faktor (misal: suhu silinder vs kadar air kertas).',
          '3. Diagram Tulang Ikan (Fishbone / Ishikawa): Memetakan semua kemungkinan penyebab masalah dari 5 faktor (Man, Machine, Material, Method, Environment).',
          '4. Diagram Pareto: Grafik balok berurut dengan prinsip 80/20 untuk mengetahui masalah mana yang paling dominan dan harus diselesaikan duluan.',
          '5. Histogram: Grafik distribusi sebaran data untuk melihat apakah gramatur kertas berada di tengah-tengah rentang toleransi.',
          '6. Peta Kendali (Control Chart / SPC): Grafik garis dengan batas atas (UCL) dan batas bawah (LCL) untuk mendeteksi apakah proses mesin masih stabil atau mulai melenceng.',
          '7. Diagram Alir (Flowchart): Gambar kotak-kotak alur proses kerja dari awal sampai akhir.'
        ]
      },
      {
        heading: '12. Inspection Management & Acceptance Sampling (MIL-STD-105E & IFRA 12647-3)',
        simpleExplanation: 'Cara mengambil contoh sampel acak untuk memutuskan apakah satu kelompok roll tisu diterima atau ditolak tanpa harus memeriksa satu per satu.',
        details: [
          'Metode MIL-STD-105E: Menggunakan tabel ukuran lot, kode huruf sampel, dan batas AQL (Acceptable Quality Level) untuk menentukan angka penerimaan (Ac) dan penolakan (Re).',
          'Aturan Perpindahan (Switching Rules): Perpindahan status inspeksi antara Normal -> Diperketat (Tightened) -> Dikurangi (Reduced) berdasarkan riwayat keberhasilan lot sebelumnya.',
          'Standar Inspeksi Tisu IFRA 12647-3: Menilai 3 parameter utama: Warna (Match/Close/Out vs standar DCP), Register potong (toleransi ±0.20 mm), dan Cacat Fisik/Print Defect.'
        ]
      },
      {
        heading: '13. Value Stream Mapping (VSM) & Strategi Alur Kerja',
        simpleExplanation: 'Memetakan jalur perjalanan kertas dari bahan baku sampai ke tangan pelanggan untuk menemukan waktu tunggu yang terbuang sia-sia (Non-Value Added Time) agar proses lebih cepat.',
        details: [
          'VSM membedakan waktu yang benar-benar memberi nilai tambah (misal: proses pembentukan lembaran, pengeringan Yankee) dengan waktu tunggu/penumpukan barang di gudang.',
          'Analisa selalu ditarik mundur mulai dari kebutuhan pelanggan ke belakang hingga ke tahap pemasok bahan baku.',
          'Time Function Map: Memetakan aktivitas kerja terhadap waktu (Wait, Move, Process) untuk memangkas lead time pengiriman.'
        ]
      },
      {
        heading: '14. Supply Chain Management (SCM) & Capacity Planning',
        simpleExplanation: 'Menyelaraskan pembelian bahan baku, jadwal produksi mesin kertas, kapasitas gudang, hingga truk pengiriman agar tidak ada mesin yang nganggur atau pelanggan yang telat menerima barang.',
        details: [
          'Capacity Planning: Menghitung kapasitas terpasang vs kapasitas terpakai mesin per bulan untuk mengantisipasi jika utilisasi melebihi 100% (dengan strategi lembur, perbaikan efisiensi, atau sub-kontrak).',
          '5 Langkah Implementasi SCM: 1. Persiapan Tim & PIC, 2. Pemetaan Aktivitas & Peluang Perbaikan, 3. Perumusan Inisiatif Prioritas (Nilai Rp/USD), 4. Rencana Implementasi & Jadwal, 5. Eksekusi, Monitoring & Standarisasi.'
        ]
      }
    ]
  },

  // BAB 7: PILAR 4 - ELEMEN PEMBERDAYA & PENGHANCUR HAMBATAN
  {
    id: 'pilar4',
    number: 7,
    title: 'Pilar 4: Elemen Pemberdaya & Penakluk 4 Hambatan',
    badge: 'Kekuatan Penggerak',
    summary: '4 elemen kunci agar sistem manajemen hidup di organisasi, serta strategi menaklukkan 4 hambatan eksekusi strategi.',
    iconName: 'ShieldCheck',
    keyPoints: [
      'Pemberdaya adalah nafas yang menghidupkan seluruh pilar PUPMS di pabrik.',
      '4 Elemen Pemberdaya: Commitment (Komitmen), Alignment (Penyelarasan), Monitoring (Pemantauan), Support (Dukungan).',
      'Waspadai dan atasi 4 Hambatan Eksekusi: Vision Barrier, Operational Barrier, Management Barrier, dan People Barrier.'
    ],
    contentSections: [
      {
        heading: '1. Hakikat Elemen Pemberdaya (Enabler)',
        simpleExplanation: 'PUPMS tidak akan jalan hanya dengan tumpukan dokumen kertas tebal. Harus ada orang-orang yang berkomitmen, kepemimpinan yang tegas, saling mendukung, dan terus mengevaluasi kemajuan.',
        details: [
          'Pemberdaya dimengerti sebagai elemen-elemen utama yang harus ada dan hidup dalam organisasi agar ketiga pilar dalam bangunan PUPMS berjalan efektif mendukung pencapaian Visi dan Misi PT. PUP.'
        ]
      },
      {
        heading: '2. Empat (4) Elemen Pemberdaya Utama',
        simpleExplanation: 'Empat tiang penopang keberhasilan:',
        details: [
          '1. Commitment (Komitmen): Komitmen pimpinan melalui keteladanan, keterlibatan aktif di lapangan, dan konsistensi kebijakan; serta komitmen karyawan melalui komunikasi lancar dan program apresiasi/rewarding.',
          '2. Alignment (Penyelarasan): Menyelaraskan struktur organisasi, kompetensi SDM (pelatihan), dan sasaran proyek agar selaras dengan arah tujuan perusahaan.',
          '3. Monitoring (Pengawasan & Bimbingan): Kegiatan coaching pimpinan ke bawahan, check and control, review pencapaian, dan apresiasi terhadap inisiatif yang berhasil.',
          '4. Support (Dukungan Fasilitas): Studi banding (benchmarking), pemanfaatan Teknologi Informasi (IT sistem pelaporan), dan manajemen perubahan (Leader of Change & Culture of Change).'
        ]
      },
      {
        heading: '3. Mengatasi Empat (4) Hambatan Eksekusi Strategi (The 4 Barriers)',
        simpleExplanation: 'Seringkali rencana hebat gagal terlaksana karena 4 penyakit organisasi ini. Berikut cara mendeteksi dan mengatasinya:',
        details: [
          '1. Vision Barrier (Hambatan Visi): Kondisi di mana strategi tidak dipahami oleh pelaksana lapangan dan tidak dijabarkan ke sasaran harian. Solusi: Gunakan bahasa sederhana, sosialisasikan lewat Horenso dan papan visual.',
          '2. Operational Barrier (Hambatan Operasional): Proses dan prosedur kerja kunci tidak dirancang untuk mendukung strategi. Solusi: Lakukan BPE untuk membuang langkah kerja yang berbelit-belit dan bikin lambat.',
          '3. Management Barrier (Hambatan Manajemen): Sistem manajemen hanya mengejar target anggaran jangka pendek tanpa memperhatikan investasi strategi jangka panjang. Solusi: Gunakan Balanced Scorecard dengan KPI berimbang.',
          '4. People Barrier (Hambatan Sumber Daya Manusia): Adanya kepentingan pribadi/kelompok (silo) dan kompetensi individu yang tertinggal. Solusi: Pelatihan berkelanjutan, penyelarasan insentif, dan penanaman budaya 5C.'
        ],
        tableData: {
          headers: ['Nama Hambatan', 'Ciri-Ciri Gejala di Pabrik', 'Solusi Nyata PUPMS'],
          rows: [
            ['Vision Barrier', 'Operator tidak tahu apa target pabrik tahun ini, merasa tugasnya cuma memutar tombol mesin.', 'Sosialisasi cascading target ke RKK individu, review berkala di briefing shift harian.'],
            ['Operational Barrier', 'Mau lapor perbaikan mesin tapi birokrasi formulir berbelit hingga mesin terlanjur macet.', 'Penerapan BPE, pembuatan lembar OPL cepat, dan pemanfaatan sistem digital real-time.'],
            ['Management Barrier', 'Pelit keluar biaya perawatan preventif, akhirnya biaya breakdown perbaikan mesin jauh lebih mahal.', 'Penerapan TPM menyeluruh dan pengalokasian anggaran terukur untuk OEE jangka panjang.'],
            ['People Barrier', 'Antar shift saling menyalahkan saat kertas putus, menyembunyikan kesalahan dari atasan.', 'Penanaman nilai Caring & Credible (5C), budaya Horenso transparan, dan reward prestasi tim.']
          ]
        }
      }
    ]
  },

  // BAB 8: STRUKTUR ORGANISASI PABRIK, JOB DESC & KPI DEPARTEMEN
  {
    id: 'org-kpi',
    number: 8,
    title: 'Struktur Organisasi, Job Desc & KPI Departemen',
    badge: 'Peran & Tanggung Jawab',
    summary: 'Struktur resmi pabrik Tissue Paper Mill & Converting PT. PUP, rincian wewenang setiap tingkatan jabatan, dan KPI utama departemen.',
    iconName: 'Users',
    keyPoints: [
      'Pabrik dipimpin oleh Kepala Pabrik (Kelik Heriyono) membawahi Paper Mill, Converting, Maintenance, QC, PPIC, dan QA/HSE.',
      'Setiap jabatan memiliki Tugas, Tanggung Jawab, dan Wewenang tertulis yang jelas.',
      'KPI Utama mengukur kinerja objektif: Tonase, Waste, OEE, MTTR/MTBF, Customer Complaint, dan OTIF.'
    ],
    contentSections: [
      {
        heading: '1. Struktur Pimpinan Pabrik Tissue Paper Mill & Converting',
        simpleExplanation: 'Bagan garis komando kepemimpinan di pabrik PT. PUP agar alur komunikasi dan tanggung jawab jelas dari atas sampai bawah.',
        details: [
          'Kepala Pabrik: Kelik Heriyono',
          'Kepala Bagian Paper Mill (Mesin PM): Hasyim',
          'Kepala Bagian Converting: Sudarji',
          'Kepala Bagian Maintenance (Mekanik, Elektrik, Instrumen): Suparno',
          'Kepala Bagian PPIC & WWT: Riswan',
          'Kepala Bagian QC: Mengawasi Lab Basah, Lab Kering, dan QC Converting',
          'Staff Khusus: QA, MR (Management Representative) & HSE'
        ]
      },
      {
        heading: '2. Tugas, Tanggung Jawab & Wewenang Kunci',
        simpleExplanation: 'Siapa bertanggung jawab atas apa, dan apa saja hak wewenang yang dipegang:',
        details: [
          'KEPALA PABRIK: Memimpin seluruh operasional pabrik, memastikan tercapainya target produksi, mutu, biaya, pengiriman, dan keselamatan (PCQDS). Berwenang mengambil keputusan operasional strategis dan berhak menghentikan operasi jika ada risiko bahaya K3 fatal.',
          'KEPALA PAPER MILL: Mengelola proses produksi tissue jumbo roll di mesin PM1, PM2, dan PM5, mengendalikan pemakaian bahan baku/chemical, menekan broke/waste. Berwenang mengatur jadwal mesin dan menghentikan mesin saat terjadi abnormalitas.',
          'KEPALA CONVERTING: Mengelola proses converting tisu gulung dan lipat, memastikan target output tercapai, mengendalikan limbah converting, dan mengawasi packing/palletizing.',
          'KEPALA MAINTENANCE: Menjamin keandalan mesin dan utilitas (Boiler, Listrik, Kompresor, Air), menyusun jadwal preventive maintenance, dan mengendalikan breakdown perbaikan. Berwenang menentukan jadwal shutdown maintenance pabrik.',
          'KEPALA QC: Menjamin semua produk memenuhi standar spesifikasi mutu pabrik, mengendalikan inspeksi incoming, in-process, dan outgoing, serta menginvestigasi keluhan pelanggan. Berwenang menahan produk reject (Hold) dan menerbitkan laporan CPAR/NCR.',
          'KEPALA PPIC: Menyusun rencana jadwal produksi (Production Planning), mengontrol stok bahan baku dan barang jadi, serta memastikan ketepatan waktu pengiriman order pelanggan (OTIF).',
          'KEPALA SHIFT (PAPER MILL / CONVERTING / MTN / QC): Memimpin operasional regu shift lapangan, memastikan target shift tercapai, memimpin briefing Horenso dan serah terima shift. Berwenang mengatur penempatan personil dan menghentikan proses bila ada potensi bahaya.',
          'OPERATOR: Menjalankan mesin sesuai SOP, mengontrol konsistensi bubur dan parameter mesin, mengisi logsheet secara jujur dan berkala. Berwenang melakukan adjustment parameter sesuai instruksi kerja standar.',
          'PEMBANTU OPERATOR (HELPER): Membantu operator menyuap kertas, memindahkan roll, membersihkan area mesin (5R), membantu penggantian consumable (doctor blade, kain felt), dan melakukan inspeksi visual kelainan produk.',
          'TEKNISI & HELPER TEKNISI: Melakukan servis preventif dan perbaikan korektif mesin, wajib menegakkan prosedur keselamatan LOTO (Lockout-Tagout) saat memperbaiki mesin bertenaga.'
        ]
      },
      {
        heading: '3. KPI Utama (Key Performance Indicator) Setiap Departemen',
        simpleExplanation: 'Angka rapor utama yang dinilai dari masing-masing departemen:',
        details: [
          'Tabel KPI resmi berikut menjadi tolok ukur evaluasi pencapaian kerja berkala di PT. PUP:'
        ],
        tableData: {
          headers: ['Departemen', 'KPI Utama yang Diukur', 'Makna & Target'],
          rows: [
            ['Paper Mill (PM)', 'Tonase Produksi, Standar Waste (Broke), OEE, Efisiensi Mesin', 'Mencapai target tonase (misal 2 Ton/shift standar) dengan limbah serat serendah mungkin.'],
            ['Converting', 'Output Jadi (Koli/Pack), Waste Converting, OEE, Efisiensi Line', 'Hasil potong rapi, packing higienis, dan rasio sampah plastik/kertas minimal.'],
            ['Maintenance', 'Breakdown Hours, MTTR (Mean Time to Repair), MTBF (Mean Time Between Failures)', 'Mesin jarang rusak mendadak, dan jika ada perbaikan bisa diselesaikan cepat dan tuntas.'],
            ['Quality Control (QC)', 'Customer Complaint, Reject Rate, Kecepatan Penanganan CPAR', 'Memastikan keluhan pelanggan nol atau ditekan seminimal mungkin, dan produk cacat tidak lolos ke pasar.'],
            ['PPIC & Gudang', 'OTIF (On Time In Full Delivery), Inventory Accuracy', 'Pesanan dikirim tepat waktu dan jumlahnya lengkap sesuai DO, serta stok gudang akurat sesuai kartu stok.'],
            ['Kepala Pabrik', 'Productivity, Cost, Quality, Delivery, Safety (PCQDS)', 'Pabrik produktif, biaya efisien terkontrol, kualitas prima, pengiriman tepat, dan Zero Accident.']
          ]
        }
      }
    ]
  }
];

export const PUPMS_QUIZ_QUESTIONS: PupmsQuizQuestion[] = [
  {
    id: 1,
    question: 'Apa kepanjangan resmi dari singkatan PUPMS?',
    options: [
      'Panca Usahatama Paramita Management System',
      'Pabrik Utama Paper Mill Standard',
      'Panduan Usaha Produksi Mesin Standar',
      'Panca Usaha Paper Management Solution'
    ],
    correctAnswer: 0,
    explanation: 'PUPMS adalah singkatan dari Panca Usahatama Paramita Management System, sistem manajemen resmi PT. PUP.'
  },
  {
    id: 2,
    question: 'Berapa jumlah pilar utama dalam bangunan sistem manajemen PUPMS?',
    options: [
      '2 Pilar',
      '3 Pilar',
      '4 Pilar (Mentalitas Dasar, Manajemen Strategi, Manajemen Operasi, dan Pemberdaya)',
      '6 Pilar'
    ],
    correctAnswer: 2,
    explanation: 'PUPMS dibangun di atas 4 Pilar Dasar: 1. Mentalitas Dasar, 2. Manajemen Strategi, 3. Manajemen Operasi, dan 4. Pemberdaya (Enabler).'
  },
  {
    id: 3,
    question: 'Nilai budaya karakter kerja "5C" pada Pilar 1 Mentalitas Dasar terdiri dari apa saja?',
    options: [
      'Caring, Credible, Competent, Competitive, Customer Delight',
      'Clever, Creative, Clean, Consistent, Caring',
      'Control, Cost, Quality, Delivery, Safety',
      'Capacity, Customer, Check, Core, Communication'
    ],
    correctAnswer: 0,
    explanation: 'Nilai 5C adalah Caring (Peduli), Credible (Dapat dipercaya), Competent (Terampil), Competitive (Unggul bersaing), dan Customer Delight (Memuaskan pelanggan).'
  },
  {
    id: 4,
    question: 'Apa perbedaan mendasar antara BPR (Business Process Reengineering) dan BPE (Business Process Enhancement)?',
    options: [
      'BPR dilakukan oleh operator, sedangkan BPE dilakukan oleh direktur saja.',
      'BPR adalah perubahan radikal mendesain ulang dari nol, sedangkan BPE adalah perbaikan bertahap menyempurnakan yang sudah ada.',
      'BPR hanya untuk mesin listrik, sedangkan BPE untuk mesin mekanik.',
      'Tidak ada bedanya, keduanya adalah istilah yang sama.'
    ],
    correctAnswer: 1,
    explanation: 'BPR adalah perubahan radikal / desain ulang proses inti dari nol untuk lompatan drastis, sedangkan BPE adalah perbaikan bertahap (incremental) menyempurnakan yang sudah berjalan.'
  },
  {
    id: 5,
    question: 'Kapan kegiatan briefing HORENSO dilaksanakan di PT. PUP dan berapa lama durasinya?',
    options: [
      'Setiap akhir bulan selama 3 jam di ruang rapat direksi.',
      'Hanya saat ada mesin rusak mendadak.',
      'Setiap hari sebelum jam kerja dimulai selama ±30 menit langsung di lokasi kerja.',
      'Saat jam istirahat makan siang.'
    ],
    correctAnswer: 2,
    explanation: 'Praktek Horenso di PT. PUP dilaksanakan setiap hari sebelum waktu bekerja selama ±30 menit di lokasi kerja, dicatat di Log Book dan ditandatangani peserta.'
  },
  {
    id: 6,
    question: 'Prinsip "Tiga Nol (Three Zeros)" yang menjadi target utama Total Productive Maintenance (TPM) adalah:',
    options: [
      'Zero Accident, Zero Defect, Zero Breakdown',
      'Zero Cost, Zero Waste, Zero Work',
      'Zero Paper, Zero Steam, Zero Oil',
      'Zero Delay, Zero Stop, Zero Change'
    ],
    correctAnswer: 0,
    explanation: 'TPM bertujuan mewujudkan Zero Losses melalui 3 sasaran mutlak: Zero Accident (Nol Kecelakaan), Zero Defect (Nol Cacat Produk), dan Zero Breakdown (Nol Kerusakan Mesin).'
  },
  {
    id: 7,
    question: 'Urutan yang benar dalam tahapan 5R di lingkungan kerja adalah:',
    options: [
      'Rajin, Rapi, Ringkas, Resik, Rawat',
      'Ringkas, Rapi, Resik, Rawat, Rajin',
      'Resik, Ringkas, Rawat, Rapi, Rajin',
      'Rapi, Rawat, Rajin, Resik, Ringkas'
    ],
    correctAnswer: 1,
    explanation: 'Urutan baku 5R adalah: 1. Ringkas (Seiri), 2. Rapi (Seiton), 3. Resik (Seiso), 4. Rawat (Seiketsu), dan 5. Rajin (Shitsuke).'
  },
  {
    id: 8,
    question: 'Metode Kaizen untuk menyelesaikan persoalan di PT. PUP dilakukan melalui berapa langkah sistematis?',
    options: [
      '3 Langkah',
      '5 Langkah',
      '8 Langkah Kaizen (dari Menemukan Masalah hingga Standarisasi dan Rencana Berikut)',
      '12 Langkah'
    ],
    correctAnswer: 2,
    explanation: 'Kaizen di PT. PUP menggunakan format standar 8 Langkah Kaizen yang dituangkan dalam Laporan A3 (A3 Report) dan dikonvensikan tahunan.'
  },
  {
    id: 9,
    question: 'Apa saja 4 Penghalang (The 4 Barriers) yang dapat menggagalkan pelaksanaan strategi perusahaan?',
    options: [
      'Water Barrier, Fire Barrier, Wind Barrier, Earth Barrier',
      'Vision Barrier, Operational Barrier, Management Barrier, People Barrier',
      'Cost Barrier, Time Barrier, Machine Barrier, Safety Barrier',
      'Supplier Barrier, Buyer Barrier, Competitor Barrier, Legal Barrier'
    ],
    correctAnswer: 1,
    explanation: '4 Hambatan pelaksanaan strategi adalah: Vision Barrier (visi tak dipahami pelaksana), Operational Barrier (proses tak selaras), Management Barrier (fokus jangka pendek/anggaran saja), dan People Barrier (ego/kompetensi tak sejalan).'
  },
  {
    id: 10,
    question: 'Siapakah Kepala Pabrik PT. PUP yang memimpin seluruh kegiatan operasional Tissue Paper Mill & Converting?',
    options: [
      'Kelik Heriyono',
      'Hasyim',
      'Sudarji',
      'Suparno'
    ],
    correctAnswer: 0,
    explanation: 'Sesuai struktur organisasi resmi PT. PUP, Kepala Pabrik dijabat oleh Kelik Heriyono, membawahi Paper Mill (Hasyim), Converting (Sudarji), Maintenance (Suparno), dan PPIC (Riswan).'
  }
];

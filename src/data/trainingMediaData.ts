import { MachineMediaConfig, TrainingModuleId } from '../types';
import { TISSUE_MACHINE_MEDIA_CONFIG } from './tissueMachineTrainingData';

// Real generated industrial images
import rewinderHeroImg from '../assets/images/rewinder_machine_1789447453640.jpg';
import rewinderPartsImg from '../assets/images/rewinder_parts_1789447473542.jpg';
import pm1HeroImg from '../assets/images/pm1_machine_1789447494837.jpg';
import pm2HeroImg from '../assets/images/pm2_machine_1789447511803.jpg';
import pm5HeroImg from '../assets/images/pm5_machine_1789447532514.jpg';
import stockprepOverviewImg from '../assets/images/stockprep_overview_1789468824360.jpg';
import stockprepCleanersImg from '../assets/images/stockprep_cleaners_1789468841675.jpg';
import stockprepRefinersImg from '../assets/images/stockprep_refiners_1789468856455.jpg';

export const TRAINING_MEDIA_DATA: Record<TrainingModuleId, MachineMediaConfig> = {
  TISSUE_PM: TISSUE_MACHINE_MEDIA_CONFIG,
  STOCK_PREP: {
    heroImage: stockprepOverviewImg,
    heroCaption: 'Foto Nyata: Seksi Stock Preparation Pabrik Kertas PT. PUP. Menampilkan instalasi bejana Hydrapulper stainless steel, baterai hydrocyclone cleaners, dan jalur pipa bubur.',
    galleryPhotos: [
      {
        id: 'sp-img-1',
        title: 'Tampak Keseluruhan Plant Stock Preparation PT. PUP',
        subtitle: 'Seksi Peleburan Bal (Pulper) & Jalur Pembersihan Bubur',
        imageSrc: stockprepOverviewImg,
        aspectRatio: '16:9',
        tags: ['Stock Preparation', 'Hydrapulper', 'Dump Chest', 'Piping System'],
        description: 'Area utama persiapan stok bubur kertas dan tissue: tempat peleburan bal virgin pulp, pulp curah (broke), dan OCC. Dilengkapi sistem pengadukan berkecepatan tinggi dan pemantauan level otomatis.',
        keyCallouts: [
          { label: 'Hydrapulper Vessel', detail: 'Bejana baja anti-karat dengan rotor turbulensi dan baffle pemecah pusaran' },
          { label: 'Tangki Penampung (Chest)', detail: 'Agitator berputar kontinu menjaga keseragaman suspensi serat' },
          { label: 'Jalur Distribusi', detail: 'Pipa baja penghubung ke baterai cleaner HDC, MCC, dan LCC' }
        ]
      },
      {
        id: 'sp-img-2',
        title: 'Baterai Hydrocyclone Cleaners (HDC, MCC, & LCC)',
        subtitle: 'Pemisah Pasir, Logam, Staples & Kontaminan Berat',
        imageSrc: stockprepCleanersImg,
        aspectRatio: '16:9',
        tags: ['HDC Cleaner', 'LCC Cone Battery', 'Junk Trap', 'Pressure Gauge'],
        description: 'Rangkaian pembersih sentrifugal bertekanan: High Density Cleaner (HDC) dengan sistem Junk Trap 2-katup pembuangan staples/batu, serta baterai kerucut Low Consistency Cleaner (LCC) untuk mengeliminasi pasir silika halus.',
        keyCallouts: [
          { label: 'HDC Junk Trap', detail: 'Ruang penampung kotoran berat dengan Valve A, B, C, D, E' },
          { label: 'Pressure Gauges', detail: 'Monitoring tekanan inlet (min 1.5 bar) dan accept (0.5 bar)' },
          { label: 'LCC Ceramic Cones', detail: 'Pemisah pasir silika berdensitas tinggi pada konsistensi < 1.5%' }
        ]
      },
      {
        id: 'sp-img-3',
        title: 'Seksi Penggilingan & Fibrilasi: Double Disc Refiner & Deflaker',
        subtitle: 'Pengendali Freeness (320-350 CSF) & Pengurai Gumpalan Flakes',
        imageSrc: stockprepRefinersImg,
        aspectRatio: '16:9',
        tags: ['Double Disc Refiner', 'Deflaker', 'Bar & Groove Blade', 'Ampere Meter'],
        description: 'Unit mekanik presisi tinggi: Deflaker dengan cincin rotor-stator bergigi untuk mengurai whitespot (360-380 CSF), serta DDR berkeping ganda pengontrol freeness lembaran tissue (320-350 CSF) dengan pemantauan Ampere meter.',
        keyCallouts: [
          { label: 'Motor Penggerak DDR', detail: 'Motor induksi bertenaga tinggi dengan pembacaan arus beban Ampere' },
          { label: 'Blade Disc Pattern', detail: 'Pola bar & groove presisi untuk fibrilasi eksternal serat tissue' },
          { label: 'Handwheel Adjuster', detail: 'Penyetel celah mikrometer keping pisau stator terhadap rotor' }
        ]
      }
    ],
    videoTutorials: [
      {
        id: 'sp-vid-1',
        title: 'Video Prosedur: Cara Kerja HDC & Siklus Pembuangan Junk Trap',
        duration: '07:20',
        youtubeId: '3n0F4nE1g4E',
        thumbnailUrl: stockprepCleanersImg,
        category: 'Pembersihan Kontaminan & Hydrocyclone',
        instructorRole: 'Kepala Regu Stock Prep & Teknisi Proses',
        description: 'Panduan visual komprehensif mengenai operasi normal HDC (Valve A, C, D tutup; Valve B, E buka) dan urutan flushing pembuangan kotoran staples/batu dari Junk Trap (Valve B, A tutup; Valve C, D, E buka).',
        chapters: [
          {
            time: '00:00 - 02:00',
            topic: 'Prinsip Gaya Sentrifugal & Pusaran Vorteks HDC',
            note: 'Mengapa kontaminan berat terlempar ke dinding kerucut dan turun ke junk trap',
            detailedExplanation: 'Seksi High Density Cleaner bekerja mengandalkan prinsip percepatan sentrifugal fluida cair. Suspensi bubur pulp dialirkan secara tangensial ke dalam bejana kerucut dengan tekanan inlet minimal 1.5 bar. Aliran ini menciptakan pusaran vorteks berkecepatan tinggi. Kontaminan berat seperti staples logam, pasir, kawat bal, dan batu memiliki massa jenis jauh lebih tinggi daripada serat kayu. Benda berat ini terlempar ke dinding kerucut terluar akibat gaya sentrifugal, lalu meluncur turun menuju bejana penampung bawah atau Junk Trap. Sementara serat pulp yang bersih tetap berada di pusat pusaran dan naik ke pipa accept atas.',
            technicalSpecs: [
              { label: 'Tekanan Inlet Minimum', val: '1.5 bar' },
              { label: 'Tekanan Accept Outlet', val: '0.5 bar' },
              { label: 'Konsistensi Kerja HDC', val: '2.5% - 4.0%' }
            ],
            spokenNarration: 'Seksi High Density Cleaner bekerja mengandalkan prinsip percepatan sentrifugal cairan. Suspensi bubur pulp dialirkan secara tangensial ke dalam bejana kerucut dengan tekanan inlet minimal satu koma lima bar. Aliran ini menciptakan pusaran vorteks berkecepatan tinggi. Kontaminan berat seperti staples logam, pasir, kawat bal, dan batu memiliki massa jenis jauh lebih tinggi daripada serat kayu. Benda berat ini terlempar ke dinding kerucut terluar akibat gaya sentrifugal, lalu meluncur turun menuju bejana penampung bawah atau Junk Trap. Sementara serat pulp yang bersih tetap berada di pusat pusaran dan naik ke pipa accept atas.'
          },
          {
            time: '02:01 - 04:30',
            topic: 'Fungsi Valve E & Air Elutriasi (Min 1.5 bar)',
            note: 'Mencegah serat pulp bagus ikut terbuang ke dalam ruang kotoran',
            detailedExplanation: 'Di bagian bawah kerucut, terdapat katup air elutriasi yaitu Valve E. Air bertekanan bersih dialirkan masuk melalui katup ini dengan tekanan minimal 1.5 bar. Aliran air ini berfungsi melawan gaya gravitasi serat pulp yang terbawa ke bawah, sehingga serat pulp yang bagus didorong kembali ke atas menuju zona accept. Hal ini mencegah serat berharga ikut terbuang ke dalam Junk Trap. Pada kondisi operasional normal, Valve A, Valve C, dan Valve D harus tertutup rapat, sedangkan Valve B dan Valve E terbuka penuh.',
            technicalSpecs: [
              { label: 'Tekanan Air Elutriasi (Valve E)', val: 'Min. 1.5 bar (Lebih tinggi dari pulp)' },
              { label: 'Status Operasi Normal', val: 'Valve B & E Buka; Valve A, C, D Tutup' }
            ],
            spokenNarration: 'Di bagian bawah kerucut, terdapat katup elutriasi yaitu Valve E. Air bertekanan bersih dialirkan masuk melalui katup ini dengan tekanan minimal satu koma lima bar. Aliran air ini berfungsi melawan gravitasi serat pulp yang terbawa ke bawah, sehingga serat pulp yang bagus didorong kembali ke atas menuju zona accept. Hal ini mencegah serat berharga ikut terbuang ke dalam Junk Trap. Pada kondisi operasional normal, Valve A, Valve C, dan Valve D harus tertutup rapat, sedangkan Valve B dan Valve E terbuka penuh.'
          },
          {
            time: '04:31 - 07:20',
            topic: 'Prosedur Flushing Junk Trap & Pengisian Ulang',
            note: 'Membuka Valve C drain dan Valve D vacuum breaker agar kotoran jatuh bebas',
            detailedExplanation: 'Ketika kotoran pada Junk Trap sudah menumpuk mendekati batas penglihatan kaca, operator wajib melakukan prosedur pembuangan atau flushing. Langkah pertama, tutup Valve B dan Valve A untuk mengisolasi bejana dari aliran utama. Selanjutnya, buka Valve C untuk pembuangan lumpur dan buka Valve D sebagai vacuum breaker agar kotoran jatuh tuntas ke bak penampung. Setelah bersih, tutup Valve C dan Valve D, lalu buka Valve E untuk mengisi ulang air ke dalam tabung hingga penuh bebas gelembung udara, sebelum akhirnya Valve B dibuka kembali untuk melanjutkan pembersihan.',
            technicalSpecs: [
              { label: 'Urutan Isolasi', val: 'Tutup Valve B lalu Valve A' },
              { label: 'Urutan Pembuangan', val: 'Buka Valve C (Drain) & Valve D (Vacuum)' },
              { label: 'Urutan Priming', val: 'Tutup C & D, Buka Valve E isi air penuh, lalu buka Valve B' }
            ],
            spokenNarration: 'Ketika kotoran pada Junk Trap sudah menumpuk mendekati batas penglihatan kaca, operator wajib melakukan prosedur pembuangan atau flushing. Langkah pertama, tutup Valve B dan Valve A untuk mengisolasi bejana dari aliran utama. Selanjutnya, buka Valve C untuk pembuangan lumpur dan buka Valve D sebagai vacuum breaker agar kotoran jatuh tuntas ke bak penampung. Setelah bersih, tutup Valve C dan Valve D, lalu buka Valve E untuk mengisi ulang air ke dalam tabung hingga penuh bebas gelembung udara, sebelum akhirnya Valve B dibuka kembali untuk melanjutkan pembersihan.'
          }
        ],
        keyTakeaways: [
          'Tekanan inlet HDC wajib terjaga minimal 1.5 bar dengan tekanan accept 0.5 bar untuk menciptakan Delta P pemisahan optimal.',
          'Pada kondisi normal: Valve A, C, D tertutup rapat; Valve B dan E terbuka penuh.',
          'Saat pembuangan reject: Valve B dan A wajib ditutup terlebih dahulu sebelum Valve C dan D dibuka.'
        ]
      },
      {
        id: 'sp-vid-2',
        title: 'Video Edukasi: Mekanika Fibrilasi DDR & Kalibrasi Celah Foil Screen',
        duration: '09:40',
        youtubeId: 'Dq6q-o1jN9c',
        thumbnailUrl: stockprepRefinersImg,
        category: 'Penggilingan & Fraksinasi Serat',
        instructorRole: 'Superintendent PM & Ahli Refiner Pulp',
        description: 'Penjelasan mendalam mengenai mekanisme perataan serat pada Pressure Screen 0.35 mm dengan hydrofoil gap 3.0 mm, serta pengendalian freeness (320-350 CSF) pada DDR menggunakan Ampere meter dan valve throttling.',
        chapters: [
          {
            time: '00:00 - 03:15',
            topic: 'Pressure Screen Slot 0.35 mm vs Hole 3 mm',
            note: 'Mengapa model slot menghasilkan accept lebih banyak dan bebas spinning fiber',
            detailedExplanation: 'Pada sistem penyaringan buburan sebelum dialirkan ke mesin kertas, Pressure Screen model slot 0.35 mm memberikan hasil accept yang jauh lebih unggul dibandingkan model lubang 3.0 mm. Kerapatan slot yang presisi mampu menahan serat menggumpal, serpihan plastik, dan kontaminan shives tanpa memicu terjadinya serat melintir atau spinning fiber. Buburan accept yang dihasilkan memiliki keseragaman tinggi dan bebas dari cacat white spot.',
            technicalSpecs: [
              { label: 'Ukuran Celah Screen Basket', val: 'Slot 0.35 mm Presisi Stainless Steel' },
              { label: 'Tekanan Operasi Screen', val: '2.0 - 2.8 bar' },
              { label: 'Efisiensi Reject Shives', val: '> 98% Bebas Kontaminan' }
            ],
            spokenNarration: 'Pada sistem penyaringan buburan sebelum dialirkan ke mesin kertas, Pressure Screen model slot nol koma tiga puluh lima milimeter memberikan hasil accept yang jauh lebih unggul dibandingkan model lubang tiga milimeter. Kerapatan slot yang presisi mampu menahan serat menggumpal, serpihan plastik, dan kontaminan shives tanpa memicu terjadinya serat melintir atau spinning fiber. Buburan accept yang dihasilkan memiliki keseragaman tinggi dan bebas dari gumpalan cacat white spot.'
          },
          {
            time: '03:16 - 05:45',
            topic: 'Fungsi Hydrofoil Wings & Kalibrasi Gap 3.0 mm',
            note: 'Denyut hisap membersihkan kotoran dari saringan basket tanpa menyumbat',
            detailedExplanation: 'Di dalam keranjang saringan, sayap hydrofoil berputar dengan kecepatan tinggi untuk menghasilkan denyut tekanan dan hisapan mikro secara kontinu. Jarak celah atau clearance antara ujung sayap hydrofoil ke dinding saringan wajib dikalibrasi tepat 3.0 mm keliling. Denyut hisapan di belakang sayap hydrofoil berfungsi menyedot kembali serat yang mulai menumpuk di lubang saringan, sehingga saringan basket selalu bersih dan bebas dari penyumbatan tanpa merusak anyaman saringan.',
            technicalSpecs: [
              { label: 'Jarak Celah Hydrofoil (Gap)', val: '3.0 mm Keliling Seragam' },
              { label: 'Arah Rotasi Sayap', val: 'Wajib Searah Lengkungan Basket' },
              { label: 'Pemeriksaan Rutin', val: 'Cek Baut Pengunci Rotor & Keausan Bilah' }
            ],
            spokenNarration: 'Di dalam keranjang saringan, sayap hydrofoil berputar dengan kecepatan tinggi untuk menghasilkan denyut tekanan dan hisapan mikro secara kontinu. Jarak celah atau clearance antara ujung sayap hydrofoil ke dinding saringan wajib dikalibrasi tepat tiga milimeter keliling. Denyut hisapan di belakang sayap hydrofoil berfungsi menyedot kembali serat yang mulai menumpuk di lubang saringan, sehingga saringan basket selalu bersih dan bebas dari penyumbatan tanpa merusak anyaman saringan.'
          },
          {
            time: '05:46 - 09:40',
            topic: 'Operasional DDR & Penyetelan Ampere Freeness',
            note: 'Korelasi penekanan blade, bukaan valve outlet, dan freeness 320 - 350 CSF',
            detailedExplanation: 'Pengendalian derajat kehalusan gilingan serat pada Double Disc Refiner atau DDR dilakukan melalui modulasi penekanan keping pisau dan pengaturan arus beban motor. Konsistensi bubur masuk wajib dijaga minimal 3.5%. Operator memantau jarum Ampere meter beban motor DDR serta bukaan throttling valve outlet. Untuk mencapai target freeness 320 hingga 350 CSF, penekanan keping pisau disetel bertahap agar terjadi fibrilasi eksternal pada dinding sel serat kayu tanpa memotong panjang serat, sehingga lembaran tissue memiliki kelembutan tinggi dan kekuatan tarik optimal.',
            technicalSpecs: [
              { label: 'Target Nilai Freeness', val: '320 - 350 CSF (Canadian Standard)' },
              { label: 'Konsistensi Bubur Masuk', val: 'Minimal 3.5% (Ideal 3.5% - 4.5%)' },
              { label: 'Delta Tekanan Gauge', val: 'Inlet Wajib Lebih Tinggi dari Outlet' }
            ],
            spokenNarration: 'Pengendalian derajat kehalusan gilingan serat pada Double Disc Refiner atau DDR dilakukan melalui modulasi penekanan keping pisau dan pengaturan arus beban motor. Konsistensi bubur masuk wajib dijaga minimal tiga koma lima persen. Operator memantau jarum Ampere meter beban motor DDR serta bukaan throttling valve outlet. Untuk mencapai target freeness tiga ratus dua puluh hingga tiga ratus lima puluh Canadian Standard Freeness, penekanan keping pisau disetel bertahap agar terjadi fibrilasi eksternal pada dinding sel serat kayu tanpa memotong panjang serat, sehingga lembaran tissue memiliki kelembutan tinggi dan kekuatan tarik optimal.'
          }
        ],
        keyTakeaways: [
          'Jarak gap hydrofoil ke basket pressure screen harus tepat 3.0 mm keliling dan arah putaran tidak boleh terbalik.',
          'Konsistensi bubur masuk ke DDR dan Thickener wajib minimal 3.5% (3.5% - 4.5%).',
          'Nilai tekanan gauge inlet DDR harus selalu lebih tinggi daripada outlet DDR sebagai bukti blade prima.'
        ]
      },
      {
        id: 'sp-vid-3',
        title: 'Video SOP: Pelarutan Bahan Kimia PEO & Uji Viskositas 17 - 19 Cps',
        duration: '06:30',
        youtubeId: '5Z1sT9fU2q4',
        thumbnailUrl: stockprepOverviewImg,
        category: 'Preparasi Kimiawi & Aditif Tissue',
        instructorRole: 'Operator Senior Kimia & Ahli Kualitas Tissue',
        description: 'Standar Operasional Prosedur penimbangan dan pelarutan serbuk PEO Axfloc (1729, 1730, 7090), pencegahan fish-eye, transfer Tangki 1-2-4 ke Tangki 3, dan pemompaan via Screw Pump.',
        chapters: [
          {
            time: '00:00 - 02:10',
            topic: 'Tujuan PEO & Penimbangan Serbuk Presisi',
            note: 'Membantu pembentukan formasi rata dan ikatan serat tissue lembut',
            detailedExplanation: 'Polyethylene Oxide atau PEO Axfloc merupakan polimer rantai panjang yang sangat penting dalam proses produksi tissue berdaya serap tinggi. PEO berfungsi sebagai zat pendispersi serat yang mencegah penggumpalan pada headbox, menghasilkan formasi awan kertas yang sangat rata dan tekstur lembaran yang lembut. Penimbangan serbuk PEO tipe Axfloc 1729, 1730, atau 7090 harus dilakukan sangat teliti sesuai instruksi kerja laboratorium kimia.',
            technicalSpecs: [
              { label: 'Tipe Polimer PEO', val: 'Axfloc 1729, 1730, 7090' },
              { label: 'Fungsi Utama', val: 'Pencegah Flokulasi Serat & Peningkat Formasi' },
              { label: 'Ketelitian Penimbangan', val: 'Toleransi Maksimal ± 0.02 kg' }
            ],
            spokenNarration: 'Polyethylene Oxide atau PEO Axfloc merupakan polimer rantai panjang yang sangat penting dalam proses produksi tissue berdaya serap tinggi. PEO berfungsi sebagai zat pendispersi serat yang mencegah penggumpalan pada headbox, menghasilkan formasi awan kertas yang sangat rata dan tekstur lembaran yang lembut. Penimbangan serbuk PEO tipe Axfloc seribu tujuh ratus dua puluh sembilan, seribu tujuh ratus tiga puluh, atau tujuh puluh sembilan puluh harus dilakukan sangat teliti sesuai instruksi kerja laboratorium kimia.'
          },
          {
            time: '02:11 - 04:20',
            topic: 'Teknik Menuang Serbuk & Pengadukan Lambat',
            note: 'Menuang sedikit demi sedikit ke pusaran air agar tidak terbentuk lendir menggumpal',
            detailedExplanation: 'Saat melarutkan serbuk PEO ke dalam tangki pencampur, air bersih di dalam tangki harus diaduk secara perlahan oleh agitator. Serbuk kimia wajib ditaburkan sedikit demi sedikit secara merata ke pusaran air. Dilarang menuang serbuk sekaligus dalam jumlah banyak karena akan terbentuk gumpalan lendir tak larut atau fenomena fish-eye yang dapat menyumbat nozel headbox. Biarkan proses hidrasi dan pelarutan berlangsung sempurna dengan kecepatan putar agitator rendah agar rantai polimer tidak putus.',
            technicalSpecs: [
              { label: 'Metode Penaburan', val: 'Ditabur Perlahan ke Pusaran Air' },
              { label: 'Putaran Agitator', val: 'Low RPM (Mencegah Shear Degradation)' },
              { label: 'Bahaya Penggumpalan', val: 'Cacat Fish-Eye & Nozel Tersumbat' }
            ],
            spokenNarration: 'Saat melarutkan serbuk PEO ke dalam tangki pencampur, air bersih di dalam tangki harus diaduk secara perlahan oleh agitator. Serbuk kimia wajib ditaburkan sedikit demi sedikit secara merata ke pusaran air. Dilarang menuang serbuk sekaligus dalam jumlah banyak karena akan terbentuk gumpalan lendir tak larut atau fenomena fish-eye yang dapat menyumbat nozel headbox. Biarkan proses hidrasi dan pelarutan berlangsung sempurna dengan kecepatan putar agitator rendah agar rantai polimer tidak putus.'
          },
          {
            time: '04:21 - 06:30',
            topic: 'Uji Viskositas Cps & Pompa Distribusi Screw Pump',
            note: 'Standar TM 17 - 19 Cps dan pemompaan ulir rendah shear',
            detailedExplanation: 'Setelah larutan PEO matang dan ditransfer ke tangki penampung, operator wajib melakukan pengujian viskositas menggunakan cangkir viskometer. Standar viskositas larutan untuk Paper Machine adalah 17 hingga 19 Cps. Pendistribusian larutan PEO menuju titik injeksi headbox wajib menggunakan pompa ulir atau Screw Pump bertekanan stabil. Hindari penggunaan pompa sentrifugal biasa karena gesekan tinggi bilah impeller akan merusak dan memutus rantai molekul polimer PEO.',
            technicalSpecs: [
              { label: 'Standar Viskositas Matang', val: '17 - 19 Cps (Centipoise)' },
              { label: 'Jenis Pompa Distribusi', val: 'Progressive Cavity Screw Pump' },
              { label: 'Titik Injeksi Pompa', val: 'Pipa Aliran Bubur Menuju Headbox' }
            ],
            spokenNarration: 'Setelah larutan PEO matang dan ditransfer ke tangki penampung, operator wajib melakukan pengujian viskositas menggunakan cangkir viskometer. Standar viskositas larutan untuk Paper Machine adalah tujuh belas hingga sembilan belas Centipoise. Pendistribusian larutan PEO menuju titik injeksi headbox wajib menggunakan pompa ulir atau Screw Pump bertekanan stabil. Hindari penggunaan pompa sentrifugal biasa karena gesekan tinggi bilah impeller akan merusak dan memutus rantai molekul polimer PEO.'
          }
        ],
        keyTakeaways: [
          'Serbuk PEO wajib dituang perlahan ke dalam air yang berputar pelan oleh agitator.',
          'Nilai viskositas wajib memenuhi rentang 17 - 19 Cps sebelum dialirkan ke Tissue Machine.',
          'Gunakan Screw Pump untuk mendistribusikan PEO agar rantai polimer tidak putus oleh gesekan impeller.'
        ]
      }
    ]
  },
  REWINDER: {
    heroImage: rewinderHeroImg,
    heroCaption: 'Foto Nyata: Mesin Rewinder & Slitter PT. PUP saat beroperasi memecah Jumbo Roll (JR) menjadi gulungan siap konversi.',
    galleryPhotos: [
      {
        id: 'rew-img-1',
        title: 'Tampak Keseluruhan Mesin Rewinder & Slitter',
        subtitle: 'Unwinder Stand s/d Drum Winding Roll',
        imageSrc: rewinderHeroImg,
        aspectRatio: '16:9',
        tags: ['Overhead View', 'Jumbo Roll', 'Drum Winder'],
        description: 'Menampilkan proses pelepasan gulungan Jumbo Roll (JR) dari unwinder melewati transfer roll, seksi calender, pisau slitter, hingga tergulung rapi pada drum roll berkecepatan tinggi.',
        keyCallouts: [
          { label: 'Unwind Stand', detail: 'Penahan spool jumbo roll dengan rem piringan kontrol otomatis' },
          { label: 'Jalur Lembaran (Web Path)', detail: 'Lintasan bebas kerutan dengan tension stabil' },
          { label: 'Drum Roll Penggulung', detail: 'Permukaan beralur spiral untuk traksi gulungan akhir' }
        ]
      },
      {
        id: 'rew-img-2',
        title: 'Detail Mekanik: Slitter Knives, Calender, & Banana Roll',
        subtitle: 'Seksi Pemotong & Pemecah Celah Antar Rol',
        imageSrc: rewinderPartsImg,
        aspectRatio: '16:9',
        tags: ['Close-up', 'Top/Bottom Slitter', 'Banana Bowed Roll', 'Calender Steel/Rubber'],
        description: 'Detail jarak dekat susunan Top Slitter pneumatik dan Bottom Slitter cincin karbida, roll calender penekan permukaan tissue, serta roll banana lengkung yang merentangkan lembaran agar tidak saling menempel.',
        keyCallouts: [
          { label: 'Pisau Slitter Shear Cut', detail: 'Sudut canting 0.5° - 1.0° dengan overlap presisi 1.2 mm' },
          { label: 'Banana Bowed Roll', detail: 'Lengkungan cembung aktif mencegah fenomena cacat interweaving' },
          { label: 'Nip Calender', detail: 'Kombinasi Rubber Roll dan Steel Roll untuk menghaluskan serat' }
        ]
      }
    ],
    videoTutorials: [
      {
        id: 'rew-vid-1',
        title: 'Video Edukasi: Prinsip Kerja Slitter Rewinder & Pengaturan Banana Roll',
        duration: '10:30',
        youtubeId: '7IP0Ch1Va44',
        thumbnailUrl: rewinderPartsImg,
        category: 'Operasional Inti & Mekanika Mesin',
        instructorRole: 'Kepala Regu Finishing & Teknisi Ahli Slitter Rewinder PT. PUP',
        description: 'Panduan video komprehensif mengenai prinsip mekanis mesin slitter rewinder: pemuatan jumbo roll, rem cakram pneumatik closed-loop, nip calender rubber-steel, pisau shear-cut overlap 1.2 mm, prinsip fisika banana bowed roll mencegah interweaving, serta penggulungan two-drum winder dengan programmed rider roll relief.',
        chapters: [
          {
            time: '00:00 - 01:45',
            topic: '1. Pemuatan Jumbo Roll, Core Chuck Pneumatik & Rem Unwind',
            note: 'Penguncian spool jumbo roll 3-4.5 ton, tekanan chuck 5.5 bar, serta modulasi pengereman multi-disc brake terhubung load cell.',
            detailedExplanation: 'Proses diawali dari Unwind Stand di mana Jumbo Roll dari Paper Machine dimuat. Spool besi dikunci dengan Core Chuck pneumatik pada tekanan 5.5 bar di kedua sisi agar tidak slip saat rotasi cepat. Rem cakram multi-disc pneumatik dikendalikan secara otomatis oleh load cell dan dancer roll untuk mempertahankan tegangan web pada rentang ideal 160 - 200 N/m. Seiring menyusutnya diameter jumbo roll dari Ø 2.200 mm ke bawah, torsi pengereman diturunkan secara proporsional agar lembaran tissue tipis tidak mengalami hentakan yang memicu web break.',
            technicalSpecs: [
              { label: 'Tekanan Udara Core Chuck', val: '5.5 bar (Pneumatic Lock)' },
              { label: 'Target Web Tension Unwind', val: '160 - 200 N/m' },
              { label: 'Suhu Piringan Rem Multi-Disc', val: 'Maks. 70°C (Water/Air Cooled)' },
              { label: 'Diameter Maksimal Jumbo Roll', val: 'Ø 2.200 mm (Berat s/d 4.5 Ton)' }
            ],
            spokenNarration: 'Tahap pertama adalah pemuatan Jumbo Roll pada Unwind Stand. Pastikan kedua Core Chuck pneumatik mengunci erat spool dengan tekanan udara lima koma lima bar. Sistem rem cakram multi-disc bekerja otomatis berdasarkan sinyal load cell untuk menjaga kestabilan tarikan kertas pada kisaran seratus delapan puluh Newton per meter, mencegah kertas kendor maupun robek saat kecepatan mesin bertambah.'
          },
          {
            time: '01:46 - 03:20',
            topic: '2. Unit Calender (Rubber Roll & Steel Roll) Penghalus Serat',
            note: 'Penyetelan nip calender roll atas berbahan rubber dan roll bawah berbahan steel untuk mengontrol kehalusan dan ketebalan kertas.',
            detailedExplanation: 'Lembaran tissue melintasi unit Calender 2-Roll yang terdiri dari Calender Rubber Roll di bagian atas (diameter 400 mm) dan Calender Steel Roll berkrom halus di bagian bawah (diameter 450 mm). Tekanan linier nip disetel antara 15 hingga 30 N/mm. Calendering berfungsi meratakan ketebalan (caliper profile), meningkatkan kelembutan permukaan serat tissue, serta mengontrol kerapatan lembaran tanpa mematikan daya serap (bulk preservation). Operator wajib memastikan tidak ada serpihan kertas atau kotoran menempel pada roll yang dapat melubangi tissue.',
            technicalSpecs: [
              { label: 'Konfigurasi Roll', val: 'Top Rubber (Ø 400 mm) + Bottom Steel (Ø 450 mm)' },
              { label: 'Tekanan Linier Nip Calender', val: '15 - 30 N/mm' },
              { label: 'Efek Terhadap Produk', val: 'Meningkatkan Kehalusan & Kerataan Caliper' },
              { label: 'Pemeriksaan Wajib', val: 'Permukaan Rubber Bebas Cacat & Benda Asing' }
            ],
            spokenNarration: 'Selanjutnya kertas melewati unit Calender Roll yang memadukan roll karet atas dengan roll baja krom bawah. Tekanan nip dikontrol antara lima belas hingga tiga puluh Newton per milimeter. Proses ini bertujuan menghaluskan permukaan serat dan menyamaratakan ketebalan lembaran tissue dengan tetap menjaga kelembutan dan daya serap alaminya.'
          },
          {
            time: '03:21 - 05:30',
            topic: '3. Pemotongan Pisau Slitter Shear-Cut & Hisapan Trim Blower',
            note: 'Mekanisme Circular Shear-Cut: Top Slitter canting 0.5° - 1.0°, overlap 1.0 - 1.5 mm, Bottom Slitter cincin karbida bermotor, dan hisapan sisa trim.',
            detailedExplanation: 'Unit pemotong menggunakan sistem Circular Shear-Cut presisi tinggi. Pisau atas (Top Slitter) berbentuk piringan cekung (dished blade) ditekan pneumatik dengan sudut kemiringan (canting angle) 0.5° hingga 1.0° dan overlap kedalaman 1.0 - 1.5 mm terhadap pisau bawah. Pisau bawah (Bottom Slitter) adalah cincin tungsten karbida yang berputar dengan motor independen pada kecepatan 10% lebih cepat (over-speed 1.1x) dari kecepatan linier kertas untuk menghasilkan potongan bersih bebas debu (dust-free cut edge). Potongan pinggir kiri dan kanan (trim 20-50 mm) langsung dihisap oleh corong vakum bertekanan 0.45 bar menuju Broke Pulper.',
            technicalSpecs: [
              { label: 'Sudut Kemiringan Pisau (Canting)', val: '0.5° - 1.0° (Dished Blade)' },
              { label: 'Kedalaman Overlap Pisau', val: '1.0 - 1.5 mm Presisi' },
              { label: 'Tekanan Penjepit Pisau Top', val: '1.8 - 2.2 bar' },
              { label: 'Kecepatan Pisau Bawah', val: '1.1x Kecepatan Web (Over-speed Motor)' },
              { label: 'Blower Hisap Trim', val: 'Vakum 0.45 bar ke Broke Pulper' }
            ],
            spokenNarration: 'Memasuki tahap pemotongan slitter, digunakan metode circular shear cut. Pisau atas piringan disetel dengan sudut canting nol koma lima derajat dan overlap satu koma dua milimeter terhadap cincin pisau karbida bawah yang berputar sedikit lebih cepat. Pengaturan presisi ini menjamin tepi potongan sangat rapi tanpa debu serat, sementara sisa potongan pinggir langsung dihisap blower menuju broke pulper.'
          },
          {
            time: '05:31 - 07:45',
            topic: '4. Fisika & Penyetelan Banana Bowed Roll Mencegah Interweaving',
            note: 'Penjelasan mendalam: mengapa roll melengkung, orientasi sudut puncak (apex), gaya pemisah lateral (spreading force), dan eliminasi cacat roll gandeng.',
            detailedExplanation: 'Setelah dipotong oleh pisau slitter menjadi 3 atau 4 jalur pita lembaran, celah fisik antar potongan pada awalnya adalah nol milimeter (0 mm). Jika pita lembaran langsung digulung bersamaan pada drum roll, getaran mikro dan variasi tegangan akan menyebabkan tepi gulungan saling bergesekan, bertumpukan, dan saling mengunci menjadi satu rol yang rusak total (cacat fatal interweaving / roll gandeng). Roll Banana (Bowed Spreader Roll) memiliki poros lengkung stasioner dengan selubung karet bersegmen putar. Puncak kelengkungan (apex) diarahkan membentuk sudut 15° - 30° searah tarikan lembaran. Gaya vektor lateral F = T * sin(θ) merentangkan dan membuka celah antar jalur potongan selebar 2 hingga 4 mm sebelum masuk ke drum roll, menjamin roll terpisah sempurna saat doffing!',
            technicalSpecs: [
              { label: 'Struktur Poros Roll', val: 'Poros Baja Lengkung Statis dengan Bantalan Segmen' },
              { label: 'Arah Puncak Lengkungan (Apex)', val: '15° - 30° Menghadap Arah Tarikan Lembaran' },
              { label: 'Pelebaran Celah Potongan', val: '2.0 - 4.0 mm Celah Pemisah Antar Pita' },
              { label: 'Cacat yang Dieliminasi', val: 'Interweaving Roll (Roll Gandeng / Saling Kunci)' },
              { label: 'Dampak Salah Setel Apex', val: 'Kerutan Tengah (Over-bowed) atau Gandeng (Under-bowed)' }
            ],
            spokenNarration: 'Inilah fungsi terpenting Banana Bowed Roll. Lembaran yang baru dipotong memiliki celah nol milimeter sehingga rawan bertumpuk dan saling mengunci jika langsung digulung. Poros lengkung Banana Roll dengan puncak lengkung yang diarahkan ke depan menciptakan gaya dorong ke arah samping. Hal ini merentangkan lembaran dan membuka celah dua sampai empat milimeter, sehingga gulungan kertas tidak akan pernah saling menempel atau terjadi cacat interweaving.'
          },
          {
            time: '07:46 - 09:20',
            topic: '5. Penggulungan Two-Drum Surface Winder & Programmed Rider Roll',
            note: 'Pengendalian diferensial kecepatan drum roll, programmed nip relief rider roll, dan kurva tapered tension untuk gulungan padat anti-meledak.',
            detailedExplanation: 'Lembaran pita yang telah terpisah diarahkan menuju Two-Drum Surface Winder (Front Drum dan Rear Drum Ø 400 mm beralur spiral untuk membuang lapisan udara). Kerapatan gulungan dikendalikan oleh 3 faktor (TNT: Tension, Nip, Torque). Perbedaan torsi dan kecepatan antara drum depan dan belakang (0.5 - 1.5%) mengatur kekerasan awal pada core. Rider Roll (roll penekan atas berbeban pneumatik/hidrolik) menerapkan Programmed Nip Relief: menekan kuat pada diameter awal (3.0 - 4.5 kN/m), kemudian secara otomatis mengurangi tekanan seiring bertambahnya bobot gulungan hingga Ø 1.250 mm. Hal ini mencegah kerusakan inti pipa karton (core crushing) dan pecah lipatan tissue (crepe burst).',
            technicalSpecs: [
              { label: 'Tipe Mesin Penggulung', val: 'Two-Drum Surface Winder (Ø 400 mm Fluted Drums)' },
              { label: 'Prinsip Kontrol Winding', val: 'T-N-T (Tension, Nip Load, Torque Differential)' },
              { label: 'Tekanan Rider Roll Awal', val: '3.0 - 4.5 kN/m (Beban Awal Tight Core)' },
              { label: 'Program Penurunan Tekanan', val: 'Programmed Nip Relief Linier terhadap Diameter' },
              { label: 'Diameter Maksimal Roll Jadi', val: 'Ø 1.250 - 1.500 mm Sesuai Order' }
            ],
            spokenNarration: 'Pada bagian akhir, lembaran digulung oleh sistem Two Drum Winder. Tekanan awal diberikan oleh Rider Roll untuk mengunci lapisan kertas pada pipa karton. Seiring membesarnya diameter gulungan, komputer secara cerdas mengurangi tekanan Rider Roll agar bagian dalam gulungan tetap kokoh tanpa menghancurkan pipa core, menghasilkan gulungan yang padat sempurna dan aman disimpan di gudang.'
          },
          {
            time: '09:21 - 10:30',
            topic: '6. Doffing Hidrolik, Pengecekan Kualitas Roll & Standar 5S',
            note: 'Penurunan gulungan jadi ke konveyor, pengujian kekerasan roll (Schmidt Hammer), inspeksi tepi potongan bebas debu, dan 5S area kerja.',
            detailedExplanation: 'Ketika diameter target tercapai, operator memotong lembaran pada kecepatan rendah (crawl speed) dan mengaktifkan rem drum. Lengan doffing hidrolik bergerak mengangkat dan menurunkan gulungan jadi secara mulus ke meja penerima konveyor. Operator dan Helper melakukan penimbangan bobot aktual, pengujian kekerasan gulungan (roll hardness) menggunakan Schmidt hammer (target 28-36 unit), inspeksi ketajaman tepi potongan, serta penempelan label barcode identitas. Area kerja di sekeliling slitter dibersihkan dari serbuk debu menggunakan kuas bertangkai panjang dan blower udara aman sesuai standar 5S pabrik.',
            technicalSpecs: [
              { label: 'Mekanisme Doffing', val: 'Hydraulic Cradle Arm dengan Cushion Damper' },
              { label: 'Standar Hardness Roll', val: '28 - 36 Unit (Schmidt Hammer Test)' },
              { label: 'Inspeksi Tepi Gulungan', val: 'Tegak Lurus 90°, Bebas Debu & Kerutan Tepi' },
              { label: 'Tugas Helper & Operator', val: 'Penimbangan, Labeling Barcode, dan 5S Pembersihan Area' }
            ],
            spokenNarration: 'Setelah ukuran tercapai, gulungan diturunkan secara halus menggunakan lengan hidrolik doffer. Lakukan pengujian kekerasan gulungan, pastikan tepi potongan rata tegak lurus, timbang beratnya, dan tempelkan label identitas. Selalu bersihkan serbuk kertas di area mesin demi keselamatan kerja dan standar kebersihan pabrik.'
          }
        ],
        keyTakeaways: [
          'Pisau Slitter wajib memiliki overlap 1.0 - 1.5 mm dengan sudut canting 0.5° - 1.0° agar potongan bebas debu serat.',
          'Puncak lengkungan (apex) Banana Roll wajib diarahkan 15° - 30° searah tarikan lembaran untuk memisahkan celah pita potongan sebesar 2 - 4 mm guna mengeliminasi cacat interweaving.',
          'Rider Roll harus menggunakan Programmed Nip Relief: tekanan kuat di awal (3.0 - 4.5 kN/m) lalu menurun proporsional seiring membesarnya diameter gulungan.',
          'Kepatuhan SOP K3: dilarang menyentuh roll atau pisau yang sedang berputar dan selalu pasang gembok LOTO saat pembersihan atau penggantian pisau.'
        ]
      },
      {
        id: 'rew-vid-2',
        title: 'Simulasi Prosedur K3 & SOP Penanganan Pisau Slitter',
        duration: '06:45',
        youtubeId: '2H_Jb2HZZv0',
        thumbnailUrl: rewinderHeroImg,
        category: 'Keselamatan Kerja (K3) & LOTO',
        instructorRole: 'Supervisor K3 Pabrik & Kepala PM PT. PUP',
        description: 'Demonstrasi penerapan Lock Out Tag Out (LOTO) saat membersihkan serbuk kertas, penggantian mata pisau top slitter, dan titik bahaya jepit (pinch point) drum roll.',
        chapters: [
          {
            time: '00:00 - 02:00',
            topic: '1. Identifikasi Titik Jepit Nip Roll & Bahaya Inersia Putaran',
            note: 'Zona bahaya nip roll berputar: drum roll, calender roll, dan larangan membersihkan roll secara manual saat mesin hidup.',
            detailedExplanation: 'Titik jepit (nip point) antara drum winder, calender rubber-steel, dan roll unwinder memiliki gaya tarik inersia hingga ribuan Newton. Zero Tolerance: operator dilarang keras menyentuh roll berputar dengan tangan, kain lap, atau sarung tangan karena kain dapat terlilit dan menarik anggota tubuh ke dalam celah nip dalam hitungan milidetik.',
            technicalSpecs: [
              { label: 'Zona Bahaya Kritis', val: 'Nip Drum Roll, Calender Nip, dan Infeed Slitter' },
              { label: 'Larangan Mutlak', val: 'Dilarang Menyeka Roll Berputar dengan Lap Manual' },
              { label: 'Prosedur Pembersihan', val: 'Mesin Wajib Mati Total / Gunakan Stick Pembersih Panjang' }
            ],
            spokenNarration: 'Keselamatan adalah prioritas utama. Titik jepit antara roll penekan dan drum roll berputar dengan tenaga sangat besar. Dilarang keras membersihkan roll dengan kain lap saat mesin berjalan. Segala bentuk pembersihan harus dilakukan setelah mesin berhenti total.'
          },
          {
            time: '02:01 - 04:30',
            topic: '2. Prosedur LOTO & Penggantian Pisau Top & Bottom Slitter',
            note: 'Penerapan Lock Out Tag Out 6 langkah, pemutusan saklar daya utama, verifikasi Zero Energy, dan APD sarung tangan anti-potong level 5.',
            detailedExplanation: 'Sebelum mendekati unit slitter untuk menyetel atau mengganti pisau: (1) Matikan panel kendali, (2) Putus saklar pemutus daya utama (isoloator switch), (3) Pasang gembok LOTO pribadi dan tag identitas, (4) Buang sisa tekanan pneumatik dengan membuka exhaust valve, (5) Uji tombol start untuk memastikan Zero Energy State, (6) Kenakan sarung tangan anti-potong level 5 (Kevlar/HPPE) saat memegang pisau carbide.',
            technicalSpecs: [
              { label: 'Standar APD Wajib', val: 'Sarung Tangan Anti-Potong Level 5 (Cut Resistant Level 5)' },
              { label: 'Verifikasi Zero Energy', val: 'Cek Tekanan Udara 0 bar & Saklar Listrik Tergembok' },
              { label: 'Wadah Pisau Khusus', val: 'Gunakan Kotak Magnetik Khusus Pengangkut Pisau Slitter' }
            ],
            spokenNarration: 'Saat melakukan penggantian pisau slitter, wajib terapkan prosedur Lock Out Tag Out. Matikan saklar utama, pasang gembok pengunci dan tanda peringatan, serta buang sisa tekanan udara. Wajib kenakan sarung tangan anti potong level lima sebelum memegang mata pisau karbida.'
          },
          {
            time: '04:31 - 06:45',
            topic: '3. Pengujian Tali Emergency Stop (Pull-Wire) & Evakuasi Darurat',
            note: 'Uji respons tarikan kawat darurat keliling mesin, tombol E-Stop di setiap stasiun, dan simulasi penghentian cepat.',
            detailedExplanation: 'Di sepanjang jalur mesin Rewinder terpasang tali kawat darurat (Emergency Pull-Wire Switch). Dalam keadaan darurat, tarikan pada tali ini di titik mana pun akan memutus sirkuit pengaman dan mengaktifkan rem pneumatik instan dalam waktu kurang dari 2.5 detik. Uji coba tarikan tali E-Stop wajib dilakukan setiap pergantian shift untuk memastikan saklar tidak macet dan lampu indikator alarm berfungsi.',
            technicalSpecs: [
              { label: 'Waktu Respon Rem Darurat', val: '< 2.5 Detik dari Kecepatan 800 mpm ke Berhenti' },
              { label: 'Jadwal Uji Tarik E-Stop', val: 'Dilakukan Rutin Setiap Awal Shift Kerja' },
              { label: 'Reset E-Stop', val: 'Hanya oleh Kepala Regu setelah Area Diverifikasi Aman' }
            ],
            spokenNarration: 'Tali kawat darurat membentang di sepanjang mesin untuk menghentikan putaran seketika jika terjadi insiden. Lakukan pengetesan respon tarikan kawat darurat setiap awal shift dan pastikan seluruh jalur evakuasi di sekitar mesin selalu bersih dan bebas dari tumpukan limbah kertas.'
          }
        ],
        keyTakeaways: [
          'Patuhi Zero Tolerance untuk titik jepit: matikan mesin total sebelum menyentuh roll.',
          'Gunakan sarung tangan anti-potong level 5 saat menangani pisau slitter dan selalu kunci gembok LOTO.',
          'Pastikan area rolling zone bersih sebelum mengaktifkan hidrolik penurun roll (doffer).'
        ]
      }
    ]
  },

  PM1: {
    heroImage: pm1HeroImg,
    heroCaption: 'Foto Nyata: Mesin PM1 (Cylinder Mould) Produksi Tissue, MG Paper & Doorslag. Speed 150 mpm, Lebar Kertas 2,20 M, Lebar Felt 2,4 M, Top Felt 18,8 M & Bottom Felt 25,0 M.',
    galleryPhotos: [
      {
        id: 'pm1-img-1',
        title: 'Lini Mesin Cylinder Mould PM1 (Speed 150 mpm)',
        subtitle: 'Produksi Tissue (12-22 gsm), MG Paper (24-26 gsm), & Doorslag (36-42 gsm)',
        imageSrc: pm1HeroImg,
        aspectRatio: '16:9',
        tags: ['Cylinder Mould Vat', 'Felt 2,4 M', 'Yankee MG Dryer', 'Lebar Kertas 2,20 M'],
        description: 'Menampilkan unit mesin Cylinder Mould PM1 dengan bak vat pembentuk serat kertas tipis, kain felt pembawa lebar 2,4 M (Top Felt 18,8 M & Bottom Felt 25,0 M), dan silinder Yankee MG untuk kertas berkecepatan 150 mpm.',
        keyCallouts: [
          { label: 'Tipe Mesin', detail: 'Cylinder Mould untuk Tissue, MG Paper & Doorslag' },
          { label: 'Spesifikasi Felt', detail: 'Lebar 2,4 M | Top 18,8 M & Bottom 25,0 M | Life Time 6-8 bln (1000 ton up)' },
          { label: 'Lebar Kertas & Speed', detail: 'Lebar Kertas 2,20 M | Kecepatan Operasi 150 mpm' }
        ]
      }
    ],
    videoTutorials: [
      {
        id: 'pm1-vid-1',
        title: 'Video Simulasi: Formasi Cylinder Mould & Perawatan Felt PM1',
        duration: '07:15',
        youtubeId: '3eZzKj7K0d8',
        thumbnailUrl: pm1HeroImg,
        category: 'Proses Silinder Cetakan & Kain Felt',
        instructorRole: 'Kepala Regu PM1 & Teknisi Mesin Kertas',
        description: 'Materi visual interaktif mengenai pembentukan lembaran tipis BW 12-42 gsm di bak cylinder vat, pemeliharaan Top Felt 18,8 M & Bottom Felt 25,0 M, serta pengeringan silinder Yankee pada kecepatan 150 mpm.',
        chapters: [
          { time: '00:00 - 02:10', topic: 'Prinsip Pembentukan di Cylinder Mould Vat', note: 'Penyaringan bubur encer pada silinder kawat berputar tanpa semburan berlebih' },
          { time: '02:11 - 04:30', topic: 'Penarikan Lembaran oleh Top & Bottom Felt (Lebar 2,4 M)', note: 'Pengaturan tegangan Top Felt 18,8 M dan Bottom Felt 25,0 M agar tidak slip' },
          { time: '04:31 - 07:15', topic: 'Pengeringan Yankee MG & Pencapaian Target 1.000 Ton Up', note: 'Monitoring usia pakai kain felt (6-8 bulan) dan kontrol kelembaban akhir' }
        ],
        keyTakeaways: [
          'Jaga kebersihan kain felt lebar 2,4 M dengan pencucian rutin agar mencapai masa pakai target 6-8 bulan (> 1.000 ton paper up).',
          'Pastikan tekanan uap silinder Yankee stabil pada standar 1.0 - 3.0 bar pada kecepatan kerja 100 - 150 mpm.',
          'Kontrol lebar trim lembaran kertas di 2,20 M menggunakan water jet cutter presisi.'
        ]
      }
    ]
  },

  PM2: {
    heroImage: pm2HeroImg,
    heroCaption: 'Foto Nyata: Mesin PM2 (Cylinder Mould High-Speed 180 mpm). Produksi Tissue, MG Paper & Doorslag. Lebar Kertas 2,25 M, Lebar Felt 2,4 M, Top Felt 18,8 M & Bottom Felt 25,0 M.',
    galleryPhotos: [
      {
        id: 'pm2-img-1',
        title: 'Lini Mesin Cylinder Mould PM2 (Speed 180 mpm)',
        subtitle: 'Produksi Kertas Cepat: Tissue (12-22 gsm), MG Paper (24-26 gsm), & Doorslag (36-42 gsm)',
        imageSrc: pm2HeroImg,
        aspectRatio: '16:9',
        tags: ['Cylinder Mould High-Speed', 'Felt 2,4 M', 'Lebar 2,25 M', 'Speed 180 mpm'],
        description: 'Memperlihatkan formasi cylinder mould berkecepatan tinggi 180 mpm di lini PM2 dengan lebar kertas 2,25 M, didukung susunan kain felt lebar 2,4 M (Top Felt 18,8 M dan Bottom Felt 25,0 M) berdaya tahan 6-8 bulan (> 1.000 ton paper up).',
        keyCallouts: [
          { label: 'Tipe Mesin', detail: 'Cylinder Mould High-Speed untuk Tissue, MG & Doorslag' },
          { label: 'Spesifikasi Felt', detail: 'Lebar 2,4 M | Top 18,8 M & Bottom 25,0 M | Umur 6-8 bln (1000 ton up)' },
          { label: 'Lebar Kertas & Speed', detail: 'Lebar Kertas 2,25 M | Kecepatan Operasi 180 mpm' }
        ]
      }
    ],
    videoTutorials: [
      {
        id: 'pm2-vid-1',
        title: 'Video Simulasi: Operasional Cylinder Mould 180 mpm & Manajemen Felt PM2',
        duration: '06:50',
        youtubeId: 'X2t_6WfPz3I',
        thumbnailUrl: pm2HeroImg,
        category: 'Kecepatan Tinggi & Kualitas Lembaran',
        instructorRole: 'Kepala Bagian Mesin Kertas PM2',
        description: 'Penjelasan teknis stabilitas operasi pada speed 180 mpm, pengendalian ketebalan kertas MG/Tissue, serta panduan tracking felt Top 18,8 M dan Bottom 25,0 M.',
        chapters: [
          { time: '00:00 - 02:00', topic: 'Karakteristik Operasi 180 mpm pada Cylinder Vat', note: 'Menjaga aliran bubur stabil agar formasi kertas 12-42 gsm tidak berawan' },
          { time: '02:01 - 04:20', topic: 'Sinkronisasi Top Felt 18,8 M vs Bottom Felt 25,0 M', note: 'Mencegah gesekan antar felt dan memastikan pemerasan air maksimal' },
          { time: '04:21 - 06:50', topic: 'Inspeksi & Pemeliharaan Kualitas Lebar Kertas 2,25 M', note: 'Menjaga kerataan penempelan lembaran pada silinder Yankee MG' }
        ],
        keyTakeaways: [
          'Kecepatan 180 mpm memerlukan pelumasan bearing roll felt dan shower osilasi yang selalu optimal.',
          'Catat tonase kumulatif produksi per shift untuk memprediksi jadwal penggantian felt (6-8 bulan / 1000 ton up).',
          'Pastikan tekanan touch roll merata untuk menghasilkan efek kilap MG yang homogen.'
        ]
      }
    ]
  },

  PM5: {
    heroImage: pm5HeroImg,
    heroCaption: 'Foto Nyata: Mesin PM5 (Cylinder Mould Wide Format). Lebar Kertas 3,30 M, Lebar Felt 3,5 M, Single Felt 30,0 M, Speed 160 mpm. Produksi Tissue, MG Paper & Doorslag.',
    galleryPhotos: [
      {
        id: 'pm5-img-1',
        title: 'Lini Mesin Cylinder Mould Format Lebar PM5 (Speed 160 mpm)',
        subtitle: 'Kapasitas Besar: Tissue (12-22 gsm), MG Paper (24-26 gsm), Doorslag (36-42 gsm)',
        imageSrc: pm5HeroImg,
        aspectRatio: '16:9',
        tags: ['Wide Cylinder Mould', 'Single Felt 30 M', 'Lebar 3,30 M', 'Lebar Felt 3,5 M'],
        description: 'Menampilkan lini terlebar PM5 dengan sistem pembentukan silinder saringan lebar 3,5 M, sistem Single Felt sepanjang 30,0 M berdaya tahan 6-8 bulan (> 1.000 ton paper up), serta silinder Yankee MG format lebar 3,30 M pada kecepatan 160 mpm.',
        keyCallouts: [
          { label: 'Tipe Mesin', detail: 'Cylinder Mould Format Lebar (Wide Cylinder Mould)' },
          { label: 'Spesifikasi Felt', detail: 'Lebar 3,5 M | Single Felt 30,0 M | Life Time 6-8 bln (1000 ton up)' },
          { label: 'Lebar Kertas & Speed', detail: 'Lebar Kertas 3,30 M | Kecepatan Operasi 160 mpm' }
        ]
      }
    ],
    videoTutorials: [
      {
        id: 'pm5-vid-1',
        title: 'Video Simulasi: Operasional Single Felt 30 M & Cylinder Mould Lebar PM5',
        duration: '09:10',
        youtubeId: 'K9J-sE0gT1A',
        thumbnailUrl: pm5HeroImg,
        category: 'Format Lebar & Single Felt System',
        instructorRole: 'Superintendent PM5 & Teknisi Ahli Felt',
        description: 'Panduan visual eksklusif pengoperasian sistem Single Felt 30,0 M selebar 3,5 M, pengaturan tegangan bentang lebar, dan pemeliharaan silinder Yankee 3,30 M pada kecepatan 160 mpm.',
        chapters: [
          { time: '00:00 - 02:40', topic: 'Keunggulan Single Felt System 30,0 M', note: 'Transfer lembaran kontinyu tanpa sambungan ganda, meningkatkan efisiensi dewatering' },
          { time: '02:41 - 05:30', topic: 'Pengendalian Bentang Lebar 3,5 M & Auto-Guiding', note: 'Menjaga kelurusan felt tunggal sepanjang 30 meter di putaran 160 mpm' },
          { time: '05:31 - 09:10', topic: 'Monitoring Target 1.000 Ton Up & Kualitas Gulungan 3,30 M', note: 'Prosedur pemeliharaan felt agar mencapai masa pakai 6 - 8 bulan' }
        ],
        keyTakeaways: [
          'Sistem Single Felt 30,0 M dengan lebar 3,5 M memerlukan perhatian khusus pada pemandu otomatis (auto guide) agar felt tidak lari ke samping.',
          'Pencucian felt bertekanan tinggi (HP shower) dan conditioning kimiawi menjaga permeabilitas felt stabil hingga 1.000 ton paper up.',
          'Pastikan kestabilan uap silinder Yankee pada standar 1.0 - 3.0 bar untuk mengeringkan lembaran selebar 3,30 M.'
        ]
      }
    ]
  }
};

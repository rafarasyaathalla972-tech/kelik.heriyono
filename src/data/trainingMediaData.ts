import { MachineMediaConfig, TrainingModuleId } from '../types';

// Real generated industrial images
import rewinderHeroImg from '../assets/images/rewinder_machine_1789447453640.jpg';
import rewinderPartsImg from '../assets/images/rewinder_parts_1789447473542.jpg';
import pm1HeroImg from '../assets/images/pm1_machine_1789447494837.jpg';
import pm2HeroImg from '../assets/images/pm2_machine_1789447511803.jpg';
import pm5HeroImg from '../assets/images/pm5_machine_1789447532514.jpg';

export const TRAINING_MEDIA_DATA: Record<TrainingModuleId, MachineMediaConfig> = {
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
        duration: '08:45',
        youtubeId: '7IP0Ch1Va44',
        thumbnailUrl: rewinderPartsImg,
        category: 'Operasional Inti & Mekanika Mesin',
        instructorRole: 'Kepala Regu Finishing & Teknisi Mesin',
        description: 'Panduan video lengkap mengenai cara kerja pisau slitter, pengaturan tegangan unwinder rem disk, serta fungsi vital banana roll dalam memisahkan jalur potongan lembaran kertas/tissue.',
        chapters: [
          { time: '00:00 - 01:30', topic: 'Pengenalan Unwinder & Pemuatan Jumbo Roll', note: 'Cara memposisikan core chuck dan verifikasi kelurusan spool' },
          { time: '01:31 - 03:45', topic: 'Mekanisme Pemotongan Pisau Slitter Atas & Bawah', note: 'Penyetelan overlap pisau 1.0 - 1.5 mm dan sudut canting 0.5°' },
          { time: '03:46 - 05:50', topic: 'Fungsi Banana Roll Mencegah Interweaving', note: 'Mengapa roll berbentuk lengkung dan cara mengatur arah puncak lengkung (apex)' },
          { time: '05:51 - 08:45', topic: 'Penggulungan pada Drum Roll & Ejeksi Doffing', note: 'Pengendalian tapered tension rider roll hingga roll siap kirim' }
        ],
        keyTakeaways: [
          'Jangan pernah membiarkan pisau slitter berputar dalam kondisi tumpul karena memicu debu berlebih dan tepi sobek.',
          'Banana roll harus selalu diselaraskan arah lengkungannya terhadap tarikan web lembaran.',
          'Tegangan lembaran harus turun secara bertahap (tapered) seiring membesarnya diameter gulungan.'
        ]
      },
      {
        id: 'rew-vid-2',
        title: 'Simulasi Prosedur K3 & SOP Penanganan Pisau Slitter',
        duration: '05:30',
        youtubeId: '2H_Jb2HZZv0',
        thumbnailUrl: rewinderHeroImg,
        category: 'Keselamatan Kerja (K3) & LOTO',
        instructorRole: 'Supervisor K3 Pabrik & Kepala PM',
        description: 'Demonstrasi penerapan Lock Out Tag Out (LOTO) saat membersihkan serbuk kertas, penggantian mata pisau top slitter, dan titik bahaya jepit (pinch point) drum roll.',
        chapters: [
          { time: '00:00 - 01:20', topic: 'Identifikasi Titik Jepit Nip Roll & Bahaya Inersia', note: 'Larangan membersihkan roll berputar dengan kain lap manual' },
          { time: '01:21 - 03:15', topic: 'Prosedur LOTO & Penggantian Pisau Slitter', note: 'Wajib sarung tangan anti-potong level 5 dan kunci pemutus daya' },
          { time: '03:16 - 05:30', topic: 'Evakuasi & Pengoperasian Tali Emergency Stop', note: 'Uji respons tarikan kabel kawat darurat (pull-wire switch)' }
        ],
        keyTakeaways: [
          'Patuhi Zero Tolerance untuk titik jepit: matikan mesin total sebelum menyentuh roll.',
          'Gunakan kuas bertangkai panjang dan blower udara aman bertekanan rendah untuk membersihkan debu serat.',
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

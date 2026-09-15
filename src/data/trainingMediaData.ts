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
    heroCaption: 'Foto Nyata: Mesin Kertas PM1 (Medium Paper Specialist) dengan Fourdrinier forming table klasik dan jajaran 28 silinder pengering steam.',
    galleryPhotos: [
      {
        id: 'pm1-img-1',
        title: 'Lini Produksi Kertas PM1 (Fourdrinier Table & Press Section)',
        subtitle: 'Pembentukan Lembaran Kertas Medium Fluting',
        imageSrc: pm1HeroImg,
        aspectRatio: '16:9',
        tags: ['Fourdrinier Wire', 'Press Felt', 'Dryer Cylinders'],
        description: 'Tampak memanjang area pembentukan lembaran basah di atas wire Fourdrinier berkecepatan 380 - 450 m/menit, dilanjutkan dengan pemerasan air di press roll granit dan silinder pengering uap panas.',
        keyCallouts: [
          { label: 'Fourdrinier Forming Wire', detail: 'Pelepasan air gravitasi & vacuum suction box keramik' },
          { label: 'Straight-Through Press', detail: 'Pemerasan mekanik dengan felt penyerap air bertekanan tinggi' },
          { label: 'Dryer Hood', detail: 'Tudung tertutup uap panas untuk efisiensi termal silinder' }
        ]
      }
    ],
    videoTutorials: [
      {
        id: 'pm1-vid-1',
        title: 'Video Simulasi: Formasi Serat di Fourdrinier & Press Section PM1',
        duration: '07:15',
        youtubeId: '3eZzKj7K0d8',
        thumbnailUrl: pm1HeroImg,
        category: 'Proses Basah & Pengeringan',
        instructorRole: 'Kepala Regu PM1 & Ahli Kimia Pulp',
        description: 'Materi visual interaktif mengenai cara mengatur rasio kecepatan jet-to-wire, konsistensi bubur dari headbox, dan efisiensi pengeringan uap silinder dryer.',
        chapters: [
          { time: '00:00 - 02:10', topic: 'Aliran Bubur Kertas dari Slice Headbox', note: 'Distribusi serat merata pada kawat saringan Fourdrinier' },
          { time: '02:11 - 04:30', topic: 'Dewatering & Garis Kering (Dry Line)', note: 'Memantau posisi garis batas air di suction box' },
          { time: '04:31 - 07:15', topic: 'Pengeringan Uap & Kontrol Kelembaban Akhir', note: 'Menjaga moisture content 7.0% - 8.5% untuk kertas fluting kuat' }
        ],
        keyTakeaways: [
          'Posisi garis kering (dry line) adalah indikator utama konsistensi freeness bubur kertas.',
          'Pastikan tekanan uap steam header tidak melebihi 4.8 bar untuk keamanan silinder.',
          'Jaga kebersihan doctor blade roll pengering agar lembaran tidak terbakar/menempel.'
        ]
      }
    ]
  },

  PM2: {
    heroImage: pm2HeroImg,
    heroCaption: 'Foto Nyata: Mesin Kertas PM2 dengan sistem Twin-Wire Former ganda untuk dewatering dua arah kecepatan tinggi.',
    galleryPhotos: [
      {
        id: 'pm2-img-1',
        title: 'Area Pembentukan Twin-Wire Former PM2',
        subtitle: 'Dewatering Atas-Bawah untuk Kertas Linerboard Berkualitas',
        imageSrc: pm2HeroImg,
        aspectRatio: '16:9',
        tags: ['Twin-Wire Former', 'Top & Bottom Wire', 'Suction Roll'],
        description: 'Memperlihatkan teknologi twin-wire modern di mana lembaran bubur dijepit di antara kawat atas dan kawat bawah, menghasilkan dewatering dua arah simetris tanpa perbedaan sisi (two-sidedness).',
        keyCallouts: [
          { label: 'Kawat Ganda (Twin-Wire)', detail: 'Menghasilkan lembaran dengan formasi serat sangat padat' },
          { label: 'Suction Couch Roll', detail: 'Pengisapan air bertenaga tinggi sebelum masuk ke press seksi' },
          { label: 'Sistem Osilasi Shower', detail: 'Pembersihan kawat wire kontinu dari serat tersumbat' }
        ]
      }
    ],
    videoTutorials: [
      {
        id: 'pm2-vid-1',
        title: 'Video Simulasi: Operasional Twin-Wire Former & Pengaturan Caliper PM2',
        duration: '06:50',
        youtubeId: 'X2t_6WfPz3I',
        thumbnailUrl: pm2HeroImg,
        category: 'Teknologi Pembentukan Modern',
        instructorRole: 'Kepala Bagian Mesin Kertas PM2',
        description: 'Penjelasan mendalam mengenai keunggulan twin-wire dalam menghasilkan ketebalan kertas seragam, penanganan drainage vacuum, dan optimasi kecepatan operasi hingga 600 m/min.',
        chapters: [
          { time: '00:00 - 02:00', topic: 'Prinsip Twin-Wire Forming & Reduksi Two-Sidedness', note: 'Permukaan atas dan bawah kertas memiliki kehalusan seimbang' },
          { time: '02:01 - 04:20', topic: 'Pengaturan Tekanan Vakum High-Vacuum Flat Boxes', note: 'Mencegah kawat aus dini sambil memaksimalkan dewatering' },
          { time: '04:21 - 06:50', topic: 'Inspeksi & Penyetelan Profil Ketebalan (Caliper)', note: 'Menghindari roll menggembung di salah satu sisi' }
        ],
        keyTakeaways: [
          'Teknologi twin-wire menghasilkan daya ikat internal (Scott Bond) kertas yang jauh lebih tinggi.',
          'Pembersihan shower berkala sangat krusial untuk mencegah penyumbatan pori kawat forming.',
          'Periksa sinkronisasi kecepatan motor kawat atas dan kawat bawah setiap pergantian grade.'
        ]
      }
    ]
  },

  PM5: {
    heroImage: pm5HeroImg,
    heroCaption: 'Foto Nyata: Mesin Kertas PM5 (State-of-the-Art Line) dilengkapi Shoe Press nip lebar dan jembatan scanner QCS online presisi.',
    galleryPhotos: [
      {
        id: 'pm5-img-1',
        title: 'Lini Modern PM5 dengan Shoe Press & Jembatan QCS Scanner',
        subtitle: 'Unit Produksi Kertas Kraft Liner & White Top Berkecepatan 750 m/menit',
        imageSrc: pm5HeroImg,
        aspectRatio: '16:9',
        tags: ['Shoe Press Nip', 'QCS Scanner Bridge', 'High Speed Dryer'],
        description: 'Tampak unit Shoe Press hidrolik berefisiensi dewatering tertinggi, sistem penutup kap pengering canggih, dan jembatan pemindai QCS (Quality Control System) yang mengukur gramatur, moisture, dan ketebalan secara real-time.',
        keyCallouts: [
          { label: 'Shoe Press Module', detail: 'Nip kontak lebar 250 mm memberikan kekeringan 48% sebelum dryer' },
          { label: 'QCS Scanner Bridge', detail: 'Sensor online bergerak bolak-balik memeriksa profil kualitas kertas' },
          { label: 'Silent Drive Enclosed Hood', detail: 'Efisiensi energi termal maksimal dengan sirkulasi udara terkontrol' }
        ]
      }
    ],
    videoTutorials: [
      {
        id: 'pm5-vid-1',
        title: 'Video Simulasi: Prinsip Kerja Shoe Press & Pembacaan Sensor QCS PM5',
        duration: '09:10',
        youtubeId: 'K9J-sE0gT1A',
        thumbnailUrl: pm5HeroImg,
        category: 'Otomasi Pabrik & Teknologi Canggih',
        instructorRole: 'Superintendent PM5 & Teknisi QCS Instrumentasi',
        description: 'Panduan visual eksklusif pengoperasian shoe press hidrolik, pembacaan grafik gramatur profil CD/MD pada monitor DCS, dan prosedur keselamatan radiasi scanner.',
        chapters: [
          { time: '00:00 - 02:40', topic: 'Cara Kerja Tekanan Sepatu (Shoe Nip) & Sabuk Karet (Belt)', note: 'Waktu kontak tekan lebih lama meningkatkan bulk dan kekuatan serat' },
          { time: '02:41 - 05:30', topic: 'Pembacaan Layar Kontrol QCS & Pengendalian Berat Dasar', note: 'Korelasi slice lip control otomatis dengan profil gramatur' },
          { time: '05:31 - 09:10', topic: 'Protokol Keamanan Radiasi Sensor QCS & Anti-Tabrakan', note: 'Aturan keselamatan saat scanner bolak-balik melintasi lembaran' }
        ],
        keyTakeaways: [
          'Shoe press menghemat konsumsi uap steam hingga 25% karena kadar air lembaran keluar press sudah sangat rendah.',
          'Jangan pernah mendekati shutter scanner saat lampu indikator radiasi merah aktif.',
          'Pantau pelumasan sirkulasi oli hidrolik shoe press untuk menjaga keawetan belt karet sintetis.'
        ]
      }
    ]
  }
};

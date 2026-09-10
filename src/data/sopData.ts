import { SopStep } from '../types';

export const SOP_PROCESS_STEPS: SopStep[] = [
  {
    id: 'pulper',
    title: '1. Bagian Pulper (Pulping & Hydrapulper)',
    purpose: 'Menguraikan bahan baku kertas bekas (OCC/Old Corrugated Containers, Duplex, atau Virgin Pulp) dengan air menjadi suspensi serat bubur kertas homogen tanpa merusak kekuatan serat primer.',
    preparation: [
      'Lakukan inspeksi visual ke dalam bak pulper: pastikan tidak ada benda asing (kawat bale, plastik besar, besi, kayu).',
      'Periksa kondisi rotor, stator plate, dan ragger/junk trap dalam keadaan bersih dan siap operasi.',
      'Cek level air proses (white water / fresh water) pada tangki penampung.',
      'Pastikan valve pembuangan (dump valve) dan valve transfer dalam posisi tertutup rapat.',
      'Verifikasi sistem interlock pengaman, tombol emergency stop, dan motor listrik berpelumas cukup.',
      'Kenakan APD lengkap: helm keselamatan, kacamata safety, masker debu, earplug, sarung tangan heavy duty, dan sepatu safety.'
    ],
    operationalSteps: [
      'Isi bak pulper dengan White Water hingga mencapai 60% dari volume kerja yang ditentukan.',
      'Nyalakan motor hydrapulper pada kecepatan putaran rendah, pastikan putaran rotor vortex stabil tanpa getaran abnormal.',
      'Masukkan bahan baku (bale OCC/kertas) secara bertahap melalui konveyor feeder sesuai resep batch (kapasitas standar 3 - 5 ton per batch).',
      'Tambahkan air proses hingga mencapai target konsistensi kerja.',
      'Jalankan proses pengadukan/pulping selama durasi standar (18 - 25 menit) sesuai jenis serat baku.',
      'Aktifkan ragger line secara berkala untuk menarik lilitan kawat, tali plastik, dan kontaminan serat panjang.',
      'Jalankan junk remover untuk menguras kontaminan berat (batu, pasir, staples) ke junk trap.',
      'Setelah waktu defibering tercapai dan serat terurai sempurna, buka dump valve untuk mentransfer bubur ke Dump Chest melalui poire screen.'
    ],
    keyParameters: [
      { name: 'Konsistensi Bubur (Consistency)', standard: '4.0% - 5.5% (High/Medium Consistency 12-15% jika HD Pulper)', note: 'Jaga akurasi flowmeter air dan timbangan bale' },
      { name: 'Suhu Pemasakan / Air', standard: '45°C - 55°C', note: 'Suhu optimal mempercepat hidrasi serat tanpa merusak sizing agent' },
      { name: 'Waktu Pengadukan (Batch Time)', standard: '18 - 25 Menit per batch', note: 'Jangan melebihi 30 menit agar serat tidak terpotong (fines berlebih)' },
      { name: 'Putaran Rotor (RPM)', standard: '280 - 320 RPM', note: 'Pantau arus motor (Ampere) tidak melebihi batas trip 185 A' }
    ],
    rawMaterialsAndAdditives: [
      'Bahan baku: OCC Lokal A, OCC Import (AOCC/EOCC), Mixed Waste, Kraft Broke.',
      'Bahan kimia pendukung pulper: De-inking agent (jika kertas putih/kraft bleached), Caustic Soda (NaOH) untuk pengkondisian pH 7.5 - 8.5, Biocide penekan bakteri anaerob.',
      'Defoamer (Anti-busa): Dosis 0.2 - 0.5 kg/ton jika timbul busa berlebih pada pusaran vortex.'
    ],
    routineChecks: [
      'Cek visual pusaran bubur (vortex) setiap 5 menit: pastikan sirkulasi merata dari pinggir ke poros rotor.',
      'Ambil sampel bubur dengan ladle cup, periksa tingkat kehalusan dan ketiadaan flake/gumpalan besar.',
      'Pantau suhu bearing motor dan getaran gearbox (maks 4.5 mm/s RMS).',
      'Pantau indikator Ampere meter pada panel lokal/DCS: jika arus melonjak di atas 190A segera kurangi beban feeder konveyor.',
      'Periksa pembuangan junk separator setiap 2 batch.'
    ],
    troubleshooting: [
      {
        issue: 'Serat belum larut sempurna (Banyak gumpalan / flakes)',
        cause: 'Waktu pengadukan kurang, konsistensi terlalu kental, atau bahan baku terlalu banyak kertas basah/waterproof.',
        solution: 'Tambah waktu putaran 5-7 menit, naikkan suhu air dengan injeksi steam ringan, turunkan konsistensi dengan menambah 10% white water.'
      },
      {
        issue: 'Sumbatan pada lubang saringan (Extraction Plate Clogged)',
        cause: 'Akumulasi plastik, lakban, tali rafia, atau kontaminan kawat yang menyumbat celah plate.',
        solution: 'Hentikan pengisian bahan baru, lakukan backflush dengan shower bertekanan tinggi (5-7 bar), jalankan ragger line, bersihkan junk trap.'
      },
      {
        issue: 'Kebocoran pada Gland Packing / Mechanical Seal Rotor',
        cause: 'Keausan seal akibat gesekan partikel pasir atau tekanan seal water drop.',
        solution: 'Periksa tekanan seal water (harus 1 bar di atas tekanan hidrolik bak), lakukan pengencangan baut gland secara simetris atau jadwalkan penggantian seal.'
      }
    ],
    shutdownAndCleaning: [
      'Kosongkan sisa bubur di dalam bak pulper sampai habis ke dump chest.',
      'Nyalakan shower pembersih dinding pulper (washing cycle) dengan air bersih selama 5-10 menit.',
      'Buka drain valve dasar untuk menguras endapan pasir dan kerikil halus.',
      'Kunci panel daya utama (LOTO - Lockout Tagout) bila operator masuk ke dalam bak untuk inspeksi keausan pisau rotor.'
    ]
  },
  {
    id: 'stock-prep',
    title: '2. Bagian Stock Preparation (Persiapan Bubur & Kimia)',
    purpose: 'Membersihkan kotoran mikro/makro, mengembangkan kemampuan ikatan antar serat (fibrilasi) melalui proses refining, serta mencampurkan bahan kimia fungsional agar bubur siap dialirkan ke headbox mesin kertas.',
    preparation: [
      'Pastikan level Dump Chest, Mixing Chest, dan Machine Chest berada pada level minimum 40%.',
      'Verifikasi kelurusan dan kesiapan line pipa: valve pneumatik dan manual terbuka sesuai routing produk.',
      'Periksa kondisi mechanical seal water pada semua pompa bubur (Stock Pump) dan agitator.',
      'Nyalakan sistem pelumasan pendingin oli pada Double Disc Refiner (DDR).',
      'Pastikan tangki kimia (Starch kationik, AKD internal sizing, Retention Aid, Defoamer, Pewarna) memiliki volume cukup dan metering pump berfungsi akurat.'
    ],
    operationalSteps: [
      'Jalankan High Density Cleaner (HDC) untuk memisahkan pasir, kerikil halus, staples, dan kotoran berat dengan gaya sentrifugal.',
      'Alirkan bubur ke Coarse Screen (Screen Kasar lubang 1.2 - 1.8 mm) lalu ke Fine Screen (celah slot 0.15 - 0.25 mm) untuk mengeliminasi sticky dan serpihan mikro.',
      'Arahkan bubur ke Thickener / Disc Filter untuk menaikkan konsistensi sebelum masuk ke refining chest.',
      'Jalankan Double Disc Refiner (DDR): atur gap pelat disc refiner secara mikrometrik hingga mencapai derajat Freeness (°SR) target produk.',
      'Di Mixing Chest, lakukan injeksi zat aditif fungsional: Kationik Starch untuk internal bond (Scott Plybond), PAC / Alum untuk fiksasi, dan AKD untuk ketahanan air (Cobb 60 test).',
      'Arahkan bubur ke Machine Chest dengan konsistensi stabil 2.8% - 3.2% sebelum dipompa ke Fan Pump mesin kertas.'
    ],
    keyParameters: [
      { name: 'Freeness Bubur (°SR - Schopper Riegler)', standard: 'Kraft: 28 - 34 °SR | Medium: 35 - 42 °SR', note: 'Diuji setiap 2 jam menggunakan freeness tester di laboratorium basah' },
      { name: 'Konsistensi Machine Chest', standard: '2.8% - 3.2% ± 0.05%', note: 'Dikontrol otomatis oleh Konsistensi Transmitter (QCS/Microwave)' },
      { name: 'Dosis AKD Sizing Agent', standard: '8 - 14 kg / ton kertas kering', note: 'Menentukan nilai Cobb Size (daya serap air)' },
      { name: 'Dosis Kationik Starch', standard: '6 - 12 kg / ton kertas kering', note: 'Meningkatkan Ring Crush Test (RCT) dan Bursting Strength' },
      { name: 'Tekanan Masuk / Keluar Refiner (Inlet/Outlet Press)', standard: 'Inlet: 2.0 - 2.5 bar | Differential: 0.8 - 1.2 bar', note: 'Mencegah kavitasi dan benturan pelat refiner' }
    ],
    rawMaterialsAndAdditives: [
      'Alur Aliran Bubur: Dump Chest -> HDC -> Coarse Screen -> Thickener -> Refiner -> Mixing Chest -> Machine Chest -> Fan Pump.',
      'Bahan Kimia Tambah: Cationic Starch, Alkyl Ketene Dimer (AKD), PAC (Poly Aluminium Chloride), Polimer Retention Aid, Defoamer, Fluorescent Whitening Agent (FWA khusus PM5).'
    ],
    routineChecks: [
      'Lakukan uji °SR (Freeness) berkala setiap pergantian shift atau setiap 2 jam sekali.',
      'Periksa stabilitas pembacaan sensor konsistensi (Consistency Controller) dan kalibrasi gravimetrik berkala.',
      'Cek tekanan diferensial pada pressure screen: jika dP > 0.6 bar segera lakukan reject purging.',
      'Periksa laju alir (flow rate) pompa metering bahan kimia: pastikan tidak ada selang kimia yang berkerak atau bocor.'
    ],
    troubleshooting: [
      {
        issue: 'Nilai Freeness (°SR) terlalu tinggi (Bubur terlalu halus / lemas)',
        cause: 'Beban refiner terlalu berat (kW terlalu tinggi) atau serat sudah terpotong pendek.',
        solution: 'Buka gap pelat refiner (kurangi daya motor kW refiner), cek kondisi plat apakah aus, campurkan stok bubur segar tanpa refine.'
      },
      {
        issue: 'Pressure Screen Mengalami Choking (Penyumbatan Slot)',
        cause: 'Konsistensi bubur masuk terlalu tinggi (>1.2% pada feed screen) atau debit reject valve tersumbat lumpur serat.',
        solution: 'Turunkan konsistensi masukan dengan menambah white water, buka manual bypass flushing valve screen selama 3 menit.'
      },
      {
        issue: 'Nilai Cobb (Daya serap air) Jelek / Kertas Tidak Kedap Air',
        cause: 'Dosis AKD kurang, suhu bubur >50°C yang menghidrolisis AKD, atau pH bubur di luar rentang 7.0 - 7.8.',
        solution: 'Koreksi pH dengan PAC, naikkan dosis AKD 2 kg/ton, pastikan suhu pengeringan di dryer mencapai curing temperature (>95°C).'
      }
    ],
    shutdownAndCleaning: [
      'Bilas (flush) semua line pipa bubur dengan white water sampai aliran jernih untuk mencegah pembusukan serat di pipa.',
      'Bilas tangki kimia dan selang metering pump dengan air panas bersih.',
      'Kuras keranjang reject dari cleaner dan screen untuk mencegah kerak mengering.'
    ]
  },
  {
    id: 'paper-machine',
    title: '3. Bagian Paper Machine (Fourdrinier Wire, Press, Dryer, Calender)',
    purpose: 'Membentuk lembaran kertas basah dari bubur berkonsistensi rendah di forming wire, memeras air secara mekanis di press section, menguapkan sisa air di dryer cylinder, dan menghaluskan permukaan lembaran di calender roll.',
    preparation: [
      'Lakukan pemanasan silinder pengering (Dryer Cylinder Warming-up): buka bypass steam secara bertahap untuk mencegah thermal shock pada silinder besi cor.',
      'Pastikan shower pembersih wire dan felt (High Pressure Needle Shower & Fan Shower) menyemprot dengan tekanan 15 - 25 bar tanpa ada nozzle buntu.',
      'Periksa tegangan (tension) forming wire dan press felt dalam batas standar hidrolik/pneumatik.',
      'Jalankan pelumasan sentral (Central Lubrication System): pastikan sirkulasi oli ke semua bearing dryer dan calender lancar dan bertekanan normal.',
      'Cek kesiapan rope carrier system / vacuum transfer untuk proses threading (menarik lembaran kertas saat start-up).'
    ],
    operationalSteps: [
      'Nyalakan Fan Pump dan atur laju alir bubur ke Headbox; sesuaikan bukaan slice lip headbox untuk pemerataan basis weight (gramatur).',
      'Mulai pembentukan lembaran pada Wire Section: atur vacuum suction box (dewatering foils) secara bertahap dari vakum rendah ke vakum tinggi (15 - 45 kPa).',
      'Pindahkan lembaran basah berkonsistensi ~20% ke Press Section (Pick-up Felt -> 1st Press -> 2nd Press / Shoe Press) dengan tekanan nip hidrolik bertahap hingga konsistensi mencapai 42% - 48%.',
      'Salurkan lembaran ke Dryer Section (Pre-dryer -> Size Press -> After-dryer): atur gradien tekanan uap steam dari 1.5 bar di awal hingga 4.5 bar di tengah, dan 2.0 bar di silinder akhir.',
      'Pada Size Press (jika aktif): lapisi lembaran dengan larutan kanji permukaan (Surface Starch) untuk meningkatkan ketahanan permukaan dan kekakuan.',
      'Lewatkan lembaran melalui Calender Roll: atur tekanan nip hidrolik dan suhu calender untuk mencapai ketebalan (caliper) dan kehalusan (smoothness) sesuai pesanan.',
      'Gulung lembaran kertas menjadi jumbo roll (Pop Reel) dengan kontrol kekencangan reel drum.'
    ],
    keyParameters: [
      { name: 'Kecepatan Mesin (Machine Speed)', standard: 'PM1: 350 - 450 m/min | PM2: 450 - 550 m/min | PM5: 600 - 750 m/min', note: 'Sinkronisasi speed draw antar seksi harus dijaga ketat (toleransi draw 0.1% - 0.3%)' },
      { name: 'Tekanan Nip Press Section', standard: '1st Press: 60-80 kN/m | 2nd Press: 90-120 kN/m | Shoe Press (PM5): 600-800 kN/m', note: 'Pantau kebersihan felt agar tidak timbul tanda air (water mark)' },
      { name: 'Tekanan Uap Silinder Dryer', standard: 'Pre-dryer: 2.0 - 4.5 bar | After-dryer: 1.5 - 3.5 bar', note: 'Pantau pembuangan kondensat uap melalui siphon dryer' },
      { name: 'Kadar Kelembapan Kertas Akhir (Moisture)', standard: '7.0% - 8.5% ± 0.5%', note: 'Dipantau online scanner QCS inframerah secara kontinu' },
      { name: 'Ketebalan Lembaran (Caliper)', standard: 'Sesuai spesifikasi GSM (misal 125 gsm = 165 - 180 µm)', note: 'Kontrol via profil slice lip headbox dan nip calender' }
    ],
    routineChecks: [
      'Awasi formasi lembaran di atas forming table: pastikan garis kering (dry line) berada pada posisi 2/3 panjang wire.',
      'Periksa drainase air putih (white water tray) di bawah wire: pastikan tidak ada luapan atau cipratan air ke lembaran kertas.',
      'Pantau kondisi felt press: lakukan uji porositas dan kebersihan felt; pastikan chemical felt conditioning bekerja normal.',
      'Cek siphon dryer: pastikan silinder tidak tergenang air kondensat (water logging) yang menyebabkan suhu silinder drop.',
      'Amati detektor putus kertas (Sheet Break Photoelectric Sensors) pada setiap seksi.'
    ],
    troubleshooting: [
      {
        issue: 'Kertas Sering Putus (Sheet Break) di Press atau Dryer Awal',
        cause: 'Tegangan tarikan (draw) terlalu kencang, adanya serpihan kotoran/shive dari stock prep, atau pinggiran lembaran koyak (edge crack).',
        solution: 'Kurangi draw speed 0.1%, periksa ketajaman squirt cutter penata tepi di wire, tingkatkan pembersihan needle shower pada press felt.'
      },
      {
        issue: 'Profil Kelembapan / Gramatur Tidak Merata (Moisture Streaks)',
        cause: 'Bukaan slice lip headbox bengkok lokal, nozzle shower felt tersumbat menyebabkan felt basah setempat, atau siphon dryer buntu.',
        solution: 'Atur spindle actuator headbox pada zona bersangkutan, bersihkan nozzle shower felt yang buntu, cek suhu permukaan silinder dengan termometer inframerah tembak.'
      },
      {
        issue: 'Permukaan Kertas Berbintik Gelap / Cacat Lubang (Pinholes)',
        cause: 'Busa mikro di headbox, serpihan kerak lendir bakteri (slime build-up) yang jatuh dari hood dryer.',
        solution: 'Injeksi defoamer pada headbox feed line, lakukan pembersihan slime board, tingkatkan dosis biocide pada sirkuit air putih pendek (short loop).'
      }
    ],
    shutdownAndCleaning: [
      'Turunkan laju alir bubur secara bertahap dan matikan fan pump.',
      'Biarkan wire dan felt berputar dengan air shower bertekanan tinggi untuk pencucian total (boil-out cycle jika scheduled maintenance).',
      'Tutup valve uap steam dryer secara perlahan dan biarkan silinder mendingin bertahap.',
      'Buka nip press dan nip calender untuk mencegah deformasi karet/roll polyurethane selama mesin berhenti.'
    ]
  },
  {
    id: 'rewinder',
    title: '4. Bagian Rewinder & Finishing (Pemotongan & Penggulungan Jadi)',
    purpose: 'Memotong jumbo roll dari paper machine menjadi gulungan kertas jadi dengan lebar, diameter, kerapatan (hardness), dan kualitas permukaan sesuai spesifikasi pesanan pelanggan, serta mengeliminasi bagian kertas cacat.',
    preparation: [
      'Periksa form perintah kerja produksi (Surat Perintah Kerja / Cutting Order): catat lebar potong, diameter target, diameter core, dan arah gulungan.',
      'Inspeksi jumbo roll pada unwind stand: pastikan tidak ada cacat fisik luar, kerusakan core chuck, atau kelembapan berlebih di bagian tepi.',
      'Atur posisi pisau potong atas (top circular slitter blade) dan pisau bawah (bottom anvil blade) sesuai layout ukuran dengan ketelitian milimeter.',
      'Periksa ketajaman pisau pemotong: pastikan pisau tidak tumpul atau sumbing.',
      'Pasang paper core (pipa karton) baru pada winder shaft dan oleskan lem awal penyambungan (tail gluer).'
    ],
    operationalSteps: [
      'Muat jumbo roll ke unwind stand dan pasang sistem pengereman pneumatik/regeneratif.',
      'Tarik ujung lembaran kertas melewati spreader roll (roll pelurus), web tension sensor, slitters, hingga menempel pada paper core.',
      'Atur program Rewinder PLC: masukkan profil tegangan (Tension Curve), beban rider roll (Nip Pressure Curve), dan kecepatan maksimum operasi (sampai 1200 - 1500 m/min).',
      'Mulai jalankan rewinder pada kecepatan rendah (jogging mode) untuk memastikan pemotongan tepi (edge trim) terhisap sempurna oleh blower trim vacuum.',
      'Akselerasikan rewinder ke kecepatan operasional stabil sambil memantau kerapatan gulungan (roll density).',
      'Saat mendeteksi bagian lembaran yang robek atau cacat kualitas (ditandai dengan flag pita penanda dari operator PM), deselerasikan mesin, buang bagian cacat, dan buat sambungan kertas (splicing) yang rapi menggunakan pita sambung standar industri.',
      'Setelah diameter gulungan tercapai, turunkan kecepatan hingga berhenti otomatis, potong ekor kertas, dan turunkan gulungan ke unloading table cradle.'
    ],
    keyParameters: [
      { name: 'Tegangan Lembaran (Web Tension)', standard: '2.5 - 4.5 N/cm lebar kertas (Taper Tension 100% di awal turun ke 85% di luar)', note: 'Tension berangsur menurun agar gulungan tidak meletus (starburst defect)' },
      { name: 'Tekanan Rider Roll', standard: '1.5 - 3.0 bar (menurun seiring bertambahnya diameter)', note: 'Mencegah gulungan menjadi terlalu padat di luar atau longgar di dalam' },
      { name: 'Kerapatan Gulungan (Roll Hardness / Schmidt Hammer)', standard: '28 - 36 Lu Schmidt Points', note: 'Uji merata dari sisi kiri, tengah, hingga sisi kanan roll' },
      { name: 'Ketepatan Lebar Potong', standard: 'Toleransi ± 1.0 mm dari target pemotongan', note: 'Cek menggunakan mistar baja kalibrasi pada roll pertama setiap set' }
    ],
    routineChecks: [
      'Cek kebersihan tepi potongan: tepi kertas harus rata tanpa serpihan debu kertas berlebih (clean cut, no paper dust).',
      'Periksa apakah ada tanda-tanda slip antar lembaran atau gulungan mengkerut (creasing/wrinkling).',
      'Pastikan blower trim removal bekerja kuat menghisap sisa potongan tepi (trim strip).',
      'Periksa core chuck: pastikan terkunci erat pada diameter dalam core kertas sehingga tidak slip saat pengereman mendadak.'
    ],
    troubleshooting: [
      {
        issue: 'Gulungan Kertas Mengkerut / Bergelombang (Wrinkles on Finished Roll)',
        cause: 'Tegangan lembaran tidak seragam di sepanjang bentang, bow roll/spreader roll sudutnya salah, atau moisture profile dari PM belang.',
        solution: 'Atur kembali sudut spreader roll, seimbangkan web tension, atau kurangi kecepatan operasi rewinder.'
      },
      {
        issue: 'Tepi Potongan Kasar, Berserat, atau Terbakar (Rough Edge / Slitter Dust)',
        cause: 'Pisau slitter tumpul, overlap antara pisau atas dan bawah tidak pas, atau sudut kemiringan (shear angle) pisau berubah.',
        solution: 'Ganti pasangan pisau potong dengan pisau tajam baru, atur ulang penetrasi pisau (depth 1.0 - 1.5 mm), bersihkan debu pelumas pisau.'
      },
      {
        issue: 'Gulungan Kertas Bergeser Miring / Teleskoping (Telescoping Roll)',
        cause: 'Pengereman unwind stand mendadak sementara rider roll kurang menekan, atau core longgar.',
        solution: 'Naikkan tekanan awal rider roll, periksa penguncian pneumatic core chuck, perhalus kurva deselerasi mesin.'
      }
    ],
    shutdownAndCleaning: [
      'Bersihkan serbuk dan debu kertas di area pisau pemotong menggunakan vacuum pembersih (hindari semprotan angin bertekanan yang menyebarkan debu ke udara).',
      'Kunci pengaman pisau slitter sebelum melakukan penggantian atau pembersihan.',
      'Beri label identitas barcode lengkap pada setiap gulungan: Nama Pabrik, Kode Mesin (PM1/PM2/PM5), Nomor Roll, Jenis Kertas, Gramatur, Berat Bersih, Tanggal, dan Shift Pembuatan.',
      'Bungkus gulungan dengan kertas pembungkus (wrapper) dan pelindung tepi (end header disc) sebelum dipindahkan ke gudang barang jadi.'
    ]
  }
];

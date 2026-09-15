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
    title: '3. Bagian Paper Machine (Cylinder Mould Vat, Press Felt, Yankee MG Dryer, Reel)',
    purpose: 'Membentuk lembaran kertas halus (Tissue, MG Paper, dan Doorslag) dari suspensi bubur serat melalui silinder saringan cylinder mould vat, memeras air secara mekanis di press felt section (Top/Bottom Felt & Single Felt), mengeringkan lembaran di Yankee MG dryer cylinder dengan tudung udara panas, dan menggulung menjadi jumbo roll dengan standar target kecepatan semua PM 100 - 150 MPM.',
    preparation: [
      'Lakukan pemanasan silinder pengering Yankee (Yankee Dryer Warming-up): buka bypass steam secara bertahap hingga tekanan operasi standar 1.0 - 3.0 bar untuk mencegah thermal shock pada bejana silinder besi cor.',
      'Pastikan shower pembersih kawat silinder cetakan dan kain felt (High Pressure Needle Shower & Fan Shower) bertekanan stabil 3.0 - 5.0 bar tanpa nozzle tersumbat.',
      'Periksa tegangan (tension) kain felt: pastikan regangan merata pada Top Felt 18,8 M & Bottom Felt 25,0 M (PM1 & PM2) serta Single Felt 30,0 M (PM5).',
      'Jalankan pelumasan sentral (Central Lubrication System): pastikan sirkulasi oli ke bearing vat cylinder mould, touch roll, dan silinder Yankee lancar.',
      'Cek kesiapan air jet / compressed air transfer dan threading rope carrier untuk menyuap ujung lembaran tipis saat start-up.',
      'Verifikasi target kecepatan operasi mesin pada panel kontrol DCS: disetel pada rentang standar target 100 - 150 MPM dan tekanan uap Yankee pada 1.0 - 3.0 bar.'
    ],
    operationalSteps: [
      'Nyalakan pompa transfer bubur encer dan atur laju alir ke bak vat cylinder mould; sesuaikan konsistensi kerja (0.25% - 0.40%) untuk pemerataan gramatur (BW 12-16, 18-22, 24-26, 36-42 gsm).',
      'Mulai pembentukan lembaran pada kawat cylinder mould: atur nosel pemotong tepi basah (edge squirt nozzle) sesuai lebar kertas jadi (PM1: 2,20 M | PM2: 2,25 M | PM5: 3,30 M).',
      'Pindahkan lembaran basah dari cylinder vat ke kain felt pembawa melalui touch roll penekan bertekanan pneumatik/hidrolik yang seimbang.',
      'Lakukan pemerasan dan dewatering vakum pada Uhle suction box (-20 s/d -30 kPa) untuk menjaga porositas dan kapasitas serap kain felt.',
      'Tempelkan lembaran kertas ke permukaan silinder Yankee MG yang panas melalui touch roll utama dengan tekanan nip hidrolik merata.',
      'Keringkan lembaran di silinder Yankee yang berputar pada standar target kecepatan 100 - 150 MPM dengan tekanan uap standar 1.0 - 3.0 bar dibantu hembusan tudung udara panas (Hot Air Cap Hood).',
      'Lepaskan lembaran kertas kering dari silinder Yankee dengan bantuan bilah doctor blade (creping/cleaning doctor) berpresisi tinggi.',
      'Gulung lembaran kertas menjadi jumbo roll (Pop Reel) dengan kontrol kekencangan roll yang presisi dan stabil.'
    ],
    keyParameters: [
      { name: 'Kecepatan Mesin (Machine Speed)', standard: '100 - 150 MPM (Standar Target Semua PM: PM-1, PM-2, PM-5)', note: 'Standar target kecepatan operasi seluruh mesin dijaga stabil pada 100 - 150 MPM disesuaikan dengan gramatur kertas (12-16, 18-22, 24-26, 36-42 gsm)' },
      { name: 'Tekanan Uap Silinder Yankee MG (Yankee Pressure)', standard: '1.0 - 3.0 bar (Standar Semua Yankee)', note: 'Standar baku tekanan uap silinder Yankee untuk seluruh lini (PM1, PM2, PM5) wajib dijaga stabil pada 1 - 3 bar untuk menjaga kualitas lembaran tanpa kertas overdried/hangus' },
      { name: 'Tipe Pembentukan (Forming)', standard: 'Cylinder Mould Vat System', note: 'Keseragaman formasi serat tipis Tissue, MG Paper, dan Doorslag' },
      { name: 'Rentang Basis Weight (BW)', standard: '12-16, 18-22, 24-26, 36-42 gsm', note: 'Kontrol konsistensi bubur vat dan laju aliran stock' },
      { name: 'Vakum Uhle Box Kain Felt', standard: '-20 s/d -30 kPa', note: 'Pantau kebersihan felt agar daya peras air selalu maksimal' },
      { name: 'Kadar Kelembapan Kertas Akhir (Moisture)', standard: '5.5% - 7.5% ± 0.5%', note: 'Dipantau online scanner QCS atau uji moisture meter' },
      { name: 'Lebar Kertas Jadi (Trim Width)', standard: 'PM1: 2,20 M | PM2: 2,25 M | PM5: 3,30 M', note: 'Dipotong oleh nosel edge squirt bertekanan 3.5 - 4.0 bar' },
      { name: 'Life Time Kain Felt', standard: '6 - 8 Bulan / 1.000 Ton Paper Up', note: 'PM1 & PM2: Top 18,8 M & Bottom 25,0 M (lebar 2,4 M) | PM5: Single Felt 30,0 M (lebar 3,5 M)' }
    ],
    routineChecks: [
      'Pantau display tachometer/DCS: pastikan kecepatan mesin stabil pada standar target 100 - 150 MPM dan tidak terjadi fluktuasi mendadak.',
      'Awasi formasi lembaran di atas kawat cylinder mould: pastikan level bubur di bak vat tenang tanpa gelombang turbulensi sepihak.',
      'Periksa kawat saringan cylinder mould: pastikan jarum shower pembersih berosilasi kontinu menyemprot sisa serat.',
      'Pantau kondisi kain felt: ukur porositas felt dan pastikan sistem auto-guide menjaga felt tepat di tengah lintasan roll.',
      'Cek siphon Yankee dryer: pastikan silinder tidak tergenang kondensat uap (water logging) yang dapat menurunkan suhu silinder.',
      'Periksa ketajaman bilah doctor blade Yankee dan kerataan kontak ujung pisau terhadap permukaan silinder.'
    ],
    troubleshooting: [
      {
        issue: 'Kertas Sering Putus (Sheet Break) Saat Mesin Dijalankan',
        cause: 'Kecepatan mesin di luar standar target 100 - 150 MPM, draw felt terlalu kencang, atau pinggiran lembaran basah tidak rata.',
        solution: 'Kembalikan kecepatan mesin ke standar target 100 - 150 MPM, kurangi draw speed felt 0.1 - 0.2%, dan periksa kelancaran nosel edge squirt cutter.'
      },
      {
        issue: 'Profil Kelembapan / Kilap MG Tidak Merata (Moisture Streaks & Dull Surface)',
        cause: 'Tekanan touch roll tidak rata kiri-kanan atau nozzle shower kain felt buntu menyebabkan felt basah sebagian.',
        solution: 'Kalibrasi tekanan hidrolik/pneumatik touch roll, bersihkan nozzle shower felt yang buntu, cek suhu permukaan silinder Yankee.'
      },
      {
        issue: 'Bintik Lubang Jarum (Pinholes) pada Kertas Tissue / MG',
        cause: 'Busa mikro di bak vat cylinder mould atau kerak serat kering yang menempel pada permukaan kawat silinder.',
        solution: 'Injeksi defoamer pada feed line bubur encer, tingkatkan tekanan shower pencuci kawat cylinder mould ke 4 bar.'
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

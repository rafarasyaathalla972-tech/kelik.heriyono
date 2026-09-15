import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Ensure data directory and reports.json exist
const DATA_DIR = process.env.VERCEL
  ? path.join('/tmp', 'pup_data')
  : path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'reports.json');

function ensureDataFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      // Default initial reports if not present
      const initialReports = [
        {
          id: 'rep-pm5-2026-09-09-shift3',
          date: '2026-09-09',
          shift: 'Shift 3',
          operatorName: 'Bambang Supriyanto',
          machine: 'PM5',
          targetProductionTon: 110.0,
          actualProductionTon: 104.5,
          achievementPercentage: 95.0,
          netWeightKg: 104500,
          reelCount: 14,
          paperGradeCode: 'WTK140 - White Top Kraft 140 gsm',
          qualityGradeA_Ton: 95.0,
          qualityGradeB_Ton: 7.2,
          qualityGradeC_Ton: 1.5,
          qualityGradeDefect_Ton: 0.8,
          thicknessMicron: 182,
          moisturePercent: 7.6,
          tensileStrength: 4.8,
          surfaceSmoothness: 260,
          defectPercentage: 0.76,
          defectTypes: ['Kerut Tepi Ringan (Trim Wrinkle)'],
          incidents: [
            {
              id: 'inc-1',
              time: '02:15',
              location: 'Calender',
              description: 'Pembersihan bilah doctor blade calender karena ada debu serat menumpuk.',
              downtimeMinutes: 18
            }
          ],
          totalDowntimeMinutes: 18,
          actionsTaken: 'Mengganti bilah doctor sintetis calender roll 2 dan membersihkan nozzle osilasi shower shoe press belt.',
          shortTermRecommendation: 'Periksa kebersihan sensor optik QCS scanner bolak-balik sebelum start shift pagi.',
          longTermRecommendation: 'Jadwalkan rekondisi bantalan bearing roll spreader rewinder pada shut-down bulanan berikutnya.',
          handoverNotes: 'Mesin berjalan stabil pada speed 680 m/menit. Bahan kimia sizing AKD dan FWA pada level normal 75%. Roll nomor 12 s/d 14 siap kirim ke finishing rewinder.',
          createdAt: '2026-09-09T22:45:00.000Z',
          editHistory: []
        },
        {
          id: 'rep-pm2-2026-09-09-shift2',
          date: '2026-09-09',
          shift: 'Shift 2',
          operatorName: 'Ahmad Fauzi',
          machine: 'PM2',
          targetProductionTon: 62.0,
          actualProductionTon: 58.2,
          achievementPercentage: 93.87,
          netWeightKg: 58200,
          reelCount: 9,
          paperGradeCode: 'TL140 - Testliner 140 gsm',
          qualityGradeA_Ton: 51.5,
          qualityGradeB_Ton: 4.8,
          qualityGradeC_Ton: 1.2,
          qualityGradeDefect_Ton: 0.7,
          thicknessMicron: 178,
          moisturePercent: 7.4,
          tensileStrength: 4.1,
          surfaceSmoothness: 225,
          defectPercentage: 1.2,
          defectTypes: ['Spot Kotoran Halus (Dirt Spots)'],
          incidents: [
            {
              id: 'inc-2',
              time: '18:40',
              location: 'Wire Part / Fourdrinier',
              description: 'Pembersihan jet nozzle edge trimmer yang tersumbat serat pulp daur ulang.',
              downtimeMinutes: 12
            }
          ],
          totalDowntimeMinutes: 12,
          actionsTaken: 'Melakukan flush manual pipa shower trim jet dan memeriksa tekanan pompa wire.',
          shortTermRecommendation: 'Pantau freeness pulp sebelum masuk headbox PM2 setiap 2 jam.',
          longTermRecommendation: 'Usulkan penggantian nozzle trim berbahan keramik tahan aus.',
          handoverNotes: 'Speed PM2 konstan 420 m/menit. Steam pressure di drying cylinder section 3 stabil pada 3.2 bar.',
          createdAt: '2026-09-09T14:30:00.000Z',
          editHistory: []
        },
        {
          id: 'rep-pm1-2026-09-09-shift1',
          date: '2026-09-09',
          shift: 'Shift 1',
          operatorName: 'Dedi Kurniawan',
          machine: 'PM1',
          targetProductionTon: 45.0,
          actualProductionTon: 44.1,
          achievementPercentage: 98.0,
          netWeightKg: 44100,
          reelCount: 7,
          paperGradeCode: 'MF125 - Medium Fluting 125 gsm',
          qualityGradeA_Ton: 41.0,
          qualityGradeB_Ton: 2.5,
          qualityGradeC_Ton: 0.4,
          qualityGradeDefect_Ton: 0.2,
          thicknessMicron: 165,
          moisturePercent: 7.8,
          tensileStrength: 3.6,
          surfaceSmoothness: 185,
          defectPercentage: 0.45,
          defectTypes: [],
          incidents: [],
          totalDowntimeMinutes: 0,
          actionsTaken: 'Pengoperasian normal tanpa hambatan teknis. Semua parameter kontrol QCS normal.',
          shortTermRecommendation: 'Pertahankan vacuum box suction couch roll di angka -45 kPa.',
          longTermRecommendation: 'Periksa berkala kondisi felt press roll 1 untuk mencegah felt blinding.',
          handoverNotes: 'Shift 1 berjalan lancar dengan pencapaian target 98%. Stock chest OCC level 80%.',
          createdAt: '2026-09-09T06:15:00.000Z',
          editHistory: []
        }
      ];
      fs.writeFileSync(DATA_FILE, JSON.stringify(initialReports, null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('Error ensuring data file:', err);
  }
}

function readReports(): any[] {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Error reading reports file:', err);
    return [];
  }
}

function writeReports(reports: any[]): boolean {
  ensureDataFile();
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(reports, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing reports file:', err);
    return false;
  }
}

// ----------------------------------------------------
// REST API Routes (Shared Database for Team Collaboration)
// ----------------------------------------------------

// 1. Health check & status
app.get('/api/health', (req, res) => {
  const reports = readReports();
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    reportsCount: reports.length,
    database: 'persistent_team_store'
  });
});

// 2. Get all reports
app.get('/api/reports', (req, res) => {
  const reports = readReports();
  res.json(reports);
});

// 3. Create a new report
app.post('/api/reports', (req, res) => {
  try {
    const newReport = req.body;
    if (!newReport || !newReport.machine || !newReport.shift || !newReport.date) {
      res.status(400).json({ error: 'Data laporan tidak lengkap (mesin, shift, tanggal wajib diisi)' });
      return;
    }
    
    // Assign ID and timestamp if missing
    if (!newReport.id) {
      newReport.id = `rep-${newReport.machine.toLowerCase()}-${Date.now()}`;
    }
    if (!newReport.createdAt) {
      newReport.createdAt = new Date().toISOString();
    }
    if (!newReport.editHistory) {
      newReport.editHistory = [];
    }

    const currentReports = readReports();
    // Prepend new report
    const updated = [newReport, ...currentReports.filter((r: any) => r.id !== newReport.id)];
    writeReports(updated);

    res.status(201).json(newReport);
  } catch (err) {
    console.error('Failed to create report:', err);
    res.status(500).json({ error: 'Gagal menyimpan laporan ke database tim' });
  }
});

// 4. Update an existing report (with audit trail)
app.put('/api/reports/:id', (req, res) => {
  try {
    const reportId = req.params.id;
    const updatedReport = req.body;
    const currentReports = readReports();

    const index = currentReports.findIndex((r: any) => r.id === reportId);
    if (index === -1) {
      // If not found, treat as new or add
      const updated = [updatedReport, ...currentReports];
      writeReports(updated);
      res.json(updatedReport);
      return;
    }

    currentReports[index] = {
      ...currentReports[index],
      ...updatedReport,
      updatedAt: new Date().toISOString()
    };

    writeReports(currentReports);
    res.json(currentReports[index]);
  } catch (err) {
    console.error('Failed to update report:', err);
    res.status(500).json({ error: 'Gagal memperbarui laporan di database tim' });
  }
});

// 5. Delete a report
app.delete('/api/reports/:id', (req, res) => {
  try {
    const reportId = req.params.id;
    const currentReports = readReports();
    const filtered = currentReports.filter((r: any) => r.id !== reportId);
    writeReports(filtered);
    res.json({ success: true, deletedId: reportId });
  } catch (err) {
    console.error('Failed to delete report:', err);
    res.status(500).json({ error: 'Gagal menghapus laporan' });
  }
});

// 6. Bulk sync / restore
app.post('/api/reports/bulk-sync', (req, res) => {
  try {
    const { reports, mergeMode } = req.body;
    if (!Array.isArray(reports)) {
      res.status(400).json({ error: 'Format data laporan salah (harus array)' });
      return;
    }

    if (mergeMode === 'overwrite') {
      writeReports(reports);
      res.json({ success: true, count: reports.length, mode: 'overwrite' });
      return;
    }

    // Default merge by id
    const current = readReports();
    const map = new Map();
    // Old reports first
    current.forEach(r => map.set(r.id, r));
    // Incoming reports update/add
    reports.forEach(r => map.set(r.id, r));

    const merged = Array.from(map.values());
    writeReports(merged);
    res.json({ success: true, count: merged.length, mode: 'merged' });
  } catch (err) {
    console.error('Failed bulk sync:', err);
    res.status(500).json({ error: 'Gagal sinkronisasi bulk laporan' });
  }
});

// ----------------------------------------------------
// Start Server with Vite Middleware or Static Hosting
// ----------------------------------------------------
async function start() {
  ensureDataFile();

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server laporan shift siap pada port ${PORT} (host 0.0.0.0)`);
  });
}

start();

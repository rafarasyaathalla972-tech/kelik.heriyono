import { ShiftReport } from '../types';
import { INITIAL_SHIFT_REPORTS } from '../data/initialReports';

const LOCAL_STORAGE_KEY = 'panca_paper_shift_reports';

export interface SyncStatus {
  isOnline: boolean;
  lastSyncedAt: Date | null;
  serverReportCount: number;
}

/**
 * Fetch all reports from the shared server API, fallback to localStorage if unavailable
 */
export async function getSharedReports(): Promise<{ reports: ShiftReport[]; isFromServer: boolean }> {
  try {
    const res = await fetch('/api/reports', {
      headers: { 'Cache-Control': 'no-cache' }
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        // Cache to localStorage
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
          console.warn('Could not cache to localStorage', e);
        }
        return { reports: data, isFromServer: true };
      }
    }
  } catch (err) {
    console.warn('Failed to reach backend /api/reports, using local cache', err);
  }

  // Fallback to localStorage
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return { reports: parsed, isFromServer: false };
      }
    }
  } catch (e) {
    console.error('Error reading localStorage', e);
  }

  return { reports: INITIAL_SHIFT_REPORTS, isFromServer: false };
}

/**
 * Create a new report in the shared server database and local cache
 */
export async function saveSharedReport(report: ShiftReport): Promise<ShiftReport> {
  let savedReport = report;
  try {
    const res = await fetch('/api/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(report)
    });
    if (res.ok) {
      savedReport = await res.json();
    }
  } catch (err) {
    console.warn('Failed to save to backend /api/reports, saving locally', err);
  }

  // Always update local cache
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    const list: ShiftReport[] = saved ? JSON.parse(saved) : [];
    const updated = [savedReport, ...list.filter(r => r.id !== savedReport.id)];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error updating local cache', e);
  }

  return savedReport;
}

/**
 * Update an existing report in the shared database
 */
export async function updateSharedReport(report: ShiftReport): Promise<ShiftReport> {
  let updatedReport = report;
  try {
    const res = await fetch(`/api/reports/${encodeURIComponent(report.id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(report)
    });
    if (res.ok) {
      updatedReport = await res.json();
    }
  } catch (err) {
    console.warn('Failed to update on backend /api/reports, updating locally', err);
  }

  // Update local cache
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    const list: ShiftReport[] = saved ? JSON.parse(saved) : [];
    const updated = list.map(r => r.id === updatedReport.id ? updatedReport : r);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error updating local cache', e);
  }

  return updatedReport;
}

/**
 * Delete a report from the shared database
 */
export async function deleteSharedReport(reportId: string): Promise<boolean> {
  try {
    await fetch(`/api/reports/${encodeURIComponent(reportId)}`, {
      method: 'DELETE'
    });
  } catch (err) {
    console.warn('Failed to delete on backend', err);
  }

  // Update local cache
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const list: ShiftReport[] = JSON.parse(saved);
      const updated = list.filter(r => r.id !== reportId);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    }
  } catch (e) {
    console.error('Error deleting in local cache', e);
  }

  return true;
}

/**
 * Check backend server health
 */
export async function checkServerHealth(): Promise<boolean> {
  try {
    const res = await fetch('/api/health');
    return res.ok;
  } catch {
    return false;
  }
}

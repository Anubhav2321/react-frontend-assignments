/**
 * Mock Attendance API Service.
 * Provides simulated asynchronous operations for loading and saving attendance sessions.
 * NOTE: Operates entirely client-side. Saves state to Redux and local storage.
 */

import { INITIAL_ATTENDANCE } from '../data/seedData';
import { loadPersistedState } from '../utils/storage';
import { isValidDateString } from '../utils/dateUtils';
import { ATTENDANCE_STATUS } from '../utils/attendanceCalculations';

const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockAttendanceApi = {
  /**
   * Fetches all recorded attendance history.
   * @returns {Promise<Array>}
   */
  async fetchAttendance() {
    await delay(300);
    const persisted = loadPersistedState();
    if (persisted?.attendance?.records && Array.isArray(persisted.attendance.records)) {
      return persisted.attendance.records;
    }
    return [...INITIAL_ATTENDANCE];
  },

  /**
   * Saves or updates an attendance session for a class on a specific date.
   * Prevents duplicates by replacing existing records for the same student+subject+date.
   *
   * @param {Object} payload
   * @param {string} payload.date - Canonical YYYY-MM-DD
   * @param {string} payload.subjectId
   * @param {number|string} payload.semester
   * @param {string} payload.section
   * @param {Array<{ studentId: string, status: string }>} payload.sessionRecords
   * @returns {Promise<Array>} The saved attendance records
   */
  async saveAttendanceSession({ date, subjectId, semester, section, sessionRecords }) {
    await delay(350);

    if (!date || !isValidDateString(date)) {
      throw new Error(`Invalid attendance date: '${date}'. Expected format: YYYY-MM-DD.`);
    }

    if (!subjectId) {
      throw new Error('Subject selection is required to record attendance.');
    }

    if (!Array.isArray(sessionRecords) || sessionRecords.length === 0) {
      throw new Error('No student attendance marks provided to save.');
    }

    const validStatuses = Object.values(ATTENDANCE_STATUS);
    const processedRecords = [];
    const timestamp = new Date().toISOString();

    for (const item of sessionRecords) {
      if (!item.studentId) continue;
      if (!validStatuses.includes(item.status)) {
        throw new Error(
          `Invalid attendance status '${item.status}' for student ${item.studentId}. Allowed: P, A, PL, E.`
        );
      }

      processedRecords.push({
        id: `att_${item.studentId}_${subjectId}_${date}`,
        studentId: item.studentId,
        subjectId,
        date,
        semester,
        section,
        status: item.status,
        updatedAt: timestamp,
      });
    }

    return processedRecords;
  },
};


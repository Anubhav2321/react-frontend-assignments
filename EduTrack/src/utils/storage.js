/**
 * Browser LocalStorage Persistence Strategy for AttendEase.
 *
 * NOTE: This frontend-only academic application stores state in the browser's
 * localStorage. It does not communicate with a remote production database.
 * Users can safely reset the demo dataset at any time.
 */

import { INITIAL_STUDENTS, INITIAL_SUBJECTS, INITIAL_ATTENDANCE } from '../data/seedData';
import { DEFAULT_ATTENDANCE_THRESHOLD } from './attendanceCalculations';

const STORAGE_KEY = 'attendease_state_v1';

export const loadPersistedState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      return parsed;
    }
  } catch (err) {
    console.warn('AttendEase: Failed to read from localStorage. Falling back to default state.', err);
  }
  return null;
};

export const savePersistedState = (state) => {
  try {
    const subset = {
      students: state.students?.ids ? {
        ids: state.students.ids,
        entities: state.students.entities,
      } : undefined,
      subjects: state.subjects?.items ? {
        items: state.subjects.items,
      } : undefined,
      attendance: state.attendance?.records ? {
        records: state.attendance.records,
      } : undefined,
      preferences: state.preferences ? {
        attendanceThreshold: state.preferences.attendanceThreshold,
        theme: state.preferences.theme,
        compactView: state.preferences.compactView,
      } : undefined,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subset));
  } catch (err) {
    console.warn('AttendEase: Failed to persist state to localStorage', err);
  }
};

export const clearPersistedState = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('AttendEase: Failed to clear localStorage', err);
  }
};

export const getInitialDataWithFallback = () => {
  const persisted = loadPersistedState();
  if (persisted) {
    return {
      students: persisted.students || null,
      subjects: persisted.subjects?.items || INITIAL_SUBJECTS,
      attendance: persisted.attendance?.records || INITIAL_ATTENDANCE,
      threshold: persisted.preferences?.attendanceThreshold ?? DEFAULT_ATTENDANCE_THRESHOLD,
      theme: persisted.preferences?.theme || 'light',
    };
  }
  return {
    students: null, // will be initialized by entity adapter from INITIAL_STUDENTS
    subjects: INITIAL_SUBJECTS,
    attendance: INITIAL_ATTENDANCE,
    threshold: DEFAULT_ATTENDANCE_THRESHOLD,
    theme: 'light',
  };
};


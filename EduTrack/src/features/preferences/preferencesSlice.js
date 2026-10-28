/**
 * Preferences Slice managing attendance threshold, theme, and display preferences.
 */

import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_ATTENDANCE_THRESHOLD } from '../../utils/attendanceCalculations';
import { loadPersistedState } from '../../utils/storage';

const persisted = loadPersistedState();

const initialState = {
  attendanceThreshold:
    persisted?.preferences?.attendanceThreshold ?? DEFAULT_ATTENDANCE_THRESHOLD,
  theme: persisted?.preferences?.theme || 'light',
  compactView: persisted?.preferences?.compactView || false,
};

export const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setAttendanceThreshold: (state, action) => {
      const val = Number(action.payload);
      if (!isNaN(val) && val >= 0 && val <= 100) {
        state.attendanceThreshold = Math.round(val);
      }
    },
    setTheme: (state, action) => {
      state.theme = action.payload === 'dark' ? 'dark' : 'light';
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    toggleCompactView: (state) => {
      state.compactView = !state.compactView;
    },
    resetPreferences: (state) => {
      state.attendanceThreshold = DEFAULT_ATTENDANCE_THRESHOLD;
      state.theme = 'light';
      state.compactView = false;
    },
  },
});

export const {
  setAttendanceThreshold,
  setTheme,
  toggleTheme,
  toggleCompactView,
  resetPreferences,
} = preferencesSlice.actions;

export const selectAttendanceThreshold = (state) => state.preferences.attendanceThreshold;
export const selectTheme = (state) => state.preferences.theme;
export const selectCompactView = (state) => state.preferences.compactView;

export default preferencesSlice.reducer;


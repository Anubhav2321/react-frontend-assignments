/**
 * Central Redux Toolkit Store Configuration for AttendEase.
 */

import { configureStore } from '@reduxjs/toolkit';
import studentsReducer from '../features/students/studentsSlice';
import subjectsReducer from '../features/subjects/subjectsSlice';
import attendanceReducer from '../features/attendance/attendanceSlice';
import filtersReducer from '../features/filters/filtersSlice';
import preferencesReducer from '../features/preferences/preferencesSlice';
import { actionLoggerMiddleware } from './middleware/loggerMiddleware';
import { savePersistedState } from '../utils/storage';

export const store = configureStore({
  reducer: {
    students: studentsReducer,
    subjects: subjectsReducer,
    attendance: attendanceReducer,
    filters: filtersReducer,
    preferences: preferencesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore certain paths if necessary
        ignoredActions: [],
      },
    }).concat(actionLoggerMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// Subscribe to store updates to persist changes to browser localStorage
let saveTimeout = null;
store.subscribe(() => {
  if (saveTimeout) clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    savePersistedState(store.getState());
  }, 300);
});

export default store;


/**
 * Attendance Slice managing daily attendance records, session submissions, and history.
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockAttendanceApi } from '../../api/mockAttendanceApi';
import { INITIAL_ATTENDANCE } from '../../data/seedData';
import { loadPersistedState } from '../../utils/storage';
import { getAttendanceRecordKey } from '../../utils/attendanceCalculations';

const persisted = loadPersistedState();
const initialRecords = persisted?.attendance?.records && Array.isArray(persisted.attendance.records)
  ? persisted.attendance.records
  : INITIAL_ATTENDANCE;

const initialState = {
  records: initialRecords,
  loading: false,
  saving: false,
  error: null,
  successMessage: '',
  lastSavedSession: null,
};

// Async Thunks
export const fetchAttendanceRecords = createAsyncThunk(
  'attendance/fetchAttendanceRecords',
  async (_, { rejectWithValue }) => {
    try {
      const records = await mockAttendanceApi.fetchAttendance();
      return records;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to load attendance records');
    }
  }
);

export const saveAttendanceSessionThunk = createAsyncThunk(
  'attendance/saveAttendanceSession',
  async (sessionPayload, { rejectWithValue }) => {
    try {
      const savedRecords = await mockAttendanceApi.saveAttendanceSession(sessionPayload);
      return {
        savedRecords,
        sessionKey: `${sessionPayload.subjectId}_${sessionPayload.date}`,
      };
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to save attendance session');
    }
  }
);

export const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    /**
     * Upsert a single student attendance record synchronously.
     */
    recordUpserted: (state, action) => {
      const { studentId, subjectId, date, semester, section, status } = action.payload;
      const key = getAttendanceRecordKey(studentId, subjectId, date);
      const existingIndex = state.records.findIndex(
        (r) => getAttendanceRecordKey(r.studentId, r.subjectId, r.date) === key
      );

      const updatedRecord = {
        id: `att_${key}`,
        studentId,
        subjectId,
        date,
        semester,
        section,
        status,
        updatedAt: new Date().toISOString(),
      };

      if (existingIndex >= 0) {
        state.records[existingIndex] = updatedRecord;
      } else {
        state.records.push(updatedRecord);
      }
    },

    /**
     * Bulk upsert attendance records for a session.
     * Replaces duplicates based on studentId + subjectId + date.
     */
    sessionBatchUpserted: (state, action) => {
      const newRecords = action.payload; // Array of record objects
      const recordMap = new Map();

      // Index existing
      for (const r of state.records) {
        recordMap.set(getAttendanceRecordKey(r.studentId, r.subjectId, r.date), r);
      }

      // Upsert new
      for (const nr of newRecords) {
        recordMap.set(getAttendanceRecordKey(nr.studentId, nr.subjectId, nr.date), nr);
      }

      state.records = Array.from(recordMap.values());
    },

    resetAttendance: (state) => {
      state.records = INITIAL_ATTENDANCE;
      state.error = null;
      state.successMessage = 'Attendance data reset to default seed records.';
    },

    clearAttendanceMessage: (state) => {
      state.successMessage = '';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // fetchAttendanceRecords
    builder.addCase(fetchAttendanceRecords.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAttendanceRecords.fulfilled, (state, action) => {
      state.loading = false;
      state.records = action.payload;
    });
    builder.addCase(fetchAttendanceRecords.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // saveAttendanceSessionThunk
    builder.addCase(saveAttendanceSessionThunk.pending, (state) => {
      state.saving = true;
      state.error = null;
      state.successMessage = '';
    });
    builder.addCase(saveAttendanceSessionThunk.fulfilled, (state, action) => {
      state.saving = false;
      const { savedRecords, sessionKey } = action.payload;

      // Deduplicate and update in state
      const recordMap = new Map();
      for (const r of state.records) {
        recordMap.set(getAttendanceRecordKey(r.studentId, r.subjectId, r.date), r);
      }
      for (const nr of savedRecords) {
        recordMap.set(getAttendanceRecordKey(nr.studentId, nr.subjectId, nr.date), nr);
      }

      state.records = Array.from(recordMap.values());
      state.lastSavedSession = sessionKey;
      state.successMessage = `Attendance successfully recorded for ${savedRecords.length} students. (Simulated Save)`;
    });
    builder.addCase(saveAttendanceSessionThunk.rejected, (state, action) => {
      state.saving = false;
      state.error = action.payload;
    });
  },
});

export const {
  recordUpserted,
  sessionBatchUpserted,
  resetAttendance,
  clearAttendanceMessage,
} = attendanceSlice.actions;

export const selectAllAttendanceRecords = (state) => state.attendance.records;
export const selectAttendanceLoading = (state) => state.attendance.loading;
export const selectAttendanceSaving = (state) => state.attendance.saving;
export const selectAttendanceError = (state) => state.attendance.error;
export const selectAttendanceSuccess = (state) => state.attendance.successMessage;

export default attendanceSlice.reducer;


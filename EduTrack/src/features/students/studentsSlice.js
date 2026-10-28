/**
 * Students Slice using Redux Toolkit createEntityAdapter and createAsyncThunk.
 */

import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { mockStudentApi } from '../../api/mockStudentApi';
import { INITIAL_STUDENTS } from '../../data/seedData';
import { loadPersistedState } from '../../utils/storage';

export const studentsAdapter = createEntityAdapter({
  selectId: (student) => student.id,
  sortComparer: (a, b) => a.studentId.localeCompare(b.studentId),
});

// Load persisted entities if available; otherwise use INITIAL_STUDENTS
const persisted = loadPersistedState();
const initialEntities = persisted?.students?.ids && persisted?.students?.entities
  ? persisted.students
  : studentsAdapter.setAll(studentsAdapter.getInitialState(), INITIAL_STUDENTS);

const initialState = {
  ...initialEntities,
  loading: false,
  error: null,
  actionStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  statusMessage: '',
};

// Async Thunks
export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await mockStudentApi.fetchStudents();
      return response;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch students');
    }
  }
);

export const createStudentThunk = createAsyncThunk(
  'students/createStudent',
  async (studentData, { getState, rejectWithValue }) => {
    try {
      // Validate uniqueness of studentId
      const state = getState();
      const existing = Object.values(state.students.entities).find(
        (s) => s?.studentId?.toUpperCase() === studentData.studentId?.trim().toUpperCase()
      );
      if (existing) {
        return rejectWithValue(`Student ID "${studentData.studentId}" is already registered.`);
      }

      const created = await mockStudentApi.createStudent(studentData);
      return created;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to create student');
    }
  }
);

export const updateStudentThunk = createAsyncThunk(
  'students/updateStudent',
  async (studentData, { getState, rejectWithValue }) => {
    try {
      // Ensure studentId uniqueness excluding current student
      const state = getState();
      const conflict = Object.values(state.students.entities).find(
        (s) =>
          s.id !== studentData.id &&
          s.studentId.toUpperCase() === studentData.studentId.trim().toUpperCase()
      );
      if (conflict) {
        return rejectWithValue(`Student ID "${studentData.studentId}" is already used by another student.`);
      }

      const updated = await mockStudentApi.updateStudent(studentData);
      return updated;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to update student');
    }
  }
);

export const deleteStudentThunk = createAsyncThunk(
  'students/deleteStudent',
  async (studentId, { rejectWithValue }) => {
    try {
      await mockStudentApi.deleteStudent(studentId);
      return studentId;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to delete student');
    }
  }
);

export const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    studentAdded: studentsAdapter.addOne,
    studentUpdated: studentsAdapter.updateOne,
    studentRemoved: studentsAdapter.removeOne,
    studentDeactivated: (state, action) => {
      const id = action.payload;
      if (state.entities[id]) {
        state.entities[id].status = 'inactive';
        state.entities[id].updatedAt = new Date().toISOString();
      }
    },
    studentActivated: (state, action) => {
      const id = action.payload;
      if (state.entities[id]) {
        state.entities[id].status = 'active';
        state.entities[id].updatedAt = new Date().toISOString();
      }
    },
    resetStudents: (state) => {
      studentsAdapter.setAll(state, INITIAL_STUDENTS);
      state.loading = false;
      state.error = null;
      state.actionStatus = 'idle';
      state.statusMessage = 'Students reset to default seed data.';
    },
    clearStudentStatusMessage: (state) => {
      state.statusMessage = '';
      state.actionStatus = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // fetchStudents
    builder.addCase(fetchStudents.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      state.loading = false;
      studentsAdapter.setAll(state, action.payload);
    });
    builder.addCase(fetchStudents.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to load students.';
    });

    // createStudent
    builder.addCase(createStudentThunk.pending, (state) => {
      state.actionStatus = 'loading';
      state.error = null;
    });
    builder.addCase(createStudentThunk.fulfilled, (state, action) => {
      state.actionStatus = 'succeeded';
      state.statusMessage = `Student ${action.payload.name} created successfully.`;
      studentsAdapter.addOne(state, action.payload);
    });
    builder.addCase(createStudentThunk.rejected, (state, action) => {
      state.actionStatus = 'failed';
      state.error = action.payload;
    });

    // updateStudent
    builder.addCase(updateStudentThunk.pending, (state) => {
      state.actionStatus = 'loading';
      state.error = null;
    });
    builder.addCase(updateStudentThunk.fulfilled, (state, action) => {
      state.actionStatus = 'succeeded';
      state.statusMessage = `Student ${action.payload.name} updated successfully.`;
      studentsAdapter.upsertOne(state, action.payload);
    });
    builder.addCase(updateStudentThunk.rejected, (state, action) => {
      state.actionStatus = 'failed';
      state.error = action.payload;
    });

    // deleteStudent
    builder.addCase(deleteStudentThunk.pending, (state) => {
      state.actionStatus = 'loading';
      state.error = null;
    });
    builder.addCase(deleteStudentThunk.fulfilled, (state, action) => {
      state.actionStatus = 'succeeded';
      state.statusMessage = 'Student removed successfully.';
      studentsAdapter.removeOne(state, action.payload);
    });
    builder.addCase(deleteStudentThunk.rejected, (state, action) => {
      state.actionStatus = 'failed';
      state.error = action.payload;
    });
  },
});

export const {
  studentAdded,
  studentUpdated,
  studentRemoved,
  studentDeactivated,
  studentActivated,
  resetStudents,
  clearStudentStatusMessage,
} = studentsSlice.actions;

export const {
  selectAll: selectAllStudents,
  selectById: selectStudentById,
  selectEntities: selectStudentEntities,
  selectIds: selectStudentIds,
  selectTotal: selectTotalStudentsCount,
} = studentsAdapter.getSelectors((state) => state.students);

export default studentsSlice.reducer;


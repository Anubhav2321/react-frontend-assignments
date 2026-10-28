/**
 * Subjects Slice managing academic course offerings.
 */

import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_SUBJECTS } from '../../data/seedData';
import { loadPersistedState } from '../../utils/storage';

const persisted = loadPersistedState();
const initialItems = persisted?.subjects?.items && Array.isArray(persisted.subjects.items)
  ? persisted.subjects.items
  : INITIAL_SUBJECTS;

const initialState = {
  items: initialItems,
  loading: false,
  error: null,
  statusMessage: '',
};

export const subjectsSlice = createSlice({
  name: 'subjects',
  initialState,
  reducers: {
    addSubject: (state, action) => {
      const newSubject = action.payload;
      const codeExists = state.items.some(
        (sub) => sub.subjectCode.toUpperCase() === newSubject.subjectCode.trim().toUpperCase()
      );
      if (codeExists) {
        state.error = `Subject Code "${newSubject.subjectCode}" already exists.`;
        return;
      }
      state.items.push({
        ...newSubject,
        id: newSubject.id || `sub-${Date.now()}`,
        subjectCode: newSubject.subjectCode.trim().toUpperCase(),
        subjectName: newSubject.subjectName.trim(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      state.error = null;
      state.statusMessage = `Subject ${newSubject.subjectCode} created successfully.`;
    },
    updateSubject: (state, action) => {
      const updated = action.payload;
      const index = state.items.findIndex((s) => s.id === updated.id);
      if (index !== -1) {
        // Check code conflict
        const conflict = state.items.find(
          (s) => s.id !== updated.id && s.subjectCode.toUpperCase() === updated.subjectCode.trim().toUpperCase()
        );
        if (conflict) {
          state.error = `Subject Code "${updated.subjectCode}" is already used by another course.`;
          return;
        }
        state.items[index] = {
          ...state.items[index],
          ...updated,
          subjectCode: updated.subjectCode.trim().toUpperCase(),
          updatedAt: new Date().toISOString(),
        };
        state.error = null;
        state.statusMessage = `Subject ${updated.subjectCode} updated successfully.`;
      }
    },
    deleteSubject: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((s) => s.id !== id);
      state.statusMessage = 'Subject deleted.';
      state.error = null;
    },
    resetSubjects: (state) => {
      state.items = INITIAL_SUBJECTS;
      state.error = null;
      state.statusMessage = 'Subjects reset to default curriculum.';
    },
    clearSubjectStatusMessage: (state) => {
      state.statusMessage = '';
      state.error = null;
    },
  },
});

export const {
  addSubject,
  updateSubject,
  deleteSubject,
  resetSubjects,
  clearSubjectStatusMessage,
} = subjectsSlice.actions;

export const selectAllSubjects = (state) => state.subjects.items;
export const selectSubjectById = (state, subjectId) =>
  state.subjects.items.find((s) => s.id === subjectId);

export default subjectsSlice.reducer;


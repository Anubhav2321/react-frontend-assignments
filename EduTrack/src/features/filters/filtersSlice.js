/**
 * Filters Slice managing UI filters for Students, Attendance Session, Reports, and Subjects.
 */

import { createSlice } from '@reduxjs/toolkit';
import { getTodayString, getMonthString } from '../../utils/dateUtils';

const today = getTodayString();
const currentMonth = getMonthString(today);

const initialState = {
  // Student Directory Filters
  students: {
    searchQuery: '',
    department: 'All',
    semester: 'All',
    section: 'All',
    status: 'All', // 'All' | 'active' | 'inactive'
  },

  // Active Attendance Class Session Selectors
  attendanceSession: {
    date: today,
    subjectId: 'sub-cs-301', // Default to active subject
    semester: 3,
    section: 'A',
  },

  // Attendance Reports Filters
  reports: {
    mode: 'daily', // 'daily' | 'monthly' | 'custom'
    selectedDate: today,
    selectedMonth: currentMonth,
    studentId: 'All',
    subjectId: 'All',
    department: 'All',
    semester: 'All',
    section: 'All',
    startDate: '',
    endDate: '',
  },

  // Subjects Directory Filters
  subjects: {
    searchQuery: '',
    department: 'All',
    semester: 'All',
  },
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    // Student Filters
    setStudentSearchQuery: (state, action) => {
      state.students.searchQuery = action.payload;
    },
    setStudentDepartmentFilter: (state, action) => {
      state.students.department = action.payload;
    },
    setStudentSemesterFilter: (state, action) => {
      state.students.semester = action.payload;
    },
    setStudentSectionFilter: (state, action) => {
      state.students.section = action.payload;
    },
    setStudentStatusFilter: (state, action) => {
      state.students.status = action.payload;
    },
    resetStudentFilters: (state) => {
      state.students = { ...initialState.students };
    },

    // Attendance Session Selection
    setAttendanceDate: (state, action) => {
      state.attendanceSession.date = action.payload;
    },
    setAttendanceSubjectId: (state, action) => {
      state.attendanceSession.subjectId = action.payload;
    },
    setAttendanceSemester: (state, action) => {
      state.attendanceSession.semester = action.payload;
    },
    setAttendanceSection: (state, action) => {
      state.attendanceSession.section = action.payload;
    },

    // Report Filters
    setReportFilter: (state, action) => {
      const { field, value } = action.payload;
      if (state.reports[field] !== undefined) {
        state.reports[field] = value;
      }
    },
    resetReportFilters: (state) => {
      state.reports = { ...initialState.reports, selectedDate: today, selectedMonth: currentMonth };
    },

    // Subject Filters
    setSubjectSearchQuery: (state, action) => {
      state.subjects.searchQuery = action.payload;
    },
    setSubjectDepartmentFilter: (state, action) => {
      state.subjects.department = action.payload;
    },
    setSubjectSemesterFilter: (state, action) => {
      state.subjects.semester = action.payload;
    },
    resetSubjectFilters: (state) => {
      state.subjects = { ...initialState.subjects };
    },
  },
});

export const {
  setStudentSearchQuery,
  setStudentDepartmentFilter,
  setStudentSemesterFilter,
  setStudentSectionFilter,
  setStudentStatusFilter,
  resetStudentFilters,

  setAttendanceDate,
  setAttendanceSubjectId,
  setAttendanceSemester,
  setAttendanceSection,

  setReportFilter,
  resetReportFilters,

  setSubjectSearchQuery,
  setSubjectDepartmentFilter,
  setSubjectSemesterFilter,
  resetSubjectFilters,
} = filtersSlice.actions;

export const selectStudentFilters = (state) => state.filters.students;
export const selectAttendanceSessionFilters = (state) => state.filters.attendanceSession;
export const selectReportFilters = (state) => state.filters.reports;
export const selectSubjectFilters = (state) => state.filters.subjects;

export default filtersSlice.reducer;


/**
 * Memoized Selectors for Attendance Reports and Analytics.
 */

import { createSelector } from '@reduxjs/toolkit';
import { selectAllAttendanceRecords } from '../features/attendance/attendanceSlice';
import { selectAllStudents, selectStudentEntities } from '../features/students/studentsSlice';
import { selectAllSubjects } from '../features/subjects/subjectsSlice';
import { selectReportFilters } from '../features/filters/filtersSlice';
import { selectStudentAttendanceStatsMap } from './attendanceSelectors';
import { isDateInRange } from '../utils/dateUtils';
import { calculateAttendanceStats } from '../utils/attendanceCalculations';

/**
 * Filtered attendance records according to active report criteria.
 */
export const selectFilteredReportRecords = createSelector(
  [
    selectAllAttendanceRecords,
    selectStudentEntities,
    selectAllSubjects,
    selectReportFilters,
    selectStudentAttendanceStatsMap,
  ],
  (records, studentEntities, subjects, filters, statsMap) => {
    const {
      mode,
      selectedDate,
      selectedMonth,
      studentId,
      subjectId,
      department,
      semester,
      section,
      startDate,
      endDate,
    } = filters;

    // Create lookup map for subjects
    const subjectMap = new Map();
    for (const sub of subjects) {
      subjectMap.set(sub.id, sub);
    }

    return records
      .filter((record) => {
        // Mode filtering
        if (mode === 'daily') {
          if (selectedDate && record.date !== selectedDate) return false;
        } else if (mode === 'monthly') {
          if (selectedMonth && !record.date.startsWith(selectedMonth)) return false;
        } else if (mode === 'custom') {
          if (!isDateInRange(record.date, startDate, endDate)) return false;
        }

        // Student filter
        if (studentId !== 'All' && record.studentId !== studentId) return false;

        // Subject filter
        if (subjectId !== 'All' && record.subjectId !== subjectId) return false;

        // Student metadata filters (department, semester, section)
        const student = studentEntities[record.studentId];
        if (student) {
          if (department !== 'All' && student.department !== department) return false;
          if (semester !== 'All' && Number(student.semester) !== Number(semester)) return false;
          if (section !== 'All' && student.section !== section) return false;
        } else if (department !== 'All' || semester !== 'All' || section !== 'All') {
          return false;
        }

        return true;
      })
      .map((record) => {
        const student = studentEntities[record.studentId] || {};
        const subject = subjectMap.get(record.subjectId) || {};
        const studentStats = statsMap.get(record.studentId) || {};

        return {
          ...record,
          studentName: student.name || 'Unknown Student',
          studentCustomId: student.studentId || 'N/A',
          department: student.department || 'N/A',
          semester: record.semester || student.semester || 'N/A',
          section: record.section || student.section || 'N/A',
          subjectCode: subject.subjectCode || 'N/A',
          subjectName: subject.subjectName || 'Unknown Subject',
          studentOverallPercentage: studentStats.percentage,
        };
      })
      .sort((a, b) => {
        // Sort newest date first, then by student ID
        if (a.date !== b.date) return b.date.localeCompare(a.date);
        return a.studentCustomId.localeCompare(b.studentCustomId);
      });
  }
);

/**
 * Summary totals for the currently filtered report records.
 */
export const selectReportSummaryStats = createSelector(
  [selectFilteredReportRecords],
  (records) => {
    return calculateAttendanceStats(records);
  }
);

/**
 * Prepares data structure ready for CSV export.
 */
export const selectReportCsvExportData = createSelector(
  [selectFilteredReportRecords],
  (records) => {
    const headers = [
      'Student ID',
      'Student Name',
      'Department',
      'Semester',
      'Section',
      'Subject Code',
      'Subject Name',
      'Date',
      'Attendance Status',
      'Overall Attendance %',
    ];

    const keys = [
      'studentCustomId',
      'studentName',
      'department',
      'semester',
      'section',
      'subjectCode',
      'subjectName',
      'date',
      'status',
      'studentOverallPercentage',
    ];

    return {
      headers,
      keys,
      rows: records,
    };
  }
);


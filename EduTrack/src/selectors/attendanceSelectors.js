/**
 * Memoized Selectors for Attendance Records, Calculations, and Low-Attendance Thresholds.
 */

import { createSelector } from '@reduxjs/toolkit';
import { selectAllAttendanceRecords } from '../features/attendance/attendanceSlice';
import { selectAllStudents } from '../features/students/studentsSlice';
import { selectAttendanceSessionFilters } from '../features/filters/filtersSlice';
import { selectAttendanceThreshold } from '../features/preferences/preferencesSlice';
import {
  calculateAttendanceStats,
  isBelowThreshold,
  getAttendanceRecordKey,
} from '../utils/attendanceCalculations';

export { selectAllAttendanceRecords };

/**
 * Maps all attendance records by student ID.
 * studentId -> Array of attendance records
 */
export const selectAttendanceByStudentMap = createSelector(
  [selectAllAttendanceRecords],
  (records) => {
    const map = new Map();
    for (const record of records) {
      if (!map.has(record.studentId)) {
        map.set(record.studentId, []);
      }
      map.get(record.studentId).push(record);
    }
    return map;
  }
);

/**
 * Calculates individual attendance statistics for every student in the system.
 * Returns Map<studentId, { total, present, absent, internshipPlaced, officialEngagement, countable, percentage, isLow }>
 */
export const selectStudentAttendanceStatsMap = createSelector(
  [selectAllStudents, selectAttendanceByStudentMap, selectAttendanceThreshold],
  (students, attendanceByStudent, threshold) => {
    const statsMap = new Map();

    for (const student of students) {
      const records = attendanceByStudent.get(student.id) || [];
      const stats = calculateAttendanceStats(records);
      const isLow = isBelowThreshold(stats.percentage, threshold);

      statsMap.set(student.id, {
        studentId: student.id,
        ...stats,
        isLow,
        threshold,
      });
    }

    return statsMap;
  }
);

/**
 * Selects all students whose calculated attendance is below the configured threshold.
 * Excludes students with 'N/A' (null) percentage.
 */
export const selectLowAttendanceStudents = createSelector(
  [selectAllStudents, selectStudentAttendanceStatsMap],
  (students, statsMap) => {
    return students
      .filter((s) => s.status !== 'inactive')
      .map((student) => {
        const stats = statsMap.get(student.id) || {};
        return {
          student,
          stats,
        };
      })
      .filter((item) => item.stats.isLow);
  }
);

/**
 * Selects attendance records indexed for the active session (by studentId).
 * Matches the currently selected date and subjectId in filters.
 */
export const selectActiveSessionRecordMap = createSelector(
  [selectAllAttendanceRecords, selectAttendanceSessionFilters],
  (records, sessionFilters) => {
    const { date, subjectId } = sessionFilters;
    const sessionMap = new Map();

    for (const record of records) {
      if (record.date === date && record.subjectId === subjectId) {
        sessionMap.set(record.studentId, record);
      }
    }

    return sessionMap;
  }
);

/**
 * Counts attendance status for the active class session being viewed on the Attendance page.
 */
export const selectActiveSessionStats = createSelector(
  [selectAllStudents, selectAttendanceSessionFilters, selectActiveSessionRecordMap],
  (students, sessionFilters, sessionMap) => {
    const { semester, section, subjectId } = sessionFilters;

    // Filter eligible students
    const eligibleStudents = students.filter((s) => {
      if (s.status === 'inactive') return false;
      if (semester && Number(s.semester) !== Number(semester)) return false;
      if (section && s.section !== section) return false;
      if (subjectId && Array.isArray(s.subjectIds) && s.subjectIds.length > 0) {
        return s.subjectIds.includes(subjectId);
      }
      return true;
    });

    let present = 0;
    let absent = 0;
    let internshipPlaced = 0;
    let officialEngagement = 0;
    let unmarked = 0;

    for (const student of eligibleStudents) {
      const record = sessionMap.get(student.id);
      if (!record || !record.status) {
        unmarked++;
      } else if (record.status === 'P') {
        present++;
      } else if (record.status === 'A') {
        absent++;
      } else if (record.status === 'PL') {
        internshipPlaced++;
      } else if (record.status === 'E') {
        officialEngagement++;
      }
    }

    const recorded = present + absent + internshipPlaced + officialEngagement;
    const countable = present + absent;
    const percentage = countable > 0 ? Number(((present / countable) * 100).toFixed(1)) : null;

    return {
      eligibleCount: eligibleStudents.length,
      recorded,
      present,
      absent,
      internshipPlaced,
      officialEngagement,
      unmarked,
      percentage,
    };
  }
);


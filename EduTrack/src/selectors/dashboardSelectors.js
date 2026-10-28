/**
 * Memoized Selectors for the Executive Dashboard & Visualizations.
 */

import { createSelector } from '@reduxjs/toolkit';
import { selectAllStudents } from '../features/students/studentsSlice';
import { selectAllAttendanceRecords } from '../features/attendance/attendanceSlice';
import { selectAllSubjects } from '../features/subjects/subjectsSlice';
import { selectLowAttendanceStudents, selectStudentAttendanceStatsMap } from './attendanceSelectors';
import { calculateAttendanceStats, STATUS_CONFIG } from '../utils/attendanceCalculations';

/**
 * Executive Summary Cards metrics.
 */
export const selectDashboardMetrics = createSelector(
  [selectAllStudents, selectAllAttendanceRecords, selectLowAttendanceStudents],
  (students, records, lowStudents) => {
    const stats = calculateAttendanceStats(records);
    const activeStudents = students.filter((s) => s.status !== 'inactive');

    return {
      totalStudents: activeStudents.length,
      totalSessionsRecorded: records.length,
      presentCount: stats.present,
      absentCount: stats.absent,
      internshipPlacedCount: stats.internshipPlaced,
      officialEngagementCount: stats.officialEngagement,
      overallPercentage: stats.percentage,
      lowAttendanceCount: lowStudents.length,
    };
  }
);

/**
 * Attendance Status Distribution for Recharts Donut / Pie Chart.
 */
export const selectStatusDistributionData = createSelector(
  [selectAllAttendanceRecords],
  (records) => {
    const stats = calculateAttendanceStats(records);

    return [
      {
        name: STATUS_CONFIG.P.label,
        value: stats.present,
        color: STATUS_CONFIG.P.chartColor,
        code: 'P',
      },
      {
        name: STATUS_CONFIG.A.label,
        value: stats.absent,
        color: STATUS_CONFIG.A.chartColor,
        code: 'A',
      },
      {
        name: STATUS_CONFIG.PL.label,
        value: stats.internshipPlaced,
        color: STATUS_CONFIG.PL.chartColor,
        code: 'PL',
      },
      {
        name: STATUS_CONFIG.E.label,
        value: stats.officialEngagement,
        color: STATUS_CONFIG.E.chartColor,
        code: 'E',
      },
    ].filter((item) => item.value > 0);
  }
);

/**
 * Attendance Trends Over Time for Recharts Area/Line Chart.
 * Groups records by date and calculates percentage and counts.
 */
export const selectAttendanceTrendData = createSelector(
  [selectAllAttendanceRecords],
  (records) => {
    const dateMap = new Map();

    for (const record of records) {
      if (!dateMap.has(record.date)) {
        dateMap.set(record.date, []);
      }
      dateMap.get(record.date).push(record);
    }

    // Sort dates ascending
    const sortedDates = Array.from(dateMap.keys()).sort();

    return sortedDates.map((date) => {
      const dayRecords = dateMap.get(date);
      const stats = calculateAttendanceStats(dayRecords);

      return {
        date,
        displayDate: date.substring(5), // 'MM-DD'
        present: stats.present,
        absent: stats.absent,
        internshipPlaced: stats.internshipPlaced,
        officialEngagement: stats.officialEngagement,
        percentage: stats.percentage ?? 0,
        total: stats.total,
      };
    });
  }
);

/**
 * Subject-wise Attendance Comparison for Recharts Bar Chart.
 */
export const selectSubjectAttendanceData = createSelector(
  [selectAllSubjects, selectAllAttendanceRecords],
  (subjects, records) => {
    return subjects.map((subject) => {
      const subjectRecords = records.filter((r) => r.subjectId === subject.id);
      const stats = calculateAttendanceStats(subjectRecords);

      return {
        id: subject.id,
        code: subject.subjectCode,
        name: subject.subjectName,
        total: stats.total,
        present: stats.present,
        absent: stats.absent,
        percentage: stats.percentage !== null ? stats.percentage : 0,
        hasRecords: stats.total > 0,
      };
    }).filter((s) => s.total > 0); // show subjects with activity
  }
);

/**
 * Department-wise Attendance Comparison for Recharts Bar Chart.
 */
export const selectDepartmentAttendanceData = createSelector(
  [selectAllStudents, selectAllAttendanceRecords],
  (students, records) => {
    const studentDeptMap = new Map(students.map((s) => [s.id, s.department]));
    const deptRecordMap = new Map();

    for (const record of records) {
      const dept = studentDeptMap.get(record.studentId) || 'Other';
      if (!deptRecordMap.has(dept)) {
        deptRecordMap.set(dept, []);
      }
      deptRecordMap.get(dept).push(record);
    }

    return Array.from(deptRecordMap.entries()).map(([dept, deptRecords]) => {
      const stats = calculateAttendanceStats(deptRecords);
      return {
        department: dept,
        present: stats.present,
        absent: stats.absent,
        total: stats.total,
        percentage: stats.percentage ?? 0,
      };
    });
  }
);

/**
 * Recent Attendance Sessions for the dashboard activity feed.
 */
export const selectRecentSessionsFeed = createSelector(
  [selectAllAttendanceRecords, selectAllSubjects],
  (records, subjects) => {
    const subjectMap = new Map(subjects.map((s) => [s.id, s]));
    const sessionGroup = new Map();

    for (const record of records) {
      const key = `${record.subjectId}_${record.date}_${record.section}`;
      if (!sessionGroup.has(key)) {
        sessionGroup.set(key, {
          subjectId: record.subjectId,
          date: record.date,
          semester: record.semester,
          section: record.section,
          records: [],
        });
      }
      sessionGroup.get(key).records.push(record);
    }

    return Array.from(sessionGroup.values())
      .map((session) => {
        const subject = subjectMap.get(session.subjectId) || {
          subjectCode: 'Unknown',
          subjectName: 'Course',
        };
        const stats = calculateAttendanceStats(session.records);

        return {
          id: `${session.subjectId}-${session.date}-${session.section}`,
          subjectCode: subject.subjectCode,
          subjectName: subject.subjectName,
          date: session.date,
          semester: session.semester,
          section: session.section,
          stats,
        };
      })
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 6); // Latest 6 sessions
  }
);


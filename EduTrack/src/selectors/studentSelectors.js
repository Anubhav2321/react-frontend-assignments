/**
 * Memoized Selectors for Student Management.
 */

import { createSelector } from '@reduxjs/toolkit';
import { selectAllStudents } from '../features/students/studentsSlice';
import { selectStudentFilters, selectAttendanceSessionFilters } from '../features/filters/filtersSlice';

export { selectAllStudents };

export const selectActiveStudents = createSelector(
  [selectAllStudents],
  (students) => students.filter((s) => s.status !== 'inactive')
);

/**
 * Filtered students selector based on active Student page filters:
 * - searchQuery (searches student ID and Name)
 * - department
 * - semester
 * - section
 * - status ('All', 'active', 'inactive')
 */
export const selectFilteredStudents = createSelector(
  [selectAllStudents, selectStudentFilters],
  (students, filters) => {
    const { searchQuery, department, semester, section, status } = filters;
    const query = searchQuery ? searchQuery.trim().toLowerCase() : '';

    return students.filter((student) => {
      // Search query check
      if (query) {
        const matchesName = student.name?.toLowerCase().includes(query);
        const matchesId = student.studentId?.toLowerCase().includes(query);
        if (!matchesName && !matchesId) return false;
      }

      // Department filter
      if (department !== 'All' && student.department !== department) {
        return false;
      }

      // Semester filter
      if (semester !== 'All' && Number(student.semester) !== Number(semester)) {
        return false;
      }

      // Section filter
      if (section !== 'All' && student.section !== section) {
        return false;
      }

      // Status filter
      if (status !== 'All' && student.status !== status) {
        return false;
      }

      return true;
    });
  }
);

/**
 * Selects eligible students for the currently selected class attendance session:
 * Matches semester, section, and checks that student is active and enrolled in the subject (if subject has enrollments).
 */
export const selectEligibleSessionStudents = createSelector(
  [selectAllStudents, selectAttendanceSessionFilters],
  (students, sessionFilters) => {
    const { subjectId, semester, section } = sessionFilters;

    return students.filter((student) => {
      if (student.status === 'inactive') return false;
      if (semester && Number(student.semester) !== Number(semester)) return false;
      if (section && student.section !== section) return false;

      // If student has subject registrations, verify registration
      if (subjectId && Array.isArray(student.subjectIds) && student.subjectIds.length > 0) {
        return student.subjectIds.includes(subjectId);
      }

      return true;
    });
  }
);

/**
 * Counts of students by department.
 */
export const selectStudentDepartmentCounts = createSelector(
  [selectAllStudents],
  (students) => {
    const counts = {};
    for (const student of students) {
      const dept = student.department || 'Unassigned';
      counts[dept] = (counts[dept] || 0) + 1;
    }
    return counts;
  }
);


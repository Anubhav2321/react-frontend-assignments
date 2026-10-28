/**
 * Centralized Attendance Calculation Utilities and Policy.
 *
 * ATTENDANCE STATUS DEFINITIONS:
 * - 'P' : Present (Earns attendance credit)
 * - 'A' : Absent (Does not earn attendance credit)
 * - 'PL': Internship Placed (Off-campus approved internship; excluded from countable denominator)
 * - 'E' : Official Engagement (College sports/symposium representation; excluded from countable denominator)
 *
 * CALCULATION FORMULA:
 * Countable Sessions = Present (P) + Absent (A)
 * Attendance % = (Present / Countable Sessions) * 100
 *
 * If Countable Sessions === 0, percentage is null ('N/A').
 */

export const ATTENDANCE_STATUS = {
  PRESENT: 'P',
  ABSENT: 'A',
  INTERNSHIP_PLACED: 'PL',
  OFFICIAL_ENGAGEMENT: 'E',
};

export const STATUS_CONFIG = {
  [ATTENDANCE_STATUS.PRESENT]: {
    code: 'P',
    label: 'Present',
    description: 'Present in class',
    badgeClass: 'badge-present',
    colorHex: '#16a34a',
    bgHex: '#dcfce7',
    borderHex: '#86efac',
    textColor: '#15803d',
    chartColor: '#22c55e',
  },
  [ATTENDANCE_STATUS.ABSENT]: {
    code: 'A',
    label: 'Absent',
    description: 'Unexcused absence',
    badgeClass: 'badge-absent',
    colorHex: '#dc2626',
    bgHex: '#fee2e2',
    borderHex: '#fca5a5',
    textColor: '#b91c1c',
    chartColor: '#ef4444',
  },
  [ATTENDANCE_STATUS.INTERNSHIP_PLACED]: {
    code: 'PL',
    label: 'Internship Placed',
    description: 'Official corporate internship',
    badgeClass: 'badge-placement',
    colorHex: '#7c3aed',
    bgHex: '#f3e8ff',
    borderHex: '#d8b4fe',
    textColor: '#6d28d9',
    chartColor: '#a855f7',
  },
  [ATTENDANCE_STATUS.OFFICIAL_ENGAGEMENT]: {
    code: 'E',
    label: 'Official Engagement',
    description: 'College event / sports representation',
    badgeClass: 'badge-engagement',
    colorHex: '#d97706',
    bgHex: '#fef3c7',
    borderHex: '#fcd34d',
    textColor: '#b45309',
    chartColor: '#f59e0b',
  },
};

export const DEFAULT_ATTENDANCE_THRESHOLD = 45; // Default 45% threshold

/**
 * Counts attendance statuses for a given array of records.
 * @param {Array<{ status: string }>} records
 * @returns {{
 *   total: number,
 *   present: number,
 *   absent: number,
 *   internshipPlaced: number,
 *   officialEngagement: number,
 *   countable: number,
 *   percentage: number|null
 * }}
 */
export const calculateAttendanceStats = (records = []) => {
  let present = 0;
  let absent = 0;
  let internshipPlaced = 0;
  let officialEngagement = 0;

  for (const record of records) {
    if (!record || !record.status) continue;
    switch (record.status) {
      case ATTENDANCE_STATUS.PRESENT:
        present++;
        break;
      case ATTENDANCE_STATUS.ABSENT:
        absent++;
        break;
      case ATTENDANCE_STATUS.INTERNSHIP_PLACED:
        internshipPlaced++;
        break;
      case ATTENDANCE_STATUS.OFFICIAL_ENGAGEMENT:
        officialEngagement++;
        break;
      default:
        break;
    }
  }

  const countable = present + absent;
  const percentage = countable > 0 ? Number(((present / countable) * 100).toFixed(1)) : null;

  return {
    total: records.length,
    present,
    absent,
    internshipPlaced,
    officialEngagement,
    countable,
    percentage,
  };
};

/**
 * Calculates individual attendance percentage from countable counts.
 * @param {number} present
 * @param {number} absent
 * @returns {number|null} percentage rounded to 1 decimal or null if no countable sessions
 */
export const calculatePercentage = (present = 0, absent = 0) => {
  const countable = present + absent;
  if (countable === 0) return null;
  return Number(((present / countable) * 100).toFixed(1));
};

/**
 * Determines whether a student is below the configured threshold.
 * Excludes students with null ('N/A') attendance.
 * @param {number|null} percentage
 * @param {number} threshold
 * @returns {boolean}
 */
export const isBelowThreshold = (percentage, threshold = DEFAULT_ATTENDANCE_THRESHOLD) => {
  if (percentage === null || percentage === undefined) return false;
  return percentage < threshold;
};

/**
 * Formats a percentage for display, e.g. "82.5%" or "N/A".
 * @param {number|null} percentage
 * @returns {string}
 */
export const formatPercentage = (percentage) => {
  if (percentage === null || percentage === undefined || isNaN(percentage)) {
    return 'N/A';
  }
  return `${percentage.toFixed(1)}%`;
};

/**
 * Generates a unique key for an attendance session entry: studentId_subjectId_date
 * @param {string} studentId
 * @param {string} subjectId
 * @param {string} date
 * @returns {string}
 */
export const getAttendanceRecordKey = (studentId, subjectId, date) => {
  return `${studentId}_${subjectId}_${date}`;
};


/**
 * Date utility functions for AttendEase.
 * Guarantees canonical 'YYYY-MM-DD' formatting and prevents timezone shifts.
 */

/**
 * Pads a single-digit number with a leading zero.
 * @param {number} n
 * @returns {string}
 */
export const padZero = (n) => String(n).padStart(2, '0');

/**
 * Returns today's date formatted as canonical 'YYYY-MM-DD' in local time.
 * @returns {string}
 */
export const getTodayString = () => {
  const now = new Date();
  return `${now.getFullYear()}-${padZero(now.getMonth() + 1)}-${padZero(now.getDate())}`;
};

/**
 * Formats a Date object or parseable date into 'YYYY-MM-DD'.
 * @param {Date|string|number} d
 * @returns {string}
 */
export const formatCanonicalDate = (d) => {
  if (!d) return '';
  if (typeof d === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d.trim())) {
    return d.trim();
  }
  const dateObj = new Date(d);
  if (isNaN(dateObj.getTime())) return '';
  return `${dateObj.getFullYear()}-${padZero(dateObj.getMonth() + 1)}-${padZero(dateObj.getDate())}`;
};

/**
 * Formats a canonical date 'YYYY-MM-DD' for user display (e.g. 'Oct 28, 2026').
 * @param {string} dateStr
 * @returns {string}
 */
export const formatDisplayDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  const dateObj = new Date(year, month, day);
  if (isNaN(dateObj.getTime())) return dateStr;
  return dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Validates whether a string is a valid 'YYYY-MM-DD' date.
 * @param {string} dateStr
 * @returns {boolean}
 */
export const isValidDateString = (dateStr) => {
  if (!dateStr || typeof dateStr !== 'string') return false;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return (
    date.getFullYear() === y &&
    date.getMonth() === m - 1 &&
    date.getDate() === d
  );
};

/**
 * Checks if a canonical date falls within an inclusive [startDate, endDate] range.
 * @param {string} dateStr
 * @param {string} [startDate]
 * @param {string} [endDate]
 * @returns {boolean}
 */
export const isDateInRange = (dateStr, startDate, endDate) => {
  if (!dateStr) return false;
  if (startDate && dateStr < startDate) return false;
  if (endDate && dateStr > endDate) return false;
  return true;
};

/**
 * Gets the current month string formatted as 'YYYY-MM'.
 * @param {string} [dateStr]
 * @returns {string}
 */
export const getMonthString = (dateStr) => {
  if (dateStr && dateStr.length >= 7) {
    return dateStr.substring(0, 7);
  }
  const now = new Date();
  return `${now.getFullYear()}-${padZero(now.getMonth() + 1)}`;
};

/**
 * Formats 'YYYY-MM' into readable 'October 2026'.
 * @param {string} monthStr
 * @returns {string}
 */
export const formatDisplayMonth = (monthStr) => {
  if (!monthStr) return '';
  const [yearStr, monthNumStr] = monthStr.split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthNumStr, 10) - 1;
  const dateObj = new Date(year, month, 1);
  if (isNaN(dateObj.getTime())) return monthStr;
  return dateObj.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};


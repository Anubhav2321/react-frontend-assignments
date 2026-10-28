/**
 * CSV Export utility with formula injection mitigation and RFC 4180 compliance.
 */

/**
 * Sanitizes a cell to prevent CSV / Formula Injection vulnerabilities (DDE injection).
 * If cell starts with '=', '+', '-', '@', '\t', or '\r', prefixes with a single apostrophe.
 * Also escapes quotes and wraps in quotes if containing commas, quotes, or newlines.
 *
 * @param {string|number|null|undefined} value
 * @returns {string}
 */
export const sanitizeCsvCell = (value) => {
  if (value === null || value === undefined) {
    return '""';
  }
  let str = String(value);

  // Formula injection check: if text starts with formula triggers
  if (/^[=+\-@\t\r]/.test(str)) {
    str = `'${str}`;
  }

  // RFC 4180 escaping: double any double-quotes
  if (str.includes('"') || str.includes(',') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }

  return `"${str}"`;
};

/**
 * Converts an array of objects into a sanitized CSV string.
 *
 * @param {Array<string>} headers - Header column titles
 * @param {Array<string>} keys - Object keys corresponding to headers
 * @param {Array<Object>} rows - Data rows
 * @returns {string}
 */
export const generateCsvContent = (headers, keys, rows) => {
  const headerLine = headers.map(sanitizeCsvCell).join(',');
  const rowLines = rows.map((row) =>
    keys.map((key) => sanitizeCsvCell(row[key] !== undefined ? row[key] : '')).join(',')
  );

  return [headerLine, ...rowLines].join('\r\n');
};

/**
 * Triggers a real browser download of a CSV file.
 *
 * @param {string} csvContent
 * @param {string} fileName
 * @returns {boolean} True if download succeeded
 */
export const downloadCsvFile = (csvContent, fileName) => {
  if (!csvContent) {
    throw new Error('CSV content is empty.');
  }

  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.setAttribute('href', url);
  link.setAttribute('download', fileName.endsWith('.csv') ? fileName : `${fileName}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  return true;
};


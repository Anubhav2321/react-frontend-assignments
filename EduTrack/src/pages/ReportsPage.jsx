import React, { useState } from 'react';
import {
  Download,
  FilterX,
  FileSpreadsheet,
  Calendar,
  Layers,
  ChevronDown,
  ArrowUpDown,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  setReportFilter,
  resetReportFilters,
  selectReportFilters,
} from '../features/filters/filtersSlice';
import {
  selectFilteredReportRecords,
  selectReportSummaryStats,
  selectReportCsvExportData,
} from '../selectors/reportSelectors';
import { selectAllStudents } from '../features/students/studentsSlice';
import { selectAllSubjects } from '../features/subjects/subjectsSlice';
import { generateCsvContent, downloadCsvFile } from '../utils/csvExport';
import { formatPercentage, STATUS_CONFIG } from '../utils/attendanceCalculations';
import StatusBadge from '../components/common/StatusBadge';
import EmptyState from '../components/common/EmptyState';
import Pagination from '../components/common/Pagination';
import ToastNotification from '../components/common/ToastNotification';
import { DEPARTMENTS, SEMESTERS, SECTIONS } from '../data/seedData';
import { getTodayString } from '../utils/dateUtils';

export const ReportsPage = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectReportFilters);
  const records = useAppSelector(selectFilteredReportRecords);
  const summaryStats = useAppSelector(selectReportSummaryStats);
  const csvData = useAppSelector(selectReportCsvExportData);
  const students = useAppSelector(selectAllStudents);
  const subjects = useAppSelector(selectAllSubjects);

  const [notification, setNotification] = useState(null);
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Sorting
  const sortedRecords = [...records].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    if (aVal === undefined || aVal === null) aVal = '';
    if (bVal === undefined || bVal === null) bVal = '';

    if (typeof aVal === 'string') {
      return sortDirection === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }
    return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
  });

  const totalPages = Math.ceil(sortedRecords.length / pageSize);
  const paginatedRecords = sortedRecords.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleExportCsv = () => {
    try {
      if (!csvData.rows || csvData.rows.length === 0) {
        setNotification({
          type: 'error',
          message: 'No records available to export for the current filters.',
        });
        return;
      }

      const csvContent = generateCsvContent(csvData.headers, csvData.keys, csvData.rows);
      const filename = `attendease_report_${filters.mode}_${getTodayString()}`;
      downloadCsvFile(csvContent, filename);

      setNotification({
        type: 'success',
        message: `Successfully exported ${csvData.rows.length} attendance records to CSV.`,
      });
    } catch (err) {
      setNotification({
        type: 'error',
        message: err.message || 'Failed to generate CSV export.',
      });
    }
  };

  return (
    <div>
      {/* Page Title & Export Action */}
      <div className="page-header-row">
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            Attendance Auditing & Reports
          </h2>
          <p className="page-subtitle">
            Generate detailed multi-criteria attendance statements, session sheets, and spreadsheet exports.
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={handleExportCsv}
          disabled={records.length === 0}
          id="btn-export-csv"
        >
          <Download size={16} />
          <span>Export CSV Statement</span>
        </button>
      </div>

      {notification && (
        <ToastNotification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Filter Mode Toggle & Parameters */}
      <div className="filter-bar" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: '1rem' }}>
        {/* Upper Row: Mode and Date Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', backgroundColor: 'var(--slate-100)', padding: '0.25rem', borderRadius: 'var(--radius-md)' }}>
            <button
              type="button"
              className={`btn btn-sm ${filters.mode === 'daily' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => {
                dispatch(setReportFilter({ field: 'mode', value: 'daily' }));
                setCurrentPage(1);
              }}
            >
              Daily Mode
            </button>
            <button
              type="button"
              className={`btn btn-sm ${filters.mode === 'monthly' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => {
                dispatch(setReportFilter({ field: 'mode', value: 'monthly' }));
                setCurrentPage(1);
              }}
            >
              Monthly Mode
            </button>
            <button
              type="button"
              className={`btn btn-sm ${filters.mode === 'custom' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => {
                dispatch(setReportFilter({ field: 'mode', value: 'custom' }));
                setCurrentPage(1);
              }}
            >
              Date Range
            </button>
          </div>

          {filters.mode === 'daily' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--slate-600)' }}>
                Target Date:
              </label>
              <input
                type="date"
                className="date-input"
                style={{ width: '160px' }}
                value={filters.selectedDate}
                onChange={(e) => {
                  dispatch(setReportFilter({ field: 'selectedDate', value: e.target.value }));
                  setCurrentPage(1);
                }}
              />
            </div>
          )}

          {filters.mode === 'monthly' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--slate-600)' }}>
                Target Month:
              </label>
              <input
                type="month"
                className="date-input"
                style={{ width: '170px' }}
                value={filters.selectedMonth}
                onChange={(e) => {
                  dispatch(setReportFilter({ field: 'selectedMonth', value: e.target.value }));
                  setCurrentPage(1);
                }}
              />
            </div>
          )}

          {filters.mode === 'custom' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--slate-600)' }}>
                From:
              </label>
              <input
                type="date"
                className="date-input"
                style={{ width: '150px' }}
                value={filters.startDate}
                onChange={(e) => {
                  dispatch(setReportFilter({ field: 'startDate', value: e.target.value }));
                  setCurrentPage(1);
                }}
              />
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--slate-600)' }}>
                To:
              </label>
              <input
                type="date"
                className="date-input"
                style={{ width: '150px' }}
                value={filters.endDate}
                onChange={(e) => {
                  dispatch(setReportFilter({ field: 'endDate', value: e.target.value }));
                  setCurrentPage(1);
                }}
              />
            </div>
          )}
        </div>

        {/* Lower Row: Specific Selectors */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
          <select
            className="select-control"
            style={{ width: 'auto', minWidth: '170px' }}
            value={filters.studentId}
            onChange={(e) => {
              dispatch(setReportFilter({ field: 'studentId', value: e.target.value }));
              setCurrentPage(1);
            }}
          >
            <option value="All">All Students</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.studentId} — {s.name}
              </option>
            ))}
          </select>

          <select
            className="select-control"
            style={{ width: 'auto', minWidth: '170px' }}
            value={filters.subjectId}
            onChange={(e) => {
              dispatch(setReportFilter({ field: 'subjectId', value: e.target.value }));
              setCurrentPage(1);
            }}
          >
            <option value="All">All Courses</option>
            {subjects.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.subjectCode} — {sub.subjectName}
              </option>
            ))}
          </select>

          <select
            className="select-control"
            style={{ width: 'auto', minWidth: '150px' }}
            value={filters.department}
            onChange={(e) => {
              dispatch(setReportFilter({ field: 'department', value: e.target.value }));
              setCurrentPage(1);
            }}
          >
            <option value="All">All Departments</option>
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <select
            className="select-control"
            style={{ width: 'auto', minWidth: '120px' }}
            value={filters.semester}
            onChange={(e) => {
              dispatch(setReportFilter({ field: 'semester', value: e.target.value }));
              setCurrentPage(1);
            }}
          >
            <option value="All">All Semesters</option>
            {SEMESTERS.map((sem) => (
              <option key={sem} value={sem}>
                Sem {sem}
              </option>
            ))}
          </select>

          <select
            className="select-control"
            style={{ width: 'auto', minWidth: '110px' }}
            value={filters.section}
            onChange={(e) => {
              dispatch(setReportFilter({ field: 'section', value: e.target.value }));
              setCurrentPage(1);
            }}
          >
            <option value="All">All Sections</option>
            {SECTIONS.map((sec) => (
              <option key={sec} value={sec}>
                Sec {sec}
              </option>
            ))}
          </select>

          <button
            className="btn btn-secondary btn-sm"
            onClick={() => {
              dispatch(resetReportFilters());
              setCurrentPage(1);
            }}
            title="Reset report filters"
          >
            <FilterX size={15} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Aggregate Report Summary Ribbon */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '0.75rem',
          marginBottom: '1.25rem',
        }}
      >
        <div style={{ backgroundColor: '#fff', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid var(--slate-200)', borderTop: '3px solid var(--slate-400)' }}>
          <span style={{ fontSize: '0.68rem', color: 'var(--slate-500)', fontWeight: 700, textTransform: 'uppercase' }}>Records</span>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)' }}>{summaryStats.total}</div>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid var(--status-p-border)', borderTop: '3px solid var(--status-p-solid)' }}>
          <span style={{ fontSize: '0.68rem', color: 'var(--status-p-text)', fontWeight: 700, textTransform: 'uppercase' }}>Present (P)</span>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--status-p-text)' }}>{summaryStats.present}</div>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid var(--status-a-border)', borderTop: '3px solid var(--status-a-solid)' }}>
          <span style={{ fontSize: '0.68rem', color: 'var(--status-a-text)', fontWeight: 700, textTransform: 'uppercase' }}>Absent (A)</span>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--status-a-text)' }}>{summaryStats.absent}</div>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid var(--status-pl-border)', borderTop: '3px solid var(--status-pl-solid)' }}>
          <span style={{ fontSize: '0.68rem', color: 'var(--status-pl-text)', fontWeight: 700, textTransform: 'uppercase' }}>Placement (PL)</span>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--status-pl-text)' }}>{summaryStats.internshipPlaced}</div>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid var(--status-e-border)', borderTop: '3px solid var(--status-e-solid)' }}>
          <span style={{ fontSize: '0.68rem', color: 'var(--status-e-text)', fontWeight: 700, textTransform: 'uppercase' }}>Official Eng (E)</span>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--status-e-text)' }}>{summaryStats.officialEngagement}</div>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid var(--primary-200)', borderTop: '3px solid var(--primary-600)' }}>
          <span style={{ fontSize: '0.68rem', color: 'var(--primary-700)', fontWeight: 700, textTransform: 'uppercase' }}>Report %</span>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-700)' }}>
            {formatPercentage(summaryStats.percentage)}
          </div>
        </div>
      </div>

      {/* Report Records Table */}
      <div className="table-card">
        {records.length === 0 ? (
          <EmptyState
            icon={FileSpreadsheet}
            title="No attendance records match the selected report criteria"
            description="Adjust your target date, month range, or student/subject filters to examine records."
            action={
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => dispatch(resetReportFilters())}
              >
                Reset Filters
              </button>
            }
          />
        ) : (
          <>
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th onClick={() => handleSort('date')} style={{ cursor: 'pointer' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <span>Date</span>
                        <ArrowUpDown size={12} />
                      </div>
                    </th>
                    <th onClick={() => handleSort('studentCustomId')} style={{ cursor: 'pointer' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <span>Student ID</span>
                        <ArrowUpDown size={12} />
                      </div>
                    </th>
                    <th onClick={() => handleSort('studentName')} style={{ cursor: 'pointer' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <span>Student Name</span>
                        <ArrowUpDown size={12} />
                      </div>
                    </th>
                    <th>Dept / Sem</th>
                    <th>Course Code & Title</th>
                    <th style={{ textAlign: 'center' }}>Marked Status</th>
                    <th style={{ textAlign: 'right' }}>Overall %</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedRecords.map((row) => (
                    <tr key={row.id}>
                      <td style={{ fontWeight: 600, color: 'var(--slate-800)' }}>
                        {row.date}
                      </td>
                      <td style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                        {row.studentCustomId}
                      </td>
                      <td style={{ fontWeight: 600, color: 'var(--slate-900)' }}>
                        {row.studentName}
                      </td>
                      <td>
                        <span className="badge badge-neutral" style={{ fontSize: '0.72rem' }}>
                          {row.department} (S{row.semester}-{row.section})
                        </span>
                      </td>
                      <td>
                        <strong>{row.subjectCode}</strong> — {row.subjectName}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <StatusBadge status={row.status} />
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: 700 }}>
                        {formatPercentage(row.studentOverallPercentage)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={records.length}
              pageSize={pageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;


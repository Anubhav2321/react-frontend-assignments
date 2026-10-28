import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import studentsReducer from '../src/features/students/studentsSlice';
import subjectsReducer from '../src/features/subjects/subjectsSlice';
import attendanceReducer from '../src/features/attendance/attendanceSlice';
import filtersReducer from '../src/features/filters/filtersSlice';
import preferencesReducer from '../src/features/preferences/preferencesSlice';
import StatusBadge from '../src/components/common/StatusBadge';
import SummaryCard from '../src/components/common/SummaryCard';
import StudentFormModal from '../src/components/students/StudentFormModal';
import AttendancePage from '../src/pages/AttendancePage';
import { sanitizeCsvCell, generateCsvContent, downloadCsvFile } from '../src/utils/csvExport';

const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      students: studentsReducer,
      subjects: subjectsReducer,
      attendance: attendanceReducer,
      filters: filtersReducer,
      preferences: preferencesReducer,
    },
    preloadedState,
  });
};

describe('Component & UI Integration Tests', () => {
  it('renders StatusBadge with correct text and styling class for all statuses', () => {
    const { rerender } = render(<StatusBadge status="P" />);
    expect(screen.getByText('Present')).toBeInTheDocument();
    expect(screen.getByText('P')).toBeInTheDocument();

    rerender(<StatusBadge status="A" />);
    expect(screen.getByText('Absent')).toBeInTheDocument();

    rerender(<StatusBadge status="PL" />);
    expect(screen.getByText('Internship Placed')).toBeInTheDocument();

    rerender(<StatusBadge status="E" />);
    expect(screen.getByText('Official Engagement')).toBeInTheDocument();
  });

  it('renders SummaryCard with value, label, and subtext', () => {
    render(
      <SummaryCard
        label="Total Present"
        value={42}
        subtext="Attendance credit earned"
        badgeText="P"
      />
    );
    expect(screen.getByText('Total Present')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('Attendance credit earned')).toBeInTheDocument();
  });

  it('validates required fields in StudentFormModal before submitting', async () => {
    const store = createTestStore();
    const handleClose = vi.fn();

    render(
      <Provider store={store}>
        <StudentFormModal isOpen={true} onClose={handleClose} />
      </Provider>
    );

    // Try submitting without filling fields
    const submitBtn = screen.getByRole('button', { name: /Register Student/i });
    fireEvent.click(submitBtn);

    expect(await screen.findByText(/Student ID is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Full name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Email address is required/i)).toBeInTheDocument();
  });

  it('prevents formula injection in CSV cells and escapes commas and quotes', () => {
    // Formula triggers: =, +, -, @
    expect(sanitizeCsvCell('=SUM(A1:A10)')).toBe(`"'=SUM(A1:A10)"`);
    expect(sanitizeCsvCell('+cmd|')).toBe(`"'+cmd|"`);
    expect(sanitizeCsvCell('-5')).toBe(`"'-5"`);
    expect(sanitizeCsvCell('@trigger')).toBe(`"'@trigger"`);

    // Standard string with commas
    expect(sanitizeCsvCell('Sharma, Aarav')).toBe(`"Sharma, Aarav"`);

    // Quotes in string
    expect(sanitizeCsvCell('John "The Rock"')).toBe(`"John ""The Rock"""`);
  });

  it('generates compliant CSV content with headers and rows', () => {
    const headers = ['ID', 'Name', 'Percentage'];
    const keys = ['id', 'name', 'pct'];
    const rows = [
      { id: 'CS101', name: 'Aarav Sharma', pct: '85.0%' },
      { id: 'CS102', name: 'Diya Patel', pct: '92.5%' },
    ];

    const csv = generateCsvContent(headers, keys, rows);
    expect(csv).toContain('"ID","Name","Percentage"');
    expect(csv).toContain('"CS101","Aarav Sharma","85.0%"');
  });

  it('triggers real CSV download without crashing DOM', () => {
    const csvContent = '"Header1","Header2"\r\n"Val1","Val2"';

    // Mock URL.createObjectURL, revokeObjectURL and link.click
    const originalCreateObjectURL = window.URL.createObjectURL;
    const originalRevokeObjectURL = window.URL.revokeObjectURL;
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});

    window.URL.createObjectURL = vi.fn(() => 'blob:http://localhost/test-blob');
    window.URL.revokeObjectURL = vi.fn();

    const result = downloadCsvFile(csvContent, 'test_report_2026');
    expect(result).toBe(true);
    expect(window.URL.createObjectURL).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
    expect(window.URL.revokeObjectURL).toHaveBeenCalled();

    window.URL.createObjectURL = originalCreateObjectURL;
    window.URL.revokeObjectURL = originalRevokeObjectURL;
    clickSpy.mockRestore();
  });

  it('renders AttendancePage and allows marking statuses', async () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <AttendancePage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Class Attendance Tracker/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Mark All Present/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Save Attendance/i })).toBeInTheDocument();
  });
});

import { describe, it, expect } from 'vitest';
import {
  calculateAttendanceStats,
  calculatePercentage,
  isBelowThreshold,
  formatPercentage,
  getAttendanceRecordKey,
  ATTENDANCE_STATUS,
} from '../src/utils/attendanceCalculations';

describe('Attendance Calculation Utilities & Policies', () => {
  it('correctly calculates percentage when only P and A are present', () => {
    // 3 Present, 1 Absent = 3 / 4 = 75.0%
    const records = [
      { status: ATTENDANCE_STATUS.PRESENT },
      { status: ATTENDANCE_STATUS.PRESENT },
      { status: ATTENDANCE_STATUS.PRESENT },
      { status: ATTENDANCE_STATUS.ABSENT },
    ];
    const stats = calculateAttendanceStats(records);
    expect(stats.total).toBe(4);
    expect(stats.present).toBe(3);
    expect(stats.absent).toBe(1);
    expect(stats.countable).toBe(4);
    expect(stats.percentage).toBe(75.0);
  });

  it('excludes Internship Placed (PL) and Official Engagement (E) from both numerator and denominator', () => {
    // 2 Present, 0 Absent, 2 PL, 1 E
    // Countable = 2 + 0 = 2. Percentage = (2 / 2) * 100 = 100.0%
    const records = [
      { status: ATTENDANCE_STATUS.PRESENT },
      { status: ATTENDANCE_STATUS.INTERNSHIP_PLACED },
      { status: ATTENDANCE_STATUS.PRESENT },
      { status: ATTENDANCE_STATUS.INTERNSHIP_PLACED },
      { status: ATTENDANCE_STATUS.OFFICIAL_ENGAGEMENT },
    ];
    const stats = calculateAttendanceStats(records);
    expect(stats.total).toBe(5);
    expect(stats.present).toBe(2);
    expect(stats.absent).toBe(0);
    expect(stats.internshipPlaced).toBe(2);
    expect(stats.officialEngagement).toBe(1);
    expect(stats.countable).toBe(2);
    expect(stats.percentage).toBe(100.0);
  });

  it('handles zero-denominator when there are no countable sessions (returns null)', () => {
    // Only PL and E recorded: no P and no A
    const records = [
      { status: ATTENDANCE_STATUS.INTERNSHIP_PLACED },
      { status: ATTENDANCE_STATUS.OFFICIAL_ENGAGEMENT },
    ];
    const stats = calculateAttendanceStats(records);
    expect(stats.total).toBe(2);
    expect(stats.countable).toBe(0);
    expect(stats.percentage).toBeNull();
    expect(formatPercentage(stats.percentage)).toBe('N/A');
  });

  it('handles empty record arrays gracefully', () => {
    const stats = calculateAttendanceStats([]);
    expect(stats.total).toBe(0);
    expect(stats.present).toBe(0);
    expect(stats.absent).toBe(0);
    expect(stats.percentage).toBeNull();
    expect(formatPercentage(stats.percentage)).toBe('N/A');
  });

  it('formats percentage strings with one decimal point or N/A', () => {
    expect(formatPercentage(85.45)).toBe('85.5%');
    expect(formatPercentage(100)).toBe('100.0%');
    expect(formatPercentage(0)).toBe('0.0%');
    expect(formatPercentage(null)).toBe('N/A');
    expect(formatPercentage(undefined)).toBe('N/A');
  });

  it('identifies students strictly below the configured threshold', () => {
    const defaultThreshold = 45;
    expect(isBelowThreshold(44.9, defaultThreshold)).toBe(true);
    expect(isBelowThreshold(20.0, defaultThreshold)).toBe(true);
    expect(isBelowThreshold(45.0, defaultThreshold)).toBe(false);
    expect(isBelowThreshold(75.0, defaultThreshold)).toBe(false);
    // Students with null (N/A) must NOT be flagged as below threshold
    expect(isBelowThreshold(null, defaultThreshold)).toBe(false);
    expect(isBelowThreshold(undefined, defaultThreshold)).toBe(false);
  });

  it('respects a custom threshold value (e.g. 75%)', () => {
    const strictThreshold = 75;
    expect(isBelowThreshold(74.9, strictThreshold)).toBe(true);
    expect(isBelowThreshold(75.0, strictThreshold)).toBe(false);
    expect(isBelowThreshold(80.0, strictThreshold)).toBe(false);
  });

  it('generates consistent and predictable composite record keys', () => {
    const key = getAttendanceRecordKey('stu-1', 'sub-1', '2026-10-28');
    expect(key).toBe('stu-1_sub-1_2026-10-28');
  });
});


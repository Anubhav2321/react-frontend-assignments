import { describe, it, expect, vi } from 'vitest';
import {
  fetchStudents,
  createStudentThunk,
} from '../src/features/students/studentsSlice';
import {
  fetchAttendanceRecords,
  saveAttendanceSessionThunk,
} from '../src/features/attendance/attendanceSlice';
import { mockStudentApi } from '../src/api/mockStudentApi';
import { mockAttendanceApi } from '../src/api/mockAttendanceApi';

describe('Redux Toolkit Async Thunks', () => {
  it('dispatches fulfilled when fetchStudents succeeds', async () => {
    const mockStudents = [
      { id: '1', studentId: 'CS101', name: 'John Doe', department: 'CS', semester: 3, section: 'A' },
    ];
    vi.spyOn(mockStudentApi, 'fetchStudents').mockResolvedValueOnce(mockStudents);

    const dispatch = vi.fn();
    const thunk = fetchStudents();
    await thunk(dispatch, () => ({}), undefined);

    const calls = dispatch.mock.calls;
    expect(calls[0][0].type).toBe('students/fetchStudents/pending');
    expect(calls[1][0].type).toBe('students/fetchStudents/fulfilled');
    expect(calls[1][0].payload).toEqual(mockStudents);
  });

  it('dispatches rejected when fetchStudents fails', async () => {
    vi.spyOn(mockStudentApi, 'fetchStudents').mockRejectedValueOnce(
      new Error('Network error simulation')
    );

    const dispatch = vi.fn();
    const thunk = fetchStudents();
    await thunk(dispatch, () => ({}), undefined);

    const calls = dispatch.mock.calls;
    expect(calls[0][0].type).toBe('students/fetchStudents/pending');
    expect(calls[1][0].type).toBe('students/fetchStudents/rejected');
    expect(calls[1][0].payload).toBe('Network error simulation');
  });

  it('prevents creating duplicate student IDs in createStudentThunk', async () => {
    const existingState = {
      students: {
        entities: {
          s1: { id: 's1', studentId: 'CS2024001', name: 'Existing Student' },
        },
      },
    };

    const dispatch = vi.fn();
    const getState = () => existingState;
    const thunk = createStudentThunk({
      studentId: 'CS2024001',
      name: 'Duplicate Student',
      department: 'CS',
      email: 'dup@campus.edu',
    });

    await thunk(dispatch, getState, undefined);

    const calls = dispatch.mock.calls;
    expect(calls[1][0].type).toBe('students/createStudent/rejected');
    expect(calls[1][0].payload).toContain('is already registered');
  });

  it('dispatches fulfilled when saveAttendanceSessionThunk succeeds', async () => {
    const payload = {
      date: '2026-10-28',
      subjectId: 'sub-1',
      semester: 3,
      section: 'A',
      sessionRecords: [{ studentId: 's1', status: 'P' }],
    };

    const expectedSaved = [
      {
        id: 'att_s1_sub-1_2026-10-28',
        studentId: 's1',
        subjectId: 'sub-1',
        date: '2026-10-28',
        status: 'P',
      },
    ];

    vi.spyOn(mockAttendanceApi, 'saveAttendanceSession').mockResolvedValueOnce(expectedSaved);

    const dispatch = vi.fn();
    const thunk = saveAttendanceSessionThunk(payload);
    await thunk(dispatch, () => ({}), undefined);

    const calls = dispatch.mock.calls;
    expect(calls[0][0].type).toBe('attendance/saveAttendanceSession/pending');
    expect(calls[1][0].type).toBe('attendance/saveAttendanceSession/fulfilled');
    expect(calls[1][0].payload.savedRecords).toEqual(expectedSaved);
  });

  it('dispatches rejected when saveAttendanceSessionThunk fails validation', async () => {
    vi.spyOn(mockAttendanceApi, 'saveAttendanceSession').mockRejectedValueOnce(
      new Error('Invalid attendance date')
    );

    const dispatch = vi.fn();
    const thunk = saveAttendanceSessionThunk({
      date: 'invalid-date',
      subjectId: 'sub-1',
      sessionRecords: [],
    });
    await thunk(dispatch, () => ({}), undefined);

    const calls = dispatch.mock.calls;
    expect(calls[1][0].type).toBe('attendance/saveAttendanceSession/rejected');
    expect(calls[1][0].payload).toBe('Invalid attendance date');
  });
});


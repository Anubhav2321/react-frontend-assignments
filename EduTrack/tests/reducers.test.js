import { describe, it, expect } from 'vitest';
import studentsReducer, {
  studentAdded,
  studentUpdated,
  studentRemoved,
  studentDeactivated,
  studentActivated,
  studentsAdapter,
} from '../src/features/students/studentsSlice';
import attendanceReducer, {
  recordUpserted,
  sessionBatchUpserted,
} from '../src/features/attendance/attendanceSlice';
import filtersReducer, {
  setStudentSearchQuery,
  setStudentDepartmentFilter,
  setStudentSemesterFilter,
  setStudentSectionFilter,
  resetStudentFilters,
  setAttendanceDate,
  setReportFilter,
} from '../src/features/filters/filtersSlice';
import preferencesReducer, {
  setAttendanceThreshold,
} from '../src/features/preferences/preferencesSlice';
import subjectsReducer, {
  addSubject,
  updateSubject,
  deleteSubject,
} from '../src/features/subjects/subjectsSlice';

describe('Redux Toolkit Slices & Reducers', () => {
  describe('studentsSlice', () => {
    it('adds a student via studentAdded reducer', () => {
      const initialState = studentsAdapter.getInitialState({
        loading: false,
        error: null,
      });

      const newStudent = {
        id: 'stu-test-1',
        studentId: 'CS2026999',
        name: 'Test Student',
        department: 'Computer Science',
        semester: 3,
        section: 'A',
        email: 'test@campus.edu',
        status: 'active',
      };

      const state = studentsReducer(initialState, studentAdded(newStudent));
      expect(state.ids).toContain('stu-test-1');
      expect(state.entities['stu-test-1'].name).toBe('Test Student');
    });

    it('updates an existing student via studentUpdated reducer', () => {
      const initialStudent = {
        id: 'stu-test-1',
        studentId: 'CS2026999',
        name: 'Old Name',
        department: 'Computer Science',
      };
      const initialState = studentsAdapter.addOne(
        studentsAdapter.getInitialState(),
        initialStudent
      );

      const state = studentsReducer(
        initialState,
        studentUpdated({ id: 'stu-test-1', changes: { name: 'Updated Name' } })
      );
      expect(state.entities['stu-test-1'].name).toBe('Updated Name');
    });

    it('removes a student via studentRemoved reducer', () => {
      const initialStudent = {
        id: 'stu-test-1',
        studentId: 'CS2026999',
        name: 'Test Student',
      };
      const initialState = studentsAdapter.addOne(
        studentsAdapter.getInitialState(),
        initialStudent
      );

      const state = studentsReducer(initialState, studentRemoved('stu-test-1'));
      expect(state.ids).not.toContain('stu-test-1');
      expect(state.entities['stu-test-1']).toBeUndefined();
    });

    it('deactivates and activates a student', () => {
      const initialStudent = {
        id: 'stu-test-1',
        studentId: 'CS2026999',
        name: 'Test Student',
        status: 'active',
      };
      let state = studentsAdapter.addOne(
        studentsAdapter.getInitialState(),
        initialStudent
      );

      state = studentsReducer(state, studentDeactivated('stu-test-1'));
      expect(state.entities['stu-test-1'].status).toBe('inactive');

      state = studentsReducer(state, studentActivated('stu-test-1'));
      expect(state.entities['stu-test-1'].status).toBe('active');
    });
  });

  describe('attendanceSlice & Duplicate Prevention', () => {
    it('marks and updates attendance without creating duplicate records for the same student+subject+date', () => {
      const initialState = {
        records: [],
        loading: false,
        saving: false,
        error: null,
      };

      // Mark Present
      const state1 = attendanceReducer(
        initialState,
        recordUpserted({
          studentId: 'stu-1',
          subjectId: 'sub-1',
          date: '2026-10-28',
          semester: 3,
          section: 'A',
          status: 'P',
        })
      );

      expect(state1.records.length).toBe(1);
      expect(state1.records[0].status).toBe('P');

      // Update to Absent on the same student, subject, and date
      const state2 = attendanceReducer(
        state1,
        recordUpserted({
          studentId: 'stu-1',
          subjectId: 'sub-1',
          date: '2026-10-28',
          semester: 3,
          section: 'A',
          status: 'A',
        })
      );

      // Must NOT duplicate: still 1 record, but status updated to A
      expect(state2.records.length).toBe(1);
      expect(state2.records[0].status).toBe('A');
    });

    it('sessionBatchUpserted replaces duplicate records in bulk', () => {
      const initialState = {
        records: [
          {
            id: 'att_stu-1_sub-1_2026-10-28',
            studentId: 'stu-1',
            subjectId: 'sub-1',
            date: '2026-10-28',
            status: 'P',
          },
        ],
        loading: false,
      };

      const newBatch = [
        {
          id: 'att_stu-1_sub-1_2026-10-28',
          studentId: 'stu-1',
          subjectId: 'sub-1',
          date: '2026-10-28',
          status: 'PL',
        },
        {
          id: 'att_stu-2_sub-1_2026-10-28',
          studentId: 'stu-2',
          subjectId: 'sub-1',
          date: '2026-10-28',
          status: 'E',
        },
      ];

      const state = attendanceReducer(initialState, sessionBatchUpserted(newBatch));
      expect(state.records.length).toBe(2);
      const stu1Record = state.records.find((r) => r.studentId === 'stu-1');
      expect(stu1Record.status).toBe('PL');
    });
  });

  describe('filtersSlice', () => {
    it('updates student search query and filters', () => {
      const initialState = {
        students: {
          searchQuery: '',
          department: 'All',
          semester: 'All',
          section: 'All',
        },
      };

      let state = filtersReducer(initialState, setStudentSearchQuery('Sharma'));
      expect(state.students.searchQuery).toBe('Sharma');

      state = filtersReducer(state, setStudentDepartmentFilter('Computer Science'));
      expect(state.students.department).toBe('Computer Science');

      state = filtersReducer(state, setStudentSemesterFilter(4));
      expect(state.students.semester).toBe(4);

      state = filtersReducer(state, setStudentSectionFilter('B'));
      expect(state.students.section).toBe('B');

      state = filtersReducer(state, resetStudentFilters());
      expect(state.students.searchQuery).toBe('');
      expect(state.students.department).toBe('All');
    });
  });

  describe('preferencesSlice', () => {
    it('updates attendance threshold policy', () => {
      const initialState = { attendanceThreshold: 45 };
      const state = preferencesReducer(initialState, setAttendanceThreshold(75));
      expect(state.attendanceThreshold).toBe(75);
    });
  });

  describe('subjectsSlice', () => {
    it('adds, updates, and deletes a subject', () => {
      const initialState = { items: [] };

      // Add subject
      let state = subjectsReducer(
        initialState,
        addSubject({
          subjectCode: 'CS401',
          subjectName: 'Compiler Design',
          department: 'Computer Science',
          semester: 4,
        })
      );
      expect(state.items.length).toBe(1);
      expect(state.items[0].subjectCode).toBe('CS401');

      // Update subject
      const subjectId = state.items[0].id;
      state = subjectsReducer(
        state,
        updateSubject({
          id: subjectId,
          subjectCode: 'CS401',
          subjectName: 'Advanced Compiler Design',
        })
      );
      expect(state.items[0].subjectName).toBe('Advanced Compiler Design');

      // Delete subject
      state = subjectsReducer(state, deleteSubject(subjectId));
      expect(state.items.length).toBe(0);
    });
  });
});


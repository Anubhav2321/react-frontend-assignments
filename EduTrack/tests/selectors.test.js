import { describe, it, expect } from 'vitest';
import {
  selectFilteredStudents,
  selectEligibleSessionStudents,
} from '../src/selectors/studentSelectors';
import {
  selectStudentAttendanceStatsMap,
  selectLowAttendanceStudents,
  selectActiveSessionRecordMap,
  selectActiveSessionStats,
} from '../src/selectors/attendanceSelectors';
import {
  selectFilteredReportRecords,
  selectReportSummaryStats,
} from '../src/selectors/reportSelectors';
import {
  selectDashboardMetrics,
  selectStatusDistributionData,
  selectSubjectAttendanceData,
} from '../src/selectors/dashboardSelectors';

describe('Redux Memoized Selectors', () => {
  const sampleStudents = [
    {
      id: 's1',
      studentId: 'CS2024001',
      name: 'Aarav Sharma',
      department: 'Computer Science',
      semester: 3,
      section: 'A',
      subjectIds: ['sub-cs-301'],
      status: 'active',
    },
    {
      id: 's2',
      studentId: 'CS2024002',
      name: 'Diya Patel',
      department: 'Computer Science',
      semester: 3,
      section: 'A',
      subjectIds: ['sub-cs-301'],
      status: 'active',
    },
    {
      id: 's3',
      studentId: 'IT2024001',
      name: 'Karan Kapoor',
      department: 'Information Technology',
      semester: 3,
      section: 'B',
      subjectIds: ['sub-it-301'],
      status: 'active',
    },
  ];

  const sampleSubjects = [
    {
      id: 'sub-cs-301',
      subjectCode: 'CS301',
      subjectName: 'Data Structures',
      department: 'Computer Science',
    },
    {
      id: 'sub-it-301',
      subjectCode: 'IT301',
      subjectName: 'Web Technologies',
      department: 'Information Technology',
    },
  ];

  const sampleAttendance = [
    // s1: 3 P, 1 A => 75%
    { id: 'a1', studentId: 's1', subjectId: 'sub-cs-301', date: '2026-10-21', status: 'P', semester: 3, section: 'A' },
    { id: 'a2', studentId: 's1', subjectId: 'sub-cs-301', date: '2026-10-22', status: 'P', semester: 3, section: 'A' },
    { id: 'a3', studentId: 's1', subjectId: 'sub-cs-301', date: '2026-10-23', status: 'P', semester: 3, section: 'A' },
    { id: 'a4', studentId: 's1', subjectId: 'sub-cs-301', date: '2026-10-24', status: 'A', semester: 3, section: 'A' },

    // s2: 1 P, 4 A => 20% (LOW ATTENDANCE)
    { id: 'a5', studentId: 's2', subjectId: 'sub-cs-301', date: '2026-10-21', status: 'A', semester: 3, section: 'A' },
    { id: 'a6', studentId: 's2', subjectId: 'sub-cs-301', date: '2026-10-22', status: 'A', semester: 3, section: 'A' },
    { id: 'a7', studentId: 's2', subjectId: 'sub-cs-301', date: '2026-10-23', status: 'A', semester: 3, section: 'A' },
    { id: 'a8', studentId: 's2', subjectId: 'sub-cs-301', date: '2026-10-24', status: 'A', semester: 3, section: 'A' },
    { id: 'a9', studentId: 's2', subjectId: 'sub-cs-301', date: '2026-10-25', status: 'P', semester: 3, section: 'A' },
  ];

  const sampleState = {
    students: {
      ids: ['s1', 's2', 's3'],
      entities: {
        s1: sampleStudents[0],
        s2: sampleStudents[1],
        s3: sampleStudents[2],
      },
    },
    subjects: {
      items: sampleSubjects,
    },
    attendance: {
      records: sampleAttendance,
    },
    filters: {
      students: {
        searchQuery: '',
        department: 'All',
        semester: 'All',
        section: 'All',
        status: 'All',
      },
      attendanceSession: {
        date: '2026-10-21',
        subjectId: 'sub-cs-301',
        semester: 3,
        section: 'A',
      },
      reports: {
        mode: 'daily',
        selectedDate: '2026-10-21',
        selectedMonth: '2026-10',
        studentId: 'All',
        subjectId: 'All',
        department: 'All',
        semester: 'All',
        section: 'All',
      },
    },
    preferences: {
      attendanceThreshold: 45,
    },
  };

  it('filters students by search query and department', () => {
    // Search Aarav
    const stateSearch = {
      ...sampleState,
      filters: {
        ...sampleState.filters,
        students: { ...sampleState.filters.students, searchQuery: 'aarav' },
      },
    };
    const searchResult = selectFilteredStudents(stateSearch);
    expect(searchResult.length).toBe(1);
    expect(searchResult[0].name).toBe('Aarav Sharma');

    // Department filter IT
    const stateDept = {
      ...sampleState,
      filters: {
        ...sampleState.filters,
        students: { ...sampleState.filters.students, department: 'Information Technology' },
      },
    };
    const deptResult = selectFilteredStudents(stateDept);
    expect(deptResult.length).toBe(1);
    expect(deptResult[0].studentId).toBe('IT2024001');
  });

  it('selects eligible students for attendance session matching semester and section', () => {
    const eligible = selectEligibleSessionStudents(sampleState);
    expect(eligible.length).toBe(2);
    expect(eligible.map((s) => s.id)).toEqual(['s1', 's2']);
  });

  it('calculates individual student attendance stats accurately', () => {
    const statsMap = selectStudentAttendanceStatsMap(sampleState);
    const s1Stats = statsMap.get('s1');
    const s2Stats = statsMap.get('s2');

    expect(s1Stats.percentage).toBe(75.0);
    expect(s1Stats.isLow).toBe(false);

    expect(s2Stats.percentage).toBe(20.0);
    expect(s2Stats.isLow).toBe(true);
  });

  it('identifies students below attendance threshold', () => {
    const lowStudents = selectLowAttendanceStudents(sampleState);
    expect(lowStudents.length).toBe(1);
    expect(lowStudents[0].student.id).toBe('s2');
  });

  it('computes dashboard metrics and status distribution from live records', () => {
    const metrics = selectDashboardMetrics(sampleState);
    expect(metrics.totalStudents).toBe(3);
    expect(metrics.totalSessionsRecorded).toBe(9);
    expect(metrics.presentCount).toBe(4);
    expect(metrics.absentCount).toBe(5);
    expect(metrics.lowAttendanceCount).toBe(1);

    const dist = selectStatusDistributionData(sampleState);
    const pEntry = dist.find((d) => d.code === 'P');
    const aEntry = dist.find((d) => d.code === 'A');
    expect(pEntry.value).toBe(4);
    expect(aEntry.value).toBe(5);
  });

  it('filters report records correctly in daily mode', () => {
    const reportRecords = selectFilteredReportRecords(sampleState);
    expect(reportRecords.length).toBe(2);
    expect(reportRecords[0].date).toBe('2026-10-21');
  });
});


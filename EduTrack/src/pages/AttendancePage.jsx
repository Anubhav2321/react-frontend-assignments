import React, { useState, useEffect } from 'react';
import {
  Calendar,
  BookOpen,
  CheckCheck,
  RotateCcw,
  Save,
  AlertCircle,
  CheckCircle2,
  Users,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  setAttendanceDate,
  setAttendanceSubjectId,
  setAttendanceSemester,
  setAttendanceSection,
  selectAttendanceSessionFilters,
} from '../features/filters/filtersSlice';
import { selectAllSubjects } from '../../src/features/subjects/subjectsSlice';
import { selectEligibleSessionStudents } from '../selectors/studentSelectors';
import {
  selectActiveSessionRecordMap,
  selectActiveSessionStats,
} from '../selectors/attendanceSelectors';
import {
  saveAttendanceSessionThunk,
  clearAttendanceMessage,
  selectAttendanceSaving,
  selectAttendanceSuccess,
  selectAttendanceError,
} from '../features/attendance/attendanceSlice';
import { ATTENDANCE_STATUS, STATUS_CONFIG } from '../utils/attendanceCalculations';
import ToastNotification from '../components/common/ToastNotification';
import ConfirmationDialog from '../components/common/ConfirmationDialog';
import EmptyState from '../components/common/EmptyState';
import { SEMESTERS, SECTIONS } from '../data/seedData';

// Helper to extract initials
const getInitials = (name = '') => {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase() || 'ST';
};

export const AttendancePage = () => {
  const dispatch = useAppDispatch();
  const sessionFilters = useAppSelector(selectAttendanceSessionFilters);
  const subjects = useAppSelector(selectAllSubjects);
  const eligibleStudents = useAppSelector(selectEligibleSessionStudents);
  const existingRecordMap = useAppSelector(selectActiveSessionRecordMap);
  const sessionStats = useAppSelector(selectActiveSessionStats);

  const isSaving = useAppSelector(selectAttendanceSaving);
  const successMessage = useAppSelector(selectAttendanceSuccess);
  const errorMessage = useAppSelector(selectAttendanceError);

  // Local draft state for attendance session marks
  // studentId -> status ('P', 'A', 'PL', 'E')
  const [draftMarks, setDraftMarks] = useState({});
  const [markAllConfirmOpen, setMarkAllConfirmOpen] = useState(false);

  // Sync draft marks whenever session filters change or existing records are loaded
  useEffect(() => {
    const marks = {};
    for (const student of eligibleStudents) {
      const record = existingRecordMap.get(student.id);
      if (record && record.status) {
        marks[student.id] = record.status;
      }
    }
    setDraftMarks(marks);
  }, [
    sessionFilters.date,
    sessionFilters.subjectId,
    sessionFilters.semester,
    sessionFilters.section,
    existingRecordMap,
    eligibleStudents,
  ]);

  const selectedSubject = subjects.find((s) => s.id === sessionFilters.subjectId);

  const handleStatusSelect = (studentId, status) => {
    setDraftMarks((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleMarkAllPresent = () => {
    const newMarks = { ...draftMarks };
    for (const student of eligibleStudents) {
      newMarks[student.id] = ATTENDANCE_STATUS.PRESENT;
    }
    setDraftMarks(newMarks);
    setMarkAllConfirmOpen(false);
  };

  const handleSaveAttendance = async () => {
    const sessionRecords = Object.entries(draftMarks).map(([studentId, status]) => ({
      studentId,
      status,
    }));

    if (sessionRecords.length === 0) {
      return;
    }

    await dispatch(
      saveAttendanceSessionThunk({
        date: sessionFilters.date,
        subjectId: sessionFilters.subjectId,
        semester: sessionFilters.semester,
        section: sessionFilters.section,
        sessionRecords,
      })
    );
  };

  // Calculate live draft statistics
  let draftPresent = 0;
  let draftAbsent = 0;
  let draftPL = 0;
  let draftE = 0;
  let draftUnmarked = 0;

  for (const student of eligibleStudents) {
    const mark = draftMarks[student.id];
    if (mark === 'P') draftPresent++;
    else if (mark === 'A') draftAbsent++;
    else if (mark === 'PL') draftPL++;
    else if (mark === 'E') draftE++;
    else draftUnmarked++;
  }

  const markedCount = draftPresent + draftAbsent + draftPL + draftE;
  const completionPct = eligibleStudents.length > 0
    ? Math.round((markedCount / eligibleStudents.length) * 100)
    : 0;

  const draftCountable = draftPresent + draftAbsent;
  const draftPercentage = draftCountable > 0 ? ((draftPresent / draftCountable) * 100).toFixed(1) : 'N/A';

  return (
    <div>
      {/* Page Title & Save Action */}
      <div className="page-header-row">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--slate-900)' }}>
              Class Attendance Tracker
            </h2>
            {selectedSubject && (
              <span className="badge badge-neutral" style={{ fontSize: '0.75rem', fontWeight: 700 }}>
                {selectedSubject.subjectCode} • Sem {sessionFilters.semester}-{sessionFilters.section}
              </span>
            )}
          </div>
          <p className="page-subtitle">
            Record, verify, and persist daily student lecture participation with instant calculations.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setMarkAllConfirmOpen(true)}
            disabled={eligibleStudents.length === 0 || isSaving}
            id="btn-mark-all-present"
          >
            <CheckCheck size={16} color="var(--primary-600)" />
            <span>Mark All Present</span>
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSaveAttendance}
            disabled={eligibleStudents.length === 0 || isSaving || Object.keys(draftMarks).length === 0}
            id="btn-save-attendance"
          >
            <Save size={16} />
            <span>{isSaving ? 'Persisting Records...' : 'Save Attendance Session'}</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {successMessage && (
        <ToastNotification
          type="success"
          message={successMessage}
          onClose={() => dispatch(clearAttendanceMessage())}
        />
      )}
      {errorMessage && (
        <ToastNotification
          type="error"
          message={errorMessage}
          onClose={() => dispatch(clearAttendanceMessage())}
        />
      )}

      {/* Session Filter Bar */}
      <div className="filter-bar" style={{ backgroundColor: '#ffffff', border: '1px solid var(--slate-200)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', minWidth: '160px' }}>
          <label style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--slate-500)', letterSpacing: '0.04em' }}>
            Lecture Date
          </label>
          <input
            type="date"
            className="date-input"
            value={sessionFilters.date}
            onChange={(e) => dispatch(setAttendanceDate(e.target.value))}
            id="attendance-date-picker"
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1, minWidth: '240px' }}>
          <label style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--slate-500)', letterSpacing: '0.04em' }}>
            Academic Course Offering
          </label>
          <select
            className="select-control"
            value={sessionFilters.subjectId}
            onChange={(e) => dispatch(setAttendanceSubjectId(e.target.value))}
            id="attendance-subject-select"
          >
            {subjects.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.subjectCode} — {sub.subjectName} ({sub.department})
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', minWidth: '130px' }}>
          <label style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--slate-500)', letterSpacing: '0.04em' }}>
            Semester
          </label>
          <select
            className="select-control"
            value={sessionFilters.semester}
            onChange={(e) => dispatch(setAttendanceSemester(Number(e.target.value)))}
          >
            {SEMESTERS.map((sem) => (
              <option key={sem} value={sem}>
                Semester {sem}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', minWidth: '110px' }}>
          <label style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--slate-500)', letterSpacing: '0.04em' }}>
            Section
          </label>
          <select
            className="select-control"
            value={sessionFilters.section}
            onChange={(e) => dispatch(setAttendanceSection(e.target.value))}
          >
            {SECTIONS.map((sec) => (
              <option key={sec} value={sec}>
                Section {sec}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Progress & Session Completion Bar */}
      {eligibleStudents.length > 0 && (
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid rgba(226, 232, 240, 0.9)',
            borderRadius: 'var(--radius-lg)',
            padding: '0.85rem 1.25rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: 'var(--shadow-sm)',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Sparkles size={16} color="var(--primary-600)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--slate-700)' }}>
              Roster Completion: {markedCount} of {eligibleStudents.length} students marked ({completionPct}%)
            </span>
          </div>

          <div style={{ width: '220px', height: '8px', backgroundColor: 'var(--slate-200)', borderRadius: '9999px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${completionPct}%`,
                height: '100%',
                background: completionPct === 100
                  ? 'linear-gradient(90deg, #10b981, #059669)'
                  : 'linear-gradient(90deg, #6366f1, #4f46e5)',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>
      )}

      {/* Live Session Metrics Summary Ribbon */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '0.75rem',
          marginBottom: '1.25rem',
        }}
      >
        <div style={{ backgroundColor: '#fff', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid var(--slate-200)', borderTop: '3px solid var(--slate-400)' }}>
          <span style={{ fontSize: '0.68rem', color: 'var(--slate-500)', fontWeight: 700, textTransform: 'uppercase' }}>Eligible</span>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--slate-900)' }}>{eligibleStudents.length}</div>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid var(--status-p-border)', borderTop: '3px solid var(--status-p-solid)' }}>
          <span style={{ fontSize: '0.68rem', color: 'var(--status-p-text)', fontWeight: 700, textTransform: 'uppercase' }}>Present (P)</span>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--status-p-text)' }}>{draftPresent}</div>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid var(--status-a-border)', borderTop: '3px solid var(--status-a-solid)' }}>
          <span style={{ fontSize: '0.68rem', color: 'var(--status-a-text)', fontWeight: 700, textTransform: 'uppercase' }}>Absent (A)</span>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--status-a-text)' }}>{draftAbsent}</div>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid var(--status-pl-border)', borderTop: '3px solid var(--status-pl-solid)' }}>
          <span style={{ fontSize: '0.68rem', color: 'var(--status-pl-text)', fontWeight: 700, textTransform: 'uppercase' }}>Placement (PL)</span>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--status-pl-text)' }}>{draftPL}</div>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid var(--status-e-border)', borderTop: '3px solid var(--status-e-solid)' }}>
          <span style={{ fontSize: '0.68rem', color: 'var(--status-e-text)', fontWeight: 700, textTransform: 'uppercase' }}>Official Eng (E)</span>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--status-e-text)' }}>{draftE}</div>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid var(--slate-200)', borderTop: '3px solid #d97706' }}>
          <span style={{ fontSize: '0.68rem', color: 'var(--slate-500)', fontWeight: 700, textTransform: 'uppercase' }}>Unmarked</span>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: draftUnmarked > 0 ? '#d97706' : 'var(--slate-400)' }}>
            {draftUnmarked}
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid var(--primary-200)', borderTop: '3px solid var(--primary-600)' }}>
          <span style={{ fontSize: '0.68rem', color: 'var(--primary-700)', fontWeight: 700, textTransform: 'uppercase' }}>Session %</span>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary-700)' }}>
            {draftPercentage !== 'N/A' ? `${draftPercentage}%` : 'N/A'}
          </div>
        </div>
      </div>

      {/* Attendance Marking Table */}
      <div className="table-card">
        {eligibleStudents.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No eligible students found for this class session"
            description={`No active students are registered for Semester ${sessionFilters.semester}, Section ${sessionFilters.section} in the selected course.`}
          />
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: '70px' }}>#</th>
                  <th>Student</th>
                  <th>Student ID</th>
                  <th>Department</th>
                  <th>Recorded Status</th>
                  <th style={{ textAlign: 'center', width: '290px' }}>Mark Participation</th>
                </tr>
              </thead>
              <tbody>
                {eligibleStudents.map((student, index) => {
                  const currentStatus = draftMarks[student.id];
                  const initials = getInitials(student.name);

                  return (
                    <tr key={student.id}>
                      <td style={{ color: 'var(--slate-400)', fontWeight: 600 }}>{index + 1}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                          <div className="student-avatar" style={{ width: '30px', height: '30px', fontSize: '0.72rem' }}>
                            {initials}
                          </div>
                          <span style={{ fontWeight: 700, color: 'var(--slate-900)' }}>
                            {student.name}
                          </span>
                        </div>
                      </td>
                      <td style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                        <span style={{ backgroundColor: 'var(--slate-100)', padding: '0.15rem 0.45rem', borderRadius: '4px', border: '1px solid var(--slate-200)', fontSize: '0.8rem' }}>
                          {student.studentId}
                        </span>
                      </td>
                      <td>{student.department}</td>
                      <td>
                        {currentStatus ? (
                          <span
                            className={`badge ${STATUS_CONFIG[currentStatus]?.badgeClass}`}
                          >
                            <span className="status-dot" />
                            <strong>{currentStatus}</strong> • {STATUS_CONFIG[currentStatus]?.label}
                          </span>
                        ) : (
                          <span className="badge badge-neutral" style={{ color: 'var(--slate-400)' }}>
                            <span className="status-dot" style={{ backgroundColor: 'var(--slate-300)' }} />
                            Unmarked
                          </span>
                        )}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <div className="status-pill-group" style={{ justifyContent: 'center' }}>
                          <button
                            type="button"
                            className={`status-pill-btn ${currentStatus === 'P' ? 'active-p' : ''}`}
                            onClick={() => handleStatusSelect(student.id, ATTENDANCE_STATUS.PRESENT)}
                            title="Present (Credit earned)"
                            id={`status-p-${student.id}`}
                          >
                            P
                          </button>
                          <button
                            type="button"
                            className={`status-pill-btn ${currentStatus === 'A' ? 'active-a' : ''}`}
                            onClick={() => handleStatusSelect(student.id, ATTENDANCE_STATUS.ABSENT)}
                            title="Absent (Unexcused)"
                            id={`status-a-${student.id}`}
                          >
                            A
                          </button>
                          <button
                            type="button"
                            className={`status-pill-btn ${currentStatus === 'PL' ? 'active-pl' : ''}`}
                            onClick={() => handleStatusSelect(student.id, ATTENDANCE_STATUS.INTERNSHIP_PLACED)}
                            title="Internship Placed (Excluded from denominator)"
                            id={`status-pl-${student.id}`}
                          >
                            PL
                          </button>
                          <button
                            type="button"
                            className={`status-pill-btn ${currentStatus === 'E' ? 'active-e' : ''}`}
                            onClick={() => handleStatusSelect(student.id, ATTENDANCE_STATUS.OFFICIAL_ENGAGEMENT)}
                            title="Official Engagement (Excluded from denominator)"
                            id={`status-e-${student.id}`}
                          >
                            E
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirmation Dialog for Mark All Present */}
      <ConfirmationDialog
        isOpen={markAllConfirmOpen}
        title="Mark All Students Present"
        message={`This will set all ${eligibleStudents.length} registered students for ${selectedSubject?.subjectCode || 'this session'} to 'Present (P)'. You can still adjust individual students before saving.`}
        confirmLabel="Mark All Present"
        onConfirm={handleMarkAllPresent}
        onCancel={() => setMarkAllConfirmOpen(false)}
      />
    </div>
  );
};

export default AttendancePage;

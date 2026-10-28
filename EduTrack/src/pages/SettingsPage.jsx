import React, { useState } from 'react';
import {
  Sliders,
  RotateCcw,
  Database,
  Info,
  ShieldCheck,
  CheckCircle2,
  HardDrive,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  setAttendanceThreshold,
  selectAttendanceThreshold,
  resetPreferences,
} from '../features/preferences/preferencesSlice';
import { resetStudents, selectTotalStudentsCount } from '../features/students/studentsSlice';
import { resetSubjects, selectAllSubjects } from '../features/subjects/subjectsSlice';
import { resetAttendance, selectAllAttendanceRecords } from '../features/attendance/attendanceSlice';
import { clearPersistedState } from '../utils/storage';
import ConfirmationDialog from '../components/common/ConfirmationDialog';
import ToastNotification from '../components/common/ToastNotification';

export const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const currentThreshold = useAppSelector(selectAttendanceThreshold);
  const totalStudents = useAppSelector(selectTotalStudentsCount);
  const allSubjects = useAppSelector(selectAllSubjects);
  const allAttendance = useAppSelector(selectAllAttendanceRecords);

  const [thresholdInput, setThresholdInput] = useState(currentThreshold);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleSaveThreshold = (e) => {
    e.preventDefault();
    const val = Number(thresholdInput);
    if (isNaN(val) || val < 0 || val > 100) {
      setNotification({
        type: 'error',
        message: 'Threshold must be a valid number between 0% and 100%.',
      });
      return;
    }
    dispatch(setAttendanceThreshold(val));
    setNotification({
      type: 'success',
      message: `Minimum attendance threshold updated to ${Math.round(val)}%.`,
    });
  };

  const handleConfirmResetData = () => {
    clearPersistedState();
    dispatch(resetStudents());
    dispatch(resetSubjects());
    dispatch(resetAttendance());
    dispatch(resetPreferences());
    setThresholdInput(45);
    setResetConfirmOpen(false);
    setNotification({
      type: 'success',
      message: 'All application data has been safely reset to the default pristine demo seed dataset.',
    });
  };

  // Estimate localStorage usage
  let storageSizeKb = '0';
  try {
    const raw = localStorage.getItem('attendease_state_v1');
    if (raw) {
      storageSizeKb = (new Blob([raw]).size / 1024).toFixed(2);
    }
  } catch (e) {
    // ignore
  }

  return (
    <div style={{ maxWidth: '960px' }}>
      <div className="page-header-row">
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            System Settings & Academic Thresholds
          </h2>
          <p className="page-subtitle">
            Configure institutional compliance policies, threshold warnings, and manage browser demo storage.
          </p>
        </div>
      </div>

      {notification && (
        <ToastNotification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Threshold Configuration Card */}
      <div className="table-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
          <Sliders size={20} color="var(--primary-600)" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--slate-900)' }}>
            Attendance Compliance Threshold
          </h3>
        </div>

        <p style={{ fontSize: '0.88rem', color: 'var(--slate-600)', marginBottom: '1.25rem', lineHeight: '1.6' }}>
          Students with an individual attendance percentage strictly below this value will be flagged with
          a warning badge on the dashboard, student directory, and reports.
          The default standard academic threshold is <strong>45%</strong>.
        </p>

        <form onSubmit={handleSaveThreshold} style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="number"
              min={0}
              max={100}
              value={thresholdInput}
              onChange={(e) => setThresholdInput(e.target.value)}
              className="input-text"
              style={{ width: '100px', fontWeight: 700, textAlign: 'center' }}
              id="input-threshold"
            />
            <span style={{ fontWeight: 700, color: 'var(--slate-700)' }}>%</span>
          </div>

          <input
            type="range"
            min={0}
            max={100}
            value={thresholdInput}
            onChange={(e) => setThresholdInput(e.target.value)}
            style={{ width: '180px', accentColor: 'var(--primary-600)' }}
          />

          <button type="submit" className="btn btn-primary" id="btn-save-threshold">
            Save Threshold Policy
          </button>
        </form>
      </div>

      {/* Local Storage & Architecture Info Card */}
      <div className="table-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
          <Database size={20} color="var(--primary-600)" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--slate-900)' }}>
            Client-Side Browser Storage Diagnostic
          </h3>
        </div>

        <div
          style={{
            backgroundColor: '#f8fafc',
            border: '1px solid var(--slate-200)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            marginBottom: '1.25rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
          }}
        >
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)', textTransform: 'uppercase', fontWeight: 700 }}>
              Stored Students
            </span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--slate-900)' }}>
              {totalStudents} records
            </div>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)', textTransform: 'uppercase', fontWeight: 700 }}>
              Stored Courses
            </span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--slate-900)' }}>
              {allSubjects.length} subjects
            </div>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)', textTransform: 'uppercase', fontWeight: 700 }}>
              Stored Attendance
            </span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--slate-900)' }}>
              {allAttendance.length} entries
            </div>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)', textTransform: 'uppercase', fontWeight: 700 }}>
              Estimated Storage
            </span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--slate-900)' }}>
              ~{storageSizeKb} KB
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
            backgroundColor: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem 1rem',
            fontSize: '0.85rem',
            color: '#1e40af',
            lineHeight: '1.5',
          }}
        >
          <Info size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong>Frontend-Only Architecture Notice:</strong> This academic system runs entirely inside
            your web browser. State is retained across browser refreshes via encrypted JSON serialization
            in HTML5 <code>localStorage</code>. There is no remote backend server or centralized database.
          </div>
        </div>
      </div>

      {/* Reset Demo Data Card */}
      <div className="table-card" style={{ padding: '1.5rem', borderColor: '#fecaca' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
          <RotateCcw size={20} color="#dc2626" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--slate-900)' }}>
            Reset Demonstration Dataset
          </h3>
        </div>

        <p style={{ fontSize: '0.88rem', color: 'var(--slate-600)', marginBottom: '1.25rem', lineHeight: '1.6' }}>
          Reverts all students, courses, attendance sessions, and settings back to the clean initial seed data.
          Any custom students or attendance entries created during this session will be replaced with standard sample data.
        </p>

        <button
          type="button"
          className="btn btn-danger"
          onClick={() => setResetConfirmOpen(true)}
          id="btn-reset-demo-data"
        >
          <RotateCcw size={16} />
          <span>Reset All Demo Data</span>
        </button>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={resetConfirmOpen}
        title="Reset Demo Dataset?"
        message="This will restore the original student roster, standard subjects, multi-date attendance history, and default 45% threshold. Are you sure you wish to proceed?"
        confirmLabel="Yes, Reset Everything"
        isDestructive={true}
        onConfirm={handleConfirmResetData}
        onCancel={() => setResetConfirmOpen(false)}
      />
    </div>
  );
};

export default SettingsPage;


import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import DashboardPage from './pages/DashboardPage';
import StudentsPage from './pages/StudentsPage';
import AttendancePage from './pages/AttendancePage';
import SubjectsPage from './pages/SubjectsPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import { useAppDispatch } from './app/hooks';
import { fetchStudents } from './features/students/studentsSlice';
import { fetchAttendanceRecords } from './features/attendance/attendanceSlice';

export const App = () => {
  const dispatch = useAppDispatch();

  // Load initial asynchronous data on app startup
  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchAttendanceRecords());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="students" element={<StudentsPage />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="subjects" element={<SubjectsPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default App;


import React, { useState } from 'react';
import {
  UserPlus,
  Search,
  FilterX,
  Edit2,
  Trash2,
  AlertTriangle,
  UserCheck,
  UserX,
  Mail,
  GraduationCap,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  setStudentSearchQuery,
  setStudentDepartmentFilter,
  setStudentSemesterFilter,
  setStudentSectionFilter,
  setStudentStatusFilter,
  resetStudentFilters,
  selectStudentFilters,
} from '../features/filters/filtersSlice';
import {
  selectFilteredStudents,
} from '../selectors/studentSelectors';
import {
  selectStudentAttendanceStatsMap,
} from '../selectors/attendanceSelectors';
import {
  deleteStudentThunk,
  studentDeactivated,
  studentActivated,
  clearStudentStatusMessage,
} from '../features/students/studentsSlice';
import StudentFormModal from '../components/students/StudentFormModal';
import ConfirmationDialog from '../components/common/ConfirmationDialog';
import ToastNotification from '../components/common/ToastNotification';
import Pagination from '../components/common/Pagination';
import EmptyState from '../components/common/EmptyState';
import { DEPARTMENTS, SEMESTERS, SECTIONS } from '../data/seedData';
import { formatPercentage } from '../utils/attendanceCalculations';

// Helper to extract initials
const getInitials = (name = '') => {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase() || 'ST';
};

// Department color map for avatars
const DEPT_GRADIENTS = {
  'Computer Science': 'linear-gradient(135deg, #4f46e5, #3730a3)',
  'Information Technology': 'linear-gradient(135deg, #0284c7, #0369a1)',
  'Electronics & Comm': 'linear-gradient(135deg, #7c3aed, #5b21b6)',
  'Mechanical Engineering': 'linear-gradient(135deg, #d97706, #b45309)',
};

export const StudentsPage = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectStudentFilters);
  const students = useAppSelector(selectFilteredStudents);
  const statsMap = useAppSelector(selectStudentAttendanceStatsMap);
  const statusMessage = useAppSelector((state) => state.students.statusMessage);
  const errorMessage = useAppSelector((state) => state.students.error);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [deleteConfirmStudent, setDeleteConfirmStudent] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const totalPages = Math.ceil(students.length / pageSize);
  const paginatedStudents = students.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleOpenAddModal = () => {
    setStudentToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (student) => {
    setStudentToEdit(student);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirmStudent) return;
    setIsDeleting(true);
    try {
      await dispatch(deleteStudentThunk(deleteConfirmStudent.id));
      setDeleteConfirmStudent(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleActive = (student) => {
    if (student.status === 'inactive') {
      dispatch(studentActivated(student.id));
    } else {
      dispatch(studentDeactivated(student.id));
    }
  };

  return (
    <div>
      {/* Page Title & Add Button */}
      <div className="page-header-row">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--slate-900)' }}>
              Student Directory
            </h2>
            <span
              className="badge badge-neutral"
              style={{ fontWeight: 700, fontSize: '0.75rem' }}
            >
              {students.length} Enrolled
            </span>
          </div>
          <p className="page-subtitle">
            Manage institutional student profiles, academic sections, and real-time individual attendance records.
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={handleOpenAddModal}
          id="btn-add-student"
        >
          <UserPlus size={18} />
          <span>Register New Student</span>
        </button>
      </div>

      {/* Notifications */}
      {statusMessage && (
        <ToastNotification
          type="success"
          message={statusMessage}
          onClose={() => dispatch(clearStudentStatusMessage())}
        />
      )}
      {errorMessage && (
        <ToastNotification
          type="error"
          message={errorMessage}
          onClose={() => dispatch(clearStudentStatusMessage())}
        />
      )}

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        <div className="search-input-wrapper">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="input-text"
            placeholder="Search by student ID, roll number, or name..."
            value={filters.searchQuery}
            onChange={(e) => {
              dispatch(setStudentSearchQuery(e.target.value));
              setCurrentPage(1);
            }}
          />
        </div>

        <select
          className="select-control"
          style={{ width: 'auto', minWidth: '170px' }}
          value={filters.department}
          onChange={(e) => {
            dispatch(setStudentDepartmentFilter(e.target.value));
            setCurrentPage(1);
          }}
        >
          <option value="All">All Departments</option>
          {DEPARTMENTS.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <select
          className="select-control"
          style={{ width: 'auto', minWidth: '135px' }}
          value={filters.semester}
          onChange={(e) => {
            dispatch(setStudentSemesterFilter(e.target.value));
            setCurrentPage(1);
          }}
        >
          <option value="All">All Semesters</option>
          {SEMESTERS.map((sem) => (
            <option key={sem} value={sem}>
              Semester {sem}
            </option>
          ))}
        </select>

        <select
          className="select-control"
          style={{ width: 'auto', minWidth: '125px' }}
          value={filters.section}
          onChange={(e) => {
            dispatch(setStudentSectionFilter(e.target.value));
            setCurrentPage(1);
          }}
        >
          <option value="All">All Sections</option>
          {SECTIONS.map((sec) => (
            <option key={sec} value={sec}>
              Section {sec}
            </option>
          ))}
        </select>

        <select
          className="select-control"
          style={{ width: 'auto', minWidth: '125px' }}
          value={filters.status}
          onChange={(e) => {
            dispatch(setStudentStatusFilter(e.target.value));
            setCurrentPage(1);
          }}
        >
          <option value="All">All Statuses</option>
          <option value="active">Active Only</option>
          <option value="inactive">Inactive Only</option>
        </select>

        <button
          className="btn btn-secondary btn-sm"
          onClick={() => {
            dispatch(resetStudentFilters());
            setCurrentPage(1);
          }}
          title="Reset all filters"
        >
          <FilterX size={15} />
          <span>Reset</span>
        </button>
      </div>

      {/* Students Data Table */}
      <div className="table-card">
        {students.length === 0 ? (
          <EmptyState
            title="No students match the selected filters"
            description="Try clearing search queries or selecting 'All' for department and semester filters."
            action={
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => dispatch(resetStudentFilters())}
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
                    <th>Student</th>
                    <th>Student ID</th>
                    <th>Department</th>
                    <th>Cohort</th>
                    <th>Email Contact</th>
                    <th>Attendance Standing</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedStudents.map((student) => {
                    const stats = statsMap.get(student.id) || {};
                    const isLow = stats.isLow;
                    const isInactive = student.status === 'inactive';
                    const initials = getInitials(student.name);
                    const bgGrad = DEPT_GRADIENTS[student.department] || DEPT_GRADIENTS['Computer Science'];

                    return (
                      <tr
                        key={student.id}
                        style={{
                          opacity: isInactive ? 0.6 : 1,
                          backgroundColor: isInactive ? 'var(--slate-50)' : 'transparent',
                        }}
                      >
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div
                              className="student-avatar"
                              style={{ background: bgGrad }}
                              title={student.department}
                            >
                              {initials}
                            </div>
                            <div>
                              <div style={{ fontWeight: 700, color: 'var(--slate-900)' }}>
                                {student.name}
                              </div>
                              <div style={{ fontSize: '0.72rem', color: 'var(--slate-400)' }}>
                                Registered Student
                              </div>
                            </div>
                          </div>
                        </td>
                        <td style={{ fontWeight: 700, color: 'var(--slate-800)' }}>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              backgroundColor: 'var(--slate-100)',
                              padding: '0.2rem 0.5rem',
                              borderRadius: 'var(--radius-sm)',
                              border: '1px solid var(--slate-200)',
                              fontSize: '0.82rem',
                            }}
                          >
                            {student.studentId}
                          </span>
                        </td>
                        <td>
                          <span style={{ fontWeight: 500 }}>{student.department}</span>
                        </td>
                        <td>
                          <span className="badge badge-neutral">
                            Sem {student.semester} • Sec {student.section}
                          </span>
                        </td>
                        <td>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              color: 'var(--slate-600)',
                              fontSize: '0.82rem',
                            }}
                          >
                            <Mail size={13} color="var(--slate-400)" />
                            {student.email}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            {stats.percentage !== null && (
                              <div className="attendance-progress-track">
                                <div
                                  className="attendance-progress-fill"
                                  style={{
                                    width: `${Math.min(100, Math.max(0, stats.percentage))}%`,
                                    backgroundColor: isLow ? '#ef4444' : '#10b981',
                                  }}
                                />
                              </div>
                            )}
                            <span
                              style={{
                                fontWeight: 800,
                                fontSize: '0.9rem',
                                color: isLow ? 'var(--status-a-solid)' : 'var(--slate-900)',
                              }}
                            >
                              {formatPercentage(stats.percentage)}
                            </span>
                            {isLow && (
                              <span
                                className="badge badge-danger"
                                style={{ fontSize: '0.68rem', padding: '0.15rem 0.4rem' }}
                                title="Attendance is below required threshold"
                              >
                                At Risk
                              </span>
                            )}
                          </div>
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              isInactive ? 'badge-neutral' : 'badge-present'
                            }`}
                          >
                            <span className="status-dot" />
                            {isInactive ? 'Inactive' : 'Active'}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                            }}
                          >
                            <button
                              className="btn btn-secondary btn-sm"
                              title={isInactive ? 'Activate Student' : 'Deactivate Student'}
                              onClick={() => handleToggleActive(student)}
                            >
                              {isInactive ? <UserCheck size={14} /> : <UserX size={14} />}
                            </button>
                            <button
                              className="btn btn-secondary btn-sm"
                              title="Edit Student"
                              onClick={() => handleOpenEditModal(student)}
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              className="btn btn-secondary btn-sm"
                              title="Delete Student"
                              onClick={() => setDeleteConfirmStudent(student)}
                              style={{ color: '#dc2626' }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={students.length}
              pageSize={pageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </>
        )}
      </div>

      {/* Add / Edit Student Modal */}
      <StudentFormModal
        isOpen={isModalOpen}
        studentToEdit={studentToEdit}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Confirmation Dialog for Delete */}
      <ConfirmationDialog
        isOpen={Boolean(deleteConfirmStudent)}
        title="Delete Student Record"
        message={`Are you sure you want to delete student "${deleteConfirmStudent?.name}" (${deleteConfirmStudent?.studentId})? Note: In an academic system, student deletion will remove the student profile while preserving historical attendance integrity.`}
        confirmLabel="Delete Student"
        isDestructive={true}
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirmStudent(null)}
      />
    </div>
  );
};

export default StudentsPage;

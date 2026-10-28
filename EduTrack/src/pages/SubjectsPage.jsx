import React, { useState } from 'react';
import {
  BookPlus,
  Search,
  FilterX,
  Edit2,
  Trash2,
  BookOpen,
  User,
  GraduationCap,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectAllSubjects,
  deleteSubject,
  clearSubjectStatusMessage,
} from '../features/subjects/subjectsSlice';
import {
  setSubjectSearchQuery,
  setSubjectDepartmentFilter,
  setSubjectSemesterFilter,
  resetSubjectFilters,
  selectSubjectFilters,
} from '../features/filters/filtersSlice';
import SubjectFormModal from '../components/subjects/SubjectFormModal';
import ConfirmationDialog from '../components/common/ConfirmationDialog';
import ToastNotification from '../components/common/ToastNotification';
import EmptyState from '../components/common/EmptyState';
import { DEPARTMENTS, SEMESTERS } from '../data/seedData';

export const SubjectsPage = () => {
  const dispatch = useAppDispatch();
  const allSubjects = useAppSelector(selectAllSubjects);
  const filters = useAppSelector(selectSubjectFilters);
  const statusMessage = useAppSelector((state) => state.subjects.statusMessage);
  const errorMessage = useAppSelector((state) => state.subjects.error);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subjectToEdit, setSubjectToEdit] = useState(null);
  const [deleteSubjectTarget, setDeleteSubjectTarget] = useState(null);

  // Filter subjects
  const filteredSubjects = allSubjects.filter((subject) => {
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      const codeMatches = subject.subjectCode.toLowerCase().includes(q);
      const nameMatches = subject.subjectName.toLowerCase().includes(q);
      if (!codeMatches && !nameMatches) return false;
    }
    if (filters.department !== 'All' && subject.department !== filters.department) {
      return false;
    }
    if (filters.semester !== 'All' && Number(subject.semester) !== Number(filters.semester)) {
      return false;
    }
    return true;
  });

  const handleOpenAdd = () => {
    setSubjectToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (subject) => {
    setSubjectToEdit(subject);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteSubjectTarget) {
      dispatch(deleteSubject(deleteSubjectTarget.id));
      setDeleteSubjectTarget(null);
    }
  };

  return (
    <div>
      <div className="page-header-row">
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            Course Offerings & Subjects
          </h2>
          <p className="page-subtitle">
            Configure academic courses, departmental affiliations, instructors, and credit allocations.
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenAdd} id="btn-add-subject">
          <BookPlus size={18} />
          <span>Add Course Offering</span>
        </button>
      </div>

      {statusMessage && (
        <ToastNotification
          type="success"
          message={statusMessage}
          onClose={() => dispatch(clearSubjectStatusMessage())}
        />
      )}
      {errorMessage && (
        <ToastNotification
          type="error"
          message={errorMessage}
          onClose={() => dispatch(clearSubjectStatusMessage())}
        />
      )}

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        <div className="search-input-wrapper">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="input-text"
            placeholder="Search by course code or title..."
            value={filters.searchQuery}
            onChange={(e) => dispatch(setSubjectSearchQuery(e.target.value))}
          />
        </div>

        <select
          className="select-control"
          style={{ width: 'auto', minWidth: '160px' }}
          value={filters.department}
          onChange={(e) => dispatch(setSubjectDepartmentFilter(e.target.value))}
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
          style={{ width: 'auto', minWidth: '130px' }}
          value={filters.semester}
          onChange={(e) => dispatch(setSubjectSemesterFilter(e.target.value))}
        >
          <option value="All">All Semesters</option>
          {SEMESTERS.map((sem) => (
            <option key={sem} value={sem}>
              Semester {sem}
            </option>
          ))}
        </select>

        <button
          className="btn btn-secondary btn-sm"
          onClick={() => dispatch(resetSubjectFilters())}
          title="Reset filters"
        >
          <FilterX size={15} />
          <span>Reset</span>
        </button>
      </div>

      {/* Subjects Grid */}
      {filteredSubjects.length === 0 ? (
        <div className="table-card">
          <EmptyState
            icon={BookOpen}
            title="No courses match the criteria"
            description="Adjust your search query or department/semester filters to browse available curriculum."
            action={
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => dispatch(resetSubjectFilters())}
              >
                Reset Filters
              </button>
            }
          />
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.25rem',
            marginBottom: '2rem',
          }}
        >
          {filteredSubjects.map((sub) => (
            <div
              key={sub.id}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--slate-200)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.65rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 800,
                      color: 'var(--primary-700)',
                      fontSize: '1rem',
                      backgroundColor: 'var(--primary-50)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--primary-200)',
                    }}
                  >
                    {sub.subjectCode}
                  </span>
                  <span className="badge badge-neutral">
                    {sub.credits ? `${sub.credits} Credits` : '3 Credits'}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: 'var(--slate-900)',
                    marginBottom: '0.45rem',
                  }}
                >
                  {sub.subjectName}
                </h3>

                <p
                  style={{
                    fontSize: '0.82rem',
                    color: 'var(--slate-500)',
                    marginBottom: '0.85rem',
                  }}
                >
                  {sub.department} • Semester {sub.semester}
                </p>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem',
                    padding: '0.75rem',
                    backgroundColor: 'var(--slate-50)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.8rem',
                    color: 'var(--slate-600)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <User size={13} />
                    <span>
                      Instructor: <strong>{sub.instructor || 'TBD'}</strong>
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <GraduationCap size={13} />
                    <span>
                      Sections:{' '}
                      {sub.sections && sub.sections.length > 0
                        ? sub.sections.join(', ')
                        : 'All'}
                    </span>
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: '0.5rem',
                  marginTop: '1.15rem',
                  paddingTop: '0.85rem',
                  borderTop: '1px solid var(--slate-100)',
                }}
              >
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleOpenEdit(sub)}
                >
                  <Edit2 size={13} />
                  <span>Edit</span>
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setDeleteSubjectTarget(sub)}
                  style={{ color: '#dc2626' }}
                >
                  <Trash2 size={13} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <SubjectFormModal
        isOpen={isModalOpen}
        subjectToEdit={subjectToEdit}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Confirmation Dialog for Delete */}
      <ConfirmationDialog
        isOpen={Boolean(deleteSubjectTarget)}
        title="Delete Course Offering"
        message={`Are you sure you want to remove course "${deleteSubjectTarget?.subjectCode} — ${deleteSubjectTarget?.subjectName}"?`}
        confirmLabel="Delete Subject"
        isDestructive={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteSubjectTarget(null)}
      />
    </div>
  );
};

export default SubjectsPage;


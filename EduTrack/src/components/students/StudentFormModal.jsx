import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createStudentThunk, updateStudentThunk } from '../../features/students/studentsSlice';
import { selectAllSubjects } from '../../features/subjects/subjectsSlice';
import { DEPARTMENTS, SEMESTERS, SECTIONS } from '../../data/seedData';

export const StudentFormModal = ({ isOpen, studentToEdit = null, onClose }) => {
  const dispatch = useAppDispatch();
  const allSubjects = useAppSelector(selectAllSubjects);

  const isEditing = Boolean(studentToEdit);

  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    department: DEPARTMENTS[0],
    semester: 3,
    section: 'A',
    email: '',
    subjectIds: [],
    status: 'active',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (studentToEdit) {
      setFormData({
        id: studentToEdit.id,
        studentId: studentToEdit.studentId || '',
        name: studentToEdit.name || '',
        department: studentToEdit.department || DEPARTMENTS[0],
        semester: studentToEdit.semester || 3,
        section: studentToEdit.section || 'A',
        email: studentToEdit.email || '',
        subjectIds: studentToEdit.subjectIds || [],
        status: studentToEdit.status || 'active',
      });
    } else {
      setFormData({
        studentId: '',
        name: '',
        department: DEPARTMENTS[0],
        semester: 3,
        section: 'A',
        email: '',
        subjectIds: [],
        status: 'active',
      });
    }
    setErrors({});
  }, [studentToEdit, isOpen]);

  if (!isOpen) return null;

  // Filter subjects matching current department & semester
  const availableSubjects = allSubjects.filter(
    (sub) =>
      sub.department === formData.department &&
      Number(sub.semester) === Number(formData.semester)
  );

  const validate = () => {
    const newErrors = {};

    if (!formData.studentId.trim()) {
      newErrors.studentId = 'Student ID is required.';
    } else if (!/^[A-Za-z0-9_-]+$/.test(formData.studentId.trim())) {
      newErrors.studentId = 'Student ID can only contain letters, numbers, and dashes.';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'semester' ? Number(value) : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleToggleSubject = (subjectId) => {
    setFormData((prev) => {
      const exists = prev.subjectIds.includes(subjectId);
      const updated = exists
        ? prev.subjectIds.filter((id) => id !== subjectId)
        : [...prev.subjectIds, subjectId];
      return { ...prev, subjectIds: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      if (isEditing) {
        const resultAction = await dispatch(updateStudentThunk(formData));
        if (updateStudentThunk.fulfilled.match(resultAction)) {
          onClose();
        } else {
          setErrors({ form: resultAction.payload || 'Failed to update student.' });
        }
      } else {
        const resultAction = await dispatch(createStudentThunk(formData));
        if (createStudentThunk.fulfilled.match(resultAction)) {
          onClose();
        } else {
          setErrors({ form: resultAction.payload || 'Failed to create student.' });
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-card" style={{ maxWidth: '600px' }}>
        <div className="modal-header">
          <h3 className="modal-title">
            {isEditing ? 'Edit Student Details' : 'Register New Student'}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-400)' }}
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {errors.form && (
              <div className="toast-banner toast-error" style={{ marginBottom: 0 }}>
                <span>{errors.form}</span>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Student ID *
                </label>
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  placeholder="e.g. CS2024021"
                  className="input-text"
                  style={{ textTransform: 'uppercase' }}
                  disabled={isEditing} // keep ID stable during edit
                />
                {errors.studentId && (
                  <span style={{ color: 'var(--status-a-solid)', fontSize: '0.75rem', marginTop: '0.2rem', display: 'block' }}>
                    {errors.studentId}
                  </span>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Aarav Sharma"
                  className="input-text"
                />
                {errors.name && (
                  <span style={{ color: 'var(--status-a-solid)', fontSize: '0.75rem', marginTop: '0.2rem', display: 'block' }}>
                    {errors.name}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="student@campus.edu"
                className="input-text"
              />
              {errors.email && (
                <span style={{ color: 'var(--status-a-solid)', fontSize: '0.75rem', marginTop: '0.2rem', display: 'block' }}>
                  {errors.email}
                </span>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Department *
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="select-control"
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Semester *
                </label>
                <select
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  className="select-control"
                >
                  {SEMESTERS.map((sem) => (
                    <option key={sem} value={sem}>
                      Sem {sem}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Section *
                </label>
                <select
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  className="select-control"
                >
                  {SECTIONS.map((sec) => (
                    <option key={sec} value={sec}>
                      Sec {sec}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Subject Registrations */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Course Enrolment (Optional)
              </label>
              {availableSubjects.length === 0 ? (
                <p style={{ fontSize: '0.8rem', color: 'var(--slate-500)', fontStyle: 'italic' }}>
                  No courses configured for {formData.department} Sem {formData.semester}.
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: '140px', overflowY: 'auto' }}>
                  {availableSubjects.map((sub) => {
                    const isChecked = formData.subjectIds.includes(sub.id);
                    return (
                      <label
                        key={sub.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontSize: '0.85rem',
                          padding: '0.35rem 0.5rem',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: isChecked ? 'var(--primary-50)' : 'var(--slate-50)',
                          border: isChecked ? '1px solid var(--primary-200)' : '1px solid var(--slate-200)',
                          cursor: 'pointer',
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleSubject(sub.id)}
                        />
                        <span style={{ fontWeight: 600, color: 'var(--slate-800)' }}>
                          {sub.subjectCode}
                        </span>
                        <span style={{ color: 'var(--slate-600)' }}>— {sub.subjectName}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : isEditing ? 'Update Student' : 'Register Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentFormModal;


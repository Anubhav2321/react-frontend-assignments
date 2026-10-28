import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useAppDispatch } from '../../app/hooks';
import { addSubject, updateSubject } from '../../features/subjects/subjectsSlice';
import { DEPARTMENTS, SEMESTERS, SECTIONS } from '../../data/seedData';

export const SubjectFormModal = ({ isOpen, subjectToEdit = null, onClose }) => {
  const dispatch = useAppDispatch();
  const isEditing = Boolean(subjectToEdit);

  const [formData, setFormData] = useState({
    subjectCode: '',
    subjectName: '',
    department: DEPARTMENTS[0],
    semester: 3,
    sections: ['A', 'B'],
    instructor: '',
    credits: 4,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (subjectToEdit) {
      setFormData({
        id: subjectToEdit.id,
        subjectCode: subjectToEdit.subjectCode || '',
        subjectName: subjectToEdit.subjectName || '',
        department: subjectToEdit.department || DEPARTMENTS[0],
        semester: subjectToEdit.semester || 3,
        sections: subjectToEdit.sections || ['A', 'B'],
        instructor: subjectToEdit.instructor || '',
        credits: subjectToEdit.credits || 4,
      });
    } else {
      setFormData({
        subjectCode: '',
        subjectName: '',
        department: DEPARTMENTS[0],
        semester: 3,
        sections: ['A', 'B'],
        instructor: '',
        credits: 4,
      });
    }
    setErrors({});
  }, [subjectToEdit, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.subjectCode.trim()) {
      newErrors.subjectCode = 'Course Code is required.';
    }
    if (!formData.subjectName.trim()) {
      newErrors.subjectName = 'Course Name is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'semester' || name === 'credits' ? Number(value) : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleToggleSection = (sec) => {
    setFormData((prev) => {
      const exists = prev.sections.includes(sec);
      const updated = exists
        ? prev.sections.filter((s) => s !== sec)
        : [...prev.sections, sec];
      return { ...prev, sections: updated };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (isEditing) {
      dispatch(updateSubject(formData));
    } else {
      dispatch(addSubject(formData));
    }
    onClose();
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-card">
        <div className="modal-header">
          <h3 className="modal-title">
            {isEditing ? 'Edit Course Subject' : 'Add New Academic Course'}
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0.85rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Course Code *
                </label>
                <input
                  type="text"
                  name="subjectCode"
                  value={formData.subjectCode}
                  onChange={handleChange}
                  placeholder="e.g. CS305"
                  className="input-text"
                  style={{ textTransform: 'uppercase' }}
                />
                {errors.subjectCode && (
                  <span style={{ color: 'var(--status-a-solid)', fontSize: '0.75rem', marginTop: '0.2rem', display: 'block' }}>
                    {errors.subjectCode}
                  </span>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Course Title *
                </label>
                <input
                  type="text"
                  name="subjectName"
                  value={formData.subjectName}
                  onChange={handleChange}
                  placeholder="e.g. Operating Systems"
                  className="input-text"
                />
                {errors.subjectName && (
                  <span style={{ color: 'var(--status-a-solid)', fontSize: '0.75rem', marginTop: '0.2rem', display: 'block' }}>
                    {errors.subjectName}
                  </span>
                )}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Department
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
                  Semester
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
                  Credits
                </label>
                <input
                  type="number"
                  name="credits"
                  value={formData.credits}
                  onChange={handleChange}
                  min={1}
                  max={6}
                  className="input-text"
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Course Instructor / Professor
              </label>
              <input
                type="text"
                name="instructor"
                value={formData.instructor}
                onChange={handleChange}
                placeholder="e.g. Dr. Ramesh Verma"
                className="input-text"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Active Sections
              </label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {SECTIONS.map((sec) => (
                  <label key={sec} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem' }}>
                    <input
                      type="checkbox"
                      checked={formData.sections.includes(sec)}
                      onChange={() => handleToggleSection(sec)}
                    />
                    <span>Section {sec}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {isEditing ? 'Save Changes' : 'Create Subject'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubjectFormModal;


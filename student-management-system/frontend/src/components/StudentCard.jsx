import React from 'react';
import { Trash2, Edit } from 'lucide-react';

const StudentCard = ({ student, onDelete, onEdit }) => {
  const { name, roll, cgpa, department, semester, phone, email, photo } = student;
  
  return (
    <div className="student-card glass">
      <div className="card-actions" style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem' }}>
        <button className="icon-btn-small edit-btn" onClick={onEdit} aria-label="Edit Student">
          <Edit size={16} />
        </button>
        <button className="icon-btn-small delete-btn" onClick={onDelete} aria-label="Delete Student">
          <Trash2 size={16} />
        </button>
      </div>
      <img src={photo || '/images/default-avatar.png'} alt={`${name}'s photo`} />
      <h3>{name}</h3>
      <p style={{ margin: '0', fontWeight: '500' }}>{roll}</p>
      
      <div style={{ margin: '1rem 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
        <p style={{ margin: '0.25rem 0' }}><strong>Dept:</strong> {department || 'N/A'} ({semester || 'N/A'})</p>
        <p style={{ margin: '0.25rem 0' }}><strong>Email:</strong> {email || 'N/A'}</p>
        <p style={{ margin: '0.25rem 0' }}><strong>Phone:</strong> {phone || 'N/A'}</p>
      </div>

      <div className="cgpa-badge">CGPA: {cgpa} / 10</div>
    </div>
  );
};

export default StudentCard;

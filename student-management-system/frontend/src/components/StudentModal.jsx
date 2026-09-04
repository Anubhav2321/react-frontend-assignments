import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const StudentModal = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    roll: '',
    cgpa: '',
    department: '',
    semester: '',
    phone: '',
    email: '',
    photo: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        roll: initialData.roll || '',
        cgpa: initialData.cgpa || '',
        department: initialData.department || '',
        semester: initialData.semester || '',
        phone: initialData.phone || '',
        email: initialData.email || '',
        photo: initialData.photo || '',
      });
    } else {
      setFormData({
        name: '', roll: '', cgpa: '', department: '', semester: '', phone: '', email: '', photo: ''
      });
    }
  }, [initialData, isOpen]);
  
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', roll: '', cgpa: '', department: '', semester: '', phone: '', email: '', photo: '' });
  };

  const isEditing = !!initialData;

  return (
    <div className="modal-overlay">
      <div className="modal-content glass" style={{ maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
        <button className="close-btn" onClick={onClose} aria-label="Close Modal">
          <X size={24} />
        </button>
        <h2>{isEditing ? 'Edit Student' : 'Add New Student'}</h2>
        
        <form onSubmit={handleSubmit} className="add-student-form">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. John Doe" />
            </div>
            <div className="form-group">
              <label>Roll Number</label>
              <input type="text" name="roll" value={formData.roll} onChange={handleChange} required placeholder="e.g. 101" />
            </div>
            <div className="form-group">
              <label>CGPA (out of 10)</label>
              <input type="number" step="0.01" min="0" max="10" name="cgpa" value={formData.cgpa} onChange={handleChange} required placeholder="e.g. 9.5" />
            </div>
            <div className="form-group">
              <label>Department</label>
              <input type="text" name="department" value={formData.department} onChange={handleChange} required placeholder="e.g. Computer Science" />
            </div>
            <div className="form-group">
              <label>Semester</label>
              <input type="text" name="semester" value={formData.semester} onChange={handleChange} required placeholder="e.g. 8th" />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="e.g. +880..." />
            </div>
          </div>
          
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="e.g. student@example.com" />
          </div>
          
          <div className="form-group">
            <label>Profile Picture URL / Local Path</label>
            <input type="text" name="photo" value={formData.photo} onChange={handleChange} placeholder="e.g. https://... or /images/me.png" />
            <small style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'block', marginTop: '0.25rem' }}>
              Paste an image link or put an image in 'frontend/public/images' and type '/images/your-image.png'
            </small>
          </div>

          <button type="submit" className="submit-btn">{isEditing ? 'Save Changes' : 'Add Student'}</button>
        </form>
      </div>
    </div>
  );
};

export default StudentModal;

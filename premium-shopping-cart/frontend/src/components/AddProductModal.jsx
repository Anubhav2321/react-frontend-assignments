import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import './AddProductModal.css';

const AddProductModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    category: 'Electronics',
    image: '',
    specs: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const productPayload = {
      ...formData,
      price: parseFloat(formData.price),
      specs: formData.specs.split(',').map(s => s.trim())
    };

    fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productPayload)
    })
      .then(res => res.json())
      .then(data => {
        setIsSubmitting(false);
        toast.success(`${data.name} added to database! Refresh to view.`);
        onClose();
        setFormData({ name: '', brand: '', price: '', category: 'Electronics', image: '', specs: '' });
      })
      .catch(err => {
        setIsSubmitting(false);
        toast.error('Failed to add product.');
      });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel">
        <div className="modal-header">
          <h2>ADMIN: <span className="logo-highlight">ADD PRODUCT</span></h2>
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
        </div>

        <form className="add-product-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>PRODUCT NAME</label>
            <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="e.g. Neon Quantum Board" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>BRAND</label>
              <input type="text" name="brand" required value={formData.brand} onChange={handleChange} placeholder="e.g. TechNova" />
            </div>
            <div className="form-group">
              <label>PRICE ($)</label>
              <input type="number" name="price" required min="1" step="0.01" value={formData.price} onChange={handleChange} placeholder="150" />
            </div>
          </div>

          <div className="form-group">
            <label>CATEGORY</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="Electronics">Electronics</option>
              <option value="Dresses">Dresses</option>
              <option value="Shoes">Shoes</option>
              <option value="Bags">Bags</option>
              <option value="Bottles">Bottles</option>
            </select>
          </div>

          <div className="form-group">
            <label>IMAGE URL</label>
            <input type="url" name="image" required value={formData.image} onChange={handleChange} placeholder="https://images.unsplash.com/photo-..." />
          </div>

          <div className="form-group">
            <label>SPECIFICATIONS (Comma separated)</label>
            <input type="text" name="specs" required value={formData.specs} onChange={handleChange} placeholder="RGB, Wireless, Cherry MX" />
          </div>

          <button type="submit" className="cyber-btn submit-btn" disabled={isSubmitting}>
            <Upload size={18} />
            {isSubmitting ? 'UPLOADING...' : 'SAVE PRODUCT'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;

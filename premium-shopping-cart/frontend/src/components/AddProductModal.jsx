import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import './AddProductModal.css';

const AddProductModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    category: 'Watches',
    image: '',
    specs: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const productPayload = {
      ...formData,
      price: parseFloat(formData.price),
      specs: formData.specs.split(',').map(s => s.trim())
    };

    setTimeout(() => {
      const stored = localStorage.getItem('luxeAuraProducts');
      let products = stored ? JSON.parse(stored) : [];
      
      const newProduct = {
        ...productPayload,
        id: Date.now()
      };
      
      products.push(newProduct);
      localStorage.setItem('luxeAuraProducts', JSON.stringify(products));
      
      setIsSubmitting(false);
      toast.success(`${newProduct.name} added to collection!`);
      onClose();
      setFormData({ name: '', brand: '', price: '', category: 'Watches', image: '', specs: '' });
      
      // Reload to reflect new products in the list
      setTimeout(() => window.location.reload(), 1000);
    }, 500);
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
              <option value="Watches">Watches</option>
              <option value="Electronics">Electronics</option>
              <option value="Accessories">Accessories</option>
              <option value="Bags">Bags</option>
              <option value="Shoes">Shoes</option>
            </select>
          </div>

          <div className="form-group">
            <label>IMAGE (URL OR FILE UPLOAD)</label>
            <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="https://... or /images/..." />
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ marginTop: '10px' }} />
            {formData.image && <img src={formData.image} alt="Preview" style={{ marginTop: '10px', height: '60px', borderRadius: '4px', objectFit: 'cover' }} />}
          </div>

          <div className="form-group">
            <label>SPECIFICATIONS (Comma separated)</label>
            <input type="text" name="specs" required value={formData.specs} onChange={handleChange} placeholder="RGB, Wireless, Cherry MX" />
          </div>

          <button type="submit" className="premium-btn submit-btn" disabled={isSubmitting}>
            <Upload size={18} />
            {isSubmitting ? 'UPLOADING...' : 'SAVE PRODUCT'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;

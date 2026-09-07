import React, { useState, useEffect } from 'react';
import { PackageX, Clock, Truck, CheckCircle, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import './OrdersView.css';

const OrdersView = ({ onBack }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    fetch('http://localhost:5000/api/orders')
      .then(res => res.json())
      .then(data => {
        // Sort descending by date
        setOrders(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching orders:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelOrder = (id) => {
    fetch(`http://localhost:5000/api/orders/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(data => {
        toast.success(data.message, {
          style: { background: '#1f2833', color: '#f0f', border: '1px solid #f0f' },
          iconTheme: { primary: '#f0f', secondary: '#000' }
        });
        fetchOrders();
      })
      .catch(err => {
        toast.error('Failed to cancel order.');
      });
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Processing': return <Clock size={20} className="status-icon text-cyan" />;
      case 'Shipped': return <Truck size={20} className="status-icon text-cyan" />;
      case 'Delivered': return <CheckCircle size={20} className="status-icon text-green" />;
      case 'Cancelled': return <PackageX size={20} className="status-icon text-magenta" />;
      default: return null;
    }
  };

  if (loading) {
    return <div className="loading-state neon-glow">FETCHING ORDERS...</div>;
  }

  return (
    <div className="orders-container">
      <button className="back-btn cyber-btn" onClick={onBack}>
        <ArrowLeft size={18} /> BACK TO HOME
      </button>

      <h2 className="section-title">
        ORDER <span className="logo-highlight">HISTORY</span>
      </h2>

      {orders.length === 0 ? (
        <div className="no-results">NO LOGGED TRANSACTIONS.</div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className={`order-card glass-panel ${order.status === 'Cancelled' ? 'cancelled-order' : ''}`}>
              <div className="order-header">
                <div className="order-id">TRANSACTION ID: <span>{order.id}</span></div>
                <div className="order-date">{new Date(order.date).toLocaleDateString()}</div>
              </div>

              <div className="order-body">
                <div className="order-items">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="order-item-row">
                      <span className="order-item-qty">{item.quantity}x</span>
                      <span className="order-item-name">{item.name}</span>
                    </div>
                  ))}
                </div>
                
                <div className="order-meta">
                  <div className="order-total">TOTAL: <span className="text-cyan">₹{order.total.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span></div>
                  <div className="order-status">
                    {getStatusIcon(order.status)}
                    <span className={`status-text ${order.status === 'Cancelled' ? 'text-magenta' : 'text-cyan'}`}>
                      {order.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {order.status === 'Processing' && (
                <div className="order-footer">
                  <button className="cyber-btn-magenta cancel-btn" onClick={() => handleCancelOrder(order.id)}>
                    CANCEL ORDER
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersView;

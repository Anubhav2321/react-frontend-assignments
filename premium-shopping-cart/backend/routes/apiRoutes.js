const express = require('express');
const router = express.Router();
const productStore = require('../data/products');
const orderStore = require('../data/orders');
const coupons = require('../data/coupons');

// --- PRODUCTS ---
router.get('/products', (req, res) => {
  res.json(productStore.getProducts());
});

router.post('/products', (req, res) => {
  const newProduct = productStore.addProduct(req.body);
  res.status(201).json(newProduct);
});

// --- ORDERS ---
router.get('/orders', (req, res) => {
  res.json(orderStore.getOrders());
});

router.post('/orders', (req, res) => {
  const { items, total } = req.body;
  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'No items in order' });
  }

  const order = {
    id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    date: new Date().toISOString(),
    items,
    total,
    status: 'Processing' // Processing -> Shipped -> Delivered
  };
  
  orderStore.addOrder(order);
  res.status(201).json(order);
});

router.delete('/orders/:id', (req, res) => {
  const success = orderStore.cancelOrder(req.params.id);
  if (success) {
    res.json({ message: 'Order cancelled successfully' });
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

// --- COUPONS ---
router.post('/validate-coupon', (req, res) => {
  const { code } = req.body;
  
  if (!code) {
    return res.status(400).json({ valid: false, message: 'Coupon code is required' });
  }

  const discountCode = code.toUpperCase();
  const discountPercentage = coupons[discountCode];

  if (discountPercentage) {
    return res.json({ 
      valid: true, 
      discountPercentage, 
      message: `Coupon applied! ${discountPercentage}% off.` 
    });
  } else {
    return res.status(400).json({ 
      valid: false, 
      message: 'Invalid or expired coupon code.' 
    });
  }
});

module.exports = router;

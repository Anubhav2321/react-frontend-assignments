import mongoose from 'mongoose';
import { Order } from '../models/Order.js';
import { calculateAuthoritativeOrder } from '../services/catalogService.js';

/**
 * @desc    Create a new order with server-side authoritative pricing & total calculations
 * @route   POST /api/orders
 * @access  Private
 */
export const createOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Your cart is empty. Please add items before checking out.',
      });
    }

    // Step 1: Calculate authoritative pricing and totals from catalog
    // Never trust client-sent unit prices or totals!
    const orderCalculation = await calculateAuthoritativeOrder(items);

    // Step 2: Create persistent order in MongoDB
    const order = await Order.create({
      user: req.user._id,
      items: orderCalculation.items,
      shippingAddress: {
        fullName: shippingAddress.fullName,
        street: shippingAddress.street,
        city: shippingAddress.city,
        state: shippingAddress.state,
        postalCode: shippingAddress.postalCode,
        country: shippingAddress.country,
        phone: shippingAddress.phone,
      },
      subtotal: orderCalculation.subtotal,
      shippingCost: orderCalculation.shippingCost,
      tax: orderCalculation.tax,
      total: orderCalculation.total,
      paymentMethod: paymentMethod || 'Simulated Credit Card',
      status: 'Processing',
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order,
    });
  } catch (error) {
    if (error.message.includes('not exist in catalog') || error.message.includes('Invalid quantity')) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    next(error);
  }
};

/**
 * @desc    Get all orders for currently authenticated user
 * @route   GET /api/orders
 * @access  Private
 */
export const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get order details by ID
 * @route   GET /api/orders/:orderId
 * @access  Private
 */
export const getOrderById = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(404).json({
        success: false,
        message: 'Invalid order identifier format',
      });
    }

    const order = await Order.findById(orderId).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    // Authorization check: User can only view their own orders unless admin
    const isOwner = order.user._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Access denied: You are not authorized to view this order',
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
};


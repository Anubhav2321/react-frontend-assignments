import express from 'express';
import {
  createOrder,
  getUserOrders,
  getOrderById,
} from '../controllers/orderController.js';
import { validateCreateOrder } from '../validators/orderValidators.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All order operations require authenticated session
router.use(protect);

router.post('/', validateCreateOrder, createOrder);
router.get('/', getUserOrders);
router.get('/:orderId', getOrderById);

export default router;


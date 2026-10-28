import express from 'express';
import {
  getProducts,
  getSingleProduct,
  getCategories,
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/categories', getCategories);
router.get('/:id', getSingleProduct);

export default router;


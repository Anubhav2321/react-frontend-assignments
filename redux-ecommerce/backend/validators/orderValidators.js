import { body } from 'express-validator';
import { handleValidationErrors } from './authValidators.js';

export const validateCreateOrder = [
  body('items')
    .isArray({ min: 1 })
    .withMessage('Order must contain at least one item'),
  body('items.*.productId')
    .notEmpty()
    .withMessage('Each item must have a productId'),
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be an integer of at least 1'),
  body('shippingAddress.fullName')
    .trim()
    .notEmpty()
    .withMessage('Recipient full name is required'),
  body('shippingAddress.street')
    .trim()
    .notEmpty()
    .withMessage('Street address is required'),
  body('shippingAddress.city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
  body('shippingAddress.state')
    .trim()
    .notEmpty()
    .withMessage('State or province is required'),
  body('shippingAddress.postalCode')
    .trim()
    .notEmpty()
    .withMessage('Postal code is required'),
  body('shippingAddress.country')
    .trim()
    .notEmpty()
    .withMessage('Country is required'),
  body('shippingAddress.phone')
    .trim()
    .notEmpty()
    .withMessage('Contact phone number is required'),
  handleValidationErrors,
];


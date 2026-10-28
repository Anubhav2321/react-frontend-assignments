import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.Mixed, // number or string
      required: [true, 'Product ID is required'],
    },
    title: {
      type: String,
      required: [true, 'Product title snapshot is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Authoritative unit price is required'],
      min: [0, 'Price cannot be negative'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
    },
    image: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      default: 'General',
    },
    itemTotal: {
      type: Number,
      required: true,
      min: [0, 'Item total cannot be negative'],
    },
  },
  { _id: false }
);

const shippingAddressSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required for shipping'],
      trim: true,
    },
    street: {
      type: String,
      required: [true, 'Street address is required'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    state: {
      type: String,
      required: [true, 'State or province is required'],
      trim: true,
    },
    postalCode: {
      type: String,
      required: [true, 'Postal code is required'],
      trim: true,
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Contact phone is required'],
      trim: true,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Order must belong to a registered user'],
      index: true,
    },
    items: {
      type: [orderItemSchema],
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: 'Order must contain at least one item',
      },
    },
    shippingAddress: {
      type: shippingAddressSchema,
      required: [true, 'Shipping address is required'],
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    shippingCost: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    tax: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Processing',
      index: true,
    },
    paymentMethod: {
      type: String,
      default: 'Simulated Card (Demo)',
    },
  },
  {
    timestamps: true,
  }
);

// Format currency numbers cleanly
orderSchema.pre('validate', function () {
  if (this.subtotal !== undefined) {
    this.subtotal = Number(this.subtotal.toFixed(2));
  }
  if (this.shippingCost !== undefined) {
    this.shippingCost = Number(this.shippingCost.toFixed(2));
  }
  if (this.tax !== undefined) {
    this.tax = Number(this.tax.toFixed(2));
  }
  if (this.total !== undefined) {
    this.total = Number(this.total.toFixed(2));
  }
});

export const Order = mongoose.model('Order', orderSchema);


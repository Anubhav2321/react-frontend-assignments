import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Please add an amount'],
  },
  type: {
    type: String,
    required: [true, 'Please add a transaction type'],
    enum: ['Income', 'Expense'],
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
  },
  date: {
    type: Date,
    required: [true, 'Please add a date'],
    default: Date.now,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
}, {
  timestamps: true,
});

export default mongoose.model('Transaction', transactionSchema);

import express from 'express';
import Transaction from '../models/Transaction.js';

const router = express.Router();

// @desc    Get all transactions
// @route   GET /api/transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});


router.post('/', async (req, res) => {
  try {
    const { amount, type, category, date, description } = req.body;
    
    if (!amount || !type || !category || !description) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const transaction = await Transaction.create({
      amount, type, category, date, description
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
router.delete('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    await transaction.deleteOne();

    res.status(200).json({ id: req.params.id, message: 'Transaction deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

export default router;

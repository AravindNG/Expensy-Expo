const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../routes/auth');
const Expense = require('../models/Expense');

const router = express.Router();

router.post('/', [auth, [
  check('amount', 'Amount is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { amount, description } = req.body;
  try {
    const newExpense = new Expense({
      user: req.user.id,
      amount,
      description,
    });
    const expense = await newExpense.save();
    res.json(expense);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

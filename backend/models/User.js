const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 0 },
  expense: { type: Number, default: 0 },
  transactions: [transactionSchema], // Add transactions array
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

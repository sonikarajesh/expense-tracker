const express = require('express');
const User = require('../models/User');
const router = express.Router();
const mongoose= require('mongoose')

router.post("/addTransaction", async (req, res) => {
  const { userId, text, amount, category } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId format' });
  }

  console.log('Add Transaction route hit');
  try {
      const user = await User.findById(userId); 
      if (user) {
          const newTransaction = { text, amount, category, date: new Date() };

          const updatedUser = await User.findByIdAndUpdate(
              userId,
              {
                  $push: { transactions: newTransaction },
                  $inc: { balance: amount, expense: amount < 0 ? Math.abs(amount) : 0 }
              },
              { new: true }
          );

          res.status(200).json(updatedUser);  
      } else {
          res.status(404).json({ message: 'User is not found' });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error adding transaction' });
  }
});


router.post('/getUser', async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await User.findById(userId);  

        if (user) {
            res.status(200).json(user);  
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving user data' });
    }
});

module.exports = router;

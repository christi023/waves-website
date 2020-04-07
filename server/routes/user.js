const express = require('express');
const { User } = require('../models/user');
// security
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const config = require('config');
const router = express.Router();
//const cors = require('cors');
require('dotenv').config();
//router.use(cors());

// Register user and save to database

router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  // Simple Validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check for existing user
  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: 'User already exist' });

    const newUser = new User({
      name,
      email,
      password,
    });

    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
              },
            });
          });
        });
      });
    });
  });
});
module.exports = router;

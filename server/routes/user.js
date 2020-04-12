const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/api/users/register', async (req, res) => {
  // Create a new user-register new user
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token }).json({ success: true });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/api/users/login', async (req, res) => {
  //Login a registered user
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res.status(401).send({ error: 'Login failed! Check authentication credentials' });
    }
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// this route is to get the user profile
router.get('/api/users/me', auth, async (req, res) => {
  // View logged in user profile
  res.send(req.user);
});

// generate a token
/*user.generateToken((err, user) => {
  if (err) return res.status(400).send(err);
  // store token as cookie
  res.cookie('w_auth', user.token).status(200).json({
    loginSuccess: true,
  });
});
});*/
module.exports = router;

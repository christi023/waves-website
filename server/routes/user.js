const express = require('express');
const { User } = require('../models/user');
const auth = require('../middleware/auth');
const cookieParser = require('cookie-parser');
const router = express.Router();

router.use(cookieParser());

//---------- USER AUTH -------------------
router.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    // true
    isAuth: req.user.role === 0 ? false : true,
    // must fix this
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    cart: req.user.cart,
    history: req.user.history,
  });
});

// ----------------- REGISTER ROUTE ----------------
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

// ------------ LOGIN ROUTE ------------------
router.post('/api/users/login', async (req, res) => {
  //Login a registered user
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).send({ error: 'Login failed! Check authentication credentials' });
    }
    const token = await user.generateAuthToken();
    // res.send({ user, token });
    res.cookie('w_auth', token).status(200).json({
      loginSuccess: true,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

// ---------- GET USER PROFILE ROUTE -------------------
router.get('/api/users/me', auth, async (req, res) => {
  // View logged in user profile

  res.send(req.user);
});

//--------- LOGOUT ROUTE -------------
/*router.post('/api/users/me/logout', auth, async (req, res) => {
  // Log user out of the application
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token;
    });
    await req.user.save();
    res.status(200).send({ success: true });
  } catch (error) {
    res.status(500).send(error);
  }
});*/

router.get('/api/users/me/logout', auth, async (req, res) => {
  // Log user out of the application
  try {
    req.user._id = await User.findByIdAndUpdate({ _id: req.user._id }, { token: '' }, () => {
      return res.status(200).send({ success: true });
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// -------------- LOGOUT ALL ROUTE -----------------
router.post('/api/users/me/logoutall', auth, async (req, res) => {
  // Log user out of all devices
  try {
    // splice array method to remove tokens from users tokens array. Then save user document.
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.send({ success: true });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

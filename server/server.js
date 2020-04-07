const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
//const user = require('./routes/user');

const app = express();
// load env var
require('dotenv').config();

/// bring in mongoose - connect database
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// express body parser adding middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// ------------ MODELS --------------------
const { User } = require('./models/user');

// ------------- MIDDLEWARE --------------------
const { auth } = require('./middleware/auth');

// ------------- USERS ---------------------

app.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    cart: req.user.cart,
    history: req.user.history,
  });
});

//----------------- REGISTER --------------------
app.post('/api/users/register', (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err)
      return res.json({
        success: false,
        err,
      });
    res.status(200).json({
      success: true,
      userdata: doc,
    });
  });
});
//app.use('/api/users/login', user);

// --------------- ROUTES ---------------------
// -------------------- LOGIN ---------------------
app.post('/api/users/login', (req, res) => {
  // find the email
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) return res.json({ loginSuccess: false, message: 'Auth failed, email not found' }); // if user not found
  });

  // check password
  user.comparePassword(req.body.password, (err, isMatch) => {
    if (!isMatch) return res.json({ loginSuccess: false, message: 'Wrong password' });
  });

  // generate a token
  user.generateToken((err, user) => {
    if (err) return res.status(400).send(err);
    // store token as cookie
    res.cookie('w_auth', user.token).status(200).json({
      loginSuccess: true,
    });
  });
});

// ------------- LOGOUT -----------------------
app.get('/api/user/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

// env variable port created
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`),
);

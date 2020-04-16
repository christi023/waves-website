const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// router imports
const userRouter = require('./routes/user');
const brandRouter = require('./routes/brand');
const productRouter = require('./routes/product');

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

// ----- ROUTER---------
app.use(userRouter);
app.use(brandRouter);
app.use(productRouter);

// env variable port created
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`),
);

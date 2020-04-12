const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const userRouter = require('./routes/user');

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

app.use(userRouter);

// env variable port created
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`),
);

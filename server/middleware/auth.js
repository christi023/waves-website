const { User } = require('../models/user');
/*const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  // get token from request header. Token comes like "Bearer[space] token"- replace Bearer[space] with nothing('')
  const token = req.header('Authorization').replace('Bearer ', ''); // access token

  const data = jwt.verify(token, process.env.SECRET);
  // use jwt.verify() to see if token receive is valid/was created
  try {
    const user = await User.findOne({ _id: data._id, 'tokens.token': token });
    if (!user) {
      // throw new Error();
      return res.json({
        isAuth: false,
        error: true,
      });
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Not authorized to access this resource' });
  }
};*/

let auth = (req, res, next) => {
  let token = req.cookies.w_auth;

  User.findOne({}, token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        error: true,
      });

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = auth;

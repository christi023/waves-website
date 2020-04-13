let admin = (req, res, next) => {
  if (req.user.role === 0) {
    // if user tries to post to route & they are not admin, we send them out
    return res.send('you are not allowed');
  }
  next(); // if not they are allowed to move forward
};

module.exports = admin;

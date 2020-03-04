const jwt = require('jsonwebtoken');


// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }
  let payload;
  try {
    payload = jwt.verify(req.cookies.jwt, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret');
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload;

  next();
};

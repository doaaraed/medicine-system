const jwt = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : null;

  if (!token) return next(createError(401, 'Missing token'));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // معلومات المستخدم
    next();
  } catch (e) {
    next(createError(401, 'Invalid token'));
  }
};
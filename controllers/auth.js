const User = require('../models/User');
const { compareSync } = require('bcryptjs');
const createError = require('http-errors');

const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const existing = await User.findByUsername(username);
        if (existing) return next(createError(400, 'Username already taken'));

        const user = new User({ username, email, password });
        const result = await user.save();
        res.json({ status: true, message: 'User created', data: result });
    } catch (err) {
        next(createError(500, err.message));
    }
};

const login = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await User.findByUsername(username);
        if (!user) return next(createError(401, 'User not found'));

        const match = compareSync(password, user.password);
        if (!match) return next(createError(401, 'Invalid password'));

        res.json({ status: true, message: 'Login successful' });
    } catch (err) {
        next(createError(500, err.message));
    }
};

module.exports = {
    signup,
    login
};

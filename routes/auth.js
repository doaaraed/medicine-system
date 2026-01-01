const { Router } = require('express');
const { auth } = require('../controllers');
const { signup, login } = auth;
const router = Router();

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;

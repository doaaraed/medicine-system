const { Router } = require("express");
const { getAlternatives } = require("../controllers/alternative");

const router = Router();
router.get("/", getAlternatives);

module.exports = router;
// const { Router } = require('express');
// const { alternative } = require('../controllers');
// const { addAlternative, getAlternatives, updateAlternative, deleteAlternative } = alternative;


// const router = Router();

// router.post('/add', addAlternative);
// router.get('/', getAlternatives);
// router.put('/update/:id', updateAlternative);
// router.delete('/delete/:id', deleteAlternative);

// module.exports = router;

const { Router } = require("express");
const { getMedicines } = require("../controllers/medicine");

const router = Router();
router.get("/", getMedicines);

module.exports = router;
// const { Router } = require('express')
// const { medicine } = require('../controllers');
// const { getMedicines, addMedicine, updateMedicine, deleteMedicine } = medicine;

// const router = Router();

// router.get('/', getMedicines);
// router.post('/add', addMedicine);
// router.put('/update/:id', updateMedicine);
// router.delete('/delete/:id', deleteMedicine);

// module.exports = router;

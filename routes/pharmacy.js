const { Router } = require('express')

const { pharmacy } = require('../controllers');
const { addPharmacy, getPharmacies, updatePharmacy, deletePharmacy } = pharmacy;

const router = Router()
router.get('/', getPharmacies)
router.post('/add', addPharmacy);
router.put('/update/:id', updatePharmacy);
router.delete('/delete/:id', deletePharmacy);
module.exports = router

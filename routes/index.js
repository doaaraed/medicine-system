const express = require('express');
const router = express.Router();

const medicineRoutes = require('./medicine');
const alternativeRoutes = require('./alternative');
const pharmacyRoutes  = require('./pharmacy');
const authRoutes = require('./auth'); 

router.use('/auth', authRoutes);    
router.use('/medicines', medicineRoutes);
router.use('/alternatives', alternativeRoutes);
router.use('/pharmacies', pharmacyRoutes);

module.exports = router;
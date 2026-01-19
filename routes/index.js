const express = require('express');
const router = express.Router();
const medicineRoutes = require('./medicine');
const alternativeRoutes = require('./alternative');
const pharmacyRoutes  = require('./pharmacy');
// const authRoutes = require('./auth');




router.use('/medicines', medicineRoutes);
router.use('/alternatives', alternativeRoutes);
router.use('/pharmacies', pharmacyRoutes);

// router.use('/auth', authRoutes);
module.exports = router;
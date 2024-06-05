// app/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/', adminController.getAllAdmins);
router.post('/', adminController.createAdmin);
// Define other routes for admin CRUD operations

module.exports = router;

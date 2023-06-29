const express = require('express');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const { testcontroller } = require('../controllers/pythonController');

const router = express.Router();

router.route('/py/testapi').post(testcontroller);

module.exports = router;
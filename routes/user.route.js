const express = require('express');
const router = express.Router();
const { authenticate } = require("../middleware/user.middleware");
const userController = require("../controllers/user.controller");

router.post('/login', userController.login);
router.get('/cpuUsage', authenticate, userController.getCpuUsage);

module.exports = router;

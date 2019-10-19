const express = require('express');
const router = express.Router();
const { authenticate } = require("../middleware/user.middleware");
const userController = require("../controllers/user.controller");

router.post('/login', userController.login);
router.get('/cpuUsage', authenticate, userController.getCpuUsage);
router.post('/signUp', userController.registerUser);


module.exports = router;

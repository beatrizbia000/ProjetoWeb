const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/forgot-password', AuthController.esqueciSenha);
router.post('/reset-password', AuthController.redefinirSenha);

module.exports = router;
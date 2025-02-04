const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

router.post('/register', usuarioController.register);
router.post('/login', usuarioController.login);
router.post('/logout', usuarioController.logout);
router.get('/session', usuarioController.getUserSession);

module.exports = router;

const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');
const verificarToken = require('../middleware/auth.middleware');


router.get('/', usuarioController.listarTodos);

router.post('/', usuarioController.criarUsuario);

router.get('/email/:email', usuarioController.buscarPorEmail);

router.get('/:id', verificarToken, usuarioController.buscarPorId); 

router.put('/:id', verificarToken, usuarioController.atualizarUsuario);

module.exports = router;
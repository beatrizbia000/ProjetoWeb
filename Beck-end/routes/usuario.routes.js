const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');




router.get('/', usuarioController.listarTodos);


router.post('/', usuarioController.criarUsuario);



router.get('/email/:email', usuarioController.buscarPorEmail);


module.exports = router;
const express = require('express');
const router = express.Router();
const TipoUsuarioController = require('../controllers/tipoUsuario.controller');
const verificarToken = require('../middleware/auth.middleware');


router.get('/', TipoUsuarioController.findAll);


router.get('/:id', TipoUsuarioController.findById);


router.post('/', [verificarToken], TipoUsuarioController.create);


router.put('/:id', [verificarToken], TipoUsuarioController.update);


router.delete('/:id', [verificarToken], TipoUsuarioController.remove);

module.exports = router;
const express = require('express');
const router = express.Router();
const TipoServicoController = require('../controllers/tipoServico.controller');
const verificarToken = require('../middleware/auth.middleware');


router.get('/', TipoServicoController.findAll);


router.get('/:id', TipoServicoController.findById);




router.post('/', [verificarToken], TipoServicoController.create);


router.put('/:id', [verificarToken], TipoServicoController.update);


router.delete('/:id', [verificarToken], TipoServicoController.remove);

module.exports = router;
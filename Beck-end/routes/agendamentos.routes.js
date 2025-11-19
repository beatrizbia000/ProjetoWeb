const express = require('express');
const router = express.Router();
const AgendamentoController = require('../controllers/agendamento.controller');
const verificarToken = require('../middleware/auth.middleware');

router.get('/horarios-disponiveis', AgendamentoController.listarHorarios);
router.post('/', verificarToken, AgendamentoController.criarAgendamento);

module.exports = router;
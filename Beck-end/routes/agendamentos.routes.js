const express = require('express');
const router = express.Router();
const AgendamentoController = require('../controllers/agendamento.controller');
const verificarToken = require('../middleware/auth.middleware');

router.get('/horarios-disponiveis', AgendamentoController.listarHorarios);

router.post('/', verificarToken, AgendamentoController.criarAgendamento);

router.get('/meus-agendamentos', verificarToken, AgendamentoController.listarMeusAgendamentos);

router.post('/horario', verificarToken, AgendamentoController.criarHorario);

router.get('/alunos', verificarToken, AgendamentoController.listarAlunos);

router.put('/:agendamentoId/atribuir', verificarToken, AgendamentoController.atribuirAluno);

router.put('/:id/status', verificarToken, AgendamentoController.atualizarStatus);

router.put('/:id/cancelar', verificarToken, AgendamentoController.cancelarAgendamento);

module.exports = router;
const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const tiposServicoRoutes = require('./tiposServico.routes');
const usuariosRoutes = require('./usuario.routes');
const tiposUsuarioRoutes = require('./tiposUsuario.routes');
const agendamentosRoutes = require('./agendamentos.routes');

router.use('/auth', authRoutes);
router.use('/tipos-servico', tiposServicoRoutes);
router.use('/usuarios', usuariosRoutes);
router.use('/tipos-usuario', tiposUsuarioRoutes);
router.use('/agendamentos', agendamentosRoutes);

module.exports = router;
const express = require('express');
const router = express.Router();

// Importa todas as suas rotas
const authRoutes = require('./auth.routes');
const tiposServicoRoutes = require('./tiposServico.routes');
// ... (importe as outras 5 rotas aqui)
 const usuariosRoutes = require('./usuario.routes');
 const tiposUsuarioRoutes = require('./tiposUsuario.routes');
// const horariosRoutes = require('./horarios.routes');
// const agendamentosRoutes = require('./agendamentos.routes');
// const penalizacoesRoutes = require('./penalizacoes.routes');


// Define os prefixos da API
router.use('/auth', authRoutes);
router.use('/tipos-servico', tiposServicoRoutes);
router.use('/usuarios', usuariosRoutes);
router.use('/tipos-usuario', tiposUsuarioRoutes);
// router.use('/horarios', horariosRoutes);
// router.use('/agendamentos', agendamentosRoutes);
// router.use('/penalizacoes', penalizacoesRoutes);


module.exports = router;
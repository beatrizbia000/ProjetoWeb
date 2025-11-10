const UsuarioModel = require('../models/usuario.model');

const usuarioController = {
  
    listarTodos: async (req, res) => {
        try {
            const usuarios = await UsuarioModel.findAll();
            res.status(200).json(usuarios);
        } catch (error) {
            console.error('Erro ao listar usuários:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },

    
    criarUsuario: async (req, res) => {
        try {
            const { nome, email, senha, tipo } = req.body;

           
            if (!nome || !email || !senha) {
                return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
            }

            
            const usuarioExistente = await UsuarioModel.findByEmail(email);
            if (usuarioExistente) {
                return res.status(409).json({ message: 'Este email já está cadastrado.' }); 
            }

            
            const novoUsuario = await UsuarioModel.create({ nome, email, senha, tipo });
            
            
            const { senha: _, ...usuarioParaRetorno } = novoUsuario;
            usuarioParaRetorno.id = novoUsuario.id; 
            
            res.status(201).json(usuarioParaRetorno); 

        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },

  
     
    buscarPorEmail: async (req, res) => {
        try {
            const { email } = req.params; 
            const usuario = await UsuarioModel.findByEmail(email);

            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }
            
            
            const { senha: _, ...usuarioSemSenha } = usuario;

            res.status(200).json(usuarioSemSenha);

        } catch (error) {
            console.error('Erro ao buscar usuário por email:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
};

module.exports = usuarioController;
const UsuarioModel = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AuthController = {
  
  register: async (req, res) => {
    try {
      const { nome, email, senha, cnpj, cpf, tipo_usuario_id } = req.body;

      
      if (!nome || !email || !senha || !tipo_usuario_id) {
        return res.status(400).json({ message: 'Campos obrigatórios faltando.' });
      }

      
      const existingUser = await UsuarioModel.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({ message: 'Este email já está cadastrado.' });
      }

      
      const newUser = await UsuarioModel.create({ nome, email, senha, cnpj, cpf, tipo_usuario_id });

      
      res.status(201).json({ message: 'Usuário criado com sucesso!', usuario: newUser });

    } catch (error) {
      res.status(500).json({ message: 'Erro no servidor ao tentar registrar.', error: error.message });
    }
  },

  
  login: async (req, res) => {
    try {
      const { email, senha } = req.body;

    
      const user = await UsuarioModel.findByEmail(email);
      if (!user) {
        return res.status(404).json({ message: 'Email ou senha inválidos.' }); 
      }

      
      const isMatch = await bcrypt.compare(senha, user.senha);
      if (!isMatch) {
        return res.status(401).json({ message: 'Email ou senha inválidos.' });
      }

      
      if (user.status_bloqueio) {
          return res.status(403).json({ 
              message: 'Usuário bloqueado.', 
              data_fim_bloqueio: user.data_fim_bloqueio 
          });
      }

      
      const payload = {
        id: user.id,
        nome: user.nome,
        tipo: user.tipo_usuario_id
      };
      
      const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '8h' } 
      );

      
      res.status(200).json({
        message: 'Login bem-sucedido!',
        token: token,
        usuario: payload
      });

    } catch (error) {
      res.status(500).json({ message: 'Erro no servidor ao tentar logar.', error: error.message });
    }
  }
};

module.exports = AuthController;
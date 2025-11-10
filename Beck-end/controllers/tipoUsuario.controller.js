const TipoUsuarioModel = require('../models/tipoUsuario.model');

const TipoUsuarioController = {
  create: async (req, res) => {
    try {
      const novoTipo = await TipoUsuarioModel.create(req.body);
      res.status(201).json(novoTipo);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar tipo de usuário', error: error.message });
    }
  },

  findAll: async (req, res) => {
    try {
      const tipos = await TipoUsuarioModel.findAll();
      res.status(200).json(tipos);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar tipos de usuário', error: error.message });
    }
  },

  findById: async (req, res) => {
    try {
      const tipo = await TipoUsuarioModel.findById(req.params.id);
      if (!tipo) {
        return res.status(404).json({ message: 'Tipo de usuário não encontrado.' });
      }
      res.status(200).json(tipo);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar tipo de usuário', error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const affectedRows = await TipoUsuarioModel.update(req.params.id, req.body);
      if (affectedRows === 0) {
        return res.status(404).json({ message: 'Tipo de usuário não encontrado.' });
      }
      res.status(200).json({ message: 'Tipo de usuário atualizado com sucesso.' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar tipo de usuário', error: error.message });
    }
  },

  remove: async (req, res) => {
    try {
      const affectedRows = await TipoUsuarioModel.remove(req.params.id);
      if (affectedRows === 0) {
        return res.status(404).json({ message: 'Tipo de usuário não encontrado.' });
      }
      res.status(200).json({ message: 'Tipo de usuário excluído com sucesso.' });
    } catch (error) {
      
      if (error.message.includes('Não é possível excluir')) {
         return res.status(409).json({ message: error.message });
      }
      res.status(500).json({ message: 'Erro ao excluir tipo de usuário', error: error.message });
    }
  }
};

module.exports = TipoUsuarioController;
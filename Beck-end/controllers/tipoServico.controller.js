const TipoServicoModel = require('../models/tipoServico.model');

const TipoServicoController = {
  create: async (req, res) => {
    try {
      const novoServico = await TipoServicoModel.create(req.body);
      res.status(201).json(novoServico);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar tipo de serviço', error: error.message });
    }
  },

  findAll: async (req, res) => {
    try {
      const servicos = await TipoServicoModel.findAll();
      res.status(200).json(servicos);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar tipos de serviço', error: error.message });
    }
  },

  findById: async (req, res) => {
    try {
      const servico = await TipoServicoModel.findById(req.params.id);
      if (!servico) {
        return res.status(404).json({ message: 'Tipo de serviço não encontrado.' });
      }
      res.status(200).json(servico);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar tipo de serviço', error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const affectedRows = await TipoServicoModel.update(req.params.id, req.body);
      if (affectedRows === 0) {
        return res.status(404).json({ message: 'Tipo de serviço não encontrado.' });
      }
      res.status(200).json({ message: 'Tipo de serviço atualizado com sucesso.' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar tipo de serviço', error: error.message });
    }
  },

  remove: async (req, res) => {
    try {
      const affectedRows = await TipoServicoModel.remove(req.params.id);
      if (affectedRows === 0) {
        return res.status(404).json({ message: 'Tipo de serviço não encontrado.' });
      }
      res.status(200).json({ message: 'Tipo de serviço excluído com sucesso.' });
    } catch (error) {
      
      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
          return res.status(409).json({ message: 'Não é possível excluir. Este serviço está sendo usado em agendamentos.' });
      }
      res.status(500).json({ message: 'Erro ao excluir tipo de serviço', error: error.message });
    }
  }
};

module.exports = TipoServicoController;
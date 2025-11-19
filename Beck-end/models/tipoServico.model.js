// Beck-end/models/tipoServico.model.js
const TipoServicoDAO = require('../dao/tipoServico.dao');

const TipoServicoModel = {
  
  create: async ({ nome_servico }) => {
    try {
        const result = await TipoServicoDAO.insert(nome_servico);
        return { id: result.insertId, nome_servico };
    } catch (error) {
        console.error('Erro na Model ao criar serviço:', error);
        throw error;
    }
  },

  findAll: async () => {
    try {
        return await TipoServicoDAO.selectAll();
    } catch (error) {
        console.error('Erro na Model ao listar serviços:', error);
        throw error;
    }
  },

  findById: async (id) => {
    try {
        return await TipoServicoDAO.selectById(id);
    } catch (error) {
        console.error('Erro na Model ao buscar serviço por ID:', error);
        throw error;
    }
  },

  update: async (id, { nome_servico }) => {
    try {
        const result = await TipoServicoDAO.update(id, nome_servico);
        return result.affectedRows;
    } catch (error) {
        console.error('Erro na Model ao atualizar serviço:', error);
        throw error;
    }
  },

  remove: async (id) => {
    try {
        const result = await TipoServicoDAO.delete(id);
        return result.affectedRows;
    } catch (error) {
       
        console.error('Erro na Model ao remover serviço:', error);
        throw error;
    }
  }
};

module.exports = TipoServicoModel;
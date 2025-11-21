
const TipoUsuarioDAO = require('../dao/tipoUsuario.dao');

const TipoUsuarioModel = {
  
  create: async ({ nome }) => {
    try {
      const result = await TipoUsuarioDAO.insert(nome);
      return { id: result.insertId, nome };
    } catch (error) {
      console.error('Erro na Model ao criar tipo de usuário:', error);
      throw error;
    }
  },

  findAll: async () => {
    try {
      return await TipoUsuarioDAO.selectAll();
    } catch (error) {
      console.error('Erro na Model ao buscar tipos de usuário:', error);
      throw error;
    }
  },

  findById: async (id) => {
    try {
      return await TipoUsuarioDAO.selectById(id);
    } catch (error) {
      console.error('Erro na Model ao buscar tipo de usuário por ID:', error);
      throw error;
    }
  },

  update: async (id, { nome }) => {
    try {
      const result = await TipoUsuarioDAO.update(id, nome);
      return result.affectedRows;
    } catch (error) {
      console.error('Erro na Model ao atualizar tipo de usuário:', error);
      throw error;
    }
  },

  remove: async (id) => {
    try {
      const result = await TipoUsuarioDAO.delete(id);
      return result.affectedRows;
    } catch (error) {
      console.error('Erro na Model ao deletar tipo de usuário:', error);
      
      
      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        throw new Error('Não é possível excluir. Este perfil está sendo usado por usuários.');
      }
      throw error;
    }
  }
};

module.exports = TipoUsuarioModel;
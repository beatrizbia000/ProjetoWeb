const pool = require('../config/db');

const TipoUsuarioModel = {
  create: async ({ nome }) => {
    try {
      const sql = 'INSERT INTO TIPOS_USUARIO (nome) VALUES (?)';
      const [result] = await pool.query(sql, [nome]);
      return { id: result.insertId, nome };
    } catch (error) {
      console.error('Erro ao criar tipo de usuário:', error);
      throw error;
    }
  },

  findAll: async () => {
    try {
      const sql = 'SELECT * FROM TIPOS_USUARIO';
      const [rows] = await pool.query(sql);
      return rows;
    } catch (error) {
      console.error('Erro ao buscar tipos de usuário:', error);
      throw error;
    }
  },

  findById: async (id) => {
    try {
      const sql = 'SELECT * FROM TIPOS_USUARIO WHERE id = ?';
      const [rows] = await pool.query(sql, [id]);
      return rows[0];
    } catch (error) {
      console.error('Erro ao buscar tipo de usuário por ID:', error);
      throw error;
    }
  },

  update: async (id, { nome }) => {
    try {
      const sql = 'UPDATE TIPOS_USUARIO SET nome = ? WHERE id = ?';
      const [result] = await pool.query(sql, [nome, id]);
      return result.affectedRows;
    } catch (error) {
      console.error('Erro ao atualizar tipo de usuário:', error);
      throw error;
    }
  },

  remove: async (id) => {
    try {
      const sql = 'DELETE FROM TIPOS_USUARIO WHERE id = ?';
      const [result] = await pool.query(sql, [id]);
      return result.affectedRows;
    } catch (error) {
      console.error('Erro ao deletar tipo de usuário:', error);
      
      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        throw new Error('Não é possível excluir. Este perfil está sendo usado por usuários.');
      }
      throw error;
    }
  }
};

module.exports = TipoUsuarioModel;
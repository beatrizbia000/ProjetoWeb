const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const UsuarioModel = {
  
  create: async ({ nome, email, senha, cnpj, cpf, tipo_usuario_id }) => {
    try {
      
      const senhaHash = await bcrypt.hash(senha, 10);
      
      const sql = `INSERT INTO USUARIOS (nome, email, senha, cnpj, cpf, tipo_usuario_id) 
                   VALUES (?, ?, ?, ?, ?, ?)`;
                   
      const [result] = await pool.query(sql, [nome, email, senhaHash, cnpj, cpf, tipo_usuario_id]);
      
      
      return { id: result.insertId, nome, email, tipo_usuario_id };
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  },

  
  findByEmail: async (email) => {
    try {
      const sql = `SELECT * FROM USUARIOS WHERE email = ?`;
      const [rows] = await pool.query(sql, [email]);
      return rows[0]; 
    } catch (error) {
      console.error('Erro ao buscar por email:', error);
      throw error;
    }
  },

  
  findById: async (id) => {
    try {
      
      const sql = `SELECT id, nome, email, cnpj, cpf, tipo_usuario_id, status_bloqueio 
                   FROM USUARIOS WHERE id = ?`;
      const [rows] = await pool.query(sql, [id]);
      return rows[0];
    } catch (error) {
      console.error('Erro ao buscar por ID:', error);
      throw error;
    }
  }
  
  
};

module.exports = UsuarioModel;
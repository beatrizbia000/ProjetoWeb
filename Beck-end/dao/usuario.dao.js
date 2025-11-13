// Beck-end/dao/usuario.dao.js
const pool = require('../config/db');

const UsuarioDAO = {
  
    insert: async (dadosUsuario) => {
        const { nome, email, senha, cnpj, cpf, tipo_usuario_id } = dadosUsuario;
        
        const sql = `INSERT INTO USUARIOS (nome, email, senha, cnpj, cpf, tipo_usuario_id) 
                     VALUES (?, ?, ?, ?, ?, ?)`;
                     
        const [result] = await pool.query(sql, [nome, email, senha, cnpj, cpf, tipo_usuario_id]);
        return result;
    },

    selectByEmail: async (email) => {
        const sql = `SELECT * FROM USUARIOS WHERE email = ?`;
        const [rows] = await pool.query(sql, [email]);
        return rows[0];
    },

    selectById: async (id) => {
        const sql = `SELECT id, nome, email, cnpj, cpf, tipo_usuario_id, status_bloqueio 
                     FROM USUARIOS WHERE id = ?`;
        const [rows] = await pool.query(sql, [id]);
        return rows[0];
    },

    selectAll: async () => {
        // Caso você queira mover o listarTodos também
        const sql = `SELECT id, nome, email, tipo_usuario_id FROM USUARIOS`; 
        const [rows] = await pool.query(sql);
        return rows;
    }
};

module.exports = UsuarioDAO;
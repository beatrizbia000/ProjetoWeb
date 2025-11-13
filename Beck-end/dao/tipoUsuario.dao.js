// Beck-end/dao/tipoUsuario.dao.js
const pool = require('../config/db');

const TipoUsuarioDAO = {

    insert: async (nome) => {
        const sql = 'INSERT INTO TIPOS_USUARIO (nome) VALUES (?)';
        const [result] = await pool.query(sql, [nome]);
        return result;
    },

    selectAll: async () => {
        const sql = 'SELECT * FROM TIPOS_USUARIO';
        const [rows] = await pool.query(sql);
        return rows;
    },

    selectById: async (id) => {
        const sql = 'SELECT * FROM TIPOS_USUARIO WHERE id = ?';
        const [rows] = await pool.query(sql, [id]);
        return rows[0];
    },

    update: async (id, nome) => {
        const sql = 'UPDATE TIPOS_USUARIO SET nome = ? WHERE id = ?';
        const [result] = await pool.query(sql, [nome, id]);
        return result;
    },

    delete: async (id) => {
        const sql = 'DELETE FROM TIPOS_USUARIO WHERE id = ?';
        const [result] = await pool.query(sql, [id]);
        return result;
    }
};

module.exports = TipoUsuarioDAO;
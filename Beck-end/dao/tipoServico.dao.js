// Beck-end/dao/tipoServico.dao.js
const pool = require('../config/db');

const TipoServicoDAO = {

    insert: async (nome_servico) => {
        const sql = 'INSERT INTO TIPOS_SERVICO (nome_servico) VALUES (?)';
        const [result] = await pool.query(sql, [nome_servico]);
        return result;
    },

    selectAll: async () => {
        const sql = 'SELECT * FROM TIPOS_SERVICO';
        const [rows] = await pool.query(sql);
        return rows;
    },

    selectById: async (id) => {
        const sql = 'SELECT * FROM TIPOS_SERVICO WHERE id = ?';
        const [rows] = await pool.query(sql, [id]);
        return rows[0];
    },

    update: async (id, nome_servico) => {
        const sql = 'UPDATE TIPOS_SERVICO SET nome_servico = ? WHERE id = ?';
        const [result] = await pool.query(sql, [nome_servico, id]);
        return result;
    },

    delete: async (id) => {
        const sql = 'DELETE FROM TIPOS_SERVICO WHERE id = ?';
        const [result] = await pool.query(sql, [id]);
        return result;
    }
};

module.exports = TipoServicoDAO;
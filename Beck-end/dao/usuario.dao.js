const pool = require('../config/db');

const UsuarioDAO = {
    insert: async (dadosUsuario) => {
        const { nome, email, senha, cnpj, cpf, tipo_usuario_id } = dadosUsuario;
        const sql = `INSERT INTO USUARIOS (nome, email, senha, cnpj, cpf, tipo_usuario_id) VALUES (?, ?, ?, ?, ?, ?)`;
        const [result] = await pool.query(sql, [nome, email, senha, cnpj, cpf, tipo_usuario_id]);
        return result;
    },

    selectByEmail: async (email) => {
        const sql = `SELECT * FROM USUARIOS WHERE email = ?`;
        const [rows] = await pool.query(sql, [email]);
        return rows[0];
    },

    selectById: async (id) => {
        // CORREÇÃO: Incluído o campo 'senha'
        const sql = `SELECT id, nome, email, senha, cnpj, cpf, tipo_usuario_id, status_bloqueio FROM USUARIOS WHERE id = ?`;
        const [rows] = await pool.query(sql, [id]);
        return rows[0];
    },

    selectAll: async () => {
        const sql = `SELECT id, nome, email, tipo_usuario_id FROM USUARIOS`; 
        const [rows] = await pool.query(sql);
        return rows;
    },

    update: async (id, dados) => {
        const sql = `UPDATE USUARIOS SET nome = ?, email = ?, cpf = ?, cnpj = ? WHERE id = ?`;
        const [result] = await pool.query(sql, [dados.nome, dados.email, dados.cpf, dados.cnpj, id]);
        return result;
    },

    updateSenha: async (id, novaSenha) => {
        const sql = `UPDATE USUARIOS SET senha = ? WHERE id = ?`;
        const [result] = await pool.query(sql, [novaSenha, id]);
        return result;
    }
};

module.exports = UsuarioDAO;
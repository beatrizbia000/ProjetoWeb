const UsuarioDAO = require('../dao/usuario.dao'); 
const bcrypt = require('bcryptjs');

const UsuarioModel = {
  
    create: async ({ nome, email, senha, cnpj, cpf, tipo_usuario_id }) => {
        try {
            const senhaHash = await bcrypt.hash(senha, 10);
            
            const novoUsuario = {
                nome,
                email,
                senha: senhaHash, 
                cnpj,
                cpf,
                tipo_usuario_id
            };

            const result = await UsuarioDAO.insert(novoUsuario);
            return { id: result.insertId, nome, email, tipo_usuario_id };

        } catch (error) {
            console.error('Erro na Model ao criar usuário:', error);
            throw error;
        }
    },

    findByEmail: async (email) => {
        try {
            return await UsuarioDAO.selectByEmail(email);
        } catch (error) {
            console.error('Erro na Model ao buscar por email:', error);
            throw error;
        }
    },

    findById: async (id) => {
        try {
            return await UsuarioDAO.selectById(id);
        } catch (error) {
            console.error('Erro na Model ao buscar por ID:', error);
            throw error;
        }
    },

    findAll: async () => {
        try {
            return await UsuarioDAO.selectAll();
        } catch (error) {
            console.error('Erro na Model ao listar todos:', error);
            throw error;
        }
    },

    update: async (id, dados) => {
        try {
            const result = await UsuarioDAO.update(id, dados);
            return result.affectedRows;
        } catch (error) {
            console.error('Erro na Model ao atualizar usuário:', error);
            throw error;
        }
    },

    atualizarSenha: async (id, novaSenha) => {
        try {
            const result = await UsuarioDAO.updateSenha(id, novaSenha);
            return result.affectedRows;
        } catch (error) {
            console.error('Erro na Model ao atualizar senha:', error);
            throw error;
        }
    }
};

module.exports = UsuarioModel;
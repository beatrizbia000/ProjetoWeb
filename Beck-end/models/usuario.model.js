// Beck-end/models/usuario.model.js
const UsuarioDAO = require('../dao/usuario.dao'); // Importa o DAO que criamos
const bcrypt = require('bcryptjs');

const UsuarioModel = {
  
    create: async ({ nome, email, senha, cnpj, cpf, tipo_usuario_id }) => {
        try {
            // 1. REGRA DE NEGÓCIO: Criptografar a senha aqui na Model
            const senhaHash = await bcrypt.hash(senha, 10);
            
            // 2. Prepara o objeto para o DAO
            const novoUsuario = {
                nome,
                email,
                senha: senhaHash, // Manda a senha já criptografada
                cnpj,
                cpf,
                tipo_usuario_id
            };

            // 3. CHAMADA AO DAO: Apenas persiste os dados
            const result = await UsuarioDAO.insert(novoUsuario);
            
            // 4. Retorna o objeto formatado para o Controller
            return { id: result.insertId, nome, email, tipo_usuario_id };

        } catch (error) {
            console.error('Erro na Model ao criar usuário:', error);
            throw error;
        }
    },

    findByEmail: async (email) => {
        try {
            // Chama o DAO diretamente
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
    }
};

module.exports = UsuarioModel;
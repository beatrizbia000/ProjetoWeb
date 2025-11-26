const pool = require('../config/db');

const ID_ALUNO = 1;
const ID_PROFESSOR = 2;
const ID_ADMIN = 3;
const ID_MEI = 4;

const AgendamentoDAO = {
    listarHorariosDisponiveis: async () => {
        const sql = `
            SELECT h.id, h.data_horario, u.nome as nome_professor
            FROM HORARIOS_DISPONIVEIS h
            JOIN USUARIOS u ON h.criado_por_id = u.id
            WHERE h.status = 'Disponível' 
            AND h.data_horario > NOW() 
            ORDER BY h.data_horario ASC
        `;
        const [rows] = await pool.query(sql);
        return rows;
    },

    criar: async (dados) => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            const sqlAgendamento = `
                INSERT INTO AGENDAMENTOS (usuario_id, horario_id, tipo_servico_id, status) 
                VALUES (?, ?, ?, 'agendado')
            `;
            
            const [result] = await connection.query(sqlAgendamento, [
                dados.usuario_id, 
                dados.horario_id, 
                dados.tipo_servico_id
            ]);

            const sqlUpdateHorario = `
                UPDATE HORARIOS_DISPONIVEIS 
                SET status = 'Reservado' 
                WHERE id = ?
            `;
            await connection.query(sqlUpdateHorario, [dados.horario_id]);

            await connection.commit();
            return result;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    },

    listarPorPerfil: async (usuarioId, tipoUsuarioId) => {
        let sql = `
            SELECT 
                a.id, a.status, 
                ts.nome_servico, 
                hd.data_horario,
                u_cliente.nome as nome_cliente,
                u_cliente.email as email_cliente,
                u_aluno.nome as nome_aluno,
                u_professor.nome as nome_professor
            FROM AGENDAMENTOS a
            JOIN TIPOS_SERVICO ts ON a.tipo_servico_id = ts.id
            JOIN HORARIOS_DISPONIVEIS hd ON a.horario_id = hd.id
            JOIN USUARIOS u_cliente ON a.usuario_id = u_cliente.id
            LEFT JOIN USUARIOS u_aluno ON a.aluno_voluntario_id = u_aluno.id
            LEFT JOIN USUARIOS u_professor ON hd.criado_por_id = u_professor.id
        `;

        const params = [];

        if (tipoUsuarioId === ID_MEI) { 
            sql += ` WHERE a.usuario_id = ?`;
            params.push(usuarioId);
        } else if (tipoUsuarioId === ID_ALUNO) { 
            sql += ` WHERE a.aluno_voluntario_id = ?`;
            params.push(usuarioId);
        } 
     
        sql += ` ORDER BY hd.data_horario DESC`;

        const [rows] = await pool.query(sql, params);
        return rows;
    },

    atribuirAluno: async (agendamentoId, alunoId) => {
        const sql = `UPDATE AGENDAMENTOS SET aluno_voluntario_id = ? WHERE id = ?`;
        const [result] = await pool.query(sql, [alunoId, agendamentoId]);
        return result.affectedRows;
    },

    criarHorario: async (data_horario, criado_por_id) => {
        const sql = `INSERT INTO HORARIOS_DISPONIVEIS (data_horario, status, criado_por_id) VALUES (?, 'Disponível', ?)`;
        const [result] = await pool.query(sql, [data_horario, criado_por_id]);
        return result;
    },

    listarAlunos: async () => {
        const sql = "SELECT id, nome FROM USUARIOS WHERE tipo_usuario_id = ?";
        const [rows] = await pool.query(sql, [ID_ALUNO]);
        return rows;
    },

    atualizarStatus: async (id, status) => {
        const sql = `UPDATE AGENDAMENTOS SET status = ? WHERE id = ?`;
        const [result] = await pool.query(sql, [status, id]);
        return result.affectedRows;
    }
};

module.exports = AgendamentoDAO;
const pool = require('../config/db');

const AgendamentoDAO = {
    
    listarHorariosDisponiveis: async () => {
        const sql = `
            SELECT id, data_horario 
            FROM HORARIOS_DISPONIVEIS 
            WHERE status = 'Disponível' 
            AND data_horario > NOW() 
            ORDER BY data_horario ASC
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
    }
};

module.exports = AgendamentoDAO;
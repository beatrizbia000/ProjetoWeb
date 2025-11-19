const AgendamentoDAO = require('../dao/agendamento.dao');

const AgendamentoController = {
    listarHorarios: async (req, res) => {
        try {
            const horarios = await AgendamentoDAO.listarHorariosDisponiveis();
            res.status(200).json(horarios);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar horários.' });
        }
    },

    criarAgendamento: async (req, res) => {
        try {
            const { horario_id, tipo_servico_id } = req.body;
            const usuario_id = req.usuario.id; 

            
            
            if (!horario_id || !tipo_servico_id) {
                return res.status(400).json({ message: 'Horário e Serviço são obrigatórios.' });
            }

            await AgendamentoDAO.criar({ usuario_id, horario_id, tipo_servico_id });
            res.status(201).json({ message: 'Agendamento realizado com sucesso!' });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao realizar agendamento.' });
        }
    }
};

module.exports = AgendamentoController;
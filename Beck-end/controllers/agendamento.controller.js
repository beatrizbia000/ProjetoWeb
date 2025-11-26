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
    },

    listarMeusAgendamentos: async (req, res) => {
        try {
            const { id, tipo } = req.usuario; 
            const agendamentos = await AgendamentoDAO.listarPorPerfil(id, tipo);
            res.status(200).json(agendamentos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar agendamentos.' });
        }
    },

    cancelarAgendamento: async (req, res) => {
        try {
            const { id } = req.params;
            await AgendamentoDAO.cancelar(id);
            res.status(200).json({ message: 'Agendamento cancelado e horário liberado com sucesso!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao cancelar agendamento.' });
        }
    },

    atribuirAluno: async (req, res) => {
        try {
            if (req.usuario.tipo > 2) {
                return res.status(403).json({ message: 'Apenas professores podem atribuir alunos.' });
            }

            const { agendamentoId } = req.params;
            const { alunoId } = req.body;

            await AgendamentoDAO.atribuirAluno(agendamentoId, alunoId);
            res.status(200).json({ message: 'Aluno atribuído com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atribuir aluno.' });
        }
    },

    criarHorario: async (req, res) => {
        try {
           if (req.usuario.tipo !== 2 && req.usuario.tipo !== 3) { 
        return res.status(403).json({ message: 'Acesso negado.' });
    }
            const { data_horario } = req.body;
            await AgendamentoDAO.criarHorario(data_horario, req.usuario.id);
            res.status(201).json({ message: 'Horário criado com sucesso.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar horário.' });
        }
    },

    atualizarStatus: async (req, res) => {
        try {
            if (req.usuario.tipo !== 2 && req.usuario.tipo !== 3) {
                return res.status(403).json({ message: 'Acesso negado.' });
            }

            const { id } = req.params;
            const { status } = req.body; 

            await AgendamentoDAO.atualizarStatus(id, status);
            res.status(200).json({ message: 'Status atualizado com sucesso!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao atualizar status.' });
        }
    },
    
    listarAlunos: async (req, res) => {
        try {
            const alunos = await AgendamentoDAO.listarAlunos();
            res.status(200).json(alunos);
        } catch(error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao listar alunos' });
        }
    }
};

module.exports = AgendamentoController;
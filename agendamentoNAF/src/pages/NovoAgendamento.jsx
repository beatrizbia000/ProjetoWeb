import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import {
  FaStore, FaInfoCircle, FaClock
} from "react-icons/fa";

function NovoAgendamento() {
  const navigate = useNavigate();
  const API_URL = "http://localhost:3001/api";

  const PERFIL_MEI = 4;

  const [usuario, setUsuario] = useState(null);
  const [servicos, setServicos] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedServico, setSelectedServico] = useState("");
  const [selectedHorario, setSelectedHorario] = useState("");
  const [clienteExterno, setClienteExterno] = useState("");
  const [observacao, setObservacao] = useState("");

  const [mensagem, setMensagem] = useState({ tipo: "", texto: "" });

  useEffect(() => {
    const carregarDados = async () => {
      const token = localStorage.getItem("token");
      const usuarioSalvo = localStorage.getItem("usuario");

      if (!token || !usuarioSalvo) {
        navigate("/");
        return;
      }

      const userObj = JSON.parse(usuarioSalvo);
      setUsuario(userObj);

      try {
        const [resServicos, resHorarios] = await Promise.all([
          axios.get(`${API_URL}/tipos-servico`),
          axios.get(`${API_URL}/agendamentos/horarios-disponiveis`)
        ]);

        setServicos(resServicos.data);
        setHorarios(resHorarios.data);
      } catch (error) {
        console.error("Erro ao carregar dados", error);
        setMensagem({ tipo: "erro", texto: "Erro de conexão com o servidor." });
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!selectedServico || !selectedHorario) {
      setMensagem({ tipo: "erro", texto: "Por favor, selecione um serviço e um horário." });
      return;
    }

    try {
      const payload = {
        horario_id: selectedHorario,
        tipo_servico_id: selectedServico,
        cliente_nome: clienteExterno || usuario.nome,
        observacao: observacao
      };

      await axios.post(`${API_URL}/agendamentos`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMensagem({ tipo: "sucesso", texto: "Agendamento confirmado com sucesso!" });
      setTimeout(() => navigate("/home"), 2000);

    } catch (error) {
      console.error(error);
      setMensagem({ tipo: "erro", texto: "Não foi possível realizar o agendamento." });
    }
  };

  const getPerfilConfig = () => {
    if (!usuario) return {};
    switch (usuario.tipo) {
      case PERFIL_MEI:
        return {
          titulo: "Área do Empreendedor",
          descricao: "Agende seu atendimento gratuito.",
          cor: "bg-blue-600",
          corTexto: "text-blue-600",
          icone: <FaStore className="text-4xl text-blue-600" />,
          labelServico: "Qual serviço você necessita?",
          permiteClienteExterno: false
        };

      default:
        return { titulo: "Novo Agendamento", cor: "bg-gray-600", labelServico: "Serviço:" };
    }
  };

  const config = getPerfilConfig();

  if (loading) return <div className="flex justify-center items-center h-screen">Carregando...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Header />

      <main className="flex-grow flex flex-col items-center pt-8 px-4 pb-12">
        <div className="w-full max-w-4xl bg-white rounded-t-2xl shadow-sm border-b border-gray-100 p-6 flex items-center gap-4">
          <div className="p-3 bg-gray-50 rounded-full">{config.icone}</div>
          <div>
            <h1 className={`text-2xl font-bold ${config.corTexto}`}>{config.titulo}</h1>
            <p className="text-gray-500 text-sm">{config.descricao}</p>
          </div>
        </div>

        <div className="bg-white w-full max-w-4xl rounded-b-2xl shadow-lg p-8">
          {mensagem.texto && (
            <div className={`mb-6 p-4 rounded-lg flex items-center gap-2 text-sm font-medium ${mensagem.tipo === 'sucesso' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              <FaInfoCircle /> {mensagem.texto}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">{config.labelServico}</label>
              <select
                className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={selectedServico}
                onChange={(e) => setSelectedServico(e.target.value)}
              >
                <option value="">Selecione uma opção...</option>
                {servicos.map(servico => (
                  <option key={servico.id} value={servico.id}>{servico.nome_servico}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3 flex justify-between items-center">
                <span>Horários e Professores Disponíveis</span>
                <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{horarios.length} disponíveis</span>
              </label>

              {horarios.length === 0 ? (
                <div className="py-8 text-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
                  <p className="text-gray-500">Nenhum horário disponível na agenda pública no momento.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {horarios.map(horario => {
                    const data = new Date(horario.data_horario);
                    const dia = data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
                    const hora = data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                    const isSelected = String(selectedHorario) === String(horario.id);

                    return (
                      <div
                        key={horario.id}
                        onClick={() => setSelectedHorario(horario.id)}
                        className={`
                                    cursor-pointer relative p-4 rounded-xl border transition-all duration-200
                                   ${isSelected
                            ? `bg-blue-600 text-white border-transparent shadow-md scale-105 ring-2 ring-offset-1 ring-blue-300`
                            : 'bg-white text-gray-700 border-gray-200 hover:border-blue-400 hover:shadow-md'}
                                     `}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className={`text-xs font-bold uppercase ${isSelected ? 'text-blue-200' : 'text-gray-400'}`}>Dia</span>
                          <FaClock className={isSelected ? 'text-white' : 'text-blue-500'} />
                        </div>

                        <p className="text-2xl font-bold leading-none mb-1">{dia}</p>
                        <p className="text-lg font-semibold mb-3">{hora}</p>

                        <div className={`h-px w-full my-2 ${isSelected ? 'bg-white/30' : 'bg-gray-100'}`}></div>

                        <div className="text-center">
                          <p className={`text-[10px] uppercase tracking-wide mb-1 ${isSelected ? 'text-blue-200' : 'text-gray-400'}`}>
                            Professor(a)
                          </p>
                          <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-gray-800'}`}>
                            {horario.nome_professor}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={horarios.length === 0}
                className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all shadow-lg hover:shadow-xl active:scale-[0.99]
                            ${horarios.length === 0 ? 'bg-gray-300 cursor-not-allowed opacity-70' : 'bg-blue-600 hover:opacity-90'}
                        `}
              >
                Confirmar Agendamento
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default NovoAgendamento;
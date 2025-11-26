import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Header from "../components/Header";
import { FaStore, FaInfoCircle, FaClock } from "react-icons/fa";

function NovoAgendamento() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [servicos, setServicos] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedServico, setSelectedServico] = useState("");
  const [selectedHorario, setSelectedHorario] = useState("");
  const [observacao, setObservacao] = useState("");
  const [mensagem, setMensagem] = useState({ tipo: "", texto: "" });

  useEffect(() => {
    const carregarDados = async () => {
      const token = localStorage.getItem("token");
      const usuarioSalvo = localStorage.getItem("usuario");
      if (!token || !usuarioSalvo) return navigate("/");

      setUsuario(JSON.parse(usuarioSalvo));

      try {
        const [resServicos, resHorarios] = await Promise.all([
          api.get('/tipos-servico'),
          api.get('/agendamentos/horarios-disponiveis')
        ]);
        setServicos(resServicos.data);
        setHorarios(resHorarios.data);
      } catch (error) {
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
    if (!selectedServico || !selectedHorario) return setMensagem({ tipo: "erro", texto: "Selecione serviço e horário." });

    try {
      await api.post('/agendamentos', {
        horario_id: selectedHorario,
        tipo_servico_id: selectedServico,
        observacao: observacao
      }, { headers: { Authorization: `Bearer ${token}` } });

      setMensagem({ tipo: "sucesso", texto: "Agendamento confirmado!" });
      setTimeout(() => navigate("/home"), 2000);
    } catch (error) {
      setMensagem({ tipo: "erro", texto: "Não foi possível agendar." });
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Carregando...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Header />
      <main className="flex-grow flex flex-col items-center pt-8 px-4 pb-12">
        <div className="w-full max-w-4xl bg-white rounded-t-2xl shadow-sm border-b p-6 flex items-center gap-4">
          <div className="p-3 bg-gray-50 rounded-full"><FaStore className="text-4xl text-blue-600" /></div>
          <div><h1 className="text-2xl font-bold text-blue-600">Área do Empreendedor</h1><p className="text-gray-500 text-sm">Agende seu atendimento gratuito.</p></div>
        </div>

        <div className="bg-white w-full max-w-4xl rounded-b-2xl shadow-lg p-8">
          {mensagem.texto && <div className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${mensagem.tipo === 'sucesso' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}><FaInfoCircle /> {mensagem.texto}</div>}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Qual serviço você necessita?</label>
              <select className="w-full p-3 bg-white border rounded-lg" value={selectedServico} onChange={(e) => setSelectedServico(e.target.value)}>
                <option value="">Selecione...</option>
                {servicos.map(s => (<option key={s.id} value={s.id}>{s.nome_servico}</option>))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3 flex justify-between">
                <span>Horários e Professores Disponíveis</span>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{horarios.length} disponíveis</span>
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {horarios.map(h => (
                  <div key={h.id} onClick={() => setSelectedHorario(h.id)} 
                       className={`cursor-pointer p-4 rounded-xl border transition-all ${String(selectedHorario) === String(h.id) ? 'bg-blue-600 text-white shadow-md scale-105' : 'bg-white text-gray-700 hover:border-blue-400 hover:shadow-md'}`}>
                    <div className="flex justify-between items-center mb-2"><span className="text-xs font-bold uppercase">Dia</span><FaClock /></div>
                    <p className="text-2xl font-bold">{new Date(h.data_horario).toLocaleDateString('pt-BR', {day:'2-digit', month:'2-digit'})}</p>
                    <p className="text-lg font-semibold mb-3">{new Date(h.data_horario).toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'})}</p>
                    <div className="h-px w-full my-2 bg-white/30"></div>
                    <div className="text-center"><p className="text-[10px] uppercase">Professor(a)</p><span className="text-xs font-bold">{h.nome_professor}</span></div>
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="w-full py-4 rounded-xl font-bold text-white text-lg bg-blue-600 hover:opacity-90 shadow-lg">Confirmar Agendamento</button>
          </form>
        </div>
      </main>
    </div>
  );
}
export default NovoAgendamento;
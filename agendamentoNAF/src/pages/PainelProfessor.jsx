import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import { 
  FaUserGraduate, 
  FaCheckCircle, 
  FaExclamationCircle, 
  FaClock, 
  FaPlus, 
  FaEdit, 
  FaCheck, 
  FaTimes,
  FaSave
} from "react-icons/fa";

export default function PainelProfessor() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState({ tipo: "", texto: "" });
  
  
  const [selecoesPendentes, setSelecoesPendentes] = useState({});
  
 
  const [novoHorario, setNovoHorario] = useState("");

  
  const [editandoId, setEditandoId] = useState(null); 
  const [alunoEditadoId, setAlunoEditadoId] = useState(""); 

  const API_URL = "http://localhost:3001/api";

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    const token = localStorage.getItem("token");
    try {
      const [resAgendamentos, resAlunos] = await Promise.all([
        axios.get(`${API_URL}/agendamentos/meus-agendamentos`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_URL}/agendamentos/alunos`, { headers: { Authorization: `Bearer ${token}` } })
      ]);
      setAgendamentos(resAgendamentos.data);
      setAlunos(resAlunos.data);
    } catch (error) {
      console.error("Erro ao carregar painel", error);
    } finally {
      setLoading(false);
    }
  };

 
  const handleCriarHorario = async (e) => {
    e.preventDefault();
    if (!novoHorario) return;
    const token = localStorage.getItem("token");
    try {
        await axios.post(`${API_URL}/agendamentos/horario`, 
            { data_horario: novoHorario },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setMensagem({ tipo: "sucesso", texto: "Horário disponibilizado!" });
        setNovoHorario("");
    } catch (error) {
        setMensagem({ tipo: "erro", texto: "Erro ao criar horário." });
    }
  };

  
  const handleAtribuirPendente = async (agendamentoId) => {
    const alunoId = selecoesPendentes[agendamentoId];
    if (!alunoId) {
      alert("Selecione um aluno.");
      return;
    }
    salvarAtribuicao(agendamentoId, alunoId);
  };

 
  const salvarAtribuicao = async (agendamentoId, alunoId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(`${API_URL}/agendamentos/${agendamentoId}/atribuir`,
        { alunoId: alunoId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMensagem({ tipo: "sucesso", texto: "Aluno atribuído/atualizado com sucesso!" });
      setEditandoId(null);
      carregarDados();
    } catch (error) {
      alert("Erro ao atribuir aluno.");
    }
  };

  
  const handleConcluir = async (agendamentoId) => {
    if (!window.confirm("Deseja marcar este atendimento como CONCLUÍDO?")) return;
    
    const token = localStorage.getItem("token");
    try {
        await axios.put(`${API_URL}/agendamentos/${agendamentoId}/status`, 
            { status: 'realizado' },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setMensagem({ tipo: "sucesso", texto: "Atendimento concluído!" });
        carregarDados();
    } catch (error) {
        alert("Erro ao concluir atendimento.");
    }
  };

  
  const iniciarEdicao = (item) => {
    setEditandoId(item.id);
   
    const alunoAtual = alunos.find(a => a.nome === item.nome_aluno);
    setAlunoEditadoId(alunoAtual ? alunoAtual.id : "");
  };

  
  const cancelarEdicao = () => {
    setEditandoId(null);
    setAlunoEditadoId("");
  };

  
  const pendentes = agendamentos.filter(a => !a.nome_aluno && a.status === 'agendado');
  const emAndamento = agendamentos.filter(a => a.nome_aluno && a.status === 'agendado');
  const historico = agendamentos.filter(a => a.status === 'realizado' || a.status === 'cancelado');

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      <Header />
      
      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Painel do Professor</h1>

        {mensagem.texto && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${mensagem.tipo === 'sucesso' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            <FaCheckCircle /> {mensagem.texto}
          </div>
        )}

        
        <section className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 mb-8">
            <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                <FaClock /> Disponibilizar Horário
            </h2>
            <form onSubmit={handleCriarHorario} className="flex gap-4 items-end">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data e Hora</label>
                    <input 
                        type="datetime-local" 
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        value={novoHorario}
                        onChange={(e) => setNovoHorario(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2">
                    <FaPlus size={14}/> Adicionar
                </button>
            </form>
        </section>

       
        <section className="mb-12">
          <h2 className="text-xl font-bold text-yellow-600 mb-4 flex items-center gap-2">
            <FaExclamationCircle /> Solicitações Pendentes ({pendentes.length})
          </h2>
          {pendentes.length === 0 ? (
            <p className="text-gray-400 italic bg-gray-50 p-4 rounded border border-dashed">Nenhuma solicitação pendente.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {pendentes.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-400">
                  <h3 className="font-bold text-lg">{item.nome_servico}</h3>
                  <p className="text-sm text-gray-500 mb-2">Cliente: {item.nome_cliente}</p>
                  <p className="font-bold text-gray-800 text-sm mb-4">
                    {new Date(item.data_horario).toLocaleDateString('pt-BR')} às {new Date(item.data_horario).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}
                  </p>
                  
                  <div className="flex gap-2">
                    <select 
                      className="flex-1 p-2 border border-gray-300 rounded-lg text-sm bg-gray-50"
                      onChange={(e) => setSelecoesPendentes({...selecoesPendentes, [item.id]: e.target.value})}
                      defaultValue=""
                    >
                      <option value="" disabled>Selecione aluno...</option>
                      {alunos.map(aluno => (<option key={aluno.id} value={aluno.id}>{aluno.nome}</option>))}
                    </select>
                    <button onClick={() => handleAtribuirPendente(item.id)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition">OK</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

       
        <section>
          <h2 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
            <FaUserGraduate /> Atendimentos Agendados ({emAndamento.length})
          </h2>
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
                <tr>
                  <th className="p-4">Data</th>
                  <th className="p-4">Serviço/Cliente</th>
                  <th className="p-4">Aluno Responsável</th>
                  <th className="p-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {emAndamento.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                  
                    <td className="p-4">
                      <div className="font-bold text-gray-700">{new Date(item.data_horario).toLocaleDateString('pt-BR')}</div>
                      <div className="text-gray-500">{new Date(item.data_horario).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}</div>
                    </td>

                   
                    <td className="p-4">
                      <div className="font-semibold">{item.nome_servico}</div>
                      <div className="text-gray-500 text-xs">{item.nome_cliente}</div>
                    </td>

                   
                    <td className="p-4">
                        {editandoId === item.id ? (
                            <div className="flex flex-col gap-1">
                                <select 
                                    className="p-2 border border-blue-300 rounded bg-blue-50 text-sm w-full"
                                    value={alunoEditadoId}
                                    onChange={(e) => setAlunoEditadoId(e.target.value)}
                                >
                                    <option value="" disabled>Trocar aluno...</option>
                                    {alunos.map(aluno => (
                                        <option key={aluno.id} value={aluno.id}>{aluno.nome}</option>
                                    ))}
                                </select>
                            </div>
                        ) : (
                            <span className="text-blue-700 font-bold bg-blue-100 px-2 py-1 rounded text-xs">
                                {item.nome_aluno}
                            </span>
                        )}
                    </td>

                    
                    <td className="p-4">
                        <div className="flex justify-center gap-2">
                            {editandoId === item.id ? (
                                <>
                                    <button 
                                        onClick={() => salvarAtribuicao(item.id, alunoEditadoId)}
                                        className="p-2 bg-green-600 text-white rounded hover:bg-green-700" title="Salvar Aluno"
                                    >
                                        <FaSave />
                                    </button>
                                    <button 
                                        onClick={cancelarEdicao}
                                        className="p-2 bg-gray-400 text-white rounded hover:bg-gray-500" title="Cancelar Edição"
                                    >
                                        <FaTimes />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button 
                                        onClick={() => iniciarEdicao(item)}
                                        className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
                                        title="Editar Aluno (Corrigir)"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button 
                                        onClick={() => handleConcluir(item.id)}
                                        className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-xs font-bold flex items-center gap-1"
                                        title="Concluir Atendimento"
                                    >
                                        <FaCheck /> Concluir
                                    </button>
                                </>
                            )}
                        </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {emAndamento.length === 0 && <div className="p-6 text-center text-gray-400">Nenhum atendimento em andamento.</div>}
          </div>
        </section>

        
        {historico.length > 0 && (
            <section className="mt-12 opacity-75">
                <h3 className="text-lg font-bold text-gray-500 mb-4">Histórico Recente</h3>
                <div className="bg-white rounded-xl shadow p-4 text-sm">
                    {historico.map(item => (
                        <div key={item.id} className="flex justify-between py-2 border-b last:border-0 border-gray-100">
                            <span>{item.nome_servico} - {item.nome_cliente}</span>
                            <span className={`font-bold px-2 py-0.5 rounded text-xs ${item.status === 'realizado' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {item.status.toUpperCase()}
                            </span>
                        </div>
                    ))}
                </div>
            </section>
        )}

      </main>
    </div>
  );
}
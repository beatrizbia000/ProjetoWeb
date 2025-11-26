import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Header from "../components/Header";
import { FaUserGraduate, FaCheckCircle, FaExclamationCircle, FaEdit, FaCheck, FaTimes, FaSave } from "react-icons/fa";

export default function PainelProfessor() {
  const navigate = useNavigate();
  const [agendamentos, setAgendamentos] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [mensagem, setMensagem] = useState({ tipo: "", texto: "" });
  const [selecoesPendentes, setSelecoesPendentes] = useState({});
  const [editandoId, setEditandoId] = useState(null);
  const [alunoEditadoId, setAlunoEditadoId] = useState("");

  useEffect(() => { carregarDados(); }, []);

  const carregarDados = async () => {
    const token = localStorage.getItem("token");
    try {
      const [resAg, resAl] = await Promise.all([
        api.get('/agendamentos/meus-agendamentos', { headers: { Authorization: `Bearer ${token}` } }),
        api.get('/agendamentos/alunos', { headers: { Authorization: `Bearer ${token}` } })
      ]);
      setAgendamentos(resAg.data);
      setAlunos(resAl.data);
    } catch (error) { console.error(error); }
  };

  const handleAtribuir = async (agendamentoId, alunoId) => {
    const token = localStorage.getItem("token");
    try {
      await api.put(`/agendamentos/${agendamentoId}/atribuir`, { alunoId }, { headers: { Authorization: `Bearer ${token}` } });
      setMensagem({ tipo: "sucesso", texto: "Aluno atribuído!" });
      setEditandoId(null);
      carregarDados();
    } catch (error) { alert("Erro ao atribuir."); }
  };

  const handleConcluir = async (id) => {
    if (!confirm("Concluir atendimento?")) return;
    const token = localStorage.getItem("token");
    try {
        await api.put(`/agendamentos/${id}/status`, { status: 'realizado' }, { headers: { Authorization: `Bearer ${token}` } });
        carregarDados();
    } catch (error) { alert("Erro."); }
  };

  const pendentes = agendamentos.filter(a => !a.nome_aluno && a.status === 'agendado');
  const emAndamento = agendamentos.filter(a => a.nome_aluno && a.status === 'agendado');

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      <Header />
      <main className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Painel do Professor</h1>
            <button onClick={() => navigate("/gerenciar-horarios")} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">Gerenciar Horários</button>
        </div>
        {mensagem.texto && <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg flex items-center gap-2"><FaCheckCircle /> {mensagem.texto}</div>}

        <section className="mb-12">
          <h2 className="text-xl font-bold text-yellow-600 mb-4 flex items-center gap-2"><FaExclamationCircle /> Solicitações Pendentes</h2>
          {pendentes.length === 0 ? <p className="text-gray-400 italic">Nenhuma solicitação.</p> : (
            <div className="grid gap-6 md:grid-cols-2">
              {pendentes.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-400">
                  <h3 className="font-bold">{item.nome_servico}</h3>
                  <p className="text-sm text-gray-500">Cliente: {item.nome_cliente}</p>
                  <p className="font-bold text-sm mb-4">{new Date(item.data_horario).toLocaleString('pt-BR')}</p>
                  <div className="flex gap-2">
                    <select className="flex-1 p-2 border rounded" onChange={(e) => setSelecoesPendentes({...selecoesPendentes, [item.id]: e.target.value})} defaultValue="">
                      <option value="" disabled>Aluno...</option>
                      {alunos.map(a => (<option key={a.id} value={a.id}>{a.nome}</option>))}
                    </select>
                    <button onClick={() => handleAtribuir(item.id, selecoesPendentes[item.id])} className="bg-blue-600 text-white px-4 py-2 rounded">Assumir</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2"><FaUserGraduate /> Em Andamento</h2>
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100"><tr><th className="p-4">Data</th><th className="p-4">Serviço</th><th className="p-4">Aluno</th><th className="p-4">Ações</th></tr></thead>
              <tbody>
                {emAndamento.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="p-4">{new Date(item.data_horario).toLocaleString('pt-BR')}</td>
                    <td className="p-4">{item.nome_servico}<br/><span className="text-xs text-gray-500">{item.nome_cliente}</span></td>
                    <td className="p-4">
                        {editandoId === item.id ? (
                            <select value={alunoEditadoId} onChange={(e) => setAlunoEditadoId(e.target.value)} className="p-1 border rounded">
                                {alunos.map(a => <option key={a.id} value={a.id}>{a.nome}</option>)}
                            </select>
                        ) : <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{item.nome_aluno}</span>}
                    </td>
                    <td className="p-4 flex gap-2">
                        {editandoId === item.id ? (
                            <><button onClick={() => handleAtribuir(item.id, alunoEditadoId)} className="text-green-600"><FaSave/></button><button onClick={() => setEditandoId(null)} className="text-gray-400"><FaTimes/></button></>
                        ) : (
                            <><button onClick={() => {setEditandoId(item.id); setAlunoEditadoId(alunos.find(a=>a.nome===item.nome_aluno)?.id)}} className="text-blue-600"><FaEdit/></button><button onClick={() => handleConcluir(item.id)} className="text-green-600 font-bold flex items-center gap-1"><FaCheck/> Concluir</button></>
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
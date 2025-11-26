import React, { useState, useEffect } from "react";
import api from "../services/api";
import Header from "../components/Header";
import { FaCalendarAlt, FaUserTie, FaChalkboardTeacher, FaStore, FaTimesCircle } from "react-icons/fa";

export default function MeusAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuario");
    if (usuarioSalvo) setUsuario(JSON.parse(usuarioSalvo));
    carregarAgendamentos();
  }, []);

  const carregarAgendamentos = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.get('/agendamentos/meus-agendamentos', { headers: { Authorization: `Bearer ${token}` } });
      setAgendamentos(response.data);
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  const handleCancelar = async (id) => {
    if (!window.confirm("Deseja cancelar e liberar o horário?")) return;
    const token = localStorage.getItem("token");
    try {
        await api.put(`/agendamentos/${id}/cancelar`, {}, { headers: { Authorization: `Bearer ${token}` } });
        setAgendamentos(prev => prev.map(i => i.id === id ? { ...i, status: 'cancelado' } : i));
        alert("Cancelado com sucesso!");
    } catch (error) { alert("Erro ao cancelar."); }
  };

  const getStatusColor = (status) => {
    if (status === 'agendado') return 'bg-yellow-100 text-yellow-800';
    if (status === 'realizado') return 'bg-green-100 text-green-800';
    return 'bg-red-100 text-red-800';
  };

  if (loading) return <div className="text-center p-10">Carregando...</div>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">{usuario?.tipo === 1 ? "Painel do Aluno" : "Meus Agendamentos"}</h1>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">Total: {agendamentos.length}</span>
        </div>

        {agendamentos.length === 0 ? <p className="text-center text-gray-500">Nenhum agendamento.</p> : (
          <div className="grid gap-4">
            {agendamentos.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 text-xs rounded uppercase font-bold ${getStatusColor(item.status)}`}>{item.status}</span>
                    <span className="text-gray-400 text-xs">#{item.id}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{item.nome_servico}</h3>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <FaCalendarAlt className="text-blue-500"/>
                    <span className="font-bold">{new Date(item.data_horario).toLocaleDateString('pt-BR')} às {new Date(item.data_horario).toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'})}</span>
                  </div>
                  {usuario?.tipo === 4 && item.nome_aluno && (
                    <div className="mt-2 text-sm text-blue-600 flex items-center gap-2"><FaUserTie /> <span>Atendimento por: <strong>{item.nome_aluno}</strong></span></div>
                  )}
                </div>
                {usuario?.tipo === 4 && item.status === 'agendado' && (
                    <button onClick={() => handleCancelar(item.id)} className="flex items-center gap-2 text-red-600 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50 text-sm font-bold"><FaTimesCircle /> Cancelar</button>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import api from "../services/api";

export default function PainelAdministrador() {
  const navigate = useNavigate();
  const [agendamentos, setAgendamentos] = useState([]);
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("todos");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/");
    api.get('/agendamentos/meus-agendamentos', { headers: { Authorization: `Bearer ${token}` } })
       .then(res => setAgendamentos(res.data));
  }, [navigate]);

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token");
    try { await api.put(`/agendamentos/${id}/status`, { status }, { headers: { Authorization: `Bearer ${token}` } }); setAgendamentos(prev => prev.map(a => a.id === id ? { ...a, status } : a)); } catch (e) { alert("Erro"); }
  };

  const cancelar = async (id) => {
    if(!confirm("Cancelar?")) return;
    const token = localStorage.getItem("token");
    try { await api.put(`/agendamentos/${id}/cancelar`, {}, { headers: { Authorization: `Bearer ${token}` } }); setAgendamentos(prev => prev.map(a => a.id === id ? { ...a, status: 'cancelado' } : a)); } catch (e) { alert("Erro"); }
  };

  const lista = agendamentos.filter(a => (a.nome_cliente||"").toLowerCase().includes(busca.toLowerCase()) && (filtro === "todos" || a.status === filtro));

  return (
    <div className="min-h-screen bg-gray-50 font-sans"><Header />
      <main className="p-8 max-w-6xl mx-auto">
        <div className="flex justify-between mb-6"><h1 className="text-2xl font-bold">Painel Admin</h1><div className="flex gap-2"><button onClick={() => navigate("/gerenciar-servicos")} className="bg-slate-700 text-white px-4 py-2 rounded">Serviços</button><button onClick={() => navigate("/gerenciar-horarios")} className="bg-slate-700 text-white px-4 py-2 rounded">Horários</button></div></div>
        <div className="flex gap-4 mb-6"><input placeholder="Buscar cliente..." className="p-2 border rounded" onChange={e => setBusca(e.target.value)} /><select className="p-2 border rounded" onChange={e => setFiltro(e.target.value)}><option value="todos">Todos</option><option value="agendado">Agendado</option><option value="realizado">Realizado</option><option value="cancelado">Cancelado</option></select></div>
        <div className="bg-white rounded shadow overflow-hidden"><table className="w-full text-left text-sm"><thead className="bg-gray-100"><tr><th className="p-3">Data</th><th>Cliente</th><th>Serviço</th><th>Status</th><th>Ações</th></tr></thead><tbody>{lista.map(a => (<tr key={a.id} className="border-t"><td className="p-3">{new Date(a.data_horario).toLocaleDateString()}</td><td>{a.nome_cliente}</td><td>{a.nome_servico}</td><td><select value={a.status} onChange={e => updateStatus(a.id, e.target.value)} className="border rounded"><option value="agendado">Agendado</option><option value="realizado">Realizado</option><option value="cancelado" disabled>Cancelado</option></select></td><td>{a.status !== 'cancelado' && <button onClick={() => cancelar(a.id)} className="text-red-600 text-xs border px-2 py-1 rounded hover:bg-red-50">Cancelar</button>}</td></tr>))}</tbody></table></div>
      </main>
    </div>
  );
}
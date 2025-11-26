import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import api from "../services/api";

function PainelAdministrador() {
  const navigate = useNavigate();
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [termoBusca, setTermoBusca] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("todos");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/");

    api.get('/agendamentos/meus-agendamentos', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => { setAgendamentos(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [navigate]);

  const handleUpdateStatus = async (id, status) => {
    const token = localStorage.getItem("token");
    try {
        await api.put(`/agendamentos/${id}/status`, { status }, { headers: { Authorization: `Bearer ${token}` } });
        setAgendamentos(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    } catch (e) { alert("Erro ao atualizar."); }
  };

  const handleCancelar = async (id) => {
    if(!confirm("Cancelar e liberar horário?")) return;
    const token = localStorage.getItem("token");
    try {
        await api.put(`/agendamentos/${id}/cancelar`, {}, { headers: { Authorization: `Bearer ${token}` } });
        setAgendamentos(prev => prev.map(a => a.id === id ? { ...a, status: 'cancelado' } : a));
    } catch (e) { alert("Erro."); }
  };

  const filtrados = agendamentos.filter(a => {
    const matchNome = (a.nome_cliente || "").toLowerCase().includes(termoBusca.toLowerCase());
    const matchStatus = statusFiltro === "todos" || a.status === statusFiltro;
    return matchNome && matchStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <main className="p-8 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Painel Admin</h1>
            <div className="flex gap-2">
                <button onClick={() => navigate("/gerenciar-servicos")} className="bg-slate-700 text-white px-4 py-2 rounded">Serviços</button>
                <button onClick={() => navigate("/gerenciar-horarios")} className="bg-slate-700 text-white px-4 py-2 rounded">Horários</button>
            </div>
        </div>

        <div className="flex gap-4 mb-6">
            <input placeholder="Buscar cliente..." className="p-2 border rounded w-64" value={termoBusca} onChange={e => setTermoBusca(e.target.value)} />
            <select className="p-2 border rounded" value={statusFiltro} onChange={e => setStatusFiltro(e.target.value)}>
                <option value="todos">Todos</option>
                <option value="agendado">Agendado</option>
                <option value="realizado">Realizado</option>
                <option value="cancelado">Cancelado</option>
            </select>
        </div>

        {!loading && (
            <div className="bg-white rounded shadow overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-100"><tr><th className="p-3">Data</th><th className="p-3">Cliente</th><th className="p-3">Serviço</th><th className="p-3">Status</th><th className="p-3">Ações</th></tr></thead>
                    <tbody>
                        {filtrados.map(a => (
                            <tr key={a.id} className="border-t">
                                <td className="p-3">{new Date(a.data_horario).toLocaleDateString()}</td>
                                <td className="p-3">{a.nome_cliente}</td>
                                <td className="p-3">{a.nome_servico}</td>
                                <td className="p-3">
                                    <select value={a.status} onChange={(e) => handleUpdateStatus(a.id, e.target.value)} className="border rounded p-1 text-xs">
                                        <option value="agendado">Agendado</option>
                                        <option value="realizado">Realizado</option>
                                        <option value="cancelado" disabled>Cancelado</option>
                                    </select>
                                </td>
                                <td className="p-3">
                                    {a.status !== 'cancelado' && <button onClick={() => handleCancelar(a.id)} className="text-red-600 text-xs border px-2 py-1 rounded border-red-200 hover:bg-red-50">Cancelar</button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
      </main>
    </div>
  );
}
export default PainelAdministrador;
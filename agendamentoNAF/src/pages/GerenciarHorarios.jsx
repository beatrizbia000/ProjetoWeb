import React, { useState, useEffect } from "react";
import api from "../services/api";
import Header from "../components/Header";
import { FaCalendarPlus } from "react-icons/fa";

export default function GerenciarHorarios() {
  const [dataHorario, setDataHorario] = useState("");
  const [horarios, setHorarios] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    api.get('/agendamentos/horarios-disponiveis').then(res => setHorarios(res.data));
  }, []);

  const handleCriar = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await api.post('/agendamentos/horario', { data_horario: dataHorario }, { headers: { Authorization: `Bearer ${token}` } });
      setMsg("Criado!");
      api.get('/agendamentos/horarios-disponiveis').then(res => setHorarios(res.data));
    } catch (e) { setMsg("Erro."); }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Gerenciar Horários</h1>
        {msg && <p className="mb-4 text-green-600">{msg}</p>}
        <div className="bg-white p-6 rounded shadow mb-8">
            <form onSubmit={handleCriar} className="flex gap-4 items-end">
                <div className="flex-grow"><label className="block text-sm text-gray-600">Data/Hora</label><input type="datetime-local" className="w-full border rounded p-2" value={dataHorario} onChange={e => setDataHorario(e.target.value)} required /></div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded">Adicionar</button>
            </form>
        </div>
        <ul className="bg-white p-6 rounded shadow grid grid-cols-2 gap-4">
            {horarios.map(h => <li key={h.id} className="p-2 border rounded bg-gray-50">{new Date(h.data_horario).toLocaleString()}</li>)}
        </ul>
      </main>
    </div>
  );
}
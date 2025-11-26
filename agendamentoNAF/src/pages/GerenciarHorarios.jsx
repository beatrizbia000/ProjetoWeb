import React, { useState, useEffect } from "react";
import api from "../services/api";
import Header from "../components/Header";

export default function GerenciarHorarios() {
  const [data, setData] = useState("");
  const [lista, setLista] = useState([]);
  useEffect(() => { api.get('/agendamentos/horarios-disponiveis').then(res => setLista(res.data)); }, []);
  const criar = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try { await api.post('/agendamentos/horario', { data_horario: data }, { headers: { Authorization: `Bearer ${token}` } }); setData(""); api.get('/agendamentos/horarios-disponiveis').then(res => setLista(res.data)); alert("Criado!"); } catch (e) { alert("Erro"); }
  };
  return (
    <div className="min-h-screen bg-gray-50"><Header /><main className="max-w-4xl mx-auto p-6"><h1 className="text-2xl font-bold mb-6">Gerenciar Horários</h1><div className="bg-white p-6 rounded shadow mb-8"><form onSubmit={criar} className="flex gap-4 items-end"><div className="flex-grow"><label>Data/Hora</label><input type="datetime-local" className="w-full border rounded p-2" value={data} onChange={e => setData(e.target.value)} required /></div><button className="bg-blue-600 text-white px-4 py-2 rounded">Adicionar</button></form></div><ul className="bg-white p-6 rounded shadow grid grid-cols-2 gap-4">{lista.map(h => <li key={h.id} className="p-2 border rounded bg-gray-50">{new Date(h.data_horario).toLocaleString()}</li>)}</ul></main></div>
  );
}
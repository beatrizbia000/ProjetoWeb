import React, { useState, useEffect } from "react";
import api from "../services/api";
import Header from "../components/Header";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function GerenciarServicos() {
  const [servicos, setServicos] = useState([]);
  const [novo, setNovo] = useState("");

  useEffect(() => { carregar(); }, []);
  const carregar = () => api.get('/tipos-servico').then(res => setServicos(res.data));

  const handleAdd = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try { await api.post('/tipos-servico', { nome_servico: novo }, { headers: { Authorization: `Bearer ${token}` } }); setNovo(""); carregar(); } catch (e) { alert("Erro"); }
  };

  const handleDel = async (id) => {
    if(!confirm("Excluir?")) return;
    const token = localStorage.getItem("token");
    try { await api.delete(`/tipos-servico/${id}`, { headers: { Authorization: `Bearer ${token}` } }); carregar(); } catch (e) { alert("Erro (em uso?)"); }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Gerenciar Serviços</h1>
        <form onSubmit={handleAdd} className="flex gap-4 mb-8 bg-white p-6 rounded shadow">
            <input className="flex-grow border rounded p-2" placeholder="Nome do serviço" value={novo} onChange={e => setNovo(e.target.value)} />
            <button className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"><FaPlus/> Adicionar</button>
        </form>
        <div className="bg-white rounded shadow overflow-hidden">
            {servicos.map(s => (
                <div key={s.id} className="flex justify-between p-4 border-b last:border-0">
                    <span>{s.nome_servico}</span>
                    <button onClick={() => handleDel(s.id)} className="text-red-500"><FaTrash/></button>
                </div>
            ))}
        </div>
      </main>
    </div>
  );
}
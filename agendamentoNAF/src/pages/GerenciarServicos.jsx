import React, { useState, useEffect } from "react";
import api from "../services/api";
import Header from "../components/Header";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function GerenciarServicos() {
  const [servicos, setServicos] = useState([]);
  const [novo, setNovo] = useState("");
  useEffect(() => { load(); }, []);
  const load = () => api.get('/tipos-servico').then(res => setServicos(res.data));
  const add = async (e) => { e.preventDefault(); try { await api.post('/tipos-servico', { nome_servico: novo }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }); setNovo(""); load(); } catch (e) { alert("Erro"); } };
  const del = async (id) => { if(confirm("Excluir?")) try { await api.delete(`/tipos-servico/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }); load(); } catch (e) { alert("Erro"); } };
  return (
    <div className="min-h-screen bg-gray-50"><Header /><main className="max-w-4xl mx-auto p-6"><h1 className="text-2xl font-bold mb-6">Gerenciar Serviços</h1><form onSubmit={add} className="flex gap-4 mb-8 bg-white p-6 rounded shadow"><input className="flex-grow border rounded p-2" value={novo} onChange={e => setNovo(e.target.value)} placeholder="Nome" /><button className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"><FaPlus/> Adicionar</button></form><div className="bg-white rounded shadow">{servicos.map(s => <div key={s.id} className="flex justify-between p-4 border-b">{s.nome_servico}<button onClick={() => del(s.id)} className="text-red-500"><FaTrash/></button></div>)}</div></main></div>
  );
}
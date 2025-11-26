import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Header from "../components/Header";

export default function ConfiguracoesConta() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: "", email: "", cpf: "", cnpj: "" });
  const [id, setId] = useState(null);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuario"));
    const token = localStorage.getItem("token");
    if (!user || !token) return navigate("/");
    setId(user.id);
    api.get(`/usuarios/${user.id}`, { headers: { Authorization: `Bearer ${token}` } })
       .then(res => setForm({ nome: res.data.nome, email: res.data.email, cpf: res.data.cpf||"", cnpj: res.data.cnpj||"" }))
       .catch(() => setForm({ ...form, nome: user.nome, email: user.email }));
  }, [navigate]);
  const save = async () => { try { await api.put(`/usuarios/${id}`, form, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }); alert("Salvo!"); } catch (e) { alert("Erro"); } };
  return (
    <div className="min-h-screen bg-gray-50"><Header /><main className="max-w-2xl mx-auto p-6 mt-8 bg-white rounded shadow"><h1 className="text-2xl font-bold mb-6 text-center">Minha Conta</h1><div className="grid gap-4"><div><label>Nome</label><input className="w-full border p-2 rounded" value={form.nome} onChange={e => setForm({...form, nome: e.target.value})} /></div><div><label>Email</label><input className="w-full border p-2 rounded" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div><div className="grid grid-cols-2 gap-4"><div><label>CPF</label><input className="w-full border p-2 rounded" value={form.cpf} onChange={e => setForm({...form, cpf: e.target.value})} /></div><div><label>CNPJ</label><input className="w-full border p-2 rounded" value={form.cnpj} onChange={e => setForm({...form, cnpj: e.target.value})} /></div></div></div><div className="flex justify-center mt-8 gap-4"><button onClick={save} className="bg-blue-600 text-white px-6 py-2 rounded-full">Salvar</button><button onClick={() => { localStorage.clear(); navigate("/"); }} className="bg-red-600 text-white px-6 py-2 rounded-full">Sair</button></div></main></div>
  );
}
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Header from "../components/Header";

export default function ConfiguracoesConta() {
  const navigate = useNavigate();
  const [usuarioId, setUsuarioId] = useState(null);
  const [formData, setFormData] = useState({ nome: "", email: "", cpf: "", cnpj: "" });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuario"));
    const token = localStorage.getItem("token");
    if (!user || !token) return navigate("/");
    
    setUsuarioId(user.id);
    api.get(`/usuarios/${user.id}`, { headers: { Authorization: `Bearer ${token}` } })
       .then(res => setFormData({ nome: res.data.nome, email: res.data.email, cpf: res.data.cpf || "", cnpj: res.data.cnpj || "" }))
       .catch(() => setFormData(prev => ({ ...prev, nome: user.nome, email: user.email })));
  }, [navigate]);

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
        await api.put(`/usuarios/${usuarioId}`, formData, { headers: { Authorization: `Bearer ${token}` } });
        setMsg("Salvo!");
    } catch (e) { setMsg("Erro."); }
  };

  return (
    <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-2xl mx-auto p-6 mt-8 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-6 text-center">Minha Conta</h1>
            {msg && <p className="text-center text-green-600 mb-4">{msg}</p>}
            <div className="grid gap-4">
                <div><label className="text-sm text-gray-500">Nome</label><input className="w-full border p-2 rounded" value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} /></div>
                <div><label className="text-sm text-gray-500">Email</label><input className="w-full border p-2 rounded" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} /></div>
                <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-sm text-gray-500">CPF</label><input className="w-full border p-2 rounded" value={formData.cpf} onChange={e => setFormData({...formData, cpf: e.target.value})} /></div>
                    <div><label className="text-sm text-gray-500">CNPJ</label><input className="w-full border p-2 rounded" value={formData.cnpj} onChange={e => setFormData({...formData, cnpj: e.target.value})} /></div>
                </div>
            </div>
            <div className="flex justify-center mt-8 gap-4">
                <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2 rounded-full">Salvar</button>
                <button onClick={() => { localStorage.clear(); navigate("/"); }} className="bg-red-600 text-white px-6 py-2 rounded-full">Sair</button>
            </div>
        </main>
    </div>
  );
}
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

export default function GerenciarServicos() {
  const [servicos, setServicos] = useState([]);
  const [novoServico, setNovoServico] = useState("");
  const [mensagem, setMensagem] = useState({ tipo: "", texto: "" });
  const API_URL = "http://localhost:3001/api";

  useEffect(() => {
    carregarServicos();
  }, []);

  const carregarServicos = async () => {
    try {
      const response = await axios.get(`${API_URL}/tipos-servico`);
      setServicos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdicionar = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `${API_URL}/tipos-servico`,
        { nome_servico: novoServico },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMensagem({ tipo: "sucesso", texto: "Serviço adicionado!" });
      setNovoServico("");
      carregarServicos();
    } catch (error) {
      setMensagem({ tipo: "erro", texto: "Erro ao adicionar serviço." });
    }
  };

  const handleExcluir = async (id) => {
    if(!window.confirm("Tem certeza que deseja excluir este serviço?")) return;
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${API_URL}/tipos-servico/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMensagem({ tipo: "sucesso", texto: "Serviço excluído!" });
      carregarServicos();
    } catch (error) {
      setMensagem({ tipo: "erro", texto: "Erro ao excluir (pode estar em uso)." });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Gerenciar Serviços</h1>

        {mensagem.texto && (
          <div className={`mb-4 p-3 rounded ${mensagem.tipo === 'sucesso' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {mensagem.texto}
          </div>
        )}

        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <form onSubmit={handleAdicionar} className="flex gap-4">
            <input
              type="text"
              placeholder="Nome do novo serviço"
              className="flex-grow p-2 border rounded"
              value={novoServico}
              onChange={(e) => setNovoServico(e.target.value)}
              required
            />
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2">
              <FaPlus /> Adicionar
            </button>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Nome do Serviço</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {servicos.map((s) => (
                <tr key={s.id}>
                  <td className="p-4">{s.id}</td>
                  <td className="p-4 font-medium">{s.nome_servico}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleExcluir(s.id)} className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
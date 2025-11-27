import React, { useState, useEffect } from "react";
import api from "../services/api";
import Header from "../components/Header";
import { FaCalendarPlus } from "react-icons/fa";

export default function GerenciarHorarios() {
  const [dataHorario, setDataHorario] = useState("");
  const [horarios, setHorarios] = useState([]);
  const [mensagem, setMensagem] = useState({ tipo: "", texto: "" });

  useEffect(() => {
    carregarHorarios();
  }, []);

  const carregarHorarios = async () => {
    try {
      const response = await api.get('/agendamentos/horarios-disponiveis');
      setHorarios(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCriarHorario = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      // CORREÇÃO: Envia o valor direto do input (YYYY-MM-DDTHH:mm)
      // O Backend vai tratar de remover o T. Isso evita mudar o fuso horário.
      await api.post(
        '/agendamentos/horario',
        { data_horario: dataHorario },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMensagem({ tipo: "sucesso", texto: "Horário criado com sucesso!" });
      setDataHorario("");
      carregarHorarios();
    } catch (error) {
      setMensagem({ tipo: "erro", texto: "Erro ao criar horário." });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Gerenciar Horários</h1>

        {mensagem.texto && (
          <div className={`mb-4 p-3 rounded ${mensagem.tipo === 'sucesso' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {mensagem.texto}
          </div>
        )}

        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FaCalendarPlus /> Adicionar Novo Horário
          </h2>
          <form onSubmit={handleCriarHorario} className="flex gap-4 items-end">
            <div className="flex-grow">
              <label className="block text-sm text-gray-600 mb-1">Data e Hora</label>
              <input
                type="datetime-local"
                className="w-full p-2 border rounded"
                value={dataHorario}
                onChange={(e) => setDataHorario(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Adicionar
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Horários Disponíveis Atuais</h2>
          {horarios.length === 0 ? (
            <p className="text-gray-500">Nenhum horário disponível cadastrado.</p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {horarios.map((h) => (
                <li key={h.id} className="p-3 border rounded bg-gray-50 flex justify-between items-center text-sm">
                  <span>
                    {/* Como agora recebemos string pura do banco, convertemos suavemente */}
                    {new Date(h.data_horario.replace(' ', 'T')).toLocaleDateString('pt-BR')} às {new Date(h.data_horario.replace(' ', 'T')).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
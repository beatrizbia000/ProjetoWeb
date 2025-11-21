import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import { FaCalendarAlt, FaUserTie, FaChalkboardTeacher, FaStore } from "react-icons/fa";

export default function MeusAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState(null);

  const API_URL = "http://localhost:3001/api";

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuario");
    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
    }
    carregarAgendamentos();
  }, []);

  const carregarAgendamentos = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${API_URL}/agendamentos/meus-agendamentos`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAgendamentos(response.data);
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
    } finally {
      setLoading(false);
    }
  };

  
  const getStatusColor = (status) => {
    switch (status) {
      case 'agendado': return 'bg-yellow-100 text-yellow-800';
      case 'realizado': return 'bg-green-100 text-green-800';
      case 'cancelado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <div className="text-center p-10">Carregando...</div>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <main className="max-w-5xl mx-auto px-6 py-10">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            {usuario?.tipo === 3 ? "Painel do Aluno" : "Meus Agendamentos"}
          </h1>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
            Total: {agendamentos.length}
          </span>
        </div>

        {agendamentos.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500">Nenhum agendamento encontrado.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-1">
            {agendamentos.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                
              
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 text-xs rounded uppercase font-bold ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                    <span className="text-gray-400 text-xs">#{item.id}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{item.nome_servico}</h3>
                  
                  <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                    <FaCalendarAlt className="text-blue-500"/>
                    {new Date(item.data_horario).toLocaleDateString('pt-BR')} às {new Date(item.data_horario).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}
                  </div>

                  
                  {usuario?.tipo === 3 && (
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                            <FaChalkboardTeacher className="text-purple-600"/>
                            <span className="font-semibold">Professor:</span> {item.nome_professor}
                        </div>
                        <div className="flex items-center gap-2">
                            <FaStore className="text-green-600"/>
                            <span className="font-semibold">Cliente:</span> {item.nome_cliente}
                        </div>
                    </div>
                  )}

                
                  {usuario?.tipo === 4 && item.nome_aluno && (
                    <div className="mt-2 text-sm text-blue-600 flex items-center gap-2">
                        <FaUserTie /> 
                        <span>Atendimento por: <strong>{item.nome_aluno}</strong> (Aluno) e <strong>{item.nome_professor}</strong> (Prof.)</span>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
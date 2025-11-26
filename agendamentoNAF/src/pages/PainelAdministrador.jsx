import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";

function PainelAdministrador() {
  const navegar = useNavigate();

  const [agendamentos, setAgendamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const [termoBusca, setTermoBusca] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("todos");

  const API_URL = "http://localhost:3001/api";

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuario");
    const token = localStorage.getItem("token");

    if (!usuarioSalvo || !token) {
        navegar("/"); 
        return;
    }

    axios
      .get(`${API_URL}/agendamentos/meus-agendamentos`, {
        headers: token
          ? { Authorization: `Bearer ${token}` }
          : undefined,
      })
      .then((response) => {
        setAgendamentos(response.data || []);
        setCarregando(false);
      })
      .catch((error) => {
        console.error("Erro ao carregar agendamentos:", error);
        setErro("Não foi possível carregar os agendamentos.");
        setCarregando(false);
      });
  }, [navegar]);

  const agendamentosFiltrados = agendamentos.filter((agendamento) => {
    const nomeUsuario =
      agendamento.nome_usuario ||
      agendamento.nome_aluno ||
      agendamento.nome_cliente ||
      "";

    const status = agendamento.status || "";

    const passaBusca =
      termoBusca.trim() === "" ||
      nomeUsuario.toLowerCase().includes(termoBusca.toLowerCase());

    const passaStatus =
      statusFiltro === "todos" ||
      status.toLowerCase() === statusFiltro.toLowerCase();

    return passaBusca && passaStatus;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f3fbff] via-white to-white font-sans">
      <Header />

      <main className="flex-1 px-4 md:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Cabeçalho com Ações de Gestão */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">
                Painel do Administrador
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Gerencie agendamentos, serviços e horários.
              </p>
            </div>

            {/* Botões de Gestão */}
            <div className="flex gap-3">
                <button 
                    onClick={() => navegar("/gerenciar-servicos")}
                    className="bg-slate-700 text-white px-4 py-2 rounded-md text-sm hover:bg-slate-800 transition shadow-sm"
                >
                    Gerenciar Serviços
                </button>
                <button 
                    onClick={() => navegar("/gerenciar-horarios")}
                    className="bg-slate-700 text-white px-4 py-2 rounded-md text-sm hover:bg-slate-800 transition shadow-sm"
                >
                    Gerenciar Horários
                </button>
            </div>
          </div>

          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center mb-6">
              <input
                type="text"
                placeholder="Buscar por nome do usuário..."
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                className="w-full sm:w-56 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#004A8D] focus:ring-2 focus:ring-[#004A8D]/40 transition"
              />

              <select
                value={statusFiltro}
                onChange={(e) => setStatusFiltro(e.target.value)}
                className="w-full sm:w-40 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-[#004A8D] focus:ring-2 focus:ring-[#004A8D]/40 transition"
              >
                <option value="todos">Todos os status</option>
                <option value="pendente">Pendentes</option>
                <option value="confirmado">Confirmados</option>
                <option value="concluido">Concluídos</option>
                <option value="cancelado">Cancelados</option>
              </select>
          </div>

          {carregando && (
            <p className="text-sm text-slate-500">Carregando agendamentos...</p>
          )}

          {erro && !carregando && (
            <p className="text-sm text-red-500">{erro}</p>
          )}

          {!carregando && !erro && (
            <>
              {agendamentosFiltrados.length === 0 ? (
                <p className="text-sm text-slate-500">
                  Nenhum agendamento encontrado para os filtros aplicados.
                </p>
              ) : (
                <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-100">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 font-semibold text-gray-600">#</th>
                        <th className="px-4 py-3 font-semibold text-gray-600">Usuário</th>
                        <th className="px-4 py-3 font-semibold text-gray-600">Data</th>
                        <th className="px-4 py-3 font-semibold text-gray-600">Horário</th>
                        <th className="px-4 py-3 font-semibold text-gray-600">Serviço</th>
                        <th className="px-4 py-3 font-semibold text-gray-600">Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {agendamentosFiltrados.map((agendamento) => (
                        <tr
                          key={agendamento.id}
                          className="border-t border-gray-100 hover:bg-gray-50/80 transition"
                        >
                          <td className="px-4 py-3 text-gray-700">{agendamento.id}</td>
                          <td className="px-4 py-3 text-gray-700">
                            {agendamento.nome_usuario ||
                              agendamento.nome_aluno ||
                              agendamento.nome_cliente ||
                              "-"}
                          </td>
                          <td className="px-4 py-3 text-gray-700">
                            {new Date(agendamento.data_horario).toLocaleDateString('pt-BR')}
                          </td>
                          <td className="px-4 py-3 text-gray-700">
                            {new Date(agendamento.data_horario).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}
                          </td>
                          <td className="px-4 py-3 text-gray-700">
                            {agendamento.nome_servico || "-"}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`
                                inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                                ${
                                  String(agendamento.status || "").toLowerCase().includes("agendado")
                                    ? "bg-yellow-100 text-yellow-700"
                                    : String(agendamento.status || "").toLowerCase().includes("realizado")
                                    ? "bg-emerald-100 text-emerald-700"
                                    : String(agendamento.status || "").toLowerCase().includes("cancelado")
                                    ? "bg-red-100 text-red-700"
                                    : "bg-gray-100 text-gray-700"
                                }
                              `}
                            >
                              {agendamento.status || "—"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <footer className="mt-10 w-full bg-[#004A8D] py-2 flex justify-center">
        <span className="text-[11px] text-white">
          © 2025 NAF - Todos os direitos reservados.
        </span>
      </footer>
    </div>
  );
}

export default PainelAdministrador;
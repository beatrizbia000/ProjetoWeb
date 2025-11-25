// Importa React e os hooks necessários
import React, { useEffect, useState } from "react";
// Importa o hook de navegação do React Router
import { useNavigate } from "react-router-dom";
// Importa o Header já existente do projeto
import Header from "../components/Header";
// Importa o axios para fazer requisições HTTP ao back-end
import axios from "axios";

// Declara o componente funcional do painel do administrador
function PainelAdministrador() {
  // Hook de navegação para redirecionar entre rotas
  const navegar = useNavigate();

  // Estado que guarda a lista de agendamentos carregados da API
  const [agendamentos, setAgendamentos] = useState([]);
  // Estado para controle de carregamento (enquanto busca na API)
  const [carregando, setCarregando] = useState(true);
  // Estado para guardar mensagem de erro (se algo falhar na requisição)
  const [erro, setErro] = useState(null);

  // Filtro de busca por nome de usuário/aluno/cliente
  const [termoBusca, setTermoBusca] = useState("");
  // Filtro por status (ex.: PENDENTE, CONCLUIDO etc.)
  const [statusFiltro, setStatusFiltro] = useState("todos");

  // URL base da API do back-end (ajuste se sua porta/caminho forem diferentes)
  const API_URL = "http://localhost:3001/api";

  // Efeito que roda quando o componente é montado
  useEffect(() => {
    // 1. Verifica se existe usuário logado no localStorage
    const usuarioSalvo = localStorage.getItem("usuario");

    // 2. Recupera o token salvo no localStorage (se você estiver usando JWT)
    const token = localStorage.getItem("token");

    // Se não existir usuário, manda o usuário para a tela de login
    if (!usuarioSalvo || !token) {
        navigate("/"); 
        return;
    }

    // Converte o JSON salvo em string para objeto
    const usuarioLogado = JSON.parse(usuarioSalvo);
    console.log("Usuário logado (admin):", usuarioLogado);

    // 3. Faz a requisição para carregar todos os agendamentos
    axios
      .get(`${API_URL}/agendamentos/meus-agendamentos`, {
        headers: token
          ? {
              Authorization: `Bearer ${token}`, // se o back-end exigir autenticação
            }
          : undefined,
      })
      .then((response) => {
        // Atualiza o estado com a lista recebida da API
        setAgendamentos(response.data || []);
        // Marca que terminou de carregar
        setCarregando(false);
      })
      .catch((error) => {
        console.error("Erro ao carregar agendamentos:", error);
        // Seta uma mensagem de erro amigável
        setErro("Não foi possível carregar os agendamentos.");
        setCarregando(false);
      });
  }, [navegar]); // dependência do useEffect

  // Filtra os agendamentos com base na busca por texto e status
  const agendamentosFiltrados = agendamentos.filter((agendamento) => {
    // Ajuste os nomes dos campos abaixo para bater com os campos reais da sua tabela/retorno
    const nomeUsuario =
      agendamento.nome_usuario ||
      agendamento.nome_aluno ||
      agendamento.nome_cliente ||
      "";

    const status = agendamento.status || "";

    // Filtro de texto: confere se o nome contém o termo pesquisado (case insensitive)
    const passaBusca =
      termoBusca.trim() === "" ||
      nomeUsuario.toLowerCase().includes(termoBusca.toLowerCase());

    // Filtro de status: se "todos", não filtra; senão compara exato
    const passaStatus =
      statusFiltro === "todos" ||
      status.toLowerCase() === statusFiltro.toLowerCase();

    return passaBusca && passaStatus;
  });

  // Retorna o JSX do componente
  return (
    // Container geral da página
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f3fbff] via-white to-white font-sans">
      {/* Header reutilizado em todo o sistema */}
      <Header />

      {/* Conteúdo principal do painel */}
      <main className="flex-1 px-4 md:px-8 py-8">
        {/* Container central com largura máxima */}
        <div className="max-w-6xl mx-auto">
          {/* Cabeçalho do painel: título + descrição + filtros */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            {/* Título e subtítulo */}
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">
                Painel do Administrador
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Acompanhe os agendamentos do NAF e gerencie a agenda em tempo
                real.
              </p>
            </div>

            {/* Área de filtros: busca por nome + filtro de status */}
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
              {/* Campo de busca por texto */}
              <input
                type="text"
                placeholder="Buscar por nome do usuário..."
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                className="w-full sm:w-56 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#004A8D] focus:ring-2 focus:ring-[#004A8D]/40 transition"
              />

              {/* Select para filtro de status */}
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
          </div>

          {/* Se estiver carregando, mostra um texto de carregamento */}
          {carregando && (
            <p className="text-sm text-slate-500">Carregando agendamentos...</p>
          )}

          {/* Se houve erro ao carregar, mostra mensagem de erro */}
          {erro && !carregando && (
            <p className="text-sm text-red-500">{erro}</p>
          )}

          {/* Se já carregou e não houve erro, mostra a tabela ou mensagem de vazio */}
          {!carregando && !erro && (
            <>
              {/* Se não há agendamentos após filtros */}
              {agendamentosFiltrados.length === 0 ? (
                <p className="text-sm text-slate-500">
                  Nenhum agendamento encontrado para os filtros aplicados.
                </p>
              ) : (
                // Tabela de agendamentos
                <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-100">
                  <table className="w-full text-left text-sm">
                    {/* Cabeçalho da tabela */}
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 font-semibold text-gray-600">
                          #
                        </th>
                        <th className="px-4 py-3 font-semibold text-gray-600">
                          Usuário
                        </th>
                        <th className="px-4 py-3 font-semibold text-gray-600">
                          Data
                        </th>
                        <th className="px-4 py-3 font-semibold text-gray-600">
                          Horário
                        </th>
                        <th className="px-4 py-3 font-semibold text-gray-600">
                          Serviço
                        </th>
                        <th className="px-4 py-3 font-semibold text-gray-600">
                          Status
                        </th>
                      </tr>
                    </thead>

                    {/* Corpo da tabela com os agendamentos */}
                    <tbody>
                      {agendamentosFiltrados.map((agendamento) => (
                        <tr
                          key={agendamento.id}
                          className="border-t border-gray-100 hover:bg-gray-50/80 transition"
                        >
                          {/* Coluna: ID do agendamento */}
                          <td className="px-4 py-3 text-gray-700">
                            {agendamento.id}
                          </td>

                          {/* Coluna: Nome usuário/aluno/cliente */}
                          <td className="px-4 py-3 text-gray-700">
                            {agendamento.nome_usuario ||
                              agendamento.nome_aluno ||
                              agendamento.nome_cliente ||
                              "-"}
                          </td>

                          {/* Coluna: Data (ajuste o campo conforme seu back-end) */}
                          <td className="px-4 py-3 text-gray-700">
                            {agendamento.data || agendamento.data_agendamento}
                          </td>

                          {/* Coluna: Horário (ajuste o campo conforme seu back-end) */}
                          <td className="px-4 py-3 text-gray-700">
                            {agendamento.horario || agendamento.hora}
                          </td>

                          {/* Coluna: Serviço ou tipo de atendimento */}
                          <td className="px-4 py-3 text-gray-700">
                            {agendamento.servico ||
                              agendamento.tipo_atendimento ||
                              "-"}
                          </td>

                          {/* Coluna: Status com badge colorida */}
                          <td className="px-4 py-3">
                            <span
                              className={`
                                inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                                ${
                                  String(agendamento.status || "")
                                    .toLowerCase()
                                    .includes("pend")
                                    ? "bg-yellow-100 text-yellow-700"
                                    : String(agendamento.status || "")
                                        .toLowerCase()
                                        .includes("confirm")
                                    ? "bg-blue-100 text-blue-700"
                                    : String(agendamento.status || "")
                                        .toLowerCase()
                                        .includes("conc")
                                    ? "bg-emerald-100 text-emerald-700"
                                    : String(agendamento.status || "")
                                        .toLowerCase()
                                        .includes("cancel")
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

      {/* Rodapé simples reaproveitando o padrão de cores do sistema */}
      <footer className="mt-10 w-full bg-[#004A8D] py-2 flex justify-center">
        <span className="text-[11px] text-white">
          © 2020 NAF - Todos os direitos reservados.
        </span>
      </footer>
    </div>
  );
}

// Exporta o componente para ser utilizado nas rotas
export default PainelAdministrador;

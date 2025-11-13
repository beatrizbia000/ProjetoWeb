// Importa a biblioteca React para poder criar o componente
import React from "react";

// Importa o hook de navegação do React Router
import { useNavigate } from "react-router-dom";

// Importa o componente de cabeçalho já existente no projeto
import Header from "../components/Header";

// Declara o componente funcional principal da página de configurações de conta
function ConfiguracoesConta() {
   // Cria a função de navegação (hook do React Router)
   const navegar = useNavigate();

  // Retorna toda a estrutura visual da página em JSX
  return (
    <>
      {/* Container geral da página: ocupa a altura toda, organiza em coluna e aplica o fundo em degradê */}
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f3fbff] via-white to-white font-sans">
        {/* Header global do sistema (logo + menu) */}
        <Header />

        {/* Cabeçalho textual da página de configurações de conta */}
        <header className="mt-8 text-center">
          {/* Título principal da tela */}
          <h1 className="text-[28px] font-semibold text-[#1b2838] mb-2">
            Configurações de conta
          </h1>
          {/* Subtítulo explicativo logo abaixo do título */}
          <p className="text-sm text-gray-500">
            Gerencie suas informações pessoais e preferências
          </p>
        </header>

        {/* Conteúdo central: ícone, card de dados pessoais e botão "Sair" */}
        <main className="mt-8 flex flex-col items-center">
          {/* Wrapper do ícone de usuário, com margem negativa para ele “invadir” o card */}
          <div className="-mb-8 z-10">
            {/* Círculo azul com gradiente, borda branca e sombra para destacar o ícone */}
            <div className="w-16 h-16 rounded-full border-4 border-white shadow-lg flex items-center justify-center bg-gradient-to-b from-[#1fa1ff] to-[#0072d4]">
              {/* Ícone de usuário em SVG dentro do círculo */}
              <svg
                xmlns="http://www.w3.org/2000/svg" // Namespace do SVG
                viewBox="0 0 24 24" // Área de visualização do ícone
                className="w-7 h-7 text-white" // Tamanho e cor do ícone
              >
                {/* Caminho que desenha a silhueta da pessoa */}
                <path
                  fill="currentColor" // Usa a cor branca definida por text-white
                  d="M12 12a4 4 0 1 0-4-4 4.003 4.003 0 0 0 4 4Zm0 2c-4.01 0-7 2.005-7 4.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5C19 16.005 16.01 14 12 14Z"
                />
              </svg>
            </div>
          </div>

          {/* Card de dados pessoais – mais compacto e centralizado */}
          <section
            className="
              bg-white rounded-2xl shadow-2xl
              w-11/12 md:w-2/3 lg:w-1/2
              max-w-2xl
              px-6 md:px-8
              pt-14 pb-10
            "
          >
            {/* Cabeçalho interno do card com título da seção e linha divisória */}
            <div className="mb-4">
              {/* Título da seção "Dados Pessoais" */}
              <h2 className="text-base font-semibold text-gray-700 mb-2">
                Dados Pessoais
              </h2>
              {/* Linha horizontal fininha abaixo do título */}
              <div className="h-px w-full bg-gray-200" />
            </div>

            {/* Formulário: 1 coluna no mobile e 2 colunas no desktop */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
              {/* Campo: Nome Completo */}
              <div className="flex flex-col">
                {/* Rótulo do campo de nome */}
                <label className="text-xs text-gray-500 mb-1">
                  Nome Completo
                </label>
                {/* Input de texto para o nome do usuário */}
                <input
                  type="text"
                  className="rounded-md border border-gray-200 bg-[#f5f7fb] px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/60 transition"
                />
              </div>

              {/* Campo: CPF */}
              <div className="flex flex-col">
                {/* Rótulo do campo CPF */}
                <label className="text-xs text-gray-500 mb-1">CPF</label>
                {/* Input de texto para o CPF */}
                <input
                  type="text"
                  className="rounded-md border border-gray-200 bg-[#f5f7fb] px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/60 transition"
                />
              </div>

              {/* Campo: E-mail */}
              <div className="flex flex-col">
                {/* Rótulo do campo e-mail */}
                <label className="text-xs text-gray-500 mb-1">E-mail</label>
                {/* Input do tipo e-mail */}
                <input
                  type="email"
                  className="rounded-md border border-gray-200 bg-[#f5f7fb] px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/60 transition"
                />
              </div>

              {/* Campo: Telefone para contato */}
              <div className="flex flex-col">
                {/* Rótulo do campo telefone */}
                <label className="text-xs text-gray-500 mb-1">
                  Telefone para contato
                </label>
                {/* Input do tipo telefone */}
                <input
                  type="tel"
                  className="rounded-md border border-gray-200 bg-[#f5f7fb] px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/60 transition"
                />
              </div>

              {/* Campo: Endereço */}
              <div className="flex flex-col">
                {/* Rótulo do campo endereço */}
                <label className="text-xs text-gray-500 mb-1">Endereço</label>
                {/* Input de texto para o endereço */}
                <input
                  type="text"
                  className="rounded-md border border-gray-200 bg-[#f5f7fb] px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/60 transition"
                />
              </div>

              {/* Campo: Número */}
              <div className="flex flex-col">
                {/* Rótulo do campo número */}
                <label className="text-xs text-gray-500 mb-1">Número</label>
                {/* Input de texto para o número do endereço */}
                <input
                  type="text"
                  className="rounded-md border border-gray-200 bg-[#f5f7fb] px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/60 transition"
                />
              </div>

              {/* Campo: Complemento – ocupa as duas colunas em telas maiores */}
              <div className="flex flex-col md:col-span-2">
                {/* Rótulo do campo complemento */}
                <label className="text-xs text-gray-500 mb-1">
                  Complemento
                </label>
                {/* Input de texto para complemento (ap, bloco, etc.) */}
                <input
                  type="text"
                  className="rounded-md border border-gray-200 bg-[#f5f7fb] px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/60 transition"
                />
              </div>

              {/* Campo: Cidade */}
              <div className="flex flex-col">
                {/* Rótulo do campo cidade */}
                <label className="text-xs text-gray-500 mb-1">Cidade</label>
                {/* Input de texto para cidade */}
                <input
                  type="text"
                  className="rounded-md border border-gray-200 bg-[#f5f7fb] px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/60 transition"
                />
              </div>

              {/* Campo: Estado */}
              <div className="flex flex-col">
                {/* Rótulo do campo estado */}
                <label className="text-xs text-gray-500 mb-1">Estado</label>
                {/* Input de texto para estado */}
                <input
                  type="text"
                  className="rounded-md border border-gray-200 bg-[#f5f7fb] px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/60 transition"
                />
              </div>
            </div>
          </section>

          {/* Botão vermelho "Sair" – faz navegação para a Home */}
          <button
            type="button"
            onClick={() => navegar("/home")} /** Quando clicar, navega para a rota /home */
            className="mt-7 bg-[#e11d27] text-white px-10 py-2.5 rounded-full text-sm font-medium shadow-[0_6px_18px_rgba(225,29,39,0.4)] hover:shadow-[0_8px_22px_rgba(225,29,39,0.45)] hover:-translate-y-[1px] active:translate-y-[1px] active:shadow-[0_4px_12px_rgba(225,29,39,0.35)] transition-transform transition-shadow duration-100"
          >
            {/* Texto exibido no botão */}
            Sair
          </button>
        </main>

        {/* Rodapé com fundo azul e texto centralizado */}
        <footer className="mt-10 w-full bg-[#004A8D] py-2 flex justify-center">
          {/* Texto de direitos autorais exibido no rodapé */}
          <span className="text-[11px] text-white">
            © 2020 NAF - Todos os direitos reservados.
          </span>
        </footer>
      </div>
    </>
  );
}

// Exporta o componente para ser usado em outras partes da aplicação
export default ConfiguracoesConta;

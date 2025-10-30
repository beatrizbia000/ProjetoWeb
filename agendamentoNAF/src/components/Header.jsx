import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-header">
      <div className="flex items-center justify-between px-6 h-20">
        {/* LOGO */}
        <h1 className="text-white text-2xl font-semibold">Agendamentos NAF</h1>

        {/* BOTÃO MOBILE */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            // Ícone X
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Ícone hambúrguer
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* LINKS (DESKTOP) */}
        <nav className="hidden md:flex items-center gap-10">
          <a href="#" className="text-white font-semibold ">
            Novo Agendamento
          </a>
          <a href="#" className="text-white font-semibold ">
            Meus Agendamentos
          </a>
          <a href="#" className="text-white font-semibold ">
            Meu Perfil
          </a>
        </nav>
      </div>

      {/* MENU MOBILE */}
      {isOpen && (
        <div className="md:hidden bg-header border-t border-white/10">
          <nav className="flex flex-col items-start gap-3 p-4">
            <a href="#" className="text-white font-semibold text-sm">
              Novo Agendamento
            </a>
            <a href="#" className="text-white font-semibold text-sm">
              Meus Agendamentos
            </a>
            <a href="#" className="text-white font-semibold text-sm">
              Meu Perfil
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

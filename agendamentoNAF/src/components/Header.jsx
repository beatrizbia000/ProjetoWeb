import { useState } from "react";
import { Link } from "react-router-dom"; // importa o link

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-[#004A8D] pb-0">
      <div className="flex items-center justify-between px-6 h-20">
        
       <Link to="/home" className="hover:opacity-80 transition-opacity">
            <h1 className="text-white text-2xl font-semibold cursor-pointer">
                Agendamentos NAF
            </h1>
        </Link>

       
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            
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
          <Link to="/novo-agendamento" className="text-white font-semibold ">
            Novo Agendamento
          </Link>
          <Link to="/home" className="text-white font-semibold ">
            Meus Agendamentos
          </Link>
          <Link to="/perfil" className="text-white font-semibold ">
            Meu Perfil
          </Link>
        </nav>
      </div>

      {/* MENU MOBILE */}
      {isOpen && (
        <div className="md:hidden bg-header border-t border-white/10">
          <nav className="flex flex-col items-start gap-3 p-4">
            <Link
              to="/home"
              className="text-black font-semibold text-sm"
              onClick={() => setIsOpen(false)}
            >
              Novo Agendamento
            </Link>

            <Link
              to="/home"
              className="text-black font-semibold text-sm"
              onClick={() => setIsOpen(false)}
            >
              Meus Agendamentos
            </Link>

            <Link
              to="/perfil"
              className="text-black font-semibold text-sm"
              onClick={() => setIsOpen(false)}
            >
              Meu Perfil
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

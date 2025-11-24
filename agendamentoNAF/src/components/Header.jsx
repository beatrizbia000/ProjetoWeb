import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

 
const TIPO_ALUNO = 1;
  const TIPO_PROFESSOR = 2;
  const TIPO_ADMIN = 3;
  const TIPO_MEI = 4;

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuario");
    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/");
  };

  return (
    <header className="w-full bg-[#004A8D] pb-0 shadow-md">
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
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        
        <nav className="hidden md:flex items-center gap-8">
          
         
          {usuario?.tipo === TIPO_MEI && (
            <Link to="/novo-agendamento" className="text-white font-medium hover:text-blue-200 transition">
              Novo Agendamento
            </Link>
          )}

          
          {(usuario?.tipo === TIPO_PROFESSOR || usuario?.tipo === TIPO_ADMIN) && (
            <Link to="/painel-professor" className="text-white font-medium hover:text-blue-200 transition">
              Painel do Professor
            </Link>
          )}

          {(usuario?.tipo === TIPO_ALUNO || usuario?.tipo === TIPO_MEI) && (
            <Link to="/meus-agendamentos" className="text-white font-medium hover:text-blue-200 transition">
              {usuario?.tipo === TIPO_ALUNO ? "Painel do Aluno" : "Meus Agendamentos"}
            </Link>
          )}

          <Link to="/perfil" className="text-white font-medium hover:text-blue-200 transition">
            Meu Perfil
          </Link>

          <button onClick={handleLogout} className="text-red-200 font-medium hover:text-white transition ml-4 border border-red-200 px-3 py-1 rounded hover:bg-red-600 hover:border-red-600">
            Sair
          </button>
        </nav>
      </div>

      
      {isOpen && (
        <div className="md:hidden bg-[#005a9c] border-t border-white/10">
          <nav className="flex flex-col items-start gap-4 p-6">
            {usuario?.tipo === TIPO_MEI && (
                <Link to="/novo-agendamento" className="text-white font-medium" onClick={() => setIsOpen(false)}>Novo Agendamento</Link>
            )}
            {(usuario?.tipo === TIPO_PROFESSOR || usuario?.tipo === TIPO_ADMIN) && (
                <Link to="/painel-professor" className="text-white font-medium" onClick={() => setIsOpen(false)}>Painel do Professor</Link>
            )}
            {(usuario?.tipo === TIPO_ALUNO || usuario?.tipo === TIPO_MEI) && (
                <Link to="/meus-agendamentos" className="text-white font-medium" onClick={() => setIsOpen(false)}>Histórico</Link>
            )}
            <Link to="/perfil" className="text-white font-medium" onClick={() => setIsOpen(false)}>Meu Perfil</Link>
            <button onClick={handleLogout} className="text-red-300 font-medium text-left">Sair</button>
          </nav>
        </div>
      )}
    </header>
  );
}
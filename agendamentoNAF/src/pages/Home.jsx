import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { FaCalendarPlus, FaListAlt, FaUserCog, FaSignOutAlt } from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuario");
    if (!usuarioSalvo) {
      navigate("/");
    } else {
      setUsuario(JSON.parse(usuarioSalvo));
    }
  }, [navigate]);

  if (!usuario) return null;

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fa] font-sans">
      <Header />
      <main className="flex-grow px-6 py-10 md:px-12 max-w-7xl mx-auto w-full">
        
        <section className="mb-12">
          <h1 className="text-3xl font-bold text-gray-800">
            Olá, <span className="text-[#004A8D]">{usuario.nome}</span>
          </h1>
          <p className="text-gray-500 mt-1">Bem-vindo ao seu painel NAF.</p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Botão Novo Agendamento */}
          <div onClick={() => navigate("/novo-agendamento")} className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 cursor-pointer transition-all">
            <div className="mb-5 w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <FaCalendarPlus size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Novo Agendamento</h3>
            <p className="text-gray-500 text-sm">Agende um novo serviço ou mentoria.</p>
          </div>

          {/* Botão Meus Agendamentos */}
          <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 cursor-pointer transition-all opacity-60">
            <div className="mb-5 w-16 h-16 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
              <FaListAlt size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Histórico</h3>
            <p className="text-gray-500 text-sm">Veja seus agendamentos (Em breve).</p>
          </div>

          {/* Botão Perfil */}
          <div onClick={() => navigate("/perfil")} className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 cursor-pointer transition-all">
            <div className="mb-5 w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center text-gray-600">
              <FaUserCog size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Minha Conta</h3>
            <p className="text-gray-500 text-sm">Gerencie seus dados pessoais.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
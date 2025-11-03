import React from "react";
import Header from "../components/Header"; //
import { FaCalendarCheck, FaUserCircle } from "react-icons/fa";
import { BiTime } from "react-icons/bi";

export default function Home() {
  return (
    // Container principal que ocupa a tela toda
    <div className="flex min-h-screen flex-col bg-bg-light">
      
      {/* 1. Header (O seu componente que já existe) */}
      <Header /> {/* */}

      {/* 2. Conteúdo Principal */}
      <main className="flex-grow px-4 py-12 text-center md:px-8 md:py-16">
        
        {/* Seção Hero */}
        <section className="mb-12 md:mb-16">
          <h1 className="mb-4 text-4xl font-semibold text-gray-800 md:text-5xl">
            Seja bem vindo
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-header md:text-xl">
            Agende seu atendimento fiscal de forma rápida, fácil e gratuita.
            Profissionais capacitados prontos para auxiliar você!
          </p>
        </section>

        {/* Intro dos Benefícios */}
        <section className="mb-12 md:mb-16">
          <p className="text-lg text-gray-600">
            Oferecemos suporte gratuito e especializado para suas
            necessidades fiscais
          </p>
        </section>

        {/* Cards de Benefícios */}
        <section className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          
          {/* Card 1 */}
          <div className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
            <FaCalendarCheck className="mb-6 text-5xl text-header" />
            <h3 className="mb-3 text-2xl font-semibold text-gray-800">
              Agendamento online
            </h3>
            <p className="text-gray-600">
              Agende seus atendimentos de forma rápida e prática, 24 horas
              por dia.
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
            <BiTime className="mb-6 text-5xl text-header" />
            <h3 className="mb-3 text-2xl font-semibold text-gray-800">
              Economia de Tempo
            </h3>
            <p className="text-gray-600">
              Agende seus atendimentos de forma rápida e prática, 24 horas
              por dia.
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
            <FaUserCircle className="mb-6 text-5xl text-header" />
            <h3 className="mb-3 text-2xl font-semibold text-gray-800">
              Atendimento Especializado
            </h3>
            <p className="text-gray-600">
              Agende seus atendimentos de forma rápida e prática, 24 horas
              por dia.
            </p>
          </div>

        </section>
      </main>

      {/* 3. Rodapé */}
      <footer className="w-full bg-footer p-6 text-center text-white mt-12">
        <p className="text-sm">
          © 2025 NAF - Todos os direitos reservados
        </p>
      </footer>
    </div>
  );
}
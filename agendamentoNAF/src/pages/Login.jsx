import React from "react";

export default function Login() {
  return (
    <div className="min-h-screen bg-bg-login flex items-center justify-center p-4 relative">
      <div className="bg-white rounded-2xl shadow-[0px_4px_10px_1px_rgba(0,0,0,0.48)] w-full max-w-[850px] relative flex flex-col md:flex-row overflow-hidden">
        {/* CONTEÚDO */}
        <div className="flex flex-col gap-6 grow px-10 py-10 relative md:w-[500px]">
          {/* ÍCONE + TÍTULO */}
          <div className="flex flex-col items-center text-center">
            <img
              className="w-16 h-16 mb-2"
              src="/img/icone-agendamentos.png"
              alt="icone"
            />

            <h1 className="text-black text-2xl font-bold font-['Inter'] md:text-left text-center">
              Acesso ao Agendamentos NAF
            </h1>

            {/* TEXTO */}
            <p className="text-black text-sm font-normal font-['Inter'] md:text-left text-center max-w-[350px]">
              Agende em segundos, confirme automaticamente e transforme cada
              horário em experiência pontual.
            </p>
          </div>

          {/* FORMULÁRIO */}
          <form className="flex flex-col gap-4  w-full">
            <div className="flex flex-col gap-1">
              <label className="text-black text-base font-medium font-['Inter']">
                Matrícula
              </label>
              <input
                className="px-3 py-2 bg-indigo-50 rounded-[20px] outline outline-1 outline-stone-300"
                type="text"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-black text-base font-medium font-['Inter']">
                Senha
              </label>
              <input
                className="px-3 py-2 bg-indigo-50 rounded-[20px] outline outline-1 outline-stone-300 "
                type="password"
              />
            </div>

            {/* BOTÃO  */}
            <button className="bg-blue-700 text-white text-base font-medium font-['Inter'] py-3 rounded-[20px] w-full cursor-pointer">
              Acessar
            </button>
          </form>

          {/* LINK CADASTRO */}
          <div className="flex flex-col items-center text-sm mt-1">
            <span className="text-zinc-500 font-medium font-['Inter']">
              Ainda não possui conta?{" "}
              <a className="text-black text-sm font-medium  " href="/cadastro">
                Cadastre-se
              </a>
            </span>
          </div>
        </div>

        {/* IMAGEM */}
        <div className="md:w-[350px] w-full h-[250px] md:h-auto">
          <img
            className="w-full h-full object-left "
            src="/img/img_tela_login.png"
            alt="login"
          />
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  
  const [email, setEmail] = useState(""); 
  const [senha, setSenha] = useState("");
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const API_URL = "http://localhost:3001/api";

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError(null); 

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email: email, 
        senha: senha,
      });

      const { token, usuario } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify(usuario)); 

      navigate("/home");

    } catch (err) {
      if (err.response && (err.response.status === 401 || err.response.status === 404)) {
        setError("Email ou senha inválidos.");
      } else if (err.response && err.response.status === 403) {
         setError(`Usuário bloqueado. Fim do bloqueio: ${err.response.data.data_fim_bloqueio}`);
      } else {
        setError("Erro ao tentar fazer login. Tente novamente mais tarde.");
      }
      console.error("Erro no login:", err);
    }
  };

  return (
    <div className="min-h-screen bg-bg-login flex items-center justify-center p-4 relative">
      <div className="bg-white rounded-2xl shadow-[0px_4px_10px_1px_rgba(0,0,0,0.48)] w-full max-w-[850px] relative flex flex-col md:flex-row overflow-hidden">
        
        <div className="flex flex-col gap-6 grow px-10 py-10 relative md:w-[500px]">
          <div className="flex flex-col items-center text-center">
            <img
              className="w-16 h-16 mb-2"
              src="/img/icone-agendamentos.png"
              alt="icone"
            />
            <h1 className="text-black text-2xl font-bold font-['Inter'] md:text-left text-center">
              Acesso ao Agendamentos NAF
            </h1>
            <p className="text-black text-sm font-normal font-['Inter'] md:text-left text-center max-w-[350px]">
              Agende em segundos, confirme automaticamente e transforme cada
              horário em experiência pontual.
            </p>
          </div>

          <form className="flex flex-col gap-4  w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label className="text-black text-base font-medium font-['Inter']">
                Email
              </label>
              <input
                className="px-3 py-2 bg-indigo-50 rounded-[20px] outline outline-1 outline-stone-300"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-black text-base font-medium font-['Inter']">
                Senha
              </label>
              <input
                className="px-3 py-2 bg-indigo-50 rounded-[20px] outline outline-1 outline-stone-300 "
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              <div className="text-right mt-1">
                <Link to="/esqueci-senha" class="text-xs text-blue-600 hover:underline font-medium">
                    Esqueci minha senha
                </Link>
              </div>
            </div>

            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="bg-blue-700 text-white text-base font-medium font-['Inter'] py-3 rounded-[20px] w-full cursor-pointer hover:bg-blue-800 transition-colors"
            >
              Acessar
            </button>
          </form>

          <div className="flex flex-col items-center text-sm mt-1">
            <span className="text-zinc-500 font-medium font-['Inter']">
              Ainda não possui conta?{" "}
              <a className="text-black text-sm font-medium  " href="/cadastro">
                Cadastre-se
              </a>
            </span>
          </div>
        </div>

        <div className="md:w-[350px] w-full h-[250px] md:h-auto">
          <img
            className="w-full h-full object-cover object-left" 
            src="/img/img_tela_login.png"
            alt="login"
          />
        </div>
      </div>
    </div>
  );
}
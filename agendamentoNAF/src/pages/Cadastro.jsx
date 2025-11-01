import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState(""); 
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();
  const API_URL = "http://localhost:3001/api";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // 1. Verificação de senha
    if (senha !== confirmaSenha) {
      setError("As senhas não coincidem.");
      return;
    }

    
    if (!nome || !email || !senha) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    try {
     
      const response = await axios.post(`${API_URL}/auth/register`, {
        nome: nome,
        email: email,
        senha: senha,
        tipo_usuario_id: 1, // <--- VALOR FIXO! Altere isso no futuro
        cnpj: null, // Opcional, enviando null
        cpf: null,  // Opcional, enviando null
      });
      
      setSuccess("Cadastro realizado com sucesso! Redirecionando para o login...");

      // Redireciona para o login após 2 segundos
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError("Este email (matrícula) já está cadastrado.");
      } else {
        setError("Erro ao tentar cadastrar. Tente novamente.");
      }
      console.error("Erro no cadastro:", err);
    }
  };

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
              Tela de Cadastro
            </h1>
          </div>
          {/* FORMULÁRIO */}
          <form className="flex flex-col gap-4  w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label className="text-black text-base font-medium font-['Inter']">
                Nome
              </label>
              <input
                className="px-3 py-2 bg-indigo-50 rounded-[20px] outline outline-1 outline-stone-300"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
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
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-black text-base font-medium font-['Inter']">
                Confirme sua senha
              </label>
              <input
                className="px-3 py-2 bg-indigo-50 rounded-[20px] outline outline-1 outline-stone-300 "
                type="password"
                value={confirmaSenha}
                onChange={(e) => setConfirmaSenha(e.target.value)}
                required
              />
            </div>

            {/* Mensagens de Erro ou Sucesso */}
            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}
            {success && (
              <p className="text-green-600 text-sm text-center">{success}</p>
            )}

            {/* BOTÃO */}
            <button
              type="submit"
              className="bg-blue-700 text-white text-base font-medium font-['Inter'] py-3 rounded-[20px] w-full mt-5 hover:bg-blue-800 transition-colors"
            >
              Registrar-se
            </button>
          </form>

          {/* LINK LOGIN */}
          <div className="flex flex-col items-center text-sm mt-1">
            <span className="text-zinc-500 font-medium font-['Inter']">
              Já possui conta?{" "}
              <a className="text-black text-sm font-medium  " href="/">
                Login
              </a>
            </span>
          </div>
        </div>

        {/* IMAGEM */}
        <div className="md:w-[350px] w-full h-[250px] md:h-auto">
          <img
            className="w-full h-full object-cover object-left" // Use object-cover
            src="/img/img_tela_login.png"
            alt="login"
          />
        </div>
      </div>
    </div>
  );
}
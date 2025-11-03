import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { cpf, cnpj } from "cpf-cnpj-validator"; 

export default function Cadastro() {
  
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  
 
  const [tiposUsuario, setTiposUsuario] = useState([]); 
  const [tipoUsuarioId, setTipoUsuarioId] = useState(""); 
  
 
  const [documentoTipo, setDocumentoTipo] = useState(null);
  const [documentoValor, setDocumentoValor] = useState(""); 
  
 
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();
  const API_URL = "http://localhost:3001/api";

  
  useEffect(() => {
    const fetchTiposUsuario = async () => {
      try {
        const response = await axios.get(`${API_URL}/tipos-usuario`);
        setTiposUsuario(response.data); 
      } catch (err) {
        console.error("Erro ao buscar tipos de usuário:", err);
        setError("Não foi possível carregar os tipos de usuário.");
      }
    };

    fetchTiposUsuario();
  }, [API_URL]);


  
  const handleTipoUsuarioChange = (e) => {
    const selectedId = e.target.value;
    const selectedText = e.target.options[e.target.selectedIndex].text;
    const selectedTextLower = selectedText.toLowerCase(); 

    setTipoUsuarioId(selectedId);
    setDocumentoValor(""); 
    setError(null); 


    if (
      selectedTextLower.includes("empreendedor") ||
      selectedTextLower.includes("mei") ||
      selectedTextLower.includes("empresa")
    ) {
      setDocumentoTipo("CNPJ");
    } else {
      
      setDocumentoTipo("CPF");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    
    if (senha !== confirmaSenha) {
      setError("As senhas não coincidem.");
      return;
    }

    if (!nome || !email || !senha || !tipoUsuarioId || !documentoValor) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    if (documentoTipo === "CPF" && !cpf.isValid(documentoValor)) {
      setError("CPF inválido. Por favor, verifique os dados.");
      return;
    }

    if (documentoTipo === "CNPJ" && !cnpj.isValid(documentoValor)) {
      setError("CNPJ inválido. Por favor, verifique os dados.");
      return;
    }
    
    
    const dadosCadastro = {
      nome: nome,
      email: email,
      senha: senha,
      tipo_usuario_id: parseInt(tipoUsuarioId, 10),
      cpf: documentoTipo === "CPF" ? documentoValor : null,
      cnpj: documentoTipo === "CNPJ" ? documentoValor : null,
    };

    try {
      await axios.post(`${API_URL}/auth/register`, dadosCadastro);
      
      setSuccess("Cadastro realizado com sucesso! Redirecionando para o login...");

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
                Matrícula (Email)
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

            <div className="flex flex-col gap-1">
              <label className="text-black text-base font-medium font-['Inter']">
                Tipo de Conta
              </label>
              <select
                className="px-3 py-2 bg-indigo-50 rounded-[20px] outline outline-1 outline-stone-300 appearance-none" 
                value={tipoUsuarioId}
                onChange={handleTipoUsuarioChange} 
                required
              >
                <option value="" disabled>Selecione um tipo de conta</option>
                {tiposUsuario.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.nome}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Campos Dinâmicos para CPF ou CNPJ */}
            {documentoTipo === "CPF" && (
              <div className="flex flex-col gap-1">
                <label className="text-black text-base font-medium font-['Inter']">
                  CPF
                </label>
                <input
                  className="px-3 py-2 bg-indigo-50 rounded-[20px] outline outline-1 outline-stone-300"
                  type="text"
                  placeholder="000.000.000-00"
                  value={documentoValor}
                  onChange={(e) => setDocumentoValor(e.target.value)}
                  required
                />
              </div>
            )}
            
            {documentoTipo === "CNPJ" && (
              <div className="flex flex-col gap-1">
                <label className="text-black text-base font-medium font-['Inter']">
                  CNPJ
                </label>
                <input
                  className="px-3 py-2 bg-indigo-50 rounded-[20px] outline outline-1 outline-stone-300"
                  type="text"
                  placeholder="00.000.000/0000-00"
                  value={documentoValor}
                  onChange={(e) => setDocumentoValor(e.target.value)}
                  required
                />
              </div>
            )}
            
            {/* Mensagens de Erro ou Sucesso */}
            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}
            {success && (
              <p className="text-green-600 text-sm text-center">{success}</p>
            )}

            <button
              type="submit"
              className="bg-blue-700 text-white text-base font-medium font-['Inter'] py-3 rounded-[20px] w-full mt-5 hover:bg-blue-800 transition-colors"
            >
              Registrar-se
            </button>
          </form>

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
            className="w-full h-full object-cover object-left" 
            src="/img/img_tela_login.png"
            alt="login"
          />
        </div>
      </div>
    </div>
  );
}
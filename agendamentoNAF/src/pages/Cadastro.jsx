import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
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

  useEffect(() => {
    const fetchTiposUsuario = async () => {
      try {
        const response = await api.get('/tipos-usuario');
        setTiposUsuario(response.data); 
      } catch (err) {
        setError("Não foi possível carregar os tipos de usuário.");
      }
    };
    fetchTiposUsuario();
  }, []);

  const handleTipoUsuarioChange = (e) => {
    const selectedId = e.target.value;
    const selectedText = e.target.options[e.target.selectedIndex].text.toLowerCase();
    setTipoUsuarioId(selectedId);
    setDocumentoValor(""); 
    setError(null); 
    if (selectedText.includes("empreendedor") || selectedText.includes("mei") || selectedText.includes("empresa")) {
      setDocumentoTipo("CNPJ");
    } else {
      setDocumentoTipo("CPF");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (senha !== confirmaSenha) return setError("As senhas não coincidem.");
    if (!nome || !email || !senha || !tipoUsuarioId || !documentoValor) return setError("Todos os campos são obrigatórios.");
    if (documentoTipo === "CPF" && !cpf.isValid(documentoValor)) return setError("CPF inválido.");
    if (documentoTipo === "CNPJ" && !cnpj.isValid(documentoValor)) return setError("CNPJ inválido.");
    
    try {
      await api.post('/auth/register', {
        nome, email, senha,
        tipo_usuario_id: parseInt(tipoUsuarioId, 10),
        cpf: documentoTipo === "CPF" ? documentoValor : null,
        cnpj: documentoTipo === "CNPJ" ? documentoValor : null,
      });
      setSuccess("Cadastro realizado! Redirecionando...");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.response?.status === 409 ? "Este email já está cadastrado." : "Erro ao tentar cadastrar.");
    }
  };

  return (
    <div className="min-h-screen bg-bg-login flex items-center justify-center p-4 relative">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-[850px] flex flex-col md:flex-row overflow-hidden">
        <div className="flex flex-col gap-6 grow px-10 py-10 relative md:w-[500px]">
          <div className="flex flex-col items-center text-center">
            <img className="w-16 h-16 mb-2" src="/img/icone-agendamentos.png" alt="icone" />
            <h1 className="text-black text-2xl font-bold font-['Inter']">Tela de Cadastro</h1>
          </div>
          
          <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
            {/* Campos simplificados para economizar espaço visual */}
            <div className="flex flex-col gap-1"><label>Nome</label><input className="px-3 py-2 bg-indigo-50 rounded-[20px] border" type="text" value={nome} onChange={(e) => setNome(e.target.value)} required /></div>
            <div className="flex flex-col gap-1"><label>Email</label><input className="px-3 py-2 bg-indigo-50 rounded-[20px] border" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
            <div className="flex flex-col gap-1"><label>Senha</label><input className="px-3 py-2 bg-indigo-50 rounded-[20px] border" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required /></div>
            <div className="flex flex-col gap-1"><label>Confirmar Senha</label><input className="px-3 py-2 bg-indigo-50 rounded-[20px] border" type="password" value={confirmaSenha} onChange={(e) => setConfirmaSenha(e.target.value)} required /></div>
            
            <div className="flex flex-col gap-1">
              <label>Tipo de Conta</label>
              <select className="px-3 py-2 bg-indigo-50 rounded-[20px] border" value={tipoUsuarioId} onChange={handleTipoUsuarioChange} required>
                <option value="" disabled>Selecione...</option>
                {tiposUsuario.map((tipo) => (<option key={tipo.id} value={tipo.id}>{tipo.nome}</option>))}
              </select>
            </div>
            
            {documentoTipo && (
              <div className="flex flex-col gap-1">
                <label>{documentoTipo}</label>
                <input className="px-3 py-2 bg-indigo-50 rounded-[20px] border" type="text" placeholder={documentoTipo === "CPF" ? "000.000.000-00" : "00.000.000/0000-00"} value={documentoValor} onChange={(e) => setDocumentoValor(e.target.value)} required />
              </div>
            )}
            
            {error && <p className="text-red-600 text-sm text-center">{error}</p>}
            {success && <p className="text-green-600 text-sm text-center">{success}</p>}

            <button type="submit" className="bg-blue-700 text-white py-3 rounded-[20px] mt-5 hover:bg-blue-800">Registrar-se</button>
          </form>
          <div className="text-center text-sm mt-1">Já possui conta? <a className="text-black font-medium" href="/">Login</a></div>
        </div>
        <div className="md:w-[350px] w-full h-[250px] md:h-auto"><img className="w-full h-full object-cover object-left" src="/img/img_tela_login.png" alt="login" /></div>
      </div>
    </div>
  );
}
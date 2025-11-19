import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import Header from "../components/Header";

function ConfiguracoesConta() {
  const navigate = useNavigate();
  const API_URL = "http://localhost:3001/api";

  
  const [usuarioId, setUsuarioId] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cpf: "",
    cnpj: "",
    
  });
  const [mensagem, setMensagem] = useState({ tipo: "", texto: "" });

  
  useEffect(() => {
    const carregarDados = async () => {
      const usuarioSalvo = localStorage.getItem("usuario");
      const token = localStorage.getItem("token");

      if (!usuarioSalvo || !token) {
        navigate("/"); 
        return;
      }

      const usuarioObj = JSON.parse(usuarioSalvo);
      setUsuarioId(usuarioObj.id);

      try {
        
        const response = await axios.get(`${API_URL}/usuarios/${usuarioObj.id}`, { 
          
            headers: { Authorization: `Bearer ${token}` }
        });
        
      
        if(response.data) {
            setFormData({
                nome: response.data.nome || "",
                email: response.data.email || "",
                cpf: response.data.cpf || "",
                cnpj: response.data.cnpj || ""
            });
        }

      } catch (error) {
        console.error("Erro ao buscar dados", error);
       
        setFormData({
            nome: usuarioObj.nome || "",
            email: usuarioObj.email || "", 
            cpf: "", 
            cnpj: "" 
        });
      }
    };

    carregarDados();
  }, [navigate]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSalvar = async () => {
    setMensagem({ tipo: "", texto: "" });
    const token = localStorage.getItem("token");

    try {
      await axios.put(`${API_URL}/usuarios/${usuarioId}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setMensagem({ tipo: "sucesso", texto: "Dados atualizados com sucesso!" });
      
    
      const usuarioLocal = JSON.parse(localStorage.getItem("usuario"));
      localStorage.setItem("usuario", JSON.stringify({ ...usuarioLocal, nome: formData.nome }));

    } catch (error) {
      console.error("Erro ao salvar:", error);
      setMensagem({ tipo: "erro", texto: "Erro ao atualizar os dados." });
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f3fbff] via-white to-white font-sans">
        <Header />

        <header className="mt-8 text-center">
          <h1 className="text-[28px] font-semibold text-[#1b2838] mb-2">
            Configurações de conta
          </h1>
          <p className="text-sm text-gray-500">
            Gerencie suas informações pessoais e preferências
          </p>
        </header>

        <main className="mt-8 flex flex-col items-center pb-10">
          <div className="-mb-8 z-10">
            <div className="w-16 h-16 rounded-full border-4 border-white shadow-lg flex items-center justify-center bg-gradient-to-b from-[#1fa1ff] to-[#0072d4]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-7 h-7 text-white">
                <path fill="currentColor" d="M12 12a4 4 0 1 0-4-4 4.003 4.003 0 0 0 4 4Zm0 2c-4.01 0-7 2.005-7 4.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5C19 16.005 16.01 14 12 14Z"/>
              </svg>
            </div>
          </div>

          <section className="bg-white rounded-2xl shadow-2xl w-11/12 md:w-2/3 lg:w-1/2 max-w-2xl px-6 md:px-8 pt-14 pb-10">
            <div className="mb-4">
              <h2 className="text-base font-semibold text-gray-700 mb-2">
                Dados Pessoais
              </h2>
              <div className="h-px w-full bg-gray-200" />
            </div>

            
            {mensagem.texto && (
                <div className={`mb-4 p-3 rounded text-center text-sm ${mensagem.tipo === 'sucesso' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {mensagem.texto}
                </div>
            )}

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
              <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1">Nome Completo</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="rounded-md border border-gray-200 bg-[#f5f7fb] px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/60 transition"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1">E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="rounded-md border border-gray-200 bg-[#f5f7fb] px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/60 transition"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1">CPF</label>
                <input
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
                  className="rounded-md border border-gray-200 bg-[#f5f7fb] px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/60 transition"
                />
              </div>

               <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1">CNPJ</label>
                <input
                  type="text"
                  name="cnpj"
                  value={formData.cnpj}
                  onChange={handleChange}
                  className="rounded-md border border-gray-200 bg-[#f5f7fb] px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/60 transition"
                />
              </div>

              
            </div>

            
            <div className="mt-8 flex justify-center">
                <button
                    type="button"
                    onClick={handleSalvar}
                    className="bg-blue-600 text-white px-8 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg"
                >
                    Gravar Alterações
                </button>
            </div>

          </section>

          <button
            type="button"
            onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("usuario");
                navigate("/");
            }}
            className="mt-7 bg-[#e11d27] text-white px-10 py-2.5 rounded-full text-sm font-medium shadow-[0_6px_18px_rgba(225,29,39,0.4)] hover:shadow-[0_8px_22px_rgba(225,29,39,0.45)] hover:-translate-y-[1px] transition-transform"
          >
            Sair
          </button>
        </main>

        <footer className="mt-auto w-full bg-[#004A8D] py-2 flex justify-center">
          <span className="text-[11px] text-white">
            © 2025 NAF - Todos os direitos reservados.
          </span>
        </footer>
      </div>
    </>
  );
}

export default ConfiguracoesConta;
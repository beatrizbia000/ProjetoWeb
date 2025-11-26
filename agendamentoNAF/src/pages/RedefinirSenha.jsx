import React, { useState } from 'react';
import api from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

export default function RedefinirSenha() {
    const { id, token } = useParams();
    const navigate = useNavigate();
    const [senha, setSenha] = useState("");
    const [confirmar, setConfirmar] = useState("");
    const [erro, setErro] = useState("");

    const handleSalvar = async (e) => {
        e.preventDefault();
        if (senha !== confirmar) {
            setErro("As senhas não coincidem.");
            return;
        }

        try {
            await api.post('/auth/reset-password', { 
                id, token, novaSenha: senha 
            });
            alert("Senha alterada com sucesso! Faça login com a nova senha.");
            navigate("/");
        } catch (error) {
            setErro("Erro: Link inválido ou expirado.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Nova Senha</h2>
                
                <form onSubmit={handleSalvar} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nova Senha</label>
                        <input 
                            type="password" 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={senha} onChange={e => setSenha(e.target.value)} required 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Senha</label>
                        <input 
                            type="password" 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={confirmar} onChange={e => setConfirmar(e.target.value)} required 
                        />
                    </div>

                    {erro && <div className="text-red-600 text-sm text-center">{erro}</div>}

                    <button type="submit" className="bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition shadow-md mt-2">Salvar Senha</button>
                </form>
            </div>
        </div>
    );
}
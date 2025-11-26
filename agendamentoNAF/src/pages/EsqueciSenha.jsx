import React, { useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

export default function EsqueciSenha() {
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");
    const [erro, setErro] = useState("");

    const handleEnviar = async (e) => {
        e.preventDefault();
        setMsg("");
        setErro("");
        try {
            await api.post('/auth/forgot-password', { email });
            setMsg("Link enviado! Verifique seu e-mail (ou o console do servidor).");
        } catch (error) {
            setErro("Erro ao enviar solicitação. Verifique o e-mail.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">Recuperar Senha</h2>
                <p className="text-center text-gray-500 mb-6 text-sm">Digite seu e-mail para receber o link de redefinição.</p>
                
                <form onSubmit={handleEnviar} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                        <input 
                            type="email" 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={email} onChange={e => setEmail(e.target.value)} required 
                        />
                    </div>
                    <button type="submit" className="bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-md">Enviar Link</button>
                </form>

                {msg && <div className="mt-4 p-3 bg-green-50 text-green-700 rounded text-center text-sm border border-green-200">{msg}</div>}
                {erro && <div className="mt-4 p-3 bg-red-50 text-red-700 rounded text-center text-sm border border-red-200">{erro}</div>}
                
                <div className="mt-6 text-center">
                    <Link to="/" className="text-sm text-blue-600 hover:underline">Voltar ao Login</Link>
                </div>
            </div>
        </div>
    );
}
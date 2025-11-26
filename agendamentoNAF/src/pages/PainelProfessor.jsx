import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Header from "../components/Header";
import { FaExclamationCircle, FaUserGraduate, FaCheck, FaTimes, FaSave, FaEdit } from "react-icons/fa";

export default function PainelProfessor() {
  const navigate = useNavigate();
  const [agendamentos, setAgendamentos] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [pendentes, setPendentes] = useState({});
  const [editandoId, setEditandoId] = useState(null);
  const [alunoEditadoId, setAlunoEditadoId] = useState("");

  useEffect(() => { carregar(); }, []);
  const carregar = async () => {
    const token = localStorage.getItem("token");
    try {
      const [resA, resAl] = await Promise.all([
        api.get('/agendamentos/meus-agendamentos', { headers: { Authorization: `Bearer ${token}` } }),
        api.get('/agendamentos/alunos', { headers: { Authorization: `Bearer ${token}` } })
      ]);
      setAgendamentos(resA.data); setAlunos(resAl.data);
    } catch (e) { console.error(e); }
  };

  const atribuir = async (id, alunoId) => {
    const token = localStorage.getItem("token");
    try { await api.put(`/agendamentos/${id}/atribuir`, { alunoId }, { headers: { Authorization: `Bearer ${token}` } }); setEditandoId(null); carregar(); } catch (e) { alert("Erro"); }
  };

  const concluir = async (id) => {
    if (!confirm("Concluir?")) return;
    const token = localStorage.getItem("token");
    try { await api.put(`/agendamentos/${id}/status`, { status: 'realizado' }, { headers: { Authorization: `Bearer ${token}` } }); carregar(); } catch (e) { alert("Erro"); }
  };

  const listaPendentes = agendamentos.filter(a => !a.nome_aluno && a.status === 'agendado');
  const listaAndamento = agendamentos.filter(a => a.nome_aluno && a.status === 'agendado');

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20"><Header />
      <main className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between mb-6"><h1 className="text-3xl font-bold">Painel do Professor</h1><button onClick={() => navigate("/gerenciar-horarios")} className="bg-indigo-600 text-white px-4 py-2 rounded">Gerenciar Horários</button></div>
        <section className="mb-12"><h2 className="text-xl font-bold text-yellow-600 mb-4 flex items-center gap-2"><FaExclamationCircle /> Pendentes</h2>
          <div className="grid gap-6 md:grid-cols-2">{listaPendentes.map(i => (<div key={i.id} className="bg-white p-6 rounded shadow border-l-4 border-yellow-400"><h3 className="font-bold">{i.nome_servico}</h3><p>Cliente: {i.nome_cliente}</p><p className="font-bold mb-4">{new Date(i.data_horario).toLocaleString()}</p><div className="flex gap-2"><select className="flex-1 border rounded" onChange={e => setPendentes({...pendentes, [i.id]: e.target.value})}><option value="">Aluno...</option>{alunos.map(a => <option key={a.id} value={a.id}>{a.nome}</option>)}</select><button onClick={() => atribuir(i.id, pendentes[i.id])} className="bg-blue-600 text-white px-4 py-2 rounded">Assumir</button></div></div>))}</div>
        </section>
        <section><h2 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2"><FaUserGraduate /> Em Andamento</h2>
          <div className="bg-white rounded shadow"><table className="w-full text-left p-4"><thead><tr className="bg-gray-100"><th className="p-4">Data</th><th>Serviço</th><th>Aluno</th><th>Ações</th></tr></thead><tbody>{listaAndamento.map(i => (<tr key={i.id} className="border-t"><td className="p-4">{new Date(i.data_horario).toLocaleString()}</td><td>{i.nome_servico}</td><td>{editandoId === i.id ? <select onChange={e => setAlunoEditadoId(e.target.value)} className="border">{alunos.map(a => <option key={a.id} value={a.id}>{a.nome}</option>)}</select> : i.nome_aluno}</td><td className="flex gap-2 pt-4">{editandoId === i.id ? <><button onClick={() => atribuir(i.id, alunoEditadoId)} className="text-green-600"><FaSave/></button><button onClick={() => setEditandoId(null)} className="text-gray-400"><FaTimes/></button></> : <><button onClick={() => {setEditandoId(i.id); setAlunoEditadoId(alunos.find(a=>a.nome===i.nome_aluno)?.id)}} className="text-blue-600"><FaEdit/></button><button onClick={() => concluir(i.id)} className="text-green-600 flex items-center gap-1"><FaCheck/> Concluir</button></>}</td></tr>))}</tbody></table></div>
        </section>
      </main>
    </div>
  );
}
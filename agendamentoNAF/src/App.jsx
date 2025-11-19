import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login"; 
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home"; 
import ConfiguracoesConta from "./pages/ConfiguracoesConta";
import NovoAgendamento from "./pages/NovoAgendamento"; 

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/perfil" element={<ConfiguracoesConta />} />
        <Route path="/novo-agendamento" element={<NovoAgendamento />} />
      </Routes>
    </>
  );
}

export default App;
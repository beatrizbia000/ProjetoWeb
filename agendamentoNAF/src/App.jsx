import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/home";
import ConfiguracoesConta from "./pages/ConfiguracoesConta";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/perfil" element={<ConfiguracoesConta />} />
      </Routes>
    </>
  );
}

export default App;

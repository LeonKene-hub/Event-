import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer"

import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import EventosPage from "./pages/EventosPage/EventosPage";
import TipoEventos from "./pages/TiposEventoPage/TiposEventoPage";
import TesteEffect from "./pages/Teste/TesteEffect";

const Rotas = () => {
  return (
    <BrowserRouter>
      <Header />
      
      <Routes>
        <Route element={<HomePage />} path={"/"} exact />
        <Route element={<LoginPage />} path={"/login"} exact />
        <Route element={<EventosPage />} path={"/eventos"} exact />
        <Route element={<TipoEventos />} path={"/tipo-eventos"} exact />
        <Route element={<TesteEffect />} path={"/testeEffect"} exact />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default Rotas;
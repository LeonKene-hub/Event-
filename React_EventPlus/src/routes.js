import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";

import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import EventosPage from "./pages/EventosPage/EventosPage";
import TipoEventos from "./pages/TipoEventos/TipoEventos";
import TestePage from "./pages/teste/TestePage";

const Rotas = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<HomePage />} path={"/"} exact />
        <Route element={<LoginPage />} path={"/login"} exact />
        <Route element={<EventosPage />} path={"/eventos"} exact />
        <Route element={<TipoEventos />} path={"/tipoEventos"} exact />
        <Route element={<TestePage />} path={"/testes"} exact />
      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;

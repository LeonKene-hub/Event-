import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return(
        <header>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/eventos">Eventos</Link>
                <Link to="/tipoEventos">Tipos Eventos</Link>
                <Link to="/login">Login</Link>
                <Link to="/testes">Testes</Link>
            </nav>
        </header>
    );
}

export default Header;
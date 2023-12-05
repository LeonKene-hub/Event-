import React, { useContext } from 'react';
import './Nav.css'
//importando imagem do logotipo
import logoMobile from '../../assets/images/logo-white.svg';
import logoDesktop from '../../assets/images/logo-pink.svg';
import { UserContext } from "../../context/AuthContext"

import { Link } from 'react-router-dom';
const Nav = ({ exibeNavbar, setExibeNavbar }) => {
    const { userData } = useContext(UserContext)

    return (
        //Quando o exibeNavbar for true ele muda para a class exibeNavbar, quando for false é vazio ""
        <nav className={`navbar ${exibeNavbar ? "exibeNavbar" : ""}`}>
            <span onClick={() => { setExibeNavbar(false) }} className='navbar__close' >X</span>

            <Link href="" className='eventlogo'>
                <img
                    className='eventlogo__logo-image'
                    src={window.innerWidth >= 992 ? logoDesktop : logoMobile}
                    alt="Event Plus Logo"
                />
            </Link>

            <div className="navbar__items-box">

                <Link to="/" className='navbar__item'>Home</Link>

                {userData.nome && userData.role === "Administrador" ? (
                    <>
                        <Link to="/tipo-eventos" className='navbar__item'>Tipos de Evento</Link>
                        <Link to="/eventos" className='navbar__item'>Eventos</Link>
                    </>
                ) :
                    userData.nome && userData.role === "Comum" ? (
                        <Link className='navbar__item' to="/eventos-aluno">Eventos Aluno</Link>
                    ) : null

                }

            </div>
        </nav>
    );
};

export default Nav;
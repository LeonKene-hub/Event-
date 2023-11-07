import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';

import logoMobile from "../../assets/images/logo-white.svg"
import logoDesktop from "../../assets/images/logo-pink.svg"

const Nav = ({ exibeNavbar, setExibeNavbar }) => {

    return (
        <nav className={`navbar ${exibeNavbar ? "exibeNavbar" : ""}`}>
            <span onClick={() => {setExibeNavbar(false)}} 
            className='navbar__close'>X</span>

            <Link to="/" className='eventlogo'>
                <img className='eventlogo__logo-image' 
                src={window.innerWidth >= 992 ? logoDesktop : logoMobile}
                alt="event plus logo" />
            </Link>

            <div className="navbar__items-box">
                <Link className='navbar__item' to="/">Home</Link>
                <Link className='navbar__item' to="/tipo-eventos" >Tipos de eventos</Link>
                <Link className='navbar__item' to="/eventos">Eventos</Link>
                <Link className='navbar__item' to="/login" >Login</Link>
            </div>

        </nav>
    );
};

export default Nav;
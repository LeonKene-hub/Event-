import React from 'react';
import './Nav.css';

import logoMobile from "../../assets/images/images/logo-white.svg"
import logoDesktop from "../../assets/images/images/logo-pink.svg"


const Nav = () => {
    return (
        <nav className='navbar'>
            <span className='navbar__close'>X</span>

            <a href="" className='eventlogo'>
                <img className='eventlogo__logo-image' src={window.innerHeight >= 992 ? logoMobile : logoDesktop} alt="event plus logo" />
            </a>

            <div className="navbar__items-box">
                <a href="">Home</a>
                <a href="">Tipos de eventos</a>
                <a href="">Usuarios</a>
            </div>
        </nav>
    );
};

export default Nav;
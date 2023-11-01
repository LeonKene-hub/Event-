//react e  css da pagina
import React from "react";
import './Header.css';

//componentes usados na pagina
import Container from '../Container/Container'
import Nav from "../Nav/Nav";
import PerfilUsuario from "../PerfilUsuario/PerfilUsuario";

//imagens
import menubar from "../../assets/images/images/menubar.png";


const Header = () => {
    return(
        <header className="headerpage">
            <Container>
                <div className="header-flex">
                    <img 
                    src={menubar}
                    alt="Imagem menu de barras.Serve para exibir ou esconder o menu no smartphone" 
                    />

                    <Nav/>

                    <PerfilUsuario/>
                </div>
            </Container>
        </header>
    );
}

export default Header;
//react e  css da pagina
import React, { useState } from "react";
import './Header.css';

//componentes usados na pagina
import Container from '../Container/Container'
import Nav from "../Nav/Nav";
import PerfilUsuario from "../PerfilUsuario/PerfilUsuario";

//imagens
import menubar from "../../assets/images/menubar.png";


const Header = () => {

    const [exibeNavbar, setExibeNavbar] = useState(false); //estado do menu (exibe ou nao)

    return(
        <header className="headerpage">
            <Container>
                <div className="header-flex">
                    <img 
                    onClick={() => {setExibeNavbar(true)}}
                    src={menubar}
                    alt="Imagem menu de barras.Serve para exibir ou esconder o menu no smartphone" 
                    className="headerpage__menubar"
                    />

                    <Nav exibeNavbar={exibeNavbar}  setExibeNavbar={setExibeNavbar} />

                    <PerfilUsuario/>
                </div>
            </Container>
        </header>
    );
}

export default Header;
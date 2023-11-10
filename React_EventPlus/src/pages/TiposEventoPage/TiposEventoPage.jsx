import React from 'react';
import './TiposEventoPage.css';
import Title from '../../components/Title/Title';
import MainContent from '../../components/Main/MainContent';
import Container from "../../components/Container/Container"

const TiposEventoPage = () => {
    return (
        <>
            <MainContent>
                <section className="cadastro-evento-section">
                    <Container>
                        <div className="cadastro-evento-box">
                            <Title titleText="Cadastro Tipos de Eventos" />

                            <ImageIlustrator />

                            <form className='ftipo-evento'>
                                <p>formulario aqui</p>
                            </form>
                        </div>
                    </Container>
                </section>
            </MainContent>
        </>
    );
};

export default TiposEventoPage;

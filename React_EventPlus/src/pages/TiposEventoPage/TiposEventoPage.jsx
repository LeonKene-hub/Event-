import React, { useState } from 'react';
import './TiposEventoPage.css';
import Title from '../../components/Title/Title';
import MainContent from '../../components/Main/MainContent';
import Container from "../../components/Container/Container"
import ImageIllustrator from '../../components/ImageIllustrator/ImageIllustrator';

const TiposEventoPage = () => {
    const [frmEdit, setFrmEdit] = useState(false); //esta em mood edicao?

    function handleSubmit(params) {
        alert("aaaa");
    }
    function handleUpdate(params) {
        alert("bbbb")
    }

    return (
        <>
            <MainContent>
                <section className="cadastro-evento-section">
                    <Container>
                        <div className="cadastro-evento__box">
                            <Title titleText="Cadastro Tipos de Eventos" />

                            <ImageIllustrator altText={"teste de imagem"} imageName={"tipo-evento"} />

                            <form 
                                className='ftipo-evento'
                                onSubmit={frmEdit ? handleUpdate : handleSubmit}
                            >
                                {/* cadastrar ou editar */}
                                {
                                    !frmEdit ? (<p>Tela de cadastro</p>) : (<p>Tela de edicao</p>)
                                }
                            </form>
                        </div>
                    </Container>
                </section>
            </MainContent>
        </>
    );
};

export default TiposEventoPage;

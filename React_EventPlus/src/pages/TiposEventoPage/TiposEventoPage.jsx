import React, { useEffect, useState } from "react";
import "./TiposEventoPage.css";
import Title from "../../components/Title/Title";
import MainContent from "../../components/Main/MainContent";
import Container from "../../components/Container/Container";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import { Button, Input } from "../../components/FormComponents/FormComponents";
import api, { eventTypeResource } from "../../Services/Service";
import TableTp from "./TableTP/TableTp";

const TiposEventoPage = () => {
  const [frmEdit, setFrmEdit] = useState(false); //esta em modo edicao?
  const [titulo, setTitulo] = useState("");
  const [tipoEventos, setTipoEventos] = useState([]);

  useEffect(() => {
    async function loadEventsType() {
        try {
            const retorno = await api.get(eventTypeResource);
            setTipoEventos(retorno.data);
            console.log(retorno.data);
        } catch (error) {
            console.log(`Deu ruim, erro: ${error}`);
        }
    }
    //chama a funcao/api no carregamento da pagina/componente
    loadEventsType();
  }, [])

  //SUBMIT
  async function handleSubmit(e) {
    e.preventDefault();
    
    if (titulo.trim().length < 3) {
        alert("O titulo deve ter pelo menos 3 caracteres");
    }

    try {
        const retorno = await api.post(eventTypeResource, {
            titulo: titulo
        });
        setTitulo("");
        alert("Cadastrado com sucesso"); 
    } catch (error) {
        alert("Deu ruim no submit")
    }
  }

  //realiza o update do tipo na api
  function handleUpdate() {
    alert("update");
  }

  //apaga o tipo de evento da api
  function handleDelete(idElement) {
    alert(`DELETE ${idElement}`);
  }

  //mostra o formulario de edicao
  function showUpdateForm() {
    alert(`Vamos mostrar o formulario`);
  }

  //cancela a tela/acao de edicao
  function editActionAbort() {
    alert('Cancelar a tela de edicao de dados');
  }

  return (
    <>
      <MainContent>
        {/*Formulario de cadastro e edicao de tipo evento*/}
        <section className="cadastro-evento-section">
          <Container>
            <div className="cadastro-evento__box">
              <Title titleText="Cadastro Tipos de Eventos" />

              <ImageIllustrator
                altText={"imagem de dois usuarios realizando cadastro"}
                imageName={"tipo-evento"}
              />

              <form
                className="ftipo-evento"
                onSubmit={frmEdit ? handleUpdate : handleSubmit}
              >
                {/* cadastrar ou editar */}
                {!frmEdit ? (
                  //cadastrar
                  <>
                    <Input 
                        id='Titulo'
                        placeholder='Titulo'
                        name='titulo'
                        type="text"
                        required="required"
                        value={titulo}
                        manipulationFuntion={(e) => {
                            setTitulo(e.target.value); //pega o valor de si mesmo
                        }}
                    />

                    <Button 
                        textButton="Cadastrar"
                        id={"Cadastrar"}
                        name="cadastrar"
                        type="submit"
                    />
                  </>
                ) : (
                  //editar
                  <p>Tela de edicao</p>
                )}
              </form>


            </div>
          </Container>
        </section>

        {/*Listagem de tipo de eventos*/}
        <section className="lista-eventos-section">
            <Container>
                <Title titleText="Lista Tipo de Eventos" color="white"/>
                <TableTp 
                    dados={tipoEventos}
                    fnUpdate={showUpdateForm}
                    fnDelete={handleDelete}
                />
            </Container>
        </section>
      </MainContent>
    </>
  );
};

export default TiposEventoPage;
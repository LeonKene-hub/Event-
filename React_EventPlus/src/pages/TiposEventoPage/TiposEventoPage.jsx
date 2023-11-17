import React, { useEffect, useState } from "react";
import "./TiposEventoPage.css";
import Title from "../../components/Title/Title";
import MainContent from "../../components/Main/MainContent";
import Container from "../../components/Container/Container";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import Notification from "../../components/Notification/Notification";
import { Button, Input } from "../../components/FormComponents/FormComponents";
import api, { eventTypeResource } from "../../Services/Service";
import TableTp from "./TableTP/TableTp";

const TiposEventoPage = () => {
  const [frmEdit, setFrmEdit] = useState(false); //esta em modo edicao?
  const [titulo, setTitulo] = useState("");
  const [tipoEventos, setTipoEventos] = useState([]);
  const [notifyUser, setNotifyUser] = useState();

  //****************** PONTE DE DADOS *********************/
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
    //chama a funcao/api no carregamento da pagina/componente com valor deentro carrega quano valor alterado
    loadEventsType();
  }, []);

  //****************** CADASTRO DE DADOS *********************/
  //SUBMIT
  async function handleSubmit(e) {
    e.preventDefault();

    if (titulo.trim().length < 3) {
      alert("O titulo deve ter pelo menos 3 caracteres");
      return;
    }

    try {
      const retorno = await api.post(eventTypeResource, {
        titulo: titulo,
      });
      setTitulo("");

      //atualiza
      const buscaEventos = await api.get(eventTypeResource);
      setTipoEventos(buscaEventos.data);
      
    } catch (error) {
      alert("Deu ruim no submit");
    }
  }

  //****************** DELETAR DE DADOS *********************/
  //apaga o tipo de evento da api
  async function handleDelete(idElement) {
    if (!window.confirm("Confirma a exclusão?")) {
      return;
    }

    try {
      const deletar = await api.delete(`${eventTypeResource}/${idElement}`);
      if (deletar.status == 204) {
        notifyDeleted();

        //atualiza
        const buscaEventos = await api.get(eventTypeResource);
        setTipoEventos(buscaEventos.data);
      }
    } catch (error) {
      alert(`Deu ruim no delete ${error}`);
    }
  }

  //****************** EDICAO DE DADOS *********************/
  //realiza o update do tipo na api
  function handleUpdate() {
    alert("update");
  }

  //mostra o formulario de edicao
  function showUpdateForm(idElement) {
    setFrmEdit(true);
  }

  //cancela a tela/acao de edicao
  function editActionAbort() {
    setFrmEdit(false);
  }

  function notifyDeleted() {
    setNotifyUser({
      titleNote: "Sucesso",
      textNote: "Evento excluido com sucesso",
      imgIcon: "success",
      imgAlt: "Imagem de ilutracao",
      showMessage: true,
    });
  }

  return (
    <>
      {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}

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
                id="form"
                className="ftipo-evento"
                onSubmit={frmEdit ? handleUpdate : handleSubmit}
              >
                {/* cadastrar ou editar */}
                {!frmEdit ? (
                  //cadastrar
                  <>
                    <Input
                      id="Titulo"
                      placeholder="Titulo"
                      name="titulo"
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
                  <>
                    <Input
                      id="editar"
                      placeholder={"Novo nome"}
                      name="titulo"
                      type="text"
                      required="required"
                    />

                    <Button
                      textButton={"Atualizar"}
                      id={"Atualizar"}
                      name={"atualizar"}
                      type="submit"
                      manipulationFuntion={handleUpdate}
                      additionalClass={""}
                    />

                    <Button
                      id={"cancelar"}
                      textButton={"Cancelar"}
                      name={"cancelar"}
                      type="submit"
                      manipulationFuntion={editActionAbort}
                    />
                  </>
                )}
              </form>
            </div>
          </Container>
        </section>

        {/*Listagem de tipo de eventos*/}
        <section className="lista-eventos-section">
          <Container>
            <Title titleText="Lista Tipo de Eventos" color="white" />
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

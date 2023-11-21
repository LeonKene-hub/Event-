import React, { useEffect, useState } from "react";
import "./TiposEventoPage.css";
import Title from "../../components/Title/Title";
import MainContent from "../../components/Main/MainContent";
import Container from "../../components/Container/Container";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import Notification from "../../components/Notification/Notification";
import Spinner from "../../components/Spinner/Spinner";
import { Button, Input } from "../../components/FormComponents/FormComponents";
import api, { eventTypeResource } from "../../Services/Service";
import TableTp from "./TableTP/TableTp";

const TiposEventoPage = () => {
  const [frmEdit, setFrmEdit] = useState(false); //esta em modo edicao?
  const [titulo, setTitulo] = useState("");
  const [tipoEventos, setTipoEventos] = useState([]);
  const [notifyUser, setNotifyUser] = useState();
  const [showSpinner, setShowSpinner] = useState(false); //spinner loading
  const [idTipoEvento, setIdTipoEvento] = useState(null);

  //****************** PONTE DE DADOS *********************/
  useEffect(() => {
    async function loadEventsType() {
      setShowSpinner(true);

      try {
        const retorno = await api.get(eventTypeResource);
        setTipoEventos(retorno.data);
        
      } catch (error) {
        console.log(`Deu ruim, erro: ${error}`);
      }

      setShowSpinner(false);
    }
    //chama a funcao/api no carregamento da pagina/componente com valor deentro carrega quano valor alterado
    loadEventsType();
  }, []);

  //****************** CADASTRO DE DADOS *********************/
  //SUBMIT
  async function handleSubmit(e) {
    e.preventDefault();

    if (titulo.trim().length < 3) {
      setNotifyUser({
        titleNote: "Aviso",
        textNote: "Necessario 3 caracteres ao menos.",
        imgIcon: "warning",
        imgAlt: "Imagem de ilustração de aviso. Mulher dando um chute em um ponto de esclamação",
        showMessage: true,
      });

      setTitulo("");
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

      setNotifyUser({
        titleNote: "Sucesso",
        textNote: "Evento cadastrado com sucesso.",
        imgIcon: "success",
        imgAlt: "Imagem de ilutracao. Mulher em frente ao simbolo de sucesso",
        showMessage: true,
      });

    } catch (error) {

      setNotifyUser({
        titleNote: "Erro",
        textNote: "Ocorreu um erro na API, verifique sua conexão com a internet.",
        imgIcon: "danger",
        imgAlt: "Imagem de ilutracao",
        showMessage: true,
    });
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
  
  function notifyDeleted() {
    setNotifyUser({
      titleNote: "Sucesso",
      textNote: "Evento excluido com sucesso",
      imgIcon: "success",
      imgAlt: "Imagem de ilutracao",
      showMessage: true,
    });
  }
  //****************** EDICAO DE DADOS *********************/

  //realiza o update do tipo na api
  async function handleUpdate(e) {  
    e.preventDefault();

    //verifica se tem 3 caracteres
    if (titulo.trim().length < 3) {
      setNotifyUser({
        titleNote: "Aviso",
        textNote: "Necessario 3 caracteres ao menos.",
        imgIcon: "warning",
        imgAlt: "Imagem de ilustração de aviso. Mulher dando um chute em um ponto de esclamação",
        showMessage: true,
      });
      return;
    }
    
    try {
      const atual = await api.put(`${eventTypeResource}/${idTipoEvento}`, {
        titulo: titulo
      });

      //notifica
      setNotifyUser({
        titleNote: "Sucesso",
        textNote: "Tipo evento editado com sucesso!",
        imgIcon: "success",
        imgAlt: "Imagem de sucesso",
        showMessage: true,
      });

      //atualiza a tela
      const buscaEventos = await api.get(eventTypeResource);
      setTipoEventos(buscaEventos.data);
      setFrmEdit(false);
      setTitulo("");

    } catch (error) {
      alert(error);
    }
  }
  
  //mostra o formulario de edicao
  async function showUpdateForm(idElement) {
    setFrmEdit(true);

    try {
      const dados = await api.get(`${eventTypeResource}/${idElement}`);

      let tituloEvento = dados.data.titulo
      setIdTipoEvento(dados.data.idTipoEvento);
      setTitulo(tituloEvento);
    } catch (error) {
      alert(error)
    }
  }
  
  //cancela a tela/acao de edicao
  function editActionAbort() {
    setFrmEdit(false);
    setTitulo("");
    setIdTipoEvento(null);
  }

  return (
    <>
      {showSpinner ? <Spinner /> : null}
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
                      value={titulo}
                      type="text"
                      required="required"
                      manipulationFuntion={(e) =>{
                        setTitulo(e.target.value)
                      }}
                    />

                    <div className="buttons-editbox">
                      <Button
                        textButton={"Atualizar"}
                        id={"Atualizar"}
                        name={"atualizar"}
                        type="submit"
                        manipulationFuntion={handleUpdate}
                        additionalClass="button-component--middle"
                      />

                      <Button
                        id={"cancelar"}
                        textButton={"Cancelar"}
                        name={"cancelar"}
                        type="submit"
                        manipulationFuntion={editActionAbort}
                        additionalClass="button-component--middle"
                      />
                    </div>
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

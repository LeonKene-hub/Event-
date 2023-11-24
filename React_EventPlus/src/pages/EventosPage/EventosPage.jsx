import React, { useEffect, useState } from "react";
import {Button, Input, Select} from "../../components/FormComponents/FormComponents";
import api, { eventsResource, eventTypeResource } from "../../Services/Service";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import Container from "../../components/Container/Container";
import MainContent from "../../components/Main/MainContent";
import Title from "../../components/Title/Title";
import TableEvent from "./TableEv/TableEvent";
import "./EventosPage.css";
import Notification from "../../components/Notification/Notification";

const EventosPage = () => {
  //dados completos
  const [eventos, setEventos] = useState([]);
  const [tiposEventos, setTiposEventos] = useState([]);

  //informacoes de evento
  const [idEvento, setIdEvento] = useState("");
  const [nomeEvento, setNomeEvento] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataEvento, setDataEvento] = useState("");
  const [idTipoEvento, setIdTipoEvento] = useState("");
  const idInstituicao = "b284de0f-9f10-411c-9fe0-2c1c0023830c";

  //forma de formulario
  const [frmEdit, setFrmEdit] = useState(false);
  const [notifyUser, setNotifyUser] = useState();

  //****************************Ponte de dados eventos****************************/
  useEffect(() => {
    async function loadEvents() {
      try {
        const dadosEventos = await api.get(eventsResource);
        setEventos(dadosEventos.data);
      } catch (error) {
        console.log(`Deu ruim na api evento${error}`);
      }
    }
    loadEvents();
  }, []);

  //****************************Ponte de dados tipos eventos****************************/
  useEffect(() => {
    async function loadTypeEvents() {
      try {
        const dadosTipos = await api.get(eventTypeResource);
        setTiposEventos(dadosTipos.data);
      } catch (error) {
        console.log(`Deu ruim na api tipo evento${error}`);
      }
    }
    loadTypeEvents();
  }, []);

  //Corrige erro nos opitions aos trazer dados
  function dePara(retornoApi) {
    let arrayOptions = [];
    retornoApi.forEach((e) => {
      arrayOptions.push({ value: e.idTipoEvento, text: e.titulo });
    });
    return arrayOptions;
  }

  //Deletar evento
  async function handleDelete(idElement) {
    if (!window.confirm("Confirma a eclusao do evento?")) {
      return;
    }

    try {
      const deletarEvento = await api.delete(`${eventsResource}/${idElement}`);
      if (deletarEvento.status === 204) {

        //atualiza pagina apos acao
        const atualizaPagina = await api.get(eventsResource);
        setEventos(atualizaPagina.data);
      }

      setNotifyUser({
        titleNote: "Sucesso",
        textNote: "Evento excluido com sucesso",
        imgIcon: "success",
        imgAlt: "Imagem de ilutracao",
        showMessage: true,
      });

    } catch (error) {
      alert(`Deu ruim no metodo de delete: ${error}`);
    }
  }

  //Cadastra evento
  async function handleSubmit(e) {
    e.preventDefault();
    if (nomeEvento.trim().length < 3) {
      //notifica
      setNotifyUser({
        titleNote: "Aviso",
        textNote: "Necessario 3 caracteres ao menos.",
        imgIcon: "warning",
        imgAlt: "Imagem de ilustração de aviso. Mulher dando um chute em um ponto de esclamação",
        showMessage: true,
      });

      editActionAbort();
      return;
    }

    try {
      const dadosCadastro = {
        nomeEvento: nomeEvento,
        descricao: descricao,
        idTipoEvento: idTipoEvento,
        dataEvento: dataEvento,
        idInstituicao: idInstituicao,
      };

      const retorno = await api.post(eventsResource, dadosCadastro);

      //notifica
      setNotifyUser({
        titleNote: "Sucesso",
        textNote: "Tipo evento editado com sucesso!",
        imgIcon: "success",
        imgAlt: "Imagem de sucesso",
        showMessage: true,
      });

      editActionAbort();
    } catch (error) {

      console.log(`Erro ao cadastrar:`);
      console.log(error);
    }

    //atualiza pagina apos acao
    const atualizaPagina = await api.get(eventsResource);
    setEventos(atualizaPagina.data);
  }

  //Muda forma da pagina
  async function showUpdateForm(idElement) {
    setFrmEdit(true);

    try {
      const dadosSelecionados = await api.get(`${eventsResource}/${idElement}`);

      setNomeEvento(dadosSelecionados.data.nomeEvento);
      setDescricao(dadosSelecionados.data.descricao);
      setIdTipoEvento(dadosSelecionados.data.idTipoEvento);
      setDataEvento(dadosSelecionados.data.dataEvento.slice(0, 10));

      setIdEvento(dadosSelecionados.data.idEvento);
    } catch (error) {
      alert(`Erro ao mudar forma de formulario: ${error}`);
    }
  }
  //retorna a forma de cadastro
  function editActionAbort() {
    setFrmEdit(false);

    setNomeEvento("");
    setDescricao("");
    setIdTipoEvento("");
    setDataEvento("");
  }

  async function handleUpdate(e) {
    e.preventDefault();

    if (nomeEvento.trim().length < 3) {
      //notifica
      setNotifyUser({
        titleNote: "Aviso",
        textNote: "Necessario 3 caracteres ao menos.",
        imgIcon: "warning",
        imgAlt: "Imagem de ilustração de aviso. Mulher dando um chute em um ponto de esclamação",
        showMessage: true,
      });
      setNomeEvento("");
      return;
    }

    try {
      const atual = await api.put(`${eventsResource}/${idEvento}`, {
        nomeEvento: nomeEvento,
        descricao: descricao,
        idTipoEvento: idTipoEvento,
        dataEvento: dataEvento,
        idInstituicao: idInstituicao,
      });

      setNotifyUser({
        titleNote: "Sucesso",
        textNote: "Evento editado com sucesso!",
        imgIcon: "success",
        imgAlt: "Imagem de sucesso",
        showMessage: true,
      });

      //atualiza pagina apos acao
      const atualizaPagina = await api.get(eventsResource);
      setEventos(atualizaPagina.data);

      editActionAbort()
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      {<Notification {...notifyUser} setNotifyUser={setNotifyUser}/>}

      <MainContent>
      <section className="cadastro-evento">
        <Container>
          <div className="cadastro-evento__box">
            <Title titleText={"Cadastro de Evento"} />

            <ImageIllustrator
              altText={"Imagem de cadastro de evento"}
              imageName={"evento"}
            />

            <form
              id="form"
              className="fevento"
              onSubmit={frmEdit ? handleUpdate : handleSubmit}
            >
              {!frmEdit ? (
                //cadastrar
                <>
                  <Input
                    placeholder={"Nome"}
                    id={"nome"}
                    name="nome"
                    value={nomeEvento}
                    manipulationFuntion={(e) => {
                      setNomeEvento(e.target.value);
                    }}
                    type="text"
                  />

                  <Input
                    placeholder={"Descrição"}
                    id={"descricao"}
                    name="descricao"
                    value={descricao}
                    manipulationFuntion={(e) => {
                      setDescricao(e.target.value);
                    }}
                    type="text"
                  />

                  <Select
                    id="select"
                    name="select-eventos"
                    options={dePara(tiposEventos)}
                    value={idTipoEvento}
                    manipulationFuntion={(e) => {
                      setIdTipoEvento(e.target.value);
                    }}
                  />

                  <Input
                    id={"data"}
                    name="data"
                    value={dataEvento}
                    manipulationFuntion={(e) => {
                      setDataEvento(e.target.value);
                    }}
                    type="date"
                  />

                  <Button
                    id={"cadastrar"}
                    textButton={"Cadastrar"}
                    name="cadastrar"
                    type={"submit"}
                  />
                </>
              ) : (
                //editar
                <>
                  <Input
                    placeholder={"Nome"}
                    id={"nome"}
                    name="nome"
                    value={nomeEvento}
                    manipulationFuntion={(e) => {
                      setNomeEvento(e.target.value);
                    }}
                    type="text"
                  />

                  <Input
                    placeholder={"Descrição"}
                    id={"descricao"}
                    name="descricao"
                    value={descricao}
                    manipulationFuntion={(e) => {
                      setDescricao(e.target.value);
                    }}
                    type="text"
                  />

                  <Select
                    id="select"
                    name="select-eventos"
                    value={idTipoEvento}
                    manipulationFuntion={(e) => {
                      setIdTipoEvento(e.target.value);
                    }}
                    options={dePara(tiposEventos)}
                  />

                  <Input
                    placeholder={"dd/mm/aaaa"}
                    id={"data"}
                    type="date"
                    value={dataEvento}
                    manipulationFuntion={(e) => {
                      setDataEvento(e.target.value)
                    }}
                  />

                  <div className="buttons-editbox">
                    <Button
                      id={"cadastrar"}
                      textButton={"Cadastrar"}
                      type="submit"
                      manipulationFuntion={handleUpdate}
                    />
                    <Button
                      id={"cancelar"}
                      textButton={"cancelar"}
                      manipulationFuntion={editActionAbort}
                    />
                  </div>
                </>
              )}
            </form>
          </div>
        </Container>
      </section>

      <section className="lista-eventos-section">
        <Container>
          <Title titleText={"Lista de Eventos"} color={"white"} />

          <TableEvent
            dados={eventos}
            fnDelete={handleDelete}
            fnUpdate={showUpdateForm}
          />
        </Container>
      </section>
      </MainContent>
    </>
  );
};

export default EventosPage;

import React, { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import {
  Button,
  Input,
  Select,
  Label,
} from "../../components/FormComponents/FormComponents";
import MainContent from "../../components/Main/MainContent";
import Title from "../../components/Title/Title";
import TableEvent from "./TableEv/TableEvent";
import api, { eventsResource, eventTypeResource } from "../../Services/Service";
import "./EventosPage.css";

const EventosPage = () => {
  //dados completos
  const [eventos, setEventos] = useState([]);
  const [tiposEventos, setTiposEventos] = useState([]);

  //informacoes de evento
  const [nomeEvento, setNomeEvento] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataEvento, setDataEvento] = useState("");
  const [idTipoEvento, setIdTipoEvento] = useState("");
  const idInstituicao = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

  //forma de formulario
  const [frmEdit, setFrmEdit] = useState(false);

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
    } catch (error) {
      alert(`Deu ruim no metodo de delete: ${error}`);
    }
  }

  //Cadastra evento
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const dadosCadastro = {
        nomeEvento: nomeEvento,
        descricao: descricao,
        idTipoEvento: idTipoEvento,
        dataEvento: dataEvento,
        idInstituicao: idInstituicao
      }
      console.log(dadosCadastro);

      const retorno = await api.post(eventsResource, dadosCadastro);
    } catch (error) {
      alert(`Erro ao cadastrar: ${error}`);
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
    } catch (error) {
      alert(`Erro ao mudar forma de formulario: ${error}`);
    }
  }

  async function handleUpdate() {
    
  }

  return (
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
                    manipulationFuntion={(e) => {
                      setDescricao(e.target.value);
                    }}
                    type="text"
                  />

                  <Select
                    id="select"
                    name="select-eventos"
                    manipulationFuntion={(e) => {
                      setIdTipoEvento(e.target.value);
                    }}
                    options={dePara(tiposEventos)}
                  />

                  <Input placeholder={"dd/mm/aaaa"} id={"data"} type="date" />

                  <Button id={"cadastrar"} textButton={"Cadastrar"} />
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
  );
};

export default EventosPage;

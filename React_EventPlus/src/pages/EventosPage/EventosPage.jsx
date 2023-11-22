import React, { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import {
  Button,
  Input,
  Select,
  Label
} from "../../components/FormComponents/FormComponents";
import MainContent from "../../components/Main/MainContent";
import Title from "../../components/Title/Title";
import TableEvent from "./TableEv/TableEvent"
import api, {eventsResource, eventTypeResource} from "../../Services/Service"
import "./EventosPage.css";

const EventosPage = () => {
  const [eventos, setEventos] = useState([]);
  const [tiposEventos, setTiposEventos] = useState([]);
  const [frmEdit, setFrmEdit] = useState(false);

  //****************************Ponte de dados****************************/
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

  function dePara(retornoApi) {
    let arrayOptions =[];
    retornoApi.forEach(e => {
        arrayOptions.push( {value: e.idTipoEvento, text: e.titulo});
    });
    return arrayOptions;
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

            <form className="fevento">
              <Input 
                placeholder={"Nome"} 
                id={"nome"} 
                type="text"
              />

              <Input 
                placeholder={"Descrição"} 
                id={"descricao"} 
                type="text"
              />

              <Select 
                id="select" 
                name="select-eventos" 
                options={dePara(tiposEventos)}
              />

              <Input 
                placeholder={"dd/mm/aaaa"} 
                id={"data"} 
                type="date"
              />

              <Button 
                id={"cadastrar"} 
                textButton={"Cadastrar"}
              />
            </form>
          </div>
        </Container>
      </section>

      <section className="lista-eventos-section">
        <Container>
          <Title titleText={"Lista de Eventos"} color={"white"} />

          <TableEvent dados={eventos}/>
        </Container>
      </section>
    </MainContent>
  );
};

export default EventosPage;

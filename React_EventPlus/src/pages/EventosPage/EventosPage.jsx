import React from "react";
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
import "./EventosPage.css";

const EventosPage = () => {
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
              <Input />
              <Input />
              <Input />
              <Button />
            </form>
          </div>
        </Container>
      </section>
    </MainContent>
  );
};

export default EventosPage;

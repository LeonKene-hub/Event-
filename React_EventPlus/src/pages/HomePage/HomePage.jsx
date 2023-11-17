import React, { useEffect, useState } from "react";
import './HomePage.css'

import Banner from "../../components/Banner/Banner";
import MainContent from "../../components/Main/MainContent";
import VisionSection from "../../components/VisionSection/VisionSection";
import ContactSection from "../../components/ContactSection/ContactSection";
import Title from "../../components/Title/Title";
import NextEvent from "../../components/NextEvent/NextEvent";
import Container from "../../components/Container/Container";
import api from "../../Services/Service";
import { nextEventResource } from "../../Services/Service";

const Home = () => {
  const [nextEvents, setNextEvents] = useState([]);

  useEffect(() => {
    async function getNextEvents() {
      try {
        const promise = await api.get(`${nextEventResource}`);
        const dados = await promise.data;
        setNextEvents(dados);

      } catch (error) {
        alert(`Dey ruim na API ${error}`)
      }
    }

    getNextEvents(); //roda a funcao
  },[]);


  return (
    <MainContent>
      <Banner />
      <section className="proximos-eventos">
        <Container>
          <Title titleText={"Proximos Eventos"} />

          <div className="events-box">
            {
              nextEvents.map((e) => {
                return(                
                <NextEvent 
                  key={e.idEvento}
                  title={e.nomeEvento}
                  description={e.descricao}
                  eventDate={e.dataEvento}
                  idEvent={e.idEvento}
                />);

              })
            }
          </div>
        </Container>
      </section>
      <VisionSection />
      <ContactSection />
    </MainContent>
  );
};

export default Home;

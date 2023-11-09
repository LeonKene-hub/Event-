import React, { useEffect, useState } from "react";
import './HomePage.css'

import Banner from "../../components/Banner/Banner";
import MainContent from "../../components/Main/MainContent";
import VisionSection from "../../components/VisionSection/VisionSection";
import ContactSection from "../../components/ContactSection/ContactSection";
import Title from "../../components/Title/Title";
import NextEvent from "../../components/NextEvent/NextEvent";
import Container from "../../components/Container/Container";
import axios from "axios";

const Home = () => {
  const [nextEvents, setNextEvents] = useState([]);
  const urlLocal = "https://localhost:7118/api";

  useEffect(() => {
    async function getNextEvents() {
      try {
        const promise = await axios.get(`${urlLocal}/Evento/ListarProximos`);
        const dados = await promise.data;
        console.log(dados);

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
                  key={e.id}
                  title={e.title}
                  description={e.Descrition}
                  eventDate={e.eventData}
                  idEvent={e.id}
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

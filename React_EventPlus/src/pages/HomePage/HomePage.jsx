import React from 'react';
import Banner from '../../components/Banner/Banner'
import MainContent from '../../components/Main/MainContent'
import VisionSection from '../../components/VisionSection/VisionSection';

const Home = () => {
    return (
        <MainContent>
            <Banner />
            <VisionSection />
        </MainContent>
    );
};

export default Home;
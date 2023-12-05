import './App.css';
// import Titulo from './Components/Titulo/Titulo';
import Rotas from './Routes/routes';
import { UserContext } from './context/AuthContext';
import { useEffect, useState } from 'react';

const App = () => {
    const [userData, setUserData] = useState({});
    
    //Validação para caso o usuário não for nulo manter logado ao atualizar a pagina
    useEffect(() => { 
        const token = localStorage.getItem("token");
        setUserData(token === null ? {} : JSON.parse(token));
    }, []);

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            <Rotas />
        </UserContext.Provider>
    );
};

export default App;

import React, { useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";

const TestePage = () => {
    //variaveis do componente
    const[n1, setN1] = useState(0);
    const[n2, setN2] = useState(0);

    return(
        <div>
            <Header/>

            <h1>Paginda de poc`c</h1>
            <h2>Calculadora</h2>

            <form action="">
                <Input type="number" placeholder="n1" name="n1" value={n1} onChance={(e) => {setN1(e.target.value)}}/>
                <Input type="number" placeholder="n2" name="n2" value={n2} onChance={(e) => {setN2(e.target.value)}}/>
                <Button textButton="Calcular" type="submit"/>
            </form>
        </div>
    );
};

export default TestePage;
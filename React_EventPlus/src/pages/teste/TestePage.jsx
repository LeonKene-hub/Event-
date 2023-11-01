import React, { useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

const TestePage = () => {
    //variaveis do componente
    const[n1, setN1] = useState(0);
    const[n2, setN2] = useState(0);
    const [total, setTotal] = useState();

    function handle(e) {
        e.preventDefault()
        setTotal(parseFloat(n1) + parseFloat(n2));
        console.log(total);
    }

    return(

        <div>
            
            <h1>Paginda de poc`c</h1>
            <h2>Calculadora</h2>

            <form action="" onSubmit={handle}>
                <Input type="number" placeholder="primeiro numero" name="n1" value={n1} onChange={(e) => {setN1(e.target.value)}}/>
                <Input type="number" placeholder="segundo numero" name="n2" value={n2} onChange={(e) => {setN2(e.target.value)}}/>
                <Button textButton="Calcular" type="submit" />
            </form>

            <p>Valor do N1: {n1}</p>
            <p>Valor do N2: {n2}</p>
            <p>Resultado: {total}</p>
        </div>
    );
};

export default TestePage;